---
name: rust-testing
description: Rust testing patterns including unit tests, integration tests, async testing, property-based testing, mocking, and coverage. Follows TDD methodology.
origin: ECC
---

# Rust Test Desenleri

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


TDD metodolojisini takip ederek güvenilir, bakım yapılabilir testler yazmak için kapsamlı Rust test desenleri.

## Ne Zaman Kullanılır

- Yeni Rust fonksiyonları, metotları veya trait'leri yazma
- Mevcut koda test kapsamı ekleme
- Performans-kritik kod için benchmark'lar oluşturma
- Girdi doğrulama için property-based testler uygulama
- Rust projelerinde TDD iş akışını takip etme

## Nasıl Çalışır

1. **Hedef kodu tanımla** — Test edilecek fonksiyon, trait veya modülü bul
2. **Bir test yaz** — `#[cfg(test)]` modülünde `#[test]` kullan, parametreli testler için rstest veya property-based testler için proptest
3. **Bağımlılıkları mock'la** — Test altındaki birimi izole etmek için mockall kullan
4. **Testleri çalıştır (RED)** — Testin beklenen hata ile başarısız olduğunu doğrula
5. **Uygula (GREEN)** — Geçmek için minimal kod yaz
6. **Refactor** — Testleri yeşil tutarken iyileştir
7. **Kapsamı kontrol et** — cargo-llvm-cov kullan, 80%+ hedefle

## Rust için TDD İş Akışı

### RED-GREEN-REFACTOR Döngüsü

```
RED     → Önce başarısız bir test yaz
GREEN   → Testi geçmek için minimal kod yaz
REFACTOR → Testleri yeşil tutarken kodu iyileştir
REPEAT  → Bir sonraki gereksinimle devam et
```

### Rust'ta Adım-Adım TDD

```rust
// RED: Önce testi yaz, yer tutucu olarak todo!() kullan
pub fn add(a: i32, b: i32) -> i32 { todo!() }

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_add() { assert_eq!(add(2, 3), 5); }
}
// cargo test → 'not yet implemented'da panic
```

```rust
// GREEN: todo!()'yu minimal implementasyonla değiştir
pub fn add(a: i32, b: i32) -> i32 { a + b }
// cargo test → GEÇTİ, sonra testleri yeşil tutarken REFACTOR
```

## Unit Testler

### Modül Seviyesi Test Organizasyonu

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

### Assertion Makroları

```rust
assert_eq!(2 + 2, 4);                                    // Eşitlik
assert_ne!(2 + 2, 5);                                    // Eşitsizlik
assert!(vec![1, 2, 3].contains(&2));                     // Boolean
assert_eq!(value, 42, "expected 42 but got {value}");    // Özel mesaj
assert!((0.1_f64 + 0.2 - 0.3).abs() < f64::EPSILON);   // Float karşılaştırma
```

## Hata ve Panic Testi

### `Result` Dönüşlerini Test Etme

```rust
#[test]
fn parse_returns_error_for_invalid_input() {
    let result = parse_config("}{invalid");
    assert!(result.is_err());

    // Spesifik hata varyantını doğrula
    let err = result.unwrap_err();
    assert!(matches!(err, ConfigError::ParseError(_)));
}

#[test]
fn parse_succeeds_for_valid_input() -> Result<(), Box<dyn std::error::Error>> {
    let config = parse_config(r#"{"port": 8080}"#)?;
    assert_eq!(config.port, 8080);
    Ok(()) // Herhangi bir ? Err döndürürse test başarısız olur
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

### Dosya Yapısı

```text
my_crate/
├── src/
│   └── lib.rs
├── tests/              # Entegrasyon testleri
│   ├── api_test.rs     # Her dosya ayrı bir test binary'si
│   ├── db_test.rs
│   └── common/         # Paylaşılan test yardımcıları
│       └── mod.rs
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

### Test Yardımcıları

```rust
#[cfg(test)]
mod tests {
    use super::*;

    /// Mantıklı varsayılanlarla test kullanıcısı oluşturur.
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

### Özel Stratejiler

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

### Trait-Tabanlı Mock'lama

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

### Çalıştırılabilir Dokümantasyon

```rust
/// İki sayıyı toplar.
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
/// Girdi geçerli TOML değilse `Err` döner.
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

## Test Kapsamı

### Kapsamı Çalıştırma

```bash
# Kurulum: cargo install cargo-llvm-cov (veya CI'da taiki-e/install-action kullan)
cargo llvm-cov                    # Özet
cargo llvm-cov --html             # HTML raporu
cargo llvm-cov --lcov > lcov.info # CI için LCOV formatı
cargo llvm-cov --fail-under-lines 80  # Eşiğin altındaysa başarısız yap
```

### Kapsam Hedefleri

| Kod Tipi | Hedef |
|----------|-------|
| Kritik iş mantığı | 100% |
| Public API | 90%+ |
| Genel kod | 80%+ |
| Oluşturulmuş / FFI binding'leri | Hariç tut |

## Test Komutları

```bash
cargo test                        # Tüm testleri çalıştır
cargo test -- --nocapture         # println çıktısını göster
cargo test test_name              # Desene uyan testleri çalıştır
cargo test --lib                  # Sadece unit testler
cargo test --test api_test        # Sadece entegrasyon testleri
cargo test --doc                  # Sadece doc testleri
cargo test --no-fail-fast         # İlk başarısızlıkta durma
cargo test -- --ignored           # Yok sayılan testleri çalıştır
```

## En İyi Uygulamalar

**YAPIN:**
- ÖNCE testleri yazın (TDD)
- Unit testler için `#[cfg(test)]` modülleri kullanın
- Implementasyon değil, davranışı test edin
- Senaryoyu açıklayan açıklayıcı test isimleri kullanın
- Daha iyi hata mesajları için `assert!` yerine `assert_eq!` tercih edin
- Daha temiz hata çıktısı için `Result` döndüren testlerde `?` kullanın
- Testleri bağımsız tutun — paylaşılan mutable state yok

**YAPMAYIN:**
- `Result::is_err()` test edebiliyorsanız `#[should_panic]` kullanmayın
- Her şeyi mock'lamayın — mümkün olduğunda entegrasyon testlerini tercih edin
- Kararsız testleri yok saymayın — düzeltin veya karantinaya alın
- Testlerde `sleep()` kullanmayın — channel'lar, barrier'lar veya `tokio::time::pause()` kullanın
- Hata yolu testini atlamayın

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

**Unutmayın**: Testler dokümantasyondur. Kodunuzun nasıl kullanılması gerektiğini gösterirler. Onları net yazın ve güncel tutun.
