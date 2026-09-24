# Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â°

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


Ã¬Â»Â¤Ã«Â°â€¹Ã«ÂËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬Ââ‚¬ Ã«Â³â‚¬ÃªÂ²Â½Ã¬â€šÂ¬Ã­â€¢Â­Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã­ÂÂ¬ÃªÂ´â€žÃ¬Â ÂÃ¬ÂÂ¸ Ã«Â³Â´Ã¬â€¢Ë† Ã«Â°Â Ã­â€™Ë†Ã¬Â§Ë† Ã«Â¦Â¬Ã«Â·Â°Ã«Â¥Â¼ Ã¬Ë†ËœÃ­â€“â€°Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

1. Ã«Â³â‚¬ÃªÂ²Â½Ã«ÂÅ“ Ã­Å’Å’Ã¬ÂÂ¼ Ã«ÂªÂ©Ã«Â¡Â Ã¬Â¡Â°Ã­Å¡Å’: git diff --name-only HEAD

2. ÃªÂ°Â Ã«Â³â‚¬ÃªÂ²Â½Ã«ÂÅ“ Ã­Å’Å’Ã¬ÂÂ¼Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Â´ Ã«â€¹Â¤Ã¬ÂÅ’Ã¬Ââ€ž ÃªÂ²â‚¬Ã¬â€šÂ¬Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

**Ã«Â³Â´Ã¬â€¢Ë† Ã¬ÂÂ´Ã¬Å Ë† (CRITICAL):**
- Ã­â€¢ËœÃ«â€œÅ“Ã¬Â½â€Ã«â€Â©Ã«ÂÅ“ Ã¬ÂÂ¸Ã¬Â¦Â Ã¬Â â€¢Ã«Â³Â´, API Ã­â€šÂ¤, Ã­â€ Â Ã­ÂÂ°
- SQL Ã¬ÂÂ¸Ã¬Â ÂÃ¬â€¦Ëœ Ã¬Â·Â¨Ã¬â€¢Â½Ã¬Â Â
- XSS Ã¬Â·Â¨Ã¬â€¢Â½Ã¬Â Â
- Ã«Ë†â€žÃ«ÂÂ½Ã«ÂÅ“ Ã¬Å¾â€¦Ã«Â Â¥ Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬â€šÂ¬
- Ã¬â€¢Ë†Ã¬Â â€žÃ­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬Ââ‚¬ Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ±
- ÃªÂ²Â½Ã«Â¡Å“ Ã­Æ’ÂÃ¬Æ’â€°(Path Traversal) Ã¬Å“â€žÃ­â€”Ëœ

**Ã¬Â½â€Ã«â€œÅ“ Ã­â€™Ë†Ã¬Â§Ë† (HIGH):**
- 50Ã¬Â¤â€ž Ã¬Â´Ë†ÃªÂ³Â¼ Ã­â€¢Â¨Ã¬Ë†Ëœ
- 800Ã¬Â¤â€ž Ã¬Â´Ë†ÃªÂ³Â¼ Ã­Å’Å’Ã¬ÂÂ¼
- 4Ã«â€¹Â¨ÃªÂ³â€ž Ã¬Â´Ë†ÃªÂ³Â¼ Ã¬Â¤â€˜Ã¬Â²Â© ÃªÂ¹Å Ã¬ÂÂ´
- Ã«Ë†â€žÃ«ÂÂ½Ã«ÂÅ“ Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Â²ËœÃ«Â¦Â¬
- Ã«â€â€Ã«Â²â€žÃªÂ·Â¸ Ã«Â¡Å“ÃªÂ¹â€¦ Ã«Â¬Â¸ÃªÂµÂ¬(Ã¬ËœË†: ÃªÂ°Å“Ã«Â°Å“Ã¬Å¡Â© Ã«Â¡Å“ÃªÂ·Â¸/print Ã«â€œÂ±)
- TODO/FIXME Ã¬Â£Â¼Ã¬â€žÂ
- Ã­â„¢Å“Ã¬â€žÂ± Ã¬â€“Â¸Ã¬â€“Â´Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ ÃªÂ³ÂµÃªÂ°Å“ API Ã«Â¬Â¸Ã¬â€žÅ“ Ã«Ë†â€žÃ«ÂÂ½(Ã¬ËœË†: JSDoc/Go doc/Docstring Ã«â€œÂ±)

**Ã«ÂªÂ¨Ã«Â²â€ Ã¬â€šÂ¬Ã«Â¡â‚¬ (MEDIUM):**
- Ã«Â³â‚¬Ã¬ÂÂ´(Mutation) Ã­Å’Â¨Ã­â€žÂ´ (Ã«Â¶Ë†Ã«Â³â‚¬ Ã­Å’Â¨Ã­â€žÂ´Ã¬Ââ€ž Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€)
- Ã¬Â½â€Ã«â€œÅ“/Ã¬Â£Â¼Ã¬â€žÂÃ¬ÂËœ Ã¬ÂÂ´Ã«ÂªÂ¨Ã¬Â§â‚¬ Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã¬Æ’Ë† Ã¬Â½â€Ã«â€œÅ“Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«Ë†â€žÃ«ÂÂ½
- Ã¬Â â€˜ÃªÂ·Â¼Ã¬â€žÂ±(a11y) Ã«Â¬Â¸Ã¬Â Å“

3. Ã«â€¹Â¤Ã¬ÂÅ’Ã¬Ââ€ž Ã­ÂÂ¬Ã­â€¢Â¨Ã­â€¢Å“ Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“Ã«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:
   - Ã¬â€¹Â¬ÃªÂ°ÂÃ«Ââ€ž: CRITICAL, HIGH, MEDIUM, LOW
   - Ã­Å’Å’Ã¬ÂÂ¼ Ã¬Å“â€žÃ¬Â¹Ëœ Ã«Â°Â Ã¬Â¤â€ž Ã«Â²Ë†Ã­ËœÂ¸
   - Ã¬ÂÂ´Ã¬Å Ë† Ã¬â€žÂ¤Ã«Âªâ€¦
   - Ã¬Ë†ËœÃ¬Â â€¢ Ã¬Â Å“Ã¬â€¢Ë†

4. CRITICAL Ã«ËœÂÃ«Å â€ HIGH Ã¬ÂÂ´Ã¬Å Ë†ÃªÂ°â‚¬ Ã«Â°Å“ÃªÂ²Â¬Ã«ÂËœÃ«Â©Â´ commitÃ¬Ââ€ž Ã¬Â°Â¨Ã«â€¹Â¨Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤

Ã«Â³Â´Ã¬â€¢Ë† Ã¬Â·Â¨Ã¬â€¢Â½Ã¬Â ÂÃ¬ÂÂ´ Ã¬Å¾Ë†Ã«Å â€ Ã¬Â½â€Ã«â€œÅ“Ã«Å â€ Ã¬Â Ë†Ã«Å’â‚¬ Ã¬Å Â¹Ã¬ÂÂ¸Ã­â€¢ËœÃ¬Â§â‚¬ Ã«Â§Ë†Ã¬â€žÂ¸Ã¬Å¡â€!
