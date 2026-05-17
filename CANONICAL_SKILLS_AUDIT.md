# ECC Canonical Skills Audit

Date: 2026-05-17

## Status

PASS/WARN. ECC is the canonical SeaBridgeAI reusable skills and workflow library. Active checks now use ECC-owned canonical validation rather than a secondary shared-skills repository. Remaining warning: old deprecated script filenames still exist and can be archived after approval; historical reports may mention previous inventories.

## Canonical Locations

| Location | Purpose | Status |
|---|---|---|
| `skills\` | canonical reusable skill bodies | canonical |
| `.agents\skills\` | cross-agent wrappers and callable surfaces | canonical wrappers |
| `.claude\skills\` | Claude-specific adapter copies/wrappers | adapter |
| `protocols\GOAL_PROTOCOL.md` | canonical `/goal` and auto-loop protocol | canonical |
| `workflows\`, `checklists\`, `templates\` | reusable workflows and verification assets | canonical |
| `references\matt-pocock-skills` | vendored upstream reference snapshot | reference-only through ECC wrappers |
| `external\`, `vendor\` | third-party references | excluded from active SeaBridge policy unless adapted through ECC |

## Changes Applied

- Added `scripts\check-canonical-skills.ps1` as the active canonical skill validation script.
- Added `scripts\update-canonical-skills.ps1` as the active local snapshot validation/update helper.
- Updated `.github\workflows\harness.yml` to validate ECC canonical skills without cloning a secondary shared-skills repo.
- Updated `.pre-commit-config.yaml` to call `check-canonical-skills.ps1`.
- Updated `scripts\check-agent-runtime-guardrails.ps1` to call `check-canonical-skills.ps1`.
- Updated Matt Pocock derived wrappers to point at ECC `references\matt-pocock-skills`.
- Updated `scripts\check-coding-agent-system.ps1` and `scripts\check-agent-runtime-guardrails.ps1` to use the current active workspace inventory.
- Updated onboarding and skill-routing docs to remove non-inventory repo expectations.

## Findings

| Finding | Status | Recommendation |
|---|---|---|
| Exact active refs to the old external shared-skills repo | fixed in active guidance | keep stale-ref scan in validation loop |
| Old shared-skill check/update script filenames | compatibility wrappers | retain for older local hooks; canonical scripts remain preferred |
| Repo-local skills outside ECC | warning | migrate reusable bodies into ECC and leave wrappers |
| `/goal` protocol | pass | keep `protocols\GOAL_PROTOCOL.md` canonical and adapters thin |
| `_upstream` skills | reference-only | never treat as active SeaBridge reusable skills without adaptation |

## Validation Expectation

Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\check-canonical-skills.ps1
powershell -ExecutionPolicy Bypass -File scripts\check-coding-agent-system.ps1
powershell -ExecutionPolicy Bypass -File scripts\check-agent-runtime-guardrails.ps1
```

The stale-reference scan should return no active exact hits for the old external shared-skills repo name or its legacy check/update script names outside excluded vendor/external/generated paths.
