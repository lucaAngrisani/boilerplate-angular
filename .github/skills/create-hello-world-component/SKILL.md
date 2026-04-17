---
name: create-hello-world-component
description: 'Create a standalone Angular Hello World component in a user-provided path. Use when asked to scaffold a sample component, verify folder conventions, or generate a quick UI placeholder in src/app/components, src/app/pages, or src/app/shared.'
argument-hint: 'Percorso target (es: src/app/components/hello-world)'
user-invocable: true
---

# Create Hello World Component

## Outcome
Generate a complete standalone Angular component named hello-world in the requested path, aligned with project conventions.

## When to Use
- User asks for an example component.
- User asks for a Hello World scaffold in a specific folder.
- You need a minimal component to validate routing or UI wiring.

## Inputs
- Target path from user, for example: src/app/components/hello-world

## Procedure
1. Validate the target path.
- Confirm it is under src/app/.
- If the path is missing, ask for it.

2. Identify component type from the path.
- If path starts with src/app/pages, treat it as page-level (smart shell target).
- If path starts with src/app/components or src/app/shared, treat it as presentational.
- If path is outside these folders, ask for confirmation before creating files.

3. Generate files.
- Create the folder if needed.
- Create these files:
  - hello-world.component.ts
  - hello-world.component.html
  - hello-world.component.scss
  - hello-world.component.spec.ts

4. Implement minimal standalone component code.
- Use standalone component API.
- Use signal-based APIs if inputs/outputs are needed.
- Keep logic minimal for Hello World.

5. Implement template.
- Use semantic HTML.
- Render a visible Hello World message.
- Use new Angular control flow syntax only if conditional content is added.

6. Add a basic test.
- Ensure the component is created.
- Ensure the Hello World text is rendered.

7. Validate quality checks.
- Confirm no TypeScript errors in created files.
- Confirm naming and selector convention app-hello-world.
- Confirm standalone component and `inject()`-based DI if dependencies are present.
- Confirm no `ChangeDetectionStrategy.OnPush` (project is zoneless).
- Confirm Vitest-style testing (`vi.fn` / `vi.spyOn`) if mocks are needed.
- Confirm files are in the exact requested path.

## Decision Points
- Path provided:
  - Yes: proceed.
  - No: ask for explicit target path.
- Path outside src/app:
  - Yes: request user confirmation.
  - No: proceed.
- Existing files already present:
  - Yes: ask whether to overwrite or skip.
  - No: create files.

## Completion Criteria
- A standalone hello-world component exists in the requested path.
- Template shows a Hello World message.
- Unit test validates creation and rendered message with project testing conventions.
- The final response reports created files and any assumptions.

## Example Prompts
- /create-hello-world-component src/app/components/hello-world
- Crea un componente hello world in src/app/shared/hello-world
- Scaffold hello-world under src/app/pages/public/hello-world
