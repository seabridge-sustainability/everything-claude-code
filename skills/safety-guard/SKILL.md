---
name: safety-guard
description: Use this skill to prevent destructive operations when working on production systems or running agents autonomously.
origin: ECC
---

# Safety Guard Ã¢â‚¬â€ Prevent Destructive Operations

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## When to Use

- When working on production systems
- When agents are running autonomously (full-auto mode)
- When you want to restrict edits to a specific directory
- During sensitive operations (migrations, deploys, data changes)

## How It Works

Three modes of protection:

### Mode 1: Careful Mode

Intercepts destructive commands before execution and warns:

```
Watched patterns:
- rm -rf (especially /, ~, or project root)
- git push --force
- git reset --hard
- git checkout . (discard all changes)
- DROP TABLE / DROP DATABASE
- docker system prune
- kubectl delete
- chmod 777
- sudo rm
- npm publish (accidental publishes)
- Any command with --no-verify
```

When detected: shows what the command does, asks for confirmation, suggests safer alternative.

### Mode 2: Freeze Mode

Locks file edits to a specific directory tree:

```
/safety-guard freeze src/components/
```

Any Write/Edit outside `src/components/` is blocked with an explanation. Useful when you want an agent to focus on one area without touching unrelated code.

### Mode 3: Guard Mode (Careful + Freeze combined)

Both protections active. Maximum safety for autonomous agents.

```
/safety-guard guard --dir src/api/ --allow-read-all
```

Agents can read anything but only write to `src/api/`. Destructive commands are blocked everywhere.

### Unlock

```
/safety-guard off
```

## Implementation

Uses PreToolUse hooks to intercept Bash, Write, Edit, and MultiEdit tool calls. Checks the command/path against the active rules before allowing execution.

## Integration

- Enable by default for `codex -a never` sessions
- Pair with observability risk scoring in ECC 2.0
- Logs all blocked actions to `~/.claude/safety-guard.log`
