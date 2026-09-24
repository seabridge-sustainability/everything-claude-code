# /learn - Ã¬Å¾Â¬Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ Ã­Å’Â¨Ã­â€žÂ´ Ã¬Â¶â€Ã¬Â¶Å“

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


Ã­Ëœâ€žÃ¬Å¾Â¬ Ã¬â€žÂ¸Ã¬â€¦ËœÃ¬Ââ€ž Ã«Â¶â€žÃ¬â€žÂÃ­â€¢ËœÃªÂ³Â  Ã¬Å Â¤Ã­â€šÂ¬Ã«Â¡Å“ Ã¬Â â‚¬Ã¬Å¾Â¥Ã­â€¢Â  ÃªÂ°â‚¬Ã¬Â¹ËœÃªÂ°â‚¬ Ã¬Å¾Ë†Ã«Å â€ Ã­Å’Â¨Ã­â€žÂ´Ã¬Ââ€ž Ã¬Â¶â€Ã¬Â¶Å“Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã­Å Â¸Ã«Â¦Â¬ÃªÂ±Â°

Ã¬â€žÂ¸Ã¬â€¦Ëœ Ã¬Â¤â€˜ Ã¬Â¤â€˜Ã¬Å¡â€Ã­â€¢Å“ Ã«Â¬Â¸Ã¬Â Å“Ã«Â¥Â¼ Ã­â€¢Â´ÃªÂ²Â°Ã­â€“Ë†Ã¬Ââ€ž Ã«â€¢Å’ `/learn`Ã¬Ââ€ž Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬Â¶â€Ã¬Â¶Å“ Ã«Å’â‚¬Ã¬Æ’Â

Ã«â€¹Â¤Ã¬ÂÅ’Ã¬Ââ€ž Ã¬Â°Â¾Ã¬Å ÂµÃ«â€¹Ë†Ã«â€¹Â¤:

1. **Ã¬â€”ÂÃ«Å¸Â¬ Ã­â€¢Â´ÃªÂ²Â° Ã­Å’Â¨Ã­â€žÂ´**
   - Ã¬â€“Â´Ã«â€“Â¤ Ã¬â€”ÂÃ«Å¸Â¬ÃªÂ°â‚¬ Ã«Â°Å“Ã¬Æ’ÂÃ­â€“Ë†Ã«Å â€ÃªÂ°â‚¬?
   - ÃªÂ·Â¼Ã«Â³Â¸ Ã¬â€ºÂÃ¬ÂÂ¸Ã¬Ââ‚¬ Ã«Â¬Â´Ã¬â€”â€¡Ã¬ÂÂ´Ã¬â€”Ë†Ã«Å â€ÃªÂ°â‚¬?
   - Ã«Â¬Â´Ã¬â€”â€¡Ã¬ÂÂ´ Ã­â€¢Â´ÃªÂ²Â°Ã­â€“Ë†Ã«Å â€ÃªÂ°â‚¬?
   - Ã¬Å“Â Ã¬â€šÂ¬Ã­â€¢Å“ Ã¬â€”ÂÃ«Å¸Â¬Ã¬â€”Â Ã¬Å¾Â¬Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ÃªÂ°â‚¬?

2. **Ã«â€â€Ã«Â²â€žÃªÂ¹â€¦ ÃªÂ¸Â°Ã«Â²â€¢**
   - Ã¬Â§ÂÃªÂ´â‚¬Ã¬Â ÂÃ¬ÂÂ´Ã¬Â§â‚¬ Ã¬â€¢Å Ã¬Ââ‚¬ Ã«â€â€Ã«Â²â€žÃªÂ¹â€¦ Ã«â€¹Â¨ÃªÂ³â€ž
   - Ã­Å¡Â¨ÃªÂ³Â¼Ã¬Â ÂÃ¬ÂÂ¸ Ã«Ââ€žÃªÂµÂ¬ Ã¬Â¡Â°Ã­â€¢Â©
   - Ã¬Â§â€žÃ«â€¹Â¨ Ã­Å’Â¨Ã­â€žÂ´

