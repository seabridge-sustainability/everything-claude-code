---
paths:
  - "**/*.rs"
---

# Rust Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  [common/coding-style.md](../common/coding-style.md) Ã¤Â¸Â­Ã¥â€¦Â³Ã¤ÂºÅ½ Rust Ã§Å¡â€žÃ§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

* **rustfmt** Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’ Ã¢â‚¬â€ Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°ÂÃ¥Å Â¡Ã¥Â¿â€¦Ã¨Â¿ÂÃ¨Â¡Å’ `cargo fmt`
* **clippy** Ã§â€Â¨Ã¤ÂºÅ½Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥ Ã¢â‚¬â€ `cargo clippy -- -D warnings`Ã¯Â¼Ë†Ã¥Â°â€ Ã¨Â­Â¦Ã¥â€˜Å Ã¨Â§â€ Ã¤Â¸ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼â€°
* 4 Ã§Â©ÂºÃ¦Â Â¼Ã§Â¼Â©Ã¨Â¿â€ºÃ¯Â¼Ë†rustfmt Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼â€°
* Ã¦Å“â‚¬Ã¥Â¤Â§Ã¨Â¡Å’Ã¥Â®Â½Ã¯Â¼Å¡100 Ã¤Â¸ÂªÃ¥Â­â€”Ã§Â¬Â¦Ã¯Â¼Ë†rustfmt Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼â€°

## Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§

Rust Ã¥ÂËœÃ©â€¡ÂÃ©Â»ËœÃ¨Â®Â¤Ã¦ËœÂ¯Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ§Å¡â€ž Ã¢â‚¬â€ Ã¨Â¯Â·Ã©ÂÂµÃ¥Â¾ÂªÃ¦Â­Â¤Ã¥Å½Å¸Ã¥Ë†â„¢Ã¯Â¼Å¡

* Ã©Â»ËœÃ¨Â®Â¤Ã¤Â½Â¿Ã§â€Â¨ `let`Ã¯Â¼â€ºÃ¤Â»â€¦Ã¥Å“Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ¤Â¿Â®Ã¦â€Â¹Ã¦â€”Â¶Ã¦â€°ÂÃ¤Â½Â¿Ã§â€Â¨ `let mut`
* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¨Â¿â€Ã¥â€ºÅ¾Ã¦â€“Â°Ã¥â‚¬Â¼Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Å½Å¸Ã¥Å“Â°Ã¤Â¿Â®Ã¦â€Â¹
* Ã¥Â½â€œÃ¥â€¡Â½Ã¦â€¢Â°Ã¥ÂÂ¯Ã¨Æ’Â½Ã¥Ë†â€ Ã©â€¦ÂÃ¥â€ â€¦Ã¥Â­ËœÃ¤Â¹Å¸Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â¸ÂÃ¥Ë†â€ Ã©â€¦ÂÃ¦â€”Â¶Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `Cow<'_, T>`

```rust
use std::borrow::Cow;

// GOOD Ã¢â‚¬â€ immutable by default, new value returned
fn normalize(input: &str) -> Cow<'_, str> {
    if input.contains(' ') {
        Cow::Owned(input.replace(' ', "_"))
    } else {
        Cow::Borrowed(input)
    }
}

// BAD Ã¢â‚¬â€ unnecessary mutation
fn normalize_bad(input: &mut String) {
    *input = input.replace(' ', "_");
}
```

## Ã¥â€˜Â½Ã¥ÂÂ

Ã©ÂÂµÃ¥Â¾ÂªÃ¦Â â€¡Ã¥â€¡â€ Ã§Å¡â€ž Rust Ã§ÂºÂ¦Ã¥Â®Å¡Ã¯Â¼Å¡

