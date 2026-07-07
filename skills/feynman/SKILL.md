---
name: feynman
description: Feynman — cited research briefs and multi-agent deep research for ESG/sustainability topics. Use for TNFD/CSRD/GRESB-style literature questions needing a cited answer, or deep multi-source investigation. Distinct from ECC's generic `deep-research` skill (firecrawl/exa web search) — this one is Feynman's own research agent.
triggers:
  - "research brief"
  - "cited research"
  - "feynman"
  - "deep research"
  - "literature review"
  - "run-feynman"
---

# Skill: feynman — AI Research Agent

## What this skill covers

Working with [Feynman](https://github.com/getcompanion-ai/feynman) in the SeaBridgeAI
AI-CoScientist research workflow. Feynman is an open-source TypeScript AI research agent
that produces cited research briefs and can run multi-agent deep investigations.

Reference installation: `C:\Users\adelm\SeaBridgeAI\autoresearch\feynman\`

Not the same as ECC's generic `deep-research` skill (firecrawl/exa web search) — use
this skill for ESG/sustainability research that should come back as a cited brief in
Feynman's format.

---

## Integration Architecture

```
manageesg-backend/
  co-scientist-orchestrator.ps1         ← run-feynman action (PowerShell wrapper)
    └─ node autoresearch/feynman/bin/feynman.js

autoresearch/
  feynman/                              ← cloned source (read-only reference)
    bin/feynman.js                      ← CLI entry point
    src/                                ← TypeScript agent source
    skills/                             ← feynman's own bundled skills library (source-owned)
    prompts/                            ← system prompts
```

---

## Usage

### Via orchestrator (preferred)

```powershell
# Single query — returns a cited research brief
.\co-scientist-orchestrator.ps1 -Action run-feynman -Task "What are TNFD disclosure requirements?"

# Deep research — parallel multi-agent investigation + synthesis
.\co-scientist-orchestrator.ps1 -Action run-feynman -Task "Biodiversity net gain methodologies" -DeepResearch

# Custom provider (e.g. local Ollama)
.\co-scientist-orchestrator.ps1 -Action run-feynman -Task "EU taxonomy alignment" -DeepResearch -FeynmanProvider ollama

# Dry run (print command without executing)
.\co-scientist-orchestrator.ps1 -Action run-feynman -Task "Nature risk metrics" -DeepResearch -DryRun
```

### Direct CLI (if feynman installed globally)

```bash
feynman "What are the latest TNFD disclosure requirements?"
feynman deepresearch "Biodiversity net gain methodologies"
```

Also see the top-level `co-scientist-orchestrator` skill for the full action list
across all autoresearch tools.

---

## Two Modes

| Mode | Flag | Description |
|------|------|-------------|
| Single query | (default) | Fast cited brief from one agent |
| Deep research | `-DeepResearch` | Parallel researchers + synthesizer; slower but more thorough |

---

## Feynman's own skills library

Feynman ships its own skills library (`.feynman/skills/`), a source-owned Feynman
product feature separate from ECC skills. See Feynman's own docs for installing
it; do not pipe a remote installer script into a shell from this file — treat
that as a manual, user-run step outside agent automation.

---

## Integration with Paper2Agent workflow

Feynman feeds directly into Paper2Agent for converting key methodology papers into MCP-backed agents:

1. **Feynman** — gather cited literature and state-of-the-art summaries on a topic
2. **Paper2Agent** (ECC skill `paper2agent`) — convert the most relevant paper/repo into an interactive MCP-backed agent

> **Note:** AI-CoScientist (Swarm) is archived (`autoresearch/archived/AI-CoScientist/`) and
> AI-Scientist (Sakana AI) is deleted. Neither is part of the active pipeline.

---

## Cost and safety

- Feynman makes LLM calls for each query/research run.
- Deep research spawns parallel sub-agents — cost scales with depth.
- Manual opt-in only. Do not auto-run in hooks.
- No explicit written approval needed (unlike AI-Scientist), but monitor API usage.
- Node.js ≥ 20.19.0 required.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `node not found` | Install Node.js ≥ 20.19.0 |
| `feynman: command not found` | Run `npm install -g @companion-ai/feynman` or use `node bin/feynman.js` from the cloned repo |
| Rate limit errors | Add `-FeynmanProvider ollama` to use the local inference stack |
| Empty output | Feynman requires network access to alphaXiv / Pi — check firewall |
