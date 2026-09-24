---
description: Comprehensive C++ code review for memory safety, modern C++ idioms, concurrency, and security. Invokes the cpp-reviewer agent.
---

# C++ Code Review

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


This command invokes the **cpp-reviewer** agent for comprehensive C++-specific code review.

## What This Command Does

1. **Identify C++ Changes**: Find modified `.cpp`, `.hpp`, `.cc`, `.h` files via `git diff`
2. **Run Static Analysis**: Execute `clang-tidy` and `cppcheck`
3. **Memory Safety Scan**: Check for raw new/delete, buffer overflows, use-after-free
4. **Concurrency Review**: Analyze thread safety, mutex usage, data races
5. **Modern C++ Check**: Verify code follows C++17/20 conventions and best practices
6. **Generate Report**: Categorize issues by severity

## When to Use

Use `/cpp-review` when:
- After writing or modifying C++ code
- Before committing C++ changes
- Reviewing pull requests with C++ code
- Onboarding to a new C++ codebase
- Checking for memory safety issues

## Review Categories

### CRITICAL (Must Fix)
- Raw `new`/`delete` without RAII
- Buffer overflows and use-after-free
- Data races without synchronization
- Command injection via `system()`
- Uninitialized variable reads
- Null pointer dereferences

### HIGH (Should Fix)
- Rule of Five violations
- Missing `std::lock_guard` / `std::scoped_lock`
- Detached threads without proper lifetime management
- C-style casts instead of `static_cast`/`dynamic_cast`
- Missing `const` correctness

### MEDIUM (Consider)
- Unnecessary copies (pass by value instead of `const&`)
- Missing `reserve()` on known-size containers
- `using namespace std;` in headers
- Missing `[[nodiscard]]` on important return values
- Overly complex template metaprogramming

## Automated Checks Run

```bash
# Static analysis
clang-tidy --checks='*,-llvmlibc-*' src/*.cpp -- -std=c++17

# Additional analysis
cppcheck --enable=all --suppress=missingIncludeSystem src/

# Build with warnings
cmake --build build -- -Wall -Wextra -Wpedantic
```

## Example Usage

```text
User: /cpp-review

Agent:
# C++ Code Review Report

## Files Reviewed
- src/handler/user.cpp (modified)
- src/service/auth.cpp (modified)

## Static Analysis Results
✓ clang-tidy: 2 warnings
✓ cppcheck: No issues

## Issues Found

[CRITICAL] Memory Leak
File: src/service/auth.cpp:45
Issue: Raw `new` without matching `delete`
```cpp
auto* session = new Session(userId);  // Memory leak!
cache[userId] = session;
```
Fix: Use `std::unique_ptr`
```cpp
auto session = std::make_unique<Session>(userId);
cache[userId] = std::move(session);
```

[HIGH] Missing const Reference
File: src/handler/user.cpp:28
Issue: Large object passed by value
```cpp
void processUser(User user) {  // Unnecessary copy
```
Fix: Pass by const reference
```cpp
void processUser(const User& user) {
```

## Summary
- CRITICAL: 1
- HIGH: 1
- MEDIUM: 0

Recommendation: FAIL: Block merge until CRITICAL issue is fixed
```

## Approval Criteria

| Status | Condition |
|--------|-----------|
| PASS: Approve | No CRITICAL or HIGH issues |
| WARNING: Warning | Only MEDIUM issues (merge with caution) |
| FAIL: Block | CRITICAL or HIGH issues found |

## Integration with Other Commands

- Use `/cpp-test` first to ensure tests pass
- Use `/cpp-build` if build errors occur
- Use `/cpp-review` before committing
- Use `/code-review` for non-C++ specific concerns

## Related

- Agent: `agents/cpp-reviewer.md`
- Skills: `skills/cpp-coding-standards/`, `skills/cpp-testing/`

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
