# /learn - Ã¦ÂÂÃ¥Ââ€“Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã¥Ë†â€ Ã¦Å¾ÂÃ¥Â½â€œÃ¥â€°ÂÃ¤Â¼Å¡Ã¨Â¯ÂÃ¯Â¼Å’Ã¦ÂÂÃ¥Ââ€“Ã¥â‚¬Â¼Ã¥Â¾â€”Ã¤Â¿ÂÃ¥Â­ËœÃ¤Â¸ÂºÃ¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ¤Â»Â»Ã¤Â½â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š

## Ã¨Â§Â¦Ã¥Ââ€˜Ã¦â€”Â¶Ã¦Å“Âº

Ã¥Å“Â¨Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦Å“Å¸Ã©â€”Â´Ã§Å¡â€žÃ¤Â»Â»Ã¤Â½â€¢Ã¦â€”Â¶Ã¥Ë†Â»Ã¯Â¼Å’Ã¥Â½â€œÃ¤Â½Â Ã¨Â§Â£Ã¥â€ Â³Ã¤Âºâ€ Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ©ÂÅ¾Ã¥Â¹Â³Ã¥â€¡Â¡Ã©â€”Â®Ã©Â¢ËœÃ¦â€”Â¶Ã¯Â¼Å’Ã¨Â¿ÂÃ¨Â¡Å’ `/learn`Ã£â‚¬â€š

## Ã¦ÂÂÃ¥Ââ€“Ã¥â€ â€¦Ã¥Â®Â¹

Ã¥Â¯Â»Ã¦â€°Â¾Ã¯Â¼Å¡

1. **Ã©â€â„¢Ã¨Â¯Â¯Ã¨Â§Â£Ã¥â€ Â³Ã¦Â¨Â¡Ã¥Â¼Â**
   * Ã¥â€¡ÂºÃ§Å½Â°Ã¤Âºâ€ Ã¤Â»â‚¬Ã¤Â¹Ë†Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¸
   * Ã¦Â Â¹Ã¦Å“Â¬Ã¥Å½Å¸Ã¥â€ºÂ Ã¦ËœÂ¯Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¯Â¼Å¸
   * Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¦â€“Â¹Ã¦Â³â€¢Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Âºâ€ Ã¥Â®Æ’Ã¯Â¼Å¸
   * Ã¨Â¿â„¢Ã¥Â¯Â¹Ã¨Â§Â£Ã¥â€ Â³Ã§Â±Â»Ã¤Â¼Â¼Ã©â€â„¢Ã¨Â¯Â¯Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã¯Â¼Å¸

2. **Ã¨Â°Æ’Ã¨Â¯â€¢Ã¦Å â‚¬Ã¦Å“Â¯**
   * Ã¤Â¸ÂÃ¦ËœÅ½Ã¦ËœÂ¾Ã§Å¡â€žÃ¨Â°Æ’Ã¨Â¯â€¢Ã¦Â­Â¥Ã©ÂªÂ¤
   * Ã¦Å“â€°Ã¦â€¢Ë†Ã§Å¡â€žÃ¥Â·Â¥Ã¥â€¦Â·Ã§Â»â€žÃ¥ÂË†
   * Ã¨Â¯Å Ã¦â€“Â­Ã¦Â¨Â¡Ã¥Â¼Â

3. **Ã¥ÂËœÃ©â‚¬Å¡Ã¦â€“Â¹Ã¦Â³â€¢**
   * Ã¥Âºâ€œÃ§Å¡â€žÃ¦â‚¬ÂªÃ§â„¢â€“
   * API Ã©â„¢ÂÃ¥Ë†Â¶
   * Ã§â€°Â¹Ã¥Â®Å¡Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤Â

4. **Ã©Â¡Â¹Ã§â€ºÂ®Ã§â€°Â¹Ã¥Â®Å¡Ã¦Â¨Â¡Ã¥Â¼Â**
   * Ã¥Ââ€˜Ã§Å½Â°Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ§ÂºÂ¦Ã¥Â®Å¡
   * Ã¥ÂÅ¡Ã¥â€¡ÂºÃ§Å¡â€žÃ¦Å¾Â¶Ã¦Å¾â€žÃ¥â€ Â³Ã§Â­â€“
   * Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Â¨Â¡Ã¥Â¼Â

## Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼Â

Ã¥Å“Â¨ `~/.claude/skills/learned/[pattern-name].md` Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Å â‚¬Ã¨Æ’Â½Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡

```markdown
# [Descriptive Pattern Name]

**Extracted:** [Date]
**Context:** [Brief description of when this applies]

## Problem
[What problem this solves - be specific]

## Solution
[The pattern/technique/workaround]

## Example
[Code example if applicable]

## When to Use
[Trigger conditions - what should activate this skill]
```

## Ã¦ÂµÂÃ§Â¨â€¹

1. Ã¥â€ºÅ¾Ã©Â¡Â¾Ã¤Â¼Å¡Ã¨Â¯ÂÃ¯Â¼Å’Ã¥Â¯Â»Ã¦â€°Â¾Ã¥ÂÂ¯Ã¦ÂÂÃ¥Ââ€“Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
2. Ã¨Â¯â€ Ã¥Ë†Â«Ã¦Å“â‚¬Ã¦Å“â€°Ã¤Â»Â·Ã¥â‚¬Â¼/Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã§Å¡â€žÃ¨Â§ÂÃ¨Â§Â£
3. Ã¨ÂµÂ·Ã¨Ââ€°Ã¦Å â‚¬Ã¨Æ’Â½Ã¦â€“â€¡Ã¤Â»Â¶
4. Ã¥Å“Â¨Ã¤Â¿ÂÃ¥Â­ËœÃ¥â€°ÂÃ¨Â¯Â·Ã§â€Â¨Ã¦Ë†Â·Ã§Â¡Â®Ã¨Â®Â¤
5. Ã¤Â¿ÂÃ¥Â­ËœÃ¥Ë†Â° `~/.claude/skills/learned/`

## Ã¦Â³Â¨Ã¦â€žÂÃ¤Âºâ€¹Ã©Â¡Â¹

* Ã¤Â¸ÂÃ¨Â¦ÂÃ¦ÂÂÃ¥Ââ€“Ã§ÂÂÃ§Â¢Å½Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Ë†Ã¦â€¹Â¼Ã¥â€ â„¢Ã©â€â„¢Ã¨Â¯Â¯Ã£â‚¬ÂÃ§Â®â‚¬Ã¥Ââ€¢Ã§Å¡â€žÃ¨Â¯Â­Ã¦Â³â€¢Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼â€°
* Ã¤Â¸ÂÃ¨Â¦ÂÃ¦ÂÂÃ¥Ââ€“Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¦â‚¬Â§Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€ž API Ã¤Â¸Â­Ã¦â€“Â­Ã§Â­â€°Ã¯Â¼â€°
* Ã¤Â¸â€œÃ¦Â³Â¨Ã¤ÂºÅ½Ã©â€šÂ£Ã¤Âºâ€ºÃ¥Â°â€ Ã¥Å“Â¨Ã¦Å“ÂªÃ¦ÂÂ¥Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¸Â­Ã¨Å â€šÃ§Å“ÂÃ¦â€”Â¶Ã©â€”Â´Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
* Ã¤Â¿ÂÃ¦Å’ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ¤Â¸â€œÃ¦Â³Â¨Ã¦â‚¬Â§ - Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Å â‚¬Ã¨Æ’Â½Ã¥Â¯Â¹Ã¥Âºâ€Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Â¨Â¡Ã¥Â¼Â
