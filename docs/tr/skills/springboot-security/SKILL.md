---
name: springboot-security
description: Spring Security best practices for authn/authz, validation, CSRF, secrets, headers, rate limiting, and dependency security in Java Spring Boot services.
origin: ECC
---

# Spring Boot GÃƒÂ¼venlik Ã„Â°ncelemesi

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


Auth ekleme, giriÃ…Å¸i iÃ…Å¸leme, endpoint oluÃ…Å¸turma veya gizli bilgilerle uÃ„Å¸raÃ…Å¸Ã„Â±rken kullanÃ„Â±n.

## Ne Zaman Aktif Edilir

- Kimlik doÃ„Å¸rulama ekleme (JWT, OAuth2, session-based)
- Yetkilendirme uygulama (@PreAuthorize, role-based eriÃ…Å¸im)
- KullanÃ„Â±cÃ„Â± giriÃ…Å¸ini doÃ„Å¸rulama (Bean Validation, custom validator'lar)
- CORS, CSRF veya gÃƒÂ¼venlik baÃ…Å¸lÃ„Â±klarÃ„Â±nÃ„Â± yapÃ„Â±landÃ„Â±rma
- Gizli bilgileri yÃƒÂ¶netme (Vault, ortam deÃ„Å¸iÃ…Å¸kenleri)
- Rate limiting veya brute-force korumasÃ„Â± ekleme
- BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± CVE iÃƒÂ§in tarama

## Kimlik DoÃ„Å¸rulama

- Ã„Â°ptal listesi ile stateless JWT veya opaque token'larÃ„Â± tercih edin
- Session'lar iÃƒÂ§in `httpOnly`, `Secure`, `SameSite=Strict` cookie'leri kullanÃ„Â±n
- Token'larÃ„Â± `OncePerRequestFilter` veya resource server ile doÃ„Å¸rulayÃ„Â±n

```java
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
  private final JwtService jwtService;

  public JwtAuthFilter(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain chain) throws ServletException, IOException {
    String header = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (header != null && header.startsWith("Bearer ")) {
      String token = header.substring(7);
      Authentication auth = jwtService.authenticate(token);
      SecurityContextHolder.getContext().setAuthentication(auth);
    }
    chain.doFilter(request, response);
  }
}
```

## Yetkilendirme

- Method gÃƒÂ¼venliÃ„Å¸ini etkinleÃ…Å¸tirin: `@EnableMethodSecurity`
- `@PreAuthorize("hasRole('ADMIN')")` veya `@PreAuthorize("@authz.canEdit(#id)")` kullanÃ„Â±n
- VarsayÃ„Â±lan olarak reddedin; sadece gerekli scope'larÃ„Â± aÃƒÂ§Ã„Â±Ã„Å¸a ÃƒÂ§Ã„Â±karÃ„Â±n

```java
@RestController
@RequestMapping("/api/admin")
public class AdminController {

  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping("/users")
  public List<UserDto> listUsers() {
    return userService.findAll();
  }

  @PreAuthorize("@authz.isOwner(#id, authentication)")
  @DeleteMapping("/users/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
```

## Girdi DoÃ„Å¸rulama

- Controller'larda `@Valid` ile Bean Validation kullanÃ„Â±n
- DTO'lara kÃ„Â±sÃ„Â±tlamalar uygulayÃ„Â±n: `@NotBlank`, `@Email`, `@Size`, custom validator'lar
- Render etmeden ÃƒÂ¶nce herhangi bir HTML'i whitelist ile temizleyin

```java
// KÃƒâ€“TÃƒÅ“: Validation yok
@PostMapping("/users")
public User createUser(@RequestBody UserDto dto) {
  return userService.create(dto);
}

// Ã„Â°YÃ„Â°: DoÃ„Å¸rulanmÃ„Â±Ã…Å¸ DTO
public record CreateUserDto(
    @NotBlank @Size(max = 100) String name,
    @NotBlank @Email String email,
    @NotNull @Min(0) @Max(150) Integer age
) {}

@PostMapping("/users")
public ResponseEntity<UserDto> createUser(@Valid @RequestBody CreateUserDto dto) {
  return ResponseEntity.status(HttpStatus.CREATED)
      .body(userService.create(dto));
}
```

## SQL Injection Ãƒâ€“nleme

- Spring Data repository'leri veya parametreli sorgular kullanÃ„Â±n
- Native sorgular iÃƒÂ§in `:param` binding'leri kullanÃ„Â±n; string'leri asla birleÃ…Å¸tirmeyin

```java
// KÃƒâ€“TÃƒÅ“: Native sorguda string birleÃ…Å¸tirme
@Query(value = "SELECT * FROM users WHERE name = '" + name + "'", nativeQuery = true)

// Ã„Â°YÃ„Â°: Parametreli native sorgu
@Query(value = "SELECT * FROM users WHERE name = :name", nativeQuery = true)
List<User> findByName(@Param("name") String name);

// Ã„Â°YÃ„Â°: Spring Data tÃƒÂ¼retilmiÃ…Å¸ sorgu (otomatik parametreli)
List<User> findByEmailAndActiveTrue(String email);
```

## Parola Kodlama

- ParolalarÃ„Â± her zaman BCrypt veya Argon2 ile hash'leyin Ã¢â‚¬â€ asla dÃƒÂ¼z metin saklamayÃ„Â±n
- Manuel hash'leme deÃ„Å¸il `PasswordEncoder` bean'i kullanÃ„Â±n

```java
@Bean
public PasswordEncoder passwordEncoder() {
  return new BCryptPasswordEncoder(12); // cost faktÃƒÂ¶rÃƒÂ¼ 12
}

// Servis iÃƒÂ§inde
public User register(CreateUserDto dto) {
  String hashedPassword = passwordEncoder.encode(dto.password());
  return userRepository.save(new User(dto.email(), hashedPassword));
}
```

## CSRF KorumasÃ„Â±

- TarayÃ„Â±cÃ„Â± session uygulamalarÃ„Â± iÃƒÂ§in CSRF'i etkin tutun; formlara/baÃ…Å¸lÃ„Â±klara token ekleyin
- Bearer token'lÃ„Â± saf API'ler iÃƒÂ§in CSRF'i devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rakÃ„Â±n ve stateless auth'a gÃƒÂ¼venin

```java
http
  .csrf(csrf -> csrf.disable())
  .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
```

## Gizli Bilgi YÃƒÂ¶netimi

- Kaynak kodda gizli bilgi yok; env veya vault'tan yÃƒÂ¼kleyin
- `application.yml`'i kimlik bilgilerinden arÃ„Â±nmÃ„Â±Ã…Å¸ tutun; yer tutucular kullanÃ„Â±n
- Token'larÃ„Â± ve DB kimlik bilgilerini dÃƒÂ¼zenli olarak dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼n

```yaml
# KÃƒâ€“TÃƒÅ“: application.yml'de sabit kodlanmÃ„Â±Ã…Å¸
spring:
  datasource:
    password: mySecretPassword123

# Ã„Â°YÃ„Â°: Ortam deÃ„Å¸iÃ…Å¸keni yer tutucu
spring:
  datasource:
    password: ${DB_PASSWORD}

# Ã„Â°YÃ„Â°: Spring Cloud Vault entegrasyonu
spring:
  cloud:
    vault:
      uri: https://vault.example.com
      token: ${VAULT_TOKEN}
```

## GÃƒÂ¼venlik BaÃ…Å¸lÃ„Â±klarÃ„Â±

```java
http
  .headers(headers -> headers
    .contentSecurityPolicy(csp -> csp
      .policyDirectives("default-src 'self'"))
    .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
    .xssProtection(Customizer.withDefaults())
    .referrerPolicy(rp -> rp.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.NO_REFERRER)));
```

## CORS YapÃ„Â±landÃ„Â±rmasÃ„Â±

- CORS'u controller baÃ…Å¸Ã„Â±na deÃ„Å¸il, gÃƒÂ¼venlik filtre seviyesinde yapÃ„Â±landÃ„Â±rÃ„Â±n
- Ã„Â°zin verilen origin'leri kÃ„Â±sÃ„Â±tlayÃ„Â±n Ã¢â‚¬â€ production'da asla `*` kullanmayÃ„Â±n

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
  CorsConfiguration config = new CorsConfiguration();
  config.setAllowedOrigins(List.of("https://app.example.com"));
  config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
  config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
  config.setAllowCredentials(true);
  config.setMaxAge(3600L);

  UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
  source.registerCorsConfiguration("/api/**", config);
  return source;
}

