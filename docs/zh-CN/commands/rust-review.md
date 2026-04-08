---
description: Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žRustÃ¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Å’Ã¦Â¶ÂµÃ§â€ºâ€“Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã£â‚¬ÂÃ§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã£â‚¬ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ Ã£â‚¬ÂÃ¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¤Â»Â£Ã§Â ÂÃ¤Â½Â¿Ã§â€Â¨Ã¤Â»Â¥Ã¥ÂÅ Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€šÃ¨Â°Æ’Ã§â€Â¨rust-reviewerÃ¤Â»Â£Ã§Ââ€ Ã£â‚¬â€š
---

# Rust Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨ **rust-reviewer** Ã¤Â»Â£Ã§Ââ€ Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž Rust Ã¤Â¸â€œÃ©Â¡Â¹Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã©ÂªÅ’Ã¨Â¯ÂÃ¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦Â£â‚¬Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã¨Â¿ÂÃ¨Â¡Å’ `cargo check`Ã£â‚¬Â`cargo clippy -- -D warnings`Ã£â‚¬Â`cargo fmt --check` Ã¥â€™Å’ `cargo test` Ã¢â‚¬â€Ã¢â‚¬â€ Ã¤Â»Â»Ã¤Â½â€¢Ã¤Â¸â‚¬Ã©Â¡Â¹Ã¥Â¤Â±Ã¨Â´Â¥Ã¥Ë†â„¢Ã¥ÂÅ“Ã¦Â­Â¢
2. **Ã¨Â¯â€ Ã¥Ë†Â« Rust Ã¥ÂËœÃ¦â€ºÂ´**Ã¯Â¼Å¡Ã©â‚¬Å¡Ã¨Â¿â€¡ `git diff HEAD~1`Ã¯Â¼Ë†Ã¦Ë†â€“Ã©â€™Ë†Ã¥Â¯Â¹ PR Ã¤Â½Â¿Ã§â€Â¨ `git diff main...HEAD`Ã¯Â¼â€°Ã¦Å¸Â¥Ã¦â€°Â¾Ã¤Â¿Â®Ã¦â€Â¹Ã¨Â¿â€¡Ã§Å¡â€ž `.rs` Ã¦â€“â€¡Ã¤Â»Â¶
3. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Â®Â¡Ã¨Â®Â¡**Ã¯Â¼Å¡Ã¥Â¦â€šÃ¦Å¾Å“Ã¥ÂÂ¯Ã§â€Â¨Ã¯Â¼Å’Ã¥Ë†â„¢Ã¦â€°Â§Ã¨Â¡Å’ `cargo audit`
4. **Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ**Ã¯Â¼Å¡Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬ÂÃ¥â€˜Â½Ã¤Â»Â¤Ã¦Â³Â¨Ã¥â€¦Â¥Ã£â‚¬ÂÃ§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¥Â¯â€ Ã©â€™Â¥
5. **Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã¥Â®Â¡Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã¥Ë†â€ Ã¦Å¾ÂÃ¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ¥â€¦â€¹Ã©Å¡â€ Ã£â‚¬ÂÃ§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã©â€”Â®Ã©Â¢ËœÃ£â‚¬ÂÃ¥â‚¬Å¸Ã§â€Â¨Ã¦Â¨Â¡Ã¥Â¼Â
6. **Ã§â€Å¸Ã¦Ë†ÂÃ¦Å Â¥Ã¥â€˜Å **Ã¯Â¼Å¡Ã¦Å’â€°Ã¤Â¸Â¥Ã©â€¡ÂÃ¦â‚¬Â§Ã¥Â¯Â¹Ã©â€”Â®Ã©Â¢ËœÃ¨Â¿â€ºÃ¨Â¡Å’Ã¥Ë†â€ Ã§Â±Â»

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¤Â½Â¿Ã§â€Â¨ `/rust-review`Ã¯Â¼Å¡

