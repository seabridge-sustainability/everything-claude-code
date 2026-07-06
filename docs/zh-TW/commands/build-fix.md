# Ã¥Â»ÂºÃ§Â½Â®Ã¨Ë†â€¡Ã¤Â¿Â®Ã¥Â¾Â©

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


Ã¥Â¢Å¾Ã©â€¡ÂÃ¤Â¿Â®Ã¥Â¾Â© TypeScript Ã¥â€™Å’Ã¥Â»ÂºÃ§Â½Â®Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡

1. Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â»ÂºÃ§Â½Â®Ã¯Â¼Å¡npm run build Ã¦Ë†â€“ pnpm build

2. Ã¨Â§Â£Ã¦Å¾ÂÃ©Å’Â¯Ã¨ÂªÂ¤Ã¨Â¼Â¸Ã¥â€¡ÂºÃ¯Â¼Å¡
   - Ã¤Â¾ÂÃ¦Âªâ€Ã¦Â¡Ë†Ã¥Ë†â€ Ã§Âµâ€ž
   - Ã¤Â¾ÂÃ¥Å¡Â´Ã©â€¡ÂÃ¦â‚¬Â§Ã¦Å½â€™Ã¥ÂºÂ

3. Ã¥Â°ÂÃ¦Â¯ÂÃ¥â‚¬â€¹Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡
   - Ã©Â¡Â¯Ã§Â¤ÂºÃ©Å’Â¯Ã¨ÂªÂ¤Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¯Â¼Ë†Ã¥â€°ÂÃ¥Â¾Å’ 5 Ã¨Â¡Å’Ã¯Â¼â€°
   - Ã¨Â§Â£Ã©â€¡â€¹Ã¥â€¢ÂÃ©Â¡Å’
   - Ã¦ÂÂÃ¥â€¡ÂºÃ¤Â¿Â®Ã¥Â¾Â©Ã¦â€“Â¹Ã¦Â¡Ë†
   - Ã¥Â¥â€”Ã§â€Â¨Ã¤Â¿Â®Ã¥Â¾Â©
   - Ã©â€¡ÂÃ¦â€“Â°Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â»ÂºÃ§Â½Â®
   - Ã©Â©â€”Ã¨Â­â€°Ã©Å’Â¯Ã¨ÂªÂ¤Ã¥Â·Â²Ã¨Â§Â£Ã¦Â±Âº

4. Ã¥ÂÅ“Ã¦Â­Â¢Ã¦Â¢ÂÃ¤Â»Â¶Ã¯Â¼Å¡
   - Ã¤Â¿Â®Ã¥Â¾Â©Ã¥Â¼â€¢Ã¥â€¦Â¥Ã¦â€“Â°Ã©Å’Â¯Ã¨ÂªÂ¤
   - 3 Ã¦Â¬Â¡Ã¥Ëœâ€”Ã¨Â©Â¦Ã¥Â¾Å’Ã¥ÂÅ’Ã¦Â¨Â£Ã©Å’Â¯Ã¨ÂªÂ¤Ã¤Â»ÂÃ¥Â­ËœÃ¥Å“Â¨
   - Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¨Â¦ÂÃ¦Â±â€šÃ¦Å¡Â«Ã¥ÂÅ“

5. Ã©Â¡Â¯Ã§Â¤ÂºÃ¦â€˜ËœÃ¨Â¦ÂÃ¯Â¼Å¡
   - Ã¥Â·Â²Ã¤Â¿Â®Ã¥Â¾Â©Ã§Å¡â€žÃ©Å’Â¯Ã¨ÂªÂ¤
   - Ã¥â€°Â©Ã©Â¤ËœÃ§Å¡â€žÃ©Å’Â¯Ã¨ÂªÂ¤
   - Ã¦â€“Â°Ã¥Â¼â€¢Ã¥â€¦Â¥Ã§Å¡â€žÃ©Å’Â¯Ã¨ÂªÂ¤

Ã§â€šÂºÃ¤Âºâ€ Ã¥Â®â€°Ã¥â€¦Â¨Ã¯Â¼Å’Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¾Â©Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Â
