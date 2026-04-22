# Personal Preferences — SeaBridgeAI

> Shared across backend, frontend, ECC, and autoresearch repos. Loaded at
> session start by any harness (Claude Code, Codex, Gemini CLI, Cursor,
> Antigravity, etc.) that mounts this portable brain.

## Identity
- Owner: Alejandro Delmar (adelmar@seabridgesustainability.com)
- Project: **SeaBridgeAI** (the backend repo is named `manageesg-backend` for historical reasons — always refer to the project as SeaBridgeAI)

## Code style
- Python (backend + AI agents): PEP 8, type annotations on all function signatures, `black` + `isort` + `flake8`. Use `loguru` for logging, never `print()`. Pydantic v2 for all schemas. Beanie ODM for MongoDB models.
- TypeScript (frontend): Next.js 14+ App Router, React Server Components first, strict mode, no `any`. Tailwind for styling.
- Commit style: Conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, `perf:`, `ci:`). Attribution disabled globally.

## Workflow
- TDD: write tests first (pytest for Python, Vitest/Jest for TS). 80%+ coverage minimum.
- Plan before complex work — use `planner` agent or `/plan` command. Berry MCP for hallucination detection during planning.
- Code review after every change: `code-reviewer` agent for all code, `security-reviewer` for auth/user-input/API endpoints.
- Prefer small focused PRs. Conventional commits.
- Run recall before: deploy, migration, schema change, timestamp/timezone work, failing tests, root-cause debugging, refactors.

## Constraints
- Primary stack: Python 3.12 + FastAPI + MongoDB (Motor/Beanie) + Redis + Celery (backend); Next.js + TypeScript (frontend).
- AI/ML: LangChain / LangGraph / MCP; Anthropic + OpenAI; `seabridge_ai/` is a separate `uv`-managed Python package (never add AI deps to backend `requirements.txt`).
- Cloud: AWS (S3, SES, Cognito). Secrets always via env vars, never hardcoded.
- Hard safety rules (non-suspendable): see `AGENTS_SYSTEM.md` Tier-1 / `CLAUDE.md` §Safety. Never authorize deletion of repos, source folders, databases, or infrastructure. No paid API calls without explicit written approval.

## Communication
- Be direct. Surface tradeoffs, don't hide them.
- For exploratory questions ("what could we do about X?"), respond with 2-3 sentences, a recommendation, and the main tradeoff. Don't implement until approval.
- End-of-turn summaries: one or two sentences. Terse is good, silent is bad.
- Match response depth to task complexity; don't over-plan trivial work.

## Retrieval order (for any non-trivial task)
1. Local project files (`CLAUDE.md`, `seabridge_ai/docs/*`, component docs)
2. ECC governing instructions (`C:\Users\adelm\SeaBridgeAI\everything-claude-code\CLAUDE.md`)
3. ECC skills (`~/.claude/skills/`) + agentic-stack `.agent/skills/`
4. ECC `chub` context hub
5. Context7 — third-party libraries/frameworks/SDKs only
6. Web search — last resort
