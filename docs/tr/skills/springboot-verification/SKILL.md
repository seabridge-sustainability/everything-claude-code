---
name: springboot-verification
description: "Verification loop for Spring Boot projects: build, static analysis, tests with coverage, security scans, and diff review before release or PR."
origin: ECC
---

# Spring Boot DoÃ„Å¸rulama DÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼

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


PR'lardan ÃƒÂ¶nce, bÃƒÂ¼yÃƒÂ¼k deÃ„Å¸iÃ…Å¸ikliklerden sonra ve deployment ÃƒÂ¶ncesi ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n.

## Ne Zaman Aktif Edilir

- Spring Boot servisi iÃƒÂ§in pull request aÃƒÂ§madan ÃƒÂ¶nce
- BÃƒÂ¼yÃƒÂ¼k refactoring veya baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k yÃƒÂ¼kseltmelerinden sonra
- Staging veya production iÃƒÂ§in deployment ÃƒÂ¶ncesi doÃ„Å¸rulama
- Tam build Ã¢â€ â€™ lint Ã¢â€ â€™ test Ã¢â€ â€™ gÃƒÂ¼venlik taramasÃ„Â± pipeline'Ã„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rma
- Test kapsamÃ„Â±nÃ„Â±n eÃ…Å¸ikleri karÃ…Å¸Ã„Â±ladÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± doÃ„Å¸rulama

## Faz 1: Build

```bash
mvn -T 4 clean verify -DskipTests
# veya
./gradlew clean assemble -x test
```

Build baÃ…Å¸arÃ„Â±sÃ„Â±z olursa, durdurun ve dÃƒÂ¼zeltin.

## Faz 2: Static Analiz

Maven (yaygÃ„Â±n plugin'ler):
```bash
mvn -T 4 spotbugs:check pmd:check checkstyle:check
```

Gradle (yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸sa):
```bash
./gradlew checkstyleMain pmdMain spotbugsMain
```

## Faz 3: Testler + Kapsam

```bash
mvn -T 4 test
mvn jacoco:report   # 80%+ kapsam doÃ„Å¸rula
# veya
./gradlew test jacocoTestReport
```

Rapor:
- Toplam testler, geÃƒÂ§en/baÃ…Å¸arÃ„Â±sÃ„Â±z
- Kapsam % (satÃ„Â±rlar/dallar)

### Unit Testler

Mock baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarla izole olarak servis mantÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± test edin:

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

  @Mock private UserRepository userRepository;
  @InjectMocks private UserService userService;

  @Test
  void createUser_validInput_returnsUser() {
    var dto = new CreateUserDto("Alice", "alice@example.com");
    var expected = new User(1L, "Alice", "alice@example.com");
    when(userRepository.save(any(User.class))).thenReturn(expected);

    var result = userService.create(dto);

    assertThat(result.name()).isEqualTo("Alice");
    verify(userRepository).save(any(User.class));
  }

  @Test
  void createUser_duplicateEmail_throwsException() {
    var dto = new CreateUserDto("Alice", "existing@example.com");
    when(userRepository.existsByEmail(dto.email())).thenReturn(true);

    assertThatThrownBy(() -> userService.create(dto))
        .isInstanceOf(DuplicateEmailException.class);
  }
}
```

### Testcontainers ile Entegrasyon Testleri

H2 yerine gerÃƒÂ§ek bir veritabanÃ„Â±na karÃ…Å¸Ã„Â± test edin:

```java
@SpringBootTest
@Testcontainers
class UserRepositoryIntegrationTest {

  @Container
  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
      .withDatabaseName("testdb");

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @Autowired private UserRepository userRepository;

  @Test
  void findByEmail_existingUser_returnsUser() {
    userRepository.save(new User("Alice", "alice@example.com"));

    var found = userRepository.findByEmail("alice@example.com");

    assertThat(found).isPresent();
    assertThat(found.get().getName()).isEqualTo("Alice");
  }
}
```

### MockMvc ile API Testleri

Tam Spring context ile controller katmanÃ„Â±nÃ„Â± test edin:

```java
@WebMvcTest(UserController.class)
class UserControllerTest {

  @Autowired private MockMvc mockMvc;
  @MockBean private UserService userService;

