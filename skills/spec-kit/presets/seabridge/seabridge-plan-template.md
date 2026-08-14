# Implementation Plan: [FEATURE NAME]

**Feature ID**: `[FEATURE_ID]`
**Spec**: `spec.md`
**Date**: [DATE]

## Summary

[Primary requirement and chosen technical approach.]

## Constitution Check

| Principle | Status | Notes |
| --- | --- | --- |
| Existing architecture first | [PASS/FAIL/NEEDS CLARIFICATION] | |
| Tenant scope, privacy, auditability | [PASS/FAIL/NEEDS CLARIFICATION] | |
| Test and verification before completion | [PASS/FAIL/NEEDS CLARIFICATION] | |
| AI governance and no silent mutations | [PASS/FAIL/NEEDS CLARIFICATION] | |
| Simplicity and no duplicate systems | [PASS/FAIL/NEEDS CLARIFICATION] | |

## Technical Context

- **Backend files**: [paths or N/A]
- **Frontend files**: [paths or N/A]
- **Models/Schemas**: [paths or N/A]
- **Services**: [paths or N/A]
- **Endpoints**: [paths or N/A]
- **Agents/Tools**: [paths or N/A]
- **Database changes**: [none/migration/backfill details]
- **API contracts**: [contract files]
- **UI component tree**: [route/component hierarchy or N/A]
- **Tests**: [focused and broad checks]
- **Observability/logging**: [events/logs/metrics]
- **Security checks**: [auth/tenant/privacy/secrets/uploads/rate limits]

## Research Decisions

Write detailed decisions to `research.md`.

## Data Model

Write entities, tenant scope, audit fields, lifecycle states, and migration notes
to `data-model.md`.

## Contracts

Write API, event, agent tool, or UI/backend contracts under `contracts/`.

## Quickstart And Validation

Write exact validation steps to `quickstart.md`.

## Rollout Risks And Backward Compatibility

- [Risk, compatibility concern, rollback/feature flag, migration plan.]

## Post-Design Constitution Check

Repeat the constitution check after artifacts are complete.

<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_START -->
## /goal Completion Contract

This Spec Kit artifact inherits SeaBridgeAI `/goal`: define the persistent goal, Definition of Done, validation plan, integrations, risks, dependencies, artifacts, and blockers. Implementation must persist until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_END -->
