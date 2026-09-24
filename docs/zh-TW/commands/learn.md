# /learn - Ã¦â€œÂ·Ã¥Ââ€“Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã¥Ë†â€ Ã¦Å¾ÂÃ§â€ºÂ®Ã¥â€°ÂÃ§Å¡â€žÃ¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ¤Â¸Â¦Ã¦â€œÂ·Ã¥Ââ€“Ã¥â‚¬Â¼Ã¥Â¾â€”Ã¥â€žÂ²Ã¥Â­ËœÃ§â€šÂºÃ¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š

## Ã¨Â§Â¸Ã§â„¢Â¼

Ã¥Å“Â¨Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ¤Â¸Â­Ã¤Â»Â»Ã¤Â½â€¢Ã¦â„¢â€šÃ©â€“â€œÃ©Â»Å¾Ã¨Â§Â£Ã¦Â±ÂºÃ¤Âºâ€ Ã©ÂÅ¾Ã§â€˜Â£Ã§Â¢Å½Ã¥â€¢ÂÃ©Â¡Å’Ã¦â„¢â€šÃ¥Å¸Â·Ã¨Â¡Å’ `/learn`Ã£â‚¬â€š

## Ã¦â€œÂ·Ã¥Ââ€“Ã¥â€¦Â§Ã¥Â®Â¹

Ã¥Â°â€¹Ã¦â€°Â¾Ã¯Â¼Å¡

1. **Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â§Â£Ã¦Â±ÂºÃ¦Â¨Â¡Ã¥Â¼Â**
   - Ã§â„¢Â¼Ã§â€Å¸Ã¤Âºâ€ Ã¤Â»â‚¬Ã©ÂºÂ¼Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¸
   - Ã¦Â Â¹Ã¦Å“Â¬Ã¥Å½Å¸Ã¥â€ºÂ Ã¦ËœÂ¯Ã¤Â»â‚¬Ã©ÂºÂ¼Ã¯Â¼Å¸
   - Ã¤Â»â‚¬Ã©ÂºÂ¼Ã¤Â¿Â®Ã¥Â¾Â©Ã¤Âºâ€ Ã¥Â®Æ’Ã¯Â¼Å¸
   - Ã©â‚¬â„¢Ã¥ÂÂ¯Ã¤Â»Â¥Ã©â€¡ÂÃ§â€Â¨Ã¦â€“Â¼Ã©Â¡Å¾Ã¤Â¼Â¼Ã©Å’Â¯Ã¨ÂªÂ¤Ã¥â€”Å½Ã¯Â¼Å¸

2. **Ã©â„¢Â¤Ã©Å’Â¯Ã¦Å â‚¬Ã¨Â¡â€œ**
   - Ã©ÂÅ¾Ã©Â¡Â¯Ã¨â‚¬Å’Ã¦Ëœâ€œÃ¨Â¦â€¹Ã§Å¡â€žÃ©â„¢Â¤Ã©Å’Â¯Ã¦Â­Â¥Ã©Â©Å¸
   - Ã¦Å“â€°Ã¦â€¢Ë†Ã§Å¡â€žÃ¥Â·Â¥Ã¥â€¦Â·Ã§Âµâ€žÃ¥ÂË†
   - Ã¨Â¨ÂºÃ¦â€“Â·Ã¦Â¨Â¡Ã¥Â¼Â

3. **Ã¨Â®Å Ã©â‚¬Å¡Ã¦â€“Â¹Ã¦Â¡Ë†**
   - Ã¥â€¡Â½Ã¥Â¼ÂÃ¥ÂºÂ«Ã¦â‚¬ÂªÃ§â„¢â€“
   - API Ã©â„¢ÂÃ¥Ë†Â¶
   - Ã§â€°Â¹Ã¥Â®Å¡Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¾Â©

4. **Ã¥Â°Ë†Ã¦Â¡Ë†Ã§â€°Â¹Ã¥Â®Å¡Ã¦Â¨Â¡Ã¥Â¼Â**
   - Ã§â„¢Â¼Ã§ÂÂ¾Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂºÂ«Ã¦â€¦Â£Ã¤Â¾â€¹
   - Ã¥ÂÅ¡Ã¥â€¡ÂºÃ§Å¡â€žÃ¦Å¾Â¶Ã¦Â§â€¹Ã¦Â±ÂºÃ§Â­â€“
   - Ã¦â€¢Â´Ã¥ÂË†Ã¦Â¨Â¡Ã¥Â¼Â

## Ã¨Â¼Â¸Ã¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼Â

Ã¥Å“Â¨ `~/.claude/skills/learned/[pattern-name].md` Ã¥Â»ÂºÃ§Â«â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å¡

