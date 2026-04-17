---
name: generate-crud
description: 'Scaffold a full Angular CRUD feature (model, service, store, routes, pages, tests) for a resource. Use when implementing a data-driven feature end-to-end.'
argument-hint: 'Resource name (es: users, products, orders)'
user-invocable: true
---

# Generate CRUD Feature

## Outcome

Scaffold a complete CRUD feature (model, service, store, page, child components) for a given resource.

## When to Use

- User asks to add a new resource with list, detail, create and edit views
- Building a data-driven feature from scratch

## Inputs
- Resource name (for example: `users`, `products`, `orders`).
- Optional target layout scope (`auth` or `public`).

## Procedure

1. **Model** – create interfaces in `src/app/models/<resource>.model.ts`:
   - `<Resource>` (entity)
   - `Create<Resource>Dto`
   - `Update<Resource>Dto`

2. **Service** – create `src/app/services/<resource>.service.ts` with typed HTTP methods (`getAll`, `getById`, `create`, `update`, `delete`) and `inject()`-based DI.

3. **Store** – create `src/app/stores/<resource>.store.ts` using `withEntities` + `rxMethod` + `tapResponse`.

4. **Routes** – create feature routes in `src/app/router/<resource>.routes.ts` and register them in the appropriate layout children (`auth.routes.ts` or `public.routes.ts`).

5. **Pages**:
   - `<resource>-list` – shows the entity collection, links to detail/create.
   - `<resource>-detail` – shows a single entity, links to edit/delete.
   - `<resource>-form` – Signal Forms (`@angular/forms/signals`) for create and edit, shared via route param.

6. **Components** (presentational):
   - `<resource>-card` – displays a single entity summary.
   - `<resource>-table` (optional) – tabular list.

7. **Tests** – spec files for service, store and each component using Vitest (`vi.fn` / `vi.spyOn`, no Jasmine).

8. **Quality checks**:
   - All components are standalone.
   - No `ChangeDetectionStrategy.OnPush` (project is zoneless).
   - New control flow syntax in templates (`@if`, `@for`, `@switch`, `@defer` when useful).
   - No explicit or implicit `any`.

## Decision Points
- If routes require authentication, register under `auth.routes.ts`; otherwise use `public.routes.ts`.
- If a shared form is needed for create and edit, keep a single `<resource>-form` page with route param handling.
- If the dataset is simple, `<resource>-table` can be skipped in favor of `<resource>-card` only.

## File Map

```
src/app/
├── models/<resource>.model.ts
├── services/<resource>.service.ts
├── services/<resource>.service.spec.ts
├── stores/<resource>.store.ts
├── stores/<resource>.store.spec.ts
├── router/
│   ├── <resource>.routes.ts
│   ├── auth.routes.ts / public.routes.ts   ← include feature routes in children
│   └── routes/route.<resource>.ts          ← route path class for the feature
└── pages/<resource>/
    ├── <resource>-list/
    │   ├── <resource>-list.component.ts
    │   ├── <resource>-list.component.html
    │   ├── <resource>-list.component.scss
    │   └── <resource>-list.component.spec.ts
    ├── <resource>-detail/
    │   └── ...
    └── <resource>-form/
        └── ...
```

## Key Patterns

- Store uses `withEntities` for normalized state.
- Forms use Angular Signal Forms with `form(signalModel, schema)` and `[formField]`.
- Route params are bound to component inputs via `withComponentInputBinding()`.
- Pages are lazy-loaded with `loadComponent` / `loadChildren` and default exports where applicable.
- Delete triggers confirmation before dispatching a store remove action.
- Tests use Vitest mocks (`vi.fn`, `vi.spyOn`) and never `jasmine.createSpyObj`.

## Related Prompts

- `.github/prompts/create-service.prompt.md`
- `.github/prompts/create-store.prompt.md`
- `.github/prompts/create-page.prompt.md`
- `.github/prompts/create-component.prompt.md`

## Completion Criteria
- Model, service, store, routes, pages and tests are all scaffolded.
- Forms use Signal Forms and stores follow SignalStore conventions.
- Route integration is wired into the selected layout route tree.
- Tests use Vitest APIs and cover core CRUD behavior.
