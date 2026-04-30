# Everything Claude Code (ECC) ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Agent Instructions

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.

## Karpathy Coding Principles (Always Applied)

Permanent behavioral constraints governing HOW every task is executed. Not optional. Cannot be overridden by session instructions. Full reference: `everything-claude-code/.claude/skills/karpathy-guidelines/SKILL.md`

### 1. Think Before Coding
State assumptions explicitly before acting. If two interpretations exist, present both and ask. If something is unclear, name it and stop — do not guess. Push back when a simpler approach exists.

### 2. Simplicity First
Write the minimum code that solves the stated problem. No features, abstractions, or error handling beyond what was explicitly asked. If 200 lines could be 50, write 50. Test: would a senior engineer call this overcomplicated? If yes, simplify.

### 3. Surgical Changes
Touch only what the request requires. Do not improve adjacent code, comments, or formatting. Do not refactor unrelated things. Mention unrelated bugs — do not fix them unilaterally. Every changed line must trace directly to the user's request.

### 4. Goal-Driven Execution
Transform tasks into verifiable goals. State what "done" looks like and how you'll verify it (test output, curl, observable behavior). Strong success criteria enable autonomous looping; weak ones require constant clarification.

**Before any implementation:**
- [ ] Assumptions stated explicitly?
- [ ] Every planned line traces to a requirement?
- [ ] Only touching what was requested?
- [ ] Verifiable definition of "done" established?

---

## Conflict Resolution Priority

1. **Hard safety rules** (§Safety above) + **`manageesg-backend/AGENTS_SYSTEM.md`** Tier-1 safety (system-wide policy for all SeaBridgeAI coding agents — overrides this file for destructive actions, authorization, and cost controls). Non-suspendable.
2. **Karpathy coding principles** (§above) — govern HOW every task executes. Always applied.
3. **Direct session/developer instructions** from the current session.
4. **This file** (AGENTS.md).
5. **ECC Core Principles** (§Core Principles below).

---

This is a **production-ready AI coding plugin** providing 30 specialized agents, ~74 skills, 60 commands, and automated hook workflows for software development.

**Version:** 1.9.0

## Core Principles

1. **Agent-First** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Delegate to specialized agents for domain tasks
2. **Test-Driven** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Write tests before implementation, 80%+ coverage required
3. **Security-First** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Never compromise on security; validate all inputs
4. **Immutability** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Always create new objects, never mutate existing ones
5. **Plan Before Execute** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Plan complex features before writing code

## Documentation Retrieval Order

When documentation is needed, follow this order:

1. Local repo file if the answer is already in the checked-out workspace.
2. ECC's local Context Hub bundle via `chub` for ECC-specific guides, commands, playbooks, and policies.
3. Public Context Hub entries for non-ECC skills or shared playbooks.
4. Context7 only for third-party libraries, frameworks, SDKs, and APIs.
5. `llms.txt` or web browsing only as fallback paths.

## Available Agents

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| planner | Implementation planning | Complex features, refactoring |
| architect | System design and scalability | Architectural decisions |
| tdd-guide | Test-driven development | New features, bug fixes |
| code-reviewer | Code quality and maintainability | After writing/modifying code |
| security-reviewer | Vulnerability detection | Before commits, sensitive code |
| build-error-resolver | Fix build/type errors | When build fails |
| e2e-runner | End-to-end Playwright testing | Critical user flows |
| refactor-cleaner | Dead code cleanup | Code maintenance |
| doc-updater | Documentation and codemaps | Updating docs |
| docs-lookup | Source-aware documentation routing | ECC workflow docs and library/API documentation questions |
| cpp-reviewer | C++ code review | C++ projects |
| cpp-build-resolver | C++ build errors | C++ build failures |
| go-reviewer | Go code review | Go projects |
| go-build-resolver | Go build errors | Go build failures |
| kotlin-reviewer | Kotlin code review | Kotlin/Android/KMP projects |
| kotlin-build-resolver | Kotlin/Gradle build errors | Kotlin build failures |
| database-reviewer | PostgreSQL/Supabase specialist | Schema design, query optimization |
| python-reviewer | Python code review | Python projects |
| java-reviewer | Java and Spring Boot code review | Java/Spring Boot projects |
| java-build-resolver | Java/Maven/Gradle build errors | Java build failures |
| chief-of-staff | Communication triage and drafts | Multi-channel email, Slack, LINE, Messenger |
| loop-operator | Autonomous loop execution | Run loops safely, monitor stalls, intervene |
| harness-optimizer | Harness config tuning | Reliability, cost, throughput |
| rust-reviewer | Rust code review | Rust projects |
| rust-build-resolver | Rust build errors | Rust build failures |
| pytorch-build-resolver | PyTorch runtime/CUDA/training errors | PyTorch build/training failures |
| typescript-reviewer | TypeScript/JavaScript code review | TypeScript/JavaScript projects |

