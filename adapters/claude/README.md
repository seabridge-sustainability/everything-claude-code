# Claude Spec Kit Adapter

Use the curated SeaBridgeAI Spec Kit skills through either slash-style aliases or
skill names:

- `/speckit.constitution` or `/speckit-constitution`
- `/speckit.specify` or `/speckit-specify`
- `/speckit.clarify` or `/speckit-clarify`
- `/speckit.plan` or `/speckit-plan`
- `/speckit.tasks` or `/speckit-tasks`
- `/speckit.analyze` or `/speckit-analyze`
- `/speckit.checklist` or `/speckit-checklist`
- `/speckit.implement` or `/speckit-implement`
- `/speckit.taskstoissues` or `/speckit-taskstoissues`

Claude Code installations may copy wrappers to `.claude/skills/speckit-*`.
The wrapper must point back to `skills/spec-kit/*/SKILL.md`; do not copy the
canonical body into product repos.
