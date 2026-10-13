# Ponytail in ECC

ECC adapts [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) at revision `2961b52fc1fe6a5a87c7a959a79512e5c2f3ffe5` (5.2.0, MIT). The complete pinned source is reference-only under `integrations/company-dev-tools/sources/ponytail`. Restore it with `node integrations/ponytail/import.mjs`; every byte must match the retained source manifest.

## Agent invocation

Read `skills/sea-ponytail/SKILL.md` or ask: “Use sea-ponytail full for this task; preserve its acceptance requirements and ECC policy.” Lite/full/ultra/off are conversational choices scoped to this task/session, not machine-global switches. Compatible agents use the same canonical body via native thin loaders or standard MCP/CLI. A slash command is host-specific UI syntax; plain language plus the canonical skill works everywhere.

The `seabridge-ponytail` stdio server exposes:
- `ponytail_find_workflow`: discover the requested primary workflow in ECC's existing catalog.
- `ponytail_read_skill`: exact-ID, source-digest checked read.
- `ponytail_collect_debt`: bounded read-only comments from explicitly selected ECC/backend/frontend paths.

Launch: `node C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/ponytail/cli.mjs mcp`. CLI: `status`, `find|read|debt request.json|-`. Example JSON for debt: `{"repository":"backend","paths":["app/services/nature_asset_measures.py"]}`. Default markers are shortcut/ponytail; a custom marker is a literal identifier, never a regular expression.

The scanner respects Git ignore rules even for tracked ignored paths, excludes credentials/config/state/source-vendor directories, rejects traversal, aliases and linked paths, and bounds file count/bytes/output/time. An exceeded budget or unreadable selected file is an error, never “no debt.” Returned comment candidates require interpretation: a keyboard shortcut is not engineering debt; absent revisit triggers are reported. Nothing is written by the scanner.

## Workflows and overlaps

Six catalog IDs: `ponytail/ecc/ponytail`, `ponytail-review`, `ponytail-audit`, `ponytail-debt`, `ponytail-gain`, `ponytail-help` (each with the same prefix). Generic debugging/review/architecture requests retain their existing Matt/Addy/SeaBridge routing. Explicit Ponytail requests choose a single Ponytail primary; it supports the matching existing goal. Pstack is primary for competing plans and verification skill maintenance. GSD never creates a competing plan.

Correctness, security, real load, useful tests, performance, then simplicity guide reviews. Each finding needs a concrete triggering case, current source location, smallest fix and consequence. Review/audit changes no code. Broad debt/audit coverage is opt-in and bounded.

Upstream's always-on rule files, lifecycle hooks, global flags, statusline edits, model/persona overrides and subagent injection are not installed. Existing running sessions are preserved. Upstream code-removal and mandatory test defaults cannot override ECC policy, scientific integrity or requested product behavior. Benchmark figures are upstream self-reported evidence, not validated SeaBridge gains or guaranteed savings.

## Verification boundaries

Saved Claude, Codex, Gemini, OpenCode, VS Code and Cursor launch configurations are exercised using an MCP SDK; native skill discovery is checked where a local CLI supports it. This proves tool transport/configuration and read-only behavior, not that every running model adopted the guidance. Use a fresh agent session or the CLI fallback; do not restart product agents. Live model comparisons remain deferred by the owner. No authenticated product journey or climate/nature model validation is claimed.

Current source and audit receipts are recorded under `artifacts/agent-runs/ponytail`. Publication/deployment and clean system-map refresh remain separate.
