# SeaBridgeAI Knowledge Architecture

Status: accepted; updated 2026-09-29. Machine-readable contract:
`config/knowledge-sources.json`, validated by `schemas/knowledge-sources.schema.json`
and `scripts/lib/knowledge-sources.js`. Agents route through the
`knowledge-ops` skill. Freshness: `scripts/knowledge-freshness.js`.

This repository is public. It holds the contract and the tooling, never
confidential knowledge; platform store details and open hardening items live in
the private product repositories.

## Capability

Every coding agent, the platform, and the operator can tell, for any piece of
information, where it lives, who may read and write it, whether it may contain
customer data, whether it is a source of truth or a rebuildable view, and
whether a generated view is stale. There is no single knowledge database; each
store keeps one job, and the registry states it once.

## Layers

| Layer | Holds | Authority | Tenant data |
| --- | --- | --- | --- |
| Repository `AGENTS.md`, `docs/`, ECC skills | Engineering rules, standards, ADRs, API contracts, runbooks | canonical, governed | forbidden |
| Repository source code | What the software does, at a commit | canonical, governed | forbidden |
| ECC Memory Vault | Coding-agent handoffs, discoveries, pending decisions, resumable context, working preferences | canonical, always unreviewed | forbidden |
| Operator wiki (private workspace git repo) | Business knowledge, research notes, internal decisions | canonical; pages cite their sources | forbidden |
| Obsidian | A viewer over the operator wiki and the generated code vaults | interface, owns nothing | forbidden |
| GitHub issues and PRs | Active work and review state | canonical, not durable knowledge | forbidden |
| Platform stores (tenant documents, product records, agent memory) | Customer data | canonical | required, tenant-filtered |
| Platform projections (document trees, sustainability graph) | Rebuildable views of platform stores | projection | required |
| Graphify | Code relationships per repo | projection of source code | forbidden |
| FalkorDB | Optional query index over Graphify | projection of Graphify, read-only for agents | forbidden |
| Harness memory (Claude auto-memory and similar) | Harness-private convenience copies | cache, owns nothing | forbidden |

Retired: GBrain (2026-09-29), the ECC `knowledge-vault/` folder, the generic MCP
memory server, and `agentic-stack/falkordb_etl.py`. The registry marks each
`deprecated` with no writers, so nothing routes to them.

## Rules

1. **One home per information type.** Each type is owned by exactly one active
   source; the validator rejects a second owner. Interfaces and caches own none.
2. **Customer data stays in the platform.** Only `mongodb` stores may declare
   `tenantData: "required"`, and they must name the isolation key every read
   filters on. Agent memory, the wiki, Obsidian, Markdown folders, code graphs,
   harness memory, git, and the issue tracker are tenant-forbidden by store kind
   in code, so no JSON flag can relax the rule.
3. **Coding agents never read tenant stores.** Tenant sources declare
   `agentAccess: "none"`.
4. **Projections are rebuildable and read-only for agents**, and name the sources
   they are rebuilt from.
5. **Shared trust states:** `unreviewed` → `verified` → `governed`, with
   `superseded` at any point. Only version-controlled content can be governed.
   Memory Vault entries stay `unreviewed` until promoted into governed docs.
6. **Observed state, not configuration.** Each source records `state.status`
   with the date and evidence it was observed.
7. **Locations are logical**: `repo:path`, `~/path`; never an absolute machine
   path or a connection string.
8. **No raw transcripts, secrets, or `.env` content anywhere.**

## Where does it go

`routeInformationType(registry, type, { containsTenantData })` answers this and
refuses, rather than falling back, when customer data would cross the boundary.

| Information | Goes to |
| --- | --- |
| A handoff, discovery, preference, or resumable task context | ECC Memory Vault (user scope on this machine) |
| A company, person, relationship, meeting, research note, or internal decision | Operator wiki |
| A coding standard, rule, ADR, API contract, or runbook | Governed repository docs |
| A tenant's document, a product user's preference, an agent correction | The platform, tenant-scoped |
| Who calls what in the code | Graphify (FalkorDB when loaded) |
| What someone is working on now | GitHub issue or PR |

## Read order

Measured, not assumed (see the cost report below): grep and read the source
for targeted code lookups; use a budgeted `graphify query` or `graphify
affected` for relationship and impact questions; skim `GRAPH_REPORT.md` only to
orient; start business and decision questions at the operator wiki's
`index.md`. Check freshness first; stale output is rebuilt or bypassed, never
used silently.

```bash
node scripts/knowledge-freshness.js graphs <repo>...   # FRESH / STALE / MISSING / UNKNOWN
node scripts/knowledge-freshness.js wiki <workspace>   # stale pages, missing sources, unindexed pages
```

## Code graphs

- **Tool:** Graphify from PyPI `graphifyy` (upstream Graphify-Labs/graphify),
  installed with pipx and pinned to an exact version. Only the local
  tree-sitter pass is used (`graphify update`): no LLM, no API key, content-hash
  cached. `graph.json` embeds `built_at_commit`.
