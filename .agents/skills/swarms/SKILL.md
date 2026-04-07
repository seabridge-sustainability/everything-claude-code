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

`SWARMS_API_KEY` — optional, only for Swarms Cloud telemetry.

## Design

Swarms sits alongside LangGraph, not above it. Each `AgentConfig.callable` is a LangGraph entry point.
EMA score: `new = 0.2 * reward + 0.8 * current`
