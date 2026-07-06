---
name: rust-patterns
description: Ã¥Å“Â°Ã©Ââ€œÃ§Å¡â€žRustÃ¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã£â‚¬ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ Ã£â‚¬ÂÃ§â€°Â¹Ã¨Â´Â¨Ã£â‚¬ÂÃ¥Â¹Â¶Ã¥Ââ€˜Ã¯Â¼Å’Ã¤Â»Â¥Ã¥ÂÅ Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â®â€°Ã¥â€¦Â¨Ã£â‚¬ÂÃ©Â«ËœÃ¦â‚¬Â§Ã¨Æ’Â½Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ§Å¡â€žÃ¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·ÂµÃ£â‚¬â€š
origin: ECC
---

# Rust Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â®â€°Ã¥â€¦Â¨Ã£â‚¬ÂÃ©Â«ËœÃ¦â‚¬Â§Ã¨Æ’Â½Ã¤Â¸â€Ã¥ÂÂ¯Ã§Â»Â´Ã¦Å Â¤Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ§Å¡â€žÃ¦Æ’Â¯Ã§â€Â¨ Rust Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥â€™Å’Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·ÂµÃ£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

* Ã§Â¼â€“Ã¥â€ â„¢Ã¦â€“Â°Ã§Å¡â€ž Rust Ã¤Â»Â£Ã§Â ÂÃ¦â€”Â¶
* Ã¨Â¯â€žÃ¥Â®Â¡ Rust Ã¤Â»Â£Ã§Â ÂÃ¦â€”Â¶
* Ã©â€¡ÂÃ¦Å¾â€žÃ§Å½Â°Ã¦Å“â€° Rust Ã¤Â»Â£Ã§Â ÂÃ¦â€”Â¶
* Ã¨Â®Â¾Ã¨Â®Â¡ crate Ã§Â»â€œÃ¦Å¾â€žÃ¥â€™Å’Ã¦Â¨Â¡Ã¥Ââ€”Ã¥Â¸Æ’Ã¥Â±â‚¬Ã¦â€”Â¶

## Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å½Å¸Ã§Ââ€ 

Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã¥Å“Â¨Ã¥â€¦Â­Ã¤Â¸ÂªÃ¥â€¦Â³Ã©â€Â®Ã©Â¢â€ Ã¥Å¸Å¸Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¦Æ’Â¯Ã§â€Â¨Ã§Å¡â€ž Rust Ã§ÂºÂ¦Ã¥Â®Å¡Ã¯Â¼Å¡Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã¥â€™Å’Ã¥â‚¬Å¸Ã§â€Â¨Ã¯Â¼Å’Ã§â€Â¨Ã¤ÂºÅ½Ã¥Å“Â¨Ã§Â¼â€“Ã¨Â¯â€˜Ã¦â€”Â¶Ã©ËœÂ²Ã¦Â­Â¢Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°Ã¯Â¼â€º`Result`/`?` Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¼Â Ã¦â€™Â­Ã¯Â¼Å’Ã¥Âºâ€œÃ¤Â½Â¿Ã§â€Â¨ `thiserror` Ã¨â‚¬Å’Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ¤Â½Â¿Ã§â€Â¨ `anyhow`Ã¯Â¼â€ºÃ¦Å¾Å¡Ã¤Â¸Â¾Ã¥â€™Å’Ã§Â©Â·Ã¥Â°Â½Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥Å’Â¹Ã©â€¦ÂÃ¯Â¼Å’Ã¤Â½Â¿Ã©ÂÅ¾Ã¦Â³â€¢Ã§Å Â¶Ã¦â‚¬ÂÃ¦â€”Â Ã¦Â³â€¢Ã¨Â¡Â¨Ã§Â¤ÂºÃ¯Â¼â€ºÃ§â€Â¨Ã¤ÂºÅ½Ã©â€ºÂ¶Ã¦Ë†ÂÃ¦Å“Â¬Ã¦Å Â½Ã¨Â±Â¡Ã§Å¡â€ž trait Ã¥â€™Å’Ã¦Â³â€ºÃ¥Å¾â€¹Ã¯Â¼â€ºÃ©â‚¬Å¡Ã¨Â¿â€¡ `Arc<Mutex<T>>`Ã£â‚¬ÂÃ©â‚¬Å¡Ã©Ââ€œÃ¥â€™Å’ async/await Ã¥Â®Å¾Ã§Å½Â°Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¥Â¹Â¶Ã¥Ââ€˜Ã¯Â¼â€ºÃ¤Â»Â¥Ã¥ÂÅ Ã¦Å’â€°Ã©Â¢â€ Ã¥Å¸Å¸Ã§Â»â€žÃ§Â»â€¡Ã§Å¡â€žÃ¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“ `pub` Ã¦Å½Â¥Ã¥ÂÂ£Ã£â‚¬â€š

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¥Å½Å¸Ã¥Ë†â„¢

