---
description: Remove dead code and consolidate duplicates
agent: refactor-cleaner
subtask: true
---

# Refactor Clean Command

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


Analyze and clean up the codebase: $ARGUMENTS

## Your Task

1. **Detect dead code** using analysis tools
2. **Identify duplicates** and consolidation opportunities
3. **Safely remove** unused code with documentation
4. **Verify** no functionality broken

## Detection Phase

### Run Analysis Tools

```bash
# Find unused exports
npx knip

# Find unused dependencies
npx depcheck

# Find unused TypeScript exports
npx ts-prune
```

### Manual Checks

- Unused functions (no callers)
- Unused variables
- Unused imports
- Commented-out code
- Unreachable code
- Unused CSS classes

## Removal Phase

### Before Removing

1. **Search for usage** - grep, find references
2. **Check exports** - might be used externally
3. **Verify tests** - no test depends on it
4. **Document removal** - git commit message

### Safe Removal Order

1. Remove unused imports first
2. Remove unused private functions
3. Remove unused exported functions
4. Remove unused types/interfaces
5. Remove unused files

## Consolidation Phase

### Identify Duplicates

- Similar functions with minor differences
- Copy-pasted code blocks
- Repeated patterns

### Consolidation Strategies

1. **Extract utility function** - for repeated logic
2. **Create base class** - for similar classes
3. **Use higher-order functions** - for repeated patterns
4. **Create shared constants** - for magic values

## Verification

After cleanup:

1. `npm run build` - builds successfully
2. `npm test` - all tests pass
3. `npm run lint` - no new lint errors
4. Manual smoke test - features work

## Report Format

```
Dead Code Analysis
==================

Removed:
- file.ts: functionName (unused export)
- utils.ts: helperFunction (no callers)

Consolidated:
- formatDate() and formatDateTime() Ã¢â€ â€™ dateUtils.format()

Remaining (manual review needed):
- oldComponent.tsx: potentially unused, verify with team
```

---

**CAUTION**: Always verify before removing. When in doubt, ask or add `// TODO: verify usage` comment.
