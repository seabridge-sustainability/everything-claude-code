# Rust API Ã¦Å“ÂÃ¥Å Â¡ Ã¢â‚¬â€ Ã©Â¡Â¹Ã§â€ºÂ® CLAUDE.md

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


> Ã¤Â½Â¿Ã§â€Â¨ AxumÃ£â‚¬ÂPostgreSQL Ã¥â€™Å’ Docker Ã¦Å¾â€žÃ¥Â»Âº Rust API Ã¦Å“ÂÃ¥Å Â¡Ã§Å¡â€žÃ§Å“Å¸Ã¥Â®Å¾Ã§Â¤ÂºÃ¤Â¾â€¹Ã£â‚¬â€š
> Ã¥Â°â€ Ã¦Â­Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Â¤ÂÃ¥Ë†Â¶Ã¥Ë†Â°Ã¦â€šÂ¨Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Å’Ã¥Â¹Â¶Ã¦Â Â¹Ã¦ÂÂ®Ã¦â€šÂ¨Ã§Å¡â€žÃ¦Å“ÂÃ¥Å Â¡Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã£â‚¬â€š

## Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Â¦â€šÃ¨Â¿Â°

**Ã¦Å â‚¬Ã¦Å“Â¯Ã¦Â Ë†Ã¯Â¼Å¡** Rust 1.78+, Axum (Web Ã¦Â¡â€ Ã¦Å¾Â¶), SQLx (Ã¥Â¼â€šÃ¦Â­Â¥Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ), PostgreSQL, Tokio (Ã¥Â¼â€šÃ¦Â­Â¥Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶), Docker

**Ã¦Å¾Â¶Ã¦Å¾â€žÃ¯Â¼Å¡** Ã©â€¡â€¡Ã§â€Â¨Ã¥Ë†â€ Ã¥Â±â€šÃ¦Å¾Â¶Ã¦Å¾â€žÃ¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ« handler Ã¢â€ â€™ service Ã¢â€ â€™ repository Ã¥Ë†â€ Ã§Â¦Â»Ã£â‚¬â€šAxum Ã§â€Â¨Ã¤ÂºÅ½ HTTPÃ¯Â¼Å’SQLx Ã§â€Â¨Ã¤ÂºÅ½Ã§Â¼â€“Ã¨Â¯â€˜Ã¦â€”Â¶Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§Å¡â€ž SQLÃ¯Â¼Å’Tower Ã¤Â¸Â­Ã©â€”Â´Ã¤Â»Â¶Ã§â€Â¨Ã¤ÂºÅ½Ã¦Â¨ÂªÃ¥Ë†â€¡Ã¥â€¦Â³Ã¦Â³Â¨Ã§â€šÂ¹Ã£â‚¬â€š

## Ã¥â€¦Â³Ã©â€Â®Ã¨Â§â€žÃ¥Ë†â„¢

### Rust Ã§ÂºÂ¦Ã¥Â®Å¡

