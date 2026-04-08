# Rust API Service Ã¢â‚¬â€ Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ CLAUDE.md

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Axum, PostgreSQL, DockerÃ«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ«Å â€ Rust API Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤Ã¬ÂËœ Ã¬â€¹Â¤Ã¬Â â€ž Ã¬ËœË†Ã¬â€¹Å“Ã¬Å¾â€¦Ã«â€¹Ë†Ã«â€¹Â¤.
> Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã«Â£Â¨Ã­Å Â¸Ã¬â€”Â Ã«Â³ÂµÃ¬â€šÂ¬Ã­â€¢ËœÃ¬â€”Â¬ Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤Ã¬â€”Â Ã«Â§Å¾ÃªÂ²Å’ Ã¬Â»Â¤Ã¬Å Â¤Ã­â€žÂ°Ã«Â§Ë†Ã¬ÂÂ´Ã¬Â¦Ë†Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€.

## Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ ÃªÂ°Å“Ã¬Å¡â€

**ÃªÂ¸Â°Ã¬Ë†Â  Ã¬Å Â¤Ã­Æ’Â:** Rust 1.78+, Axum (Ã¬â€ºÂ¹ Ã­â€â€žÃ«Â Ë†Ã¬Å¾â€žÃ¬â€ºÅ’Ã­ÂÂ¬), SQLx (Ã«Â¹â€žÃ«Ââ„¢ÃªÂ¸Â° Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤), PostgreSQL, Tokio (Ã«Â¹â€žÃ«Ââ„¢ÃªÂ¸Â° Ã«Å¸Â°Ã­Æ’â‚¬Ã¬Å¾â€ž), Docker

**Ã¬â€¢â€žÃ­â€šÂ¤Ã­â€¦ÂÃ¬Â²Ëœ:** handler -> service -> repositoryÃ«Â¡Å“ Ã«Â¶â€žÃ«Â¦Â¬Ã«ÂÅ“ Ã«Â Ë†Ã¬ÂÂ´Ã¬â€“Â´Ã«â€œÅ“ Ã¬â€¢â€žÃ­â€šÂ¤Ã­â€¦ÂÃ¬Â²Ëœ. HTTPÃ¬â€”Â Axum, Ã¬Â»Â´Ã­Å’Å’Ã¬ÂÂ¼ Ã­Æ’â‚¬Ã¬Å¾â€žÃ¬â€”Â Ã­Æ’â‚¬Ã¬Å¾â€¦Ã¬ÂÂ´ ÃªÂ²â‚¬Ã¬Â¦ÂÃ«ÂËœÃ«Å â€ SQLÃ¬â€”Â SQLx, Ã­Å¡Â¡Ã«â€¹Â¨ ÃªÂ´â‚¬Ã¬â€¹Â¬Ã¬â€šÂ¬Ã¬â€”Â Tower Ã«Â¯Â¸Ã«â€œÂ¤Ã¬â€ºÂ¨Ã¬â€“Â´ Ã¬â€šÂ¬Ã¬Å¡Â©.

## Ã­â€¢â€žÃ¬Ë†Ëœ ÃªÂ·Å“Ã¬Â¹â„¢

### Rust ÃªÂ·Å“Ã¬Â¹â„¢

