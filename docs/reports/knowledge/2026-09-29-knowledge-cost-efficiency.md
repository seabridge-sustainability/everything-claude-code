# Knowledge tooling cost efficiency

Date: 2026-09-29. Scope: Graphify code graphs, the FalkorDB index, the operator
wiki, and always-loaded MCP servers for SeaBridgeAI coding agents. Everything
below was measured on this machine unless it cites a source; nothing here
repeats a vendor claim as a result.

## Method

- Five repos built from clean worktrees at their remote tips with
  `graphifyy==0.9.71` (`graphify update`, local tree-sitter pass, no LLM, all
  LLM API keys removed from the environment). Each repo was built three ways:
  clean (no cache), again with no change, and after appending one line to one
  code file.
- Token cost per question: a fresh `general-purpose` subagent on one model
  (Sonnet) answered each question under one condition; the harness reports its
  total tokens. A control agent that did no work cost **49,981 tokens**, the
  fixed overhead of any subagent; the tables report the marginal cost above it.
- Correctness was graded against the known answer. "Partial" means the answer
  was right but inferred rather than confirmed in the source.

## Build cost and graph size

| Repo | Clean build | No-change rebuild | One-file change | Nodes | Edges | Markdown nodes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| manageesg-backend | 414 s (contended) | 406 s | 523 s | 91,703 | 253,903 | 6,710 |
| everything-claude-code | 187 s | 192 s | 121 s | 57,019 | 77,278 | 38,976 |
| everything-claude-code, translated docs excluded | 125 s | | | 35,756 | 56,682 | 17,714 |
| manageesg-frontend | 103 s | 71 s | 93 s | 11,001 | 33,123 | 102 |
| openseabri | 18 s | 19 s | 18 s | 4,386 | 8,025 | 1,420 |
| autoresearch | 5 s | 3 s | 1 s | 288 | 367 | 110 |

The backend clean build overlapped four rebuilds started by the old backend
hook (below), so its clean time is an upper bound.

Before the knowledge boundary was added to `.graphifyignore` (reports,
artifacts, logs, vendored and upstream code), the same builds produced:
autoresearch 11,810 nodes (vendored `strix/` and `paper2agent-suite/` were
99% of it), OpenSeaBri 5,953 nodes (including 1,324 stale nodes carrying
absolute machine paths, merged from graphify cache files committed to git), and
the backend 131,319 nodes from 7,903 files.

Findings:

- **The boundary is the largest saving.** It cut autoresearch by 98% and removed
  report files that can quote customer data.
- **`graphify update` barely benefits from its cache on large repos.** A
  no-change rebuild cost 70 to 100% of a clean build, because clustering and
  report generation run over the whole graph every time.
  Passing the changed files to Graphify's incremental path
  (`graphify.watch._rebuild_code(changed_paths=...)`, the call Graphify's own
  hook makes) took 35 s instead of 93 s on the frontend and 275 s instead of
  523 s on the backend. The SeaBridgeAI hook now uses it.
- **The old backend hook was the most expensive thing measured.** At one point
  four full rebuilds of the backend main checkout ran at once, each over 35
  minutes of CPU, started by commits in other sessions' worktrees and running
  a vendored Graphify 0.3.17. They were stopped and the hook replaced.
- **Translated doc mirrors dominate the ECC graph.** 38,976 of 57,019 ECC nodes
  came from Markdown, most of it `docs/<locale>/` copies of the English docs.
  Excluding the 13 `docs/<locale>/` folders cut the ECC graph by 37% (57,019
  to 35,756 nodes) and its build from 187 s to 125 s.
- **Committed graphify caches poison rebuilds.** OpenSeaBri and ECC track
  `graphify-out/.graphify_*.json`; a rebuild merged their stale nodes. Generated
  graph files belong out of git; the freshness metadata (`built_at_commit`,
  `BUILD_INFO.json`) replaces the need to commit them.

## Token cost per question

