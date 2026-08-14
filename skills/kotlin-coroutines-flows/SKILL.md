---
name: kotlin-coroutines-flows
description: Kotlin Coroutines and Flow patterns for Android and KMP — structured concurrency, Flow operators, StateFlow, error handling, and testing. Use when writing coroutines or Flow code on Android or KMP, or debugging cancellation and concurrency.
metadata:
  origin: ECC
---

# Kotlin Coroutines & Flows

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

Patterns for structured concurrency, Flow-based reactive streams, and coroutine testing in Android and Kotlin Multiplatform projects.

## When to Activate

- Writing async code with Kotlin coroutines
- Using Flow, StateFlow, or SharedFlow for reactive data
- Handling concurrent operations (parallel loading, debounce, retry)
- Testing coroutines and Flows
- Managing coroutine scopes and cancellation

## Structured Concurrency

### Scope Hierarchy

```
Application
  └── viewModelScope (ViewModel)
        └── coroutineScope { } (structured child)
              ├── async { } (concurrent task)
              └── async { } (concurrent task)
```

Always use structured concurrency — never `GlobalScope`:

```kotlin
// BAD
GlobalScope.launch { fetchData() }

// GOOD — scoped to ViewModel lifecycle
viewModelScope.launch { fetchData() }

// GOOD — scoped to composable lifecycle
LaunchedEffect(key) { fetchData() }
```

### Parallel Decomposition

Use `coroutineScope` + `async` for parallel work:

```kotlin
suspend fun loadDashboard(): Dashboard = coroutineScope {
    val items = async { itemRepository.getRecent() }
    val stats = async { statsRepository.getToday() }
    val profile = async { userRepository.getCurrent() }
    Dashboard(
        items = items.await(),
        stats = stats.await(),
        profile = profile.await()
    )
}
```

### SupervisorScope

Use `supervisorScope` when child failures should not cancel siblings:

```kotlin
suspend fun syncAll() = supervisorScope {
    launch { syncItems() }       // failure here won't cancel syncStats
    launch { syncStats() }
    launch { syncSettings() }
}
```

## Flow Patterns

### Cold Flow — One-Shot to Stream Conversion

```kotlin
fun observeItems(): Flow<List<Item>> = flow {
    // Re-emits whenever the database changes
    itemDao.observeAll()
        .map { entities -> entities.map { it.toDomain() } }
        .collect { emit(it) }
}
```

### StateFlow for UI State

```kotlin
class DashboardViewModel(
    observeProgress: ObserveUserProgressUseCase
) : ViewModel() {
    val progress: StateFlow<UserProgress> = observeProgress()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = UserProgress.EMPTY
        )
}
```

`WhileSubscribed(5_000)` keeps the upstream active for 5 seconds after the last subscriber leaves — survives configuration changes without restarting.

### Combining Multiple Flows

```kotlin
val uiState: StateFlow<HomeState> = combine(
    itemRepository.observeItems(),
    settingsRepository.observeTheme(),
    userRepository.observeProfile()
) { items, theme, profile ->
    HomeState(items = items, theme = theme, profile = profile)
}.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), HomeState())
```

### Flow Operators

```kotlin
// Debounce search input
searchQuery
    .debounce(300)
    .distinctUntilChanged()
    .flatMapLatest { query -> repository.search(query) }
    .catch { emit(emptyList()) }
    .collect { results -> _state.update { it.copy(results = results) } }

// Retry with exponential backoff
fun fetchWithRetry(): Flow<Data> = flow { emit(api.fetch()) }
    .retryWhen { cause, attempt ->
        if (cause is IOException && attempt < 3) {
            delay(1000L * (1 shl attempt.toInt()))
            true
        } else {
            false
        }
    }
```

### SharedFlow for One-Time Events

