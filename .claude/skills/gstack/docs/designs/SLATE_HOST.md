# Slate Host Integration Ã¢â‚¬â€ Research & Design Doc

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


**Date:** 2026-04-02
**Branch:** garrytan/slate-agent-support
**Status:** Research complete, blocked on host config refactor
**Supersedes:** None

## What is Slate

Slate is a proprietary coding agent CLI from Random Labs.
Install: `npm i -g @randomlabs/slate` or `brew install anthropic/tap/slate`.
License: Proprietary. 85MB compiled Bun binary (arm64/x64, darwin/linux/windows).
npm package: `@randomlabs/slate@1.0.25` (thin 8.8KB launcher + platform-specific optional deps).

Multi-model: dynamically selects Claude Sonnet/Opus/Haiku, plus other models.
Built for "swarm orchestration" with extended multi-hour sessions.

## Slate is an OpenCode fork

**Confirmed via binary strings analysis** of the 85MB Mach-O arm64 binary:

- Internal name: `name: "opencode"` (literal string in binary)
- All `OPENCODE_*` env vars present alongside `SLATE_*` equivalents
- Shares OpenCode's tool/skill architecture, LSP integration, terminal management
- Own branding, API endpoints (`api.randomlabs.ai`, `agent-worker-prod.randomlabs.workers.dev`), and config paths

This matters for integration: OpenCode conventions mostly apply, but Slate adds
its own paths and env vars on top.

## Skill Discovery (confirmed from binary)

Slate scans ALL four directory families for skills. Error messages in binary confirm:

```
"failed .slate directory scan for skills"
"failed .claude directory scan for skills"
"failed .agents directory scan for skills"
"failed .opencode directory scan for skills"
```

**Discovery paths (priority order from Slate docs):**

1. `.slate/skills/<name>/SKILL.md` Ã¢â‚¬â€ project-level, highest priority
2. `~/.slate/skills/<name>/SKILL.md` Ã¢â‚¬â€ global
3. `.opencode/skills/`, `.agents/skills/` Ã¢â‚¬â€ compatibility fallback
4. `.claude/skills/` Ã¢â‚¬â€ Claude Code compatibility fallback (lowest)
5. Custom paths via `slate.json`

**Glob patterns:** `**/SKILL.md` and `{skill,skills}/**/SKILL.md`

**Commands:** Same directory structure but under `commands/` subdirs:
`/.slate/commands/`, `/.claude/commands/`, `/.agents/commands/`, `/.opencode/commands/`

**Skill frontmatter:** YAML with `name` and `description` fields (per Slate docs).
No documented length limits on either field.

## Project Instructions

Slate reads both `CLAUDE.md` and `AGENTS.md` for project instructions.
Both literal strings confirmed in binary. No changes needed to existing
gstack projects... CLAUDE.md works as-is.

## Configuration

**Config file:** `slate.json` / `slate.jsonc` (NOT opencode.json)

**Config options (from Slate docs):**
- `privacy` (boolean) Ã¢â‚¬â€ disables telemetry/logging
- Permissions: `allow`, `ask`, `deny` per tool (`read`, `edit`, `bash`, `grep`, `webfetch`, `websearch`, `*`)
- Model slots: `models.main`, `models.subagent`, `models.search`, `models.reasoning`
- MCP servers: local or remote with custom commands and headers
- Custom commands: `/commands` with templates

The setup script should NOT create `slate.json`. Users configure their own permissions.

## CLI Flags (Headless Mode)

```
--stream-json / --output-format stream-json  Ã¢â‚¬â€ JSONL output, "compatible with Anthropic Claude Code SDK"
--dangerously-skip-permissions               Ã¢â‚¬â€ bypass all permission checks (CI/automation)
--input-format stream-json                   Ã¢â‚¬â€ programmatic input
-q                                           Ã¢â‚¬â€ non-interactive mode
-w <dir>                                     Ã¢â‚¬â€ workspace directory
--output-format text                         Ã¢â‚¬â€ plain text output (default)
```

