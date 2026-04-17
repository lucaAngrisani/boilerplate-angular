---
name: generate-component
description: 'Generate a complete standalone Angular v21 component with files and tests. Use when creating a new component or page scaffold aligned with project conventions.'
argument-hint: 'Target kind and name (es: "components user-card" o "pages users/list")'
user-invocable: true
---

# Generate Component

## Outcome

Generate a complete standalone Angular v21 component with all required files, following the project's architecture and coding standards.

## When to Use

- User asks to create a new UI component or page
- User describes a feature that needs a visual representation
- Refactoring a template into a reusable component

## Inputs
- Target kind and name (for example: `components user-card` or `pages users/list`).
- Optional preference for styles extension (`.scss` or `.css`).

## Procedure

1. Determine whether it is a **presentational** component (`components/`) or a **smart/page** component (`pages/`).
2. Generate the folder and four files: `.ts`, `.html`, `.scss`, `.spec.ts`.
3. Do **not** add `ChangeDetectionStrategy.OnPush` — the app is zoneless, so signal reads in the template already drive change detection automatically.
4. Use `input()`, `output()`, `model()` for the component API.
5. Use new control flow syntax in the template (`@if`, `@for`, `@defer`).
6. Write a minimal but meaningful spec that tests creation and key behaviours.

## Decision Points
- If target starts with `src/app/pages`, treat the component as page-level.
- If target starts with `src/app/components` or `src/app/shared`, treat it as presentational.
- If files already exist, ask whether to overwrite or skip.

## Conventions

| Rule | Detail |
|---|---|
| Selector prefix | `app-` |
| Standalone | Always `standalone: true` |
| DI | `inject()` only |
| Styles | SCSS, scoped |
| Imports | Only what the template needs |

## Output Structure

```
src/app/<components|pages>/<name>/
├── <name>.component.ts
├── <name>.component.html
├── <name>.component.scss
└── <name>.component.spec.ts
```

## Related Prompts

- `.github/prompts/create-component.prompt.md`
- `.github/prompts/create-page.prompt.md`

## Completion Criteria
- Component is standalone and uses `inject()` for DI.
- Template uses project control-flow syntax where needed.
- Spec validates component creation and a core behavior.
- Output files are created in the requested path and naming convention.
