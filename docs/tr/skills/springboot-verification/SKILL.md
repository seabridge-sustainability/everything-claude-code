---
name: springboot-verification
description: "Verification loop for Spring Boot projects: build, static analysis, tests with coverage, security scans, and diff review before release or PR."
origin: ECC
---

# Spring Boot Doğrulama Döngüsü

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


PR'lardan önce, büyük değişikliklerden sonra ve deployment öncesi çalıştırın.

## Ne Zaman Aktif Edilir

- Spring Boot servisi için pull request açmadan önce
- Büyük refactoring veya bağımlılık yükseltmelerinden sonra
- Staging veya production için deployment öncesi doğrulama
- Tam build → lint → test → güvenlik taraması pipeline'ı çalıştırma
- Test kapsamının eşikleri karşıladığını doğrulama

## Faz 1: Build

```bash
mvn -T 4 clean verify -DskipTests
# veya
./gradlew clean assemble -x test
```

Build başarısız olursa, durdurun ve düzeltin.

## Faz 2: Static Analiz

Maven (yaygın plugin'ler):
```bash
mvn -T 4 spotbugs:check pmd:check checkstyle:check
```

Gradle (yapılandırılmışsa):
```bash
./gradlew checkstyleMain pmdMain spotbugsMain
```

## Faz 3: Testler + Kapsam

```bash
mvn -T 4 test
mvn jacoco:report   # 80%+ kapsam doğrula
# veya
./gradlew test jacocoTestReport
```

Rapor:
- Toplam testler, geçen/başarısız
- Kapsam % (satırlar/dallar)

### Unit Testler

Mock bağımlılıklarla izole olarak servis mantığını test edin:

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

H2 yerine gerçek bir veritabanına karşı test edin:

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

Tam Spring context ile controller katmanını test edin:

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

## Faz 4: Güvenlik Taraması

```bash
# Bağımlılık CVE'leri
mvn org.owasp:dependency-check-maven:check
# veya
./gradlew dependencyCheckAnalyze

# Kaynakta gizli bilgiler
grep -rn "password\s*=\s*\"" src/ --include="*.java" --include="*.yml" --include="*.properties"
grep -rn "sk-\|api_key\|secret" src/ --include="*.java" --include="*.yml"

# Gizli bilgiler (git geçmişi)
git secrets --scan  # yapılandırılmışsa
```

### Yaygın Güvenlik Bulguları

```
# System.out.println kontrolü (yerine logger kullan)
grep -rn "System\.out\.print" src/main/ --include="*.java"

# Yanıtlarda ham exception mesajları kontrolü
grep -rn "e\.getMessage()" src/main/ --include="*.java"

# Wildcard CORS kontrolü
grep -rn "allowedOrigins.*\*" src/main/ --include="*.java"
```

## Faz 5: Lint/Format (opsiyonel kapı)

```bash
mvn spotless:apply   # Spotless plugin kullanıyorsanız
./gradlew spotlessApply
```

## Faz 6: Diff İncelemesi

```bash
git diff --stat
git diff
```

Kontrol listesi:
- Debug logları kalmamış (`System.out`, koruma olmadan `log.debug`)
- Anlamlı hatalar ve HTTP durumları
- Gerekli yerlerde transaction'lar ve validation mevcut
- Config değişiklikleri belgelenmiş

## Çıktı Şablonu

```
DOĞRULAMA RAPORU
===================
Build:     [GEÇTİ/BAŞARISIZ]
Static:    [GEÇTİ/BAŞARISIZ] (spotbugs/pmd/checkstyle)
Testler:   [GEÇTİ/BAŞARISIZ] (X/Y geçti, Z% kapsam)
Güvenlik:  [GEÇTİ/BAŞARISIZ] (CVE bulguları: N)
Diff:      [X dosya değişti]

Genel:     [HAZIR / HAZIR DEĞİL]

Düzeltilecek Sorunlar:
1. ...
2. ...
```

## Sürekli Mod

- Önemli değişikliklerde veya uzun oturumlarda her 30-60 dakikada bir fazları yeniden çalıştırın
- Kısa döngü tutun: hızlı geri bildirim için `mvn -T 4 test` + spotbugs

**Unutmayın**: Hızlı geri bildirim geç sürprizleri yener. Kapıyı sıkı tutun—production sistemlerinde uyarıları kusur olarak değerlendirin.
