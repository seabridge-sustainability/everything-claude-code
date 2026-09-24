---
paths:
  - "**/*.kt"
  - "**/*.kts"
---
# Kotlin Testing

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


> This file extends [common/testing.md](../common/testing.md) with Kotlin and Android/KMP-specific content.

## Test Framework

- **kotlin.test** for multiplatform (KMP) Ã¢â‚¬â€ `@Test`, `assertEquals`, `assertTrue`
- **JUnit 4/5** for Android-specific tests
- **Turbine** for testing Flows and StateFlow
- **kotlinx-coroutines-test** for coroutine testing (`runTest`, `TestDispatcher`)

## ViewModel Testing with Turbine

```kotlin
@Test
fun `loading state emitted then data`() = runTest {
    val repo = FakeItemRepository()
    repo.addItem(testItem)
    val viewModel = ItemListViewModel(GetItemsUseCase(repo))

    viewModel.state.test {
        assertEquals(ItemListState(), awaitItem())     // initial state
        viewModel.onEvent(ItemListEvent.Load)
        assertTrue(awaitItem().isLoading)               // loading
        assertEquals(listOf(testItem), awaitItem().items) // loaded
    }
}
```

## Fakes Over Mocks

Prefer hand-written fakes over mocking frameworks:

```kotlin
class FakeItemRepository : ItemRepository {
    private val items = mutableListOf<Item>()
    var fetchError: Throwable? = null

    override suspend fun getAll(): Result<List<Item>> {
        fetchError?.let { return Result.failure(it) }
        return Result.success(items.toList())
    }

    override fun observeAll(): Flow<List<Item>> = flowOf(items.toList())

    fun addItem(item: Item) { items.add(item) }
}
```

## Coroutine Testing

```kotlin
@Test
fun `parallel operations complete`() = runTest {
    val repo = FakeRepository()
    val result = loadDashboard(repo)
    advanceUntilIdle()
    assertNotNull(result.items)
    assertNotNull(result.stats)
}
```

Use `runTest` Ã¢â‚¬â€ it auto-advances virtual time and provides `TestScope`.

## Ktor MockEngine

```kotlin
val mockEngine = MockEngine { request ->
    when (request.url.encodedPath) {
        "/api/items" -> respond(
            content = Json.encodeToString(testItems),
            headers = headersOf(HttpHeaders.ContentType, ContentType.Application.Json.toString())
        )
        else -> respondError(HttpStatusCode.NotFound)
    }
}

val client = HttpClient(mockEngine) {
    install(ContentNegotiation) { json() }
}
```

## Room/SQLDelight Testing

- Room: Use `Room.inMemoryDatabaseBuilder()` for in-memory testing
- SQLDelight: Use `JdbcSqliteDriver(JdbcSqliteDriver.IN_MEMORY)` for JVM tests

```kotlin
@Test
fun `insert and query items`() = runTest {
    val driver = JdbcSqliteDriver(JdbcSqliteDriver.IN_MEMORY)
    Database.Schema.create(driver)
    val db = Database(driver)

    db.itemQueries.insert("1", "Sample Item", "description")
    val items = db.itemQueries.getAll().executeAsList()
    assertEquals(1, items.size)
}
```

## Test Naming

Use backtick-quoted descriptive names:

```kotlin
@Test
fun `search with empty query returns all items`() = runTest { }

@Test
fun `delete item emits updated list without deleted item`() = runTest { }
```

## Test Organization

```
src/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ commonTest/kotlin/     # Shared tests (ViewModel, UseCase, Repository)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ androidUnitTest/kotlin/ # Android unit tests (JUnit)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ androidInstrumentedTest/kotlin/  # Instrumented tests (Room, UI)
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ iosTest/kotlin/        # iOS-specific tests
```

Minimum test coverage: ViewModel + UseCase for every feature.
