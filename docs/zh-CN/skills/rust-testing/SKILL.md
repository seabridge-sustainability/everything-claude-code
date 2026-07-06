---
name: rust-testing
description: RustÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¥Å’â€¦Ã¦â€¹Â¬Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬ÂÃ©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬ÂÃ¥Â¼â€šÃ¦Â­Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬ÂÃ¥Å¸ÂºÃ¤ÂºÅ½Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬ÂÃ¦Â¨Â¡Ã¦â€¹Å¸Ã¥â€™Å’Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã£â‚¬â€šÃ©ÂÂµÃ¥Â¾ÂªTDDÃ¦â€“Â¹Ã¦Â³â€¢Ã¥Â­Â¦Ã£â‚¬â€š
origin: ECC
---

# Rust Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã©ÂÂµÃ¥Â¾Âª TDD Ã¦â€“Â¹Ã¦Â³â€¢Ã¨Â®ÂºÃ§Â¼â€“Ã¥â€ â„¢Ã¥ÂÂ¯Ã©ÂÂ Ã£â‚¬ÂÃ¥ÂÂ¯Ã§Â»Â´Ã¦Å Â¤Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¥â€¦Â¨Ã©ÂÂ¢ Rust Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

* Ã§Â¼â€“Ã¥â€ â„¢Ã¦â€“Â°Ã§Å¡â€ž Rust Ã¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬ÂÃ¦â€“Â¹Ã¦Â³â€¢Ã¦Ë†â€“Ã§â€°Â¹Ã¥Â¾Â
* Ã¤Â¸ÂºÃ§Å½Â°Ã¦Å“â€°Ã¤Â»Â£Ã§Â ÂÃ¦Â·Â»Ã¥Å Â Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡
* Ã¤Â¸ÂºÃ¦â‚¬Â§Ã¨Æ’Â½Ã¥â€¦Â³Ã©â€Â®Ã¤Â»Â£Ã§Â ÂÃ¥Ë†â€ºÃ¥Â»ÂºÃ¥Å¸ÂºÃ¥â€¡â€ Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¤Â¸ÂºÃ¨Â¾â€œÃ¥â€¦Â¥Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â®Å¾Ã§Å½Â°Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢
* Ã¥Å“Â¨ Rust Ã©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Â­Ã©ÂÂµÃ¥Â¾Âª TDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

## Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å½Å¸Ã§Ââ€ 

1. **Ã¨Â¯â€ Ã¥Ë†Â«Ã§â€ºÂ®Ã¦Â â€¡Ã¤Â»Â£Ã§Â Â** Ã¢â‚¬â€ Ã¦â€°Â¾Ã¥Ë†Â°Ã¨Â¦ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬ÂÃ§â€°Â¹Ã¥Â¾ÂÃ¦Ë†â€“Ã¦Â¨Â¡Ã¥Ââ€”
2. **Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢** Ã¢â‚¬â€ Ã¥Å“Â¨ `#[cfg(test)]` Ã¦Â¨Â¡Ã¥Ââ€”Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `#[test]`Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ rstest Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã¦Ë†â€“Ã¤Â½Â¿Ã§â€Â¨ proptest Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢
3. **Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹** Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ mockall Ã¦ÂÂ¥Ã©Å¡â€Ã§Â¦Â»Ã¨Â¢Â«Ã¦Âµâ€¹Ã¥Ââ€¢Ã¥â€¦Æ’
4. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢ (RED)** Ã¢â‚¬â€ Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¦Å’â€°Ã©Â¢â€žÃ¦Å“Å¸Ã¥Â¤Â±Ã¨Â´Â¥
5. **Ã¥Â®Å¾Ã§Å½Â° (GREEN)** Ã¢â‚¬â€ Ã§Â¼â€“Ã¥â€ â„¢Ã¦Å“â‚¬Ã¥Â°â€˜Ã¤Â»Â£Ã§Â ÂÃ¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢
6. **Ã©â€¡ÂÃ¦Å¾â€ž** Ã¢â‚¬â€ Ã¦â€Â¹Ã¨Â¿â€ºÃ¤Â»Â£Ã§Â ÂÃ¥ÂÅ’Ã¦â€”Â¶Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
7. **Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡** Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ cargo-llvm-covÃ¯Â¼Å’Ã§â€ºÂ®Ã¦Â â€¡ 80% Ã¤Â»Â¥Ã¤Â¸Å 

