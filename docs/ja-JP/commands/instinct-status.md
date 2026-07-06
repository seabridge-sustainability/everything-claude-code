---
name: instinct-status
description: Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã¥Â­Â¦Ã§Â¿â€™Ã¦Â¸Ë†Ã£ÂÂ¿Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ¨Ã¤Â¿Â¡Ã©Â Â¼Ã¥ÂºÂ¦Ã£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â«Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
command: true
---

# Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

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


Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã¥Â­Â¦Ã§Â¿â€™Ã¦Â¸Ë†Ã£ÂÂ¿Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â¿Â¡Ã©Â Â¼Ã¥ÂºÂ¦Ã£â€šÂ¹Ã£â€šÂ³Ã£â€šÂ¢Ã£ÂÂ¨Ã£ÂÂ¨Ã£â€šâ€šÃ£ÂÂ«Ã£â‚¬ÂÃ£Æ’â€°Ã£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Â³Ã£Ââ€Ã£ÂÂ¨Ã£ÂÂ«Ã£â€šÂ°Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”Ã¥Å’â€“Ã£Ââ€”Ã£ÂÂ¦Ã¨Â¡Â¨Ã§Â¤ÂºÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¥Â®Å¸Ã¨Â£â€¦

Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’Ë†Ã£Æ’â€˜Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†CLIÃ£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/scripts/instinct-cli.py" status
```

Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£â‚¬Â`CLAUDE_PLUGIN_ROOT` Ã£ÂÅ’Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂªÃ£Ââ€žÃ¥Â Â´Ã¥ÂË†Ã¯Â¼Ë†Ã¦â€°â€¹Ã¥â€¹â€¢Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¼Ã£Æ’Â«Ã¯Â¼â€°Ã£ÂÂ®Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯:

```bash
python3 ~/.claude/skills/continuous-learning-v2/scripts/instinct-cli.py status
```

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

```
/instinct-status
/instinct-status --domain code-style
/instinct-status --low-confidence
```

## Ã¥Â®Å¸Ã¨Â¡Å’Ã¥â€ â€¦Ã¥Â®Â¹

1. `~/.claude/homunculus/instincts/personal/` Ã£Ââ€¹Ã£â€šâ€°Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£â€šâ‚¬
2. `~/.claude/homunculus/instincts/inherited/` Ã£Ââ€¹Ã£â€šâ€°Ã§Â¶â„¢Ã¦â€°Â¿Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£â€šâ‚¬
3. Ã£Æ’â€°Ã£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Â³Ã£Ââ€Ã£ÂÂ¨Ã£ÂÂ«Ã£â€šÂ°Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’â€”Ã¥Å’â€“Ã£Ââ€”Ã£â‚¬ÂÃ¤Â¿Â¡Ã©Â Â¼Ã¥ÂºÂ¦Ã£Æ’ÂÃ£Æ’Â¼Ã£ÂÂ¨Ã£ÂÂ¨Ã£â€šâ€šÃ£ÂÂ«Ã¨Â¡Â¨Ã§Â¤Âº

## Ã¥â€¡ÂºÃ¥Å â€ºÃ¥Â½Â¢Ã¥Â¼Â

```
 instinctÃ£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹
==================

## Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â« (4 instincts)

### prefer-functional-style
Ã£Æ’Ë†Ã£Æ’ÂªÃ£â€šÂ¬Ã£Æ’Â¼: Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ©â€“Â¢Ã¦â€¢Â°Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ£ÂÂ¨Ã£ÂÂ
Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³: Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¹Ã£â€šË†Ã£â€šÅ Ã©â€“Â¢Ã¦â€¢Â°Ã¥Å¾â€¹Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
Ã¤Â¿Â¡Ã©Â Â¼Ã¥ÂºÂ¦: Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“â€˜Ã¢â€“â€˜ 80%
Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹: session-observation | Ã¦Å“â‚¬Ã§Âµâ€šÃ¦â€ºÂ´Ã¦â€“Â°: 2025-01-22

