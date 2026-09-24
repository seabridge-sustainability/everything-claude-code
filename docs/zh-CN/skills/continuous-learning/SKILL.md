---
name: continuous-learning
description: Ã¨â€¡ÂªÃ¥Å Â¨Ã¤Â»Å½Claude CodeÃ¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¸Â­Ã¦ÂÂÃ¥Ââ€“Ã¥ÂÂ¯Ã©â€¡ÂÃ¥Â¤ÂÃ¤Â½Â¿Ã§â€Â¨Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¥Â¹Â¶Ã¥Â°â€ Ã¥â€¦Â¶Ã¤Â¿ÂÃ¥Â­ËœÃ¤Â¸ÂºÃ¥Â­Â¦Ã¤Â¹Â Ã¥Ë†Â°Ã§Å¡â€žÃ¦Å â‚¬Ã¨Æ’Â½Ã¤Â»Â¥Ã¤Â¾â€ºÃ¥Â°â€ Ã¦ÂÂ¥Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬â€š
origin: ECC
---

# Ã¦Å’ÂÃ§Â»Â­Ã¥Â­Â¦Ã¤Â¹Â Ã¦Å â‚¬Ã¨Æ’Â½

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


Ã¨â€¡ÂªÃ¥Å Â¨Ã¨Â¯â€žÃ¤Â¼Â° Claude Code Ã¤Â¼Å¡Ã¨Â¯ÂÃ§Å¡â€žÃ§Â»â€œÃ¥Â°Â¾Ã¯Â¼Å’Ã¤Â»Â¥Ã¦ÂÂÃ¥Ââ€“Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¨Â¿â„¢Ã¤Âºâ€ºÃ¦Â¨Â¡Ã¥Â¼ÂÃ¥ÂÂ¯Ã¤Â»Â¥Ã¤Â¿ÂÃ¥Â­ËœÃ¤Â¸ÂºÃ¥Â­Â¦Ã¤Â¹Â Ã¥Ë†Â°Ã§Å¡â€žÃ¦Å â‚¬Ã¨Æ’Â½Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¦Â¿â‚¬Ã¦Â´Â»

* Ã¨Â®Â¾Ã§Â½Â®Ã¤Â»Å½ Claude Code Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¸Â­Ã¨â€¡ÂªÃ¥Å Â¨Ã¦ÂÂÃ¥Ââ€“Ã¦Â¨Â¡Ã¥Â¼Â
* Ã¤Â¸ÂºÃ¤Â¼Å¡Ã¨Â¯ÂÃ¨Â¯â€žÃ¤Â¼Â°Ã©â€¦ÂÃ§Â½Â®Ã¥ÂÅ“Ã¦Â­Â¢Ã©â€™Â©Ã¥Â­Â
* Ã¥Å“Â¨ `~/.claude/skills/learned/` Ã¤Â¸Â­Ã¥Â®Â¡Ã¦Å¸Â¥Ã¦Ë†â€“Ã¦â€¢Â´Ã§Ââ€ Ã¥Â·Â²Ã¥Â­Â¦Ã¤Â¹Â Ã§Å¡â€žÃ¦Å â‚¬Ã¨Æ’Â½
* Ã¨Â°Æ’Ã¦â€¢Â´Ã¦ÂÂÃ¥Ââ€“Ã©ËœË†Ã¥â‚¬Â¼Ã¦Ë†â€“Ã¦Â¨Â¡Ã¥Â¼ÂÃ§Â±Â»Ã¥Ë†Â«
* Ã¦Â¯â€Ã¨Â¾Æ’ v1Ã¯Â¼Ë†Ã¦Å“Â¬Ã¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼â€°Ã¤Â¸Å½ v2Ã¯Â¼Ë†Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¦Å“Â¬Ã¨Æ’Â½Ã§Å¡â€žÃ¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼â€°

## Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å½Å¸Ã§Ââ€ 

Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã¤Â½Å“Ã¤Â¸Âº **Ã¥ÂÅ“Ã¦Â­Â¢Ã©â€™Â©Ã¥Â­Â** Ã¥Å“Â¨Ã¦Â¯ÂÃ¤Â¸ÂªÃ¤Â¼Å¡Ã¨Â¯ÂÃ§Â»â€œÃ¦ÂÅ¸Ã¦â€”Â¶Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å¡

