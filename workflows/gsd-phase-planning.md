# GSD Phase Planning Workflow

## Objective

Convert a roadmap phase into an executable SeaBridgeAI phase plan with bounded scope and proof requirements.

## Inputs

- Approved roadmap phase.
- Current `STATE.md` and `CONTEXT.md`.
- Relevant code paths and contracts.
- Required approvals and constraints.

## Outputs

- `PHASE_PLAN.md`
- Updated `STATE.md`
- Updated `CONTEXT.md`
- Verification checklist for the phase.

## Phase Structure

1. Restate the phase goal.
2. List files likely to change.
3. Split work into backend/API, frontend/UI, AI/data integrity, sustainability, security, QA/testing, documentation, and cross-repo lanes as needed.
4. Define tests and checks before implementation.
5. Identify blocked, deferred, and approval-gated items.

## Required Artifacts

Use `templates/gsd/PHASE_PLAN.md`, `STATE.md`, and `CONTEXT.md`.

## Required Approvals

Approval is required for new worktrees, subagent parallelism, live calls, paid calls, commits, pushes, PRs, merges, branch cleanup, or global installs.

## Validation Steps

- Verify no requirement was dropped.
- Verify plan tasks have file paths and checks.
- Verify endpoint/database/source/auth/tenant gates where relevant.
- Verify no fabricated sustainability data can enter the phase.

## Stop Conditions

Stop if the plan cannot be verified, if scope is too broad for one phase, if ownership boundaries conflict, or if execution would rely on unapproved autonomous behavior.

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
