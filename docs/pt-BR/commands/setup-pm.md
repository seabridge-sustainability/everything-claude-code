---
description: Configure seu package manager preferido (npm/pnpm/yarn/bun)
disable-model-invocation: true
---

# ConfiguraÃƒÂ§ÃƒÂ£o de Package Manager

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


Configure seu package manager preferido para este projeto ou globalmente.

## Uso

```bash
# Detect current package manager
node scripts/setup-package-manager.js --detect

# Set global preference
node scripts/setup-package-manager.js --global pnpm

# Set project preference
node scripts/setup-package-manager.js --project bun

# List available package managers
node scripts/setup-package-manager.js --list
```

## Prioridade de DetecÃƒÂ§ÃƒÂ£o

Ao determinar qual package manager usar, esta ordem ÃƒÂ© verificada:

1. **Environment variable**: `CLAUDE_PACKAGE_MANAGER`
2. **Project config**: `.claude/package-manager.json`
3. **package.json**: `packageManager` field
4. **Lock file**: Presence of package-lock.json, yarn.lock, pnpm-lock.yaml, or bun.lockb
5. **Global config**: `~/.claude/package-manager.json`
6. **Fallback**: First available package manager (pnpm > bun > yarn > npm)

## Arquivos de ConfiguraÃƒÂ§ÃƒÂ£o

### ConfiguraÃƒÂ§ÃƒÂ£o Global
```json
// ~/.claude/package-manager.json
{
  "packageManager": "pnpm"
}
```

### ConfiguraÃƒÂ§ÃƒÂ£o do Projeto
```json
// .claude/package-manager.json
{
  "packageManager": "bun"
}
```

### package.json
```json
{
  "packageManager": "pnpm@8.6.0"
}
```

## VariÃƒÂ¡vel de Ambiente

Defina `CLAUDE_PACKAGE_MANAGER` para sobrescrever todos os outros mÃƒÂ©todos de detecÃƒÂ§ÃƒÂ£o:

```bash
# Windows (PowerShell)
$env:CLAUDE_PACKAGE_MANAGER = "pnpm"

# macOS/Linux
export CLAUDE_PACKAGE_MANAGER=pnpm
```

## Rodar a DetecÃƒÂ§ÃƒÂ£o

Para ver os resultados atuais da detecÃƒÂ§ÃƒÂ£o de package manager, rode:

```bash
node scripts/setup-package-manager.js --detect
```
