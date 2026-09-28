---
name: springboot-verification
description: "Verification loop for Spring Boot projects: build, static analysis, tests with coverage, security scans, and diff review before release or PR."
---

# Spring Boot 検証ループ

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


PR前、大きな変更後、デプロイ前に実行します。

## フェーズ1: ビルド

```bash
mvn -T 4 clean verify -DskipTests
# または
./gradlew clean assemble -x test
```

ビルドが失敗した場合は、停止して修正します。

## フェーズ2: 静的解析

Maven（一般的なプラグイン）:
```bash
mvn -T 4 spotbugs:check pmd:check checkstyle:check
```

Gradle（設定されている場合）:
```bash
./gradlew checkstyleMain pmdMain spotbugsMain
```

## フェーズ3: テスト + カバレッジ

```bash
mvn -T 4 test
mvn jacoco:report   # 80%以上のカバレッジを確認
# または
./gradlew test jacocoTestReport
```

レポート:
- 総テスト数、合格/失敗
- カバレッジ%（行/分岐）

## フェーズ4: セキュリティスキャン

```bash
# 依存関係のCVE
mvn org.owasp:dependency-check-maven:check
# または
./gradlew dependencyCheckAnalyze

# シークレット（git）
git secrets --scan  # 設定されている場合
```

## フェーズ5: Lint/Format（オプションゲート）

```bash
mvn spotless:apply   # Spotlessプラグインを使用している場合
./gradlew spotlessApply
```

## フェーズ6: 差分レビュー

```bash
git diff --stat
git diff
```

チェックリスト:
- デバッグログが残っていない（`System.out`、ガードなしの `log.debug`）
- 意味のあるエラーとHTTPステータス
- 必要な場所にトランザクションと検証がある
- 設定変更が文書化されている

## 出力テンプレート

```
検証レポート
===================
ビルド:     [合格/不合格]
静的解析:   [合格/不合格] (spotbugs/pmd/checkstyle)
テスト:     [合格/不合格] (X/Y 合格, Z% カバレッジ)
セキュリティ: [合格/不合格] (CVE発見: N)
差分:       [X ファイル変更]

全体:       [準備完了 / 未完了]

修正が必要な問題:
1. ...
2. ...
```

## 継続モード

- 大きな変更があった場合、または長いセッションで30〜60分ごとにフェーズを再実行
- 短いループを維持: `mvn -T 4 test` + spotbugs で迅速なフィードバック

**注意**: 迅速なフィードバックは遅い驚きに勝ります。ゲートを厳格に保ち、本番システムでは警告を欠陥として扱います。
