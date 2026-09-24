---
description: Fix build and TypeScript errors with minimal changes
agent: build-error-resolver
subtask: true
---

# Build Fix Command

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


Fix build and TypeScript errors with minimal changes: $ARGUMENTS

## Your Task

1. **Run type check**: `npx tsc --noEmit`
2. **Collect all errors**
3. **Fix errors one by one** with minimal changes
4. **Verify each fix** doesn't introduce new errors
5. **Run final check** to confirm all errors resolved

## Approach

### DO:
- PASS: Fix type errors with correct types
- PASS: Add missing imports
- PASS: Fix syntax errors
- PASS: Make minimal changes
- PASS: Preserve existing behavior
- PASS: Run `tsc --noEmit` after each change

### DON'T:
- FAIL: Refactor code
- FAIL: Add new features
- FAIL: Change architecture
- FAIL: Use `any` type (unless absolutely necessary)
- FAIL: Add `@ts-ignore` comments
- FAIL: Change business logic

## Common Error Fixes

| Error | Fix |
|-------|-----|
| Type 'X' is not assignable to type 'Y' | Add correct type annotation |
| Property 'X' does not exist | Add property to interface or fix property name |
| Cannot find module 'X' | Install package or fix import path |
| Argument of type 'X' is not assignable | Cast or fix function signature |
| Object is possibly 'undefined' | Add null check or optional chaining |

## Verification Steps

After fixes:
1. `npx tsc --noEmit` - should show 0 errors
2. `npm run build` - should succeed
3. `npm test` - tests should still pass

---

**IMPORTANT**: Focus on fixing errors only. No refactoring, no improvements, no architectural changes. Get the build green with minimal diff.