## Rust Ã§Å¡â€ž TDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

### RED-GREEN-REFACTOR Ã¥Â¾ÂªÃ§Å½Â¯

```
RED     Ã¢â€ â€™ Ã¥â€¦Ë†Ã¥â€ â„¢Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢
GREEN   Ã¢â€ â€™ Ã§Â¼â€“Ã¥â€ â„¢Ã¦Å“â‚¬Ã¥Â°â€˜Ã¤Â»Â£Ã§Â ÂÃ¤Â½Â¿Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
REFACTOR Ã¢â€ â€™ Ã©â€¡ÂÃ¦Å¾â€žÃ¤Â»Â£Ã§Â ÂÃ¯Â¼Å’Ã¥ÂÅ’Ã¦â€”Â¶Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
REPEAT  Ã¢â€ â€™ Ã§Â»Â§Ã§Â»Â­Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ©Å“â‚¬Ã¦Â±â€š
```

### Rust Ã¤Â¸Â­Ã§Å¡â€žÃ¥Ë†â€ Ã¦Â­Â¥ TDD

```rust
// RED: Write test first, use todo!() as placeholder
pub fn add(a: i32, b: i32) -> i32 { todo!() }

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_add() { assert_eq!(add(2, 3), 5); }
}
// cargo test Ã¢â€ â€™ panics at 'not yet implemented'
```

```rust
// GREEN: Replace todo!() with minimal implementation
pub fn add(a: i32, b: i32) -> i32 { a + b }
// cargo test Ã¢â€ â€™ PASS, then REFACTOR while keeping tests green
```

## Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢

### Ã¦Â¨Â¡Ã¥Ââ€”Ã§ÂºÂ§Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â»â€žÃ§Â»â€¡

```rust
// src/user.rs
pub struct User {
    pub name: String,
    pub email: String,
}

impl User {
    pub fn new(name: impl Into<String>, email: impl Into<String>) -> Result<Self, String> {
        let email = email.into();
        if !email.contains('@') {
            return Err(format!("invalid email: {email}"));
        }
        Ok(Self { name: name.into(), email })
    }

    pub fn display_name(&self) -> &str {
        &self.name
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn creates_user_with_valid_email() {
        let user = User::new("Alice", "alice@example.com").unwrap();
        assert_eq!(user.display_name(), "Alice");
        assert_eq!(user.email, "alice@example.com");
    }

    #[test]
    fn rejects_invalid_email() {
        let result = User::new("Bob", "not-an-email");
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("invalid email"));
    }
}
```

### Ã¦â€“Â­Ã¨Â¨â‚¬Ã¥Â®Â

```rust
assert_eq!(2 + 2, 4);                                    // Equality
assert_ne!(2 + 2, 5);                                    // Inequality
assert!(vec![1, 2, 3].contains(&2));                     // Boolean
assert_eq!(value, 42, "expected 42 but got {value}");    // Custom message
assert!((0.1_f64 + 0.2 - 0.3).abs() < f64::EPSILON);   // Float comparison
```

## Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¸Å½ Panic Ã¦Âµâ€¹Ã¨Â¯â€¢

### Ã¦Âµâ€¹Ã¨Â¯â€¢ `Result` Ã¨Â¿â€Ã¥â€ºÅ¾Ã¥â‚¬Â¼

```rust
#[test]
fn parse_returns_error_for_invalid_input() {
    let result = parse_config("}{invalid");
    assert!(result.is_err());

    // Assert specific error variant
    let err = result.unwrap_err();
    assert!(matches!(err, ConfigError::ParseError(_)));
}

#[test]
fn parse_succeeds_for_valid_input() -> Result<(), Box<dyn std::error::Error>> {
    let config = parse_config(r#"{"port": 8080}"#)?;
    assert_eq!(config.port, 8080);
    Ok(()) // Test fails if any ? returns Err
}
```

### Ã¦Âµâ€¹Ã¨Â¯â€¢ Panic

```rust
#[test]
#[should_panic]
fn panics_on_empty_input() {
    process(&[]);
}

#[test]
#[should_panic(expected = "index out of bounds")]
fn panics_with_specific_message() {
    let v: Vec<i32> = vec![];
    let _ = v[0];
}
```

## Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢

### Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â»â€œÃ¦Å¾â€ž

