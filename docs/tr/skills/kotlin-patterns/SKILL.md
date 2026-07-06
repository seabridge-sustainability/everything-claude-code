---
name: kotlin-patterns
description: Coroutine'ler, null safety ve DSL builder'lar ile saÃ„Å¸lam, verimli ve sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lebilir Kotlin uygulamalarÃ„Â± oluÃ…Å¸turmak iÃƒÂ§in idiomatic Kotlin kalÃ„Â±plarÃ„Â±, en iyi uygulamalar ve konvansiyonlar.
origin: ECC
---

# Kotlin GeliÃ…Å¸tirme KalÃ„Â±plarÃ„Â±

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


SaÃ„Å¸lam, verimli ve sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lebilir uygulamalar oluÃ…Å¸turmak iÃƒÂ§in idiomatic Kotlin kalÃ„Â±plarÃ„Â± ve en iyi uygulamalar.

## Ne Zaman KullanÃ„Â±lÃ„Â±r

- Yeni Kotlin kodu yazarken
- Kotlin kodunu incelerken
- Mevcut Kotlin kodunu refactor ederken
- Kotlin modÃƒÂ¼lleri veya kÃƒÂ¼tÃƒÂ¼phaneleri tasarlarken
- Gradle Kotlin DSL build'lerini yapÃ„Â±landÃ„Â±rÃ„Â±rken

## NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r

Bu skill yedi temel alanda idiomatic Kotlin konvansiyonlarÃ„Â±nÃ„Â± uygular: tip sistemi ve safe-call operatÃƒÂ¶rleri kullanarak null safety, `val` ve data class'larda `copy()` ile immutability, exhaustive tip hiyerarÃ…Å¸ileri iÃƒÂ§in sealed class'lar ve interface'ler, coroutine'ler ve `Flow` ile yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ eÃ…Å¸zamanlÃ„Â±lÃ„Â±k, inheritance olmadan davranÃ„Â±Ã…Å¸ eklemek iÃƒÂ§in extension fonksiyonlar, `@DslMarker` ve lambda receiver'lar kullanarak tip gÃƒÂ¼venli DSL builder'lar, ve build yapÃ„Â±landÃ„Â±rmasÃ„Â± iÃƒÂ§in Gradle Kotlin DSL.

## Ãƒâ€“rnekler

**Elvis operatÃƒÂ¶rÃƒÂ¼ ile null safety:**
```kotlin
fun getUserEmail(userId: String): String {
    val user = userRepository.findById(userId)
    return user?.email ?: "unknown@example.com"
}
```

**Exhaustive sonuÃƒÂ§lar iÃƒÂ§in sealed class:**
```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Failure(val error: AppError) : Result<Nothing>()
    data object Loading : Result<Nothing>()
}
```

**async/await ile yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ eÃ…Å¸zamanlÃ„Â±lÃ„Â±k:**
```kotlin
suspend fun fetchUserWithPosts(userId: String): UserProfile =
    coroutineScope {
        val user = async { userService.getUser(userId) }
        val posts = async { postService.getUserPosts(userId) }
        UserProfile(user = user.await(), posts = posts.await())
    }
```

## Temel Ã„Â°lkeler

### 1. Null Safety

Kotlin'in tip sistemi nullable ve non-nullable tipleri ayÃ„Â±rÃ„Â±r. Tam olarak kullanÃ„Â±n.

```kotlin
// Ã„Â°yi: VarsayÃ„Â±lan olarak non-nullable tipler kullan
fun getUser(id: String): User {
    return userRepository.findById(id)
        ?: throw UserNotFoundException("User $id not found")
}

// Ã„Â°yi: Safe call'lar ve Elvis operatÃƒÂ¶rÃƒÂ¼
fun getUserEmail(userId: String): String {
    val user = userRepository.findById(userId)
    return user?.email ?: "unknown@example.com"
}

// KÃƒÂ¶tÃƒÂ¼: Nullable tipleri zorla aÃƒÂ§ma
fun getUserEmail(userId: String): String {
    val user = userRepository.findById(userId)
    return user!!.email // null ise NPE fÃ„Â±rlatÃ„Â±r
}
```

### 2. VarsayÃ„Â±lan Olarak Immutability