### 1. Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã¥â€™Å’Ã¥â‚¬Å¸Ã§â€Â¨

Rust Ã§Å¡â€žÃ¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã§Â³Â»Ã§Â»Å¸Ã¥Å“Â¨Ã§Â¼â€“Ã¨Â¯â€˜Ã¦â€”Â¶Ã©ËœÂ²Ã¦Â­Â¢Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°Ã¥â€™Å’Ã¥â€ â€¦Ã¥Â­ËœÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬â€š

```rust
// Good: Pass references when you don't need ownership
fn process(data: &[u8]) -> usize {
    data.len()
}

// Good: Take ownership only when you need to store or consume
fn store(data: Vec<u8>) -> Record {
    Record { payload: data }
}

// Bad: Cloning unnecessarily to avoid borrow checker
fn process_bad(data: &Vec<u8>) -> usize {
    let cloned = data.clone(); // Wasteful Ã¢â‚¬â€ just borrow
    cloned.len()
}
```

### Ã¤Â½Â¿Ã§â€Â¨ `Cow` Ã¥Â®Å¾Ã§Å½Â°Ã§ÂÂµÃ¦Â´Â»Ã§Å¡â€žÃ¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’

```rust
use std::borrow::Cow;

fn normalize(input: &str) -> Cow<'_, str> {
    if input.contains(' ') {
        Cow::Owned(input.replace(' ', "_"))
    } else {
        Cow::Borrowed(input) // Zero-cost when no mutation needed
    }
}
```

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

### Ã¤Â½Â¿Ã§â€Â¨ `Result` Ã¥â€™Å’ `?` Ã¢â‚¬â€Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `unwrap()`

```rust
// Good: Propagate errors with context
use anyhow::{Context, Result};

fn load_config(path: &str) -> Result<Config> {
    let content = std::fs::read_to_string(path)
        .with_context(|| format!("failed to read config from {path}"))?;
    let config: Config = toml::from_str(&content)
        .with_context(|| format!("failed to parse config from {path}"))?;
    Ok(config)
}

// Bad: Panics on error
fn load_config_bad(path: &str) -> Config {
    let content = std::fs::read_to_string(path).unwrap(); // Panics!
    toml::from_str(&content).unwrap()
}
```

### Ã¥Âºâ€œÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â½Â¿Ã§â€Â¨ `thiserror`Ã¯Â¼Å’Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â½Â¿Ã§â€Â¨ `anyhow`

```rust
// Library code: structured, typed errors
use thiserror::Error;

#[derive(Debug, Error)]
pub enum StorageError {
    #[error("record not found: {id}")]
    NotFound { id: String },
    #[error("connection failed")]
    Connection(#[from] std::io::Error),
    #[error("invalid data: {0}")]
    InvalidData(String),
}

// Application code: flexible error handling
use anyhow::{bail, Result};

fn run() -> Result<()> {
    let config = load_config("app.toml")?;
    if config.workers == 0 {
        bail!("worker count must be > 0");
    }
    Ok(())
}
```

### Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `Option` Ã§Â»â€žÃ¥ÂË†Ã¥Â­ÂÃ¨â‚¬Å’Ã©ÂÅ¾Ã¥ÂµÅ’Ã¥Â¥â€”Ã¥Å’Â¹Ã©â€¦Â

```rust
// Good: Combinator chain
fn find_user_email(users: &[User], id: u64) -> Option<String> {
    users.iter()
        .find(|u| u.id == id)
        .map(|u| u.email.clone())
}

// Bad: Deeply nested matching
fn find_user_email_bad(users: &[User], id: u64) -> Option<String> {
    match users.iter().find(|u| u.id == id) {
        Some(user) => match &user.email {
            email => Some(email.clone()),
        },
        None => None,
    }
}
```

## Ã¦Å¾Å¡Ã¤Â¸Â¾Ã¥â€™Å’Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥Å’Â¹Ã©â€¦Â

### Ã¥Â°â€ Ã§Å Â¶Ã¦â‚¬ÂÃ¥Â»ÂºÃ¦Â¨Â¡Ã¤Â¸ÂºÃ¦Å¾Å¡Ã¤Â¸Â¾

```rust
// Good: Impossible states are unrepresentable
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

### Ã§Â©Â·Ã¥Â°Â½Ã¥Å’Â¹Ã©â€¦Â Ã¢â‚¬â€Ã¢â‚¬â€ Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¤Â¸Â­Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨Ã©â‚¬Å¡Ã©â€¦ÂÃ§Â¬Â¦

```rust
// Good: Handle every variant explicitly
match command {
    Command::Start => start_service(),
    Command::Stop => stop_service(),
    Command::Restart => restart_service(),
    // Adding a new variant forces handling here
}

// Bad: Wildcard hides new variants
match command {
    Command::Start => start_service(),
    _ => {} // Silently ignores Stop, Restart, and future variants
}
```

## Trait Ã¥â€™Å’Ã¦Â³â€ºÃ¥Å¾â€¹

### Ã¦Å½Â¥Ã¥Ââ€”Ã¦Â³â€ºÃ¥Å¾â€¹Ã¯Â¼Å’Ã¨Â¿â€Ã¥â€ºÅ¾Ã¥â€¦Â·Ã¤Â½â€œÃ§Â±Â»Ã¥Å¾â€¹

```rust
// Good: Generic input, concrete output
fn read_all(reader: &mut impl Read) -> std::io::Result<Vec<u8>> {
    let mut buf = Vec::new();
    reader.read_to_end(&mut buf)?;
    Ok(buf)
}

// Good: Trait bounds for multiple constraints
fn process<T: Display + Send + 'static>(item: T) -> String {
    format!("processed: {item}")
}
```

### Ã¤Â½Â¿Ã§â€Â¨ Trait Ã¥Â¯Â¹Ã¨Â±Â¡Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Å Â¨Ã¦â‚¬ÂÃ¥Ë†â€ Ã¥Ââ€˜

```rust
// Use when you need heterogeneous collections or plugin systems
trait Handler: Send + Sync {
    fn handle(&self, request: &Request) -> Response;
}

struct Router {
    handlers: Vec<Box<dyn Handler>>,
}

// Use generics when you need performance (monomorphization)
fn fast_process<H: Handler>(handler: &H, request: &Request) -> Response {
    handler.handle(request)
}
```

### Ã¤Â½Â¿Ã§â€Â¨ Newtype Ã¦Â¨Â¡Ã¥Â¼ÂÃ§Â¡Â®Ã¤Â¿ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¥Â®â€°Ã¥â€¦Â¨

```rust
// Good: Distinct types prevent mixing up arguments
struct UserId(u64);
struct OrderId(u64);

fn get_order(user: UserId, order: OrderId) -> Result<Order> {
    // Can't accidentally swap user and order IDs
    todo!()
}

