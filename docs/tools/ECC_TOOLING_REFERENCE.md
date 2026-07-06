# ECC Tooling Reference

Load this file only when a specific tool below is actually needed. The root
`AGENTS.md` / `CLAUDE.md` adapters intentionally carry only one-line pointers
here to keep always-loaded context small.

## rtk — Compressed Shell Output

RTK (Rust Token Killer) v0.35.0 proxies shell commands to produce compressed,
LLM-optimized output, reducing token consumption by 60–90% on verbose commands.

- Binary: `C:\Users\adelm\.local\bin\rtk.exe`
- Config: `C:\Users\adelm\AppData\Roaming\rtk\config.toml`
- Usage: prefix any shell command with `rtk` (`rtk git status`, `rtk git diff HEAD~1`, `rtk cargo build`)
- `rtk gain` — token reduction statistics; `rtk --version` — confirm binary
- Scope: only intercepts Bash/shell tool calls, not built-in Read/Grep/Glob.
- Agent integrations: Claude Code via CLAUDE.md injection (Windows); Codex via
  `~/.codex/RTK.md`; Gemini CLI via BeforeTool hook.

## caveman — Token Compression

Compresses agent output ~65–75% with terse prose that preserves technical
accuracy. Auto-activates via SessionStart hook after install.

- Reference: `references/caveman/`
- Skills: `/caveman` (intensity `lite`/`full`/`ultra`/`wenyan`),
  `/caveman-commit`, `/caveman-review`, `/caveman-compress`
- Install (Claude Code): `claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman`
- Codex: `$caveman` in prompts. Gemini: `gemini extensions install caveman`.

## codeburn — Token Usage Dashboard

Tracks AI coding token spend across Claude Code, Codex, Cursor, and others by
reading session data from disk; no API keys needed.

- Reference: `references/codeburn/`
- Run one-shot: `npx codeburn` (global install requires explicit approval)
- Key commands: `codeburn today`, `codeburn month`, `codeburn optimize`,
  `codeburn status`, `codeburn export`

## designlang — Design Language Extraction

Crawls a live URL with a headless browser and generates 17+ output files
(Tailwind config, CSS vars, shadcn theme, Figma variables, motion tokens, brand
voice, component anatomy stubs, AI-optimized markdown).

- Reference: `references/design-extract/`
- Skill: `/extract-design <url>` (`~/.claude/skills/extract-design/`, if installed)
- CLI: `npx designlang <url>`; global install requires explicit approval
- Key flags: `--full`, `--out <dir>`, `--dark`, `--screenshots`,
  `--emit-agent-rules`, `--smart` (uses `ANTHROPIC_API_KEY`)
- SeaBridgeAI design token locations: `manageesg-frontend/design/`, `openseabri/design/`
- MCP server: `npx designlang mcp --out ./design-extract-output`

## Open Design — AI Design Artifact Generator

Open-source alternative to Claude Design (Apache-2.0). Local-first, BYOK design
tool: 31 skills, 129 design systems, 5 visual directions, media generation,
Claude Design import.

- Reference: `references/open-design/`
- Skill: `/open-design` (`~/.claude/skills/open-design/`, if installed)
- Quickstart: `cd references/open-design && corepack enable && pnpm install && pnpm tools-dev run web`
  (Node ~24, pnpm 10.33.x)
- Relationship to designlang: designlang extracts tokens from existing sites;
  Open Design generates new artifacts from briefs.

## Vibium — Secondary Browser Tooling

"Second pair of eyes" browser inspection alongside Playwright: quick semantic
exploration, element mapping, screenshots, MCP-style browser control.
Playwright remains canonical for repeatable SeaBridgeAI QA/regression runs.

- Global CLI: `vibium` v26.3.18
- ECC wrapper: `scripts/vibium.ps1`
- ECC skill: `.agents/skills/vibe-check/SKILL.md` (Claude copy at `.claude/skills/vibe-check/SKILL.md`)
- Smoke check: `powershell -ExecutionPolicy Bypass -File scripts/vibium.ps1 --version`
- Snyk flagged the upstream skill high risk: review `vibe-check` before browser
  control; keep captures, cookies, storage state, and recordings out of
  committed source.

