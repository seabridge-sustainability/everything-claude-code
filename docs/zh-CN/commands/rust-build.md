---
description: Ã©â‚¬ÂÃ¦Â­Â¥Ã¤Â¿Â®Ã¥Â¤Â Rust Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬ÂÃ¥â‚¬Å¸Ã§â€Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥â„¢Â¨Ã©â€”Â®Ã©Â¢ËœÃ¥â€™Å’Ã¤Â¾ÂÃ¨Âµâ€“Ã©â€”Â®Ã©Â¢ËœÃ£â‚¬â€šÃ¨Â°Æ’Ã§â€Â¨ rust-build-resolver Ã¤Â»Â£Ã§Ââ€ Ã¤Â»Â¥Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã£â‚¬ÂÃ§Â²Â¾Ã§Â¡Â®Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤ÂÃ£â‚¬â€š
---

# Rust Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â¸Å½Ã¤Â¿Â®Ã¥Â¤Â

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


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨ **rust-build-resolver** Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å’Ã¤Â»Â¥Ã¦Å“â‚¬Ã¥Â°ÂÃ¦â€Â¹Ã¥Å Â¨Ã©â‚¬ÂÃ¦Â­Â¥Ã¤Â¿Â®Ã¥Â¤Â Rust Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¯Å Ã¦â€“Â­**Ã¯Â¼Å¡Ã¦â€°Â§Ã¨Â¡Å’ `cargo check`Ã£â‚¬Â`cargo clippy`Ã£â‚¬Â`cargo fmt --check`
2. **Ã¨Â§Â£Ã¦Å¾ÂÃ©â€â„¢Ã¨Â¯Â¯**Ã¯Â¼Å¡Ã¨Â¯â€ Ã¥Ë†Â«Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â»Â£Ã§Â ÂÃ¥â€™Å’Ã¥Ââ€”Ã¥Â½Â±Ã¥â€œÂÃ§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶
3. **Ã©â‚¬ÂÃ¦Â­Â¥Ã¤Â¿Â®Ã¥Â¤Â**Ã¯Â¼Å¡Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ©â€â„¢Ã¨Â¯Â¯
4. **Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¯ÂÃ¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤Â**Ã¯Â¼Å¡Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ¨Â¡Å’ `cargo check`
5. **Ã¦Å Â¥Ã¥â€˜Å Ã¦â€˜ËœÃ¨Â¦Â**Ã¯Â¼Å¡Ã¦ËœÂ¾Ã§Â¤ÂºÃ¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã¥â€™Å’Ã¥â€°Â©Ã¤Â½â„¢Ã©â€”Â®Ã©Â¢Ëœ

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶Ã¦Å“Âº

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¤Â½Â¿Ã§â€Â¨ `/rust-build`Ã¯Â¼Å¡

* `cargo build` Ã¦Ë†â€“ `cargo check` Ã¥â€ºÂ Ã©â€â„¢Ã¨Â¯Â¯Ã¨â‚¬Å’Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶
* `cargo clippy` Ã¦Å Â¥Ã¥â€˜Å Ã¨Â­Â¦Ã¥â€˜Å Ã¦â€”Â¶
* Ã¥â‚¬Å¸Ã§â€Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥â„¢Â¨Ã¦Ë†â€“Ã§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã©â€â„¢Ã¨Â¯Â¯Ã©ËœÂ»Ã§Â¢ÂÃ§Â¼â€“Ã¨Â¯â€˜Ã¦â€”Â¶
* Cargo Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¨Â§Â£Ã¦Å¾ÂÃ¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶
* Ã¦â€¹â€°Ã¥Ââ€“Ã¥Â¯Â¼Ã¨â€¡Â´Ã¦Å¾â€žÃ¥Â»ÂºÃ§Â Â´Ã¥ÂÂÃ§Å¡â€žÃ¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½

## Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¨Â¯Å Ã¦â€“Â­Ã¥â€˜Â½Ã¤Â»Â¤

```bash
# Primary build check
cargo check 2>&1

# Lints and suggestions
cargo clippy -- -D warnings 2>&1

# Formatting check
cargo fmt --check 2>&1

# Dependency issues
cargo tree --duplicates

# Security audit (if available)
if command -v cargo-audit >/dev/null; then cargo audit; else echo "cargo-audit not installed"; fi
```

## Ã§Â¤ÂºÃ¤Â¾â€¹Ã¤Â¼Å¡Ã¨Â¯Â

