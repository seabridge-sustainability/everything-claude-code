---
description: Ã¤Â¿Â®Ã¥Â¤Â Android Ã¥â€™Å’ KMP Ã©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€ž Gradle Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯
---

# Gradle Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â¿Â®Ã¥Â¤Â

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


Ã©â‚¬ÂÃ¦Â­Â¥Ã¤Â¿Â®Ã¥Â¤Â Android Ã¥â€™Å’ Kotlin Ã¥Â¤Å¡Ã¥Â¹Â³Ã¥ÂÂ°Ã©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€ž Gradle Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â€™Å’Ã§Â¼â€“Ã¨Â¯â€˜Ã©â€â„¢Ã¨Â¯Â¯Ã£â‚¬â€š

## Ã¦Â­Â¥Ã©ÂªÂ¤ 1Ã¯Â¼Å¡Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€¦ÂÃ§Â½Â®

Ã¨Â¯â€ Ã¥Ë†Â«Ã©Â¡Â¹Ã§â€ºÂ®Ã§Â±Â»Ã¥Å¾â€¹Ã¥Â¹Â¶Ã¨Â¿ÂÃ¨Â¡Å’Ã§â€ºÂ¸Ã¥Âºâ€Ã§Å¡â€žÃ¦Å¾â€žÃ¥Â»ÂºÃ¯Â¼Å¡

| Ã¦Å’â€¡Ã§Â¤ÂºÃ§Â¬Â¦ | Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â€˜Â½Ã¤Â»Â¤ |
|-----------|---------------|
| `build.gradle.kts` + `composeApp/` (KMP) | `./gradlew composeApp:compileKotlinMetadata 2>&1` |
| `build.gradle.kts` + `app/` (Android) | `./gradlew app:compileDebugKotlin 2>&1` |
| `settings.gradle.kts` Ã¥Å’â€¦Ã¥ÂÂ«Ã¦Â¨Â¡Ã¥Ââ€” | `./gradlew assemble 2>&1` |
| Ã©â€¦ÂÃ§Â½Â®Ã¤Âºâ€  Detekt | `./gradlew detekt 2>&1` |

Ã¥ÂÅ’Ã¦â€”Â¶Ã¦Â£â‚¬Ã¦Å¸Â¥ `gradle.properties` Ã¥â€™Å’ `local.properties` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã©â€¦ÂÃ§Â½Â®Ã¤Â¿Â¡Ã¦ÂÂ¯Ã£â‚¬â€š

## Ã¦Â­Â¥Ã©ÂªÂ¤ 2Ã¯Â¼Å¡Ã¨Â§Â£Ã¦Å¾ÂÃ¥Â¹Â¶Ã¥Ë†â€ Ã§Â»â€žÃ©â€â„¢Ã¨Â¯Â¯

1. Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â€˜Â½Ã¤Â»Â¤Ã¥Â¹Â¶Ã¦Ââ€¢Ã¨Å½Â·Ã¨Â¾â€œÃ¥â€¡Âº
2. Ã¥Â°â€  Kotlin Ã§Â¼â€“Ã¨Â¯â€˜Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¸Å½ Gradle Ã©â€¦ÂÃ§Â½Â®Ã©â€â„¢Ã¨Â¯Â¯Ã¥Ë†â€ Ã¥Â¼â‚¬
3. Ã¦Å’â€°Ã¦Â¨Â¡Ã¥Ââ€”Ã¥â€™Å’Ã¦â€“â€¡Ã¤Â»Â¶Ã¨Â·Â¯Ã¥Â¾â€žÃ¥Ë†â€ Ã§Â»â€ž
4. Ã¦Å½â€™Ã¥ÂºÂÃ¯Â¼Å¡Ã¥â€¦Ë†Ã¥Â¤â€žÃ§Ââ€ Ã©â€¦ÂÃ§Â½Â®Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¦Å’â€°Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡ÂºÃ¥ÂºÂÃ¥Â¤â€žÃ§Ââ€ Ã§Â¼â€“Ã¨Â¯â€˜Ã©â€â„¢Ã¨Â¯Â¯

## Ã¦Â­Â¥Ã©ÂªÂ¤ 3Ã¯Â¼Å¡Ã¤Â¿Â®Ã¥Â¤ÂÃ¥Â¾ÂªÃ§Å½Â¯

