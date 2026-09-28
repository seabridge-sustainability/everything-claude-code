---
paths:
  - "**/*.kt"
  - "**/*.kts"
---

# Kotlin Ã¥Â®â€°Ã¥â€¦Â¨

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
