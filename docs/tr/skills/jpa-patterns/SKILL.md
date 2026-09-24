---
name: jpa-patterns
description: Spring Boot'ta entity tasarÃ„Â±mÃ„Â±, iliÃ…Å¸kiler, sorgu optimizasyonu, transaction'lar, auditing, indeksleme, sayfalama ve pooling iÃƒÂ§in JPA/Hibernate kalÃ„Â±plarÃ„Â±.
origin: ECC
---

# JPA/Hibernate KalÃ„Â±plarÃ„Â±

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


Spring Boot'ta veri modelleme, repository'ler ve performans ayarlamasÃ„Â± iÃƒÂ§in kullanÃ„Â±n.

## Ne Zaman AktifleÃ…Å¸tirmeli

- JPA entity'leri ve tablo eÃ…Å¸lemelerini tasarlarken
- Ã„Â°liÃ…Å¸kileri tanÃ„Â±mlarken (@OneToMany, @ManyToOne, @ManyToMany)
- SorgularÃ„Â± optimize ederken (N+1 ÃƒÂ¶nleme, fetch stratejileri, projections)
- Transaction'larÃ„Â±, auditing'i veya soft delete'leri yapÃ„Â±landÃ„Â±rÃ„Â±rken
- Sayfalama, sÃ„Â±ralama veya ÃƒÂ¶zel repository metodlarÃ„Â± kurarken
- Connection pooling (HikariCP) veya second-level caching ayarlarken

## Entity TasarÃ„Â±mÃ„Â±

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

Auditing'i etkinleÃ…Å¸tir:
```java
@Configuration
@EnableJpaAuditing
class JpaConfig {}
```

## Ã„Â°liÃ…Å¸kiler ve N+1 Ãƒâ€“nleme

```java
@OneToMany(mappedBy = "market", cascade = CascadeType.ALL, orphanRemoval = true)
private List<PositionEntity> positions = new ArrayList<>();
```

- VarsayÃ„Â±lan olarak lazy loading; gerektiÃ„Å¸inde sorgularda `JOIN FETCH` kullan
- Koleksiyonlarda `EAGER` kullanmaktan kaÃƒÂ§Ã„Â±n; okuma yollarÃ„Â± iÃƒÂ§in DTO projections kullan

```java
@Query("select m from MarketEntity m left join fetch m.positions where m.id = :id")
Optional<MarketEntity> findWithPositions(@Param("id") Long id);
```

## Repository KalÃ„Â±plarÃ„Â±

```java
public interface MarketRepository extends JpaRepository<MarketEntity, Long> {
  Optional<MarketEntity> findBySlug(String slug);

  @Query("select m from MarketEntity m where m.status = :status")
  Page<MarketEntity> findByStatus(@Param("status") MarketStatus status, Pageable pageable);
}
```

- Hafif sorgular iÃƒÂ§in projections kullan:
```java
public interface MarketSummary {
  Long getId();
  String getName();
  MarketStatus getStatus();
}
Page<MarketSummary> findAllBy(Pageable pageable);
```

## Transaction'lar

- Servis metodlarÃ„Â±nÃ„Â± `@Transactional` ile iÃ…Å¸aretle
- Okuma yollarÃ„Â±nÃ„Â± optimize etmek iÃƒÂ§in `@Transactional(readOnly = true)` kullan
- Propagation'Ã„Â± dikkatle seÃƒÂ§; uzun sÃƒÂ¼reli transaction'lardan kaÃƒÂ§Ã„Â±n

```java
@Transactional
public Market updateStatus(Long id, MarketStatus status) {
  MarketEntity entity = repo.findById(id)
      .orElseThrow(() -> new EntityNotFoundException("Market"));
  entity.setStatus(status);
  return Market.from(entity);
}
```

## Sayfalama

```java
PageRequest page = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
Page<MarketEntity> markets = repo.findByStatus(MarketStatus.ACTIVE, page);
```

Cursor benzeri sayfalama iÃƒÂ§in, sÃ„Â±ralama ile birlikte JPQL'de `id > :lastId` ekle.

## Ã„Â°ndeksleme ve Performans

- YaygÃ„Â±n filtreler iÃƒÂ§in indeksler ekle (`status`, `slug`, foreign key'ler)
- Sorgu kalÃ„Â±plarÃ„Â±na uyan composite indeksler kullan (`status, created_at`)
- `select *` kullanmaktan kaÃƒÂ§Ã„Â±n; sadece gerekli sÃƒÂ¼tunlarÃ„Â± project et
- `saveAll` ve `hibernate.jdbc.batch_size` ile yazmalarÃ„Â± batch'le

## Connection Pooling (HikariCP)

Ãƒâ€“nerilen ÃƒÂ¶zellikler:
```
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.validation-timeout=5000
```

PostgreSQL LOB iÃ…Å¸leme iÃƒÂ§in ekle:
```
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
```

## Caching

- 1st-level cache EntityManager baÃ…Å¸Ã„Â±na; transaction'lar arasÃ„Â± entity'leri tutmaktan kaÃƒÂ§Ã„Â±n
- Okuma aÃ„Å¸Ã„Â±rlÃ„Â±klÃ„Â± entity'ler iÃƒÂ§in second-level cache'i dikkatle dÃƒÂ¼Ã…Å¸ÃƒÂ¼n; eviction stratejisini doÃ„Å¸rula

## Migration'lar

- Flyway veya Liquibase kullan; ÃƒÂ¼retimde Hibernate auto DDL'ye asla gÃƒÂ¼venme
- Migration'larÃ„Â± idempotent ve ekleyici tut; plan olmadan sÃƒÂ¼tun kaldÃ„Â±rmaktan kaÃƒÂ§Ã„Â±n

## Veri EriÃ…Å¸imi Testi

- ÃƒÅ“retimi yansÃ„Â±tmak iÃƒÂ§in Testcontainers ile `@DataJpaTest` tercih et
- LoglarÃ„Â± kullanarak SQL verimliliÃ„Å¸ini assert et: parametre deÃ„Å¸erleri iÃƒÂ§in `logging.level.org.hibernate.SQL=DEBUG` ve `logging.level.org.hibernate.orm.jdbc.bind=TRACE` ayarla

**HatÃ„Â±rla**: Entity'leri yalÃ„Â±n, sorgularÃ„Â± kasÃ„Â±tlÃ„Â± ve transaction'larÃ„Â± kÃ„Â±sa tut. Fetch stratejileri ve projections ile N+1'i ÃƒÂ¶nle, ve okuma/yazma yollarÃ„Â±n iÃƒÂ§in indeksle.
