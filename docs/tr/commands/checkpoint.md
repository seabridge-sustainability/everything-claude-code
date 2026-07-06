# Checkpoint Komutu

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
