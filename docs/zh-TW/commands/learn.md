# /learn - Ã¦â€œÂ·Ã¥Ââ€“Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã¥Ë†â€ Ã¦Å¾ÂÃ§â€ºÂ®Ã¥â€°ÂÃ§Å¡â€žÃ¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ¤Â¸Â¦Ã¦â€œÂ·Ã¥Ââ€“Ã¥â‚¬Â¼Ã¥Â¾â€”Ã¥â€žÂ²Ã¥Â­ËœÃ§â€šÂºÃ¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š

## Ã¨Â§Â¸Ã§â„¢Â¼

Ã¥Å“Â¨Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ¤Â¸Â­Ã¤Â»Â»Ã¤Â½â€¢Ã¦â„¢â€šÃ©â€“â€œÃ©Â»Å¾Ã¨Â§Â£Ã¦Â±ÂºÃ¤Âºâ€ Ã©ÂÅ¾Ã§â€˜Â£Ã§Â¢Å½Ã¥â€¢ÂÃ©Â¡Å’Ã¦â„¢â€šÃ¥Å¸Â·Ã¨Â¡Å’ `/learn`Ã£â‚¬â€š

## Ã¦â€œÂ·Ã¥Ââ€“Ã¥â€¦Â§Ã¥Â®Â¹

Ã¥Â°â€¹Ã¦â€°Â¾Ã¯Â¼Å¡

1. **Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â§Â£Ã¦Â±ÂºÃ¦Â¨Â¡Ã¥Â¼Â**
   - Ã§â„¢Â¼Ã§â€Å¸Ã¤Âºâ€ Ã¤Â»â‚¬Ã©ÂºÂ¼Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¸
   - Ã¦Â Â¹Ã¦Å“Â¬Ã¥Å½Å¸Ã¥â€ºÂ Ã¦ËœÂ¯Ã¤Â»â‚¬Ã©ÂºÂ¼Ã¯Â¼Å¸
   - Ã¤Â»â‚¬Ã©ÂºÂ¼Ã¤Â¿Â®Ã¥Â¾Â©Ã¤Âºâ€ Ã¥Â®Æ’Ã¯Â¼Å¸
   - Ã©â‚¬â„¢Ã¥ÂÂ¯Ã¤Â»Â¥Ã©â€¡ÂÃ§â€Â¨Ã¦â€“Â¼Ã©Â¡Å¾Ã¤Â¼Â¼Ã©Å’Â¯Ã¨ÂªÂ¤Ã¥â€”Å½Ã¯Â¼Å¸

2. **Ã©â„¢Â¤Ã©Å’Â¯Ã¦Å â‚¬Ã¨Â¡â€œ**
   - Ã©ÂÅ¾Ã©Â¡Â¯Ã¨â‚¬Å’Ã¦Ëœâ€œÃ¨Â¦â€¹Ã§Å¡â€žÃ©â„¢Â¤Ã©Å’Â¯Ã¦Â­Â¥Ã©Â©Å¸
   - Ã¦Å“â€°Ã¦â€¢Ë†Ã§Å¡â€žÃ¥Â·Â¥Ã¥â€¦Â·Ã§Âµâ€žÃ¥ÂË†
   - Ã¨Â¨ÂºÃ¦â€“Â·Ã¦Â¨Â¡Ã¥Â¼Â

3. **Ã¨Â®Å Ã©â‚¬Å¡Ã¦â€“Â¹Ã¦Â¡Ë†**
   - Ã¥â€¡Â½Ã¥Â¼ÂÃ¥ÂºÂ«Ã¦â‚¬ÂªÃ§â„¢â€“
   - API Ã©â„¢ÂÃ¥Ë†Â¶
   - Ã§â€°Â¹Ã¥Â®Å¡Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¾Â©

4. **Ã¥Â°Ë†Ã¦Â¡Ë†Ã§â€°Â¹Ã¥Â®Å¡Ã¦Â¨Â¡Ã¥Â¼Â**
   - Ã§â„¢Â¼Ã§ÂÂ¾Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂºÂ«Ã¦â€¦Â£Ã¤Â¾â€¹
   - Ã¥ÂÅ¡Ã¥â€¡ÂºÃ§Å¡â€žÃ¦Å¾Â¶Ã¦Â§â€¹Ã¦Â±ÂºÃ§Â­â€“
   - Ã¦â€¢Â´Ã¥ÂË†Ã¦Â¨Â¡Ã¥Â¼Â

## Ã¨Â¼Â¸Ã¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼Â

Ã¥Å“Â¨ `~/.claude/skills/learned/[pattern-name].md` Ã¥Â»ÂºÃ§Â«â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å¡

