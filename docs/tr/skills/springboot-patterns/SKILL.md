---
name: springboot-patterns
description: Spring Boot architecture patterns, REST API design, layered services, data access, caching, async processing, and logging. Use for Java Spring Boot backend work.
origin: ECC
---

# Spring Boot GeliÃ…Å¸tirme Desenleri

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


Ãƒâ€“lÃƒÂ§eklenebilir, ÃƒÂ¼retim seviyesi servisler iÃƒÂ§in Spring Boot mimari ve API desenleri.

## Ne Zaman Aktif Edilir

- Spring MVC veya WebFlux ile REST API'leri oluÃ…Å¸turma
- Controller Ã¢â€ â€™ service Ã¢â€ â€™ repository katmanlarÃ„Â±nÃ„Â± yapÃ„Â±landÃ„Â±rma
- Spring Data JPA, caching veya async processing'i yapÃ„Â±landÃ„Â±rma
- Validation, exception handling veya sayfalama ekleme
- Dev/staging/production ortamlarÃ„Â± iÃƒÂ§in profiller kurma
- Spring Events veya Kafka ile event-driven desenler uygulama

## REST API YapÃ„Â±sÃ„Â±

```java
@RestController
@RequestMapping("/api/markets")
@Validated
class MarketController {
  private final MarketService marketService;

  MarketController(MarketService marketService) {
    this.marketService = marketService;
  }

  @GetMapping
  ResponseEntity<Page<MarketResponse>> list(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size) {
    Page<Market> markets = marketService.list(PageRequest.of(page, size));
    return ResponseEntity.ok(markets.map(MarketResponse::from));
  }

  @PostMapping
  ResponseEntity<MarketResponse> create(@Valid @RequestBody CreateMarketRequest request) {
    Market market = marketService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(MarketResponse::from(market));
  }
}
```

## Repository Deseni (Spring Data JPA)

```java
public interface MarketRepository extends JpaRepository<MarketEntity, Long> {
  @Query("select m from MarketEntity m where m.status = :status order by m.volume desc")
  List<MarketEntity> findActive(@Param("status") MarketStatus status, Pageable pageable);
}
```

## Transaction'lÃ„Â± Service KatmanÃ„Â±

```java
@Service
public class MarketService {
  private final MarketRepository repo;

  public MarketService(MarketRepository repo) {
    this.repo = repo;
  }

  @Transactional
  public Market create(CreateMarketRequest request) {
    MarketEntity entity = MarketEntity.from(request);
    MarketEntity saved = repo.save(entity);
    return Market.from(saved);
  }
}
```

## DTO'lar ve Validation

```java
public record CreateMarketRequest(
    @NotBlank @Size(max = 200) String name,
    @NotBlank @Size(max = 2000) String description,
    @NotNull @FutureOrPresent Instant endDate,
    @NotEmpty List<@NotBlank String> categories) {}

public record MarketResponse(Long id, String name, MarketStatus status) {
  static MarketResponse from(Market market) {
    return new MarketResponse(market.id(), market.name(), market.status());
  }
}
```

## Exception Handling

```java
@ControllerAdvice
class GlobalExceptionHandler {
  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex) {
    String message = ex.getBindingResult().getFieldErrors().stream()
        .map(e -> e.getField() + ": " + e.getDefaultMessage())
        .collect(Collectors.joining(", "));
    return ResponseEntity.badRequest().body(ApiError.validation(message));
  }

  @ExceptionHandler(AccessDeniedException.class)
  ResponseEntity<ApiError> handleAccessDenied() {
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ApiError.of("Forbidden"));
  }

  @ExceptionHandler(Exception.class)
  ResponseEntity<ApiError> handleGeneric(Exception ex) {
    // Beklenmeyen hatalarÃ„Â± stack trace'ler ile loglayÃ„Â±n
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(ApiError.of("Internal server error"));
  }
}
```

## Caching

Bir configuration sÃ„Â±nÃ„Â±fÃ„Â±nda `@EnableCaching` gerektirir.

```java
@Service
public class MarketCacheService {
  private final MarketRepository repo;

  public MarketCacheService(MarketRepository repo) {
    this.repo = repo;
  }

  @Cacheable(value = "market", key = "#id")
  public Market getById(Long id) {
    return repo.findById(id)
        .map(Market::from)
        .orElseThrow(() -> new EntityNotFoundException("Market not found"));
  }

  @CacheEvict(value = "market", key = "#id")
  public void evict(Long id) {}
}
```

## Async Processing

Bir configuration sÃ„Â±nÃ„Â±fÃ„Â±nda `@EnableAsync` gerektirir.

