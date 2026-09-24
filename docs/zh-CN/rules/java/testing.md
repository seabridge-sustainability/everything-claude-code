---
paths:
  - "**/*.java"
---

# Java 测试

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
