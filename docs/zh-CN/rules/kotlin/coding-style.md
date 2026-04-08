---
paths:
  - "**/*.kt"
  - "**/*.kts"
---

# Kotlin Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/coding-style.md](../common/coding-style.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  Kotlin Ã§â€ºÂ¸Ã¥â€¦Â³Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

* Ã¤Â½Â¿Ã§â€Â¨ **ktlint** Ã¦Ë†â€“ **Detekt** Ã¨Â¿â€ºÃ¨Â¡Å’Ã©Â£Å½Ã¦Â Â¼Ã¦Â£â‚¬Ã¦Å¸Â¥
* Ã©ÂÂµÃ¥Â¾ÂªÃ¥Â®ËœÃ¦â€“Â¹ Kotlin Ã¤Â»Â£Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼ (`kotlin.code.style=official` Ã¥Å“Â¨ `gradle.properties` Ã¤Â¸Â­)

## Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§

* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `val` Ã¨â‚¬Å’Ã©ÂÅ¾ `var` Ã¢â‚¬â€ Ã©Â»ËœÃ¨Â®Â¤Ã¤Â½Â¿Ã§â€Â¨ `val`Ã¯Â¼Å’Ã¤Â»â€¦Ã¥Å“Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ `var`
* Ã¥Â¯Â¹Ã¥â‚¬Â¼Ã§Â±Â»Ã¥Å¾â€¹Ã¤Â½Â¿Ã§â€Â¨ `data class`Ã¯Â¼â€ºÃ¥Å“Â¨Ã¥â€¦Â¬Ã¥â€¦Â± API Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ©â€ºâ€ Ã¥ÂË† (`List`, `Map`, `Set`)
* Ã§Å Â¶Ã¦â‚¬ÂÃ¦â€ºÂ´Ã¦â€“Â°Ã¤Â½Â¿Ã§â€Â¨Ã¥â€ â„¢Ã¦â€”Â¶Ã¥Â¤ÂÃ¥Ë†Â¶Ã¯Â¼Å¡`state.copy(field = newValue)`

## Ã¥â€˜Â½Ã¥ÂÂ

Ã©ÂÂµÃ¥Â¾Âª Kotlin Ã§ÂºÂ¦Ã¥Â®Å¡Ã¯Â¼Å¡

* Ã¥â€¡Â½Ã¦â€¢Â°Ã¥â€™Å’Ã¥Â±Å¾Ã¦â‚¬Â§Ã¤Â½Â¿Ã§â€Â¨ `camelCase`
* Ã§Â±Â»Ã£â‚¬ÂÃ¦Å½Â¥Ã¥ÂÂ£Ã£â‚¬ÂÃ¥Â¯Â¹Ã¨Â±Â¡Ã¥â€™Å’Ã§Â±Â»Ã¥Å¾â€¹Ã¥Ë†Â«Ã¥ÂÂÃ¤Â½Â¿Ã§â€Â¨ `PascalCase`
* Ã¥Â¸Â¸Ã©â€¡Â (`const val` Ã¦Ë†â€“ `@JvmStatic`) Ã¤Â½Â¿Ã§â€Â¨ `SCREAMING_SNAKE_CASE`
* Ã¦Å½Â¥Ã¥ÂÂ£Ã¤Â»Â¥Ã¨Â¡Å’Ã¤Â¸ÂºÃ¨â‚¬Å’Ã©ÂÅ¾ `I` Ã¤Â¸ÂºÃ¥â€°ÂÃ§Â¼â‚¬Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ `Clickable` Ã¨â‚¬Å’Ã©ÂÅ¾ `IClickable`

## Ã§Â©ÂºÃ¥Â®â€°Ã¥â€¦Â¨

* Ã§Â»ÂÃ¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ `!!` Ã¢â‚¬â€ Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `?.`, `?:`, `requireNotNull()` Ã¦Ë†â€“ `checkNotNull()`
* Ã¤Â½Â¿Ã§â€Â¨ `?.let {}` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â½Å“Ã§â€Â¨Ã¥Å¸Å¸Ã¥â€ â€¦Ã§Å¡â€žÃ§Â©ÂºÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â€œÂÃ¤Â½Å“
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã§Â¡Â®Ã¥Â®Å¾Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦Â²Â¡Ã¦Å“â€°Ã§Â»â€œÃ¦Å¾Å“Ã§Å¡â€žÃ¥â€¡Â½Ã¦â€¢Â°Ã¯Â¼Å’Ã¨Â¿â€Ã¥â€ºÅ¾Ã¥ÂÂ¯Ã¤Â¸ÂºÃ§Â©ÂºÃ§Å¡â€žÃ§Â±Â»Ã¥Å¾â€¹

```kotlin
// BAD
val name = user!!.name

// GOOD
val name = user?.name ?: "Unknown"
val name = requireNotNull(user) { "User must be set before accessing name" }.name
```

## Ã¥Â¯â€ Ã¥Â°ÂÃ§Â±Â»Ã¥Å¾â€¹

Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¯â€ Ã¥Â°ÂÃ§Â±Â»/Ã¦Å½Â¥Ã¥ÂÂ£Ã¦ÂÂ¥Ã¥Â»ÂºÃ¦Â¨Â¡Ã¥Â°ÂÃ©â€”Â­Ã§Å¡â€žÃ§Å Â¶Ã¦â‚¬ÂÃ¥Â±â€šÃ¦Â¬Â¡Ã§Â»â€œÃ¦Å¾â€žÃ¯Â¼Å¡

```kotlin
sealed interface UiState<out T> {
    data object Loading : UiState<Nothing>
    data class Success<T>(val data: T) : UiState<T>
    data class Error(val message: String) : UiState<Nothing>
}
```

