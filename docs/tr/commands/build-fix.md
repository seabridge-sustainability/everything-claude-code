# Build and Fix

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


Build ve tip hatalarÃ„Â±nÃ„Â± minimal, gÃƒÂ¼venli deÃ„Å¸iÃ…Å¸ikliklerle aÃ…Å¸amalÃ„Â± olarak dÃƒÂ¼zelt.

## AdÃ„Â±m 1: Build Sistemini Tespit Et

Projenin build aracÃ„Â±nÃ„Â± tanÃ„Â±mla ve build'i ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r:

| Ã„Â°ndikatÃƒÂ¶r | Build Komutu |
|-----------|---------------|
| `build` script'i olan `package.json` | `npm run build` veya `pnpm build` |
| `tsconfig.json` (sadece TypeScript) | `npx tsc --noEmit` |
| `Cargo.toml` | `cargo build 2>&1` |
| `pom.xml` | `mvn compile` |
| `build.gradle` | `./gradlew compileJava` |
| `go.mod` | `go build ./...` |
| `pyproject.toml` | `python -m py_compile` veya `mypy .` |

## AdÃ„Â±m 2: HatalarÃ„Â± Parse Et ve Grupla

1. Build komutunu ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r ve stderr'i yakala
2. HatalarÃ„Â± dosya yoluna gÃƒÂ¶re grupla
3. BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k sÃ„Â±rasÃ„Â±na gÃƒÂ¶re sÃ„Â±rala (mantÃ„Â±k hatalarÃ„Â±ndan ÃƒÂ¶nce import/tipleri dÃƒÂ¼zelt)
4. Ã„Â°lerleme takibi iÃƒÂ§in toplam hatalarÃ„Â± say

## AdÃ„Â±m 3: DÃƒÂ¼zeltme DÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼ (Tek Seferde Bir Hata)

Her hata iÃƒÂ§in:

1. **DosyayÃ„Â± oku** Ã¢â‚¬â€ Hata baÃ„Å¸lamÃ„Â±nÃ„Â± gÃƒÂ¶rmek iÃƒÂ§in Read aracÃ„Â±nÃ„Â± kullan (hatanÃ„Â±n etrafÃ„Â±nda 10 satÃ„Â±r)
2. **TeÃ…Å¸his et** Ã¢â‚¬â€ KÃƒÂ¶k nedeni tanÃ„Â±mla (eksik import, yanlÃ„Â±Ã…Å¸ tip, sÃƒÂ¶zdizimi hatasÃ„Â±)
3. **Minimal dÃƒÂ¼zelt** Ã¢â‚¬â€ HatayÃ„Â± ÃƒÂ§ÃƒÂ¶zen en kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k deÃ„Å¸iÃ…Å¸iklik iÃƒÂ§in Edit aracÃ„Â±nÃ„Â± kullan
4. **Build'i yeniden ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r** Ã¢â‚¬â€ HatanÃ„Â±n gittiÃ„Å¸ini ve yeni hata oluÃ…Å¸madÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± doÃ„Å¸rula
5. **Sonrakine geÃƒÂ§** Ã¢â‚¬â€ Kalan hatalarla devam et

## AdÃ„Â±m 4: Koruma Ãƒâ€“nlemleri

Ã…Å¾u durumlarda dur ve kullanÃ„Â±cÃ„Â±ya sor:
- Bir dÃƒÂ¼zeltme **ÃƒÂ§ÃƒÂ¶zdÃƒÂ¼Ã„Å¸ÃƒÂ¼nden daha fazla hata oluÃ…Å¸turuyorsa**
- **AynÃ„Â± hata 3 denemeden sonra devam ediyorsa** (muhtemelen daha derin bir sorun)
- DÃƒÂ¼zeltme **mimari deÃ„Å¸iÃ…Å¸iklikler gerektiriyorsa** (sadece build dÃƒÂ¼zeltmesi deÃ„Å¸il)
- Build hatalarÃ„Â± **eksik baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klardan** kaynaklanÃ„Â±yorsa (`npm install`, `cargo add`, vb. gerekli)

## AdÃ„Â±m 5: Ãƒâ€“zet

SonuÃƒÂ§larÃ„Â± gÃƒÂ¶ster:
- DÃƒÂ¼zeltilen hatalar (dosya yollarÃ„Â±yla)
- Kalan hatalar (varsa)
- OluÃ…Å¸turulan yeni hatalar (sÃ„Â±fÃ„Â±r olmalÃ„Â±)
- Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼lmemiÃ…Å¸ sorunlar iÃƒÂ§in ÃƒÂ¶nerilen sonraki adÃ„Â±mlar

## Kurtarma Stratejileri

| Durum | Aksiyon |
|-----------|--------|
| Eksik modÃƒÂ¼l/import | Paketin yÃƒÂ¼klÃƒÂ¼ olup olmadÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± kontrol et; install komutu ÃƒÂ¶ner |
| Tip uyuÃ…Å¸mazlÃ„Â±Ã„Å¸Ã„Â± | Her iki tip tanÃ„Â±mÃ„Â±nÃ„Â± oku; daha dar olanÃ„Â± dÃƒÂ¼zelt |
| DÃƒÂ¶ngÃƒÂ¼sel baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k | Import grafiÃ„Å¸i ile dÃƒÂ¶ngÃƒÂ¼yÃƒÂ¼ tanÃ„Â±mla; extraction ÃƒÂ¶ner |
| Versiyon ÃƒÂ§akÃ„Â±Ã…Å¸masÃ„Â± | Versiyon kÃ„Â±sÃ„Â±tlamalarÃ„Â± iÃƒÂ§in `package.json` / `Cargo.toml` kontrol et |
| Build aracÃ„Â± yanlÃ„Â±Ã…Å¸ yapÃ„Â±landÃ„Â±rmasÃ„Â± | Config dosyasÃ„Â±nÃ„Â± oku; ÃƒÂ§alÃ„Â±Ã…Å¸an varsayÃ„Â±lanlarla karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±r |

GÃƒÂ¼venlik iÃƒÂ§in bir seferde bir hatayÃ„Â± dÃƒÂ¼zelt. Refactoring yerine minimal diff'leri tercih et.
