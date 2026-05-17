# OpenCode Spec Kit Adapter

OpenCode should expose markdown commands that call the same curated skills:

- `/speckit.constitution`
- `/speckit.specify`
- `/speckit.clarify`
- `/speckit.plan`
- `/speckit.tasks`
- `/speckit.analyze`
- `/speckit.checklist`
- `/speckit.implement`
- `/speckit.taskstoissues`

Install command wrappers with `scripts/sync-speckit-skills.ps1 -Agent opencode`.
Each command should direct the agent to load the canonical ECC skill body.
