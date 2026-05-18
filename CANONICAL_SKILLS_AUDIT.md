# ECC Canonical Skills Audit

Date: 2026-05-18
Status: PASS/WARN.

## Summary

`C:\Users\adelm\SeaBridgeAI\everything-claude-code` is the only canonical SeaBridgeAI reusable coding-agent skills and workflow library found in the active workspace audit. No active bootstrap/config path should expect any secondary shared-skills repository.

ECC contains the central system docs, canonical skills, adapter wrappers, `/goal` protocol, workflows, checklists, commands, and validation scripts. Repo-local `AGENT.md`/`AGENT_SKILLS.md` shims were removed from active repos; ECC `AGENT_SKILLS.md` remains the canonical shared skills contract.

Deprecated wrapper scripts with the old shared-skills naming were removed. Use `scripts\check-canonical-skills.ps1` and `scripts\update-canonical-skills.ps1`.

## Canonical Locations

| Location | Purpose | Status |
|---|---|---|
| `SEABRIDGE_CODING_AGENT_SYSTEM.md` | shared operating system | canonical |
| `AGENT_SKILLS.md` | shared skill contract/catalog | canonical |
| `skills\` | reusable skill bodies | canonical |
| `.agents\skills\` | cross-agent callable wrappers/surfaces | canonical wrappers |
| `.claude\skills\` | Claude-specific wrappers/adapters | adapter |
| `protocols\GOAL_PROTOCOL.md` | canonical `/goal` and auto-loop behavior | canonical |
| `protocols\GOAL_PROTOCOL_SHORT.md` | compact adapter form | canonical |
| `workflows\`, `checklists\`, `templates\` | reusable execution and verification assets | canonical |
| `repo-integrations\` | repo-specific integration guidance | canonical but missing CLIMADA/FalkorDB entries |
| `external\`, `vendor\`, `references\` | upstream/reference snapshots | reference-only unless adapted into canonical locations |

## Findings

| Finding | Status | Recommendation |
|---|---|---|
| ECC is canonical shared skills root | pass | keep all reusable SeaBridge skills here |
| Active references to old shared-skills repo | pass/warn | no active dependency found; stale historical refs remain in reports/upstream text |
| `/goal` protocol exists in ECC and repo adapters | pass | keep compact blocks in standard adapter files only |
| Product repo local skills | warn | migrate reusable bodies into ECC or replace with documented source-owned/product classifications |
| AutoResearch experiment loop conflict | warn | update AutoResearch adapters to require approval for commits/resets |
| Missing repo integrations | warn | add `repo-integrations/climada-stack.md` and `repo-integrations/falkordb-data.md` |
| Hook assumptions | warn | document actual enabled state; `.codex/hooks.json` files seen were empty |

## Local Skill Migration Queue

| Source | Proposed destination/classification |
|---|---|
| `manageesg-backend\.agents\skills\stripe-*` | ECC `skills/` plus `.agents` wrappers, or pointers if plugin-owned |
| `manageesg-backend\.deepagents\skills\esg-agent-dev` | ECC if reusable; backend-only pointer if not |
| `manageesg-backend\agent-tooling\skills\legal-review` | ECC legal/review skill if reusable |
| `manageesg-backend\agent-tooling\skills\seabridge-browser-autonomy` | keep local only if artifact-path-specific |
| `manageesg-frontend\.deepagents\skills\nextjs-esg` | ECC frontend/ESG skill |
| `manageesg-frontend\design\.claude\skills\designlang` | ECC design adapter or tool-specific source-owned classification |
| `openseabri\skills\*` | classify as product methodology vs reusable domain-agent skills before migration |
| `autoresearch\.agents\skills\feynman\*` | keep as local wrappers if discovery requires |
| `autoresearch\feynman\skills\*` | keep source-owned unless intentionally promoted |
| `_upstream\**\SKILL.md` | reference-only; adapt manually through ECC when useful |
| `SeaBridgeAI\` knowledge workspace | no reusable skill bodies; keep vault/tool guidance local and reusable workflows in ECC |

## Validation Results

Run during audit:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\check-canonical-skills.ps1
powershell -ExecutionPolicy Bypass -File scripts\check-coding-agent-system.ps1
powershell -ExecutionPolicy Bypass -File scripts\check-agent-runtime-guardrails.ps1
```

Results:

- `check-canonical-skills.ps1`: PASS.
- `check-coding-agent-system.ps1`: PASS, no findings.
- `check-agent-runtime-guardrails.ps1`: PASS after named adapters were aligned with `SYSTEM_ID`.

## Follow-Up Validation Commands

Recommended after consolidation:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\check-canonical-skills.ps1
powershell -ExecutionPolicy Bypass -File scripts\check-coding-agent-system.ps1
powershell -ExecutionPolicy Bypass -File scripts\check-agent-runtime-guardrails.ps1
```

Additional audit checks used in this pass:

```powershell
rg -n -i "secondary shared-skills|external shared-skills|deprecated skills repo" <active-roots>
rg -n -i "/goal|GOAL_PROTOCOL|auto-loop|autoloop|auto loop" <root-agent-files>
Get-ChildItem -Recurse -Filter SKILL.md <active-roots>
```

## Recommended ECC Improvements

1. Add a single `scripts/audit-agent-system.ps1` that checks all active roots and emits JSON/Markdown.
2. Add `/goal` visibility checks for each required adapter file.
3. Add "local skill must be wrapper/product/source-owned" checks.
4. Add `repo-integrations/climada-stack.md`.
5. Add `repo-integrations/falkordb-data.md`.
6. Keep stale-reference scans excluding `vendor`, `external`, imported upstream docs, generated artifacts, and historical audit reports.
