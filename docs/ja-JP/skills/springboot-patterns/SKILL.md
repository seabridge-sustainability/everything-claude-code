---
name: springboot-patterns
description: Spring Boot architecture patterns, REST API design, layered services, data access, caching, async processing, and logging. Use for Java Spring Boot backend work.
---

# Spring Boot Ã©â€“â€¹Ã§â„¢ÂºÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

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


Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’Â©Ã£Æ’â€“Ã£Æ’Â«Ã£ÂÂ§Ã¦Å“Â¬Ã§â€¢ÂªÃ£â€šÂ°Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ®Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Spring BootÃ£â€šÂ¢Ã£Æ’Â¼Ã£â€šÂ­Ã£Æ’â€ Ã£â€šÂ¯Ã£Æ’ÂÃ£Æ’Â£Ã£ÂÂ¨APIÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£â‚¬â€š

## REST APIÃ¦Â§â€¹Ã©â‚¬Â 

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

## Ã£Æ’ÂªÃ£Æ’ÂÃ£â€šÂ¸Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã¯Â¼Ë†Spring Data JPAÃ¯Â¼â€°

```java
public interface MarketRepository extends JpaRepository<MarketEntity, Long> {
  @Query("select m from MarketEntity m where m.status = :status order by m.volume desc")
  List<MarketEntity> findActive(@Param("status") MarketStatus status, Pageable pageable);
}
```

## Ã£Æ’Ë†Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ¶Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¤Â»ËœÃ£ÂÂÃ£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£Æ’Â¬Ã£â€šÂ¤Ã£Æ’Â¤Ã£Æ’Â¼

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

## DTOÃ£ÂÂ¨Ã¦Â¤Å“Ã¨Â¨Â¼

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

## Ã¤Â¾â€¹Ã¥Â¤â€“Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°

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
    // Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ¹Ã¤Â»ËœÃ£ÂÂÃ£ÂÂ§Ã¤ÂºË†Ã¦Å“Å¸Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’Â­Ã£â€šÂ°
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(ApiError.of("Internal server error"));
  }
}
```

## Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°

Ã¦Â§â€¹Ã¦Ë†ÂÃ£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¹Ã£ÂÂ§`@EnableCaching`Ã£ÂÅ’Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€š

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

## Ã©ÂÅ¾Ã¥ÂÅ’Ã¦Å“Å¸Ã¥â€¡Â¦Ã§Ââ€ 

Ã¦Â§â€¹Ã¦Ë†ÂÃ£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¹Ã£ÂÂ§`@EnableAsync`Ã£ÂÅ’Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€š

```java
@Service
public class NotificationService {
  @Async
  public CompletableFuture<Void> sendAsync(Notification notification) {
    // Ã£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«/SMSÃ©â‚¬ÂÃ¤Â¿Â¡
    return CompletableFuture.completedFuture(null);
  }
}
```

## Ã£Æ’Â­Ã£â€šÂ®Ã£Æ’Â³Ã£â€šÂ°Ã¯Â¼Ë†SLF4JÃ¯Â¼â€°

```java
@Service
public class ReportService {
  private static final Logger log = LoggerFactory.getLogger(ReportService.class);