- Ã«ÂÂ¼Ã¬ÂÂ´Ã«Â¸Å’Ã«Å¸Â¬Ã«Â¦Â¬ Ã¬ËœÂ¤Ã«Â¥ËœÃ¬â€”Â `thiserror`, Ã«Â°â€Ã¬ÂÂ´Ã«â€žË†Ã«Â¦Â¬ Ã­ÂÂ¬Ã«Â Ë†Ã¬ÂÂ´Ã­Å Â¸Ã«â€šËœ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã¬â€”ÂÃ¬â€žÅ“Ã«Â§Å’ `anyhow` Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã­â€â€žÃ«Â¡Å“Ã«Ââ€¢Ã¬â€¦Ëœ Ã¬Â½â€Ã«â€œÅ“Ã¬â€”ÂÃ¬â€žÅ“ `.unwrap()`Ã¬ÂÂ´Ã«â€šËœ `.expect()` Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬ Ã¢â‚¬â€ `?`Ã«Â¡Å“ Ã¬ËœÂ¤Ã«Â¥Ëœ Ã¬Â â€žÃ­Å’Å’
- Ã­â€¢Â¨Ã¬Ë†Ëœ Ã«Â§Â¤ÃªÂ°Å“Ã«Â³â‚¬Ã¬Ë†ËœÃ¬â€”Â `String`Ã«Â³Â´Ã«â€¹Â¤ `&str` Ã¬â€žÂ Ã­ËœÂ¸; Ã¬â€ Å’Ã¬Å“Â ÃªÂ¶Å’ Ã¬ÂÂ´Ã¬Â â€ž Ã¬â€¹Å“ `String` Ã«Â°ËœÃ­â„¢Ëœ
- `#![deny(clippy::all, clippy::pedantic)]`ÃªÂ³Â¼ Ã­â€¢Â¨ÃªÂ»Ëœ `clippy` Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ Ã«ÂªÂ¨Ã«â€œÂ  ÃªÂ²Â½ÃªÂ³Â  Ã¬Ë†ËœÃ¬Â â€¢
- Ã«ÂªÂ¨Ã«â€œÂ  ÃªÂ³ÂµÃªÂ°Å“ Ã­Æ’â‚¬Ã¬Å¾â€¦Ã¬â€”Â `Debug` derive; `Clone`, `PartialEq`Ã«Å â€ Ã­â€¢â€žÃ¬Å¡â€Ã­â€¢Â  Ã«â€¢Å’Ã«Â§Å’ derive
- `// SAFETY:` Ã¬Â£Â¼Ã¬â€žÂÃ¬Å“Â¼Ã«Â¡Å“ Ã¬Â â€¢Ã«â€¹Â¹Ã­â„¢â€Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã«Å â€ Ã­â€¢Å“ `unsafe` Ã«Â¸â€Ã«Â¡Â Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬

### Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤

- Ã«ÂªÂ¨Ã«â€œÂ  Ã¬Â¿Â¼Ã«Â¦Â¬Ã¬â€”Â SQLx `query!` Ã«ËœÂÃ«Å â€ `query_as!` Ã«Â§Â¤Ã­ÂÂ¬Ã«Â¡Å“ Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ Ã¬Å Â¤Ã­â€šÂ¤Ã«Â§Ë†Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Â´ Ã¬Â»Â´Ã­Å’Å’Ã¬ÂÂ¼ Ã­Æ’â‚¬Ã¬Å¾â€žÃ¬â€”Â ÃªÂ²â‚¬Ã¬Â¦Â
- Ã«Â§Ë†Ã¬ÂÂ´ÃªÂ·Â¸Ã«Â Ë†Ã¬ÂÂ´Ã¬â€¦ËœÃ¬Ââ‚¬ `migrations/`Ã¬â€”Â `sqlx migrate` Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤Ã«Â¥Â¼ Ã¬Â§ÂÃ¬Â â€˜ Ã«Â³â‚¬ÃªÂ²Â½Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â°
- ÃªÂ³ÂµÃ¬Å“Â  Ã¬Æ’ÂÃ­Æ’Å“Ã«Â¡Å“ `sqlx::Pool<Postgres>` Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ Ã¬Å¡â€Ã¬Â²Â­Ã«Â§Ë†Ã«â€¹Â¤ Ã¬Â»Â¤Ã«â€žÂ¥Ã¬â€¦ËœÃ¬Ââ€ž Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â°
- Ã«ÂªÂ¨Ã«â€œÂ  Ã¬Â¿Â¼Ã«Â¦Â¬Ã¬â€”Â parameterized placeholder (`$1`, `$2`) Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ Ã«Â¬Â¸Ã¬Å¾ÂÃ¬â€”Â´ Ã­ÂÂ¬Ã«Â§Â¤Ã­Å’â€¦ Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬

```rust
// Ã«â€šËœÃ¬ÂÅ“ Ã¬ËœË†: Ã«Â¬Â¸Ã¬Å¾ÂÃ¬â€”Â´ Ã«Â³Â´ÃªÂ°â€ž (SQL injection Ã¬Å“â€žÃ­â€”Ëœ)
let q = format!("SELECT * FROM users WHERE id = '{}'", id);

// Ã¬Â¢â€¹Ã¬Ââ‚¬ Ã¬ËœË†: parameterized Ã¬Â¿Â¼Ã«Â¦Â¬, Ã¬Â»Â´Ã­Å’Å’Ã¬ÂÂ¼ Ã­Æ’â‚¬Ã¬Å¾â€žÃ¬â€”Â ÃªÂ²â‚¬Ã¬Â¦Â
let user = sqlx::query_as!(User, "SELECT * FROM users WHERE id = $1", id)
    .fetch_optional(&pool)
    .await?;
```

### Ã¬ËœÂ¤Ã«Â¥Ëœ Ã¬Â²ËœÃ«Â¦Â¬

