---
name: kotlin-patterns
description: Coroutine'ler, null safety ve DSL builder'lar ile sağlam, verimli ve sürdürülebilir Kotlin uygulamaları oluşturmak için idiomatic Kotlin kalıpları, en iyi uygulamalar ve konvansiyonlar.
origin: ECC
---

# Kotlin Geliştirme Kalıpları

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Sağlam, verimli ve sürdürülebilir uygulamalar oluşturmak için idiomatic Kotlin kalıpları ve en iyi uygulamalar.

## Ne Zaman Kullanılır

- Yeni Kotlin kodu yazarken
- Kotlin kodunu incelerken
- Mevcut Kotlin kodunu refactor ederken
- Kotlin modülleri veya kütüphaneleri tasarlarken
- Gradle Kotlin DSL build'lerini yapılandırırken

## Nasıl Çalışır

Bu skill yedi temel alanda idiomatic Kotlin konvansiyonlarını uygular: tip sistemi ve safe-call operatörleri kullanarak null safety, `val` ve data class'larda `copy()` ile immutability, exhaustive tip hiyerarşileri için sealed class'lar ve interface'ler, coroutine'ler ve `Flow` ile yapılandırılmış eşzamanlılık, inheritance olmadan davranış eklemek için extension fonksiyonlar, `@DslMarker` ve lambda receiver'lar kullanarak tip güvenli DSL builder'lar, ve build yapılandırması için Gradle Kotlin DSL.

## Örnekler

**Elvis operatörü ile null safety:**
```kotlin
fun getUserEmail(userId: String): String {
    val user = userRepository.findById(userId)
    return user?.email ?: "unknown@example.com"
}
```

**Exhaustive sonuçlar için sealed class:**
```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Failure(val error: AppError) : Result<Nothing>()
    data object Loading : Result<Nothing>()
}
```

**async/await ile yapılandırılmış eşzamanlılık:**
```kotlin
suspend fun fetchUserWithPosts(userId: String): UserProfile =
    coroutineScope {
        val user = async { userService.getUser(userId) }
        val posts = async { postService.getUserPosts(userId) }
        UserProfile(user = user.await(), posts = posts.await())
    }
```

## Temel İlkeler

### 1. Null Safety

Kotlin'in tip sistemi nullable ve non-nullable tipleri ayırır. Tam olarak kullanın.

```kotlin
// İyi: Varsayılan olarak non-nullable tipler kullan
fun getUser(id: String): User {
    return userRepository.findById(id)
        ?: throw UserNotFoundException("User $id not found")
}

// İyi: Safe call'lar ve Elvis operatörü
fun getUserEmail(userId: String): String {
    val user = userRepository.findById(userId)
    return user?.email ?: "unknown@example.com"
}

// Kötü: Nullable tipleri zorla açma
fun getUserEmail(userId: String): String {
    val user = userRepository.findById(userId)
    return user!!.email // null ise NPE fırlatır
}
```

### 2. Varsayılan Olarak Immutability

`var` yerine `val` tercih edin, mutable koleksiyonlar yerine immutable olanları.

```kotlin
// İyi: Immutable veri
data class User(
    val id: String,
    val name: String,
    val email: String,
)

// İyi: copy() ile dönüştürme
fun updateEmail(user: User, newEmail: String): User =
    user.copy(email = newEmail)

// İyi: Immutable koleksiyonlar
val users: List<User> = listOf(user1, user2)
val filtered = users.filter { it.email.isNotBlank() }

// Kötü: Mutable state
var currentUser: User? = null // Mutable global state'ten kaçın
val mutableUsers = mutableListOf<User>() // Gerçekten gerekmedikçe kaçın
```

### 3. Expression Body'ler ve Tek İfadeli Fonksiyonlar

Kısa, okunabilir fonksiyonlar için expression body'ler kullanın.

