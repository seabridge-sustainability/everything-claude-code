---
description: Ã¤Â¸ÂºKotlinÃ¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’TDDÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã£â‚¬â€šÃ©Â¦â€“Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢KotestÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¥Â®Å¾Ã¦â€“Â½Ã£â‚¬â€šÃ¤Â½Â¿Ã§â€Â¨KoverÃ©ÂªÅ’Ã¨Â¯Â80%Ã¤Â»Â¥Ã¤Â¸Å Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã£â‚¬â€š
---

# Kotlin TDD Ã¥â€˜Â½Ã¤Â»Â¤

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¤Â½Â¿Ã§â€Â¨ KotestÃ£â‚¬ÂMockK Ã¥â€™Å’ Kover Ã¤Â¸Âº Kotlin Ã¤Â»Â£Ã§Â ÂÃ¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦â€“Â¹Ã¦Â³â€¢Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã¥Â®Å¡Ã¤Â¹â€°Ã§Â±Â»Ã¥Å¾â€¹/Ã¦Å½Â¥Ã¥ÂÂ£**Ã¯Â¼Å¡Ã©Â¦â€“Ã¥â€¦Ë†Ã¦ÂÂ­Ã¥Â»ÂºÃ¥â€¡Â½Ã¦â€¢Â°Ã§Â­Â¾Ã¥ÂÂ
2. **Ã§Â¼â€“Ã¥â€ â„¢ Kotest Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Å¡Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â§â€žÃ¨Å’Æ’Ã¯Â¼Ë†REDÃ¯Â¼â€°
3. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Å¡Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€ºÂ Ã¦Â­Â£Ã§Â¡Â®Ã¥Å½Å¸Ã¥â€ºÂ Ã¨â‚¬Å’Ã¥Â¤Â±Ã¨Â´Â¥
4. **Ã¥Â®Å¾Ã§Å½Â°Ã¤Â»Â£Ã§Â Â**Ã¯Â¼Å¡Ã§Â¼â€“Ã¥â€ â„¢Ã¦Å“â‚¬Ã¥Â°â€˜Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†GREENÃ¯Â¼â€°
5. **Ã©â€¡ÂÃ¦Å¾â€ž**Ã¯Â¼Å¡Ã¥Å“Â¨Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã§Å¡â€žÃ¥ÂÅ’Ã¦â€”Â¶Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦â€Â¹Ã¨Â¿â€º
6. **Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡**Ã¯Â¼Å¡Ã§Â¡Â®Ã¤Â¿ÂÃ¤Â½Â¿Ã§â€Â¨ Kover Ã¨Â¾Â¾Ã¥Ë†Â° 80% Ã¤Â»Â¥Ã¤Â¸Å Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¤Â½Â¿Ã§â€Â¨ `/kotlin-test`Ã¯Â¼Å¡

* Ã¥Â®Å¾Ã§Å½Â°Ã¦â€“Â°Ã§Å¡â€ž Kotlin Ã¥â€¡Â½Ã¦â€¢Â°Ã¦Ë†â€“Ã§Â±Â»
* Ã¤Â¸ÂºÃ§Å½Â°Ã¦Å“â€°Ã§Å¡â€ž Kotlin Ã¤Â»Â£Ã§Â ÂÃ¦Â·Â»Ã¥Å Â Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡
* Ã¤Â¿Â®Ã¥Â¤ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Ë†Ã©Â¦â€“Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°
* Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â€¦Â³Ã©â€Â®Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜
* Ã¥Â­Â¦Ã¤Â¹Â  Kotlin Ã¤Â¸Â­Ã§Å¡â€ž TDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

## TDD Ã¥Â¾ÂªÃ§Å½Â¯