- Ã«ÂªÂ¨Ã«â€œË†Ã«Â³â€žÃ«Â¡Å“ `thiserror`Ã«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢Å“ Ã«Ââ€žÃ«Â©â€Ã¬ÂÂ¸ Ã¬ËœÂ¤Ã«Â¥Ëœ enum Ã¬Â â€¢Ã¬ÂËœ
- `IntoResponse`Ã«Â¥Â¼ Ã­â€ ÂµÃ­â€¢Â´ Ã¬ËœÂ¤Ã«Â¥ËœÃ«Â¥Â¼ HTTP Ã¬Ââ€˜Ã«â€¹ÂµÃ¬Å“Â¼Ã«Â¡Å“ Ã«Â§Â¤Ã­â€¢â€˜ Ã¢â‚¬â€ Ã«â€šÂ´Ã«Â¶â‚¬ Ã¬â€žÂ¸Ã«Â¶â‚¬ Ã¬Â â€¢Ã«Â³Â´Ã«Â¥Â¼ Ã«â€¦Â¸Ã¬Â¶Å“Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â°
- ÃªÂµÂ¬Ã¬Â¡Â°Ã­â„¢â€Ã«ÂÅ“ Ã«Â¡Å“ÃªÂ¹â€¦Ã¬â€”Â `tracing` Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ `println!`Ã¬ÂÂ´Ã«â€šËœ `eprintln!` Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬

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
    Database(#[from] sqlx::Error),
    #[error(transparent)]
    Io(#[from] std::io::Error),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message) = match &self {
            Self::NotFound => (StatusCode::NOT_FOUND, self.to_string()),
            Self::Validation(msg) => (StatusCode::BAD_REQUEST, msg.clone()),
            Self::Unauthorized => (StatusCode::UNAUTHORIZED, self.to_string()),
            Self::Database(err) => {
                tracing::error!(?err, "database error");
                (StatusCode::INTERNAL_SERVER_ERROR, "Internal error".into())
            }
            Self::Io(err) => {
                tracing::error!(?err, "internal error");
                (StatusCode::INTERNAL_SERVER_ERROR, "Internal error".into())
            }
        };
        (status, Json(json!({ "error": message }))).into_response()
    }
}
```

### Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸

- ÃªÂ°Â Ã¬â€ Å’Ã¬Å Â¤ Ã­Å’Å’Ã¬ÂÂ¼ Ã«â€šÂ´Ã¬ÂËœ `#[cfg(test)]` Ã«ÂªÂ¨Ã«â€œË†Ã¬â€”ÂÃ¬â€žÅ“ Ã«â€¹Â¨Ã¬Å“â€ž Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸
- `tests/` Ã«â€â€Ã«Â â€°Ã­â€ Â Ã«Â¦Â¬Ã¬â€”ÂÃ¬â€žÅ“ Ã¬â€¹Â¤Ã¬Â Å“ PostgreSQLÃ¬Ââ€ž Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢Å“ Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ (Testcontainers Ã«ËœÂÃ«Å â€ Docker)
- Ã¬Å¾ÂÃ«Ââ„¢ Ã«Â§Ë†Ã¬ÂÂ´ÃªÂ·Â¸Ã«Â Ë†Ã¬ÂÂ´Ã¬â€¦ËœÃªÂ³Â¼ Ã«Â¡Â¤Ã«Â°Â±Ã¬ÂÂ´ Ã­ÂÂ¬Ã­â€¢Â¨Ã«ÂÅ“ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã¬â€”Â `#[sqlx::test]` Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã¬â„¢Â¸Ã«Â¶â‚¬ Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤ Ã«ÂªÂ¨Ã­â€šÂ¹Ã¬â€”Â `mockall` Ã«ËœÂÃ«Å â€ `wiremock` Ã¬â€šÂ¬Ã¬Å¡Â©

### Ã¬Â½â€Ã«â€œÅ“ Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼

- Ã¬ÂµÅ“Ã«Å’â‚¬ Ã¬Â¤â€ž ÃªÂ¸Â¸Ã¬ÂÂ´: 100Ã¬Å¾Â (rustfmtÃ¬â€”Â Ã¬ÂËœÃ­â€¢Â´ ÃªÂ°â€¢Ã¬Â Å“)
- import ÃªÂ·Â¸Ã«Â£Â¹Ã­â„¢â€: `std`, Ã¬â„¢Â¸Ã«Â¶â‚¬ Ã­ÂÂ¬Ã«Â Ë†Ã¬ÂÂ´Ã­Å Â¸, `crate`/`super` Ã¢â‚¬â€ Ã«Â¹Ë† Ã¬Â¤â€žÃ«Â¡Å“ ÃªÂµÂ¬Ã«Â¶â€ž
- Ã«ÂªÂ¨Ã«â€œË†: Ã«ÂªÂ¨Ã«â€œË†Ã«â€¹Â¹ Ã­Å’Å’Ã¬ÂÂ¼ Ã­â€¢ËœÃ«â€šËœ, `mod.rs`Ã«Å â€ re-exportÃ¬Å¡Â©Ã¬Å“Â¼Ã«Â¡Å“Ã«Â§Å’ Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã­Æ’â‚¬Ã¬Å¾â€¦: PascalCase, Ã­â€¢Â¨Ã¬Ë†Ëœ/Ã«Â³â‚¬Ã¬Ë†Ëœ: snake_case, Ã¬Æ’ÂÃ¬Ë†Ëœ: UPPER_SNAKE_CASE

## Ã­Å’Å’Ã¬ÂÂ¼ ÃªÂµÂ¬Ã¬Â¡Â°

```
src/
  main.rs              # Ã¬Â§â€žÃ¬Å¾â€¦Ã¬Â Â, Ã¬â€žÅ“Ã«Â²â€ž Ã¬â€žÂ¤Ã¬Â â€¢, Ã¬Å¡Â°Ã¬â€¢â€žÃ­â€¢Å“ Ã¬Â¢â€¦Ã«Â£Å’
  lib.rs               # Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã¬Å“â€žÃ­â€¢Å“ re-export
  config.rs            # envy Ã«ËœÂÃ«Å â€ figmentÃ¬Ââ€ž Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢Å“ Ã­â„¢ËœÃªÂ²Â½ Ã¬â€žÂ¤Ã¬Â â€¢
  router.rs            # Ã«ÂªÂ¨Ã«â€œÂ  Ã«ÂÂ¼Ã¬Å¡Â°Ã­Å Â¸ÃªÂ°â‚¬ Ã­ÂÂ¬Ã­â€¢Â¨Ã«ÂÅ“ Axum Ã«ÂÂ¼Ã¬Å¡Â°Ã­â€žÂ°
  middleware/
    auth.rs            # JWT Ã¬Â¶â€Ã¬Â¶Å“ Ã«Â°Â ÃªÂ²â‚¬Ã¬Â¦Â
    logging.rs         # Ã¬Å¡â€Ã¬Â²Â­/Ã¬Ââ€˜Ã«â€¹Âµ Ã­Å Â¸Ã«Â Ë†Ã¬ÂÂ´Ã¬â€¹Â±
  handlers/
    mod.rs             # Ã«ÂÂ¼Ã¬Å¡Â°Ã­Å Â¸ Ã­â€¢Â¸Ã«â€œÂ¤Ã«Å¸Â¬ (Ã¬â€“â€¡ÃªÂ²Å’ Ã¢â‚¬â€ Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤Ã¬â€”Â Ã¬Å“â€žÃ¬Å¾â€ž)
    users.rs
    orders.rs
  services/
    mod.rs             # Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§Â
    users.rs
    orders.rs
  repositories/
    mod.rs             # Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Â â€˜ÃªÂ·Â¼ (SQLx Ã¬Â¿Â¼Ã«Â¦Â¬)
    users.rs
    orders.rs
  domain/
    mod.rs             # Ã«Ââ€žÃ«Â©â€Ã¬ÂÂ¸ Ã­Æ’â‚¬Ã¬Å¾â€¦, Ã¬ËœÂ¤Ã«Â¥Ëœ enum
    user.rs
    order.rs
migrations/
  001_create_users.sql
  002_create_orders.sql
tests/
  common/mod.rs        # ÃªÂ³ÂµÃ¬Å“Â  Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã­â€”Â¬Ã­ÂÂ¼, Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€žÅ“Ã«Â²â€ž Ã¬â€žÂ¤Ã¬Â â€¢
  api_users.rs         # Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã¬â€”â€Ã«â€œÅ“Ã­ÂÂ¬Ã¬ÂÂ¸Ã­Å Â¸ Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸
  api_orders.rs        # Ã¬Â£Â¼Ã«Â¬Â¸ Ã¬â€”â€Ã«â€œÅ“Ã­ÂÂ¬Ã¬ÂÂ¸Ã­Å Â¸ Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸
```

## Ã¬Â£Â¼Ã¬Å¡â€ Ã­Å’Â¨Ã­â€žÂ´

### Handler (Ã¬â€“â€¡Ã¬Ââ‚¬ Ã«Â Ë†Ã¬ÂÂ´Ã¬â€“Â´)

