---
applyTo: "src/app/models/**/*.ts"
---

# Angular v21 - Mapper-Factory (Usage V2) Guidelines

Use `mapper-factory` to map API/JSON payloads into typed model objects and to reverse-map model objects back to plain JSON.

## Core Pattern

Every mapped model must:

- Use `@MapClass()` on the class.
- Implement `MapInterface<YourModel>` via interface merging.
- Use `@MapField()` only when source key/path or conversion differs from direct property assignment.

```ts
import { MapClass, MapField, MapInterface } from 'mapper-factory';

@MapClass()
export class User {
	id!: string;

	@MapField({ src: 'firstName' })
	name!: string;

	@MapField({ src: 'lastName' })
	surname!: string;
}

export interface User extends MapInterface<User> {}
```

## Usage V2 API

From `MapInterface<T>`, these methods are available on model instances:

- `from(payload)`: creates a mapped model instance from plain object input.
- `toMap()`: creates a reverse-mapped plain object.
- `toModel(modelLike)`: creates a typed model from another model-shaped object.
- `empty()`: returns `true` when model has no meaningful values.
- `filled()`: returns `true` when model is not empty.
- `get(key)`: reads a property by key.
- `set(key, value)`: sets a property by key.
- `copy()`: deep copy of the model.

```ts
const user = new User().from({ firstName: 'Rick', lastName: 'Sanchez' });
const asJson = user.toMap();
const clone = user.copy();
```

## `@MapField` Options

Use `@MapField({...})` for source path mapping and transformation logic:

- `src`: source key or deep path (example: `'profile.name'`, `'obj.arr[0].value'`).
- `transformer`: transforms incoming source value during `from(...)` mapping.
- `reverser`: transforms outgoing value during `toMap()` reverse mapping.

```ts
@MapField({
	src: 'rolesToMap',
	transformer: (arr: string[] = []) => arr.map(r => `${r} TEST TRANSFORMER`),
	reverser: (arr: string[] = []) => arr.map(r => r.replace(' TEST TRANSFORMER', '')),
})
roles?: string[];
```

## Specialized Decorators

In addition to `@MapField`, `mapper-factory` also provides specialized decorators for common mapped types:

- `@ArrayField(ModelClass)`: maps arrays of objects to instances of a `@MapClass()` model.
- `@DateField()`: maps date fields to `Date`.
- `@ObjectField(ModelClass)`: maps nested objects to a `@MapClass()` model instance.

```ts
import {
	ArrayField,
	DateField,
	MapClass,
	MapInterface,
	ObjectField,
} from 'mapper-factory';

@MapClass()
export class Address {
	street!: string;
	city!: string;
}

export interface Address extends MapInterface<Address> {}

@MapClass()
export class User {
	@ArrayField(Address)
	addresses?: Address[];

	@DateField()
	birthDate?: Date;

	@ObjectField(Address)
	mainAddress?: Address;
}

export interface User extends MapInterface<User> {}
```

When fields are naturally an array/date/object of mapped models, prefer these specialized decorators over custom `@MapField` transformer logic.

## Nested Models and Arrays

For nested structures, transform plain objects into typed model instances explicitly.

```ts
@MapClass()
export class User {
	@MapField({ transformer: (obj: unknown) => new User().from(obj) })
	boss?: User;

	@MapField({
		transformer: (items: unknown[] = []) => items.map(item => new User().from(item)),
	})
	employees?: User[];
}

export interface User extends MapInterface<User> {}
```

## Project Conventions

- Place mapped entities in `src/app/models/`.
- Keep model classes focused on mapping + model behavior only.
- Do not put HTTP calls or Angular DI in mapped models.
- In services/stores, map API responses at boundaries before storing/using data.
- Prefer explicit typing for transformer/reverser inputs and outputs.

```ts
// service/store boundary example
const model = new User().from(apiResponse);
const payload = model.toMap();
```

## Best Practices

- Keep `transformer` and `reverser` pure and deterministic.
- Use `src` only when names/paths differ; avoid unnecessary decorators.
- Avoid `any`; use `unknown` and narrow when needed.
- Use `copy()` before local mutation when immutability is required.
- Use `toMap()` before sending data to APIs expecting plain JSON.

## Do/Don't

- Do: map raw backend payloads into typed models immediately.
- Do: centralize field renaming logic with `@MapField({ src: ... })`.
- Don't: keep raw API payload shape in UI components.
- Don't: duplicate mapping logic in multiple services/components.
- Don't: mutate shared model instances directly when a copy is safer.