// SecurityFilterChain iÃƒÂ§inde:
http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
```

## Rate Limiting

- PahalÃ„Â± endpoint'lerde Bucket4j veya gateway seviyesi limitler uygulayÃ„Â±n
- Patlamalarda logla ve uyar; yeniden deneme ipuÃƒÂ§larÃ„Â± ile 429 dÃƒÂ¶ndÃƒÂ¼r

```java
// Endpoint baÃ…Å¸Ã„Â±na rate limiting iÃƒÂ§in Bucket4j kullanma
@Component
public class RateLimitFilter extends OncePerRequestFilter {
  private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

  private Bucket createBucket() {
    return Bucket.builder()
        .addLimit(Bandwidth.classic(100, Refill.intervally(100, Duration.ofMinutes(1))))
        .build();
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain chain) throws ServletException, IOException {
    String clientIp = request.getRemoteAddr();
    Bucket bucket = buckets.computeIfAbsent(clientIp, k -> createBucket());

    if (bucket.tryConsume(1)) {
      chain.doFilter(request, response);
    } else {
      response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
      response.getWriter().write("{\"error\": \"Rate limit exceeded\"}");
    }
  }
}
```

## BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k GÃƒÂ¼venliÃ„Å¸i

- CI'da OWASP Dependency Check / Snyk ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n
- Spring Boot ve Spring Security'yi desteklenen sÃƒÂ¼rÃƒÂ¼mlerde tutun
- Bilinen CVE'lerde build'leri baÃ…Å¸arÃ„Â±sÃ„Â±z yapÃ„Â±n

## Loglama ve PII

- Gizli bilgileri, token'larÃ„Â±, parolalarÃ„Â± veya tam PAN verilerini asla loglamayÃ„Â±n
- Hassas alanlarÃ„Â± redakte edin; yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ JSON loglama kullanÃ„Â±n

## Dosya YÃƒÂ¼klemeleri

- Boyutu, content type'Ã„Â± ve uzantÃ„Â±yÃ„Â± doÃ„Å¸rulayÃ„Â±n
- Web root dÃ„Â±Ã…Å¸Ã„Â±nda saklayÃ„Â±n; gerekirse tarayÃ„Â±n

## YayÃ„Â±n Ãƒâ€“ncesi Kontrol Listesi

- [ ] Auth token'larÃ„Â± doÃ„Å¸ru Ã…Å¸ekilde doÃ„Å¸rulanmÃ„Â±Ã…Å¸ ve sÃƒÂ¼resi dolmuÃ…Å¸
- [ ] Her hassas path'te yetkilendirme korumalarÃ„Â±
- [ ] TÃƒÂ¼m giriÃ…Å¸ler doÃ„Å¸rulanmÃ„Â±Ã…Å¸ ve temizlenmiÃ…Å¸
- [ ] String-birleÃ…Å¸tirilmiÃ…Å¸ SQL yok
- [ ] Uygulama tÃƒÂ¼rÃƒÂ¼ iÃƒÂ§in doÃ„Å¸ru CSRF duruÃ…Å¸u
- [ ] Gizli bilgiler harici; hiÃƒÂ§biri commit edilmemiÃ…Å¸
- [ ] GÃƒÂ¼venlik baÃ…Å¸lÃ„Â±klarÃ„Â± yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸
- [ ] API'lerde rate limiting
- [ ] BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klar taranmÃ„Â±Ã…Å¸ ve gÃƒÂ¼ncel
- [ ] Loglar hassas verilerden arÃ„Â±nmÃ„Â±Ã…Å¸

**UnutmayÃ„Â±n**: VarsayÃ„Â±lan olarak reddet, giriÃ…Å¸leri doÃ„Å¸rula, en az ayrÃ„Â±calÃ„Â±k ve ÃƒÂ¶nce yapÃ„Â±landÃ„Â±rma ile gÃƒÂ¼venli.