// Bad: Easy to swap arguments
fn get_order_bad(user_id: u64, order_id: u64) -> Result<Order> {
    todo!()
}
```

## Ã§Â»â€œÃ¦Å¾â€žÃ¤Â½â€œÃ¥â€™Å’Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Â»ÂºÃ¦Â¨Â¡

### Ã¤Â½Â¿Ã§â€Â¨Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â„¢Â¨Ã¦Â¨Â¡Ã¥Â¼ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã¥Â¤ÂÃ¦Ââ€šÃ¦Å¾â€žÃ©â‚¬Â 

```rust
struct ServerConfig {
    host: String,
    port: u16,
    max_connections: usize,
}

impl ServerConfig {
    fn builder(host: impl Into<String>, port: u16) -> ServerConfigBuilder {
        ServerConfigBuilder { host: host.into(), port, max_connections: 100 }
    }
}

struct ServerConfigBuilder { host: String, port: u16, max_connections: usize }

impl ServerConfigBuilder {
    fn max_connections(mut self, n: usize) -> Self { self.max_connections = n; self }
    fn build(self) -> ServerConfig {
        ServerConfig { host: self.host, port: self.port, max_connections: self.max_connections }
    }
}

// Usage: ServerConfig::builder("localhost", 8080).max_connections(200).build()
```

## Ã¨Â¿Â­Ã¤Â»Â£Ã¥â„¢Â¨Ã¥â€™Å’Ã©â€”Â­Ã¥Å’â€¦

### Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¿Â­Ã¤Â»Â£Ã¥â„¢Â¨Ã©â€œÂ¾Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦â€°â€¹Ã¥Å Â¨Ã¥Â¾ÂªÃ§Å½Â¯

```rust
// Good: Declarative, lazy, composable
let active_emails: Vec<String> = users.iter()
    .filter(|u| u.is_active)
    .map(|u| u.email.clone())
    .collect();

// Bad: Imperative accumulation
let mut active_emails = Vec::new();
for user in &users {
    if user.is_active {
        active_emails.push(user.email.clone());
    }
}
```

### Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¸Â¦Ã¦Å“â€°Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â³Â¨Ã¨Â§Â£Ã§Å¡â€ž `collect()`

```rust
// Collect into different types
let names: Vec<_> = items.iter().map(|i| &i.name).collect();
let lookup: HashMap<_, _> = items.iter().map(|i| (i.id, i)).collect();
let combined: String = parts.iter().copied().collect();

// Collect Results Ã¢â‚¬â€ short-circuits on first error
let parsed: Result<Vec<i32>, _> = strings.iter().map(|s| s.parse()).collect();
```

## Ã¥Â¹Â¶Ã¥Ââ€˜

### Ã¤Â½Â¿Ã§â€Â¨ `Arc<Mutex<T>>` Ã¥Â¤â€žÃ§Ââ€ Ã¥â€¦Â±Ã¤ÂºÂ«Ã¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬Â

```rust
use std::sync::{Arc, Mutex};

let counter = Arc::new(Mutex::new(0));
let handles: Vec<_> = (0..10).map(|_| {
    let counter = Arc::clone(&counter);
    std::thread::spawn(move || {
        let mut num = counter.lock().expect("mutex poisoned");
        *num += 1;
    })
}).collect();

for handle in handles {
    handle.join().expect("worker thread panicked");
}
```

### Ã¤Â½Â¿Ã§â€Â¨Ã©â‚¬Å¡Ã©Ââ€œÃ¨Â¿â€ºÃ¨Â¡Å’Ã¦Â¶Ë†Ã¦ÂÂ¯Ã¤Â¼Â Ã©â‚¬â€™

```rust
use std::sync::mpsc;

let (tx, rx) = mpsc::sync_channel(16); // Bounded channel with backpressure

for i in 0..5 {
    let tx = tx.clone();
    std::thread::spawn(move || {
        tx.send(format!("message {i}")).expect("receiver disconnected");
    });
}
drop(tx); // Close sender so rx iterator terminates

