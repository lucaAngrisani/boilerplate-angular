---
applyTo: "src/app/components/**,src/app/pages/**,src/app/shared/**"
---

# Angular v21 – Signal Forms Guidelines

## What Are Signal Forms?

Signal Forms bridge Angular's signal-based reactivity with user interaction. Instead of `FormGroup` / `FormControl`, you define a **signal** for your data model and pass it to the `form()` function, which returns a **FieldTree** — a mirror of your model where every property is a signal carrying value, validation state, and interaction metadata.

## Core Concepts

| Concept | Description |
|---|---|
| `form(signal, schema?)` | Creates a `FieldTree` from a writable signal |
| `FieldTree` | Nested structure; each property is callable as a signal returning `FieldState` |
| `FieldState` | Exposes `value()`, `valid()`, `dirty()`, `touched()`, `errors()`, `pending()`, etc. |
| `[formField]` | Directive that binds an HTML input to a `FieldTree` property |
| `schema()` | Standalone schema function for reusable validation rules |

## Basic Usage

### 1. Define the model signal

```ts
import { signal } from '@angular/core';

interface LoginData {
  email: string;
  password: string;
}

const loginModel = signal<LoginData>({ email: '', password: '' });
```

### 2. Create the FieldTree

```ts
import { form, required, email, minLength } from '@angular/forms/signals';

protected readonly loginForm = form(loginModel, (path) => {
  required(path.email, { message: 'Email is required' });
  email(path.email,   { message: 'Enter a valid email' });
  required(path.password);
  minLength(path.password, 8);
});
```

### 3. Bind inputs in the template

Import `FormField` in the component's `imports` array:

```ts
import { FormField } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  ...
})
```

```html
<input type="email"    [formField]="loginForm.email" />
<input type="password" [formField]="loginForm.password" />
```

### 4. Read field state

```ts
// In the component
const currentEmail = this.loginForm.email().value();

// Programmatic update
this.loginForm.email().value.set('alice@example.com');
```

```html
<!-- In the template -->
<p>Email: {{ loginForm.email().value() }}</p>

@if (loginForm.email().touched() && loginForm.email().errors().length) {
  <ul>
    @for (err of loginForm.email().errors(); track err.kind) {
      <li>{{ err.message ?? err.kind }}</li>
    }
  </ul>
}
```

## Field State Reference

```ts
field().value()    // current value (WritableSignal)
field().valid()    // passes all validators
field().touched()  // user focused then blurred
field().dirty()    // user changed the value
field().disabled() // field is disabled
field().readonly() // field is readonly
field().pending()  // async validation in progress
field().errors()   // ValidationError[]
field().errorSummary() // errors from this node and all children
```

## Schema: Extracting Validation Rules

For reusability and large forms, extract the schema to a separate file:

```ts
// src/app/router/models/login-schema.ts
import { schema, required, email, minLength } from '@angular/forms/signals';
import { LoginData } from './login.model';

export const loginSchema = schema<LoginData>((path) => {
  required(path.email);
  email(path.email);
  required(path.password);
  minLength(path.password, 8);
});
```

```ts
// in the component
protected readonly loginForm = form(this.loginModel, loginSchema);
```

Schemas can be composed with `apply`:

```ts
import { apply, schema } from '@angular/forms/signals';

export const strictLoginSchema = schema<LoginData>((path) => {
  apply(path, loginSchema);
  maxLength(path.password, 64);
});
```

## Built-in Validators

```ts
required(path.field)
email(path.field)
min(path.field, 0)
max(path.field, 100)
minLength(path.field, 3)
maxLength(path.field, 50)
pattern(path.field, /^\d+$/)
```

All accept an optional `{ message: '...' }` second argument.

## Custom Validators