```
RED     -> Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€ž Kotest Ã¦Âµâ€¹Ã¨Â¯â€¢
GREEN   -> Ã¥Â®Å¾Ã§Å½Â°Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¤Â»Â£Ã§Â ÂÃ¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢
REFACTOR -> Ã¦â€Â¹Ã¨Â¿â€ºÃ¤Â»Â£Ã§Â ÂÃ¯Â¼Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¿ÂÃ¦Å’ÂÃ©â‚¬Å¡Ã¨Â¿â€¡Ã§Å Â¶Ã¦â‚¬Â
REPEAT  -> Ã¨Â¿â€ºÃ¥â€¦Â¥Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§â€Â¨Ã¤Â¾â€¹
```

## Ã§Â¤ÂºÃ¤Â¾â€¹Ã¤Â¼Å¡Ã¨Â¯Â

````text
Ã§â€Â¨Ã¦Ë†Â·Ã¯Â¼Å¡/kotlin-test Ã¦Ë†â€˜Ã©Å“â‚¬Ã¨Â¦ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ©ÂªÅ’Ã¨Â¯ÂÃ§â€Â¨Ã¦Ë†Â·Ã¦Â³Â¨Ã¥â€ Å’Ã¨Â¯Â·Ã¦Â±â€šÃ§Å¡â€žÃ¥â€¡Â½Ã¦â€¢Â°

Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å¡
# TDD Ã¤Â¼Å¡Ã¨Â¯ÂÃ¯Â¼Å¡Ã¦Â³Â¨Ã¥â€ Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â„¢Â¨

## Ã§Â¬Â¬Ã¤Â¸â‚¬Ã¦Â­Â¥Ã¯Â¼Å¡Ã¥Â®Å¡Ã¤Â¹â€°Ã¦Å½Â¥Ã¥ÂÂ£

```kotlin
// validator/RegistrationValidator.kt
package com.example.validator

data class RegistrationRequest(
    val name: String,
    val email: String,
    val password: String,
)

sealed class ValidationResult {
    data object Valid : ValidationResult()
    data class Invalid(val errors: List<String>) : ValidationResult()
}

fun validateRegistration(request: RegistrationRequest): ValidationResult {
    TODO("not implemented")
}
```

## Ã§Â¬Â¬Ã¤ÂºÅ’Ã¦Â­Â¥Ã¯Â¼Å¡Ã§Â¼â€“Ã¥â€ â„¢ Kotest Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†REDÃ¯Â¼â€°

```kotlin
// validator/RegistrationValidatorTest.kt
package com.example.validator

import io.kotest.core.spec.style.FunSpec
import io.kotest.matchers.shouldBe
import io.kotest.matchers.types.shouldBeInstanceOf

class RegistrationValidatorTest : FunSpec({
    test("valid registration returns Valid") {
        val request = RegistrationRequest(
            name = "Alice",
            email = "alice@example.com",
            password = "SecureP@ss1",
        )

        val result = validateRegistration(request)

        result.shouldBeInstanceOf<ValidationResult.Valid>()
    }

    test("blank name returns Invalid") {
        val request = RegistrationRequest(
            name = "",
            email = "alice@example.com",
            password = "SecureP@ss1",
        )

        val result = validateRegistration(request)

        val invalid = result.shouldBeInstanceOf<ValidationResult.Invalid>()
        invalid.errors shouldBe listOf("Name is required")
    }

    test("invalid email returns Invalid") {
        val request = RegistrationRequest(
            name = "Alice",
            email = "not-an-email",
            password = "SecureP@ss1",
        )

        val result = validateRegistration(request)

        val invalid = result.shouldBeInstanceOf<ValidationResult.Invalid>()
        invalid.errors shouldBe listOf("Invalid email format")
    }

    test("short password returns Invalid") {
        val request = RegistrationRequest(
            name = "Alice",
            email = "alice@example.com",
            password = "short",
        )

        val result = validateRegistration(request)

        val invalid = result.shouldBeInstanceOf<ValidationResult.Invalid>()
        invalid.errors shouldBe listOf("Password must be at least 8 characters")
    }

    test("multiple errors returns all errors") {
        val request = RegistrationRequest(
            name = "",
            email = "bad",
            password = "short",
        )

        val result = validateRegistration(request)

        val invalid = result.shouldBeInstanceOf<ValidationResult.Invalid>()
        invalid.errors.size shouldBe 3
    }
})
```

