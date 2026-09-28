---
name: java-coding-standards
description: Spring Bootサービス向けのJavaコーディング標準：命名、不変性、Optional使用、ストリーム、例外、ジェネリクス、プロジェクトレイアウト。
---

# Javaコーディング標準

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


Spring Bootサービスにおける読みやすく保守可能なJava(17+)コードの標準。

## 核となる原則

- 巧妙さよりも明確さを優先
- デフォルトで不変; 共有可変状態を最小化
- 意味のある例外で早期失敗
- 一貫した命名とパッケージ構造

## 命名

```java
// PASS: クラス/レコード: PascalCase
public class MarketService {}
public record Money(BigDecimal amount, Currency currency) {}

// PASS: メソッド/フィールド: camelCase
private final MarketRepository marketRepository;
public Market findBySlug(String slug) {}

// PASS: 定数: UPPER_SNAKE_CASE
private static final int MAX_PAGE_SIZE = 100;
```

## 不変性

```java
// PASS: recordとfinalフィールドを優先
public record MarketDto(Long id, String name, MarketStatus status) {}

public class Market {
  private final Long id;
  private final String name;
  // getterのみ、setterなし
}
```

## Optionalの使用

```java
// PASS: find*メソッドからOptionalを返す
Optional<Market> market = marketRepository.findBySlug(slug);

// PASS: get()の代わりにmap/flatMapを使用
return market
    .map(MarketResponse::from)
    .orElseThrow(() -> new EntityNotFoundException("Market not found"));
```

## ストリームのベストプラクティス

```java
// PASS: 変換にストリームを使用し、パイプラインを短く保つ
List<String> names = markets.stream()
    .map(Market::name)
    .filter(Objects::nonNull)
    .toList();

// FAIL: 複雑なネストされたストリームを避ける; 明確性のためにループを優先
```

## 例外

- ドメインエラーには非チェック例外を使用; 技術的例外はコンテキストとともにラップ
- ドメイン固有の例外を作成(例: `MarketNotFoundException`)
- 広範な`catch (Exception ex)`を避ける(中央でリスロー/ログ記録する場合を除く)

```java
throw new MarketNotFoundException(slug);
```

## ジェネリクスと型安全性

- 生の型を避ける; ジェネリックパラメータを宣言
- 再利用可能なユーティリティには境界付きジェネリクスを優先

```java
public <T extends Identifiable> Map<Long, T> indexById(Collection<T> items) { ... }
```

## プロジェクト構造(Maven/Gradle)

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
src/test/java/... (mainをミラー)
```

## フォーマットとスタイル

- 一貫して2または4スペースを使用(プロジェクト標準)
- ファイルごとに1つのpublicトップレベル型
- メソッドを短く集中的に保つ; ヘルパーを抽出
- メンバーの順序: 定数、フィールド、コンストラクタ、publicメソッド、protected、private

## 避けるべきコードの臭い

- 長いパラメータリスト → DTO/ビルダーを使用
- 深いネスト → 早期リターン
- マジックナンバー → 名前付き定数
- 静的可変状態 → 依存性注入を優先
- サイレントなcatchブロック → ログを記録して行動、または再スロー

## ログ記録

```java
private static final Logger log = LoggerFactory.getLogger(MarketService.class);
log.info("fetch_market slug={}", slug);
log.error("failed_fetch_market slug={}", slug, ex);
```

## Null処理

- やむを得ない場合のみ`@Nullable`を受け入れる; それ以外は`@NonNull`を使用
- 入力にBean Validation(`@NotNull`、`@NotBlank`)を使用

## テストの期待

- JUnit 5 + AssertJで流暢なアサーション
- モック用のMockito; 可能な限り部分モックを避ける
- 決定論的テストを優先; 隠れたsleepなし

**覚えておく**: コードを意図的、型付き、観察可能に保つ。必要性が証明されない限り、マイクロ最適化よりも保守性を最適化します。
