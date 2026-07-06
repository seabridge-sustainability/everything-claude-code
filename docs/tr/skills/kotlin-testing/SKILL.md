---
name: kotlin-testing
description: Kotest, MockK, coroutine testi, property-based testing ve Kover coverage ile Kotlin test kalÃ„Â±plarÃ„Â±. Ã„Â°diomatic Kotlin uygulamalarÃ„Â±yla TDD metodolojisini takip eder.
origin: ECC
---

# Kotlin Test KalÃ„Â±plarÃ„Â±

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


Kotest ve MockK ile TDD metodolojisini takip ederek gÃƒÂ¼venilir, sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lebilir testler yazmak iÃƒÂ§in kapsamlÃ„Â± Kotlin test kalÃ„Â±plarÃ„Â±.

## Ne Zaman KullanÃ„Â±lÃ„Â±r

- Yeni Kotlin fonksiyonlarÃ„Â± veya class'lar yazarken
- Mevcut Kotlin koduna test coverage eklerken
- Property-based testler uygularken
- Kotlin projelerinde TDD iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± takip ederken
- Kod coverage iÃƒÂ§in Kover yapÃ„Â±landÃ„Â±rÃ„Â±rken

## NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r

1. **Hedef kodu belirle** Ã¢â‚¬â€ Test edilecek fonksiyon, class veya modÃƒÂ¼lÃƒÂ¼ bul
2. **Kotest spec yaz** Ã¢â‚¬â€ Test scope'una uygun bir spec stili seÃƒÂ§ (StringSpec, FunSpec, BehaviorSpec)
3. **BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± mock'la** Ã¢â‚¬â€ Test edilen birimi izole etmek iÃƒÂ§in MockK kullan
4. **Testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r (RED)** Ã¢â‚¬â€ Testin beklenen hatayla baÃ…Å¸arÃ„Â±sÃ„Â±z olduÃ„Å¸unu doÃ„Å¸rula
5. **Kodu uygula (GREEN)** Ã¢â‚¬â€ Testi geÃƒÂ§mek iÃƒÂ§in minimal kod yaz
6. **Refactor** Ã¢â‚¬â€ Testleri yeÃ…Å¸il tutarken implementasyonu iyileÃ…Å¸tir
7. **Coverage'Ã„Â± kontrol et** Ã¢â‚¬â€ `./gradlew koverHtmlReport` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r ve %80+ coverage'Ã„Â± doÃ„Å¸rula

## TDD Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â± for Kotlin

### RED-GREEN-REFACTOR DÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼

```
RED     -> Ãƒâ€“nce baÃ…Å¸arÃ„Â±sÃ„Â±z bir test yaz
GREEN   -> Testi geÃƒÂ§mek iÃƒÂ§in minimal kod yaz
REFACTOR -> Testleri yeÃ…Å¸il tutarken kodu iyileÃ…Å¸tir
REPEAT  -> Sonraki gereksinimle devam et
```

### Kotlin'de AdÃ„Â±m AdÃ„Â±m TDD

```kotlin
// AdÃ„Â±m 1: Interface/signature tanÃ„Â±mla
// EmailValidator.kt
package com.example.validator

fun validateEmail(email: String): Result<String> {
    TODO("not implemented")
}

// AdÃ„Â±m 2: BaÃ…Å¸arÃ„Â±sÃ„Â±z test yaz (RED)
// EmailValidatorTest.kt
package com.example.validator

import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.result.shouldBeFailure
import io.kotest.matchers.result.shouldBeSuccess

class EmailValidatorTest : StringSpec({
    "valid email returns success" {
        validateEmail("user@example.com").shouldBeSuccess("user@example.com")
    }

    "empty email returns failure" {
        validateEmail("").shouldBeFailure()
    }

    "email without @ returns failure" {
        validateEmail("userexample.com").shouldBeFailure()
    }
})

// AdÃ„Â±m 3: Testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r - FAIL doÃ„Å¸rula
// $ ./gradlew test
// EmailValidatorTest > valid email returns success FAILED
//   kotlin.NotImplementedError: An operation is not implemented

// AdÃ„Â±m 4: Minimal kodu uygula (GREEN)
fun validateEmail(email: String): Result<String> {
    if (email.isBlank()) return Result.failure(IllegalArgumentException("Email cannot be blank"))
    if ('@' !in email) return Result.failure(IllegalArgumentException("Email must contain @"))
    val regex = Regex("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")
    if (!regex.matches(email)) return Result.failure(IllegalArgumentException("Invalid email format"))
    return Result.success(email)
}

// AdÃ„Â±m 5: Testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r - PASS doÃ„Å¸rula
// $ ./gradlew test
// EmailValidatorTest > valid email returns success PASSED
// EmailValidatorTest > empty email returns failure PASSED
// EmailValidatorTest > email without @ returns failure PASSED

// AdÃ„Â±m 6: Gerekirse refactor et, testlerin hala geÃƒÂ§tiÃ„Å¸ini doÃ„Å¸rula
```