for msg in rx {
    println!("{msg}");
}
```

### Ã¤Â½Â¿Ã§â€Â¨ Tokio Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Â¼â€šÃ¦Â­Â¥Ã§Â¼â€“Ã§Â¨â€¹

```rust
use tokio::time::Duration;

async fn fetch_with_timeout(url: &str) -> Result<String> {
    let response = tokio::time::timeout(
        Duration::from_secs(5),
        reqwest::get(url),
    )
    .await
    .context("request timed out")?
    .context("request failed")?;

    response.text().await.context("failed to read body")
}

// Spawn concurrent tasks
async fn fetch_all(urls: Vec<String>) -> Vec<Result<String>> {
    let handles: Vec<_> = urls.into_iter()
        .map(|url| tokio::spawn(async move {
            fetch_with_timeout(&url).await
        }))
        .collect();

    let mut results = Vec::with_capacity(handles.len());
    for handle in handles {
        results.push(handle.await.unwrap_or_else(|e| panic!("spawned task panicked: {e}")));
    }
    results
}
```

## Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¤Â»Â£Ã§Â Â

### Ã¤Â½â€¢Ã¦â€”Â¶Ã¥ÂÂ¯Ã¤Â»Â¥Ã¤Â½Â¿Ã§â€Â¨ Unsafe

```rust
// Acceptable: FFI boundary with documented invariants (Rust 2024+)
/// # Safety
/// `ptr` must be a valid, aligned pointer to an initialized `Widget`.
unsafe fn widget_from_raw<'a>(ptr: *const Widget) -> &'a Widget {
    // SAFETY: caller guarantees ptr is valid and aligned
    unsafe { &*ptr }
}

// Acceptable: Performance-critical path with proof of correctness
// SAFETY: index is always < len due to the loop bound
unsafe { slice.get_unchecked(index) }
```

### Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â¸ÂÃ¥ÂÂ¯Ã¤Â»Â¥Ã¤Â½Â¿Ã§â€Â¨ Unsafe

```rust
// Bad: Using unsafe to bypass borrow checker
// Bad: Using unsafe for convenience
// Bad: Using unsafe without a Safety comment
// Bad: Transmuting between unrelated types
```

## Ã¦Â¨Â¡Ã¥Ââ€”Ã§Â³Â»Ã§Â»Å¸Ã¥â€™Å’ Crate Ã§Â»â€œÃ¦Å¾â€ž

### Ã¦Å’â€°Ã©Â¢â€ Ã¥Å¸Å¸Ã§Â»â€žÃ§Â»â€¡Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦Å’â€°Ã§Â±Â»Ã¥Å¾â€¹

```text
my_app/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ src/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ main.rs
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ lib.rs
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ auth/          # Ã©Â¢â€ Ã¥Å¸Å¸Ã¦Â¨Â¡Ã¥Ââ€”
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ token.rs
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ middleware.rs
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ orders/        # Ã©Â¢â€ Ã¥Å¸Å¸Ã¦Â¨Â¡Ã¥Ââ€”
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ model.rs
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ service.rs
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ db/            # Ã¥Å¸ÂºÃ§Â¡â‚¬Ã¨Â®Â¾Ã¦â€“Â½
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ pool.rs
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ tests/             # Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ benches/           # Ã¥Å¸ÂºÃ¥â€¡â€ Ã¦Âµâ€¹Ã¨Â¯â€¢
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ Cargo.toml
```

### Ã¥ÂÂ¯Ã¨Â§ÂÃ¦â‚¬Â§ Ã¢â‚¬â€Ã¢â‚¬â€ Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¦Å¡Â´Ã©Å“Â²

```rust
// Good: pub(crate) for internal sharing
pub(crate) fn validate_input(input: &str) -> bool {
    !input.is_empty()
}

// Good: Re-export public API from lib.rs
pub mod auth;
pub use auth::AuthMiddleware;

