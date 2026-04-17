---
agent: agent
description: Genera un NgRx SignalStore per una feature con operazioni CRUD complete.
---

Crea un NgRx SignalStore Angular v21 seguendo le best practice del progetto.

## Input richiesto

- **Nome della feature** (es. `user`)
- **Interfaccia del modello** (es. `User`)
- **Operazioni richieste**: `load`, `create`, `update`, `delete`, `select`

## Output atteso

### `src/app/stores/<nome>.store.ts`

```ts
import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { withEntities, setAllEntities, addEntity, updateEntity, removeEntity } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap } from 'rxjs';
import { <Modello>Service } from '../services/<nome>.service';
import { <Modello>, Create<Modello>Dto, Update<Modello>Dto } from '../models/<nome>.model';

export interface <Modello>StoreState {
  selectedId: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: <Modello>StoreState = {
  selectedId: null,
  isLoading: false,
  error: null,
};

export const <Modello>Store = signalStore(
  { providedIn: 'root' },
  withEntities<<Modello>>(),
  withState(initialState),
  withComputed(({ entities, selectedId }) => ({
    selected: computed(() => entities().find(e => e.id === selectedId()) ?? null),
    total: computed(() => entities().length),
  })),
  withMethods((store, service = inject(<Modello>Service)) => ({

    load: rxMethod<void>(pipe(
      switchMap(() => {
        patchState(store, { isLoading: true, error: null });
        return service.getAll().pipe(
          tapResponse({
            next: items => patchState(store, setAllEntities(items), { isLoading: false }),
            error: (err: Error) => patchState(store, { error: err.message, isLoading: false }),
          }),
        );
      }),
    )),

    create: rxMethod<Create<Modello>Dto>(pipe(
      switchMap(dto => service.create(dto).pipe(
        tapResponse({
          next: item => patchState(store, addEntity(item)),
          error: (err: Error) => patchState(store, { error: err.message }),
        }),
      )),
    )),

    update: rxMethod<{ id: number; changes: Update<Modello>Dto }>(pipe(
      switchMap(({ id, changes }) => service.update(id, changes).pipe(
        tapResponse({
          next: item => patchState(store, updateEntity({ id, changes: () => item })),
          error: (err: Error) => patchState(store, { error: err.message }),
        }),
      )),
    )),

    remove: rxMethod<number>(pipe(
      switchMap(id => service.delete(id).pipe(
        tapResponse({
          next: () => patchState(store, removeEntity(id)),
          error: (err: Error) => patchState(store, { error: err.message }),
        }),
      )),
    )),

    select(id: number): void {
      patchState(store, { selectedId: id });
    },

    clearSelection(): void {
      patchState(store, { selectedId: null });
    },

  })),
);
```

## Regole

- Usa `withEntities` per tutti i modelli con id
- Usa `rxMethod` per ogni operazione asincrona
- Usa `tapResponse` per gestire success/error in modo sicuro
- Usa sempre `patchState`, mai mutazione diretta
- Esporta lo store e l'interfaccia dello state