```java
@Service
public class NotificationService {
  @Async
  public CompletableFuture<Void> sendAsync(Notification notification) {
    // email/SMS gÃƒÂ¶nder
    return CompletableFuture.completedFuture(null);
  }
}
```

## Loglama (SLF4J)

```java
@Service
public class ReportService {
  private static final Logger log = LoggerFactory.getLogger(ReportService.class);

  public Report generate(Long marketId) {
    log.info("generate_report marketId={}", marketId);
    try {
      // mantÃ„Â±k
    } catch (Exception ex) {
      log.error("generate_report_failed marketId={}", marketId, ex);
      throw ex;
    }
    return new Report();
  }
}
```

## Middleware / Filter'lar

```java
@Component
public class RequestLoggingFilter extends OncePerRequestFilter {
  private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    long start = System.currentTimeMillis();
    try {
      filterChain.doFilter(request, response);
    } finally {
      long duration = System.currentTimeMillis() - start;
      log.info("req method={} uri={} status={} durationMs={}",
          request.getMethod(), request.getRequestURI(), response.getStatus(), duration);
    }
  }
}
```

## Sayfalama ve SÃ„Â±ralama

```java
PageRequest page = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
Page<Market> results = marketService.list(page);
```

## Hata-DayanÃ„Â±klÃ„Â± Harici Ãƒâ€¡aÃ„Å¸rÃ„Â±lar

```java
public <T> T withRetry(Supplier<T> supplier, int maxRetries) {
  int attempts = 0;
  while (true) {
    try {
      return supplier.get();
    } catch (Exception ex) {
      attempts++;
      if (attempts >= maxRetries) {
        throw ex;
      }
      try {
        Thread.sleep((long) Math.pow(2, attempts) * 100L);
      } catch (InterruptedException ie) {
        Thread.currentThread().interrupt();
        throw ex;
      }
    }
  }
}
```

## Rate Limiting (Filter + Bucket4j)

**GÃƒÂ¼venlik Notu**: `X-Forwarded-For` baÃ…Å¸lÃ„Â±Ã„Å¸Ã„Â± varsayÃ„Â±lan olarak gÃƒÂ¼venilmezdir ÃƒÂ§ÃƒÂ¼nkÃƒÂ¼ istemciler onu taklit edebilir.
Forwarded baÃ…Å¸lÃ„Â±klarÃ„Â± sadece Ã…Å¸u durumlarda kullanÃ„Â±n:
1. UygulamanÃ„Â±z gÃƒÂ¼venilir bir reverse proxy'nin arkasÃ„Â±nda (nginx, AWS ALB, vb.)
2. `ForwardedHeaderFilter`'Ã„Â± bean olarak kaydetmiÃ…Å¸siniz
3. application properties'de `server.forward-headers-strategy=NATIVE` veya `FRAMEWORK` yapÃ„Â±landÃ„Â±rmÃ„Â±Ã…Å¸sÃ„Â±nÃ„Â±z
4. Proxy'niz `X-Forwarded-For` baÃ…Å¸lÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± ÃƒÂ¼zerine yazmak iÃƒÂ§in yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ (eklememek iÃƒÂ§in deÃ„Å¸il)

`ForwardedHeaderFilter` dÃƒÂ¼zgÃƒÂ¼n yapÃ„Â±landÃ„Â±rÃ„Â±ldÃ„Â±Ã„Å¸Ã„Â±nda, `request.getRemoteAddr()` otomatik olarak
forwarded baÃ…Å¸lÃ„Â±klardan doÃ„Å¸ru istemci IP'sini dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r. Bu yapÃ„Â±landÃ„Â±rma olmadan, `request.getRemoteAddr()` doÃ„Å¸rudan kullanÃ„Â±nÃ¢â‚¬â€anlÃ„Â±k baÃ„Å¸lantÃ„Â± IP'sini dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r, bu gÃƒÂ¼venilir tek deÃ„Å¸erdir.

