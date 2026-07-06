---
name: iterative-retrieval
description: Pattern for progressively refining context retrieval to solve the subagent context problem
---

# Ã¨Â¿Â­Ã¤Â»Â£Ã¦ÂªÂ¢Ã§Â´Â¢Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã¨Â§Â£Ã¦Â±ÂºÃ¥Â¤Å¡ agent Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¤Â¸Â­Ã§Å¡â€žÃ£â‚¬Å’Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¥â€¢ÂÃ©Â¡Å’Ã£â‚¬ÂÃ¯Â¼Å’Ã¥â€¦Â¶Ã¤Â¸Â­Ã¥Â­Â agents Ã¥Å“Â¨Ã©â€“â€¹Ã¥Â§â€¹Ã¥Â·Â¥Ã¤Â½Å“Ã¤Â¹â€¹Ã¥â€°ÂÃ¤Â¸ÂÃ§Å¸Â¥Ã©Ââ€œÃ©Å“â‚¬Ã¨Â¦ÂÃ¤Â»â‚¬Ã©ÂºÂ¼Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã£â‚¬â€š

## Ã¥â€¢ÂÃ©Â¡Å’

Ã¥Â­Â agents Ã¤Â»Â¥Ã¦Å“â€°Ã©â„¢ÂÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§â€Â¢Ã§â€Å¸Ã£â‚¬â€šÃ¥Â®Æ’Ã¥â‚¬â€˜Ã¤Â¸ÂÃ§Å¸Â¥Ã©Ââ€œÃ¯Â¼Å¡
- Ã¥â€œÂªÃ¤Âºâ€ºÃ¦Âªâ€Ã¦Â¡Ë†Ã¥Å’â€¦Ã¥ÂÂ«Ã§â€ºÂ¸Ã©â€”Å“Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼
- Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂºÂ«Ã¤Â¸Â­Ã¥Â­ËœÃ¥Å“Â¨Ã¤Â»â‚¬Ã©ÂºÂ¼Ã¦Â¨Â¡Ã¥Â¼Â
- Ã¥Â°Ë†Ã¦Â¡Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¤Â»â‚¬Ã©ÂºÂ¼Ã¨Â¡â€œÃ¨ÂªÅ¾

Ã¦Â¨â„¢Ã¦Âºâ€“Ã¦â€“Â¹Ã¦Â³â€¢Ã¥Â¤Â±Ã¦â€¢â€”Ã¯Â¼Å¡
- **Ã¥â€šÂ³Ã©â‚¬ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã¥â€¦Â§Ã¥Â®Â¹**Ã¯Â¼Å¡Ã¨Â¶â€¦Ã©ÂÅ½Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã©â„¢ÂÃ¥Ë†Â¶
- **Ã¤Â¸ÂÃ¥â€šÂ³Ã©â‚¬ÂÃ¥â€¦Â§Ã¥Â®Â¹**Ã¯Â¼Å¡Agent Ã§Â¼ÂºÃ¤Â¹ÂÃ©â€”Å“Ã©ÂÂµÃ¨Â³â€¡Ã¨Â¨Å 
- **Ã§Å’Å“Ã¦Â¸Â¬Ã©Å“â‚¬Ã¨Â¦ÂÃ¤Â»â‚¬Ã©ÂºÂ¼**Ã¯Â¼Å¡Ã§Â¶â€œÃ¥Â¸Â¸Ã©Å’Â¯Ã¨ÂªÂ¤

## Ã¨Â§Â£Ã¦Â±ÂºÃ¦â€“Â¹Ã¦Â¡Ë†Ã¯Â¼Å¡Ã¨Â¿Â­Ã¤Â»Â£Ã¦ÂªÂ¢Ã§Â´Â¢

Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã¦Â¼Â¸Ã©â‚¬Â²Ã§Â²Â¾Ã§â€¦â€°Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Å¡â€ž 4 Ã©Å¡Å½Ã¦Â®ÂµÃ¥Â¾ÂªÃ§â€™Â°Ã¯Â¼Å¡

