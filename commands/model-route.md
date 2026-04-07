# Model Route Command

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

See `/local-inference` skill to set up the server.

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
# /local-inference   ← start the full local AI stack
```
