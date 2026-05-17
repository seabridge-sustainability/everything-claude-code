# SeaBridgeAI Local Skill Consolidation Plan

Date: 2026-05-17

## Goal

Keep reusable SeaBridgeAI skill bodies canonical in `C:\Users\adelm\SeaBridgeAI\everything-claude-code`, while allowing repo-local wrappers only when a tool requires local discovery.

## Do Not Delete Yet

Do not delete repo-local skill folders until the canonical ECC skill exists, wrappers are in place, and the relevant agent/tool discovery path has been tested.

## Migration Groups

| Source | Current local skills | Recommended action | Priority |
|---|---|---|---|
| `manageesg-backend\.agents\skills\stripe-*` | Stripe project/best-practice/upgrade skills | Move canonical bodies to ECC or replace with approved third-party skill pointers; leave backend wrappers if Stripe tooling requires local discovery | Medium |
| `manageesg-backend\agent-tooling\skills\legal-review` | legal-review | Move to ECC if reused outside backend; otherwise mark explicitly backend-local | Medium |
| `manageesg-backend\agent-tooling\skills\seabridge-browser-autonomy` | browser QA/autonomy | Keep local only if it remains tied to backend `.playwright-agent` outputs; otherwise migrate to ECC as browser QA skill | Low |
| `manageesg-backend\.deepagents\skills\esg-agent-dev` | ESG agent development | Migrate reusable body to ECC and leave deepagents pointer/wrapper | Medium |
| `manageesg-frontend\.deepagents\skills\nextjs-esg` | Next.js ESG frontend guidance | Migrate reusable body to ECC and leave frontend wrapper | Medium |
| `manageesg-frontend\design\.claude\skills\designlang` | design extraction | Keep as tool-specific wrapper or migrate to ECC design-tool skill if reused | Low |
| `openseabri\skills\*` | consumer sustainability, risk, resilience, insurance, utility, product comparison skills | Batch migrate canonical bodies to ECC under reviewed `sea-openseabri-*` or domain names; leave local wrappers | High |
| `autoresearch\feynman\skills\*` | Feynman source-owned skills | Preserve as tool-source assets; only migrate SeaBridge reusable operating rules to ECC | Low |
| `_upstream\**\SKILL.md` | imported upstream skill packs | Work on them when tasked, but do not make them SeaBridge canonical until reviewed and adapted through ECC | Review-only |

## Migration Checklist

1. Pick one migration group.
2. Copy/adapt the canonical body into `everything-claude-code\skills\<name>\SKILL.md`.
3. Add `.agents\skills\<name>\SKILL.md` wrapper pointing to the canonical body.
4. Add cross-agent notes: Claude Code, Codex, Gemini, OpenCode, Cursor/Copilot fallback.
5. Add verification criteria and safety gates.
6. Ensure no skill permits fabricated sustainability data, unverified frontend claims, unsafe auto-commit/push, global install, or dangerous execution.
7. Replace repo-local full bodies with thin pointers only after local agent discovery is tested.
8. Run:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-canonical-skills.ps1
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-coding-agent-system.ps1
```

## Current Decision

This audit did not move or delete local skills. It classified them and created the consolidation path so future migrations can be done in small, testable batches without breaking agent/tool discovery.
