# Codex Spec Kit Adapter

Codex invokes skills through `.agents/skills` wrappers:

- `$speckit-constitution`
- `$speckit-specify`
- `$speckit-clarify`
- `$speckit-plan`
- `$speckit-tasks`
- `$speckit-analyze`
- `$speckit-checklist`
- `$speckit-implement`
- `$speckit-taskstoissues`

Install wrappers with `scripts/sync-speckit-skills.ps1 -Agent codex`. Wrappers
must load canonical ECC skill bodies from `skills/spec-kit/*/SKILL.md`.
