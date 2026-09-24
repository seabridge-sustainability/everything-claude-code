---
paths:
  - "**/*.kt"
  - "**/*.kts"
---
# Kotlin Security

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


> This file extends [common/security.md](../common/security.md) with Kotlin and Android/KMP-specific content.

## Secrets Management

- Never hardcode API keys, tokens, or credentials in source code
- Use `local.properties` (git-ignored) for local development secrets
- Use `BuildConfig` fields generated from CI secrets for release builds
- Use `EncryptedSharedPreferences` (Android) or Keychain (iOS) for runtime secret storage

```kotlin
// BAD
val apiKey = "sk-abc123..."

// GOOD Ã¢â‚¬â€ from BuildConfig (generated at build time)
val apiKey = BuildConfig.API_KEY

// GOOD Ã¢â‚¬â€ from secure storage at runtime
val token = secureStorage.get("auth_token")
```

## Network Security

- Use HTTPS exclusively Ã¢â‚¬â€ configure `network_security_config.xml` to block cleartext
- Pin certificates for sensitive endpoints using OkHttp `CertificatePinner` or Ktor equivalent
- Set timeouts on all HTTP clients Ã¢â‚¬â€ never leave defaults (which may be infinite)
- Validate and sanitize all server responses before use

```xml
<!-- res/xml/network_security_config.xml -->
<network-security-config>
    <base-config cleartextTrafficPermitted="false" />
</network-security-config>
```

## Input Validation

- Validate all user input before processing or sending to API
- Use parameterized queries for Room/SQLDelight Ã¢â‚¬â€ never concatenate user input into SQL
- Sanitize file paths from user input to prevent path traversal

```kotlin
// BAD Ã¢â‚¬â€ SQL injection
@Query("SELECT * FROM items WHERE name = '$input'")

// GOOD Ã¢â‚¬â€ parameterized
@Query("SELECT * FROM items WHERE name = :input")
fun findByName(input: String): List<ItemEntity>
```

## Data Protection

- Use `EncryptedSharedPreferences` for sensitive key-value data on Android
- Use `@Serializable` with explicit field names Ã¢â‚¬â€ don't leak internal property names
- Clear sensitive data from memory when no longer needed
- Use `@Keep` or ProGuard rules for serialized classes to prevent name mangling

## Authentication

- Store tokens in secure storage, not in plain SharedPreferences
- Implement token refresh with proper 401/403 handling
- Clear all auth state on logout (tokens, cached user data, cookies)
- Use biometric authentication (`BiometricPrompt`) for sensitive operations

## ProGuard / R8

- Keep rules for all serialized models (`@Serializable`, Gson, Moshi)
- Keep rules for reflection-based libraries (Koin, Retrofit)
- Test release builds Ã¢â‚¬â€ obfuscation can break serialization silently

## WebView Security

- Disable JavaScript unless explicitly needed: `settings.javaScriptEnabled = false`
- Validate URLs before loading in WebView
- Never expose `@JavascriptInterface` methods that access sensitive data
- Use `WebViewClient.shouldOverrideUrlLoading()` to control navigation