3. **Ã¬Å¡Â°Ã­Å¡Å’ Ã«Â°Â©Ã«Â²â€¢**
   - Ã«ÂÂ¼Ã¬ÂÂ´Ã«Â¸Å’Ã«Å¸Â¬Ã«Â¦Â¬ Ã­Å Â¹Ã¬ÂÂ´ Ã¬â€šÂ¬Ã­â€¢Â­
   - API Ã¬Â Å“Ã­â€¢Å“ Ã¬â€šÂ¬Ã­â€¢Â­
   - Ã«Â²â€žÃ¬Â â€žÃ«Â³â€ž Ã¬Ë†ËœÃ¬Â â€¢ Ã¬â€šÂ¬Ã­â€¢Â­

4. **Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã­Å Â¹Ã­â„¢â€ Ã­Å’Â¨Ã­â€žÂ´**
   - Ã«Â°Å“ÃªÂ²Â¬Ã«ÂÅ“ Ã¬Â½â€Ã«â€œÅ“Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Â»Â¨Ã«Â²Â¤Ã¬â€¦Ëœ
   - Ã«â€šÂ´Ã«Â Â¤Ã¬Â§â€ž Ã¬â€¢â€žÃ­â€šÂ¤Ã­â€¦ÂÃ¬Â²Ëœ ÃªÂ²Â°Ã¬Â â€¢
   - Ã­â€ ÂµÃ­â€¢Â© Ã­Å’Â¨Ã­â€žÂ´

## Ã¬Â¶Å“Ã«Â Â¥ Ã­Ëœâ€¢Ã¬â€¹Â

`~/.claude/skills/learned/[pattern-name].md`Ã¬â€”Â Ã¬Å Â¤Ã­â€šÂ¬ Ã­Å’Å’Ã¬ÂÂ¼Ã¬Ââ€ž Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```markdown
# [Ã¬â€žÂ¤Ã«Âªâ€¦Ã¬Â ÂÃ¬ÂÂ¸ Ã­Å’Â¨Ã­â€žÂ´ Ã¬ÂÂ´Ã«Â¦â€ž]

**Ã¬Â¶â€Ã¬Â¶Å“Ã¬ÂÂ¼:** [Ã«â€šÂ Ã¬Â§Å“]
**Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸:** [Ã¬ÂÂ´ Ã­Å’Â¨Ã­â€žÂ´Ã¬ÂÂ´ Ã¬Â ÂÃ¬Å¡Â©Ã«ÂËœÃ«Å â€ Ã¬Æ’ÂÃ­â„¢Â©Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ ÃªÂ°â€žÃ«Å¾ÂµÃ­â€¢Å“ Ã¬â€žÂ¤Ã«Âªâ€¦]

## Ã«Â¬Â¸Ã¬Â Å“
[Ã¬ÂÂ´ Ã­Å’Â¨Ã­â€žÂ´Ã¬ÂÂ´ Ã­â€¢Â´ÃªÂ²Â°Ã­â€¢ËœÃ«Å â€ Ã«Â¬Â¸Ã¬Â Å“ - ÃªÂµÂ¬Ã¬Â²Â´Ã¬Â ÂÃ¬Å“Â¼Ã«Â¡Å“ Ã¬Å¾â€˜Ã¬â€žÂ±]

## Ã­â€¢Â´ÃªÂ²Â° Ã«Â°Â©Ã«Â²â€¢
[Ã­Å’Â¨Ã­â€žÂ´/ÃªÂ¸Â°Ã«Â²â€¢/Ã¬Å¡Â°Ã­Å¡Å’ Ã«Â°Â©Ã«Â²â€¢]

## Ã¬ËœË†Ã¬â€¹Å“
[Ã­â€¢Â´Ã«â€¹Â¹Ã­â€¢ËœÃ«Å â€ ÃªÂ²Â½Ã¬Å¡Â° Ã¬Â½â€Ã«â€œÅ“ Ã¬ËœË†Ã¬â€¹Å“]

## Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬â€¹Å“Ã¬Â Â
[Ã­Å Â¸Ã«Â¦Â¬ÃªÂ±Â° Ã¬Â¡Â°ÃªÂ±Â´ - Ã¬ÂÂ´ Ã¬Å Â¤Ã­â€šÂ¬Ã¬ÂÂ´ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂËœÃ¬â€“Â´Ã¬â€¢Â¼ Ã­â€¢ËœÃ«Å â€ Ã¬Æ’ÂÃ­â„¢Â©]
```