Ã©â€™Ë†Ã¥Â¯Â¹Ã¦Â¯ÂÃ¤Â¸ÂªÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡

1. **Ã¨Â¯Â»Ã¥Ââ€“Ã¦â€“â€¡Ã¤Â»Â¶** Ã¢â‚¬â€ Ã©â€â„¢Ã¨Â¯Â¯Ã¨Â¡Å’Ã¥â€˜Â¨Ã¥â€ºÂ´Ã§Å¡â€žÃ¥Â®Å’Ã¦â€¢Â´Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
2. **Ã¨Â¯Å Ã¦â€“Â­** Ã¢â‚¬â€ Ã¥Â¸Â¸Ã¨Â§ÂÃ§Â±Â»Ã¥Ë†Â«Ã¯Â¼Å¡
   * Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¦Ë†â€“Ã¦â€”Â Ã¦Â³â€¢Ã¨Â§Â£Ã¦Å¾ÂÃ§Å¡â€žÃ¥Â¼â€¢Ã§â€Â¨
   * Ã§Â±Â»Ã¥Å¾â€¹Ã¤Â¸ÂÃ¥Å’Â¹Ã©â€¦ÂÃ¦Ë†â€“Ã¤Â¸ÂÃ¥â€¦Â¼Ã¥Â®Â¹Ã§Å¡â€žÃ§Â±Â»Ã¥Å¾â€¹
   * `build.gradle.kts` Ã¤Â¸Â­Ã§Â¼ÂºÃ¥Â°â€˜Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹
   * Expect/actual Ã¤Â¸ÂÃ¥Å’Â¹Ã©â€¦Â (KMP)
   * Compose Ã§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã©â€â„¢Ã¨Â¯Â¯
3. **Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¤Â¿Â®Ã¥Â¤Â** Ã¢â‚¬â€ Ã¨Â§Â£Ã¥â€ Â³Ã©â€â„¢Ã¨Â¯Â¯Ã¦â€°â‚¬Ã©Å“â‚¬Ã§Å¡â€žÃ¦Å“â‚¬Ã¥Â°ÂÃ¦â€Â¹Ã¥Å Â¨
4. **Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Å¾â€žÃ¥Â»Âº** Ã¢â‚¬â€ Ã©ÂªÅ’Ã¨Â¯ÂÃ¤Â¿Â®Ã¥Â¤ÂÃ¥Â¹Â¶Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦â€“Â°Ã©â€â„¢Ã¨Â¯Â¯
5. **Ã§Â»Â§Ã§Â»Â­** Ã¢â‚¬â€ Ã¥Â¤â€žÃ§Ââ€ Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ©â€â„¢Ã¨Â¯Â¯

## Ã¦Â­Â¥Ã©ÂªÂ¤ 4Ã¯Â¼Å¡Ã©ËœÂ²Ã¦Å Â¤Ã¦Å½ÂªÃ¦â€“Â½

Ã¥Â¦â€šÃ¦Å¾Å“Ã¥â€¡ÂºÃ§Å½Â°Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Å’Ã¨Â¯Â·Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Â¹Â¶Ã¨Â¯Â¢Ã©â€”Â®Ã§â€Â¨Ã¦Ë†Â·Ã¯Â¼Å¡

* Ã¤Â¿Â®Ã¥Â¤ÂÃ¥Â¼â€¢Ã¥â€¦Â¥Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¦Â¯â€Ã¨Â§Â£Ã¥â€ Â³Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤Å¡
* Ã¥ÂÅ’Ã¤Â¸â‚¬Ã©â€â„¢Ã¨Â¯Â¯Ã¥Å“Â¨ 3 Ã¦Â¬Â¡Ã¥Â°ÂÃ¨Â¯â€¢Ã¥ÂÅ½Ã¤Â»ÂÃ§â€žÂ¶Ã¥Â­ËœÃ¥Å“Â¨
* Ã©â€â„¢Ã¨Â¯Â¯Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Â·Â»Ã¥Å Â Ã¦â€“Â°Ã§Å¡â€žÃ¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¦Ë†â€“Ã¦â€ºÂ´Ã¦â€Â¹Ã¦Â¨Â¡Ã¥Ââ€”Ã§Â»â€œÃ¦Å¾â€ž
* Gradle Ã¥ÂÅ’Ã¦Â­Â¥Ã¦Å“Â¬Ã¨ÂºÂ«Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Ë†Ã©â€¦ÂÃ§Â½Â®Ã©ËœÂ¶Ã¦Â®ÂµÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼â€°
* Ã©â€â„¢Ã¨Â¯Â¯Ã¥â€¡ÂºÃ§Å½Â°Ã¥Å“Â¨Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¯Â¼Ë†RoomÃ£â‚¬ÂSQLDelightÃ£â‚¬ÂKSPÃ¯Â¼â€°

