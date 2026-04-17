---
applyTo: "**/*.ts"
---

# Angular v21 – General Best Practices

## Standalone Components

Every component, directive and pipe must be standalone (standalone: true is default for all new components). If not necessary, avoid importing CommonModule:

```ts
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  imports: [],
})
export class ExampleComponent {}
```

## Dependency Injection

Always use `inject()` at the field level:

```ts
export class ExampleComponent {
  private readonly service = inject(ExampleService);
}
```

## Signals

Use signals for all reactive local state:

```ts
count = signal(0);
double = computed(() => this.count() * 2);

increment(): void {
  this.count.update(v => v + 1);
}
```

Use `effect()` for side effects that depend on signals:

```ts
constructor() {
  effect(() => console.log('count changed:', this.count()));
}
```

## Signal-Based Component API

```ts
// Input
name = input<string>('');
nameRequired = input.required<string>();

// Output
clicked = output<void>();

// Two-way binding
value = model<string>('');
```

## RxJS Interop

When you must use Observables, always unsubscribe:

```ts
private destroyRef = inject(DestroyRef);

ngOnInit(): void {
  this.service.data$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(data => this.data.set(data));
}
```

Convert Observable to signal with `toSignal`:

```ts
data = toSignal(this.service.data$, { initialValue: [] });
```

## Typing

- Enable `strict: true` in `tsconfig.json`.
- Never use `any`; prefer `unknown` and narrow types explicitly.
- Define interfaces, types and classes in `src/app/models/`.
- Define enums in `src/app/enums/`.
- Define pipes in `src/app/pipes/`.
- Define directives in `src/app/directives/`.
- Define guards in `src/app/guards/`.

## Code Style

- **Pure functions** in `src/app/functions/`.
- One class/component per file.
- Use `readonly` for injected dependencies and derived values.
- Prefix private members with no underscore; use `private readonly`.
