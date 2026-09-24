# Ã­â€ºâ€¦ Ã¬â€¹Å“Ã¬Å Â¤Ã­â€¦Å“

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


## Ã­â€ºâ€¦ Ã¬Å“Â Ã­Ëœâ€¢

- **PreToolUse**: Ã«Ââ€žÃªÂµÂ¬ Ã¬â€¹Â¤Ã­â€“â€° Ã¬Â â€ž (Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬Â¦Â, Ã«Â§Â¤ÃªÂ°Å“Ã«Â³â‚¬Ã¬Ë†Ëœ Ã¬Ë†ËœÃ¬Â â€¢)
- **PostToolUse**: Ã«Ââ€žÃªÂµÂ¬ Ã¬â€¹Â¤Ã­â€“â€° Ã­â€ºâ€ž (Ã¬Å¾ÂÃ«Ââ„¢ Ã­ÂÂ¬Ã«Â§Â·, ÃªÂ²â‚¬Ã¬â€šÂ¬)
- **Stop**: Ã¬â€žÂ¸Ã¬â€¦Ëœ Ã¬Â¢â€¦Ã«Â£Å’ Ã¬â€¹Å“ (Ã¬ÂµÅ“Ã¬Â¢â€¦ ÃªÂ²â‚¬Ã¬Â¦Â)

## Ã¬Å¾ÂÃ«Ââ„¢ Ã¬Ë†ËœÃ«ÂÂ½ ÃªÂ¶Å’Ã­â€¢Å“

Ã¬Â£Â¼Ã¬ÂËœÃ­â€¢ËœÃ¬â€”Â¬ Ã¬â€šÂ¬Ã¬Å¡Â©:
- Ã¬â€¹Â Ã«Â¢Â°Ã­â€¢Â  Ã¬Ë†Ëœ Ã¬Å¾Ë†Ã«Å â€, Ã¬Å¾Ëœ Ã¬Â â€¢Ã¬ÂËœÃ«ÂÅ“ ÃªÂ³â€žÃ­Å¡ÂÃ¬â€”ÂÃ¬â€žÅ“Ã«Â§Å’ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€
- Ã­Æ’ÂÃ¬Æ’â€°Ã¬Â Â Ã¬Å¾â€˜Ã¬â€”â€¦Ã¬â€”ÂÃ¬â€žÅ“Ã«Å â€ Ã«Â¹â€žÃ­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€
- dangerously-skip-permissions Ã­â€Å’Ã«Å¾ËœÃªÂ·Â¸Ã«Â¥Â¼ Ã¬Â Ë†Ã«Å’â‚¬ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â°
- Ã«Å’â‚¬Ã¬â€¹Â  `~/.claude.json`Ã¬â€”ÂÃ¬â€žÅ“ `allowedTools`Ã«Â¥Â¼ Ã¬â€žÂ¤Ã¬Â â€¢

## TodoWrite Ã«ÂªÂ¨Ã«Â²â€ Ã¬â€šÂ¬Ã«Â¡â‚¬

TodoWrite Ã«Ââ€žÃªÂµÂ¬ Ã­â„¢Å“Ã¬Å¡Â©:
- Ã«â€¹Â¤Ã«â€¹Â¨ÃªÂ³â€ž Ã¬Å¾â€˜Ã¬â€”â€¦Ã¬ÂËœ Ã¬Â§â€žÃ­â€“â€° Ã¬Æ’ÂÃ­â„¢Â© Ã¬Â¶â€Ã¬Â Â
- Ã¬Â§â‚¬Ã¬â€¹Å“Ã¬â€šÂ¬Ã­â€¢Â­ Ã¬ÂÂ´Ã­â€¢Â´Ã«Ââ€ž ÃªÂ²â‚¬Ã¬Â¦Â
- Ã¬â€¹Â¤Ã¬â€¹Å“ÃªÂ°â€ž Ã«Â°Â©Ã­â€“Â¥ Ã¬Â¡Â°Ã¬Â â€¢ ÃªÂ°â‚¬Ã«Å Â¥
- Ã¬â€žÂ¸Ã«Â¶â‚¬ ÃªÂµÂ¬Ã­Ëœâ€ž Ã«â€¹Â¨ÃªÂ³â€ž Ã­â€˜Å“Ã¬â€¹Å“

Todo Ã«ÂªÂ©Ã«Â¡ÂÃ¬Å“Â¼Ã«Â¡Å“ Ã­â„¢â€¢Ã¬ÂÂ¸ ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ ÃªÂ²Æ’:
- Ã¬Ë†Å“Ã¬â€žÅ“ÃªÂ°â‚¬ Ã«Â§Å¾Ã¬Â§â‚¬ Ã¬â€¢Å Ã«Å â€ Ã«â€¹Â¨ÃªÂ³â€ž
- Ã«Ë†â€žÃ«ÂÂ½Ã«ÂÅ“ Ã­â€¢Â­Ã«ÂªÂ©
- Ã«Â¶Ë†Ã­â€¢â€žÃ¬Å¡â€Ã­â€¢Å“ Ã¬Â¶â€ÃªÂ°â‚¬ Ã­â€¢Â­Ã«ÂªÂ©
- Ã¬Å¾ËœÃ«ÂªÂ»Ã«ÂÅ“ Ã¬â€žÂ¸Ã«Â¶â€žÃ­â„¢â€ Ã¬Ë†ËœÃ¬Â¤â‚¬
- Ã¬Å¾ËœÃ«ÂªÂ» Ã­â€¢Â´Ã¬â€žÂÃ«ÂÅ“ Ã¬Å¡â€ÃªÂµÂ¬Ã¬â€šÂ¬Ã­â€¢Â­