// Bad: Making everything pub
pub fn internal_helper() {} // Should be pub(crate) or private
```

## Ã¥Â·Â¥Ã¥â€¦Â·Ã©â€ºâ€ Ã¦Ë†Â

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã¥â€˜Â½Ã¤Â»Â¤

```bash
# Build and check
cargo build
cargo check              # Fast type checking without codegen
cargo clippy             # Lints and suggestions
cargo fmt                # Format code

# Testing
cargo test
cargo test -- --nocapture    # Show println output
cargo test --lib             # Unit tests only
cargo test --test integration # Integration tests only

# Dependencies
cargo audit              # Security audit
cargo tree               # Dependency tree
cargo update             # Update dependencies

# Performance
cargo bench              # Run benchmarks
```

## Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥Ââ€šÃ¨â‚¬Æ’Ã¯Â¼Å¡Rust Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢

| Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢ | Ã¦ÂÂÃ¨Â¿Â° |
|-------|-------------|
| Ã¥â‚¬Å¸Ã§â€Â¨Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥â€¦â€¹Ã©Å¡â€  | Ã¤Â¼Â Ã©â‚¬â€™ `&T`Ã¯Â¼Å’Ã©â„¢Â¤Ã©ÂÅ¾Ã©Å“â‚¬Ã¨Â¦ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¤Â¸ÂÃ¨Â¦ÂÃ¥â€¦â€¹Ã©Å¡â€  |
| Ã¤Â½Â¿Ã©ÂÅ¾Ã¦Â³â€¢Ã§Å Â¶Ã¦â‚¬ÂÃ¦â€”Â Ã¦Â³â€¢Ã¨Â¡Â¨Ã§Â¤Âº | Ã¤Â½Â¿Ã§â€Â¨Ã¦Å¾Å¡Ã¤Â¸Â¾Ã¤Â»â€¦Ã¥Â¯Â¹Ã¦Å“â€°Ã¦â€¢Ë†Ã§Å Â¶Ã¦â‚¬ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã¥Â»ÂºÃ¦Â¨Â¡ |
| `?` Ã¤Â¼ËœÃ¤ÂºÅ½ `unwrap()` | Ã¤Â¼Â Ã¦â€™Â­Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å’Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨Ã¥Âºâ€œ/Ã§â€Å¸Ã¤ÂºÂ§Ã¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¦ÂÂÃ¦â€¦Å’ |
| Ã¨Â§Â£Ã¦Å¾ÂÃ¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã©ÂªÅ’Ã¨Â¯Â | Ã¥Å“Â¨Ã¨Â¾Â¹Ã§â€¢Å’Ã¥Â¤â€žÃ¥Â°â€ Ã©ÂÅ¾Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¦â€¢Â°Ã¦ÂÂ®Ã¨Â½Â¬Ã¦ÂÂ¢Ã¤Â¸ÂºÃ§Â±Â»Ã¥Å¾â€¹Ã¥Å’â€“Ã§Â»â€œÃ¦Å¾â€žÃ¤Â½â€œ |
| Newtype Ã§â€Â¨Ã¤ÂºÅ½Ã§Â±Â»Ã¥Å¾â€¹Ã¥Â®â€°Ã¥â€¦Â¨ | Ã¥Â°â€ Ã¥Å¸ÂºÃ¦Å“Â¬Ã§Â±Â»Ã¥Å¾â€¹Ã¥Å’â€¦Ã¨Â£â€¦Ã¥Å“Â¨ newtype Ã¤Â¸Â­Ã¤Â»Â¥Ã©ËœÂ²Ã¦Â­Â¢Ã¥Ââ€šÃ¦â€¢Â°Ã©â€â„¢Ã¤Â½Â |
| Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¿Â­Ã¤Â»Â£Ã¥â„¢Â¨Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â¾ÂªÃ§Å½Â¯ | Ã¥Â£Â°Ã¦ËœÅ½Ã¥Â¼ÂÃ©â€œÂ¾Ã¦â€ºÂ´Ã¦Â¸â€¦Ã¦â„¢Â°Ã¤Â¸â€Ã©â‚¬Å¡Ã¥Â¸Â¸Ã¦â€ºÂ´Ã¥Â¿Â« |
| Ã¥Â¯Â¹ Result Ã¤Â½Â¿Ã§â€Â¨ `#[must_use]` | Ã§Â¡Â®Ã¤Â¿ÂÃ¨Â°Æ’Ã§â€Â¨Ã¨â‚¬â€¦Ã¥Â¤â€žÃ§Ââ€ Ã¨Â¿â€Ã¥â€ºÅ¾Ã¥â‚¬Â¼ |
| Ã¤Â½Â¿Ã§â€Â¨ `Cow` Ã¥Â®Å¾Ã§Å½Â°Ã§ÂÂµÃ¦Â´Â»Ã§Å¡â€žÃ¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’ | Ã¥Â½â€œÃ¥â‚¬Å¸Ã§â€Â¨Ã¨Â¶Â³Ã¥Â¤Å¸Ã¦â€”Â¶Ã©ÂÂ¿Ã¥â€¦ÂÃ¥Ë†â€ Ã©â€¦Â |
| Ã§Â©Â·Ã¥Â°Â½Ã¥Å’Â¹Ã©â€¦Â | Ã¤Â¸Å¡Ã¥Å Â¡Ã¥â€¦Â³Ã©â€Â®Ã¦Å¾Å¡Ã¤Â¸Â¾Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨Ã©â‚¬Å¡Ã©â€¦ÂÃ§Â¬Â¦ `_` |
| Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“ `pub` Ã¦Å½Â¥Ã¥ÂÂ£ | Ã¥â€ â€¦Ã©Æ’Â¨ API Ã¤Â½Â¿Ã§â€Â¨ `pub(crate)` |

