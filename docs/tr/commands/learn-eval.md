---
description: "Oturumdan yeniden kullanılabilir desenleri çıkar, kaydetmeden önce kaliteyi kendinden değerlendir ve doğru kayıt konumunu belirle (Global vs Proje)."
---

# /learn-eval - Çıkar, Değerlendir, Sonra Kaydet

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

Herhangi bir skill dosyası yazmadan önce kalite kontrolü, kayıt konumu kararı ve bilgi yerleşimi farkındalığı ile `/learn`'ü genişletir.

## Ne Çıkarılmalı

Şunları arayın:

1. **Hata Çözüm Desenleri** — kök neden + düzeltme + yeniden kullanılabilirlik
2. **Hata Ayıklama Teknikleri** — bariz olmayan adımlar, araç kombinasyonları
3. **Geçici Çözümler** — kütüphane gariplikleri, API sınırlamaları, versiyona özel düzeltmeler
4. **Projeye Özgü Desenler** — kurallar, mimari kararlar, entegrasyon desenleri

## Süreç

1. Çıkarılabilir desenler için oturumu incele
2. En değerli/yeniden kullanılabilir içgörüyü tanımla

3. **Kayıt konumunu belirle:**
   - Sor: "Bu desen farklı bir projede faydalı olur mu?"
   - **Global** (`~/.claude/skills/learned/`): 2+ projede kullanılabilir genel desenler (bash uyumluluğu, LLM API davranışı, hata ayıklama teknikleri, vb.)
   - **Proje** (mevcut projedeki `.claude/skills/learned/`): Projeye özel bilgi (belirli bir config dosyasının gariplikleri, projeye özel mimari kararlar, vb.)
   - Emin değilseniz, Global seçin (Global → Proje taşımak tersinden daha kolay)

4. Bu formatı kullanarak skill dosyasını taslak olarak hazırla:

```markdown
---
name: desen-adi
description: "130 karakterin altında"
user-invocable: false
origin: auto-extracted
---

# [Açıklayıcı Desen Adı]

**Çıkarıldı:** [Tarih]
**Bağlam:** [Bunun ne zaman geçerli olduğunun kısa açıklaması]

## Sorun
[Bunun çözdüğü sorun - spesifik olun]

## Çözüm
[Desen/teknik/geçici çözüm - kod örnekleriyle]

## Ne Zaman Kullanılır
[Tetikleyici koşullar]
```

5. **Kalite kontrolü — Kontrol listesi + Bütünsel karar**

   ### 5a. Gerekli kontrol listesi (dosyaları gerçekten okuyarak doğrula)

   Taslağı değerlendirmeden önce **tümünü** yürüt:

   - [ ] İçerik örtüşmesini kontrol etmek için anahtar kelimeyle `~/.claude/skills/` ve ilgili proje `.claude/skills/` dosyalarını Grep ile ara
   - [ ] Örtüşme için MEMORY.md'yi kontrol et (hem proje hem de global)
   - [ ] Mevcut bir skill'e eklemenin yeterli olup olmayacağını düşün
   - [ ] Bunun yeniden kullanılabilir bir desen olduğunu, tek seferlik bir düzeltme olmadığını onayla

   ### 5b. Bütünsel karar

   Kontrol listesi sonuçlarını ve taslak kalitesini sentezle, sonra şunlardan **birini** seç:

   | Karar | Anlam | Sonraki Aksiyon |
   |---------|---------|-------------|
   | **Kaydet** | Benzersiz, spesifik, iyi kapsamlı | Adım 6'ya geç |
   | **İyileştir sonra Kaydet** | Değerli ama iyileştirme gerekiyor | İyileştirmeleri listele → revize et → yeniden değerlendir (bir kez) |
   | **[X]'e Ekle** | Mevcut bir skill'e eklenmelidir | Hedef skill'i ve eklemeleri göster → Adım 6 |
   | **Düşür** | Önemsiz, gereksiz veya çok soyut | Gerekçeyi açıkla ve dur |

**Yönlendirici boyutlar** (karar verirken, puanlanmaz):

- **Spesifiklik ve Uygulanabilirlik**: Hemen kullanılabilir kod örnekleri veya komutlar içerir
- **Kapsam Uyumu**: Ad, tetikleyici koşullar ve içerik hizalanmış ve tek bir desene odaklanmış
- **Benzersizlik**: Mevcut skill'lerin kapsamadığı değer sağlar (kontrol listesi sonuçlarına göre)
- **Yeniden Kullanılabilirlik**: Gelecekteki oturumlarda gerçekçi tetikleyici senaryolar mevcut

6. **Karara özel onay akışı**

   - **İyileştir sonra Kaydet**: Gerekli iyileştirmeleri + revize edilmiş taslağı + bir yeniden değerlendirmeden sonra güncellenmiş kontrol listesi/kararı sun; revize karar **Kaydet** ise kullanıcı onayından sonra kaydet, aksi takdirde yeni kararı takip et
   - **Kaydet**: Kayıt yolunu + kontrol listesi sonuçlarını + 1 satırlık karar gerekçesini + tam taslağı sun → kullanıcı onayından sonra kaydet
   - **[X]'e Ekle**: Hedef yolu + eklemeleri (diff formatında) + kontrol listesi sonuçlarını + karar gerekçesini sun → kullanıcı onayından sonra ekle
   - **Düşür**: Sadece kontrol listesi sonuçlarını + gerekçeyi göster (onay gerekmiyor)

7. Belirlenen konuma Kaydet / Ekle

## Adım 5 için Çıktı Formatı

```
### Kontrol Listesi
- [x] skills/ grep: örtüşme yok (veya: örtüşme bulundu → detaylar)
- [x] MEMORY.md: örtüşme yok (veya: örtüşme bulundu → detaylar)
- [x] Mevcut skill'e ekleme: yeni dosya uygun (veya: [X]'e eklenmeli)
- [x] Yeniden kullanılabilirlik: onaylandı (veya: tek seferlik → Düşür)

### Karar: Kaydet / İyileştir sonra Kaydet / [X]'e Ekle / Düşür

**Gerekçe:** (Kararı açıklayan 1-2 cümle)
```

## Tasarım Gerekçesi

Bu versiyon, önceki 5 boyutlu sayısal puanlama rubriğini (Spesifiklik, Uygulanabilirlik, Kapsam Uyumu, Gereksizlik Olmama, Kapsama 1-5 arası puanlanıyor) kontrol listesi tabanlı bütünsel karar sistemiyle değiştirir. Modern frontier modeller (Opus 4.6+, Claude 5 aileleri dahil) güçlü bağlamsal yargıya sahiptir — zengin niteliksel sinyalleri sayısal skorlara zorlamak nüans kaybettirir ve yanıltıcı toplamlar üretebilir. Bütünsel yaklaşım, modelin tüm faktörleri doğal olarak tartmasına izin vererek daha doğru kaydet/düşür kararları üretirken, açık kontrol listesi kritik hiçbir kontrolün atlanmamasını sağlar.

## Notlar

- Önemsiz düzeltmeleri çıkarmayın (yazım hataları, basit sözdizimi hataları)
- Tek seferlik sorunları çıkarmayın (belirli API kesintileri, vb.)
- Gelecekteki oturumlarda zaman kazandıracak desenlere odaklanın
- Skill'leri odaklı tutun — skill başına bir desen
- Karar Ekle olduğunda, yeni dosya oluşturmak yerine mevcut skill'e ekleyin
