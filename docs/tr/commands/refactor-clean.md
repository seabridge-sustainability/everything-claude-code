# Refactor Clean

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
