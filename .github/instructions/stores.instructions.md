---
applyTo: "src/app/stores/**"
---

# Angular v21 – NgRx SignalStore Guidelines

## Basic Store

```ts
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap } from 'rxjs';

export interface ExampleState {
  items: Example[];
  selectedId: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ExampleState = {
  items: [],
  selectedId: null,
  isLoading: false,
  error: null,
};

export const ExampleStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ items, selectedId }) => ({
    selected: computed(() => items().find(i => i.id === selectedId()) ?? null),
    total: computed(() => items().length),
  })),
  withMethods((store, service = inject(ExampleService)) => ({
    load: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, { isLoading: true, error: null });
          return service.getAll().pipe(
            tapResponse({
              next: items => patchState(store, { items, isLoading: false }),
              error: (err: Error) =>
                patchState(store, { error: err.message, isLoading: false }),
            }),
          );
        }),
      ),
    ),

    select(id: number): void {
      patchState(store, { selectedId: id });
    },

    clearSelection(): void {
      patchState(store, { selectedId: null });
    },
  })),
);
```

## Rules

- Every store lives in `src/app/stores/<feature>.store.ts`.
- Provide at `root` level unless scoped to a specific feature module.
- Define the state interface and `initialState` constant before the store.
- Use `withComputed` for all derived state – never compute inside templates.
- Use `rxMethod` (from `@ngrx/signals/rxjs-interop`) for async operations.
- Use `tapResponse` (from `@ngrx/operators`) for safe side-effect handling.
- Never mutate state directly; always use `patchState`.
- Export the store class and its state interface.

## Entity Collections

Use `withEntities` for CRUD collections:

```ts
import { withEntities, setAllEntities, addEntity, updateEntity, removeEntity } from '@ngrx/signals/entities';

export const ExampleStore = signalStore(
  { providedIn: 'root' },
  withEntities<Example>(),
  withMethods((store, service = inject(ExampleService)) => ({
    load: rxMethod<void>(
      pipe(
        switchMap(() =>
          service.getAll().pipe(
            tapResponse({
              next: items => patchState(store, setAllEntities(items)),
              error: console.error,
            }),
          ),
        ),
      ),
    ),
    add: rxMethod<CreateExampleDto>(
      pipe(
        switchMap(dto =>
          service.create(dto).pipe(
            tapResponse({
              next: item => patchState(store, addEntity(item)),
              error: console.error,
            }),
          ),
        ),
      ),
    ),
  })),
);
```

## Consuming the Store

```ts
export class ExampleComponent {
  private readonly store = inject(ExampleStore);

  items = this.store.items;          // WritableSignal<Example[]>
  isLoading = this.store.isLoading;  // Signal<boolean>
  selected = this.store.selected;    // Signal<Example | null>

  constructor() {
    this.store.load();
  }
}
```
