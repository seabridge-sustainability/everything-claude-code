# Copilot Spec Kit Adapter

GitHub Copilot environments without native slash-command support should expose
Spec Kit as callable AGENTS.md workflow sections using these names:

- `speckit-constitution`
- `speckit-specify`
- `speckit-clarify`
- `speckit-plan`
- `speckit-tasks`
- `speckit-analyze`
- `speckit-checklist`
- `speckit-implement`
- `speckit-taskstoissues`

When prompt files are supported, map `/speckit.<command>` to the canonical
SeaBridgeAI skill body and retain all approval gates.
