# Checkpoint Komutu

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


Ã„Â°Ã…Å¸ akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â±zda bir checkpoint oluÃ…Å¸turun veya doÃ„Å¸rulayÃ„Â±n.

## KullanÃ„Â±m

`/checkpoint [create|verify|list|clear] [isim]`

## Checkpoint OluÃ…Å¸tur

Checkpoint oluÃ…Å¸tururken:

1. Mevcut durumun temiz olduÃ„Å¸undan emin olmak iÃƒÂ§in `/verify quick` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
2. Checkpoint adÃ„Â±yla bir git stash veya commit oluÃ…Å¸tur
3. Checkpoint'i `.claude/checkpoints.log`'a kaydet:

```bash
echo "$(date +%Y-%m-%d-%H:%M) | $CHECKPOINT_NAME | $(git rev-parse --short HEAD)" >> .claude/checkpoints.log
```

4. Checkpoint oluÃ…Å¸turulduÃ„Å¸unu raporla

## Checkpoint'i DoÃ„Å¸rula

Bir checkpoint'e karÃ…Å¸Ã„Â± doÃ„Å¸rularken:

1. Log'dan checkpoint'i oku
2. Mevcut durumu checkpoint ile karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±r:
   - Checkpoint'ten sonra eklenen dosyalar
   - Checkpoint'ten sonra deÃ„Å¸iÃ…Å¸tirilen dosyalar
   - Ã…Å¾imdiki vs o zamanki test baÃ…Å¸arÃ„Â± oranÃ„Â±
   - Ã…Å¾imdiki vs o zamanki kapsama oranÃ„Â±

3. Raporla:
```
CHECKPOINT KARÃ…Å¾ILAÃ…Å¾TIRMASI: $NAME
============================
DeÃ„Å¸iÃ…Å¸en dosyalar: X
Testler: +Y geÃƒÂ§ti / -Z baÃ…Å¸arÃ„Â±sÃ„Â±z
Kapsama: +X% / -Y%
Build: [GEÃƒâ€¡TÃ„Â°/BAÃ…Å¾ARISIZ]
```

## Checkpoint'leri Listele

TÃƒÂ¼m checkpoint'leri Ã…Å¸unlarla gÃƒÂ¶ster:
- Ad
- Zaman damgasÃ„Â±
- Git SHA
- Durum (mevcut, geride, ileride)

## Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

Tipik checkpoint akÃ„Â±Ã…Å¸Ã„Â±:

```
[BaÃ…Å¸langÃ„Â±ÃƒÂ§] --> /checkpoint create "feature-start"
   |
[Uygula] --> /checkpoint create "core-done"
   |
[Test] --> /checkpoint verify "core-done"
   |
[Refactor] --> /checkpoint create "refactor-done"
   |
[PR] --> /checkpoint verify "feature-start"
```

## ArgÃƒÂ¼manlar

$ARGUMENTS:
- `create <isim>` - Ã„Â°simlendirilmiÃ…Å¸ checkpoint oluÃ…Å¸tur
- `verify <isim>` - Ã„Â°simlendirilmiÃ…Å¸ checkpoint'e karÃ…Å¸Ã„Â± doÃ„Å¸rula
- `list` - TÃƒÂ¼m checkpoint'leri gÃƒÂ¶ster
- `clear` - Eski checkpoint'leri kaldÃ„Â±r (son 5'i tutar)
