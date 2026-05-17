# GSD Goal Auto-Loop Integration

`/goal` initializes autonomous persistent execution. GSD provides planning, state, and phase mechanics inside that same mode; it does not weaken the Definition of Done.

## Required Inheritance

- `/gsd-plan-phase` must include a validation plan, completion evidence expectations, and a stuck-task strategy for complex work.
- `/gsd-execute-phase` inherits `/goal` and must continue through implementation, validation, fixes, and re-validation until the DoD is satisfied or a hard blocker is documented.
- `/gsd-quick` inherits `/goal` when the task is non-trivial; it may skip optional agents, but it may not skip validation.
- `/gsd-fast`, where present, is only for trivial or inspection-only work and must say so before execution.
- `/gsd-verify-work` must require completion evidence: files changed, commands run, tests run, validation results, errors, fixes, unverified items, risks, and DoD status.
- `/gsd-next` must not skip verification. Routing from execution to a later phase must pass through verify-work when implementation summaries exist.

## Auto-Loop Rules

- `/goal` is the user-facing command; auto-loop is the execution behavior.
- GSD phases operate inside `/goal` auto-loop unless a higher-priority safety rule blocks action.
- GSD must not mark work complete from generated plans, checked boxes, or summaries alone.
- Stuck-loop fallback applies to every GSD command and agent: after 2 identical failures, inspect logs, change strategy, reduce scope, use a smaller command, and document blockers.
- Verification is mandatory and proportional to risk.

## Completion

GSD work is complete only when the `/goal` Definition of Done is satisfied with evidence or a hard blocker is proven with exact commands/errors and at least two reasonable strategies attempted.
