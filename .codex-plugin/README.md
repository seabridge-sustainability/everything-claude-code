# .codex-plugin Ã¢â‚¬â€ Codex Native Plugin for ECC

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


This directory contains the **Codex plugin manifest** for Everything Claude Code.

## Structure

```
.codex-plugin/
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ plugin.json   Ã¢â‚¬â€ Codex plugin manifest (name, version, skills ref, MCP ref)
.mcp.json         Ã¢â‚¬â€ MCP server configurations at plugin root (NOT inside .codex-plugin/)
```

## What This Provides

- **125 skills** from `./skills/` Ã¢â‚¬â€ reusable Codex workflows for TDD, security,
  code review, architecture, and more
- **6 MCP servers** Ã¢â‚¬â€ GitHub, Context7, Exa, Memory, Playwright, Sequential Thinking

## Installation

Codex plugin support is currently in preview. Once generally available:

```bash
# Install from Codex CLI
codex plugin install affaan-m/everything-claude-code

# Or reference locally during development
codex plugin install ./

Run this from the repository root so `./` points to the repo root and `.mcp.json` resolves correctly.
```

## MCP Servers Included

| Server | Purpose |
|---|---|
| `github` | GitHub API access |
| `context7` | Live documentation lookup |
| `exa` | Neural web search |
| `memory` | Persistent memory across sessions |
| `playwright` | Browser automation & E2E testing |
| `sequential-thinking` | Step-by-step reasoning |

## Notes

- The `skills/` directory at the repo root is shared between Claude Code (`.claude-plugin/`)
  and Codex (`.codex-plugin/`) Ã¢â‚¬â€ same source of truth, no duplication
- MCP server credentials are inherited from the launching environment (env vars)
- This manifest does **not** override `~/.codex/config.toml` settings
