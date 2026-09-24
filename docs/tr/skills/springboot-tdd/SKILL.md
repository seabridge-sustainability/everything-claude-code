---
name: springboot-tdd
description: Test-driven development for Spring Boot using JUnit 5, Mockito, MockMvc, Testcontainers, and JaCoCo. Use when adding features, fixing bugs, or refactoring.
origin: ECC
---

# Spring Boot TDD Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

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


80%+ kapsam (unit + integration) ile Spring Boot servisleri iÃƒÂ§in TDD rehberi.

## Ne Zaman KullanÃ„Â±lÃ„Â±r

- Yeni ÃƒÂ¶zellikler veya endpoint'ler
- Bug dÃƒÂ¼zeltmeleri veya refactoring'ler
- Veri eriÃ…Å¸im mantÃ„Â±Ã„Å¸Ã„Â± veya gÃƒÂ¼venlik kurallarÃ„Â± ekleme

## Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

1) Ãƒâ€“nce testleri yazÃ„Â±n (baÃ…Å¸arÃ„Â±sÃ„Â±z olmalÃ„Â±lar)
2) GeÃƒÂ§mek iÃƒÂ§in minimal kod uygulayÃ„Â±n
3) Testleri yeÃ…Å¸il tutarken refactor edin
4) KapsamÃ„Â± zorlayÃ„Â±n (JaCoCo)

## Unit Testler (JUnit 5 + Mockito)

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

Desenler:
- Arrange-Act-Assert
- KÃ„Â±smi mock'lardan kaÃƒÂ§Ã„Â±nÃ„Â±n; aÃƒÂ§Ã„Â±k stubbing tercih edin
- Varyantlar iÃƒÂ§in `@ParameterizedTest` kullanÃ„Â±n

## Web KatmanÃ„Â± Testleri (MockMvc)

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

## Entegrasyon Testleri (SpringBootTest)

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

## Persistence Testleri (DataJpaTest)

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

- Production'Ã„Â± yansÃ„Â±tmak iÃƒÂ§in Postgres/Redis iÃƒÂ§in yeniden kullanÃ„Â±labilir container'lar kullanÃ„Â±n
- JDBC URL'lerini Spring context'e enjekte etmek iÃƒÂ§in `@DynamicPropertySource` ile baÃ„Å¸layÃ„Â±n

## Kapsam (JaCoCo)

Maven snippet:
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

## Assertion'lar

- Okunabilirlik iÃƒÂ§in AssertJ'yi (`assertThat`) tercih edin
- JSON yanÃ„Â±tlarÃ„Â± iÃƒÂ§in `jsonPath` kullanÃ„Â±n
- Exception'lar iÃƒÂ§in: `assertThatThrownBy(...)`

## Test Veri Builder'larÃ„Â±

```java
class MarketBuilder {
  private String name = "Test";
  MarketBuilder withName(String name) { this.name = name; return this; }
  Market build() { return new Market(null, name, MarketStatus.ACTIVE); }
}
```

## CI KomutlarÃ„Â±

- Maven: `mvn -T 4 test` veya `mvn verify`
- Gradle: `./gradlew test jacocoTestReport`

**UnutmayÃ„Â±n**: Testleri hÃ„Â±zlÃ„Â±, izole ve deterministik tutun. Uygulama detaylarÃ„Â±nÃ„Â± deÃ„Å¸il, davranÃ„Â±Ã…Å¸Ã„Â± test edin.