```markdown
# [Ã¦ÂÂÃ¨Â¿Â°Ã¦â‚¬Â§Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥ÂÂÃ§Â¨Â±]

**Ã¦â€œÂ·Ã¥Ââ€“Ã¦â€”Â¥Ã¦Å“Å¸Ã¯Â¼Å¡** [Ã¦â€”Â¥Ã¦Å“Å¸]
**Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¯Â¼Å¡** [Ã¦Â­Â¤Ã¦Â¨Â¡Ã¥Â¼ÂÃ¤Â½â€¢Ã¦â„¢â€šÃ©ÂÂ©Ã§â€Â¨Ã§Å¡â€žÃ§Â°Â¡Ã§Å¸Â­Ã¦ÂÂÃ¨Â¿Â°]

## Ã¥â€¢ÂÃ©Â¡Å’
[Ã¦Â­Â¤Ã¦Â¨Â¡Ã¥Â¼ÂÃ¨Â§Â£Ã¦Â±ÂºÃ¤Â»â‚¬Ã©ÂºÂ¼Ã¥â€¢ÂÃ©Â¡Å’ - Ã¨Â¦ÂÃ¥â€¦Â·Ã©Â«â€]

## Ã¨Â§Â£Ã¦Â±ÂºÃ¦â€“Â¹Ã¦Â¡Ë†
[Ã¦Â¨Â¡Ã¥Â¼Â/Ã¦Å â‚¬Ã¨Â¡â€œ/Ã¨Â®Å Ã©â‚¬Å¡Ã¦â€“Â¹Ã¦Â¡Ë†]

## Ã§Â¯â€žÃ¤Â¾â€¹
[Ã¥Â¦â€šÃ©ÂÂ©Ã§â€Â¨Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã§Â¯â€žÃ¤Â¾â€¹]

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¤Â½Â¿Ã§â€Â¨
[Ã¨Â§Â¸Ã§â„¢Â¼Ã¦Â¢ÂÃ¤Â»Â¶ - Ã¤Â»â‚¬Ã©ÂºÂ¼Ã¦â€¡â€°Ã¨Â©Â²Ã¥â€¢Å¸Ã¥â€¹â€¢Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½]
```

## Ã¦ÂµÂÃ§Â¨â€¹

1. Ã¥Â¯Â©Ã¦Å¸Â¥Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ¤Â¸Â­Ã¥ÂÂ¯Ã¦â€œÂ·Ã¥Ââ€“Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
2. Ã¨Â­ËœÃ¥Ë†Â¥Ã¦Å“â‚¬Ã¦Å“â€°Ã¥Æ’Â¹Ã¥â‚¬Â¼/Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã§Å¡â€žÃ¨Â¦â€¹Ã¨Â§Â£
3. Ã¨ÂµÂ·Ã¨Ââ€°Ã¦Å â‚¬Ã¨Æ’Â½Ã¦Âªâ€Ã¦Â¡Ë†
4. Ã¨Â«â€¹Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¥Å“Â¨Ã¥â€žÂ²Ã¥Â­ËœÃ¥â€°ÂÃ§Â¢ÂºÃ¨ÂªÂ
5. Ã¥â€žÂ²Ã¥Â­ËœÃ¥Ë†Â° `~/.claude/skills/learned/`

## Ã¦Â³Â¨Ã¦â€žÂÃ¤Âºâ€¹Ã©Â â€¦

- Ã¤Â¸ÂÃ¨Â¦ÂÃ¦â€œÂ·Ã¥Ââ€“Ã§â€˜Â£Ã§Â¢Å½Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¾Â©Ã¯Â¼Ë†Ã¦â€°â€œÃ¥Â­â€”Ã©Å’Â¯Ã¨ÂªÂ¤Ã£â‚¬ÂÃ§Â°Â¡Ã¥â€“Â®Ã§Å¡â€žÃ¨ÂªÅ¾Ã¦Â³â€¢Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼â€°
- Ã¤Â¸ÂÃ¨Â¦ÂÃ¦â€œÂ·Ã¥Ââ€“Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¦â‚¬Â§Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Ë†Ã§â€°Â¹Ã¥Â®Å¡ API Ã¥ÂÅ“Ã¦Â©Å¸Ã§Â­â€°Ã¯Â¼â€°
- Ã¥Â°Ë†Ã¦Â³Â¨Ã¦â€“Â¼Ã¦Å“Æ’Ã¥Å“Â¨Ã¦Å“ÂªÃ¤Â¾â€ Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ§Â¯â‚¬Ã§Å“ÂÃ¦â„¢â€šÃ©â€“â€œÃ§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
- Ã¤Â¿ÂÃ¦Å’ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã¥Â°Ë†Ã¦Â³Â¨ - Ã¦Â¯ÂÃ¥â‚¬â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã¦Â¨Â¡Ã¥Â¼Â