  @Test
  void createUser_validInput_returns201() throws Exception {
    var user = new UserDto(1L, "Alice", "alice@example.com");
    when(userService.create(any())).thenReturn(user);

    mockMvc.perform(post("/api/users")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"name": "Alice", "email": "alice@example.com"}
                """))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.name").value("Alice"));
  }

  @Test
  void createUser_invalidEmail_returns400() throws Exception {
    mockMvc.perform(post("/api/users")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"name": "Alice", "email": "not-an-email"}
                """))
        .andExpect(status().isBadRequest());
  }
}
```

## Faz 4: GÃƒÂ¼venlik TaramasÃ„Â±

```bash
# BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k CVE'leri
mvn org.owasp:dependency-check-maven:check
# veya
./gradlew dependencyCheckAnalyze

# Kaynakta gizli bilgiler
grep -rn "password\s*=\s*\"" src/ --include="*.java" --include="*.yml" --include="*.properties"
grep -rn "sk-\|api_key\|secret" src/ --include="*.java" --include="*.yml"

# Gizli bilgiler (git geÃƒÂ§miÃ…Å¸i)
git secrets --scan  # yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸sa
```

### YaygÃ„Â±n GÃƒÂ¼venlik BulgularÃ„Â±

```
# System.out.println kontrolÃƒÂ¼ (yerine logger kullan)
grep -rn "System\.out\.print" src/main/ --include="*.java"

# YanÃ„Â±tlarda ham exception mesajlarÃ„Â± kontrolÃƒÂ¼
grep -rn "e\.getMessage()" src/main/ --include="*.java"

# Wildcard CORS kontrolÃƒÂ¼
grep -rn "allowedOrigins.*\*" src/main/ --include="*.java"
```

## Faz 5: Lint/Format (opsiyonel kapÃ„Â±)

```bash
mvn spotless:apply   # Spotless plugin kullanÃ„Â±yorsanÃ„Â±z
./gradlew spotlessApply
```

## Faz 6: Diff Ã„Â°ncelemesi

```bash
git diff --stat
git diff
```

Kontrol listesi:
- Debug loglarÃ„Â± kalmamÃ„Â±Ã…Å¸ (`System.out`, koruma olmadan `log.debug`)
- AnlamlÃ„Â± hatalar ve HTTP durumlarÃ„Â±
- Gerekli yerlerde transaction'lar ve validation mevcut
- Config deÃ„Å¸iÃ…Å¸iklikleri belgelenmiÃ…Å¸

## Ãƒâ€¡Ã„Â±ktÃ„Â± Ã…Å¾ablonu

```
DOÃ„Å¾RULAMA RAPORU
===================
Build:     [GEÃƒâ€¡TÃ„Â°/BAÃ…Å¾ARISIZ]
Static:    [GEÃƒâ€¡TÃ„Â°/BAÃ…Å¾ARISIZ] (spotbugs/pmd/checkstyle)
Testler:   [GEÃƒâ€¡TÃ„Â°/BAÃ…Å¾ARISIZ] (X/Y geÃƒÂ§ti, Z% kapsam)
GÃƒÂ¼venlik:  [GEÃƒâ€¡TÃ„Â°/BAÃ…Å¾ARISIZ] (CVE bulgularÃ„Â±: N)
Diff:      [X dosya deÃ„Å¸iÃ…Å¸ti]

Genel:     [HAZIR / HAZIR DEÃ„Å¾Ã„Â°L]

DÃƒÂ¼zeltilecek Sorunlar:
1. ...
2. ...
```

## SÃƒÂ¼rekli Mod

- Ãƒâ€“nemli deÃ„Å¸iÃ…Å¸ikliklerde veya uzun oturumlarda her 30-60 dakikada bir fazlarÃ„Â± yeniden ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n
- KÃ„Â±sa dÃƒÂ¶ngÃƒÂ¼ tutun: hÃ„Â±zlÃ„Â± geri bildirim iÃƒÂ§in `mvn -T 4 test` + spotbugs

**UnutmayÃ„Â±n**: HÃ„Â±zlÃ„Â± geri bildirim geÃƒÂ§ sÃƒÂ¼rprizleri yener. KapÃ„Â±yÃ„Â± sÃ„Â±kÃ„Â± tutunÃ¢â‚¬â€production sistemlerinde uyarÃ„Â±larÃ„Â± kusur olarak deÃ„Å¸erlendirin.