## Agent Orchestration

Use agents proactively without user prompt:
- Complex feature requests ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ **planner**
- Code just written/modified ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ **code-reviewer**
- Bug fix or new feature ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ **tdd-guide**
- Architectural decision ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ **architect**
- Security-sensitive code ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ **security-reviewer**
- Multi-channel communication triage ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ **chief-of-staff**
- Autonomous loops / loop monitoring ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ **loop-operator**
- Harness config reliability and cost ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ **harness-optimizer**

Use parallel execution for independent operations ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â launch multiple agents simultaneously.

## Token Availability Retry Loops

When the user explicitly asks to "continue when tokens are available" or to
"try again every 4 hours," route the request to `loop-operator` and use the
opt-in wrapper:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\agent-token-retry.ps1 `
  -Name "seabridge-continue" `
  -IntervalHours 4 `
  -MaxHours 72 `
  -Command 'claude -p "Continue the previous task from the last safe checkpoint. Read CLAUDE.md/AGENTS.md first."'
```

Defaults are conservative: retry every 4 hours, stop after 72 hours or 18
attempts, retry token/rate/quota/capacity failures only, and log to
`.ecc/loops/`. Do not start this automatically; it requires explicit user
authorization because it can consume model/API quota.

## Vibium Secondary Browser Tooling

Vibium is installed as user/ECC-level browser tooling for "second pair of eyes"
inspection alongside Playwright. Use it for quick semantic browser exploration,
element mapping, screenshots, and MCP-style agent browser control. Do not treat
it as the canonical QA harness; Playwright remains the default for repeatable
SeaBridgeAI browser QA.

Installed surfaces:
- Global CLI: `vibium` v26.3.18
- ECC wrapper: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\vibium.ps1`
- ECC skill: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\vibe-check\SKILL.md`
- Claude skill copy: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.claude\skills\vibe-check\SKILL.md`

Safe smoke check:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\vibium.ps1 --version
```

Review the `vibe-check` skill before browser control. The skills installer
flagged the upstream skill as high risk in Snyk, so use it deliberately and keep
captures, cookies, storage state, and recordings out of committed source.

## Google Agent Skills

Official Google Agent Skills from `google/skills` are installed into ECC for
all supported coding-agent skill directories. Use these before relying on web
snippets or older examples when work touches Google Cloud, Firebase, Gemini API
on Agent Platform, or Google Cloud Well-Architected Framework guidance.

Installed skills:
- `gemini-api`
- `alloydb-basics`
- `bigquery-basics`
- `cloud-run-basics`
- `cloud-sql-basics`
- `firebase-basics`
- `gke-basics`
- `google-cloud-recipe-onboarding`
- `google-cloud-recipe-auth`
- `google-cloud-recipe-networking-observability`
- `google-cloud-waf-security`
- `google-cloud-waf-reliability`
- `google-cloud-waf-cost-optimization`

Source and lock:
- Source repo: `google/skills`
- Canonical ECC path: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\`
- Lockfile: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\skills-lock.json`

