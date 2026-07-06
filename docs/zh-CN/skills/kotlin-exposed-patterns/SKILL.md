---
name: kotlin-exposed-patterns
description: JetBrains Exposed ORM Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¥Å’â€¦Ã¦â€¹Â¬ DSL Ã¦Å¸Â¥Ã¨Â¯Â¢Ã£â‚¬ÂDAO Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬ÂÃ¤Âºâ€¹Ã¥Å Â¡Ã£â‚¬ÂHikariCP Ã¨Â¿Å¾Ã¦Å½Â¥Ã¦Â±Â Ã£â‚¬ÂFlyway Ã¨Â¿ÂÃ§Â§Â»Ã¥â€™Å’Ã¤Â»â€œÃ¥Âºâ€œÃ¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š
origin: ECC
---

# Kotlin Exposed Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã¤Â½Â¿Ã§â€Â¨ JetBrains Exposed ORM Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â®Â¿Ã©â€”Â®Ã§Å¡â€žÃ¥â€¦Â¨Ã©ÂÂ¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¥Å’â€¦Ã¦â€¹Â¬ DSL Ã¦Å¸Â¥Ã¨Â¯Â¢Ã£â‚¬ÂDAOÃ£â‚¬ÂÃ¤Âºâ€¹Ã¥Å Â¡Ã¤Â»Â¥Ã¥ÂÅ Ã§â€Å¸Ã¤ÂºÂ§Ã¥Â°Â±Ã§Â»ÂªÃ§Å¡â€žÃ©â€¦ÂÃ§Â½Â®Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

* Ã¤Â½Â¿Ã§â€Â¨ Exposed Ã¨Â®Â¾Ã§Â½Â®Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â®Â¿Ã©â€”Â®
* Ã¤Â½Â¿Ã§â€Â¨ Exposed DSL Ã¦Ë†â€“ DAO Ã§Â¼â€“Ã¥â€ â„¢ SQL Ã¦Å¸Â¥Ã¨Â¯Â¢
* Ã¤Â½Â¿Ã§â€Â¨ HikariCP Ã©â€¦ÂÃ§Â½Â®Ã¨Â¿Å¾Ã¦Å½Â¥Ã¦Â±Â 
* Ã¤Â½Â¿Ã§â€Â¨ Flyway Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â¿ÂÃ§Â§Â»
* Ã¤Â½Â¿Ã§â€Â¨ Exposed Ã¥Â®Å¾Ã§Å½Â°Ã¤Â»â€œÃ¥â€šÂ¨Ã¦Â¨Â¡Ã¥Â¼Â
* Ã¥Â¤â€žÃ§Ââ€  JSON Ã¥Ë†â€”Ã¥â€™Å’Ã¥Â¤ÂÃ¦Ââ€šÃ¦Å¸Â¥Ã¨Â¯Â¢

## Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å½Å¸Ã§Ââ€ 

Exposed Ã¦ÂÂÃ¤Â¾â€ºÃ¤Â¸Â¤Ã§Â§ÂÃ¦Å¸Â¥Ã¨Â¯Â¢Ã©Â£Å½Ã¦Â Â¼Ã¯Â¼Å¡Ã§â€Â¨Ã¤ÂºÅ½Ã§â€ºÂ´Ã¦Å½Â¥Ã§Â±Â»Ã¤Â¼Â¼ SQL Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ§Å¡â€ž DSL Ã¥â€™Å’Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â®Å¾Ã¤Â½â€œÃ§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã§Â®Â¡Ã§Ââ€ Ã§Å¡â€ž DAOÃ£â‚¬â€šHikariCP Ã©â‚¬Å¡Ã¨Â¿â€¡ `HikariConfig` Ã©â€¦ÂÃ§Â½Â®Ã¦ÂÂ¥Ã§Â®Â¡Ã§Ââ€ Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã§Å¡â€žÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â¿Å¾Ã¦Å½Â¥Ã¦Â±Â Ã£â‚¬â€šFlyway Ã¥Å“Â¨Ã¥ÂÂ¯Ã¥Å Â¨Ã¦â€”Â¶Ã¨Â¿ÂÃ¨Â¡Å’Ã§â€°Ë†Ã¦Å“Â¬Ã¥Å’â€“Ã§Å¡â€ž SQL Ã¨Â¿ÂÃ§Â§Â»Ã¨â€žÅ¡Ã¦Å“Â¬Ã¤Â»Â¥Ã¤Â¿ÂÃ¦Å’ÂÃ¦Â¨Â¡Ã¥Â¼ÂÃ¥ÂÅ’Ã¦Â­Â¥Ã£â‚¬â€šÃ¦â€°â‚¬Ã¦Å“â€°Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¦â€œÂÃ¤Â½Å“Ã©Æ’Â½Ã¥Å“Â¨ `newSuspendedTransaction` Ã¥Ââ€”Ã¥â€ â€¦Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å’Ã¤Â»Â¥Ã§Â¡Â®Ã¤Â¿ÂÃ¥ÂÂÃ§Â¨â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã¥â€™Å’Ã¥Å½Å¸Ã¥Â­ÂÃ¦â‚¬Â§Ã£â‚¬â€šÃ¤Â»â€œÃ¥â€šÂ¨Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥Â°â€  Exposed Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¥Å’â€¦Ã¨Â£â€¦Ã¥Å“Â¨Ã¦Å½Â¥Ã¥ÂÂ£Ã¤Â¹â€¹Ã¥ÂÅ½Ã¯Â¼Å’Ã¤Â½Â¿Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¤Â¸Å½Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Â±â€šÃ¨Â§Â£Ã¨â‚¬Â¦Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â¸â€Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥ÂÂ¯Ã¤Â»Â¥Ã¤Â½Â¿Ã§â€Â¨Ã¥â€ â€¦Ã¥Â­ËœÃ¤Â¸Â­Ã§Å¡â€ž H2 Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ£â‚¬â€š

