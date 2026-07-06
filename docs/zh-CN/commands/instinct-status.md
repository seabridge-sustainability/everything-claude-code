---
name: instinct-status
description: Ã¥Â±â€¢Ã§Â¤ÂºÃ¥Â·Â²Ã¥Â­Â¦Ã¤Â¹Â Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½Ã¯Â¼Ë†Ã©Â¡Â¹Ã§â€ºÂ®+Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¯Â¼â€°Ã¥Â¹Â¶Ã¥â€¦â€¦Ã¦Â»Â¡Ã¤Â¿Â¡Ã¥Â¿Æ’
command: true
---

# Ã¦Å“Â¬Ã¨Æ’Â½Ã§Å Â¶Ã¦â‚¬ÂÃ¥â€˜Â½Ã¤Â»Â¤

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


Ã¦ËœÂ¾Ã§Â¤ÂºÃ¥Â½â€œÃ¥â€°ÂÃ©Â¡Â¹Ã§â€ºÂ®Ã¥Â­Â¦Ã¤Â¹Â Ã¥Ë†Â°Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½Ã¤Â»Â¥Ã¥ÂÅ Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¦Å“Â¬Ã¨Æ’Â½Ã¯Â¼Å’Ã¦Å’â€°Ã©Â¢â€ Ã¥Å¸Å¸Ã¥Ë†â€ Ã§Â»â€žÃ£â‚¬â€š

## Ã¥Â®Å¾Ã§Å½Â°

Ã¤Â½Â¿Ã§â€Â¨Ã¦Ââ€™Ã¤Â»Â¶Ã¦Â Â¹Ã¨Â·Â¯Ã¥Â¾â€žÃ¨Â¿ÂÃ¨Â¡Å’Ã¦Å“Â¬Ã¨Æ’Â½ CLIÃ¯Â¼Å¡

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/scripts/instinct-cli.py" status
```

Ã¦Ë†â€“Ã¨â‚¬â€¦Ã¯Â¼Å’Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å“ÂªÃ¨Â®Â¾Ã§Â½Â® `CLAUDE_PLUGIN_ROOT`Ã¯Â¼Ë†Ã¦â€°â€¹Ã¥Å Â¨Ã¥Â®â€°Ã¨Â£â€¦Ã¯Â¼â€°Ã¯Â¼Å’Ã¥Ë†â„¢Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Å¡

```bash
python3 ~/.claude/skills/continuous-learning-v2/scripts/instinct-cli.py status
```

## Ã§â€Â¨Ã¦Â³â€¢

```
/instinct-status
```

## Ã¦â€œÂÃ¤Â½Å“Ã¦Â­Â¥Ã©ÂªÂ¤

1. Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¥Â½â€œÃ¥â€°ÂÃ©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¯Â¼Ë†git remote/Ã¨Â·Â¯Ã¥Â¾â€žÃ¥â€œË†Ã¥Â¸Å’Ã¯Â¼â€°
2. Ã¤Â»Å½ `~/.claude/homunculus/projects/<project-id>/instincts/` Ã¨Â¯Â»Ã¥Ââ€“Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Å“Â¬Ã¨Æ’Â½
3. Ã¤Â»Å½ `~/.claude/homunculus/instincts/` Ã¨Â¯Â»Ã¥Ââ€“Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¦Å“Â¬Ã¨Æ’Â½
4. Ã¥ÂË†Ã¥Â¹Â¶Ã¥Â¹Â¶Ã¥Âºâ€Ã§â€Â¨Ã¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã¨Â§â€žÃ¥Ë†â„¢Ã¯Â¼Ë†Ã¥Â½â€œIDÃ¥â€ Â²Ã§ÂªÂÃ¦â€”Â¶Ã¯Â¼Å’Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Å“Â¬Ã¨Æ’Â½Ã¨Â¦â€ Ã§â€ºâ€“Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¦Å“Â¬Ã¨Æ’Â½Ã¯Â¼â€°
5. Ã¦Å’â€°Ã©Â¢â€ Ã¥Å¸Å¸Ã¥Ë†â€ Ã§Â»â€žÃ¦ËœÂ¾Ã§Â¤ÂºÃ¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¦ÂÂ¡Ã¥â€™Å’Ã¨Â§â€šÃ¥Â¯Å¸Ã§Â»Å¸Ã¨Â®Â¡Ã¦â€¢Â°Ã¦ÂÂ®

## Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼Â

```
============================================================
  INSTINCT Ã§Å Â¶Ã¦â‚¬Â - Ã¦â‚¬Â»Ã¨Â®Â¡ 12
============================================================

  Ã©Â¡Â¹Ã§â€ºÂ®: my-app (a1b2c3d4e5f6)
  Ã©Â¡Â¹Ã§â€ºÂ® instincts: 8
  Ã¥â€¦Â¨Ã¥Â±â‚¬ instincts:  4

## Ã©Â¡Â¹Ã§â€ºÂ®Ã¨Å’Æ’Ã¥â€ºÂ´Ã¥â€ â€¦ (my-app)
  ### Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ (3)
    Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“â€˜Ã¢â€“â€˜Ã¢â€“â€˜  70%  grep-before-edit [project]
              Ã¨Â§Â¦Ã¥Ââ€˜Ã¦ÂÂ¡Ã¤Â»Â¶: Ã¥Â½â€œÃ¤Â¿Â®Ã¦â€Â¹Ã¤Â»Â£Ã§Â ÂÃ¦â€”Â¶

## Ã¥â€¦Â¨Ã¥Â±â‚¬ (Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¦â€°â‚¬Ã¦Å“â€°Ã©Â¡Â¹Ã§â€ºÂ®)
  ### Ã¥Â®â€°Ã¥â€¦Â¨ (2)
    Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“â€˜  85%  validate-user-input [global]
              Ã¨Â§Â¦Ã¥Ââ€˜Ã¦ÂÂ¡Ã¤Â»Â¶: Ã¥Â½â€œÃ¥Â¤â€žÃ§Ââ€ Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¦â€”Â¶
```
