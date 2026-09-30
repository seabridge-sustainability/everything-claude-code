# SeaBridgeAI Knowledge Architecture

Status: accepted; updated 2026-09-30. Machine-readable contract:
`config/knowledge-sources.json`, validated by `schemas/knowledge-sources.schema.json`
and `scripts/lib/knowledge-sources.js`. Agents route through the
`knowledge-ops` skill. Freshness: `scripts/knowledge-freshness.js`.

This repository is public. It holds routing and safety policy, not a local
operational inventory. Private observed state and host-specific evidence live in
a local-only inventory; platform implementation details and open hardening items
live in the private product repositories.

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
6. **Observed state is private.** The public v2 registry declares intended
   routing and safety policy. The ignored
   `config/knowledge-sources.private.local.json` inventory uses schema
   `seabridge.knowledge-observations.local.v1`, a capture date, and observations
   keyed by public source `id` with `state` and optional `redactedFields`.
   It is never merged into the router or shipped. If absent or stale, treat
   operational status as unverified and inspect the live store under its own
   authorization boundary.
7. **Locations are logical aliases**, never absolute machine paths or connection
   strings. Private operational locations are not merged into the public router.
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
for targeted code lookups; use `node scripts/knowledge-query.js <repo> <symbol>`
for bounded relationship context; start business and decision questions at the operator wiki's
`index.md`. Check freshness first; stale output is rebuilt or bypassed, never
used silently.

```bash
node scripts/knowledge-freshness.js graphs <repo>...   # FRESH / STALE / MISSING / UNKNOWN
node scripts/knowledge-freshness.js wiki <workspace>   # current, stale or unverified citations
```

## Code graphs

- **Tool:** Graphify from PyPI `graphifyy` (upstream Graphify-Labs/graphify),
  installed with pipx and pinned to an exact version. Only the local
  tree-sitter pass is used (`graphify update`): no LLM, no API key, content-hash
  cached. `graph.json` embeds `built_at_commit`.
- **Build:** `node scripts/knowledge-freshness.js build <repo>` runs
  `graphify update` and writes a v3 `graphify-out/BUILD_INFO.json` binding graph
  digest, source/config fingerprint, extraction and verified commits, dirty flag,
  build time and Graphify version. It fails before Graphify starts if
  `.graphifyignore` is missing any required privacy exclusion.
- **Automatic rebuilds:** `scripts/git-hooks/graphify-rebuild.sh` is a template
  for `post-commit` and `post-checkout`. Audit each checkout's effective hook
  configuration before claiming adoption. Align installed hooks only after its
  validator paths are current and custom hook content has been preserved.
  The template rebuilds only in a repo's main checkout (never from a
  linked worktree), only after code changes or a branch switch that moves
  HEAD, and refuses to build unless `.graphifyignore` carries the complete
  knowledge boundary (the marker alone is insufficient). After a commit it
  re-extracts only the changed files and writes
  `BUILD_INFO.json`.
- **Boundary:** a verified repo's `.graphifyignore` must exclude reports, artifacts, logs,
  local data, site-packages, `_upstream/`, `references/`, and vendored code,
  because reports and artifacts can quote customer data.
- **FalkorDB (optional):** the backend loader
  `scripts/graph/load_all_repos_to_falkordb.py` loads each repo's graph in
  batches into a new generation and writes verified `GraphMeta` with the source
  commit, graph digest and counts only after a complete load. Verify the intended
  generation with `agentic-stack/falkordb_smoke.py --expected-snapshots`. The image
  and the MCP server are pinned by version.
- **Obsidian view:** on demand, per repo:
  `graphify export obsidian --graph graphify-out/graph.json --dir graphify-out/obsidian`.
  It is generated, overwritten on each export, and never edited or committed;
  export only the repo being studied to bound time and storage.

## Operator wiki

The SeaBridgeAI workspace folder is a local git repository with no remote. It
follows the Karpathy LLM-wiki pattern: raw sources stay the truth; pages under
`wiki/` are syntheses with `updated:`, `sources:` and matching `source_hashes:`;
pages without hashes are unverified. `index.md` is read first;
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

Agents do not delete data, folders, repositories, or infrastructure. Retirement
and rollback instructions involving local data, containers, and installed tools
belong in the private operator inventory, where targets can be verified against
the current machine. Optional graph hooks may be installed in an intended main
checkout after preserving any existing custom hooks and validating its knowledge
boundary; linked worktrees do not auto-rebuild graphs.
