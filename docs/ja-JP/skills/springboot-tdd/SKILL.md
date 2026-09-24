---
name: springboot-tdd
description: Test-driven development for Spring Boot using JUnit 5, Mockito, MockMvc, Testcontainers, and JaCoCo. Use when adding features, fixing bugs, or refactoring.
---

# Spring Boot TDD Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

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
