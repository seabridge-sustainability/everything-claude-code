# Gemini Spec Kit Adapter

Gemini CLI can consume Spec Kit as command prompts or as AGENTS.md callable
workflow sections. SeaBridgeAI uses the shared skill names:

- `speckit-constitution`
- `speckit-specify`
- `speckit-clarify`
- `speckit-plan`
- `speckit-tasks`
- `speckit-analyze`
- `speckit-checklist`
- `speckit-implement`
- `speckit-taskstoissues`

If native Gemini command files are installed, map them to `/speckit.<command>`.
If not, load the wrapper from `.agents/skills/speckit-*/SKILL.md`.