  public Report generate(Long marketId) {
    log.info("generate_report marketId={}", marketId);
    try {
      // Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯
    } catch (Exception ex) {
      log.error("generate_report_failed marketId={}", marketId, ex);
      throw ex;
    }
    return new Report();
  }
}
```

## Ã£Æ’Å¸Ã£Æ’â€°Ã£Æ’Â«Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¢ / Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’Â¼

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

## Ã£Æ’Å¡Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ¨Ã£â€šÂ½Ã£Æ’Â¼Ã£Æ’Ë†

```java
PageRequest page = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
Page<Market> results = marketService.list(page);
```

## Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã¥â€ºÅ¾Ã¥Â¾Â©Ã¥Å â€ºÃ£ÂÂ®Ã£Ââ€šÃ£â€šâ€¹Ã¥Â¤â€“Ã©Æ’Â¨Ã¥â€˜Â¼Ã£ÂÂ³Ã¥â€¡ÂºÃ£Ââ€”

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

## Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¥Ë†Â¶Ã©â„¢ÂÃ¯Â¼Ë†Filter + Bucket4jÃ¯Â¼â€°

**Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’Å½Ã£Æ’Â¼Ã£Æ’Ë†**: `X-Forwarded-For`Ã£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼Ã£ÂÂ¯Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã£ÂÂ§Ã£ÂÂ¯Ã¤Â¿Â¡Ã©Â Â¼Ã£ÂÂ§Ã£ÂÂÃ£ÂÂ¾Ã£Ââ€ºÃ£â€šâ€œÃ£â‚¬â€šÃ£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÅ’Ã£ÂÂÃ£â€šÅ’Ã£â€šâ€™Ã¥ÂÂ½Ã¨Â£â€¦Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€š
Ã¨Â»Â¢Ã©â‚¬ÂÃ£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼Ã£ÂÂ¯Ã¦Â¬Â¡Ã£ÂÂ®Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ®Ã£ÂÂ¿Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž:
1. Ã£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£ÂÅ’Ã¤Â¿Â¡Ã©Â Â¼Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã£Æ’ÂªÃ£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ­Ã£â€šÂ·Ã¯Â¼Ë†nginxÃ£â‚¬ÂAWS ALBÃ£ÂÂªÃ£ÂÂ©Ã¯Â¼â€°Ã£ÂÂ®Ã¨Æ’Å’Ã¥Â¾Å’Ã£ÂÂ«Ã£Ââ€šÃ£â€šâ€¹
2. `ForwardedHeaderFilter`Ã£â€šâ€™BeanÃ£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦Ã§â„¢Â»Ã©Å’Â²Ã¦Â¸Ë†Ã£ÂÂ¿
3. application propertiesÃ£ÂÂ§`server.forward-headers-strategy=NATIVE`Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯`FRAMEWORK`Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡Ã¦Â¸Ë†Ã£ÂÂ¿
4. Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ­Ã£â€šÂ·Ã£ÂÅ’`X-Forwarded-For`Ã£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â¸Å Ã¦â€ºÂ¸Ã£ÂÂÃ¯Â¼Ë†Ã¨Â¿Â½Ã¥Å Â Ã£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ¯Â¼â€°Ã£Ââ„¢Ã£â€šâ€¹Ã£â€šË†Ã£Ââ€ Ã¨Â¨Â­Ã¥Â®Å¡Ã¦Â¸Ë†Ã£ÂÂ¿

`ForwardedHeaderFilter`Ã£ÂÅ’Ã©ÂÂ©Ã¥Ë†â€¡Ã£ÂÂ«Ã¦Â§â€¹Ã¦Ë†ÂÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£â‚¬Â`request.getRemoteAddr()`Ã£ÂÂ¯Ã¨Â»Â¢Ã©â‚¬ÂÃ£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼Ã£Ââ€¹Ã£â€šâ€°Ã¦Â­Â£Ã£Ââ€”Ã£Ââ€žÃ£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†IPÃ£â€šâ€™Ã¨â€¡ÂªÃ¥â€¹â€¢Ã§Å¡â€žÃ£ÂÂ«Ã¨Â¿â€Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£Ââ€œÃ£ÂÂ®Ã¦Â§â€¹Ã¦Ë†ÂÃ£ÂÅ’Ã£ÂÂªÃ£Ââ€žÃ¥Â Â´Ã¥ÂË†Ã£ÂÂ¯Ã£â‚¬Â`request.getRemoteAddr()`Ã£â€šâ€™Ã§â€ºÂ´Ã¦Å½Â¥Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€šÃ£Ââ€œÃ£â€šÅ’Ã£ÂÂ¯Ã§â€ºÂ´Ã¦Å½Â¥Ã¦Å½Â¥Ã§Â¶Å¡IPÃ£â€šâ€™Ã¨Â¿â€Ã£Ââ€”Ã£â‚¬ÂÃ¥â€Â¯Ã¤Â¸â‚¬Ã¤Â¿Â¡Ã©Â Â¼Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã¥â‚¬Â¤Ã£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€š

```java
@Component
public class RateLimitFilter extends OncePerRequestFilter {
  private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

