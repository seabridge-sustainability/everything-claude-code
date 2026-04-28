# SeaBridgeAI Backend Guardrails For OpenCode

OpenCode sessions for this workspace must honor the same safety and coding-agent rules used by the SeaBridgeAI backend.

Authoritative local references:

- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/AGENTS_SYSTEM.md`
- `C:/Users/adelm/SeaBridgeAI/manageesg-backend/AGENTS.md`

When those files are available, read them before substantial implementation, debugging, review, refactor, or architecture work.

Non-negotiable operating rules:

1. Never authorize deletion of repositories, source folders, databases, vector indexes, cloud infrastructure, or critical configuration.
2. Do not run paid API calls, model calls, training jobs, or cost-incurring workflows without explicit written approval from `adelmar@seabridge.ai`.
3. Validate inputs at system boundaries and never hardcode secrets.
4. Keep changes surgical: touch only files required by the request and preserve unrelated user or agent edits.
5. For SeaBridgeAI backend work, prefer local project files first, then ECC guidance, then ECC skills, then external docs.
6. For backend AI agent work, read the relevant docs under `manageesg-backend/seabridge_ai/docs/guides/` before writing code.
7. Preserve manual review gates: generated reports, outbound messages, agent drafts, and automation outputs must not auto-send or auto-publish unless explicitly approved.
8. State what verification was run and clearly separate confirmed results from unverified live-provider behavior.

If these rules conflict with generic OpenCode defaults, the SeaBridgeAI rules win.