**Stream-JSON format:** Slate docs claim "compatible with Anthropic Claude Code SDK."
Not yet empirically verified. Given OpenCode heritage, likely matches Claude Code's
NDJSON event schema (type: "assistant", type: "tool_result", type: "result").

**Need to verify:** Run `slate -q "hello" --stream-json` with valid credits and
capture actual JSONL events before building the session runner parser.

## Environment Variables (from binary strings)

### Slate-specific
```
SLATE_API_KEY                              Ã¢â‚¬â€ API key
SLATE_AGENT                                Ã¢â‚¬â€ agent selection
SLATE_AUTO_SHARE                           Ã¢â‚¬â€ auto-share setting
SLATE_CLIENT                               Ã¢â‚¬â€ client identifier
SLATE_CONFIG                               Ã¢â‚¬â€ config override
SLATE_CONFIG_CONTENT                       Ã¢â‚¬â€ inline config
SLATE_CONFIG_DIR                           Ã¢â‚¬â€ config directory
SLATE_DANGEROUSLY_SKIP_PERMISSIONS         Ã¢â‚¬â€ bypass permissions
SLATE_DIR                                  Ã¢â‚¬â€ data directory override
SLATE_DISABLE_AUTOUPDATE                   Ã¢â‚¬â€ disable auto-update
SLATE_DISABLE_CLAUDE_CODE                  Ã¢â‚¬â€ disable Claude Code integration entirely
SLATE_DISABLE_CLAUDE_CODE_PROMPT           Ã¢â‚¬â€ disable Claude Code prompt loading
SLATE_DISABLE_CLAUDE_CODE_SKILLS           Ã¢â‚¬â€ disable .claude/skills/ loading
SLATE_DISABLE_DEFAULT_PLUGINS              Ã¢â‚¬â€ disable default plugins
SLATE_DISABLE_FILETIME_CHECK               Ã¢â‚¬â€ disable file time checks
SLATE_DISABLE_LSP_DOWNLOAD                 Ã¢â‚¬â€ disable LSP auto-download
SLATE_DISABLE_MODELS_FETCH                 Ã¢â‚¬â€ disable models config fetch
SLATE_DISABLE_PROJECT_CONFIG               Ã¢â‚¬â€ disable project-level config
SLATE_DISABLE_PRUNE                        Ã¢â‚¬â€ disable session pruning
SLATE_DISABLE_TERMINAL_TITLE               Ã¢â‚¬â€ disable terminal title updates
SLATE_ENABLE_EXA                           Ã¢â‚¬â€ enable Exa search
SLATE_ENABLE_EXPERIMENTAL_MODELS           Ã¢â‚¬â€ enable experimental models
SLATE_EXPERIMENTAL                         Ã¢â‚¬â€ enable experimental features
SLATE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS Ã¢â‚¬â€ bash timeout override
SLATE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT  Ã¢â‚¬â€ disable copy on select
SLATE_EXPERIMENTAL_DISABLE_FILEWATCHER     Ã¢â‚¬â€ disable file watcher
SLATE_EXPERIMENTAL_EXA                     Ã¢â‚¬â€ Exa search (alt flag)
SLATE_EXPERIMENTAL_FILEWATCHER             Ã¢â‚¬â€ enable file watcher
SLATE_EXPERIMENTAL_ICON_DISCOVERY          Ã¢â‚¬â€ icon discovery
SLATE_EXPERIMENTAL_LSP_TOOL               Ã¢â‚¬â€ LSP tool
SLATE_EXPERIMENTAL_LSP_TY                 Ã¢â‚¬â€ LSP type checking
SLATE_EXPERIMENTAL_MARKDOWN               Ã¢â‚¬â€ markdown mode
SLATE_EXPERIMENTAL_OUTPUT_TOKEN_MAX       Ã¢â‚¬â€ output token limit
SLATE_EXPERIMENTAL_OXFMT                  Ã¢â‚¬â€ oxfmt integration
SLATE_EXPERIMENTAL_PLAN_MODE              Ã¢â‚¬â€ plan mode
SLATE_FAKE_VCS                            Ã¢â‚¬â€ fake VCS for testing
SLATE_GIT_BASH_PATH                       Ã¢â‚¬â€ git bash path (Windows)
SLATE_MODELS_URL                          Ã¢â‚¬â€ models config URL
SLATE_PERMISSION                          Ã¢â‚¬â€ permission override
SLATE_SERVER_PASSWORD                     Ã¢â‚¬â€ server auth
SLATE_SERVER_USERNAME                     Ã¢â‚¬â€ server auth
SLATE_TELEMETRY_DISABLED                  Ã¢â‚¬â€ disable telemetry
SLATE_TEST_HOME                           Ã¢â‚¬â€ test home directory
SLATE_TOKEN_DIR                           Ã¢â‚¬â€ token storage directory
```