## Ã§Â¬Â¬Ã¤Â¸â€°Ã¦Â­Â¥Ã¯Â¼Å¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢ - Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¤Â±Ã¨Â´Â¥

```bash
$ ./gradlew test

RegistrationValidatorTest > valid registration returns Valid FAILED
  kotlin.NotImplementedError: An operation is not implemented

FAILED (5 tests, 0 passed, 5 failed)
```

Ã¢Å“â€œ Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Å’â€°Ã©Â¢â€žÃ¦Å“Å¸Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Ë†NotImplementedErrorÃ¯Â¼â€°Ã£â‚¬â€š

## Ã§Â¬Â¬Ã¥â€ºâ€ºÃ¦Â­Â¥Ã¯Â¼Å¡Ã¥Â®Å¾Ã§Å½Â°Ã¦Å“â‚¬Ã¥Â°ÂÃ¤Â»Â£Ã§Â ÂÃ¯Â¼Ë†GREENÃ¯Â¼â€°

```kotlin
// validator/RegistrationValidator.kt
package com.example.validator

private val EMAIL_REGEX = Regex("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")
private const val MIN_PASSWORD_LENGTH = 8

fun validateRegistration(request: RegistrationRequest): ValidationResult {
    val errors = buildList {
        if (request.name.isBlank()) add("Name is required")
        if (!EMAIL_REGEX.matches(request.email)) add("Invalid email format")
        if (request.password.length < MIN_PASSWORD_LENGTH) add("Password must be at least $MIN_PASSWORD_LENGTH characters")
    }

    return if (errors.isEmpty()) ValidationResult.Valid
    else ValidationResult.Invalid(errors)
}
```

## Ã§Â¬Â¬Ã¤Âºâ€Ã¦Â­Â¥Ã¯Â¼Å¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢ - Ã©ÂªÅ’Ã¨Â¯ÂÃ©â‚¬Å¡Ã¨Â¿â€¡

```bash
$ ./gradlew test

RegistrationValidatorTest > valid registration returns Valid PASSED
RegistrationValidatorTest > blank name returns Invalid PASSED
RegistrationValidatorTest > invalid email returns Invalid PASSED
RegistrationValidatorTest > short password returns Invalid PASSED
RegistrationValidatorTest > multiple errors returns all errors PASSED

PASSED (5 tests, 5 passed, 0 failed)
```

Ã¢Å“â€œ Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Â

## Ã§Â¬Â¬Ã¥â€¦Â­Ã¦Â­Â¥Ã¯Â¼Å¡Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

```bash
$ ./gradlew koverHtmlReport

Coverage: 100.0% of statements
```

Ã¢Å“â€œ Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Å¡100%

## TDD Ã¥Â®Å’Ã¦Ë†ÂÃ¯Â¼Â
````

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼Â

### StringSpecÃ¯Â¼Ë†Ã¦Å“â‚¬Ã§Â®â‚¬Ã¥Ââ€¢Ã¯Â¼â€°

```kotlin
class CalculatorTest : StringSpec({
    "add two positive numbers" {
        Calculator.add(2, 3) shouldBe 5
    }
})
```

### BehaviorSpecÃ¯Â¼Ë†BDDÃ¯Â¼â€°

```kotlin
class OrderServiceTest : BehaviorSpec({
    Given("a valid order") {
        When("placed") {
            Then("should be confirmed") { /* ... */ }
        }
    }
})
```

### Ã¦â€¢Â°Ã¦ÂÂ®Ã©Â©Â±Ã¥Å Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢

```kotlin
class ParserTest : FunSpec({
    context("valid inputs") {
        withData("2026-01-15", "2026-12-31", "2000-01-01") { input ->
            parseDate(input).shouldNotBeNull()
        }
    }
})
```

### Ã¥ÂÂÃ§Â¨â€¹Ã¦Âµâ€¹Ã¨Â¯â€¢

