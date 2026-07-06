---
description: Ã©â‚¬ÂÃ¦Â­Â¥Ã¤Â¿Â®Ã¥Â¤Â Kotlin/Gradle Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬ÂÃ§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã¨Â­Â¦Ã¥â€˜Å Ã¥â€™Å’Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã©â€”Â®Ã©Â¢ËœÃ£â‚¬â€šÃ¨Â°Æ’Ã§â€Â¨ kotlin-build-resolver Ã¤Â»Â£Ã§Ââ€ Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã£â‚¬ÂÃ§Â²Â¾Ã¥â€¡â€ Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤ÂÃ£â‚¬â€š
---

# Kotlin Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â¸Å½Ã¤Â¿Â®Ã¥Â¤Â

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


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨ **kotlin-build-resolver** Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å’Ã¤Â»Â¥Ã¦Å“â‚¬Ã¥Â°ÂÃ§Å¡â€žÃ¦â€Â¹Ã¥Å Â¨Ã¥Â¢Å¾Ã©â€¡ÂÃ¤Â¿Â®Ã¥Â¤Â Kotlin Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¯Å Ã¦â€“Â­**Ã¯Â¼Å¡Ã¦â€°Â§Ã¨Â¡Å’ `./gradlew build`Ã£â‚¬Â`detekt`Ã£â‚¬Â`ktlintCheck`
2. **Ã¨Â§Â£Ã¦Å¾ÂÃ©â€â„¢Ã¨Â¯Â¯**Ã¯Â¼Å¡Ã¦Å’â€°Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Ë†â€ Ã§Â»â€žÃ¥Â¹Â¶Ã¦Å’â€°Ã¤Â¸Â¥Ã©â€¡ÂÃ¦â‚¬Â§Ã¦Å½â€™Ã¥ÂºÂ
3. **Ã¥Â¢Å¾Ã©â€¡ÂÃ¤Â¿Â®Ã¥Â¤Â**Ã¯Â¼Å¡Ã¦Â¯ÂÃ¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ©â€â„¢Ã¨Â¯Â¯
4. **Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¯ÂÃ¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤Â**Ã¯Â¼Å¡Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Å¾â€žÃ¥Â»Âº
5. **Ã¦Å Â¥Ã¥â€˜Å Ã¦â€˜ËœÃ¨Â¦Â**Ã¯Â¼Å¡Ã¦ËœÂ¾Ã§Â¤ÂºÃ¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã¥â€™Å’Ã¥â€°Â©Ã¤Â½â„¢Ã©â€”Â®Ã©Â¢Ëœ

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â½Â¿Ã§â€Â¨ `/kotlin-build`Ã¯Â¼Å¡

* `./gradlew build` Ã¥â€ºÂ Ã©â€â„¢Ã¨Â¯Â¯Ã¨â‚¬Å’Ã¥Â¤Â±Ã¨Â´Â¥
* Kotlin Ã§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã¦Å Â¥Ã¥â€˜Å Ã©â€â„¢Ã¨Â¯Â¯
* `./gradlew detekt` Ã¦Å Â¥Ã¥â€˜Å Ã¨Â¿ÂÃ¨Â§â€ž
* Gradle Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¨Â§Â£Ã¦Å¾ÂÃ¥Â¤Â±Ã¨Â´Â¥
* Ã¦â€¹â€°Ã¥Ââ€“Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã¥Â¯Â¼Ã¨â€¡Â´Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â¤Â±Ã¨Â´Â¥

## Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¨Â¯Å Ã¦â€“Â­Ã¥â€˜Â½Ã¤Â»Â¤

```bash
# Primary build check
./gradlew build 2>&1

# Static analysis
./gradlew detekt 2>&1 || echo "detekt not configured"
./gradlew ktlintCheck 2>&1 || echo "ktlint not configured"

# Dependency issues
./gradlew dependencies --configuration runtimeClasspath 2>&1 | head -100

# Optional deep refresh when caches or dependency metadata are suspect
./gradlew build --refresh-dependencies
```

## Ã§Â¤ÂºÃ¤Â¾â€¹Ã¤Â¼Å¡Ã¨Â¯Â

````text
User: /kotlin-build

Agent:
# Kotlin Build Resolution

## Initial Diagnostics

```bash
$ ./gradlew build
e: src/main/kotlin/com/example/service/UserService.kt:25:15 Unresolved reference: UserRepository
e: src/main/kotlin/com/example/routes/UserRoutes.kt:42:9 Type mismatch: inferred type is String but Int was expected
e: src/main/kotlin/com/example/routes/UserRoutes.kt:58:5 'when' expression must be exhaustive
```

Errors found: 3

## Fix 1: Unresolved Reference

File: src/main/kotlin/com/example/service/UserService.kt:25
Error: Unresolved reference: UserRepository
Cause: Missing import

```kotlin
// Added import
import com.example.repository.UserRepository
```

```bash
$ ./gradlew build
# 2 errors remaining
```

## Fix 2: Type Mismatch

File: src/main/kotlin/com/example/routes/UserRoutes.kt:42
Error: Type mismatch: inferred type is String but Int was expected

```kotlin
// Changed
val count = call.parameters["count"]
// To
val count = call.parameters["count"]?.toIntOrNull()
    ?: return@get call.respond(HttpStatusCode.BadRequest, "Invalid count")
```

```bash
$ ./gradlew build
# 1 error remaining
```

## Fix 3: Non-Exhaustive When

File: src/main/kotlin/com/example/routes/UserRoutes.kt:58
Error: 'when' expression must be exhaustive

