# Eval Komutu

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
