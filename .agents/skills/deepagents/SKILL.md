---
name: deepagents
description: Use deepagents-cli as a parallel coding agent alongside Claude Code. Covers launch commands, skill system, MCP config, model selection, and SeaBridgeAI project integration. Also covers the deepagents Python SDK for sub-agent spawning inside LangGraph agents.
origin: ECC
---

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

# DeepAgents

deepagents is an open-source coding agent CLI (like Claude Code) built on LangGraph. Use it for parallel workstreams, sandboxed sub-agent tasks, or as an alternative TUI when you need a different model or tool set.

**GitHub**: https://github.com/langchain-ai/deepagents
**Docs**: https://docs.langchain.com/oss/python/deepagents/overview

## When to Activate

- You want to run a second coding agent in parallel with Claude Code (e.g., one on backend, one on frontend)
- You need a sandboxed sub-agent that can execute shell commands independently
- You want to use deepagents' `task` tool for delegated sub-agent spawning inside your own LangGraph agents
- You want to test a task with a different LLM (GPT-4o, Gemini) while Claude handles another

---

## Installation

```bash
# Already installed via uv tool (Python 3.12)
deepagents --version
deepagents-cli --version

# To upgrade:
uv tool upgrade deepagents-cli
```

---

## Launching

```bash
# Interactive TUI (default Ã¢â‚¬â€ recommended)
deepagents

# In a specific project directory
cd C:/Users/adelm/SeaBridgeAI/manageesg-backend && deepagents
cd C:/Users/adelm/SeaBridgeAI/manageesg-frontend && deepagents

# Headless / scripted mode
deepagents -p "Add type annotations to all functions in app/services/my_service.py"
```

---

## Model Selection

Config is at `~/.deepagents/config.toml`. Current default: `anthropic:claude-sonnet-4-6`.

To override for a session:
```bash
deepagents --model openai:gpt-4o
deepagents --model anthropic:claude-opus-4-6
```

---

## Skills System

deepagents automatically discovers skills (SKILL.md files) from:

| Priority | Location | What lives there |
|----------|----------|-----------------|
| 1 | `{project}/.deepagents/skills/` | Project-specific conventions |
| 2 | `~/.agents/skills/` | SeaBridgeAI ESG conventions (`seabridge-esg`) |
| 3 | `~/.claude/skills/` | All ECC + gstack skills (auto-scanned) |
| 4 | config `extra_allowed_dirs` | ECC `.agents/skills/` (29 ECC skills) |

**All your ECC skills work in deepagents with zero extra setup.**

To invoke a skill from inside deepagents TUI:
```
/web-research   # invokes the web-research skill
/seabridge-esg  # invokes SeaBridgeAI ESG conventions
/esg-agent-dev  # (in backend) LangGraph agent dev guide
/nextjs-esg     # (in frontend) Next.js patterns
```

---

## MCP Integration

deepagents supports MCP via `langchain-mcp-adapters`. To add MCP servers, configure in `~/.deepagents/config.toml` or a project `.deepagents/config.toml`:

```toml
[mcp.servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp@latest"]
```

---

## Environment Variables

```bash
# Required for Anthropic (maps from your existing .env)
export DEEPAGENTS_CLI_ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY

# Optional
export DEEPAGENTS_CLI_TAVILY_API_KEY=$TAVILY_API_KEY    # web search
export DEEPAGENTS_CLI_LANGSMITH_PROJECT=seabridge-deepagents  # tracing
```

Add these to your shell profile (`~/.bashrc` or `~/.zshrc`) so they're always set.

---

## Python SDK (for SeaBridgeAI backend agents)

```python
from deepagents import create_deep_agent
from langchain_anthropic import ChatAnthropic

# Spawn a sub-agent for a delegated task
sub_agent = create_deep_agent(
    model=ChatAnthropic(model="claude-sonnet-4-6"),
    system_prompt="You are an ESG data analyst...",
    tools=[my_custom_tool],
)
result = await sub_agent.ainvoke({
    "messages": [{"role": "user", "content": task_description}]
})
```

Package is in `seabridge_ai/pyproject.toml` as `deepagents>=0.4.11`.

---

## Parallel Workflow with Claude Code

```
Terminal 1 (Claude Code):   Work on backend AI agents
Terminal 2 (deepagents):    Work on frontend components simultaneously
```

Both agents can see each other's changes via the shared filesystem. Use git branches to keep work isolated if needed:
```bash
# session-forking skill for Claude Code
/branch frontend-parallel-work

# deepagents in frontend
cd manageesg-frontend && deepagents
```

---

## Key deepagents Commands (TUI)

| Command | Action |
|---------|--------|
| `/web-research` | Invoke web research skill |
| `/skill-creator` | Generate a new skill from description |
| `Ctrl+T` | Toggle tool panel |
| `Ctrl+N` | New conversation |
| `Escape` | Cancel current operation |