## Ã§Â¤ÂºÃ¤Â¾â€¹

### DSL Ã¦Å¸Â¥Ã¨Â¯Â¢

```kotlin
suspend fun findUserById(id: UUID): UserRow? =
    newSuspendedTransaction {
        UsersTable.selectAll()
            .where { UsersTable.id eq id }
            .map { it.toUser() }
            .singleOrNull()
    }
```

### DAO Ã¥Â®Å¾Ã¤Â½â€œÃ§â€Â¨Ã¦Â³â€¢

```kotlin
suspend fun createUser(request: CreateUserRequest): User =
    newSuspendedTransaction {
        UserEntity.new {
            name = request.name
            email = request.email
            role = request.role
        }.toModel()
    }
```

### HikariCP Ã©â€¦ÂÃ§Â½Â®

```kotlin
val hikariConfig = HikariConfig().apply {
    driverClassName = config.driver
    jdbcUrl = config.url
    username = config.username
    password = config.password
    maximumPoolSize = config.maxPoolSize
    isAutoCommit = false
    transactionIsolation = "TRANSACTION_READ_COMMITTED"
    validate()
}
```

## Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â®Â¾Ã§Â½Â®

### HikariCP Ã¨Â¿Å¾Ã¦Å½Â¥Ã¦Â±Â 

```kotlin
// DatabaseFactory.kt
object DatabaseFactory {
    fun create(config: DatabaseConfig): Database {
        val hikariConfig = HikariConfig().apply {
            driverClassName = config.driver
            jdbcUrl = config.url
            username = config.username
            password = config.password
            maximumPoolSize = config.maxPoolSize
            isAutoCommit = false
            transactionIsolation = "TRANSACTION_READ_COMMITTED"
            validate()
        }

        return Database.connect(HikariDataSource(hikariConfig))
    }
}

data class DatabaseConfig(
    val url: String,
    val driver: String = "org.postgresql.Driver",
    val username: String = "",
    val password: String = "",
    val maxPoolSize: Int = 10,
)
```

### Flyway Ã¨Â¿ÂÃ§Â§Â»

```kotlin
// FlywayMigration.kt
fun runMigrations(config: DatabaseConfig) {
    Flyway.configure()
        .dataSource(config.url, config.username, config.password)
        .locations("classpath:db/migration")
        .baselineOnMigrate(true)
        .load()
        .migrate()
}

// Application startup
fun Application.module() {
    val config = DatabaseConfig(
        url = environment.config.property("database.url").getString(),
        username = environment.config.property("database.username").getString(),
        password = environment.config.property("database.password").getString(),
    )
    runMigrations(config)
    val database = DatabaseFactory.create(config)
    // ...
}
```

### Ã¨Â¿ÂÃ§Â§Â»Ã¦â€“â€¡Ã¤Â»Â¶