```
Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â
Ã¢â€â€š                                             Ã¢â€â€š
Ã¢â€â€š   Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â      Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â            Ã¢â€â€š
Ã¢â€â€š   Ã¢â€â€š DISPATCH Ã¢â€â€šÃ¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â€š EVALUATE Ã¢â€â€š            Ã¢â€â€š
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ      Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ            Ã¢â€â€š
Ã¢â€â€š        Ã¢â€“Â²                  Ã¢â€â€š                 Ã¢â€â€š
Ã¢â€â€š        Ã¢â€â€š                  Ã¢â€“Â¼                 Ã¢â€â€š
Ã¢â€â€š   Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â      Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â            Ã¢â€â€š
Ã¢â€â€š   Ã¢â€â€š   LOOP   Ã¢â€â€šÃ¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â€š  REFINE  Ã¢â€â€š            Ã¢â€â€š
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ      Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ            Ã¢â€â€š
Ã¢â€â€š                                             Ã¢â€â€š
Ã¢â€â€š        Ã¦Å“â‚¬Ã¥Â¤Å¡ 3 Ã¥â‚¬â€¹Ã¥Â¾ÂªÃ§â€™Â°Ã¯Â¼Å’Ã§â€žÂ¶Ã¥Â¾Å’Ã§Â¹Â¼Ã§ÂºÅ’               Ã¢â€â€š
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ
```

### Ã©Å¡Å½Ã¦Â®Âµ 1Ã¯Â¼Å¡DISPATCH

Ã¥Ë†ÂÃ¥Â§â€¹Ã¥Â»Â£Ã¦Â³â€ºÃ¦Å¸Â¥Ã¨Â©Â¢Ã¤Â»Â¥Ã¦â€Â¶Ã©â€ºâ€ Ã¥â‚¬â„¢Ã©ÂÂ¸Ã¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å¡

```javascript
// Ã¥Â¾Å¾Ã©Â«ËœÃ¥Â±Â¤Ã¦â€žÂÃ¥Å“â€“Ã©â€“â€¹Ã¥Â§â€¹
const initialQuery = {
  patterns: ['src/**/*.ts', 'lib/**/*.ts'],
  keywords: ['authentication', 'user', 'session'],
  excludes: ['*.test.ts', '*.spec.ts']
};

// Ã¦Â´Â¾Ã©ÂÂ£Ã¥Ë†Â°Ã¦ÂªÂ¢Ã§Â´Â¢ agent
const candidates = await retrieveFiles(initialQuery);
```

### Ã©Å¡Å½Ã¦Â®Âµ 2Ã¯Â¼Å¡EVALUATE

Ã¨Â©â€¢Ã¤Â¼Â°Ã¦ÂªÂ¢Ã§Â´Â¢Ã¥â€¦Â§Ã¥Â®Â¹Ã§Å¡â€žÃ§â€ºÂ¸Ã©â€”Å“Ã¦â‚¬Â§Ã¯Â¼Å¡

```javascript
function evaluateRelevance(files, task) {
  return files.map(file => ({
    path: file.path,
    relevance: scoreRelevance(file.content, task),
    reason: explainRelevance(file.content, task),
    missingContext: identifyGaps(file.content, task)
  }));
}
```

