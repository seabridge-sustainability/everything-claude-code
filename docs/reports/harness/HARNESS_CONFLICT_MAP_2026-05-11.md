# Harness Conflict Map - 2026-05-11

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

## Conflict Resolution Summary

No working system was replaced. Harness Engineering extends ECC and repo-local
instructions.

| Area | Existing behavior | Harness risk | Resolution |
|---|---|---|---|
| Instruction precedence | `AGENTS_SYSTEM.md`, `AGENTS.md`, `CLAUDE.md`, ECC load order. | New harness docs could become another hierarchy. | Harness docs are loaded after ECC/shared skills and before task-specific standards. |
| Skill invocation | SeaBridge `sea-*`, Superpowers wrappers, Matt Pocock wrappers. | Duplicate skill meanings. | Reviewer skills are additive and map to existing skills. |
| CI enforcement | Repos have uneven workflows. | Blocking checks could fail noisy baselines. | Added advisory-first scripts; `-FailOnFinding` opt-in. |
| Pre-commit hooks | Some repos had no config; backend had existing hook. | Hook collision. | Pre-commit installed in migration mode; backend legacy hook preserved. |
| Agent security scans | Agent Shield already exists. | Duplicate scanner. | Harness calls Agent Shield as governance layer, not replacement. |
| Active security testing | Strix exists separately. | Unsafe production scans. | Full vulnerability scan remains scoped to local/staging unless explicitly broadened. |
| Architecture refactors | Matt Pocock architecture skill exists. | Broad rewrites. | Skill requires candidate review and regression plan before edits. |
| `_upstream` | Vendor repos have their own rules. | Rewriting upstream instructions. | `_upstream` harness is advisory-only unless specific child repo scope is approved. |

## Compatibility Strategy

- Keep central standards in ECC.
- Keep product repos as lightweight pointers plus repo-specific rules.
- Keep objective checks in scripts.
- Keep subjective review in reviewer-agent skills.
- Keep hooks reversible and local.
- Keep CI rollout rule-by-rule after baseline triage.