`var` yerine `val` tercih edin, mutable koleksiyonlar yerine immutable olanlarÃ„Â±.

```kotlin
// Ã„Â°yi: Immutable veri
data class User(
    val id: String,
    val name: String,
    val email: String,
)

// Ã„Â°yi: copy() ile dÃƒÂ¶nÃƒÂ¼Ã…Å¸tÃƒÂ¼rme
fun updateEmail(user: User, newEmail: String): User =
    user.copy(email = newEmail)

// Ã„Â°yi: Immutable koleksiyonlar
val users: List<User> = listOf(user1, user2)
val filtered = users.filter { it.email.isNotBlank() }

// KÃƒÂ¶tÃƒÂ¼: Mutable state
var currentUser: User? = null // Mutable global state'ten kaÃƒÂ§Ã„Â±n
val mutableUsers = mutableListOf<User>() // GerÃƒÂ§ekten gerekmedikÃƒÂ§e kaÃƒÂ§Ã„Â±n
```

### 3. Expression Body'ler ve Tek Ã„Â°fadeli Fonksiyonlar

KÃ„Â±sa, okunabilir fonksiyonlar iÃƒÂ§in expression body'ler kullanÃ„Â±n.

```kotlin
// Ã„Â°yi: Expression body
fun isAdult(age: Int): Boolean = age >= 18

fun formatFullName(first: String, last: String): String =
    "$first $last".trim()

fun User.displayName(): String =
    name.ifBlank { email.substringBefore('@') }

// Ã„Â°yi: Expression olarak when
fun statusMessage(code: Int): String = when (code) {
    200 -> "OK"
    404 -> "Not Found"
    500 -> "Internal Server Error"
    else -> "Unknown status: $code"
}

// KÃƒÂ¶tÃƒÂ¼: Gereksiz block body
fun isAdult(age: Int): Boolean {
    return age >= 18
}
```

### 4. Value Objeler Ã„Â°ÃƒÂ§in Data Class'lar

Ãƒâ€“ncelikle veri tutan tipler iÃƒÂ§in data class'lar kullanÃ„Â±n.

```kotlin
// Ã„Â°yi: copy, equals, hashCode, toString ile data class
data class CreateUserRequest(
    val name: String,
    val email: String,
    val role: Role = Role.USER,
)

// Ã„Â°yi: Tip gÃƒÂ¼venliÃ„Å¸i iÃƒÂ§in value class (runtime'da sÃ„Â±fÃ„Â±r maliyet)
@JvmInline
value class UserId(val value: String) {
    init {
        require(value.isNotBlank()) { "UserId cannot be blank" }
    }
}

@JvmInline
value class Email(val value: String) {
    init {
        require('@' in value) { "Invalid email: $value" }
    }
}

fun getUser(id: UserId): User = userRepository.findById(id)
```

## Sealed Class'lar ve Interface'ler

### KÃ„Â±sÃ„Â±tlÃ„Â± HiyerarÃ…Å¸ileri Modelleme

```kotlin
// Ã„Â°yi: Exhaustive when iÃƒÂ§in sealed class
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Failure(val error: AppError) : Result<Nothing>()
    data object Loading : Result<Nothing>()
}

fun <T> Result<T>.getOrNull(): T? = when (this) {
    is Result.Success -> data
    is Result.Failure -> null
    is Result.Loading -> null
}

fun <T> Result<T>.getOrThrow(): T = when (this) {
    is Result.Success -> data
    is Result.Failure -> throw error.toException()
    is Result.Loading -> throw IllegalStateException("Still loading")
}
```

### API YanÃ„Â±tlarÃ„Â± Ã„Â°ÃƒÂ§in Sealed Interface'ler

```kotlin
sealed interface ApiError {
    val message: String

    data class NotFound(override val message: String) : ApiError
    data class Unauthorized(override val message: String) : ApiError
    data class Validation(
        override val message: String,
        val field: String,
    ) : ApiError
    data class Internal(
        override val message: String,
        val cause: Throwable? = null,
    ) : ApiError
}

fun ApiError.toStatusCode(): Int = when (this) {
    is ApiError.NotFound -> 404
    is ApiError.Unauthorized -> 401
    is ApiError.Validation -> 422
    is ApiError.Internal -> 500
}
```

## Scope Fonksiyonlar

