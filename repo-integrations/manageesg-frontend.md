# manageesg-frontend Integration

Path: `C:\Users\adelm\SeaBridgeAI\manageesg-frontend`

Use local repo instructions first, then ECC skills.

## Required Repo Baseline

- Structure: `src/app`, `src/components`, `src/lib`, `src/hooks`, `src/types`, `e2e`, `docs`.
- Dev startup: `npm run dev`; raw fallback `npm run dev:raw`.
- Build: `npm run build`.
- Tests: `npm run test`; browser/E2E `npm run test:e2e`.
- Lint/typecheck: `npm run lint`; production build also verifies Next/TypeScript constraints.
- Lessons and recurring issues: local `AGENTS.md`, `CLAUDE.md`, `AGENTS_SYSTEM.md`, graphify notes, and ECC agentic-stack memory.
- Reports/logs/artifacts: `docs/reports`, `logs`, `test-results`, or `artifacts/agent-runs`; never repo root.

Default skills:

- `sea-frontend-design`
- `sea-backend-api-verification`
- `sea-ai-data-integrity` for AI/advisor surfaces
- `sea-cross-repo-handoff` for backend contracts

Frontend-specific gates:

- Verify route/menu visibility.
- Verify endpoint exists before claiming data is live.
- No fake metrics or hardcoded mock values outside explicit demo mode.
- Filters must update cards, charts, tables, and summaries consistently.
- Empty/error/loading states must be visible and useful.
