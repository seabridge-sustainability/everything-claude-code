---
description: Ã¤Â¸ÂºRustÃ¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’TDDÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ£â‚¬â€šÃ¥â€¦Ë†Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¥Â®Å¾Ã§Å½Â°Ã£â‚¬â€šÃ¤Â½Â¿Ã§â€Â¨cargo-llvm-covÃ©ÂªÅ’Ã¨Â¯Â80%Ã¤Â»Â¥Ã¤Â¸Å Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã£â‚¬â€š
---

# Rust TDD Ã¥â€˜Â½Ã¤Â»Â¤

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


Ã¨Â¯Â¥Ã¥â€˜Â½Ã¤Â»Â¤Ã¤Â½Â¿Ã§â€Â¨ `#[test]`Ã£â‚¬ÂrstestÃ£â‚¬Âproptest Ã¥â€™Å’ mockall Ã¦ÂÂ¥Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’ Rust Ã¤Â»Â£Ã§Â ÂÃ§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦â€“Â¹Ã¦Â³â€¢Ã£â‚¬â€š

## Ã¨Â¯Â¥Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã¥Â®Å¡Ã¤Â¹â€°Ã§Â±Â»Ã¥Å¾â€¹/Ã§â€°Â¹Ã¥Â¾Â**Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ `todo!()` Ã¦ÂÂ­Ã¥Â»ÂºÃ¥â€¡Â½Ã¦â€¢Â°Ã§Â­Â¾Ã¥ÂÂ
2. **Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Å¡Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Ââ€”Ã¯Â¼Ë†REDÃ¯Â¼â€°
3. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Å¡Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€ºÂ Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€žÃ¥Å½Å¸Ã¥â€ºÂ Ã¨â‚¬Å’Ã¥Â¤Â±Ã¨Â´Â¥
4. **Ã¥Â®Å¾Ã§Å½Â°Ã¤Â»Â£Ã§Â Â**Ã¯Â¼Å¡Ã§Â¼â€“Ã¥â€ â„¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€°â‚¬Ã©Å“â‚¬Ã§Å¡â€žÃ¦Å“â‚¬Ã¥Â°â€˜Ã¤Â»Â£Ã§Â ÂÃ¯Â¼Ë†GREENÃ¯Â¼â€°
5. **Ã©â€¡ÂÃ¦Å¾â€ž**Ã¯Â¼Å¡Ã¥Å“Â¨Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã§Å¡â€žÃ¥â€°ÂÃ¦ÂÂÃ¤Â¸â€¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦â€Â¹Ã¨Â¿â€º
6. **Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡**Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ cargo-llvm-cov Ã§Â¡Â®Ã¤Â¿Â 80%+ Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â½Â¿Ã§â€Â¨ `/rust-test`Ã¯Â¼Å¡

* Ã¥Â®Å¾Ã§Å½Â°Ã¦â€“Â°Ã§Å¡â€ž Rust Ã¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬ÂÃ¦â€“Â¹Ã¦Â³â€¢Ã¦Ë†â€“Ã§â€°Â¹Ã¥Â¾ÂÃ¦â€”Â¶
* Ã¤Â¸ÂºÃ§Å½Â°Ã¦Å“â€° Rust Ã¤Â»Â£Ã§Â ÂÃ¦Â·Â»Ã¥Å Â Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã¦â€”Â¶
* Ã¤Â¿Â®Ã¥Â¤ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¦â€”Â¶Ã¯Â¼Ë†Ã©Â¦â€“Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°
* Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â€¦Â³Ã©â€Â®Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¦â€”Â¶
* Ã¥Â­Â¦Ã¤Â¹Â  Rust Ã¤Â¸Â­Ã§Å¡â€ž TDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¦â€”Â¶

## TDD Ã¥Â¾ÂªÃ§Å½Â¯

```
RED     -> Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢
GREEN   -> Ã¥Â®Å¾Ã§Å½Â°Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¤Â»Â£Ã§Â ÂÃ¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢
REFACTOR -> Ã¦â€Â¹Ã¨Â¿â€ºÃ¤Â»Â£Ã§Â ÂÃ¯Â¼Å’Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
REPEAT  -> Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§â€Â¨Ã¤Â¾â€¹
```

## Ã§Â¤ÂºÃ¤Â¾â€¹Ã¤Â¼Å¡Ã¨Â¯Â

