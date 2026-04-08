---
description: "Kotlin security extending common rules"
globs: ["**/*.kt", "**/*.kts", "**/build.gradle.kts"]
alwaysApply: false
---
# Kotlin Security

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> This file extends the common security rule with Kotlin-specific content.

## Secret Management

```kotlin
val apiKey = System.getenv("API_KEY")
    ?: throw IllegalStateException("API_KEY not configured")
```

## SQL Injection Prevention

Always use Exposed's parameterized queries:

```kotlin
// Good: Parameterized via Exposed DSL
UsersTable.selectAll().where { UsersTable.email eq email }

// Bad: String interpolation in raw SQL
exec("SELECT * FROM users WHERE email = '$email'")
```

## Authentication

Use Ktor's Auth plugin with JWT:

```kotlin
install(Authentication) {
    jwt("jwt") {
        verifier(
            JWT.require(Algorithm.HMAC256(secret))
                .withAudience(audience)
                .withIssuer(issuer)
                .build()
        )
        validate { credential ->
            val payload = credential.payload
            if (payload.audience.contains(audience) &&
                payload.issuer == issuer &&
                payload.subject != null) {
                JWTPrincipal(payload)
            } else {
                null
            }
        }
    }
}
```

## Null Safety as Security

Kotlin's type system prevents null-related vulnerabilities -- avoid `!!` to maintain this guarantee.
