---
paths:
  - "**/*.java"
---

# Java 测试

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

> 本文档扩展了 [common/testing.md](../common/testing.md) 中与 Java 相关的内容。

## 测试框架

* **JUnit 5** (`@Test`, `@ParameterizedTest`, `@Nested`, `@DisplayName`)
* **AssertJ** 用于流式断言 (`assertThat(result).isEqualTo(expected)`)
* **Mockito** 用于模拟依赖
* **Testcontainers** 用于需要数据库或服务的集成测试

## 测试组织

```
src/test/java/com/example/app/
  service/           # 服务层单元测试
  controller/        # Web 层/API 测试
  repository/        # 数据访问测试
  integration/       # 跨层集成测试
```

在 `src/test/java` 中镜像 `src/main/java` 的包结构。

## 单元测试模式

```java
@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    private OrderService orderService;

    @BeforeEach
    void setUp() {
        orderService = new OrderService(orderRepository);
    }

    @Test
    @DisplayName("findById returns order when exists")
    void findById_existingOrder_returnsOrder() {
        var order = new Order(1L, "Alice", BigDecimal.TEN);
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        var result = orderService.findById(1L);

        assertThat(result.customerName()).isEqualTo("Alice");
        verify(orderRepository).findById(1L);
    }

    @Test
    @DisplayName("findById throws when order not found")
    void findById_missingOrder_throws() {
        when(orderRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> orderService.findById(99L))
            .isInstanceOf(OrderNotFoundException.class)
            .hasMessageContaining("99");
    }
}
```

## 参数化测试

```java
@ParameterizedTest
@CsvSource({
    "100.00, 10, 90.00",
    "50.00, 0, 50.00",
    "200.00, 25, 150.00"
})
@DisplayName("discount applied correctly")
void applyDiscount(BigDecimal price, int pct, BigDecimal expected) {
    assertThat(PricingUtils.discount(price, pct)).isEqualByComparingTo(expected);
}
```

## 集成测试

使用 Testcontainers 进行真实的数据库集成：

```java
@Testcontainers
class OrderRepositoryIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

    private OrderRepository repository;

    @BeforeEach
    void setUp() {
        var dataSource = new PGSimpleDataSource();
        dataSource.setUrl(postgres.getJdbcUrl());
        dataSource.setUser(postgres.getUsername());
        dataSource.setPassword(postgres.getPassword());
        repository = new JdbcOrderRepository(dataSource);
    }

    @Test
    void save_and_findById() {
        var saved = repository.save(new Order(null, "Bob", BigDecimal.ONE));
        var found = repository.findById(saved.getId());
        assertThat(found).isPresent();
    }
}
```

关于 Spring Boot 集成测试，请参阅技能：`springboot-tdd`。
关于 Quarkus 集成测试，请参阅技能：`quarkus-tdd`。

## 测试命名

使用带有 `@DisplayName` 的描述性名称：

* `methodName_scenario_expectedBehavior()` 用于方法名
* `@DisplayName("human-readable description")` 用于报告

## 覆盖率

* 目标为 80%+ 的行覆盖率
* 使用 JaCoCo 生成覆盖率报告
* 重点关注服务和领域逻辑 — 跳过简单的 getter/配置类

## 参考

关于使用 MockMvc 和 Testcontainers 的 Spring Boot TDD 模式，请参阅技能：`springboot-tdd`。
关于使用 REST Assured 和 Camel 测试的 Quarkus TDD 模式，请参阅技能：`quarkus-tdd`。
关于测试期望，请参阅技能：`java-coding-standards`。
