---
name: instinct-import
description: Ã¤Â»Å½Ã¦â€“â€¡Ã¤Â»Â¶Ã¦Ë†â€“URLÃ¥Â¯Â¼Ã¥â€¦Â¥Ã¦Å“Â¬Ã¨Æ’Â½Ã¥Ë†Â°Ã©Â¡Â¹Ã§â€ºÂ®/Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¤Â½Å“Ã§â€Â¨Ã¥Å¸Å¸
command: true
---

# Ã¦Å“Â¬Ã¨Æ’Â½Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¥â€˜Â½Ã¤Â»Â¤

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


## Ã¥Â®Å¾Ã§Å½Â°

Ã¤Â½Â¿Ã§â€Â¨Ã¦Ââ€™Ã¤Â»Â¶Ã¦Â Â¹Ã¨Â·Â¯Ã¥Â¾â€žÃ¨Â¿ÂÃ¨Â¡Å’Ã¦Å“Â¬Ã¨Æ’Â½ CLIÃ¯Â¼Å¡

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/scripts/instinct-cli.py" import <file-or-url> [--dry-run] [--force] [--min-confidence 0.7] [--scope project|global]
```

Ã¦Ë†â€“Ã¨â‚¬â€¦Ã¯Â¼Å’Ã¥Â¦â€šÃ¦Å¾Å“ `CLAUDE_PLUGIN_ROOT` Ã¦Å“ÂªÃ¨Â®Â¾Ã§Â½Â®Ã¯Â¼Ë†Ã¦â€°â€¹Ã¥Å Â¨Ã¥Â®â€°Ã¨Â£â€¦Ã¯Â¼â€°Ã¯Â¼Å¡

```bash
python3 ~/.claude/skills/continuous-learning-v2/scripts/instinct-cli.py import <file-or-url>
```

Ã¤Â»Å½Ã¦Å“Â¬Ã¥Å“Â°Ã¦â€“â€¡Ã¤Â»Â¶Ã¨Â·Â¯Ã¥Â¾â€žÃ¦Ë†â€“ HTTP(S) URL Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¦Å“Â¬Ã¨Æ’Â½Ã£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

```
/instinct-import team-instincts.yaml
/instinct-import https://github.com/org/repo/instincts.yaml
/instinct-import team-instincts.yaml --dry-run
/instinct-import team-instincts.yaml --scope global --force
```

## Ã¦â€°Â§Ã¨Â¡Å’Ã¦Â­Â¥Ã©ÂªÂ¤

1. Ã¨Å½Â·Ã¥Ââ€“Ã¦Å“Â¬Ã¨Æ’Â½Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¦Å“Â¬Ã¥Å“Â°Ã¨Â·Â¯Ã¥Â¾â€žÃ¦Ë†â€“ URLÃ¯Â¼â€°
2. Ã¨Â§Â£Ã¦Å¾ÂÃ¥Â¹Â¶Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â Â¼Ã¥Â¼Â
3. Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¤Â¸Å½Ã§Å½Â°Ã¦Å“â€°Ã¦Å“Â¬Ã¨Æ’Â½Ã§Å¡â€žÃ©â€¡ÂÃ¥Â¤ÂÃ©Â¡Â¹
4. Ã¥ÂË†Ã¥Â¹Â¶Ã¦Ë†â€“Ã¦Â·Â»Ã¥Å Â Ã¦â€“Â°Ã¦Å“Â¬Ã¨Æ’Â½
5. Ã¤Â¿ÂÃ¥Â­ËœÃ¥Ë†Â°Ã§Â»Â§Ã¦â€°Â¿Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Å¡
   * Ã©Â¡Â¹Ã§â€ºÂ®Ã¨Å’Æ’Ã¥â€ºÂ´Ã¯Â¼Å¡`~/.claude/homunculus/projects/<project-id>/instincts/inherited/`
   * Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¨Å’Æ’Ã¥â€ºÂ´Ã¯Â¼Å¡`~/.claude/homunculus/instincts/inherited/`

## Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¨Â¿â€¡Ã§Â¨â€¹

```
 Ã¤Â»Å½ team-instincts.yaml Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¦Å“Â¬Ã¨Æ’Â½
