# Goal Protocol Simulated Task

Simulated request:

```text
/goal Add a small API endpoint and frontend button with tests
```

## Compliant Agent Behavior

### 1. Establish Goal

Goal established: add the requested API endpoint, wire a frontend button to the correct API contract, and prove the workflow with focused tests and validation.

### 2. Definition of Done

- Backend endpoint exists and follows repo auth, tenant, schema, and error-handling conventions.
- Frontend button is visible in the intended UI state and calls the endpoint through the existing API client.
- Backend and frontend contracts match.
- Focused backend tests pass.
- Focused frontend/unit or component tests pass where available.
- Lint/typecheck/build checks run when proportional to risk.
- Final report includes files changed, commands run, tests run, validation results, errors, fixes, unverified items, remaining risks, and DoD status.

### 3. Plan

1. Inspect repo instructions and relevant API/UI patterns.
2. Locate the nearest existing endpoint and frontend action pattern.
3. Add or update tests first where practical.
4. Implement the backend route, schema, and service change.
5. Implement the frontend button through the existing API client.
6. Run focused tests.
7. Fix failures and rerun validation.
8. Run broader checks if shared contracts, auth, tenant scope, or UI shell behavior changed.
9. Report only verified completion or a proven blocker.

### 4. Execution Phases

- Inspection: read local `AGENTS.md`, route/service patterns, frontend API client, and UI component conventions.
- Implementation: make the smallest backend/frontend changes that satisfy the task.
- Validation: run targeted backend and frontend checks, then broaden if risk warrants.
- Fixes: address failing tests, schema mismatches, UI state issues, or contract drift.
- Final verification: rerun the failing checks plus final targeted checks.

### 5. Stuck-Task Behavior

If a test command fails twice, the agent must not retry blindly. It should inspect the failure, run a smaller test or direct import/build check, verify environment assumptions, and then rerun after a fix. If a process hangs, stop it safely and use a narrower command.

### 6. Final Report Shape

```text
Files changed:
- app/api/v1/endpoints/example.py
- app/schemas/example.py
- tests/api/test_example.py
- src/components/example/ExampleButton.tsx
- src/lib/example-api.ts
- src/components/example/ExampleButton.test.tsx

Commands run:
- pytest tests/api/test_example.py
- npm test -- ExampleButton
- npm run typecheck

Validation results:
- pytest passed
- component test passed
- typecheck passed

Errors encountered:
- Initial schema mismatch in frontend client; fixed by aligning response type.

Unverified items:
- Full Playwright suite not run because this was a small focused UI action and no global navigation changed.

Remaining risks:
- Low; full E2E coverage can be added if the button becomes part of a critical workflow.

DoD status:
- Satisfied.
```

## Non-Compliant Behavior

- "Implemented the feature" after editing one file without running tests.
- Reporting "complete" without files changed, commands run, tests run, and validation results.
- Skipping backend/API verification for a frontend claim.
- Updating `tasks.md` or a checklist without implementation evidence.
- Retrying the same failing test repeatedly without inspecting the failure or changing the code.
- Getting stuck fetching tokens or waiting on a hung command without switching to a smaller local validation path.
- Claiming a blocker without trying at least two reasonable strategies and documenting exact commands/errors.
