---
name: springboot-verification
description: "Spring BootÃ©Â¡Â¹Ã§â€ºÂ®Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯Ã¯Â¼Å¡Ã¦Å¾â€žÃ¥Â»ÂºÃ£â‚¬ÂÃ©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾ÂÃ£â‚¬ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã£â‚¬ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂÃ¯Â¼Å’Ã¤Â»Â¥Ã¥ÂÅ Ã¥Ââ€˜Ã¥Â¸Æ’Ã¦Ë†â€“PRÃ¥â€°ÂÃ§Å¡â€žÃ¥Â·Â®Ã¥Â¼â€šÃ¥Â®Â¡Ã¦Å¸Â¥Ã£â‚¬â€š"
origin: ECC
---

# Spring Boot Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

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


Ã¥Å“Â¨Ã¦ÂÂÃ¤ÂºÂ¤ PR Ã¥â€°ÂÃ£â‚¬ÂÃ©â€¡ÂÃ¥Â¤Â§Ã¥ÂËœÃ¦â€ºÂ´Ã¥ÂÅ½Ã¤Â»Â¥Ã¥ÂÅ Ã©Æ’Â¨Ã§Â½Â²Ã¥â€°ÂÃ¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¦Â¿â‚¬Ã¦Â´Â»

* Ã¤Â¸Âº Spring Boot Ã¦Å“ÂÃ¥Å Â¡Ã¥Â¼â‚¬Ã¥ÂÂ¯Ã¦â€¹â€°Ã¥Ââ€“Ã¨Â¯Â·Ã¦Â±â€šÃ¤Â¹â€¹Ã¥â€°Â
* Ã¥Å“Â¨Ã©â€¡ÂÃ¥Â¤Â§Ã©â€¡ÂÃ¦Å¾â€žÃ¦Ë†â€“Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¥Ââ€¡Ã§ÂºÂ§Ã¤Â¹â€¹Ã¥ÂÅ½
* Ã§â€Â¨Ã¤ÂºÅ½Ã¦Å¡â€šÃ¥Â­ËœÃ¦Ë†â€“Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã§Å¡â€žÃ©Æ’Â¨Ã§Â½Â²Ã¥â€°ÂÃ©ÂªÅ’Ã¨Â¯Â
* Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ¦Å¾â€žÃ¥Â»Âº Ã¢â€ â€™ Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥ Ã¢â€ â€™ Ã¦Âµâ€¹Ã¨Â¯â€¢ Ã¢â€ â€™ Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂÃ¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿
* Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¦Â»Â¡Ã¨Â¶Â³Ã©ËœË†Ã¥â‚¬Â¼

## Ã©ËœÂ¶Ã¦Â®Âµ 1Ã¯Â¼Å¡Ã¦Å¾â€žÃ¥Â»Âº

```bash
mvn -T 4 clean verify -DskipTests
# or
./gradlew clean assemble -x test
```

Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Â¹Â¶Ã¤Â¿Â®Ã¥Â¤ÂÃ£â‚¬â€š

## Ã©ËœÂ¶Ã¦Â®Âµ 2Ã¯Â¼Å¡Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾Â

MavenÃ¯Â¼Ë†Ã¥Â¸Â¸Ã§â€Â¨Ã¦Ââ€™Ã¤Â»Â¶Ã¯Â¼â€°Ã¯Â¼Å¡

```bash
mvn -T 4 spotbugs:check pmd:check checkstyle:check
```

GradleÃ¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®Ã¯Â¼â€°Ã¯Â¼Å¡

```bash
./gradlew checkstyleMain pmdMain spotbugsMain
```

## Ã©ËœÂ¶Ã¦Â®Âµ 3Ã¯Â¼Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢ + Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

```bash
mvn -T 4 test
mvn jacoco:report   # verify 80%+ coverage
# or
./gradlew test jacocoTestReport
```

Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

