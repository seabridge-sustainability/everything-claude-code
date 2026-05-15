# _upstream Integration

Path: `C:\Users\adelm\SeaBridgeAI\_upstream`

This area holds pinned/open-source mirrors and experiments. Treat upstream repos
as separate projects unless a task explicitly asks to modify a mirror.

## Required Repo Baseline

- Structure: one subdirectory per upstream mirror or experiment; do not merge mirrors together.
- Dev startup/build/test/lint/typecheck: use the specific upstream mirror's own README/package scripts after inspecting that mirror.
- Lessons and recurring issues: local `_upstream` `AGENTS.md`, `CLAUDE.md`, `AGENTS_SYSTEM.md`, mirror-specific docs, and ECC agentic-stack memory.
- Reports/logs/artifacts: `docs/reports`, `logs`, `test-results`, or `artifacts/agent-runs`; never `_upstream` root.

Default skills:

- `sea-senior-dev-workflow`
- `sea-context-hygiene`
- `sea-cross-repo-handoff`
- `sea-skill-creator-protocol` when extracting reusable lessons

Upstream-specific gates:

- Do not mutate upstream mirrors casually.
- Keep local patches documented.
- Do not merge upstream code into product repos without review.
- For reusable patterns, document in ECC instead of copying into every repo.
