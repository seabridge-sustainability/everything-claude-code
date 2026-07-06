# Eval Komutu

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


Eval-odaklÃ„Â± geliÃ…Å¸tirme iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± yÃƒÂ¶net.

## KullanÃ„Â±m

`/eval [define|check|report|list] [feature-name]`

## Eval TanÃ„Â±mla

`/eval define feature-name`

Yeni bir eval tanÃ„Â±mÃ„Â± oluÃ…Å¸tur:

1. Ã…Å¾ablonla `.claude/evals/feature-name.md` oluÃ…Å¸tur:

```markdown
## EVAL: feature-name
Created: $(date)

### Capability Evals
- [ ] [Capability 1 aÃƒÂ§Ã„Â±klamasÃ„Â±]
- [ ] [Capability 2 aÃƒÂ§Ã„Â±klamasÃ„Â±]

### Regression Evals
- [ ] [Mevcut davranÃ„Â±Ã…Å¸ 1 hala ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±yor]
- [ ] [Mevcut davranÃ„Â±Ã…Å¸ 2 hala ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±yor]

### Success Criteria
- pass@3 > 90% for capability evals
- pass^3 = 100% for regression evals
```

2. KullanÃ„Â±cÃ„Â±dan belirli kriterleri doldurmasÃ„Â±nÃ„Â± iste

## Eval Kontrol Et

`/eval check feature-name`

Bir ÃƒÂ¶zellik iÃƒÂ§in eval'larÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r:

1. `.claude/evals/feature-name.md` dosyasÃ„Â±ndan eval tanÃ„Â±mÃ„Â±nÃ„Â± oku
2. Her capability eval iÃƒÂ§in:
   - Kriteri doÃ„Å¸rulamayÃ„Â± dene
   - PASS/FAIL kaydet
   - Denemeyi `.claude/evals/feature-name.log` dosyasÃ„Â±na kaydet
3. Her regression eval iÃƒÂ§in:
   - Ã„Â°lgili test'leri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
   - Baseline ile karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±r
   - PASS/FAIL kaydet
4. Mevcut durumu raporla:

```
EVAL CHECK: feature-name
========================
Capability: X/Y passing
Regression: X/Y passing
Status: IN PROGRESS / READY
```

## Eval Raporu

`/eval report feature-name`

KapsamlÃ„Â± eval raporu oluÃ…Å¸tur:

```
EVAL REPORT: feature-name
=========================
Generated: $(date)

CAPABILITY EVALS
----------------
[eval-1]: PASS (pass@1)
[eval-2]: PASS (pass@2) - required retry
[eval-3]: FAIL - see notes

REGRESSION EVALS
----------------
[test-1]: PASS
[test-2]: PASS
[test-3]: PASS

METRICS
-------
Capability pass@1: 67%
Capability pass@3: 100%
Regression pass^3: 100%

NOTES
-----
[Herhangi bir sorun, edge case veya gÃƒÂ¶zlem]

RECOMMENDATION
--------------
[SHIP / NEEDS WORK / BLOCKED]
```

## Eval'larÃ„Â± Listele

`/eval list`

TÃƒÂ¼m eval tanÃ„Â±mlarÃ„Â±nÃ„Â± gÃƒÂ¶ster:

```
EVAL DEFINITIONS
================
feature-auth      [3/5 passing] IN PROGRESS
feature-search    [5/5 passing] READY
feature-export    [0/4 passing] NOT STARTED
```

## ArgÃƒÂ¼manlar

$ARGUMENTS:
- `define <name>` - Yeni eval tanÃ„Â±mÃ„Â± oluÃ…Å¸tur
- `check <name>` - Eval'larÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r ve kontrol et
- `report <name>` - Tam rapor oluÃ…Å¸tur
- `list` - TÃƒÂ¼m eval'larÃ„Â± gÃƒÂ¶ster
- `clean` - Eski eval loglarÃ„Â±nÃ„Â± kaldÃ„Â±r (son 10 ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmayÃ„Â± tutar)
