---
description: Analyze instincts and suggest or generate evolved structures
agent: build
---

# Evolve Command

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Analyze and evolve instincts in continuous-learning-v2: $ARGUMENTS

## Your Task

Run:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/scripts/instinct-cli.py" evolve $ARGUMENTS
```

If `CLAUDE_PLUGIN_ROOT` is unavailable, use:

```bash
python3 ~/.claude/skills/continuous-learning-v2/scripts/instinct-cli.py evolve $ARGUMENTS
```

## Supported Args (v2.1)

- no args: analysis only
- `--generate`: also generate files under `evolved/{skills,commands,agents}`

## Behavior Notes

- Uses project + global instincts for analysis.
- Shows skill/command/agent candidates from trigger and domain clustering.
- Shows project -> global promotion candidates.
- With `--generate`, output path is:
  - project context: `~/.claude/homunculus/projects/<project-id>/evolved/`
  - global fallback: `~/.claude/homunculus/evolved/`
