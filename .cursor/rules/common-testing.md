---
description: "Risk-scaled test selection; load when behavior or test code changes."
alwaysApply: false
---
# Testing Requirements

## Risk-Scaled Testing

Respect the repository's configured coverage thresholds and required suites;
there is no universal per-change percentage. Choose the smallest set of checks
that would discriminate the requested behavior from a broken implementation,
then broaden for failures, changed contracts, or material risk.

Test types are selected by boundary, not all required for every edit:

1. **Unit tests** - functions, utilities, and component behavior
2. **Integration tests** - APIs, databases, queues, and service boundaries
3. **E2E tests** - critical user workflows
4. **Evals/runtime verification** - variable AI output or behavior that static
   checks cannot prove

## Test-Driven Development

For defects and stable behavior changes, prefer a focused failing test (RED),
the smallest implementation that makes it pass (GREEN), then refactor if useful.
Do not manufacture tests for documentation-only or reversible low-impact edits.

## Troubleshooting Test Failures

1. Use **tdd-guide** when its trigger fits
2. Check test isolation
3. Verify mocks are correct
4. Fix implementation, not tests (unless tests are wrong)

## Agent Support

- **tdd-guide** - Use for explicit TDD work or behavior changes where a
  RED/GREEN proof improves confidence

Run an unchanged check once. Re-run it after relevant changes or when new
evidence changes the diagnosis; do not use timer-based repetition.

## Test Structure (AAA Pattern)

Prefer Arrange-Act-Assert structure for tests:

```typescript
test('calculates similarity correctly', () => {
  // Arrange
  const vector1 = [1, 0, 0]
  const vector2 = [0, 1, 0]

  // Act
  const similarity = calculateCosineSimilarity(vector1, vector2)

  // Assert
  expect(similarity).toBe(0)
})
```

### Test Naming

Use descriptive names that explain the behavior under test:

```typescript
test('returns empty array when no markets match query', () => {})
test('throws error when API key is missing', () => {})
test('falls back to substring search when Redis is unavailable', () => {})
```