================================================

Ã¥Ââ€˜Ã§Å½Â° 12 Ã¤Â¸ÂªÃ¥Â¾â€¦Ã¥Â¯Â¼Ã¥â€¦Â¥Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½Ã£â‚¬â€š

Ã¦Â­Â£Ã¥Å“Â¨Ã¥Ë†â€ Ã¦Å¾ÂÃ¥â€ Â²Ã§ÂªÂ...

## Ã¦â€“Â°Ã¦Å“Â¬Ã¨Æ’Â½ (8)
Ã¨Â¿â„¢Ã¤Âºâ€ºÃ¥Â°â€ Ã¨Â¢Â«Ã¦Â·Â»Ã¥Å Â Ã¯Â¼Å¡
  Ã¢Å“â€œ use-zod-validation (Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦: 0.7)
  Ã¢Å“â€œ prefer-named-exports (Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦: 0.65)
  Ã¢Å“â€œ test-async-functions (Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦: 0.8)
  ...

## Ã©â€¡ÂÃ¥Â¤ÂÃ¦Å“Â¬Ã¨Æ’Â½ (3)
Ã¥Â·Â²Ã¥Â­ËœÃ¥Å“Â¨Ã§Â±Â»Ã¤Â¼Â¼Ã¦Å“Â¬Ã¨Æ’Â½Ã¯Â¼Å¡
  WARNING: prefer-functional-style
     Ã¦Å“Â¬Ã¥Å“Â°: 0.8 Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦, 12 Ã¦Â¬Â¡Ã¨Â§â€šÃ¥Â¯Å¸
     Ã¥Â¯Â¼Ã¥â€¦Â¥: 0.7 Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦
     Ã¢â€ â€™ Ã¤Â¿ÂÃ§â€¢â„¢Ã¦Å“Â¬Ã¥Å“Â° (Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¦â€ºÂ´Ã©Â«Ëœ)

  WARNING: test-first-workflow
     Ã¦Å“Â¬Ã¥Å“Â°: 0.75 Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦
     Ã¥Â¯Â¼Ã¥â€¦Â¥: 0.9 Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦
     Ã¢â€ â€™ Ã¦â€ºÂ´Ã¦â€“Â°Ã¤Â¸ÂºÃ¥Â¯Â¼Ã¥â€¦Â¥ (Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¦â€ºÂ´Ã©Â«Ëœ)