````text
User: /rust-build

Agent:
# Rust Build Resolution

## Initial Diagnostics

```bash
$ cargo check
error[E0502]: cannot borrow `map` as mutable because it is also borrowed as immutable
  --> src/service/cache.rs:25:5
error[E0308]: mismatched types
  --> src/handler/api.rs:42:12
error[E0425]: cannot find value `db` in this scope
  --> src/handler/api.rs:58:9
```

Errors found: 3

## Fix 1: Borrow Checker Error

File: src/service/cache.rs:25
Error: E0502 Ã¢â‚¬â€ cannot borrow `map` as mutable because also borrowed as immutable
Cause: Immutable borrow still active during mutable insert

```rust
// Changed: restructured to end immutable borrow before mutable access
if !map.contains_key("key") {
    map.insert("key".into(), default);
}
```

```bash
$ cargo check
# 2 errors remaining
```

## Fix 2: Type Mismatch

File: src/handler/api.rs:42
Error: E0308 Ã¢â‚¬â€ mismatched types: expected `usize`, found `&str`

```rust
// Changed
let count = params.get("count");
// To
let count: usize = params.get("count")
    .and_then(|s| s.parse().ok())
    .unwrap_or(0);
```

```bash
$ cargo check
# 1 error remaining
```

## Fix 3: Unresolved Name

File: src/handler/api.rs:58
Error: E0425 Ã¢â‚¬â€ cannot find value `db` in this scope
Cause: Missing import

```rust
// Added
use crate::db;
```

```bash
$ cargo check
# Build successful!
```

## Final Verification

```bash
$ cargo clippy -- -D warnings
# No warnings

$ cargo test
running 6 tests
test service::cache::tests::test_insert ... ok
test service::cache::tests::test_get ... ok
test handler::api::tests::test_parse_count ... ok
test handler::api::tests::test_missing_count ... ok
test handler::api::tests::test_db_import ... ok
test handler::api::tests::test_response ... ok

test result: ok. 6 passed; 0 failed; 0 ignored
```

## Summary

| Metric | Count |
|--------|-------|
| Build errors fixed | 3 |
| Clippy warnings fixed | 0 |
| Files modified | 2 |
| Remaining issues | 0 |

Build Status: SUCCESS
````

## Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€žÃ¥Â¸Â¸Ã¨Â§ÂÃ©â€â„¢Ã¨Â¯Â¯

| Ã©â€â„¢Ã¨Â¯Â¯ | Ã¥â€¦Â¸Ã¥Å¾â€¹Ã¤Â¿Â®Ã¥Â¤ÂÃ¦â€“Â¹Ã¦Â³â€¢ |
|-------|-------------|
| `cannot borrow as mutable` | Ã©â€¡ÂÃ¦Å¾â€žÃ¤Â»Â¥Ã¥â€¦Ë†Ã§Â»â€œÃ¦ÂÅ¸Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¥â‚¬Å¸Ã§â€Â¨Ã¯Â¼â€ºÃ¤Â»â€¦Ã¥Å“Â¨Ã¥ÂË†Ã§Ââ€ Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¥â€¦â€¹Ã©Å¡â€  |
| `does not live long enough` | Ã¤Â½Â¿Ã§â€Â¨Ã¦â€¹Â¥Ã¦Å“â€°Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã§Å¡â€žÃ§Â±Â»Ã¥Å¾â€¹Ã¦Ë†â€“Ã¦Â·Â»Ã¥Å Â Ã§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã¦Â³Â¨Ã¨Â§Â£ |
| `cannot move out of` | Ã©â€¡ÂÃ¦Å¾â€žÃ¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã¯Â¼â€ºÃ¤Â»â€¦Ã¤Â½Å“Ã¤Â¸ÂºÃ¦Å“â‚¬Ã¥ÂÅ½Ã¦â€°â€¹Ã¦Â®ÂµÃ¨Â¿â€ºÃ¨Â¡Å’Ã¥â€¦â€¹Ã©Å¡â€  |
| `mismatched types` | Ã¦Â·Â»Ã¥Å Â  `.into()`Ã£â‚¬Â`as` Ã¦Ë†â€“Ã¦ËœÂ¾Ã¥Â¼ÂÃ¨Â½Â¬Ã¦ÂÂ¢ |
| `trait X not implemented` | Ã¦Â·Â»Ã¥Å Â  `#[derive(Trait)]` Ã¦Ë†â€“Ã¦â€°â€¹Ã¥Å Â¨Ã¥Â®Å¾Ã§Å½Â° |
| `unresolved import` | Ã¦Â·Â»Ã¥Å Â Ã¥Ë†Â° Cargo.toml Ã¦Ë†â€“Ã¤Â¿Â®Ã¥Â¤Â `use` Ã¨Â·Â¯Ã¥Â¾â€ž |
| `cannot find value` | Ã¦Â·Â»Ã¥Å Â Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¦Ë†â€“Ã¤Â¿Â®Ã¥Â¤ÂÃ¨Â·Â¯Ã¥Â¾â€ž |

