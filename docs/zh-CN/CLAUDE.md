# CLAUDE.md

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Å“Â¬Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Âº Claude Code (claude.ai/code) Ã¥Â¤â€žÃ§Ââ€ Ã¦Â­Â¤Ã¤Â»â€œÃ¥Âºâ€œÃ¤Â»Â£Ã§Â ÂÃ¦â€”Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¦Å’â€¡Ã¥Â¯Â¼Ã£â‚¬â€š

## Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Â¦â€šÃ¨Â¿Â°

Ã¨Â¿â„¢Ã¦ËœÂ¯Ã¤Â¸â‚¬Ã¤Â¸Âª **Claude Code Ã¦Ââ€™Ã¤Â»Â¶** - Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Å’â€¦Ã¥ÂÂ«Ã§â€Å¸Ã¤ÂºÂ§Ã¥Â°Â±Ã§Â»ÂªÃ§Å¡â€žÃ¤Â»Â£Ã§Ââ€ Ã£â‚¬ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã£â‚¬ÂÃ©â€™Â©Ã¥Â­ÂÃ£â‚¬ÂÃ¥â€˜Â½Ã¤Â»Â¤Ã£â‚¬ÂÃ¨Â§â€žÃ¥Ë†â„¢Ã¥â€™Å’ MCP Ã©â€¦ÂÃ§Â½Â®Ã§Å¡â€žÃ©â€ºâ€ Ã¥ÂË†Ã£â‚¬â€šÃ¨Â¯Â¥Ã©Â¡Â¹Ã§â€ºÂ®Ã¦ÂÂÃ¤Â¾â€ºÃ¤Âºâ€ Ã¤Â½Â¿Ã§â€Â¨ Claude Code Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â½Â¯Ã¤Â»Â¶Ã¥Â¼â‚¬Ã¥Ââ€˜Ã§Å¡â€žÃ§Â»ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ§Å¡â€žÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ£â‚¬â€š

## Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢

```bash
# Run all tests
node tests/run-all.js

# Run individual test files
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
```

## Ã¦Å¾Â¶Ã¦Å¾â€ž

Ã©Â¡Â¹Ã§â€ºÂ®Ã§Â»â€žÃ§Â»â€¡Ã¤Â¸ÂºÃ¤Â»Â¥Ã¤Â¸â€¹Ã¥â€¡Â Ã¤Â¸ÂªÃ¦Â Â¸Ã¥Â¿Æ’Ã§Â»â€žÃ¤Â»Â¶Ã¯Â¼Å¡

