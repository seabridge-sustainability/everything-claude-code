# Ã¬Â½â€Ã«â€Â© Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼

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


## Ã«Â¶Ë†Ã«Â³â‚¬Ã¬â€žÂ± (Ã¬Â¤â€˜Ã¬Å¡â€)

Ã­â€¢Â­Ã¬Æ’Â Ã¬Æ’Ë† ÃªÂ°ÂÃ¬Â²Â´Ã«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢ËœÃªÂ³Â , ÃªÂ¸Â°Ã¬Â¡Â´ ÃªÂ°ÂÃ¬Â²Â´Ã«Â¥Â¼ Ã¬Â Ë†Ã«Å’â‚¬ Ã«Â³â‚¬ÃªÂ²Â½Ã­â€¢ËœÃ¬Â§â‚¬ Ã«Â§Ë†Ã¬â€žÂ¸Ã¬Å¡â€:

```
// Ã¬ÂËœÃ¬â€šÂ¬ Ã¬Â½â€Ã«â€œÅ“
Ã¬Å¾ËœÃ«ÂªÂ»Ã«ÂÅ“ Ã¬ËœË†:  modify(original, field, value) Ã¢â€ â€™ Ã¬â€ºÂÃ«Â³Â¸Ã¬Ââ€ž Ã¬Â§ÂÃ¬Â â€˜ Ã«Â³â‚¬ÃªÂ²Â½
Ã¬ËœÂ¬Ã«Â°â€Ã«Â¥Â¸ Ã¬ËœË†: update(original, field, value) Ã¢â€ â€™ Ã«Â³â‚¬ÃªÂ²Â½ Ã¬â€šÂ¬Ã­â€¢Â­Ã¬ÂÂ´ Ã«Â°ËœÃ¬ËœÂÃ«ÂÅ“ Ã¬Æ’Ë† Ã«Â³ÂµÃ¬â€šÂ¬Ã«Â³Â¸ Ã«Â°ËœÃ­â„¢Ëœ
```

ÃªÂ·Â¼ÃªÂ±Â°: Ã«Â¶Ë†Ã«Â³â‚¬ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Å â€ Ã¬Ë†Â¨ÃªÂ²Â¨Ã¬Â§â€ž Ã¬â€šÂ¬Ã¬ÂÂ´Ã«â€œÅ“ Ã¬ÂÂ´Ã­Å½â„¢Ã­Å Â¸Ã«Â¥Â¼ Ã«Â°Â©Ã¬Â§â‚¬Ã­â€¢ËœÃªÂ³Â , Ã«â€â€Ã«Â²â€žÃªÂ¹â€¦Ã¬Ââ€ž Ã¬â€°Â½ÃªÂ²Å’ Ã­â€¢ËœÃ«Â©Â°, Ã¬â€¢Ë†Ã¬Â â€žÃ­â€¢Å“ Ã«Ââ„¢Ã¬â€¹Å“Ã¬â€žÂ±Ã¬Ââ€ž ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢ËœÃªÂ²Å’ Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã­Å’Å’Ã¬ÂÂ¼ ÃªÂµÂ¬Ã¬â€žÂ±

Ã«Â§Å½Ã¬Ââ‚¬ Ã¬Å¾â€˜Ã¬Ââ‚¬ Ã­Å’Å’Ã¬ÂÂ¼ > Ã¬Â ÂÃ¬Ââ‚¬ Ã­ÂÂ° Ã­Å’Å’Ã¬ÂÂ¼:
- Ã«â€ â€™Ã¬Ââ‚¬ Ã¬Ââ€˜Ã¬Â§â€˜Ã«Ââ€ž, Ã«â€šÂ®Ã¬Ââ‚¬ ÃªÂ²Â°Ã­â€¢Â©Ã«Ââ€ž
- 200-400Ã¬Â¤â€žÃ¬ÂÂ´ Ã¬ÂÂ¼Ã«Â°ËœÃ¬Â Â, Ã¬ÂµÅ“Ã«Å’â‚¬ 800Ã¬Â¤â€ž
- Ã­ÂÂ° Ã«ÂªÂ¨Ã«â€œË†Ã¬â€”ÂÃ¬â€žÅ“ Ã¬Å“Â Ã­â€¹Â¸Ã«Â¦Â¬Ã­â€¹Â°Ã«Â¥Â¼ Ã«Â¶â€žÃ«Â¦Â¬
- Ã­Æ’â‚¬Ã¬Å¾â€¦Ã¬ÂÂ´ Ã¬â€¢â€žÃ«â€¹Å’ ÃªÂ¸Â°Ã«Å Â¥/Ã«Ââ€žÃ«Â©â€Ã¬ÂÂ¸Ã«Â³â€žÃ«Â¡Å“ ÃªÂµÂ¬Ã¬â€žÂ±

## Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Â²ËœÃ«Â¦Â¬

