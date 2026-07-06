---
name: instinct-export
description: Ã¥Â°â€ Ã©Â¡Â¹Ã§â€ºÂ®/Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¨Å’Æ’Ã¥â€ºÂ´Ã§Å¡â€žÃ¦Å“Â¬Ã¨Æ’Â½Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¥Ë†Â°Ã¦â€“â€¡Ã¤Â»Â¶
command: /instinct-export
---

# Ã¦Å“Â¬Ã¨Æ’Â½Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¥â€˜Â½Ã¤Â»Â¤

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
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
