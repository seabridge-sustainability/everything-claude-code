---
description: Generate and run E2E tests with Playwright
agent: e2e-runner
subtask: true
---

# E2E Command

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Generate and run end-to-end tests using Playwright: $ARGUMENTS

## Your Task

1. **Analyze user flow** to test
2. **Create test journey** with Playwright
3. **Run tests** and capture artifacts
4. **Report results** with screenshots/videos

## Test Structure

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature: [Name]', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Navigate, authenticate, prepare state
  })

  test('should [expected behavior]', async ({ page }) => {
    // Arrange: Set up test data

    // Act: Perform user actions
    await page.click('[data-testid="button"]')
    await page.fill('[data-testid="input"]', 'value')

    // Assert: Verify results
    await expect(page.locator('[data-testid="result"]')).toBeVisible()
  })

  test.afterEach(async ({ page }, testInfo) => {
    // Capture screenshot on failure
    if (testInfo.status !== 'passed') {
      await page.screenshot({ path: `test-results/${testInfo.title}.png` })
    }
  })
})
```

## Best Practices

### Selectors
- Prefer `data-testid` attributes
- Avoid CSS classes (they change)
- Use semantic selectors (roles, labels)

### Waits
- Use Playwright's auto-waiting
- Avoid `page.waitForTimeout()`
- Use `expect().toBeVisible()` for assertions

### Test Isolation
- Each test should be independent
- Clean up test data after
- Don't rely on test order

## Artifacts to Capture

- Screenshots on failure
- Videos for debugging
- Trace files for detailed analysis
- Network logs if relevant

## Test Categories

1. **Critical User Flows**
   - Authentication (login, logout, signup)
   - Core feature happy paths
   - Payment/checkout flows

2. **Edge Cases**
   - Network failures
   - Invalid inputs
   - Session expiry

3. **Cross-Browser**
   - Chrome, Firefox, Safari
   - Mobile viewports

## Report Format

```
E2E Test Results
================
PASS: Passed: X
FAIL: Failed: Y
SKIPPED: Skipped: Z

Failed Tests:
- test-name: Error message
  Screenshot: path/to/screenshot.png
  Video: path/to/video.webm
```

---

**TIP**: Run with `--headed` flag for debugging: `npx playwright test --headed`
