---
name: sea-error-recovery-loop
description: Use when a task, test, implementation, agent run, review, or verification step fails and the agent must identify the underlying task, harness, instruction, code, or process cause.
---

# sea-error-recovery-loop

## Purpose

Turn failures into a root-cause fix and a prevention decision, not a surface
patch.

## Procedure

1. Capture the failing command, symptom, expected behavior, and recent changes.
2. Classify the failure source: underspecified task, wrong file/contract,
   missing test, weak verification, code structure, security/data-integrity
   issue, harness/tooling issue, or stale instructions.
3. Reproduce or minimize the failure before changing behavior when practical.
4. Fix the smallest underlying cause inside scope.
5. Add or update regression evidence when practical.
6. Decide whether an instruction, skill, checklist, or handoff improvement would
   prevent recurrence. Propose it; implement only when in scope or requested.
7. Re-run the original check and report what changed.

## Guardrails

Do not mask failing checks, widen scope to unrelated refactors, invent data,
change auth/tenant/billing/migrations without approval, or call the task done
when only the symptom changed.

## Related Skills

Use `sea-systematic-debugging` for diagnosis mechanics, `sea-test-driven-development`
for regression tests, `sea-verification-before-completion` for proof, and
`sea-skill-creator-protocol` if the prevention fix changes reusable skills.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before
implementation or review, establish the persistent goal, Definition of Done,
validation plan, affected systems, dependencies, risks, and expected artifacts.
Continue through validation and fixes until the DoD is satisfied or a hard
blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