Ã¥Â¯Â¼Ã¥â€¦Â¥ 8 Ã¤Â¸ÂªÃ¦â€“Â°Ã§Å¡â€žÃ¯Â¼Å’Ã¦â€ºÂ´Ã¦â€“Â° 1 Ã¤Â¸ÂªÃ¯Â¼Å¸
```

## Ã¥ÂË†Ã¥Â¹Â¶Ã¨Â¡Å’Ã¤Â¸Âº

Ã¥Â½â€œÃ¥Â¯Â¼Ã¥â€¦Â¥Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Â·Â²Ã¥Â­ËœÃ¥Å“Â¨ ID Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½Ã¦â€”Â¶Ã¯Â¼Å¡

* Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¦â€ºÂ´Ã©Â«ËœÃ§Å¡â€žÃ¥Â¯Â¼Ã¥â€¦Â¥Ã¤Â¼Å¡Ã¦Ë†ÂÃ¤Â¸ÂºÃ¦â€ºÂ´Ã¦â€“Â°Ã¥â‚¬â„¢Ã©â‚¬â€°
* Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã§â€ºÂ¸Ã§Â­â€°Ã¦Ë†â€“Ã¦â€ºÂ´Ã¤Â½Å½Ã§Å¡â€žÃ¥Â¯Â¼Ã¥â€¦Â¥Ã¥Â°â€ Ã¨Â¢Â«Ã¨Â·Â³Ã¨Â¿â€¡
* Ã©â„¢Â¤Ã©ÂÅ¾Ã¤Â½Â¿Ã§â€Â¨ `--force`Ã¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã©Å“â‚¬Ã¨Â¦ÂÃ§â€Â¨Ã¦Ë†Â·Ã§Â¡Â®Ã¨Â®Â¤

## Ã¦ÂÂ¥Ã¦ÂºÂÃ¨Â¿Â½Ã¨Â¸Âª

Ã¥Â¯Â¼Ã¥â€¦Â¥Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½Ã¨Â¢Â«Ã¦Â â€¡Ã¨Â®Â°Ã¤Â¸ÂºÃ¯Â¼Å¡

```yaml
source: inherited
scope: project
imported_from: "team-instincts.yaml"
project_id: "a1b2c3d4e5f6"
project_name: "my-project"
```

## Ã¦Â â€¡Ã¥Â¿â€”

* `--dry-run`Ã¯Â¼Å¡Ã¤Â»â€¦Ã©Â¢â€žÃ¨Â§Ë†Ã¨â‚¬Å’Ã¤Â¸ÂÃ¥Â¯Â¼Ã¥â€¦Â¥
* `--force`Ã¯Â¼Å¡Ã¨Â·Â³Ã¨Â¿â€¡Ã§Â¡Â®Ã¨Â®Â¤Ã¦ÂÂÃ§Â¤Âº
* `--min-confidence <n>`Ã¯Â¼Å¡Ã¤Â»â€¦Ã¥Â¯Â¼Ã¥â€¦Â¥Ã©Â«ËœÃ¤ÂºÅ½Ã©ËœË†Ã¥â‚¬Â¼Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½
* `--scope <project|global>`Ã¯Â¼Å¡Ã©â‚¬â€°Ã¦â€¹Â©Ã§â€ºÂ®Ã¦Â â€¡Ã¨Å’Æ’Ã¥â€ºÂ´Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼Å¡`project`Ã¯Â¼â€°

## Ã¨Â¾â€œÃ¥â€¡Âº

Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¥ÂÅ½Ã¯Â¼Å¡

```
PASS: Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¥Â®Å’Ã¦Ë†ÂÃ¯Â¼Â

Ã¦â€“Â°Ã¥Â¢Å¾Ã¯Â¼Å¡8 Ã©Â¡Â¹Ã¦Å“Â¬Ã¨Æ’Â½
Ã¦â€ºÂ´Ã¦â€“Â°Ã¯Â¼Å¡1 Ã©Â¡Â¹Ã¦Å“Â¬Ã¨Æ’Â½
Ã¨Â·Â³Ã¨Â¿â€¡Ã¯Â¼Å¡3 Ã©Â¡Â¹Ã¦Å“Â¬Ã¨Æ’Â½Ã¯Â¼Ë†Ã¥Â·Â²Ã¥Â­ËœÃ¥Å“Â¨Ã¥ÂÅ’Ã§Â­â€°Ã¦Ë†â€“Ã¦â€ºÂ´Ã©Â«ËœÃ§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã§Å¡â€žÃ§â€°Ë†Ã¦Å“Â¬Ã¯Â¼â€°

Ã¦â€“Â°Ã¦Å“Â¬Ã¨Æ’Â½Ã¥Â·Â²Ã¤Â¿ÂÃ¥Â­ËœÃ¨â€¡Â³Ã¯Â¼Å¡~/.claude/homunculus/instincts/inherited/

Ã¨Â¿ÂÃ¨Â¡Å’ /instinct-status Ã¤Â»Â¥Ã¦Å¸Â¥Ã§Å“â€¹Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å“Â¬Ã¨Æ’Â½Ã£â‚¬â€š
```