* Ã¥Âºâ€œÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â½Â¿Ã§â€Â¨ `thiserror`Ã¯Â¼Å’Ã¤Â»â€¦Ã¥Å“Â¨Ã¤ÂºÅ’Ã¨Â¿â€ºÃ¥Ë†Â¶ crate Ã¦Ë†â€“Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `anyhow`
* Ã§â€Å¸Ã¤ÂºÂ§Ã¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ `.unwrap()` Ã¦Ë†â€“ `.expect()` Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ `?` Ã¤Â¼Â Ã¦â€™Â­Ã©â€â„¢Ã¨Â¯Â¯
* Ã¥â€¡Â½Ã¦â€¢Â°Ã¥Ââ€šÃ¦â€¢Â°Ã¤Â¸Â­Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `&str` Ã¨â‚¬Å’Ã©ÂÅ¾ `String`Ã¯Â¼â€ºÃ¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã¨Â½Â¬Ã§Â§Â»Ã¦â€”Â¶Ã¨Â¿â€Ã¥â€ºÅ¾ `String`
* Ã¤Â½Â¿Ã§â€Â¨ `clippy` Ã¥â€™Å’ `#![deny(clippy::all, clippy::pedantic)]` Ã¢â‚¬â€ Ã¤Â¿Â®Ã¥Â¤ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã¨Â­Â¦Ã¥â€˜Å 
* Ã¥Å“Â¨Ã¦â€°â‚¬Ã¦Å“â€°Ã¥â€¦Â¬Ã¥â€¦Â±Ã§Â±Â»Ã¥Å¾â€¹Ã¤Â¸Å Ã¦Â´Â¾Ã§â€Å¸ `Debug`Ã¯Â¼â€ºÃ¤Â»â€¦Ã¥Å“Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ¦â€”Â¶Ã¦Â´Â¾Ã§â€Å¸ `Clone`Ã£â‚¬Â`PartialEq`
* Ã©â„¢Â¤Ã©ÂÅ¾Ã¦Å“â€° `// SAFETY:` Ã¦Â³Â¨Ã©â€¡Å Ã¨Â¯Â´Ã¦ËœÅ½Ã§Ââ€ Ã§â€Â±Ã¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ `unsafe` Ã¥Ââ€”

### Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ

* Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¤Â½Â¿Ã§â€Â¨ SQLx Ã§Å¡â€ž `query!` Ã¦Ë†â€“ `query_as!` Ã¥Â®Â Ã¢â‚¬â€ Ã©â€™Ë†Ã¥Â¯Â¹Ã¦Â¨Â¡Ã¥Â¼ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã§Â¼â€“Ã¨Â¯â€˜Ã¦â€”Â¶Ã©ÂªÅ’Ã¨Â¯Â
* Ã¥Å“Â¨ `migrations/` Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `sqlx migrate` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â¿ÂÃ§Â§Â» Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã§â€ºÂ´Ã¦Å½Â¥Ã¤Â¿Â®Ã¦â€Â¹Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ
* Ã¤Â½Â¿Ã§â€Â¨ `sqlx::Pool<Postgres>` Ã¤Â½Å“Ã¤Â¸ÂºÃ¥â€¦Â±Ã¤ÂºÂ«Ã§Å Â¶Ã¦â‚¬Â Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¤Â¸ÂºÃ¦Â¯ÂÃ¤Â¸ÂªÃ¨Â¯Â·Ã¦Â±â€šÃ¥Ë†â€ºÃ¥Â»ÂºÃ¨Â¿Å¾Ã¦Å½Â¥
* Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¤Â½Â¿Ã§â€Â¨Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¥ÂÂ Ã¤Â½ÂÃ§Â¬Â¦ (`$1`, `$2`) Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¤Â½Â¿Ã§â€Â¨Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

```rust
// BAD: String interpolation (SQL injection risk)
let q = format!("SELECT * FROM users WHERE id = '{}'", id);

// GOOD: Parameterized query, compile-time checked
let user = sqlx::query_as!(User, "SELECT * FROM users WHERE id = $1", id)
    .fetch_optional(&pool)
    .await?;
```

### Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

* Ã¤Â¸ÂºÃ¦Â¯ÂÃ¤Â¸ÂªÃ¦Â¨Â¡Ã¥Ââ€”Ã¤Â½Â¿Ã§â€Â¨ `thiserror` Ã¥Â®Å¡Ã¤Â¹â€°Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ©Â¢â€ Ã¥Å¸Å¸Ã©â€â„¢Ã¨Â¯Â¯Ã¦Å¾Å¡Ã¤Â¸Â¾
* Ã©â‚¬Å¡Ã¨Â¿â€¡ `IntoResponse` Ã¥Â°â€ Ã©â€â„¢Ã¨Â¯Â¯Ã¦ËœÂ Ã¥Â°â€žÃ¥Ë†Â° HTTP Ã¥â€œÂÃ¥Âºâ€ Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¦Å¡Â´Ã©Å“Â²Ã¥â€ â€¦Ã©Æ’Â¨Ã§Â»â€ Ã¨Å â€š
* Ã¤Â½Â¿Ã§â€Â¨ `tracing` Ã¨Â¿â€ºÃ¨Â¡Å’Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢ Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¤Â½Â¿Ã§â€Â¨ `println!` Ã¦Ë†â€“ `eprintln!`

