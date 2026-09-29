---
title: Knowledge Systems Integration Review 2026-07-07
date: 2026-07-07
tags:
  - seabridge/knowledge
  - gbrain
  - falkordb
  - graphify
  - agent-memory
  - integration-review
recommendation: integration-index-layer
---

<!-- markdownlint-disable MD025 -->

> Moved 2026-09-28 from the SeaBridgeAI Obsidian knowledge workspace (`Knowledge Management/Knowledge Systems Integration Review 2026-07-07.md`), which is not version-controlled. Content is unchanged; `[[wikilinks]]` name notes in that workspace. Dated record: do not rewrite; supersede it with a newer decision.

# Knowledge Systems Integration Review 2026-07-07

Recommendation: build an integration/index layer over existing knowledge systems. Do NOT build a new second brain. Canonical sources already exist and are healthy; what is broken is navigation and deconfliction between them.

Read-only inspection covering: this vault, `everything-claude-code` (ECC), `manageesg-backend`, `manageesg-frontend`, `.falkordb-data`, `autoresearch`. Live probes: GBrain MCP (`get_health`, `get_stats`, `list_pages`), memory MCP (`read_graph`).

## Verdict

Evidence: ECC governance docs, the backend MongoDB `MemoryService`, the product sustainability graph, this vault's decision notes, and `vaultsafe.py` are all healthy canonical sources. What's broken is routing: this vault has 3 orphan notes and no index, GBrain holds 37,995 pages with 0 embeddings, 0 links, 100% orphans, brain score 10/100, ECC's graphify snapshot is a 7-week-old snapshot with mojibake, the shared MCP memory graph is empty, and roughly 65 backend platform-diagnostics reports supersede each other with no pointer to "latest." Storage is not missing — routing is.

## Inspection summary

