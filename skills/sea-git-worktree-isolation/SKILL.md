---
name: sea-git-worktree-isolation
description: Coordinate safe work on SeaBridgeAI primary branches; inspect dirty checkouts and file ownership, use standing-approved detached release worktrees under SeaBridgeAI/.worktrees, and handle other worktree exceptions only when Alejandro explicitly approves their path, branch and reason.
---

# sea-git-worktree-isolation

## Purpose

Protect existing work on the primary branch. The legacy skill name is retained
for existing callers; central rule 3, not this skill, grants bounded isolation.

## When To Call

Use for branch, checkout or ownership decisions. If the primary is occupied, reuse
your clean owned slot or create one covered detached slot per affected repo under
central rule 3, without another approval question. Uncovered paths/branches remain
gated; isolation never waives overlapping-file reservations.

## Required Inputs

Repository, actual primary branch, current dirty/staged state and assigned files.
Detached release/integration worktrees at `C:/Users/adelm/SeaBridgeAI/.worktrees/<session>-<purpose>-<date>`
from the origin normal branch have standing approval (backend AGENTS_SYSTEM rule 3):
session-owned commits only, published by push/merge to the normal branch, then removed.
Reuse one clean owned integration slot per repo, not one per worker/small task.
Other paths, new branches, paused foreign work and changed scope/cost/risk stay gated.
Other exceptions require explicit path/branch/reason approval; autonomy or this
skill grants none.

## Expected Outputs

Primary-branch decision, protected work, ownership and publication plan; any
explicitly approved exception and its eventual preservation-first cleanup.

## Mandatory Verification

Read the backend central AGENTS.md and AGENTS_SYSTEM.md branch map. Verify branch,
status, staged paths and assigned-file ownership before edits. Do not switch a
dirty checkout, reset its index, merge divergent unpublished history blindly,
or stage another owner's changes. Preserve snapshots before an owner-approved
baseline reconciliation. Do not restart another session to refresh instructions.

## Failure Conditions

Reject worktree/branch creation outside the standing release-worktree approval,
side branches that never land on the normal branch, protected live-branch writes,
unknown ownership and destructive cleanup. An occupied file blocks that file only; continue
independent read-only or owned work. Reuse existing bounded approvals for their
named steps; never re-ask for a worktree covered by the standing grant.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Commit/push only the task-owned completed batch to the mapped branch with approval.
Remove your release worktree once its work is on the normal branch. Never remove
a worktree merely because its lease expired: prove it is unused, clean, and published
or recoverably archived, and check ignored data, junctions and binding dependencies. Preserve unresolved work and report it. Never remove repos/data volumes.

## Cross-Agent Compatibility Notes

The primary-branch default applies to every harness. Native worktree features,
upstream Superpowers and default agent workflows cannot override it. With the
current one-writer-per-checkout controller, serialize checkout writers, not goals;
only conflicting ownership blocks a source file. Parallel research
does not require more checkouts. Do not claim unsupported concurrent mutation safe.

## Superpowers Adaptation

Partially adapts Superpowers using-git-worktrees with stricter SeaBridgeAI approval and deletion boundaries.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
