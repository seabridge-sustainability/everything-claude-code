# EvalÃ£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Ã¨Â©â€¢Ã¤Â¾Â¡Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢ÂºÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£â€šâ€™Ã§Â®Â¡Ã§Ââ€ Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

`/eval [define|check|report|list] [Ã¦Â©Å¸Ã¨Æ’Â½Ã¥ÂÂ]`

## EvalÃ£ÂÂ®Ã¥Â®Å¡Ã§Â¾Â©

`/eval define Ã¦Â©Å¸Ã¨Æ’Â½Ã¥ÂÂ`

Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ¨Â©â€¢Ã¤Â¾Â¡Ã¥Â®Å¡Ã§Â¾Â©Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

1. Ã£Æ’â€ Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦ `.claude/evals/Ã¦Â©Å¸Ã¨Æ’Â½Ã¥ÂÂ.md` Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â:

```markdown
## EVAL: Ã¦Â©Å¸Ã¨Æ’Â½Ã¥ÂÂ
Ã¤Â½Å“Ã¦Ë†ÂÃ¦â€”Â¥: $(date)

### Ã¦Â©Å¸Ã¨Æ’Â½Ã¨Â©â€¢Ã¤Â¾Â¡
- [ ] [Ã¦Â©Å¸Ã¨Æ’Â½1Ã£ÂÂ®Ã¨ÂªÂ¬Ã¦ËœÅ½]
- [ ] [Ã¦Â©Å¸Ã¨Æ’Â½2Ã£ÂÂ®Ã¨ÂªÂ¬Ã¦ËœÅ½]

### Ã¥â€ºÅ¾Ã¥Â¸Â°Ã¨Â©â€¢Ã¤Â¾Â¡
- [ ] [Ã¦â€”Â¢Ã¥Â­ËœÃ£ÂÂ®Ã¥â€¹â€¢Ã¤Â½Å“1Ã£ÂÅ’Ã¦Â­Â£Ã¥Â¸Â¸Ã£ÂÂ«Ã¥â€¹â€¢Ã¤Â½Å“Ã£Ââ„¢Ã£â€šâ€¹]
- [ ] [Ã¦â€”Â¢Ã¥Â­ËœÃ£ÂÂ®Ã¥â€¹â€¢Ã¤Â½Å“2Ã£ÂÅ’Ã¦Â­Â£Ã¥Â¸Â¸Ã£ÂÂ«Ã¥â€¹â€¢Ã¤Â½Å“Ã£Ââ„¢Ã£â€šâ€¹]

### Ã¦Ë†ÂÃ¥Å Å¸Ã¥Å¸ÂºÃ¦Âºâ€“
- Ã¦Â©Å¸Ã¨Æ’Â½Ã¨Â©â€¢Ã¤Â¾Â¡: pass@3 > 90%
- Ã¥â€ºÅ¾Ã¥Â¸Â°Ã¨Â©â€¢Ã¤Â¾Â¡: pass^3 = 100%
```

2. Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÂ«Ã¥â€¦Â·Ã¤Â½â€œÃ§Å¡â€žÃ£ÂÂªÃ¥Å¸ÂºÃ¦Âºâ€“Ã£â€šâ€™Ã¨Â¨ËœÃ¥â€¦Â¥Ã£Ââ„¢Ã£â€šâ€¹Ã£â€šË†Ã£Ââ€ Ã¤Â¿Æ’Ã£Ââ„¢

## EvalÃ£ÂÂ®Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯

`/eval check Ã¦Â©Å¸Ã¨Æ’Â½Ã¥ÂÂ`

Ã¦Â©Å¸Ã¨Æ’Â½Ã£ÂÂ®Ã¨Â©â€¢Ã¤Â¾Â¡Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

1. `.claude/evals/Ã¦Â©Å¸Ã¨Æ’Â½Ã¥ÂÂ.md` Ã£Ââ€¹Ã£â€šâ€°Ã¨Â©â€¢Ã¤Â¾Â¡Ã¥Â®Å¡Ã§Â¾Â©Ã£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£â€šâ‚¬
2. Ã¥Ââ€žÃ¦Â©Å¸Ã¨Æ’Â½Ã¨Â©â€¢Ã¤Â¾Â¡Ã£ÂÂ«Ã£ÂÂ¤Ã£Ââ€žÃ£ÂÂ¦:
   - Ã¥Å¸ÂºÃ¦Âºâ€“Ã£ÂÂ®Ã¦Â¤Å“Ã¨Â¨Â¼Ã£â€šâ€™Ã¨Â©Â¦Ã¨Â¡Å’
   - PASS/FAILÃ£â€šâ€™Ã¨Â¨ËœÃ©Å’Â²
   - `.claude/evals/Ã¦Â©Å¸Ã¨Æ’Â½Ã¥ÂÂ.log` Ã£ÂÂ«Ã¨Â©Â¦Ã¨Â¡Å’Ã£â€šâ€™Ã¨Â¨ËœÃ©Å’Â²
3. Ã¥Ââ€žÃ¥â€ºÅ¾Ã¥Â¸Â°Ã¨Â©â€¢Ã¤Â¾Â¡Ã£ÂÂ«Ã£ÂÂ¤Ã£Ââ€žÃ£ÂÂ¦:
   - Ã©â€“Â¢Ã©â‚¬Â£Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
   - Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Â³Ã£ÂÂ¨Ã¦Â¯â€Ã¨Â¼Æ’
   - PASS/FAILÃ£â€šâ€™Ã¨Â¨ËœÃ©Å’Â²
4. Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šâ€™Ã¥Â Â±Ã¥â€˜Å :

