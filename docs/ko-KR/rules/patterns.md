# ÃªÂ³ÂµÃ­â€ Âµ Ã­Å’Â¨Ã­â€žÂ´

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


## Ã¬Å Â¤Ã¬Â¼Ë†Ã«Â Ë†Ã­â€ Â¤ Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸

Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥Ã¬Ââ€ž ÃªÂµÂ¬Ã­Ëœâ€žÃ­â€¢Â  Ã«â€¢Å’:
1. ÃªÂ²â‚¬Ã¬Â¦ÂÃ«ÂÅ“ Ã¬Å Â¤Ã¬Â¼Ë†Ã«Â Ë†Ã­â€ Â¤ Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸Ã«Â¥Â¼ ÃªÂ²â‚¬Ã¬Æ’â€°
2. Ã«Â³â€˜Ã«Â Â¬ Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã«Â¡Å“ Ã¬ËœÂµÃ¬â€¦Ëœ Ã­Ââ€°ÃªÂ°â‚¬:
   - Ã«Â³Â´Ã¬â€¢Ë† Ã­Ââ€°ÃªÂ°â‚¬
   - Ã­â„¢â€¢Ã¬Å¾Â¥Ã¬â€žÂ± Ã«Â¶â€žÃ¬â€žÂ
   - ÃªÂ´â‚¬Ã«Â Â¨Ã¬â€žÂ± Ã¬Â ÂÃ¬Ë†Ëœ
   - ÃªÂµÂ¬Ã­Ëœâ€ž ÃªÂ³â€žÃ­Å¡Â
3. ÃªÂ°â‚¬Ã¬Å¾Â¥ Ã¬Â ÂÃ­â€¢Â©Ã­â€¢Å“ ÃªÂ²Æ’Ã¬Ââ€ž ÃªÂ¸Â°Ã«Â°ËœÃ¬Å“Â¼Ã«Â¡Å“ Ã­ÂÂ´Ã«Â¡Â 
4. ÃªÂ²â‚¬Ã¬Â¦ÂÃ«ÂÅ“ ÃªÂµÂ¬Ã¬Â¡Â° Ã«â€šÂ´Ã¬â€”ÂÃ¬â€žÅ“ Ã«Â°ËœÃ«Â³Âµ ÃªÂ°Å“Ã¬â€žÂ 

## Ã«â€â€Ã¬Å¾ÂÃ¬ÂÂ¸ Ã­Å’Â¨Ã­â€žÂ´

### Ã«Â¦Â¬Ã­ÂÂ¬Ã¬Â§â‚¬Ã­â€ Â Ã«Â¦Â¬ Ã­Å’Â¨Ã­â€žÂ´

Ã¬ÂÂ¼ÃªÂ´â‚¬Ã«ÂÅ“ Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤ Ã«â€™Â¤Ã¬â€”Â Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬Â â€˜ÃªÂ·Â¼Ã¬Ââ€ž Ã¬ÂºÂ¡Ã¬Å ÂÃ­â„¢â€:
- Ã­â€˜Å“Ã¬Â¤â‚¬ Ã¬Å¾â€˜Ã¬â€”â€¦ Ã¬Â â€¢Ã¬ÂËœ: findAll, findById, create, update, delete
- ÃªÂµÂ¬Ã¬Â²Â´Ã¬Â Â ÃªÂµÂ¬Ã­Ëœâ€žÃ¬ÂÂ´ Ã¬Â â‚¬Ã¬Å¾Â¥Ã¬â€ Å’ Ã¬â€žÂ¸Ã«Â¶â‚¬Ã¬â€šÂ¬Ã­â€¢Â­ Ã¬Â²ËœÃ«Â¦Â¬ (Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤, API, Ã­Å’Å’Ã¬ÂÂ¼ Ã«â€œÂ±)
- Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§ÂÃ¬Ââ‚¬ Ã¬Â â‚¬Ã¬Å¾Â¥Ã¬â€ Å’ Ã«Â©â€Ã¬Â»Â¤Ã«â€¹Ë†Ã¬Â¦ËœÃ¬ÂÂ´ Ã¬â€¢â€žÃ«â€¹Å’ Ã¬Â¶â€Ã¬Æ’Â Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤Ã¬â€”Â Ã¬ÂËœÃ¬Â¡Â´
- Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬â€ Å’Ã¬Å Â¤Ã¬ÂËœ Ã¬â€°Â¬Ã¬Å¡Â´ ÃªÂµÂÃ¬Â²Â´ Ã«Â°Â Ã«ÂªÂ¨Ã­â€šÂ¹Ã¬Ââ€ž Ã­â€ ÂµÃ­â€¢Å“ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«â€¹Â¨Ã¬Ë†Å“Ã­â„¢â€ ÃªÂ°â‚¬Ã«Å Â¥

### API Ã¬Ââ€˜Ã«â€¹Âµ Ã­Ëœâ€¢Ã¬â€¹Â

Ã«ÂªÂ¨Ã«â€œÂ  API Ã¬Ââ€˜Ã«â€¹ÂµÃ¬â€”Â Ã¬ÂÂ¼ÃªÂ´â‚¬Ã«ÂÅ“ Ã¬â€”â€Ã«Â²Â¨Ã«Â¡Å“Ã­â€â€ž Ã¬â€šÂ¬Ã¬Å¡Â©:
- Ã¬â€žÂ±ÃªÂ³Âµ/Ã¬Æ’ÂÃ­Æ’Å“ Ã­â€˜Å“Ã¬â€¹Å“Ã¬Å¾Â Ã­ÂÂ¬Ã­â€¢Â¨
- Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã­Å½ËœÃ¬ÂÂ´Ã«Â¡Å“Ã«â€œÅ“ Ã­ÂÂ¬Ã­â€¢Â¨ (Ã¬â€”ÂÃ«Å¸Â¬ Ã¬â€¹Å“ null)
- Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â©â€Ã¬â€¹Å“Ã¬Â§â‚¬ Ã­â€¢â€žÃ«â€œÅ“ Ã­ÂÂ¬Ã­â€¢Â¨ (Ã¬â€žÂ±ÃªÂ³Âµ Ã¬â€¹Å“ null)
- Ã­Å½ËœÃ¬ÂÂ´Ã¬Â§â‚¬Ã«â€žÂ¤Ã¬ÂÂ´Ã¬â€¦Ëœ Ã¬Ââ€˜Ã«â€¹ÂµÃ¬â€”Â Ã«Â©â€Ã­Æ’â‚¬Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã­ÂÂ¬Ã­â€¢Â¨ (total, page, limit)
