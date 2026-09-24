# Ã«Â³Â´Ã¬â€¢Ë† ÃªÂ°â‚¬Ã¬ÂÂ´Ã«â€œÅ“Ã«ÂÂ¼Ã¬ÂÂ¸

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


## Ã­â€¢â€žÃ¬Ë†Ëœ Ã«Â³Â´Ã¬â€¢Ë† Ã¬Â ÂÃªÂ²â‚¬

Ã«ÂªÂ¨Ã«â€œÂ  Ã¬Â»Â¤Ã«Â°â€¹ Ã¬Â â€ž:
- [ ] Ã­â€¢ËœÃ«â€œÅ“Ã¬Â½â€Ã«â€Â©Ã«ÂÅ“ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿Ã¬ÂÂ´ Ã¬â€”â€ Ã«Å â€ÃªÂ°â‚¬ (API Ã­â€šÂ¤, Ã«Â¹â€žÃ«Â°â‚¬Ã«Â²Ë†Ã­ËœÂ¸, Ã­â€ Â Ã­ÂÂ°)
- [ ] Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã¬Å¾â€¦Ã«Â Â¥Ã¬ÂÂ´ ÃªÂ²â‚¬Ã¬Â¦ÂÃ«ÂËœÃ¬â€”Ë†Ã«Å â€ÃªÂ°â‚¬
- [ ] SQL Ã¬ÂÂ¸Ã¬Â ÂÃ¬â€¦Ëœ Ã«Â°Â©Ã¬Â§â‚¬ÃªÂ°â‚¬ Ã«ÂËœÃ¬â€”Ë†Ã«Å â€ÃªÂ°â‚¬ (Ã«Â§Â¤ÃªÂ°Å“Ã«Â³â‚¬Ã¬Ë†ËœÃ­â„¢â€Ã«ÂÅ“ Ã¬Â¿Â¼Ã«Â¦Â¬)
- [ ] XSS Ã«Â°Â©Ã¬Â§â‚¬ÃªÂ°â‚¬ Ã«ÂËœÃ¬â€”Ë†Ã«Å â€ÃªÂ°â‚¬ (HTML Ã¬Æ’Ë†Ã«â€¹Ë†Ã­Æ’â‚¬Ã¬ÂÂ´Ã¬Â§â€¢)
- [ ] CSRF Ã«Â³Â´Ã­ËœÂ¸ÃªÂ°â‚¬ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂËœÃ¬â€”Ë†Ã«Å â€ÃªÂ°â‚¬
- [ ] Ã¬ÂÂ¸Ã¬Â¦Â/Ã¬ÂÂ¸ÃªÂ°â‚¬ÃªÂ°â‚¬ ÃªÂ²â‚¬Ã¬Â¦ÂÃ«ÂËœÃ¬â€”Ë†Ã«Å â€ÃªÂ°â‚¬
- [ ] Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€”â€Ã«â€œÅ“Ã­ÂÂ¬Ã¬ÂÂ¸Ã­Å Â¸Ã¬â€”Â Ã¬â€ ÂÃ«Ââ€ž Ã¬Â Å“Ã­â€¢Å“Ã¬ÂÂ´ Ã¬Å¾Ë†Ã«Å â€ÃªÂ°â‚¬
- [ ] Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â©â€Ã¬â€¹Å“Ã¬Â§â‚¬ÃªÂ°â‚¬ Ã«Â¯Â¼ÃªÂ°ÂÃ­â€¢Å“ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â¥Â¼ Ã«â€¦Â¸Ã¬Â¶Å“Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã«Å â€ÃªÂ°â‚¬

## Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ ÃªÂ´â‚¬Ã«Â¦Â¬

- Ã¬â€ Å’Ã¬Å Â¤ Ã¬Â½â€Ã«â€œÅ“Ã¬â€”Â Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿Ã¬Ââ€ž Ã¬Â Ë†Ã«Å’â‚¬ Ã­â€¢ËœÃ«â€œÅ“Ã¬Â½â€Ã«â€Â©Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â°
- Ã­â€¢Â­Ã¬Æ’Â Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†ËœÃ«â€šËœ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬ Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã¬â€¹Å“Ã¬Å¾â€˜ Ã¬â€¹Å“ Ã­â€¢â€žÃ¬Å¡â€Ã­â€¢Å“ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿Ã¬ÂÂ´ Ã¬Â¡Â´Ã¬Å¾Â¬Ã­â€¢ËœÃ«Å â€Ã¬Â§â‚¬ ÃªÂ²â‚¬Ã¬Â¦Â
- Ã«â€¦Â¸Ã¬Â¶Å“Ã«ÂËœÃ¬â€”Ë†Ã¬Ââ€ž Ã¬Ë†Ëœ Ã¬Å¾Ë†Ã«Å â€ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿Ã¬Ââ‚¬ ÃªÂµÂÃ¬Â²Â´

## Ã«Â³Â´Ã¬â€¢Ë† Ã«Å’â‚¬Ã¬Ââ€˜ Ã­â€â€žÃ«Â¡Å“Ã­â€ Â Ã¬Â½Å“

Ã«Â³Â´Ã¬â€¢Ë† Ã¬ÂÂ´Ã¬Å Ë† Ã«Â°Å“ÃªÂ²Â¬ Ã¬â€¹Å“:
1. Ã¬Â¦â€°Ã¬â€¹Å“ Ã¬Â¤â€˜Ã«â€¹Â¨
2. **security-reviewer** Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬â€šÂ¬Ã¬Å¡Â©
3. ÃªÂ³â€žÃ¬â€ Â Ã¬Â§â€žÃ­â€“â€°Ã­â€¢ËœÃªÂ¸Â° Ã¬Â â€žÃ¬â€”Â Ã¬Â¹ËœÃ«Âªâ€¦Ã¬Â Â Ã¬ÂÂ´Ã¬Å Ë† Ã¬Ë†ËœÃ¬Â â€¢
4. Ã«â€¦Â¸Ã¬Â¶Å“Ã«ÂÅ“ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ ÃªÂµÂÃ¬Â²Â´
5. Ã¬Å“Â Ã¬â€šÂ¬Ã­â€¢Å“ Ã¬ÂÂ´Ã¬Å Ë†ÃªÂ°â‚¬ Ã¬Å¾Ë†Ã«Å â€Ã¬Â§â‚¬ Ã¬Â â€žÃ¬Â²Â´ Ã¬Â½â€Ã«â€œÅ“Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ ÃªÂ²â‚¬Ã­â€ Â 
