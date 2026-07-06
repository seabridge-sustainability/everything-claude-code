---
paths:
  - "**/*.kt"
  - "**/*.kts"
---

# Kotlin Ã¥Â®â€°Ã¥â€¦Â¨

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å¸ÂºÃ¤ÂºÅ½ [common/security.md](../common/security.md)Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  Kotlin Ã¥â€™Å’ Android/KMP Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ 

* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨Ã¦ÂºÂÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã§Â¡Â¬Ã§Â¼â€“Ã§Â Â API Ã¥Â¯â€ Ã©â€™Â¥Ã£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’Ã¦Ë†â€“Ã¥â€¡Â­Ã¦ÂÂ®
* Ã¦Å“Â¬Ã¥Å“Â°Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦â€”Â¶Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `local.properties`Ã¯Â¼Ë†Ã¥Â·Â²Ã©â‚¬Å¡Ã¨Â¿â€¡ git Ã¥Â¿Â½Ã§â€¢Â¥Ã¯Â¼â€°Ã¦ÂÂ¥Ã§Â®Â¡Ã§Ââ€ Ã¥Â¯â€ Ã©â€™Â¥
* Ã¥Ââ€˜Ã¥Â¸Æ’Ã§â€°Ë†Ã¦Å“Â¬Ã¤Â¸Â­Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã§â€Â± CI Ã¥Â¯â€ Ã©â€™Â¥Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€ž `BuildConfig` Ã¥Â­â€”Ã¦Â®Âµ
* Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã¥Â¯â€ Ã©â€™Â¥Ã¥Â­ËœÃ¥â€šÂ¨Ã¤Â½Â¿Ã§â€Â¨ `EncryptedSharedPreferences`Ã¯Â¼Ë†AndroidÃ¯Â¼â€°Ã¦Ë†â€“ KeychainÃ¯Â¼Ë†iOSÃ¯Â¼â€°

```kotlin
// BAD
val apiKey = "sk-abc123..."

// GOOD Ã¢â‚¬â€ from BuildConfig (generated at build time)
val apiKey = BuildConfig.API_KEY

// GOOD Ã¢â‚¬â€ from secure storage at runtime
val token = secureStorage.get("auth_token")
```

## Ã§Â½â€˜Ã§Â»Å“Ã¥Â®â€°Ã¥â€¦Â¨

* Ã¤Â»â€¦Ã¤Â½Â¿Ã§â€Â¨ HTTPS Ã¢â‚¬â€Ã¢â‚¬â€ Ã©â€¦ÂÃ§Â½Â® `network_security_config.xml` Ã¤Â»Â¥Ã©ËœÂ»Ã¦Â­Â¢Ã¦ËœÅ½Ã¦â€“â€¡Ã¤Â¼Â Ã¨Â¾â€œ
* Ã¤Â½Â¿Ã§â€Â¨ OkHttp Ã§Å¡â€ž `CertificatePinner` Ã¦Ë†â€“ Ktor Ã§Å¡â€žÃ§Â­â€°Ã¦â€¢Ë†Ã¥Å Å¸Ã¨Æ’Â½Ã¤Â¸ÂºÃ¦â€¢ÂÃ¦â€žÅ¸Ã§Â«Â¯Ã§â€šÂ¹Ã¥â€ºÂºÃ¥Â®Å¡Ã¨Â¯ÂÃ¤Â¹Â¦
* Ã¤Â¸ÂºÃ¦â€°â‚¬Ã¦Å“â€° HTTP Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã¨Â®Â¾Ã§Â½Â®Ã¨Â¶â€¦Ã¦â€”Â¶ Ã¢â‚¬â€Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¤Â½Â¿Ã§â€Â¨Ã©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Â¼Ã¯Â¼Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â¸ÂºÃ¦â€”Â Ã©â„¢ÂÃ©â€¢Â¿Ã¯Â¼â€°
* Ã¥Å“Â¨Ã¤Â½Â¿Ã§â€Â¨Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¥â€œÂÃ¥Âºâ€Ã¥â€°ÂÃ¯Â¼Å’Ã¥â€¦Ë†Ã¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â€™Å’Ã¦Â¸â€¦Ã§Ââ€ 

