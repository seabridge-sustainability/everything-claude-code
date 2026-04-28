---
name: gbrain
description: Operate the local GBrain reference checkout for brain-first retrieval, skillpack checks, OpenClaw/Hermes skill routing, and deterministic minion jobs.
origin: SeaBridgeAI + garrytan/gbrain
---

# GBrain Operations

Use this skill when a SeaBridgeAI backend, OpenClaw, or Hermes workflow needs a
local knowledge brain, GBrain skill routing, code-aware lookup, minion jobs, or
GBrain health checks.

## Installed Locations

- ECC wrapper skill: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\gbrain`
- Codex-compatible mirror: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\skills\gbrain`
- GBrain harness: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\gbrain`
- Upstream mirror: `C:\Users\adelm\SeaBridgeAI\_upstream\gbrain`
- ECC command wrapper: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1`

## Read Order

Before operating GBrain, read:

1. `references\gbrain\AGENTS.md`
2. `references\gbrain\INSTALL_FOR_AGENTS.md`
3. `references\gbrain\skills\RESOLVER.md`
4. The specific GBrain skill selected by the resolver

## Safety Rules

- Do not initialize, import, sync, embed, migrate, schedule cron jobs, or run
  integrations against a real brain repo unless the user has confirmed the exact
  target repo and credentials.
- Do not ask for, store, or write API keys into repo files. Use environment
  variables only.
- Treat local CLI calls as trusted operator actions and MCP/agent calls as
  untrusted remote actions, matching GBrain's `OperationContext.remote` boundary.
- For OpenClaw and Hermes mirrors under `_upstream`, keep changes read-only
  unless the user explicitly asks to patch those upstream workspaces.

## OpenClaw And Hermes Operation

Default workspace roots:

- OpenClaw: `C:\Users\adelm\SeaBridgeAI\_upstream\openclaw`
- Hermes: `C:\Users\adelm\SeaBridgeAI\_upstream\hermes-agent`

For OpenClaw skill routing checks, GBrain supports an `OPENCLAW_WORKSPACE`
environment variable and can read `AGENTS.md` as the resolver:

```powershell
$env:OPENCLAW_WORKSPACE = "C:\Users\adelm\SeaBridgeAI\_upstream\openclaw"
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 check-resolvable --verbose
```

For skillpack install previews, prefer explicit `--skills-dir`; in GBrain
0.22.4, `--workspace` reports the requested workspace but can still resolve the
target skills directory to the GBrain checkout.

```powershell
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 skillpack install --all --dry-run --skills-dir C:\Users\adelm\SeaBridgeAI\_upstream\openclaw\skills --json
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 skillpack install --all --dry-run --skills-dir C:\Users\adelm\SeaBridgeAI\_upstream\hermes-agent\skills --json
```

Use `--dry-run` whenever available before installing skillpacks or running bulk
maintenance.

## Common Checks

```powershell
# Version and CLI availability.
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 --version

# GBrain repository health.
cd C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\gbrain
bun run typecheck

# Skill resolver health.
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 check-resolvable --verbose

# OpenClaw skill resolver health.
$env:OPENCLAW_WORKSPACE = "C:\Users\adelm\SeaBridgeAI\_upstream\openclaw"
C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\gbrain.ps1 check-resolvable --verbose
```

## Handoff

Report:

- GBrain commit and branch.
- Whether the CLI wrapper works.
- Any initialized brain repo or imported source, if explicitly requested.
- Any OpenClaw/Hermes operation run, with exact command and dry-run status.
- Verification results and any skipped live/API steps.
