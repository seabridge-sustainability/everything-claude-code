---
name: sea-git-worktree-isolation
description: SeaBridgeAI git worktree isolation adapted from Superpowers for local-only feature isolation, dirty-worktree safety, branch hygiene, and no-push/no-delete approval boundaries.
---

# sea-git-worktree-isolation

## Purpose

Protect existing work by isolating risky or parallel changes when approved.

## When To Call

Use before large feature work, plan execution, risky refactors, parallel lanes, or when current repo is dirty.

## Required Inputs

Repo path; current branch; dirty status; desired branch/worktree name; and either current-session approval for isolation or a bounded task approval that already includes safe local implementation work.

## Expected Outputs

Isolation decision; worktree path or reason working in place; baseline check; cleanup/finish note.

## Mandatory Verification

Run git status and git worktree list; confirm no uncommitted work is overwritten; verify branch and path; run baseline checks when practical. For a reused long-lived worktree, compare its root `AGENTS.md` safety and goal marker blocks with the current repository instructions before acting; if they drift, refresh only the instruction file through the normal sync path and restart the agent session before relying on the new policy.

## Failure Conditions

Fail if no applicable approval exists, the target path is unsafe, the branch exists with unknown work, or cleanup would delete unmerged work. Do not demand a second approval when the current task's bounded approval already covers isolated local implementation.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

No push, commit, branch deletion, removal of a foreign worktree, or global install without applicable approval. A same-task detached worktree may be created under a bounded implementation approval. It may be removed under that same approval only after proving it is clean, contains no unique commit, and is no longer in use; report the removal. Never remove product repos or data volumes.

## Cross-Agent Compatibility Notes

Use native worktree support when a runtime provides it. Otherwise use read-only inspection. Ask before creating a worktree only when no current bounded approval covers local isolation.

## Superpowers Adaptation

Partially adapts Superpowers using-git-worktrees with stricter SeaBridgeAI approval and deletion boundaries.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
