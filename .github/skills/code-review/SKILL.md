---
name: code-review
description: 'Esegui una code review approfondita del codice selezionato o del file aperto, focalizzandoti su Angular v21, Signals e best practice di performance.'
argument-hint: 'Ambito della review (es: "logica", "accessibilità", "performance")'
user-invocable: true
---

Esegui una code review approfondita del codice Angular v21 fornito.

## Outcome
Produrre una review azionabile con finding ordinati per severita, fix concreti e valutazione finale.

## Inputs
- Ambito della review (se fornito dall'utente): logica, accessibilita, performance, testing.
- File target o selezione attiva.

## Procedure

1. Definisci l'ambito della review.
- Se l'utente specifica un focus (logica, accessibilita, performance), usa quel focus come priorita.
- Se non specificato, esegui una review completa seguendo tutti i criteri.

2. Raccogli il contesto minimo necessario.
- Analizza il file aperto o i file indicati dall'utente.
- Se una valutazione richiede contesto correlato (template, store, route, test), includi anche quei file.

3. Valuta il codice con i criteri sotto.
- Applica le checklist in ordine: architettura, signals, DI, template, performance, tipizzazione, testing.
- Evita osservazioni non verificabili; segnala solo problemi supportati dal codice.

4. Classifica ogni finding per severita.
- Usa `CRITICO` per bug, regressioni o rischi di sicurezza/comportamento.
- Usa `ATTENZIONE` per scelte fragili o anti-pattern.
- Usa `SUGGERIMENTO` per miglioramenti non bloccanti.

5. Proponi fix concreti.
- Per ogni problema, includi una proposta di fix specifica e applicabile.
- Quando utile, suggerisci snippet minimi, senza riscrivere parti non coinvolte.

6. Ordina e presenta i risultati.
- Mostra prima i problemi piu gravi, poi quelli minori.
- Mantieni il formato di output richiesto con file, riga, problema e fix.

7. Chiudi con quality gate.
- Se non trovi problemi, dichiaralo esplicitamente.
- Indica eventuali rischi residui e gap di test.
- Concludi con rating complessivo da 1 a 5 stelle.

## Criteri Di Valutazione

### Architettura
- [ ] Il componente è standalone?
- [ ] La separazione smart/presentational è rispettata?
- [ ] Lo store viene iniettato solo nelle pagine?
- [ ] Le route sono lazy-loaded?

### Signals & Reattività
- [ ] Viene usato `signal()` / `computed()` invece di variabili mutabili?
- [ ] I template chiamano i signal come funzioni (`value()` non `value`)?
- [ ] Gli effect hanno dipendenze chiare e non creano loop?
- [ ] `toSignal` è usato per convertire Observable a signal quando appropriato?

### Dependency Injection
- [ ] Viene usato `inject()` invece del costruttore?
- [ ] Le dipendenze sono `private readonly`?

### Template
- [ ] Si usa `@if`, `@for`, `@switch` invece di `*ngIf`, `*ngFor`?
- [ ] Ogni `@for` ha `track`?
- [ ] I componenti pesanti usano `@defer`?
- [ ] L'HTML è semantico con attributi `aria-*`?

### Performance
- [ ] L'app è zoneless e lo stato è gestito tramite signal? (se sì, `ChangeDetectionStrategy.OnPush` non è necessario e va omesso)
- [ ] Nessuna funzione pura chiamata direttamente nel template (usare pipe o computed)?

### Tipizzazione
- [ ] Nessun `any` esplicito o implicito?
- [ ] Le interfacce sono definite in `models/`?
- [ ] I DTO sono distinti dalle entità?

### Testing
- [ ] Il file `spec.ts` esiste?
- [ ] I test coprono il comportamento principale?
- [ ] I servizi sono mockati con Vitest (`vi.fn()` / `vi.spyOn()`) e non con Jasmine?

## Output Format

Per ogni problema trovato:

```
CRITICO | ATTENZIONE | SUGGERIMENTO

File: <percorso>
Riga: <numero>
Problema: <descrizione>
Fix: <codice suggerito>
```

Concludi con un sommario e il rating complessivo (1-5 ⭐).

## Completion Criteria
- Tutti i finding sono collegati a evidenze nel codice.
- Ogni finding contiene un fix specifico e applicabile.
- I finding sono ordinati per severita.
- Sono indicati rischi residui e gap di test, oppure assenza esplicita di problemi.
