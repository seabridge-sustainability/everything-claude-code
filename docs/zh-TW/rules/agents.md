# Agent Ã¥Ââ€Ã¨ÂªÂ¿

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


## Ã¥ÂÂ¯Ã§â€Â¨ Agents

Ã¤Â½ÂÃ¦â€“Â¼ `~/.claude/agents/`Ã¯Â¼Å¡

| Agent | Ã§â€Â¨Ã©â‚¬â€ | Ã¤Â½â€¢Ã¦â„¢â€šÃ¤Â½Â¿Ã§â€Â¨ |
|-------|------|----------|
| planner | Ã¥Â¯Â¦Ã¤Â½Å“Ã¨Â¦ÂÃ¥Å Æ’ | Ã¨Â¤â€¡Ã©â€ºÅ“Ã¥Å Å¸Ã¨Æ’Â½Ã£â‚¬ÂÃ©â€¡ÂÃ¦Â§â€¹ |
| architect | Ã§Â³Â»Ã§ÂµÂ±Ã¨Â¨Â­Ã¨Â¨Ë† | Ã¦Å¾Â¶Ã¦Â§â€¹Ã¦Â±ÂºÃ§Â­â€“ |
| tdd-guide | Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Â©â€¦Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Â¼ | Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã£â‚¬ÂBug Ã¤Â¿Â®Ã¥Â¾Â© |
| code-reviewer | Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¯Â©Ã¦Å¸Â¥ | Ã¦â€™Â°Ã¥Â¯Â«Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¾Å’ |
| security-reviewer | Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥Ë†â€ Ã¦Å¾Â | Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°Â |
| build-error-resolver | Ã¤Â¿Â®Ã¥Â¾Â©Ã¥Â»ÂºÃ§Â½Â®Ã©Å’Â¯Ã¨ÂªÂ¤ | Ã¥Â»ÂºÃ§Â½Â®Ã¥Â¤Â±Ã¦â€¢â€”Ã¦â„¢â€š |
| e2e-runner | E2E Ã¦Â¸Â¬Ã¨Â©Â¦ | Ã©â€”Å“Ã©ÂÂµÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦ÂµÂÃ§Â¨â€¹ |
| refactor-cleaner | Ã§â€žÂ¡Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¦Â¸â€¦Ã§Ââ€  | Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã§Â¶Â­Ã¨Â­Â· |
| doc-updater | Ã¦â€“â€¡Ã¤Â»Â¶ | Ã¦â€ºÂ´Ã¦â€“Â°Ã¦â€“â€¡Ã¤Â»Â¶ |

## Ã§Â«â€¹Ã¥ÂÂ³Ã¤Â½Â¿Ã§â€Â¨ Agent

Ã¤Â¸ÂÃ©Å“â‚¬Ã¨Â¦ÂÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦ÂÂÃ§Â¤ÂºÃ¯Â¼Å¡
1. Ã¨Â¤â€¡Ã©â€ºÅ“Ã¥Å Å¸Ã¨Æ’Â½Ã¨Â«â€¹Ã¦Â±â€š - Ã¤Â½Â¿Ã§â€Â¨ **planner** Agent
2. Ã¥â€°â€ºÃ¦â€™Â°Ã¥Â¯Â«/Ã¤Â¿Â®Ã¦â€Â¹Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼ - Ã¤Â½Â¿Ã§â€Â¨ **code-reviewer** Agent
3. Bug Ã¤Â¿Â®Ã¥Â¾Â©Ã¦Ë†â€“Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½ - Ã¤Â½Â¿Ã§â€Â¨ **tdd-guide** Agent
4. Ã¦Å¾Â¶Ã¦Â§â€¹Ã¦Â±ÂºÃ§Â­â€“ - Ã¤Â½Â¿Ã§â€Â¨ **architect** Agent

## Ã¥Â¹Â³Ã¨Â¡Å’Ã¤Â»Â»Ã¥â€¹â„¢Ã¥Å¸Â·Ã¨Â¡Å’

Ã¥Â°ÂÃ§ÂÂ¨Ã§Â«â€¹Ã¦â€œÂÃ¤Â½Å“Ã§Â¸Â½Ã¦ËœÂ¯Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¹Â³Ã¨Â¡Å’ Task Ã¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼Å¡

```markdown
# Ã¥Â¥Â½Ã¯Â¼Å¡Ã¥Â¹Â³Ã¨Â¡Å’Ã¥Å¸Â·Ã¨Â¡Å’
Ã¥Â¹Â³Ã¨Â¡Å’Ã¥â€¢Å¸Ã¥â€¹â€¢ 3 Ã¥â‚¬â€¹ agentsÃ¯Â¼Å¡
1. Agent 1Ã¯Â¼Å¡auth.ts Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥Ë†â€ Ã¦Å¾Â
2. Agent 2Ã¯Â¼Å¡Ã¥Â¿Â«Ã¥Ââ€“Ã§Â³Â»Ã§ÂµÂ±Ã§Å¡â€žÃ¦â€¢Ë†Ã¨Æ’Â½Ã¥Â¯Â©Ã¦Å¸Â¥
3. Agent 3Ã¯Â¼Å¡utils.ts Ã§Å¡â€žÃ¥Å¾â€¹Ã¥Ë†Â¥Ã¦ÂªÂ¢Ã¦Å¸Â¥

# Ã¤Â¸ÂÃ¥Â¥Â½Ã¯Â¼Å¡Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ¥Â¾ÂªÃ¥ÂºÂ
Ã¥â€¦Ë† agent 1Ã¯Â¼Å’Ã§â€žÂ¶Ã¥Â¾Å’ agent 2Ã¯Â¼Å’Ã§â€žÂ¶Ã¥Â¾Å’ agent 3
```

## Ã¥Â¤Å¡Ã¨Â§â‚¬Ã©Â»Å¾Ã¥Ë†â€ Ã¦Å¾Â

Ã¥Â°ÂÃ¦â€“Â¼Ã¨Â¤â€¡Ã©â€ºÅ“Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¥Ë†â€ Ã¨Â§â€™Ã¨â€°Â²Ã¥Â­Â agentsÃ¯Â¼Å¡
- Ã¤Âºâ€¹Ã¥Â¯Â¦Ã¥Â¯Â©Ã¦Å¸Â¥Ã¨â‚¬â€¦
- Ã¨Â³â€¡Ã¦Â·Â±Ã¥Â·Â¥Ã§Â¨â€¹Ã¥Â¸Â«
- Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Â°Ë†Ã¥Â®Â¶
- Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§Ã¥Â¯Â©Ã¦Å¸Â¥Ã¨â‚¬â€¦
- Ã¥â€ â€”Ã©Â¤ËœÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã¨â‚¬â€¦
