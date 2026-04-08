# Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¥Ë†â€ Ã¦Å¾ÂÃ¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¤Â¸Â¦Ã§â€Â¢Ã§â€Å¸Ã§Â¼ÂºÃ¥Â°â€˜Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Å¡

1. Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â¸Â¶Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Å¡npm test --coverage Ã¦Ë†â€“ pnpm test --coverage

2. Ã¥Ë†â€ Ã¦Å¾ÂÃ¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¥Â Â±Ã¥â€˜Å Ã¯Â¼Ë†coverage/coverage-summary.jsonÃ¯Â¼â€°

3. Ã¨Â­ËœÃ¥Ë†Â¥Ã¤Â½Å½Ã¦â€“Â¼ 80% Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã©â€“Â¾Ã¥â‚¬Â¼Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†

4. Ã¥Â°ÂÃ¦Â¯ÂÃ¥â‚¬â€¹Ã¨Â¦â€ Ã¨â€œâ€¹Ã¤Â¸ÂÃ¨Â¶Â³Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å¡
   - Ã¥Ë†â€ Ã¦Å¾ÂÃ¦Å“ÂªÃ¦Â¸Â¬Ã¨Â©Â¦Ã§Å¡â€žÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¨Â·Â¯Ã¥Â¾â€˜
   - Ã§â€šÂºÃ¥â€¡Â½Ã¥Â¼ÂÃ§â€Â¢Ã§â€Å¸Ã¥â€“Â®Ã¥â€¦Æ’Ã¦Â¸Â¬Ã¨Â©Â¦
   - Ã§â€šÂº API Ã§â€Â¢Ã§â€Å¸Ã¦â€¢Â´Ã¥ÂË†Ã¦Â¸Â¬Ã¨Â©Â¦
   - Ã§â€šÂºÃ©â€”Å“Ã©ÂÂµÃ¦ÂµÂÃ§Â¨â€¹Ã§â€Â¢Ã§â€Å¸ E2E Ã¦Â¸Â¬Ã¨Â©Â¦

5. Ã©Â©â€”Ã¨Â­â€°Ã¦â€“Â°Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½

6. Ã©Â¡Â¯Ã§Â¤ÂºÃ¥â€°ÂÃ¥Â¾Å’Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã¦Å’â€¡Ã¦Â¨â„¢

7. Ã§Â¢ÂºÃ¤Â¿ÂÃ¥Â°Ë†Ã¦Â¡Ë†Ã©Ââ€Ã¥Ë†Â° 80% Ã¤Â»Â¥Ã¤Â¸Å Ã¦â€¢Â´Ã©Â«â€Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡

Ã¥Â°Ë†Ã¦Â³Â¨Ã¦â€“Â¼Ã¯Â¼Å¡
- Ã¦Â­Â£Ã¥Â¸Â¸Ã¦ÂµÂÃ§Â¨â€¹Ã¦Æ’â€¦Ã¥Â¢Æ’
- Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ 
- Ã©â€šÅ Ã§â€¢Å’Ã¦Æ’â€¦Ã¦Â³ÂÃ¯Â¼Ë†nullÃ£â‚¬ÂundefinedÃ£â‚¬ÂÃ§Â©ÂºÃ¥â‚¬Â¼Ã¯Â¼â€°
- Ã©â€šÅ Ã§â€¢Å’Ã¦Â¢ÂÃ¤Â»Â¶
