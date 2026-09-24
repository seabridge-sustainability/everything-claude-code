# Eval Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“

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


Ã­Ââ€°ÃªÂ°â‚¬ ÃªÂ¸Â°Ã«Â°Ëœ ÃªÂ°Å“Ã«Â°Å“ Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°Ã«Â¥Â¼ ÃªÂ´â‚¬Ã«Â¦Â¬Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬â€šÂ¬Ã¬Å¡Â©Ã«Â²â€¢

`/eval [define|check|report|list|clean] [feature-name]`

## Ã­Ââ€°ÃªÂ°â‚¬ Ã¬Â â€¢Ã¬ÂËœ

`/eval define feature-name`

Ã¬Æ’Ë†Ã«Â¡Å“Ã¬Å¡Â´ Ã­Ââ€°ÃªÂ°â‚¬ Ã¬Â â€¢Ã¬ÂËœÃ«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

1. `.claude/evals/feature-name.md`Ã¬â€”Â Ã­â€¦Å“Ã­â€Å’Ã«Â¦Â¿Ã¬Ââ€ž Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```markdown
## EVAL: feature-name
Created: $(date)

### Capability Evals
- [ ] [ÃªÂ¸Â°Ã«Å Â¥ 1Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã¬â€žÂ¤Ã«Âªâ€¦]
- [ ] [ÃªÂ¸Â°Ã«Å Â¥ 2Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã¬â€žÂ¤Ã«Âªâ€¦]

### Regression Evals
- [ ] [ÃªÂ¸Â°Ã¬Â¡Â´ Ã«Ââ„¢Ã¬Å¾â€˜ 1Ã¬ÂÂ´ Ã¬â€”Â¬Ã¬Â â€žÃ­Å¾Ë† Ã¬Å¾â€˜Ã«Ââ„¢Ã­â€¢Â¨]
- [ ] [ÃªÂ¸Â°Ã¬Â¡Â´ Ã«Ââ„¢Ã¬Å¾â€˜ 2Ã¬ÂÂ´ Ã¬â€”Â¬Ã¬Â â€žÃ­Å¾Ë† Ã¬Å¾â€˜Ã«Ââ„¢Ã­â€¢Â¨]

### Success Criteria
- capability evalÃ¬â€”Â Ã«Å’â‚¬Ã­â€¢Â´ pass@3 > 90%
- regression evalÃ¬â€”Â Ã«Å’â‚¬Ã­â€¢Â´ pass^3 = 100%
```

2. Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾ÂÃ¬â€”ÂÃªÂ²Å’ ÃªÂµÂ¬Ã¬Â²Â´Ã¬Â ÂÃ¬ÂÂ¸ ÃªÂ¸Â°Ã¬Â¤â‚¬Ã¬Ââ€ž Ã¬Å¾â€¦Ã«Â Â¥Ã­â€¢ËœÃ«Ââ€žÃ«Â¡Â Ã¬â€¢Ë†Ã«â€šÂ´Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤

## Ã­Ââ€°ÃªÂ°â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸

`/eval check feature-name`

ÃªÂ¸Â°Ã«Å Â¥Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã­Ââ€°ÃªÂ°â‚¬Ã«Â¥Â¼ Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

1. `.claude/evals/feature-name.md`Ã¬â€”ÂÃ¬â€žÅ“ Ã­Ââ€°ÃªÂ°â‚¬ Ã¬Â â€¢Ã¬ÂËœÃ«Â¥Â¼ Ã¬ÂÂ½Ã¬Å ÂµÃ«â€¹Ë†Ã«â€¹Â¤
2. ÃªÂ°Â capability evalÃ¬â€”Â Ã«Å’â‚¬Ã­â€¢Â´:
   - ÃªÂ¸Â°Ã¬Â¤â‚¬ ÃªÂ²â‚¬Ã¬Â¦ÂÃ¬Ââ€ž Ã¬â€¹Å“Ã«Ââ€žÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤
   - PASS/FAILÃ¬Ââ€ž ÃªÂ¸Â°Ã«Â¡ÂÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤
   - `.claude/evals/feature-name.log`Ã¬â€”Â Ã¬â€¹Å“Ã«Ââ€žÃ«Â¥Â¼ ÃªÂ¸Â°Ã«Â¡ÂÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤
