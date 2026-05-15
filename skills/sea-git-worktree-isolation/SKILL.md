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

Repo path; current branch; dirty status; desired branch/worktree name; approval for creating isolation.

## Expected Outputs

Isolation decision; worktree path or reason working in place; baseline check; cleanup/finish note.

## Mandatory Verification

Run git status and git worktree list; confirm no uncommitted work is overwritten; verify branch and path; run baseline checks when practical.

## Failure Conditions

Fail if user has not approved creating a worktree, target path is unsafe, branch exists with unknown work, or cleanup would delete unmerged work.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

No push, commit, branch deletion, worktree removal, or global install without approval. Never remove product repos or data volumes.

## Cross-Agent Compatibility Notes

Use native worktree support when a runtime provides it. Otherwise use read-only inspection and ask before creating git worktrees.

## Superpowers Adaptation

Partially adapts Superpowers using-git-worktrees with stricter SeaBridgeAI approval and deletion boundaries.
