---
name: sea-knowledge-vault
description: SeaBridgeAI knowledge-vault skill for Markdown notes, wikilinks, frontmatter, canvas/base files, validation, and source-preserving research or incident notes.
---

# sea-knowledge-vault

## Purpose

Create, validate, or transform SeaBridgeAI knowledge notes without corrupting metadata or duplicating validator logic.

## When To Call

Use for Markdown knowledge notes, Obsidian wikilinks, YAML frontmatter, JSON Canvas maps, Base-style docs, research notes, and incident logs.

## Required Inputs

Vault or folder path; operation; schema expectations; dry-run/apply mode; backup requirement.

## Expected Outputs

Validation result; normalized notes when approved; changed files; remaining warnings.

## Mandatory Verification

Read the vault's `index.md`, then only the matching page and required sources.
Use the existing validators for note/frontmatter changes:
`node C:/Users/adelm/SeaBridgeAI/everything-claude-code/scripts/knowledge-freshness.js wiki <vault>`
and `python <vault>/tools/knowledge/vaultsafe.py validate <vault>` (or the existing
backend `agent-tooling/scripts/knowledge-vault.ps1` wrapper). Keep automated
transforms dry-run unless the named `--apply --backup` operation is approved.

## Private operator wiki

The local `SeaBridgeAI/SeaBridgeAI` vault is not a product runtime or public ECC
repository. Obsidian is a viewer. Its sources, not synthesized pages, are truth.
Do not modify source code, governed documents, dated reports or `raw/` inputs as
part of note ingestion. Product behavior must be verified in its owning repo.

Pages carry `updated:`, `sources:` (`<repo>:<path>` or a workspace path), and reviewed
`source_hashes:` (`sha256:<digest> <source>`). Missing hashes mean unverified;
`historical` means dated/superseded, not current guidance. Hash proposals do not
replace reading the page and its sources. Supersede `type: record` decisions;
do not rewrite their history. Read one source, update the relevant pages, add new
pages to `index.md`, and append `log.md`; do not create parallel rulebooks.

Never ingest tenant/customer data, secrets, `.env` contents, raw transcripts,
signed documents, product-source copies, generated logs or private runtime data
into notes or public ECC. Indexing, sync, contributor capture and background jobs
need their own current authorization. Preserve source status, confidence, units,
scenario, timeframe and missing-data caveats. Label local validation separately
from published, deployed or live-consumer proof.

## Failure Conditions

Fail if frontmatter would be lost, uncontrolled recursive rewrites are requested, backup is absent for writes, or source caveats disappear.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Knowledge notes about sustainability must preserve source, status, confidence, unit, scenario, timeframe, and missing-data caveats.

## Cross-Agent Compatibility Notes

All agents call the same central validator path and keep generated artifacts out of product runtime unless requested.

## Superpowers Adaptation

Reference only relative to Superpowers; uses its verification-before-completion discipline but not its skill body.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

Apply the backend central `AGENTS.md` and `AGENTS_SYSTEM.md`. Controlled goals
follow their admission/checkpoint rules; this skill does not impose a full goal
loop, extra reviews or indexing on every small note task. A blocked retrieval or
publication lane does not block other authorized work. No skill grants permission.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
