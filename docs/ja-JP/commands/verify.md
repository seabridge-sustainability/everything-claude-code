# Ã¦Â¤Å“Ã¨Â¨Â¼Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

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


Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã§Å Â¶Ã¦â€¦â€¹Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂªÃ¦Â¤Å“Ã¨Â¨Â¼Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¦â€°â€¹Ã©Â â€ 

Ã£Ââ€œÃ£ÂÂ®Ã¦Â­Â£Ã§Â¢ÂºÃ£ÂÂªÃ©Â â€ Ã¥ÂºÂÃ£ÂÂ§Ã¦Â¤Å“Ã¨Â¨Â¼Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž:

1. **Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯**
   - Ã£Ââ€œÃ£ÂÂ®Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
   - Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ€”Ã£ÂÅ¸Ã¥Â Â´Ã¥ÂË†Ã£â‚¬ÂÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¥Â Â±Ã¥â€˜Å Ã£Ââ€”Ã£ÂÂ¦**Ã¥ÂÅ“Ã¦Â­Â¢**

2. **Ã¥Å¾â€¹Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯**
   - TypeScript/Ã¥Å¾â€¹Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ«Ã£Æ’Â¼Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
   - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«:Ã¨Â¡Å’Ã§â€¢ÂªÃ¥ÂÂ·Ã£ÂÂ¨Ã£ÂÂ¨Ã£â€šâ€šÃ£ÂÂ«Ã¥Â Â±Ã¥â€˜Å 

3. **LintÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯**
   - LinterÃ£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
   - Ã¨Â­Â¦Ã¥â€˜Å Ã£ÂÂ¨Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¥Â Â±Ã¥â€˜Å 

4. **Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¹Ã£â€šÂ¤Ã£Æ’Â¼Ã£Æ’Ë†**
   - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
   - Ã¥ÂË†Ã¦Â Â¼/Ã¤Â¸ÂÃ¥ÂË†Ã¦Â Â¼Ã£ÂÂ®Ã¦â€¢Â°Ã£â€šâ€™Ã¥Â Â±Ã¥â€˜Å 
   - Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£ÂÂ®Ã£Æ’â€˜Ã£Æ’Â¼Ã£â€šÂ»Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šâ€™Ã¥Â Â±Ã¥â€˜Å 

5. **Console.logÃ§â€ºÂ£Ã¦Å¸Â»**
   - Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ§console.logÃ£â€šâ€™Ã¦Â¤Å“Ã§Â´Â¢
   - Ã¥Â Â´Ã¦â€°â‚¬Ã£â€šâ€™Ã¥Â Â±Ã¥â€˜Å 

6. **GitÃ§Å Â¶Ã¦â€¦â€¹**
   - Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂªÃ£Ââ€žÃ¥Â¤â€°Ã¦â€ºÂ´Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
   - Ã¦Å“â‚¬Ã¥Â¾Å’Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã¤Â»Â¥Ã©â„¢ÂÃ£ÂÂ«Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº

## Ã¥â€¡ÂºÃ¥Å â€º

Ã§Â°Â¡Ã¦Â½â€Ã£ÂÂªÃ¦Â¤Å“Ã¨Â¨Â¼Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†ÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

```
Ã¦Â¤Å“Ã¨Â¨Â¼Ã§ÂµÂÃ¦Å¾Å“: [PASS/FAIL]

Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°:       [OK/FAIL]
Ã¥Å¾â€¹:           [OK/XÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼]
Lint:         [OK/XÃ¤Â»Â¶Ã£ÂÂ®Ã¥â€¢ÂÃ©Â¡Å’]
Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†:       [X/YÃ¥ÂË†Ã¦Â Â¼, Z%Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸]
Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†: [OK/XÃ¤Â»Â¶Ã§â„¢ÂºÃ¨Â¦â€¹]
Ã£Æ’Â­Ã£â€šÂ°:         [OK/XÃ¤Â»Â¶Ã£ÂÂ®console.log]

PRÃ¦Âºâ€“Ã¥â€šâ„¢Ã¥Â®Å’Ã¤Âºâ€ : [YES/NO]
```

Ã©â€¡ÂÃ¥Â¤Â§Ã£ÂÂªÃ¥â€¢ÂÃ©Â¡Å’Ã£ÂÅ’Ã£Ââ€šÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯Ã£â‚¬ÂÃ¤Â¿Â®Ã¦Â­Â£Ã¦Â¡Ë†Ã£ÂÂ¨Ã£ÂÂ¨Ã£â€šâ€šÃ£ÂÂ«Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¥Â¼â€¢Ã¦â€¢Â°

$ARGUMENTS Ã£ÂÂ¯Ã¤Â»Â¥Ã¤Â¸â€¹Ã£ÂÂ®Ã£Ââ€žÃ£ÂÅ¡Ã£â€šÅ’Ã£Ââ€¹:
- `quick` - Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€° + Ã¥Å¾â€¹Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ®Ã£ÂÂ¿
- `full` - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã¯Â¼Ë†Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã¯Â¼â€°
- `pre-commit` - Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£ÂÂ«Ã©â€“Â¢Ã©â‚¬Â£Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
- `pre-pr` - Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯ + Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³
