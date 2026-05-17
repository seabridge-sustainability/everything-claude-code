# Spec Kit And /goal Integration

`/goal` is the default operating contract for SeaBridgeAI Spec Kit work. Spec Kit specs, plans, tasks, implementation, analysis, and checklists inherit the persistent goal, Definition of Done, validation gates, and no-false-completion rule.

Detailed auto-loop hardening reference: `docs/SPECKIT_GOAL_AUTO_LOOP_INTEGRATION.md`.

## Workflow

1. Start with `/goal <task>` or equivalent goal framing.
2. Build or update the Spec Kit constitution, spec, plan, and tasks with the DoD visible.
3. Ensure `plan.md` includes validation strategy, integration points, dependencies, and risks.
4. Ensure `plan.md` includes a stuck-task strategy for complex work.
5. Ensure `tasks.md` includes test, validation, documentation, regression, and completion-evidence tasks.
6. Run `speckit-implement` only after the goal and DoD are clear.
7. Run `speckit-analyze` or equivalent review to detect missing validation, schema drift, incomplete requirements, and missing completion evidence.
8. Finish only after the DoD is verified or blockers are documented.

## Inheritance

- Constitution: includes `/goal` as the default completion contract.
- Spec: describes user value, workflows, edge cases, and pass/fail behavior.
- Plan: names architecture, contracts, integrations, risks, and validation.
- Tasks: include focused tests, integration checks, docs updates, and final verification.
- Implement: persists through failures until validated or blocked.
- Checklist: includes goal completion, no false completion, completion evidence, and skipped-check disclosure.

## Required Checks

Spec Kit implementation must not mark tasks complete unless evidence exists. Validation should include tests, build/lint/typecheck, API/UI/runtime checks, reviewer or QA workflows, and security/data checks when relevant.

If the same command or approach fails twice, Spec Kit execution must inspect logs, change strategy, isolate the failure, reduce scope, use a different validation path, or document a proven blocker.

## Approval Gates

Spec Kit does not authorize commits, pushes, dependency installs, paid or live provider calls, migrations, production data changes, destructive actions, protected-branch work, or long-running jobs.

## Completion

Spec Kit work is complete only when the `/goal` DoD is satisfied, the final report lists evidence, and any unverified items are documented with risk and next steps.
