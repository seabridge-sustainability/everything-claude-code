# Matt Pocock Shared Agent Skills Production Readiness Report - 2026-05-11

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

## Decision

Adopt `mattpocock/skills` as a centralized reference with SeaBridgeAI wrappers.
Do not install it globally, do not copy skill bodies into product repos, and do
not replace existing SeaBridge `sea-*` workflows.

## Source

| Item | Value |
|---|---|
| Upstream | `https://github.com/mattpocock/skills` |
| Local clone | `C:\Users\adelm\SeaBridgeAI\shared-agent-skills` |
| Commit inspected | `9f2e0bd0ea776eb6372eb81fa8a4a47814a8404a` |
| ECC integration | `C:\Users\adelm\SeaBridgeAI\everything-claude-code` |

## Files Inspected

- `everything-claude-code/SEABRIDGE_CODING_AGENT_SYSTEM.md`
- `everything-claude-code/AGENTS_SYSTEM.md`
- `everything-claude-code/AGENTS.md`
- `everything-claude-code/CLAUDE.md`
- root `AGENTS.md`, `CLAUDE.md`, `AGENTS_SYSTEM.md`, `.mcp.json` files across backend, frontend, OpenSeaBri, `_upstream`, and autoresearch
- `shared-agent-skills/**/SKILL.md`
- existing ECC `.agents/skills/*` and `skills/*`

## Files Changed

- `everything-claude-code/AGENT.md`
- `everything-claude-code/AGENT_SKILLS.md`
- `everything-claude-code/.agents/skills/grill-me/SKILL.md`
- `everything-claude-code/.agents/skills/ubiquitous-language/SKILL.md`
- `everything-claude-code/.agents/skills/improve-codebase-architecture/SKILL.md`
- `everything-claude-code/skills/grill-me/SKILL.md`
- `everything-claude-code/skills/ubiquitous-language/SKILL.md`
- `everything-claude-code/skills/improve-codebase-architecture/SKILL.md`
- `everything-claude-code/manifests/agent-skills/matt-pocock-skills.json`
- `everything-claude-code/scripts/update-shared-agent-skills.ps1`
- `everything-claude-code/scripts/check-shared-agent-skills.ps1`
- `everything-claude-code/docs/agent-skills/MATT_POCOCK_SKILLS_INTEGRATION.md`
- root `AGENT.md` / `AGENT_SKILLS.md` pointers in target repos

## Repository Coverage

| Repo | Coverage |
|---|---|
| `everything-claude-code` | Central contract, wrappers, registry, docs, scripts |
| `manageesg-backend` | Lightweight root pointers |
| `manageesg-backend/seabridge-dev` | Lightweight subproject pointers |
| `manageesg-frontend` | Lightweight root pointers |
| `openseabri` | Lightweight root pointers |
| `_upstream` | Lightweight root pointers |
| `autoresearch` | Lightweight root pointers |

## Validation Checklist

- Central clone exists: PASS
- Upstream commit recorded: PASS
- Active wrappers exist: PASS
- Registry metadata exists: PASS
- Update mechanism exists: PASS
- Validation script exists: PASS
- Repo pointers exist: PASS
- No global install: PASS
- No hook installation: PASS
- No commit or push: PASS
- No copied upstream bodies in product repos: PASS

## Conflicts Found And Resolved

| Conflict | Resolution |
|---|---|
| Upstream `setup-matt-pocock-skills` could create a separate setup system. | Marked reference-only; ECC owns setup. |
| Upstream `ubiquitous-language` writes root `UBIQUITOUS_LANGUAGE.md`. | SeaBridge wrapper prefers `docs/domain-language.md` or existing glossary. |
| Upstream hook/pre-commit skills could alter runtime behavior. | Reference-only; explicit approval required. |
| Upstream TDD/review skills overlap SeaBridge TDD/review policy. | SeaBridge skills remain canonical; upstream can supplement. |

## Tests And Scans Run

Validation commands run:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-shared-agent-skills.ps1
```

Result: PASS.

Clone/update status command run:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\update-shared-agent-skills.ps1
```

Result: PASS. Clone path and commit reported without pulling.

Prompt conflict scans:

```powershell
rg -n "mattpocock|grill-me|ubiquitous-language|improve-codebase-architecture|#skill|Use skill" <target-repos>
```

Result: expected references only in ECC contracts, wrappers, registry, and repo
pointer files.

Secret scan over new instruction files:

```powershell
rg -n "(sk-[A-Za-z0-9]{20,}|hf_[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|AKIA[0-9A-Z]{16}|BEGIN (RSA|OPENSSH|PRIVATE) KEY|ANTHROPIC_API_KEY\s*=|OPENAI_API_KEY\s*=|LLM_API_KEY\s*=)" <new-instruction-files>
```

Result: PASS; no secrets found.

Repo pointer coverage check: PASS for backend, `seabridge-dev`, frontend,
OpenSeaBri, `_upstream`, and autoresearch.

## Unresolved Risks

- Upstream skill content can change after pull; review diffs before updating wrappers.
- `ubiquitous-language` is upstream-deprecated, so SeaBridge owns the adapted behavior.
- Repo-specific agents may ignore `AGENT.md`; `AGENTS.md` and `CLAUDE.md` remain primary.
- No CI enforcement was enabled; this is deliberate.

## No Commit / No Push Confirmation

No commit was created and nothing was pushed to GitHub.