Ã­â€¢Â­Ã¬Æ’Â Ã¬â€”ÂÃ«Å¸Â¬Ã«Â¥Â¼ Ã­ÂÂ¬ÃªÂ´â€žÃ¬Â ÂÃ¬Å“Â¼Ã«Â¡Å“ Ã¬Â²ËœÃ«Â¦Â¬:
- Ã«ÂªÂ¨Ã«â€œÂ  Ã«Â Ë†Ã«Â²Â¨Ã¬â€”ÂÃ¬â€žÅ“ Ã¬â€”ÂÃ«Å¸Â¬Ã«Â¥Â¼ Ã«Âªâ€¦Ã¬â€¹Å“Ã¬Â ÂÃ¬Å“Â¼Ã«Â¡Å“ Ã¬Â²ËœÃ«Â¦Â¬
- UI Ã¬Â½â€Ã«â€œÅ“Ã¬â€”ÂÃ¬â€žÅ“Ã«Å â€ Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã¬Â¹Å“Ã­â„¢â€Ã¬Â ÂÃ¬ÂÂ¸ Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â©â€Ã¬â€¹Å“Ã¬Â§â‚¬ Ã¬Â Å“ÃªÂ³Âµ
- Ã¬â€žÅ“Ã«Â²â€ž Ã¬Â¸Â¡Ã¬â€”ÂÃ¬â€žÅ“Ã«Å â€ Ã¬Æ’ÂÃ¬â€žÂ¸Ã­â€¢Å“ Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸ Ã«Â¡Å“ÃªÂ¹â€¦
- Ã¬â€”ÂÃ«Å¸Â¬Ã«Â¥Â¼ Ã¬Â Ë†Ã«Å’â‚¬ Ã¬Â¡Â°Ã¬Å¡Â©Ã­Å¾Ë† Ã«Â¬Â´Ã¬â€¹Å“Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â°

## Ã¬Å¾â€¦Ã«Â Â¥ Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬Â¦Â

Ã­â€¢Â­Ã¬Æ’Â Ã¬â€¹Å“Ã¬Å Â¤Ã­â€¦Å“ ÃªÂ²Â½ÃªÂ³â€žÃ¬â€”ÂÃ¬â€žÅ“ Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬Â¦Â:
- Ã¬Â²ËœÃ«Â¦Â¬ Ã¬Â â€žÃ¬â€”Â Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã¬Å¾â€¦Ã«Â Â¥Ã¬Ââ€ž ÃªÂ²â‚¬Ã¬Â¦Â
- ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ ÃªÂ²Â½Ã¬Å¡Â° Ã¬Å Â¤Ã­â€šÂ¤Ã«Â§Ë† ÃªÂ¸Â°Ã«Â°Ëœ Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬Â¦Â Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã«Âªâ€¦Ã­â„¢â€¢Ã­â€¢Å“ Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â©â€Ã¬â€¹Å“Ã¬Â§â‚¬Ã¬â„¢â‚¬ Ã­â€¢Â¨ÃªÂ»Ëœ Ã«Â¹Â Ã«Â¥Â´ÃªÂ²Å’ Ã¬â€¹Â¤Ã­Å’Â¨
- Ã¬â„¢Â¸Ã«Â¶â‚¬ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â¥Â¼ Ã¬Â Ë†Ã«Å’â‚¬ Ã¬â€¹Â Ã«Â¢Â°Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â° (API Ã¬Ââ€˜Ã«â€¹Âµ, Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã¬Å¾â€¦Ã«Â Â¥, Ã­Å’Å’Ã¬ÂÂ¼ Ã«â€šÂ´Ã¬Å¡Â©)

## Ã¬Â½â€Ã«â€œÅ“ Ã­â€™Ë†Ã¬Â§Ë† Ã¬Â²Â´Ã­ÂÂ¬Ã«Â¦Â¬Ã¬Å Â¤Ã­Å Â¸

Ã¬Å¾â€˜Ã¬â€”â€¦ Ã¬â„¢â€žÃ«Â£Å’ Ã¬Â â€ž Ã­â„¢â€¢Ã¬ÂÂ¸:
- [ ] Ã¬Â½â€Ã«â€œÅ“ÃªÂ°â‚¬ Ã¬ÂÂ½ÃªÂ¸Â° Ã¬â€°Â½ÃªÂ³Â  Ã¬ÂÂ´Ã«Â¦â€žÃ¬ÂÂ´ Ã¬Â ÂÃ¬Â Ë†Ã­â€¢Å“ÃªÂ°â‚¬
- [ ] Ã­â€¢Â¨Ã¬Ë†ËœÃªÂ°â‚¬ Ã¬Å¾â€˜Ã¬Ââ‚¬ÃªÂ°â‚¬ (<50Ã¬Â¤â€ž)
- [ ] Ã­Å’Å’Ã¬ÂÂ¼Ã¬ÂÂ´ Ã¬Â§â€˜Ã¬Â¤â€˜Ã¬Â ÂÃ¬ÂÂ¸ÃªÂ°â‚¬ (<800Ã¬Â¤â€ž)
- [ ] ÃªÂ¹Å Ã¬Ââ‚¬ Ã¬Â¤â€˜Ã¬Â²Â©Ã¬ÂÂ´ Ã¬â€”â€ Ã«Å â€ÃªÂ°â‚¬ (>4Ã«â€¹Â¨ÃªÂ³â€ž)
- [ ] Ã¬Â ÂÃ¬Â Ë†Ã­â€¢Å“ Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Â²ËœÃ«Â¦Â¬ÃªÂ°â‚¬ Ã«ÂËœÃ¬â€“Â´ Ã¬Å¾Ë†Ã«Å â€ÃªÂ°â‚¬
- [ ] Ã­â€¢ËœÃ«â€œÅ“Ã¬Â½â€Ã«â€Â©Ã«ÂÅ“ ÃªÂ°â€™Ã¬ÂÂ´ Ã¬â€”â€ Ã«Å â€ÃªÂ°â‚¬ (Ã¬Æ’ÂÃ¬Ë†ËœÃ«â€šËœ Ã¬â€žÂ¤Ã¬Â â€¢ Ã¬â€šÂ¬Ã¬Å¡Â©)
- [ ] Ã«Â³â‚¬Ã¬ÂÂ´ÃªÂ°â‚¬ Ã¬â€”â€ Ã«Å â€ÃªÂ°â‚¬ (Ã«Â¶Ë†Ã«Â³â‚¬ Ã­Å’Â¨Ã­â€žÂ´ Ã¬â€šÂ¬Ã¬Å¡Â©)
