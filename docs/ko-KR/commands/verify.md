# ÃªÂ²â‚¬Ã¬Â¦Â Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“

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


Ã­Ëœâ€žÃ¬Å¾Â¬ Ã¬Â½â€Ã«â€œÅ“Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Æ’ÂÃ­Æ’Å“Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã­ÂÂ¬ÃªÂ´â€žÃ¬Â ÂÃ¬ÂÂ¸ ÃªÂ²â‚¬Ã¬Â¦ÂÃ¬Ââ€ž Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬Â§â‚¬Ã¬â€¹Å“Ã¬â€šÂ¬Ã­â€¢Â­

Ã¬Â â€¢Ã­â„¢â€¢Ã­Å¾Ë† Ã¬ÂÂ´ Ã¬Ë†Å“Ã¬â€žÅ“Ã«Â¡Å“ ÃªÂ²â‚¬Ã¬Â¦ÂÃ¬Ââ€ž Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€:

1. **Build ÃªÂ²â‚¬Ã¬â€šÂ¬**
   - Ã¬ÂÂ´ Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸Ã¬ÂËœ build Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“ Ã¬â€¹Â¤Ã­â€“â€°
   - Ã¬â€¹Â¤Ã­Å’Â¨ Ã¬â€¹Å“ Ã¬â€”ÂÃ«Å¸Â¬Ã«Â¥Â¼ Ã«Â³Â´ÃªÂ³Â Ã­â€¢ËœÃªÂ³Â  Ã¬Â¤â€˜Ã«â€¹Â¨

2. **Ã­Æ’â‚¬Ã¬Å¾â€¦ ÃªÂ²â‚¬Ã¬â€šÂ¬**
   - TypeScript/Ã­Æ’â‚¬Ã¬Å¾â€¦ Ã¬Â²Â´Ã¬Â»Â¤ Ã¬â€¹Â¤Ã­â€“â€°
   - Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€”ÂÃ«Å¸Â¬Ã«Â¥Â¼ Ã­Å’Å’Ã¬ÂÂ¼:Ã¬Â¤â€žÃ«Â²Ë†Ã­ËœÂ¸Ã«Â¡Å“ Ã«Â³Â´ÃªÂ³Â 

3. **Lint ÃªÂ²â‚¬Ã¬â€šÂ¬**
   - Ã«Â¦Â°Ã­â€žÂ° Ã¬â€¹Â¤Ã­â€“â€°
   - ÃªÂ²Â½ÃªÂ³Â Ã¬â„¢â‚¬ Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â³Â´ÃªÂ³Â 

4. **Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€°**
   - Ã«ÂªÂ¨Ã«â€œÂ  Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€°
   - Ã­â€ ÂµÃªÂ³Â¼/Ã¬â€¹Â¤Ã­Å’Â¨ Ã¬Ë†Ëœ Ã«Â³Â´ÃªÂ³Â 
   - Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ Ã«Â¹â€žÃ¬Å“Â¨ Ã«Â³Â´ÃªÂ³Â 

5. **Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ Ã¬Å Â¤Ã¬Âºâ€**
   - Ã¬â€ Å’Ã¬Å Â¤ Ã­Å’Å’Ã¬ÂÂ¼Ã¬â€”ÂÃ¬â€žÅ“ API Ã­â€šÂ¤, Ã­â€ Â Ã­ÂÂ°, Ã«Â¹â€žÃ«Â°â‚¬ÃªÂ°â€™ Ã­Å’Â¨Ã­â€žÂ´ ÃªÂ²â‚¬Ã¬Æ’â€°
   - Ã«Â°Å“ÃªÂ²Â¬ Ã¬Å“â€žÃ¬Â¹Ëœ Ã«Â³Â´ÃªÂ³Â 

6. **Console.log ÃªÂ°ÂÃ¬â€šÂ¬**
   - Ã¬â€ Å’Ã¬Å Â¤ Ã­Å’Å’Ã¬ÂÂ¼Ã¬â€”ÂÃ¬â€žÅ“ console.log ÃªÂ²â‚¬Ã¬Æ’â€°
   - Ã¬Å“â€žÃ¬Â¹Ëœ Ã«Â³Â´ÃªÂ³Â 

7. **Git Ã¬Æ’ÂÃ­Æ’Å“**
   - Ã¬Â»Â¤Ã«Â°â€¹Ã«ÂËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬Ââ‚¬ Ã«Â³â‚¬ÃªÂ²Â½Ã¬â€šÂ¬Ã­â€¢Â­ Ã­â€˜Å“Ã¬â€¹Å“
   - Ã«Â§Ë†Ã¬Â§â‚¬Ã«Â§â€° Ã¬Â»Â¤Ã«Â°â€¹ Ã¬ÂÂ´Ã­â€ºâ€ž Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÅ“ Ã­Å’Å’Ã¬ÂÂ¼ Ã­â€˜Å“Ã¬â€¹Å“

## Ã¬Â¶Å“Ã«Â Â¥

ÃªÂ°â€žÃªÂ²Â°Ã­â€¢Å“ ÃªÂ²â‚¬Ã¬Â¦Â Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“Ã«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```
VERIFICATION: [PASS/FAIL]

Build:    [OK/FAIL]
Types:    [OK/X errors]
Lint:     [OK/X issues]
Tests:    [X/Y passed, Z% coverage]
Secrets:  [OK/X found]
Logs:     [OK/X console.logs]

Ready for PR: [YES/NO]
```

Ã¬Â¹ËœÃ«Âªâ€¦Ã¬Â Â Ã¬ÂÂ´Ã¬Å Ë†ÃªÂ°â‚¬ Ã¬Å¾Ë†Ã¬Å“Â¼Ã«Â©Â´ Ã¬Ë†ËœÃ¬Â â€¢ Ã¬Â Å“Ã¬â€¢Ë†ÃªÂ³Â¼ Ã­â€¢Â¨ÃªÂ»Ëœ Ã«ÂªÂ©Ã«Â¡ÂÃ­â„¢â€Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬ÂÂ¸Ã¬Å¾Â

$ARGUMENTS:
- `quick` - build + Ã­Æ’â‚¬Ã¬Å¾â€¦Ã«Â§Å’
- `full` - Ã«ÂªÂ¨Ã«â€œÂ  ÃªÂ²â‚¬Ã¬â€šÂ¬ (ÃªÂ¸Â°Ã«Â³Â¸ÃªÂ°â€™)
- `pre-commit` - Ã¬Â»Â¤Ã«Â°â€¹Ã¬â€”Â ÃªÂ´â‚¬Ã«Â Â¨Ã«ÂÅ“ ÃªÂ²â‚¬Ã¬â€šÂ¬
- `pre-pr` - Ã¬Â â€žÃ¬Â²Â´ ÃªÂ²â‚¬Ã¬â€šÂ¬ + Ã«Â³Â´Ã¬â€¢Ë† Ã¬Å Â¤Ã¬Âºâ€
