# autoresearch Integration

Path: `C:\Users\adelm\SeaBridgeAI\autoresearch`

Use local `AGENTS.md`, `CLAUDE.md`, and research-tool docs first. Then load ECC
skills from this repository.

## Required Repo Baseline

- Structure: `feynman/`, `paper2agent-suite/`, `graphify/`, `co-scientist-orchestrator.ps1`, research outputs, and experiment harnesses.
- Dev setup: `uv sync` for Python research environments; `npm run build` inside `feynman/` when changing the TypeScript Feynman package.
- Tests: use the specific tool's local tests; for Feynman changes run its package tests/build where available.
- Lint/typecheck: use the specific subproject's configured commands after inspecting that subproject.
- Local run examples: `.\co-scientist-orchestrator.ps1 -Action run-feynman -Task "<query>"`; Paper2Agent via documented wrapper scripts.
- Lessons and recurring issues: local `AGENTS.md`, `CLAUDE.md`, subproject docs, and ECC agentic-stack memory.
- Reports/logs/artifacts: `docs/reports`, `logs`, `test-results`, or `artifacts/agent-runs`; tool-native outputs stay in documented output folders.

## Default Skills

- `sea-senior-dev-workflow`
- `sea-ai-data-integrity`
- `sea-sustainability-domain-review`
- `sea-cross-repo-handoff`
- `sea-context-hygiene`

## Autoresearch-Specific Gates

- Do not run paid API calls, live provider calls, long-running experiments, GPU training jobs, global installs, commits, or pushes without explicit approval.
- Keep generated paper/research artifacts traceable with provenance.
- Do not route unreviewed research outputs into production backend behavior.
