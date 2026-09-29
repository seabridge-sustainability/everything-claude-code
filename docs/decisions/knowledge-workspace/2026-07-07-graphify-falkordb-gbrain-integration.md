---
title: Graphify FalkorDB GBrain Integration
updated: 2026-07-07
tags:
  - seabridge/knowledge
  - index
  - graphify
  - falkordb
  - gbrain
type: manual
owner: Alejandro
auto-load: false
---

<!-- markdownlint-disable MD025 -->

> Moved 2026-09-28 from the SeaBridgeAI Obsidian knowledge workspace (`Knowledge Management/Index/06-Graphify-FalkorDB-GBrain-Integration.md`), which is not version-controlled. Content is unchanged; `[[wikilinks]]` name notes in that workspace. Dated record: do not rewrite; supersede it with a newer decision.

# Graphify / FalkorDB / GBrain Integration

Current truth about what's wired and what isn't, as of 2026-07-07. Update this note (not the decision notes below) as status changes.

## Graphify

- One extraction pipeline per repo. Rebuild trigger: `graphify update <path>` inside the target repo.
- Per-repo state at last inspection: ECC had a stale 2026-05-18 snapshot with mojibake in `GRAPH_REPORT.md`; backend's `graphify-out/` was empty; frontend had outputs plus a `graphify-obsidian` export; autoresearch had a ~28 MB build, gitignored.
- ECC snapshot was regenerated this pass (`graphify update .`); see the ECC repo's own `graphify-out\GRAPH_REPORT.md` header date for the current snapshot date.
- Artifact hygiene: `GRAPH_REPORT.md` stays tracked; the large `.graphify_ast.json` / `.graphify_extract.json` dumps (~21 MB each) were added to ECC's `.gitignore` this pass so they stop being committed going forward. `graph.json` and `cache/` were already ignored.

## FalkorDB

- Dev-tool graph runtime only, not wired into product runtime. Data volume: `.falkordb-data` (own git repo, `dump.rdb` untracked, regenerable from graphify JSON via `manageesg-backend\scripts\graph\load_graphify_to_falkordb.py` / `load_all_repos_to_falkordb.py`). Port 6380. Loader is MERGE-only — never clear/reset without explicit approval.
- Backend `.mcp.json` was missing a `falkordb` MCP entry even though backend scripts reference it — added 2026-07-07 (config only).
- **Unified and loaded 2026-07-07.** Backend's `graphify-out/` was empty (never generated) — ran `graphify update .` there first. Then ran `load_all_repos_to_falkordb.py` (Docker/FalkorDB was up by then). Current state: 5 graphs, 0 load errors —
  - `manageesg` (backend): 25,719 nodes / 101,651 edges
  - `frontend`: 2,799 nodes / 4,784 edges
  - `autoresearch`: 10,819 nodes / 24,379 edges
  - `ecc`: 142,672 nodes / 390,102 edges
  - `openseabri`: 1,506 nodes / 3,089 edges
- **Dropped 3 stale duplicate graphs** that predated this unification and used an older repo-dir-name convention: `manageesg-backend`, `manageesg-frontend`, `everything-claude-code`. Explicit user approval obtained with rationale (superseded by the 5 current graphs), impact (local dev-tool cache only, no runtime consumer), and recovery plan (fully regenerable via `graphify update .` + the loader) before deletion. Verified via `falkordb_smoke.py` before/after.
- **Resolved 2026-07-07 (later same day):** the 3 stale old-naming graphs (`manageesg-backend`, `manageesg-frontend`, `everything-claude-code`) reappeared after the first cleanup — root cause was a second, concurrent session actively committing to `manageesg-backend` (confirmed by the user) that reloaded FalkorDB under the old convention. Per user decision, waited, re-checked, then re-dropped `manageesg-backend`/`manageesg-frontend` with explicit approval to proceed despite the other session still being active — `manageesg` itself (the current-convention graph the other session was actually writing) was deliberately left untouched throughout.
- **Resolved 2026-07-07:** `autoresearch` and `openseabri` dual-cased edge duplication (pre-existing, predates this session) fixed by clearing both graphs and reloading via the current loader's `load_repo()` function directly (not the CLI, which has no working per-repo filter despite an `--only`-shaped flag). `manageesg`/`frontend`/`ecc` were not touched by this operation. Final state: 5 graphs (`manageesg`, `frontend`, `autoresearch`, `ecc`, `openseabri`), single naming convention, single-cased edge types, 0 load errors.
- `agentic-stack\falkordb_smoke.py` had the 3 old graph names hardcoded as expected graphs — fixed 2026-07-07 to expect the 5 current short-alias names.
- Note for future loads: `load_all_repos_to_falkordb.py`'s `--only` flag referenced in some docs does not actually exist/filter in the current script — it silently loads all 5 repos regardless of arguments (only `--clear` is a real flag). To load a single repo, import the module and call `load_repo(db, name, path, clear=False)` directly, as done for this fix.
- MCP access: ECC's own `.mcp.json` already declares a `falkordb` server, but MCP servers are wired per-session at startup — a running Claude Code session started before Docker/FalkorDB came up will not have picked up the tool. Restart the session to get `mcp__falkordb__*` tools once the container is confirmed running.

