---
paths:
  - "**/*.kt"
  - "**/*.kts"
---

# Kotlin Ã¦Âµâ€¹Ã¨Â¯â€¢

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  [common/testing.md](../common/testing.md)Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  Kotlin Ã¥â€™Å’ Android/KMP Ã§â€°Â¹Ã¦Å“â€°Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¡â€ Ã¦Å¾Â¶

* **kotlin.test** Ã§â€Â¨Ã¤ÂºÅ½Ã¨Â·Â¨Ã¥Â¹Â³Ã¥ÂÂ° (KMP) Ã¢â‚¬â€ `@Test`, `assertEquals`, `assertTrue`
* **JUnit 4/5** Ã§â€Â¨Ã¤ÂºÅ½ Android Ã§â€°Â¹Ã¥Â®Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢
* **Turbine** Ã§â€Â¨Ã¤ÂºÅ½Ã¦Âµâ€¹Ã¨Â¯â€¢ Flow Ã¥â€™Å’ StateFlow
* **kotlinx-coroutines-test** Ã§â€Â¨Ã¤ÂºÅ½Ã¥ÂÂÃ§Â¨â€¹Ã¦Âµâ€¹Ã¨Â¯â€¢ (`runTest`, `TestDispatcher`)

## Ã¤Â½Â¿Ã§â€Â¨ Turbine Ã¦Âµâ€¹Ã¨Â¯â€¢ ViewModel

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

## Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¼ÂªÃ©â‚¬Â Ã¥Â¯Â¹Ã¨Â±Â¡Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¥Â¯Â¹Ã¨Â±Â¡

Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¦â€°â€¹Ã¥â€ â„¢Ã§Å¡â€žÃ¤Â¼ÂªÃ©â‚¬Â Ã¥Â¯Â¹Ã¨Â±Â¡Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¦Â¡â€ Ã¦Å¾Â¶Ã¯Â¼Å¡

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

## Ã¥ÂÂÃ§Â¨â€¹Ã¦Âµâ€¹Ã¨Â¯â€¢

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

Ã¤Â½Â¿Ã§â€Â¨ `runTest` Ã¢â‚¬â€ Ã¥Â®Æ’Ã¤Â¼Å¡Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Å½Â¨Ã¨Â¿â€ºÃ¨â„¢Å¡Ã¦â€¹Å¸Ã¦â€”Â¶Ã©â€”Â´Ã¥Â¹Â¶Ã¦ÂÂÃ¤Â¾â€º `TestScope`Ã£â‚¬â€š

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

## Room/SQLDelight Ã¦Âµâ€¹Ã¨Â¯â€¢

* Room: Ã¤Â½Â¿Ã§â€Â¨ `Room.inMemoryDatabaseBuilder()` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥â€ â€¦Ã¥Â­ËœÃ¦Âµâ€¹Ã¨Â¯â€¢
* SQLDelight: Ã¥Å“Â¨ JVM Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `JdbcSqliteDriver(JdbcSqliteDriver.IN_MEMORY)`

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

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€˜Â½Ã¥ÂÂ

Ã¤Â½Â¿Ã§â€Â¨Ã¥ÂÂÃ¥Â¼â€¢Ã¥ÂÂ·Ã¥Å’â€¦Ã¨Â£Â¹Ã§Å¡â€žÃ¦ÂÂÃ¨Â¿Â°Ã¦â‚¬Â§Ã¥ÂÂÃ§Â§Â°Ã¯Â¼Å¡

```kotlin
@Test
fun `search with empty query returns all items`() = runTest { }

@Test
fun `delete item emits updated list without deleted item`() = runTest { }
```

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â»â€žÃ§Â»â€¡

```
src/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ commonTest/kotlin/     # Ã¥â€¦Â±Ã¤ÂºÂ«Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†ViewModelÃ£â‚¬ÂUseCaseÃ£â‚¬ÂRepositoryÃ¯Â¼â€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ androidUnitTest/kotlin/ # Android Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†JUnitÃ¯Â¼â€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ androidInstrumentedTest/kotlin/  # Ã¤Â»ÂªÃ¥â„¢Â¨Ã¥Å’â€“Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†RoomÃ£â‚¬ÂUIÃ¯Â¼â€°
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ iosTest/kotlin/        # iOS Ã¤Â¸â€œÃ§â€Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢
```

Ã¦Å“â‚¬Ã¤Â½Å½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Å¡Ã¦Â¯ÂÃ¤Â¸ÂªÃ¥Å Å¸Ã¨Æ’Â½Ã©Æ’Â½Ã©Å“â‚¬Ã¨Â¦ÂÃ¨Â¦â€ Ã§â€ºâ€“ ViewModel + UseCaseÃ£â‚¬â€š
