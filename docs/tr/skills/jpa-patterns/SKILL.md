---
name: jpa-patterns
description: Spring Boot'ta entity tasarımı, ilişkiler, sorgu optimizasyonu, transaction'lar, auditing, indeksleme, sayfalama ve pooling için JPA/Hibernate kalıpları.
origin: ECC
---

# JPA/Hibernate Kalıpları

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Spring Boot'ta veri modelleme, repository'ler ve performans ayarlaması için kullanın.

## Ne Zaman Aktifleştirmeli

- JPA entity'leri ve tablo eşlemelerini tasarlarken
- İlişkileri tanımlarken (@OneToMany, @ManyToOne, @ManyToMany)
- Sorguları optimize ederken (N+1 önleme, fetch stratejileri, projections)
- Transaction'ları, auditing'i veya soft delete'leri yapılandırırken
- Sayfalama, sıralama veya özel repository metodları kurarken
- Connection pooling (HikariCP) veya second-level caching ayarlarken

## Entity Tasarımı

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

Auditing'i etkinleştir:
```java
@Configuration
@EnableJpaAuditing
class JpaConfig {}
```

## İlişkiler ve N+1 Önleme

```java
@OneToMany(mappedBy = "market", cascade = CascadeType.ALL, orphanRemoval = true)
private List<PositionEntity> positions = new ArrayList<>();
```

- Varsayılan olarak lazy loading; gerektiğinde sorgularda `JOIN FETCH` kullan
- Koleksiyonlarda `EAGER` kullanmaktan kaçın; okuma yolları için DTO projections kullan

```java
@Query("select m from MarketEntity m left join fetch m.positions where m.id = :id")
Optional<MarketEntity> findWithPositions(@Param("id") Long id);
```

## Repository Kalıpları

```java
public interface MarketRepository extends JpaRepository<MarketEntity, Long> {
  Optional<MarketEntity> findBySlug(String slug);

  @Query("select m from MarketEntity m where m.status = :status")
  Page<MarketEntity> findByStatus(@Param("status") MarketStatus status, Pageable pageable);
}
```

- Hafif sorgular için projections kullan:
```java
public interface MarketSummary {
  Long getId();
  String getName();
  MarketStatus getStatus();
}
Page<MarketSummary> findAllBy(Pageable pageable);
```

## Transaction'lar

- Servis metodlarını `@Transactional` ile işaretle
- Okuma yollarını optimize etmek için `@Transactional(readOnly = true)` kullan
- Propagation'ı dikkatle seç; uzun süreli transaction'lardan kaçın

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

Cursor benzeri sayfalama için, sıralama ile birlikte JPQL'de `id > :lastId` ekle.

## İndeksleme ve Performans

- Yaygın filtreler için indeksler ekle (`status`, `slug`, foreign key'ler)
- Sorgu kalıplarına uyan composite indeksler kullan (`status, created_at`)
- `select *` kullanmaktan kaçın; sadece gerekli sütunları project et
- `saveAll` ve `hibernate.jdbc.batch_size` ile yazmaları batch'le

## Connection Pooling (HikariCP)

Önerilen özellikler:
```
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.validation-timeout=5000
```

PostgreSQL LOB işleme için ekle:
```
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
```

## Caching

- 1st-level cache EntityManager başına; transaction'lar arası entity'leri tutmaktan kaçın
- Okuma ağırlıklı entity'ler için second-level cache'i dikkatle düşün; eviction stratejisini doğrula

## Migration'lar

- Flyway veya Liquibase kullan; üretimde Hibernate auto DDL'ye asla güvenme
- Migration'ları idempotent ve ekleyici tut; plan olmadan sütun kaldırmaktan kaçın

## Veri Erişimi Testi

- Üretimi yansıtmak için Testcontainers ile `@DataJpaTest` tercih et
- Logları kullanarak SQL verimliliğini assert et: parametre değerleri için `logging.level.org.hibernate.SQL=DEBUG` ve `logging.level.org.hibernate.orm.jdbc.bind=TRACE` ayarla

**Hatırla**: Entity'leri yalın, sorguları kasıtlı ve transaction'ları kısa tut. Fetch stratejileri ve projections ile N+1'i önle, ve okuma/yazma yolların için indeksle.