* **agents/** - Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â§â€Ã¦Â´Â¾Ã§Å¡â€žÃ¤Â¸â€œÃ¤Â¸Å¡Ã¥Å’â€“Ã¥Â­ÂÃ¤Â»Â£Ã§Ââ€ Ã¯Â¼Ë†Ã¨Â§â€žÃ¥Ë†â€™Ã¥â„¢Â¨Ã£â‚¬ÂÃ¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¥â€˜ËœÃ£â‚¬ÂTDD Ã¦Å’â€¡Ã¥Ââ€”Ã§Â­â€°Ã¯Â¼â€°
* **skills/** - Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¥Â®Å¡Ã¤Â¹â€°Ã¥â€™Å’Ã©Â¢â€ Ã¥Å¸Å¸Ã§Å¸Â¥Ã¨Â¯â€ Ã¯Â¼Ë†Ã§Â¼â€“Ã§Â ÂÃ¦Â â€¡Ã¥â€¡â€ Ã£â‚¬ÂÃ¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°
* **commands/** - Ã§â€Â±Ã§â€Â¨Ã¦Ë†Â·Ã¨Â°Æ’Ã§â€Â¨Ã§Å¡â€žÃ¦â€“Å“Ã¦ÂÂ Ã¥â€˜Â½Ã¤Â»Â¤Ã¯Â¼Ë†/tdd, /plan, /e2e Ã§Â­â€°Ã¯Â¼â€°
* **hooks/** - Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¨Â§Â¦Ã¥Ââ€˜Ã§Å¡â€žÃ¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¯Â¼Ë†Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦Å’ÂÃ¤Â¹â€¦Ã¥Å’â€“Ã£â‚¬ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã¥â€°ÂÃ¥ÂÅ½Ã©â€™Â©Ã¥Â­ÂÃ¯Â¼â€°
* **rules/** - Ã¥Â§â€¹Ã§Â»Ë†Ã©ÂÂµÃ¥Â¾ÂªÃ§Å¡â€žÃ¦Å’â€¡Ã¥Ââ€”Ã¯Â¼Ë†Ã¥Â®â€°Ã¥â€¦Â¨Ã£â‚¬ÂÃ§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼Ã£â‚¬ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦ÂÃ¦Â±â€šÃ¯Â¼â€°
* **mcp-configs/** - Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¤â€“Ã©Æ’Â¨Ã©â€ºâ€ Ã¦Ë†ÂÃ§Å¡â€ž MCP Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã©â€¦ÂÃ§Â½Â®
* **scripts/** - Ã§â€Â¨Ã¤ÂºÅ½Ã©â€™Â©Ã¥Â­ÂÃ¥â€™Å’Ã¨Â®Â¾Ã§Â½Â®Ã§Å¡â€žÃ¨Â·Â¨Ã¥Â¹Â³Ã¥ÂÂ° Node.js Ã¥Â·Â¥Ã¥â€¦Â·
* **tests/** - Ã¨â€žÅ¡Ã¦Å“Â¬Ã¥â€™Å’Ã¥Â·Â¥Ã¥â€¦Â·Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¥â€”Ã¤Â»Â¶

## Ã¥â€¦Â³Ã©â€Â®Ã¥â€˜Â½Ã¤Â»Â¤

* `/tdd` - Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ
* `/plan` - Ã¥Â®Å¾Ã¦â€“Â½Ã¨Â§â€žÃ¥Ë†â€™
* `/e2e` - Ã§â€Å¸Ã¦Ë†ÂÃ¥Â¹Â¶Ã¨Â¿ÂÃ¨Â¡Å’Ã§Â«Â¯Ã¥Ë†Â°Ã§Â«Â¯Ã¦Âµâ€¹Ã¨Â¯â€¢
* `/code-review` - Ã¨Â´Â¨Ã©â€¡ÂÃ¥Â®Â¡Ã¦Å¸Â¥
* `/build-fix` - Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯
* `/learn` - Ã¤Â»Å½Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¸Â­Ã¦ÂÂÃ¥Ââ€“Ã¦Â¨Â¡Ã¥Â¼Â
* `/skill-create` - Ã¤Â»Å½ git Ã¥Å½â€ Ã¥ÂÂ²Ã¨Â®Â°Ã¥Â½â€¢Ã§â€Å¸Ã¦Ë†ÂÃ¦Å â‚¬Ã¨Æ’Â½

## Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¨Â¯Â´Ã¦ËœÅ½

* Ã¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¯Â¼Å¡npmÃ£â‚¬ÂpnpmÃ£â‚¬ÂyarnÃ£â‚¬ÂbunÃ¯Â¼Ë†Ã¥ÂÂ¯Ã©â‚¬Å¡Ã¨Â¿â€¡ `CLAUDE_PACKAGE_MANAGER` Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¦Ë†â€“Ã©Â¡Â¹Ã§â€ºÂ®Ã©â€¦ÂÃ§Â½Â®Ã¨Â®Â¾Ã§Â½Â®Ã¯Â¼â€°
* Ã¨Â·Â¨Ã¥Â¹Â³Ã¥ÂÂ°Ã¯Â¼Å¡Ã©â‚¬Å¡Ã¨Â¿â€¡ Node.js Ã¨â€žÅ¡Ã¦Å“Â¬Ã¦â€Â¯Ã¦Å’Â WindowsÃ£â‚¬ÂmacOSÃ£â‚¬ÂLinux
* Ã¤Â»Â£Ã§Ââ€ Ã¦Â Â¼Ã¥Â¼ÂÃ¯Â¼Å¡Ã¥Â¸Â¦Ã¦Å“â€° YAML Ã¥â€°ÂÃ¨Â¨â‚¬Ã§Å¡â€ž MarkdownÃ¯Â¼Ë†Ã¥ÂÂÃ§Â§Â°Ã£â‚¬ÂÃ¦ÂÂÃ¨Â¿Â°Ã£â‚¬ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬ÂÃ¦Â¨Â¡Ã¥Å¾â€¹Ã¯Â¼â€°
* Ã¦Å â‚¬Ã¨Æ’Â½Ã¦Â Â¼Ã¥Â¼ÂÃ¯Â¼Å¡Ã¥Â¸Â¦Ã¦Å“â€°Ã¦Â¸â€¦Ã¦â„¢Â°Ã§Â«Â Ã¨Å â€šÃ§Å¡â€ž MarkdownÃ¯Â¼Ë†Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬ÂÃ¥Â¦â€šÃ¤Â½â€¢Ã¥Â·Â¥Ã¤Â½Å“Ã£â‚¬ÂÃ§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼â€°
* Ã©â€™Â©Ã¥Â­ÂÃ¦Â Â¼Ã¥Â¼ÂÃ¯Â¼Å¡Ã¥Â¸Â¦Ã¦Å“â€°Ã¥Å’Â¹Ã©â€¦ÂÃ¥â„¢Â¨Ã¦ÂÂ¡Ã¤Â»Â¶Ã¥â€™Å’Ã¥â€˜Â½Ã¤Â»Â¤/Ã©â‚¬Å¡Ã§Å¸Â¥Ã©â€™Â©Ã¥Â­ÂÃ§Å¡â€ž JSON

## Ã¨Â´Â¡Ã§Å’Â®

Ã©ÂÂµÃ¥Â¾Âª CONTRIBUTING.md Ã¤Â¸Â­Ã§Å¡â€žÃ¦Â Â¼Ã¥Â¼ÂÃ¯Â¼Å¡

* Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å¡Ã¥Â¸Â¦Ã¦Å“â€°Ã¥â€°ÂÃ¨Â¨â‚¬Ã§Å¡â€ž MarkdownÃ¯Â¼Ë†Ã¥ÂÂÃ§Â§Â°Ã£â‚¬ÂÃ¦ÂÂÃ¨Â¿Â°Ã£â‚¬ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬ÂÃ¦Â¨Â¡Ã¥Å¾â€¹Ã¯Â¼â€°
* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡Ã¦Â¸â€¦Ã¦â„¢Â°Ã§Å¡â€žÃ§Â«Â Ã¨Å â€šÃ¯Â¼Ë†Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬ÂÃ¥Â¦â€šÃ¤Â½â€¢Ã¥Â·Â¥Ã¤Â½Å“Ã£â‚¬ÂÃ§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼â€°
* Ã¥â€˜Â½Ã¤Â»Â¤Ã¯Â¼Å¡Ã¥Â¸Â¦Ã¦Å“â€°Ã¦ÂÂÃ¨Â¿Â°Ã¥â€°ÂÃ¨Â¨â‚¬Ã§Å¡â€ž Markdown
* Ã©â€™Â©Ã¥Â­ÂÃ¯Â¼Å¡Ã¥Â¸Â¦Ã¦Å“â€°Ã¥Å’Â¹Ã©â€¦ÂÃ¥â„¢Â¨Ã¥â€™Å’Ã©â€™Â©Ã¥Â­ÂÃ¦â€¢Â°Ã§Â»â€žÃ§Å¡â€ž JSON

Ã¦â€“â€¡Ã¤Â»Â¶Ã¥â€˜Â½Ã¥ÂÂÃ¯Â¼Å¡Ã¥Â°ÂÃ¥â€ â„¢Ã¥Â­â€”Ã¦Â¯ÂÃ¥Â¹Â¶Ã§â€Â¨Ã¨Â¿Å¾Ã¥Â­â€”Ã§Â¬Â¦Ã¨Â¿Å¾Ã¦Å½Â¥Ã¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€š `python-reviewer.md`, `tdd-workflow.md`Ã¯Â¼â€°