Ã¨Â©â€¢Ã¥Ë†â€ Ã¦Â¨â„¢Ã¦Âºâ€“Ã¯Â¼Å¡
- **Ã©Â«ËœÃ¯Â¼Ë†0.8-1.0Ã¯Â¼â€°**Ã¯Â¼Å¡Ã§â€ºÂ´Ã¦Å½Â¥Ã¥Â¯Â¦Ã¤Â½Å“Ã§â€ºÂ®Ã¦Â¨â„¢Ã¥Å Å¸Ã¨Æ’Â½
- **Ã¤Â¸Â­Ã¯Â¼Ë†0.5-0.7Ã¯Â¼â€°**Ã¯Â¼Å¡Ã¥Å’â€¦Ã¥ÂÂ«Ã§â€ºÂ¸Ã©â€”Å“Ã¦Â¨Â¡Ã¥Â¼ÂÃ¦Ë†â€“Ã©Â¡Å¾Ã¥Å¾â€¹
- **Ã¤Â½Å½Ã¯Â¼Ë†0.2-0.4Ã¯Â¼â€°**Ã¯Â¼Å¡Ã©â€“â€œÃ¦Å½Â¥Ã§â€ºÂ¸Ã©â€”Å“
- **Ã§â€žÂ¡Ã¯Â¼Ë†0-0.2Ã¯Â¼â€°**Ã¯Â¼Å¡Ã¤Â¸ÂÃ§â€ºÂ¸Ã©â€”Å“Ã¯Â¼Å’Ã¦Å½â€™Ã©â„¢Â¤

### Ã©Å¡Å½Ã¦Â®Âµ 3Ã¯Â¼Å¡REFINE

Ã¥Å¸ÂºÃ¦â€“Â¼Ã¨Â©â€¢Ã¤Â¼Â°Ã¦â€ºÂ´Ã¦â€“Â°Ã¦ÂÅ“Ã¥Â°â€¹Ã¦Â¨â„¢Ã¦Âºâ€“Ã¯Â¼Å¡

```javascript
function refineQuery(evaluation, previousQuery) {
  return {
    // Ã¦â€“Â°Ã¥Â¢Å¾Ã¥Å“Â¨Ã©Â«ËœÃ§â€ºÂ¸Ã©â€”Å“Ã¦â‚¬Â§Ã¦Âªâ€Ã¦Â¡Ë†Ã¤Â¸Â­Ã§â„¢Â¼Ã§ÂÂ¾Ã§Å¡â€žÃ¦â€“Â°Ã¦Â¨Â¡Ã¥Â¼Â
    patterns: [...previousQuery.patterns, ...extractPatterns(evaluation)],

    // Ã¦â€“Â°Ã¥Â¢Å¾Ã¥Å“Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂºÂ«Ã¤Â¸Â­Ã¦â€°Â¾Ã¥Ë†Â°Ã§Å¡â€žÃ¨Â¡â€œÃ¨ÂªÅ¾
    keywords: [...previousQuery.keywords, ...extractKeywords(evaluation)],

    // Ã¦Å½â€™Ã©â„¢Â¤Ã§Â¢ÂºÃ¨ÂªÂÃ¤Â¸ÂÃ§â€ºÂ¸Ã©â€”Å“Ã§Å¡â€žÃ¨Â·Â¯Ã¥Â¾â€˜
    excludes: [...previousQuery.excludes, ...evaluation
      .filter(e => e.relevance < 0.2)
      .map(e => e.path)
    ],

    // Ã©â€¡ÂÃ¥Â°ÂÃ§â€°Â¹Ã¥Â®Å¡Ã§Â¼ÂºÃ¥ÂÂ£
    focusAreas: evaluation
      .flatMap(e => e.missingContext)
      .filter(unique)
  };
}
```

### Ã©Å¡Å½Ã¦Â®Âµ 4Ã¯Â¼Å¡LOOP

Ã¤Â»Â¥Ã§Â²Â¾Ã§â€¦â€°Ã¦Â¨â„¢Ã¦Âºâ€“Ã©â€¡ÂÃ¨Â¤â€¡Ã¯Â¼Ë†Ã¦Å“â‚¬Ã¥Â¤Å¡ 3 Ã¥â‚¬â€¹Ã¥Â¾ÂªÃ§â€™Â°Ã¯Â¼â€°Ã¯Â¼Å¡