```xml
<!-- res/xml/network_security_config.xml -->
<network-security-config>
    <base-config cleartextTrafficPermitted="false" />
</network-security-config>
```

## Ã¨Â¾â€œÃ¥â€¦Â¥Ã©ÂªÅ’Ã¨Â¯Â

* Ã¥Å“Â¨Ã¥Â¤â€žÃ§Ââ€ Ã¦Ë†â€“Ã¥Â°â€ Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¥Ââ€˜Ã©â‚¬ÂÃ¥Ë†Â° API Ã¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥
* Ã¥Â¯Â¹ Room/SQLDelight Ã¤Â½Â¿Ã§â€Â¨Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â¯Â¢ Ã¢â‚¬â€Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Â°â€ Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¦â€¹Â¼Ã¦Å½Â¥Ã¥Ë†Â° SQL Ã¨Â¯Â­Ã¥ÂÂ¥Ã¤Â¸Â­
* Ã¦Â¸â€¦Ã§Ââ€ Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¤Â¸Â­Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¨Â·Â¯Ã¥Â¾â€žÃ¯Â¼Å’Ã¤Â»Â¥Ã©ËœÂ²Ã¦Â­Â¢Ã¨Â·Â¯Ã¥Â¾â€žÃ©ÂÂÃ¥Å½â€ Ã¦â€Â»Ã¥â€¡Â»

```kotlin
// BAD Ã¢â‚¬â€ SQL injection
@Query("SELECT * FROM items WHERE name = '$input'")

// GOOD Ã¢â‚¬â€ parameterized
@Query("SELECT * FROM items WHERE name = :input")
fun findByName(input: String): List<ItemEntity>
```

## Ã¦â€¢Â°Ã¦ÂÂ®Ã¤Â¿ÂÃ¦Å Â¤

* Ã¥Å“Â¨ Android Ã¤Â¸Å Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `EncryptedSharedPreferences` Ã¥Â­ËœÃ¥â€šÂ¨Ã¦â€¢ÂÃ¦â€žÅ¸Ã©â€Â®Ã¥â‚¬Â¼Ã¦â€¢Â°Ã¦ÂÂ®
* Ã¤Â½Â¿Ã§â€Â¨ `@Serializable` Ã¥Â¹Â¶Ã¦ËœÅ½Ã§Â¡Â®Ã¦Å’â€¡Ã¥Â®Å¡Ã¥Â­â€”Ã¦Â®ÂµÃ¥ÂÂ Ã¢â‚¬â€Ã¢â‚¬â€ Ã¤Â¸ÂÃ¨Â¦ÂÃ¦Â³â€žÃ©Å“Â²Ã¥â€ â€¦Ã©Æ’Â¨Ã¥Â±Å¾Ã¦â‚¬Â§Ã¥ÂÂ
* Ã¦â€¢ÂÃ¦â€žÅ¸Ã¦â€¢Â°Ã¦ÂÂ®Ã¤Â¸ÂÃ¥â€ ÂÃ©Å“â‚¬Ã¨Â¦ÂÃ¦â€”Â¶Ã¯Â¼Å’Ã¤Â»Å½Ã¥â€ â€¦Ã¥Â­ËœÃ¤Â¸Â­Ã¦Â¸â€¦Ã©â„¢Â¤
* Ã¥Â¯Â¹Ã¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“Ã§Â±Â»Ã¤Â½Â¿Ã§â€Â¨ `@Keep` Ã¦Ë†â€“ ProGuard Ã¨Â§â€žÃ¥Ë†â„¢Ã¯Â¼Å’Ã¤Â»Â¥Ã©ËœÂ²Ã¦Â­Â¢Ã¥ÂÂÃ§Â§Â°Ã¦Â·Â·Ã¦Â·â€ 

## Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯Â

