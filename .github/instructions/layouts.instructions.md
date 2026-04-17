---
applyTo: "src/app/layouts/**"
---

# Angular v21 – Layout Guidelines

## What Is a Layout?

A **layout** is a standalone component that provides the shared UI shell (navbar, sidebar, footer) for a group of related pages. Pages are injected into the layout via `<router-outlet>`.

Layouts are the `loadComponent` target of a parent route; they never contain business logic.

```
Browser
└── AppComponent
    └── RouterOutlet
        └── AuthLayoutComponent       ← layout (shell)
            ├── NavbarComponent
            ├── RouterOutlet          ← pages render here
            └── FooterComponent
```

## File Structure

Each layout lives in its own folder under `src/app/layouts/`:

```
src/app/layouts/
├── base-layout/
│   ├── base-layout.component.ts
│   ├── base-layout.component.html
│   └── base-layout.component.scss
└── auth-layout/
    ├── auth-layout.component.ts
    ├── auth-layout.component.html
    └── auth-layout.component.scss
```

## Scaffold

```ts
// src/app/layouts/auth-layout/auth-layout.component.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  // ChangeDetectionStrategy.OnPush is NOT needed in a zoneless app.
})
export default class AuthLayoutComponent {}
```

```html
<!-- auth-layout.component.html -->
<app-navbar />
<main class="layout-main">
  <router-outlet />
</main>
<app-footer />
```

## Using a Layout in Routes

The layout is the `loadComponent` of a parent route. Child pages go in `children`:

```ts
// src/app/router/app.routes.ts
{
  path: ROUTE.AUTH,
  canActivate: [authGuard],          // guard on the layout, not on each child
  loadComponent: () => import('../layouts/auth-layout/auth-layout.component'),
  children: authRoutes,              // defined in src/app/router/auth.routes.ts
},
```

## Rules

- **Always use `export default`** – allows `loadComponent` without `.then(m => m.Xyz)`.
- **No business logic** – layouts only compose UI shell components.
- **No store injection** – inject stores in page components, not in layouts.
- **Guards belong on the layout route**, not on individual children.
- **`<router-outlet>` is mandatory** – without it child pages cannot render.
- **Do not use `ChangeDetectionStrategy.OnPush`** – the app is zoneless, signal reads in the template drive change detection automatically.
- Layouts are not lazy-loaded individually; they are already lazy because the parent route itself uses `loadComponent`.
