---
paths:
  - "**/*.rs"
---

# Rust Ã¨Â®Â¾Ã¨Â®Â¡Ã¦Â¨Â¡Ã¥Â¼Â

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/patterns.md](../common/patterns.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  Rust Ã§â€°Â¹Ã¦Å“â€°Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¥Å¸ÂºÃ¤ÂºÅ½ Trait Ã§Å¡â€ž Repository Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Â°â€ Ã¦â€¢Â°Ã¦ÂÂ®Ã¨Â®Â¿Ã©â€”Â®Ã¥Â°ÂÃ¨Â£â€¦Ã¥Å“Â¨ trait Ã¤Â¹â€¹Ã¥ÂÅ½Ã¯Â¼Å¡

```rust
pub trait OrderRepository: Send + Sync {
    fn find_by_id(&self, id: u64) -> Result<Option<Order>, StorageError>;
    fn find_all(&self) -> Result<Vec<Order>, StorageError>;
    fn save(&self, order: &Order) -> Result<Order, StorageError>;
    fn delete(&self, id: u64) -> Result<(), StorageError>;
}
```

Ã¥â€¦Â·Ã¤Â½â€œÃ§Å¡â€žÃ¥Â®Å¾Ã§Å½Â°Ã¨Â´Å¸Ã¨Â´Â£Ã¥Â¤â€žÃ§Ââ€ Ã¥Â­ËœÃ¥â€šÂ¨Ã§Â»â€ Ã¨Å â€šÃ¯Â¼Ë†Ã¥Â¦â€š PostgresÃ£â‚¬ÂSQLiteÃ¯Â¼Å’Ã¦Ë†â€“Ã§â€Â¨Ã¤ÂºÅ½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â­ËœÃ¥Â­ËœÃ¥â€šÂ¨Ã¯Â¼â€°Ã£â‚¬â€š

## Ã¦Å“ÂÃ¥Å Â¡Ã¥Â±â€š

Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¤Â½ÂÃ¤ÂºÅ½Ã¦Å“ÂÃ¥Å Â¡Ã§Â»â€œÃ¦Å¾â€žÃ¤Â½â€œÃ¤Â¸Â­Ã¯Â¼â€ºÃ©â‚¬Å¡Ã¨Â¿â€¡Ã¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã¦Â³Â¨Ã¥â€¦Â¥Ã¤Â¾ÂÃ¨Âµâ€“Ã¯Â¼Å¡

```rust
pub struct OrderService {
    repo: Box<dyn OrderRepository>,
    payment: Box<dyn PaymentGateway>,
}

impl OrderService {
    pub fn new(repo: Box<dyn OrderRepository>, payment: Box<dyn PaymentGateway>) -> Self {
        Self { repo, payment }
    }

    pub fn place_order(&self, request: CreateOrderRequest) -> anyhow::Result<OrderSummary> {
        let order = Order::from(request);
        self.payment.charge(order.total())?;
        let saved = self.repo.save(&order)?;
        Ok(OrderSummary::from(saved))
    }
}
```

## Ã¤Â¸ÂºÃ§Â±Â»Ã¥Å¾â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã¤Â½Â¿Ã§â€Â¨ Newtype Ã¦Â¨Â¡Ã¥Â¼Â

Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÅ’Ã§Å¡â€žÃ¥Å’â€¦Ã¨Â£â€¦Ã§Â±Â»Ã¥Å¾â€¹Ã©ËœÂ²Ã¦Â­Â¢Ã¥Ââ€šÃ¦â€¢Â°Ã¦Â·Â·Ã¦Â·â€ Ã¯Â¼Å¡

```rust
struct UserId(u64);
struct OrderId(u64);

fn get_order(user: UserId, order: OrderId) -> anyhow::Result<Order> {
    // Can't accidentally swap user and order IDs at call sites
    todo!()
}
```

## Ã¦Å¾Å¡Ã¤Â¸Â¾Ã§Å Â¶Ã¦â‚¬ÂÃ¦Å“Âº

Ã¥Â°â€ Ã§Å Â¶Ã¦â‚¬ÂÃ¥Â»ÂºÃ¦Â¨Â¡Ã¤Â¸ÂºÃ¦Å¾Å¡Ã¤Â¸Â¾ Ã¢â‚¬â€Ã¢â‚¬â€ Ã¤Â½Â¿Ã©ÂÅ¾Ã¦Â³â€¢Ã§Å Â¶Ã¦â‚¬ÂÃ¦â€”Â Ã¦Â³â€¢Ã¨Â¡Â¨Ã§Â¤ÂºÃ¯Â¼Å¡

```rust
enum ConnectionState {
    Disconnected,
    Connecting { attempt: u32 },
    Connected { session_id: String },
    Failed { reason: String, retries: u32 },
}

fn handle(state: &ConnectionState) {
    match state {
        ConnectionState::Disconnected => connect(),
        ConnectionState::Connecting { attempt } if *attempt > 3 => abort(),
        ConnectionState::Connecting { .. } => wait(),
        ConnectionState::Connected { session_id } => use_session(session_id),
        ConnectionState::Failed { retries, .. } if *retries < 5 => retry(),
        ConnectionState::Failed { reason, .. } => log_failure(reason),
    }
}
```

Ã¥Â§â€¹Ã§Â»Ë†Ã¨Â¿â€ºÃ¨Â¡Å’Ã§Â©Â·Ã¥Â°Â½Ã¥Å’Â¹Ã©â€¦Â Ã¢â‚¬â€Ã¢â‚¬â€ Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¤Â¸Å¡Ã¥Å Â¡Ã¥â€¦Â³Ã©â€Â®Ã§Å¡â€žÃ¦Å¾Å¡Ã¤Â¸Â¾Ã¯Â¼Å’Ã¤Â¸ÂÃ¨Â¦ÂÃ¤Â½Â¿Ã§â€Â¨Ã©â‚¬Å¡Ã©â€¦ÂÃ§Â¬Â¦ `_`Ã£â‚¬â€š

## Ã¥Â»ÂºÃ©â‚¬Â Ã¨â‚¬â€¦Ã¦Â¨Â¡Ã¥Â¼Â

Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¥â€¦Â·Ã¦Å“â€°Ã¥Â¤Å¡Ã¤Â¸ÂªÃ¥ÂÂ¯Ã©â‚¬â€°Ã¥Ââ€šÃ¦â€¢Â°Ã§Å¡â€žÃ§Â»â€œÃ¦Å¾â€žÃ¤Â½â€œÃ¯Â¼Å¡

```rust
pub struct ServerConfig {
    host: String,
    port: u16,
    max_connections: usize,
}

impl ServerConfig {
    pub fn builder(host: impl Into<String>, port: u16) -> ServerConfigBuilder {
        ServerConfigBuilder {
            host: host.into(),
            port,
            max_connections: 100,
        }
    }
}

pub struct ServerConfigBuilder {
    host: String,
    port: u16,
    max_connections: usize,
}

impl ServerConfigBuilder {
    pub fn max_connections(mut self, n: usize) -> Self {
        self.max_connections = n;
        self
    }

    pub fn build(self) -> ServerConfig {
        ServerConfig {
            host: self.host,
            port: self.port,
            max_connections: self.max_connections,
        }
    }
}
```

## Ã¥Â¯â€ Ã¥Â°Â Trait Ã¤Â»Â¥Ã¦Å½Â§Ã¥Ë†Â¶Ã¦â€°Â©Ã¥Â±â€¢Ã¦â‚¬Â§

Ã¤Â½Â¿Ã§â€Â¨Ã§Â§ÂÃ¦Å“â€°Ã¦Â¨Â¡Ã¥Ââ€”Ã¦ÂÂ¥Ã¥Â¯â€ Ã¥Â°ÂÃ¤Â¸â‚¬Ã¤Â¸Âª traitÃ¯Â¼Å’Ã©ËœÂ²Ã¦Â­Â¢Ã¥Â¤â€“Ã©Æ’Â¨Ã¥Â®Å¾Ã§Å½Â°Ã¯Â¼Å¡

```rust
mod private {
    pub trait Sealed {}
}

pub trait Format: private::Sealed {
    fn encode(&self, data: &[u8]) -> Vec<u8>;
}

pub struct Json;
impl private::Sealed for Json {}
impl Format for Json {
    fn encode(&self, data: &[u8]) -> Vec<u8> { todo!() }
}
```

## API Ã¥â€œÂÃ¥Âºâ€Ã¥Å’â€¦Ã¨Â£â€¦Ã¥â„¢Â¨

Ã¤Â½Â¿Ã§â€Â¨Ã¦Â³â€ºÃ¥Å¾â€¹Ã¦Å¾Å¡Ã¤Â¸Â¾Ã¥Â®Å¾Ã§Å½Â°Ã¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€ž API Ã¥â€œÂÃ¥Âºâ€Ã¯Â¼Å¡

```rust
#[derive(Debug, serde::Serialize)]
#[serde(tag = "status")]
pub enum ApiResponse<T: serde::Serialize> {
    #[serde(rename = "ok")]
    Ok { data: T },
    #[serde(rename = "error")]
    Error { message: String },
}
```

## Ã¥Ââ€šÃ¨â‚¬Æ’Ã¨Âµâ€žÃ¦â€“â„¢

Ã¥Ââ€šÃ¨Â§ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`rust-patterns`Ã¯Â¼Å’Ã¥â€¦Â¶Ã¤Â¸Â­Ã¥Å’â€¦Ã¥ÂÂ«Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¦Â¶ÂµÃ§â€ºâ€“Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã£â‚¬ÂtraitÃ£â‚¬ÂÃ¦Â³â€ºÃ¥Å¾â€¹Ã£â‚¬ÂÃ¥Â¹Â¶Ã¥Ââ€˜Ã¥â€™Å’Ã¥Â¼â€šÃ¦Â­Â¥Ã£â‚¬â€š