```markdown
# [Ã¦ÂÂÃ¨Â¿Â°Ã¦â‚¬Â§Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥ÂÂÃ§Â¨Â±]

**Ã¦â€œÂ·Ã¥Ââ€“Ã¦â€”Â¥Ã¦Å“Å¸Ã¯Â¼Å¡** [Ã¦â€”Â¥Ã¦Å“Å¸]
**Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¯Â¼Å¡** [Ã¦Â­Â¤Ã¦Â¨Â¡Ã¥Â¼ÂÃ¤Â½â€¢Ã¦â„¢â€šÃ©ÂÂ©Ã§â€Â¨Ã§Å¡â€žÃ§Â°Â¡Ã§Å¸Â­Ã¦ÂÂÃ¨Â¿Â°]

## Ã¥â€¢ÂÃ©Â¡Å’
[Ã¦Â­Â¤Ã¦Â¨Â¡Ã¥Â¼ÂÃ¨Â§Â£Ã¦Â±ÂºÃ¤Â»â‚¬Ã©ÂºÂ¼Ã¥â€¢ÂÃ©Â¡Å’ - Ã¨Â¦ÂÃ¥â€¦Â·Ã©Â«â€]

## Ã¨Â§Â£Ã¦Â±ÂºÃ¦â€“Â¹Ã¦Â¡Ë†
[Ã¦Â¨Â¡Ã¥Â¼Â/Ã¦Å â‚¬Ã¨Â¡â€œ/Ã¨Â®Å Ã©â‚¬Å¡Ã¦â€“Â¹Ã¦Â¡Ë†]

## Ã§Â¯â€žÃ¤Â¾â€¹
[Ã¥Â¦â€šÃ©ÂÂ©Ã§â€Â¨Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã§Â¯â€žÃ¤Â¾â€¹]

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¤Â½Â¿Ã§â€Â¨
[Ã¨Â§Â¸Ã§â„¢Â¼Ã¦Â¢ÂÃ¤Â»Â¶ - Ã¤Â»â‚¬Ã©ÂºÂ¼Ã¦â€¡â€°Ã¨Â©Â²Ã¥â€¢Å¸Ã¥â€¹â€¢Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½]
```

## Ã¦ÂµÂÃ§Â¨â€¹

1. Ã¥Â¯Â©Ã¦Å¸Â¥Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ¤Â¸Â­Ã¥ÂÂ¯Ã¦â€œÂ·Ã¥Ââ€“Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
2. Ã¨Â­ËœÃ¥Ë†Â¥Ã¦Å“â‚¬Ã¦Å“â€°Ã¥Æ’Â¹Ã¥â‚¬Â¼/Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã§Å¡â€žÃ¨Â¦â€¹Ã¨Â§Â£
3. Ã¨ÂµÂ·Ã¨Ââ€°Ã¦Å â‚¬Ã¨Æ’Â½Ã¦Âªâ€Ã¦Â¡Ë†
4. Ã¨Â«â€¹Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¥Å“Â¨Ã¥â€žÂ²Ã¥Â­ËœÃ¥â€°ÂÃ§Â¢ÂºÃ¨ÂªÂ
5. Ã¥â€žÂ²Ã¥Â­ËœÃ¥Ë†Â° `~/.claude/skills/learned/`

## Ã¦Â³Â¨Ã¦â€žÂÃ¤Âºâ€¹Ã©Â â€¦

- Ã¤Â¸ÂÃ¨Â¦ÂÃ¦â€œÂ·Ã¥Ââ€“Ã§â€˜Â£Ã§Â¢Å½Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¾Â©Ã¯Â¼Ë†Ã¦â€°â€œÃ¥Â­â€”Ã©Å’Â¯Ã¨ÂªÂ¤Ã£â‚¬ÂÃ§Â°Â¡Ã¥â€“Â®Ã§Å¡â€žÃ¨ÂªÅ¾Ã¦Â³â€¢Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼â€°
- Ã¤Â¸ÂÃ¨Â¦ÂÃ¦â€œÂ·Ã¥Ââ€“Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¦â‚¬Â§Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Ë†Ã§â€°Â¹Ã¥Â®Å¡ API Ã¥ÂÅ“Ã¦Â©Å¸Ã§Â­â€°Ã¯Â¼â€°
- Ã¥Â°Ë†Ã¦Â³Â¨Ã¦â€“Â¼Ã¦Å“Æ’Ã¥Å“Â¨Ã¦Å“ÂªÃ¤Â¾â€ Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ§Â¯â‚¬Ã§Å“ÂÃ¦â„¢â€šÃ©â€“â€œÃ§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
- Ã¤Â¿ÂÃ¦Å’ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã¥Â°Ë†Ã¦Â³Â¨ - Ã¦Â¯ÂÃ¥â‚¬â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã¦Â¨Â¡Ã¥Â¼Â
