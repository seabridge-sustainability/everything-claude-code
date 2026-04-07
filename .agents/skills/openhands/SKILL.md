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

- `manageesg-backend/.openhands/microagents/` — 6 role files
- `manageesg-frontend/.openhands/microagents/` — 3 role files

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
