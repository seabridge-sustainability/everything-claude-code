---
description: Multi-agent iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â± iÃƒÂ§in sÃ„Â±ralÃ„Â± ve tmux/worktree orkestrasyon rehberi.
---

# Orchestrate Komutu

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


KarmaÃ…Å¸Ã„Â±k gÃƒÂ¶revler iÃƒÂ§in sÃ„Â±ralÃ„Â± agent iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±.

## KullanÃ„Â±m

`/orchestrate [workflow-type] [task-description]`

## Workflow Tipleri

### feature
Tam ÃƒÂ¶zellik implementasyon iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±:
```
planner -> tdd-guide -> code-reviewer -> security-reviewer
```

### bugfix
Bug araÃ…Å¸tÃ„Â±rma ve dÃƒÂ¼zeltme iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±:
```
planner -> tdd-guide -> code-reviewer
```

### refactor
GÃƒÂ¼venli refactoring iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±:
```
architect -> code-reviewer -> tdd-guide
```

### security
GÃƒÂ¼venlik odaklÃ„Â± review:
```
security-reviewer -> code-reviewer -> architect
```

## Execution Pattern

Ã„Â°Ã…Å¸ akÃ„Â±Ã…Å¸Ã„Â±ndaki her agent iÃƒÂ§in:

1. **Agent'Ã„Â± ÃƒÂ§aÃ„Å¸Ã„Â±r** ÃƒÂ¶nceki agent'tan gelen context ile
2. **Ãƒâ€¡Ã„Â±ktÃ„Â±yÃ„Â± topla** yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ handoff dokÃƒÂ¼manÃ„Â± olarak
3. **Sonraki agent'a geÃƒÂ§ir** zincirde
4. **SonuÃƒÂ§larÃ„Â± topla** nihai rapora

## Handoff DokÃƒÂ¼man FormatÃ„Â±

Agent'lar arasÃ„Â±nda, handoff dokÃƒÂ¼manÃ„Â± oluÃ…Å¸tur:

```markdown
## HANDOFF: [previous-agent] -> [next-agent]

### Context
[YapÃ„Â±lanlarÃ„Â±n ÃƒÂ¶zeti]

### Findings
[Anahtar keÃ…Å¸ifler veya kararlar]

### Files Modified
[Dokunulan dosyalarÃ„Â±n listesi]

### Open Questions
[Sonraki agent iÃƒÂ§in ÃƒÂ§ÃƒÂ¶zÃƒÂ¼lmemiÃ…Å¸ ÃƒÂ¶Ã„Å¸eler]

### Recommendations
[Ãƒâ€“nerilen sonraki adÃ„Â±mlar]
```

## Ãƒâ€“rnek: Feature Workflow

```
/orchestrate feature "Add user authentication"
```

Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±r:

1. **Planner Agent**
   - Requirement'larÃ„Â± analiz eder
   - Implementation planÃ„Â± oluÃ…Å¸turur
   - BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± tanÃ„Â±mlar
   - Ãƒâ€¡Ã„Â±ktÃ„Â±: `HANDOFF: planner -> tdd-guide`

2. **TDD Guide Agent**
   - Planner handoff'unu okur
   - Ãƒâ€“nce test'leri yazar
   - Test'leri geÃƒÂ§irmek iÃƒÂ§in implement eder
   - Ãƒâ€¡Ã„Â±ktÃ„Â±: `HANDOFF: tdd-guide -> code-reviewer`

3. **Code Reviewer Agent**
   - Implementation'Ã„Â± gÃƒÂ¶zden geÃƒÂ§irir
   - SorunlarÃ„Â± kontrol eder
   - Ã„Â°yileÃ…Å¸tirmeler ÃƒÂ¶nerir
   - Ãƒâ€¡Ã„Â±ktÃ„Â±: `HANDOFF: code-reviewer -> security-reviewer`

4. **Security Reviewer Agent**
   - GÃƒÂ¼venlik denetimi
   - GÃƒÂ¼venlik aÃƒÂ§Ã„Â±Ã„Å¸Ã„Â± kontrolÃƒÂ¼
   - Nihai onay
   - Ãƒâ€¡Ã„Â±ktÃ„Â±: Final Report

## Nihai Rapor FormatÃ„Â±

```
ORCHESTRATION REPORT
====================
Workflow: feature
Task: Add user authentication
Agents: planner -> tdd-guide -> code-reviewer -> security-reviewer

SUMMARY
-------
[Bir paragraf ÃƒÂ¶zet]

AGENT OUTPUTS
-------------
Planner: [ÃƒÂ¶zet]
TDD Guide: [ÃƒÂ¶zet]
Code Reviewer: [ÃƒÂ¶zet]
Security Reviewer: [ÃƒÂ¶zet]

FILES CHANGED
-------------
[DeÃ„Å¸iÃ…Å¸tirilen tÃƒÂ¼m dosyalarÃ„Â±n listesi]

TEST RESULTS
------------
[Test geÃƒÂ§ti/baÃ…Å¸arÃ„Â±sÃ„Â±z ÃƒÂ¶zeti]

SECURITY STATUS
---------------
[GÃƒÂ¼venlik bulgularÃ„Â±]

RECOMMENDATION
--------------
[SHIP / NEEDS WORK / BLOCKED]
```

## Parallel Execution

BaÃ„Å¸Ã„Â±msÃ„Â±z kontroller iÃƒÂ§in, agent'larÃ„Â± parallel ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r:

