---
description: Generate and run E2E tests with Playwright
agent: e2e-runner
subtask: true
---

# E2E Command

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
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