```ts
import { validate, SchemaPathTree } from '@angular/forms/signals';

// Reusable validator function
export function validateCity(path: SchemaPathTree<string>, allowed: string[]) {
  validate(path, (ctx) => {
    const value = ctx.value();
    if (allowed.includes(value)) return null;
    return { kind: 'city', value, allowed, message: `${value} is not a valid city` };
  });
}

// Use in schema
validateCity(path.from, ['Rome', 'Milan', 'Naples']);
```

## Cross-Field Validation

Validate at the parent level to access multiple fields:

```ts
import { validate } from '@angular/forms/signals';

validate(path, (ctx) => {
  const from = ctx.fieldTree.from().value();
  const to   = ctx.fieldTree.to().value();
  if (from === to) return { kind: 'roundtrip', message: 'Origin and destination must differ' };
  return null;
});
```

Display parent-level errors:

```html
@for (err of myForm().errors(); track err.kind) {
  <p>{{ err.message }}</p>
}
```

## Conditional Validation

Apply a schema only when a condition is true:

```ts
import { applyWhenValue, schema, required, min } from '@angular/forms/signals';

applyWhenValue(path, (data) => data.isDelayed, schema<FlightData>((path) => {
  required(path.delayMinutes);
  min(path.delayMinutes, 15);
}));
```

## Async Validation

```ts
import { validateAsync } from '@angular/forms/signals';
import { rxResource } from '@angular/core/rxjs-interop';

validateAsync(path.email, {
  params:    (ctx) => ({ email: ctx.value() }),
  factory:   (params) => rxResource({ params, stream: (p) => checkEmailAvailable(p.params.email) }),
  onSuccess: (available) => available ? null : { kind: 'email_taken', message: 'Email already in use' },
  onError:   (_err)      => ({ kind: 'api_error', message: 'Could not verify email' }),
});
```

Show pending state:

```html
@if (myForm.email().pending()) {
  <span>Checking availability…</span>
}
```

> Angular skips async validators while any synchronous validator is failing, preventing unnecessary HTTP calls.

## Debouncing

```ts
import { debounce } from '@angular/forms/signals';

form(searchModel, (path) => {
  debounce(path, 300);   // debounce entire form
  // or: debounce(path.query, 300);  for a single field
  required(path.query);
  minLength(path.query, 2);
});
```

## Controlled Field Behavior (disabled / hidden / readonly)

```ts
import { disabled, hidden, readonly } from '@angular/forms/signals';

disabled(path.delay,  (ctx) => !ctx.valueOf(path.isDelayed));
hidden(path.coupon,   (ctx) => !ctx.valueOf(path.hasCoupon));
readonly(path.id,     () => true);
```

```html
@if (!myForm.coupon().hidden()) {
  <input [formField]="myForm.coupon" />
}
```

## Submitting

```ts
import { submit } from '@angular/forms/signals';

protected async save(): Promise<void> {
  await submit(this.myForm, async (form) => {
    try {
      await this.service.save(form().value());
      return null; // no error
    } catch (err) {
      return { kind: 'save_error', message: String(err) };
    }
  });
}
```

`submit` runs the action **only** if there are no validation errors. Errors returned from the action are added to the form's `errors()` array.

## Standard Schema / Zod Integration

```ts
import { validateStandardSchema } from '@angular/forms/signals';
import { MyZodSchema } from './my-zod-schema';

form(model, (path) => {
  validateStandardSchema(path, MyZodSchema);
});
```

## Rules

- Import `FormField` in every component that uses `[formField]`.
- Store the data model in a `signal()` or `linkedSignal()` (for data from a store).
- Extract schemas to `src/app/models/<feature>-schema.ts` for forms with more than 3 fields.
- Use `field().touched()` to gate error display — avoid showing errors before user interaction.
- Use `errorSummary()` on the root form for form-level error banners.
- Prefer `submit()` over manual validation checks before saving.
- Use `debounce` on search/reactive forms to avoid excessive HTTP calls.
- Async validators are skipped while sync validators fail — keep sync rules first in the schema.
