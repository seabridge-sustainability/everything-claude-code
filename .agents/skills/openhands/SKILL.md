<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
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