```sql
-- src/main/resources/db/migration/V1__create_users.sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

## Ã¨Â¡Â¨Ã¥Â®Å¡Ã¤Â¹â€°

### DSL Ã©Â£Å½Ã¦Â Â¼Ã¨Â¡Â¨

```kotlin
// tables/UsersTable.kt
object UsersTable : UUIDTable("users") {
    val name = varchar("name", 100)
    val email = varchar("email", 255).uniqueIndex()
    val role = enumerationByName<Role>("role", 20)
    val metadata = jsonb<UserMetadata>("metadata", Json.Default).nullable()
    val createdAt = timestampWithTimeZone("created_at").defaultExpression(CurrentTimestampWithTimeZone)
    val updatedAt = timestampWithTimeZone("updated_at").defaultExpression(CurrentTimestampWithTimeZone)
}

object OrdersTable : UUIDTable("orders") {
    val userId = uuid("user_id").references(UsersTable.id)
    val status = enumerationByName<OrderStatus>("status", 20)
    val totalAmount = long("total_amount")
    val currency = varchar("currency", 3)
    val createdAt = timestampWithTimeZone("created_at").defaultExpression(CurrentTimestampWithTimeZone)
}

object OrderItemsTable : UUIDTable("order_items") {
    val orderId = uuid("order_id").references(OrdersTable.id, onDelete = ReferenceOption.CASCADE)
    val productId = uuid("product_id")
    val quantity = integer("quantity")
    val unitPrice = long("unit_price")
}
```

### Ã¥Â¤ÂÃ¥ÂË†Ã¨Â¡Â¨

```kotlin
object UserRolesTable : Table("user_roles") {
    val userId = uuid("user_id").references(UsersTable.id, onDelete = ReferenceOption.CASCADE)
    val roleId = uuid("role_id").references(RolesTable.id, onDelete = ReferenceOption.CASCADE)
    override val primaryKey = PrimaryKey(userId, roleId)
}
```

## DSL Ã¦Å¸Â¥Ã¨Â¯Â¢

### Ã¥Å¸ÂºÃ¦Å“Â¬ CRUD

```kotlin
// Insert
suspend fun insertUser(name: String, email: String, role: Role): UUID =
    newSuspendedTransaction {
        UsersTable.insertAndGetId {
            it[UsersTable.name] = name
            it[UsersTable.email] = email
            it[UsersTable.role] = role
        }.value
    }

// Select by ID
suspend fun findUserById(id: UUID): UserRow? =
    newSuspendedTransaction {
        UsersTable.selectAll()
            .where { UsersTable.id eq id }
            .map { it.toUser() }
            .singleOrNull()
    }

// Select with conditions
suspend fun findActiveAdmins(): List<UserRow> =
    newSuspendedTransaction {
        UsersTable.selectAll()
            .where { (UsersTable.role eq Role.ADMIN) }
            .orderBy(UsersTable.name)
            .map { it.toUser() }
    }

// Update
suspend fun updateUserEmail(id: UUID, newEmail: String): Boolean =
    newSuspendedTransaction {
        UsersTable.update({ UsersTable.id eq id }) {
            it[email] = newEmail
            it[updatedAt] = CurrentTimestampWithTimeZone
        } > 0
    }

// Delete
suspend fun deleteUser(id: UUID): Boolean =
    newSuspendedTransaction {
        UsersTable.deleteWhere { UsersTable.id eq id } > 0
    }

// Row mapping
private fun ResultRow.toUser() = UserRow(
    id = this[UsersTable.id].value,
    name = this[UsersTable.name],
    email = this[UsersTable.email],
    role = this[UsersTable.role],
    metadata = this[UsersTable.metadata],
    createdAt = this[UsersTable.createdAt],
    updatedAt = this[UsersTable.updatedAt],
)
```

### Ã©Â«ËœÃ§ÂºÂ§Ã¦Å¸Â¥Ã¨Â¯Â¢

```kotlin
// Join queries
suspend fun findOrdersWithUser(userId: UUID): List<OrderWithUser> =
    newSuspendedTransaction {
        (OrdersTable innerJoin UsersTable)
            .selectAll()
            .where { OrdersTable.userId eq userId }
            .orderBy(OrdersTable.createdAt, SortOrder.DESC)
            .map { row ->
                OrderWithUser(
                    orderId = row[OrdersTable.id].value,
                    status = row[OrdersTable.status],
                    totalAmount = row[OrdersTable.totalAmount],
                    userName = row[UsersTable.name],
                )
            }
    }

