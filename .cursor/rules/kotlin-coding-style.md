---
description: "Kotlin coding style extending common rules"
globs: ["**/*.kt", "**/*.kts", "**/build.gradle.kts"]
alwaysApply: false
---
# Kotlin Coding Style

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> This file extends the common coding style rule with Kotlin-specific content.

## Formatting

- Auto-formatting via **ktfmt** or **ktlint** (configured in `kotlin-hooks.md`)
- Use trailing commas in multiline declarations

## Immutability

The global immutability requirement is enforced in the common coding style rule.
For Kotlin specifically:

- Prefer `val` over `var`
- Use immutable collection types (`List`, `Map`, `Set`)
- Use `data class` with `copy()` for immutable updates

## Null Safety

- Avoid `!!` -- use `?.`, `?:`, `require`, or `checkNotNull`
- Handle platform types explicitly at Java interop boundaries

## Expression Bodies

Prefer expression bodies for single-expression functions:

```kotlin
fun isAdult(age: Int): Boolean = age >= 18
```

## Reference

See skill: `kotlin-patterns` for comprehensive Kotlin idioms and patterns.
