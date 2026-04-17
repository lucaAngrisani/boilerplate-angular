---
agent: agent
description: Genera una pagina Angular v21 lazy-loadable con store integrato, routing e test.
---

Crea una pagina Angular v21 completa seguendo le best practice del progetto.

## Input richiesto

- **Nome della feature** (es. `dashboard`, `user-list`)
- **Route path** (es. `/dashboard`)
- **Store da iniettare** (es. `UserStore`)
- **Sottoroute** (opzionale)

## Output atteso

```
src/app/pages/<nome>/
├── <nome>.component.ts
├── <nome>.component.html
├── <nome>.component.scss
└── <nome>.component.spec.ts

src/app/router/
└── <nome>.routes.ts        ← tutte le route, figlie incluse
```

### `<nome>.component.ts` (Smart/Page Component)

```ts
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { <Feature>Store } from '../../stores/<feature>.store';

@Component({
  selector: 'app-<nome>',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './<nome>.component.html',
  styleUrl: './<nome>.component.scss',
  // ChangeDetectionStrategy.OnPush is NOT needed: the app is zoneless,
  // signal reads in templates trigger change detection automatically.
})
export class <Nome>Component implements OnInit {
  protected readonly store = inject(<Feature>Store);

  // segnali esposti al template
  items = this.store.entities;
  isLoading = this.store.isLoading;
  error = this.store.error;

  ngOnInit(): void {
    this.store.load();
  }
}
```

### `src/app/router/<nome>.routes.ts`

```ts
import { Routes } from '@angular/router';

export const <NOME>_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/<nome>/<nome>.component').then(m => m.<Nome>Component),
    title: '<Titolo>',
  },
];
```

### Aggiorna `src/app/router/app.routes.ts`

```ts
{
  path: '<path>',
  loadChildren: () =>
    import('../pages/<nome>/<nome>.routes').then(m => m.<NOME>_ROUTES),
},
```

## Regole

- La pagina è smart: inietta lo store, delega la UI a componenti presentational
- **Non usare** `ChangeDetectionStrategy.OnPush`: l'app è zoneless, i signal nel template gestiscono il change detection automaticamente
- Lazy-load obbligatorio
- Imposta `title` sulla route
