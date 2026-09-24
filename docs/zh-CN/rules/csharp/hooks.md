---
paths:
  - "**/*.cs"
  - "**/*.csx"
  - "**/*.csproj"
  - "**/*.sln"
  - "**/Directory.Build.props"
  - "**/Directory.Build.targets"
---

# C# Ã©â€™Â©Ã¥Â­Â

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å¸ÂºÃ¤ÂºÅ½ [common/hooks.md](../common/hooks.md) Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  C# Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€¦Â·Ã¤Â½â€œÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## PostToolUse Ã©â€™Â©Ã¥Â­Â

Ã¥Å“Â¨ `~/.claude/settings.json` Ã¤Â¸Â­Ã©â€¦ÂÃ§Â½Â®Ã¯Â¼Å¡

* **dotnet format**Ã¯Â¼Å¡Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã§Â¼â€“Ã¨Â¾â€˜Ã¨Â¿â€¡Ã§Å¡â€ž C# Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Â¹Â¶Ã¥Âºâ€Ã§â€Â¨Ã¥Ë†â€ Ã¦Å¾ÂÃ¥â„¢Â¨Ã¤Â¿Â®Ã¥Â¤Â
* **dotnet build**Ã¯Â¼Å¡Ã©ÂªÅ’Ã¨Â¯ÂÃ§Â¼â€“Ã¨Â¾â€˜Ã¥ÂÅ½Ã¨Â§Â£Ã¥â€ Â³Ã¦â€“Â¹Ã¦Â¡Ë†Ã¦Ë†â€“Ã©Â¡Â¹Ã§â€ºÂ®Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¤Â»ÂÃ¨Æ’Â½Ã§Â¼â€“Ã¨Â¯â€˜
* **dotnet test --no-build**Ã¯Â¼Å¡Ã¥Å“Â¨Ã¨Â¡Å’Ã¤Â¸ÂºÃ¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Å“â‚¬Ã¨Â¿â€˜Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©Â¡Â¹Ã§â€ºÂ®

## Stop Ã©â€™Â©Ã¥Â­Â

* Ã¥Å“Â¨Ã§Â»â€œÃ¦ÂÅ¸Ã¦Â¶â€°Ã¥ÂÅ Ã¥Â¹Â¿Ã¦Â³â€º C# Ã¦â€ºÂ´Ã¦â€Â¹Ã§Å¡â€žÃ¤Â¼Å¡Ã¨Â¯ÂÃ¥â€°ÂÃ¯Â¼Å’Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¦Å“â‚¬Ã§Â»Ë†Ã§Å¡â€ž `dotnet build`
* Ã¥Â½â€œ `appsettings*.json` Ã¦â€“â€¡Ã¤Â»Â¶Ã¨Â¢Â«Ã¤Â¿Â®Ã¦â€Â¹Ã¦â€”Â¶Ã¥Ââ€˜Ã¥â€¡ÂºÃ¨Â­Â¦Ã¥â€˜Å Ã¯Â¼Å’Ã¤Â»Â¥Ã©ËœÂ²Ã¦â€¢ÂÃ¦â€žÅ¸Ã¤Â¿Â¡Ã¦ÂÂ¯Ã¨Â¢Â«Ã¦ÂÂÃ¤ÂºÂ¤
