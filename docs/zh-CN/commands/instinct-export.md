---
name: instinct-export
description: Ã¥Â°â€ Ã©Â¡Â¹Ã§â€ºÂ®/Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¨Å’Æ’Ã¥â€ºÂ´Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¥Ë†Â°Ã¦â€“â€¡Ã¤Â»Â¶
command: /instinct-export
---

# Ã¦Å“Â¬Ã¨Æ’Â½Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¥â€˜Â½Ã¤Â»Â¤

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


Ã¥Â°â€ Ã¦Å“Â¬Ã¨Æ’Â½Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¤Â¸ÂºÃ¥ÂÂ¯Ã¥â€¦Â±Ã¤ÂºÂ«Ã§Å¡â€žÃ¦Â Â¼Ã¥Â¼ÂÃ£â‚¬â€šÃ©ÂÅ¾Ã¥Â¸Â¸Ã©â‚¬â€šÃ¥ÂË†Ã¯Â¼Å¡

* Ã¤Â¸Å½Ã¥â€ºÂ¢Ã©ËœÅ¸Ã¦Ë†ÂÃ¥â€˜ËœÃ¥Ë†â€ Ã¤ÂºÂ«
* Ã¨Â½Â¬Ã§Â§Â»Ã¥Ë†Â°Ã¦â€“Â°Ã¦Å“ÂºÃ¥â„¢Â¨
* Ã¨Â´Â¡Ã§Å’Â®Ã§Â»â„¢Ã©Â¡Â¹Ã§â€ºÂ®Ã§ÂºÂ¦Ã¥Â®Å¡

## Ã§â€Â¨Ã¦Â³â€¢

```
/instinct-export                           # Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¤Â¸ÂªÃ¤ÂºÂºÃ¦Å“Â¬Ã¨Æ’Â½
/instinct-export --domain testing          # Ã¤Â»â€¦Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§â€ºÂ¸Ã¥â€¦Â³Ã¦Å“Â¬Ã¨Æ’Â½
/instinct-export --min-confidence 0.7      # Ã¤Â»â€¦Ã¥Â¯Â¼Ã¥â€¡ÂºÃ©Â«ËœÃ§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¦Å“Â¬Ã¨Æ’Â½
/instinct-export --output team-instincts.yaml
/instinct-export --scope project --output project-instincts.yaml
```

## Ã¦â€œÂÃ¤Â½Å“Ã¦Â­Â¥Ã©ÂªÂ¤

1. Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¥Â½â€œÃ¥â€°ÂÃ©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
2. Ã¦Å’â€°Ã©â‚¬â€°Ã¥Â®Å¡Ã¨Å’Æ’Ã¥â€ºÂ´Ã¥Å Â Ã¨Â½Â½Ã¦Å“Â¬Ã¨Æ’Â½Ã¯Â¼Å¡
   * `project`: Ã¤Â»â€¦Ã©â„¢ÂÃ¥Â½â€œÃ¥â€°ÂÃ©Â¡Â¹Ã§â€ºÂ®
   * `global`: Ã¤Â»â€¦Ã©â„¢ÂÃ¥â€¦Â¨Ã¥Â±â‚¬
   * `all`: Ã©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Å½Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥ÂË†Ã¥Â¹Â¶Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼â€°
3. Ã¥Âºâ€Ã§â€Â¨Ã¨Â¿â€¡Ã¦Â»Â¤Ã¥â„¢Â¨Ã¯Â¼Ë†`--domain`, `--min-confidence`Ã¯Â¼â€°
4. Ã¥Â°â€  YAML Ã¦Â Â¼Ã¥Â¼ÂÃ§Å¡â€žÃ¥Â¯Â¼Ã¥â€¡ÂºÃ¥â€ â„¢Ã¥â€¦Â¥Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å“ÂªÃ¦ÂÂÃ¤Â¾â€ºÃ¨Â¾â€œÃ¥â€¡ÂºÃ¨Â·Â¯Ã¥Â¾â€žÃ¯Â¼Å’Ã¥Ë†â„¢Ã¥â€ â„¢Ã¥â€¦Â¥Ã¦Â â€¡Ã¥â€¡â€ Ã¨Â¾â€œÃ¥â€¡ÂºÃ¯Â¼â€°

## Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼Â

Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤Â¸â‚¬Ã¤Â¸Âª YAML Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡

```yaml
# Instincts Export
# Generated: 2025-01-22
# Source: personal
# Count: 12 instincts

---
id: prefer-functional-style
trigger: "when writing new functions"
confidence: 0.8
domain: code-style
source: session-observation
scope: project
project_id: a1b2c3d4e5f6
project_name: my-app
---

# Prefer Functional Style

## Action
Use functional patterns over classes.
```

## Ã¦Â â€¡Ã¥Â¿â€”

* `--domain <name>`: Ã¤Â»â€¦Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¦Å’â€¡Ã¥Â®Å¡Ã©Â¢â€ Ã¥Å¸Å¸
* `--min-confidence <n>`: Ã¦Å“â‚¬Ã¤Â½Å½Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã©ËœË†Ã¥â‚¬Â¼
* `--output <file>`: Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦â€“â€¡Ã¤Â»Â¶Ã¨Â·Â¯Ã¥Â¾â€žÃ¯Â¼Ë†Ã§Å“ÂÃ§â€¢Â¥Ã¦â€”Â¶Ã¦â€°â€œÃ¥ÂÂ°Ã¥Ë†Â°Ã¦Â â€¡Ã¥â€¡â€ Ã¨Â¾â€œÃ¥â€¡ÂºÃ¯Â¼â€°
* `--scope <project|global|all>`: Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¨Å’Æ’Ã¥â€ºÂ´Ã¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼Å¡`all`Ã¯Â¼â€°