```markdown
### Parallel Phase
EÃ…Å¸ zamanlÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r:
- code-reviewer (kalite)
- security-reviewer (gÃƒÂ¼venlik)
- architect (tasarÃ„Â±m)

### Merge Results
Ãƒâ€¡Ã„Â±ktÃ„Â±larÃ„Â± tek rapora birleÃ…Å¸tir
```

AyrÃ„Â± git worktree'leri olan harici tmux-pane worker'larÃ„Â± iÃƒÂ§in, `node scripts/orchestrate-worktrees.js plan.json --execute` kullan. Built-in orkestrasyon pattern'i in-process kalÃ„Â±r; helper uzun sÃƒÂ¼ren veya cross-harness session'lar iÃƒÂ§in.

Worker'larÃ„Â±n ana checkout'tan kirli veya izlenmeyen yerel dosyalarÃ„Â± gÃƒÂ¶rmesi gerektiÃ„Å¸inde, plan dosyasÃ„Â±na `seedPaths` ekle. ECC sadece seÃƒÂ§ilen bu yollarÃ„Â± `git worktree add`'den sonra her worker worktree'sine overlay eder; bu branch'Ã„Â± izole tutarken devam eden yerel script'leri, planlarÃ„Â± veya dokÃƒÂ¼manlarÃ„Â± gÃƒÂ¶sterir.

```json
{
  "sessionName": "workflow-e2e",
  "seedPaths": [
    "scripts/orchestrate-worktrees.js",
    "scripts/lib/tmux-worktree-orchestrator.js",
    ".claude/plan/workflow-e2e-test.json"
  ],
  "workers": [
    { "name": "docs", "task": "Orkestrasyon dokÃƒÂ¼manlarÃ„Â±nÃ„Â± gÃƒÂ¼ncelle." }
  ]
}
```

CanlÃ„Â± bir tmux/worktree session iÃƒÂ§in kontrol dÃƒÂ¼zlemi snapshot'Ã„Â± dÃ„Â±Ã…Å¸a aktarmak iÃƒÂ§in Ã…Å¸unu ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r:

```bash
node scripts/orchestration-status.js .claude/plan/workflow-visual-proof.json
```

Snapshot session aktivitesi, tmux pane metadata'sÃ„Â±, worker state'leri, hedefleri, seed overlay'leri ve son handoff ÃƒÂ¶zetlerini JSON formatÃ„Â±nda iÃƒÂ§erir.

## OperatÃƒÂ¶r Command-Center Handoff

Ã„Â°Ã…Å¸ akÃ„Â±Ã…Å¸Ã„Â± birden fazla session, worktree veya tmux pane'e yayÃ„Â±ldÃ„Â±Ã„Å¸Ã„Â±nda, nihai handoff'a bir kontrol dÃƒÂ¼zlemi bloÃ„Å¸u ekle:

```markdown
CONTROL PLANE
-------------
Sessions:
- aktif session ID veya alias
- her aktif worker iÃƒÂ§in branch + worktree yolu
- uygulanabilir durumlarda tmux pane veya detached session adÃ„Â±

Diffs:
- git status ÃƒÂ¶zeti
- dokunulan dosyalar iÃƒÂ§in git diff --stat
- merge/ÃƒÂ§akÃ„Â±Ã…Å¸ma risk notlarÃ„Â±

Approvals:
- bekleyen kullanÃ„Â±cÃ„Â± onaylarÃ„Â±
- onay bekleyen bloke adÃ„Â±mlar

Telemetry:
- son aktivite timestamp'i veya idle sinyali
- tahmini token veya cost drift
- hook'lar veya reviewer'lar tarafÃ„Â±ndan bildirilen policy olaylarÃ„Â±
```

Bu planner, implementer, reviewer ve loop worker'larÃ„Â±nÃ„Â± operatÃƒÂ¶r yÃƒÂ¼zeyinden anlaÃ…Å¸Ã„Â±lÃ„Â±r tutar.

## ArgÃƒÂ¼manlar

$ARGUMENTS:
- `feature <description>` - Tam ÃƒÂ¶zellik iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±
- `bugfix <description>` - Bug dÃƒÂ¼zeltme iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±
- `refactor <description>` - Refactoring iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±
- `security <description>` - GÃƒÂ¼venlik review iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±
- `custom <agents> <description>` - Ãƒâ€“zel agent dizisi

## Ãƒâ€“zel Workflow Ãƒâ€“rneÃ„Å¸i

```
/orchestrate custom "architect,tdd-guide,code-reviewer" "Caching katmanÃ„Â±nÃ„Â± yeniden tasarla"
```

## Ã„Â°puÃƒÂ§larÃ„Â±

1. **KarmaÃ…Å¸Ã„Â±k ÃƒÂ¶zellikler iÃƒÂ§in planner ile baÃ…Å¸la**
2. **Merge'den ÃƒÂ¶nce her zaman code-reviewer dahil et**
3. **Auth/ÃƒÂ¶deme/PII iÃƒÂ§in security-reviewer kullan**
4. **Handoff'larÃ„Â± kÃ„Â±sa tut** - sonraki agent'Ã„Â±n ihtiyaÃƒÂ§ duyduÃ„Å¸u Ã…Å¸eye odaklan
5. **Gerekirse agent'lar arasÃ„Â±nda doÃ„Å¸rulama ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r**
