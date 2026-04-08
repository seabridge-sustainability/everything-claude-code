---
description: Export instincts for sharing
agent: build
---

# Instinct Export Command

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Export instincts for sharing with others: $ARGUMENTS

## Your Task

Export instincts from the continuous-learning-v2 system.

## Export Options

### Export All
```
/instinct-export
```

### Export High Confidence Only
```
/instinct-export --min-confidence 0.8
```

### Export by Category
```
/instinct-export --category coding
```

### Export to Specific Path
```
/instinct-export --output ./my-instincts.json
```

## Export Format

```json
{
  "instincts": [
    {
      "id": "instinct-123",
      "trigger": "[situation description]",
      "action": "[recommended action]",
      "confidence": 0.85,
      "category": "coding",
      "applications": 10,
      "successes": 9,
      "source": "session-observation"
    }
  ],
  "metadata": {
    "version": "1.0",
    "exported": "2025-01-15T10:00:00Z",
    "author": "username",
    "total": 25,
    "filter": "confidence >= 0.8"
  }
}
```

## Export Report

```
Export Summary
==============
Output: ./instincts-export.json
Total instincts: X
Filtered: Y
Exported: Z

Categories:
- coding: N
- testing: N
- security: N
- git: N

Top Instincts (by confidence):
1. [trigger] (0.XX)
2. [trigger] (0.XX)
3. [trigger] (0.XX)
```

## Sharing

After export:
- Share JSON file directly
- Upload to team repository
- Publish to instinct registry

---

**TIP**: Export high-confidence instincts (>0.8) for better quality shares.
