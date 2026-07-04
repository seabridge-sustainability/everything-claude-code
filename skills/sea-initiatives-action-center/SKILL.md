---
name: sea-initiatives-action-center
description: Review or extend SeaBridgeAI Initiatives & Investments (business case, source conversion, Action Command Center) without reintroducing the fixed split-brain/orphan-model anti-patterns.
---

# sea-initiatives-action-center

## Purpose

Keep the Initiatives & Investments module (`app/models/designed_initiative.py`,
`app/services/initiative_workspace.py`, `app/services/action_center.py`,
`InitiativesWorkflowTab.tsx`, `DesignNewInitiativeSection.tsx`) internally
consistent as it grows -- one business-case field set, one
create-from-source pattern, one financing-linkage mechanism.

## When To Call

Before adding a new initiative-creation entry point, a new business-case
field, a new Action Command Center source, or a new financing/investment
linkage.

## Required Inputs

The source module being wired (risk/target/report-gap/procurement/DD/LCA/
marketplace/AI-recommendation) or the field being added.

## Expected Outputs

A pass/fail check against the three invariants below, each with
`file:line`, plus the diff if changes were made to satisfy them.

## Mandatory Verification

1. New "create initiative from X" entry points call the shared
   `create_initiative_from_source()` helper in `initiative_workspace.py`
   -- not a bespoke POST that duplicates the pattern.
2. New business-case fields are added to `DesignedInitiative`'s canonical
   field set (capex/opex/savings/emissions-water-waste impact/payback/
   NPV/IRR/ROI/funding_sources/incentive) and to *every* creation UI that
   exists, not just one -- the split-brain between
   `DesignNewInitiativeSection.tsx` and `InitiativesWorkflowTab.tsx` was a
   real, shipped bug; do not reintroduce a second divergent field set.
3. New financing/investment linkage goes through the mechanism actually in
   use (`InitiativeLink` with `financing_opportunity`/`marketplace_provider`
   target types), not a second, parallel, unvalidated free-string FK like
   the pre-fix `InvestmentRecord`.

## Failure Conditions

Fail if any of the three invariants above is violated, or if
approval/task history is rendered in the UI with a silent truncation
(e.g. "3 most recent") when the backend already returns the full list.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Emissions/water/waste impact fields on an initiative must carry
source/confidence, never a fabricated estimate presented as measured.

## Cross-Agent Compatibility Notes

Applies identically to backend (FastAPI/Beanie) and frontend
(Next.js/React) changes to this module.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