```rust
use thiserror::Error;

#[derive(Debug, Error)]
pub enum AppError {
    #[error("Resource not found")]
    NotFound,
    #[error("Validation failed: {0}")]
    Validation(String),
    #[error("Unauthorized")]
    Unauthorized,
    #[error(transparent)]
    Internal(#[from] anyhow::Error),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message) = match &self {
            Self::NotFound => (StatusCode::NOT_FOUND, self.to_string()),
            Self::Validation(msg) => (StatusCode::BAD_REQUEST, msg.clone()),
            Self::Unauthorized => (StatusCode::UNAUTHORIZED, self.to_string()),
            Self::Internal(err) => {
                tracing::error!(?err, "internal error");
                (StatusCode::INTERNAL_SERVER_ERROR, "Internal error".into())
            }
        };
        (status, Json(json!({ "error": message }))).into_response()
    }
}
```

### Ã¦Âµâ€¹Ã¨Â¯â€¢

* Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€Â¾Ã¥Å“Â¨Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦ÂºÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¥â€ â€¦Ã§Å¡â€ž `#[cfg(test)]` Ã¦Â¨Â¡Ã¥Ââ€”Ã¤Â¸Â­
* Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€Â¾Ã¥Å“Â¨ `tests/` Ã§â€ºÂ®Ã¥Â½â€¢Ã¤Â¸Â­Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã§Å“Å¸Ã¥Â®Å¾Ã§Å¡â€ž PostgreSQL (Testcontainers Ã¦Ë†â€“ Docker)
* Ã¤Â½Â¿Ã§â€Â¨ `#[sqlx::test]` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¨â€¡ÂªÃ¥Å Â¨Ã¨Â¿ÂÃ§Â§Â»Ã¥â€™Å’Ã¥â€ºÅ¾Ã¦Â»Å¡
* Ã¤Â½Â¿Ã§â€Â¨ `mockall` Ã¦Ë†â€“ `wiremock` Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¥Â¤â€“Ã©Æ’Â¨Ã¦Å“ÂÃ¥Å Â¡

### Ã¤Â»Â£Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

* Ã¦Å“â‚¬Ã¥Â¤Â§Ã¨Â¡Å’Ã©â€¢Â¿Ã¥ÂºÂ¦Ã¯Â¼Å¡100 Ã¤Â¸ÂªÃ¥Â­â€”Ã§Â¬Â¦Ã¯Â¼Ë†Ã§â€Â± rustfmt Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¯Â¼â€°
* Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¥Ë†â€ Ã§Â»â€žÃ¯Â¼Å¡`std`Ã£â‚¬ÂÃ¥Â¤â€“Ã©Æ’Â¨ crateÃ£â‚¬Â`crate`/`super` Ã¢â‚¬â€ Ã§â€Â¨Ã§Â©ÂºÃ¨Â¡Å’Ã¥Ë†â€ Ã©Å¡â€
* Ã¦Â¨Â¡Ã¥Ââ€”Ã¯Â¼Å¡Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦Â¨Â¡Ã¥Ââ€”Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å’`mod.rs` Ã¤Â»â€¦Ã§â€Â¨Ã¤ÂºÅ½Ã©â€¡ÂÃ¦â€“Â°Ã¥Â¯Â¼Ã¥â€¡Âº
* Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Å¡PascalCaseÃ¯Â¼Å’Ã¥â€¡Â½Ã¦â€¢Â°/Ã¥ÂËœÃ©â€¡ÂÃ¯Â¼Å¡snake\_caseÃ¯Â¼Å’Ã¥Â¸Â¸Ã©â€¡ÂÃ¯Â¼Å¡UPPER\_SNAKE\_CASE

## Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â»â€œÃ¦Å¾â€ž

