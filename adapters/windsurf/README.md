# Windsurf Spec Kit Adapter

Windsurf can expose Spec Kit as workflows under `.windsurf/workflows` or as
skills when supported. Map workflows to:

- `/speckit.constitution`
- `/speckit.specify`
- `/speckit.clarify`
- `/speckit.plan`
- `/speckit.tasks`
- `/speckit.analyze`
- `/speckit.checklist`
- `/speckit.implement`
- `/speckit.taskstoissues`

Each workflow should load the corresponding canonical ECC skill body.
