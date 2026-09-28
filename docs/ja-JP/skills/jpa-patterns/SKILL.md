---
name: jpa-patterns
description: JPA/Hibernate patterns for entity design, relationships, query optimization, transactions, auditing, indexing, pagination, and pooling in Spring Boot.
---

# JPA/Hibernate パターン

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


Spring Bootでのデータモデリング、リポジトリ、パフォーマンスチューニングに使用します。

## エンティティ設計

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

監査を有効化:
```java
@Configuration
@EnableJpaAuditing
class JpaConfig {}
```

## リレーションシップとN+1防止

```java
@OneToMany(mappedBy = "market", cascade = CascadeType.ALL, orphanRemoval = true)
private List<PositionEntity> positions = new ArrayList<>();
```

- デフォルトで遅延ロード。必要に応じてクエリで `JOIN FETCH` を使用
- コレクションでは `EAGER` を避け、読み取りパスにはDTOプロジェクションを使用

```java
@Query("select m from MarketEntity m left join fetch m.positions where m.id = :id")
Optional<MarketEntity> findWithPositions(@Param("id") Long id);
```

## リポジトリパターン

```java
public interface MarketRepository extends JpaRepository<MarketEntity, Long> {
  Optional<MarketEntity> findBySlug(String slug);

  @Query("select m from MarketEntity m where m.status = :status")
  Page<MarketEntity> findByStatus(@Param("status") MarketStatus status, Pageable pageable);
}
```

- 軽量クエリにはプロジェクションを使用:
```java
public interface MarketSummary {
  Long getId();
  String getName();
  MarketStatus getStatus();
}
Page<MarketSummary> findAllBy(Pageable pageable);
```

## トランザクション

- サービスメソッドに `@Transactional` を付ける
- 読み取りパスを最適化するために `@Transactional(readOnly = true)` を使用
- 伝播を慎重に選択。長時間実行されるトランザクションを避ける

```java
@Transactional
public Market updateStatus(Long id, MarketStatus status) {
  MarketEntity entity = repo.findById(id)
      .orElseThrow(() -> new EntityNotFoundException("Market"));
  entity.setStatus(status);
  return Market.from(entity);
}
```

## ページネーション

```java
PageRequest page = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
Page<MarketEntity> markets = repo.findByStatus(MarketStatus.ACTIVE, page);
```

カーソルライクなページネーションには、順序付けでJPQLに `id > :lastId` を含める。

## インデックス作成とパフォーマンス

- 一般的なフィルタ（`status`、`slug`、外部キー）にインデックスを追加
- クエリパターンに一致する複合インデックスを使用（`status, created_at`）
- `select *` を避け、必要な列のみを投影
- `saveAll` と `hibernate.jdbc.batch_size` でバッチ書き込み

## コネクションプーリング（HikariCP）

推奨プロパティ:
```
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.validation-timeout=5000
```

PostgreSQL LOB処理には、次を追加:
```
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
```

## キャッシング

- 1次キャッシュはEntityManagerごと。トランザクション間でエンティティを保持しない
- 読み取り集約型エンティティには、2次キャッシュを慎重に検討。退避戦略を検証

## マイグレーション

- FlywayまたはLiquibaseを使用。本番環境でHibernate自動DDLに依存しない
- マイグレーションを冪等かつ追加的に保つ。計画なしに列を削除しない

## データアクセステスト

- 本番環境を反映するために、Testcontainersを使用した `@DataJpaTest` を優先
- ログを使用してSQL効率をアサート: パラメータ値には `logging.level.org.hibernate.SQL=DEBUG` と `logging.level.org.hibernate.orm.jdbc.bind=TRACE` を設定

**注意**: エンティティを軽量に保ち、クエリを意図的にし、トランザクションを短く保ちます。フェッチ戦略とプロジェクションでN+1を防ぎ、読み取り/書き込みパスにインデックスを作成します。
