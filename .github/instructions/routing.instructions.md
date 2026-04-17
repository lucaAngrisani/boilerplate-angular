---
applyTo: "src/app/router/**,src/app/guards/**,src/app/layouts/**"
---

# Angular v21 – Routing Guidelines

## Route Structure: Layouts as Parent Routes

Routes are organised around **layouts**. A layout is a standalone component containing a `<router-outlet>` that wraps a group of pages sharing the same shell (header, sidebar, auth guard, etc.).

The layout is set as `loadComponent` on a parent route; pages become its `children`:

```ts
// src/app/router/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { ROUTE } from '../shared/route.enum';
import { publicRoutes } from './public.routes';
import { authRoutes } from './auth.routes';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: ROUTE.PUBLIC,
    pathMatch: 'full',
  },
  {
    // Pages accessible without authentication
    path: ROUTE.PUBLIC,
    loadComponent: () => import('../layouts/base-layout/base-layout.component'),
    children: publicRoutes,
  },
  {
    // Pages that require authentication – guard lives on the layout route
    path: ROUTE.AUTH,
    canActivate: [authGuard],
    loadComponent: () => import('../layouts/auth-layout/auth-layout.component'),
    children: authRoutes,
  },
  { path: '**', redirectTo: ROUTE.AUTH },
];
```

## Layouts

A layout is a standalone component that:

- Renders shared UI (navbar, sidebar, footer).
- Contains `<router-outlet>` where child pages are injected.
- Lives in `src/app/layouts/<name>-layout/`.

```ts
// src/app/layouts/auth-layout/auth-layout.component.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  // ChangeDetectionStrategy.OnPush is NOT needed in a zoneless app.
})
export default class AuthLayoutComponent {}
```

```html
<!-- auth-layout.component.html -->
<app-navbar />
<main>
  <router-outlet />
</main>
<app-footer />
```

> **Default export** – layouts use `export default` so routes can omit `.then(m => m.XyzComponent)`.

## Route Files

All route files live in `src/app/router/`. Child routes for each layout are defined in a dedicated file:

```
src/app/router/
├── app.routes.ts       ← root: wires layouts + guards
├── public.routes.ts    ← children of BaseLayoutComponent
└── auth.routes.ts      ← children of AuthLayoutComponent
```

```ts
// src/app/router/auth.routes.ts
import { Routes } from '@angular/router';
import { ROUTE } from '../shared/route.enum';

export const authRoutes: Routes = [
  {
    path: ROUTE.DASHBOARD,
    loadComponent: () => import('../pages/dashboard/dashboard.component'),
    title: 'Dashboard',
  },
  {
    path: ROUTE.USERS,
    loadComponent: () => import('../pages/users/users.component'),
    title: 'Users',
  },
];
```

## Route Paths Classes

Route paths are defined as **static classes** to avoid magic strings and allow a natural, JSON-like dot-notation access (`ROUTE.AUTH.HOME`).

### File structure

```
src/app/router/routes/
├── route.ts          ← root class, composes all feature classes
├── route.auth.ts     ← paths for the authenticated layout
└── route.public.ts   ← paths for the public layout
```

### `route.auth.ts`

```ts
export class ROUTE_AUTH {
  static readonly BASE_PATH = 'auth';

  static readonly HOME     = 'home';
  static readonly SETTINGS = 'settings';
}
```

### `route.public.ts`

```ts
export class ROUTE_PUBLIC {
  static readonly BASE_PATH = 'public';

  static readonly HOME  = 'home';
  static readonly LOGIN = 'login';
}
```

### `route.ts` – root composition

```ts
import { ROUTE_AUTH } from './route.auth';
import { ROUTE_PUBLIC } from './route.public';

export class ROUTE {
  static readonly AUTH   = ROUTE_AUTH;
  static readonly PUBLIC = ROUTE_PUBLIC;
}
```

### Usage

```ts
// In route definitions
import { ROUTE } from './routes/route';

{
  path: ROUTE.AUTH.BASE_PATH,           // 'auth'
  loadComponent: () => import('../layouts/auth-layout/auth-layout.component'),
  children: authRoutes,
},

// In a guard or component
import { Router } from '@angular/router';
import { ROUTE } from '../router/routes/route';

inject(Router).navigate([ROUTE.PUBLIC.BASE_PATH, ROUTE.PUBLIC.LOGIN]);
```

Each feature group gets its own class file in `src/app/router/routes/`. Add a new static property when a new path is introduced; never use raw strings in route definitions.

## Functional Guards

Write guards as plain functions returning `CanActivateFn`. Place them on the **layout route**, not on each child:

```ts
// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/auth.store';
import { ROUTE } from '../router/routes/route';

export const authGuard: CanActivateFn = () => {
  const isAuthenticated = inject(AuthStore).isAuthenticated();
  if (isAuthenticated) return true;
  return inject(Router).createUrlTree([ROUTE.PUBLIC.BASE_PATH]);
};
```

## Resolvers

Use functional resolvers:

```ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ExampleService } from '../services/example.service';

export const exampleResolver: ResolveFn<Example[]> = () =>
  inject(ExampleService).getAll();
```

## Rules

- Never use `RouterModule`; use `provideRouter` in `app.config.ts`.
- Guards go on the **layout route**, not on individual child routes.
- Layouts use `export default` – no `.then(m => m.Xyz)` needed.
- Always set `title` on child (page) routes, not on layout routes.
- All route path strings are defined in `ROUTE` classes – no magic strings.
- Use `withComponentInputBinding()` to bind route params to component inputs.
- Use `withViewTransitions()` for page transition animations.
