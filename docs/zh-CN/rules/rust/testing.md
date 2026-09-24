---
paths:
  - "**/*.rs"
---

# Rust Ã¦Âµâ€¹Ã¨Â¯â€¢

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¤Â»Â¶Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  [common/testing.md](../common/testing.md) Ã¤Â¸Â­Ã¥â€¦Â³Ã¤ÂºÅ½ Rust Ã§Å¡â€žÃ§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¡â€ Ã¦Å¾Â¶

* **`#[test]`** Ã©â€¦ÂÃ¥ÂË† `#[cfg(test)]` Ã¦Â¨Â¡Ã¥Ââ€”Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢
* **rstest** Ã§â€Â¨Ã¤ÂºÅ½Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€™Å’Ã¥Â¤Â¹Ã¥â€¦Â·
* **proptest** Ã§â€Â¨Ã¤ÂºÅ½Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢
* **mockall** Ã§â€Â¨Ã¤ÂºÅ½Ã¥Å¸ÂºÃ¤ÂºÅ½Ã§â€°Â¹Ã¥Â¾ÂÃ§Å¡â€žÃ¦Â¨Â¡Ã¦â€¹Å¸
* **`#[tokio::test]`** Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¼â€šÃ¦Â­Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â»â€žÃ§Â»â€¡

```text
my_crate/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ src/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ lib.rs           # Ã¤Â½ÂÃ¤ÂºÅ½ #[cfg(test)] Ã¦Â¨Â¡Ã¥Ââ€”Ã¤Â¸Â­Ã§Å¡â€žÃ¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ auth/
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs       # #[cfg(test)] mod tests { ... }
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ orders/
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ service.rs   # #[cfg(test)] mod tests { ... }
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ tests/               # Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶ = Ã§â€¹Â¬Ã§Â«â€¹Ã§Å¡â€žÃ¤ÂºÅ’Ã¨Â¿â€ºÃ¥Ë†Â¶Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼â€°
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ api_test.rs
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ db_test.rs
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ common/          # Ã¥â€¦Â±Ã¤ÂºÂ«Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â·Â¥Ã¥â€¦Â·
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ benches/             # Criterion Ã¥Å¸ÂºÃ¥â€¡â€ Ã¦Âµâ€¹Ã¨Â¯â€¢
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ benchmark.rs
```

Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€Â¾Ã¥Å“Â¨Ã¥ÂÅ’Ã¤Â¸â‚¬Ã¦â€“â€¡Ã¤Â»Â¶Ã§Å¡â€ž `#[cfg(test)]` Ã¦Â¨Â¡Ã¥Ââ€”Ã¥â€ â€¦Ã£â‚¬â€šÃ©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€Â¾Ã¥Å“Â¨ `tests/` Ã§â€ºÂ®Ã¥Â½â€¢Ã¤Â¸Â­Ã£â‚¬â€š

## Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼Â

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn creates_user_with_valid_email() {
        let user = User::new("Alice", "alice@example.com").unwrap();
        assert_eq!(user.name, "Alice");
    }

    #[test]
    fn rejects_invalid_email() {
        let result = User::new("Bob", "not-an-email");
        assert!(result.is_err());
        assert!(result.unwrap_err().to_string().contains("invalid email"));
    }
}
```

## Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Âµâ€¹Ã¨Â¯â€¢

```rust
use rstest::rstest;

#[rstest]
#[case("hello", 5)]
#[case("", 0)]
#[case("rust", 4)]
fn test_string_length(#[case] input: &str, #[case] expected: usize) {
    assert_eq!(input.len(), expected);
}
```

## Ã¥Â¼â€šÃ¦Â­Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢

```rust
#[tokio::test]
async fn fetches_data_successfully() {
    let client = TestClient::new().await;
    let result = client.get("/data").await;
    assert!(result.is_ok());
}
```

## Ã¤Â½Â¿Ã§â€Â¨ mockall Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â¨Â¡Ã¦â€¹Å¸

Ã¥Å“Â¨Ã§â€Å¸Ã¤ÂºÂ§Ã¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¥Â®Å¡Ã¤Â¹â€°Ã§â€°Â¹Ã¥Â¾ÂÃ¯Â¼â€ºÃ¥Å“Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Ââ€”Ã¤Â¸Â­Ã§â€Å¸Ã¦Ë†ÂÃ¦Â¨Â¡Ã¦â€¹Å¸Ã¥Â¯Â¹Ã¨Â±Â¡Ã¯Â¼Å¡

```rust
// Production trait Ã¢â‚¬â€ pub so integration tests can import it
pub trait UserRepository {
    fn find_by_id(&self, id: u64) -> Option<User>;
}

#[cfg(test)]
mod tests {
    use super::*;
    use mockall::predicate::eq;

    mockall::mock! {
        pub Repo {}
        impl UserRepository for Repo {
            fn find_by_id(&self, id: u64) -> Option<User>;
        }
    }

    #[test]
    fn service_returns_user_when_found() {
        let mut mock = MockRepo::new();
        mock.expect_find_by_id()
            .with(eq(42))
            .times(1)
            .returning(|_| Some(User { id: 42, name: "Alice".into() }));

        let service = UserService::new(Box::new(mock));
        let user = service.get_user(42).unwrap();
        assert_eq!(user.name, "Alice");
    }
}
```

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€˜Â½Ã¥ÂÂ

Ã¤Â½Â¿Ã§â€Â¨Ã¦ÂÂÃ¨Â¿Â°Ã¦â‚¬Â§Ã§Å¡â€žÃ¥ÂÂÃ§Â§Â°Ã¦ÂÂ¥Ã¨Â§Â£Ã©â€¡Å Ã¥Å“ÂºÃ¦â„¢Â¯Ã¯Â¼Å¡

* `creates_user_with_valid_email()`
* `rejects_order_when_insufficient_stock()`
* `returns_none_when_not_found()`

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

* Ã§â€ºÂ®Ã¦Â â€¡Ã¤Â¸Âº 80%+ Ã§Å¡â€žÃ¨Â¡Å’Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡
* Ã¤Â½Â¿Ã§â€Â¨ **cargo-llvm-cov** Ã§â€Å¸Ã¦Ë†ÂÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¦Å Â¥Ã¥â€˜Å 
* Ã¥â€¦Â³Ã¦Â³Â¨Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜ Ã¢â‚¬â€Ã¢â‚¬â€ Ã¦Å½â€™Ã©â„¢Â¤Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¥â€™Å’ FFI Ã§Â»â€˜Ã¥Â®Å¡

```bash
cargo llvm-cov                       # Summary
cargo llvm-cov --html                # HTML report
cargo llvm-cov --fail-under-lines 80 # Fail if below threshold
```

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€˜Â½Ã¤Â»Â¤

```bash
cargo test                       # Run all tests
cargo test -- --nocapture        # Show println output
cargo test test_name             # Run tests matching pattern
cargo test --lib                 # Unit tests only
cargo test --test api_test       # Specific integration test (tests/api_test.rs)
cargo test --doc                 # Doc tests only
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å“â€°Ã¥â€¦Â³Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Ë†Ã¥Å’â€¦Ã¦â€¹Â¬Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬ÂÃ¥Â¤Â¹Ã¥â€¦Â·Ã¤Â»Â¥Ã¥ÂÅ Ã¤Â½Â¿Ã§â€Â¨ Criterion Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Å¸ÂºÃ¥â€¡â€ Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`rust-testing`Ã£â‚¬â€š
