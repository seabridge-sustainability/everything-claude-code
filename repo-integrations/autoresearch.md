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

## Tool-Specific Skills

Each research tool in this repo has a promoted ECC skill with the exact CLI
commands, flags, and safety notes. Load the smallest one that matches the
task instead of re-deriving commands from source:

- `co-scientist-orchestrator` — the top-level dispatcher (`-Action build-graphs
  | query-graph | load-falkordb | build-paper-agent | benchmark-paper-agent |
  run-coscientist | run-feynman | run-strix | status | help`). Start here when
  unsure which tool to invoke.
- `feynman` — cited research briefs and multi-agent deep research
  (`-Action run-feynman`, optional `-DeepResearch`). Not the same as ECC's
  generic `deep-research` skill.
- `graphify-sourcecode` — build/update/query the source-code knowledge graph
  (`-Action build-graphs`, or direct `graphify`/`graphify query`/`graphify update .`).
  Not the personal `graphify` tool in user-global skills — same underlying CLI
  name, unrelated skill.
- `paper2agent` — convert a research-paper repo into an MCP-backed agent and
  benchmark it (`-Action build-paper-agent` / `benchmark-paper-agent`, or
  direct `paper2agent.ps1` / `paper2agent-bench.ps1`).
- `strix` — autonomous AI pentesting against local backend/frontend
  (`-Action run-strix`, or direct `strix\strix.ps1`).
- `terrabit` — satellite-embedding similarity search already wired into the
  nature-risk frontend/backend; see the skill for extension points.

Full per-tool command reference and troubleshooting also lives in ECC
`docs/tools/ECC_TOOLING_REFERENCE.md`.

## Autoresearch-Specific Gates

- Do not run paid API calls, live provider calls, long-running experiments, GPU training jobs, global installs, commits, or pushes without explicit approval.
- Keep generated paper/research artifacts traceable with provenance.
- Do not route unreviewed research outputs into production backend behavior.