* Ã§Â¼â€“Ã¥â€ â„¢Ã¦Ë†â€“Ã¤Â¿Â®Ã¦â€Â¹ Rust Ã¤Â»Â£Ã§Â ÂÃ¤Â¹â€¹Ã¥ÂÅ½
* Ã¦ÂÂÃ¤ÂºÂ¤ Rust Ã¥ÂËœÃ¦â€ºÂ´Ã¤Â¹â€¹Ã¥â€°Â
* Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥Å’â€¦Ã¥ÂÂ« Rust Ã¤Â»Â£Ã§Â ÂÃ§Å¡â€žÃ¦â€¹â€°Ã¥Ââ€“Ã¨Â¯Â·Ã¦Â±â€šÃ¦â€”Â¶
* Ã¦Å½Â¥Ã¦â€°â€¹Ã¦â€“Â°Ã§Å¡â€ž Rust Ã¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ¦â€”Â¶
* Ã¥Â­Â¦Ã¤Â¹Â Ã¦Æ’Â¯Ã§â€Â¨Ã§Å¡â€ž Rust Ã¦Â¨Â¡Ã¥Â¼ÂÃ¦â€”Â¶

## Ã¥Â®Â¡Ã¦Å¸Â¥Ã§Â±Â»Ã¥Ë†Â«

### Ã¥â€¦Â³Ã©â€Â®Ã¯Â¼Ë†Ã¥Â¿â€¦Ã©Â¡Â»Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼â€°

* Ã§â€Å¸Ã¤ÂºÂ§Ã¤Â»Â£Ã§Â ÂÃ¨Â·Â¯Ã¥Â¾â€žÃ¤Â¸Â­Ã¦Å“ÂªÃ§Â»ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§Å¡â€ž `unwrap()`/`expect()`
* Ã¦Â²Â¡Ã¦Å“â€° `// SAFETY:` Ã¦Â³Â¨Ã©â€¡Å Ã¨Â®Â°Ã¥Â½â€¢Ã¤Â¸ÂÃ¥ÂËœÃ©â€¡ÂÃ§Å¡â€ž `unsafe`
* Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¤Â¸Â­Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¦Ââ€™Ã¥â‚¬Â¼Ã¥Â¯Â¼Ã¨â€¡Â´Ã§Å¡â€ž SQL Ã¦Â³Â¨Ã¥â€¦Â¥
* Ã¥Å“Â¨ `std::process::Command` Ã¤Â¸Â­Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Å“ÂªÃ§Â»ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ§Å¡â€žÃ¨Â¾â€œÃ¥â€¦Â¥Ã¥Â¯Â¼Ã¨â€¡Â´Ã§Å¡â€žÃ¥â€˜Â½Ã¤Â»Â¤Ã¦Â³Â¨Ã¥â€¦Â¥
* Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¥â€¡Â­Ã¦ÂÂ®
* Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥Å½Å¸Ã¥Â§â€¹Ã¦Å’â€¡Ã©â€™Ë†Ã¥Â¯Â¼Ã¨â€¡Â´Ã§Å¡â€žÃ©â€¡Å Ã¦â€Â¾Ã¥ÂÅ½Ã¤Â½Â¿Ã§â€Â¨

### Ã©Â«ËœÃ¯Â¼Ë†Ã¥Âºâ€Ã¨Â¯Â¥Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼â€°

* Ã¤Â¸ÂºÃ¦Â»Â¡Ã¨Â¶Â³Ã¥â‚¬Å¸Ã§â€Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥â„¢Â¨Ã¨â‚¬Å’Ã¨Â¿â€ºÃ¨Â¡Å’Ã§Å¡â€žÃ¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€ž `.clone()`
* Ã¥Ââ€šÃ¦â€¢Â°Ã¤Â¸Âº `String`Ã¯Â¼Å’Ã¨â‚¬Å’ `&str` Ã¦Ë†â€“ `impl AsRef<str>` Ã¥ÂÂ³Ã¥ÂÂ¯Ã¦Â»Â¡Ã¨Â¶Â³
* Ã¥Å“Â¨Ã¥Â¼â€šÃ¦Â­Â¥Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¤Â¸Â­Ã§Å¡â€žÃ©ËœÂ»Ã¥Â¡Å¾Ã¦â€œÂÃ¤Â½Å“Ã¯Â¼Ë†`std::thread::sleep`Ã£â‚¬Â`std::fs`Ã¯Â¼â€°
* Ã¥â€¦Â±Ã¤ÂºÂ«Ã§Â±Â»Ã¥Å¾â€¹Ã¤Â¸Å Ã§Â¼ÂºÃ¥Â°â€˜ `Send`/`Sync` Ã§ÂºÂ¦Ã¦ÂÅ¸
* Ã¥Â¯Â¹Ã¤Â¸Å¡Ã¥Å Â¡Ã¥â€¦Â³Ã©â€Â®Ã¦Å¾Å¡Ã¤Â¸Â¾Ã¤Â½Â¿Ã§â€Â¨Ã©â‚¬Å¡Ã©â€¦ÂÃ§Â¬Â¦ `_ =>` Ã¥Å’Â¹Ã©â€¦Â
* Ã¥Â¤Â§Ã¥Å¾â€¹Ã¥â€¡Â½Ã¦â€¢Â°Ã¯Â¼Ë†>50 Ã¨Â¡Å’Ã¯Â¼â€°