````text
User: /rust-test I need a function to validate user registration

Agent:
# TDD Session: Registration Validator

## Step 1: Define Interface

```rust
// src/validator.rs
pub struct RegistrationRequest {
    pub name: String,
    pub email: String,
    pub password: String,
}

pub enum ValidationResult {
    Valid,
    Invalid(Vec<String>),
}

pub fn validate_registration(request: &RegistrationRequest) -> ValidationResult {
    todo!()
}
```

## Step 2: Write Tests (RED)

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn valid_registration_returns_valid() {
        let request = RegistrationRequest {
            name: "Alice".into(),
            email: "alice@example.com".into(),
            password: "SecureP@ss1".into(),
        };
        assert!(matches!(validate_registration(&request), ValidationResult::Valid));
    }

    #[test]
    fn blank_name_returns_invalid() {
        let request = RegistrationRequest {
            name: "".into(),
            email: "alice@example.com".into(),
            password: "SecureP@ss1".into(),
        };
        match validate_registration(&request) {
            ValidationResult::Invalid(errors) => {
                assert!(errors.contains(&"Name is required".to_string()));
            }
            ValidationResult::Valid => panic!("expected Invalid"),
        }
    }

    #[test]
    fn invalid_email_returns_invalid() {
        let request = RegistrationRequest {
            name: "Alice".into(),
            email: "not-an-email".into(),
            password: "SecureP@ss1".into(),
        };
        assert!(matches!(
            validate_registration(&request),
            ValidationResult::Invalid(_)
        ));
    }

    #[test]
    fn short_password_returns_invalid() {
        let request = RegistrationRequest {
            name: "Alice".into(),
            email: "alice@example.com".into(),
            password: "short".into(),
        };
        assert!(matches!(
            validate_registration(&request),
            ValidationResult::Invalid(_)
        ));
    }
}
```

## Step 3: Run Tests Ã¢â‚¬â€ Verify FAIL

```bash
$ cargo test
running 4 tests
test tests::valid_registration_returns_valid ... FAILED (not yet implemented)
test tests::blank_name_returns_invalid ... FAILED
test tests::invalid_email_returns_invalid ... FAILED
test tests::short_password_returns_invalid ... FAILED
```

Tests fail as expected (todo! panic).

## Step 4: Implement Minimal Code (GREEN)

```rust
pub fn validate_registration(request: &RegistrationRequest) -> ValidationResult {
    let mut errors = Vec::new();

    if request.name.trim().is_empty() {
        errors.push("Name is required".into());
    }
    if !request.email.contains('@') {
        errors.push("Invalid email format".into());
    }
    if request.password.len() < 8 {
        errors.push("Password must be at least 8 characters".into());
    }

    if errors.is_empty() {
        ValidationResult::Valid
    } else {
        ValidationResult::Invalid(errors)
    }
}
```

## Step 5: Run Tests Ã¢â‚¬â€ Verify PASS

```bash
$ cargo test
running 4 tests
test tests::valid_registration_returns_valid ... ok
test tests::blank_name_returns_invalid ... ok
test tests::invalid_email_returns_invalid ... ok
test tests::short_password_returns_invalid ... ok

test result: ok. 4 passed; 0 failed
```

All tests passing!

## Step 6: Check Coverage

```bash
$ cargo llvm-cov
Coverage: 100.0% of lines
```

Coverage: 100%

## TDD Complete!
````

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn adds_two_numbers() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    fn handles_error() -> Result<(), Box<dyn std::error::Error>> {
        let result = parse_config(r#"port = 8080"#)?;
        assert_eq!(result.port, 8080);
        Ok(())
    }
}
```

### Ã¤Â½Â¿Ã§â€Â¨ rstest Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Âµâ€¹Ã¨Â¯â€¢

```rust
use rstest::{rstest, fixture};

#[rstest]
#[case("hello", 5)]
#[case("", 0)]
#[case("rust", 4)]
fn test_string_length(#[case] input: &str, #[case] expected: usize) {
    assert_eq!(input.len(), expected);
}
```

### Ã¥Â¼â€šÃ¦Â­Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢

```rust
#[tokio::test]
async fn fetches_data_successfully() {
    let client = TestClient::new().await;
    let result = client.get("/data").await;
    assert!(result.is_ok());
}
```

### Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢

```rust
use proptest::prelude::*;

proptest! {
    #[test]
    fn encode_decode_roundtrip(input in ".*") {
        let encoded = encode(&input);
        let decoded = decode(&encoded).unwrap();
        assert_eq!(input, decoded);
    }
}
```

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¥â€˜Â½Ã¤Â»Â¤

```bash
# Summary report
cargo llvm-cov

# HTML report
cargo llvm-cov --html

# Fail if below threshold
cargo llvm-cov --fail-under-lines 80

# Run specific test
cargo test test_name

# Run with output
cargo test -- --nocapture

# Run without stopping on first failure
cargo test --no-fail-fast
```

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§â€ºÂ®Ã¦Â â€¡

| Ã¤Â»Â£Ã§Â ÂÃ§Â±Â»Ã¥Å¾â€¹ | Ã§â€ºÂ®Ã¦Â â€¡ |
|-----------|--------|
| Ã¥â€¦Â³Ã©â€Â®Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜ | 100% |
| Ã¥â€¦Â¬Ã¥â€¦Â± API | 90%+ |
| Ã©â‚¬Å¡Ã§â€Â¨Ã¤Â»Â£Ã§Â Â | 80%+ |
| Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€ž / FFI Ã§Â»â€˜Ã¥Â®Å¡ | Ã¦Å½â€™Ã©â„¢Â¤ |

## TDD Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

**Ã¥Âºâ€Ã¥ÂÅ¡Ã¯Â¼Å¡**

* **Ã©Â¦â€“Ã¥â€¦Ë†**Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã¥Å“Â¨Ã¤Â»Â»Ã¤Â½â€¢Ã¥Â®Å¾Ã§Å½Â°Ã¤Â¹â€¹Ã¥â€°Â
* Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¤Â½Â¿Ã§â€Â¨ `assert_eq!` Ã¨â‚¬Å’Ã©ÂÅ¾ `assert!` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Â¾â€”Ã¦â€ºÂ´Ã¥Â¥Â½Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â¡Ã¦ÂÂ¯
* Ã¥Å“Â¨Ã¨Â¿â€Ã¥â€ºÅ¾ `Result` Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `?` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Â¾â€”Ã¦â€ºÂ´Ã¦Â¸â€¦Ã¦â„¢Â°Ã§Å¡â€žÃ¨Â¾â€œÃ¥â€¡Âº
* Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¡Å’Ã¤Â¸ÂºÃ¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â®Å¾Ã§Å½Â°
* Ã¥Å’â€¦Ã¥ÂÂ«Ã¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Ë†Ã§Â©ÂºÃ¥â‚¬Â¼Ã£â‚¬ÂÃ¨Â¾Â¹Ã§â€¢Å’Ã¥â‚¬Â¼Ã£â‚¬ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¨Â·Â¯Ã¥Â¾â€žÃ¯Â¼â€°

**Ã¤Â¸ÂÃ¥Âºâ€Ã¥ÂÅ¡Ã¯Â¼Å¡**

* Ã¥Å“Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¹â€¹Ã¥â€°ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¥Â®Å¾Ã§Å½Â°
* Ã¨Â·Â³Ã¨Â¿â€¡ RED Ã©ËœÂ¶Ã¦Â®Âµ
* Ã¥Å“Â¨ `Result::is_err()` Ã¥ÂÂ¯Ã§â€Â¨Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ `#[should_panic]`
* Ã¥Å“Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `sleep()` Ã¢â‚¬â€ Ã¥Âºâ€Ã¤Â½Â¿Ã§â€Â¨Ã©â‚¬Å¡Ã©Ââ€œÃ¦Ë†â€“ `tokio::time::pause()`
* Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¤Â¸â‚¬Ã¥Ë†â€¡ Ã¢â‚¬â€ Ã¥Å“Â¨Ã¥ÂÂ¯Ã¨Â¡Å’Ã¦â€”Â¶Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢

## Ã§â€ºÂ¸Ã¥â€¦Â³Ã¥â€˜Â½Ã¤Â»Â¤

* `/rust-build` - Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯
* `/rust-review` - Ã¥Å“Â¨Ã¥Â®Å¾Ã§Å½Â°Ã¥ÂÅ½Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â Â
* `/verify` - Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

## Ã§â€ºÂ¸Ã¥â€¦Â³

* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/rust-testing/`
* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/rust-patterns/`