## Kotest Spec Stilleri

### StringSpec (En Basit)

```kotlin
class CalculatorTest : StringSpec({
    "add two positive numbers" {
        Calculator.add(2, 3) shouldBe 5
    }

    "add negative numbers" {
        Calculator.add(-1, -2) shouldBe -3
    }

    "add zero" {
        Calculator.add(0, 5) shouldBe 5
    }
})
```

### FunSpec (JUnit benzeri)

```kotlin
class UserServiceTest : FunSpec({
    val repository = mockk<UserRepository>()
    val service = UserService(repository)

    test("getUser returns user when found") {
        val expected = User(id = "1", name = "Alice")
        coEvery { repository.findById("1") } returns expected

        val result = service.getUser("1")

        result shouldBe expected
    }

    test("getUser throws when not found") {
        coEvery { repository.findById("999") } returns null

        shouldThrow<UserNotFoundException> {
            service.getUser("999")
        }
    }
})
```

### BehaviorSpec (BDD Stili)

```kotlin
class OrderServiceTest : BehaviorSpec({
    val repository = mockk<OrderRepository>()
    val paymentService = mockk<PaymentService>()
    val service = OrderService(repository, paymentService)

    Given("a valid order request") {
        val request = CreateOrderRequest(
            userId = "user-1",
            items = listOf(OrderItem("product-1", quantity = 2)),
        )

        When("the order is placed") {
            coEvery { paymentService.charge(any()) } returns PaymentResult.Success
            coEvery { repository.save(any()) } answers { firstArg() }

            val result = service.placeOrder(request)

            Then("it should return a confirmed order") {
                result.status shouldBe OrderStatus.CONFIRMED
            }

            Then("it should charge payment") {
                coVerify(exactly = 1) { paymentService.charge(any()) }
            }
        }

        When("payment fails") {
            coEvery { paymentService.charge(any()) } returns PaymentResult.Declined

            Then("it should throw PaymentException") {
                shouldThrow<PaymentException> {
                    service.placeOrder(request)
                }
            }
        }
    }
})
```

## Kotest Matcher'lar

### Temel Matcher'lar

```kotlin
import io.kotest.matchers.shouldBe
import io.kotest.matchers.shouldNotBe
import io.kotest.matchers.string.*
import io.kotest.matchers.collections.*
import io.kotest.matchers.nulls.*

// EÃ…Å¸itlik
result shouldBe expected
result shouldNotBe unexpected

// String'ler
name shouldStartWith "Al"
name shouldEndWith "ice"
name shouldContain "lic"
name shouldMatch Regex("[A-Z][a-z]+")
name.shouldBeBlank()

// Koleksiyonlar
list shouldContain "item"
list shouldHaveSize 3
list.shouldBeSorted()
list.shouldContainAll("a", "b", "c")
list.shouldBeEmpty()

// Null'lar
result.shouldNotBeNull()
result.shouldBeNull()

// Tipler
result.shouldBeInstanceOf<User>()

// SayÃ„Â±lar
count shouldBeGreaterThan 0
price shouldBeInRange 1.0..100.0

// Exception'lar
shouldThrow<IllegalArgumentException> {
    validateAge(-1)
}.message shouldBe "Age must be positive"

shouldNotThrow<Exception> {
    validateAge(25)
}
```

## MockK

### Temel Mocking

```kotlin
class UserServiceTest : FunSpec({
    val repository = mockk<UserRepository>()
    val logger = mockk<Logger>(relaxed = true) // Relaxed: varsayÃ„Â±lanlarÃ„Â± dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r
    val service = UserService(repository, logger)

    beforeTest {
        clearMocks(repository, logger)
    }

    test("findUser delegates to repository") {
        val expected = User(id = "1", name = "Alice")
        every { repository.findById("1") } returns expected

        val result = service.findUser("1")

        result shouldBe expected
        verify(exactly = 1) { repository.findById("1") }
    }

    test("findUser returns null for unknown id") {
        every { repository.findById(any()) } returns null

        val result = service.findUser("unknown")

        result.shouldBeNull()
    }
})
```

