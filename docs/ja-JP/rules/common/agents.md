# Agent Ã£â€šÂªÃ£Æ’Â¼Ã£â€šÂ±Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

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


## Ã¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂª Agent

`~/.claude/agents/` Ã£ÂÂ«Ã©â€¦ÂÃ§Â½Â®:

| Agent | Ã§â€ºÂ®Ã§Å¡â€ž | Ã¤Â½Â¿Ã§â€Â¨Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Å¸Ã£Æ’Â³Ã£â€šÂ° |
|-------|---------|-------------|
| ecc:planner | 実装計画 | 複雑な機能、リファクタリング |
| ecc:architect | システム設計 | アーキテクチャの意思決定 |
| ecc:tdd-guide | テスト駆動開発 | 新機能、バグ修正 |
| ecc:code-reviewer | コードレビュー | コード記述後 |
| ecc:security-reviewer | セキュリティ分析 | コミット前 |
| ecc:build-error-resolver | ビルドエラー修正 | ビルド失敗時 |
| ecc:e2e-runner | E2Eテスト | 重要なユーザーフロー |
| ecc:refactor-cleaner | デッドコードクリーンアップ | コードメンテナンス |
| ecc:doc-updater | ドキュメント | ドキュメント更新 |

全 68 Agent の一覧は `/ecc:ecc-guide` を参照。

## Agent Ã£ÂÂ®Ã¥ÂÂ³Ã¥ÂºÂ§Ã£ÂÂ®Ã¤Â½Â¿Ã§â€Â¨

ユーザープロンプト不要:
1. 複雑な機能リクエスト - **ecc:planner** agent を使用
2. コード作成/変更直後 - **ecc:code-reviewer** agent を使用
3. バグ修正または新機能 - **ecc:tdd-guide** agent を使用
4. アーキテクチャの意思決定 - **ecc:architect** agent を使用

## Ã¤Â¸Â¦Ã¥Ë†â€”Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¯Ã¥Â®Å¸Ã¨Â¡Å’

Ã§â€¹Â¬Ã§Â«â€¹Ã£Ââ€”Ã£ÂÅ¸Ã¦â€œÂÃ¤Â½Å“Ã£ÂÂ«Ã£ÂÂ¯Ã¥Â¸Â¸Ã£ÂÂ«Ã¤Â¸Â¦Ã¥Ë†â€” Task Ã¥Â®Å¸Ã¨Â¡Å’Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž:

```markdown
# Ã¨â€°Â¯Ã£Ââ€žÃ¤Â¾â€¹: Ã¤Â¸Â¦Ã¥Ë†â€”Ã¥Â®Å¸Ã¨Â¡Å’
3Ã£ÂÂ¤Ã£ÂÂ® agent Ã£â€šâ€™Ã¤Â¸Â¦Ã¥Ë†â€”Ã¨ÂµÂ·Ã¥â€¹â€¢:
1. Agent 1: Ã¨ÂªÂÃ¨Â¨Â¼Ã£Æ’Â¢Ã£â€šÂ¸Ã£Æ’Â¥Ã£Æ’Â¼Ã£Æ’Â«Ã£ÂÂ®Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¥Ë†â€ Ã¦Å¾Â
2. Agent 2: Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã£â€šÂ·Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â Ã£ÂÂ®Ã£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼
3. Agent 3: Ã£Æ’Â¦Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ®Ã¥Å¾â€¹Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯

# Ã¦â€šÂªÃ£Ââ€žÃ¤Â¾â€¹: Ã¤Â¸ÂÃ¨Â¦ÂÃ£ÂÂªÃ©â‚¬ÂÃ¦Â¬Â¡Ã¥Â®Å¸Ã¨Â¡Å’
Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ« agent 1Ã£â‚¬ÂÃ¦Â¬Â¡Ã£ÂÂ« agent 2Ã£â‚¬ÂÃ£ÂÂÃ£Ââ€”Ã£ÂÂ¦ agent 3
```

## Ã¥Â¤Å¡Ã¨Â§â€™Ã§Å¡â€žÃ¥Ë†â€ Ã¦Å¾Â

Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ¥â€¢ÂÃ©Â¡Å’Ã£ÂÂ«Ã£ÂÂ¯Ã£â‚¬ÂÃ¥Â½Â¹Ã¥â€°Â²Ã¥Ë†â€ Ã¦â€¹â€¦Ã£Ââ€”Ã£ÂÅ¸Ã£â€šÂµÃ£Æ’â€“ agent Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨:
- Ã¤Âºâ€¹Ã¥Â®Å¸Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã¦â€¹â€¦Ã¥Â½â€œ
- Ã£â€šÂ·Ã£Æ’â€¹Ã£â€šÂ¢Ã£â€šÂ¨Ã£Æ’Â³Ã£â€šÂ¸Ã£Æ’â€¹Ã£â€šÂ¢
- Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¨Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’â€˜Ã£Æ’Â¼Ã£Æ’Ë†
- Ã¤Â¸â‚¬Ã¨Â²Â«Ã¦â‚¬Â§Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã¦â€¹â€¦Ã¥Â½â€œ
- Ã¥â€ â€”Ã©â€¢Â·Ã¦â‚¬Â§Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã¦â€¹â€¦Ã¥Â½â€œ
