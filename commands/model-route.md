---
description: Recommend the best model tier for the current task based on complexity, risk, and budget.
---

# Model Route Command

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


Recommend the best model tier for the current task by complexity, cost, and infrastructure.

## Usage

`/model-route [task-description] [--budget low|med|high] [--local]`

## Routing Tiers

### Cloud (default — requires API keys)

| Tier | Model | When to use |
|------|-------|-------------|
| `haiku` | claude-haiku-4-5 | Deterministic, low-risk mechanical changes |
| `sonnet` | claude-sonnet-4-6 | Default for implementation and refactors |
| `opus` | claude-opus-4-6 | Architecture, deep review, ambiguous requirements |

### Local (via llama.cpp — $0, requires local server)

See `skills/sea-local-llm-training/` and `docs/local-llm/` to set up the server.

| Tier | Model | VRAM | When to use |
|------|-------|------|-------------|
| `fast` | Gemma-4 2B Q8_0 | ~3GB | Simple completions, quick fixes, haiku-equivalent |
| `main` | Gemma-4 31B Q4_K_M + 2B speculative | ~23GB | Default for all tasks — main coding workhorse |
| `reason` | DeepSeek-R1 14B Q4_K_M | ~10GB | Debugging, root-cause analysis, algorithm design |
| `scout` | Llama-4 Scout 17B Q4_K_M | ~12GB | Lower VRAM alternative to Gemma-4 31B |

### Online open-access (via API keys — low cost)

| Tier | Model | Key |
|------|-------|-----|
| `gemini-flash` | gemini-2.5-flash | `GOOGLE_API_KEY` |
| `gemma-online` | gemma-4-31b-it | `GOOGLE_API_KEY` |
| `groq-llama` | groq:llama-3.3-70b-versatile | `GROQ_API_KEY` |

## Agent Activation per Tier

| Task | Recommended | Why |
|------|-------------|-----|
| Single-file mechanical refactor | `fast` / `haiku` | Low complexity, speed over depth |
| New feature implementation | `main` / `sonnet` | Balanced depth + speed |
| Architecture decision / system design | `opus` / `reason` | Maximum reasoning depth |
| Debugging a failing test | `reason` (DeepSeek-R1) | Trained for chain-of-thought debugging |
| Security audit | `opus` | Never trade reasoning depth for cost here |
| Code generation (repetitive) | `main` local | Free, fast, speculative decoding |

## Required Output

- Recommended tier and exact model
- Confidence level (High/Med/Low)
- Justification (why this fits the task)
- Fallback model
- Whether local inference is viable for this task

## Arguments

$ARGUMENTS:
- `[task-description]` — optional free-text description of the task
- `--budget low|med|high` — cost constraint (low → prefer local/groq, high → cloud)
- `--local` — force local inference recommendation

## Local Setup Reminder

```bash
# Check if local stack is running
curl -s http://localhost:8080/v1/models | jq '.data[].id'
curl -s http://localhost:4000/health | jq '.status'

# If not running:
# Use `docs/local-llm/` for the full local AI stack startup path.
```

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