// Aggregation
suspend fun countUsersByRole(): Map<Role, Long> =
    newSuspendedTransaction {
        UsersTable
            .select(UsersTable.role, UsersTable.id.count())
            .groupBy(UsersTable.role)
            .associate { row ->
                row[UsersTable.role] to row[UsersTable.id.count()]
            }
    }

// Subqueries
suspend fun findUsersWithOrders(): List<UserRow> =
    newSuspendedTransaction {
        UsersTable.selectAll()
            .where {
                UsersTable.id inSubQuery
                    OrdersTable.select(OrdersTable.userId).withDistinct()
            }
            .map { it.toUser() }
    }

// LIKE and pattern matching Ã¢â‚¬â€ always escape user input to prevent wildcard injection
private fun escapeLikePattern(input: String): String =
    input.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")

suspend fun searchUsers(query: String): List<UserRow> =
    newSuspendedTransaction {
        val sanitized = escapeLikePattern(query.lowercase())
        UsersTable.selectAll()
            .where {
                (UsersTable.name.lowerCase() like "%${sanitized}%") or
                    (UsersTable.email.lowerCase() like "%${sanitized}%")
            }
            .map { it.toUser() }
    }
```

### Ã¥Ë†â€ Ã©Â¡Âµ

```kotlin
data class Page<T>(
    val data: List<T>,
    val total: Long,
    val page: Int,
    val limit: Int,
) {
    val totalPages: Int get() = ((total + limit - 1) / limit).toInt()
    val hasNext: Boolean get() = page < totalPages
    val hasPrevious: Boolean get() = page > 1
}

suspend fun findUsersPaginated(page: Int, limit: Int): Page<UserRow> =
    newSuspendedTransaction {
        val total = UsersTable.selectAll().count()
        val data = UsersTable.selectAll()
            .orderBy(UsersTable.createdAt, SortOrder.DESC)
            .limit(limit)
            .offset(((page - 1) * limit).toLong())
            .map { it.toUser() }

        Page(data = data, total = total, page = page, limit = limit)
    }
```

### Ã¦â€°Â¹Ã©â€¡ÂÃ¦â€œÂÃ¤Â½Å“

```kotlin
// Batch insert
suspend fun insertUsers(users: List<CreateUserRequest>): List<UUID> =
    newSuspendedTransaction {
        UsersTable.batchInsert(users) { user ->
            this[UsersTable.name] = user.name
            this[UsersTable.email] = user.email
            this[UsersTable.role] = user.role
        }.map { it[UsersTable.id].value }
    }

// Upsert (insert or update on conflict)
suspend fun upsertUser(id: UUID, name: String, email: String) {
    newSuspendedTransaction {
        UsersTable.upsert(UsersTable.email) {
            it[UsersTable.id] = EntityID(id, UsersTable)
            it[UsersTable.name] = name
            it[UsersTable.email] = email
            it[updatedAt] = CurrentTimestampWithTimeZone
        }
    }
}
```

## DAO Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¥Â®Å¾Ã¤Â½â€œÃ¥Â®Å¡Ã¤Â¹â€°

```kotlin
// entities/UserEntity.kt
class UserEntity(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<UserEntity>(UsersTable)

    var name by UsersTable.name
    var email by UsersTable.email
    var role by UsersTable.role
    var metadata by UsersTable.metadata
    var createdAt by UsersTable.createdAt
    var updatedAt by UsersTable.updatedAt

    val orders by OrderEntity referrersOn OrdersTable.userId

    fun toModel(): User = User(
        id = id.value,
        name = name,
        email = email,
        role = role,
        metadata = metadata,
        createdAt = createdAt,
        updatedAt = updatedAt,
    )
}

class OrderEntity(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<OrderEntity>(OrdersTable)

    var user by UserEntity referencedOn OrdersTable.userId
    var status by OrdersTable.status
    var totalAmount by OrdersTable.totalAmount
    var currency by OrdersTable.currency
    var createdAt by OrdersTable.createdAt

    val items by OrderItemEntity referrersOn OrderItemsTable.orderId
}
```

### DAO Ã¦â€œÂÃ¤Â½Å“

```kotlin
suspend fun findUserByEmail(email: String): User? =
    newSuspendedTransaction {
        UserEntity.find { UsersTable.email eq email }
            .firstOrNull()
            ?.toModel()
    }

