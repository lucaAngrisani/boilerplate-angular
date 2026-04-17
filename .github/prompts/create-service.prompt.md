---
agent: agent
description: Genera un servizio Angular v21 per chiamate HTTP con tipizzazione completa.
---

Crea un servizio Angular v21 seguendo le best practice del progetto.

## Input richiesto

- **Nome della risorsa** (es. `user`, `product`)
- **URL base dell'API** (es. `/api/users`)
- **Interfacce coinvolte** (es. `User`, `CreateUserDto`, `UpdateUserDto`)

## Output atteso

### `src/app/services/<nome>.service.ts`

```ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { <Modello>, Create<Modello>Dto, Update<Modello>Dto } from '../models/<nome>.model';

@Injectable({ providedIn: 'root' })
export class <Modello>Service {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '<url>';

  getAll(): Observable<<Modello>[]> {
    return this.http.get<<Modello>[]>(this.apiUrl);
  }

  getById(id: number): Observable<<Modello>> {
    return this.http.get<<Modello>>(`${this.apiUrl}/${id}`);
  }

  create(payload: Create<Modello>Dto): Observable<<Modello>> {
    return this.http.post<<Modello>>(this.apiUrl, payload);
  }

  update(id: number, payload: Update<Modello>Dto): Observable<<Modello>> {
    return this.http.put<<Modello>>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### `src/app/services/<nome>.service.spec.ts`

Test con `HttpTestingController`. Copri ogni metodo HTTP.

### `src/app/models/<nome>.model.ts`

Definisci le interfacce `<Modello>`, `Create<Modello>Dto`, `Update<Modello>Dto`.

## Regole

- Il servizio non gestisce errori (li gestisce lo store)
- Nessuno stato mutabile nel servizio
- Tutti i tipi devono essere espliciti, niente `any`
- `providedIn: 'root'`
