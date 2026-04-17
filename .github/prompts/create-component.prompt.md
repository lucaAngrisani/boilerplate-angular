---
agent: agent
description: Genera un componente Angular v21 standalone completo con template, stili e test.
---

Crea un componente Angular v21 standalone seguendo le best practice del progetto.

## Input richiesto

- **Nome del componente** (es. `user-card`)
- **Tipo**: presentational (`components/`) o smart/page (`pages/`)
- **Descrizione**: cosa fa il componente

## Output atteso

Genera i seguenti file nella cartella corretta:

```
src/app/<tipo>/<nome>/
├── <nome>.component.ts
├── <nome>.component.html
├── <nome>.component.scss
└── <nome>.component.spec.ts
```

### `<nome>.component.ts`

```ts
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-<nome>',
  standalone: true,
  imports: [],
  templateUrl: './<nome>.component.html',
  styleUrl: './<nome>.component.scss',
  // ChangeDetectionStrategy.OnPush is NOT needed: the app is zoneless,
  // signal reads in templates trigger change detection automatically.
})
export class <Nome>Component {
  // signal inputs
  // signal outputs
}
```

### `<nome>.component.html`

Usa la nuova sintassi di control flow (`@if`, `@for`, `@switch`, `@defer`).
Elementi semantici HTML5. Attributi `aria-*` dove necessario.

### `<nome>.component.spec.ts`

Test con `TestBed`, importando direttamente il componente standalone.
Copri almeno: creazione, rendering degli input, emissione degli output.

## Regole

- **Non usare** `ChangeDetectionStrategy.OnPush`: l'app è zoneless, i signal nel template gestiscono il change detection automaticamente
- Usa `input()` / `output()` / `model()` per l'API del componente
- Usa `inject()` per DI (solo nei componenti smart/page)
- Nessun NgModule
- Nessun `any`
