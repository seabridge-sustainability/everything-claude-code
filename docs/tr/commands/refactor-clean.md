# Refactor Clean

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
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
