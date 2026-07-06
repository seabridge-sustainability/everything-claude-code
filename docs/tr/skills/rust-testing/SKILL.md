---
name: rust-testing
description: Rust testing patterns including unit tests, integration tests, async testing, property-based testing, mocking, and coverage. Follows TDD methodology.
origin: ECC
---

# Rust Test Desenleri

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


TDD metodolojisini takip ederek gÃƒÂ¼venilir, bakÃ„Â±m yapÃ„Â±labilir testler yazmak iÃƒÂ§in kapsamlÃ„Â± Rust test desenleri.

## Ne Zaman KullanÃ„Â±lÃ„Â±r

- Yeni Rust fonksiyonlarÃ„Â±, metotlarÃ„Â± veya trait'leri yazma
- Mevcut koda test kapsamÃ„Â± ekleme
- Performans-kritik kod iÃƒÂ§in benchmark'lar oluÃ…Å¸turma
- Girdi doÃ„Å¸rulama iÃƒÂ§in property-based testler uygulama
- Rust projelerinde TDD iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± takip etme

## NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r

1. **Hedef kodu tanÃ„Â±mla** Ã¢â‚¬â€ Test edilecek fonksiyon, trait veya modÃƒÂ¼lÃƒÂ¼ bul
2. **Bir test yaz** Ã¢â‚¬â€ `#[cfg(test)]` modÃƒÂ¼lÃƒÂ¼nde `#[test]` kullan, parametreli testler iÃƒÂ§in rstest veya property-based testler iÃƒÂ§in proptest
3. **BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± mock'la** Ã¢â‚¬â€ Test altÃ„Â±ndaki birimi izole etmek iÃƒÂ§in mockall kullan
4. **Testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r (RED)** Ã¢â‚¬â€ Testin beklenen hata ile baÃ…Å¸arÃ„Â±sÃ„Â±z olduÃ„Å¸unu doÃ„Å¸rula
5. **Uygula (GREEN)** Ã¢â‚¬â€ GeÃƒÂ§mek iÃƒÂ§in minimal kod yaz
6. **Refactor** Ã¢â‚¬â€ Testleri yeÃ…Å¸il tutarken iyileÃ…Å¸tir
7. **KapsamÃ„Â± kontrol et** Ã¢â‚¬â€ cargo-llvm-cov kullan, 80%+ hedefle

## Rust iÃƒÂ§in TDD Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

### RED-GREEN-REFACTOR DÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼

```
RED     Ã¢â€ â€™ Ãƒâ€“nce baÃ…Å¸arÃ„Â±sÃ„Â±z bir test yaz
GREEN   Ã¢â€ â€™ Testi geÃƒÂ§mek iÃƒÂ§in minimal kod yaz
REFACTOR Ã¢â€ â€™ Testleri yeÃ…Å¸il tutarken kodu iyileÃ…Å¸tir
REPEAT  Ã¢â€ â€™ Bir sonraki gereksinimle devam et
```

### Rust'ta AdÃ„Â±m-AdÃ„Â±m TDD

```rust
// RED: Ãƒâ€“nce testi yaz, yer tutucu olarak todo!() kullan
pub fn add(a: i32, b: i32) -> i32 { todo!() }

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_add() { assert_eq!(add(2, 3), 5); }
}
// cargo test Ã¢â€ â€™ 'not yet implemented'da panic
```

```rust
// GREEN: todo!()'yu minimal implementasyonla deÃ„Å¸iÃ…Å¸tir
pub fn add(a: i32, b: i32) -> i32 { a + b }
// cargo test Ã¢â€ â€™ GEÃƒâ€¡TÃ„Â°, sonra testleri yeÃ…Å¸il tutarken REFACTOR
```

## Unit Testler

### ModÃƒÂ¼l Seviyesi Test Organizasyonu

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

### Assertion MakrolarÃ„Â±

```rust
assert_eq!(2 + 2, 4);                                    // EÃ…Å¸itlik
assert_ne!(2 + 2, 5);                                    // EÃ…Å¸itsizlik
assert!(vec![1, 2, 3].contains(&2));                     // Boolean
assert_eq!(value, 42, "expected 42 but got {value}");    // Ãƒâ€“zel mesaj
assert!((0.1_f64 + 0.2 - 0.3).abs() < f64::EPSILON);   // Float karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rma
```

## Hata ve Panic Testi

### `Result` DÃƒÂ¶nÃƒÂ¼Ã…Å¸lerini Test Etme

```rust
#[test]
fn parse_returns_error_for_invalid_input() {
    let result = parse_config("}{invalid");
    assert!(result.is_err());

    // Spesifik hata varyantÃ„Â±nÃ„Â± doÃ„Å¸rula
    let err = result.unwrap_err();
    assert!(matches!(err, ConfigError::ParseError(_)));
}

#[test]
fn parse_succeeds_for_valid_input() -> Result<(), Box<dyn std::error::Error>> {
    let config = parse_config(r#"{"port": 8080}"#)?;
    assert_eq!(config.port, 8080);
    Ok(()) // Herhangi bir ? Err dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼rse test baÃ…Å¸arÃ„Â±sÃ„Â±z olur
}
```

### Panic'leri Test Etme

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

## Entegrasyon Testleri

### Dosya YapÃ„Â±sÃ„Â±

```text
my_crate/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ src/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ lib.rs
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ tests/              # Entegrasyon testleri
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ api_test.rs     # Her dosya ayrÃ„Â± bir test binary'si
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ db_test.rs
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ common/         # PaylaÃ…Å¸Ã„Â±lan test yardÃ„Â±mcÃ„Â±larÃ„Â±
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ mod.rs
```