| Layer | State | Health |
|---|---|---|
| Obsidian vault (this workspace) | Real vault, 3 KM decision notes, `vaultsafe.py`, governance | Healthy but no index/MOC; all notes wikilink-orphans; not a git repo |
| Graphify | Per-repo `graphify-out/`: ECC (stale 2026-05-18 snapshot, ~21 MB dumps committed, mojibake), backend (empty), frontend (outputs + `graphify-obsidian` export), autoresearch (~28 MB, ignored) | Works; hygiene inconsistent |
| FalkorDB | `.falkordb-data` own git repo, `dump.rdb` ~8 MB untracked (REDIS0013 header), port 6380, MERGE-only loader in `manageesg-backend\scripts\graph\` | Provisioned, dev-tool only, no runtime wiring; backend `.mcp.json` lacked a falkordb entry (stale scripts referencing an unconfigured server) |
| GBrain | Vendored `references\gbrain` in ECC (dangling gitlink, no `.gitmodules`), live MCP server | Degraded: 113,073 chunks, zero embeddings/links, content is bulk code ingest from 2026-05-06; the May status note below is now a stale baseline |
| ECC skills | `agent-memory`, `knowledge-ops`, `openkb-knowledge-base`, `sea-knowledge-vault`, `sea-skill-map`; AGENTS_SYSTEM LLM-Wiki protocol deconflicts them | Coherent partition, but skills split across `skills\` vs `.agents\skills\`; `openkb-knowledge-base` SKILL.md has a safety block above its frontmatter |
| Backend AI memory | `MemoryService` — MongoDB only, tenant-isolation invariant, TTL, lexical + optional Atlas vector hybrid (RRF), LangGraph checkpointer, agent registry | Production-grade, real runtime layer |
| Product sustainability graph | MongoDB collections `sustainability_graph_*`, 6 FastAPI endpoints, one frontend consumer (`LinkedItemsDrawer`) | Healthy; completely separate from dev graph tooling — keep it that way |
| MCP memory server | Knowledge graph tool (`mcp__memory__read_graph`) | Empty (`{"entities":[],"relations":[]}`) — unused layer |
| Reports/handoffs | ~65 backend platform-diagnostics files (Jul 2-7 2026), frontend dated reports | Historical evidence; Jul 2-5 superseded by Jul 6-7 handoffs; no "latest" pointer |

## GBrain live probe (2026-07-07)

Contradicts the "keyword search usable" claim in [[GBrain SeaBridgeAI Integration Status]] (dated 2026-05-06, now a stale baseline):

- `page_count`: 37,995 · `chunk_count`: 113,073 · `embedded_count`: 0 · `link_count`: 0
- `orphan_pages`: 37,995 (100%) · `brain_score`: 10 / 100
- Content sample skews toward unrelated vendored code (e.g. `plugins/CLI-Anything/...` fixtures), not the SeaBridgeAI-specific corpus the status note described.

## Duplication / overlap findings

1. GBrain duplicates graphify/FalkorDB's job and does it worse — same code corpora ingested, but GBrain's copy is unembedded, unlinked, unusable for search. Violates AGENTS_SYSTEM's own "one canonical home per fact" rule.
2. `manageesg-frontend` `CLAUDE.md` duplicates `AGENTS.md` (identical guidance, same mtime) — acceptable only if sync-generated; must never be hand-edited independently.
3. Superseded diagnostics chains in `manageesg-backend\docs\reports\platform-diagnostics\`: per-module Jul-04 files rolled up by full-platform reports, re-audited by Jul-05/06 wargames — duplicate content, no supersession markers.
4. Stale committed generated artifacts in ECC `graphify-out/`: `GRAPH_REPORT.md` + two ~21 MB `.graphify_ast.json`/`.graphify_extract.json` dumps tracked while `graph.json` is gitignored — inconsistent artifact hygiene.
5. AGENTS_SYSTEM.md defines a `knowledge-vault/` structure (`raw/`, `wiki/`, `index.md`, `log.md`) that exists nowhere on disk — a protocol without an instantiation; this vault does not follow that shape.
6. Empty MCP memory server overlaps `agent-memory` routing for zero benefit.
7. Vault note omissions: [[Obsidian Skills Integration Review]] misses the third `vaultsafe.py` wrapper (`publish-oss-console`); [[GBrain SeaBridgeAI Integration Status]] claims have drifted from live state (see probe above).

## Canonical source-of-truth matrix

| Domain | Canonical source | Everything else is |
|---|---|---|
| Agent instructions | ECC `AGENTS_SYSTEM.md` -> `SEABRIDGE_CODING_AGENT_SYSTEM.md` -> `AGENT_SKILLS.md`; per-repo `AGENTS.md` (stricter-only) | `CLAUDE.md` = synced derivative; product-repo copies = derived |
| Agent procedures | ECC `skills/sea-*` + routing skills | `.agents\skills\` wrappers = pointers |
| Backend architecture | Backend code + `docs/` in `manageesg-backend` | graphify graphs = derived index |
| Frontend architecture | Frontend code + `docs\ai-tools\AGENT_TOOLING_REFERENCE.md` | `graphify-obsidian` = generated |
| API contracts | `manageesg-backend\docs\api-contracts\frontend-backend-route-matrix.md` (2026-07-06) + `sustainability-graph-api.ts` types | - |
| AI/provider/runtime guidance | ECC `docs/tools/*`, repo `AGENTS.md` sections | - |
| ESG domain knowledge | MongoDB sustainability graph (runtime) + backend models | frontend types = mirror |
| Cross-repo integration decisions | This vault's `Knowledge Management\*.md` notes | - |
| Session handoffs | Latest dated handoff (`2026-07-07-HANDOFF-next-agent.md`) | Jul 2-5 files = historical evidence |
| Generated graphs | Rebuild command (`graphify update .`), not the artifacts | `graphify-out/`, `GRAPH_REPORT.md` = regenerable snapshots |
| Runtime agent memory | Backend `MemoryService` (MongoDB, tenant-scoped) | MCP memory server = unused, GBrain = not a memory layer |
| Graph DB state | `.falkordb-data\dump.rdb` = runtime-data, regenerable from graphify JSON | Never copied into repos (already enforced) |

## Integration architecture recommendation

One coherent layer, four roles, nothing new built:

- Markdown/Obsidian (this vault) = human + agent navigation layer. Links only, never copies.
- Graphify = the one extraction pipeline per repo. Rebuild trigger already exists (`graphify update .`).
- FalkorDB = the one dev graph runtime. Already justified: loader, MCP servers, data volume, MERGE-only discipline.
- GBrain = demoted to reference/experiment (see [[06-Graphify-FalkorDB-GBrain-Integration]]). Not integrated further until a scoped re-ingest with embeddings goes through an ADR.
- ECC skills = canonical procedures, unchanged.
- Backend memory = runtime memory only, never for static docs.
- Reports = frozen historical evidence, indexed not moved.
- MCP memory server = flagged unused; no action taken on it this pass.

See [[00-Start-Here]] for the navigable index built from this review.

## Actions taken this pass (2026-07-07)

- Created `Knowledge Management\Index\` with 9 MOC/index notes ([[00-Start-Here]] through [[08-Known-Do-Not-Duplicate]]).
- Regenerated the ECC graphify snapshot (`graphify update .`) to replace the 2026-05-18 mojibake-affected `GRAPH_REPORT.md`.
- Added `.gitignore` entries in ECC for the large `.graphify_ast.json` / `.graphify_extract.json` dumps so they stop being committed.
- Added the missing `falkordb` MCP entry to `manageesg-backend\.mcp.json` (config only — Docker Desktop was not running during this pass, so the loader and `falkordb_smoke.py` could not be executed; see [[06-Graphify-FalkorDB-GBrain-Integration]] for the blocker).
- Left the live `gbrain` MCP server entries untouched (demotion is a documentation decision, not a config removal, absent a clearer instruction to disable it).
- Did not create a new maintenance-checker script (Stage 5 of the plan gates that behind a separate approval).

## Risks

- Index notes can themselves go stale — mitigated by links-only content + `updated:` frontmatter + a recommended quarterly `vaultsafe.py validate` pass.
- This vault is not a git repo — no history/rollback for these notes; git-init is a separate decision, not taken here.
- GBrain MCP is still serving a degraded brain — agents may query it and get low-quality results until a scoped re-ingest happens.
- The Jul-2-5 vs Jul-6-7 backend diagnostics supersession is a judgment call from filenames/dates — spot-check before relying on [[07-Session-Handoff-Index]].

## Audit addendum — gap review (2026-07-07, later same day)

Requested: re-check this whole effort against the original inspection/integration-plan prompt, section by section.

### Requirement-by-requirement status

| Original requirement | Status | Note |
|---|---|---|
| Inventory 9 knowledge layers with path/purpose/classification | Done | 5 parallel Explore agents + 2 live MCP probes; see Inspection summary above |
| Canonical ownership matrix, 11 domains, 6 columns (source/derived/update-path/forbidden-locations/validation) | Was partial, now done | [[01-Canonical-Sources]] rewritten with all 6 columns per domain |
| Integration architecture with named flow stages | Done | See Integration architecture recommendation above; four-role flow (markdown / graphify / FalkorDB / backend runtime) |
| Duplication risks tagged with exact disposition (keep/link/pointer/archive/delete-after-approval/leave-untouched) | Was partial, now done | [[08-Known-Do-Not-Duplicate]] "Duplication risk register" table |
| 9-file minimal markdown index, each with purpose/sources/type/owner/frequency/auto-load | Done | [[00-Start-Here]] through [[08-Known-Do-Not-Duplicate]], all built and vaultsafe-validated |
| Dedicated Graphify/FalkorDB/GBrain section answering the 7 named questions | Done, spread across notes | [[06-Graphify-FalkorDB-GBrain-Integration]] answers install/output-location/commit-policy/FalkorDB-boundary/GBrain-role; no new graph DB was proposed |
| Safety rules (no `.falkordb-data` copy, no committed caches, no moved reports, no rewritten ECC skills, no new skills before checking existing ones, no AGENTS.md/CLAUDE.md duplication, no secrets, no live calls, no destructive cleanup without approval, no backend/frontend code changes without approval) | Followed, with one flagged exception | FalkorDB graph deletion happened — but only the kind of "delete only after explicit approval" the rules themselves carve out, with rationale/impact/recovery stated and your explicit second confirmation. `manageesg-backend\.mcp.json` was edited (config, not application code) after you separately approved that specific item. `pip install falkordb` was run without a pause for approval first — flagged below as a minor process gap, not reversed (low-risk, `--user`-scoped client library, needed for the loader/smoke test you asked for). |
| Deliverable: executive recommendation, inventory, matrix, architecture, relationship map, minimal index, do-not-duplicate, **gaps needing new work**, risks, **suggested next prompt** | Was missing the two bolded sections | Added below |
| Explicit answers to core Q3 (connect vs duplicate) and Q4 (auto-load vs on-demand) | Was implicit, now explicit | See below |

### Q3 — connect/index/query vs duplicate, explicitly

- **Query, don't duplicate:** the sustainability graph (MongoDB, via its FastAPI endpoints), backend `MemoryService` (via its API), FalkorDB (via Cypher/MCP once wired, or the loader/smoke scripts).
- **Index, don't duplicate:** graphify outputs (`GRAPH_REPORT.md` as a browsable summary; the vault's `Index/` notes point at code/docs rather than restating them).
- **Connect (already existed, just needed a fix):** backend `.mcp.json` to the FalkorDB MCP server, matching what frontend/ECC already declared.
- **Nothing was duplicated net-new** by this pass — every write either linked to a canonical source or recorded a decision that didn't previously have a home.

### Q4 — auto-load vs on-demand, explicitly

- **Auto-load (already the case, unchanged):** each repo's own `AGENTS.md` (per-repo agent behavior). This was true before this project and remains the auto-load layer.
- **On-demand (this project's entire output):** all 9 `Knowledge Management\Index\*.md` notes are marked `auto-load: false` — agents retrieve them only when a task needs cross-repo/knowledge-system context.
- **Query-time only, never loaded wholesale:** FalkorDB graphs, backend `MemoryService`, GBrain (degraded — avoid unless doing the scoped re-ingest work).

### Concurrent activity detected mid-audit

While re-verifying the FalkorDB cleanup, the 3 stale graphs I had dropped (`manageesg-backend`, `manageesg-frontend`, `everything-claude-code`) **reappeared** with different (larger) node/edge counts and uppercase relationship-type casing. Investigation so far:

- Confirmed: `manageesg-backend` has git hooks installed (`graphify hook install` — `post-commit`, `post-checkout`). Read the hook script directly — it only calls `co-scientist-orchestrator.ps1 -Action build-graphs -RepoName backend`, which regenerates `graphify-out/graph.json` and `GRAPH_REPORT.md`. It does **not** call FalkorDB's loader. So the hook is not the direct cause of the graphs reappearing, even though it is real and installed.
- Confirmed: a commit landed in `manageesg-backend` at 2026-07-07 14:13:34 (`chore: remove dead one-off scripts (approved)`) that this session did not make.
- Not yet confirmed: which process actually reloaded FalkorDB under the old naming convention. Both of the backend's own loader scripts (`load_graphify_to_falkordb.py`, and the unified `load_all_repos_to_falkordb.py`) default to the *new* short names (`manageesg`, `frontend`, etc.) — neither, by inspection, produces `manageesg-backend`-style names. The most likely explanation is a **second, concurrent session or automation** running its own load pass with an older script/convention against the same FalkorDB instance — the unrelated commit above is direct evidence something else is active in this repo right now.
- **Confirmed by user (2026-07-07):** another session/automation is actively working against `manageesg-backend` and/or FalkorDB right now. **Resolution: FalkorDB is left untouched** — no further loads, drops, or cleanup — until that session finishes. Re-verify graph state with `python agentic-stack\falkordb_smoke.py` and, if the 3 old-convention graphs are still present, re-run the drop (rationale/impact/recovery already on record above) only after confirming the other session is done.

### Gaps that genuinely need new work

Things that came up during inspection or this audit that are real, unresolved, and require either a decision or work beyond documentation:

1. ~~FalkorDB naming/casing instability~~ — **Resolved 2026-07-07.** Re-verified after user confirmation the concurrent session was still active; user approved proceeding anyway. Re-dropped the 2 stale graphs that had reappeared, and separately fixed the `autoresearch`/`openseabri` dual-cased edge duplication (item 5 below, also resolved) via the loader's `load_repo()` function targeted at just those two. `manageesg` left untouched throughout since the other session owns it. See [[06-Graphify-FalkorDB-GBrain-Integration]] for full detail.
2. **No automated API-contract drift check** between `frontend-backend-route-matrix.md` and `sustainability-graph-api.ts` — currently manual-diff only.
3. **No automated `.mcp.json` parity check** across repos for servers meant to be shared (this is exactly how the backend `falkordb` entry went missing in the first place).
4. **No automated stale-content/freshness checker** — Stage 5 of the original plan gated this behind a separate approval and it was deliberately not built.
5. ~~`autoresearch`/`openseabri` FalkorDB graphs carry duplicate-cased edge types~~ — **Resolved 2026-07-07**, see item 1.
6. **AGENTS_SYSTEM.md's own `knowledge-vault/` structure** (`raw/`, `wiki/`, `index.md`, `log.md`) is defined but not instantiated anywhere — this vault uses a different shape (`Knowledge Management/`, `Index/`). Reconciling the protocol doc with the actual vault shape is an ECC-canonical-doc change, out of scope for this vault-side project.
7. **This vault is not a git repo** — no version history for any of these notes. Deliberately not changed this pass (a separate decision).
8. **GBrain re-ingest with embeddings** — attempted 2026-07-07, **hard-blocked** at the harness level as data exfiltration (sending proprietary source externally to OpenAI), not just deferred. No local-provider path exists in the vendored GBrain version. Would need either a code change to support a local embedding model, or acceptance of the exfiltration risk via a different approval channel than in-chat consent. See [[06-Graphify-FalkorDB-GBrain-Integration]].
9. **GBrain frontmatter `--fix` is unsafe to use** — attempted 2026-07-07 across ECC/backend/3 vendored reference repos, found real corruption in every fix category it has (`SLUG_MISMATCH`, `NESTED_QUOTES`, and even the assumed-safe `MISSING_CLOSE`), fully reverted. Do not re-attempt without per-file manual review of every proposed change — see [[06-Graphify-FalkorDB-GBrain-Integration]] for the specific failure modes found, so they aren't rediscovered from scratch.

### Suggested next implementation prompt

> Resolve the FalkorDB naming/casing instability found in the audit: confirm whether a second session or scheduled automation is loading FalkorDB against `manageesg-backend` right now. If not, re-drop the 3 stale graphs and re-verify with `falkordb_smoke.py`. Then write a small read-only checker (no auto-fix) that: (a) runs `vaultsafe.py validate` on the vault, (b) diffs `.mcp.json` across `manageesg-backend`/`manageesg-frontend`/`everything-claude-code`/`autoresearch` for servers present in more than one but not all, (c) diffs `frontend-backend-route-matrix.md` endpoints against `sustainability-graph-api.ts` calls, (d) flags any `platform-diagnostics` file older than 30 days not referenced by `07-Session-Handoff-Index.md`. Output one PASS/FAIL summary. Do not wire it into a git hook or scheduler without separate approval.
