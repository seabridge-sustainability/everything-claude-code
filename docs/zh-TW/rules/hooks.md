# Hook Ã§Â³Â»Ã§ÂµÂ±

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


## Hook Ã©Â¡Å¾Ã¥Å¾â€¹

- **PreToolUse**Ã¯Â¼Å¡Ã¥Â·Â¥Ã¥â€¦Â·Ã¥Å¸Â·Ã¨Â¡Å’Ã¥â€°ÂÃ¯Â¼Ë†Ã©Â©â€”Ã¨Â­â€°Ã£â‚¬ÂÃ¥ÂÆ’Ã¦â€¢Â¸Ã¤Â¿Â®Ã¦â€Â¹Ã¯Â¼â€°
- **PostToolUse**Ã¯Â¼Å¡Ã¥Â·Â¥Ã¥â€¦Â·Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â¾Å’Ã¯Â¼Ë†Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã£â‚¬ÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã¯Â¼â€°
- **Stop**Ã¯Â¼Å¡Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ§ÂµÂÃ¦ÂÅ¸Ã¦â„¢â€šÃ¯Â¼Ë†Ã¦Å“â‚¬Ã§Âµâ€šÃ©Â©â€”Ã¨Â­â€°Ã¯Â¼â€°

## Ã§â€ºÂ®Ã¥â€°Â HooksÃ¯Â¼Ë†Ã¥Å“Â¨ ~/.claude/settings.jsonÃ¯Â¼â€°

### PreToolUse
- **tmux Ã¦ÂÂÃ©â€ â€™**Ã¯Â¼Å¡Ã¥Â»ÂºÃ¨Â­Â°Ã¥Â°ÂÃ©â€¢Â·Ã¦â„¢â€šÃ©â€“â€œÃ¥Å¸Â·Ã¨Â¡Å’Ã§Å¡â€žÃ¦Å’â€¡Ã¤Â»Â¤Ã¤Â½Â¿Ã§â€Â¨ tmuxÃ¯Â¼Ë†npmÃ£â‚¬ÂpnpmÃ£â‚¬ÂyarnÃ£â‚¬Âcargo Ã§Â­â€°Ã¯Â¼â€°
- **git push Ã¥Â¯Â©Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã¦Å½Â¨Ã©â‚¬ÂÃ¥â€°ÂÃ©â€“â€¹Ã¥â€¢Å¸ Zed Ã©â‚¬Â²Ã¨Â¡Å’Ã¥Â¯Â©Ã¦Å¸Â¥
- **Ã¦â€“â€¡Ã¤Â»Â¶Ã©ËœÂ»Ã¦â€œâ€¹Ã¥â„¢Â¨**Ã¯Â¼Å¡Ã©ËœÂ»Ã¦â€œâ€¹Ã¥Â»ÂºÃ§Â«â€¹Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€ž .md/.txt Ã¦Âªâ€Ã¦Â¡Ë†

### PostToolUse
- **PR Ã¥Â»ÂºÃ§Â«â€¹**Ã¯Â¼Å¡Ã¨Â¨ËœÃ©Å’â€ž PR URL Ã¥â€™Å’ GitHub Actions Ã§â€¹â‚¬Ã¦â€¦â€¹
- **Prettier**Ã¯Â¼Å¡Ã§Â·Â¨Ã¨Â¼Â¯Ã¥Â¾Å’Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“ JS/TS Ã¦Âªâ€Ã¦Â¡Ë†
- **TypeScript Ã¦ÂªÂ¢Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã§Â·Â¨Ã¨Â¼Â¯ .ts/.tsx Ã¦Âªâ€Ã¦Â¡Ë†Ã¥Â¾Å’Ã¥Å¸Â·Ã¨Â¡Å’ tsc
- **console.log Ã¨Â­Â¦Ã¥â€˜Å **Ã¯Â¼Å¡Ã¨Â­Â¦Ã¥â€˜Å Ã§Â·Â¨Ã¨Â¼Â¯Ã¦Âªâ€Ã¦Â¡Ë†Ã¤Â¸Â­Ã§Å¡â€ž console.log

