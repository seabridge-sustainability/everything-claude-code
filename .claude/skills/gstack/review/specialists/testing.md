# Testing Specialist Review Checklist

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


Scope: Always-on (every review)
Output: JSON objects, one finding per line. Schema:
{"severity":"CRITICAL|INFORMATIONAL","confidence":N,"path":"file","line":N,"category":"testing","summary":"...","fix":"...","fingerprint":"path:line:testing","specialist":"testing"}
If no findings: output `NO FINDINGS` and nothing else.

---

## Categories

### Missing Negative-Path Tests
- New code paths that handle errors, rejections, or invalid input with NO corresponding test
- Guard clauses and early returns that are untested
- Error branches in try/catch, rescue, or error boundaries with no failure-path test
- Permission/auth checks that are asserted in code but never tested for the "denied" case

### Missing Edge-Case Coverage
- Boundary values: zero, negative, max-int, empty string, empty array, nil/null/undefined
- Single-element collections (off-by-one on loops)
- Unicode and special characters in user-facing inputs
- Concurrent access patterns with no race-condition test

### Test Isolation Violations
- Tests sharing mutable state (class variables, global singletons, DB records not cleaned up)
- Order-dependent tests (pass in sequence, fail when randomized)
- Tests that depend on system clock, timezone, or locale
- Tests that make real network calls instead of using stubs/mocks

### Flaky Test Patterns
- Timing-dependent assertions (sleep, setTimeout, waitFor with tight timeouts)
- Assertions on ordering of unordered results (hash keys, Set iteration, async resolution order)
- Tests that depend on external services (APIs, databases) without fallback
- Randomized test data without seed control

### Security Enforcement Tests Missing
- Auth/authz checks in controllers with no test for the "unauthorized" case
- Rate limiting logic with no test proving it actually blocks
- Input sanitization with no test for malicious input
- CSRF/CORS configuration with no integration test

### Coverage Gaps
- New public methods/functions with zero test coverage
- Changed methods where existing tests only cover the old behavior, not the new branch
- Utility functions called from multiple places but tested only indirectly
