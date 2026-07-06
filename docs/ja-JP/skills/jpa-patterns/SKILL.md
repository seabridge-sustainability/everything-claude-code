---
name: jpa-patterns
description: JPA/Hibernate patterns for entity design, relationships, query optimization, transactions, auditing, indexing, pagination, and pooling in Spring Boot.
---

# JPA/Hibernate Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

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


Spring BootÃ£ÂÂ§Ã£ÂÂ®Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£â‚¬ÂÃ£Æ’ÂªÃ£Æ’ÂÃ£â€šÂ¸Ã£Æ’Ë†Ã£Æ’ÂªÃ£â‚¬ÂÃ£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¥Ã£Æ’Â¼Ã£Æ’â€¹Ã£Æ’Â³Ã£â€šÂ°Ã£ÂÂ«Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€ Ã£â€šÂ£Ã¨Â¨Â­Ã¨Â¨Ë†

```java
@Entity
@Table(name = "markets", indexes = {
  @Index(name = "idx_markets_slug", columnList = "slug", unique = true)
})
@EntityListeners(AuditingEntityListener.class)
public class MarketEntity {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 200)
  private String name;

  @Column(nullable = false, unique = true, length = 120)
  private String slug;

  @Enumerated(EnumType.STRING)
  private MarketStatus status = MarketStatus.ACTIVE;

  @CreatedDate private Instant createdAt;
  @LastModifiedDate private Instant updatedAt;
}
```

Ã§â€ºÂ£Ã¦Å¸Â»Ã£â€šâ€™Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“:
```java
@Configuration
@EnableJpaAuditing
class JpaConfig {}
```

## Ã£Æ’ÂªÃ£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šÂ·Ã£Æ’Æ’Ã£Æ’â€”Ã£ÂÂ¨N+1Ã©ËœÂ²Ã¦Â­Â¢

```java
@OneToMany(mappedBy = "market", cascade = CascadeType.ALL, orphanRemoval = true)
private List<PositionEntity> positions = new ArrayList<>();
```

- Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã£ÂÂ§Ã©Ââ€¦Ã¥Â»Â¶Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€°Ã£â‚¬â€šÃ¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂ«Ã¥Â¿Å“Ã£ÂËœÃ£ÂÂ¦Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£ÂÂ§ `JOIN FETCH` Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- Ã£â€šÂ³Ã£Æ’Â¬Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ§Ã£ÂÂ¯ `EAGER` Ã£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â‚¬ÂÃ¨ÂªÂ­Ã£ÂÂ¿Ã¥Ââ€“Ã£â€šÅ Ã£Æ’â€˜Ã£â€šÂ¹Ã£ÂÂ«Ã£ÂÂ¯DTOÃ£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨

```java
@Query("select m from MarketEntity m left join fetch m.positions where m.id = :id")
Optional<MarketEntity> findWithPositions(@Param("id") Long id);
```

## Ã£Æ’ÂªÃ£Æ’ÂÃ£â€šÂ¸Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```java
public interface MarketRepository extends JpaRepository<MarketEntity, Long> {
  Optional<MarketEntity> findBySlug(String slug);

