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
- `npx claude-mem --help` to check whether `claude-mem` is already available before proposing install
- `npx claude-mem install` for Claude Code session memory
- `npx claude-mem install --ide gemini-cli` for Gemini CLI session memory
- `/ck:init`, `/ck:save`, `/ck:resume` for ECC-native project memory workflows

Outputs:
- retrieved context block
- saved session summary or project snapshot
- source attribution for which memory layer was used

Storage and source of truth:
- `claude-mem`: optional user-level session continuity backend for Claude Code and Gemini CLI only
- `ck`: per-project working context
- `continuous-learning-v2`: reusable project/operator instincts
- `manageesg-backend` `sustainability_ai.memory`: runtime memory for deployed agents

Compatibility and retrieval order:
- Do not auto-enable `claude-mem` hooks when ECC hooks already own the same retrieval/injection event without a precedence rule
- Observation hooks may coexist; retrieval should prefer one summary surface
- Retrieval order:
  1. repo-local docs and `AGENTS.md`/`CLAUDE.md`
  2. ECC project memory via `ck` and `continuous-learning-v2`
  3. `claude-mem` session observations
  4. backend durable memory only for application/runtime agent flows

Safety notes:
- `claude-mem` is optional infrastructure, not repo truth
- do not duplicate the same fact into all memory systems unless explicitly requested
- do not wire `claude-mem` directly into backend runtime memory in this pass

SeaBridge memory matrix:
- `claude-mem`: personal/session continuity
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

Purpose:
- Multi-agent scientific ideation and supervision using the Swarm Corporation's AI-CoScientist framework. Generates research hypotheses, coordinates specialist agent pipelines, and synthesizes findings across ESG and sustainability domains.

Trigger phrases:
- `ai-coscientist`
- `co-scientist`
- `multi-agent research ideation`
- `swarm coscientist`

Required inputs:
- Research task description (`-Task`)

Optional inputs:
- Additional environment variables for API keys (e.g., `OPENAI_API_KEY`)

Run commands:
```powershell
# Check stack readiness first
powershell -ExecutionPolicy Bypass -File "C:\Users\adelm\SeaBridgeAI\manageesg-backend\co-scientist-orchestrator.ps1" -Action status

# Dry-run to preview command
powershell -ExecutionPolicy Bypass -File "C:\Users\adelm\SeaBridgeAI\manageesg-backend\co-scientist-orchestrator.ps1" -Action run-coscientist -Task "Identify ESG risk factors in climate transition scenarios" -DryRun

# Execute (requires explicit approval — incurs API cost)
powershell -ExecutionPolicy Bypass -File "C:\Users\adelm\SeaBridgeAI\manageesg-backend\co-scientist-orchestrator.ps1" -Action run-coscientist -Task "Identify ESG risk factors in climate transition scenarios"
```

Outputs:
- Research hypotheses and synthesis documents in the AI-CoScientist output directory.
- Multi-agent conversation logs and ideation traces.

Storage path:
- Source-of-truth repo: `C:\Users\adelm\SeaBridgeAI\autoresearch\AI-CoScientist`
- Clone: `git clone https://github.com/The-Swarm-Corporation/AI-CoScientist "C:\Users\adelm\SeaBridgeAI\autoresearch\AI-CoScientist"`

Safety and cost notice:
- Manual opt-in ONLY. Do not auto-run via hooks.
- Requires explicit written approval from adelmar@seabridge.ai.
- Invokes many LLM calls; may incur significant API cost.

## ai-scientist

Purpose:
- Autonomous experiment generation using Sakana AI's AI-Scientist framework. Generates novel research ideas, writes experiment code, executes experiments, and produces paper-style write-ups. MUST be run in an isolated/sandboxed environment because it executes model-written code.

Trigger phrases:
- `ai-scientist`
- `autonomous experiment`
- `sakana scientist`
- `automated research paper`

Required inputs:
- None required (generates ideas autonomously), but `-Idea` seed is recommended

Optional inputs:
- `-Idea <text>` — seed idea to guide experiment generation

Run commands:
```powershell
# Check stack readiness first
powershell -ExecutionPolicy Bypass -File "C:\Users\adelm\SeaBridgeAI\manageesg-backend\co-scientist-orchestrator.ps1" -Action status

# Dry-run (always prints ISOLATION WARNING even in dry-run)
powershell -ExecutionPolicy Bypass -File "C:\Users\adelm\SeaBridgeAI\manageesg-backend\co-scientist-orchestrator.ps1" -Action run-ai-scientist -DryRun

# Execute with seed idea (ISOLATION REQUIRED — sandboxed environment only)
powershell -ExecutionPolicy Bypass -File "C:\Users\adelm\SeaBridgeAI\manageesg-backend\co-scientist-orchestrator.ps1" -Action run-ai-scientist -Idea "Novel ESG metric combining physical risk and regulatory exposure"
```

Outputs:
- Generated experiment code and results under AI-Scientist output directories.
- Paper-style LaTeX write-ups of experiment findings.
- Review scores and analysis reports.

Storage path:
- Source-of-truth repo: `C:\Users\adelm\SeaBridgeAI\autoresearch\ai-scientist`
- Clone: `git clone https://github.com/sakanaai/ai-scientist "C:\Users\adelm\SeaBridgeAI\autoresearch\ai-scientist"`

Safety and isolation notice:
- **ISOLATION REQUIRED.** This framework generates and EXECUTES model-written code.
- Never run on a production machine or shared infrastructure.
- Manual opt-in ONLY. Do not auto-run via hooks.
- Requires explicit written approval from adelmar@seabridge.ai.

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

