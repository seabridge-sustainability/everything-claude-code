# Eval Ã¥â€˜Â½Ã¤Â»Â¤

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