### use-path-aliases
Ã£Æ’Ë†Ã£Æ’ÂªÃ£â€šÂ¬Ã£Æ’Â¼: Ã£Æ’Â¢Ã£â€šÂ¸Ã£Æ’Â¥Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³: Ã§â€ºÂ¸Ã¥Â¯Â¾Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£ÂÂ®Ã¤Â»Â£Ã£â€šÂÃ£â€šÅ Ã£ÂÂ«@/Ã£Æ’â€˜Ã£â€šÂ¹Ã£â€šÂ¨Ã£â€šÂ¤Ã£Æ’ÂªÃ£â€šÂ¢Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
Ã¤Â¿Â¡Ã©Â Â¼Ã¥ÂºÂ¦: Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“â€˜Ã¢â€“â€˜Ã¢â€“â€˜Ã¢â€“â€˜ 60%
Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹: repo-analysis (github.com/acme/webapp)

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë† (2 instincts)

### test-first-workflow
Ã£Æ’Ë†Ã£Æ’ÂªÃ£â€šÂ¬Ã£Æ’Â¼: Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ¦Â©Å¸Ã¨Æ’Â½Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥â€¦Ë†Ã£ÂÂ«Ã¦â€ºÂ¸Ã£ÂÂÃ£â‚¬ÂÃ¦Â¬Â¡Ã£ÂÂ«Ã¥Â®Å¸Ã¨Â£â€¦
Ã¤Â¿Â¡Ã©Â Â¼Ã¥ÂºÂ¦: Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“â€˜ 90%
Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹: session-observation

## Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼ (3 instincts)

### grep-before-edit
Ã£Æ’Ë†Ã£Æ’ÂªÃ£â€šÂ¬Ã£Æ’Â¼: Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³: GrepÃ£ÂÂ§Ã¦Â¤Å“Ã§Â´Â¢Ã£â‚¬ÂReadÃ£ÂÂ§Ã§Â¢ÂºÃ¨ÂªÂÃ£â‚¬ÂÃ¦Â¬Â¡Ã£ÂÂ«Edit
Ã¤Â¿Â¡Ã©Â Â¼Ã¥ÂºÂ¦: Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“Ë†Ã¢â€“â€˜Ã¢â€“â€˜Ã¢â€“â€˜ 70%
Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹: session-observation

---
Ã¥ÂË†Ã¨Â¨Ë†: 9 instincts (4Ã¥â‚¬â€¹Ã¤ÂºÂº, 5Ã§Â¶â„¢Ã¦â€°Â¿)
Ã£â€šÂªÃ£Æ’â€“Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â¼: Ã¥Â®Å¸Ã¨Â¡Å’Ã¤Â¸Â­ (Ã¦Å“â‚¬Ã§Âµâ€šÃ¥Ë†â€ Ã¦Å¾Â: 5Ã¥Ë†â€ Ã¥â€°Â)
```

## Ã£Æ’â€¢Ã£Æ’Â©Ã£â€šÂ°

- `--domain <name>`: Ã£Æ’â€°Ã£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Â³Ã£ÂÂ§Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã¯Â¼Ë†code-styleÃ£â‚¬ÂtestingÃ£â‚¬ÂgitÃ£ÂÂªÃ£ÂÂ©Ã¯Â¼â€°
- `--low-confidence`: Ã¤Â¿Â¡Ã©Â Â¼Ã¥ÂºÂ¦ < 0.5Ã£ÂÂ®Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
- `--high-confidence`: Ã¤Â¿Â¡Ã©Â Â¼Ã¥ÂºÂ¦ >= 0.7Ã£ÂÂ®Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
- `--source <type>`: Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ§Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã¯Â¼Ë†session-observationÃ£â‚¬Ârepo-analysisÃ£â‚¬ÂinheritedÃ¯Â¼â€°
- `--json`: Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ°Ã£Æ’Â©Ã£Æ’Â Ã£ÂÂ§Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«JSONÃ¥Â½Â¢Ã¥Â¼ÂÃ£ÂÂ§Ã¥â€¡ÂºÃ¥Å â€º
