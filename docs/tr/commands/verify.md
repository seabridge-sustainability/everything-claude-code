# Verification Komutu

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