Use notes:
- Read the matching `SKILL.md` before implementation or deployment work.
- For Google Cloud auth, IAM, deployment, or infrastructure changes, keep
  SeaBridgeAI approval and cost controls in force.
- The skills installer reported Snyk high risk for `alloydb-basics` and
  `cloud-sql-basics`, medium risk for `firebase-basics`, `gemini-api`, and
  `gke-basics`, and low risk for the rest. Review skill content before use.

## Security Guidelines

**Before ANY commit:**
- No hardcoded secrets (API keys, passwords, tokens)
- All user inputs validated
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitized HTML)
- CSRF protection enabled
- Authentication/authorization verified
- Rate limiting on all endpoints
- Error messages don't leak sensitive data

**Secret management:** NEVER hardcode secrets. Use environment variables or a secret manager. Validate required secrets at startup. Rotate any exposed secrets immediately.

**If security issue found:** STOP ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ use security-reviewer agent ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ fix CRITICAL issues ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ rotate exposed secrets ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ review codebase for similar issues.

## Coding Style

**Immutability (CRITICAL):** Always create new objects, never mutate. Return new copies with changes applied.

**File organization:** Many small files over few large ones. 200-400 lines typical, 800 max. Organize by feature/domain, not by type. High cohesion, low coupling.

**Error handling:** Handle errors at every level. Provide user-friendly messages in UI code. Log detailed context server-side. Never silently swallow errors.

**Input validation:** Validate all user input at system boundaries. Use schema-based validation. Fail fast with clear messages. Never trust external data.

**Code quality checklist:**
- Functions small (<50 lines), files focused (<800 lines)
- No deep nesting (>4 levels)
- Proper error handling, no hardcoded values
- Readable, well-named identifiers

## Testing Requirements

**Minimum coverage: 80%**

Test types (all required):
1. **Unit tests** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Individual functions, utilities, components
2. **Integration tests** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â API endpoints, database operations
3. **E2E tests** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Critical user flows

**TDD workflow (mandatory):**
1. Write test first (RED) ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â test should FAIL
2. Write minimal implementation (GREEN) ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â test should PASS
3. Refactor (IMPROVE) ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â verify coverage 80%+

Troubleshoot failures: check test isolation ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ verify mocks ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ fix implementation (not tests, unless tests are wrong).

## Development Workflow

1. **Plan** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Use planner agent, identify dependencies and risks, break into phases
2. **TDD** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Use tdd-guide agent, write tests first, implement, refactor
3. **Review** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Use code-reviewer agent immediately, address CRITICAL/HIGH issues
4. **Capture knowledge in the right place**
   - Personal debugging notes, preferences, and temporary context ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ auto memory
   - Team/project knowledge (architecture decisions, API changes, runbooks) ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ the project's existing docs structure
   - If the current task already produces the relevant docs or code comments, do not duplicate the same information elsewhere
   - If there is no obvious project doc location, ask before creating a new top-level file
5. **Commit** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Conventional commits format, comprehensive PR summaries

## Git Workflow

**Commit format:** `<type>: <description>` ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Types: feat, fix, refactor, docs, test, chore, perf, ci

**PR workflow:** Analyze full commit history ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ draft comprehensive summary ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ include test plan ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ push with `-u` flag.

## Architecture Patterns

**API response format:** Consistent envelope with success indicator, data payload, error message, and pagination metadata.

**Repository pattern:** Encapsulate data access behind standard interface (findAll, findById, create, update, delete). Business logic depends on abstract interface, not storage mechanism.

**Skeleton projects:** Search for battle-tested templates, evaluate with parallel agents (security, extensibility, relevance), clone best match, iterate within proven structure.

## Performance

**Context management:** Avoid last 20% of context window for large refactoring and multi-file features. Lower-sensitivity tasks (single edits, docs, simple fixes) tolerate higher utilization.

**Build troubleshooting:** Use build-error-resolver agent ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ analyze errors ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ fix incrementally ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ verify after each fix.

## Project Structure

