---
name: verification-loop
description: "Claude Code oturumlarÃ„Â± iÃƒÂ§in kapsamlÃ„Â± doÃ„Å¸rulama sistemi."
origin: ECC
---

# Verification Loop Skill

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Claude Code oturumlarÃ„Â± iÃƒÂ§in kapsamlÃ„Â± doÃ„Å¸rulama sistemi.

## Ne Zaman KullanÃ„Â±lÃ„Â±r

Bu skill'i Ã…Å¸u durumlarda ÃƒÂ§aÃ„Å¸Ã„Â±r:
- Bir ÃƒÂ¶zellik veya ÃƒÂ¶nemli kod deÃ„Å¸iÃ…Å¸ikliÃ„Å¸i tamamladÃ„Â±ktan sonra
- PR oluÃ…Å¸turmadan ÃƒÂ¶nce
- Kalite kapÃ„Â±larÃ„Â±nÃ„Â±n geÃƒÂ§tiÃ„Å¸inden emin olmak istediÃ„Å¸inde
- Refactoring sonrasÃ„Â±nda

## DoÃ„Å¸rulama FazlarÃ„Â±

### Faz 1: Build DoÃ„Å¸rulamasÃ„Â±
```bash
# Projenin build olup olmadÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± kontrol et
npm run build 2>&1 | tail -20
# VEYA
pnpm build 2>&1 | tail -20
```

Build baÃ…Å¸arÃ„Â±sÃ„Â±z olursa, devam etmeden ÃƒÂ¶nce DUR ve dÃƒÂ¼zelt.

### Faz 2: Tip KontrolÃƒÂ¼
```bash
# TypeScript projeleri
npx tsc --noEmit 2>&1 | head -30

# Python projeleri
pyright . 2>&1 | head -30
```

TÃƒÂ¼m tip hatalarÃ„Â±nÃ„Â± raporla. Devam etmeden ÃƒÂ¶nce kritik olanlarÃ„Â± dÃƒÂ¼zelt.

### Faz 3: Lint KontrolÃƒÂ¼
```bash
# JavaScript/TypeScript
npm run lint 2>&1 | head -30

# Python
ruff check . 2>&1 | head -30
```

### Faz 4: Test Paketi
```bash
# Testleri coverage ile ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
npm run test -- --coverage 2>&1 | tail -50

# Coverage eÃ…Å¸iÃ„Å¸ini kontrol et
# Hedef: minimum %80
```

Rapor:
- Toplam testler: X
- GeÃƒÂ§ti: X
- BaÃ…Å¸arÃ„Â±sÃ„Â±z: X
- Coverage: %X

### Faz 5: GÃƒÂ¼venlik TaramasÃ„Â±
```bash
# Secret'larÃ„Â± kontrol et
grep -rn "sk-" --include="*.ts" --include="*.js" . 2>/dev/null | head -10
grep -rn "api_key" --include="*.ts" --include="*.js" . 2>/dev/null | head -10

# console.log kontrol et
grep -rn "console.log" --include="*.ts" --include="*.tsx" src/ 2>/dev/null | head -10
```

### Faz 6: Diff Ã„Â°ncelemesi
```bash
# Neyin deÃ„Å¸iÃ…Å¸tiÃ„Å¸ini gÃƒÂ¶ster
git diff --stat
git diff HEAD~1 --name-only
```

Her deÃ„Å¸iÃ…Å¸en dosyayÃ„Â± Ã…Å¸unlar iÃƒÂ§in incele:
- Ã„Â°stenmeyen deÃ„Å¸iÃ…Å¸iklikler
- Eksik hata iÃ…Å¸leme
- Potansiyel edge case'ler

## Ãƒâ€¡Ã„Â±ktÃ„Â± FormatÃ„Â±

TÃƒÂ¼m fazlarÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rdÃ„Â±ktan sonra, bir doÃ„Å¸rulama raporu ÃƒÂ¼ret:

```
DOÃ„Å¾RULAMA RAPORU
==================

Build:     [PASS/FAIL]
Tipler:    [PASS/FAIL] (X hata)
Lint:      [PASS/FAIL] (X uyarÃ„Â±)
Testler:   [PASS/FAIL] (X/Y geÃƒÂ§ti, %Z coverage)
GÃƒÂ¼venlik:  [PASS/FAIL] (X sorun)
Diff:      [X dosya deÃ„Å¸iÃ…Å¸ti]

Genel:     PR iÃƒÂ§in [HAZIR/HAZIR DEÃ„Å¾Ã„Â°L]

DÃƒÂ¼zeltilmesi Gereken Sorunlar:
1. ...
2. ...
```

## SÃƒÂ¼rekli Mod

Uzun oturumlar iÃƒÂ§in, her 15 dakikada bir veya major deÃ„Å¸iÃ…Å¸ikliklerden sonra doÃ„Å¸rulama ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r:

```markdown
Mental kontrol noktasÃ„Â± belirle:
- Her fonksiyonu tamamladÃ„Â±ktan sonra
- Bir component'i bitirdikten sonra
- Sonraki gÃƒÂ¶reve geÃƒÂ§meden ÃƒÂ¶nce

Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±r: /verify
```

## Hook'larla Entegrasyon

Bu skill PostToolUse hook'larÃ„Â±nÃ„Â± tamamlar ancak daha derin doÃ„Å¸rulama saÃ„Å¸lar.
Hook'lar sorunlarÃ„Â± anÃ„Â±nda yakalar; bu skill kapsamlÃ„Â± inceleme saÃ„Å¸lar.