```java
@Component
public class RateLimitFilter extends OncePerRequestFilter {
  private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

  /*
   * GÃƒÅ“VENLÃ„Â°K: Bu filtre rate limiting iÃƒÂ§in istemcileri tanÃ„Â±mlamak ÃƒÂ¼zere request.getRemoteAddr() kullanÃ„Â±r.
   *
   * UygulamanÃ„Â±z bir reverse proxy'nin (nginx, AWS ALB, vb.) arkasÃ„Â±ndaysa, doÃ„Å¸ru istemci IP tespiti iÃƒÂ§in
   * Spring'i forwarded baÃ…Å¸lÃ„Â±klarÃ„Â± dÃƒÂ¼zgÃƒÂ¼n iÃ…Å¸leyecek Ã…Å¸ekilde yapÃ„Â±landÃ„Â±rmalÃ„Â±sÃ„Â±nÃ„Â±z:
   *
   * 1. application.properties/yaml'da server.forward-headers-strategy=NATIVE (cloud platformlar iÃƒÂ§in)
   *    veya FRAMEWORK ayarlayÃ„Â±n
   * 2. FRAMEWORK stratejisi kullanÃ„Â±yorsanÃ„Â±z, ForwardedHeaderFilter'Ã„Â± kaydedin:
   *
   *    @Bean
   *    ForwardedHeaderFilter forwardedHeaderFilter() {
   *        return new ForwardedHeaderFilter();
   *    }
   *
   * 3. Proxy'nizin sahteciliÃ„Å¸i ÃƒÂ¶nlemek iÃƒÂ§in X-Forwarded-For baÃ…Å¸lÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± ÃƒÂ¼zerine yazdÃ„Â±Ã„Å¸Ã„Â±ndan emin olun (eklemediÃ„Å¸inden)
   * 4. Container'Ã„Â±nÃ„Â±z iÃƒÂ§in server.tomcat.remoteip.trusted-proxies veya eÃ…Å¸deÃ„Å¸erini yapÃ„Â±landÃ„Â±rÃ„Â±n
   *
   * Bu yapÃ„Â±landÃ„Â±rma olmadan, request.getRemoteAddr() istemci IP'si deÃ„Å¸il proxy IP'si dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r.
   * X-Forwarded-For'u doÃ„Å¸rudan okumayÃ„Â±nÃ¢â‚¬â€gÃƒÂ¼venilir proxy iÃ…Å¸leme olmadan kolayca taklit edilebilir.
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    // ForwardedHeaderFilter yapÃ„Â±landÃ„Â±rÃ„Â±ldÃ„Â±Ã„Å¸Ã„Â±nda doÃ„Å¸ru istemci IP'sini dÃƒÂ¶ndÃƒÂ¼ren
    // veya aksi halde doÃ„Å¸rudan baÃ„Å¸lantÃ„Â± IP'sini dÃƒÂ¶ndÃƒÂ¼ren getRemoteAddr() kullanÃ„Â±n. X-Forwarded-For
    // baÃ…Å¸lÃ„Â±klarÃ„Â±na doÃ„Å¸rudan gÃƒÂ¼venmeyin, dÃƒÂ¼zgun proxy yapÃ„Â±landÃ„Â±rmasÃ„Â± olmadan.
    String clientIp = request.getRemoteAddr();

    Bucket bucket = buckets.computeIfAbsent(clientIp,
        k -> Bucket.builder()
            .addLimit(Bandwidth.classic(100, Refill.greedy(100, Duration.ofMinutes(1))))
            .build());

    if (bucket.tryConsume(1)) {
      filterChain.doFilter(request, response);
    } else {
      response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
    }
  }
}
```

## Arka Plan Job'larÃ„Â±

Spring'in `@Scheduled`'Ã„Â±nÃ„Â± kullanÃ„Â±n veya kuyruklar ile entegre olun (ÃƒÂ¶rn. Kafka, SQS, RabbitMQ). Handler'larÃ„Â± idempotent ve gÃƒÂ¶zlemlenebilir tutun.

## GÃƒÂ¶zlemlenebilirlik

- Logback encoder ile yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ loglama (JSON)
- Metrikler: Micrometer + Prometheus/OTel
- Tracing: OpenTelemetry veya Brave backend ile Micrometer Tracing

## Production VarsayÃ„Â±lanlarÃ„Â±

- Constructor injection'Ã„Â± tercih edin, field injection'dan kaÃƒÂ§Ã„Â±nÃ„Â±n
- RFC 7807 hatalarÃ„Â± iÃƒÂ§in `spring.mvc.problemdetails.enabled=true` etkinleÃ…Å¸tirin (Spring Boot 3+)
- Ã„Â°Ã…Å¸ yÃƒÂ¼kÃƒÂ¼ iÃƒÂ§in HikariCP pool boyutlarÃ„Â±nÃ„Â± yapÃ„Â±landÃ„Â±rÃ„Â±n, timeout'larÃ„Â± ayarlayÃ„Â±n
- Sorgular iÃƒÂ§in `@Transactional(readOnly = true)` kullanÃ„Â±n
- `@NonNull` ve uygun yerlerde `Optional` ile null-safety zorlayÃ„Â±n

**UnutmayÃ„Â±n**: Controller'larÃ„Â± ince, servisleri odaklÃ„Â±, repository'leri basit ve hatalarÃ„Â± merkezi olarak iÃ…Å¸lenmiÃ…Å¸ tutun. BakÃ„Â±m yapÃ„Â±labilirlik ve test edilebilirlik iÃƒÂ§in optimize edin.
