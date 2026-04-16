# Skill: feynman — AI Research Agent

## What this skill covers

Working with [Feynman](https://github.com/getcompanion-ai/feynman) in the SeaBridgeAI
AI-CoScientist research workflow. Feynman is an open-source TypeScript AI research agent
that produces cited research briefs and can run multi-agent deep investigations.

Reference installation: `C:\Users\adelm\SeaBridgeAI\autoresearch\feynman\`

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
    skills/                             ← feynman skills library
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

---

## Two Modes

| Mode | Flag | Description |
|------|------|-------------|
| Single query | (default) | Fast cited brief from one agent |
| Deep research | `-DeepResearch` | Parallel researchers + synthesizer; slower but more thorough |

---

## Install feynman skills (standalone)

Feynman has its own skills library that can be installed at repo or global scope:

```powershell
# Repo-scoped (install into current project)
& ([scriptblock]::Create((irm https://feynman.is/install-skills.ps1))) -Scope Repo

# Global
irm https://feynman.is/install-skills.ps1 | iex
```

Skills files land in `.feynman/skills/` and can be listed with `feynman skills list`.

---

## Integration with Paper2Agent workflow

Feynman feeds directly into Paper2Agent for converting key methodology papers into MCP-backed agents:

1. **Feynman** — gather cited literature and state-of-the-art summaries on a topic
2. **Paper2Agent** — convert the most relevant paper/repo into an interactive MCP-backed agent

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
