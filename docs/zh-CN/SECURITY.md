# Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€Â¿Ã§Â­â€“

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


## Ã¦â€Â¯Ã¦Å’ÂÃ§â€°Ë†Ã¦Å“Â¬

| Ã§â€°Ë†Ã¦Å“Â¬     | Ã¦â€Â¯Ã¦Å’ÂÃ§Å Â¶Ã¦â‚¬Â           |
| -------- | ------------------ |
| 1.9.x    | :white\_check\_mark: |
| 1.8.x    | :white\_check\_mark: |
| < 1.8    | :x:                |

## Ã¦Å Â¥Ã¥â€˜Å Ã¦Â¼ÂÃ¦Â´Å¾

Ã¥Â¦â€šÃ¦Å¾Å“Ã¦â€šÂ¨Ã¥Å“Â¨ ECC Ã¤Â¸Â­Ã¥Ââ€˜Ã§Å½Â°Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¼ÂÃ¦Â´Å¾Ã¯Â¼Å’Ã¨Â¯Â·Ã¨Â´Å¸Ã¨Â´Â£Ã¤Â»Â»Ã¥Å“Â°Ã¦Å Â¥Ã¥â€˜Å Ã£â‚¬â€š

**Ã¨Â¯Â·Ã¥â€¹Â¿Ã¤Â¸ÂºÃ¥Â®â€°Ã¥â€¦Â¨Ã¦Â¼ÂÃ¦Â´Å¾Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥â€¦Â¬Ã¥Â¼â‚¬Ã§Å¡â€ž GitHub Ã¨Â®Â®Ã©Â¢ËœÃ£â‚¬â€š**

Ã¨Â¯Â·Ã¥Â°â€ Ã¤Â¿Â¡Ã¦ÂÂ¯Ã¥Ââ€˜Ã©â‚¬ÂÃ¨â€¡Â³ **security@ecc.tools**Ã¯Â¼Å’Ã©â€šÂ®Ã¤Â»Â¶Ã¤Â¸Â­Ã©Å“â‚¬Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡

* Ã¦Â¼ÂÃ¦Â´Å¾Ã¦ÂÂÃ¨Â¿Â°
* Ã¥Â¤ÂÃ§Å½Â°Ã¦Â­Â¥Ã©ÂªÂ¤
* Ã¥Ââ€”Ã¥Â½Â±Ã¥â€œÂÃ§Å¡â€žÃ§â€°Ë†Ã¦Å“Â¬
* Ã¤Â»Â»Ã¤Â½â€¢Ã¦Â½Å“Ã¥Å“Â¨Ã§Å¡â€žÃ¥Â½Â±Ã¥â€œÂÃ¨Â¯â€žÃ¤Â¼Â°

Ã¦â€šÂ¨Ã¥ÂÂ¯Ã¤Â»Â¥Ã¦Å“Å¸Ã¥Â¾â€¦Ã¯Â¼Å¡

* **Ã§Â¡Â®Ã¨Â®Â¤Ã©â‚¬Å¡Ã§Å¸Â¥**Ã¯Â¼Å¡48 Ã¥Â°ÂÃ¦â€”Â¶Ã¥â€ â€¦
* **Ã§Å Â¶Ã¦â‚¬ÂÃ¦â€ºÂ´Ã¦â€“Â°**Ã¯Â¼Å¡7 Ã¥Â¤Â©Ã¥â€ â€¦
* **Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Ë†â€“Ã§Â¼â€œÃ¨Â§Â£Ã¦Å½ÂªÃ¦â€“Â½**Ã¯Â¼Å¡Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥â€¦Â³Ã©â€Â®Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’30 Ã¥Â¤Â©Ã¥â€ â€¦

Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Â¼ÂÃ¦Â´Å¾Ã¨Â¢Â«Ã©â€¡â€¡Ã§ÂºÂ³Ã¯Â¼Å’Ã¦Ë†â€˜Ã¤Â»Â¬Ã¥Â°â€ Ã¯Â¼Å¡