suspend fun createUser(request: CreateUserRequest): User =
    newSuspendedTransaction {
        UserEntity.new {
            name = request.name
            email = request.email
            role = request.role
        }.toModel()
    }

suspend fun updateUser(id: UUID, request: UpdateUserRequest): User? =
    newSuspendedTransaction {
        UserEntity.findById(id)?.apply {
            request.name?.let { name = it }
            request.email?.let { email = it }
            updatedAt = OffsetDateTime.now(ZoneOffset.UTC)
        }?.toModel()
    }
```

## Ã¤Âºâ€¹Ã¥Å Â¡

### Ã¦Å’â€šÃ¨ÂµÂ·Ã¤Âºâ€¹Ã¥Å Â¡Ã¦â€Â¯Ã¦Å’Â

```kotlin
// Good: Use newSuspendedTransaction for coroutine support
suspend fun performDatabaseOperation(): Result<User> =
    runCatching {
        newSuspendedTransaction {
            val user = UserEntity.new {
                name = "Alice"
                email = "alice@example.com"
            }
            // All operations in this block are atomic
            user.toModel()
        }
    }

// Good: Nested transactions with savepoints
suspend fun transferFunds(fromId: UUID, toId: UUID, amount: Long) {
    newSuspendedTransaction {
        val from = UserEntity.findById(fromId) ?: throw NotFoundException("User $fromId not found")
        val to = UserEntity.findById(toId) ?: throw NotFoundException("User $toId not found")

        // Debit
        from.balance -= amount
        // Credit
        to.balance += amount

        // Both succeed or both fail
    }
}
```

### Ã¤Âºâ€¹Ã¥Å Â¡Ã©Å¡â€Ã§Â¦Â»Ã§ÂºÂ§Ã¥Ë†Â«

```kotlin
suspend fun readCommittedQuery(): List<User> =
    newSuspendedTransaction(transactionIsolation = Connection.TRANSACTION_READ_COMMITTED) {
        UserEntity.all().map { it.toModel() }
    }

suspend fun serializableOperation() {
    newSuspendedTransaction(transactionIsolation = Connection.TRANSACTION_SERIALIZABLE) {
        // Strictest isolation level for critical operations
    }
}
```

## Ã¤Â»â€œÃ¥â€šÂ¨Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¦Å½Â¥Ã¥ÂÂ£Ã¥Â®Å¡Ã¤Â¹â€°

```kotlin
interface UserRepository {
    suspend fun findById(id: UUID): User?
    suspend fun findByEmail(email: String): User?
    suspend fun findAll(page: Int, limit: Int): Page<User>
    suspend fun search(query: String): List<User>
    suspend fun create(request: CreateUserRequest): User
    suspend fun update(id: UUID, request: UpdateUserRequest): User?
    suspend fun delete(id: UUID): Boolean
    suspend fun count(): Long
}
```

### Exposed Ã¥Â®Å¾Ã§Å½Â°

```kotlin
class ExposedUserRepository(
    private val database: Database,
) : UserRepository {

    override suspend fun findById(id: UUID): User? =
        newSuspendedTransaction(db = database) {
            UsersTable.selectAll()
                .where { UsersTable.id eq id }
                .map { it.toUser() }
                .singleOrNull()
        }

    override suspend fun findByEmail(email: String): User? =
        newSuspendedTransaction(db = database) {
            UsersTable.selectAll()
                .where { UsersTable.email eq email }
                .map { it.toUser() }
                .singleOrNull()
        }

    override suspend fun findAll(page: Int, limit: Int): Page<User> =
        newSuspendedTransaction(db = database) {
            val total = UsersTable.selectAll().count()
            val data = UsersTable.selectAll()
                .orderBy(UsersTable.createdAt, SortOrder.DESC)
                .limit(limit)
                .offset(((page - 1) * limit).toLong())
                .map { it.toUser() }
            Page(data = data, total = total, page = page, limit = limit)
        }

    override suspend fun search(query: String): List<User> =
        newSuspendedTransaction(db = database) {
            val sanitized = escapeLikePattern(query.lowercase())
            UsersTable.selectAll()
                .where {
                    (UsersTable.name.lowerCase() like "%${sanitized}%") or
                        (UsersTable.email.lowerCase() like "%${sanitized}%")
                }
                .orderBy(UsersTable.name)
                .map { it.toUser() }
        }

    override suspend fun create(request: CreateUserRequest): User =
        newSuspendedTransaction(db = database) {
            UsersTable.insert {
                it[name] = request.name
                it[email] = request.email
                it[role] = request.role
            }.resultedValues!!.first().toUser()
        }

    override suspend fun update(id: UUID, request: UpdateUserRequest): User? =
        newSuspendedTransaction(db = database) {
            val updated = UsersTable.update({ UsersTable.id eq id }) {
                request.name?.let { name -> it[UsersTable.name] = name }
                request.email?.let { email -> it[UsersTable.email] = email }
                it[updatedAt] = CurrentTimestampWithTimeZone
            }
            if (updated > 0) findById(id) else null
        }

    override suspend fun delete(id: UUID): Boolean =
        newSuspendedTransaction(db = database) {
            UsersTable.deleteWhere { UsersTable.id eq id } > 0
        }

    override suspend fun count(): Long =
        newSuspendedTransaction(db = database) {
            UsersTable.selectAll().count()
        }

    private fun ResultRow.toUser() = User(
        id = this[UsersTable.id].value,
        name = this[UsersTable.name],
        email = this[UsersTable.email],
        role = this[UsersTable.role],
        metadata = this[UsersTable.metadata],
        createdAt = this[UsersTable.createdAt],
        updatedAt = this[UsersTable.updatedAt],
    )
}
```

## JSON Ã¥Ë†â€”

### Ã¤Â½Â¿Ã§â€Â¨ kotlinx.serialization Ã§Å¡â€ž JSONB

```kotlin
// Custom column type for JSONB
inline fun <reified T : Any> Table.jsonb(
    name: String,
    json: Json,
): Column<T> = registerColumn(name, object : ColumnType<T>() {
    override fun sqlType() = "JSONB"

    override fun valueFromDB(value: Any): T = when (value) {
        is String -> json.decodeFromString(value)
        is PGobject -> {
            val jsonString = value.value
                ?: throw IllegalArgumentException("PGobject value is null for column '$name'")
            json.decodeFromString(jsonString)
        }
        else -> throw IllegalArgumentException("Unexpected value: $value")
    }

    override fun notNullValueToDB(value: T): Any =
        PGobject().apply {
            type = "jsonb"
            this.value = json.encodeToString(value)
        }
})