```kotlin
class ItemListViewModel : ViewModel() {
    private val _effects = MutableSharedFlow<Effect>()
    val effects: SharedFlow<Effect> = _effects.asSharedFlow()

    sealed interface Effect {
        data class ShowSnackbar(val message: String) : Effect
        data class NavigateTo(val route: String) : Effect
    }

    private fun deleteItem(id: String) {
        viewModelScope.launch {
            repository.delete(id)
            _effects.emit(Effect.ShowSnackbar("Item deleted"))
        }
    }
}

// Collect in Composable
LaunchedEffect(Unit) {
    viewModel.effects.collect { effect ->
        when (effect) {
            is Effect.ShowSnackbar -> snackbarHostState.showSnackbar(effect.message)
            is Effect.NavigateTo -> navController.navigate(effect.route)
        }
    }
}
```

## Dispatchers

```kotlin
// CPU-intensive work
withContext(Dispatchers.Default) { parseJson(largePayload) }

// IO-bound work
withContext(Dispatchers.IO) { database.query() }

// Main thread (UI) — default in viewModelScope
withContext(Dispatchers.Main) { updateUi() }
```

In KMP, use `Dispatchers.Default` and `Dispatchers.Main` (available on all platforms). `Dispatchers.IO` is JVM/Android only — use `Dispatchers.Default` on other platforms or provide via DI.

## Cancellation

### Cooperative Cancellation

Long-running loops must check for cancellation:

```kotlin
suspend fun processItems(items: List<Item>) = coroutineScope {
    for (item in items) {
        ensureActive()  // throws CancellationException if cancelled
        process(item)
    }
}
```

### Cleanup with try/finally

```kotlin
viewModelScope.launch {
    try {
        _state.update { it.copy(isLoading = true) }
        val data = repository.fetch()
        _state.update { it.copy(data = data) }
    } finally {
        _state.update { it.copy(isLoading = false) }  // always runs, even on cancellation
    }
}
```

## Testing

### Testing StateFlow with Turbine

```kotlin
@Test
fun `search updates item list`() = runTest {
    val fakeRepository = FakeItemRepository().apply { emit(testItems) }
    val viewModel = ItemListViewModel(GetItemsUseCase(fakeRepository))

    viewModel.state.test {
        assertEquals(ItemListState(), awaitItem())  // initial

        viewModel.onSearch("query")
        val loading = awaitItem()
        assertTrue(loading.isLoading)

        val loaded = awaitItem()
        assertFalse(loaded.isLoading)
        assertEquals(1, loaded.items.size)
    }
}
```

### Testing with TestDispatcher

```kotlin
@Test
fun `parallel load completes correctly`() = runTest {
    val viewModel = DashboardViewModel(
        itemRepo = FakeItemRepo(),
        statsRepo = FakeStatsRepo()
    )

    viewModel.load()
    advanceUntilIdle()

    val state = viewModel.state.value
    assertNotNull(state.items)
    assertNotNull(state.stats)
}
```

### Faking Flows

```kotlin
class FakeItemRepository : ItemRepository {
    private val _items = MutableStateFlow<List<Item>>(emptyList())

    override fun observeItems(): Flow<List<Item>> = _items

    fun emit(items: List<Item>) { _items.value = items }

    override suspend fun getItemsByCategory(category: String): Result<List<Item>> {
        return Result.success(_items.value.filter { it.category == category })
    }
}
```

## Anti-Patterns to Avoid

- Using `GlobalScope` — leaks coroutines, no structured cancellation
- Collecting Flows in `init {}` without a scope — use `viewModelScope.launch`
- Using `MutableStateFlow` with mutable collections — always use immutable copies: `_state.update { it.copy(list = it.list + newItem) }`
- Catching `CancellationException` — let it propagate for proper cancellation
- Using `flowOn(Dispatchers.Main)` to collect — collection dispatcher is the caller's dispatcher
- Creating `Flow` in `@Composable` without `remember` — recreates the flow every recomposition

## References

See skill: `compose-multiplatform-patterns` for UI consumption of Flows.
See skill: `android-clean-architecture` for where coroutines fit in layers.
