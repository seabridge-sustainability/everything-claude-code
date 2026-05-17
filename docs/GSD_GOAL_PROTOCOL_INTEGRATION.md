# GSD And /goal Integration

`/goal` is the default operating contract for SeaBridgeAI tasks. GSD commands inherit `/goal`; they do not replace it.

Detailed auto-loop hardening reference: `docs/GSD_GOAL_AUTO_LOOP_INTEGRATION.md`.

## Mapping

- `/goal` initializes the persistent objective, Definition of Done, validation plan, risks, approvals, and expected artifacts.
- `/gsd-map-codebase` supports the Analyze phase.
- `/gsd-discuss-phase` resolves unclear requirements before implementation.
- `/gsd-plan-phase` creates an executable plan with DoD and validation gates.
- `/gsd-execute-phase` runs scoped implementation waves and must validate after each meaningful milestone.
- `/gsd-verify-work` proves the DoD with real evidence before completion.
- `/gsd-quick` inherits `/goal` for non-trivial tasks and may not skip validation.
- `/gsd-next` routes between phases but must not bypass verification.
- `/gsd-fast`, if present in a repo-local copy, is only for trivial or inspection-only work.
- `/gsd-code-review`, `/gsd-secure-phase`, and `/gsd-ui-review` are review/verification gates, not substitutes for tests or runtime checks.

## Rules

- Every GSD phase must inherit the `/goal` DoD.
- GSD quick or fast modes still require validation proportional to risk.
- GSD execute must not claim completion because files were generated or tasks were checked off.
- GSD verify must record concrete evidence: commands, exit codes, browser/API checks, reviewer findings, or documented blockers.
- If a GSD command or subagent repeats the same failing action twice, it must inspect logs, change strategy, isolate scope, or document a proven blocker.
- Final GSD reports must include files changed, commands run, tests run, validation results, errors, fixes, unverified items, remaining risks, and DoD status.
- Commits, pushes, installs, live calls, migrations, destructive actions, and protected-branch work still require explicit separate approval.

## When To Use

Use `/goal` directly for bounded tasks that can be completed in one local execution loop.

Use `/goal` plus GSD when work is multi-phase, multi-repo, high-risk, likely to outlive the current session, or needs structured artifacts under `.planning/`.

Example:

```text
/goal implement phase 1 of procurement scoring with tests
/gsd-map-codebase
/gsd-plan-phase
/gsd-execute-phase
/gsd-verify-work
```

## Completion

GSD work is complete only when the `/goal` DoD is satisfied or a hard blocker is documented with remaining risk and next required step.
