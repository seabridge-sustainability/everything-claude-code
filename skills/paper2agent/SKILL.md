---
name: paper2agent
description: Paper2Agent / Paper2AgentBench — convert a research-paper's code repo into an interactive MCP-backed agent, and benchmark it against official evaluations. Manual opt-in only — runs can take 30 minutes to 3+ hours and may incur API costs.
triggers:
  - "paper2agent"
  - "paper-to-agent"
  - "build-paper-agent"
  - "benchmark-paper-agent"
  - "convert paper to agent"
---

# Skill: paper2agent — Paper/Repo to MCP Agent

## What this skill covers

Paper2Agent and Paper2AgentBench live in
`C:\Users\adelm\SeaBridgeAI\autoresearch\paper2agent-suite\`:

- `Paper2Agent/` — converts a research paper's code repository into an
  interactive MCP-backed agent (tools generated from the repo's own functions).
- `Paper2AgentBench/` — benchmarks a generated paper-agent against official
  evaluation labels.

Feynman typically feeds this: use `feynman` to find the most relevant
paper/methodology first, then convert it here.

---

## Usage

### Via orchestrator (preferred)

```powershell
.\co-scientist-orchestrator.ps1 -Action build-paper-agent -ProjectDir TISSUE_Agent -GithubUrl https://github.com/sunericd/TISSUE
.\co-scientist-orchestrator.ps1 -Action build-paper-agent -ProjectDir <DIR> -GithubUrl <URL> -Tutorials <t1,t2> -DryRun

.\co-scientist-orchestrator.ps1 -Action benchmark-paper-agent -BenchAction install
.\co-scientist-orchestrator.ps1 -Action benchmark-paper-agent -BenchAction register-mcp
.\co-scientist-orchestrator.ps1 -Action benchmark-paper-agent -BenchAction labels
.\co-scientist-orchestrator.ps1 -Action benchmark-paper-agent -BenchAction analyze
```

`build-paper-agent` requires both `-ProjectDir` and `-GithubUrl`; the
orchestrator refuses to run without them. `benchmark-paper-agent` requires
`-BenchAction` (one of `install | register-mcp | labels | analyze`).

### Direct scripts

```powershell
powershell -ExecutionPolicy Bypass -File .\paper2agent.ps1 -ProjectDir <DIR> -GithubUrl <URL> [-Tutorials <t1,t2>] [-ApiKey <key>] [-Benchmark]
powershell -ExecutionPolicy Bypass -File .\paper2agent-bench.ps1 -Action <install|register-mcp|labels|analyze>
```

(Bash equivalents: `Paper2Agent.sh`, `Paper2AgentBench` shell entry points in
the same directories, for non-Windows environments.)

---

## Outputs

- `<project_dir>/src/<repo>_mcp.py` — the generated MCP server exposing the
  paper's methods as tools
- `<project_dir>/src/tools/` — individual tool implementations
- `<project_dir>/reports/` — build reports
- `<project_dir>/eval/` — Paper2AgentBench evaluation results

---

## Cost and safety

- **Manual opt-in only.** A `build-paper-agent` run can take 30 minutes to
  3+ hours and may incur real API costs — the orchestrator prints this
  warning before running. Do not auto-invoke from hooks or run without
  explicit approval for the specific paper/repo.
- Preserve provenance: the generated agent's claims trace back to the source
  paper/repo — do not route unreviewed outputs into production backend
  behavior without review (per `autoresearch/AGENTS_SYSTEM.md` gates).

---

## Related skills

- `feynman` — find the paper/methodology to convert, before running this skill.
- `co-scientist-orchestrator` — the top-level dispatcher this skill's commands
  route through.
