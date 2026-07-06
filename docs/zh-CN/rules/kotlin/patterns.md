---
paths:
  - "**/*.kt"
  - "**/*.kts"
---

# Kotlin Ã¦Â¨Â¡Ã¥Â¼Â

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


> Ã¦Â­Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  [common/patterns.md](../common/patterns.md) Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã¯Â¼Å’Ã¥Â¢Å¾Ã¥Å Â Ã¤Âºâ€  Kotlin Ã¥â€™Å’ Android/KMP Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥

Ã©Â¦â€“Ã©â‚¬â€°Ã¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã¦Â³Â¨Ã¥â€¦Â¥Ã£â‚¬â€šÃ¤Â½Â¿Ã§â€Â¨ KoinÃ¯Â¼Ë†KMPÃ¯Â¼â€°Ã¦Ë†â€“ HiltÃ¯Â¼Ë†Ã¤Â»â€¦Ã©â„¢Â AndroidÃ¯Â¼â€°Ã¯Â¼Å¡

```kotlin
// Koin Ã¢â‚¬â€ declare modules
val dataModule = module {
    single<ItemRepository> { ItemRepositoryImpl(get(), get()) }
    factory { GetItemsUseCase(get()) }
    viewModelOf(::ItemListViewModel)
}

// Hilt Ã¢â‚¬â€ annotations
@HiltViewModel
class ItemListViewModel @Inject constructor(
    private val getItems: GetItemsUseCase
) : ViewModel()
```

## ViewModel Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Ââ€¢Ã¤Â¸â‚¬Ã§Å Â¶Ã¦â‚¬ÂÃ¥Â¯Â¹Ã¨Â±Â¡Ã£â‚¬ÂÃ¤Âºâ€¹Ã¤Â»Â¶Ã¦Å½Â¥Ã¦â€Â¶Ã¥â„¢Â¨Ã£â‚¬ÂÃ¥Ââ€¢Ã¥Ââ€˜Ã¦â€¢Â°Ã¦ÂÂ®Ã¦ÂµÂÃ¯Â¼Å¡

```kotlin
data class ScreenState(
    val items: List<Item> = emptyList(),
    val isLoading: Boolean = false
)

class ScreenViewModel(private val useCase: GetItemsUseCase) : ViewModel() {
    private val _state = MutableStateFlow(ScreenState())
    val state = _state.asStateFlow()

    fun onEvent(event: ScreenEvent) {
        when (event) {
            is ScreenEvent.Load -> load()
            is ScreenEvent.Delete -> delete(event.id)
        }
    }
}
```

## Ã¤Â»â€œÃ¥Âºâ€œÃ¦Â¨Â¡Ã¥Â¼Â

* `suspend` Ã¥â€¡Â½Ã¦â€¢Â°Ã¨Â¿â€Ã¥â€ºÅ¾ `Result<T>` Ã¦Ë†â€“Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã©â€â„¢Ã¨Â¯Â¯Ã§Â±Â»Ã¥Å¾â€¹
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥â€œÂÃ¥Âºâ€Ã¥Â¼ÂÃ¦ÂµÂÃ¤Â½Â¿Ã§â€Â¨ `Flow`
* Ã¥ÂÂÃ¨Â°Æ’Ã¦Å“Â¬Ã¥Å“Â°Ã¥â€™Å’Ã¨Â¿Å“Ã§Â¨â€¹Ã¦â€¢Â°Ã¦ÂÂ®Ã¦ÂºÂ

```kotlin
interface ItemRepository {
    suspend fun getById(id: String): Result<Item>
    suspend fun getAll(): Result<List<Item>>
    fun observeAll(): Flow<List<Item>>
}
```

## Ã§â€Â¨Ã¤Â¾â€¹Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Ââ€¢Ã¤Â¸â‚¬Ã¨ÂÅ’Ã¨Â´Â£Ã¯Â¼Å’`operator fun invoke`Ã¯Â¼Å¡

```kotlin
class GetItemUseCase(private val repository: ItemRepository) {
    suspend operator fun invoke(id: String): Result<Item> {
        return repository.getById(id)
    }
}

class GetItemsUseCase(private val repository: ItemRepository) {
    suspend operator fun invoke(): Result<List<Item>> {
        return repository.getAll()
    }
}
```

## expect/actual (KMP)

Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¹Â³Ã¥ÂÂ°Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥Â®Å¾Ã§Å½Â°Ã¯Â¼Å¡

```kotlin
// commonMain
expect fun platformName(): String
expect class SecureStorage {
    fun save(key: String, value: String)
    fun get(key: String): String?
}

// androidMain
actual fun platformName(): String = "Android"
actual class SecureStorage {
    actual fun save(key: String, value: String) { /* EncryptedSharedPreferences */ }
    actual fun get(key: String): String? = null /* ... */
}

// iosMain
actual fun platformName(): String = "iOS"
actual class SecureStorage {
    actual fun save(key: String, value: String) { /* Keychain */ }
    actual fun get(key: String): String? = null /* ... */
}
```

## Ã¥ÂÂÃ§Â¨â€¹Ã¦Â¨Â¡Ã¥Â¼Â

* Ã¥Å“Â¨ ViewModels Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `viewModelScope`Ã¯Â¼Å’Ã¥Â¯Â¹Ã¤ÂºÅ½Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã§Å¡â€žÃ¥Â­ÂÃ¥Â·Â¥Ã¤Â½Å“Ã¤Â½Â¿Ã§â€Â¨ `coroutineScope`
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦ÂÂ¥Ã¨â€¡ÂªÃ¥â€ Â·Ã¦ÂµÂÃ§Å¡â€ž StateFlow Ã¤Â½Â¿Ã§â€Â¨ `stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), initialValue)`
* Ã¥Â½â€œÃ¥Â­ÂÃ¤Â»Â»Ã¥Å Â¡Ã¥Â¤Â±Ã¨Â´Â¥Ã¥Âºâ€Ã§â€¹Â¬Ã§Â«â€¹Ã¥Â¤â€žÃ§Ââ€ Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ `supervisorScope`

## Ã¤Â½Â¿Ã§â€Â¨ DSL Ã§Å¡â€žÃ¦Å¾â€žÃ¥Â»ÂºÃ¥â„¢Â¨Ã¦Â¨Â¡Ã¥Â¼Â

```kotlin
class HttpClientConfig {
    var baseUrl: String = ""
    var timeout: Long = 30_000
    private val interceptors = mutableListOf<Interceptor>()

    fun interceptor(block: () -> Interceptor) {
        interceptors.add(block())
    }
}

fun httpClient(block: HttpClientConfig.() -> Unit): HttpClient {
    val config = HttpClientConfig().apply(block)
    return HttpClient(config)
}

// Usage
val client = httpClient {
    baseUrl = "https://api.example.com"
    timeout = 15_000
    interceptor { AuthInterceptor(tokenProvider) }
}
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å“â€°Ã¥â€¦Â³Ã¨Â¯Â¦Ã§Â»â€ Ã§Å¡â€žÃ¥ÂÂÃ§Â¨â€¹Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`kotlin-coroutines-flows`Ã£â‚¬â€š
Ã¦Å“â€°Ã¥â€¦Â³Ã¦Â¨Â¡Ã¥Ââ€”Ã¥â€™Å’Ã¥Ë†â€ Ã¥Â±â€šÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`android-clean-architecture`Ã£â‚¬â€š