### Her Birini Ne Zaman KullanmalÃ„Â±

```kotlin
// let: Nullable'Ã„Â± veya scope edilmiÃ…Å¸ sonucu dÃƒÂ¶nÃƒÂ¼Ã…Å¸tÃƒÂ¼r
val length: Int? = name?.let { it.trim().length }

// apply: Bir nesneyi yapÃ„Â±landÃ„Â±r (nesneyi dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r)
val user = User().apply {
    name = "Alice"
    email = "alice@example.com"
}

// also: Yan etkiler (nesneyi dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r)
val user = createUser(request).also { logger.info("Created user: ${it.id}") }

// run: Receiver ile block ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r (sonucu dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r)
val result = connection.run {
    prepareStatement(sql)
    executeQuery()
}

// with: run'Ã„Â±n extension olmayan formu
val csv = with(StringBuilder()) {
    appendLine("name,email")
    users.forEach { appendLine("${it.name},${it.email}") }
    toString()
}
```

## Extension Fonksiyonlar

### Inheritance Olmadan Fonksiyonalite Ekleme

```kotlin
// Ã„Â°yi: Domain'e ÃƒÂ¶zgÃƒÂ¼ extension'lar
fun String.toSlug(): String =
    lowercase()
        .replace(Regex("[^a-z0-9\\s-]"), "")
        .replace(Regex("\\s+"), "-")
        .trim('-')

fun Instant.toLocalDate(zone: ZoneId = ZoneId.systemDefault()): LocalDate =
    atZone(zone).toLocalDate()

// Ã„Â°yi: Koleksiyon extension'larÃ„Â±
fun <T> List<T>.second(): T = this[1]

fun <T> List<T>.secondOrNull(): T? = getOrNull(1)

// Ã„Â°yi: Scope edilmiÃ…Å¸ extension'lar (global namespace'i kirletmez)
class UserService {
    private fun User.isActive(): Boolean =
        status == Status.ACTIVE && lastLogin.isAfter(Instant.now().minus(30, ChronoUnit.DAYS))

    fun getActiveUsers(): List<User> = userRepository.findAll().filter { it.isActive() }
}
```

## Coroutine'ler

### YapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ EÃ…Å¸zamanlÃ„Â±lÃ„Â±k

```kotlin
// Ã„Â°yi: coroutineScope ile yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ eÃ…Å¸zamanlÃ„Â±lÃ„Â±k
suspend fun fetchUserWithPosts(userId: String): UserProfile =
    coroutineScope {
        val userDeferred = async { userService.getUser(userId) }
        val postsDeferred = async { postService.getUserPosts(userId) }

        UserProfile(
            user = userDeferred.await(),
            posts = postsDeferred.await(),
        )
    }

// Ã„Â°yi: child'lar baÃ„Å¸Ã„Â±msÃ„Â±z baÃ…Å¸arÃ„Â±sÃ„Â±z olabildiÃ„Å¸inde supervisorScope
suspend fun fetchDashboard(userId: String): Dashboard =
    supervisorScope {
        val user = async { userService.getUser(userId) }
        val notifications = async { notificationService.getRecent(userId) }
        val recommendations = async { recommendationService.getFor(userId) }

        Dashboard(
            user = user.await(),
            notifications = try {
                notifications.await()
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                emptyList()
            },
            recommendations = try {
                recommendations.await()
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                emptyList()
            },
        )
    }
```

### Reactive Stream'ler Ã„Â°ÃƒÂ§in Flow

```kotlin
// Ã„Â°yi: Uygun hata iÃ…Å¸leme ile cold flow
fun observeUsers(): Flow<List<User>> = flow {
    while (currentCoroutineContext().isActive) {
        val users = userRepository.findAll()
        emit(users)
        delay(5.seconds)
    }
}.catch { e ->
    logger.error("Error observing users", e)
    emit(emptyList())
}

// Ã„Â°yi: Flow operatÃƒÂ¶rleri
fun searchUsers(query: Flow<String>): Flow<List<User>> =
    query
        .debounce(300.milliseconds)
        .distinctUntilChanged()
        .filter { it.length >= 2 }
        .mapLatest { q -> userRepository.search(q) }
        .catch { emit(emptyList()) }
```

## DSL Builder'lar

