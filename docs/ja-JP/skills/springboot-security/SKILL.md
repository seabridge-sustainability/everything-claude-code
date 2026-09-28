---
name: springboot-security
description: Spring Security best practices for authn/authz, validation, CSRF, secrets, headers, rate limiting, and dependency security in Java Spring Boot services.
---

# Spring Boot セキュリティレビュー

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


認証の追加、入力処理、エンドポイント作成、またはシークレット処理時に使用します。

## 認証

- ステートレスJWTまたは失効リスト付き不透明トークンを優先
- セッションには `httpOnly`、`Secure`、`SameSite=Strict` クッキーを使用
- `OncePerRequestFilter` またはリソースサーバーでトークンを検証

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

## 認可

- メソッドセキュリティを有効化: `@EnableMethodSecurity`
- `@PreAuthorize("hasRole('ADMIN')")` または `@PreAuthorize("@authz.canEdit(#id)")` を使用
- デフォルトで拒否し、必要なスコープのみ公開

## 入力検証

- `@Valid` を使用してコントローラーでBean Validationを使用
- DTOに制約を適用: `@NotBlank`、`@Email`、`@Size`、カスタムバリデーター
- レンダリング前にホワイトリストでHTMLをサニタイズ

## SQLインジェクション防止

- Spring Dataリポジトリまたはパラメータ化クエリを使用
- ネイティブクエリには `:param` バインディングを使用し、文字列を連結しない

## CSRF保護

- ブラウザセッションアプリの場合はCSRFを有効にし、フォーム/ヘッダーにトークンを含める
- Bearerトークンを使用する純粋なAPIの場合は、CSRFを無効にしてステートレス認証に依存

```java
http
  .csrf(csrf -> csrf.disable())
  .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
```

## シークレット管理

- ソースコードにシークレットを含めない。環境変数またはvaultから読み込む
- `application.yml` を認証情報から解放し、プレースホルダーを使用
- トークンとDB認証情報を定期的にローテーション

## セキュリティヘッダー

```java
http
  .headers(headers -> headers
    .contentSecurityPolicy(csp -> csp
      .policyDirectives("default-src 'self'"))
    .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
    .xssProtection(Customizer.withDefaults())
    .referrerPolicy(rp -> rp.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.NO_REFERRER)));
```

## レート制限

- 高コストなエンドポイントにBucket4jまたはゲートウェイレベルの制限を適用
- バーストをログに記録してアラートを送信し、リトライヒント付きで429を返す

## 依存関係のセキュリティ

- CIでOWASP Dependency Check / Snykを実行
- Spring BootとSpring Securityをサポートされているバージョンに保つ
- 既知のCVEでビルドを失敗させる

## ロギングとPII

- シークレット、トークン、パスワード、完全なPANデータをログに記録しない
- 機密フィールドを編集し、構造化JSONロギングを使用

## ファイルアップロード

- サイズ、コンテンツタイプ、拡張子を検証
- Webルート外に保存し、必要に応じてスキャン

## リリース前チェックリスト

- [ ] 認証トークンが正しく検証され、期限切れになっている
- [ ] すべての機密パスに認可ガードがある
- [ ] すべての入力が検証およびサニタイズされている
- [ ] 文字列連結されたSQLがない
- [ ] アプリケーションタイプに対してCSRF対策が正しい
- [ ] シークレットが外部化され、コミットされていない
- [ ] セキュリティヘッダーが設定されている
- [ ] APIにレート制限がある
- [ ] 依存関係がスキャンされ、最新である
- [ ] ログに機密データがない

**注意**: デフォルトで拒否し、入力を検証し、最小権限を適用し、設定によるセキュリティを優先します。