```rust
async fn create_user(
    State(ctx): State<AppState>,
    Json(payload): Json<CreateUserRequest>,
) -> Result<(StatusCode, Json<UserResponse>), AppError> {
    let user = ctx.user_service.create(payload).await?;
    Ok((StatusCode::CREATED, Json(UserResponse::from(user))))
}
```

### Service (Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§Â)

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

### Repository (Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬Â â€˜ÃªÂ·Â¼)

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

### Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸

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
    // Ã¬Â²Â« Ã«Â²Ë†Ã¬Â§Â¸ Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã¬Æ’ÂÃ¬â€žÂ±
    create_test_user(&app, "alice@example.com").await;
    // Ã¬Â¤â€˜Ã«Â³Âµ Ã¬â€¹Å“Ã«Ââ€ž
    let response = create_user_request(&app, "alice@example.com").await;
    assert_eq!(response.status(), StatusCode::BAD_REQUEST);
}
```

## Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†Ëœ

```bash
# Ã¬â€žÅ“Ã«Â²â€ž
HOST=0.0.0.0
PORT=8080
RUST_LOG=info,tower_http=debug

# Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤
DATABASE_URL=postgres://user:pass@localhost:5432/myapp

# Ã¬ÂÂ¸Ã¬Â¦Â
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRY_HOURS=24

# Ã¬â€žÂ Ã­Æ’Â Ã¬â€šÂ¬Ã­â€¢Â­
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â â€žÃ«Å¾Âµ

```bash
# Ã¬Â â€žÃ¬Â²Â´ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€°
cargo test

# Ã¬Â¶Å“Ã«Â Â¥ÃªÂ³Â¼ Ã­â€¢Â¨ÃªÂ»Ëœ Ã¬â€¹Â¤Ã­â€“â€°
cargo test -- --nocapture

# Ã­Å Â¹Ã¬Â â€¢ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«ÂªÂ¨Ã«â€œË† Ã¬â€¹Â¤Ã­â€“â€°
cargo test api_users

# Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸ (cargo-llvm-cov Ã­â€¢â€žÃ¬Å¡â€)
cargo llvm-cov --html
open target/llvm-cov/html/index.html

# Ã«Â¦Â°Ã­Å Â¸
cargo clippy -- -D warnings

# Ã­ÂÂ¬Ã«Â§Â· ÃªÂ²â‚¬Ã¬â€šÂ¬
cargo fmt -- --check
```

## ECC Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

```bash
# ÃªÂ³â€žÃ­Å¡Â Ã¬Ë†ËœÃ«Â¦Â½
/plan "Add order fulfillment with Stripe payment"

# TDDÃ«Â¡Å“ ÃªÂ°Å“Ã«Â°Å“
/tdd                    # cargo test ÃªÂ¸Â°Ã«Â°Ëœ TDD Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

# Ã«Â¦Â¬Ã«Â·Â°
/code-review            # Rust Ã¬Â â€žÃ¬Å¡Â© Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â°
/security-scan          # Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ± ÃªÂ°ÂÃ¬â€šÂ¬ + unsafe Ã¬Å Â¤Ã¬Âºâ€

# ÃªÂ²â‚¬Ã¬Â¦Â
/verify                 # Ã«Â¹Å’Ã«â€œÅ“, clippy, Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸, Ã«Â³Â´Ã¬â€¢Ë† Ã¬Å Â¤Ã¬Âºâ€
```

## Git Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

- `feat:` Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥, `fix:` Ã«Â²â€žÃªÂ·Â¸ Ã¬Ë†ËœÃ¬Â â€¢, `refactor:` Ã¬Â½â€Ã«â€œÅ“ Ã«Â³â‚¬ÃªÂ²Â½
- `main`Ã¬â€”ÂÃ¬â€žÅ“ feature Ã«Â¸Å’Ã«Å¾Å“Ã¬Â¹Ëœ Ã¬Æ’ÂÃ¬â€žÂ±, PR Ã­â€¢â€žÃ¬Ë†Ëœ
- CI: `cargo fmt --check`, `cargo clippy`, `cargo test`, `cargo audit`
- Ã«Â°Â°Ã­ÂÂ¬: `scratch` Ã«ËœÂÃ«Å â€ `distroless` Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤Ã«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢Å“ Docker Ã«Â©â‚¬Ã­â€¹Â°Ã¬Å Â¤Ã­â€¦Å’Ã¬ÂÂ´Ã¬Â§â‚¬ Ã«Â¹Å’Ã«â€œÅ“
