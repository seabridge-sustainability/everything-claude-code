# Node.js Rules for everything-claude-code

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Project-specific rules for the ECC codebase. Extends common rules.

## Stack

- **Runtime**: Node.js >=18 (no transpilation, plain CommonJS)
- **Test runner**: `node tests/run-all.js` Ã¢â‚¬â€ individual files via `node tests/**/*.test.js`
- **Linter**: ESLint (`@eslint/js`, flat config)
- **Coverage**: c8
- **Lint**: markdownlint-cli for `.md` files

## File Conventions

- `scripts/` Ã¢â‚¬â€ Node.js utilities, hooks. CommonJS (`require`/`module.exports`)
- `agents/`, `commands/`, `skills/`, `rules/` Ã¢â‚¬â€ Markdown with YAML frontmatter
- `tests/` Ã¢â‚¬â€ Mirror the `scripts/` structure. Test files named `*.test.js`
- File naming: **lowercase with hyphens** (e.g. `session-start.js`, `post-edit-format.js`)

## Code Style

- CommonJS only Ã¢â‚¬â€ no ESM (`import`/`export`) unless file ends in `.mjs`
- No TypeScript Ã¢â‚¬â€ plain `.js` throughout
- Prefer `const` over `let`; never `var`
- Keep hook scripts under 200 lines Ã¢â‚¬â€ extract helpers to `scripts/lib/`
- All hooks must `exit 0` on non-critical errors (never block tool execution unexpectedly)

## Hook Development

- Hook scripts normally receive JSON on stdin, but hooks routed through `scripts/hooks/run-with-flags.js` can export `run(rawInput)` and let the wrapper handle parsing/gating
- Async hooks: mark `"async": true` in `settings.json` with a timeout Ã¢â€°Â¤30s
- Blocking hooks (PreToolUse, stop): keep fast (<200ms) Ã¢â‚¬â€ no network calls
- Use `run-with-flags.js` wrapper for all hooks so `ECC_HOOK_PROFILE` and `ECC_DISABLED_HOOKS` runtime gating works
- Always exit 0 on parse errors; log to stderr with `[HookName]` prefix

## Testing Requirements

- Run `node tests/run-all.js` before committing
- New scripts in `scripts/lib/` require a matching test in `tests/lib/`
- New hooks require at least one integration test in `tests/hooks/`

## Markdown / Agent Files

- Agents: YAML frontmatter with `name`, `description`, `tools`, `model`
- Skills: sections Ã¢â‚¬â€ When to Use, How It Works, Examples
- Commands: `description:` frontmatter line required
- Run `npx markdownlint-cli '**/*.md' --ignore node_modules` before committing