  /*
   * Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£: Ã£Ââ€œÃ£ÂÂ®Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’Â¼Ã£ÂÂ¯Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¥Ë†Â¶Ã©â„¢ÂÃ£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â­ËœÃ¥Ë†Â¥Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«
   * request.getRemoteAddr()Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
   *
   * Ã£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÅ’Ã£Æ’ÂªÃ£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ­Ã£â€šÂ·Ã¯Â¼Ë†nginxÃ£â‚¬ÂAWS ALBÃ£ÂÂªÃ£ÂÂ©Ã¯Â¼â€°Ã£ÂÂ®Ã¨Æ’Å’Ã¥Â¾Å’Ã£ÂÂ«Ã£Ââ€šÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£â‚¬Â
   * Ã¦Â­Â£Ã§Â¢ÂºÃ£ÂÂªÃ£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†IPÃ¦Â¤Å“Ã¥â€¡ÂºÃ£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«Ã¨Â»Â¢Ã©â‚¬ÂÃ£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼Ã£â€šâ€™Ã©ÂÂ©Ã¥Ë†â€¡Ã£ÂÂ«Ã¥â€¡Â¦Ã§Ââ€ Ã£Ââ„¢Ã£â€šâ€¹Ã£â€šË†Ã£Ââ€ SpringÃ£â€šâ€™
   * Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ„¢Ã£â€šâ€¹Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÅ’Ã£Ââ€šÃ£â€šÅ Ã£ÂÂ¾Ã£Ââ„¢:
   *
   * 1. application.properties/yamlÃ£ÂÂ§ server.forward-headers-strategy=NATIVE
   *    Ã¯Â¼Ë†Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¦Ã£Æ’â€°Ã£Æ’â€”Ã£Æ’Â©Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Â Ã§â€Â¨Ã¯Â¼â€°Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯FRAMEWORKÃ£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡
   * 2. FRAMEWORKÃ¦Ë†Â¦Ã§â€¢Â¥Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£â‚¬ÂForwardedHeaderFilterÃ£â€šâ€™Ã§â„¢Â»Ã©Å’Â²:
   *
   *    @Bean
   *    ForwardedHeaderFilter forwardedHeaderFilter() {
   *        return new ForwardedHeaderFilter();
   *    }
   *
   * 3. Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ­Ã£â€šÂ·Ã£ÂÅ’Ã¥ÂÂ½Ã¨Â£â€¦Ã£â€šâ€™Ã©ËœÂ²Ã£ÂÂÃ£ÂÅ¸Ã£â€šÂÃ£ÂÂ«X-Forwarded-ForÃ£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â¸Å Ã¦â€ºÂ¸Ã£ÂÂÃ¯Â¼Ë†Ã¨Â¿Â½Ã¥Å Â Ã£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ¯Â¼â€°
   *    Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
   * 4. Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’Å Ã£ÂÂ«Ã¥Â¿Å“Ã£ÂËœÃ£ÂÂ¦server.tomcat.remoteip.trusted-proxiesÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã¥ÂÅ’Ã§Â­â€°Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡
   *
   * Ã£Ââ€œÃ£ÂÂ®Ã¦Â§â€¹Ã¦Ë†ÂÃ£ÂÂªÃ£Ââ€”Ã£ÂÂ§Ã£ÂÂ¯Ã£â‚¬Ârequest.getRemoteAddr()Ã£ÂÂ¯Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†IPÃ£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ£Æ’â€”Ã£Æ’Â­Ã£â€šÂ­Ã£â€šÂ·IPÃ£â€šâ€™Ã¨Â¿â€Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
   * X-Forwarded-ForÃ£â€šâ€™Ã§â€ºÂ´Ã¦Å½Â¥Ã¨ÂªÂ­Ã£ÂÂ¿Ã¥Ââ€“Ã£â€šâ€°Ã£ÂÂªÃ£Ââ€žÃ£ÂÂ§Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€šÃ¤Â¿Â¡Ã©Â Â¼Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ­Ã£â€šÂ·Ã¥â€¡Â¦Ã§Ââ€ Ã£ÂÂªÃ£Ââ€”Ã£ÂÂ§Ã£ÂÂ¯Ã§Â°Â¡Ã¥ÂËœÃ£ÂÂ«Ã¥ÂÂ½Ã¨Â£â€¦Ã£ÂÂ§Ã£ÂÂÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    // ForwardedHeaderFilterÃ£ÂÅ’Ã¦Â§â€¹Ã¦Ë†ÂÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯Ã¦Â­Â£Ã£Ââ€”Ã£Ââ€žÃ£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†IPÃ£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢
    // getRemoteAddr()Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬â€šÃ£ÂÂÃ£Ââ€ Ã£ÂÂ§Ã£ÂÂªÃ£Ââ€˜Ã£â€šÅ’Ã£ÂÂ°Ã§â€ºÂ´Ã¦Å½Â¥Ã¦Å½Â¥Ã§Â¶Å¡IPÃ£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢Ã£â‚¬â€š
    // X-Forwarded-ForÃ£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼Ã£â€šâ€™Ã©ÂÂ©Ã¥Ë†â€¡Ã£ÂÂªÃ£Æ’â€”Ã£Æ’Â­Ã£â€šÂ­Ã£â€šÂ·Ã¦Â§â€¹Ã¦Ë†ÂÃ£ÂÂªÃ£Ââ€”Ã£ÂÂ§Ã§â€ºÂ´Ã¦Å½Â¥Ã¤Â¿Â¡Ã©Â Â¼Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ£â‚¬â€š
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

## Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ°Ã£Æ’Â©Ã£â€šÂ¦Ã£Æ’Â³Ã£Æ’â€°Ã£â€šÂ¸Ã£Æ’Â§Ã£Æ’â€“

SpringÃ£ÂÂ®`@Scheduled`Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€¹Ã£â‚¬ÂÃ£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¼Ã¯Â¼Ë†KafkaÃ£â‚¬ÂSQSÃ£â‚¬ÂRabbitMQÃ£ÂÂªÃ£ÂÂ©Ã¯Â¼â€°Ã£ÂÂ¨Ã§ÂµÂ±Ã¥ÂË†Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã£ÂÂ¹Ã£ÂÂÃ§Â­â€°Ã£Ââ€¹Ã£ÂÂ¤Ã¨Â¦Â³Ã¦Â¸Â¬Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¡Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¥ÂÂ¯Ã¨Â¦Â³Ã¦Â¸Â¬Ã¦â‚¬Â§

- Ã¦Â§â€¹Ã©â‚¬Â Ã¥Å’â€“Ã£Æ’Â­Ã£â€šÂ®Ã£Æ’Â³Ã£â€šÂ°Ã¯Â¼Ë†JSONÃ¯Â¼â€°via LogbackÃ£â€šÂ¨Ã£Æ’Â³Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â‚¬Ã£Æ’Â¼
- Ã£Æ’Â¡Ã£Æ’Ë†Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¹: Micrometer + Prometheus/OTel
- Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°: Micrometer TracingÃ£ÂÂ¨OpenTelemetryÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯BraveÃ£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°

## Ã¦Å“Â¬Ã§â€¢ÂªÃ£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†

- Ã£â€šÂ³Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â©Ã£â€šÂ¯Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¥â€žÂªÃ¥â€¦Ë†Ã£â‚¬ÂÃ£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€°Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹
- RFC 7807Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«`spring.mvc.problemdetails.enabled=true`Ã£â€šâ€™Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“Ã¯Â¼Ë†Spring Boot 3+Ã¯Â¼â€°
- Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ«Ã¥Â¿Å“Ã£ÂËœÃ£ÂÂ¦HikariCPÃ£Æ’â€”Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šÂµÃ£â€šÂ¤Ã£â€šÂºÃ£â€šâ€™Ã¦Â§â€¹Ã¦Ë†ÂÃ£â‚¬ÂÃ£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£â€šÂ¢Ã£â€šÂ¦Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡
- Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£ÂÂ«`@Transactional(readOnly = true)`Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- `@NonNull`Ã£ÂÂ¨`Optional`Ã£ÂÂ§Ã©ÂÂ©Ã¥Ë†â€¡Ã£ÂÂ«nullÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã£â€šâ€™Ã¥Â¼Â·Ã¥Ë†Â¶

**Ã¨Â¦Å¡Ã£ÂË†Ã£ÂÂ¦Ã£ÂÅ Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž**: Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’Ë†Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ¯Ã¨â€“â€žÃ£ÂÂÃ£â‚¬ÂÃ£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£ÂÂ¯Ã§â€žÂ¦Ã§â€šÂ¹Ã£â€šâ€™Ã§ÂµÅ¾Ã£â€šÅ Ã£â‚¬ÂÃ£Æ’ÂªÃ£Æ’ÂÃ£â€šÂ¸Ã£Æ’Ë†Ã£Æ’ÂªÃ£ÂÂ¯Ã£â€šÂ·Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â«Ã£ÂÂ«Ã£â‚¬ÂÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ¯Ã©â€ºâ€ Ã¤Â¸Â­Ã§Å¡â€žÃ£ÂÂ«Ã¥â€¡Â¦Ã§Ââ€ Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ¤Â¿ÂÃ¥Â®Ë†Ã¦â‚¬Â§Ã£ÂÂ¨Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦â‚¬Â§Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«Ã¦Å“â‚¬Ã©ÂÂ©Ã¥Å’â€“Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š
