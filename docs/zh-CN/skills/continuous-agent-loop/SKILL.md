---
name: continuous-agent-loop
description: Ã¥â€¦Â·Ã¦Å“â€°Ã¨Â´Â¨Ã©â€¡ÂÃ©â€”Â¨Ã£â‚¬ÂÃ¨Â¯â€žÃ¤Â¼Â°Ã¥â€™Å’Ã¦ÂÂ¢Ã¥Â¤ÂÃ¦Å½Â§Ã¥Ë†Â¶Ã§Å¡â€žÃ¨Â¿Å¾Ã§Â»Â­Ã¨â€¡ÂªÃ¤Â¸Â»Ã¤Â»Â£Ã§Ââ€ Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š
origin: ECC
---

# Ã¦Å’ÂÃ§Â»Â­Ã¤Â»Â£Ã§Ââ€ Ã¥Â¾ÂªÃ§Å½Â¯

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


Ã¨Â¿â„¢Ã¦ËœÂ¯ v1.8+ Ã§Å¡â€žÃ¨Â§â€žÃ¨Å’Æ’Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Å â‚¬Ã¨Æ’Â½Ã¥ÂÂÃ§Â§Â°Ã£â‚¬â€šÃ¥Â®Æ’Ã¥Å“Â¨Ã¤Â¿ÂÃ¦Å’ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Ââ€˜Ã¥Â¸Æ’Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¥â€¦Â¼Ã¥Â®Â¹Ã¦â‚¬Â§Ã§Å¡â€žÃ¥ÂÅ’Ã¦â€”Â¶Ã¯Â¼Å’Ã¥Ââ€“Ã¤Â»Â£Ã¤Âºâ€  `autonomous-loops`Ã£â‚¬â€š

## Ã¥Â¾ÂªÃ§Å½Â¯Ã©â‚¬â€°Ã¦â€¹Â©Ã¦ÂµÂÃ§Â¨â€¹

```text
Start
  |
  +-- Ã©Å“â‚¬Ã¨Â¦ÂÃ¤Â¸Â¥Ã¦Â Â¼Ã§Å¡â€ž CI/PR Ã¦Å½Â§Ã¥Ë†Â¶Ã¯Â¼Å¸ -- yes --> continuous-pr
  |
  +-- Ã©Å“â‚¬Ã¨Â¦Â RFC Ã¥Ë†â€ Ã¨Â§Â£Ã¯Â¼Å¸ -- yes --> rfc-dag
  |
  +-- Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Å½Â¢Ã§Â´Â¢Ã¦â‚¬Â§Ã¥Â¹Â¶Ã¨Â¡Å’Ã§â€Å¸Ã¦Ë†ÂÃ¯Â¼Å¸ -- yes --> infinite
  |
  +-- default --> sequential
```

## Ã§Â»â€žÃ¥ÂË†Ã¦Â¨Â¡Ã¥Â¼Â

Ã¦Å½Â¨Ã¨ÂÂÃ§Å¡â€žÃ§â€Å¸Ã¤ÂºÂ§Ã¦Â Ë†Ã¯Â¼Å¡

1. RFC Ã¥Ë†â€ Ã¨Â§Â£ (`ralphinho-rfc-pipeline`)
2. Ã¨Â´Â¨Ã©â€¡ÂÃ©â€”Â¨ (`plankton-code-quality` + `/quality-gate`)
3. Ã¨Â¯â€žÃ¤Â¼Â°Ã¥Â¾ÂªÃ§Å½Â¯ (`eval-harness`)
4. Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦Å’ÂÃ¤Â¹â€¦Ã¥Å’â€“ (`nanoclaw-repl`)

## Ã¦â€¢â€¦Ã©Å¡Å“Ã¦Â¨Â¡Ã¥Â¼Â

* Ã¥Â¾ÂªÃ§Å½Â¯Ã§Â©ÂºÃ¨Â½Â¬Ã¯Â¼Å’Ã¦Â²Â¡Ã¦Å“â€°Ã¥ÂÂ¯Ã¨Â¡Â¡Ã©â€¡ÂÃ§Å¡â€žÃ¨Â¿â€ºÃ¥Â±â€¢
* Ã¥â€ºÂ Ã§â€ºÂ¸Ã¥ÂÅ’Ã¦Â Â¹Ã¦Å“Â¬Ã¥Å½Å¸Ã¥â€ºÂ Ã¨â‚¬Å’Ã©â€¡ÂÃ¥Â¤ÂÃ©â€¡ÂÃ¨Â¯â€¢
* Ã¥ÂË†Ã¥Â¹Â¶Ã©ËœÅ¸Ã¥Ë†â€”Ã¥ÂÅ“Ã¦Â»Å¾
* Ã¦â€”Â Ã©â„¢ÂÃ¥Ë†Â¶Ã¥Ââ€¡Ã§ÂºÂ§Ã¥Â¯Â¼Ã¨â€¡Â´Ã§Å¡â€žÃ¦Ë†ÂÃ¦Å“Â¬Ã¦Â¼â€šÃ§Â§Â»

## Ã¦ÂÂ¢Ã¥Â¤Â

* Ã¥â€ Â»Ã§Â»â€œÃ¥Â¾ÂªÃ§Å½Â¯
* Ã¨Â¿ÂÃ¨Â¡Å’ `/harness-audit`
* Ã¥Â°â€ Ã¨Å’Æ’Ã¥â€ºÂ´Ã§Â¼Â©Ã¥Â°ÂÃ¥Ë†Â°Ã¥Â¤Â±Ã¨Â´Â¥Ã¥Ââ€¢Ã¥â€¦Æ’
* Ã¤Â½Â¿Ã§â€Â¨Ã¦ËœÅ½Ã§Â¡Â®Ã§Å¡â€žÃ©ÂªÅ’Ã¦â€Â¶Ã¦Â â€¡Ã¥â€¡â€ Ã©â€¡ÂÃ¦â€Â¾