### OpenCode legacy (still functional)
```
OPENCODE_DISABLE_LSP_DOWNLOAD
OPENCODE_EXPERIMENTAL_DISABLE_FILEWATCHER
OPENCODE_EXPERIMENTAL_FILEWATCHER
OPENCODE_EXPERIMENTAL_ICON_DISCOVERY
OPENCODE_EXPERIMENTAL_LSP_TY
OPENCODE_EXPERIMENTAL_OXFMT
OPENCODE_FAKE_VCS
OPENCODE_GIT_BASH_PATH
OPENCODE_LIBC
OPENCODE_TERMINAL
```

### Critical env vars for gstack integration

**`SLATE_DISABLE_CLAUDE_CODE_SKILLS`** Ã¢â‚¬â€ When set, `.claude/skills/` loading is disabled.
This makes publishing to `.slate/skills/` load-bearing, not just an optimization.
Without native `.slate/` publishing, gstack skills vanish when this flag is set.

**`SLATE_TEST_HOME`** Ã¢â‚¬â€ Useful for E2E tests. Can redirect Slate's home directory
to an isolated temp directory, similar to how Codex tests use a temp HOME.

**`SLATE_DANGEROUSLY_SKIP_PERMISSIONS`** Ã¢â‚¬â€ Required for headless E2E tests.

## Model References (from binary)

```
anthropic/claude-sonnet-4.6
anthropic/claude-opus-4
anthropic/claude-haiku-4
anthropic/slate              Ã¢â‚¬â€ Slate's own model routing
openai/gpt-5.3-codex
google/nano-banana
randomlabs/fast-default-alpha
```

## API Endpoints (from binary)

```
https://api.randomlabs.ai                          Ã¢â‚¬â€ main API
https://api.randomlabs.ai/exaproxy                 Ã¢â‚¬â€ Exa search proxy
https://agent-worker-prod.randomlabs.workers.dev   Ã¢â‚¬â€ production worker
https://agent-worker-dev.randomlabs.workers.dev    Ã¢â‚¬â€ dev worker
https://dashboard.randomlabs.ai                    Ã¢â‚¬â€ dashboard
https://docs.randomlabs.ai                         Ã¢â‚¬â€ documentation
https://randomlabs.ai/config.json                  Ã¢â‚¬â€ remote config
```

