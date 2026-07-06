---
description: Fix Rust build errors and borrow checker issues
agent: rust-build-resolver
subtask: true
---

# Rust Build Command

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
