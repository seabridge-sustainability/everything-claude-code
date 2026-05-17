# Spec Kit And GSD Integration

Spec Kit and GSD are complementary in SeaBridgeAI.

Goal Protocol is the default operating contract above both systems. Start
non-trivial work with `/goal` so the user request, Definition of Done,
validation plan, risks, dependencies, scope, blockers, and artifacts are clear
before choosing Spec Kit or GSD.

Spec Kit is the specification and planning discipline layer. GSD is the
execution loop, persistence, phase orchestration, and UAT validation layer.

## When To Use Spec Kit

Use Spec Kit when the work needs:

- a project or feature constitution
- product requirements and acceptance criteria
- ambiguity reduction
- implementation planning
- contracts and data model planning
- task generation
- consistency and coverage analysis
- requirements-quality checklists

## When To Use GSD

Use GSD when the work needs:

- multi-phase execution
- context persistence
- cross-repo coordination
- structured state files
- UAT validation
- verification loops over long-running work
- forensics after failed or ambiguous workflows

## Recommended Combined Workflow

1. Frame the work with `/goal` using `goal-default`.
2. Map codebase with GSD when the repo area is not already understood.
3. Run `speckit-constitution` for durable principles.
4. Run `speckit-specify` to define what and why.
5. Run `speckit-clarify` to resolve high-impact ambiguity.
6. Run `speckit-plan` for technical artifacts.
7. Run `speckit-tasks` for executable tasks.
8. Run `speckit-analyze` before implementation.
9. Run `speckit-checklist` for requirements QA.
10. Execute with either `speckit-implement` for bounded work or GSD execution for
   multi-phase work.
11. Verify with GSD UAT plus repo tests/checks.
12. Close the `/goal` only after validation evidence satisfies the Definition of Done.

## Artifact Boundaries

| Artifact | Owner | Purpose |
| --- | --- | --- |
| `/goal` frame or `GOAL_PROTOCOL_DEFAULT.md` reference | Goal Protocol | Definition of Done, validation plan, risks, dependencies, scope, blockers, and artifacts |
| `.specify/memory/constitution.md` | Spec Kit | Durable principles |
| `.specify/specs/<feature>/spec.md` | Spec Kit | What and why |
| `.specify/specs/<feature>/plan.md` | Spec Kit | Technical plan |
| `.specify/specs/<feature>/tasks.md` | Spec Kit | Executable task list |
| `.planning/PROJECT.md` | GSD | Phase/project state |
| `.planning/PHASE_PLAN.md` | GSD | Execution phase plan |
| `.planning/VERIFY_WORK.md` | GSD | UAT and validation |

Do not duplicate every line between `.specify` and `.planning`. Cross-link the
artifacts and keep each layer responsible for its own job.

## Backend Example

For a FastAPI feature:

- Spec Kit defines the route behavior, schemas, tenant scope, evidence needs,
  acceptance criteria, and contracts.
- GSD executes the phase plan across endpoint, service, model, tests, and docs.
- Verification checks route registration, schemas, data source, writer,
  auth/tenant isolation, and regression tests.

## Frontend Example

For a dashboard workflow:

- Spec Kit defines the user journey, UI states, API contract, empty/error/loading
  behavior, accessibility, and acceptance criteria.
- GSD coordinates component, API client, state, browser QA, and screenshots.
- Verification checks the actual route with Playwright where practical.

## AI Agent Example

For an AI workflow:

- Spec Kit defines allowed AI behavior, grounding, source traces, confidence,
  approval gates, and no-silent-mutation rules.
- GSD coordinates agent graph changes, prompt/tool tests, API integration, and
  report artifacts.
- Verification checks no fabricated sustainability data and preserves audit
  history.

## Avoiding Drift

- Update the spec before changing scope.
- Update the plan before changing architecture.
- Update tasks before executing newly discovered work.
- Update GSD state when execution status changes.
- Run `speckit-analyze` when artifacts appear inconsistent.
