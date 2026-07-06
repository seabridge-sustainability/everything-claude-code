---
name: java-coding-standards
description: "Spring BootÃ¦Å“ÂÃ¥Å Â¡Ã§Å¡â€žJavaÃ§Â¼â€“Ã§Â ÂÃ¦Â â€¡Ã¥â€¡â€ Ã¯Â¼Å¡Ã¥â€˜Â½Ã¥ÂÂÃ£â‚¬ÂÃ¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§Ã£â‚¬ÂOptionalÃ§â€Â¨Ã¦Â³â€¢Ã£â‚¬ÂÃ¦ÂµÂÃ£â‚¬ÂÃ¥Â¼â€šÃ¥Â¸Â¸Ã£â‚¬ÂÃ¦Â³â€ºÃ¥Å¾â€¹Ã¥â€™Å’Ã©Â¡Â¹Ã§â€ºÂ®Ã¥Â¸Æ’Ã¥Â±â‚¬Ã£â‚¬â€š"
origin: ECC
---

# Java Ã§Â¼â€“Ã§Â ÂÃ¨Â§â€žÃ¨Å’Æ’

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


Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½ Spring Boot Ã¦Å“ÂÃ¥Å Â¡Ã¤Â¸Â­Ã¥ÂÂ¯Ã¨Â¯Â»Ã£â‚¬ÂÃ¥ÂÂ¯Ã§Â»Â´Ã¦Å Â¤Ã§Å¡â€ž Java (17+) Ã¤Â»Â£Ã§Â ÂÃ§Å¡â€žÃ¨Â§â€žÃ¨Å’Æ’Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¦Â¿â‚¬Ã¦Â´Â»

* Ã¥Å“Â¨ Spring Boot Ã©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Â­Ã§Â¼â€“Ã¥â€ â„¢Ã¦Ë†â€“Ã¥Â®Â¡Ã¦Å¸Â¥ Java Ã¤Â»Â£Ã§Â ÂÃ¦â€”Â¶
* Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¥â€˜Â½Ã¥ÂÂÃ£â‚¬ÂÃ¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§Ã¦Ë†â€“Ã¥Â¼â€šÃ¥Â¸Â¸Ã¥Â¤â€žÃ§Ââ€ Ã§ÂºÂ¦Ã¥Â®Å¡Ã¦â€”Â¶
* Ã¤Â½Â¿Ã§â€Â¨Ã¨Â®Â°Ã¥Â½â€¢Ã§Â±Â»Ã£â‚¬ÂÃ¥Â¯â€ Ã¥Â°ÂÃ§Â±Â»Ã¦Ë†â€“Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥Å’Â¹Ã©â€¦ÂÃ¯Â¼Ë†Java 17+Ã¯Â¼â€°Ã¦â€”Â¶
* Ã¥Â®Â¡Ã¦Å¸Â¥ OptionalÃ£â‚¬ÂÃ¦ÂµÂÃ¦Ë†â€“Ã¦Â³â€ºÃ¥Å¾â€¹Ã§Å¡â€žÃ¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶
* Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Å’â€¦Ã¥â€™Å’Ã©Â¡Â¹Ã§â€ºÂ®Ã¥Â¸Æ’Ã¥Â±â‚¬Ã¦â€”Â¶

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¥Å½Å¸Ã¥Ë†â„¢

* Ã¦Â¸â€¦Ã¦â„¢Â°Ã¤Â¼ËœÃ¤ÂºÅ½Ã¥Â·Â§Ã¥Â¦â„¢
* Ã©Â»ËœÃ¨Â®Â¤Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¯Â¼â€ºÃ¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¥â€¦Â±Ã¤ÂºÂ«Ã¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬Â
* Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥Â¤Â±Ã¨Â´Â¥Ã¥Â¹Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¦Å“â€°Ã¦â€žÂÃ¤Â¹â€°Ã§Å¡â€žÃ¥Â¼â€šÃ¥Â¸Â¸
* Ã¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ¥â€˜Â½Ã¥ÂÂÃ¥â€™Å’Ã¥Å’â€¦Ã§Â»â€œÃ¦Å¾â€ž

## Ã¥â€˜Â½Ã¥ÂÂ

```java
// PASS: Classes/Records: PascalCase
public class MarketService {}
public record Money(BigDecimal amount, Currency currency) {}

// PASS: Methods/fields: camelCase
private final MarketRepository marketRepository;
public Market findBySlug(String slug) {}

// PASS: Constants: UPPER_SNAKE_CASE
private static final int MAX_PAGE_SIZE = 100;
```

## Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§

```java
// PASS: Favor records and final fields
public record MarketDto(Long id, String name, MarketStatus status) {}

public class Market {
  private final Long id;
  private final String name;
  // getters only, no setters
}
```

## Optional Ã¤Â½Â¿Ã§â€Â¨

