# Superpowers Activation Validation - 2026-05-10

Scope: local workstation and SeaBridgeAI coding-agent instruction files only.

No GitHub push, commit, destructive operation, paid call, dependency install, or dangerous autonomous/yolo mode was performed.

## Result

PASS: Superpowers is active and useful across the SeaBridgeAI coding-agent layer.

Claude Code now reports the local ECC Superpowers plugin as installed and enabled:

```text
superpowers@superpowers-dev
Version: 5.1.0
Scope: user
Status: enabled
```

The plugin source is the local ECC vendor marketplace:

```text
C:\Users\adelm\SeaBridgeAI\everything-claude-code\vendor\superpowers
```

## Actions Taken

1. Validated the local Superpowers Claude marketplace manifest.
2. Added the local ECC Superpowers marketplace to Claude Code user settings:

```powershell
claude plugin marketplace add C:\Users\adelm\SeaBridgeAI\everything-claude-code\vendor\superpowers
```

3. Installed Superpowers from the local marketplace at user scope:

```powershell
claude plugin install superpowers@superpowers-dev --scope user
```

4. Confirmed installed plugin state with:

```powershell
claude plugin list
claude plugin marketplace list
```

5. Updated SeaBridgeAI instruction files so future agents see the actual state:

- `everything-claude-code\SEABRIDGE_CODING_AGENT_SYSTEM.md`
- `everything-claude-code\AGENTS_SYSTEM.md`
- `everything-claude-code\CLAUDE.md`
- `everything-claude-code\AGENTS.md`
- `manageesg-backend\AGENTS.md`
- `manageesg-backend\CLAUDE.md`
- `manageesg-backend\AGENTS_SYSTEM.md`
- `manageesg-frontend\AGENTS.md`
- `manageesg-frontend\CLAUDE.md`
- `manageesg-frontend\AGENTS_SYSTEM.md`
- `openseabri\AGENTS.md`
- `openseabri\CLAUDE.md`
- `openseabri\AGENTS_SYSTEM.md`
- `_upstream\AGENTS.md`
- `_upstream\CLAUDE.md`
- `_upstream\AGENTS_SYSTEM.md`

## Cross-Agent Skill Coverage

Confirmed these 12 Superpowers wrappers exist in all checked skill locations:

- `using-superpowers`
- `brainstorming`
- `writing-plans`
- `executing-plans`
- `subagent-driven-development`
- `dispatching-parallel-agents`
- `test-driven-development`
- `systematic-debugging`
- `verification-before-completion`
- `requesting-code-review`
- `receiving-code-review`
- `writing-skills`

Checked locations:

- `C:\Users\adelm\.claude\skills`
- `C:\Users\adelm\.codex\skills`
- `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills`
- `C:\Users\adelm\SeaBridgeAI\everything-claude-code\skills`

## SeaBridgeAI Policy

The global Claude Code plugin is active as a convenience layer, but the canonical SeaBridgeAI cross-agent contract remains the `sea-*` skill system in ECC.

Future add/update/remove/reinstall operations for Superpowers or other global/plugin state still require explicit approval.

The following remain disabled unless explicitly approved:

- commits
- pushes
- dependency installs
- migrations
- production data changes
- auth/security changes
- billing changes
- destructive file operations
- yolo/autonomous/dangerous permission modes
- long-running training jobs

## Validation Commands Run

```powershell
claude plugin validate C:\Users\adelm\SeaBridgeAI\everything-claude-code\vendor\superpowers
claude plugin marketplace add C:\Users\adelm\SeaBridgeAI\everything-claude-code\vendor\superpowers
claude plugin install superpowers@superpowers-dev --scope user
claude plugin list
claude plugin marketplace list
rg -n "Do not install Superpowers globally|not installed globally|No global or marketplace install performed" <target repos> -g "*.md"
```

Validation note: the remaining `not installed globally` match is for GSD, not Superpowers, and is intentionally unchanged.

## Manual Approval Items

None for current activation.

Still approval-gated for future work:

- any Superpowers plugin update, removal, reinstall, or marketplace change
- any global install outside the local ECC vendor marketplace
- any commit or push of these documentation changes
