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

Block or re-triage only the dependent lane when acceptance/access/verification
is missing or an action exceeds the existing scoped authorization. Reuse valid
covered approvals instead of asking again. Continue independent authorized work;
pause only on an explicit owner request and retain genuine host/resource/budget
limits. Never turn a queue wait into an unsupported whole-goal blocked claim.

For RAM-heavy checks, shared-backend use, repository writers and releases, record
resource/repository, owner, reason, enqueue time, next checkpoint and independent
action in the existing ECC records. `node scripts/workspace-queue.js status` reads
current RAM and effective ownership, never grants a lease or starts a service.
Reconcile service state separately; lease expiry alone permits no takeover. Root
coordinates bounded writer handoffs and consolidated releases. Diagnose aging/
circular waits; do not create worktrees/ports, kill sessions, repeat empty polls
or bypass normal gates.

The queue-aware controller CLI uses only an explicitly reviewed, pinned host and
queue configuration. Admission binds the current goal/plan/session, checkpoint,
dependency evidence and supervisor; it does not grant authority. A fresh
invocation reuses resolved dependency evidence, not a new session copy. Unchanged
completed checkpoints do not run again. Interrupted claims retain their original
token: recovery requires verified supervisor death, job cessation, known spend,
current ownership/source/dependencies and resource headroom. Expiry alone is not
permission to take a slot. Absolute lease deadlines include admission and lock
reconciliation time. Owner-paused/cancelled histories require their actual owner
checkpoint; unknown effects remain inspection/reconciliation, never replay.

This is opt-in controller behavior, not an installed vendor daemon or proof that
existing Claude/Codex/Gemini/OpenCode chats automatically continue. Run the
matching native harness acceptance before claiming native activation.

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
