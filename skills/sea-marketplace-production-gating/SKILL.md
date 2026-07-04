---
name: sea-marketplace-production-gating
description: Keep SeaBridgeAI marketplace demo/seed/bootstrap behavior environment-gated out of production, not just role-gated.
---

# sea-marketplace-production-gating

## Purpose

Prevent demo or seed marketplace data/actions from being reachable in a
production environment, now that the marketplace module is in production
commercialization.

## When To Call

Before touching `/marketplace/demo/*`, any bootstrap/seed endpoint, or any
new marketplace action that writes example/demo data.

## Required Inputs

The endpoint or action being added/changed.

## Expected Outputs

Confirmation that the path is blocked in a production environment, plus
the test that proves it.

## Mandatory Verification

Confirm an explicit environment check (`settings.environment` against a
production-environments set) gates the path, in addition to any
role/auth check -- a role gate alone is not sufficient, since any
write-role user in production could otherwise trigger it. Confirm a test
exists that sets the environment to production and asserts the endpoint
is blocked (404, not just a warning).

## Failure Conditions

Fail if a demo/seed/bootstrap path is shipped with only a role gate and
no environment gate, or if the production-blocked behavior has no test
coverage.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Demo marketplace data must never be reachable by a real tenant in
production, even transiently.

## Cross-Agent Compatibility Notes

Applies to any coding agent adding marketplace endpoints, regardless of
which harness is driving.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
