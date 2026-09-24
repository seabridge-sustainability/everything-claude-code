---
description: Fix Rust build errors and borrow checker issues
agent: rust-build-resolver
subtask: true
---

# Rust Build Command

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


Fix Rust build, clippy, and dependency errors: $ARGUMENTS

## Your Task

1. **Run cargo check**: `cargo check 2>&1`
2. **Run cargo clippy**: `cargo clippy -- -D warnings 2>&1`
3. **Fix errors** one at a time
4. **Verify fixes** don't introduce new errors

## Common Rust Errors

### Borrow Checker
```
cannot borrow `x` as mutable because it is also borrowed as immutable
```
**Fix**: Restructure to end immutable borrow first; clone only if justified

### Type Mismatch
```
mismatched types: expected `T`, found `U`
```
**Fix**: Add `.into()`, `as`, or explicit type conversion

### Missing Import
```
unresolved import `crate::module`
```
**Fix**: Fix the `use` path or declare the module (add Cargo.toml deps only for external crates)

### Lifetime Errors
```
does not live long enough
```
**Fix**: Use owned type or add lifetime annotation

### Trait Not Implemented
```
the trait `X` is not implemented for `Y`
```
**Fix**: Add `#[derive(Trait)]` or implement manually

## Fix Order

1. **Build errors** - Code must compile
2. **Clippy warnings** - Fix suspicious constructs
3. **Formatting** - `cargo fmt` compliance

## Build Commands

```bash
cargo check 2>&1
cargo clippy -- -D warnings 2>&1
cargo fmt --check 2>&1
cargo tree --duplicates
cargo test
```

## Verification

After fixes:
```bash
cargo check                  # Should succeed
cargo clippy -- -D warnings  # No warnings allowed
cargo fmt --check            # Formatting should pass
cargo test                   # Tests should pass
```

---

**IMPORTANT**: Fix errors only. No refactoring, no improvements. Get the build green with minimal changes.
