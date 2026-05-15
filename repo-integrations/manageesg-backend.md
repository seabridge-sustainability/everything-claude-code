# manageesg-backend Integration

Path: `C:\Users\adelm\SeaBridgeAI\manageesg-backend`

Use local `AGENTS.md`, `CLAUDE.md`, and backend AI docs first. Then load ECC
skills from this repository.

## Required Repo Baseline

- Structure: `app/` FastAPI app, `seabridge_ai/` AI package, `tests/`, `docs/`, `agent-tooling/`.
- Dev startup: `.\venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000` or documented repo wrapper when present.
- Tests: `python -m pytest --no-cov tests` for focused/full backend pytest; use narrower test paths for targeted checks.
- Lint/typecheck: `python -m compileall app seabridge_ai/src/sustainability_ai/ai_agents/autoresearch`; use `mypy app/` where configured.
- Browser/tooling checks: `npm run browser:local` for repo-local browser automation.
- Lessons and recurring issues: local `AGENTS.md`, `CLAUDE.md`, `AGENTS_SYSTEM.md`, `seabridge_ai/docs/`, and ECC agentic-stack memory.
- Reports/logs/artifacts: `docs/reports`, `logs`, `test-results`, or `artifacts/agent-runs`; never repo root.

Default skills:

- `sea-senior-dev-workflow`
- `sea-backend-api-verification`
- `sea-ai-data-integrity`
- `sea-sustainability-domain-review`
- `sea-cross-repo-handoff` for OpenSeaBri/frontend/ECC changes

Backend-specific gates:

- Verify FastAPI route registration.
- Verify request/response schemas.
- Verify MongoDB/SQL source and tenant isolation.
- Do not invent sustainability data.
- Do not run paid/live provider calls without approval.
- Rebuild graphify after backend code edits when repo instructions require it.