- **Build:** `node scripts/knowledge-freshness.js build <repo>` runs
  `graphify update` and writes `graphify-out/BUILD_INFO.json` (source commit,
  dirty flag, build time, Graphify version). It fails before Graphify starts if
  `.graphifyignore` is missing any required privacy exclusion.
- **Automatic rebuilds:** `scripts/git-hooks/graphify-rebuild.sh` installed as
  `post-commit` and `post-checkout` (installed in manageesg-backend and
  autoresearch). It rebuilds only in a repo's main checkout (never from a
  linked worktree), only after code changes or a branch switch that moves
  HEAD, and refuses to build unless `.graphifyignore` carries the complete
  knowledge boundary (the marker alone is insufficient). After a commit it
  re-extracts only the changed files, which
  measured 2 to 3 times faster than `graphify update`, and writes
  `BUILD_INFO.json`.
- **Boundary:** each repo's `.graphifyignore` excludes reports, artifacts, logs,
  local data, site-packages, `_upstream/`, `references/`, and vendored code,
  because reports and artifacts can quote customer data.
- **FalkorDB (optional):** the backend loader
  `scripts/graph/load_all_repos_to_falkordb.py` loads each repo's graph in
  batches and writes a `GraphMeta` node with the source commit, build time, and
  Graphify version. Verify with `agentic-stack/falkordb_smoke.py`. The image
  and the MCP server are pinned by version.
- **Obsidian view:** on demand, per repo:
  `graphify export obsidian --graph graphify-out/graph.json --dir graphify-out/obsidian`.
  It is generated (openseabri: 4,687 notes, 9.1 MB, 19 s), overwritten on each
  export, and never edited or committed; the backend graph would be roughly 20
  times larger, so export only the repo being studied.

## Operator wiki

The SeaBridgeAI workspace folder is a local git repository with no remote. It
follows the Karpathy LLM-wiki pattern: raw sources stay the truth; pages under
`wiki/` are syntheses with `updated:` and `sources:`; `index.md` is read first;
`log.md` is append-only; the workspace `AGENTS.md` (Wiki) holds the rules. A
plain Markdown wiki was chosen over Graphify's document mode, which needs an
LLM pass per document; see `docs/reports/knowledge/2026-09-29-knowledge-cost-efficiency.md`.

## Decisions

- 2026-09-28: registry and router adopted; `knowledge-vault/` retired; the
  backend FalkorDB loader is the only loader; Obsidian decision notes moved out
  of the unversioned vault.
- 2026-09-29: GBrain removed from every config, wrapper, submodule, and doc.
  The operator wiki (private) owns business knowledge; the decision notes moved
  there because this repository is public. Graphify, FalkorDB, and Obsidian
  upgraded and pinned.

## Operator actions

Agents do not delete data, folders, or repositories, and do not push where no
approval covers it. These are prepared for the operator; each lists its
rollback.

1. **GBrain data.** Stop any GBrain process, then in PowerShell:

   ```powershell
   robocopy "$HOME\.gbrain" E:\gbrain-archive\gbrain-2026-09-29 /E /COPY:DAT /R:1 /W:1
   $src = (Get-ChildItem -Recurse -File -Force "$HOME\.gbrain" | Measure-Object Length -Sum).Sum
   $dst = (Get-ChildItem -Recurse -File -Force E:\gbrain-archive\gbrain-2026-09-29 | Measure-Object Length -Sum).Sum
   if ($src -ne $dst) { throw "backup size mismatch: $src vs $dst" }
   Remove-Item -Recurse -Force "$HOME\.gbrain"
   bun remove -g gbrain
   ```

   Rollback: `robocopy E:\gbrain-archive\gbrain-2026-09-29 "$HOME\.gbrain" /E`
   and `bun add -g gbrain@0.22.4`.
2. **Retired folders in this repository:**
   `git rm -r knowledge-vault skills/gbrain .agents/skills/gbrain` and commit.
   The `references/gbrain` clone left on disk by the removed submodule can then
   be deleted. Rollback: `git revert <commit>`.
3. **Old FalkorDB container and image** (after the new one has run cleanly):
   `docker rm falkordb-old-v4.18.1` and `docker image rm d6aa9598b79c`.
   Rollback before removal: `docker stop falkordb; docker rename falkordb
   falkordb-v4.20.7; docker rename falkordb-old-v4.18.1 falkordb; docker start
   falkordb`. The pre-upgrade data copy is `E:\falkordb-backup\falkordb-data-2026-09-29`.
4. **Optional graph hooks:** the knowledge boundaries are on the normal branches
   of backend, frontend, OpenSeaBri, autoresearch, CLIMADA, and ECC. Install the
   current `scripts/git-hooks/graphify-rebuild.sh` as `post-commit` and
   `post-checkout` only in a main checkout that should maintain a local graph;
   the hook never runs from linked worktrees and validates the full boundary.
5. **Obsidian installer shell:** the app package is 1.13.7 via the official
   auto-update; the machine-wide installer shell (1.12.7) updates with an
   elevated `winget upgrade --id Obsidian.Obsidian --exact`.
