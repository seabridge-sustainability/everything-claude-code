---
paths:
  - "**/*.rs"
---

# Rust Ã¨Â®Â¾Ã¨Â®Â¡Ã¦Â¨Â¡Ã¥Â¼Â

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
