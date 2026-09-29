# SeaBridgeAI Knowledge Architecture

Status: accepted 2026-09-28; Phases 1 and 2 done, Phases 3 and 4 done except
the operator actions listed under [Decisions](#decisions-2026-09-28).
Machine-readable contract: `config/knowledge-sources.json`, validated by
`schemas/knowledge-sources.schema.json` and `scripts/lib/knowledge-sources.js`.
The `knowledge-ops` skill is the router agents use.

## Capability

Every coding agent, the platform, and the operator can tell, for any piece of
information, where it lives, who may read and write it, whether it may contain
customer data, and whether it is a source of truth or a rebuildable view. There
is no single knowledge database. Each existing store keeps its job, and the
registry states each job once.

## Layers

| Layer | Holds | Authority | Tenant data |
| --- | --- | --- | --- |
| Repository `AGENTS.md`, `docs/`, ECC skills | Engineering rules, standards, ADRs, API contracts, runbooks | canonical, governed | forbidden |
| Repository source code | What the software does, at a commit | canonical, governed | forbidden |
| ECC Memory Vault | Coding-agent handoffs, discoveries, pending decisions, resumable context, working preferences | canonical, always unreviewed | forbidden |
| GBrain | The operator's business knowledge: organizations, people, relationships, meetings, research, strategy | canonical | forbidden |
| Obsidian | A human interface over approved Markdown | interface, owns nothing | forbidden |
| GitHub issues and PRs | Active work and review state | canonical, not durable knowledge | forbidden |
| Platform knowledge (Mongo) | Tenant documents, versions, chunks | canonical | required, tenant-filtered |
| Platform product records (Mongo) | Product facts, evidence packages | canonical | required, tenant-filtered |
| Platform agent memory (Mongo) | Tenant and user preferences, corrections, workflow context | canonical | required, tenant-filtered |
| Structured RAG / PageIndex | Document navigation trees | projection of platform knowledge | required |
| Sustainability Graph | Product and domain relationships | projection of product records | required |
| Graphify | Code relationships per repo | projection of source code | forbidden |
| FalkorDB | Query index over Graphify | projection of Graphify, read-only for agents | forbidden |
| Harness memory (Claude auto-memory and similar) | Harness-private convenience copies | cache, owns nothing | forbidden |

Retired: the ECC `knowledge-vault/` folder (its one page restates
`docs/SKILL-PLACEMENT-POLICY.md`), the generic MCP memory server, and ECC's
`agentic-stack/falkordb_etl.py` loader. The two stores are registered as
`deprecated` with no writers, so nothing routes to them; the loader is a stub
that refuses to run.

On this machine sessions run in many worktrees, and the Memory Vault's project
scope resolves to each checkout, so cross-session memory uses the **user** scope
(`~/.ecc/memory`) with a `repo-<name>` tag.

## Rules

1. **One home per information type.** Each information type is owned by exactly
   one active source. Interfaces and caches own none. The validator rejects a
   second owner.
2. **Customer data stays in the platform.** Only `mongodb` stores may declare
   `tenantData: "required"`, and they must name the isolation key that every
   read filters on before ranking. Agent memory, GBrain, Obsidian, Markdown
   folders, code graphs, harness memory, git, and the issue tracker are
   tenant-forbidden by store kind in code, so editing a flag in the JSON cannot
   relax the rule. A tenant source cannot list a tenant-forbidden projection.
3. **Coding agents never read tenant stores.** Every tenant source declares
   `agentAccess: "none"` and does not list `coding-agents` as a reader.
4. **Projections are rebuildable and read-only for agents.** A projection names
   the sources it is rebuilt from, both sides of every link agree, and agents
   get `read-only` access. Nothing canonical is ever derived.
5. **Trust states are shared.** `unreviewed` → `verified` → `governed`, with
   `superseded` at any point. Only version-controlled repository content can be
   `governed`. ECC Memory Vault entries are only ever `unreviewed` or
   `superseded`; accepted knowledge is promoted out of the vault into governed
   docs, matching `schemas/memory.schema.json`.
6. **Observed state, not configuration.** Each source records `state.status`
   with the date and evidence it was observed. A config file existing is
   `configured-unverified`; code that exists but was not seen running is
   `implemented-unverified`.
7. **Locations are logical.** `repo:path`, `~/path`, `mongodb:collection`; no
   absolute machine paths and never a connection string.
8. **No raw transcripts.** Conversations are never ingested automatically; only
   reviewed summaries with provenance are promoted.

## Where does it go

`routeInformationType(registry, type, { containsTenantData })` answers this in
code and refuses rather than falling back when customer data would cross the
boundary.

| Information | Goes to |
| --- | --- |
| A formatting or workflow preference for coding agents | ECC Memory Vault (`agent-working-preferences`) |
| A handoff, discovery, or resumable task context | ECC Memory Vault |
| A company, person, relationship, or meeting | GBrain |
| A coding standard, rule, ADR, API contract, or runbook | Governed repository docs |
| A tenant's uploaded document | Platform knowledge |
| A product user's preference or an agent correction | Platform agent memory |
| Who calls what in the code | Graphify (FalkorDB when fresh) |
| What someone is working on now | GitHub issue or PR |

## Verified inventory, 2026-09-28

Observed read-only before Phases 2 to 4 (the registry holds the current state):

- **Git.** ECC `main` is 16 commits behind origin with other sessions' edits in
  progress, including an uncommitted `config/mcp-profiles/`. The paths this work
  touches are identical on both sides. The backend and frontend checkouts are
  shared by many sessions (97 and 43 worktrees respectively). OpenSeaBri is clean.
- **ECC Memory Vault.** Not initialized: no `.ecc/memory` in ECC, backend,
  frontend, or the user home. The CLI (`scripts/memory.js`) and MCP server
  (`scripts/memory-mcp.mjs`) exist.
- **GBrain 0.22.4.** 37,995 pages (28,011 `concept`, 9,920 `code`, about ten
  business-typed), 0 embedded, 0 links. MCP is configured only in OpenSeaBri and
  the uncommitted ECC knowledge profile.
- **Obsidian.** The app registers two vaults: the SeaBridgeAI knowledge
  workspace (17 notes, not version-controlled, last updated 2026-07-07) and
  `manageesg-backend/graphify-out`. Seven more generated `graphify-obsidian/`
  vaults sit in the other repos and `_upstream` mirrors.
- **Graphify.** `graph.json` exists for all five repos; dates range from
  2026-05-16 (openseabri) to 2026-09-28 (backend). No commit or build metadata.
- **FalkorDB.** Docker container `falkordb` on host port 6380. `GRAPH.LIST`:
  `manageesg`, `frontend`, `autoresearch`, `ecc`, `openseabri`.
- **Platform.** Knowledge search loads up to 500 scoped chunks and ranks by
  substring in Python although the `knowledge_chunk_text` index exists.
  Sustainability Graph search fetches `limit × 5` nodes before keyword-filtering.
  Structured RAG is scoped by `company_id` only.

## Findings that change the plan

- **GBrain does not hold business knowledge yet.** Over 99% of it is a copy of
  repo source imported in May, which duplicates Graphify, and it was demoted to
  reference/experiment on 2026-07-07. Giving it the business-knowledge role
  means a scoped re-ingest, and that needs a decision on embeddings: 0.22.4
  embeds through an external provider, which would send its contents off the
  machine.
- **There were two FalkorDB loaders.** The backend's
  `scripts/graph/load_all_repos_to_falkordb.py` writes the short names that the
  current graphs and `agentic-stack/falkordb_smoke.py` use. ECC's
  `agentic-stack/falkordb_etl.py` wrote repo-directory names that were dropped
  as stale on 2026-07-07, and it deleted each graph before reloading although
  its docstring said it merged. The 2026-07-07 note records old-name graphs
  reappearing after cleanup, which matches that loader. It is retired.
- **The Obsidian workspace held canonical notes without version control.** Its
  five decision notes are now in
  [`docs/decisions/knowledge-workspace/`](../decisions/knowledge-workspace/),
  unchanged, and the originals are marked superseded.
- **Harness memory was carrying project status and customer identifiers.**
  Claude auto-memory for the backend held module-status entries other agents
  could not read. Sanitized copies are now in the Memory Vault. The originals
  still name customers and property, meter and account IDs.

## Enforcement

```bash
node tests/lib/knowledge-sources.test.js
```

The test validates the real registry and runs negative cases for missing scope,
owner, canonical store, and sensitivity, every tenant-boundary rule, trust
states, projection links, lifecycle, duplicate owners, and routing. Each tenant
boundary check was disabled in turn to confirm a test fails without it.
`tests/run-all.js` picks the file up automatically.

## Decisions, 2026-09-28

Approved by Alejandro on 2026-09-28.

1. **`knowledge-vault/` is retired.** Its index is marked superseded, and the
   `AGENTS_SYSTEM.md` LLM Wiki protocol is replaced by a Knowledge Placement
   section. Agents do not delete source folders, so removing the folder is an
   operator action: `git rm -r knowledge-vault` in ECC, reversible with
   `git revert`.
2. **GBrain becomes business-only, without external embeddings.** 0.22.4
   embeds only through OpenAI (`references/gbrain/src/core/embedding.ts`), and
   the 2026-07-07 attempt was blocked as exfiltration, so no provider is
   enabled. Upstream 0.56.2.0 has local recipes (Ollama, LM Studio,
   llama-server); adopting one needs an approved upgrade. Clearing the code
   corpus deletes database content, so the operator runs it. `sources remove`
   may miss code pages recorded under `default`, so set the whole brain aside
   instead. Stop GBrain MCP clients first. Then, in PowerShell:

   ```powershell
   New-Item -ItemType Directory -Force E:\gbrain-archive
   robocopy "$HOME\.gbrain\brain.pglite" E:\gbrain-archive\brain.pglite-2026-09-28 /E
   Rename-Item "$HOME\.gbrain\brain.pglite" brain.pglite.code-corpus-2026-09-28
   gbrain init
   gbrain import <business-notes-dir> --no-embed
   ```

   Rollback: delete the new `brain.pglite` and rename the old one back. No
   business corpus exists yet, so the new brain starts empty.
3. **Obsidian's decision notes moved to ECC.** The five decision notes are in
   `docs/decisions/knowledge-workspace/`, unchanged apart from a provenance
   line. The originals are marked `status: superseded` with a pointer. The
   workspace stays outside git as a navigation interface.
4. **The backend FalkorDB loader is the only loader.** ECC's
   `agentic-stack/falkordb_etl.py` is a stub that refuses to run.

## Still open

- Whether to scrub customer identifiers from the Claude auto-memory entries
  (other sessions read them).
- Upgrading GBrain for local embeddings, and which business sources to import.
- Platform knowledge search (Phase 6): the module is another session's
  uncommitted work, so its text-index fix belongs to that work. The
  Sustainability Graph window bug is fixed in manageesg-backend `79829f01d`.
- Structured RAG has no `tenant_id` field; adding one needs a data migration.
- Graphify and FalkorDB outputs still record no source commit or build time.
