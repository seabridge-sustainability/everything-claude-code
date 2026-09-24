---
description: Import instincts from external sources
agent: build
---

# Instinct Import Command

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Import instincts from a file or URL: $ARGUMENTS

## Your Task

Import instincts into the continuous-learning-v2 system.

## Import Sources

### File Import
```
/instinct-import path/to/instincts.json
```

### URL Import
```
/instinct-import https://example.com/instincts.json
```

### Team Share Import
```
/instinct-import @teammate/instincts
```

## Import Format

Expected JSON structure:

```json
{
  "instincts": [
    {
      "trigger": "[situation description]",
      "action": "[recommended action]",
      "confidence": 0.7,
      "category": "coding",
      "source": "imported"
    }
  ],
  "metadata": {
    "version": "1.0",
    "exported": "2025-01-15T10:00:00Z",
    "author": "username"
  }
}
```

## Import Process

1. **Validate format** - Check JSON structure
2. **Deduplicate** - Skip existing instincts
3. **Adjust confidence** - Reduce confidence for imports (Ãƒâ€”0.8)
4. **Merge** - Add to local instinct store
5. **Report** - Show import summary

## Import Report

```
Import Summary
==============
Source: [path or URL]
Total in file: X
Imported: Y
Skipped (duplicates): Z
Errors: W

Imported Instincts:
- [trigger] (confidence: 0.XX)
- [trigger] (confidence: 0.XX)
...
```

## Conflict Resolution

When importing duplicates:
- Keep higher confidence version
- Merge application counts
- Update timestamp

---

**TIP**: Review imported instincts with `/instinct-status` after import.