```java
// PASS: Return Optional from find* methods
Optional<Market> market = marketRepository.findBySlug(slug);

// PASS: Map/flatMap instead of get()
return market
    .map(MarketResponse::from)
    .orElseThrow(() -> new EntityNotFoundException("Market not found"));
```

## Streams Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

```java
// PASS: Use streams for transformations, keep pipelines short
List<String> names = markets.stream()
    .map(Market::name)
    .filter(Objects::nonNull)
    .toList();

// FAIL: Avoid complex nested streams; prefer loops for clarity
```

## Ã¥Â¼â€šÃ¥Â¸Â¸

* Ã©Â¢â€ Ã¥Å¸Å¸Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â½Â¿Ã§â€Â¨Ã©ÂÅ¾Ã¥Ââ€”Ã¦Â£â‚¬Ã¥Â¼â€šÃ¥Â¸Â¸Ã¯Â¼â€ºÃ¥Å’â€¦Ã¨Â£â€¦Ã¦Å â‚¬Ã¦Å“Â¯Ã¥Â¼â€šÃ¥Â¸Â¸Ã¦â€”Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
* Ã¥Ë†â€ºÃ¥Â»ÂºÃ§â€°Â¹Ã¥Â®Å¡Ã©Â¢â€ Ã¥Å¸Å¸Ã§Å¡â€žÃ¥Â¼â€šÃ¥Â¸Â¸Ã¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€šÃ¯Â¼Å’`MarketNotFoundException`Ã¯Â¼â€°
* Ã©ÂÂ¿Ã¥â€¦ÂÃ¥Â®Â½Ã¦Â³â€ºÃ§Å¡â€ž `catch (Exception ex)`Ã¯Â¼Å’Ã©â„¢Â¤Ã©ÂÅ¾Ã¥Å“Â¨Ã¤Â¸Â­Ã¥Â¿Æ’Ã¤Â½ÂÃ§Â½Â®Ã©â€¡ÂÃ¦â€“Â°Ã¦Å â€ºÃ¥â€¡Âº/Ã¨Â®Â°Ã¥Â½â€¢

```java
throw new MarketNotFoundException(slug);
```

## Ã¦Â³â€ºÃ¥Å¾â€¹Ã¥â€™Å’Ã§Â±Â»Ã¥Å¾â€¹Ã¥Â®â€°Ã¥â€¦Â¨

* Ã©ÂÂ¿Ã¥â€¦ÂÃ¥Å½Å¸Ã¥Â§â€¹Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼â€ºÃ¥Â£Â°Ã¦ËœÅ½Ã¦Â³â€ºÃ¥Å¾â€¹Ã¥Ââ€šÃ¦â€¢Â°
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥ÂÂ¯Ã¥Â¤ÂÃ§â€Â¨Ã§Å¡â€žÃ¥Â·Â¥Ã¥â€¦Â·Ã§Â±Â»Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¦Å“â€°Ã§â€¢Å’Ã¦Â³â€ºÃ¥Å¾â€¹

```java
public <T extends Identifiable> Map<Long, T> indexById(Collection<T> items) { ... }
```

## Ã©Â¡Â¹Ã§â€ºÂ®Ã§Â»â€œÃ¦Å¾â€ž (Maven/Gradle)

```
src/main/java/com/example/app/
  config/
  controller/
  service/
  repository/
  domain/
  dto/
  util/
src/main/resources/
  application.yml
src/test/java/... (mirrors main)
```

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã¥â€™Å’Ã©Â£Å½Ã¦Â Â¼

* Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¥Å“Â°Ã¤Â½Â¿Ã§â€Â¨ 2 Ã¦Ë†â€“ 4 Ã¤Â¸ÂªÃ§Â©ÂºÃ¦Â Â¼Ã¯Â¼Ë†Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Â â€¡Ã¥â€¡â€ Ã¯Â¼â€°
* Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥â€¦Â¬Ã¥â€¦Â±Ã©Â¡Â¶Ã§ÂºÂ§Ã§Â±Â»Ã¥Å¾â€¹
* Ã¤Â¿ÂÃ¦Å’ÂÃ¦â€“Â¹Ã¦Â³â€¢Ã§Â®â‚¬Ã§Å¸Â­Ã¤Â¸â€Ã¤Â¸â€œÃ¦Â³Â¨Ã¯Â¼â€ºÃ¦ÂÂÃ¥Ââ€“Ã¨Â¾â€¦Ã¥Å Â©Ã¦â€“Â¹Ã¦Â³â€¢
* Ã¦Ë†ÂÃ¥â€˜ËœÃ©Â¡ÂºÃ¥ÂºÂÃ¯Â¼Å¡Ã¥Â¸Â¸Ã©â€¡ÂÃ£â‚¬ÂÃ¥Â­â€”Ã¦Â®ÂµÃ£â‚¬ÂÃ¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬ÂÃ¥â€¦Â¬Ã¥â€¦Â±Ã¦â€“Â¹Ã¦Â³â€¢Ã£â‚¬ÂÃ¥Ââ€”Ã¤Â¿ÂÃ¦Å Â¤Ã¦â€“Â¹Ã¦Â³â€¢Ã£â‚¬ÂÃ§Â§ÂÃ¦Å“â€°Ã¦â€“Â¹Ã¦Â³â€¢