## GBrain

- Vendored reference checkout in ECC (`references\gbrain`), live MCP server, backed by a local PGLite brain.
- Live probe (2026-07-07): `page_count` 37,995, `chunk_count` 113,073, `embedded_count` 0, `link_count` 0, `orphan_pages` 37,995 (100%), `brain_score` 10/100.
- Decision: **demoted to reference/experiment.** Do not treat it as a working memory or search layer — it duplicates graphify/FalkorDB's corpus while being unembedded and unlinked. No further integration until a scoped re-ingest with embeddings goes through an ADR, per the original [[GBrain SeaBridgeAI Integration Status]] note's own requirement.
- The live `gbrain` MCP server entries were left in place this pass — demotion is a documentation/usage decision, not a config removal. Disabling the MCP entry is a separate, explicit decision if wanted later.
- **Embeddings attempted 2026-07-07, blocked at the harness level.** `gbrain embed --all` (needed to fix the 0/35 embed score) uses OpenAI's `text-embedding-3-large` — confirmed by reading `references/gbrain/src/core/embedding.ts` directly, no local/Ollama provider path exists in this vendored version. The harness's own safety classifier blocked the run as data exfiltration (sending ~113k chunks of proprietary source from 3 repos to an external API) and stated user consent cannot clear that block at its layer. Not attempted further. Estimated cost would have been trivial (~$4-10 per the file's own pricing constant, $0.00013/1k tokens) — cost was never the actual constraint.
- **Frontmatter `--fix` attempted 2026-07-07, abandoned — do not use `gbrain frontmatter validate --fix` without full manual per-file review.** `doctor`'s reported "39,039 frontmatter issues" was misleading: `--fix` only auto-repairs `NULL_BYTES`/`MISSING_CLOSE`/`NESTED_QUOTES`/`SLUG_MISMATCH`, and running it surfaced real, repeated corruption:
  - `SLUG_MISMATCH` deleted a `slug: {SLUG}` / `slug: urdu` placeholder line in **two separate files** (a get-shit-done workflow template, an open-design DESIGN.md) where the "slug" was inside an illustrative YAML example block in documentation, not real frontmatter GBrain should have touched.
  - `NESTED_QUOTES` mangled a `description: >` folded-block-scalar value in a backend SKILL.md — it swapped only the outer quote characters, left inner quotes untouched, and added a stray space, producing invalid text. The original wasn't even a real YAML problem (block scalars aren't quote-parsed).
  - `MISSING_CLOSE` — the category assumed safest — **also broke a file**: an opencode test fixture intentionally had `description`, `occupation`, and `title` inside one frontmatter block to test multi-field parsing; the fix inserted a closing `---` right after `description`, truncating the block and silently demoting `occupation`/`title` into the document body.
  - `.bak` backup behavior was inconsistent — written in some vendored repos (`opencode`, `open-design`) but not others (`get-shit-done`, main ECC, backend), contradicting its own documented "safety contract."
  - Real-world scope was also wildly different from `doctor`'s registered-source counts: running `validate <path>` against a raw filesystem path (rather than a registered source) pulled in `venv`/`.venv-win`/`site-packages` third-party library files — backend's reported "8 fixable files" was actually 640 raw hits, of which exactly **1** was genuine project content.
  - **Full revert performed** across all 4 affected vendored repos (`get-shit-done`, `opencode`, `open-design`, `spec-kit-temp`) plus backend; all `.bak` scratch files cleaned up. Verified clean via `git status` in every touched repo.
  - If this is revisited later: never run `--fix` (even preceded by `--dry-run`) across a whole repo/source unattended — review every proposed change individually, and never point `validate <path>` at a raw repo root without first excluding `venv`/`.venv-win`/`node_modules`/`site-packages`.

See [[Knowledge Systems Integration Review 2026-07-07]] for full evidence.