### Coroutine Mocking

```kotlin
class AsyncUserServiceTest : FunSpec({
    val repository = mockk<UserRepository>()
    val service = UserService(repository)

    test("getUser suspending function") {
        coEvery { repository.findById("1") } returns User(id = "1", name = "Alice")

        val result = service.getUser("1")

        result.name shouldBe "Alice"
        coVerify { repository.findById("1") }
    }

    test("getUser with delay") {
        coEvery { repository.findById("1") } coAnswers {
            delay(100) // Async ÃƒÂ§alÃ„Â±Ã…Å¸mayÃ„Â± simÃƒÂ¼le et
            User(id = "1", name = "Alice")
        }

        val result = service.getUser("1")
        result.name shouldBe "Alice"
    }
})
```

## Coroutine Testi

### Suspend Fonksiyonlar Ã„Â°ÃƒÂ§in runTest

```kotlin
import kotlinx.coroutines.test.runTest

class CoroutineServiceTest : FunSpec({
    test("concurrent fetches complete together") {
        runTest {
            val service = DataService(testScope = this)

            val result = service.fetchAllData()

            result.users.shouldNotBeEmpty()
            result.products.shouldNotBeEmpty()
        }
    }

    test("timeout after delay") {
        runTest {
            val service = SlowService()

            shouldThrow<TimeoutCancellationException> {
                withTimeout(100) {
                    service.slowOperation() // > 100ms sÃƒÂ¼rer
                }
            }
        }
    }
})
```

### Flow Testi

```kotlin
import io.kotest.matchers.collections.shouldContainInOrder
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.advanceTimeBy
import kotlinx.coroutines.test.runTest

class FlowServiceTest : FunSpec({
    test("observeUsers emits updates") {
        runTest {
            val service = UserFlowService()

            val emissions = service.observeUsers()
                .take(3)
                .toList()

            emissions shouldHaveSize 3
            emissions.last().shouldNotBeEmpty()
        }
    }

    test("searchUsers debounces input") {
        runTest {
            val service = SearchService()
            val queries = MutableSharedFlow<String>()

            val results = mutableListOf<List<User>>()
            val job = launch {
                service.searchUsers(queries).collect { results.add(it) }
            }

            queries.emit("a")
            queries.emit("ab")
            queries.emit("abc") // Sadece bu aramayÃ„Â± tetiklemeli
            advanceTimeBy(500)

            results shouldHaveSize 1
            job.cancel()
        }
    }
})
```

## Property-Based Testing

### Kotest Property Testing

```kotlin
import io.kotest.core.spec.style.FunSpec
import io.kotest.property.Arb
import io.kotest.property.arbitrary.*
import io.kotest.property.forAll
import io.kotest.property.checkAll

class PropertyTest : FunSpec({
    test("string reverse is involutory") {
        forAll<String> { s ->
            s.reversed().reversed() == s
        }
    }

    test("list sort is idempotent") {
        forAll(Arb.list(Arb.int())) { list ->
            list.sorted() == list.sorted().sorted()
        }
    }

    test("serialization roundtrip preserves data") {
        checkAll(Arb.bind(Arb.string(1..50), Arb.string(5..100)) { name, email ->
            User(name = name, email = "$email@test.com")
        }) { user ->
            val json = Json.encodeToString(user)
            val decoded = Json.decodeFromString<User>(json)
            decoded shouldBe user
        }
    }
})
```

## Kover Coverage

### Gradle YapÃ„Â±landÃ„Â±rmasÃ„Â±

```kotlin
// build.gradle.kts
plugins {
    id("org.jetbrains.kotlinx.kover") version "0.9.7"
}

kover {
    reports {
        total {
            html { onCheck = true }
            xml { onCheck = true }
        }
        filters {
            excludes {
                classes("*.generated.*", "*.config.*")
            }
        }
        verify {
            rule {
                minBound(80) // %80 coverage'Ã„Â±n altÃ„Â±nda build baÃ…Å¸arÃ„Â±sÃ„Â±z
            }
        }
    }
}
```

### Coverage KomutlarÃ„Â±

```bash
# Testleri coverage ile ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
./gradlew koverHtmlReport

# Coverage eÃ…Å¸iklerini doÃ„Å¸rula
./gradlew koverVerify

# CI iÃƒÂ§in XML raporu
./gradlew koverXmlReport

# HTML raporunu gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼le (OS'nize gÃƒÂ¶re komutu kullanÃ„Â±n)
# macOS:   open build/reports/kover/html/index.html
# Linux:   xdg-open build/reports/kover/html/index.html
# Windows: start build/reports/kover/html/index.html
```

