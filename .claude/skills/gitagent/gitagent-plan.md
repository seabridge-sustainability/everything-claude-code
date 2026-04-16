---
name: gitagent-plan
description: /plan integration guide — use GitAgent to scaffold, validate, and export agent definitions as part of the standard planning workflow before implementing any new AI agent.
triggers:
  - "/plan"
  - "plan new agent"
  - "plan agent"
---

# GitAgent × /plan Integration

Use this guide whenever `/plan` involves creating or modifying an AI agent.

---

## When to Invoke GitAgent During /plan

Trigger this guide if the plan includes ANY of:
- A new LangGraph / LangChain agent in `seabridge_ai/ai_agents/`
- A new MCP tool or server in `seabridge_ai/ai_mcp/`
- Exporting an existing agent to another framework
- A compliance-sensitive agent (ESG data, financial reporting)

---

## GitAgent Steps Within /plan

Insert these steps **between** "Plan First" and "TDD Approach" in the standard dev workflow:

### Step G1 — Scaffold Agent Definition
```bash
cd C:/Users/adelm/SeaBridgeAI/everything-claude-code
npx gitagent init --template standard
```
Fill in:
- `agent.yaml`: name, model (`claude-sonnet-4-6`), compliance tier
- `SOUL.md`: agent identity, communication style, scope

### Step G2 — Validate Before Implementation
```bash
npx gitagent validate
```
Fix any spec violations before writing a single line of Python.

### Step G3 — Compliance Check (if regulated)
```bash
npx gitagent validate --compliance
npx gitagent audit
```
Required for any agent touching ESG disclosures, financial data, or regulatory reporting.

### Step G4 — Export to Claude Code Format
```bash
npx gitagent export --format claude-code
```
The export produces a Claude Code-compatible agent definition. Review and integrate into the agent's `CLAUDE.md` or skill file.

### Step G5 — Sync to seabridge_ai
Map the gitagent output to the SeaBridgeAI agent structure:

| gitagent artifact | SeaBridgeAI location |
|-------------------|----------------------|
| `SOUL.md` | Agent system prompt / `prompts.py` |
| `skills/` | Agent tools / `tools.py` |
| `rules.md` | Agent behavioral constraints |
| `workflows/` | LangGraph node definitions in `nodes.py` |
| `agent.yaml` (model) | `lca_agent.py` or equivalent entrypoint |

---

## Minimal agent.yaml for SeaBridgeAI

```yaml
spec_version: "0.1.0"
name: <agent-name>
version: 0.1.0
model:
  preferred: claude-sonnet-4-6
  fallback: claude-haiku-4-5-20251001
compliance:
  risk_tier: medium
  frameworks: []
extends: []
```

---

## Updated /plan Workflow (with GitAgent)

```
0. Research & Reuse          → search GitHub, docs, registries
G1. gitagent init            → scaffold agent.yaml + SOUL.md
G2. gitagent validate        → catch spec violations early
G3. gitagent audit           → compliance check (if regulated)
G4. gitagent export          → produce Claude Code artifacts
1. Plan First                → planner agent, architecture doc
2. TDD Approach              → write tests first (RED → GREEN)
3. Code Review               → code-reviewer agent
4. Commit & Push             → conventional commits
```

---

## Quick Reference

```bash
# From ECC root
npx gitagent init --template minimal   # fast scaffold
npx gitagent init --template standard  # recommended
npx gitagent init --template full      # with compliance dirs

npx gitagent validate                  # spec check
npx gitagent validate --compliance     # + FINRA/SEC/Fed
npx gitagent info                      # summary
npx gitagent export --format claude-code
npx gitagent audit                     # compliance report
```

---

## Notes

- gitagent is installed at: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\node_modules\.bin\gitagent`
- Always run from `C:\Users\adelm\SeaBridgeAI\everything-claude-code\` so npm resolves the binary
- Agent definitions (agent.yaml, SOUL.md) live alongside the skill, not in seabridge_ai — they are the *spec*, the Python is the *implementation*