```
src/
  main.rs              # Ã¥â€¦Â¥Ã¥ÂÂ£Ã§â€šÂ¹Ã£â‚¬ÂÃ¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¨Â®Â¾Ã§Â½Â®Ã£â‚¬ÂÃ¤Â¼ËœÃ©â€ºâ€¦Ã¥â€¦Â³Ã©â€”Â­
  lib.rs               # Ã§â€Â¨Ã¤ÂºÅ½Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ©â€¡ÂÃ¦â€“Â°Ã¥Â¯Â¼Ã¥â€¡Âº
  config.rs            # Ã¤Â½Â¿Ã§â€Â¨ envy Ã¦Ë†â€“ figment Ã§Å¡â€žÃ§Å½Â¯Ã¥Â¢Æ’Ã©â€¦ÂÃ§Â½Â®
  router.rs            # Ã¥Å’â€¦Ã¥ÂÂ«Ã¦â€°â‚¬Ã¦Å“â€°Ã¨Â·Â¯Ã§â€Â±Ã§Å¡â€ž Axum Ã¨Â·Â¯Ã§â€Â±Ã¥â„¢Â¨
  middleware/
    auth.rs            # JWT Ã¦ÂÂÃ¥Ââ€“Ã¤Â¸Å½Ã©ÂªÅ’Ã¨Â¯Â
    logging.rs         # Ã¨Â¯Â·Ã¦Â±â€š/Ã¥â€œÂÃ¥Âºâ€Ã¨Â¿Â½Ã¨Â¸Âª
  handlers/
    mod.rs             # Ã¨Â·Â¯Ã§â€Â±Ã¥Â¤â€žÃ§Ââ€ Ã¥â„¢Â¨Ã¯Â¼Ë†Ã§Â²Â¾Ã§Â®â‚¬Ã§â€°Ë†Ã¢â‚¬â€Ã¢â‚¬â€Ã¥Â§â€Ã¦â€°ËœÃ§Â»â„¢Ã¦Å“ÂÃ¥Å Â¡Ã¥Â±â€šÃ¯Â¼â€°
    users.rs
    orders.rs
  services/
    mod.rs             # Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜
    users.rs
    orders.rs
  repositories/
    mod.rs             # Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â®Â¿Ã©â€”Â®Ã¯Â¼Ë†SQLx Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¯Â¼â€°
    users.rs
    orders.rs
  domain/
    mod.rs             # Ã©Â¢â€ Ã¥Å¸Å¸Ã§Â±Â»Ã¥Å¾â€¹Ã£â‚¬ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¦Å¾Å¡Ã¤Â¸Â¾
    user.rs
    order.rs
migrations/
  001_create_users.sql
  002_create_orders.sql
tests/
  common/mod.rs        # Ã¥â€¦Â±Ã¤ÂºÂ«Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¾â€¦Ã¥Å Â©Ã¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¨Â®Â¾Ã§Â½Â®
  api_users.rs         # Ã§â€Â¨Ã¦Ë†Â·Ã§Â«Â¯Ã§â€šÂ¹Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢
  api_orders.rs        # Ã¨Â®Â¢Ã¥Ââ€¢Ã§Â«Â¯Ã§â€šÂ¹Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢
```

## Ã¥â€¦Â³Ã©â€Â®Ã¦Â¨Â¡Ã¥Â¼Â

### Handler (Ã¨â€“â€žÃ¥Â±â€š)

```rust
async fn create_user(
    State(ctx): State<AppState>,
    Json(payload): Json<CreateUserRequest>,
) -> Result<(StatusCode, Json<UserResponse>), AppError> {
    let user = ctx.user_service.create(payload).await?;
    Ok((StatusCode::CREATED, Json(UserResponse::from(user))))
}
```

### Service (Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜)

```rust
impl UserService {
    pub async fn create(&self, req: CreateUserRequest) -> Result<User, AppError> {
        if self.repo.find_by_email(&req.email).await?.is_some() {
            return Err(AppError::Validation("Email already registered".into()));
        }

        let password_hash = hash_password(&req.password)?;
        let user = self.repo.insert(&req.email, &req.name, &password_hash).await?;

        Ok(user)
    }
}
```