1. **Ã¤Â¼Å¡Ã¨Â¯ÂÃ¨Â¯â€žÃ¤Â¼Â°**Ã¯Â¼Å¡Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦ËœÂ¯Ã¥ÂÂ¦Ã¥Å’â€¦Ã¥ÂÂ«Ã¨Â¶Â³Ã¥Â¤Å¸Ã¥Â¤Å¡Ã§Å¡â€žÃ¦Â¶Ë†Ã¦ÂÂ¯Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼Å¡10 Ã¦ÂÂ¡Ã¤Â»Â¥Ã¤Â¸Å Ã¯Â¼â€°
2. **Ã¦Â¨Â¡Ã¥Â¼ÂÃ¦Â£â‚¬Ã¦Âµâ€¹**Ã¯Â¼Å¡Ã¤Â»Å½Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¸Â­Ã¨Â¯â€ Ã¥Ë†Â«Ã¥ÂÂ¯Ã¦ÂÂÃ¥Ââ€“Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
3. **Ã¦Å â‚¬Ã¨Æ’Â½Ã¦ÂÂÃ¥Ââ€“**Ã¯Â¼Å¡Ã¥Â°â€ Ã¦Å“â€°Ã§â€Â¨Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ¤Â¿ÂÃ¥Â­ËœÃ¥Ë†Â° `~/.claude/skills/learned/`

## Ã©â€¦ÂÃ§Â½Â®

Ã§Â¼â€“Ã¨Â¾â€˜ `config.json` Ã¤Â»Â¥Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¯Â¼Å¡

```json
{
  "min_session_length": 10,
  "extraction_threshold": "medium",
  "auto_approve": false,
  "learned_skills_path": "~/.claude/skills/learned/",
  "patterns_to_detect": [
    "error_resolution",
    "user_corrections",
    "workarounds",
    "debugging_techniques",
    "project_specific"
  ],
  "ignore_patterns": [
    "simple_typos",
    "one_time_fixes",
    "external_api_issues"
  ]
}
```

## Ã¦Â¨Â¡Ã¥Â¼ÂÃ§Â±Â»Ã¥Å¾â€¹

| Ã¦Â¨Â¡Ã¥Â¼Â | Ã¦ÂÂÃ¨Â¿Â° |
|---------|-------------|
| `error_resolution` | Ã§â€°Â¹Ã¥Â®Å¡Ã©â€â„¢Ã¨Â¯Â¯Ã¦ËœÂ¯Ã¥Â¦â€šÃ¤Â½â€¢Ã¨Â§Â£Ã¥â€ Â³Ã§Å¡â€ž |
| `user_corrections` | Ã¦ÂÂ¥Ã¨â€¡ÂªÃ§â€Â¨Ã¦Ë†Â·Ã§ÂºÂ Ã¦Â­Â£Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â |
| `workarounds` | Ã¦Â¡â€ Ã¦Å¾Â¶/Ã¥Âºâ€œÃ§â€°Â¹Ã¦Â®Å Ã¦â‚¬Â§Ã§Å¡â€žÃ¨Â§Â£Ã¥â€ Â³Ã¦â€“Â¹Ã¦Â¡Ë† |
| `debugging_techniques` | Ã¦Å“â€°Ã¦â€¢Ë†Ã§Å¡â€žÃ¨Â°Æ’Ã¨Â¯â€¢Ã¦â€“Â¹Ã¦Â³â€¢ |
| `project_specific` | Ã©Â¡Â¹Ã§â€ºÂ®Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ§ÂºÂ¦Ã¥Â®Å¡ |

## Ã©â€™Â©Ã¥Â­ÂÃ¨Â®Â¾Ã§Â½Â®

Ã¦Â·Â»Ã¥Å Â Ã¥Ë†Â°Ã¤Â½Â Ã§Å¡â€ž `~/.claude/settings.json` Ã¤Â¸Â­Ã¯Â¼Å¡

```json
{
  "hooks": {
    "Stop": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/continuous-learning/evaluate-session.sh"
      }]
    }]
  }
}
```

## Ã¤Â¸ÂºÃ¤Â»â‚¬Ã¤Â¹Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥ÂÅ“Ã¦Â­Â¢Ã©â€™Â©Ã¥Â­ÂÃ¯Â¼Å¸

