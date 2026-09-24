# Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â€˜Â½Ã¤Â»Â¤

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


Ã¥Â¯Â¹Ã¥Â½â€œÃ¥â€°ÂÃ¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ§Å Â¶Ã¦â‚¬ÂÃ¦â€°Â§Ã¨Â¡Å’Ã¥â€¦Â¨Ã©ÂÂ¢Ã©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬â€š

## Ã¨Â¯Â´Ã¦ËœÅ½

Ã¨Â¯Â·Ã¤Â¸Â¥Ã¦Â Â¼Ã¦Å’â€°Ã§â€¦Â§Ã¤Â»Â¥Ã¤Â¸â€¹Ã©Â¡ÂºÃ¥ÂºÂÃ¦â€°Â§Ã¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å¡

1. **Ã¦Å¾â€žÃ¥Â»ÂºÃ¦Â£â‚¬Ã¦Å¸Â¥**
   * Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Â­Â¤Ã©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€žÃ¦Å¾â€žÃ¥Â»ÂºÃ¥â€˜Â½Ã¤Â»Â¤
   * Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Ã¦Å Â¥Ã¥â€˜Å Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¹Â¶**Ã¥ÂÅ“Ã¦Â­Â¢**

2. **Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥**
   * Ã¨Â¿ÂÃ¨Â¡Å’ TypeScript/Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥â„¢Â¨
   * Ã¦Å Â¥Ã¥â€˜Å Ã¦â€°â‚¬Ã¦Å“â€°Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¦â€“â€¡Ã¤Â»Â¶:Ã¨Â¡Å’Ã¥ÂÂ·

3. **Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥**
   * Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¥â„¢Â¨
   * Ã¦Å Â¥Ã¥â€˜Å Ã¨Â­Â¦Ã¥â€˜Å Ã¥â€™Å’Ã©â€â„¢Ã¨Â¯Â¯

4. **Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¥â€”Ã¤Â»Â¶**
   * Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢
   * Ã¦Å Â¥Ã¥â€˜Å Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€¢Â°Ã©â€¡Â
   * Ã¦Å Â¥Ã¥â€˜Å Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§â„¢Â¾Ã¥Ë†â€ Ã¦Â¯â€

5. **Console.log Ã¥Â®Â¡Ã¨Â®Â¡**
   * Ã¥Å“Â¨Ã¦ÂºÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Â­Ã¦ÂÅ“Ã§Â´Â¢ console.log
   * Ã¦Å Â¥Ã¥â€˜Å Ã¤Â½ÂÃ§Â½Â®

6. **Git Ã§Å Â¶Ã¦â‚¬Â**
   * Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦Å“ÂªÃ¦ÂÂÃ¤ÂºÂ¤Ã§Å¡â€žÃ¦â€ºÂ´Ã¦â€Â¹
   * Ã¦ËœÂ¾Ã§Â¤ÂºÃ¨â€¡ÂªÃ¤Â¸Å Ã¦Â¬Â¡Ã¦ÂÂÃ¤ÂºÂ¤Ã¤Â»Â¥Ã¦ÂÂ¥Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶

## Ã¨Â¾â€œÃ¥â€¡Âº

Ã§â€Å¸Ã¦Ë†ÂÃ¤Â¸â‚¬Ã¤Â»Â½Ã§Â®â‚¬Ã¦Â´ÂÃ§Å¡â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

```
Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å¡ [Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥]

Ã¦Å¾â€žÃ¥Â»ÂºÃ¯Â¼Å¡    [Ã¦Ë†ÂÃ¥Å Å¸/Ã¥Â¤Â±Ã¨Â´Â¥]
Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Å¡    [Ã¦Ë†ÂÃ¥Å Å¸/X Ã©â€â„¢Ã¨Â¯Â¯]
Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡ [Ã¦Ë†ÂÃ¥Å Å¸/X Ã©â€”Â®Ã©Â¢Ëœ]
Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å¡    [X/Y Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¯Â¼Å’Z% Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡]
Ã¥Â¯â€ Ã©â€™Â¥Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡ [Ã¦Ë†ÂÃ¥Å Å¸/X Ã¥Ââ€˜Ã§Å½Â°]
Ã¦â€”Â¥Ã¥Â¿â€”Ã¯Â¼Å¡     [Ã¦Ë†ÂÃ¥Å Å¸/X console.logs]

Ã¥â€¡â€ Ã¥Â¤â€¡Ã¦ÂÂÃ¤ÂºÂ¤ PRÃ¯Â¼Å¡ [Ã¦ËœÂ¯/Ã¥ÂÂ¦]
```

Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â­ËœÃ¥Å“Â¨Ã¤Â»Â»Ã¤Â½â€¢Ã¥â€¦Â³Ã©â€Â®Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¥Ë†â€”Ã¥â€¡ÂºÃ¥Â®Æ’Ã¤Â»Â¬Ã¥Â¹Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¤Â¿Â®Ã¥Â¤ÂÃ¥Â»ÂºÃ¨Â®Â®Ã£â‚¬â€š

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS Ã¥ÂÂ¯Ã¤Â»Â¥Ã¦ËœÂ¯Ã¯Â¼Å¡

* `quick` - Ã¤Â»â€¦Ã¦Å¾â€žÃ¥Â»Âº + Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥
* `full` - Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼â€°
* `pre-commit` - Ã¤Â¸Å½Ã¦ÂÂÃ¤ÂºÂ¤Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥
* `pre-pr` - Ã¥Â®Å’Ã¦â€¢Â´Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥Å Â Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ
