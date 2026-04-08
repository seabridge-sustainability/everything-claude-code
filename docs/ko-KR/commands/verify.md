# ÃªÂ²â‚¬Ã¬Â¦Â Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã­Ëœâ€žÃ¬Å¾Â¬ Ã¬Â½â€Ã«â€œÅ“Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Æ’ÂÃ­Æ’Å“Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã­ÂÂ¬ÃªÂ´â€žÃ¬Â ÂÃ¬ÂÂ¸ ÃªÂ²â‚¬Ã¬Â¦ÂÃ¬Ââ€ž Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬Â§â‚¬Ã¬â€¹Å“Ã¬â€šÂ¬Ã­â€¢Â­

Ã¬Â â€¢Ã­â„¢â€¢Ã­Å¾Ë† Ã¬ÂÂ´ Ã¬Ë†Å“Ã¬â€žÅ“Ã«Â¡Å“ ÃªÂ²â‚¬Ã¬Â¦ÂÃ¬Ââ€ž Ã¬â€¹Â¤Ã­â€“â€°Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€:

1. **Build ÃªÂ²â‚¬Ã¬â€šÂ¬**
   - Ã¬ÂÂ´ Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸Ã¬ÂËœ build Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“ Ã¬â€¹Â¤Ã­â€“â€°
   - Ã¬â€¹Â¤Ã­Å’Â¨ Ã¬â€¹Å“ Ã¬â€”ÂÃ«Å¸Â¬Ã«Â¥Â¼ Ã«Â³Â´ÃªÂ³Â Ã­â€¢ËœÃªÂ³Â  Ã¬Â¤â€˜Ã«â€¹Â¨

2. **Ã­Æ’â‚¬Ã¬Å¾â€¦ ÃªÂ²â‚¬Ã¬â€šÂ¬**
   - TypeScript/Ã­Æ’â‚¬Ã¬Å¾â€¦ Ã¬Â²Â´Ã¬Â»Â¤ Ã¬â€¹Â¤Ã­â€“â€°
   - Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€”ÂÃ«Å¸Â¬Ã«Â¥Â¼ Ã­Å’Å’Ã¬ÂÂ¼:Ã¬Â¤â€žÃ«Â²Ë†Ã­ËœÂ¸Ã«Â¡Å“ Ã«Â³Â´ÃªÂ³Â 

3. **Lint ÃªÂ²â‚¬Ã¬â€šÂ¬**
   - Ã«Â¦Â°Ã­â€žÂ° Ã¬â€¹Â¤Ã­â€“â€°
   - ÃªÂ²Â½ÃªÂ³Â Ã¬â„¢â‚¬ Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â³Â´ÃªÂ³Â 

4. **Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€°**
   - Ã«ÂªÂ¨Ã«â€œÂ  Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€°
   - Ã­â€ ÂµÃªÂ³Â¼/Ã¬â€¹Â¤Ã­Å’Â¨ Ã¬Ë†Ëœ Ã«Â³Â´ÃªÂ³Â 
   - Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬ Ã«Â¹â€žÃ¬Å“Â¨ Ã«Â³Â´ÃªÂ³Â 

5. **Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ Ã¬Å Â¤Ã¬Âºâ€**
   - Ã¬â€ Å’Ã¬Å Â¤ Ã­Å’Å’Ã¬ÂÂ¼Ã¬â€”ÂÃ¬â€žÅ“ API Ã­â€šÂ¤, Ã­â€ Â Ã­ÂÂ°, Ã«Â¹â€žÃ«Â°â‚¬ÃªÂ°â€™ Ã­Å’Â¨Ã­â€žÂ´ ÃªÂ²â‚¬Ã¬Æ’â€°
   - Ã«Â°Å“ÃªÂ²Â¬ Ã¬Å“â€žÃ¬Â¹Ëœ Ã«Â³Â´ÃªÂ³Â 

6. **Console.log ÃªÂ°ÂÃ¬â€šÂ¬**
   - Ã¬â€ Å’Ã¬Å Â¤ Ã­Å’Å’Ã¬ÂÂ¼Ã¬â€”ÂÃ¬â€žÅ“ console.log ÃªÂ²â‚¬Ã¬Æ’â€°
   - Ã¬Å“â€žÃ¬Â¹Ëœ Ã«Â³Â´ÃªÂ³Â 

7. **Git Ã¬Æ’ÂÃ­Æ’Å“**
   - Ã¬Â»Â¤Ã«Â°â€¹Ã«ÂËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬Ââ‚¬ Ã«Â³â‚¬ÃªÂ²Â½Ã¬â€šÂ¬Ã­â€¢Â­ Ã­â€˜Å“Ã¬â€¹Å“
   - Ã«Â§Ë†Ã¬Â§â‚¬Ã«Â§â€° Ã¬Â»Â¤Ã«Â°â€¹ Ã¬ÂÂ´Ã­â€ºâ€ž Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÅ“ Ã­Å’Å’Ã¬ÂÂ¼ Ã­â€˜Å“Ã¬â€¹Å“

## Ã¬Â¶Å“Ã«Â Â¥

ÃªÂ°â€žÃªÂ²Â°Ã­â€¢Å“ ÃªÂ²â‚¬Ã¬Â¦Â Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“Ã«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```
VERIFICATION: [PASS/FAIL]

Build:    [OK/FAIL]
Types:    [OK/X errors]
Lint:     [OK/X issues]
Tests:    [X/Y passed, Z% coverage]
Secrets:  [OK/X found]
Logs:     [OK/X console.logs]

Ready for PR: [YES/NO]
```

Ã¬Â¹ËœÃ«Âªâ€¦Ã¬Â Â Ã¬ÂÂ´Ã¬Å Ë†ÃªÂ°â‚¬ Ã¬Å¾Ë†Ã¬Å“Â¼Ã«Â©Â´ Ã¬Ë†ËœÃ¬Â â€¢ Ã¬Â Å“Ã¬â€¢Ë†ÃªÂ³Â¼ Ã­â€¢Â¨ÃªÂ»Ëœ Ã«ÂªÂ©Ã«Â¡ÂÃ­â„¢â€Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬ÂÂ¸Ã¬Å¾Â

$ARGUMENTS:
- `quick` - build + Ã­Æ’â‚¬Ã¬Å¾â€¦Ã«Â§Å’
- `full` - Ã«ÂªÂ¨Ã«â€œÂ  ÃªÂ²â‚¬Ã¬â€šÂ¬ (ÃªÂ¸Â°Ã«Â³Â¸ÃªÂ°â€™)
- `pre-commit` - Ã¬Â»Â¤Ã«Â°â€¹Ã¬â€”Â ÃªÂ´â‚¬Ã«Â Â¨Ã«ÂÅ“ ÃªÂ²â‚¬Ã¬â€šÂ¬
- `pre-pr` - Ã¬Â â€žÃ¬Â²Â´ ÃªÂ²â‚¬Ã¬â€šÂ¬ + Ã«Â³Â´Ã¬â€¢Ë† Ã¬Å Â¤Ã¬Âºâ€