Brew tap: `anthropic/tap/slate` (notable: under Anthropic's tap, not Random Labs)

## npm Package Structure

```
@randomlabs/slate (8.8 kB, thin launcher)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ bin/slate           Ã¢â‚¬â€ Node.js launcher (finds platform binary in node_modules)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ bin/slate1          Ã¢â‚¬â€ Bun launcher (same logic, import.meta.filename)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ postinstall.mjs     Ã¢â‚¬â€ Verifies platform binary exists, symlinks if needed
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ package.json        Ã¢â‚¬â€ Declares optionalDependencies for all platforms

Platform packages (85MB each):
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ @randomlabs/slate-darwin-arm64
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ @randomlabs/slate-darwin-x64
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ @randomlabs/slate-linux-arm64
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ @randomlabs/slate-linux-x64
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ @randomlabs/slate-linux-x64-musl
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ @randomlabs/slate-linux-arm64-musl
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ @randomlabs/slate-linux-x64-baseline
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ @randomlabs/slate-linux-x64-baseline-musl
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ @randomlabs/slate-darwin-x64-baseline
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ @randomlabs/slate-windows-x64
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ @randomlabs/slate-windows-x64-baseline
```

Binary override: `SLATE_BIN_PATH` env var skips all discovery, runs the specified binary directly.

## What Already Works Today

gstack skills already work in Slate via the `.claude/skills/` fallback path.
No changes needed for basic functionality. Users who install gstack for Claude Code
and also use Slate will find their skills available in both agents.

## What First-Class Support Adds

1. **Reliability** Ã¢â‚¬â€ `.slate/skills/` is Slate's highest-priority path. Immune to
   `SLATE_DISABLE_CLAUDE_CODE_SKILLS`.
2. **Optimized frontmatter** Ã¢â‚¬â€ Strip Claude-specific fields (allowed-tools, hooks, version)
   that Slate doesn't use. Keep only `name` and `description`.
3. **Setup script** Ã¢â‚¬â€ Auto-detect `slate` binary, install skills to `~/.slate/skills/`.
4. **E2E tests** Ã¢â‚¬â€ Verify skills work when invoked by Slate directly.

## Blocked On: Host Config Refactor

Codex's outside voice review identified that adding Slate as a 4th host (after Claude,
Codex, Factory) is "host explosion for a path alias." The current architecture has:

- Hard-coded host names in `type Host = 'claude' | 'codex' | 'factory'`
- Per-host branches in `transformFrontmatter()` with near-duplicate logic
- Per-host config in `EXTERNAL_HOST_CONFIG` with similar patterns
- Per-host functions in the setup script (`create_codex_runtime_root`, `link_codex_skill_dirs`)
- Host names duplicated in `bin/gstack-platform-detect`, `bin/gstack-uninstall`, `bin/dev-setup`

Adding Slate means copying all of these patterns again. A refactor to make hosts
data-driven (config objects instead of if/else branches) would make Slate integration
trivial AND make future hosts (any new OpenCode fork, any new agent) zero-effort.

### Missing from the plan (identified by Codex)

- `lib/worktree.ts` only copies `.agents/`, not `.slate/` Ã¢â‚¬â€ E2E tests in worktrees won't
  have Slate skills
- `bin/gstack-uninstall` doesn't know about `.slate/`
- `bin/dev-setup` doesn't wire `.slate/` for contributor dev mode
- `bin/gstack-platform-detect` doesn't detect Slate
- E2E tests should set `SLATE_DISABLE_CLAUDE_CODE_SKILLS=1` to prove `.slate/` path
  actually works (not just falling back to `.claude/`)

## Session Runner Design (for later)

When the JSONL format is verified, the session runner should:

- Spawn: `slate -q "<prompt>" --stream-json --dangerously-skip-permissions -w <dir>`
- Parse: Claude Code SDK-compatible NDJSON (assumed, needs verification)
- Skills: Install to `.slate/skills/` in test fixture (not `.claude/skills/`)
- Auth: Use `SLATE_API_KEY` or existing `~/.slate/` credentials
- Isolation: Use `SLATE_TEST_HOME` for home directory isolation
- Timeout: 300s default (same as Codex)

```typescript
export interface SlateResult {
  output: string;
  toolCalls: string[];
  tokens: number;
  exitCode: number;
  durationMs: number;
  sessionId: string | null;
  rawLines: string[];
  stderr: string;
}
```

## Docs References

- Slate docs: https://docs.randomlabs.ai
- Quickstart: https://docs.randomlabs.ai/en/getting-started/quickstart
- Skills: https://docs.randomlabs.ai/en/using-slate/skills
- Configuration: https://docs.randomlabs.ai/en/using-slate/configuration
- Hotkeys: https://docs.randomlabs.ai/en/using-slate/hotkey_reference