* `snake_case` Ã§â€Â¨Ã¤ÂºÅ½Ã¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬ÂÃ¦â€“Â¹Ã¦Â³â€¢Ã£â‚¬ÂÃ¥ÂËœÃ©â€¡ÂÃ£â‚¬ÂÃ¦Â¨Â¡Ã¥Ââ€”Ã£â‚¬Âcrate
* `PascalCase`Ã¯Â¼Ë†Ã¥Â¤Â§Ã©Â©Â¼Ã¥Â³Â°Ã¥Â¼ÂÃ¯Â¼â€°Ã§â€Â¨Ã¤ÂºÅ½Ã§Â±Â»Ã¥Å¾â€¹Ã£â‚¬ÂÃ§â€°Â¹Ã¥Â¾ÂÃ£â‚¬ÂÃ¦Å¾Å¡Ã¤Â¸Â¾Ã£â‚¬ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¥Ââ€šÃ¦â€¢Â°
* `SCREAMING_SNAKE_CASE` Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¸Â¸Ã©â€¡ÂÃ¥â€™Å’Ã©Ââ„¢Ã¦â‚¬ÂÃ¥ÂËœÃ©â€¡Â
* Ã§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã¯Â¼Å¡Ã§Â®â‚¬Ã§Å¸Â­Ã§Å¡â€žÃ¥Â°ÂÃ¥â€ â„¢Ã¥Â­â€”Ã¦Â¯ÂÃ¯Â¼Ë†`'a`Ã¯Â¼Å’`'de`Ã¯Â¼â€°Ã¢â‚¬â€ Ã¥Â¤ÂÃ¦Ââ€šÃ¦Æ’â€¦Ã¥â€ ÂµÃ¤Â½Â¿Ã§â€Â¨Ã¦ÂÂÃ¨Â¿Â°Ã¦â‚¬Â§Ã¥ÂÂÃ§Â§Â°Ã¯Â¼Ë†`'input`Ã¯Â¼â€°

## Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã¤Â¸Å½Ã¥â‚¬Å¸Ã§â€Â¨

* Ã©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Å¸Ã§â€Â¨Ã¯Â¼Ë†`&T`Ã¯Â¼â€°Ã¯Â¼â€ºÃ¤Â»â€¦Ã¥Å“Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ¥Â­ËœÃ¥â€šÂ¨Ã¦Ë†â€“Ã¦Â¶Ë†Ã¨â‚¬â€”Ã¦â€”Â¶Ã¥â€ ÂÃ¨Å½Â·Ã¥Ââ€“Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’
* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨Ã¤Â¸ÂÃ§Ââ€ Ã¨Â§Â£Ã¦Â Â¹Ã¦Å“Â¬Ã¥Å½Å¸Ã¥â€ºÂ Ã§Å¡â€žÃ¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¯Â¼Å’Ã¤Â¸ÂºÃ¤Âºâ€ Ã¦Â»Â¡Ã¨Â¶Â³Ã¥â‚¬Å¸Ã§â€Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥â„¢Â¨Ã¨â‚¬Å’Ã¥â€¦â€¹Ã©Å¡â€ Ã¦â€¢Â°Ã¦ÂÂ®
* Ã¥Å“Â¨Ã¥â€¡Â½Ã¦â€¢Â°Ã¥Ââ€šÃ¦â€¢Â°Ã¤Â¸Â­Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¦Å½Â¥Ã¥Ââ€” `&str` Ã¨â‚¬Å’Ã©ÂÅ¾ `String`Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¦Å½Â¥Ã¥Ââ€” `&[T]` Ã¨â‚¬Å’Ã©ÂÅ¾ `Vec<T>`
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã©Å“â‚¬Ã¨Â¦ÂÃ¦â€¹Â¥Ã¦Å“â€° `String` Ã§Å¡â€žÃ¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `impl Into<String>`

```rust
// GOOD Ã¢â‚¬â€ borrows when ownership isn't needed
fn word_count(text: &str) -> usize {
    text.split_whitespace().count()
}

// GOOD Ã¢â‚¬â€ takes ownership in constructor via Into
fn new(name: impl Into<String>) -> Self {
    Self { name: name.into() }
}

// BAD Ã¢â‚¬â€ takes String when &str suffices
fn word_count_bad(text: String) -> usize {
    text.split_whitespace().count()
}
```

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

* Ã¤Â½Â¿Ã§â€Â¨ `Result<T, E>` Ã¥â€™Å’ `?` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â¼Â Ã¦â€™Â­ Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨Ã§â€Å¸Ã¤ÂºÂ§Ã¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `unwrap()`
* **Ã¥Âºâ€œ**Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ `thiserror` Ã¥Â®Å¡Ã¤Â¹â€°Ã§Â±Â»Ã¥Å¾â€¹Ã¥Å’â€“Ã©â€â„¢Ã¨Â¯Â¯
* **Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂ**Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ `anyhow` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã§ÂÂµÃ¦Â´Â»Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
* Ã¤Â½Â¿Ã§â€Â¨ `.with_context(|| format!("failed to ..."))?` Ã¦Â·Â»Ã¥Å Â Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
* Ã¥Â°â€  `unwrap()` / `expect()` Ã¤Â¿ÂÃ§â€¢â„¢Ã§â€Â¨Ã¤ÂºÅ½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€™Å’Ã§Å“Å¸Ã¦Â­Â£Ã¦â€”Â Ã¦Â³â€¢Ã¥Ë†Â°Ã¨Â¾Â¾Ã§Å¡â€žÃ§Å Â¶Ã¦â‚¬Â

