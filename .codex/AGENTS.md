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
# ECC for Codex CLI

This supplements the root `AGENTS.md` with Codex-specific guidance.

For repo navigation, surface ownership, and PR diff packet guidance, read
`docs/CODEX-NAVIGATION-GUIDE.md` after this supplement.

## Model Recommendations

| Task Type | Recommended Model |
|-----------|------------------|
| Routine coding, tests, formatting | GPT 5.5 |
| Complex features, architecture | GPT 5.5 |
| Debugging, refactoring | GPT 5.5 |
| Security review | GPT 5.5 |

## Skills Discovery

Skills are auto-loaded from `.agents/skills/`. Each skill contains:
- `SKILL.md` - Detailed instructions and workflow
- `agents/openai.yaml` - Codex interface metadata

Do not rely on a static catalog here: discover the current skill surface by
listing `.agents/skills/` (and `skills/` for canonical `sea-*` bodies), or use
`sea-skill-map` / `docs/SKILL_ROUTING_REFERENCE.md` for routing. Load at most
one skill per task per the skill-selection rule in `AGENTS_SYSTEM.md`.

## Google Skills Boundary

Official Google Agent Skills from `google/skills` are installed under
`.agents/skills` and copied across supported ECC agent skill folders. Use the
matching Google skill before implementing Google Cloud, Firebase, Gemini API, or
Google Cloud Well-Architected Framework work. These skills do not authorize live
cloud mutations, paid workloads, IAM changes, deployments, or secret handling;
SeaBridgeAI approval and cost controls still apply.

The installer reported Snyk high risk for `alloydb-basics` and
`cloud-sql-basics`, medium risk for `firebase-basics`, `gemini-api`, and
`gke-basics`, and low risk for the rest. Review the relevant `SKILL.md` before
use.

## Vibium Boundary

Vibium is installed as user/ECC-level tooling, not product runtime. Use the
`vibe-check` skill or `scripts/vibium.ps1` when the user wants a second pair of
browser eyes in addition to Playwright. Playwright remains canonical for
repeatable SeaBridgeAI QA/regression testing.

Safe checks:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\vibium.ps1 --version
```

The skill installer flagged the upstream skill as high risk in Snyk; review the
skill before use and keep browser captures/state out of committed source.

## Documentation Retrieval Order

For documentation work inside Codex, use this order:

1. Local repo files if the answer is already in the workspace.
2. ECC's local Context Hub bundle via `chub` for ECC-specific guides, commands, policies, and workflows.
3. Public Context Hub entries for non-ECC skills or shared playbooks.
4. Context7 only for third-party libraries, frameworks, SDKs, and APIs.
5. `llms.txt` or general browsing only as fallback paths.

## Context Hub in Codex

ECC does not add a Context Hub MCP server in this pass. The integration is CLI-based:

```bash
npm run context-hub:sync
npm run context-hub:validate
npm run context-hub:build
```

After building, add `context-hub/dist` to `~/.chub/config.yaml` as a local source if you want `chub search` and `chub get` to cover ECC's own docs.

## MCP Servers

Treat the project-local `.codex/config.toml` as the default Codex baseline for ECC. The current ECC baseline enables GitHub, Context7, Exa, Memory, Playwright, and Sequential Thinking; add heavier extras in `~/.codex/config.toml` only when a task actually needs them.

ECC's canonical Codex section name is `[mcp_servers.context7]`. The launcher package remains `@upstash/context7-mcp`; only the TOML section name is normalized for consistency with `codex mcp list` and the reference config.

Use Context7 narrowly: it is the external docs lane for vendor, framework, and API questions, not the default source for ECC's own documentation.

### Automatic config.toml merging

The sync script (`scripts/sync-ecc-to-codex.sh`) uses a Node-based TOML parser to safely merge ECC MCP servers into `~/.codex/config.toml`:

- **Add-only by default** - missing ECC servers are appended; existing servers are never modified or removed.
- **7 managed servers** - Supabase, Playwright, Context7, Exa, GitHub, Memory, Sequential Thinking.
- **Canonical naming** - ECC manages Context7 as `[mcp_servers.context7]`; legacy `[mcp_servers.context7-mcp]` entries are treated as aliases during updates.
- **Package-manager aware** - uses the project's configured package manager (npm/pnpm/yarn/bun) instead of hardcoding `pnpm`.
- **Drift warnings** - if an existing server's config differs from the ECC recommendation, the script logs a warning.
- **`--update-mcp`** - explicitly replaces all ECC-managed servers with the latest recommended config (safely removes subtables like `[mcp_servers.supabase.env]`).
- **User config is always preserved** - custom servers, args, env vars, and credentials outside ECC-managed sections are never touched.

## External Action Boundaries

Treat networked tools as read-only by default. Search, inspect, and draft freely within the user's requested scope, but require explicit user approval before posting, publishing, pushing, merging, opening paid jobs, dispatching remote agents, changing third-party resources, or modifying credentials.

When approval is ambiguous, produce a local plan or draft artifact instead of taking the external action. Preserve user config and private state unless the user specifically asks for a scoped change.

## Multi-Agent Support

Codex now supports multi-agent workflows behind the experimental `features.multi_agent` flag.

- Enable it in `.codex/config.toml` with `[features] multi_agent = true`
- Define project-local roles under `[agents.<name>]`
- Point each role at a TOML layer under `.codex/agents/`
- Use `/agent` inside Codex CLI to inspect and steer child agents

Sample role configs in this repo:
- `.codex/agents/explorer.toml` - read-only evidence gathering
- `.codex/agents/reviewer.toml` - correctness/security review
- `.codex/agents/docs-researcher.toml` - API and release-note verification

## Key Differences from Claude Code

| Feature | Claude Code | Codex CLI |
|---------|------------|-----------|
| Hooks | 8+ event types | Not yet supported |
| Context file | CLAUDE.md + AGENTS.md | AGENTS.md only |
| Skills | Skills loaded via plugin | `.agents/skills/` directory |
| Commands | `/slash` commands | Instruction-based |
| Agents | Subagent Task tool | Multi-agent via `/agent` and `[agents.<name>]` roles |
| Security | Hook-based enforcement | Instruction-based security + sandbox |
| MCP | Full support | Supported via `config.toml` and `codex mcp add` |

## Security Hooks

Runtime preflight guardrails are not configured in SeaBridgeAI Codex projects. Keep instruction-based security active across runtime surfaces and sandboxes.
1. Always validate inputs at system boundaries
2. Never hardcode secrets - use environment variables
3. Run `npm audit` / `pip audit` before committing
4. Review `git diff` before every push
5. Use `sandbox_mode = "workspace-write"` in config
