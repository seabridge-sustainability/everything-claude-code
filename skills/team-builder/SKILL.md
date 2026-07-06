---
name: team-builder
description: Interactive agent picker for composing and dispatching parallel teams
origin: community
---

# Team Builder

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


Interactive menu for browsing and composing agent teams on demand. Works with flat or domain-subdirectory agent collections.

## When to Use

- You have multiple agent personas (markdown files) and want to pick which ones to use for a task
- You want to compose an ad-hoc team from different domains (e.g., Security + SEO + Architecture)
- You want to browse what agents are available before deciding

## Prerequisites

Agent files must be markdown files containing a persona prompt (identity, rules, workflow, deliverables). The first `# Heading` is used as the agent name and the first paragraph as the description.

Both flat and subdirectory layouts are supported:

**Subdirectory layout** Ã¢â‚¬â€ domain is inferred from the folder name:

```
agents/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ engineering/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ security-engineer.md
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ software-architect.md
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ marketing/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ seo-specialist.md
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ sales/
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ discovery-coach.md
```

**Flat layout** Ã¢â‚¬â€ domain inferred from shared filename prefixes. A prefix counts as a domain when 2+ files share it. Files with unique prefixes go to "General". Note: the algorithm splits at the first `-`, so multi-word domains (e.g., `product-management`) should use the subdirectory layout instead:

```
agents/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ engineering-security-engineer.md
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ engineering-software-architect.md
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ marketing-seo-specialist.md
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ marketing-content-strategist.md
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ sales-discovery-coach.md
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ sales-outbound-strategist.md
```

## Configuration

Agent directories are probed in order and results are merged:

1. `./agents/**/*.md` + `./agents/*.md` Ã¢â‚¬â€ project-local agents (both depths)
2. `~/.claude/agents/**/*.md` + `~/.claude/agents/*.md` Ã¢â‚¬â€ global agents (both depths)

Results from all locations are merged and deduplicated by agent name. Project-local agents take precedence over global agents with the same name. A custom path can be used instead if the user specifies one.

## How It Works

### Step 1: Discover Available Agents

Glob agent directories using the probe order above. Exclude README files. For each file found:
- **Subdirectory layout:** extract the domain from the parent folder name
- **Flat layout:** collect all filename prefixes (text before the first `-`). A prefix qualifies as a domain only if it appears in 2 or more filenames (e.g., `engineering-security-engineer.md` and `engineering-software-architect.md` both start with `engineering` Ã¢â€ â€™ Engineering domain). Files with unique prefixes (e.g., `code-reviewer.md`, `tdd-guide.md`) are grouped under "General"
- Extract the agent name from the first `# Heading`. If no heading is found, derive the name from the filename (strip `.md`, replace hyphens with spaces, title-case)
- Extract a one-line summary from the first paragraph after the heading

If no agent files are found after probing all locations, inform the user: "No agent files found. Checked: [list paths probed]. Expected: markdown files in one of those directories." Then stop.

### Step 2: Present Domain Menu

```
Available agent domains:
1. Engineering Ã¢â‚¬â€ Software Architect, Security Engineer
2. Marketing Ã¢â‚¬â€ SEO Specialist
3. Sales Ã¢â‚¬â€ Discovery Coach, Outbound Strategist

Pick domains or name specific agents (e.g., "1,3" or "security + seo"):
```

- Skip domains with zero agents (empty directories)
- Show agent count per domain

### Step 3: Handle Selection

Accept flexible input:
- Numbers: "1,3" selects all agents from Engineering and Sales
- Names: "security + seo" fuzzy-matches against discovered agents
- "all from engineering" selects every agent in that domain

If more than 5 agents are selected, list them alphabetically and ask the user to narrow down: "You selected N agents (max 5). Pick which to keep, or say 'first 5' to use the first five alphabetically."

Confirm selection:
```
Selected: Security Engineer + SEO Specialist
What should they work on? (describe the task):
```

### Step 4: Spawn Agents in Parallel

1. Read each selected agent's markdown file
2. Prompt for the task description if not already provided
3. Spawn all agents in parallel using the Agent tool:
   - `subagent_type: "general-purpose"`
   - `prompt: "{agent file content}\n\nTask: {task description}"`
   - Each agent runs independently Ã¢â‚¬â€ no inter-agent communication needed
4. If an agent fails (error, timeout, or empty output), note the failure inline (e.g., "Security Engineer: failed Ã¢â‚¬â€ [reason]") and continue with results from agents that succeeded

### Step 5: Synthesize Results

Collect all outputs and present a unified report:
- Results grouped by agent
- Synthesis section highlighting:
  - Agreements across agents
  - Conflicts or tensions between recommendations
  - Recommended next steps

If only 1 agent was selected, skip synthesis and present the output directly.

## Rules

- **Dynamic discovery only.** Never hardcode agent lists. New files in the directory auto-appear in the menu.
- **Max 5 agents per team.** More than 5 produces diminishing returns and excessive token usage. Enforce at selection time.
- **Parallel dispatch.** All agents run simultaneously Ã¢â‚¬â€ use the Agent tool's parallel invocation pattern.
- **Parallel Agent calls, not TeamCreate.** This skill uses parallel Agent tool calls for independent work. TeamCreate (a Claude Code tool for multi-agent dialogue) is only needed when agents must debate or respond to each other.

## Examples

```
User: team builder

Claude:
Available agent domains:
1. Engineering (2) Ã¢â‚¬â€ Software Architect, Security Engineer
2. Marketing (1) Ã¢â‚¬â€ SEO Specialist
3. Sales (4) Ã¢â‚¬â€ Discovery Coach, Outbound Strategist, Proposal Strategist, Sales Engineer
4. Support (1) Ã¢â‚¬â€ Executive Summary

Pick domains or name specific agents:

User: security + seo

Claude:
Selected: Security Engineer + SEO Specialist
What should they work on?

User: Review my Next.js e-commerce site before launch

[Both agents spawn in parallel, each applying their specialty to the codebase]

Claude:
## Security Engineer Findings
- [findings...]

## SEO Specialist Findings
- [findings...]

## Synthesis
Both agents agree on: [...]
Tension: Security recommends CSP that blocks inline styles, SEO needs inline schema markup. Resolution: [...]
Next steps: [...]
```
