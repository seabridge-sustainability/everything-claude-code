---
description: Rust code review for ownership, safety, and idiomatic patterns
agent: rust-reviewer
subtask: true
---

# Rust Review Command

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


Review Rust code for idiomatic patterns and best practices: $ARGUMENTS

## Your Task

1. **Analyze Rust code** for idioms and patterns
2. **Check ownership** - borrowing, lifetimes, unnecessary clones
3. **Review error handling** - proper `?` propagation, no unwrap in production
4. **Verify safety** - unsafe usage, injection, secrets

## Review Checklist

### Safety (CRITICAL)
- [ ] No unchecked `unwrap()`/`expect()` in production paths
- [ ] `unsafe` blocks have `// SAFETY:` comments
- [ ] No SQL/command injection
- [ ] No hardcoded secrets

### Ownership (HIGH)
- [ ] No unnecessary `.clone()` to satisfy borrow checker
- [ ] `&str` preferred over `String` in function parameters
- [ ] `&[T]` preferred over `Vec<T>` in function parameters
- [ ] No excessive lifetime annotations where elision works

### Error Handling (HIGH)
- [ ] Errors propagated with `?`; use `.context()` in `anyhow`/`eyre` application code
- [ ] No silenced errors (`let _ = result;`)
- [ ] `thiserror` for library errors, `anyhow` for applications

### Concurrency (HIGH)
- [ ] No blocking in async context
- [ ] Bounded channels preferred
- [ ] `Mutex` poisoning handled
- [ ] `Send`/`Sync` bounds correct

### Code Quality (MEDIUM)
- [ ] Functions under 50 lines
- [ ] No deep nesting (>4 levels)
- [ ] Exhaustive matching on business enums
- [ ] Clippy warnings addressed

## Report Format

### CRITICAL Issues
- [file:line] Issue description
  Suggestion: How to fix

### HIGH Issues
- [file:line] Issue description
  Suggestion: How to fix

### MEDIUM Issues
- [file:line] Issue description
  Suggestion: How to fix

---

**TIP**: Run `cargo clippy -- -D warnings` and `cargo fmt --check` for automated checks.
