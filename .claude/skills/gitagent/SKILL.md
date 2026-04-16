---
name: gitagent
description: GitAgent — define, version, validate, and export AI agents as git repositories. Use when creating new agents, exporting to other frameworks, auditing compliance, or scaffolding agent definitions.
triggers:
  - "new agent"
  - "scaffold agent"
  - "gitagent"
  - "export agent"
  - "agent definition"
  - "agent compliance"
  - "agent audit"
---

# GitAgent Skill

GitAgent is a framework-agnostic standard for defining AI agents as git repositories.
Installed at: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\node_modules\.bin\gitagent`

Run via: `npx gitagent <command>` from `C:\Users\adelm\SeaBridgeAI\everything-claude-code\`

---

## Core Commands

| Command | Purpose |
|---------|---------|
| `gitagent init --template minimal` | Scaffold a new agent (minimal/standard/full) |
| `gitagent validate` | Validate agent against spec |
| `gitagent validate --compliance` | Validate + compliance check (FINRA, SEC, Fed) |
| `gitagent info` | Display agent summary |
| `gitagent export --format claude-code` | Export to Claude Code format |
| `gitagent export --format system-prompt` | Export as a system prompt |
| `gitagent import --from <fmt> <path>` | Import from another format |
| `gitagent audit` | Generate compliance audit report |
| `gitagent skills list` | List available skills |
| `gitagent run <source> --adapter <name>` | Run agent via adapter |

---

## Agent Structure

Minimum required files in a gitagent repo:

```
agent.yaml       # Manifest: name, version, model, compliance
SOUL.md          # Identity, personality, communication style
```

Optional:
```
skills/          # Reusable skill definitions
tools/           # Tool integrations
workflows/       # Multi-step workflow definitions
knowledge/       # Domain knowledge
memory/          # Agent memory config
rules.md         # Behavioral rules
duties.md        # Segregation of duties (compliance)
compliance/      # Compliance artifacts
```

---

## agent.yaml Template

```yaml
spec_version: "0.1.0"
name: my-agent
version: 0.1.0
model:
  preferred: claude-sonnet-4-6
  fallback: claude-haiku-4-5-20251001
compliance:
  risk_tier: low   # low | medium | high
  frameworks: []   # finra | federal_reserve | sec
```

---

## Export Adapters

Supported export targets:
- `claude-code` — Claude Code CLAUDE.md / skills format
- `system-prompt` — Plain system prompt text
- `openai` — OpenAI assistant format
- `crewai` — CrewAI agent definition
- `lyzr` — Lyzr Studio
- `github` — GitHub Actions workflow
- `cursor` — Cursor IDE rules
- `gemini` — Gemini agent format

---

## SeaBridgeAI Usage Patterns

### Scaffold a new sustainability agent
```bash
cd C:/Users/adelm/SeaBridgeAI/everything-claude-code
npx gitagent init --template standard
# edit agent.yaml and SOUL.md
npx gitagent validate
npx gitagent export --format claude-code
```

### Export existing ECC agent definitions for another framework
```bash
cd C:/Users/adelm/SeaBridgeAI/everything-claude-code
npx gitagent export --format system-prompt > agents/my-agent-system-prompt.txt
```

### Compliance audit before shipping a regulated agent
```bash
npx gitagent validate --compliance
npx gitagent audit
```

---

## Integration with /plan

When a plan includes creating a new AI agent:
1. Use `gitagent init` to scaffold the agent definition
2. Define `agent.yaml` (model, compliance tier)
3. Write `SOUL.md` (identity, communication style)
4. Run `gitagent validate` before any implementation
5. Export to target format: `gitagent export --format claude-code`

See `gitagent-plan.md` in this directory for the full /plan integration guide.
