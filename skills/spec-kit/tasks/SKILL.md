---
name: speckit-tasks
description: Generate dependency-ordered `tasks.md` from spec and plan artifacts.
---

# speckit-tasks

## Purpose

Create an executable, dependency-ordered task list that an agent can implement
without rediscovering the plan.

## Inputs

- `spec.md`
- `plan.md`
- Optional `research.md`, `data-model.md`, `contracts/`, `quickstart.md`
- SeaBridge tasks preset:
  `skills/spec-kit/presets/seabridge/seabridge-tasks-template.md`.

## Output

Write:

```text
.specify/specs/<feature-id>/tasks.md
```

## Task Rules

- Order by dependency.
- Include exact file paths.
- Mark parallelizable tasks with `[P]` only when they touch different files and
  have no dependency on incomplete tasks.
- Include tests before implementation where practical.
- Separate backend, frontend, agent, data, docs, and verification tasks.
- Include verification checkpoints per user story.
- Include final integration and regression checks.
- Include completion-evidence tasks covering files changed, commands run, tests
  run, validation results, errors, fixes, unverified items, remaining risks, and
  DoD status.
- Include anti-stuck tasks for likely risky commands or integrations.
- Keep tasks small enough for a focused coding session.

## Required Format

```markdown
- [ ] T001 [P] [US1] Add focused test in tests/path/test_file.py
- [ ] T002 [US1] Implement service change in app/services/example.py
```

Setup and foundational tasks may omit the user-story label. User-story tasks
must include `[US#]`.

## Workflow

1. Load spec and plan artifacts.
2. Extract user stories, requirements, contracts, entities, and validation
   scenarios.
3. Generate setup and foundational tasks first.
4. Generate one phase per user story in priority order.
5. Add final hardening, docs, and verification tasks.
6. Add dependency notes and parallel examples.
7. Validate every task has a concrete path or artifact.
8. Report task count, parallel opportunities, and MVP scope.

## Verification

- Every user story can be implemented and verified independently.
- Every contract has implementation and test tasks.
- Every requirement is represented by at least one task or documented as deferred.
- No task asks for broad refactors, duplicate modules, or unapproved installs.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