* **Ã¨Â½Â»Ã©â€¡ÂÃ§ÂºÂ§**Ã¯Â¼Å¡Ã¤Â»â€¦Ã¥Å“Â¨Ã¤Â¼Å¡Ã¨Â¯ÂÃ§Â»â€œÃ¦ÂÅ¸Ã¦â€”Â¶Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â¸â‚¬Ã¦Â¬Â¡
* **Ã©ÂÅ¾Ã©ËœÂ»Ã¥Â¡Å¾**Ã¯Â¼Å¡Ã¤Â¸ÂÃ¤Â¼Å¡Ã§Â»â„¢Ã¦Â¯ÂÃ¦ÂÂ¡Ã¦Â¶Ë†Ã¦ÂÂ¯Ã¥Â¢Å¾Ã¥Å Â Ã¥Â»Â¶Ã¨Â¿Å¸
* **Ã¥Â®Å’Ã¦â€¢Â´Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡**Ã¯Â¼Å¡Ã¥ÂÂ¯Ã¤Â»Â¥Ã¨Â®Â¿Ã©â€”Â®Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ¤Â¼Å¡Ã¨Â¯ÂÃ¨Â®Â°Ã¥Â½â€¢

## Ã§â€ºÂ¸Ã¥â€¦Â³

* [Ã©â€¢Â¿Ã§Â¯â€¡Ã¦Å’â€¡Ã¥Ââ€”](https://x.com/affaanmustafa/status/2014040193557471352) - Ã¥â€¦Â³Ã¤ÂºÅ½Ã¦Å’ÂÃ§Â»Â­Ã¥Â­Â¦Ã¤Â¹Â Ã§Å¡â€žÃ§Â«Â Ã¨Å â€š
* `/learn` Ã¥â€˜Â½Ã¤Â»Â¤ - Ã¥Å“Â¨Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¸Â­Ã¦â€°â€¹Ã¥Å Â¨Ã¦ÂÂÃ¥Ââ€“Ã¦Â¨Â¡Ã¥Â¼Â

***

## Ã¥Â¯Â¹Ã¦Â¯â€Ã¨Â¯Â´Ã¦ËœÅ½Ã¯Â¼Ë†Ã§Â â€Ã§Â©Â¶Ã¯Â¼Å¡2025Ã¥Â¹Â´1Ã¦Å“Ë†Ã¯Â¼â€°

### Ã¤Â¸Å½ Homunculus Ã§Å¡â€žÃ¥Â¯Â¹Ã¦Â¯â€

Homunculus v2 Ã©â€¡â€¡Ã§â€Â¨Ã¤Âºâ€ Ã¦â€ºÂ´Ã¥Â¤ÂÃ¦Ââ€šÃ§Å¡â€žÃ¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Å¡

| Ã¥Å Å¸Ã¨Æ’Â½ | Ã¦Ë†â€˜Ã¤Â»Â¬Ã§Å¡â€žÃ¦â€“Â¹Ã¦Â³â€¢ | Homunculus v2 |
|---------|--------------|---------------|
| Ã¨Â§â€šÃ¥Â¯Å¸ | Ã¥ÂÅ“Ã¦Â­Â¢Ã©â€™Â©Ã¥Â­ÂÃ¯Â¼Ë†Ã¤Â¼Å¡Ã¨Â¯ÂÃ§Â»â€œÃ¦ÂÅ¸Ã¦â€”Â¶Ã¯Â¼â€° | PreToolUse/PostToolUse Ã©â€™Â©Ã¥Â­ÂÃ¯Â¼Ë†100% Ã¥ÂÂ¯Ã©ÂÂ Ã¯Â¼â€° |
| Ã¥Ë†â€ Ã¦Å¾Â | Ã¤Â¸Â»Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡ | Ã¥ÂÅ½Ã¥ÂÂ°Ã¤Â»Â£Ã§Ââ€  (Haiku) |
| Ã§Â²â€™Ã¥ÂºÂ¦ | Ã¥Â®Å’Ã¦â€¢Â´Ã¦Å â‚¬Ã¨Æ’Â½ | Ã¥Å½Å¸Ã¥Â­ÂÃ¥Å’â€“Ã§Å¡â€žÃ¢â‚¬Å“Ã¦Å“Â¬Ã¨Æ’Â½Ã¢â‚¬Â |
| Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦ | Ã¦â€”Â  | 0.3-0.9 Ã¥Å Â Ã¦ÂÆ’ |
| Ã¦Â¼â€Ã¨Â¿â€º | Ã§â€ºÂ´Ã¦Å½Â¥Ã¥Ë†Â°Ã¦Å â‚¬Ã¨Æ’Â½ | Ã¦Å“Â¬Ã¨Æ’Â½ Ã¢â€ â€™ Ã©â€ºâ€ Ã§Â¾Â¤ Ã¢â€ â€™ Ã¦Å â‚¬Ã¨Æ’Â½/Ã¥â€˜Â½Ã¤Â»Â¤/Ã¤Â»Â£Ã§Ââ€  |
| Ã¥â€¦Â±Ã¤ÂºÂ« | Ã¦â€”Â  | Ã¥Â¯Â¼Ã¥â€¡Âº/Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¦Å“Â¬Ã¨Æ’Â½ |

**Ã¦ÂÂ¥Ã¨â€¡Âª homunculus Ã§Å¡â€žÃ¥â€¦Â³Ã©â€Â®Ã¨Â§ÂÃ¨Â§Â£Ã¯Â¼Å¡**

> "v1 Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Å â‚¬Ã¨Æ’Â½Ã¦ÂÂ¥Ã¨Â§â€šÃ¥Â¯Å¸Ã£â‚¬â€šÃ¦Å â‚¬Ã¨Æ’Â½Ã¦ËœÂ¯Ã¦Â¦â€šÃ§Å½â€¡Ã¦â‚¬Â§Ã§Å¡â€žÃ¢â‚¬â€Ã¢â‚¬â€Ã¥Â®Æ’Ã¤Â»Â¬Ã¨Â§Â¦Ã¥Ââ€˜Ã§Å¡â€žÃ¦Â¦â€šÃ§Å½â€¡Ã§ÂºÂ¦Ã¤Â¸Âº 50-80%Ã£â‚¬â€šv2 Ã¤Â½Â¿Ã§â€Â¨Ã©â€™Â©Ã¥Â­ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã¨Â§â€šÃ¥Â¯Å¸Ã¯Â¼Ë†100% Ã¥ÂÂ¯Ã©ÂÂ Ã¯Â¼â€°Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â»Â¥Ã¦Å“Â¬Ã¨Æ’Â½Ã¤Â½Å“Ã¤Â¸ÂºÃ¥Â­Â¦Ã¤Â¹Â Ã¨Â¡Å’Ã¤Â¸ÂºÃ§Å¡â€žÃ¥Å½Å¸Ã¥Â­ÂÃ¥Ââ€¢Ã¥â€¦Æ’Ã£â‚¬â€š"

### Ã¦Â½Å“Ã¥Å“Â¨Ã§Å¡â€ž v2 Ã¥Â¢Å¾Ã¥Â¼ÂºÃ¥Å Å¸Ã¨Æ’Â½

1. **Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¦Å“Â¬Ã¨Æ’Â½Ã§Å¡â€žÃ¥Â­Â¦Ã¤Â¹Â ** - Ã¦â€ºÂ´Ã¥Â°ÂÃ£â‚¬ÂÃ¥Å½Å¸Ã¥Â­ÂÃ¥Å’â€“Ã§Å¡â€žÃ¨Â¡Å’Ã¤Â¸ÂºÃ¯Â¼Å’Ã©â„¢â€žÃ¥Â¸Â¦Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¨Â¯â€žÃ¥Ë†â€ 
2. **Ã¥ÂÅ½Ã¥ÂÂ°Ã¨Â§â€šÃ¥Â¯Å¸Ã¨â‚¬â€¦** - Haiku Ã¤Â»Â£Ã§Ââ€ Ã¥Â¹Â¶Ã¨Â¡Å’Ã¥Ë†â€ Ã¦Å¾Â
3. **Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¨Â¡Â°Ã¥â€¡Â** - Ã¥Â¦â€šÃ¦Å¾Å“Ã¨Â¢Â«Ã¥ÂÂÃ©Â©Â³Ã¯Â¼Å’Ã¦Å“Â¬Ã¨Æ’Â½Ã¤Â¼Å¡Ã©â„¢ÂÃ¤Â½Å½Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦
4. **Ã©Â¢â€ Ã¥Å¸Å¸Ã¦Â â€¡Ã¨Â®Â°** - Ã¤Â»Â£Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼Ã£â‚¬ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬ÂgitÃ£â‚¬ÂÃ¨Â°Æ’Ã¨Â¯â€¢Ã§Â­â€°
5. **Ã¦Â¼â€Ã¨Â¿â€ºÃ¨Â·Â¯Ã¥Â¾â€ž** - Ã¥Â°â€ Ã§â€ºÂ¸Ã¥â€¦Â³Ã¦Å“Â¬Ã¨Æ’Â½Ã¨ÂÅ¡Ã§Â±Â»Ã¤Â¸ÂºÃ¦Å â‚¬Ã¨Æ’Â½/Ã¥â€˜Â½Ã¤Â»Â¤

Ã¥Ââ€šÃ¨Â§ÂÃ¯Â¼Å¡`docs/continuous-learning-v2-spec.md` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã¥Â®Å’Ã¦â€¢Â´Ã¨Â§â€žÃ¨Å’Æ’Ã£â‚¬â€š
