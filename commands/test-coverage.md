---
description: Analyze coverage, identify gaps, and generate missing tests toward the target threshold.
---

# Test Coverage

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Analyze test coverage, identify gaps, and generate missing tests to reach 80%+ coverage.

## Step 1: Detect Test Framework

| Indicator | Coverage Command |
|-----------|-----------------|
| `jest.config.*` or `package.json` jest | `npx jest --coverage --coverageReporters=json-summary` |
| `vitest.config.*` | `npx vitest run --coverage` |
| `pytest.ini` / `pyproject.toml` pytest | `pytest --cov=src --cov-report=json` |
| `Cargo.toml` | `cargo llvm-cov --json` |
| `pom.xml` with JaCoCo | `mvn test jacoco:report` |
| `go.mod` | `go test -coverprofile=coverage.out ./...` |

## Step 2: Analyze Coverage Report

1. Run the coverage command
2. Parse the output (JSON summary or terminal output)
3. List files **below 80% coverage**, sorted worst-first
4. For each under-covered file, identify:
   - Untested functions or methods
   - Missing branch coverage (if/else, switch, error paths)
   - Dead code that inflates the denominator

## Step 3: Generate Missing Tests

For each under-covered file, generate tests following this priority:

1. **Happy path** — Core functionality with valid inputs
2. **Error handling** — Invalid inputs, missing data, network failures
3. **Edge cases** — Empty arrays, null/undefined, boundary values (0, -1, MAX_INT)
4. **Branch coverage** — Each if/else, switch case, ternary

### Test Generation Rules

- Place tests adjacent to source: `foo.ts` → `foo.test.ts` (or project convention)
- Use existing test patterns from the project (import style, assertion library, mocking approach)
- Mock external dependencies (database, APIs, file system)
- Each test should be independent — no shared mutable state between tests
- Name tests descriptively: `test_create_user_with_duplicate_email_returns_409`

## Step 4: Verify

1. Run the full test suite — all tests must pass
2. Re-run coverage — verify improvement
3. If still below 80%, repeat Step 3 for remaining gaps

## Step 5: Report

Show before/after comparison:

```
Coverage Report
──────────────────────────────
File                   Before  After
src/services/auth.ts   45%     88%
src/utils/validation.ts 32%    82%
──────────────────────────────
Overall:               67%     84%  PASS:
```

## Focus Areas

- Functions with complex branching (high cyclomatic complexity)
- Error handlers and catch blocks
- Utility functions used across the codebase
- API endpoint handlers (request → response flow)
- Edge cases: null, undefined, empty string, empty array, zero, negative numbers

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
