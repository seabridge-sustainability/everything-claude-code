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

Run the central validator before and after edits. Keep transforms dry-run unless --apply --backup is explicitly approved.

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

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