### Stop
- **console.log Ã§Â¨Â½Ã¦Â Â¸**Ã¯Â¼Å¡Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ§ÂµÂÃ¦ÂÅ¸Ã¥â€°ÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã¦â€°â‚¬Ã¦Å“â€°Ã¤Â¿Â®Ã¦â€Â¹Ã¦Âªâ€Ã¦Â¡Ë†Ã¤Â¸Â­Ã§Å¡â€ž console.log

## Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¦Å½Â¥Ã¥Ââ€”Ã¦Â¬Å Ã©â„¢Â

Ã¨Â¬Â¹Ã¦â€¦Å½Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Å¡
- Ã¥Â°ÂÃ¥Ââ€”Ã¤Â¿Â¡Ã¤Â»Â»Ã£â‚¬ÂÃ¥Â®Å¡Ã§Â¾Â©Ã¦ËœÅ½Ã§Â¢ÂºÃ§Å¡â€žÃ¨Â¨Ë†Ã§â€¢Â«Ã¥â€¢Å¸Ã§â€Â¨
- Ã¥Â°ÂÃ¦Å½Â¢Ã§Â´Â¢Ã¦â‚¬Â§Ã¥Â·Â¥Ã¤Â½Å“Ã¥ÂÅ“Ã§â€Â¨
- Ã§Âµâ€¢Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ dangerously-skip-permissions flag
- Ã¦â€Â¹Ã§â€šÂºÃ¥Å“Â¨ `~/.claude.json` Ã¤Â¸Â­Ã¨Â¨Â­Ã¥Â®Å¡ `allowedTools`

## TodoWrite Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢

Ã¤Â½Â¿Ã§â€Â¨ TodoWrite Ã¥Â·Â¥Ã¥â€¦Â·Ã¤Â¾â€ Ã¯Â¼Å¡
- Ã¨Â¿Â½Ã¨Â¹Â¤Ã¥Â¤Å¡Ã¦Â­Â¥Ã©Â©Å¸Ã¤Â»Â»Ã¥â€¹â„¢Ã§Å¡â€žÃ©â‚¬Â²Ã¥ÂºÂ¦
- Ã©Â©â€”Ã¨Â­â€°Ã¥Â°ÂÃ¦Å’â€¡Ã§Â¤ÂºÃ§Å¡â€žÃ§Ââ€ Ã¨Â§Â£
- Ã¥â€¢Å¸Ã§â€Â¨Ã¥ÂÂ³Ã¦â„¢â€šÃ¨ÂªÂ¿Ã¦â€¢Â´
- Ã©Â¡Â¯Ã§Â¤ÂºÃ§Â´Â°Ã§Â²â€™Ã¥ÂºÂ¦Ã¥Â¯Â¦Ã¤Â½Å“Ã¦Â­Â¥Ã©Â©Å¸

Ã¥Â¾â€¦Ã¨Â¾Â¦Ã¦Â¸â€¦Ã¥â€“Â®Ã¦ÂÂ­Ã§Â¤ÂºÃ¯Â¼Å¡
- Ã©Â â€ Ã¥ÂºÂÃ©Å’Â¯Ã¨ÂªÂ¤Ã§Å¡â€žÃ¦Â­Â¥Ã©Â©Å¸
- Ã§Â¼ÂºÃ¥Â°â€˜Ã§Å¡â€žÃ©Â â€¦Ã§â€ºÂ®
- Ã¥Â¤Å¡Ã©Â¤ËœÃ§Å¡â€žÃ¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ©Â â€¦Ã§â€ºÂ®
- Ã©Å’Â¯Ã¨ÂªÂ¤Ã§Å¡â€žÃ§Â²â€™Ã¥ÂºÂ¦
- Ã¨ÂªÂ¤Ã¨Â§Â£Ã§Å¡â€žÃ©Å“â‚¬Ã¦Â±â€š