## Ã¦Â­Â¥Ã©ÂªÂ¤ 5Ã¯Â¼Å¡Ã¦â‚¬Â»Ã§Â»â€œ

Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

* Ã¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Ë†Ã¦Â¨Â¡Ã¥Ââ€”Ã£â‚¬ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã£â‚¬ÂÃ¦ÂÂÃ¨Â¿Â°Ã¯Â¼â€°
* Ã¥â€°Â©Ã¤Â½â„¢Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯
* Ã¥Â¼â€¢Ã¥â€¦Â¥Ã§Å¡â€žÃ¦â€“Â°Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Ë†Ã¥Âºâ€Ã¤Â¸ÂºÃ©â€ºÂ¶Ã¯Â¼â€°
* Ã¥Â»ÂºÃ¨Â®Â®Ã§Å¡â€žÃ¥ÂÅ½Ã§Â»Â­Ã¦Â­Â¥Ã©ÂªÂ¤

## Ã¥Â¸Â¸Ã¨Â§ÂÃ§Å¡â€ž Gradle/KMP Ã¤Â¿Â®Ã¥Â¤ÂÃ¦â€“Â¹Ã¦Â¡Ë†

| Ã©â€â„¢Ã¨Â¯Â¯ | Ã¤Â¿Â®Ã¥Â¤ÂÃ¦â€“Â¹Ã¦Â³â€¢ |
|-------|-----|
| `commonMain` Ã¤Â¸Â­Ã¦â€”Â Ã¦Â³â€¢Ã¨Â§Â£Ã¦Å¾ÂÃ§Å¡â€žÃ¥Â¼â€¢Ã§â€Â¨ | Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥Å“Â¨ `commonMain.dependencies {}` Ã¤Â¸Â­ |
| Expect Ã¥Â£Â°Ã¦ËœÅ½Ã¦Â²Â¡Ã¦Å“â€° actual Ã¥Â®Å¾Ã§Å½Â° | Ã¥Å“Â¨Ã¦Â¯ÂÃ¤Â¸ÂªÃ¥Â¹Â³Ã¥ÂÂ°Ã¦ÂºÂÃ§Â ÂÃ©â€ºâ€ Ã¤Â¸Â­Ã¦Â·Â»Ã¥Å Â  `actual` Ã¥Â®Å¾Ã§Å½Â° |
| Compose Ã§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã§â€°Ë†Ã¦Å“Â¬Ã¤Â¸ÂÃ¥Å’Â¹Ã©â€¦Â | Ã¥Å“Â¨ `libs.versions.toml` Ã¤Â¸Â­Ã§Â»Å¸Ã¤Â¸â‚¬ Kotlin Ã¥â€™Å’ Compose Ã§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã§â€°Ë†Ã¦Å“Â¬ |
| Ã©â€¡ÂÃ¥Â¤ÂÃ§Â±Â» | Ã¤Â½Â¿Ã§â€Â¨ `./gradlew dependencies` Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥Â­ËœÃ¥Å“Â¨Ã¥â€ Â²Ã§ÂªÂÃ§Å¡â€žÃ¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹ |
| KSP Ã©â€â„¢Ã¨Â¯Â¯ | Ã¨Â¿ÂÃ¨Â¡Å’ `./gradlew kspCommonMainKotlinMetadata` Ã©â€¡ÂÃ¦â€“Â°Ã§â€Å¸Ã¦Ë†Â |
| Ã©â€¦ÂÃ§Â½Â®Ã§Â¼â€œÃ¥Â­ËœÃ©â€”Â®Ã©Â¢Ëœ | Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥Â­ËœÃ¥Å“Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“Ã§Å¡â€žÃ¤Â»Â»Ã¥Å Â¡Ã¨Â¾â€œÃ¥â€¦Â¥ |