### Repository (Ã¦â€¢Â°Ã¦ÂÂ®Ã¨Â®Â¿Ã©â€”Â®)

```rust
impl UserRepository {
    pub async fn find_by_email(&self, email: &str) -> Result<Option<User>, sqlx::Error> {
        sqlx::query_as!(User, "SELECT * FROM users WHERE email = $1", email)
            .fetch_optional(&self.pool)
            .await
    }

    pub async fn insert(
        &self,
        email: &str,
        name: &str,
        password_hash: &str,
    ) -> Result<User, sqlx::Error> {
        sqlx::query_as!(
            User,
            r#"INSERT INTO users (email, name, password_hash)
               VALUES ($1, $2, $3) RETURNING *"#,
            email, name, password_hash,
        )
        .fetch_one(&self.pool)
        .await
    }
}
```

### Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢

```rust
#[tokio::test]
async fn test_create_user() {
    let app = spawn_test_app().await;

    let response = app
        .client
        .post(&format!("{}/api/v1/users", app.address))
        .json(&json!({
            "email": "alice@example.com",
            "name": "Alice",
            "password": "securepassword123"
        }))
        .send()
        .await
        .expect("Failed to send request");

    assert_eq!(response.status(), StatusCode::CREATED);
    let body: serde_json::Value = response.json().await.unwrap();
    assert_eq!(body["email"], "alice@example.com");
}

#[tokio::test]
async fn test_create_user_duplicate_email() {
    let app = spawn_test_app().await;
    // Create first user
    create_test_user(&app, "alice@example.com").await;
    // Attempt duplicate
    let response = create_user_request(&app, "alice@example.com").await;
    assert_eq!(response.status(), StatusCode::BAD_REQUEST);
}
```

## Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡Â

```bash
# Server
HOST=0.0.0.0
PORT=8080
RUST_LOG=info,tower_http=debug

# Database
DATABASE_URL=postgres://user:pass@localhost:5432/myapp

# Auth
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRY_HOURS=24

# Optional
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â­â€“Ã§â€¢Â¥

```bash
# Run all tests
cargo test

# Run with output
cargo test -- --nocapture

# Run specific test module
cargo test api_users

# Check coverage (requires cargo-llvm-cov)
cargo llvm-cov --html
open target/llvm-cov/html/index.html

# Lint
cargo clippy -- -D warnings

# Format check
cargo fmt -- --check
```

## ECC Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

```bash
# Planning
/plan "Add order fulfillment with Stripe payment"

# Development with TDD
/tdd                    # cargo test-based TDD workflow

# Review
/code-review            # Rust-specific code review
/security-scan          # Dependency audit + unsafe scan

# Verification
/verify                 # Build, clippy, test, security scan
```

## Git Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

* `feat:` Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å’`fix:` Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å’`refactor:` Ã¤Â»Â£Ã§Â ÂÃ¥ÂËœÃ¦â€ºÂ´
* Ã¤Â»Å½ `main` Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Å Å¸Ã¨Æ’Â½Ã¥Ë†â€ Ã¦â€Â¯Ã¯Â¼Å’Ã©Å“â‚¬Ã¨Â¦Â PR
* CIÃ¯Â¼Å¡`cargo fmt --check`Ã£â‚¬Â`cargo clippy`Ã£â‚¬Â`cargo test`Ã£â‚¬Â`cargo audit`
* Ã©Æ’Â¨Ã§Â½Â²Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ `scratch` Ã¦Ë†â€“ `distroless` Ã¥Å¸ÂºÃ§Â¡â‚¬Ã©â€¢Å“Ã¥Æ’ÂÃ§Å¡â€ž Docker Ã¥Â¤Å¡Ã©ËœÂ¶Ã¦Â®ÂµÃ¦Å¾â€žÃ¥Â»Âº
