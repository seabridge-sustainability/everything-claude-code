---
name: speckit-implement
description: Execute Spec Kit tasks with SeaBridgeAI persistent DoD, TDD, approval gates, and verification.
---

# speckit-implement

## Purpose

Implement `tasks.md` while preserving SeaBridgeAI controlled execution,
test-first discipline, approval gates, and verification before completion.

## Inputs

- `.specify/specs/<feature-id>/tasks.md`
- `spec.md`, `plan.md`, `contracts/`, `quickstart.md`
- Repo-local instructions and relevant `sea-*` skills.

## Output

- Code and test changes scoped to the approved tasks.
- Updated task checkboxes when tasks are completed.
- Verification evidence and skipped-check rationale.

## Mandatory SeaBridgeAI Execution Protocol

1. Define Definition of Done before edits.
2. Treat `/goal` and auto-loop as the same persistent execution mode.
3. Inspect dirty worktree and avoid reverting user changes.
4. Execute tasks in dependency order.
5. Write or update tests before implementation when practical.
6. Implement the smallest scoped change.
7. Run focused tests/checks.
8. Fix failures and rerun validation.
9. If the same command or approach fails twice, inspect logs, change strategy,
   isolate the problem, reduce scope, or document a proven blocker.
10. Broaden checks when shared behavior, auth, tenant isolation, AI output,
   frontend workflows, or data contracts are touched.
11. Update `tasks.md` only for tasks actually completed.
12. Do not claim completion until DoD is satisfied or skipped checks are
    explicitly documented.

## Approval Gates

Stop and ask before:

- commits, pushes, PRs, or GitHub issue creation
- dependency installs
- migrations or backfills
- production data changes
- paid/live provider calls
- auth/security policy changes with unclear scope
- destructive filesystem, database, vector-store, cloud, or infra operations
- long-running training jobs

## Integration With GSD

Use `sea-gsd-controlled-execution` instead of direct task execution when the work
is multi-phase, multi-repo, high-risk, or likely to outlive the current session.
Keep `.specify/tasks.md` and `.planning/PHASE_PLAN.md` aligned by cross-linking
rather than duplicating every detail.

## Verification

- All completed tasks have evidence.
- Tests/checks match the repository and risk level.
- Tenant isolation, source trace, auditability, and AI guardrails are verified
  where relevant.
- Final report lists changed files, checks run, skipped checks, residual risks,
  and approval-gated follow-ups.
- Final report includes completion evidence: files changed, commands run, tests
  run, validation results, errors, fixes, unverified items, remaining risks, and
  whether the DoD is satisfied.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
