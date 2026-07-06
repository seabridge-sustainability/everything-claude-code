# Hook Ã§Â³Â»Ã§ÂµÂ±

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


## Hook Ã©Â¡Å¾Ã¥Å¾â€¹

- **PreToolUse**Ã¯Â¼Å¡Ã¥Â·Â¥Ã¥â€¦Â·Ã¥Å¸Â·Ã¨Â¡Å’Ã¥â€°ÂÃ¯Â¼Ë†Ã©Â©â€”Ã¨Â­â€°Ã£â‚¬ÂÃ¥ÂÆ’Ã¦â€¢Â¸Ã¤Â¿Â®Ã¦â€Â¹Ã¯Â¼â€°
- **PostToolUse**Ã¯Â¼Å¡Ã¥Â·Â¥Ã¥â€¦Â·Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â¾Å’Ã¯Â¼Ë†Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã£â‚¬ÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã¯Â¼â€°
- **Stop**Ã¯Â¼Å¡Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ§ÂµÂÃ¦ÂÅ¸Ã¦â„¢â€šÃ¯Â¼Ë†Ã¦Å“â‚¬Ã§Âµâ€šÃ©Â©â€”Ã¨Â­â€°Ã¯Â¼â€°

## Ã§â€ºÂ®Ã¥â€°Â HooksÃ¯Â¼Ë†Ã¥Å“Â¨ ~/.claude/settings.jsonÃ¯Â¼â€°

### PreToolUse
- **tmux Ã¦ÂÂÃ©â€ â€™**Ã¯Â¼Å¡Ã¥Â»ÂºÃ¨Â­Â°Ã¥Â°ÂÃ©â€¢Â·Ã¦â„¢â€šÃ©â€“â€œÃ¥Å¸Â·Ã¨Â¡Å’Ã§Å¡â€žÃ¦Å’â€¡Ã¤Â»Â¤Ã¤Â½Â¿Ã§â€Â¨ tmuxÃ¯Â¼Ë†npmÃ£â‚¬ÂpnpmÃ£â‚¬ÂyarnÃ£â‚¬Âcargo Ã§Â­â€°Ã¯Â¼â€°
- **git push Ã¥Â¯Â©Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã¦Å½Â¨Ã©â‚¬ÂÃ¥â€°ÂÃ©â€“â€¹Ã¥â€¢Å¸ Zed Ã©â‚¬Â²Ã¨Â¡Å’Ã¥Â¯Â©Ã¦Å¸Â¥
- **Ã¦â€“â€¡Ã¤Â»Â¶Ã©ËœÂ»Ã¦â€œâ€¹Ã¥â„¢Â¨**Ã¯Â¼Å¡Ã©ËœÂ»Ã¦â€œâ€¹Ã¥Â»ÂºÃ§Â«â€¹Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€ž .md/.txt Ã¦Âªâ€Ã¦Â¡Ë†

### PostToolUse
- **PR Ã¥Â»ÂºÃ§Â«â€¹**Ã¯Â¼Å¡Ã¨Â¨ËœÃ©Å’â€ž PR URL Ã¥â€™Å’ GitHub Actions Ã§â€¹â‚¬Ã¦â€¦â€¹
- **Prettier**Ã¯Â¼Å¡Ã§Â·Â¨Ã¨Â¼Â¯Ã¥Â¾Å’Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“ JS/TS Ã¦Âªâ€Ã¦Â¡Ë†
- **TypeScript Ã¦ÂªÂ¢Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã§Â·Â¨Ã¨Â¼Â¯ .ts/.tsx Ã¦Âªâ€Ã¦Â¡Ë†Ã¥Â¾Å’Ã¥Å¸Â·Ã¨Â¡Å’ tsc
- **console.log Ã¨Â­Â¦Ã¥â€˜Å **Ã¯Â¼Å¡Ã¨Â­Â¦Ã¥â€˜Å Ã§Â·Â¨Ã¨Â¼Â¯Ã¦Âªâ€Ã¦Â¡Ë†Ã¤Â¸Â­Ã§Å¡â€ž console.log