```kotlin
// İyi: Expression body
fun isAdult(age: Int): Boolean = age >= 18

fun formatFullName(first: String, last: String): String =
    "$first $last".trim()

fun User.displayName(): String =
    name.ifBlank { email.substringBefore('@') }

// İyi: Expression olarak when
fun statusMessage(code: Int): String = when (code) {
    200 -> "OK"
    404 -> "Not Found"
    500 -> "Internal Server Error"
    else -> "Unknown status: $code"
}

// Kötü: Gereksiz block body
fun isAdult(age: Int): Boolean {
    return age >= 18
}
```

### 4. Value Objeler İçin Data Class'lar

Öncelikle veri tutan tipler için data class'lar kullanın.

```kotlin
// İyi: copy, equals, hashCode, toString ile data class
data class CreateUserRequest(
    val name: String,
    val email: String,
    val role: Role = Role.USER,
)

// İyi: Tip güvenliği için value class (runtime'da sıfır maliyet)
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

### Kısıtlı Hiyerarşileri Modelleme

```kotlin
// İyi: Exhaustive when için sealed class
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

### API Yanıtları İçin Sealed Interface'ler

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

### Her Birini Ne Zaman Kullanmalı

```kotlin
// let: Nullable'ı veya scope edilmiş sonucu dönüştür
val length: Int? = name?.let { it.trim().length }

// apply: Bir nesneyi yapılandır (nesneyi döndürür)
val user = User().apply {
    name = "Alice"
    email = "alice@example.com"
}

// also: Yan etkiler (nesneyi döndürür)
val user = createUser(request).also { logger.info("Created user: ${it.id}") }

// run: Receiver ile block çalıştır (sonucu döndürür)
val result = connection.run {
    prepareStatement(sql)
    executeQuery()
}

// with: run'ın extension olmayan formu
val csv = with(StringBuilder()) {
    appendLine("name,email")
    users.forEach { appendLine("${it.name},${it.email}") }
    toString()
}
```

## Extension Fonksiyonlar

### Inheritance Olmadan Fonksiyonalite Ekleme

```kotlin
// İyi: Domain'e özgü extension'lar
fun String.toSlug(): String =
    lowercase()
        .replace(Regex("[^a-z0-9\\s-]"), "")
        .replace(Regex("\\s+"), "-")
        .trim('-')

fun Instant.toLocalDate(zone: ZoneId = ZoneId.systemDefault()): LocalDate =
    atZone(zone).toLocalDate()

// İyi: Koleksiyon extension'ları
fun <T> List<T>.second(): T = this[1]

fun <T> List<T>.secondOrNull(): T? = getOrNull(1)

// İyi: Scope edilmiş extension'lar (global namespace'i kirletmez)
class UserService {
    private fun User.isActive(): Boolean =
        status == Status.ACTIVE && lastLogin.isAfter(Instant.now().minus(30, ChronoUnit.DAYS))

    fun getActiveUsers(): List<User> = userRepository.findAll().filter { it.isActive() }
}
```

## Coroutine'ler

### Yapılandırılmış Eşzamanlılık

```kotlin
// İyi: coroutineScope ile yapılandırılmış eşzamanlılık
suspend fun fetchUserWithPosts(userId: String): UserProfile =
    coroutineScope {
        val userDeferred = async { userService.getUser(userId) }
        val postsDeferred = async { postService.getUserPosts(userId) }

        UserProfile(
            user = userDeferred.await(),
            posts = postsDeferred.await(),
        )
    }

// İyi: child'lar bağımsız başarısız olabildiğinde supervisorScope
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

### Reactive Stream'ler İçin Flow

```kotlin
// İyi: Uygun hata işleme ile cold flow
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

// İyi: Flow operatörleri
fun searchUsers(query: Flow<String>): Flow<List<User>> =
    query
        .debounce(300.milliseconds)
        .distinctUntilChanged()
        .filter { it.length >= 2 }
        .mapLatest { q -> userRepository.search(q) }
        .catch { emit(emptyList()) }