```kotlin
class AsyncServiceTest : FunSpec({
    test("concurrent fetch completes") {
        runTest {
            val result = service.fetchAll()
            result.shouldNotBeEmpty()
        }
    }
})
```

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¥â€˜Â½Ã¤Â»Â¤

```bash
# Run tests with coverage
./gradlew koverHtmlReport

# Verify coverage thresholds
./gradlew koverVerify

# XML report for CI
./gradlew koverXmlReport

# Open HTML report
open build/reports/kover/html/index.html

# Run specific test class
./gradlew test --tests "com.example.UserServiceTest"

# Run with verbose output
./gradlew test --info
```

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§â€ºÂ®Ã¦Â â€¡

| Ã¤Â»Â£Ã§Â ÂÃ§Â±Â»Ã¥Å¾â€¹ | Ã§â€ºÂ®Ã¦Â â€¡ |
|-----------|--------|
| Ã¥â€¦Â³Ã©â€Â®Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜ | 100% |
| Ã¥â€¦Â¬Ã¥â€¦Â± API | 90%+ |
| Ã©â‚¬Å¡Ã§â€Â¨Ã¤Â»Â£Ã§Â Â | 80%+ |
| Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€žÃ¤Â»Â£Ã§Â Â | Ã¦Å½â€™Ã©â„¢Â¤ |

## TDD Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

**Ã¥Âºâ€Ã¥ÂÅ¡Ã¯Â¼Å¡**

* Ã©Â¦â€“Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã¥Å“Â¨Ã¤Â»Â»Ã¤Â½â€¢Ã¥Â®Å¾Ã§Å½Â°Ã¤Â¹â€¹Ã¥â€°Â
* Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¤Â½Â¿Ã§â€Â¨ Kotest Ã¥Å’Â¹Ã©â€¦ÂÃ¥â„¢Â¨Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¦â‚¬Â§Ã¦â€“Â­Ã¨Â¨â‚¬
* Ã¤Â½Â¿Ã§â€Â¨ MockK Ã§Å¡â€ž `coEvery`/`coVerify` Ã¦ÂÂ¥Ã¥Â¤â€žÃ§Ââ€ Ã¦Å’â€šÃ¨ÂµÂ·Ã¥â€¡Â½Ã¦â€¢Â°
* Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¡Å’Ã¤Â¸ÂºÃ¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â®Å¾Ã§Å½Â°Ã§Â»â€ Ã¨Å â€š
* Ã¥Å’â€¦Ã¥ÂÂ«Ã¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Ë†Ã§Â©ÂºÃ¥â‚¬Â¼Ã£â‚¬ÂnullÃ£â‚¬ÂÃ¦Å“â‚¬Ã¥Â¤Â§Ã¥â‚¬Â¼Ã¯Â¼â€°

**Ã¤Â¸ÂÃ¥Âºâ€Ã¥ÂÅ¡Ã¯Â¼Å¡**

* Ã¥Å“Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¹â€¹Ã¥â€°ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¥Â®Å¾Ã§Å½Â°
* Ã¨Â·Â³Ã¨Â¿â€¡ RED Ã©ËœÂ¶Ã¦Â®Âµ
* Ã§â€ºÂ´Ã¦Å½Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â§ÂÃ¦Å“â€°Ã¥â€¡Â½Ã¦â€¢Â°
* Ã¥Å“Â¨Ã¥ÂÂÃ§Â¨â€¹Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `Thread.sleep()`
* Ã¥Â¿Â½Ã§â€¢Â¥Ã¤Â¸ÂÃ§Â¨Â³Ã¥Â®Å¡Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢

## Ã§â€ºÂ¸Ã¥â€¦Â³Ã¥â€˜Â½Ã¤Â»Â¤

* `/kotlin-build` - Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯
* `/kotlin-review` - Ã¥Å“Â¨Ã¥Â®Å¾Ã§Å½Â°Ã¥ÂÅ½Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â Â
* `/verify` - Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

## Ã§â€ºÂ¸Ã¥â€¦Â³

* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/kotlin-testing/`
* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/tdd-workflow/`