## Google Agent Skills

Official skills from `google/skills`, installed under `.agents/skills/` and
locked in `skills-lock.json`. Use them before web snippets when work touches
Google Cloud, Firebase, Gemini API on Agent Platform, or Google Cloud
Well-Architected Framework guidance.

Installed: `gemini-api`, `alloydb-basics`, `bigquery-basics`,
`cloud-run-basics`, `cloud-sql-basics`, `firebase-basics`, `gke-basics`,
`google-cloud-recipe-onboarding`, `google-cloud-recipe-auth`,
`google-cloud-recipe-networking-observability`, `google-cloud-waf-security`,
`google-cloud-waf-reliability`, `google-cloud-waf-cost-optimization`.

Snyk risk notes: high for `alloydb-basics` and `cloud-sql-basics`; medium for
`firebase-basics`, `gemini-api`, `gke-basics`; low for the rest. Read the
matching `SKILL.md` before implementation or deployment work, and keep
SeaBridgeAI approval and cost controls in force for Google Cloud auth, IAM,
deployment, or infrastructure changes.

## Token Availability Retry Loops

When the user explicitly asks to "continue when tokens are available" or "try
again every 4 hours," route to `loop-operator` and use the opt-in wrapper:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\agent-token-retry.ps1 `
  -Name "seabridge-continue" `
  -IntervalHours 4 `
  -MaxHours 72 `
  -Command 'claude -p "Continue the previous task from the last safe checkpoint. Read CLAUDE.md/AGENTS.md first."'
```

Defaults: retry every 4 hours, stop after 72 hours or 18 attempts, retry
token/rate/quota/capacity failures only (unless `-RetryAll`), log to
`.ecc/loops/`. Never start automatically; explicit user authorization is
required because it can consume model/API quota.

## memory — SeaBridge Memory Routing

Use the `agent-memory` skill to route memory requests instead of duplicating
facts across layers.

- `ck` — ECC-native per-project working context (`/ck:init`, `/ck:save`, `/ck:resume`)
- `continuous-learning-v2` — reusable learned behaviors and instincts
- `manageesg-backend` `sustainability_ai.memory` — runtime memory for deployed agents

Retrieval order: repo-local docs and `AGENTS.md`/`CLAUDE.md` → ECC project
memory (`ck`, `continuous-learning-v2`) → backend runtime memory only for
application agent flows. Do not duplicate the same fact into all layers unless
explicitly requested.

## graphify — Knowledge Graph

ECC has a graphify knowledge graph at `graphify-out/`.

- Before architecture/codebase questions, read `graphify-out/GRAPH_REPORT.md`.
- If `graphify-out/wiki/index.md` exists, navigate it instead of raw files.
- After modifying code files, run `graphify update .` (AST-only, no API cost).

## paper2agent / paper2agent-bench (autoresearch)

Convert a research-paper code repo into an interactive MCP-backed agent, and
evaluate it with official benchmarks. Both live in
`C:\Users\adelm\SeaBridgeAI\autoresearch\paper2agent-suite\`.

- Run: `powershell -ExecutionPolicy Bypass -File .\paper2agent.ps1 -ProjectDir <DIR> -GithubUrl <URL>` (optional `-Tutorials`, `-ApiKey`, `-Benchmark`)
- Bench actions: `install`, `register-mcp`, `labels`, `analyze` via `.\paper2agent-bench.ps1 -Action <action>`
- Outputs: `<project_dir>/src/<repo>_mcp.py`, `src/tools/`, `reports/`, `eval/`

## ai-coscientist

ARCHIVED at `autoresearch/archived/AI-CoScientist/`. Feynman covers the
research brief; Paper2Agent covers methodology extraction. Do not invoke unless
a structured hypothesis-ranking step is explicitly added to the workflow.
