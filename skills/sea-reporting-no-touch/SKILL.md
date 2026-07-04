---
name: sea-reporting-no-touch
description: Mandatory GRESB no-touch pre-flight gate before any change near manageesg-backend reporting/emission-factor code paths.
---

# sea-reporting-no-touch

## Purpose

Formalize the repo-wide GRESB no-touch policy as an explicit, repeatable
gate instead of an ad hoc check, so GRESB-writing paths are never modified
without a separately scoped approval -- even for pure hardening/refactor
work with good intentions.

## When To Call

Before touching `app/api/v1/endpoints/reports.py`,
`app/services/report_workspace_service.py`,
`app/api/v1/endpoints/emission_factor.py`, any `GresbAssessment`-adjacent
model, or anything under a `gresb` path/name.

## Required Inputs

The list of files about to be changed.

## Expected Outputs

An explicit go/no-go line in the task report: "GRESB check: ran
`grep -ri gresb` on <files>, result: <clean | N matches found>." If
matches are found, the affected file's change is dropped from this task
and reported as needing a separate, explicitly scoped GRESB request --
not silently skipped without mention.

## Mandatory Verification

Grep every file about to be touched (case-insensitive) for `gresb` and
for known GRESB model names (`GresbAssessment` and siblings) before
editing. Re-run the same grep on the final diff before calling the task
done.

## Failure Conditions

Fail if a GRESB-adjacent file was modified without a separate, explicit,
scoped user approval for that specific change, or if the pre-flight grep
step was skipped or run after the edit instead of before.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

GRESB assessment data must never be backfilled, reformatted, or
reinterpreted as a side effect of an unrelated change.

## Cross-Agent Compatibility Notes

Any agent touching reporting code in this repo should run this gate
first, regardless of which coding tool is driving.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