### Coverage Hedefleri

| Kod Tipi | Hedef |
|-----------|--------|
| Kritik business mantÃ„Â±Ã„Å¸Ã„Â± | %100 |
| Public API'ler | %90+ |
| Genel kod | %80+ |
| Generated / config kodu | HariÃƒÂ§ tut |

## Ktor testApplication Testi

```kotlin
class ApiRoutesTest : FunSpec({
    test("GET /users returns list") {
        testApplication {
            application {
                configureRouting()
                configureSerialization()
            }

            val response = client.get("/users")

            response.status shouldBe HttpStatusCode.OK
            val users = response.body<List<UserResponse>>()
            users.shouldNotBeEmpty()
        }
    }

    test("POST /users creates user") {
        testApplication {
            application {
                configureRouting()
                configureSerialization()
            }

            val response = client.post("/users") {
                contentType(ContentType.Application.Json)
                setBody(CreateUserRequest("Alice", "alice@example.com"))
            }

            response.status shouldBe HttpStatusCode.Created
        }
    }
})
```

## Test KomutlarÃ„Â±

```bash
# TÃƒÂ¼m testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
./gradlew test

# Belirli test class'Ã„Â±nÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
./gradlew test --tests "com.example.UserServiceTest"

# Belirli testi ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
./gradlew test --tests "com.example.UserServiceTest.getUser returns user when found"

# Verbose ÃƒÂ§Ã„Â±ktÃ„Â± ile ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
./gradlew test --info

# Coverage ile ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
./gradlew koverHtmlReport

# Detekt ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r (statik analiz)
./gradlew detekt

# Ktlint ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r (formatlama kontrolÃƒÂ¼)
./gradlew ktlintCheck

# SÃƒÂ¼rekli test
./gradlew test --continuous
```

## En Ã„Â°yi Uygulamalar

**YAPILMASI GEREKENLER:**
- Ãƒâ€“NCE testleri yaz (TDD)
- Proje genelinde Kotest'in spec stillerini tutarlÃ„Â± kullan
- Suspend fonksiyonlar iÃƒÂ§in MockK'nÃ„Â±n `coEvery`/`coVerify`'Ã„Â±nÃ„Â± kullan
- Coroutine testi iÃƒÂ§in `runTest` kullan
- Ã„Â°mplementasyon deÃ„Å¸il davranÃ„Â±Ã…Å¸Ã„Â± test et
- Pure fonksiyonlar iÃƒÂ§in property-based testing kullan
- Netlik iÃƒÂ§in `data class` test fixture'larÃ„Â± kullan

**YAPILMAMASI GEREKENLER:**
- Test framework'lerini karÃ„Â±Ã…Å¸tÃ„Â±rma (Kotest seÃƒÂ§ ve ona sadÃ„Â±k kal)
- Data class'larÃ„Â± mock'lama (gerÃƒÂ§ek instance'lar kullan)
- Coroutine testlerinde `Thread.sleep()` kullanma (`advanceTimeBy` kullan)
- TDD'de RED fazÃ„Â±nÃ„Â± atlama
- Private fonksiyonlarÃ„Â± doÃ„Å¸rudan test etme
- KararsÃ„Â±z testleri gÃƒÂ¶rmezden gelme

## CI/CD ile Entegrasyon

```yaml
# GitHub Actions ÃƒÂ¶rneÃ„Å¸i
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-java@v4
      with:
        distribution: 'temurin'
        java-version: '21'

    - name: Run tests with coverage
      run: ./gradlew test koverXmlReport

    - name: Verify coverage
      run: ./gradlew koverVerify

    - name: Upload coverage
      uses: codecov/codecov-action@v5
      with:
        files: build/reports/kover/report.xml
        token: ${{ secrets.CODECOV_TOKEN }}
```

**HatÃ„Â±rla**: Testler dokÃƒÂ¼mantasyondur. Kotlin kodunuzun nasÃ„Â±l kullanÃ„Â±lmasÃ„Â± gerektiÃ„Å¸ini gÃƒÂ¶sterirler. Testleri okunabilir yapmak iÃƒÂ§in Kotest'in aÃƒÂ§Ã„Â±klayÃ„Â±cÃ„Â± matcher'larÃ„Â±nÃ„Â± ve baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± temiz mock'lamak iÃƒÂ§in MockK kullanÃ„Â±n.
