---
applyTo: "src/app/components/**,src/app/pages/**,src/app/shared/**"
---

# Angular v21 – Component Guidelines

## File Structure

Each component lives in its own folder:

```
my-feature/
├── my-feature.component.ts
├── my-feature.component.html
├── my-feature.component.scss
└── my-feature.component.spec.ts
```

## Template: New Control Flow

Always use `@if`, `@for`, `@switch` instead of structural directives:

```html
@if (isLoading()) {
<app-spinner />
} @else {
<ul>
  @for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
  } @empty {
  <li>No items found.</li>
  }
</ul>
}
```

## Defer Blocks

Lazy-load heavy sections with `@defer`:

```html
@defer (on viewport) {
<app-heavy-chart [data]="chartData()" />
} @placeholder {
<div class="placeholder">Loading chart…</div>
}
```

## Change Detection

This app is **zoneless** (`provideExperimentalZonelessChangeDetection()` in `app.config.ts`). In a zoneless app, Angular's change detection is triggered automatically by signal reads in the template — `ChangeDetectionStrategy.OnPush` is therefore **not required and should be omitted**.

> Only add `ChangeDetectionStrategy.OnPush` if the project is still running with Zone.js and you need to opt in to finer-grained change detection manually.

## Page Components

Page components (in `src/app/pages/`) are the direct targets of routes. They:

- Inject stores or services.
- Delegate UI logic to child components.
- Are lazy-loaded via `loadComponent`.

```ts
// router/app.routes.ts
{
  path: 'dashboard',
  loadComponent: () =>
    import('../pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
}
```

or, if it is default export:

```ts
// router/app.routes.ts
{
  path: 'dashboard',
  loadComponent: () =>
    import('../pages/dashboard/dashboard.component'),
}
```

## Smart vs Presentational

|                | Smart (page/container) | Presentational             |
| -------------- | ---------------------- | -------------------------- |
| Location       | `pages/`               | `components/` or `shared/` |
| Injects stores | ✅                     | ❌                         |
| Accepts inputs | ❌ or few              | ✅                         |
| Emits outputs  | ❌ or few              | ✅                         |

## Accessibility

- Always use semantic HTML elements.
- Add `aria-*` attributes where applicable.
- Provide `alt` text for all images.