### Tip GÃƒÂ¼venli Builder'lar

```kotlin
// Ã„Â°yi: @DslMarker ile DSL
@DslMarker
annotation class HtmlDsl

@HtmlDsl
class HTML {
    private val children = mutableListOf<Element>()

    fun head(init: Head.() -> Unit) {
        children += Head().apply(init)
    }

    fun body(init: Body.() -> Unit) {
        children += Body().apply(init)
    }

    override fun toString(): String = children.joinToString("\n")
}

fun html(init: HTML.() -> Unit): HTML = HTML().apply(init)

// KullanÃ„Â±m
val page = html {
    head { title("My Page") }
    body {
        h1("Welcome")
        p("Hello, World!")
    }
}
```

## Gradle Kotlin DSL

### build.gradle.kts YapÃ„Â±landÃ„Â±rmasÃ„Â±

```kotlin
// En son versiyonlarÃ„Â± kontrol et: https://kotlinlang.org/docs/releases.html
plugins {
    kotlin("jvm") version "2.3.10"
    kotlin("plugin.serialization") version "2.3.10"
    id("io.ktor.plugin") version "3.4.0"
    id("org.jetbrains.kotlinx.kover") version "0.9.7"
    id("io.gitlab.arturbosch.detekt") version "1.23.8"
}

group = "com.example"
version = "1.0.0"

kotlin {
    jvmToolchain(21)
}

dependencies {
    // Ktor
    implementation("io.ktor:ktor-server-core:3.4.0")
    implementation("io.ktor:ktor-server-netty:3.4.0")
    implementation("io.ktor:ktor-server-content-negotiation:3.4.0")
    implementation("io.ktor:ktor-serialization-kotlinx-json:3.4.0")

    // Exposed
    implementation("org.jetbrains.exposed:exposed-core:1.0.0")
    implementation("org.jetbrains.exposed:exposed-dao:1.0.0")
    implementation("org.jetbrains.exposed:exposed-jdbc:1.0.0")
    implementation("org.jetbrains.exposed:exposed-kotlin-datetime:1.0.0")

    // Koin
    implementation("io.insert-koin:koin-ktor:4.2.0")

    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.10.2")

    // Test
    testImplementation("io.kotest:kotest-runner-junit5:6.1.4")
    testImplementation("io.kotest:kotest-assertions-core:6.1.4")
    testImplementation("io.kotest:kotest-property:6.1.4")
    testImplementation("io.mockk:mockk:1.14.9")
    testImplementation("io.ktor:ktor-server-test-host:3.4.0")
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.10.2")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

detekt {
    config.setFrom(files("config/detekt/detekt.yml"))
    buildUponDefaultConfig = true
}
```

## Hata Ã„Â°Ã…Å¸leme KalÃ„Â±plarÃ„Â±

### Domain OperasyonlarÃ„Â± Ã„Â°ÃƒÂ§in Result Tipi

```kotlin
// Ã„Â°yi: Kotlin'in Result'Ã„Â±nÃ„Â± veya ÃƒÂ¶zel sealed class kullan
suspend fun createUser(request: CreateUserRequest): Result<User> = runCatching {
    require(request.name.isNotBlank()) { "Name cannot be blank" }
    require('@' in request.email) { "Invalid email format" }

    val user = User(
        id = UserId(UUID.randomUUID().toString()),
        name = request.name,
        email = Email(request.email),
    )
    userRepository.save(user)
    user
}

// Ã„Â°yi: Result'larÃ„Â± zincirle
val displayName = createUser(request)
    .map { it.name }
    .getOrElse { "Unknown" }
```

### require, check, error

```kotlin
// Ã„Â°yi: Net mesajlarla ÃƒÂ¶n koÃ…Å¸ullar
fun withdraw(account: Account, amount: Money): Account {
    require(amount.value > 0) { "Amount must be positive: $amount" }
    check(account.balance >= amount) { "Insufficient balance: ${account.balance} < $amount" }

    return account.copy(balance = account.balance - amount)
}
```

## HÃ„Â±zlÃ„Â± Referans: Kotlin Ã„Â°diyomlarÃ„Â±