* Ã¦â‚¬Â»Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€¢Â°Ã¯Â¼Å’Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥
* Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§â„¢Â¾Ã¥Ë†â€ Ã¦Â¯â€Ã¯Â¼Ë†Ã¨Â¡Å’/Ã¥Ë†â€ Ã¦â€Â¯Ã¯Â¼â€°

### Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢

Ã¤Â½Â¿Ã§â€Â¨Ã¦Â¨Â¡Ã¦â€¹Å¸Ã§Å¡â€žÃ¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¦ÂÂ¥Ã©Å¡â€Ã§Â¦Â»Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Å“ÂÃ¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¯Â¼Å¡

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

### Ã¤Â½Â¿Ã§â€Â¨ Testcontainers Ã¨Â¿â€ºÃ¨Â¡Å’Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢

Ã©â€™Ë†Ã¥Â¯Â¹Ã§Å“Å¸Ã¥Â®Å¾Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¯Â¼Ë†Ã¨â‚¬Å’Ã©ÂÅ¾ H2Ã¯Â¼â€°Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å¡

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

### Ã¤Â½Â¿Ã§â€Â¨ MockMvc Ã¨Â¿â€ºÃ¨Â¡Å’ API Ã¦Âµâ€¹Ã¨Â¯â€¢

Ã¥Å“Â¨Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€ž Spring Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¤Â¸Â­Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Å½Â§Ã¥Ë†Â¶Ã¥â„¢Â¨Ã¥Â±â€šÃ¯Â¼Å¡

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

## Ã©ËœÂ¶Ã¦Â®Âµ 4Ã¯Â¼Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ

```bash
# Dependency CVEs
mvn org.owasp:dependency-check-maven:check
# or
./gradlew dependencyCheckAnalyze

# Secrets in source
grep -rn "password\s*=\s*\"" src/ --include="*.java" --include="*.yml" --include="*.properties"
grep -rn "sk-\|api_key\|secret" src/ --include="*.java" --include="*.yml"

# Secrets (git history)
git secrets --scan  # if configured
```

### Ã¥Â¸Â¸Ã¨Â§ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¥Ââ€˜Ã§Å½Â°

```
# Ã¦Â£â‚¬Ã¦Å¸Â¥ System.out.printlnÃ¯Â¼Ë†Ã¥Âºâ€Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢Ã¥â„¢Â¨Ã¯Â¼â€°
grep -rn "System\.out\.print" src/main/ --include="*.java"

# Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥â€œÂÃ¥Âºâ€Ã¤Â¸Â­Ã§Å¡â€žÃ¥Å½Å¸Ã¥Â§â€¹Ã¥Â¼â€šÃ¥Â¸Â¸Ã¦Â¶Ë†Ã¦ÂÂ¯
grep -rn "e\.getMessage()" src/main/ --include="*.java"

# Ã¦Â£â‚¬Ã¦Å¸Â¥Ã©â‚¬Å¡Ã©â€¦ÂÃ§Â¬Â¦ CORS Ã©â€¦ÂÃ§Â½Â®
grep -rn "allowedOrigins.*\*" src/main/ --include="*.java"
```

## Ã©ËœÂ¶Ã¦Â®Âµ 5Ã¯Â¼Å¡Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥/Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã¯Â¼Ë†Ã¥ÂÂ¯Ã©â‚¬â€°Ã¥â€¦Â³Ã¥ÂÂ¡Ã¯Â¼â€°

```bash
mvn spotless:apply   # if using Spotless plugin
./gradlew spotlessApply
```

## Ã©ËœÂ¶Ã¦Â®Âµ 6Ã¯Â¼Å¡Ã¥Â·Â®Ã¥Â¼â€šÃ¥Â®Â¡Ã¦Å¸Â¥

```bash
git diff --stat
git diff
```

Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢Ã¯Â¼Å¡

