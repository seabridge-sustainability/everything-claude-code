---
name: speckit-plan
description: Create technical implementation artifacts from a completed feature spec.
---

# speckit-plan

## Purpose

Translate a feature spec into a technical plan that maps requirements to files,
contracts, data models, tests, rollout risks, and validation steps.

## Inputs

- `.specify/memory/constitution.md`.
- `.specify/specs/<feature-id>/spec.md`.
- SeaBridge plan preset:
  `skills/spec-kit/presets/seabridge/seabridge-plan-template.md`.
- Repo-local architecture and integration docs.

## Outputs

Write under the active feature directory:

```text
plan.md
research.md
data-model.md
contracts/
quickstart.md
```

## Required Plan Coverage

- backend files
- frontend files
- models and schemas
- services
- endpoints
- agents
- database changes and migrations if needed
- API contracts
- UI component tree
- tests
- validation steps
- stuck-task strategy for complex work
- rollout risks
- backward compatibility
- integration points
- observability/logging
- security checks

## Workflow

1. State assumptions, target artifacts, and done criteria.
2. Load constitution and spec.
3. Fill technical context from repo evidence; mark unknowns explicitly.
4. Run a constitution check before design.
5. Produce `research.md` for decisions and alternatives.
6. Produce `data-model.md` for entities, relationships, tenant scope, audit
   fields, lifecycle states, and migration needs.
7. Produce `contracts/` for APIs, events, agent tool contracts, or UI/backend
   payloads.
8. Produce `quickstart.md` with validation scenarios and exact commands.
9. Add stuck-task fallback rules for likely failures: alternate commands,
   smaller tests, log inspection, and blocker criteria.
10. Re-run the constitution check after design.
11. Report artifacts and recommended next skill: `speckit-tasks`.

## Verification

- Every functional requirement has an implementation strategy or a documented
  deferral.
- Every contract has a planned owner and test strategy.
- Data changes identify tenant scope, migration/backfill needs, and audit impact.
- AI behavior includes guardrails, source grounding, approval gates, and
  missing-data behavior.
- Complex implementation plans include anti-stuck behavior and completion
  evidence requirements.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