```

## DSL Builder'lar

### Tip Güvenli Builder'lar

```kotlin
// İyi: @DslMarker ile DSL
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

// Kullanım
val page = html {
    head { title("My Page") }
    body {
        h1("Welcome")
        p("Hello, World!")
    }
}
```

## Gradle Kotlin DSL

### build.gradle.kts Yapılandırması

```kotlin
// En son versiyonları kontrol et: https://kotlinlang.org/docs/releases.html
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

## Hata İşleme Kalıpları

### Domain Operasyonları İçin Result Tipi

```kotlin
// İyi: Kotlin'in Result'ını veya özel sealed class kullan
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

// İyi: Result'ları zincirle
val displayName = createUser(request)
    .map { it.name }
    .getOrElse { "Unknown" }
```

### require, check, error

```kotlin
// İyi: Net mesajlarla ön koşullar
fun withdraw(account: Account, amount: Money): Account {
    require(amount.value > 0) { "Amount must be positive: $amount" }
    check(account.balance >= amount) { "Insufficient balance: ${account.balance} < $amount" }

    return account.copy(balance = account.balance - amount)
}
```

## Hızlı Referans: Kotlin İdiyomları

| İdiyom | Açıklama |
|-------|-------------|
| `val` over `var` | Immutable değişkenleri tercih et |
| `data class` | equals/hashCode/copy ile value objeler için |
| `sealed class/interface` | Kısıtlı tip hiyerarşileri için |
| `value class` | Sıfır maliyetli tip güvenli sarmalayıcılar için |
| Expression `when` | Exhaustive pattern matching |
| Safe call `?.` | Null-safe member erişimi |
| Elvis `?:` | Nullable'lar için varsayılan değer |
| `let`/`apply`/`also`/`run`/`with` | Temiz kod için scope fonksiyonlar |
| Extension fonksiyonlar | Inheritance olmadan davranış ekle |
| `copy()` | Data class'larda immutable güncellemeler |
| `require`/`check` | Ön koşul assertion'ları |
| Coroutine `async`/`await` | Yapılandırılmış concurrent execution |
| `Flow` | Cold reactive stream'ler |
| `sequence` | Lazy evaluation |
| Delegation `by` | Inheritance olmadan implementasyonu yeniden kullan |

## Kaçınılması Gereken Anti-Kalıplar

```kotlin
// Kötü: Nullable tipleri zorla açma
val name = user!!.name

// Kötü: Java'dan platform tipi sızıntısı
fun getLength(s: String) = s.length // Güvenli
fun getLength(s: String?) = s?.length ?: 0 // Java'dan null'ları işle

// Kötü: Mutable data class'lar
data class MutableUser(var name: String, var email: String)

// Kötü: Kontrol akışı için exception kullanma
try {
    val user = findUser(id)
} catch (e: NotFoundException) {
    // Beklenen durumlar için exception kullanma
}

// İyi: Nullable dönüş veya Result kullan
val user: User? = findUserOrNull(id)

// Kötü: Coroutine scope'u görmezden gelme
GlobalScope.launch { /* GlobalScope'tan kaçın */ }

// İyi: Yapılandırılmış eşzamanlılık kullan
coroutineScope {
    launch { /* Uygun şekilde scope edilmiş */ }
}

// Kötü: Derin iç içe scope fonksiyonlar
user?.let { u ->
    u.address?.let { a ->
        a.city?.let { c -> process(c) }
    }
}

// İyi: Doğrudan null-safe zincir
user?.address?.city?.let { process(it) }
```

**Hatırla**: Kotlin kodu kısa ama okunabilir olmalı. Güvenlik için tip sisteminden yararlanın, immutability tercih edin ve eşzamanlılık için coroutine'ler kullanın. Şüpheye düştüğünüzde, derleyicinin size yardım etmesine izin verin.
