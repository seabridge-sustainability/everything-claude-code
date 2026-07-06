---
name: sea-task-queue-execution
description: Use when work should be treated as a queued issue, task, ticket, AFK implementation unit, or human-reviewed execution slice with clear scope and acceptance criteria.
---

# sea-task-queue-execution

## Purpose

Run scoped engineering work as a finite task queue item instead of an open-ended
agent loop.

## When To Call

Use for GitHub/Linear/local issues, user-provided tickets, AFK execution,
implementation slices, and work that needs triage before code changes.

## Procedure

1. Triage: read the task, acceptance criteria, comments, labels, and prior notes.
2. Scope: name affected repos, files, non-goals, risks, approvals, and exit
   conditions.
3. Strategy: propose the smallest implementation plan when multiple viable paths
   or protected areas are involved; otherwise proceed inside the known scope.
4. Execute: make bounded changes only in the task scope. Preserve dirty user work.
5. Verify: run repo-appropriate tests/checks and capture exact evidence.
6. Close: apply `sea-verification-before-completion`, then report files changed,
   validation, skipped checks, residual risks, and whether the Definition of
   Done is met.

## Human Checkpoints

Ask before acting when scope is ambiguous, architecture choices conflict,
credentials/production/billing/deployment/destructive actions are involved, or
the implementation would exceed the task boundary. Otherwise continue locally.

## Failure Conditions

Stop or re-triage if the task lacks acceptance criteria, required access is
missing, verification cannot prove the result, or work would require unapproved
commit, push, PR, issue mutation, install, migration, live call, or cleanup.

## Cross-Agent Notes

GitHub Issues, Linear, local markdown, or chat can serve as the queue. The issue
tracker is optional and never authorizes external publication by itself.

## Related Skills

Use `sea-skill-map` to pick procedures, `sea-error-recovery-loop` after failures,
`sea-test-driven-development` for behavior changes, and
`sea-verification-before-completion` before completion claims.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before
implementation or review, establish the persistent goal, Definition of Done,
validation plan, affected systems, dependencies, risks, and expected artifacts.
Continue through validation and fixes until the DoD is satisfied or a hard
blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
