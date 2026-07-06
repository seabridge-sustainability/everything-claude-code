---
description: Multi-agent iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â± iÃƒÂ§in sÃ„Â±ralÃ„Â± ve tmux/worktree orkestrasyon rehberi.
---

# Orchestrate Komutu

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
