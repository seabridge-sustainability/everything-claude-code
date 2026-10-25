# ECC Tooling Reference

## Verified Git guard and source-free CI observation

The supplementary Claude Git guard can be installed with
`node scripts/install-seabridge-git-guard.js --expected-sha256 SOURCE_SHA256 --expected-loader-sha256 CURRENT_LOADER_SHA256`.
Review both digests first. This explicit installer changes only the existing
`git-guard.js` loader, keeps its old bytes for rollback and installs a content-addressed
snapshot beside it. It never changes settings, permissions or hook trust. Development
checkout edits no longer alter the installed guard. Missing/tampered snapshots deny;
updates require another reviewed installation. Do not disable the digest check.

After a push is verified at the exact origin branch tip, the publishing owner may run
`ecc session release-observe --session ID --branch NAME --candidate FULL_SHA`.
This closes its source reservation while retaining its pinned CI/deploy release.
The observer cannot write, commit, push, rebind or reacquire a source slot. Existing
clients see a closed source session; the normal release still blocks competing
publication. Other owners may prepare local changes without pausing their goals.
Use the finite `release-watch` where its workflow allowlist applies, then
`release-end` and `close` with the same exact branch/candidate. No lease takeover,
CI cancellation or early deploy closure is authorized. For unsupported workflows,
observe exact CI normally and end only your own release with verified evidence.

Bind a scoped repair's resume receipt to its actual owned checkout. Unrelated live
backend edits must not invalidate an ECC-only source task; this does not establish
backend code adoption or remove any required backend/runtime/scientific proof.
Before retiring that checkout, refresh the receipt against the durable repository.

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

