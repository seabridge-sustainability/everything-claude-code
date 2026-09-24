---
description: Configure package manager preference
agent: build
---

# Setup Package Manager Command

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Configure your preferred package manager: $ARGUMENTS

## Your Task

Set up package manager preference for the project or globally.

## Detection Order

1. **Environment variable**: `CLAUDE_PACKAGE_MANAGER`
2. **Project config**: `.claude/package-manager.json`
3. **package.json**: `packageManager` field
4. **Lock file**: Auto-detect from lock files
5. **Global config**: `~/.claude/package-manager.json`
6. **Fallback**: First available

## Configuration Options

### Option 1: Environment Variable
```bash
export CLAUDE_PACKAGE_MANAGER=pnpm
```

### Option 2: Project Config
```bash
# Create .claude/package-manager.json
echo '{"packageManager": "pnpm"}' > .claude/package-manager.json
```

### Option 3: package.json
```json
{
  "packageManager": "pnpm@8.0.0"
}
```

### Option 4: Global Config
```bash
# Create ~/.claude/package-manager.json
echo '{"packageManager": "yarn"}' > ~/.claude/package-manager.json
```

## Supported Package Managers

| Manager | Lock File | Commands |
|---------|-----------|----------|
| npm | package-lock.json | `npm install`, `npm run` |
| pnpm | pnpm-lock.yaml | `pnpm install`, `pnpm run` |
| yarn | yarn.lock | `yarn install`, `yarn run` |
| bun | bun.lockb | `bun install`, `bun run` |

## Verification

Check current setting:
```bash
node scripts/setup-package-manager.js --detect
```

---

**TIP**: For consistency across team, add `packageManager` field to package.json.
