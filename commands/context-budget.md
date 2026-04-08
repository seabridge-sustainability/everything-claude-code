---
description: Analyze context window usage across agents, skills, MCP servers, and rules to find optimization opportunities. Helps reduce token overhead and avoid performance warnings.
---

# Context Budget Optimizer

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Analyze your Claude Code setup's context window consumption and produce actionable recommendations to reduce token overhead.

## Usage

```
/context-budget [--verbose]
```

- Default: summary with top recommendations
- `--verbose`: full breakdown per component

$ARGUMENTS

## What to Do

Run the **context-budget** skill (`skills/context-budget/SKILL.md`) with the following inputs:

1. Pass `--verbose` flag if present in `$ARGUMENTS`
2. Assume a 200K context window (Claude Sonnet default) unless the user specifies otherwise
3. Follow the skill's four phases: Inventory Ã¢â€ â€™ Classify Ã¢â€ â€™ Detect Issues Ã¢â€ â€™ Report
4. Output the formatted Context Budget Report to the user

The skill handles all scanning logic, token estimation, issue detection, and report formatting.
