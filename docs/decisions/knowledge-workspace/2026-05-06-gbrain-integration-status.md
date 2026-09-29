---
title: GBrain SeaBridgeAI Integration Status
date: 2026-05-06
tags:
  - seabridge/knowledge
  - gbrain
  - agent-memory
recommendation: partial-integration
---

<!-- markdownlint-disable MD025 -->

> Moved 2026-09-28 from the SeaBridgeAI Obsidian knowledge workspace (`Knowledge Management/GBrain SeaBridgeAI Integration Status.md`), which is not version-controlled. Content is unchanged; `[[wikilinks]]` name notes in that workspace. Dated record: do not rewrite; supersede it with a newer decision.

# GBrain SeaBridgeAI Integration Status

Recommendation: partial integration. Use GBrain as optional shared agent memory, skill routing, and code lookup through ECC and this SeaBridgeAI knowledge layer. Do not hard-couple production backend or OpenSeaBri runtime logic to GBrain.

## Current Status

- GBrain CLI is installed and callable as `gbrain 0.22.4`.
- ECC wrapper exists at `C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1`.
- Local GBrain reference checkout exists at `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\gbrain`.
- Upstream mirror exists at `C:\Users\adelm\SeaBridgeAI\_upstream\gbrain`.
- The local checkout is pinned to `891c28b582967154f91016a9d2b9a085f05d56e5`.
- Public upstream has moved beyond this local checkout, so treat local behavior as the installed baseline until deliberately upgraded.
- Local PGLite brain is initialized at `C:\Users\adelm\.gbrain\brain.pglite`.
- The target repos are registered as sources. In local GBrain 0.22.4, code imports still report page counts under the `default` source, so per-source `page_count` is not reliable even though source registration and sync checkpoints are present.
- Code/keyword lookup is usable for indexed content. TypeScript symbol lookup works; Python class lookup is incomplete in this installed GBrain version, so agents should fall back to `gbrain search` and then `rg` for Python definitions.
- Embeddings are not configured, so use this as keyword/code metadata lookup until an embedding provider is deliberately approved.
- `gbrain apply-migrations --yes` has been run for the local PGLite brain. `skillpack-check --quiet` now exits cleanly.
- PGLite is single-writer in practice here. Do not run multiple GBrain sync/doctor/search commands in parallel.

## Indexed Content

- `manageesg-backend`: code sync completed, 3,563 files imported, 23,802 chunks.
- `openseabri`: code sync completed, 243 files imported, 1,262 chunks.
- `everything-claude-code`: code sync completed, 5,987 files imported, 40,742 chunks.
- `SeaBridgeAI`: non-git vault markdown import completed, 3 pages imported, 3 chunks.
- After the migration chunker bump, OpenSeaBri and backend were refreshed. ECC symbol lookup for the local GBrain reference checkout was verified with `code-def BrainEngine`; a full ECC rewalk can exceed ordinary command timeouts.

## MCP Status

- Local agent `.mcp.json` files now include an optional `gbrain` stdio server command using the ECC wrapper.
- Production backend MCP server config was not modified.
- OpenSeaBri runtime GBrain spawning is feature-flagged with `OPENSEABRI_GBRAIN_MCP_ENABLED=1` and points to the central ECC wrapper instead of the previous non-existent `gateway.ts`.

## Safe Commands

```powershell
C:\Users\adelm\SeaBridgeAI\SeaBridgeAI\tools\gbrain\seabridge-gbrain.ps1 check
C:\Users\adelm\SeaBridgeAI\SeaBridgeAI\tools\gbrain\seabridge-gbrain.ps1 doctor
C:\Users\adelm\SeaBridgeAI\SeaBridgeAI\tools\gbrain\seabridge-gbrain.ps1 skillpack
C:\Users\adelm\SeaBridgeAI\SeaBridgeAI\tools\gbrain\seabridge-gbrain.ps1 resolvable
C:\Users\adelm\SeaBridgeAI\SeaBridgeAI\tools\gbrain\seabridge-gbrain.ps1 sources
C:\Users\adelm\SeaBridgeAI\SeaBridgeAI\tools\gbrain\seabridge-gbrain.ps1 mcp
C:\Users\adelm\SeaBridgeAI\SeaBridgeAI\tools\gbrain\seabridge-gbrain.ps1 index-plan
```

`index-plan` prints commands only. It uses code sync for git repos and markdown import for non-git paths. `index-apply` is intentionally disabled.

## Agent Use

Before broad grep/read investigation, agents may use GBrain code lookup:

```powershell
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 code-def <symbol>
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 code-refs <symbol>
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 code-callers <symbol>
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 query "<question>" --near-symbol <symbol>
```

Until sources are indexed, continue using `rg`, graphify, and local docs.

For Python-heavy backend investigation, prefer:

```powershell
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 search "<symbol-or-concept>"
rg -n "<symbol-or-concept>" app seabridge_ai
```

## Safeguards

- Do not commit API keys, `.gbrain` data, local PGLite databases, or private brain contents.
- Do not enable contributor capture or eval logging without explicit approval.
- Do not expose private personal memory in production app code.
- Keep GBrain optional and operator-triggered.
- Keep GBrain CLI operations serialized against the local PGLite brain.
- Do not replace existing RAG, OpenKB, graphify, or vector search without a separate architecture decision.