```kotlin
// Added missing branch
when (user.role) {
    Role.ADMIN -> handleAdmin(user)
    Role.USER -> handleUser(user)
    Role.MODERATOR -> handleModerator(user) // Added
}
```

```bash
$ ./gradlew build
# Build successful!
```

## Final Verification

```bash
$ ./gradlew detekt
# No issues

$ ./gradlew test
# All tests passed
```

## Summary

| Metric | Count |
|--------|-------|
| Build errors fixed | 3 |
| Detekt issues fixed | 0 |
| Files modified | 2 |
| Remaining issues | 0 |

Build Status: PASS: SUCCESS
````

## Ã¥Â¸Â¸Ã¨Â§ÂÃ§Å¡â€žÃ¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ©â€â„¢Ã¨Â¯Â¯

| Ã©â€â„¢Ã¨Â¯Â¯ | Ã¥â€¦Â¸Ã¥Å¾â€¹Ã¤Â¿Â®Ã¥Â¤ÂÃ¦â€“Â¹Ã¦Â³â€¢ |
|-------|-------------|
| `Unresolved reference: X` | Ã¦Â·Â»Ã¥Å Â Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¦Ë†â€“Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹ |
| `Type mismatch` | Ã¤Â¿Â®Ã¥Â¤ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¨Â½Â¬Ã¦ÂÂ¢Ã¦Ë†â€“Ã¨Âµâ€¹Ã¥â‚¬Â¼ |
| `'when' must be exhaustive` | Ã¦Â·Â»Ã¥Å Â Ã§Â¼ÂºÃ¥Â¤Â±Ã§Å¡â€žÃ¥Â¯â€ Ã¥Â°ÂÃ§Â±Â»Ã¥Ë†â€ Ã¦â€Â¯ |
| `Suspend function can only be called from coroutine` | Ã¦Â·Â»Ã¥Å Â  `suspend` Ã¤Â¿Â®Ã©Â¥Â°Ã§Â¬Â¦ |
| `Smart cast impossible` | Ã¤Â½Â¿Ã§â€Â¨Ã¥Â±â‚¬Ã©Æ’Â¨ `val` Ã¦Ë†â€“ `let` |
| `None of the following candidates is applicable` | Ã¤Â¿Â®Ã¥Â¤ÂÃ¥Ââ€šÃ¦â€¢Â°Ã§Â±Â»Ã¥Å¾â€¹ |
| `Could not resolve dependency` | Ã¤Â¿Â®Ã¥Â¤ÂÃ§â€°Ë†Ã¦Å“Â¬Ã¦Ë†â€“Ã¦Â·Â»Ã¥Å Â Ã¤Â»â€œÃ¥Âºâ€œ |

## Ã¤Â¿Â®Ã¥Â¤ÂÃ§Â­â€“Ã§â€¢Â¥

1. **Ã©Â¦â€“Ã¥â€¦Ë†Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯** - Ã¤Â»Â£Ã§Â ÂÃ¥Â¿â€¦Ã©Â¡Â»Ã¨Æ’Â½Ã¥Â¤Å¸Ã§Â¼â€“Ã¨Â¯â€˜
2. **Ã¥â€¦Â¶Ã¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤Â Detekt Ã¨Â¿ÂÃ¨Â§â€ž** - Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡ÂÃ©â€”Â®Ã©Â¢Ëœ
3. **Ã¥â€ ÂÃ¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤Â ktlint Ã¨Â­Â¦Ã¥â€˜Å ** - Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Â Â¼Ã¥Â¼ÂÃ©â€”Â®Ã©Â¢Ëœ
4. **Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Â¸â‚¬Ã¤Â¸Âª** - Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¯ÂÃ¦Â¬Â¡Ã¦â€ºÂ´Ã¦â€Â¹
5. **Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¦â€Â¹Ã¥Å Â¨** - Ã¤Â¸ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã©â€¡ÂÃ¦Å¾â€žÃ¯Â¼Å’Ã¤Â»â€¦Ã¤Â¿Â®Ã¥Â¤ÂÃ©â€”Â®Ã©Â¢Ëœ

## Ã¥ÂÅ“Ã¦Â­Â¢Ã¦ÂÂ¡Ã¤Â»Â¶

Ã¤Â»Â£Ã§Ââ€ Ã¥Â°â€ Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Â¹Â¶Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

* Ã¥ÂÅ’Ã¤Â¸â‚¬Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â°ÂÃ¨Â¯â€¢Ã¤Â¿Â®Ã¥Â¤Â 3 Ã¦Â¬Â¡Ã¥ÂÅ½Ã¤Â»ÂÃ§â€žÂ¶Ã¥Â­ËœÃ¥Å“Â¨
* Ã¤Â¿Â®Ã¥Â¤ÂÃ¥Â¼â€¢Ã¥â€¦Â¥Ã¤Âºâ€ Ã¦â€ºÂ´Ã¥Â¤Å¡Ã©â€â„¢Ã¨Â¯Â¯
* Ã©Å“â‚¬Ã¨Â¦ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã¦Å¾Â¶Ã¦Å¾â€žÃ¦â‚¬Â§Ã¦â€ºÂ´Ã¦â€Â¹
* Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹

## Ã§â€ºÂ¸Ã¥â€¦Â³Ã¥â€˜Â½Ã¤Â»Â¤

* `/kotlin-test` - Ã¦Å¾â€žÃ¥Â»ÂºÃ¦Ë†ÂÃ¥Å Å¸Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
* `/kotlin-review` - Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡Â
* `/verify` - Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

## Ã§â€ºÂ¸Ã¥â€¦Â³

* Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å¡`agents/kotlin-build-resolver.md`
* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/kotlin-patterns/`
