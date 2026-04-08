---
name: projects
description: Ã¥Ë†â€”Ã¥â€¡ÂºÃ¥Â·Â²Ã§Å¸Â¥Ã©Â¡Â¹Ã§â€ºÂ®Ã¥ÂÅ Ã¥â€¦Â¶Ã¦Å“Â¬Ã¨Æ’Â½Ã§Â»Å¸Ã¨Â®Â¡Ã¦â€¢Â°Ã¦ÂÂ®
command: true
---

# Ã©Â¡Â¹Ã§â€ºÂ®Ã¥â€˜Â½Ã¤Â»Â¤

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
