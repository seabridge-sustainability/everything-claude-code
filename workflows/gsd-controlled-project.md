# GSD Controlled Project Workflow

## Objective

Adapt GSD project setup into a local, approval-gated SeaBridgeAI planning flow.

## Inputs

- User goal and acceptance criteria.
- Repos/modules involved.
- Existing codebase context.
- Approval constraints.
- Target planning artifact path.

## Outputs

- `PROJECT.md`
- `REQUIREMENTS.md`
- `ROADMAP.md`
- `STATE.md`
- `CONTEXT.md`
- Explicit deferred/out-of-scope list.

## Phase Structure

1. Map current repo context.
2. Clarify requirements and assumptions.
3. Identify backend/API, frontend/UI, AI/data, sustainability, security, QA, docs, and cross-repo impacts.
4. Produce roadmap phases.
5. Confirm no requirement was dropped.
6. Record verification plan per phase.

## Required Artifacts

Use `templates/gsd/PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, and `CONTEXT.md`.

## Required Approvals

Approval is required before any commit, push, PR, global install, marketplace install, live/paid call, destructive cleanup, branch cleanup, worktree removal, or autonomous/yolo execution.

## Validation Steps

- Check artifacts reference the canonical SeaBridgeAI path.
- Check all requested requirements are represented or explicitly deferred.
- Check every phase has verification gates.
- Check sustainability data rules and auth/tenant gates are present where relevant.

## Stop Conditions

Stop if requirements are ambiguous, data sources are missing, auth/tenant scope is unknown, a live/cost action is required, or the workflow would need autonomous/yolo execution.