## Ã­â€â€žÃ«Â¡Å“Ã¬â€žÂ¸Ã¬Å Â¤

1. Ã¬â€žÂ¸Ã¬â€¦ËœÃ¬â€”ÂÃ¬â€žÅ“ Ã¬Â¶â€Ã¬Â¶Å“ ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ Ã­Å’Â¨Ã­â€žÂ´ ÃªÂ²â‚¬Ã­â€ Â 
2. ÃªÂ°â‚¬Ã¬Å¾Â¥ ÃªÂ°â‚¬Ã¬Â¹Ëœ Ã¬Å¾Ë†ÃªÂ³Â  Ã¬Å¾Â¬Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ Ã¬ÂÂ¸Ã¬â€šÂ¬Ã¬ÂÂ´Ã­Å Â¸ Ã¬â€¹ÂÃ«Â³â€ž
3. Ã¬Å Â¤Ã­â€šÂ¬ Ã­Å’Å’Ã¬ÂÂ¼ Ã¬Â´Ë†Ã¬â€¢Ë† Ã¬Å¾â€˜Ã¬â€žÂ±
4. Ã¬Â â‚¬Ã¬Å¾Â¥ Ã¬Â â€ž Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã­â„¢â€¢Ã¬ÂÂ¸ Ã¬Å¡â€Ã¬Â²Â­
5. `~/.claude/skills/learned/`Ã¬â€”Â Ã¬Â â‚¬Ã¬Å¾Â¥

## Ã¬Â°Â¸ÃªÂ³Â  Ã¬â€šÂ¬Ã­â€¢Â­

- Ã¬â€šÂ¬Ã¬â€ Å’Ã­â€¢Å“ Ã¬Ë†ËœÃ¬Â â€¢Ã¬Ââ‚¬ Ã¬Â¶â€Ã¬Â¶Å“Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â° (Ã¬ËœÂ¤Ã­Æ’â‚¬, Ã«â€¹Â¨Ã¬Ë†Å“ ÃªÂµÂ¬Ã«Â¬Â¸ Ã¬â€”ÂÃ«Å¸Â¬)
- Ã¬ÂÂ¼Ã­Å¡Å’Ã¬â€žÂ± Ã¬ÂÂ´Ã¬Å Ë†Ã«Å â€ Ã¬Â¶â€Ã¬Â¶Å“Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â° (Ã­Å Â¹Ã¬Â â€¢ API Ã¬Å¾Â¥Ã¬â€¢Â  Ã«â€œÂ±)
- Ã­â€“Â¥Ã­â€ºâ€ž Ã¬â€žÂ¸Ã¬â€¦ËœÃ¬â€”ÂÃ¬â€žÅ“ Ã¬â€¹Å“ÃªÂ°â€žÃ¬Ââ€ž Ã¬Â Ë†Ã¬â€¢Â½Ã­â€¢Â  Ã¬Ë†Ëœ Ã¬Å¾Ë†Ã«Å â€ Ã­Å’Â¨Ã­â€žÂ´Ã¬â€”Â Ã¬Â§â€˜Ã¬Â¤â€˜
- Ã¬Å Â¤Ã­â€šÂ¬Ã¬Ââ‚¬ Ã¬Â§â€˜Ã¬Â¤â€˜Ã¬Â ÂÃ¬Å“Â¼Ã«Â¡Å“ - Ã¬Å Â¤Ã­â€šÂ¬Ã«â€¹Â¹ Ã­â€¢ËœÃ«â€šËœÃ¬ÂËœ Ã­Å’Â¨Ã­â€žÂ´