  @Query("select m from MarketEntity m where m.status = :status")
  Page<MarketEntity> findByStatus(@Param("status") MarketStatus status, Pageable pageable);
}
```

- Ã¨Â»Â½Ã©â€¡ÂÃ£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£ÂÂ«Ã£ÂÂ¯Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨:
```java
public interface MarketSummary {
  Long getId();
  String getName();
  MarketStatus getStatus();
}
Page<MarketSummary> findAllBy(Pageable pageable);
```

## Ã£Æ’Ë†Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ¶Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

- Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£Æ’Â¡Ã£â€šÂ½Ã£Æ’Æ’Ã£Æ’â€°Ã£ÂÂ« `@Transactional` Ã£â€šâ€™Ã¤Â»ËœÃ£Ââ€˜Ã£â€šâ€¹
- Ã¨ÂªÂ­Ã£ÂÂ¿Ã¥Ââ€“Ã£â€šÅ Ã£Æ’â€˜Ã£â€šÂ¹Ã£â€šâ€™Ã¦Å“â‚¬Ã©ÂÂ©Ã¥Å’â€“Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ« `@Transactional(readOnly = true)` Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- Ã¤Â¼ÂÃ¦â€™Â­Ã£â€šâ€™Ã¦â€¦Å½Ã©â€¡ÂÃ£ÂÂ«Ã©ÂÂ¸Ã¦Å Å¾Ã£â‚¬â€šÃ©â€¢Â·Ã¦â„¢â€šÃ©â€“â€œÃ¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€¢Ã£â€šÅ’Ã£â€šâ€¹Ã£Æ’Ë†Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ¶Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹

```java
@Transactional
public Market updateStatus(Long id, MarketStatus status) {
  MarketEntity entity = repo.findById(id)
      .orElseThrow(() -> new EntityNotFoundException("Market"));
  entity.setStatus(status);
  return Market.from(entity);
}
```

## Ã£Æ’Å¡Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

```java
PageRequest page = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
Page<MarketEntity> markets = repo.findByStatus(MarketStatus.ACTIVE, page);
```

Ã£â€šÂ«Ã£Æ’Â¼Ã£â€šÂ½Ã£Æ’Â«Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¯Ã£ÂÂªÃ£Æ’Å¡Ã£Æ’Â¼Ã£â€šÂ¸Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ«Ã£ÂÂ¯Ã£â‚¬ÂÃ©Â â€ Ã¥ÂºÂÃ¤Â»ËœÃ£Ââ€˜Ã£ÂÂ§JPQLÃ£ÂÂ« `id > :lastId` Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£â€šâ€¹Ã£â‚¬â€š

## Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã¤Â½Å“Ã¦Ë†ÂÃ£ÂÂ¨Ã£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹

- Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã¯Â¼Ë†`status`Ã£â‚¬Â`slug`Ã£â‚¬ÂÃ¥Â¤â€“Ã©Æ’Â¨Ã£â€šÂ­Ã£Æ’Â¼Ã¯Â¼â€°Ã£ÂÂ«Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â 
- Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ«Ã¤Â¸â‚¬Ã¨â€¡Â´Ã£Ââ„¢Ã£â€šâ€¹Ã¨Â¤â€¡Ã¥ÂË†Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Ë†`status, created_at`Ã¯Â¼â€°
- `select *` Ã£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â‚¬ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂªÃ¥Ë†â€”Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã¦Å â€¢Ã¥Â½Â±
- `saveAll` Ã£ÂÂ¨ `hibernate.jdbc.batch_size` Ã£ÂÂ§Ã£Æ’ÂÃ£Æ’Æ’Ã£Æ’ÂÃ¦â€ºÂ¸Ã£ÂÂÃ¨Â¾Â¼Ã£ÂÂ¿

## Ã£â€šÂ³Ã£Æ’ÂÃ£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â¼Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã¯Â¼Ë†HikariCPÃ¯Â¼â€°

Ã¦Å½Â¨Ã¥Â¥Â¨Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’â€˜Ã£Æ’â€ Ã£â€šÂ£:
```
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.validation-timeout=5000
```

PostgreSQL LOBÃ¥â€¡Â¦Ã§Ââ€ Ã£ÂÂ«Ã£ÂÂ¯Ã£â‚¬ÂÃ¦Â¬Â¡Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â :
```
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
```

## Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°

- 1Ã¦Â¬Â¡Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã£ÂÂ¯EntityManagerÃ£Ââ€Ã£ÂÂ¨Ã£â‚¬â€šÃ£Æ’Ë†Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ¶Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã©â€“â€œÃ£ÂÂ§Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€ Ã£â€šÂ£Ã£â€šâ€™Ã¤Â¿ÂÃ¦Å’ÂÃ£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- Ã¨ÂªÂ­Ã£ÂÂ¿Ã¥Ââ€“Ã£â€šÅ Ã©â€ºâ€ Ã§Â´â€žÃ¥Å¾â€¹Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€ Ã£â€šÂ£Ã£ÂÂ«Ã£ÂÂ¯Ã£â‚¬Â2Ã¦Â¬Â¡Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã£â€šâ€™Ã¦â€¦Å½Ã©â€¡ÂÃ£ÂÂ«Ã¦Â¤Å“Ã¨Â¨Å½Ã£â‚¬â€šÃ©â‚¬â‚¬Ã©ÂÂ¿Ã¦Ë†Â¦Ã§â€¢Â¥Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼

## Ã£Æ’Å¾Ã£â€šÂ¤Ã£â€šÂ°Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

- FlywayÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯LiquibaseÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬â€šÃ¦Å“Â¬Ã§â€¢ÂªÃ§â€™Â°Ã¥Â¢Æ’Ã£ÂÂ§HibernateÃ¨â€¡ÂªÃ¥â€¹â€¢DDLÃ£ÂÂ«Ã¤Â¾ÂÃ¥Â­ËœÃ£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- Ã£Æ’Å¾Ã£â€šÂ¤Ã£â€šÂ°Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¥â€ ÂªÃ§Â­â€°Ã£Ââ€¹Ã£ÂÂ¤Ã¨Â¿Â½Ã¥Å Â Ã§Å¡â€žÃ£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¤Ã£â‚¬â€šÃ¨Â¨Ë†Ã§â€Â»Ã£ÂÂªÃ£Ââ€”Ã£ÂÂ«Ã¥Ë†â€”Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž

## Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

- Ã¦Å“Â¬Ã§â€¢ÂªÃ§â€™Â°Ã¥Â¢Æ’Ã£â€šâ€™Ã¥ÂÂÃ¦ËœÂ Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«Ã£â‚¬ÂTestcontainersÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸ `@DataJpaTest` Ã£â€šâ€™Ã¥â€žÂªÃ¥â€¦Ë†
- Ã£Æ’Â­Ã£â€šÂ°Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦SQLÃ¥Å Â¹Ã§Å½â€¡Ã£â€šâ€™Ã£â€šÂ¢Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’Ë†: Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥â‚¬Â¤Ã£ÂÂ«Ã£ÂÂ¯ `logging.level.org.hibernate.SQL=DEBUG` Ã£ÂÂ¨ `logging.level.org.hibernate.orm.jdbc.bind=TRACE` Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡

**Ã¦Â³Â¨Ã¦â€žÂ**: Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€ Ã£â€šÂ£Ã£â€šâ€™Ã¨Â»Â½Ã©â€¡ÂÃ£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¡Ã£â‚¬ÂÃ£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£â€šâ€™Ã¦â€žÂÃ¥â€ºÂ³Ã§Å¡â€žÃ£ÂÂ«Ã£Ââ€”Ã£â‚¬ÂÃ£Æ’Ë†Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ¶Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã§Å¸Â­Ã£ÂÂÃ¤Â¿ÂÃ£ÂÂ¡Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£Æ’â€¢Ã£â€šÂ§Ã£Æ’Æ’Ã£Æ’ÂÃ¦Ë†Â¦Ã§â€¢Â¥Ã£ÂÂ¨Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ§N+1Ã£â€šâ€™Ã©ËœÂ²Ã£ÂÅ½Ã£â‚¬ÂÃ¨ÂªÂ­Ã£ÂÂ¿Ã¥Ââ€“Ã£â€šÅ /Ã¦â€ºÂ¸Ã£ÂÂÃ¨Â¾Â¼Ã£ÂÂ¿Ã£Æ’â€˜Ã£â€šÂ¹Ã£ÂÂ«Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