3. ÃªÂ°Â regression evalÃ¬â€”Â Ã«Å’â‚¬Ã­â€¢Â´:
   - ÃªÂ´â‚¬Ã«Â Â¨ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤
   - ÃªÂ¸Â°Ã¬Â¤â‚¬Ã¬â€žÂ ÃªÂ³Â¼ Ã«Â¹â€žÃªÂµÂÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤
   - PASS/FAILÃ¬Ââ€ž ÃªÂ¸Â°Ã«Â¡ÂÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤
4. Ã­Ëœâ€žÃ¬Å¾Â¬ Ã¬Æ’ÂÃ­Æ’Å“Ã«Â¥Â¼ Ã«Â³Â´ÃªÂ³Â Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```
EVAL CHECK: feature-name
========================
Capability: X/Y passing
Regression: X/Y passing
Status: IN PROGRESS / READY
```

## Ã­Ââ€°ÃªÂ°â‚¬ Ã«Â³Â´ÃªÂ³Â 

`/eval report feature-name`

Ã­ÂÂ¬ÃªÂ´â€žÃ¬Â ÂÃ¬ÂÂ¸ Ã­Ââ€°ÃªÂ°â‚¬ Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“Ã«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```
EVAL REPORT: feature-name
=========================
Generated: $(date)

CAPABILITY EVALS
----------------
[eval-1]: PASS (pass@1)
[eval-2]: PASS (pass@2) - Ã¬Å¾Â¬Ã¬â€¹Å“Ã«Ââ€ž Ã­â€¢â€žÃ¬Å¡â€Ã­â€“Ë†Ã¬ÂÅ’
[eval-3]: FAIL - Ã«Â¹â€žÃªÂ³Â  Ã¬Â°Â¸Ã¬Â¡Â°

REGRESSION EVALS
----------------
[test-1]: PASS
[test-2]: PASS
[test-3]: PASS

METRICS
-------
Capability pass@1: 67%
Capability pass@3: 100%
Regression pass^3: 100%

NOTES
-----
[Ã¬ÂÂ´Ã¬Å Ë†, Ã¬â€”Â£Ã¬Â§â‚¬ Ã¬Â¼â‚¬Ã¬ÂÂ´Ã¬Å Â¤ Ã«ËœÂÃ«Å â€ ÃªÂ´â‚¬Ã¬Â°Â° Ã¬â€šÂ¬Ã­â€¢Â­]

RECOMMENDATION
--------------
[SHIP / NEEDS WORK / BLOCKED]
```

## Ã­Ââ€°ÃªÂ°â‚¬ Ã«ÂªÂ©Ã«Â¡Â

`/eval list`

Ã«ÂªÂ¨Ã«â€œÂ  Ã­Ââ€°ÃªÂ°â‚¬ Ã¬Â â€¢Ã¬ÂËœÃ«Â¥Â¼ Ã­â€˜Å“Ã¬â€¹Å“Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```
EVAL DEFINITIONS
================
feature-auth      [3/5 passing] IN PROGRESS
feature-search    [5/5 passing] READY
feature-export    [0/4 passing] NOT STARTED
```

## Ã¬ÂÂ¸Ã¬Å¾Â

$ARGUMENTS:
- `define <name>` - Ã¬Æ’Ë† Ã­Ââ€°ÃªÂ°â‚¬ Ã¬Â â€¢Ã¬ÂËœ Ã¬Æ’ÂÃ¬â€žÂ±
- `check <name>` - Ã­Ââ€°ÃªÂ°â‚¬ Ã¬â€¹Â¤Ã­â€“â€° Ã«Â°Â Ã­â„¢â€¢Ã¬ÂÂ¸
- `report <name>` - Ã¬Â â€žÃ¬Â²Â´ Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“ Ã¬Æ’ÂÃ¬â€žÂ±
- `list` - Ã«ÂªÂ¨Ã«â€œÂ  Ã­Ââ€°ÃªÂ°â‚¬ Ã­â€˜Å“Ã¬â€¹Å“
- `clean` - Ã¬ËœÂ¤Ã«Å¾ËœÃ«ÂÅ“ Ã­Ââ€°ÃªÂ°â‚¬ Ã«Â¡Å“ÃªÂ·Â¸ Ã¬Â Å“ÃªÂ±Â° (Ã¬ÂµÅ“ÃªÂ·Â¼ 10Ã­Å¡Å’ Ã¬â€¹Â¤Ã­â€“â€° Ã¬Å“Â Ã¬Â§â‚¬)
