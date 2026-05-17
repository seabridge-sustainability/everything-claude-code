# Tasks: [FEATURE NAME]

**Input**: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

## Format

`- [ ] T001 [P] [US1] Description with exact file path`

- `[P]` means independent file ownership and no dependency on incomplete tasks.
- `[US#]` is required for user-story tasks.
- Tests come before implementation where practical.

## Phase 1: Setup

- [ ] T001 Confirm active repo guidance and `.specify` feature artifacts.

## Phase 2: Foundational

- [ ] T002 Define shared contracts, tenant scope, and verification commands before user-story work.

## Phase 3: User Story 1 - [Title] (P1)

**Goal**: [What this story delivers.]
**Independent Test**: [How to verify this story alone.]

### Tests

- [ ] T003 [P] [US1] Add focused test in [path].

### Implementation

- [ ] T004 [US1] Implement [change] in [path].

### Verification

- [ ] T005 [US1] Run [command] and record result.

## Final Phase: Integration And Regression

- [ ] T900 Run focused tests from `quickstart.md`.
- [ ] T901 Run broader checks required by changed surface area.
- [ ] T902 Verify tenant isolation, audit/source traces, AI guardrails, and docs.
- [ ] T903 Update final implementation report with checks run and skipped checks.

## Dependencies

- [Dependency order and blockers.]

## Parallel Opportunities

- [Tasks safe to run in parallel.]

<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_START -->
## /goal Completion Contract

This Spec Kit artifact inherits SeaBridgeAI `/goal`: define the persistent goal, Definition of Done, validation plan, integrations, risks, dependencies, artifacts, and blockers. Implementation must persist until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SPECKIT_TEMPLATE_END -->
