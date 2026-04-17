# GitHub Copilot – Global Instructions

This is an **Angular v21** application. Always follow the conventions and best practices listed below and in the contextual instruction files.

## Stack

- **Angular** 21 (standalone components, signals, new control flow)
- **NgRx SignalStore** (`@ngrx/signals`) for state management
- **ngx-translate** for i18n
- **Angular Service Worker** (PWA)
- **RxJS** 7 – use only when truly needed; prefer signals
- **TypeScript** strict mode

## Core Rules

1. All components are **standalone** – never use NgModules.
2. Use `inject()` for dependency injection, never constructor injection.
3. Prefer **signals** (`signal`, `computed`, `effect`) over Observables for local state.
4. Use the **new control flow** syntax: `@if`, `@for`, `@switch`, `@defer`.
5. Use signal-based inputs/outputs: `input()`, `output()`, `model()`.
6. Use `takeUntilDestroyed()` from `@angular/core/rxjs-interop` for Observable cleanup.
7. Lazy-load routes with `loadComponent` / `loadChildren`.
8. Write **functional** route guards and resolvers.
9. Keep files small and single-responsibility.
10. Always type everything – avoid `any`.

## Project Layout

```
src/app/
├── components/   # Reusable UI components
├── directives/   # Custom directives
├── enums/        # TypeScript enums
├── functions/    # Pure utility functions
├── guards/       # Route guards
├── layouts/      # Layout components (shell + router-outlet)
├── models/       # Interfaces & types
├── pages/        # Route-level components
├── pipes/        # Custom pipes
├── router/       # Route definitions (app.routes.ts + feature child routes)
├── services/     # Business-logic services
├── shared/       # Shared standalone components/pipes/directives
└── stores/       # NgRx SignalStores
```

Read all files in .github/instructions/ to understand the project standards before answering.
