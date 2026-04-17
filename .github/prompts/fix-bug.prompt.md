---
agent: agent
description: Analizza e correggi un bug in un'applicazione Angular v21.
---

Analizza il bug descritto e fornisci la correzione seguendo le best practice Angular v21.

## Processo

1. **Riproduci** – identifica il file e la riga dove si manifesta il problema.
2. **Causa radice** – spiega perché il bug si verifica (tipo, logica, ciclo di vita, subscription non chiusa, ecc.).
3. **Correzione** – applica la modifica minima necessaria.
4. **Test** – aggiungi o aggiorna il test `spec.ts` che copre il caso.
5. **Prevenzione** – suggerisci come evitare il problema in futuro.

## Checklist frequente per Angular v21

- [ ] Signal non richiamato come funzione nel template (es. `items` invece di `items()`)
- [ ] Observable non completato (`takeUntilDestroyed` mancante)
- [ ] Aggiornamenti imperativi non basati su signal in un'app zoneless (il template non si aggiorna perché nessun signal è cambiato)
- [ ] `inject()` chiamato fuori dal contesto di injection
- [ ] `effect()` che modifica un signal causando un loop
- [ ] `@for` senza `track` → performance degradata
- [ ] Input required non fornito → errore a runtime
- [ ] Route non lazy-loaded → bundle troppo grande
- [ ] `any` implicito che nasconde un errore di tipo

## Formato della risposta

```
### Causa
<spiegazione>

### Fix
<file>: <modifica>

### Test aggiunto/aggiornato
<codice del test>

### Prevenzione
<consiglio>
```
