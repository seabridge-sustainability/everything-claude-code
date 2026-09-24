# Ã­â€¦Å’Ã¬Å Â¤Ã­Å’â€¦ Ã¬Å¡â€ÃªÂµÂ¬Ã¬â€šÂ¬Ã­â€¢Â­

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


## Ã¬ÂµÅ“Ã¬â€ Å’ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬: 80%

Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Å“Â Ã­Ëœâ€¢ (Ã«ÂªÂ¨Ã«â€˜Â Ã­â€¢â€žÃ¬Ë†Ëœ):
1. **Ã«â€¹Â¨Ã¬Å“â€ž Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸** - ÃªÂ°Å“Ã«Â³â€ž Ã­â€¢Â¨Ã¬Ë†Ëœ, Ã¬Å“Â Ã­â€¹Â¸Ã«Â¦Â¬Ã­â€¹Â°, Ã¬Â»Â´Ã­ÂÂ¬Ã«â€žÅ’Ã­Å Â¸
2. **Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸** - API Ã¬â€”â€Ã«â€œÅ“Ã­ÂÂ¬Ã¬ÂÂ¸Ã­Å Â¸, Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Å¾â€˜Ã¬â€”â€¦
3. **E2E Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸** - Ã­â€¢ÂµÃ¬â€¹Â¬ Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã­ÂÂÃ«Â¦â€ž (Ã¬â€“Â¸Ã¬â€“Â´Ã«Â³â€ž Ã­â€â€žÃ«Â Ë†Ã¬Å¾â€žÃ¬â€ºÅ’Ã­ÂÂ¬ Ã¬â€žÂ Ã­Æ’Â)

## Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â£Â¼Ã«Ââ€ž ÃªÂ°Å“Ã«Â°Å“

Ã­â€¢â€žÃ¬Ë†Ëœ Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°:
1. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬Å¾â€˜Ã¬â€žÂ± (RED)
2. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€° - Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢Â´Ã¬â€¢Â¼ Ã­â€¢Â¨
3. Ã¬ÂµÅ“Ã¬â€ Å’Ã­â€¢Å“Ã¬ÂËœ ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬Å¾â€˜Ã¬â€žÂ± (GREEN)
4. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€° - Ã­â€ ÂµÃªÂ³Â¼Ã­â€¢Â´Ã¬â€¢Â¼ Ã­â€¢Â¨
5. Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â (IMPROVE)
6. Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸ (80% Ã¬ÂÂ´Ã¬Æ’Â)

## Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­Å’Â¨ Ã«Â¬Â¸Ã¬Â Å“ Ã­â€¢Â´ÃªÂ²Â°

1. **tdd-guide** Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬â€šÂ¬Ã¬Å¡Â©
2. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ ÃªÂ²Â©Ã«Â¦Â¬ Ã­â„¢â€¢Ã¬ÂÂ¸
3. Ã«ÂªÂ¨Ã­â€šÂ¹Ã¬ÂÂ´ Ã¬ËœÂ¬Ã«Â°â€Ã«Â¥Â¸Ã¬Â§â‚¬ ÃªÂ²â‚¬Ã¬Â¦Â
4. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ÃªÂ°â‚¬ Ã¬â€¢â€žÃ«â€¹Å’ ÃªÂµÂ¬Ã­Ëœâ€žÃ¬Ââ€ž Ã¬Ë†ËœÃ¬Â â€¢ (Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ÃªÂ°â‚¬ Ã¬Å¾ËœÃ«ÂªÂ»Ã«ÂÅ“ ÃªÂ²Â½Ã¬Å¡Â° Ã¬Â Å“Ã¬â„¢Â¸)

## Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸ Ã¬Â§â‚¬Ã¬â€ºÂ

- **tdd-guide** - Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥Ã¬â€”Â Ã¬Â ÂÃªÂ·Â¹Ã¬Â ÂÃ¬Å“Â¼Ã«Â¡Å“ Ã¬â€šÂ¬Ã¬Å¡Â©, Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬Å¾â€˜Ã¬â€žÂ±Ã¬Ââ€ž ÃªÂ°â€¢Ã¬Â Å“