## Ã©Å“â‚¬Ã¨Â¦ÂÃ©ÂÂ¿Ã¥â€¦ÂÃ§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¥ÂÂÃ¥â€˜Â³Ã©Ââ€œ

* Ã©â€¢Â¿Ã¥Ââ€šÃ¦â€¢Â°Ã¥Ë†â€”Ã¨Â¡Â¨ Ã¢â€ â€™ Ã¤Â½Â¿Ã§â€Â¨ DTO/Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â„¢Â¨
* Ã¦Â·Â±Ã¥ÂºÂ¦Ã¥ÂµÅ’Ã¥Â¥â€” Ã¢â€ â€™ Ã¦ÂÂÃ¥â€°ÂÃ¨Â¿â€Ã¥â€ºÅ¾
* Ã©Â­â€Ã¦Â³â€¢Ã¦â€¢Â°Ã¥Â­â€” Ã¢â€ â€™ Ã¥â€˜Â½Ã¥ÂÂÃ¥Â¸Â¸Ã©â€¡Â
* Ã©Ââ„¢Ã¦â‚¬ÂÃ¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬Â Ã¢â€ â€™ Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥
* Ã©Ââ„¢Ã©Â»ËœÃ¦Ââ€¢Ã¨Å½Â·Ã¥Ââ€” Ã¢â€ â€™ Ã¨Â®Â°Ã¥Â½â€¢Ã¦â€”Â¥Ã¥Â¿â€”Ã¥Â¹Â¶Ã¥Â¤â€žÃ§Ââ€ Ã¦Ë†â€“Ã©â€¡ÂÃ¦â€“Â°Ã¦Å â€ºÃ¥â€¡Âº

## Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢

```java
private static final Logger log = LoggerFactory.getLogger(MarketService.class);
log.info("fetch_market slug={}", slug);
log.error("failed_fetch_market slug={}", slug, ex);
```

## Null Ã¥Â¤â€žÃ§Ââ€ 

* Ã¤Â»â€¦Ã¥Å“Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã©ÂÂ¿Ã¥â€¦ÂÃ¦â€”Â¶Ã¦Å½Â¥Ã¥Ââ€” `@Nullable`Ã¯Â¼â€ºÃ¥ÂÂ¦Ã¥Ë†â„¢Ã¤Â½Â¿Ã§â€Â¨ `@NonNull`
* Ã¥Å“Â¨Ã¨Â¾â€œÃ¥â€¦Â¥Ã¤Â¸Å Ã¤Â½Â¿Ã§â€Â¨ Bean Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Ë†`@NotNull`, `@NotBlank`Ã¯Â¼â€°

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Å“Å¸Ã¦Å“â€º

* Ã¤Â½Â¿Ã§â€Â¨ JUnit 5 + AssertJ Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦ÂµÂÃ§â€¢â€¦Ã§Å¡â€žÃ¦â€“Â­Ã¨Â¨â‚¬
* Ã¤Â½Â¿Ã§â€Â¨ Mockito Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¯Â¼â€ºÃ¥Â°Â½Ã¥ÂÂ¯Ã¨Æ’Â½Ã©ÂÂ¿Ã¥â€¦ÂÃ©Æ’Â¨Ã¥Ë†â€ Ã¦Â¨Â¡Ã¦â€¹Å¸
* Ã¥â‚¬Â¾Ã¥Ââ€˜Ã¤ÂºÅ½Ã§Â¡Â®Ã¥Â®Å¡Ã¦â‚¬Â§Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€ºÃ¦Â²Â¡Ã¦Å“â€°Ã©Å¡ÂÃ¨â€”ÂÃ§Å¡â€žÃ¤Â¼â€˜Ã§Å“Â 

**Ã¨Â®Â°Ã¤Â½Â**Ã¯Â¼Å¡Ã¤Â¿ÂÃ¦Å’ÂÃ¤Â»Â£Ã§Â ÂÃ¦â€žÂÃ¥â€ºÂ¾Ã¦ËœÅ½Ã§Â¡Â®Ã£â‚¬ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã¤Â¸â€Ã¥ÂÂ¯Ã¨Â§â€šÃ¥Â¯Å¸Ã£â‚¬â€šÃ©â„¢Â¤Ã©ÂÅ¾Ã¨Â¯ÂÃ¦ËœÅ½Ã¦Å“â€°Ã¥Â¿â€¦Ã¨Â¦ÂÃ¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¤Â¼ËœÃ¥â€¦Ë†Ã¨â‚¬Æ’Ã¨â„¢â€˜Ã¥ÂÂ¯Ã§Â»Â´Ã¦Å Â¤Ã¦â‚¬Â§Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â¾Â®Ã¤Â¼ËœÃ¥Å’â€“Ã£â‚¬â€š
