---
description: Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žKotlinÃ¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Å’Ã¦Â¶ÂµÃ§â€ºâ€“Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬ÂÃ§Â©ÂºÃ¥Â®â€°Ã¥â€¦Â¨Ã£â‚¬ÂÃ¥ÂÂÃ§Â¨â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã¥â€™Å’Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã£â‚¬â€šÃ¨Â°Æ’Ã§â€Â¨kotlin-reviewerÃ¤Â»Â£Ã§Ââ€ Ã£â‚¬â€š
---

# Kotlin Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨ **kotlin-reviewer** Ã¤Â»Â£Ã§Ââ€ Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž Kotlin Ã¤Â¸â€œÃ©Â¡Â¹Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¥Å Å¸Ã¨Æ’Â½

1. **Ã¨Â¯â€ Ã¥Ë†Â« Kotlin Ã¥ÂËœÃ¦â€ºÂ´**Ã¯Â¼Å¡Ã©â‚¬Å¡Ã¨Â¿â€¡ `git diff` Ã¦Å¸Â¥Ã¦â€°Â¾Ã¤Â¿Â®Ã¦â€Â¹Ã¨Â¿â€¡Ã§Å¡â€ž `.kt` Ã¥â€™Å’ `.kts` Ã¦â€“â€¡Ã¤Â»Â¶
2. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â¸Å½Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾Â**Ã¯Â¼Å¡Ã¦â€°Â§Ã¨Â¡Å’ `./gradlew build`Ã£â‚¬Â`detekt`Ã£â‚¬Â`ktlintCheck`
3. **Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ**Ã¯Â¼Å¡Ã¦Â£â‚¬Ã¦Å¸Â¥ SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã£â‚¬ÂÃ¥â€˜Â½Ã¤Â»Â¤Ã¦Â³Â¨Ã¥â€¦Â¥Ã£â‚¬ÂÃ§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥
4. **Ã§Â©ÂºÃ¥Â®â€°Ã¥â€¦Â¨Ã¥Â®Â¡Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã¥Ë†â€ Ã¦Å¾Â `!!` Ã§Å¡â€žÃ¤Â½Â¿Ã§â€Â¨Ã£â‚¬ÂÃ¥Â¹Â³Ã¥ÂÂ°Ã§Â±Â»Ã¥Å¾â€¹Ã¥Â¤â€žÃ§Ââ€ Ã£â‚¬ÂÃ¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¨Â½Â¬Ã¦ÂÂ¢
5. **Ã¥ÂÂÃ§Â¨â€¹Ã¥Â®Â¡Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¥Â¹Â¶Ã¥Ââ€˜Ã£â‚¬ÂÃ¨Â°Æ’Ã¥ÂºÂ¦Ã¥â„¢Â¨Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬ÂÃ¥Ââ€“Ã¦Â¶Ë†Ã¦â€œÂÃ¤Â½Å“
6. **Ã§â€Å¸Ã¦Ë†ÂÃ¦Å Â¥Ã¥â€˜Å **Ã¯Â¼Å¡Ã¦Å’â€°Ã¤Â¸Â¥Ã©â€¡ÂÃ¦â‚¬Â§Ã¥Â¯Â¹Ã©â€”Â®Ã©Â¢ËœÃ¥Ë†â€ Ã§Â±Â»

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶Ã¦Å“Âº

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â½Â¿Ã§â€Â¨ `/kotlin-review`Ã¯Â¼Å¡

* Ã§Â¼â€“Ã¥â€ â„¢Ã¦Ë†â€“Ã¤Â¿Â®Ã¦â€Â¹ Kotlin Ã¤Â»Â£Ã§Â ÂÃ¥ÂÅ½
* Ã¦ÂÂÃ¤ÂºÂ¤ Kotlin Ã¥ÂËœÃ¦â€ºÂ´Ã¥â€°Â
* Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥Å’â€¦Ã¥ÂÂ« Kotlin Ã¤Â»Â£Ã§Â ÂÃ§Å¡â€žÃ¦â€¹â€°Ã¥Ââ€“Ã¨Â¯Â·Ã¦Â±â€šÃ¦â€”Â¶
* Ã¦Å½Â¥Ã¦â€°â€¹Ã¦â€“Â°Ã§Å¡â€ž Kotlin Ã¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ¦â€”Â¶
* Ã¥Â­Â¦Ã¤Â¹Â  Kotlin Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â¨Â¡Ã¥Â¼ÂÃ¦â€”Â¶