```javascript
async function iterativeRetrieve(task, maxCycles = 3) {
  let query = createInitialQuery(task);
  let bestContext = [];

  for (let cycle = 0; cycle < maxCycles; cycle++) {
    const candidates = await retrieveFiles(query);
    const evaluation = evaluateRelevance(candidates, task);

    // Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¦Å“â€°Ã¨Â¶Â³Ã¥Â¤Â Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
    const highRelevance = evaluation.filter(e => e.relevance >= 0.7);
    if (highRelevance.length >= 3 && !hasCriticalGaps(evaluation)) {
      return highRelevance;
    }

    // Ã§Â²Â¾Ã§â€¦â€°Ã¤Â¸Â¦Ã§Â¹Â¼Ã§ÂºÅ’
    query = refineQuery(evaluation, query);
    bestContext = mergeContext(bestContext, highRelevance);
  }

  return bestContext;
}
```

## Ã¥Â¯Â¦Ã©Å¡â€ºÃ§Â¯â€žÃ¤Â¾â€¹

### Ã§Â¯â€žÃ¤Â¾â€¹ 1Ã¯Â¼Å¡Bug Ã¤Â¿Â®Ã¥Â¾Â©Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡

```
Ã¤Â»Â»Ã¥â€¹â„¢Ã¯Â¼Å¡Ã£â‚¬Å’Ã¤Â¿Â®Ã¥Â¾Â©Ã¨ÂªÂÃ¨Â­â€° token Ã©ÂÅ½Ã¦Å“Å¸ bugÃ£â‚¬Â

Ã¥Â¾ÂªÃ§â€™Â° 1Ã¯Â¼Å¡
  DISPATCHÃ¯Â¼Å¡Ã¥Å“Â¨ src/** Ã¦ÂÅ“Ã¥Â°â€¹ "token"Ã£â‚¬Â"auth"Ã£â‚¬Â"expiry"
  EVALUATEÃ¯Â¼Å¡Ã¦â€°Â¾Ã¥Ë†Â° auth.ts (0.9)Ã£â‚¬Âtokens.ts (0.8)Ã£â‚¬Âuser.ts (0.3)
  REFINEÃ¯Â¼Å¡Ã¦â€“Â°Ã¥Â¢Å¾ "refresh"Ã£â‚¬Â"jwt" Ã©â€”Å“Ã©ÂÂµÃ¥Â­â€”Ã¯Â¼â€ºÃ¦Å½â€™Ã©â„¢Â¤ user.ts

Ã¥Â¾ÂªÃ§â€™Â° 2Ã¯Â¼Å¡
  DISPATCHÃ¯Â¼Å¡Ã¦ÂÅ“Ã¥Â°â€¹Ã§Â²Â¾Ã§â€¦â€°Ã¨Â¡â€œÃ¨ÂªÅ¾
  EVALUATEÃ¯Â¼Å¡Ã¦â€°Â¾Ã¥Ë†Â° session-manager.ts (0.95)Ã£â‚¬Âjwt-utils.ts (0.85)
  REFINEÃ¯Â¼Å¡Ã¨Â¶Â³Ã¥Â¤Â Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¯Â¼Ë†2 Ã¥â‚¬â€¹Ã©Â«ËœÃ§â€ºÂ¸Ã©â€”Å“Ã¦â‚¬Â§Ã¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼â€°

Ã§ÂµÂÃ¦Å¾Å“Ã¯Â¼Å¡auth.tsÃ£â‚¬Âtokens.tsÃ£â‚¬Âsession-manager.tsÃ£â‚¬Âjwt-utils.ts
```

### Ã§Â¯â€žÃ¤Â¾â€¹ 2Ã¯Â¼Å¡Ã¥Å Å¸Ã¨Æ’Â½Ã¥Â¯Â¦Ã¤Â½Å“