```text
my_crate/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ src/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ lib.rs
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ tests/              # Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ api_test.rs     # Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶Ã©Æ’Â½Ã¦ËœÂ¯Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ§â€¹Â¬Ã§Â«â€¹Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¤ÂºÅ’Ã¨Â¿â€ºÃ¥Ë†Â¶Ã¦â€“â€¡Ã¤Â»Â¶
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ db_test.rs
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ common/         # Ã¥â€¦Â±Ã¤ÂºÂ«Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â·Â¥Ã¥â€¦Â·
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs
```

### Ã§Â¼â€“Ã¥â€ â„¢Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢

```rust
// tests/api_test.rs
use my_crate::{App, Config};

#[test]
fn full_request_lifecycle() {
    let config = Config::test_default();
    let app = App::new(config);

    let response = app.handle_request("/health");
    assert_eq!(response.status, 200);
    assert_eq!(response.body, "OK");
}
```

## Ã¥Â¼â€šÃ¦Â­Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢

### Ã¤Â½Â¿Ã§â€Â¨ Tokio

```rust
#[tokio::test]
async fn fetches_data_successfully() {
    let client = TestClient::new().await;
    let result = client.get("/data").await;
    assert!(result.is_ok());
    assert_eq!(result.unwrap().items.len(), 3);
}

#[tokio::test]
async fn handles_timeout() {
    use std::time::Duration;
    let result = tokio::time::timeout(
        Duration::from_millis(100),
        slow_operation(),
    ).await;

    assert!(result.is_err(), "should have timed out");
}
```

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â»â€žÃ§Â»â€¡Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¤Â½Â¿Ã§â€Â¨ `rstest` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Âµâ€¹Ã¨Â¯â€¢

```rust
use rstest::{rstest, fixture};

#[rstest]
#[case("hello", 5)]
#[case("", 0)]
#[case("rust", 4)]
fn test_string_length(#[case] input: &str, #[case] expected: usize) {
    assert_eq!(input.len(), expected);
}

// Fixtures
#[fixture]
fn test_db() -> TestDb {
    TestDb::new_in_memory()
}

#[rstest]
fn test_insert(test_db: TestDb) {
    test_db.insert("key", "value");
    assert_eq!(test_db.get("key"), Some("value".into()));
}
```

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¾â€¦Ã¥Å Â©Ã¥â€¡Â½Ã¦â€¢Â°

```rust
#[cfg(test)]
mod tests {
    use super::*;

    /// Creates a test user with sensible defaults.
    fn make_user(name: &str) -> User {
        User::new(name, &format!("{name}@test.com")).unwrap()
    }

    #[test]
    fn user_display() {
        let user = make_user("alice");
        assert_eq!(user.display_name(), "alice");
    }
}
```

## Ã¤Â½Â¿Ã§â€Â¨ `proptest` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã¥Â±Å¾Ã¦â‚¬Â§Ã¦Âµâ€¹Ã¨Â¯â€¢

```rust
use proptest::prelude::*;

proptest! {
    #[test]
    fn encode_decode_roundtrip(input in ".*") {
        let encoded = encode(&input);
        let decoded = decode(&encoded).unwrap();
        assert_eq!(input, decoded);
    }

    #[test]
    fn sort_preserves_length(mut vec in prop::collection::vec(any::<i32>(), 0..100)) {
        let original_len = vec.len();
        vec.sort();
        assert_eq!(vec.len(), original_len);
    }

    #[test]
    fn sort_produces_ordered_output(mut vec in prop::collection::vec(any::<i32>(), 0..100)) {
        vec.sort();
        for window in vec.windows(2) {
            assert!(window[0] <= window[1]);
        }
    }
}
```

### Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã§Â­â€“Ã§â€¢Â¥

```rust
use proptest::prelude::*;

fn valid_email() -> impl Strategy<Value = String> {
    ("[a-z]{1,10}", "[a-z]{1,5}")
        .prop_map(|(user, domain)| format!("{user}@{domain}.com"))
}

proptest! {
    #[test]
    fn accepts_valid_emails(email in valid_email()) {
        assert!(User::new("Test", &email).is_ok());
    }
}
```

## Ã¤Â½Â¿Ã§â€Â¨ `mockall` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â¨Â¡Ã¦â€¹Å¸

### Ã¥Å¸ÂºÃ¤ÂºÅ½Ã§â€°Â¹Ã¥Â¾ÂÃ§Å¡â€žÃ¦Â¨Â¡Ã¦â€¹Å¸