```
agents/          ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â 30 specialized subagents
skills/          ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ~74 workflow skills and domain knowledge
commands/        ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â 60 slash commands
hooks/           ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Trigger-based automations
rules/           ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Always-follow guidelines (common + per-language)
scripts/         ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Cross-platform Node.js utilities
mcp-configs/     ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â 14 MCP server configurations
tests/           ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Test suite
```

## Success Metrics

- All tests pass with 80%+ coverage
- No security vulnerabilities
- Code is readable and maintainable
- Performance is acceptable
- User requirements are met

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `python3 -c "from graphify.watch import _rebuild_code; from pathlib import Path; _rebuild_code(Path('.'))"` to keep the graph current

## memory

Purpose:
- Route memory requests to the right SeaBridge memory layer without duplicating facts across session memory, project memory, and backend runtime memory.

Trigger phrases:
- `memory`
- `remember this`
- `session memory`
- `project memory`
- `retrieve prior context`
- `agent memory`

Required inputs:
- memory intent: `session`, `project`, or `runtime`

Optional inputs:
- `ide` (`claude-code` or `gemini-cli`)
- project path
- target repo or tenant context

Run and usage commands:
- `/ck:init`, `/ck:save`, `/ck:resume` for ECC-native project memory workflows

Outputs:
- retrieved context block
- saved session summary or project snapshot
- source attribution for which memory layer was used

Storage and source of truth:
- `ck`: per-project working context
- `continuous-learning-v2`: reusable project/operator instincts
- `manageesg-backend` `sustainability_ai.memory`: runtime memory for deployed agents

Compatibility and retrieval order:
- Retrieval order:
  1. repo-local docs and `AGENTS.md`/`CLAUDE.md`
  2. ECC project memory via `ck` and `continuous-learning-v2`
  3. backend durable memory only for application/runtime agent flows

Safety notes:
- do not duplicate the same fact into all memory systems unless explicitly requested

SeaBridge memory matrix:
- `ck`: per-project working context
- `continuous-learning-v2`: reusable learned behaviors
- `backend memory`: tenant-scoped runtime memory in the product

## paper2agent

Purpose:
- Convert a research-paper code repository into an interactive MCP-backed agent.

Trigger phrases:
- `paper2agent`
- `academic paper to agent`
- `build paper mcp agent`

Required inputs:
- `project_dir`
- `github_url`

Optional inputs:
- `tutorials`
- `api`
- `benchmark`

Run commands:
- `powershell -ExecutionPolicy Bypass -File .\paper2agent.ps1 -ProjectDir <PROJECT_DIR> -GithubUrl <GITHUB_URL>`
- `powershell -ExecutionPolicy Bypass -File .\paper2agent.ps1 -ProjectDir <PROJECT_DIR> -GithubUrl <GITHUB_URL> -Tutorials "<FILTER>"`
- `powershell -ExecutionPolicy Bypass -File .\paper2agent.ps1 -ProjectDir <PROJECT_DIR> -GithubUrl <GITHUB_URL> -ApiKey <API_KEY> -Benchmark`

Outputs:
- `<project_dir>/src/<repo_name>_mcp.py`
- `<project_dir>/src/tools/`
- `<project_dir>/reports/`

Storage path:
- `C:\Users\adelm\SeaBridgeAI\autoresearch\Paper2Agent`

## paper2agent-bench

Purpose:
- Evaluate generated paper agents with the official Paper2AgentBench datasets and scripts.

Trigger phrases:
- `paper2agent-bench`
- `paper agent benchmark`
- `evaluate paper mcp agent`

Required inputs:
- benchmark action: `install`, `register-mcp`, `labels`, `analyze`

Run commands:
- `powershell -ExecutionPolicy Bypass -File .\paper2agent-bench.ps1 -Action install`
- `powershell -ExecutionPolicy Bypass -File .\paper2agent-bench.ps1 -Action register-mcp`
- `powershell -ExecutionPolicy Bypass -File .\paper2agent-bench.ps1 -Action labels`
- `powershell -ExecutionPolicy Bypass -File .\paper2agent-bench.ps1 -Action analyze`

