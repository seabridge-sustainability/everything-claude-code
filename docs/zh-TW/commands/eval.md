# Eval Ã¦Å’â€¡Ã¤Â»Â¤

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã§Â®Â¡Ã§Ââ€ Ã¨Â©â€¢Ã¤Â¼Â°Ã©Â©â€¦Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Â¼Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¥Â¼Â

`/eval [define|check|report|list] [feature-name]`

## Ã¥Â®Å¡Ã§Â¾Â© Evals

`/eval define feature-name`

Ã¥Â»ÂºÃ§Â«â€¹Ã¦â€“Â°Ã§Å¡â€ž eval Ã¥Â®Å¡Ã§Â¾Â©Ã¯Â¼Å¡

1. Ã¤Â½Â¿Ã§â€Â¨Ã§Â¯â€žÃ¦Å“Â¬Ã¥Â»ÂºÃ§Â«â€¹ `.claude/evals/feature-name.md`Ã¯Â¼Å¡

```markdown
## EVAL: feature-name
Ã¥Â»ÂºÃ§Â«â€¹Ã¦â€”Â¥Ã¦Å“Å¸Ã¯Â¼Å¡$(date)

### Ã¨Æ’Â½Ã¥Å â€º Evals
- [ ] [Ã¨Æ’Â½Ã¥Å â€º 1 Ã§Å¡â€žÃ¦ÂÂÃ¨Â¿Â°]
- [ ] [Ã¨Æ’Â½Ã¥Å â€º 2 Ã§Å¡â€žÃ¦ÂÂÃ¨Â¿Â°]

### Ã¥â€ºÅ¾Ã¦Â­Â¸ Evals
- [ ] [Ã§ÂÂ¾Ã¦Å“â€°Ã¨Â¡Å’Ã§â€šÂº 1 Ã¤Â»ÂÃ§â€žÂ¶Ã¦Å“â€°Ã¦â€¢Ë†]
- [ ] [Ã§ÂÂ¾Ã¦Å“â€°Ã¨Â¡Å’Ã§â€šÂº 2 Ã¤Â»ÂÃ§â€žÂ¶Ã¦Å“â€°Ã¦â€¢Ë†]

### Ã¦Ë†ÂÃ¥Å Å¸Ã¦Â¨â„¢Ã¦Âºâ€“
- Ã¨Æ’Â½Ã¥Å â€º evals Ã§Å¡â€ž pass@3 > 90%
- Ã¥â€ºÅ¾Ã¦Â­Â¸ evals Ã§Å¡â€ž pass^3 = 100%
```

2. Ã¦ÂÂÃ§Â¤ÂºÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¥Â¡Â«Ã¥â€¦Â¥Ã¥â€¦Â·Ã©Â«â€Ã¦Â¨â„¢Ã¦Âºâ€“

## Ã¦ÂªÂ¢Ã¦Å¸Â¥ Evals

`/eval check feature-name`

Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Å Å¸Ã¨Æ’Â½Ã§Å¡â€ž evalsÃ¯Â¼Å¡

1. Ã¥Â¾Å¾ `.claude/evals/feature-name.md` Ã¨Â®â‚¬Ã¥Ââ€“ eval Ã¥Â®Å¡Ã§Â¾Â©
2. Ã¥Â°ÂÃ¦Â¯ÂÃ¥â‚¬â€¹Ã¨Æ’Â½Ã¥Å â€º evalÃ¯Â¼Å¡
   - Ã¥Ëœâ€”Ã¨Â©Â¦Ã©Â©â€”Ã¨Â­â€°Ã¦Â¨â„¢Ã¦Âºâ€“
   - Ã¨Â¨ËœÃ©Å’â€žÃ©â‚¬Å¡Ã©ÂÅ½/Ã¥Â¤Â±Ã¦â€¢â€”
   - Ã¨Â¨ËœÃ©Å’â€žÃ¥Ëœâ€”Ã¨Â©Â¦Ã¥Ë†Â° `.claude/evals/feature-name.log`
3. Ã¥Â°ÂÃ¦Â¯ÂÃ¥â‚¬â€¹Ã¥â€ºÅ¾Ã¦Â­Â¸ evalÃ¯Â¼Å¡
   - Ã¥Å¸Â·Ã¨Â¡Å’Ã§â€ºÂ¸Ã©â€”Å“Ã¦Â¸Â¬Ã¨Â©Â¦
   - Ã¨Ë†â€¡Ã¥Å¸ÂºÃ¦Âºâ€“Ã¦Â¯â€Ã¨Â¼Æ’
   - Ã¨Â¨ËœÃ©Å’â€žÃ©â‚¬Å¡Ã©ÂÅ½/Ã¥Â¤Â±Ã¦â€¢â€”
4. Ã¥Â Â±Ã¥â€˜Å Ã§â€ºÂ®Ã¥â€°ÂÃ§â€¹â‚¬Ã¦â€¦â€¹Ã¯Â¼Å¡