```rust
use mockall::{automock, predicate::eq};

#[automock]
trait UserRepository {
    fn find_by_id(&self, id: u64) -> Option<User>;
    fn save(&self, user: &User) -> Result<(), StorageError>;
}

#[test]
fn service_returns_user_when_found() {
    let mut mock = MockUserRepository::new();
    mock.expect_find_by_id()
        .with(eq(42))
        .times(1)
        .returning(|_| Some(User { id: 42, name: "Alice".into() }));

    let service = UserService::new(Box::new(mock));
    let user = service.get_user(42).unwrap();
    assert_eq!(user.name, "Alice");
}

#[test]
fn service_returns_none_when_not_found() {
    let mut mock = MockUserRepository::new();
    mock.expect_find_by_id()
        .returning(|_| None);

    let service = UserService::new(Box::new(mock));
    assert!(service.get_user(99).is_none());
}
```

## Ã¦â€“â€¡Ã¦Â¡Â£Ã¦Âµâ€¹Ã¨Â¯â€¢

### Ã¥ÂÂ¯Ã¦â€°Â§Ã¨Â¡Å’Ã§Å¡â€žÃ¦â€“â€¡Ã¦Â¡Â£

````rust
/// Adds two numbers together.
///
/// # Examples
///
/// ```
/// use my_crate::add;
///
/// assert_eq!(add(2, 3), 5);
/// assert_eq!(add(-1, 1), 0);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

/// Parses a config string.
///
/// # Errors
///
/// Returns `Err` if the input is not valid TOML.
///
/// ```no_run
/// use my_crate::parse_config;
///
/// let config = parse_config(r#"port = 8080"#).unwrap();
/// assert_eq!(config.port, 8080);
/// ```
///
/// ```no_run
/// use my_crate::parse_config;
///
/// assert!(parse_config("}{invalid").is_err());
/// ```
pub fn parse_config(input: &str) -> Result<Config, ParseError> {
    todo!()
}
````

## Ã¤Â½Â¿Ã§â€Â¨ Criterion Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Å¸ÂºÃ¥â€¡â€ Ã¦Âµâ€¹Ã¨Â¯â€¢

```toml
# Cargo.toml
[dev-dependencies]
criterion = { version = "0.5", features = ["html_reports"] }

[[bench]]
name = "benchmark"
harness = false
```

```rust
// benches/benchmark.rs
use criterion::{black_box, criterion_group, criterion_main, Criterion};

fn fibonacci(n: u64) -> u64 {
    match n {
        0 | 1 => n,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn bench_fibonacci(c: &mut Criterion) {
    c.bench_function("fib 20", |b| b.iter(|| fibonacci(black_box(20))));
}

criterion_group!(benches, bench_fibonacci);
criterion_main!(benches);
```

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

### Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

```bash
# Install: cargo install cargo-llvm-cov (or use taiki-e/install-action in CI)
cargo llvm-cov                    # Summary
cargo llvm-cov --html             # HTML report
cargo llvm-cov --lcov > lcov.info # LCOV format for CI
cargo llvm-cov --fail-under-lines 80  # Fail if below threshold
```

### Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§â€ºÂ®Ã¦Â â€¡

| Ã¤Â»Â£Ã§Â ÂÃ§Â±Â»Ã¥Å¾â€¹ | Ã§â€ºÂ®Ã¦Â â€¡ |
|-----------|--------|
| Ã¥â€¦Â³Ã©â€Â®Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜ | 100% |
| Ã¥â€¦Â¬Ã¥â€¦Â± API | 90%+ |
| Ã©â‚¬Å¡Ã§â€Â¨Ã¤Â»Â£Ã§Â Â | 80%+ |
| Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€ž / FFI Ã§Â»â€˜Ã¥Â®Å¡ | Ã¦Å½â€™Ã©â„¢Â¤ |

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€˜Â½Ã¤Â»Â¤

```bash
cargo test                        # Run all tests
cargo test -- --nocapture         # Show println output
cargo test test_name              # Run tests matching pattern
cargo test --lib                  # Unit tests only
cargo test --test api_test        # Integration tests only
cargo test --doc                  # Doc tests only
cargo test --no-fail-fast         # Don't stop on first failure
cargo test -- --ignored           # Run ignored tests
```

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

