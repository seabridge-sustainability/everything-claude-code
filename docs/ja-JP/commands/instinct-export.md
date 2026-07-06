---
name: instinct-export
description: Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Â Ã£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Ë†Ã£â€šâ€žÃ¤Â»â€“Ã£ÂÂ®Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ¨Ã¥â€¦Â±Ã¦Å“â€°Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†
command: /instinct-export
---

# Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

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


Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã¥â€¦Â±Ã¦Å“â€°Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ¥Â½Â¢Ã¥Â¼ÂÃ£ÂÂ§Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ¤Â»Â¥Ã¤Â¸â€¹Ã£ÂÂ®Ã§â€Â¨Ã©â‚¬â€Ã£ÂÂ«Ã¦Å“â‚¬Ã©ÂÂ©Ã£ÂÂ§Ã£Ââ„¢:
- Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Â Ã£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Ë†Ã£ÂÂ¨Ã£ÂÂ®Ã¥â€¦Â±Ã¦Å“â€°
- Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ£Æ’Å¾Ã£â€šÂ·Ã£Æ’Â³Ã£ÂÂ¸Ã£ÂÂ®Ã¨Â»Â¢Ã©â‚¬Â
- Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¨Â¦ÂÃ§Â´â€žÃ£ÂÂ¸Ã£ÂÂ®Ã¨Â²Â¢Ã§Å’Â®

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

```
/instinct-export                           # Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã¥â‚¬â€¹Ã¤ÂºÂºÃ£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†
/instinct-export --domain testing          # Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©â€“Â¢Ã©â‚¬Â£Ã£ÂÂ®Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†
/instinct-export --min-confidence 0.7      # Ã©Â«ËœÃ¤Â¿Â¡Ã©Â Â¼Ã¥ÂºÂ¦Ã£ÂÂ®Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†
/instinct-export --output team-instincts.yaml
```

## Ã¥Â®Å¸Ã¨Â¡Å’Ã¥â€ â€¦Ã¥Â®Â¹

1. `~/.claude/homunculus/instincts/personal/` Ã£Ââ€¹Ã£â€šâ€°Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£â€šâ‚¬
2. Ã£Æ’â€¢Ã£Æ’Â©Ã£â€šÂ°Ã£ÂÂ«Ã¥Å¸ÂºÃ£ÂÂ¥Ã£Ââ€žÃ£ÂÂ¦Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
3. Ã¦Â©Å¸Ã¥Â¯â€ Ã¦Æ’â€¦Ã¥Â Â±Ã£â€šâ€™Ã©â„¢Â¤Ã¥Â¤â€“:
   - Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³IDÃ£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤
   - Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£Æ’â€˜Ã£â€šÂ¹Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤Ã¯Â¼Ë†Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ®Ã£ÂÂ¿Ã¤Â¿ÂÃ¦Å’ÂÃ¯Â¼â€°
   - Ã£â‚¬Å’Ã¥â€¦Ë†Ã©â‚¬Â±Ã£â‚¬ÂÃ£â€šË†Ã£â€šÅ Ã¥ÂÂ¤Ã£Ââ€žÃ£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â³Ã£Æ’â€”Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤
4. Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â

## Ã¥â€¡ÂºÃ¥Å â€ºÃ¥Â½Â¢Ã¥Â¼Â

YAMLÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

```yaml
# Instincts Export
# Generated: 2025-01-22
# Source: personal
# Count: 12 instincts

version: "2.0"
exported_by: "continuous-learning-v2"
export_date: "2025-01-22T10:30:00Z"

instincts:
  - id: prefer-functional-style
    trigger: "when writing new functions"
    action: "Use functional patterns over classes"
    confidence: 0.8
    domain: code-style
    observations: 8

  - id: test-first-workflow
    trigger: "when adding new functionality"
    action: "Write test first, then implementation"
    confidence: 0.9
    domain: testing
    observations: 12

  - id: grep-before-edit
    trigger: "when modifying code"
    action: "Search with Grep, confirm with Read, then Edit"
    confidence: 0.7
    domain: workflow
    observations: 6
```

## Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’ÂÃ£â€šÂ·Ã£Æ’Â¼Ã£ÂÂ«Ã©â€“Â¢Ã£Ââ„¢Ã£â€šâ€¹Ã¨â‚¬Æ’Ã¦â€¦Â®Ã¤Âºâ€¹Ã©Â â€¦

Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£ÂÂ«Ã¥ÂÂ«Ã£ÂÂ¾Ã£â€šÅ’Ã£â€šâ€¹Ã¥â€ â€¦Ã¥Â®Â¹:
- PASS: Ã£Æ’Ë†Ã£Æ’ÂªÃ£â€šÂ¬Ã£Æ’Â¼Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³
- PASS: Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³
- PASS: Ã¤Â¿Â¡Ã©Â Â¼Ã¥ÂºÂ¦Ã£â€šÂ¹Ã£â€šÂ³Ã£â€šÂ¢
- PASS: Ã£Æ’â€°Ã£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Â³
- PASS: Ã¨Â¦Â³Ã¥Â¯Å¸Ã¥â€ºÅ¾Ã¦â€¢Â°

Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£ÂÂ«Ã¥ÂÂ«Ã£ÂÂ¾Ã£â€šÅ’Ã£ÂÂªÃ£Ââ€žÃ¥â€ â€¦Ã¥Â®Â¹:
- FAIL: Ã¥Â®Å¸Ã©Å¡â€ºÃ£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ¹Ã£Æ’â€¹Ã£Æ’Å¡Ã£Æ’Æ’Ã£Æ’Ë†
- FAIL: Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£Æ’â€˜Ã£â€šÂ¹
- FAIL: Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¨Â¨ËœÃ©Å’Â²
- FAIL: Ã¥â‚¬â€¹Ã¤ÂºÂºÃ¨Â­ËœÃ¥Ë†Â¥Ã¦Æ’â€¦Ã¥Â Â±

## Ã£Æ’â€¢Ã£Æ’Â©Ã£â€šÂ°

- `--domain <name>`: Ã¦Å’â€¡Ã¥Â®Å¡Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€°Ã£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Â³Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã£â€šÂ¨Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†
- `--min-confidence <n>`: Ã¦Å“â‚¬Ã¥Â°ÂÃ¤Â¿Â¡Ã©Â Â¼Ã¥ÂºÂ¦Ã©â€“Â¾Ã¥â‚¬Â¤Ã¯Â¼Ë†Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†: 0.3Ã¯Â¼â€°
- `--output <file>`: Ã¥â€¡ÂºÃ¥Å â€ºÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£Æ’â€˜Ã£â€šÂ¹Ã¯Â¼Ë†Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†: instincts-export-YYYYMMDD.yamlÃ¯Â¼â€°
- `--format <yaml|json|md>`: Ã¥â€¡ÂºÃ¥Å â€ºÃ¥Â½Â¢Ã¥Â¼ÂÃ¯Â¼Ë†Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†: yamlÃ¯Â¼â€°
- `--include-evidence`: Ã¨Â¨Â¼Ã¦â€¹Â Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£â€šâ€¹Ã¯Â¼Ë†Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†: Ã©â„¢Â¤Ã¥Â¤â€“Ã¯Â¼â€°
