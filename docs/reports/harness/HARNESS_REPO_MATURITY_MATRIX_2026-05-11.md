# Harness Repository Maturity Matrix - 2026-05-11

SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

| Repo | Level | Evidence | Next step |
|---|---:|---|---|
| `everything-claude-code` | 4 | Central skills, standards, manifests, scripts, reviewer personas, CI workflow, pre-commit. | Add trend reports and automatic baseline diffing. |
| `manageesg-backend` | 3 | Strong docs/tests, backend guardrail script, pre-commit hook, Agent Shield/Strix path. | Triage auth/timeout baseline and promote quiet rules to blocking. |
| `manageesg-backend/seabridge-dev` | 3 | OSS readiness docs, Docker/staging runbooks, included in backend scans. | Add OSS-specific package/env/Docker structural checks. |
| `manageesg-frontend` | 2 | Agent docs and frontend checks exist; pre-commit hook added. | Reduce console/loading-state baseline and add route-level regression gates. |
| `openseabri` | 3 | Readiness docs, package scripts, CI, pre-commit hook, harness checks pass. | Add consumer privacy and backend-proxy contract checks. |
| `_upstream` | 2 | Workspace-level agent docs and advisory hook. | Keep advisory unless integrating a named upstream child repo. |
| `autoresearch` | 2 | Agent docs, pre-commit hook, Strix/Feynman/Unsloth safety conventions. | Add local model/training safety structural checks. |

Levels:

- 0: ad hoc prompting
- 1: documented expectations
- 2: agent-readable standards
- 3: automated guardrails
- 4: reviewer-agent enforcement
- 5: self-improving harness loop