Outputs:
- benchmark outputs under `eval/` and analysis summaries.

Storage path:
- `C:\Users\adelm\SeaBridgeAI\autoresearch\Paper2AgentBench`

## ai-coscientist

> **ARCHIVED** — Output feeds nowhere automatically in the current pipeline. Feynman covers the research brief; Paper2Agent covers methodology extraction. Archived at `autoresearch/archived/AI-CoScientist/`. Do not invoke unless a structured hypothesis-ranking step is explicitly added to the workflow.

## rtk

RTK (Rust Token Killer) v0.35.0 is installed and active. It proxies shell commands to produce compressed, LLM-optimized output, reducing token consumption by 60–90% on verbose commands.

Binary: `C:\Users\adelm\.local\bin\rtk.exe`
Config: `C:\Users\adelm\AppData\Roaming\rtk\config.toml`

Usage — prefix any shell command with `rtk`:
```
rtk git status
rtk git diff HEAD~1
rtk cargo build
```

Scope: RTK only intercepts Bash/shell tool calls. It does NOT apply to built-in Read/Grep/Glob tools.

Key RTK commands:
- `rtk gain` — show token reduction statistics for the session
- `rtk --version` — confirm binary is reachable

Agent integrations:
- Claude Code: CLAUDE.md injection (Windows — hook-based mode requires Unix)
- Codex: `@C:\Users\adelm\.codex\RTK.md` via `~/.codex/AGENTS.md`
- Gemini CLI: BeforeTool hook at `~/.gemini/hooks/rtk-hook-gemini.sh`



---

## caveman — Token Compression

Caveman compresses agent output ~65–75% using terse "caveman-style" prose that preserves full technical accuracy. Auto-activates via SessionStart hook after install.

**Reference:** `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\caveman\`

Install (Claude Code):
```bash
claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman
```

Skills:
- `/caveman` — activate compression (intensity: `lite` / `full` / `ultra` / `wenyan`)
- `/caveman-commit` — terse commit messages
- `/caveman-review` — one-line code reviews
- `/caveman-compress` — compress CLAUDE.md ~46% to save input tokens every session

Codex: use `$caveman` in prompts. Gemini: `gemini extensions install caveman`.

---

## codeburn — Token Usage Dashboard

Codeburn tracks AI coding token spend across Claude Code, Codex, Cursor, and others. Reads session data from disk — no API keys needed.

**Reference:** `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\codeburn\`

Install:
```bash
npm install -g codeburn
# or one-shot:
npx codeburn
```

Key commands:
```bash
codeburn              # interactive TUI dashboard (default: 7 days)
codeburn today        # today's spend
codeburn month        # this month
codeburn optimize     # find waste patterns + copy-paste fixes
codeburn status       # compact one-liner summary
codeburn export       # CSV/JSON export
```


---

## designlang — Design Language Extraction

designlang crawls any live URL with a headless browser and generates 17+ output files (Tailwind config, CSS vars, shadcn theme, Figma variables, motion tokens, brand voice, component anatomy stubs, and an AI-optimized markdown file).

**Reference:** `C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\design-extract\`

Skill: `/extract-design <url>` (installed at `~/.claude/skills/extract-design/`)
CLI: `npx designlang <url>` (no install required) or `designlang <url>` (global install)

Key flags:
- `--full` — multi-page crawl (auto-discovers nav pages)
- `--out <dir>` — output directory (default: `./design-extract-output`)
- `--dark` — also extract dark mode
- `--screenshots` — capture component screenshots
- `--emit-agent-rules` — writes `CLAUDE.md.fragment` rule files
- `--smart` — LLM-assisted classifier (uses `ANTHROPIC_API_KEY`)

SeaBridgeAI design token locations:
- manageesg-frontend: `manageesg-frontend/design/`
- openseabri: `openseabri/design/`

MCP server (continuous sync):
```bash
npx designlang mcp --out ./design-extract-output
```