Always on for all coding agents (owner decision 2026-10-14, v4.0.1, vendor
defaults). Source: [Caveman](https://github.com/JuliusBrussee/caveman).

- Install/upgrade: `npx @caveman-ai/cli@latest` (interactive) or
  `npx -y @caveman-ai/cli@latest setup --yes`; preview with `setup --dry-run`.
  Needs Node 22.13+. Leaves a global `caveman` command.
- Six modules, all on: output (terse voice), input (shrinks logs/JSON/CSV/test
  output before the model reads them), waste fixes, routing (Auto, active only
  after `caveman login`), scripts (Blocks), browse.
- Wires Claude Code (`~/.claude/settings.json`, `~/.claude.json` MCP), Codex
  (`~/.codex/hooks.json`, `config.toml`), Gemini (`settings.json`, `.env`) and
  OpenCode (`opencode.jsonc`, `plugins/caveman-native.js`), and starts the local
  `caveman-proxy`. Cursor, Windsurf and Cline use always-on user rules
  (`~/.cursor/rules/caveman.mdc`, `~/.windsurf/rules/caveman.md`,
  `~/.clinerules/caveman.md`).
- Check: `caveman status`, `caveman learn`. Switch one module off:
  `caveman off <module>`. Uninstall: `npx -y github:JuliusBrussee/caveman -- --uninstall`.
- Data: CLI telemetry is on by default (install ID, OS, IP, token counts; no
  prompts or code). `caveman telemetry off` or `DO_NOT_TRACK=1` disables it.
  Auto routing sends recent asks plus attached context to Caveman Cloud; stop
  with `caveman off routing`.
- Evidence: the input module compresses every tool result through the proxy,
  including a re-read of the same file, and marks each cut with
  `<<ccr:HANDLE>>`. Compressed output is not evidence. Before quoting or
  computing exact values, citations, IDs or native units from marked output,
  recover the byte-exact original with the `caveman_retrieve` MCP tool (no
  query) or `caveman tools retrieve <HANDLE>`. Compression cannot be excluded
  per file or repo; `caveman off input` disables it for every agent.
- Skills: `/caveman`, `/ultracave`, `/megacave`, `/caveman-commit`,
  `/caveman-review`, `/caveman-compress`. Say `stop caveman` for normal prose.
- Local reference copy: `references/caveman/` (pre-4.0; may lag upstream).

## OmniRoute — Usage-Limit Failover for Claude Code and Codex

Owner setup (2026-10-24). Subscriptions stay primary; when Claude Max or the
ChatGPT plan returns a usage limit, requests continue on other models
automatically, in the same chat.

- **Path:** Claude Code (`ANTHROPIC_BASE_URL=http://127.0.0.1:20150/claude`)
  and Codex (`model_provider = "failover"`, base URL
  `http://127.0.0.1:20150/codex`) go through a local failover proxy,
  `%USERPROFILE%\.omniroute\limit-failover-proxy.js`. Normal requests pass
  unchanged to the subscription (Claude via the Caveman proxy on 8787).
- **On HTTP 429:** the same request is replayed, with subscription credentials
  removed, to the OmniRoute gateway (`127.0.0.1:20128`). Owner order: Kimi Plus
  subscription → Antigravity (Google AI Pro subscription) → NVIDIA free →
  local Ollama. Z.ai and the Kimi pay-per-token balance are not in the chain.
- **Tier-matched:** `tier-map.js` maps each request's own model, so subagents
  keep their tier:
  - Haiku / GPT mini, nano, Luna → `failover-light`: kimi-for-coding →
    Gemini 3.8 Flash low → Gemini 3.1 Flash Lite → Nemotron 3.5 Lightning →
    local Qwen 3.5 9B.
  - Sonnet / GPT Sol / Codex → `failover-standard`: Kimi k3 → kimi-for-coding →
    Claude Sonnet 5.5 (Antigravity) → Gemini 3.8 Flash high → NVIDIA GLM-5.3 →
    Nemotron 3 Ultra → local Qwen.
  - Opus / Fable / Pro → `failover-heavy`: Kimi k3 → Claude Opus 5.5
    (Antigravity) → Claude Sonnet 5.5 → NVIDIA GLM-5.3 → Nemotron 3 Ultra →
    local Qwen 3.8 32k.
- **Schemas:** the proxy normalizes tool JSON schemas (`schema-normalize.js`)
  because Moonshot/Kimi rejects Anthropic/MCP schemas that omit `type` (HTTP 400).
- **Account note:** Antigravity runs on a consumer Google login inside OmniRoute;
  the owner accepted that account risk. Kimi Plus is linked through OmniRoute's
  Kimi Code CLI sign-in (subscription quota, not API balance).
- **Switch back:** the proxy re-checks the subscription at the provider's
  reported reset time (5-hour or weekly window) or at most every 60 minutes.
- **Status/log:** `http://127.0.0.1:20150/status`,
  `%USERPROFILE%\.omniroute\logs\failover.log`.
- **Always on:** `omniroute-watchdog.js` (Windows Startup:
  `start-omniroute-watchdog.cmd`) checks OmniRoute (20128) and the proxy (20150)
  every 30 s and restarts whichever is down; log `logs\watchdog.log`. OmniRoute
  must start from `%USERPROFILE%\.omniroute` (it loads the `.env` of its
  working directory); the watchdog does that.
- **Undo:** Claude: restore `%USERPROFILE%\.claude\settings.before-failover.json`;
  Codex: `node %USERPROFILE%\.omniroute\enable-codex-failover.js --undo`.
- **Manual commands:** `claude-fallback.cmd` / `codex-fallback.cmd` (online
  chain) and `claude-local.cmd` / `codex-local.cmd` (local only) resume the
  latest conversation on OmniRoute.
- **Agent guidance:** fallback models receive the same instruction files and
  hooks, but follow long rules less reliably: keep diffs small, review
  `git diff` before commits, never send tenant or private data to the NVIDIA
  free tier (development/testing terms). Local models have a 32k context.
- **Keys:** `NVIDIA_API_KEY` and `OMNIROUTE_API_KEY` live in the backend `.env`;
  OmniRoute stores its copies encrypted. Claude and ChatGPT subscription logins
  are never stored in OmniRoute (they only pass through the local proxy).
- **OpenCode:** `~/.config/opencode/opencode.jsonc` uses `omniroute/coding-failover`
  by default (no subscription in front, so it starts at Kimi Plus).
- **Kimi limiter:** at most 3 fallback requests use Kimi at once; above 80% of
  the 25M-token / 5-hour window only the heavy tier still uses Kimi; at 100% or
  after a Kimi 429 the request goes to a `spill-*` twin (same chain without
  Kimi) until Kimi recovers. A session keeps its lane for 15 minutes so its
  prompt cache stays warm. `FAILOVER_KIMI_BUDGET=off` disables the limiter.
- **Incremental context:** fallback requests reuse append-only checkpoint
  layers instead of resending the full history (recut after 20 messages or
  25k tokens). Claude requests mark the newest layer for prompt caching
  (within the 4-breakpoint limit). The fallback model gets the path to the
  session transcript (never its contents) so it can recall older detail.
- **Rollback:** backups in `%USERPROFILE%\.omniroute\backup-pre-limiter-20261024`
  and `backup-pre-steps3-6-20261025`.
- Full guide: `%USERPROFILE%\.omniroute\agents.md`.

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

Graphify code graphs are local, rebuildable projections under `graphify-out/`.
They may be missing from a worktree or stale after source changes. Search current
source first; use `node scripts/knowledge-query.js <repo> <symbol>` for a bounded
relationship lookup only after the graph freshness gate passes. Do not load a
whole `GRAPH_REPORT.md` as startup context or rebuild the large graph after each
edit. A missing edge is not proof of no dependency.

The coding-agent policy and runtime layer has a separate, small deterministic
map at `docs/tools/agent-system-map.json`. Run
`node scripts/agent-system-map.js check` before using it. The map records exact
source hashes and evidence-labelled entry/import/reference edges; it does not
prove that a live agent obeyed an instruction. Build it locally at an instruction
milestone with `node scripts/agent-system-map.js build` and run the focused
adapter and behavioral tests. No model call or GitHub Action is needed to build
or check this map.

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
