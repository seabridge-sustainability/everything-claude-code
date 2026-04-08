---
description: Rust code review for ownership, safety, and idiomatic patterns
agent: rust-reviewer
subtask: true
---

# Rust Review Command

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