## Ã¤Â¿Â®Ã¥Â¤ÂÃ§Â­â€“Ã§â€¢Â¥

1. **Ã©Â¦â€“Ã¥â€¦Ë†Ã¨Â§Â£Ã¥â€ Â³Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯** - Ã¤Â»Â£Ã§Â ÂÃ¥Â¿â€¦Ã©Â¡Â»Ã¨Æ’Â½Ã¥Â¤Å¸Ã§Â¼â€“Ã¨Â¯â€˜
2. **Ã¥â€¦Â¶Ã¦Â¬Â¡Ã¨Â§Â£Ã¥â€ Â³ Clippy Ã¨Â­Â¦Ã¥â€˜Å ** - Ã¤Â¿Â®Ã¥Â¤ÂÃ¥ÂÂ¯Ã§â€“â€˜Ã§Å¡â€žÃ¦Å¾â€žÃ©â‚¬Â 
3. **Ã§Â¬Â¬Ã¤Â¸â€°Ã¥Â¤â€žÃ§Ââ€ Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“** - Ã§Â¬Â¦Ã¥ÂË† `cargo fmt` Ã¦Â â€¡Ã¥â€¡â€ 
4. **Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Â¸â‚¬Ã¤Â¸Âª** - Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¯ÂÃ¦Â¬Â¡Ã¦â€ºÂ´Ã¦â€Â¹
5. **Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¦â€Â¹Ã¥Å Â¨** - Ã¤Â¸ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã©â€¡ÂÃ¦Å¾â€žÃ¯Â¼Å’Ã¤Â»â€¦Ã¤Â¿Â®Ã¥Â¤ÂÃ©â€”Â®Ã©Â¢Ëœ

## Ã¥ÂÅ“Ã¦Â­Â¢Ã¦ÂÂ¡Ã¤Â»Â¶

Ã¤Â»Â£Ã§Ââ€ Ã¥Â°â€ Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Â¹Â¶Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

* Ã¥ÂÅ’Ã¤Â¸â‚¬Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â°ÂÃ¨Â¯â€¢ 3 Ã¦Â¬Â¡Ã¥ÂÅ½Ã¤Â»ÂÃ§â€žÂ¶Ã¥Â­ËœÃ¥Å“Â¨
* Ã¤Â¿Â®Ã¥Â¤ÂÃ¥Â¼â€¢Ã¥â€¦Â¥Ã¤Âºâ€ Ã¦â€ºÂ´Ã¥Â¤Å¡Ã©â€â„¢Ã¨Â¯Â¯
* Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Å¾Â¶Ã¦Å¾â€žÃ¦â‚¬Â§Ã¦â€ºÂ´Ã¦â€Â¹
* Ã¥â‚¬Å¸Ã§â€Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥â„¢Â¨Ã©â€â„¢Ã¨Â¯Â¯Ã©Å“â‚¬Ã¨Â¦ÂÃ©â€¡ÂÃ¦â€“Â°Ã¨Â®Â¾Ã¨Â®Â¡Ã¦â€¢Â°Ã¦ÂÂ®Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’

## Ã§â€ºÂ¸Ã¥â€¦Â³Ã¥â€˜Â½Ã¤Â»Â¤

* `/rust-test` - Ã¦Å¾â€žÃ¥Â»ÂºÃ¦Ë†ÂÃ¥Å Å¸Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
* `/rust-review` - Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡Â
* `/verify` - Ã¥Â®Å’Ã¦â€¢Â´Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

## Ã§â€ºÂ¸Ã¥â€¦Â³

* Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å¡`agents/rust-build-resolver.md`
* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/rust-patterns/`