```
EVAL Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¯Â¼Å¡feature-name
========================
Ã¨Æ’Â½Ã¥Å â€ºÃ¯Â¼Å¡X/Y Ã©â‚¬Å¡Ã©ÂÅ½
Ã¥â€ºÅ¾Ã¦Â­Â¸Ã¯Â¼Å¡X/Y Ã©â‚¬Å¡Ã©ÂÅ½
Ã§â€¹â‚¬Ã¦â€¦â€¹Ã¯Â¼Å¡Ã©â‚¬Â²Ã¨Â¡Å’Ã¤Â¸Â­ / Ã¥Â°Â±Ã§Â·â€™
```

## Ã¥Â Â±Ã¥â€˜Å  Evals

`/eval report feature-name`

Ã§â€Â¢Ã§â€Å¸Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž eval Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Å¡

```
EVAL Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Å¡feature-name
=========================
Ã§â€Â¢Ã§â€Å¸Ã¦â€”Â¥Ã¦Å“Å¸Ã¯Â¼Å¡$(date)

Ã¨Æ’Â½Ã¥Å â€º EVALS
----------------
[eval-1]Ã¯Â¼Å¡Ã©â‚¬Å¡Ã©ÂÅ½Ã¯Â¼Ë†pass@1Ã¯Â¼â€°
[eval-2]Ã¯Â¼Å¡Ã©â‚¬Å¡Ã©ÂÅ½Ã¯Â¼Ë†pass@2Ã¯Â¼â€°- Ã©Å“â‚¬Ã¨Â¦ÂÃ©â€¡ÂÃ¨Â©Â¦
[eval-3]Ã¯Â¼Å¡Ã¥Â¤Â±Ã¦â€¢â€” - Ã¥ÂÆ’Ã¨Â¦â€¹Ã¥â€šâ„¢Ã¨Â¨Â»

Ã¥â€ºÅ¾Ã¦Â­Â¸ EVALS
----------------
[test-1]Ã¯Â¼Å¡Ã©â‚¬Å¡Ã©ÂÅ½
[test-2]Ã¯Â¼Å¡Ã©â‚¬Å¡Ã©ÂÅ½
[test-3]Ã¯Â¼Å¡Ã©â‚¬Å¡Ã©ÂÅ½

Ã¦Å’â€¡Ã¦Â¨â„¢
-------
Ã¨Æ’Â½Ã¥Å â€º pass@1Ã¯Â¼Å¡67%
Ã¨Æ’Â½Ã¥Å â€º pass@3Ã¯Â¼Å¡100%
Ã¥â€ºÅ¾Ã¦Â­Â¸ pass^3Ã¯Â¼Å¡100%

Ã¥â€šâ„¢Ã¨Â¨Â»
-----
[Ã¤Â»Â»Ã¤Â½â€¢Ã¥â€¢ÂÃ©Â¡Å’Ã£â‚¬ÂÃ©â€šÅ Ã§â€¢Å’Ã¦Æ’â€¦Ã¦Â³ÂÃ¦Ë†â€“Ã¨Â§â‚¬Ã¥Â¯Å¸]

Ã¥Â»ÂºÃ¨Â­Â°
--------------
[Ã§â„¢Â¼Ã¥Â¸Æ’ / Ã©Å“â‚¬Ã¨Â¦ÂÃ¦â€Â¹Ã©â‚¬Â² / Ã©ËœÂ»Ã¦â€œâ€¹]
```

## Ã¥Ë†â€”Ã¥â€¡Âº Evals

`/eval list`

Ã©Â¡Â¯Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€° eval Ã¥Â®Å¡Ã§Â¾Â©Ã¯Â¼Å¡

```
EVAL Ã¥Â®Å¡Ã§Â¾Â©
================
feature-auth      [3/5 Ã©â‚¬Å¡Ã©ÂÅ½] Ã©â‚¬Â²Ã¨Â¡Å’Ã¤Â¸Â­
feature-search    [5/5 Ã©â‚¬Å¡Ã©ÂÅ½] Ã¥Â°Â±Ã§Â·â€™
feature-export    [0/4 Ã©â‚¬Å¡Ã©ÂÅ½] Ã¦Å“ÂªÃ©â€“â€¹Ã¥Â§â€¹
```

## Ã¥ÂÆ’Ã¦â€¢Â¸

$ARGUMENTS:
- `define <name>` - Ã¥Â»ÂºÃ§Â«â€¹Ã¦â€“Â°Ã§Å¡â€ž eval Ã¥Â®Å¡Ã§Â¾Â©
- `check <name>` - Ã¥Å¸Â·Ã¨Â¡Å’Ã¤Â¸Â¦Ã¦ÂªÂ¢Ã¦Å¸Â¥ evals
- `report <name>` - Ã§â€Â¢Ã§â€Å¸Ã¥Â®Å’Ã¦â€¢Â´Ã¥Â Â±Ã¥â€˜Å 
- `list` - Ã©Â¡Â¯Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€° evals
- `clean` - Ã§Â§Â»Ã©â„¢Â¤Ã¨Ë†Å Ã§Å¡â€ž eval Ã¦â€”Â¥Ã¨ÂªÅ’Ã¯Â¼Ë†Ã¤Â¿ÂÃ§â€¢â„¢Ã¦Å“â‚¬Ã¥Â¾Å’ 10 Ã¦Â¬Â¡Ã¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼â€°