```
Ã¤Â»Â»Ã¥â€¹â„¢Ã¯Â¼Å¡Ã£â‚¬Å’Ã§â€šÂº API Ã§Â«Â¯Ã©Â»Å¾Ã¥Â¢Å¾Ã¥Å Â Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶Ã£â‚¬Â

Ã¥Â¾ÂªÃ§â€™Â° 1Ã¯Â¼Å¡
  DISPATCHÃ¯Â¼Å¡Ã¥Å“Â¨ routes/** Ã¦ÂÅ“Ã¥Â°â€¹ "rate"Ã£â‚¬Â"limit"Ã£â‚¬Â"api"
  EVALUATEÃ¯Â¼Å¡Ã§â€žÂ¡Ã¥Å’Â¹Ã©â€¦Â - Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂºÂ«Ã¤Â½Â¿Ã§â€Â¨ "throttle" Ã¨Â¡â€œÃ¨ÂªÅ¾
  REFINEÃ¯Â¼Å¡Ã¦â€“Â°Ã¥Â¢Å¾ "throttle"Ã£â‚¬Â"middleware" Ã©â€”Å“Ã©ÂÂµÃ¥Â­â€”

Ã¥Â¾ÂªÃ§â€™Â° 2Ã¯Â¼Å¡
  DISPATCHÃ¯Â¼Å¡Ã¦ÂÅ“Ã¥Â°â€¹Ã§Â²Â¾Ã§â€¦â€°Ã¨Â¡â€œÃ¨ÂªÅ¾
  EVALUATEÃ¯Â¼Å¡Ã¦â€°Â¾Ã¥Ë†Â° throttle.ts (0.9)Ã£â‚¬Âmiddleware/index.ts (0.7)
  REFINEÃ¯Â¼Å¡Ã©Å“â‚¬Ã¨Â¦ÂÃ¨Â·Â¯Ã§â€Â±Ã¥â„¢Â¨Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Â¾ÂªÃ§â€™Â° 3Ã¯Â¼Å¡
  DISPATCHÃ¯Â¼Å¡Ã¦ÂÅ“Ã¥Â°â€¹ "router"Ã£â‚¬Â"express" Ã¦Â¨Â¡Ã¥Â¼Â
  EVALUATEÃ¯Â¼Å¡Ã¦â€°Â¾Ã¥Ë†Â° router-setup.ts (0.8)
  REFINEÃ¯Â¼Å¡Ã¨Â¶Â³Ã¥Â¤Â Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡

Ã§ÂµÂÃ¦Å¾Å“Ã¯Â¼Å¡throttle.tsÃ£â‚¬Âmiddleware/index.tsÃ£â‚¬Ârouter-setup.ts
```

## Ã¨Ë†â€¡ Agents Ã¦â€¢Â´Ã¥ÂË†

Ã¥Å“Â¨ agent Ã¦ÂÂÃ§Â¤ÂºÃ¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Å¡

```markdown
Ã§â€šÂºÃ¦Â­Â¤Ã¤Â»Â»Ã¥â€¹â„¢Ã¦ÂªÂ¢Ã§Â´Â¢Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¦â„¢â€šÃ¯Â¼Å¡
1. Ã¥Â¾Å¾Ã¥Â»Â£Ã¦Â³â€ºÃ©â€”Å“Ã©ÂÂµÃ¥Â­â€”Ã¦ÂÅ“Ã¥Â°â€¹Ã©â€“â€¹Ã¥Â§â€¹
2. Ã¨Â©â€¢Ã¤Â¼Â°Ã¦Â¯ÂÃ¥â‚¬â€¹Ã¦Âªâ€Ã¦Â¡Ë†Ã§Å¡â€žÃ§â€ºÂ¸Ã©â€”Å“Ã¦â‚¬Â§Ã¯Â¼Ë†0-1 Ã¥Â°ÂºÃ¥ÂºÂ¦Ã¯Â¼â€°
3. Ã¨Â­ËœÃ¥Ë†Â¥Ã¤Â»ÂÃ§Â¼ÂºÃ¥Â°â€˜Ã§Å¡â€žÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
4. Ã§Â²Â¾Ã§â€¦â€°Ã¦ÂÅ“Ã¥Â°â€¹Ã¦Â¨â„¢Ã¦Âºâ€“Ã¤Â¸Â¦Ã©â€¡ÂÃ¨Â¤â€¡Ã¯Â¼Ë†Ã¦Å“â‚¬Ã¥Â¤Å¡ 3 Ã¥â‚¬â€¹Ã¥Â¾ÂªÃ§â€™Â°Ã¯Â¼â€°
5. Ã¥â€ºÅ¾Ã¥â€šÂ³Ã§â€ºÂ¸Ã©â€”Å“Ã¦â‚¬Â§ >= 0.7 Ã§Å¡â€žÃ¦Âªâ€Ã¦Â¡Ë†
```

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢

