---
name: sea-finishing-development-branch
description: SeaBridgeAI finishing branch skill adapted from Superpowers for final verification, diff review, handoff, and manual approval before commit, push, merge, PR, or cleanup.
---

# sea-finishing-development-branch

## Purpose

Close a development branch or local change set without overstating readiness.

## When To Call

Use after implementation tasks are complete and before any merge, commit, push, PR, cleanup, or completion claim.

## Required Inputs

Changed files; branch/worktree state; tests run; target integration path; approval status.

## Expected Outputs

Final verification result; diff summary; options requiring approval; handoff; remaining risks.

## Mandatory Verification

Run tests/checks, git status, git diff review, route/API/UI/source checks as relevant, and confirm no approval-gated action happened.

## Failure Conditions

Fail if tests fail, diff includes unrelated changes, approval is missing for commit/push/merge/PR/global install/cleanup, or worktree has unique unmerged work.

## SeaBridgeAI Sustainability And Data-Integrity Requirements

Sustainability outputs must be verified for sources/provenance and missing-data states before any readiness claim.

## Cross-Agent Compatibility Notes

Claude may present merge/PR choices. Codex/Gemini/OpenCode/Cursor/Copilot CLI must keep publish and cleanup local/manual unless explicitly approved.

## Superpowers Adaptation

Fully embeds Superpowers finishing-a-development-branch with SeaBridgeAI no-push/no-delete boundaries.
