# Eval Ã¥â€˜Â½Ã¤Â»Â¤

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


Ã§Â®Â¡Ã§Ââ€ Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¨Â¯â€žÃ¤Â¼Â°Ã§Å¡â€žÃ¥Â¼â‚¬Ã¥Ââ€˜Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/eval [define|check|report|list] [feature-name]`

## Ã¥Â®Å¡Ã¤Â¹â€°Ã¨Â¯â€žÃ¤Â¼Â°

`/eval define feature-name`

Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦â€“Â°Ã§Å¡â€žÃ¨Â¯â€žÃ¤Â¼Â°Ã¥Â®Å¡Ã¤Â¹â€°Ã¯Â¼Å¡

1. Ã¤Â½Â¿Ã§â€Â¨Ã¦Â¨Â¡Ã¦ÂÂ¿Ã¥Ë†â€ºÃ¥Â»Âº `.claude/evals/feature-name.md`Ã¯Â¼Å¡

```markdown
## EVAL: Ã¥Å Å¸Ã¨Æ’Â½Ã¥ÂÂÃ§Â§Â°
Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤ÂºÅ½: $(date)

### Ã¨Æ’Â½Ã¥Å â€ºÃ¨Â¯â€žÃ¤Â¼Â°
- [ ] [Ã¨Æ’Â½Ã¥Å â€º 1 Ã§Å¡â€žÃ¦ÂÂÃ¨Â¿Â°]
- [ ] [Ã¨Æ’Â½Ã¥Å â€º 2 Ã§Å¡â€žÃ¦ÂÂÃ¨Â¿Â°]

### Ã¥â€ºÅ¾Ã¥Â½â€™Ã¨Â¯â€žÃ¤Â¼Â°
- [ ] [Ã§Å½Â°Ã¦Å“â€°Ã¨Â¡Å’Ã¤Â¸Âº 1 Ã¤Â»ÂÃ§â€žÂ¶Ã¦Å“â€°Ã¦â€¢Ë†]
- [ ] [Ã§Å½Â°Ã¦Å“â€°Ã¨Â¡Å’Ã¤Â¸Âº 2 Ã¤Â»ÂÃ§â€žÂ¶Ã¦Å“â€°Ã¦â€¢Ë†]

### Ã¦Ë†ÂÃ¥Å Å¸Ã¦Â â€¡Ã¥â€¡â€ 
- Ã¨Æ’Â½Ã¥Å â€ºÃ¨Â¯â€žÃ¤Â¼Â°Ã§Å¡â€ž pass@3 > 90%
- Ã¥â€ºÅ¾Ã¥Â½â€™Ã¨Â¯â€žÃ¤Â¼Â°Ã§Å¡â€ž pass^3 = 100%

```

2. Ã¦ÂÂÃ§Â¤ÂºÃ§â€Â¨Ã¦Ë†Â·Ã¥Â¡Â«Ã¥â€ â„¢Ã¥â€¦Â·Ã¤Â½â€œÃ¦Â â€¡Ã¥â€¡â€ 

## Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¯â€žÃ¤Â¼Â°

`/eval check feature-name`

Ã¤Â¸ÂºÃ¥Å Å¸Ã¨Æ’Â½Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¯â€žÃ¤Â¼Â°Ã¯Â¼Å¡

1. Ã¤Â»Å½ `.claude/evals/feature-name.md` Ã¨Â¯Â»Ã¥Ââ€“Ã¨Â¯â€žÃ¤Â¼Â°Ã¥Â®Å¡Ã¤Â¹â€°
2. Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦Â¯ÂÃ¤Â¸ÂªÃ¨Æ’Â½Ã¥Å â€ºÃ¨Â¯â€žÃ¤Â¼Â°Ã¯Â¼Å¡
   * Ã¥Â°ÂÃ¨Â¯â€¢Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â â€¡Ã¥â€¡â€ 
   * Ã¨Â®Â°Ã¥Â½â€¢ Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥
   * Ã¥Å“Â¨ `.claude/evals/feature-name.log` Ã¤Â¸Â­Ã¨Â®Â°Ã¥Â½â€¢Ã¥Â°ÂÃ¨Â¯â€¢
3. Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦Â¯ÂÃ¤Â¸ÂªÃ¥â€ºÅ¾Ã¥Â½â€™Ã¨Â¯â€žÃ¤Â¼Â°Ã¯Â¼Å¡
   * Ã¨Â¿ÂÃ¨Â¡Å’Ã§â€ºÂ¸Ã¥â€¦Â³Ã¦Âµâ€¹Ã¨Â¯â€¢
   * Ã¤Â¸Å½Ã¥Å¸ÂºÃ§ÂºÂ¿Ã¦Â¯â€Ã¨Â¾Æ’
   * Ã¨Â®Â°Ã¥Â½â€¢ Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥
4. Ã¦Å Â¥Ã¥â€˜Å Ã¥Â½â€œÃ¥â€°ÂÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å¡

```
EVAL CHECK: feature-name
========================
Ã¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å¡X/Y Ã©â‚¬Å¡Ã¨Â¿â€¡
Ã¥â€ºÅ¾Ã¥Â½â€™Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å¡X/Y Ã©â‚¬Å¡Ã¨Â¿â€¡
Ã§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å¡Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â¸Â­ / Ã¥Â°Â±Ã§Â»Âª
```

## Ã¦Å Â¥Ã¥â€˜Å Ã¨Â¯â€žÃ¤Â¼Â°

`/eval report feature-name`

Ã§â€Å¸Ã¦Ë†ÂÃ¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¨Â¯â€žÃ¤Â¼Â°Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

```
EVAL REPORT: feature-name
=========================
Ã§â€Å¸Ã¦Ë†ÂÃ¦â€”Â¶Ã©â€”Â´: $(date)

