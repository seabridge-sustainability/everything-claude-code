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
# Swarms Integration Skill (ECC)

## Module

```
seabridge_ai/src/sustainability_ai/shared/swarms_integration.py
sustainability_ai.shared  # re-exports all public symbols
```

## Core API

```python
from sustainability_ai.shared import AgentConfig, create_esg_swarm, route_to_agent

agents = [
    AgentConfig(name="nature_risk", description="TNFD LEAP analysis", callable=nature_run),
    AgentConfig(name="climate_transition", description="TCFD analysis", callable=climate_run),
]
swarm = create_esg_swarm(agents)
result = route_to_agent(swarm, "Assess biodiversity exposure for asset 42")
```

## PGE Harness (long-running tasks)

```python
from sustainability_ai.shared import create_pge_harness, run_pge_harness

harness = create_pge_harness(planner=..., generator=..., evaluator=..., passing_score=7.0)
output = run_pge_harness(harness, task="Full TCFD report for portfolio P-001")
# {"result": "...", "score": 8.2, "iterations": 2}
```

## Routing Keywords

| Agent | Keywords |
|-------|---------|
| `nature_risk` | nature, biodiversity, ecosystem, tnfd, leap, habitat, species, land use, water |
| `climate_transition` | climate, tcfd, transition, physical risk, emissions, carbon, net zero |
| `regulation_monitoring` | regulation, compliance, policy, csrd, sfdr, disclosure, reporting, law |
| `due_diligence` | due diligence, acquisition, portfolio, assessment, underwriting, property |

## Env

`SWARMS_API_KEY` Ã¢â‚¬â€ optional, only for Swarms Cloud telemetry.

## Design

Swarms sits alongside LangGraph, not above it. Each `AgentConfig.callable` is a LangGraph entry point.
EMA score: `new = 0.2 * reward + 0.8 * current`
