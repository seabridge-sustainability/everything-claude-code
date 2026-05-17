# Spec Kit Goal Auto-Loop Integration

Spec Kit is SeaBridgeAI's specification discipline layer. `/goal` is the execution contract above it. Spec Kit artifacts must preserve the same autonomous persistent execution loop, Definition of Done, validation, and no-false-completion behavior.

## Required Inheritance

- `speckit-implement` inherits `/goal` and must execute until implementation, tests, validation, fixes, and re-validation satisfy the DoD or a hard blocker is proven.
- `speckit-tasks` must include test, validation, documentation, regression, and final completion-evidence tasks.
- `speckit-analyze` must flag missing validation, missing completion evidence, schema drift, unchecked integrations, and unresolved blockers.
- `speckit-checklist` must include completion evidence and skipped-test disclosure.
- `speckit-plan` must include validation strategy, integration checks, risk handling, and stuck-task fallback for complex work.

## Auto-Loop Rules

- `/goal` is the user-facing command; auto-loop is the execution behavior.
- Spec Kit may structure the work, but it must not override DoD requirements.
- Task checkboxes are not proof of completion without validation evidence.
- If implementation appears unusually fast for multi-file, integration, or cross-repo work, the final report must explain why the work was genuinely small or already validated.
- If a command or approach fails twice, the agent must inspect logs, change strategy, isolate the failure, reduce scope, or document a proven blocker.

## Completion

Spec Kit work is complete only when the final report lists files changed, commands run, tests run, validation results, errors, fixes, unverified items, remaining risks, and DoD status.
