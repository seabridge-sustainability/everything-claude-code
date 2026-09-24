---
name: springboot-verification
description: "Verification loop for Spring Boot projects: build, static analysis, tests with coverage, security scans, and diff review before release or PR."
metadata:
  origin: ECC
---

# Spring Boot Verification Loop

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


Run before PRs, after major changes, and pre-deploy.

## When to Activate

- Before opening a pull request for a Spring Boot service
- After major refactoring or dependency upgrades
- Pre-deployment verification for staging or production
- Running full build Ã¢â€ â€™ lint Ã¢â€ â€™ test Ã¢â€ â€™ security scan pipeline
- Validating test coverage meets thresholds

## Phase 1: Build

```bash
mvn -T 4 clean verify -DskipTests
# or
./gradlew clean assemble -x test
```

If build fails, stop and fix.

## Phase 2: Static Analysis

Maven (common plugins):
```bash
mvn -T 4 spotbugs:check pmd:check checkstyle:check
```

Gradle (if configured):
```bash
./gradlew checkstyleMain pmdMain spotbugsMain
```

## Phase 3: Tests + Coverage

```bash
mvn -T 4 test
mvn jacoco:report   # verify 80%+ coverage
# or
./gradlew test jacocoTestReport
```

Report:
- Total tests, passed/failed
- Coverage % (lines/branches)

### Unit Tests

Test service logic in isolation with mocked dependencies:

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

### Integration Tests with Testcontainers

Test against a real database instead of H2:

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

### API Tests with MockMvc

Test controller layer with full Spring context:

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

## Phase 4: Security Scan

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

### Common Security Findings

```
# Check for System.out.println (use logger instead)
grep -rn "System\.out\.print" src/main/ --include="*.java"

# Check for raw exception messages in responses
grep -rn "e\.getMessage()" src/main/ --include="*.java"

# Check for wildcard CORS
grep -rn "allowedOrigins.*\*" src/main/ --include="*.java"
```

## Phase 5: Lint/Format (optional gate)

```bash
mvn spotless:apply   # if using Spotless plugin
./gradlew spotlessApply
```

## Phase 6: Diff Review

```bash
git diff --stat
git diff
```

Checklist:
- No debugging logs left (`System.out`, `log.debug` without guards)
- Meaningful errors and HTTP statuses
- Transactions and validation present where needed
- Config changes documented

## Output Template

```
VERIFICATION REPORT
===================
Build:     [PASS/FAIL]
Static:    [PASS/FAIL] (spotbugs/pmd/checkstyle)
Tests:     [PASS/FAIL] (X/Y passed, Z% coverage)
Security:  [PASS/FAIL] (CVE findings: N)
Diff:      [X files changed]

Overall:   [READY / NOT READY]

Issues to Fix:
1. ...
2. ...
```

## Continuous Mode

- Re-run phases on significant changes or every 30Ã¢â‚¬â€œ60 minutes in long sessions
- Keep a short loop: `mvn -T 4 test` + spotbugs for quick feedback

**Remember**: Fast feedback beats late surprises. Keep the gate strictÃ¢â‚¬â€treat warnings as defects in production systems.