// Usage in table
@Serializable
data class UserMetadata(
    val preferences: Map<String, String> = emptyMap(),
    val tags: List<String> = emptyList(),
)

object UsersTable : UUIDTable("users") {
    val metadata = jsonb<UserMetadata>("metadata", Json.Default).nullable()
}
```

## Ã¤Â½Â¿Ã§â€Â¨ Exposed Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢

### Ã§â€Â¨Ã¤ÂºÅ½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â­ËœÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ

```kotlin
class UserRepositoryTest : FunSpec({
    lateinit var database: Database
    lateinit var repository: UserRepository

    beforeSpec {
        database = Database.connect(
            url = "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;MODE=PostgreSQL",
            driver = "org.h2.Driver",
        )
        transaction(database) {
            SchemaUtils.create(UsersTable)
        }
        repository = ExposedUserRepository(database)
    }

    beforeTest {
        transaction(database) {
            UsersTable.deleteAll()
        }
    }

    test("create and find user") {
        val user = repository.create(CreateUserRequest("Alice", "alice@example.com"))

        user.name shouldBe "Alice"
        user.email shouldBe "alice@example.com"

        val found = repository.findById(user.id)
        found shouldBe user
    }

    test("findByEmail returns null for unknown email") {
        val result = repository.findByEmail("unknown@example.com")
        result.shouldBeNull()
    }

    test("pagination works correctly") {
        repeat(25) { i ->
            repository.create(CreateUserRequest("User $i", "user$i@example.com"))
        }

        val page1 = repository.findAll(page = 1, limit = 10)
        page1.data shouldHaveSize 10
        page1.total shouldBe 25
        page1.hasNext shouldBe true

        val page3 = repository.findAll(page = 3, limit = 10)
        page3.data shouldHaveSize 5
        page3.hasNext shouldBe false
    }
})
```

## Gradle Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹

```kotlin
// build.gradle.kts
dependencies {
    // Exposed
    implementation("org.jetbrains.exposed:exposed-core:1.0.0")
    implementation("org.jetbrains.exposed:exposed-dao:1.0.0")
    implementation("org.jetbrains.exposed:exposed-jdbc:1.0.0")
    implementation("org.jetbrains.exposed:exposed-kotlin-datetime:1.0.0")
    implementation("org.jetbrains.exposed:exposed-json:1.0.0")

    // Database driver
    implementation("org.postgresql:postgresql:42.7.5")

    // Connection pooling
    implementation("com.zaxxer:HikariCP:6.2.1")

    // Migrations
    implementation("org.flywaydb:flyway-core:10.22.0")
    implementation("org.flywaydb:flyway-database-postgresql:10.22.0")

    // Testing
    testImplementation("com.h2database:h2:2.3.232")
}
```

## Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥Ââ€šÃ¨â‚¬Æ’Ã¯Â¼Å¡Exposed Ã¦Â¨Â¡Ã¥Â¼Â

| Ã¦Â¨Â¡Ã¥Â¼Â | Ã¦ÂÂÃ¨Â¿Â° |
|---------|-------------|
| `object Table : UUIDTable("name")` | Ã¥Â®Å¡Ã¤Â¹â€°Ã¥â€¦Â·Ã¦Å“â€° UUID Ã¤Â¸Â»Ã©â€Â®Ã§Å¡â€žÃ¨Â¡Â¨ |
| `newSuspendedTransaction { }` | Ã¥ÂÂÃ§Â¨â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¤Âºâ€¹Ã¥Å Â¡Ã¥Ââ€” |
| `Table.selectAll().where { }` | Ã¥Â¸Â¦Ã¦ÂÂ¡Ã¤Â»Â¶Ã§Å¡â€žÃ¦Å¸Â¥Ã¨Â¯Â¢ |
| `Table.insertAndGetId { }` | Ã¦Ââ€™Ã¥â€¦Â¥Ã¥Â¹Â¶Ã¨Â¿â€Ã¥â€ºÅ¾Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€ž ID |
| `Table.update({ condition }) { }` | Ã¦â€ºÂ´Ã¦â€“Â°Ã¥Å’Â¹Ã©â€¦ÂÃ§Å¡â€žÃ¨Â¡Å’ |
| `Table.deleteWhere { }` | Ã¥Ë†Â Ã©â„¢Â¤Ã¥Å’Â¹Ã©â€¦ÂÃ§Å¡â€žÃ¨Â¡Å’ |
| `Table.batchInsert(items) { }` | Ã©Â«ËœÃ¦â€¢Ë†Ã§Å¡â€žÃ¦â€°Â¹Ã©â€¡ÂÃ¦Ââ€™Ã¥â€¦Â¥ |
| `innerJoin` / `leftJoin` | Ã¨Â¿Å¾Ã¦Å½Â¥Ã¨Â¡Â¨ |
| `orderBy` / `limit` / `offset` | Ã¦Å½â€™Ã¥ÂºÂÃ¥â€™Å’Ã¥Ë†â€ Ã©Â¡Âµ |
| `count()` / `sum()` / `avg()` | Ã¨ÂÅ¡Ã¥ÂË†Ã¥â€¡Â½Ã¦â€¢Â° |

**Ã¨Â®Â°Ã¤Â½Â**Ã¯Â¼Å¡Ã¥Â¯Â¹Ã¤ÂºÅ½Ã§Â®â‚¬Ã¥Ââ€¢Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¤Â½Â¿Ã§â€Â¨ DSL Ã©Â£Å½Ã¦Â Â¼Ã¯Â¼Å’Ã¥Â½â€œÃ©Å“â‚¬Ã¨Â¦ÂÃ¥Â®Å¾Ã¤Â½â€œÃ§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã§Â®Â¡Ã§Ââ€ Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ DAO Ã©Â£Å½Ã¦Â Â¼Ã£â‚¬â€šÃ¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨ `newSuspendedTransaction` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Â¾â€”Ã¥ÂÂÃ§Â¨â€¹Ã¦â€Â¯Ã¦Å’ÂÃ¯Â¼Å’Ã¥Â¹Â¶Ã¥Â°â€ Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¦â€œÂÃ¤Â½Å“Ã¥Å’â€¦Ã¨Â£â€¦Ã¥Å“Â¨Ã¤Â»â€œÃ¥â€šÂ¨Ã¦Å½Â¥Ã¥ÂÂ£Ã¤Â¹â€¹Ã¥ÂÅ½Ã¤Â»Â¥Ã¦ÂÂÃ©Â«ËœÃ¥ÂÂ¯Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â‚¬Â§Ã£â‚¬â€š
