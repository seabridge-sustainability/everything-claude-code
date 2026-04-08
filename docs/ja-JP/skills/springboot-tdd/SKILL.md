---
name: springboot-tdd
description: Test-driven development for Spring Boot using JUnit 5, Mockito, MockMvc, Testcontainers, and JaCoCo. Use when adding features, fixing bugs, or refactoring.
---

# Spring Boot TDD Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


80%Ã¤Â»Â¥Ã¤Â¸Å Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã¯Â¼Ë†Ã£Æ’Â¦Ã£Æ’â€¹Ã£Æ’Æ’Ã£Æ’Ë†+Ã§ÂµÂ±Ã¥ÂË†Ã¯Â¼â€°Ã£â€šâ€™Ã¦Å’ÂÃ£ÂÂ¤Spring BootÃ£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢ÂºÃ£â€šÂ¬Ã£â€šÂ¤Ã£Æ’â‚¬Ã£Æ’Â³Ã£â€šÂ¹Ã£â‚¬â€š

## Ã£Ââ€žÃ£ÂÂ¤Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€¹

- Ã¦â€“Â°Ã¦Â©Å¸Ã¨Æ’Â½Ã£â€šâ€žÃ£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†
- Ã£Æ’ÂÃ£â€šÂ°Ã¤Â¿Â®Ã¦Â­Â£Ã£â€šâ€žÃ£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
- Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ¹Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šâ€žÃ£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’Â«Ã£ÂÂ®Ã¨Â¿Â½Ã¥Å Â 

## Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

1) Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã¦â€ºÂ¸Ã£ÂÂÃ¯Â¼Ë†Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂÃ¯Â¼â€°
2) Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã©â‚¬Å¡Ã£Ââ„¢Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¦Å“â‚¬Ã¥Â°ÂÃ©â„¢ÂÃ£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â£â€¦
3) Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ°Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¡Ã£ÂÂªÃ£ÂÅ’Ã£â€šâ€°Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
4) Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã¥Â¼Â·Ã¥Ë†Â¶Ã¯Â¼Ë†JaCoCoÃ¯Â¼â€°

## Ã£Æ’Â¦Ã£Æ’â€¹Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¯Â¼Ë†JUnit 5 + MockitoÃ¯Â¼â€°

```java
@ExtendWith(MockitoExtension.class)
class MarketServiceTest {
  @Mock MarketRepository repo;
  @InjectMocks MarketService service;

  @Test
  void createsMarket() {
    CreateMarketRequest req = new CreateMarketRequest("name", "desc", Instant.now(), List.of("cat"));
    when(repo.save(any())).thenAnswer(inv -> inv.getArgument(0));

    Market result = service.create(req);

    assertThat(result.name()).isEqualTo("name");
    verify(repo).save(any());
  }
}
```

Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³:
- Arrange-Act-Assert
- Ã©Æ’Â¨Ã¥Ë†â€ Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹Ã£â‚¬â€šÃ¦ËœÅ½Ã§Â¤ÂºÃ§Å¡â€žÃ£ÂÂªÃ£â€šÂ¹Ã£â€šÂ¿Ã£Æ’â€œÃ£Æ’Â³Ã£â€šÂ°Ã£â€šâ€™Ã¥â€žÂªÃ¥â€¦Ë†
- Ã£Æ’ÂÃ£Æ’ÂªÃ£â€šÂ¨Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ«`@ParameterizedTest`Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨

## WebÃ£Æ’Â¬Ã£â€šÂ¤Ã£Æ’Â¤Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¯Â¼Ë†MockMvcÃ¯Â¼â€°

```java
@WebMvcTest(MarketController.class)
class MarketControllerTest {
  @Autowired MockMvc mockMvc;
  @MockBean MarketService marketService;

  @Test
  void returnsMarkets() throws Exception {
    when(marketService.list(any())).thenReturn(Page.empty());

    mockMvc.perform(get("/api/markets"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").isArray());
  }
}
```

## Ã§ÂµÂ±Ã¥ÂË†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¯Â¼Ë†SpringBootTestÃ¯Â¼â€°

