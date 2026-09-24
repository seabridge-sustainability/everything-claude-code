---
description: Analyze and improve test coverage
agent: tdd-guide
subtask: true
---

# Test Coverage Command

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


Analyze test coverage and identify gaps: $ARGUMENTS

## Your Task

1. **Run coverage report**: `npm test -- --coverage`
2. **Analyze results** - Identify low coverage areas
3. **Prioritize gaps** - Critical code first
4. **Generate missing tests** - For uncovered code

## Coverage Targets

| Code Type | Target |
|-----------|--------|
| Standard code | 80% |
| Financial logic | 100% |
| Auth/security | 100% |
| Utilities | 90% |
| UI components | 70% |

## Coverage Report Analysis

### Summary
```
File           | % Stmts | % Branch | % Funcs | % Lines
---------------|---------|----------|---------|--------
All files      |   XX    |    XX    |   XX    |   XX
```

### Low Coverage Files
[Files below target, prioritized by criticality]

### Uncovered Lines
[Specific lines that need tests]

## Test Generation

For each uncovered area:

### [Function/Component Name]

**Location**: `src/path/file.ts:123`

**Coverage Gap**: [description]

**Suggested Tests**:
```typescript
describe('functionName', () => {
  it('should [expected behavior]', () => {
    // Test code
  })

  it('should handle [edge case]', () => {
    // Edge case test
  })
})
```

## Coverage Improvement Plan

1. **Critical** (add immediately)
   - [ ] file1.ts - Auth logic
   - [ ] file2.ts - Payment handling

2. **High** (add this sprint)
   - [ ] file3.ts - Core business logic

3. **Medium** (add when touching file)
   - [ ] file4.ts - Utilities

---

**IMPORTANT**: Coverage is a metric, not a goal. Focus on meaningful tests, not just hitting numbers.
