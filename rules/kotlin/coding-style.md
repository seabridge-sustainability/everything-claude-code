---
paths:
  - "**/*.kt"
  - "**/*.kts"
---
# Kotlin Coding Style

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


> This file extends [common/coding-style.md](../common/coding-style.md) with Kotlin-specific content.

## Formatting

- **ktlint** or **Detekt** for style enforcement
- Official Kotlin code style (`kotlin.code.style=official` in `gradle.properties`)

## Immutability

- Prefer `val` over `var` Ã¢â‚¬â€ default to `val` and only use `var` when mutation is required
- Use `data class` for value types; use immutable collections (`List`, `Map`, `Set`) in public APIs
- Copy-on-write for state updates: `state.copy(field = newValue)`

## Naming

Follow Kotlin conventions:
- `camelCase` for functions and properties
- `PascalCase` for classes, interfaces, objects, and type aliases
- `SCREAMING_SNAKE_CASE` for constants (`const val` or `@JvmStatic`)
- Prefix interfaces with behavior, not `I`: `Clickable` not `IClickable`

## Null Safety

- Never use `!!` Ã¢â‚¬â€ prefer `?.`, `?:`, `requireNotNull()`, or `checkNotNull()`
- Use `?.let {}` for scoped null-safe operations
- Return nullable types from functions that can legitimately have no result

```kotlin
// BAD
val name = user!!.name

// GOOD
val name = user?.name ?: "Unknown"
val name = requireNotNull(user) { "User must be set before accessing name" }.name
```

## Sealed Types

Use sealed classes/interfaces to model closed state hierarchies:

```kotlin
sealed interface UiState<out T> {
    data object Loading : UiState<Nothing>
    data class Success<T>(val data: T) : UiState<T>
    data class Error(val message: String) : UiState<Nothing>
}
```

Always use exhaustive `when` with sealed types Ã¢â‚¬â€ no `else` branch.

## Extension Functions

Use extension functions for utility operations, but keep them discoverable:
- Place in a file named after the receiver type (`StringExt.kt`, `FlowExt.kt`)
- Keep scope limited Ã¢â‚¬â€ don't add extensions to `Any` or overly generic types

## Scope Functions

Use the right scope function:
- `let` Ã¢â‚¬â€ null check + transform: `user?.let { greet(it) }`
- `run` Ã¢â‚¬â€ compute a result using receiver: `service.run { fetch(config) }`
- `apply` Ã¢â‚¬â€ configure an object: `builder.apply { timeout = 30 }`
- `also` Ã¢â‚¬â€ side effects: `result.also { log(it) }`
- Avoid deep nesting of scope functions (max 2 levels)

## Error Handling

- Use `Result<T>` or custom sealed types
- Use `runCatching {}` for wrapping throwable code
- Never catch `CancellationException` Ã¢â‚¬â€ always rethrow it
- Avoid `try-catch` for control flow

```kotlin
// BAD Ã¢â‚¬â€ using exceptions for control flow
val user = try { repository.getUser(id) } catch (e: NotFoundException) { null }

// GOOD Ã¢â‚¬â€ nullable return
val user: User? = repository.findUser(id)
```