### Ã¤Â¸Â­Ã¯Â¼Ë†Ã¨â‚¬Æ’Ã¨â„¢â€˜Ã¯Â¼â€°

* Ã¥Å“Â¨Ã§Æ’Â­Ã§â€šÂ¹Ã¨Â·Â¯Ã¥Â¾â€žÃ¤Â¸Â­Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ¥Ë†â€ Ã©â€¦Â
* Ã¥Â·Â²Ã§Å¸Â¥Ã¥Â¤Â§Ã¥Â°ÂÃ¦â€”Â¶Ã§Â¼ÂºÃ¥Â°â€˜ `with_capacity`
* Ã¦Å“ÂªÃ¨Â¯Â´Ã¦ËœÅ½Ã§Ââ€ Ã§â€Â±Ã¥Â°Â±Ã¦Å â€˜Ã¥Ë†Â¶ clippy Ã¨Â­Â¦Ã¥â€˜Å 
* Ã¥â€¦Â¬Ã¥â€¦Â± API Ã§Â¼ÂºÃ¥Â°â€˜ `///` Ã¦â€“â€¡Ã¦Â¡Â£
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥Â¿Â½Ã§â€¢Â¥Ã¨Â¿â€Ã¥â€ºÅ¾Ã¥â‚¬Â¼Ã¥Â¾Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦ËœÂ¯Ã©â€â„¢Ã¨Â¯Â¯Ã§Å¡â€žÃ©ÂÅ¾ `must_use` Ã¨Â¿â€Ã¥â€ºÅ¾Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Å’Ã¨â‚¬Æ’Ã¨â„¢â€˜Ã¤Â½Â¿Ã§â€Â¨ `#[must_use]`

## Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦Â£â‚¬Ã¦Å¸Â¥

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

## Ã¤Â½Â¿Ã§â€Â¨Ã§Â¤ÂºÃ¤Â¾â€¹

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

## Ã¦â€°Â¹Ã¥â€¡â€ Ã¦Â â€¡Ã¥â€¡â€ 

| Ã§Å Â¶Ã¦â‚¬Â | Ã¦ÂÂ¡Ã¤Â»Â¶ |
|--------|-----------|
| Ã¦â€°Â¹Ã¥â€¡â€  | Ã¦â€”Â Ã¥â€¦Â³Ã©â€Â®Ã¦Ë†â€“Ã©Â«ËœÃ¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã©â€”Â®Ã©Â¢Ëœ |
| Ã¨Â­Â¦Ã¥â€˜Å  | Ã¤Â»â€¦Ã¥Â­ËœÃ¥Å“Â¨Ã¤Â¸Â­Ã¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†Ã¨Â°Â¨Ã¦â€¦Å½Ã¥ÂË†Ã¥Â¹Â¶Ã¯Â¼â€° |
| Ã©ËœÂ»Ã¦Â­Â¢ | Ã¥Ââ€˜Ã§Å½Â°Ã¥â€¦Â³Ã©â€Â®Ã¦Ë†â€“Ã©Â«ËœÃ¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã©â€”Â®Ã©Â¢Ëœ |

## Ã¤Â¸Å½Ã¥â€¦Â¶Ã¤Â»â€“Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†Â

* Ã©Â¦â€“Ã¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `/rust-test` Ã§Â¡Â®Ã¤Â¿ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
* Ã¥Â¦â€šÃ¦Å¾Å“Ã¥â€¡ÂºÃ§Å½Â°Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `/rust-build`
* Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°ÂÃ¤Â½Â¿Ã§â€Â¨ `/rust-review`
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã©ÂÅ¾ Rust Ã¤Â¸â€œÃ©Â¡Â¹Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `/code-review`

## Ã§â€ºÂ¸Ã¥â€¦Â³

* Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å¡`agents/rust-reviewer.md`
* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/rust-patterns/`Ã£â‚¬Â`skills/rust-testing/`