### Entegrasyon Testleri Yazma

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

## Async Testler

### Tokio ile

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

## Test Organizasyon Desenleri

### `rstest` ile Parametreli Testler

```rust
use rstest::{rstest, fixture};

#[rstest]
#[case("hello", 5)]
#[case("", 0)]
#[case("rust", 4)]
fn test_string_length(#[case] input: &str, #[case] expected: usize) {
    assert_eq!(input.len(), expected);
}

// Fixture'lar
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

### Test YardÃ„Â±mcÃ„Â±larÃ„Â±

```rust
#[cfg(test)]
mod tests {
    use super::*;

    /// MantÃ„Â±klÃ„Â± varsayÃ„Â±lanlarla test kullanÃ„Â±cÃ„Â±sÃ„Â± oluÃ…Å¸turur.
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

## `proptest` ile Property-Based Testing

### Temel Property Testleri

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

### Ãƒâ€“zel Stratejiler

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

## `mockall` ile Mock'lama

### Trait-TabanlÃ„Â± Mock'lama

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

## Doc Testleri

### Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±labilir DokÃƒÂ¼mantasyon

```rust
/// Ã„Â°ki sayÃ„Â±yÃ„Â± toplar.
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

/// Bir config string'i parse eder.
///
/// # Errors
///
/// Girdi geÃƒÂ§erli TOML deÃ„Å¸ilse `Err` dÃƒÂ¶ner.
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
```

## Criterion ile Benchmark'lama

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

## Test KapsamÃ„Â±

### KapsamÃ„Â± Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rma

```bash
# Kurulum: cargo install cargo-llvm-cov (veya CI'da taiki-e/install-action kullan)
cargo llvm-cov                    # Ãƒâ€“zet
cargo llvm-cov --html             # HTML raporu
cargo llvm-cov --lcov > lcov.info # CI iÃƒÂ§in LCOV formatÃ„Â±
cargo llvm-cov --fail-under-lines 80  # EÃ…Å¸iÃ„Å¸in altÃ„Â±ndaysa baÃ…Å¸arÃ„Â±sÃ„Â±z yap
```

### Kapsam Hedefleri

| Kod Tipi | Hedef |
|----------|-------|
| Kritik iÃ…Å¸ mantÃ„Â±Ã„Å¸Ã„Â± | 100% |
| Public API | 90%+ |
| Genel kod | 80%+ |
| OluÃ…Å¸turulmuÃ…Å¸ / FFI binding'leri | HariÃƒÂ§ tut |

## Test KomutlarÃ„Â±

```bash
cargo test                        # TÃƒÂ¼m testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
cargo test -- --nocapture         # println ÃƒÂ§Ã„Â±ktÃ„Â±sÃ„Â±nÃ„Â± gÃƒÂ¶ster
cargo test test_name              # Desene uyan testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
cargo test --lib                  # Sadece unit testler
cargo test --test api_test        # Sadece entegrasyon testleri
cargo test --doc                  # Sadece doc testleri
cargo test --no-fail-fast         # Ã„Â°lk baÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±kta durma
cargo test -- --ignored           # Yok sayÃ„Â±lan testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
```

## En Ã„Â°yi Uygulamalar

**YAPIN:**
- Ãƒâ€“NCE testleri yazÃ„Â±n (TDD)
- Unit testler iÃƒÂ§in `#[cfg(test)]` modÃƒÂ¼lleri kullanÃ„Â±n
- Implementasyon deÃ„Å¸il, davranÃ„Â±Ã…Å¸Ã„Â± test edin
- Senaryoyu aÃƒÂ§Ã„Â±klayan aÃƒÂ§Ã„Â±klayÃ„Â±cÃ„Â± test isimleri kullanÃ„Â±n
- Daha iyi hata mesajlarÃ„Â± iÃƒÂ§in `assert!` yerine `assert_eq!` tercih edin
- Daha temiz hata ÃƒÂ§Ã„Â±ktÃ„Â±sÃ„Â± iÃƒÂ§in `Result` dÃƒÂ¶ndÃƒÂ¼ren testlerde `?` kullanÃ„Â±n
- Testleri baÃ„Å¸Ã„Â±msÃ„Â±z tutun Ã¢â‚¬â€ paylaÃ…Å¸Ã„Â±lan mutable state yok

**YAPMAYIN:**
- `Result::is_err()` test edebiliyorsanÃ„Â±z `#[should_panic]` kullanmayÃ„Â±n
- Her Ã…Å¸eyi mock'lamayÃ„Â±n Ã¢â‚¬â€ mÃƒÂ¼mkÃƒÂ¼n olduÃ„Å¸unda entegrasyon testlerini tercih edin
- KararsÃ„Â±z testleri yok saymayÃ„Â±n Ã¢â‚¬â€ dÃƒÂ¼zeltin veya karantinaya alÃ„Â±n
- Testlerde `sleep()` kullanmayÃ„Â±n Ã¢â‚¬â€ channel'lar, barrier'lar veya `tokio::time::pause()` kullanÃ„Â±n
- Hata yolu testini atlamayÃ„Â±n

## CI Entegrasyonu

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

**UnutmayÃ„Â±n**: Testler dokÃƒÂ¼mantasyondur. Kodunuzun nasÃ„Â±l kullanÃ„Â±lmasÃ„Â± gerektiÃ„Å¸ini gÃƒÂ¶sterirler. OnlarÃ„Â± net yazÃ„Â±n ve gÃƒÂ¼ncel tutun.
