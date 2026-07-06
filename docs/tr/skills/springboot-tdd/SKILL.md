---
name: springboot-tdd
description: Test-driven development for Spring Boot using JUnit 5, Mockito, MockMvc, Testcontainers, and JaCoCo. Use when adding features, fixing bugs, or refactoring.
origin: ECC
---

# Spring Boot TDD Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

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
