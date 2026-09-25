---
description: Recommend the best model tier for the current task based on complexity, risk, and budget.
---

# Model Route Command

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


Recommend the best model tier for the current task by complexity, cost, and infrastructure.

When `JEV_ENABLED=true`, use `scripts/jev-route.js` as a typed second opinion
for ambiguous routing. Deterministic safety rules remain authoritative: security,
tenant isolation, secrets, production changes, and approval-gated work may never
be downgraded by Jev. Low-confidence, timeout, disabled, and shadow-mode results
fall back to the routing table below.

## Usage

`/model-route [task-description] [--budget low|med|high] [--local]`

Dependency-free Jev example (the key must already be in the process environment):

```powershell
'{"kind":"task","state":"Fix a failing parser test","sensitive":true}' |
  node scripts/jev-route.js
```

Supported `kind` values are `task`, `error`, and `reviewers`. The script redacts
common credential shapes, caps state size, and never prints the raw state or key.

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
