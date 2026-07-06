---
description: Start NanoClaw v2 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ECC's persistent, zero-dependency REPL with model routing, skill hot-load, branching, compaction, export, and metrics.
---

# Claw Command

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


Start an interactive AI agent session with persistent markdown history and operational controls.

## Usage

```bash
node scripts/claw.js
```

Or via npm:

```bash
npm run claw
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `CLAW_SESSION` | `default` | Session name (alphanumeric + hyphens) |
| `CLAW_SKILLS` | *(empty)* | Comma-separated skills loaded at startup |
| `CLAW_MODEL` | `sonnet` | Default model for the session |

## REPL Commands

```text
/help                          Show help
/clear                         Clear current session history
/history                       Print full conversation history
/sessions                      List saved sessions
/model [name]                  Show/set model
/load <skill-name>             Hot-load a skill into context
/branch <session-name>         Branch current session
/search <query>                Search query across sessions
/compact                       Compact old turns, keep recent context
/export <md|json|txt> [path]   Export session
/metrics                       Show session metrics
exit                           Quit
```

## Notes

- NanoClaw remains zero-dependency.
- Sessions are stored at `~/.claude/claw/<session>.md`.
- Compaction keeps the most recent turns and writes a compaction header.
- Export supports markdown, JSON turns, and plain text.

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
