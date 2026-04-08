# Verification Komutu

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Mevcut kod tabanÃ„Â± durumu ÃƒÂ¼zerinde kapsamlÃ„Â± doÃ„Å¸rulama ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r.

## Talimatlar

DoÃ„Å¸rulamayÃ„Â± tam olarak bu sÃ„Â±rayla yÃƒÂ¼rÃƒÂ¼t:

1. **Build KontrolÃƒÂ¼**
   - Bu proje iÃƒÂ§in build komutunu ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
   - BaÃ…Å¸arÃ„Â±sÃ„Â±z olursa, hatalarÃ„Â± raporla ve DUR

2. **Tip KontrolÃƒÂ¼**
   - TypeScript/tip denetleyicisini ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
   - TÃƒÂ¼m hatalarÃ„Â± dosya:satÃ„Â±r ile raporla

3. **Lint KontrolÃƒÂ¼**
   - Linter'Ã„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
   - UyarÃ„Â±larÃ„Â± ve hatalarÃ„Â± raporla

4. **Test Paketi**
   - TÃƒÂ¼m testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
   - GeÃƒÂ§ti/baÃ…Å¸arÃ„Â±sÃ„Â±z sayÃ„Â±sÃ„Â±nÃ„Â± raporla
   - Kapsama yÃƒÂ¼zdesini raporla

5. **Console.log Denetimi**
   - Kaynak dosyalarda console.log ara
   - KonumlarÃ„Â± raporla

6. **Git Durumu**
   - Commit edilmemiÃ…Å¸ deÃ„Å¸iÃ…Å¸iklikleri gÃƒÂ¶ster
   - Son commit'ten beri deÃ„Å¸iÃ…Å¸tirilen dosyalarÃ„Â± gÃƒÂ¶ster

## Ãƒâ€¡Ã„Â±ktÃ„Â±

Ãƒâ€“zet bir doÃ„Å¸rulama raporu ÃƒÂ¼ret:

```
DOÃ„Å¾RULAMA: [GEÃƒâ€¡TÃ„Â°/BAÃ…Å¾ARISIZ]

Build:    [TAMAM/BAÃ…Å¾ARISIZ]
Tipler:   [TAMAM/X hata]
Lint:     [TAMAM/X sorun]
Testler:  [X/Y geÃƒÂ§ti, Z% kapsama]
Gizli:    [TAMAM/X bulundu]
Loglar:   [TAMAM/X console.log]

PR iÃƒÂ§in HazÃ„Â±r: [EVET/HAYIR]
```

Herhangi bir kritik sorun varsa, dÃƒÂ¼zeltme ÃƒÂ¶nerileriyle listele.

## ArgÃƒÂ¼manlar

$ARGUMENTS Ã…Å¸unlar olabilir:
- `quick` - Sadece build + tipler
- `full` - TÃƒÂ¼m kontroller (varsayÃ„Â±lan)
- `pre-commit` - Commit'ler iÃƒÂ§in ilgili kontroller
- `pre-pr` - GÃƒÂ¼venlik taramasÃ„Â± artÃ„Â± tam kontroller
