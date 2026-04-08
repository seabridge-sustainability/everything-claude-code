---
description: Analyze and improve test coverage
agent: tdd-guide
subtask: true
---

# Test Coverage Command

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
