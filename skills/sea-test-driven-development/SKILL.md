---
name: sea-test-driven-development
description: SeaBridgeAI TDD skill adapted from Superpowers for backend, frontend, AI, data, and sustainability workflows with red-green-refactor, contract tests, and source-integrity tests.
---

# sea-test-driven-development

## Purpose

Use tests to define behavior before implementation wherever feasible.

## When To Call

Use for features, bug fixes, refactors, behavior changes, endpoint contracts, AI output guards, and data calculations.

## Required Inputs

Behavior to change; test location; expected failing assertion; verification command; exceptions if TDD is impractical.

## Expected Outputs

Failing test evidence; minimal implementation; passing test evidence; refactor notes.

## Mandatory Verification

Run the new test and observe the intended failure first, then implement minimal code, run focused tests, and broaden checks when risk warrants.

Required loop:

1. Define the behavior and exact verification command.
2. Add or update the smallest useful test.
3. Run it before implementation to prove red when practical.
4. Implement only enough code to pass.
5. Re-run the focused test to prove green.
6. Refactor only if it reduces real complexity.
7. Run broader checks when risk touches shared contracts, auth, data integrity, AI output, or user-facing flows.
8. Record any skipped red/green step and why.

## Failure Conditions

Fail if implementation precedes tests without reason, the red failure was not observed, tests only assert mocks, or sustainability data assertions allow fabrication.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Include tests for missing sources, provenance, units, tenant isolation, auth failures, and provisional/demo labels where relevant.

## Cross-Agent Compatibility Notes

All agents can apply red-green-refactor with their local test runner. Document skipped TDD with reason.

## Superpowers Adaptation

Fully embeds Superpowers test-driven-development with SeaBridgeAI domain and auth gates.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