### Stop
- **console.log Ã§Â¨Â½Ã¦Â Â¸**Ã¯Â¼Å¡Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ§ÂµÂÃ¦ÂÅ¸Ã¥â€°ÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã¦â€°â‚¬Ã¦Å“â€°Ã¤Â¿Â®Ã¦â€Â¹Ã¦Âªâ€Ã¦Â¡Ë†Ã¤Â¸Â­Ã§Å¡â€ž console.log

## Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¦Å½Â¥Ã¥Ââ€”Ã¦Â¬Å Ã©â„¢Â

Ã¨Â¬Â¹Ã¦â€¦Å½Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Å¡
- Ã¥Â°ÂÃ¥Ââ€”Ã¤Â¿Â¡Ã¤Â»Â»Ã£â‚¬ÂÃ¥Â®Å¡Ã§Â¾Â©Ã¦ËœÅ½Ã§Â¢ÂºÃ§Å¡â€žÃ¨Â¨Ë†Ã§â€¢Â«Ã¥â€¢Å¸Ã§â€Â¨
- Ã¥Â°ÂÃ¦Å½Â¢Ã§Â´Â¢Ã¦â‚¬Â§Ã¥Â·Â¥Ã¤Â½Å“Ã¥ÂÅ“Ã§â€Â¨
- Ã§Âµâ€¢Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ dangerously-skip-permissions flag
- Ã¦â€Â¹Ã§â€šÂºÃ¥Å“Â¨ `~/.claude.json` Ã¤Â¸Â­Ã¨Â¨Â­Ã¥Â®Å¡ `allowedTools`

## TodoWrite Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢

Ã¤Â½Â¿Ã§â€Â¨ TodoWrite Ã¥Â·Â¥Ã¥â€¦Â·Ã¤Â¾â€ Ã¯Â¼Å¡
- Ã¨Â¿Â½Ã¨Â¹Â¤Ã¥Â¤Å¡Ã¦Â­Â¥Ã©Â©Å¸Ã¤Â»Â»Ã¥â€¹â„¢Ã§Å¡â€žÃ©â‚¬Â²Ã¥ÂºÂ¦
- Ã©Â©â€”Ã¨Â­â€°Ã¥Â°ÂÃ¦Å’â€¡Ã§Â¤ÂºÃ§Å¡â€žÃ§Ââ€ Ã¨Â§Â£
- Ã¥â€¢Å¸Ã§â€Â¨Ã¥ÂÂ³Ã¦â„¢â€šÃ¨ÂªÂ¿Ã¦â€¢Â´
- Ã©Â¡Â¯Ã§Â¤ÂºÃ§Â´Â°Ã§Â²â€™Ã¥ÂºÂ¦Ã¥Â¯Â¦Ã¤Â½Å“Ã¦Â­Â¥Ã©Â©Å¸

Ã¥Â¾â€¦Ã¨Â¾Â¦Ã¦Â¸â€¦Ã¥â€“Â®Ã¦ÂÂ­Ã§Â¤ÂºÃ¯Â¼Å¡
- Ã©Â â€ Ã¥ÂºÂÃ©Å’Â¯Ã¨ÂªÂ¤Ã§Å¡â€žÃ¦Â­Â¥Ã©Â©Å¸
- Ã§Â¼ÂºÃ¥Â°â€˜Ã§Å¡â€žÃ©Â â€¦Ã§â€ºÂ®
- Ã¥Â¤Å¡Ã©Â¤ËœÃ§Å¡â€žÃ¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ©Â â€¦Ã§â€ºÂ®
- Ã©Å’Â¯Ã¨ÂªÂ¤Ã§Å¡â€žÃ§Â²â€™Ã¥ÂºÂ¦
- Ã¨ÂªÂ¤Ã¨Â§Â£Ã§Å¡â€žÃ©Å“â‚¬Ã¦Â±â€š