```rust
// GOOD Ã¢â‚¬â€ library error with thiserror
#[derive(Debug, thiserror::Error)]
pub enum ConfigError {
    #[error("failed to read config: {0}")]
    Io(#[from] std::io::Error),
    #[error("invalid config format: {0}")]
    Parse(String),
}

// GOOD Ã¢â‚¬â€ application error with anyhow
use anyhow::Context;

fn load_config(path: &str) -> anyhow::Result<Config> {
    let content = std::fs::read_to_string(path)
        .with_context(|| format!("failed to read {path}"))?;
    toml::from_str(&content)
        .with_context(|| format!("failed to parse {path}"))
}
```

## Ã¨Â¿Â­Ã¤Â»Â£Ã¥â„¢Â¨Ã¤Â¼ËœÃ¤ÂºÅ½Ã¥Â¾ÂªÃ§Å½Â¯

Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¨Â½Â¬Ã¦ÂÂ¢Ã¦â€œÂÃ¤Â½Å“Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¿Â­Ã¤Â»Â£Ã¥â„¢Â¨Ã©â€œÂ¾Ã¯Â¼â€ºÃ¥Â¯Â¹Ã¤ÂºÅ½Ã¥Â¤ÂÃ¦Ââ€šÃ§Å¡â€žÃ¦Å½Â§Ã¥Ë†Â¶Ã¦ÂµÂÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¾ÂªÃ§Å½Â¯Ã¯Â¼Å¡

```rust
// GOOD Ã¢â‚¬â€ declarative and composable
let active_emails: Vec<&str> = users.iter()
    .filter(|u| u.is_active)
    .map(|u| u.email.as_str())
    .collect();

// GOOD Ã¢â‚¬â€ loop for complex logic with early returns
for user in &users {
    if let Some(verified) = verify_email(&user.email)? {
        send_welcome(&verified)?;
    }
}
```

## Ã¦Â¨Â¡Ã¥Ââ€”Ã§Â»â€žÃ§Â»â€¡

Ã¦Å’â€°Ã©Â¢â€ Ã¥Å¸Å¸Ã¨â‚¬Å’Ã©ÂÅ¾Ã§Â±Â»Ã¥Å¾â€¹Ã§Â»â€žÃ§Â»â€¡Ã¯Â¼Å¡

```text
src/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ main.rs
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ lib.rs
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ auth/           # Ã©Â¢â€ Ã¥Å¸Å¸Ã¦Â¨Â¡Ã¥Ââ€”
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ token.rs
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ middleware.rs
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ orders/         # Ã©Â¢â€ Ã¥Å¸Å¸Ã¦Â¨Â¡Ã¥Ââ€”
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ model.rs
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ service.rs
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ db/             # Ã¥Å¸ÂºÃ§Â¡â‚¬Ã¨Â®Â¾Ã¦â€“Â½
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ pool.rs
```

## Ã¥ÂÂ¯Ã¨Â§ÂÃ¦â‚¬Â§

* Ã©Â»ËœÃ¨Â®Â¤Ã¤Â¸ÂºÃ§Â§ÂÃ¦Å“â€°Ã¯Â¼â€ºÃ¤Â½Â¿Ã§â€Â¨ `pub(crate)` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥â€ â€¦Ã©Æ’Â¨Ã¥â€¦Â±Ã¤ÂºÂ«
* Ã¤Â»â€¦Ã¥Â°â€ Ã¥Â±Å¾Ã¤ÂºÅ½ crate Ã¥â€¦Â¬Ã¥â€¦Â± API Ã§Å¡â€žÃ©Æ’Â¨Ã¥Ë†â€ Ã¦Â â€¡Ã¨Â®Â°Ã¤Â¸Âº `pub`
* Ã¤Â»Å½ `lib.rs` Ã©â€¡ÂÃ¦â€“Â°Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¥â€¦Â¬Ã¥â€¦Â± API

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å“â€°Ã¥â€¦Â³Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž Rust Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢Ã¥â€™Å’Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`rust-patterns`Ã£â‚¬â€š
