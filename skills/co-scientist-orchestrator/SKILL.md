---
name: co-scientist-orchestrator
description: Top-level dispatcher for the SeaBridgeAI research/tooling stack (source-code graphing, Paper2Agent, Feynman, Strix, FalkorDB loading). Start here when unsure which autoresearch tool to invoke, or use the deeper per-tool skill (graphify-sourcecode, paper2agent, feynman, strix) directly once you know which one you need.
triggers:
  - "co-scientist"
  - "co-scientist-orchestrator"
  - "autoresearch stack"
  - "research stack status"
---

# Skill: co-scientist-orchestrator — Research Stack Dispatcher

## What this skill covers

`C:\Users\adelm\SeaBridgeAI\autoresearch\co-scientist-orchestrator.ps1` is the
single entry point for every tool in the autoresearch stack. It resolves repo
paths, sets `PYTHONPATH`, and forwards to the right tool script so you don't
have to construct each tool's invocation by hand.

```powershell
.\co-scientist-orchestrator.ps1 -Action <action> [tool-specific params] [-DryRun]
```

`-Action` is mandatory and one of: `build-graphs | query-graph | load-falkordb |
build-paper-agent | benchmark-paper-agent | run-coscientist | run-feynman |
run-strix | status | help`.

---

## Actions

| Action | Purpose | Deeper skill |
|---|---|---|
| `status` | Print which tools are cloned/missing, whether the Python venv exists, whether an autoresearch graph has been built | this skill |
| `help` | Print full usage and examples | this skill |
| `build-graphs` | Build/rebuild the AST-only source-code knowledge graph for one repo or all | `graphify-sourcecode` |
| `query-graph` | Query an existing graph (`-Query "..."`) | `graphify-sourcecode` |
| `load-falkordb` | Load a `graph.json` into FalkorDB (MERGE-only) | `graphify-sourcecode` |
| `build-paper-agent` | Convert a paper's repo into an MCP-backed agent (`-ProjectDir`, `-GithubUrl`) | `paper2agent` |
| `benchmark-paper-agent` | Benchmark a generated paper-agent (`-BenchAction install\|register-mcp\|labels\|analyze`) | `paper2agent` |
| `run-feynman` | Cited research brief or deep research (`-Task`, optional `-DeepResearch`) | `feynman` |
| `run-strix` | AI pentest scan (`-StrixTarget backend\|frontend\|custom`) | `strix` |
| `run-coscientist` | **Refuses to run.** AI-CoScientist is archived; the script prints an error telling you to use `run-feynman` instead. | — |

`-DryRun` (and `-FalkorDryRun` for `load-falkordb`) prints the command that
would run without executing it — use this to preview before an expensive or
cost-incurring action.

---

## Quick examples

```powershell
.\co-scientist-orchestrator.ps1 -Action status
.\co-scientist-orchestrator.ps1 -Action build-graphs -RepoName all -DryRun
.\co-scientist-orchestrator.ps1 -Action query-graph -Query "show AI manager handoff flow"
.\co-scientist-orchestrator.ps1 -Action load-falkordb -GraphName backend -FalkorDryRun
.\co-scientist-orchestrator.ps1 -Action build-paper-agent -ProjectDir TISSUE_Agent -GithubUrl https://github.com/sunericd/TISSUE
.\co-scientist-orchestrator.ps1 -Action benchmark-paper-agent -BenchAction analyze
.\co-scientist-orchestrator.ps1 -Action run-feynman -Task "What are the latest TNFD disclosure requirements for nature risk?"
.\co-scientist-orchestrator.ps1 -Action run-feynman -Task "Biodiversity net gain methodologies" -DeepResearch
.\co-scientist-orchestrator.ps1 -Action run-strix -StrixTarget backend
```

---

## Related, but not dispatched through this script

- `terrabit` — satellite-embedding similarity search. Has no orchestrator
  action; it's a reference implementation whose feature is separately ported
  into the product frontend/backend. See the `terrabit` skill.
- `sustainability_research.ps1` (`autoresearch/sustainability_research.ps1`,
  see `SUSTAINABILITY_WORKFLOW.md`) — a higher-level Scenario A/B/C runbook
  that itself calls into this orchestrator for ESG-specific research
  sequences. Use it when the task matches one of its documented scenarios;
  otherwise call this orchestrator's actions directly.

---

## Safety

- `AI-CoScientist` (Swarm) is archived — `run-coscientist` deliberately
  refuses to run and redirects to `run-feynman`.
- `build-paper-agent` and `benchmark-paper-agent` can take 30 minutes to
  3+ hours and may incur API costs — confirm explicit approval before running,
  and prefer `-DryRun` first.
- `run-strix` only scans local codebases — never live production — without
  explicit written approval.
- `load-falkordb` is MERGE-only; never clear graph data without explicit
  written approval and exact-target confirmation.
- No action here authorizes paid API calls, live provider calls, GPU training
  jobs, global installs, commits, or pushes beyond what's already approved.