Ã¥Â¯Â¹Ã¥Â¯â€ Ã¥Â°ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¯Â¦Ã¥Â°Â½Ã§Å¡â€ž `when` Ã¢â‚¬â€ Ã¤Â¸ÂÃ¨Â¦ÂÃ¤Â½Â¿Ã§â€Â¨ `else` Ã¥Ë†â€ Ã¦â€Â¯Ã£â‚¬â€š

## Ã¦â€°Â©Ã¥Â±â€¢Ã¥â€¡Â½Ã¦â€¢Â°

Ã¤Â½Â¿Ã§â€Â¨Ã¦â€°Â©Ã¥Â±â€¢Ã¥â€¡Â½Ã¦â€¢Â°Ã¥Â®Å¾Ã§Å½Â°Ã¥Â·Â¥Ã¥â€¦Â·Ã¦â€œÂÃ¤Â½Å“Ã¯Â¼Å’Ã¤Â½â€ Ã¨Â¦ÂÃ§Â¡Â®Ã¤Â¿ÂÃ¥â€¦Â¶Ã¥ÂÂ¯Ã¥Ââ€˜Ã§Å½Â°Ã¦â‚¬Â§Ã¯Â¼Å¡

* Ã¦â€Â¾Ã¥Å“Â¨Ã¤Â»Â¥Ã¦Å½Â¥Ã¦â€Â¶Ã¨â‚¬â€¦Ã§Â±Â»Ã¥Å¾â€¹Ã¥â€˜Â½Ã¥ÂÂÃ§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Â­ (`StringExt.kt`, `FlowExt.kt`)
* Ã©â„¢ÂÃ¥Ë†Â¶Ã¤Â½Å“Ã§â€Â¨Ã¥Å¸Å¸ Ã¢â‚¬â€ Ã¤Â¸ÂÃ¨Â¦ÂÃ¥Ââ€˜ `Any` Ã¦Ë†â€“Ã¨Â¿â€¡Ã¤ÂºÅ½Ã¦Â³â€ºÃ¥Å’â€“Ã§Å¡â€žÃ§Â±Â»Ã¥Å¾â€¹Ã¦Â·Â»Ã¥Å Â Ã¦â€°Â©Ã¥Â±â€¢

## Ã¤Â½Å“Ã§â€Â¨Ã¥Å¸Å¸Ã¥â€¡Â½Ã¦â€¢Â°

Ã¤Â½Â¿Ã§â€Â¨Ã¥ÂË†Ã©â‚¬â€šÃ§Å¡â€žÃ¤Â½Å“Ã§â€Â¨Ã¥Å¸Å¸Ã¥â€¡Â½Ã¦â€¢Â°Ã¯Â¼Å¡

* `let` Ã¢â‚¬â€ Ã§Â©ÂºÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¥Â¹Â¶Ã¨Â½Â¬Ã¦ÂÂ¢Ã¯Â¼Å¡`user?.let { greet(it) }`
* `run` Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨Ã¦Å½Â¥Ã¦â€Â¶Ã¨â‚¬â€¦Ã¨Â®Â¡Ã§Â®â€”Ã§Â»â€œÃ¦Å¾Å“Ã¯Â¼Å¡`service.run { fetch(config) }`
* `apply` Ã¢â‚¬â€ Ã©â€¦ÂÃ§Â½Â®Ã¥Â¯Â¹Ã¨Â±Â¡Ã¯Â¼Å¡`builder.apply { timeout = 30 }`
* `also` Ã¢â‚¬â€ Ã¥â€°Â¯Ã¤Â½Å“Ã§â€Â¨Ã¯Â¼Å¡`result.also { log(it) }`
* Ã©ÂÂ¿Ã¥â€¦ÂÃ¦Â·Â±Ã¥ÂºÂ¦Ã¥ÂµÅ’Ã¥Â¥â€”Ã¤Â½Å“Ã§â€Â¨Ã¥Å¸Å¸Ã¥â€¡Â½Ã¦â€¢Â°Ã¯Â¼Ë†Ã¦Å“â‚¬Ã¥Â¤Å¡ 2 Ã¥Â±â€šÃ¯Â¼â€°

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

* Ã¤Â½Â¿Ã§â€Â¨ `Result<T>` Ã¦Ë†â€“Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥Â¯â€ Ã¥Â°ÂÃ§Â±Â»Ã¥Å¾â€¹
* Ã¤Â½Â¿Ã§â€Â¨ `runCatching {}` Ã¥Å’â€¦Ã¨Â£â€¦Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦Å â€ºÃ¥â€¡ÂºÃ¥Â¼â€šÃ¥Â¸Â¸Ã§Å¡â€žÃ¤Â»Â£Ã§Â Â
* Ã§Â»ÂÃ¤Â¸ÂÃ¦Ââ€¢Ã¨Å½Â· `CancellationException` Ã¢â‚¬â€ Ã¥Â§â€¹Ã§Â»Ë†Ã©â€¡ÂÃ¦â€“Â°Ã¦Å â€ºÃ¥â€¡ÂºÃ¥Â®Æ’
* Ã©ÂÂ¿Ã¥â€¦ÂÃ¤Â½Â¿Ã§â€Â¨ `try-catch` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Å½Â§Ã¥Ë†Â¶Ã¦ÂµÂ

```kotlin
// BAD Ã¢â‚¬â€ using exceptions for control flow
val user = try { repository.getUser(id) } catch (e: NotFoundException) { null }

// GOOD Ã¢â‚¬â€ nullable return
val user: User? = repository.findUser(id)
```
