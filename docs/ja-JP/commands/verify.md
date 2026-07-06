# Ã¦Â¤Å“Ã¨Â¨Â¼Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

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


Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ®Ã§Å Â¶Ã¦â€¦â€¹Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂªÃ¦Â¤Å“Ã¨Â¨Â¼Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¦â€°â€¹Ã©Â â€ 

Ã£Ââ€œÃ£ÂÂ®Ã¦Â­Â£Ã§Â¢ÂºÃ£ÂÂªÃ©Â â€ Ã¥ÂºÂÃ£ÂÂ§Ã¦Â¤Å“Ã¨Â¨Â¼Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž:

1. **Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯**
   - Ã£Ââ€œÃ£ÂÂ®Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
   - Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ€”Ã£ÂÅ¸Ã¥Â Â´Ã¥ÂË†Ã£â‚¬ÂÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¥Â Â±Ã¥â€˜Å Ã£Ââ€”Ã£ÂÂ¦**Ã¥ÂÅ“Ã¦Â­Â¢**

2. **Ã¥Å¾â€¹Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯**
   - TypeScript/Ã¥Å¾â€¹Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ«Ã£Æ’Â¼Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
   - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«:Ã¨Â¡Å’Ã§â€¢ÂªÃ¥ÂÂ·Ã£ÂÂ¨Ã£ÂÂ¨Ã£â€šâ€šÃ£ÂÂ«Ã¥Â Â±Ã¥â€˜Å 

3. **LintÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯**
   - LinterÃ£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
   - Ã¨Â­Â¦Ã¥â€˜Å Ã£ÂÂ¨Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¥Â Â±Ã¥â€˜Å 

4. **Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¹Ã£â€šÂ¤Ã£Æ’Â¼Ã£Æ’Ë†**
   - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
   - Ã¥ÂË†Ã¦Â Â¼/Ã¤Â¸ÂÃ¥ÂË†Ã¦Â Â¼Ã£ÂÂ®Ã¦â€¢Â°Ã£â€šâ€™Ã¥Â Â±Ã¥â€˜Å 
   - Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£ÂÂ®Ã£Æ’â€˜Ã£Æ’Â¼Ã£â€šÂ»Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ¸Ã£â€šâ€™Ã¥Â Â±Ã¥â€˜Å 

5. **Console.logÃ§â€ºÂ£Ã¦Å¸Â»**
   - Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ§console.logÃ£â€šâ€™Ã¦Â¤Å“Ã§Â´Â¢
   - Ã¥Â Â´Ã¦â€°â‚¬Ã£â€šâ€™Ã¥Â Â±Ã¥â€˜Å 

6. **GitÃ§Å Â¶Ã¦â€¦â€¹**
   - Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂªÃ£Ââ€žÃ¥Â¤â€°Ã¦â€ºÂ´Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº
   - Ã¦Å“â‚¬Ã¥Â¾Å’Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã¤Â»Â¥Ã©â„¢ÂÃ£ÂÂ«Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¨Â¡Â¨Ã§Â¤Âº

## Ã¥â€¡ÂºÃ¥Å â€º

Ã§Â°Â¡Ã¦Â½â€Ã£ÂÂªÃ¦Â¤Å“Ã¨Â¨Â¼Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†ÂÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢:

```
Ã¦Â¤Å“Ã¨Â¨Â¼Ã§ÂµÂÃ¦Å¾Å“: [PASS/FAIL]

Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°:       [OK/FAIL]
Ã¥Å¾â€¹:           [OK/XÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼]
Lint:         [OK/XÃ¤Â»Â¶Ã£ÂÂ®Ã¥â€¢ÂÃ©Â¡Å’]
Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†:       [X/YÃ¥ÂË†Ã¦Â Â¼, Z%Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸]
Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†: [OK/XÃ¤Â»Â¶Ã§â„¢ÂºÃ¨Â¦â€¹]
Ã£Æ’Â­Ã£â€šÂ°:         [OK/XÃ¤Â»Â¶Ã£ÂÂ®console.log]

PRÃ¦Âºâ€“Ã¥â€šâ„¢Ã¥Â®Å’Ã¤Âºâ€ : [YES/NO]
```

Ã©â€¡ÂÃ¥Â¤Â§Ã£ÂÂªÃ¥â€¢ÂÃ©Â¡Å’Ã£ÂÅ’Ã£Ââ€šÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯Ã£â‚¬ÂÃ¤Â¿Â®Ã¦Â­Â£Ã¦Â¡Ë†Ã£ÂÂ¨Ã£ÂÂ¨Ã£â€šâ€šÃ£ÂÂ«Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¥Â¼â€¢Ã¦â€¢Â°

$ARGUMENTS Ã£ÂÂ¯Ã¤Â»Â¥Ã¤Â¸â€¹Ã£ÂÂ®Ã£Ââ€žÃ£ÂÅ¡Ã£â€šÅ’Ã£Ââ€¹:
- `quick` - Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€° + Ã¥Å¾â€¹Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ®Ã£ÂÂ¿
- `full` - Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã¯Â¼Ë†Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã¯Â¼â€°
- `pre-commit` - Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£ÂÂ«Ã©â€“Â¢Ã©â‚¬Â£Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
- `pre-pr` - Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯ + Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³
