## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.
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
