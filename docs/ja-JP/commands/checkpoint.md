# Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

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


Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã¥â€ â€¦Ã£ÂÂ§Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã¦Â¤Å“Ã¨Â¨Â¼Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã¦â€“Â¹Ã¦Â³â€¢

`/checkpoint [create|verify|list] [name]`

## Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â½Å“Ã¦Ë†Â

Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ„¢Ã£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã¯Â¼Å¡

1. `/verify quick` Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¦Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã§Å Â¶Ã¦â€¦â€¹Ã£ÂÅ’ clean Ã£ÂÂ§Ã£Ââ€šÃ£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
2. Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¥ÂÂÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦ git stash Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
3. Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™ `.claude/checkpoints.log` Ã£ÂÂ«Ã¨Â¨ËœÃ©Å’Â²Ã¯Â¼Å¡

```bash
echo "$(date +%Y-%m-%d-%H:%M) | $CHECKPOINT_NAME | $(git rev-parse --short HEAD)" >> .claude/checkpoints.log
```

4. Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â½Å“Ã¦Ë†ÂÃ£â€šâ€™Ã¥Â Â±Ã¥â€˜Å 

## Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¦Â¤Å“Ã¨Â¨Â¼

Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦Ã¦Â¤Å“Ã¨Â¨Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã¯Â¼Å¡

1. Ã£Æ’Â­Ã£â€šÂ°Ã£Ââ€¹Ã£â€šâ€°Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¨ÂªÂ­Ã£â€šâ‚¬

2. Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã§Å Â¶Ã¦â€¦â€¹Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ¨Ã¦Â¯â€Ã¨Â¼Æ’Ã¯Â¼Å¡
   * Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â»Â¥Ã©â„¢ÂÃ£ÂÂ«Ã¨Â¿Â½Ã¥Å Â Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«
   * Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â»Â¥Ã©â„¢ÂÃ£ÂÂ«Ã¤Â¿Â®Ã¦Â­Â£Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«
   * Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Ë†ÂÃ¥Å Å¸Ã§Å½â€¡Ã£ÂÂ¨Ã¦â„¢â€šÃ¦â„¢â€šÃ£ÂÂ®Ã¦Â¯â€Ã¨Â¼Æ’
   * Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£ÂÂ¨Ã¦â„¢â€šÃ¦â„¢â€šÃ£ÂÂ®Ã¦Â¯â€Ã¨Â¼Æ’

3. Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã¯Â¼Å¡

```
Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¦Â¯â€Ã¨Â¼Æ’: $NAME
============================
Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«: X
Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†: +Y Ã¥ÂË†Ã¦Â Â¼ / -Z Ã¥Â¤Â±Ã¦â€¢â€”
Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸: +X% / -Y%
Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°: [PASS/FAIL]
```

## Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â¸â‚¬Ã¨Â¦Â§Ã¨Â¡Â¨Ã§Â¤Âº

Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â»Â¥Ã¤Â¸â€¹Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£ÂÂ¦Ã¨Â¡Â¨Ã§Â¤ÂºÃ¯Â¼Å¡

* Ã¥ÂÂÃ¥â€°Â
* Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â³Ã£Æ’â€”
* Git SHA
* Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹Ã¯Â¼Ë†currentÃ£â‚¬ÂbehindÃ£â‚¬ÂaheadÃ¯Â¼â€°

## Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¦ÂµÂÃ¯Â¼Å¡

```
[Ã©â€“â€¹Ã¥Â§â€¹] --> /checkpoint create "feature-start"
   |
[Ã¥Â®Å¸Ã¨Â£â€¦] --> /checkpoint create "core-done"
   |
[Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†] --> /checkpoint verify "core-done"
   |
[Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°] --> /checkpoint create "refactor-done"
   |
[PR] --> /checkpoint verify "feature-start"
```

## Ã¥Â¼â€¢Ã¦â€¢Â°

$ARGUMENTS:

* `create <name>` - Ã¦Å’â€¡Ã¥Â®Å¡Ã£ÂÂ®Ã¥ÂÂÃ¥â€°ÂÃ£ÂÂ§Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â½Å“Ã¦Ë†Â
* `verify <name>` - Ã¦Å’â€¡Ã¥Â®Å¡Ã£ÂÂ®Ã¥ÂÂÃ¥â€°ÂÃ£ÂÂ®Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦Ã¦Â¤Å“Ã¨Â¨Â¼
* `list` - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
* `clear` - Ã¥ÂÂ¤Ã£Ââ€žÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¥â€°Å Ã©â„¢Â¤Ã¯Â¼Ë†Ã¦Å“â‚¬Ã¦â€“Â° 5 Ã¥â‚¬â€¹Ã£â€šâ€™Ã¤Â¿ÂÃ¦Å’ÂÃ¯Â¼â€°