Ã¨Æ’Â½Ã¥Å â€ºÃ¨Â¯â€žÃ¤Â¼Â°
----------------
[eval-1]: Ã©â‚¬Å¡Ã¨Â¿â€¡ (pass@1)
[eval-2]: Ã©â‚¬Å¡Ã¨Â¿â€¡ (pass@2) - Ã©Å“â‚¬Ã¨Â¦ÂÃ©â€¡ÂÃ¨Â¯â€¢
[eval-3]: Ã¥Â¤Â±Ã¨Â´Â¥ - Ã¥Ââ€šÃ¨Â§ÂÃ¥Â¤â€¡Ã¦Â³Â¨

Ã¥â€ºÅ¾Ã¥Â½â€™Ã¦Âµâ€¹Ã¨Â¯â€¢
----------------
[test-1]: Ã©â‚¬Å¡Ã¨Â¿â€¡
[test-2]: Ã©â‚¬Å¡Ã¨Â¿â€¡
[test-3]: Ã©â‚¬Å¡Ã¨Â¿â€¡

Ã¦Å’â€¡Ã¦Â â€¡
-------
Ã¨Æ’Â½Ã¥Å â€º pass@1: 67%
Ã¨Æ’Â½Ã¥Å â€º pass@3: 100%
Ã¥â€ºÅ¾Ã¥Â½â€™ pass^3: 100%

Ã¥Â¤â€¡Ã¦Â³Â¨
-----
[Ã¤Â»Â»Ã¤Â½â€¢Ã©â€”Â®Ã©Â¢ËœÃ£â‚¬ÂÃ¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ ÂµÃ¦Ë†â€“Ã¨Â§â€šÃ¥Â¯Å¸Ã§Â»â€œÃ¦Å¾Å“]

Ã¥Â»ÂºÃ¨Â®Â®
--------------
[SHIP / NEEDS WORK / BLOCKED]
```

## Ã¥Ë†â€”Ã¥â€¡ÂºÃ¨Â¯â€žÃ¤Â¼Â°

`/eval list`

Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¨Â¯â€žÃ¤Â¼Â°Ã¥Â®Å¡Ã¤Â¹â€°Ã¯Â¼Å¡

```
Ã¥Å Å¸Ã¨Æ’Â½Ã¦Â¨Â¡Ã¥Ââ€”Ã¥Â®Å¡Ã¤Â¹â€°
================
feature-auth      [3/5 Ã©â‚¬Å¡Ã¨Â¿â€¡] Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â¸Â­
feature-search    [5/5 Ã©â‚¬Å¡Ã¨Â¿â€¡] Ã¥Â°Â±Ã§Â»Âª
feature-export    [0/4 Ã©â‚¬Å¡Ã¨Â¿â€¡] Ã¦Å“ÂªÃ¥Â¼â‚¬Ã¥Â§â€¹
```

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `define <name>` - Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦â€“Â°Ã§Å¡â€žÃ¨Â¯â€žÃ¤Â¼Â°Ã¥Â®Å¡Ã¤Â¹â€°
* `check <name>` - Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â¹Â¶Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¯â€žÃ¤Â¼Â°
* `report <name>` - Ã§â€Å¸Ã¦Ë†ÂÃ¥Â®Å’Ã¦â€¢Â´Ã¦Å Â¥Ã¥â€˜Å 
* `list` - Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¨Â¯â€žÃ¤Â¼Â°
* `clean` - Ã¥Ë†Â Ã©â„¢Â¤Ã¦â€”Â§Ã§Å¡â€žÃ¨Â¯â€žÃ¤Â¼Â°Ã¦â€”Â¥Ã¥Â¿â€”Ã¯Â¼Ë†Ã¤Â¿ÂÃ§â€¢â„¢Ã¦Å“â‚¬Ã¨Â¿â€˜ 10 Ã¦Â¬Â¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼â€°
