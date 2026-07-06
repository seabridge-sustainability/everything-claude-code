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
