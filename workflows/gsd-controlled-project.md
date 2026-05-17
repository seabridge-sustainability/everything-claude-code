# GSD Controlled Project Workflow

## Objective

Adapt GSD project setup into a local, approval-gated SeaBridgeAI planning flow.
Every GSD-controlled project starts from the Goal Protocol Default contract.

## Inputs

- User goal and acceptance criteria.
- `/goal` frame with Definition of Done, validation plan, risks, dependencies,
  scope, blockers, and expected artifacts.
- Repos/modules involved.
- Existing codebase context.
- Approval constraints.
- Target planning artifact path.

## Outputs

- Goal state summary and validation evidence path.
- `PROJECT.md`
- `REQUIREMENTS.md`
- `ROADMAP.md`
- `STATE.md`
- `CONTEXT.md`
- Explicit deferred/out-of-scope list.

## Phase Structure

1. Map current repo context.
2. Clarify requirements and assumptions.
3. Confirm the Goal Protocol Definition of Done and validation plan.
4. Identify backend/API, frontend/UI, AI/data, sustainability, security, QA, docs, and cross-repo impacts.
5. Produce roadmap phases.
6. Confirm no requirement was dropped.
7. Record verification plan per phase.

## Required Artifacts

Use `templates/gsd/PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, and `CONTEXT.md`.

## Required Approvals

Approval is required before any commit, push, PR, global install, marketplace install, live/paid call, destructive cleanup, branch cleanup, worktree removal, or autonomous/yolo execution.

## Validation Steps

- Check artifacts reference the canonical SeaBridgeAI path.
- Check artifacts preserve the Goal Protocol Definition of Done and validation plan.
- Check all requested requirements are represented or explicitly deferred.
- Check every phase has verification gates.
- Check sustainability data rules and auth/tenant gates are present where relevant.

## Stop Conditions

Stop if requirements are ambiguous, data sources are missing, auth/tenant scope is unknown, a live/cost action is required, or the workflow would need autonomous/yolo execution.

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
