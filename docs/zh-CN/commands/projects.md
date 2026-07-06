---
name: projects
description: Ã¥Ë†â€”Ã¥â€¡ÂºÃ¥Â·Â²Ã§Å¸Â¥Ã©Â¡Â¹Ã§â€ºÂ®Ã¥ÂÅ Ã¥â€¦Â¶Ã¦Å“Â¬Ã¨Æ’Â½Ã§Â»Å¸Ã¨Â®Â¡Ã¦â€¢Â°Ã¦ÂÂ®
command: true
---

# Ã©Â¡Â¹Ã§â€ºÂ®Ã¥â€˜Â½Ã¤Â»Â¤

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


Ã¥Ë†â€”Ã¥â€¡ÂºÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â³Â¨Ã¥â€ Å’Ã¦ÂÂ¡Ã§â€ºÂ®Ã¤Â»Â¥Ã¥ÂÅ Ã¦Â¯ÂÃ¤Â¸ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½/Ã¨Â§â€šÃ¥Â¯Å¸Ã¨Â®Â¡Ã¦â€¢Â°Ã¯Â¼Å’Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½ continuous-learning-v2Ã£â‚¬â€š

## Ã¥Â®Å¾Ã§Å½Â°

Ã¤Â½Â¿Ã§â€Â¨Ã¦Ââ€™Ã¤Â»Â¶Ã¦Â Â¹Ã¨Â·Â¯Ã¥Â¾â€žÃ¨Â¿ÂÃ¨Â¡Å’Ã¦Å“Â¬Ã¨Æ’Â½ CLIÃ¯Â¼Å¡

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/scripts/instinct-cli.py" projects
```

Ã¦Ë†â€“Ã¨â‚¬â€¦Ã¥Â¦â€šÃ¦Å¾Å“ `CLAUDE_PLUGIN_ROOT` Ã¦Å“ÂªÃ¨Â®Â¾Ã§Â½Â®Ã¯Â¼Ë†Ã¦â€°â€¹Ã¥Å Â¨Ã¥Â®â€°Ã¨Â£â€¦Ã¯Â¼â€°Ã¯Â¼Å¡

```bash
python3 ~/.claude/skills/continuous-learning-v2/scripts/instinct-cli.py projects
```

## Ã§â€Â¨Ã¦Â³â€¢

```bash
/projects
```

## Ã¦â€œÂÃ¤Â½Å“Ã¦Â­Â¥Ã©ÂªÂ¤

1. Ã¨Â¯Â»Ã¥Ââ€“ `~/.claude/homunculus/projects.json`
2. Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦Â¯ÂÃ¤Â¸ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¯Â¼Å’Ã¦ËœÂ¾Ã§Â¤ÂºÃ¯Â¼Å¡
   * Ã©Â¡Â¹Ã§â€ºÂ®Ã¥ÂÂÃ§Â§Â°Ã£â‚¬ÂIDÃ£â‚¬ÂÃ¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã£â‚¬ÂÃ¨Â¿Å“Ã§Â¨â€¹Ã¥Å“Â°Ã¥Ââ‚¬
   * Ã¤Â¸ÂªÃ¤ÂºÂºÃ¥â€™Å’Ã§Â»Â§Ã¦â€°Â¿Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½Ã¨Â®Â¡Ã¦â€¢Â°
   * Ã¨Â§â€šÃ¥Â¯Å¸Ã¤Âºâ€¹Ã¤Â»Â¶Ã¨Â®Â¡Ã¦â€¢Â°
   * Ã¦Å“â‚¬Ã¥ÂÅ½Ã§Å“â€¹Ã¥Ë†Â°Ã§Å¡â€žÃ¦â€”Â¶Ã©â€”Â´Ã¦Ë†Â³
3. Ã¥ÂÅ’Ã¦â€”Â¶Ã¦ËœÂ¾Ã§Â¤ÂºÃ¥â€¦Â¨Ã¥Â±â‚¬Ã¦Å“Â¬Ã¨Æ’Â½Ã¦â‚¬Â»Ã¦â€¢Â°