```java
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class MarketIntegrationTest {
  @Autowired MockMvc mockMvc;

  @Test
  void createsMarket() throws Exception {
    mockMvc.perform(post("/api/markets")
        .contentType(MediaType.APPLICATION_JSON)
        .content("""
          {"name":"Test","description":"Desc","endDate":"2030-01-01T00:00:00Z","categories":["general"]}
        """))
      .andExpect(status().isCreated());
  }
}
```

## Ã¦Â°Â¸Ã§Â¶Å¡Ã¥Å’â€“Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¯Â¼Ë†DataJpaTestÃ¯Â¼â€°

```java
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(TestContainersConfig.class)
class MarketRepositoryTest {
  @Autowired MarketRepository repo;

  @Test
  void savesAndFinds() {
    MarketEntity entity = new MarketEntity();
    entity.setName("Test");
    repo.save(entity);

    Optional<MarketEntity> found = repo.findByName("Test");
    assertThat(found).isPresent();
  }
}
```

## Testcontainers

- Ã¦Å“Â¬Ã§â€¢ÂªÃ§â€™Â°Ã¥Â¢Æ’Ã£â€šâ€™Ã¥ÂÂÃ¦ËœÂ Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«Postgres/RedisÃ§â€Â¨Ã£ÂÂ®Ã¥â€ ÂÃ¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’Å Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- `@DynamicPropertySource`Ã§ÂµÅ’Ã§â€Â±Ã£ÂÂ§JDBC URLÃ£â€šâ€™SpringÃ£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ«Ã¦Â³Â¨Ã¥â€¦Â¥

## Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã¯Â¼Ë†JaCoCoÃ¯Â¼â€°

MavenÃ£â€šÂ¹Ã£Æ’â€¹Ã£Æ’Å¡Ã£Æ’Æ’Ã£Æ’Ë†:
```xml
<plugin>
  <groupId>org.jacoco</groupId>
  <artifactId>jacoco-maven-plugin</artifactId>
  <version>0.8.14</version>
  <executions>
    <execution>
      <goals><goal>prepare-agent</goal></goals>
    </execution>
    <execution>
      <id>report</id>
      <phase>verify</phase>
      <goals><goal>report</goal></goals>
    </execution>
  </executions>
</plugin>
```

## Ã£â€šÂ¢Ã£â€šÂµÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

- Ã¥ÂÂ¯Ã¨ÂªÂ­Ã¦â‚¬Â§Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«AssertJÃ¯Â¼Ë†`assertThat`Ã¯Â¼â€°Ã£â€šâ€™Ã¥â€žÂªÃ¥â€¦Ë†
- JSONÃ£Æ’Â¬Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ¹Ã£ÂÂ«Ã£ÂÂ¯`jsonPath`Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- Ã¤Â¾â€¹Ã¥Â¤â€“Ã£ÂÂ«Ã£ÂÂ¯: `assertThatThrownBy(...)`

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â‚¬Ã£Æ’Â¼

```java
class MarketBuilder {
  private String name = "Test";
  MarketBuilder withName(String name) { this.name = name; return this; }
  Market build() { return new Market(null, name, MarketStatus.ACTIVE); }
}
```

## CIÃ£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

- Maven: `mvn -T 4 test` Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯ `mvn verify`
- Gradle: `./gradlew test jacocoTestReport`

**Ã¨Â¦Å¡Ã£ÂË†Ã£ÂÂ¦Ã£ÂÅ Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž**: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã©Â«ËœÃ©â‚¬Å¸Ã£ÂÂ§Ã£â‚¬ÂÃ¥Ë†â€ Ã©â€ºÂ¢Ã£Ââ€¢Ã£â€šÅ’Ã£â‚¬ÂÃ¦Â±ÂºÃ¥Â®Å¡Ã¨Â«â€“Ã§Å¡â€žÃ£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¡Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ¥Â®Å¸Ã¨Â£â€¦Ã£ÂÂ®Ã¨Â©Â³Ã§Â´Â°Ã£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ£â‚¬ÂÃ¥â€¹â€¢Ã¤Â½Å“Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