* Ã¦Â²Â¡Ã¦Å“â€°Ã©Ââ€”Ã§â€¢â„¢Ã¨Â°Æ’Ã¨Â¯â€¢Ã¦â€”Â¥Ã¥Â¿â€”Ã¯Â¼Ë†`System.out`Ã£â‚¬Â`log.debug` Ã¦Â²Â¡Ã¦Å“â€°Ã©ËœÂ²Ã¦Å Â¤Ã¯Â¼â€°
* Ã¦Å“â€°Ã¦â€žÂÃ¤Â¹â€°Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â¡Ã¦ÂÂ¯Ã¥â€™Å’ HTTP Ã§Å Â¶Ã¦â‚¬ÂÃ§Â Â
* Ã¥Å“Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã¦Å“â€°Ã¤Âºâ€¹Ã¥Å Â¡Ã¥â€™Å’Ã©ÂªÅ’Ã¨Â¯Â
* Ã©â€¦ÂÃ§Â½Â®Ã¥ÂËœÃ¦â€ºÂ´Ã¥Â·Â²Ã¨Â®Â°Ã¥Â½â€¢

## Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â¨Â¡Ã¦ÂÂ¿

```
Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Å Â¥Ã¥â€˜Å 
===================
Ã¦Å¾â€žÃ¥Â»Âº:     [Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥]
Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾Â:    [Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥] (spotbugs/pmd/checkstyle)
Ã¦Âµâ€¹Ã¨Â¯â€¢:     [Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥] (X/Y Ã©â‚¬Å¡Ã¨Â¿â€¡, Z% Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡)
Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§:  [Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥] (CVE Ã¥Ââ€˜Ã§Å½Â°Ã¦â€¢Â°: N)
Ã¥Â·Â®Ã¥Â¼â€š:      [X Ã¤Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶Ã¥ÂËœÃ¦â€ºÂ´]

Ã¦â‚¬Â»Ã¤Â½â€œ:   [Ã¥Â°Â±Ã§Â»Âª / Ã¦Å“ÂªÃ¥Â°Â±Ã§Â»Âª]

Ã¥Â¾â€¦Ã¤Â¿Â®Ã¥Â¤ÂÃ©â€”Â®Ã©Â¢Ëœ:
1. ...
2. ...
```

## Ã¦Å’ÂÃ§Â»Â­Ã¦Â¨Â¡Ã¥Â¼Â

* Ã¥Å“Â¨Ã©â€¡ÂÃ¥Â¤Â§Ã¥ÂËœÃ¦â€ºÂ´Ã¦â€”Â¶Ã¦Ë†â€“Ã©â€¢Â¿Ã¦â€”Â¶Ã©â€”Â´Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¸Â­Ã¦Â¯Â 30Ã¢â‚¬â€œ60 Ã¥Ë†â€ Ã©â€™Å¸Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Ââ€žÃ©ËœÂ¶Ã¦Â®Âµ
* Ã¤Â¿ÂÃ¦Å’ÂÃ§Å¸Â­Ã¥Â¾ÂªÃ§Å½Â¯Ã¯Â¼Å¡`mvn -T 4 test` + spotbugs Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥ÂÂÃ©Â¦Ë†

**Ã¨Â®Â°Ã¤Â½Â**Ã¯Â¼Å¡Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥ÂÂÃ©Â¦Ë†Ã¨Æ’Å“Ã¨Â¿â€¡Ã¦â€žÂÃ¥Â¤â€“Ã¦Æ’Å Ã¥â€“Å“Ã£â‚¬â€šÃ¤Â¿ÂÃ¦Å’ÂÃ¥â€¦Â³Ã¥ÂÂ¡Ã¤Â¸Â¥Ã¦Â Â¼Ã¢â‚¬â€Ã¢â‚¬â€Ã¥Â°â€ Ã¨Â­Â¦Ã¥â€˜Å Ã¨Â§â€ Ã¤Â¸ÂºÃ§â€Å¸Ã¤ÂºÂ§Ã§Â³Â»Ã§Â»Å¸Ã¤Â¸Â­Ã§Å¡â€žÃ§Â¼ÂºÃ©â„¢Â·Ã£â‚¬â€š