## Ã¥Â®Â¡Ã¦Å¸Â¥Ã§Â±Â»Ã¥Ë†Â«

### Ã¤Â¸Â¥Ã©â€¡ÂÃ¯Â¼Ë†Ã¥Â¿â€¦Ã©Â¡Â»Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼â€°

* SQL/Ã¥â€˜Â½Ã¤Â»Â¤Ã¦Â³Â¨Ã¥â€¦Â¥Ã¦Â¼ÂÃ¦Â´Å¾
* Ã¦â€”Â Ã¦Â­Â£Ã¥Â½â€œÃ§Ââ€ Ã§â€Â±Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¨Â§Â£Ã¥Å’â€¦ `!!`
* Ã¥Â¹Â³Ã¥ÂÂ°Ã§Â±Â»Ã¥Å¾â€¹Ã§Â©ÂºÃ¥Â®â€°Ã¥â€¦Â¨Ã¨Â¿ÂÃ¨Â§â€ž
* Ã¤Â½Â¿Ã§â€Â¨ GlobalScopeÃ¯Â¼Ë†Ã¨Â¿ÂÃ¥ÂÂÃ§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¥Â¹Â¶Ã¥Ââ€˜Ã¯Â¼â€°
* Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ§Å¡â€žÃ¥â€¡Â­Ã¨Â¯Â
* Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¥ÂÂÃ¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“

### Ã©Â«ËœÃ¯Â¼Ë†Ã¥Âºâ€Ã¨Â¯Â¥Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼â€°

* Ã¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬ÂÃ¥ÂÂ³Ã¥ÂÂ¯Ã¦Â»Â¡Ã¨Â¶Â³
* Ã¥Å“Â¨Ã¥ÂÂÃ§Â¨â€¹Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¤Â¸Â­Ã¨Â¿â€ºÃ¨Â¡Å’Ã©ËœÂ»Ã¥Â¡Å¾Ã¨Â°Æ’Ã§â€Â¨
* Ã©â€¢Â¿Ã¥Â¾ÂªÃ§Å½Â¯Ã¤Â¸Â­Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Ââ€“Ã¦Â¶Ë†Ã¦Â£â‚¬Ã¦Å¸Â¥
* Ã¥Â¯Â¹Ã¥Â¯â€ Ã¥Â°ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¤Â½Â¿Ã§â€Â¨Ã©ÂÅ¾Ã§Â©Â·Ã¤Â¸Â¾Ã§Å¡â€ž `when`
* Ã¥â€¡Â½Ã¦â€¢Â°Ã¨Â¿â€¡Ã¥Â¤Â§Ã¯Â¼Ë†>50 Ã¨Â¡Å’Ã¯Â¼â€°
* Ã¥ÂµÅ’Ã¥Â¥â€”Ã¨Â¿â€¡Ã¦Â·Â±Ã¯Â¼Ë†>4 Ã¥Â±â€šÃ¯Â¼â€°

### Ã¤Â¸Â­Ã¯Â¼Ë†Ã¨â‚¬Æ’Ã¨â„¢â€˜Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼â€°

* Ã©ÂÅ¾ Kotlin Ã¦Æ’Â¯Ã§â€Â¨Ã¥â€ â„¢Ã¦Â³â€¢Ã¯Â¼Ë†Java Ã©Â£Å½Ã¦Â Â¼Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼â€°
* Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Â°Â¾Ã©Å¡ÂÃ©â‚¬â€”Ã¥ÂÂ·
* Ã¨Â¯Â¯Ã§â€Â¨Ã¦Ë†â€“Ã¥ÂµÅ’Ã¥Â¥â€”Ã¤Â½Å“Ã§â€Â¨Ã¥Å¸Å¸Ã¥â€¡Â½Ã¦â€¢Â°
* Ã¥Â¤Â§Ã¥Å¾â€¹Ã©â€ºâ€ Ã¥ÂË†Ã©â€œÂ¾Ã¤Â¸Â­Ã§Â¼ÂºÃ¥Â°â€˜Ã¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“
* Ã¥â€ â€”Ã¤Â½â„¢Ã§Å¡â€žÃ¦ËœÂ¾Ã¥Â¼ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¥Â£Â°Ã¦ËœÅ½

## Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦Â£â‚¬Ã¦Å¸Â¥

```bash
# Build check
./gradlew build

# Static analysis
./gradlew detekt

# Formatting check
./gradlew ktlintCheck

# Tests
./gradlew test
```

## Ã¤Â½Â¿Ã§â€Â¨Ã§Â¤ÂºÃ¤Â¾â€¹

````text
User: /kotlin-review

Agent:
# Kotlin Code Review Report

## Files Reviewed
- src/main/kotlin/com/example/service/UserService.kt (modified)
- src/main/kotlin/com/example/routes/UserRoutes.kt (modified)

## Static Analysis Results
Ã¢Å“â€œ Build: Successful
Ã¢Å“â€œ detekt: No issues
WARNING: ktlint: 2 formatting warnings

## Issues Found

[CRITICAL] Force-Unwrap Null Safety
File: src/main/kotlin/com/example/service/UserService.kt:28
Issue: Using !! on nullable repository result
```kotlin
val user = repository.findById(id)!!  // NPE risk
```
Fix: Use safe call with error handling
```kotlin
val user = repository.findById(id)
    ?: throw UserNotFoundException("User $id not found")
```

[HIGH] GlobalScope Usage
File: src/main/kotlin/com/example/routes/UserRoutes.kt:45
Issue: Using GlobalScope breaks structured concurrency
```kotlin
GlobalScope.launch {
    notificationService.sendWelcome(user)
}
```
Fix: Use the call's coroutine scope
```kotlin
launch {
    notificationService.sendWelcome(user)
}
```

## Summary
- CRITICAL: 1
- HIGH: 1
- MEDIUM: 0

Recommendation: FAIL: Block merge until CRITICAL issue is fixed
````

## Ã¦â€°Â¹Ã¥â€¡â€ Ã¦Â â€¡Ã¥â€¡â€ 

| Ã§Å Â¶Ã¦â‚¬Â | Ã¦ÂÂ¡Ã¤Â»Â¶ |
|--------|-----------|
| PASS: Ã¦â€°Â¹Ã¥â€¡â€  | Ã¦â€”Â Ã¤Â¸Â¥Ã©â€¡ÂÃ¦Ë†â€“Ã©Â«ËœÃ¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã©â€”Â®Ã©Â¢Ëœ |
| WARNING: Ã¨Â­Â¦Ã¥â€˜Å  | Ã¤Â»â€¦Ã¥Â­ËœÃ¥Å“Â¨Ã¤Â¸Â­Ã¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†Ã¨Â°Â¨Ã¦â€¦Å½Ã¥ÂË†Ã¥Â¹Â¶Ã¯Â¼â€° |
| FAIL: Ã©ËœÂ»Ã¦Â­Â¢ | Ã¥Ââ€˜Ã§Å½Â°Ã¤Â¸Â¥Ã©â€¡ÂÃ¦Ë†â€“Ã©Â«ËœÃ¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã©â€”Â®Ã©Â¢Ëœ |

## Ã¤Â¸Å½Ã¥â€¦Â¶Ã¤Â»â€“Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†Â

* Ã©Â¦â€“Ã¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `/kotlin-test` Ã§Â¡Â®Ã¤Â¿ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
* Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â€¡ÂºÃ©â€â„¢Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `/kotlin-build`
* Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°ÂÃ¤Â½Â¿Ã§â€Â¨ `/kotlin-review`
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã©ÂÅ¾ Kotlin Ã¤Â¸â€œÃ©Â¡Â¹Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `/code-review`

## Ã§â€ºÂ¸Ã¥â€¦Â³

* Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å¡`agents/kotlin-reviewer.md`
* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/kotlin-patterns/`Ã£â‚¬Â`skills/kotlin-testing/`