| Ã„Â°diyom | AÃƒÂ§Ã„Â±klama |
|-------|-------------|
| `val` over `var` | Immutable deÃ„Å¸iÃ…Å¸kenleri tercih et |
| `data class` | equals/hashCode/copy ile value objeler iÃƒÂ§in |
| `sealed class/interface` | KÃ„Â±sÃ„Â±tlÃ„Â± tip hiyerarÃ…Å¸ileri iÃƒÂ§in |
| `value class` | SÃ„Â±fÃ„Â±r maliyetli tip gÃƒÂ¼venli sarmalayÃ„Â±cÃ„Â±lar iÃƒÂ§in |
| Expression `when` | Exhaustive pattern matching |
| Safe call `?.` | Null-safe member eriÃ…Å¸imi |
| Elvis `?:` | Nullable'lar iÃƒÂ§in varsayÃ„Â±lan deÃ„Å¸er |
| `let`/`apply`/`also`/`run`/`with` | Temiz kod iÃƒÂ§in scope fonksiyonlar |
| Extension fonksiyonlar | Inheritance olmadan davranÃ„Â±Ã…Å¸ ekle |
| `copy()` | Data class'larda immutable gÃƒÂ¼ncellemeler |
| `require`/`check` | Ãƒâ€“n koÃ…Å¸ul assertion'larÃ„Â± |
| Coroutine `async`/`await` | YapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ concurrent execution |
| `Flow` | Cold reactive stream'ler |
| `sequence` | Lazy evaluation |
| Delegation `by` | Inheritance olmadan implementasyonu yeniden kullan |

## KaÃƒÂ§Ã„Â±nÃ„Â±lmasÃ„Â± Gereken Anti-KalÃ„Â±plar

```kotlin
// KÃƒÂ¶tÃƒÂ¼: Nullable tipleri zorla aÃƒÂ§ma
val name = user!!.name

// KÃƒÂ¶tÃƒÂ¼: Java'dan platform tipi sÃ„Â±zÃ„Â±ntÃ„Â±sÃ„Â±
fun getLength(s: String) = s.length // GÃƒÂ¼venli
fun getLength(s: String?) = s?.length ?: 0 // Java'dan null'larÃ„Â± iÃ…Å¸le

// KÃƒÂ¶tÃƒÂ¼: Mutable data class'lar
data class MutableUser(var name: String, var email: String)

// KÃƒÂ¶tÃƒÂ¼: Kontrol akÃ„Â±Ã…Å¸Ã„Â± iÃƒÂ§in exception kullanma
try {
    val user = findUser(id)
} catch (e: NotFoundException) {
    // Beklenen durumlar iÃƒÂ§in exception kullanma
}

// Ã„Â°yi: Nullable dÃƒÂ¶nÃƒÂ¼Ã…Å¸ veya Result kullan
val user: User? = findUserOrNull(id)

// KÃƒÂ¶tÃƒÂ¼: Coroutine scope'u gÃƒÂ¶rmezden gelme
GlobalScope.launch { /* GlobalScope'tan kaÃƒÂ§Ã„Â±n */ }

// Ã„Â°yi: YapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ eÃ…Å¸zamanlÃ„Â±lÃ„Â±k kullan
coroutineScope {
    launch { /* Uygun Ã…Å¸ekilde scope edilmiÃ…Å¸ */ }
}

// KÃƒÂ¶tÃƒÂ¼: Derin iÃƒÂ§ iÃƒÂ§e scope fonksiyonlar
user?.let { u ->
    u.address?.let { a ->
        a.city?.let { c -> process(c) }
    }
}

// Ã„Â°yi: DoÃ„Å¸rudan null-safe zincir
user?.address?.city?.let { process(it) }
```

**HatÃ„Â±rla**: Kotlin kodu kÃ„Â±sa ama okunabilir olmalÃ„Â±. GÃƒÂ¼venlik iÃƒÂ§in tip sisteminden yararlanÃ„Â±n, immutability tercih edin ve eÃ…Å¸zamanlÃ„Â±lÃ„Â±k iÃƒÂ§in coroutine'ler kullanÃ„Â±n. Ã…Å¾ÃƒÂ¼pheye dÃƒÂ¼Ã…Å¸tÃƒÂ¼Ã„Å¸ÃƒÂ¼nÃƒÂ¼zde, derleyicinin size yardÃ„Â±m etmesine izin verin.
