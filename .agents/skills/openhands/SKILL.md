<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->
# OpenHands Skill (ECC)

## Launch

```bash
# Docker
docker run -it --rm \
  -e SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands.dev/all-hands-ai/runtime:0.40-nikolaik \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 3000:3000 \
  docker.all-hands.dev/all-hands-ai/openhands:0.40
# Then http://localhost:3000

# Cloud: https://app.all-hands.dev
```

## Microagent Directories

- `manageesg-backend/.openhands/microagents/` Ã¢â‚¬â€ 6 role files
- `manageesg-frontend/.openhands/microagents/` Ã¢â‚¬â€ 3 role files

Each `.md` file defines an agent role with `triggers:` keywords.

## Model

```bash
LLM_MODEL=claude-sonnet-4-6
LLM_API_KEY=$ANTHROPIC_API_KEY
```

## Backend Roles

| File | Trigger Keywords |
|------|----------------|
| `repo.md` | (always loaded) |
| `nature-risk.md` | nature, biodiversity, tnfd, leap |
| `climate-risk.md` | climate, tcfd, emissions, net zero |
| `gresb-analyst.md` | gresb, benchmark, performance |
| `due-diligence.md` | due diligence, acquisition |
| `esg-data.md` | data, import, meter, emission factor |

## Frontend Roles

| File | Trigger Keywords |
|------|----------------|
| `repo.md` | (always loaded) |
| `dashboard.md` | dashboard, chart, widget |
| `reports.md` | report, pdf, export |
