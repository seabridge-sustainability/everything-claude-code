---
name: graphify-sourcecode
description: Graphify — build, update, and query a source-code knowledge graph (AST-only, no LLM cost) for any SeaBridgeAI repo. Use before broad architecture/refactor questions, or after code changes to keep the graph current. Not the personal `graphify` tool in user-global skills (Obsidian-vault knowledge graphs from arbitrary input) — same underlying CLI name, unrelated skill.
triggers:
  - "graphify sourcecode"
  - "source code graph"
  - "knowledge graph"
  - "graph.json"
  - "build-graphs"
  - "query-graph"
  - "code graph"
---

# Skill: graphify-sourcecode — Source-Code Knowledge Graph

## What this skill covers

Graphify (`C:\Users\adelm\SeaBridgeAI\autoresearch\graphify\`) parses a repo's
source into an AST-derived graph (`graph.json`) plus a human-readable
`GRAPH_REPORT.md`, without calling any LLM. Each product repo has its own
`graphify-out/` (backend, frontend, ECC); the autoresearch repo's own graph
lives at `graphify/output/` to keep the tool and its own output together.

Entry point: `graphify` console script (`graphify.__main__:main`, installed via
`pip install -e .` inside `autoresearch/graphify/`). The CLI command itself is
still literally named `graphify` — only this skill's name is disambiguated, to
avoid colliding with an unrelated personal knowledge-graph tool of the same
name in user-global skills.

---

## Usage

### Via orchestrator (preferred — handles PYTHONPATH and output dirs)

```powershell
# Build/rebuild the graph for one repo or all of them
.\co-scientist-orchestrator.ps1 -Action build-graphs -RepoName backend
.\co-scientist-orchestrator.ps1 -Action build-graphs -RepoName frontend
.\co-scientist-orchestrator.ps1 -Action build-graphs -RepoName ecc
.\co-scientist-orchestrator.ps1 -Action build-graphs -RepoName autoresearch
.\co-scientist-orchestrator.ps1 -Action build-graphs -RepoName all      # default if -RepoName omitted
.\co-scientist-orchestrator.ps1 -Action build-graphs -RepoName all -DryRun

# Query an existing graph (defaults to the autoresearch repo's own graph)
.\co-scientist-orchestrator.ps1 -Action query-graph -Query "show AI manager handoff flow"

# Load a graph into FalkorDB (MERGE-only — never clears existing graph data)
.\co-scientist-orchestrator.ps1 -Action load-falkordb -GraphName backend
.\co-scientist-orchestrator.ps1 -Action load-falkordb -GraphName backend -FalkorDryRun
```

Note: `build-graphs` has no dedicated `graphify build` CLI subcommand — the
orchestrator calls graphify's Python API directly (`detect` → `extract`
(AST-only, `use_llm=False`) → `build_from_json` → `cluster`/`score_all` →
`generate` report → `export.to_json`). This is why the orchestrator wrapper is
preferred over guessing a CLI flag.

### Direct CLI (after `graphify update .` or an existing `graph.json`)

```bash
graphify query "show the auth flow" --graph graphify-out/graph.json
graphify query "what connects DigestAuth to Response?" --graph graphify-out/graph.json
graphify query "..." --dfs                 # trace a specific path instead of a subgraph
graphify query "..." --budget 1500         # cap output at N tokens
graphify update .                          # incremental update after code changes (AST-only, no API cost)
```

Slash-command form inside an assistant session (if the graphify hook/IDE
integration is active): `/graphify query "..."`, `/graphify path "A" "B"`,
`/graphify explain "SomeSymbol"`, `/graphify ./raw --watch` (auto-sync as
files change).

---

## When to use it

- Before broad architecture, cross-module, or "how does X connect to Y"
  questions — read `graphify-out/GRAPH_REPORT.md` first for the high-level
  overview, then `graphify query` for a focused subgraph instead of dumping
  raw files into context.
- After modifying code files in a repo that has a graph, run
  `graphify update .` (or rerun `build-graphs` for that repo) to keep it
  current — this is AST-only and has no LLM cost.
- If `graphify-out/wiki/index.md` exists for a repo, navigate that instead of
  raw source for orientation.

---

## FalkorDB loading

`load_to_falkordb.py` (in `autoresearch/graphify/`) loads a `graph.json` into a
named FalkorDB graph via `--graph-json`, `--graph-name`, `--host`, `--port`,
and `--dry-run`. The loader is **MERGE-only** — it never clears existing graph
data. Do not clear graph data without explicit written approval and exact
target confirmation, per the SeaBridgeAI safety rule.

---

## Related skills

- `co-scientist-orchestrator` — the top-level dispatcher this skill's commands
  route through.
- Product-repo `AGENTS.md`/`AGENTS_SYSTEM.md` files reference `graphify-out/`
  directly for architecture questions; this skill is the command reference for
  building/updating it.
