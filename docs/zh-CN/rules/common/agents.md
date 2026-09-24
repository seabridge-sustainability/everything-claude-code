# Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ§Â¼â€“Ã¦Å½â€™

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


## Ã¥ÂÂ¯Ã§â€Â¨Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ

Ã¤Â½ÂÃ¤ÂºÅ½ `~/.claude/agents/` Ã¤Â¸Â­Ã¯Â¼Å¡

| Ã¤Â»Â£Ã§Ââ€  | Ã§â€Â¨Ã©â‚¬â€ | Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶Ã¦Å“Âº |
|-------|---------|-------------|
| ecc:planner | 实现规划 | 复杂功能、重构 |
| ecc:architect | 系统设计 | 架构决策 |
| ecc:tdd-guide | 测试驱动开发 | 新功能、错误修复 |
| ecc:code-reviewer | 代码审查 | 编写代码后 |
| ecc:security-reviewer | 安全分析 | 提交前 |
| ecc:build-error-resolver | 修复构建错误 | 构建失败时 |
| ecc:e2e-runner | 端到端测试 | 关键用户流程 |
| ecc:refactor-cleaner | 清理死代码 | 代码维护 |
| ecc:doc-updater | 文档 | 更新文档 |
| ecc:rust-reviewer | Rust 代码审查 | Rust 项目 |

完整 68 个智能体的清单参见 `/ecc:ecc-guide`。

## Ã¥ÂÂ³Ã¦â€”Â¶Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¤Â½Â¿Ã§â€Â¨

Ã¦â€”Â Ã©Å“â‚¬Ã§â€Â¨Ã¦Ë†Â·Ã¦ÂÂÃ§Â¤ÂºÃ¯Â¼Å¡

1. 复杂的功能请求 - 使用 **ecc:planner** 智能体
2. 刚编写/修改的代码 - 使用 **ecc:code-reviewer** 智能体
3. 错误修复或新功能 - 使用 **ecc:tdd-guide** 智能体
4. 架构决策 - 使用 **ecc:architect** 智能体

## Ã¥Â¹Â¶Ã¨Â¡Å’Ã¤Â»Â»Ã¥Å Â¡Ã¦â€°Â§Ã¨Â¡Å’

Ã¥Â¯Â¹Ã¤ÂºÅ½Ã§â€¹Â¬Ã§Â«â€¹Ã¦â€œÂÃ¤Â½Å“Ã¯Â¼Å’**Ã¥Â§â€¹Ã§Â»Ë†**Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¹Â¶Ã¨Â¡Å’Ã¤Â»Â»Ã¥Å Â¡Ã¦â€°Â§Ã¨Â¡Å’Ã¯Â¼Å¡

```markdown
# Ã¨â€°Â¯Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥Â¹Â¶Ã¨Â¡Å’Ã¦â€°Â§Ã¨Â¡Å’
Ã¥ÂÅ’Ã¦â€”Â¶Ã¥ÂÂ¯Ã¥Å Â¨ 3 Ã¤Â¸ÂªÃ¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¯Â¼Å¡
1. Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ 1Ã¯Â¼Å¡Ã¨Â®Â¤Ã¨Â¯ÂÃ¦Â¨Â¡Ã¥Ââ€”Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¥Ë†â€ Ã¦Å¾Â
2. Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ 2Ã¯Â¼Å¡Ã§Â¼â€œÃ¥Â­ËœÃ§Â³Â»Ã§Â»Å¸Ã§Å¡â€žÃ¦â‚¬Â§Ã¨Æ’Â½Ã¥Â®Â¡Ã¦Å¸Â¥
3. Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ 3Ã¯Â¼Å¡Ã¥Â·Â¥Ã¥â€¦Â·Ã§Â±Â»Ã§Å¡â€žÃ§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥

# Ã¤Â¸ÂÃ¨â€°Â¯Ã¯Â¼Å¡Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ©Â¡ÂºÃ¥ÂºÂÃ¦â€°Â§Ã¨Â¡Å’
Ã¥â€¦Ë†Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ 1Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ 2Ã¯Â¼Å’Ã¦Å“â‚¬Ã¥ÂÅ½Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ 3

```

## Ã¥Â¤Å¡Ã¨Â§â€ Ã¨Â§â€™Ã¥Ë†â€ Ã¦Å¾Â

Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥Â¤ÂÃ¦Ââ€šÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¦â€¹â€ Ã¥Ë†â€ Ã¨Â§â€™Ã¨â€°Â²Ã§Å¡â€žÃ¥Â­ÂÃ¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¯Â¼Å¡

* Ã¤Âºâ€¹Ã¥Â®Å¾Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥â€˜Ëœ
* Ã©Â«ËœÃ§ÂºÂ§Ã¥Â·Â¥Ã§Â¨â€¹Ã¥Â¸Ë†
* Ã¥Â®â€°Ã¥â€¦Â¨Ã¤Â¸â€œÃ¥Â®Â¶
* Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥â€˜Ëœ
* Ã¥â€ â€”Ã¤Â½â„¢Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥â„¢Â¨