## Ã¥Âºâ€Ã©ÂÂ¿Ã¥â€¦ÂÃ§Å¡â€žÃ¥ÂÂÃ¦Â¨Â¡Ã¥Â¼Â

```rust
// Bad: .unwrap() in production code
let value = map.get("key").unwrap();

// Bad: .clone() to satisfy borrow checker without understanding why
let data = expensive_data.clone();
process(&original, &data);

// Bad: Using String when &str suffices
fn greet(name: String) { /* should be &str */ }

// Bad: Box<dyn Error> in libraries (use thiserror instead)
fn parse(input: &str) -> Result<Data, Box<dyn std::error::Error>> { todo!() }

// Bad: Ignoring must_use warnings
let _ = validate(input); // Silently discarding a Result

// Bad: Blocking in async context
async fn bad_async() {
    std::thread::sleep(Duration::from_secs(1)); // Blocks the executor!
    // Use: tokio::time::sleep(Duration::from_secs(1)).await;
}
```

**Ã¨Â¯Â·Ã¨Â®Â°Ã¤Â½Â**Ã¯Â¼Å¡Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â®Æ’Ã¨Æ’Â½Ã§Â¼â€“Ã¨Â¯â€˜Ã¯Â¼Å’Ã©â€šÂ£Ã¥Â®Æ’Ã¥Â¾Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦ËœÂ¯Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€ž Ã¢â‚¬â€Ã¢â‚¬â€ Ã¤Â½â€ Ã¥â€°ÂÃ¦ÂÂÃ¦ËœÂ¯Ã¤Â½Â Ã¨Â¦ÂÃ©ÂÂ¿Ã¥â€¦Â `unwrap()`Ã¯Â¼Å’Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“ `unsafe`Ã¯Â¼Å’Ã¥Â¹Â¶Ã¨Â®Â©Ã§Â±Â»Ã¥Å¾â€¹Ã§Â³Â»Ã§Â»Å¸Ã¤Â¸ÂºÃ¤Â½Â Ã¥Â·Â¥Ã¤Â½Å“Ã£â‚¬â€š