* Ã¥Å“Â¨Ã¥Ââ€˜Ã¥Â¸Æ’Ã¨Â¯Â´Ã¦ËœÅ½Ã¤Â¸Â­Ã¦Â³Â¨Ã¦ËœÅ½Ã¦â€šÂ¨Ã§Å¡â€žÃ¨Â´Â¡Ã§Å’Â®Ã¯Â¼Ë†Ã©â„¢Â¤Ã©ÂÅ¾Ã¦â€šÂ¨Ã¥Â¸Å’Ã¦Å“â€ºÃ¥Å’Â¿Ã¥ÂÂÃ¯Â¼â€°
* Ã¥ÂÅ Ã¦â€”Â¶Ã¤Â¿Â®Ã¥Â¤ÂÃ©â€”Â®Ã©Â¢Ëœ
* Ã¤Â¸Å½Ã¦â€šÂ¨Ã¥ÂÂÃ¨Â°Æ’Ã¦Å Â«Ã©Å“Â²Ã¦â€”Â¶Ã©â€”Â´

Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Â¼ÂÃ¦Â´Å¾Ã¨Â¢Â«Ã¦â€¹â€™Ã§Â»ÂÃ¯Â¼Å’Ã¦Ë†â€˜Ã¤Â»Â¬Ã¥Â°â€ Ã¨Â§Â£Ã©â€¡Å Ã¥Å½Å¸Ã¥â€ºÂ Ã¯Â¼Å’Ã¥Â¹Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¦ËœÂ¯Ã¥ÂÂ¦Ã¥Âºâ€Ã¥Ââ€˜Ã¥â€¦Â¶Ã¤Â»â€“Ã¥Å“Â°Ã¦â€“Â¹Ã¦Å Â¥Ã¥â€˜Å Ã§Å¡â€žÃ¦Å’â€¡Ã¥Â¯Â¼Ã£â‚¬â€š

## Ã¨Å’Æ’Ã¥â€ºÂ´

Ã¦Å“Â¬Ã¦â€Â¿Ã§Â­â€“Ã¦Â¶ÂµÃ§â€ºâ€“Ã¯Â¼Å¡

* ECC Ã¦Ââ€™Ã¤Â»Â¶Ã¥ÂÅ Ã¦Â­Â¤Ã¤Â»â€œÃ¥Âºâ€œÃ¤Â¸Â­Ã§Å¡â€žÃ¦â€°â‚¬Ã¦Å“â€°Ã¨â€žÅ¡Ã¦Å“Â¬
* Ã¥Å“Â¨Ã¦â€šÂ¨Ã¦Å“ÂºÃ¥â„¢Â¨Ã¤Â¸Å Ã¦â€°Â§Ã¨Â¡Å’Ã§Å¡â€žÃ©â€™Â©Ã¥Â­ÂÃ¨â€žÅ¡Ã¦Å“Â¬
* Ã¥Â®â€°Ã¨Â£â€¦/Ã¥ÂÂ¸Ã¨Â½Â½/Ã¤Â¿Â®Ã¥Â¤ÂÃ§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã¨â€žÅ¡Ã¦Å“Â¬
* Ã©Å¡Â ECC Ã¥Ë†â€ Ã¥Ââ€˜Ã§Å¡â€ž MCP Ã©â€¦ÂÃ§Â½Â®
* AgentShield Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂÃ¥â„¢Â¨ ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## Ã¥Â®â€°Ã¥â€¦Â¨Ã¨Âµâ€žÃ¦ÂºÂ

* **AgentShield**Ã¯Â¼Å¡Ã¦â€°Â«Ã¦ÂÂÃ¦â€šÂ¨Ã§Å¡â€žÃ¤Â»Â£Ã§Ââ€ Ã©â€¦ÂÃ§Â½Â®Ã¤Â»Â¥Ã¦Å¸Â¥Ã¦â€°Â¾Ã¦Â¼ÂÃ¦Â´Å¾ Ã¢â‚¬â€ `npx ecc-agentshield scan`
* **Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å’â€¡Ã¥Ââ€”**Ã¯Â¼Å¡[The Shorthand Guide to Everything Agentic Security](the-security-guide.md)
* **OWASP MCP Top 10**Ã¯Â¼Å¡[owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
* **OWASP Agentic Applications Top 10**Ã¯Â¼Å¡[genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