```
EVAL CHECK: Ã¦Â©Å¸Ã¨Æ’Â½Ã¥ÂÂ
========================
Ã¦Â©Å¸Ã¨Æ’Â½Ã¨Â©â€¢Ã¤Â¾Â¡: X/Y Ã¥ÂË†Ã¦Â Â¼
Ã¥â€ºÅ¾Ã¥Â¸Â°Ã¨Â©â€¢Ã¤Â¾Â¡: X/Y Ã¥ÂË†Ã¦Â Â¼
Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹: Ã©â‚¬Â²Ã¨Â¡Å’Ã¤Â¸Â­ / Ã¦Âºâ€“Ã¥â€šâ„¢Ã¥Â®Å’Ã¤Âºâ€ 
```

## EvalÃ£ÂÂ®Ã¥Â Â±Ã¥â€˜Å 

`/eval report Ã¦Â©Å¸Ã¨Æ’Â½Ã¥ÂÂ`

Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂªÃ¨Â©â€¢Ã¤Â¾Â¡Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†ÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

```
EVAL REPORT: Ã¦Â©Å¸Ã¨Æ’Â½Ã¥ÂÂ
=========================
Ã§â€Å¸Ã¦Ë†ÂÃ¦â€”Â¥Ã¦â„¢â€š: $(date)

Ã¦Â©Å¸Ã¨Æ’Â½Ã¨Â©â€¢Ã¤Â¾Â¡
----------------
[eval-1]: PASS (pass@1)
[eval-2]: PASS (pass@2) - Ã¥â€ ÂÃ¨Â©Â¦Ã¨Â¡Å’Ã£ÂÅ’Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂ§Ã£Ââ€”Ã£ÂÅ¸
[eval-3]: FAIL - Ã¥â€šâ„¢Ã¨â‚¬Æ’Ã£â€šâ€™Ã¥Ââ€šÃ§â€¦Â§

Ã¥â€ºÅ¾Ã¥Â¸Â°Ã¨Â©â€¢Ã¤Â¾Â¡
----------------
[test-1]: PASS
[test-2]: PASS
[test-3]: PASS

Ã£Æ’Â¡Ã£Æ’Ë†Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¹
-------
Ã¦Â©Å¸Ã¨Æ’Â½Ã¨Â©â€¢Ã¤Â¾Â¡ pass@1: 67%
Ã¦Â©Å¸Ã¨Æ’Â½Ã¨Â©â€¢Ã¤Â¾Â¡ pass@3: 100%
Ã¥â€ºÅ¾Ã¥Â¸Â°Ã¨Â©â€¢Ã¤Â¾Â¡ pass^3: 100%

Ã¥â€šâ„¢Ã¨â‚¬Æ’
-----
[Ã¥â€¢ÂÃ©Â¡Å’Ã£â‚¬ÂÃ£â€šÂ¨Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¹Ã£â‚¬ÂÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã¨Â¦Â³Ã¥Â¯Å¸Ã¤Âºâ€¹Ã©Â â€¦]

Ã¦Å½Â¨Ã¥Â¥Â¨Ã¤Âºâ€¹Ã©Â â€¦
--------------
[Ã£Æ’ÂªÃ£Æ’ÂªÃ£Æ’Â¼Ã£â€šÂ¹Ã¥ÂÂ¯ / Ã¨Â¦ÂÃ¤Â¿Â®Ã¦Â­Â£ / Ã£Æ’â€“Ã£Æ’Â­Ã£Æ’Æ’Ã£â€šÂ¯Ã¤Â¸Â­]
```

## EvalÃ£ÂÂ®Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¨Â¡Â¨Ã§Â¤Âº

`/eval list`

Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã¨Â©â€¢Ã¤Â¾Â¡Ã¥Â®Å¡Ã§Â¾Â©Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤ÂºÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

```
EVAL Ã¥Â®Å¡Ã§Â¾Â©Ã¤Â¸â‚¬Ã¨Â¦Â§
================
feature-auth      [3/5 Ã¥ÂË†Ã¦Â Â¼] Ã©â‚¬Â²Ã¨Â¡Å’Ã¤Â¸Â­
feature-search    [5/5 Ã¥ÂË†Ã¦Â Â¼] Ã¦Âºâ€“Ã¥â€šâ„¢Ã¥Â®Å’Ã¤Âºâ€ 
feature-export    [0/4 Ã¥ÂË†Ã¦Â Â¼] Ã¦Å“ÂªÃ§Ââ‚¬Ã¦â€°â€¹
```

## Ã¥Â¼â€¢Ã¦â€¢Â°

$ARGUMENTS:
- `define <Ã¥ÂÂÃ¥â€°Â>` - Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ¨Â©â€¢Ã¤Â¾Â¡Ã¥Â®Å¡Ã§Â¾Â©Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
- `check <Ã¥ÂÂÃ¥â€°Â>` - Ã¨Â©â€¢Ã¤Â¾Â¡Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¦Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
- `report <Ã¥ÂÂÃ¥â€°Â>` - Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â
- `list` - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã¨Â©â€¢Ã¤Â¾Â¡Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
- `clean` - Ã¥ÂÂ¤Ã£Ââ€žÃ¨Â©â€¢Ã¤Â¾Â¡Ã£Æ’Â­Ã£â€šÂ°Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤Ã¯Â¼Ë†Ã¦Å“â‚¬Ã¦â€“Â°10Ã¤Â»Â¶Ã£â€šâ€™Ã¤Â¿ÂÃ¦Å’ÂÃ¯Â¼â€°