* Ã¥Â°â€ Ã¤Â»Â¤Ã§â€°Å’Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Å“Â¨Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Â­ËœÃ¥â€šÂ¨Ã¤Â¸Â­Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦â„¢Â®Ã©â‚¬Å¡Ã§Å¡â€ž SharedPreferences
* Ã¥Â®Å¾Ã§Å½Â°Ã¤Â»Â¤Ã§â€°Å’Ã¥Ë†Â·Ã¦â€“Â°Ã¦Å“ÂºÃ¥Ë†Â¶Ã¯Â¼Å’Ã¥Â¹Â¶Ã¦Â­Â£Ã§Â¡Â®Ã¥Â¤â€žÃ§Ââ€  401/403 Ã§Å Â¶Ã¦â‚¬ÂÃ§Â Â
* Ã©â‚¬â‚¬Ã¥â€¡ÂºÃ§â„¢Â»Ã¥Â½â€¢Ã¦â€”Â¶Ã¦Â¸â€¦Ã©â„¢Â¤Ã¦â€°â‚¬Ã¦Å“â€°Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Ë†Ã¤Â»Â¤Ã§â€°Å’Ã£â‚¬ÂÃ§Â¼â€œÃ¥Â­ËœÃ§Å¡â€žÃ§â€Â¨Ã¦Ë†Â·Ã¦â€¢Â°Ã¦ÂÂ®Ã£â‚¬ÂCookieÃ¯Â¼â€°
* Ã¥Â¯Â¹Ã¦â€¢ÂÃ¦â€žÅ¸Ã¦â€œÂÃ¤Â½Å“Ã¤Â½Â¿Ã§â€Â¨Ã§â€Å¸Ã§â€°Â©Ã§â€°Â¹Ã¥Â¾ÂÃ¨Â®Â¤Ã¨Â¯ÂÃ¯Â¼Ë†`BiometricPrompt`Ã¯Â¼â€°

## ProGuard / R8

* Ã¤Â¸ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¯Â¼Ë†`@Serializable`Ã£â‚¬ÂGsonÃ£â‚¬ÂMoshiÃ¯Â¼â€°Ã¤Â¿ÂÃ§â€¢â„¢Ã¨Â§â€žÃ¥Ë†â„¢
* Ã¤Â¸ÂºÃ¥Å¸ÂºÃ¤ÂºÅ½Ã¥ÂÂÃ¥Â°â€žÃ§Å¡â€žÃ¥Âºâ€œÃ¯Â¼Ë†KoinÃ£â‚¬ÂRetrofitÃ¯Â¼â€°Ã¤Â¿ÂÃ§â€¢â„¢Ã¨Â§â€žÃ¥Ë†â„¢
* Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Ââ€˜Ã¥Â¸Æ’Ã§â€°Ë†Ã¦Å“Â¬ Ã¢â‚¬â€Ã¢â‚¬â€ Ã¦Â·Â·Ã¦Â·â€ Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â¼Å¡Ã©Ââ„¢Ã©Â»ËœÃ¥Å“Â°Ã§Â Â´Ã¥ÂÂÃ¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“

## WebView Ã¥Â®â€°Ã¥â€¦Â¨

* Ã©â„¢Â¤Ã©ÂÅ¾Ã¦ËœÅ½Ã§Â¡Â®Ã©Å“â‚¬Ã¨Â¦ÂÃ¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã§Â¦ÂÃ§â€Â¨ JavaScriptÃ¯Â¼Å¡`settings.javaScriptEnabled = false`
* Ã¥Å“Â¨ WebView Ã¤Â¸Â­Ã¥Å Â Ã¨Â½Â½ URL Ã¥â€°ÂÃ¯Â¼Å’Ã¥â€¦Ë†Ã¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯Â
* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¦Å¡Â´Ã©Å“Â²Ã¨Â®Â¿Ã©â€”Â®Ã¦â€¢ÂÃ¦â€žÅ¸Ã¦â€¢Â°Ã¦ÂÂ®Ã§Å¡â€ž `@JavascriptInterface` Ã¦â€“Â¹Ã¦Â³â€¢
* Ã¤Â½Â¿Ã§â€Â¨ `WebViewClient.shouldOverrideUrlLoading()` Ã¦ÂÂ¥Ã¦Å½Â§Ã¥Ë†Â¶Ã¥Â¯Â¼Ã¨Ë†Âª