1. **Ã¥Â¾Å¾Ã¥Â»Â£Ã¦Â³â€ºÃ©â€“â€¹Ã¥Â§â€¹Ã¯Â¼Å’Ã©â‚¬ÂÃ¦Â¼Â¸Ã§Â¸Â®Ã¥Â°Â** - Ã¤Â¸ÂÃ¨Â¦ÂÃ©ÂÅ½Ã¥ÂºÂ¦Ã¦Å’â€¡Ã¥Â®Å¡Ã¥Ë†ÂÃ¥Â§â€¹Ã¦Å¸Â¥Ã¨Â©Â¢
2. **Ã¥Â­Â¸Ã§Â¿â€™Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂºÂ«Ã¨Â¡â€œÃ¨ÂªÅ¾** - Ã§Â¬Â¬Ã¤Â¸â‚¬Ã¥â‚¬â€¹Ã¥Â¾ÂªÃ§â€™Â°Ã©â‚¬Å¡Ã¥Â¸Â¸Ã¦Å“Æ’Ã¦ÂÂ­Ã§Â¤ÂºÃ¥â€˜Â½Ã¥ÂÂÃ¦â€¦Â£Ã¤Â¾â€¹
3. **Ã¨Â¿Â½Ã¨Â¹Â¤Ã§Â¼ÂºÃ¥Â¤Â±Ã¥â€¦Â§Ã¥Â®Â¹** - Ã¦ËœÅ½Ã§Â¢ÂºÃ§Å¡â€žÃ§Â¼ÂºÃ¥ÂÂ£Ã¨Â­ËœÃ¥Ë†Â¥Ã©Â©â€¦Ã¥â€¹â€¢Ã§Â²Â¾Ã§â€¦â€°
4. **Ã¥Å“Â¨Ã£â‚¬Å’Ã¨Â¶Â³Ã¥Â¤Â Ã¥Â¥Â½Ã£â‚¬ÂÃ¦â„¢â€šÃ¥ÂÅ“Ã¦Â­Â¢** - 3 Ã¥â‚¬â€¹Ã©Â«ËœÃ§â€ºÂ¸Ã©â€”Å“Ã¦â‚¬Â§Ã¦Âªâ€Ã¦Â¡Ë†Ã¥â€¹ÂÃ©ÂÅ½ 10 Ã¥â‚¬â€¹Ã¦â„¢Â®Ã©â‚¬Å¡Ã¦Âªâ€Ã¦Â¡Ë†
5. **Ã¨â€¡ÂªÃ¤Â¿Â¡Ã¥Å“Â°Ã¦Å½â€™Ã©â„¢Â¤** - Ã¤Â½Å½Ã§â€ºÂ¸Ã©â€”Å“Ã¦â‚¬Â§Ã¦Âªâ€Ã¦Â¡Ë†Ã¤Â¸ÂÃ¦Å“Æ’Ã¨Â®Å Ã¥Â¾â€”Ã§â€ºÂ¸Ã©â€”Å“

## Ã§â€ºÂ¸Ã©â€”Å“

- [Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - Ã¥Â­Â agent Ã¥Ââ€Ã¨ÂªÂ¿Ã§Â«Â Ã§Â¯â‚¬
- `continuous-learning` Ã¦Å â‚¬Ã¨Æ’Â½ - Ã§â€Â¨Ã¦â€“Â¼Ã©Å¡Â¨Ã¦â„¢â€šÃ©â€“â€œÃ¦â€Â¹Ã©â‚¬Â²Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
- `~/.claude/agents/` Ã¤Â¸Â­Ã§Å¡â€ž Agent Ã¥Â®Å¡Ã§Â¾Â©
