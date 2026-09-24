# Refactor Clean

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


Her adÃ„Â±mda test doÃ„Å¸rulamasÃ„Â± ile ÃƒÂ¶lÃƒÂ¼ kodu gÃƒÂ¼venle tanÃ„Â±mla ve kaldÃ„Â±r.

## AdÃ„Â±m 1: Ãƒâ€“lÃƒÂ¼ Kodu Tespit Et

Proje tÃƒÂ¼rÃƒÂ¼ne gÃƒÂ¶re analiz araÃƒÂ§larÃ„Â±nÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r:

| AraÃƒÂ§ | Ne Bulur | Komut |
|------|--------------|---------|
| knip | KullanÃ„Â±lmayan export'lar, dosyalar, baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klar | `npx knip` |
| depcheck | KullanÃ„Â±lmayan npm baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± | `npx depcheck` |
| ts-prune | KullanÃ„Â±lmayan TypeScript export'larÃ„Â± | `npx ts-prune` |
| vulture | KullanÃ„Â±lmayan Python kodu | `vulture src/` |
| deadcode | KullanÃ„Â±lmayan Go kodu | `deadcode ./...` |
| cargo-udeps | KullanÃ„Â±lmayan Rust baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± | `cargo +nightly udeps` |

HiÃƒÂ§bir araÃƒÂ§ yoksa, sÃ„Â±fÃ„Â±r import'lu export'larÃ„Â± bulmak iÃƒÂ§in Grep kullanÃ„Â±n:
```
# Export'larÃ„Â± bul, sonra herhangi bir yerde import edilip edilmediklerini kontrol et
```

## AdÃ„Â±m 2: BulgularÃ„Â± Kategorize Et

BulgularÃ„Â± gÃƒÂ¼venlik katmanlarÃ„Â±na gÃƒÂ¶re sÃ„Â±rala:

| Katman | Ãƒâ€“rnekler | Aksiyon |
|------|----------|--------|
| **GÃƒÅ“VENLÃ„Â°** | KullanÃ„Â±lmayan yardÃ„Â±mcÃ„Â±lar, test yardÃ„Â±mcÃ„Â±larÃ„Â±, dahili fonksiyonlar | GÃƒÂ¼venle sil |
| **DÃ„Â°KKAT** | Component'ler, API route'larÃ„Â±, middleware | Dinamik import'larÃ„Â± veya harici tÃƒÂ¼keticileri olmadÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± doÃ„Å¸rula |
| **TEHLÃ„Â°KE** | Config dosyalarÃ„Â±, giriÃ…Å¸ noktalarÃ„Â±, tip tanÃ„Â±mlarÃ„Â± | Dokunmadan ÃƒÂ¶nce araÃ…Å¸tÃ„Â±r |

## AdÃ„Â±m 3: GÃƒÂ¼venli Silme DÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼

Her GÃƒÅ“VENLÃ„Â° ÃƒÂ¶Ã„Å¸e iÃƒÂ§in:

1. **Tam test paketini ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r** Ã¢â‚¬â€ Baseline oluÃ…Å¸tur (tÃƒÂ¼mÃƒÂ¼ yeÃ…Å¸il)
2. **Ãƒâ€“lÃƒÂ¼ kodu sil** Ã¢â‚¬â€ Cerrahi kaldÃ„Â±rma iÃƒÂ§in Edit aracÃ„Â±nÃ„Â± kullan
3. **Test paketini yeniden ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r** Ã¢â‚¬â€ HiÃƒÂ§bir Ã…Å¸eyin bozulmadÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± doÃ„Å¸rula
4. **Testler baÃ…Å¸arÃ„Â±sÃ„Â±z olursa** Ã¢â‚¬â€ Hemen `git checkout -- <file>` ile geri al ve bu ÃƒÂ¶Ã„Å¸eyi atla
5. **Testler geÃƒÂ§erse** Ã¢â‚¬â€ Sonraki ÃƒÂ¶Ã„Å¸eye geÃƒÂ§

## AdÃ„Â±m 4: DÃ„Â°KKAT Ãƒâ€“Ã„Å¸elerini Ã„Â°dare Et

DÃ„Â°KKAT ÃƒÂ¶Ã„Å¸elerini silmeden ÃƒÂ¶nce:
- Dinamik import'larÃ„Â± ara: `import()`, `require()`, `__import__`
- String referanslarÃ„Â± ara: route isimleri, config'lerdeki component isimleri
- Public paket API'sinden export edilip edilmediÃ„Å¸ini kontrol et
- Harici tÃƒÂ¼ketici olmadÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± doÃ„Å¸rula (yayÃ„Â±nlanmÃ„Â±Ã…Å¸sa baÃ„Å¸Ã„Â±mlÃ„Â±larÃ„Â± kontrol et)

## AdÃ„Â±m 5: DuplikatlarÃ„Â± BirleÃ…Å¸tir

Ãƒâ€“lÃƒÂ¼ kodu kaldÃ„Â±rdÃ„Â±ktan sonra Ã…Å¸unlarÃ„Â± ara:
- Neredeyse aynÃ„Â± fonksiyonlar (%80'den fazla benzer) Ã¢â‚¬â€ birinde birleÃ…Å¸tir
- Gereksiz tip tanÃ„Â±mlarÃ„Â± Ã¢â‚¬â€ birleÃ…Å¸tir
- DeÃ„Å¸er eklemeyen wrapper fonksiyonlar Ã¢â‚¬â€ inline yap
- AmacÃ„Â± olmayan re-export'lar Ã¢â‚¬â€ yÃƒÂ¶nlendirmeyi kaldÃ„Â±r

## AdÃ„Â±m 6: Ãƒâ€“zet

SonuÃƒÂ§larÃ„Â± raporla:

```
Ãƒâ€“lÃƒÂ¼ Kod TemizliÃ„Å¸i
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
Silindi:   12 kullanÃ„Â±lmayan fonksiyon
           3 kullanÃ„Â±lmayan dosya
           5 kullanÃ„Â±lmayan baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k
AtlandÃ„Â±:   2 ÃƒÂ¶Ã„Å¸e (testler baÃ…Å¸arÃ„Â±sÃ„Â±z)
KazanÃƒÂ§:    ~450 satÃ„Â±r kaldÃ„Â±rÃ„Â±ldÃ„Â±
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
TÃƒÂ¼m testler geÃƒÂ§iyor PASS:
```

## Kurallar

- **Ãƒâ€“nce testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmadan asla silmeyin**
- **Bir seferde bir silme** Ã¢â‚¬â€ Atomik deÃ„Å¸iÃ…Å¸iklikler geri almayÃ„Â± kolaylaÃ…Å¸tÃ„Â±rÃ„Â±r
- **Emin deÃ„Å¸ilseniz atlayÃ„Â±n** Ã¢â‚¬â€ ÃƒÅ“retimi bozmaktansa ÃƒÂ¶lÃƒÂ¼ kodu tutmak daha iyidir
- **Temizlerken refactor etmeyin** Ã¢â‚¬â€ EndiÃ…Å¸eleri ayÃ„Â±rÃ„Â±n (ÃƒÂ¶nce temizle, sonra refactor et)
