---
description: Comprehensive Rust code review for ownership, lifetimes, error handling, unsafe usage, and idiomatic patterns. Invokes the rust-reviewer agent.
---

# Rust Code Review

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


This command invokes the **rust-reviewer** agent for comprehensive Rust-specific code review.

## What This Command Does

1. **Verify Automated Checks**: Run `cargo check`, `cargo clippy -- -D warnings`, `cargo fmt --check`, and `cargo test` — stop if any fail
2. **Identify Rust Changes**: Find modified `.rs` files via `git diff HEAD~1` (or `git diff main...HEAD` for PRs)
3. **Run Security Audit**: Execute `cargo audit` if available
4. **Security Scan**: Check for unsafe usage, command injection, hardcoded secrets
5. **Ownership Review**: Analyze unnecessary clones, lifetime issues, borrowing patterns
6. **Generate Report**: Categorize issues by severity

## When to Use

Use `/rust-review` when:
- After writing or modifying Rust code
- Before committing Rust changes
- Reviewing pull requests with Rust code
- Onboarding to a new Rust codebase
- Learning idiomatic Rust patterns

## Review Categories

### CRITICAL (Must Fix)
- Unchecked `unwrap()`/`expect()` in production code paths
- `unsafe` without `// SAFETY:` comment documenting invariants
- SQL injection via string interpolation in queries
- Command injection via unvalidated input in `std::process::Command`
- Hardcoded credentials
- Use-after-free via raw pointers

### HIGH (Should Fix)
- Unnecessary `.clone()` to satisfy borrow checker
- `String` parameter where `&str` or `impl AsRef<str>` suffices
- Blocking in async context (`std::thread::sleep`, `std::fs`)
- Missing `Send`/`Sync` bounds on shared types
- Wildcard `_ =>` match on business-critical enums
- Large functions (>50 lines)

### MEDIUM (Consider)
- Unnecessary allocation in hot paths
- Missing `with_capacity` when size is known
- Suppressed clippy warnings without justification
- Public API without `///` documentation
- Consider `#[must_use]` on non-`must_use` return types where ignoring values is likely a bug

## Automated Checks Run

```bash
# Build gate (must pass before review)
cargo check

# Lints and suggestions
cargo clippy -- -D warnings

# Formatting
cargo fmt --check

# Tests
cargo test

# Security audit (if available)
if command -v cargo-audit >/dev/null; then cargo audit; else echo "cargo-audit not installed"; fi
```

## Example Usage

````text
User: /rust-review

Agent:
# Rust Code Review Report

## Files Reviewed
- src/service/user.rs (modified)
- src/handler/api.rs (modified)

## Static Analysis Results
- Build: Successful
- Clippy: No warnings
- Formatting: Passed
- Tests: All passing

## Issues Found

[CRITICAL] Unchecked unwrap in Production Path
File: src/service/user.rs:28
Issue: Using `.unwrap()` on database query result
```rust
let user = db.find_by_id(id).unwrap();  // Panics on missing user
```
Fix: Propagate error with context
```rust
let user = db.find_by_id(id)
    .context("failed to fetch user")?;
```

[HIGH] Unnecessary Clone
File: src/handler/api.rs:45
Issue: Cloning String to satisfy borrow checker
```rust
let name = user.name.clone();
process(&user, &name);
```
Fix: Restructure to avoid clone
```rust
let result = process_name(&user.name);
use_user(&user, result);
```

## Summary
- CRITICAL: 1
- HIGH: 1
- MEDIUM: 0

Recommendation: Block merge until CRITICAL issue is fixed
````

## Approval Criteria

| Status | Condition |
|--------|-----------|
| Approve | No CRITICAL or HIGH issues |
| Warning | Only MEDIUM issues (merge with caution) |
| Block | CRITICAL or HIGH issues found |

## Integration with Other Commands

- Use `/rust-test` first to ensure tests pass
- Use `/rust-build` if build errors occur
- Use `/rust-review` before committing
- Use `/code-review` for non-Rust-specific concerns

## Related

- Agent: `agents/rust-reviewer.md`
- Skills: `skills/rust-patterns/`, `skills/rust-testing/`

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