| Question | A: grep and read | B: `graphify query --budget 2000` first | C: full `GRAPH_REPORT.md` first |
| --- | --- | --- | --- |
| Frontend: which file defines the sustainability graph client, and who calls `getRelatedItems`? | +768, correct (cited the call line) | +3,534, partial (caller inferred from a community) | +30,704, partial |
| OpenSeaBri: where is the MCP server list, and how does nanobot start? | +4,206, correct | +6,006, correct | +24,059, correct |
| Backend impact: what changes if Structured RAG's `_source_identity` changes? | +22,951, partial: all 4 direct callers, 2 of 3 entry points, no false positives (22 tool calls) | +8,058, partial: all 4 direct callers and 3 entry points, 6 false positives; the graph did not resolve the private symbol, so the agent fell back to import search (7 tool calls) | not attempted: the backend report is about 171k tokens |
| Wiki: what was decided about DocuSeal, and what does the backend own? | +2,478, correct (searched two folders) | +2,845, correct, via `index.md` (3 tool calls instead of 4, 12 s instead of 15 s) | n/a |

`GRAPH_REPORT.md` sizes: OpenSeaBri about 18k tokens, frontend about 27k,
ECC about 127k, and the backend about 171k (larger than most context windows).

Findings:

- **For targeted lookups, grep is cheapest and most accurate.** Reading the whole
  report first cost 6 to 40 times more marginal tokens and gave weaker evidence.
- **A budgeted graph query costs a little more than grep** (+1.8k to +2.8k) and
  sometimes answers from structure instead of the code; confirm in the source.
- **The wiki index pays off in steps, not tokens**, at the current size (13
  pages). It scales better as pages grow because the index stays one read.
- The vendor's "71.5x fewer tokens" figure (graphify 0.4.x README, one 52-file
  corpus) is not reproduced here and is no longer claimed in its current README.
  Its own benchmark reports a coverage gain at about 140k tokens per query.

## MCP tool-schema overhead

- Measured configuration: no user-level MCP servers for Claude Code; Codex has
  one (`node_repl`). Repo `.mcp.json` files define at most three servers
  (OpenSeaBri: FalkorDB, GitNexus, designlang); backend, frontend, and
  autoresearch define none.
- Source: Anthropic, "Advanced tool use" (2025-11-24) measured tool definitions
  at about 26k tokens for a 35-tool GitHub server and about 55k for 58 tools, and
  an 85% reduction with tool search. Claude Code defers MCP tool schemas behind
  tool search by default (Claude Code MCP docs).
- Retired servers still listed as enabled were removed: `gbrain` (ECC and
  backend local settings) and the retired `memory` server (ECC).

## Adopted

1. Knowledge boundary in every repo's `.graphifyignore`, enforced by the hook
   (fail closed).
2. One Graphify install, pinned (`graphifyy==0.9.71`), AST only; no LLM for code.
3. Hooks rebuild only in a repo's main checkout, never from worktrees (the old
   backend hook rebuilt the main checkout after every worktree commit, and the
   autoresearch hook pointed at a script that does not exist).
4. Freshness metadata (`built_at_commit`, `BUILD_INFO.json`, FalkorDB
   `GraphMeta`) and `scripts/knowledge-freshness.js`; stale output is flagged.
5. Read order from the measurements: grep for targeted lookups, a budgeted
   query or `affected` for relationships, the report only to orient, the wiki
   index for business and decisions.
6. FalkorDB loads in batches (it was one query per node and per edge).
7. Plain Markdown operator wiki in git instead of Graphify's document mode: the
   document mode needs an LLM pass per document (Graphify README: docs "use
   your assistant's model, or a configured API key"), the wiki needs none, and
   its pages cite their sources.

## Rejected or deferred

- Reading `GRAPH_REPORT.md` in full as a first step: measured as the most
  expensive option.
- Graphify document mode and LLM community labels: they cost LLM calls with no
  measured accuracy gain here. If prose extraction is ever wanted, use the
  local Ollama model (`graphify extract --backend ollama`), never a cloud
  model, and measure it first; any paid call needs the operator's approval.
- Refresh on a timer: rebuilds follow repo activity through the hooks, and
  `knowledge-freshness.js graphs` flags anything stale on read.

## Sources

- Graphify: <https://github.com/Graphify-Labs/graphify> (CHANGELOG, README,
  BENCHMARKS.md); PyPI `graphifyy` <https://pypi.org/project/graphifyy/>
- Andrej Karpathy, LLM wiki: <https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>
- Anthropic, Advanced tool use: <https://www.anthropic.com/engineering/advanced-tool-use>
- Anthropic, Code execution with MCP: <https://www.anthropic.com/engineering/code-execution-with-mcp>
- Claude Code MCP docs: <https://code.claude.com/docs/en/mcp>
- LocAgent (ACL 2025), graph-guided code localization: <https://arxiv.org/abs/2503.09089>
