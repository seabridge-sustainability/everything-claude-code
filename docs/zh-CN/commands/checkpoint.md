# Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¥â€˜Â½Ã¤Â»Â¤

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


Ã¥Å“Â¨Ã¤Â½Â Ã§Å¡â€žÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¤Â¸Â­Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦Ë†â€“Ã©ÂªÅ’Ã¨Â¯ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/checkpoint [create|verify|list] [name]`

## Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹

Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¦â€”Â¶Ã¯Â¼Å¡

1. Ã¨Â¿ÂÃ¨Â¡Å’ `/verify quick` Ã¤Â»Â¥Ã§Â¡Â®Ã¤Â¿ÂÃ¥Â½â€œÃ¥â€°ÂÃ§Å Â¶Ã¦â‚¬ÂÃ¦ËœÂ¯Ã¥Â¹Â²Ã¥â€¡â‚¬Ã§Å¡â€ž
2. Ã¤Â½Â¿Ã§â€Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¥ÂÂÃ§Â§Â°Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤Â¸â‚¬Ã¤Â¸Âª git stash Ã¦Ë†â€“Ã¦ÂÂÃ¤ÂºÂ¤
3. Ã¥Â°â€ Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¨Â®Â°Ã¥Â½â€¢Ã¥Ë†Â° `.claude/checkpoints.log`Ã¯Â¼Å¡

```bash
echo "$(date +%Y-%m-%d-%H:%M) | $CHECKPOINT_NAME | $(git rev-parse --short HEAD)" >> .claude/checkpoints.log
```

4. Ã¦Å Â¥Ã¥â€˜Å Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¥Â·Â²Ã¥Ë†â€ºÃ¥Â»Âº

## Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹

Ã¦Â Â¹Ã¦ÂÂ®Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¦â€”Â¶Ã¯Â¼Å¡

1. Ã¤Â»Å½Ã¦â€”Â¥Ã¥Â¿â€”Ã¤Â¸Â­Ã¨Â¯Â»Ã¥Ââ€“Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹

2. Ã¥Â°â€ Ã¥Â½â€œÃ¥â€°ÂÃ§Å Â¶Ã¦â‚¬ÂÃ¤Â¸Å½Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â¯â€Ã¨Â¾Æ’Ã¯Â¼Å¡
   * Ã¨â€¡ÂªÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¤Â»Â¥Ã¦ÂÂ¥Ã¦â€“Â°Ã¥Â¢Å¾Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶
   * Ã¨â€¡ÂªÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¤Â»Â¥Ã¦ÂÂ¥Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶
   * Ã§Å½Â°Ã¥Å“Â¨Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã§Å½â€¡Ã¤Â¸Å½Ã¥Â½â€œÃ¦â€”Â¶Ã¥Â¯Â¹Ã¦Â¯â€
   * Ã§Å½Â°Ã¥Å“Â¨Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¤Â¸Å½Ã¥Â½â€œÃ¦â€”Â¶Ã¥Â¯Â¹Ã¦Â¯â€

3. Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡

```
Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¥Â¯Â¹Ã¦Â¯â€Ã¯Â¼Å¡$NAME
============================
Ã¦â€“â€¡Ã¤Â»Â¶Ã¦â€ºÂ´Ã¦â€Â¹Ã¦â€¢Â°Ã¯Â¼Å¡X
Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â»â€œÃ¦Å¾Å“Ã¯Â¼Å¡Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦â€¢Â° +Y / Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€¢Â° -Z
Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Å¡+X% / -Y%
Ã¦Å¾â€žÃ¥Â»ÂºÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å¡[Ã©â‚¬Å¡Ã¨Â¿â€¡/Ã¥Â¤Â±Ã¨Â´Â¥]
```

## Ã¥Ë†â€”Ã¥â€¡ÂºÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹

Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡

* Ã¥ÂÂÃ§Â§Â°
* Ã¦â€”Â¶Ã©â€”Â´Ã¦Ë†Â³
* Git SHA
* Ã§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Ë†Ã¥Â½â€œÃ¥â€°ÂÃ£â‚¬ÂÃ¨ÂÂ½Ã¥ÂÅ½Ã£â‚¬ÂÃ¨Â¶â€¦Ã¥â€°ÂÃ¯Â¼â€°

## Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

Ã¥â€¦Â¸Ã¥Å¾â€¹Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å¡

```
[Start] --> /checkpoint create "feature-start"
   |
[Implement] --> /checkpoint create "core-done"
   |
[Test] --> /checkpoint verify "core-done"
   |
[Refactor] --> /checkpoint create "refactor-done"
   |
[PR] --> /checkpoint verify "feature-start"
```

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `create <name>` - Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦Å’â€¡Ã¥Â®Å¡Ã¥ÂÂÃ§Â§Â°Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹
* `verify <name>` - Ã¦Â Â¹Ã¦ÂÂ®Ã¦Å’â€¡Ã¥Â®Å¡Ã¥ÂÂÃ§Â§Â°Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯Â
* `list` - Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹
* `clear` - Ã¥Ë†Â Ã©â„¢Â¤Ã¦â€”Â§Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹Ã¯Â¼Ë†Ã¤Â¿ÂÃ§â€¢â„¢Ã¦Å“â‚¬Ã¥ÂÅ½5Ã¤Â¸ÂªÃ¯Â¼â€°
