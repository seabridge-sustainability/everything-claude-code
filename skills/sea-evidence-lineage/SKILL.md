---
name: sea-evidence-lineage
description: Trace a SeaBridgeAI EvidenceObject or AI-generated claim back to its source and forward to every module that links/consumes it.
---

# sea-evidence-lineage

## Purpose

Answer "where did this number/claim come from, and everywhere it's used"
with a real, queried lineage chain -- not an assumption from field names.

## When To Call

Reviewing an AI-generated claim or report answer for provenance; auditing
evidence reuse across modules; debugging why a metric/value appears (or
fails to appear) somewhere; verifying an Evidence Vault link before
approving it.

## Required Inputs

The evidence id, claim text, or metric/record id to trace.

## Expected Outputs

A lineage chain: source record -> `EvidenceObject` -> every `EvidenceRef`
consumer (report answer, initiative, risk assessment, DD finding, target,
policy, procurement/supplier record, etc.), each with `file:line` for the
linking code path and the confidence/provenance fields carried at each
hop.

## Mandatory Verification

Query the actual `EvidenceVaultService`/`EvidenceRef` data path in this
session (`app/services/evidence_vault.py` and the target-type-specific
model). Do not infer a lineage chain from schema field names alone --
confirm the link record actually exists and actually resolves.

## Failure Conditions

Fail if a lineage hop is asserted without reading the actual link record,
or if a broken/dangling link (evidence id that no longer resolves) is
silently treated as valid.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

A claim with no resolvable evidence lineage must be reported as
`NEEDS EVIDENCE`, never presented as sourced.

## Cross-Agent Compatibility Notes

Output is a portable markdown chain; works identically whether invoked by
a review skill or a standalone audit.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
