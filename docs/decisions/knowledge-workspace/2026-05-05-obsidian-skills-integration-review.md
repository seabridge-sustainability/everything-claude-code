---
title: Obsidian Skills Integration Review
date: 2026-05-05
tags:
  - seabridge/knowledge
  - agent-workflows
  - obsidian
source_repo: kepano/obsidian-skills
source_commit: fa1e131a014576ff8f8919f191a7ca8d8fded39b
recommendation: partial-integration
---

<!-- markdownlint-disable MD025 -->

> Moved 2026-09-28 from the SeaBridgeAI Obsidian knowledge workspace (`Knowledge Management/Obsidian Skills Integration Review.md`), which is not version-controlled. Content is unchanged; `[[wikilinks]]` name notes in that workspace. Dated record: do not rewrite; supersede it with a newer decision.

# Obsidian Skills Integration Review

Recommendation: partial integration. Keep `kepano/obsidian-skills` as a reviewed upstream reference, but do not make Obsidian, Obsidian CLI, or Defuddle a required SeaBridgeAI runtime dependency.

## What Was Cloned

Cloned to `C:\Users\adelm\SeaBridgeAI\_upstream\research\kepano-obsidian-skills` at commit `fa1e131a014576ff8f8919f191a7ca8d8fded39b`.

License is MIT. The repository contains skill instructions only, plus reference markdown files. There is no package manifest and no bundled executable code.

## What To Adapt

- Wikilink and backlink discipline for architecture, research, incident, and due-diligence notes.
- YAML frontmatter preservation and typed metadata validation.
- JSON Canvas integrity rules for architecture maps and emergency-response flows.
- Base-like typed views as a documentation pattern for ESG frameworks, GRESB mappings, LCA methods, carbon registries, GIS datasets, incident logs, and vendors.
- Defuddle-style web-to-markdown ingestion as an optional extraction pattern, behind existing URL safety controls.

## What To Ignore

- Direct Obsidian CLI mutation as a default agent path.
- Global `npm install -g defuddle` as a required dependency.
- Copying upstream skills wholesale into each repo.
- Uncontrolled recursive rewrites of vaults or docs folders.

## SeaBridgeAI Guardrails

- Use the central `tools/knowledge/vaultsafe.py` CLI for validation and dry-run previews.
- Keep edits dry-run by default.
- Use `--apply --backup` only for explicit note normalization.
- Treat unresolved wikilinks and bad Canvas edges as failures.
- Treat orphan notes as warnings unless a task requires a fully connected vault.
- Keep repo-specific wrappers thin; central behavior belongs in this vault and ECC.

## Invocation

```powershell
python C:\Users\adelm\SeaBridgeAI\SeaBridgeAI\tools\knowledge\vaultsafe.py validate C:\Users\adelm\SeaBridgeAI\SeaBridgeAI --json
python C:\Users\adelm\SeaBridgeAI\SeaBridgeAI\tools\knowledge\vaultsafe.py normalize C:\Users\adelm\SeaBridgeAI\SeaBridgeAI
```

Backend wrapper:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\manageesg-backend\agent-tooling\scripts\knowledge-vault.ps1 validate C:\Users\adelm\SeaBridgeAI\SeaBridgeAI
```

OpenSeaBri wrapper:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\openseabri\scripts\knowledge-vault.ps1 validate C:\Users\adelm\SeaBridgeAI\SeaBridgeAI
```
