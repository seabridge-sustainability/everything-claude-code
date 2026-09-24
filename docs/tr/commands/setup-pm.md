---
description: Tercih ettiÃ„Å¸iniz paket yÃƒÂ¶neticisini yapÃ„Â±landÃ„Â±rÃ„Â±n (npm/pnpm/yarn/bun)
disable-model-invocation: true
---

# Paket YÃƒÂ¶neticisi Kurulumu

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


Bu proje veya global olarak tercih ettiÃ„Å¸iniz paket yÃƒÂ¶neticisini yapÃ„Â±landÃ„Â±rÃ„Â±n.

## KullanÃ„Â±m

```bash
# Mevcut paket yÃƒÂ¶neticisini tespit et
node scripts/setup-package-manager.js --detect

# Global tercihi ayarla
node scripts/setup-package-manager.js --global pnpm

# Proje tercihini ayarla
node scripts/setup-package-manager.js --project bun

# Mevcut paket yÃƒÂ¶neticilerini listele
node scripts/setup-package-manager.js --list
```

## Tespit Ãƒâ€“nceliÃ„Å¸i

Hangi paket yÃƒÂ¶neticisinin kullanÃ„Â±lacaÃ„Å¸Ã„Â±nÃ„Â± belirlerken, Ã…Å¸u sÃ„Â±ra kontrol edilir:

1. **Environment variable**: `CLAUDE_PACKAGE_MANAGER`
2. **Proje config**: `.claude/package-manager.json`
3. **package.json**: `packageManager` alanÃ„Â±
4. **Lock dosyasÃ„Â±**: package-lock.json, yarn.lock, pnpm-lock.yaml veya bun.lockb varlÃ„Â±Ã„Å¸Ã„Â±
5. **Global config**: `~/.claude/package-manager.json`
6. **Fallback**: Ã„Â°lk mevcut paket yÃƒÂ¶neticisi (pnpm > bun > yarn > npm)

## YapÃ„Â±landÃ„Â±rma DosyalarÃ„Â±

### Global YapÃ„Â±landÃ„Â±rma
```json
// ~/.claude/package-manager.json
{
  "packageManager": "pnpm"
}
```

### Proje YapÃ„Â±landÃ„Â±rmasÃ„Â±
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

## Environment Variable

TÃƒÂ¼m diÃ„Å¸er tespit yÃƒÂ¶ntemlerini geÃƒÂ§ersiz kÃ„Â±lmak iÃƒÂ§in `CLAUDE_PACKAGE_MANAGER` ayarlayÃ„Â±n:

```bash
# Windows (PowerShell)
$env:CLAUDE_PACKAGE_MANAGER = "pnpm"

# macOS/Linux
export CLAUDE_PACKAGE_MANAGER=pnpm
```

## Tespiti Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r

Mevcut paket yÃƒÂ¶neticisi tespit sonuÃƒÂ§larÃ„Â±nÃ„Â± gÃƒÂ¶rmek iÃƒÂ§in Ã…Å¸unu ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n:

```bash
node scripts/setup-package-manager.js --detect
```