**Ã¥Âºâ€Ã¨Â¯Â¥Ã¥ÂÅ¡Ã¯Â¼Å¡**

* Ã¥â€¦Ë†Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢ (TDD)
* Ã¤Â½Â¿Ã§â€Â¨ `#[cfg(test)]` Ã¦Â¨Â¡Ã¥Ââ€”Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¡Å’Ã¤Â¸ÂºÃ¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â®Å¾Ã§Å½Â°
* Ã¤Â½Â¿Ã§â€Â¨Ã¦ÂÂÃ¨Â¿Â°Ã¦â‚¬Â§Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥ÂÂÃ§Â§Â°Ã¦ÂÂ¥Ã¨Â§Â£Ã©â€¡Å Ã¥Å“ÂºÃ¦â„¢Â¯
* Ã¤Â¸ÂºÃ¤Âºâ€ Ã¦â€ºÂ´Ã¥Â¥Â½Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â¡Ã¦ÂÂ¯Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `assert_eq!` Ã¨â‚¬Å’Ã©ÂÅ¾ `assert!`
* Ã¥Å“Â¨Ã¨Â¿â€Ã¥â€ºÅ¾ `Result` Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `?` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Â¾â€”Ã¦â€ºÂ´Ã¦Â¸â€¦Ã¦â„¢Â°Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¨Â¾â€œÃ¥â€¡Âº
* Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§â€¹Â¬Ã§Â«â€¹ Ã¢â‚¬â€ Ã¦Â²Â¡Ã¦Å“â€°Ã¥â€¦Â±Ã¤ÂºÂ«Ã§Å¡â€žÃ¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬Â

**Ã¤Â¸ÂÃ¥Âºâ€Ã¨Â¯Â¥Ã¥ÂÅ¡Ã¯Â¼Å¡**

* Ã¥Å“Â¨Ã¥ÂÂ¯Ã¤Â»Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢ `Result::is_err()` Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ `#[should_panic]`
* Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¦â€°â‚¬Ã¦Å“â€°Ã¥â€ â€¦Ã¥Â®Â¹ Ã¢â‚¬â€ Ã¥Å“Â¨Ã¥ÂÂ¯Ã¨Â¡Å’Ã¦â€”Â¶Ã¤Â¼ËœÃ¥â€¦Ë†Ã¨â‚¬Æ’Ã¨â„¢â€˜Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢
* Ã¥Â¿Â½Ã§â€¢Â¥Ã¤Â¸ÂÃ§Â¨Â³Ã¥Â®Å¡Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢ Ã¢â‚¬â€ Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Ë†â€“Ã©Å¡â€Ã§Â¦Â»Ã¥Â®Æ’Ã¤Â»Â¬
* Ã¥Å“Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `sleep()` Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨Ã©â‚¬Å¡Ã©Ââ€œÃ£â‚¬ÂÃ¥Â±ÂÃ©Å¡Å“Ã¦Ë†â€“ `tokio::time::pause()`
* Ã¨Â·Â³Ã¨Â¿â€¡Ã©â€â„¢Ã¨Â¯Â¯Ã¨Â·Â¯Ã¥Â¾â€žÃ¦Âµâ€¹Ã¨Â¯â€¢

## CI Ã©â€ºâ€ Ã¦Ë†Â

```yaml
# GitHub Actions
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: dtolnay/rust-toolchain@stable
      with:
        components: clippy, rustfmt

    - name: Check formatting
      run: cargo fmt --check

    - name: Clippy
      run: cargo clippy -- -D warnings

    - name: Run tests
      run: cargo test

    - uses: taiki-e/install-action@cargo-llvm-cov

    - name: Coverage
      run: cargo llvm-cov --fail-under-lines 80
```

**Ã¨Â®Â°Ã¤Â½Â**Ã¯Â¼Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â°Â±Ã¦ËœÂ¯Ã¦â€“â€¡Ã¦Â¡Â£Ã£â‚¬â€šÃ¥Â®Æ’Ã¤Â»Â¬Ã¥Â±â€¢Ã§Â¤ÂºÃ¤Âºâ€ Ã¤Â½Â Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¥Âºâ€Ã¥Â¦â€šÃ¤Â½â€¢Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬â€šÃ¦Â¸â€¦Ã¦â„¢Â°Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¹Â¶Ã¤Â¿ÂÃ¦Å’ÂÃ¦â€ºÂ´Ã¦â€“Â°Ã£â‚¬â€š
