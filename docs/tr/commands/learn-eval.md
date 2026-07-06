---
description: "Oturumdan yeniden kullanÃ„Â±labilir desenleri ÃƒÂ§Ã„Â±kar, kaydetmeden ÃƒÂ¶nce kaliteyi kendinden deÃ„Å¸erlendir ve doÃ„Å¸ru kayÃ„Â±t konumunu belirle (Global vs Proje)."
---

# /learn-eval - Ãƒâ€¡Ã„Â±kar, DeÃ„Å¸erlendir, Sonra Kaydet

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


Herhangi bir skill dosyasÃ„Â± yazmadan ÃƒÂ¶nce kalite kontrolÃƒÂ¼, kayÃ„Â±t konumu kararÃ„Â± ve bilgi yerleÃ…Å¸imi farkÃ„Â±ndalÃ„Â±Ã„Å¸Ã„Â± ile `/learn`'ÃƒÂ¼ geniÃ…Å¸letir.

## Ne Ãƒâ€¡Ã„Â±karÃ„Â±lmalÃ„Â±

Ã…Å¾unlarÃ„Â± arayÃ„Â±n:

1. **Hata Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼m Desenleri** Ã¢â‚¬â€ kÃƒÂ¶k neden + dÃƒÂ¼zeltme + yeniden kullanÃ„Â±labilirlik
2. **Hata AyÃ„Â±klama Teknikleri** Ã¢â‚¬â€ bariz olmayan adÃ„Â±mlar, araÃƒÂ§ kombinasyonlarÃ„Â±
3. **GeÃƒÂ§ici Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼mler** Ã¢â‚¬â€ kÃƒÂ¼tÃƒÂ¼phane gariplikleri, API sÃ„Â±nÃ„Â±rlamalarÃ„Â±, versiyona ÃƒÂ¶zel dÃƒÂ¼zeltmeler
4. **Projeye Ãƒâ€“zgÃƒÂ¼ Desenler** Ã¢â‚¬â€ kurallar, mimari kararlar, entegrasyon desenleri

## SÃƒÂ¼reÃƒÂ§

1. Ãƒâ€¡Ã„Â±karÃ„Â±labilir desenler iÃƒÂ§in oturumu incele
2. En deÃ„Å¸erli/yeniden kullanÃ„Â±labilir iÃƒÂ§gÃƒÂ¶rÃƒÂ¼yÃƒÂ¼ tanÃ„Â±mla

3. **KayÃ„Â±t konumunu belirle:**
   - Sor: "Bu desen farklÃ„Â± bir projede faydalÃ„Â± olur mu?"
   - **Global** (`~/.claude/skills/learned/`): 2+ projede kullanÃ„Â±labilir genel desenler (bash uyumluluÃ„Å¸u, LLM API davranÃ„Â±Ã…Å¸Ã„Â±, hata ayÃ„Â±klama teknikleri, vb.)
   - **Proje** (mevcut projedeki `.claude/skills/learned/`): Projeye ÃƒÂ¶zel bilgi (belirli bir config dosyasÃ„Â±nÃ„Â±n gariplikleri, projeye ÃƒÂ¶zel mimari kararlar, vb.)
   - Emin deÃ„Å¸ilseniz, Global seÃƒÂ§in (Global Ã¢â€ â€™ Proje taÃ…Å¸Ã„Â±mak tersinden daha kolay)

4. Bu formatÃ„Â± kullanarak skill dosyasÃ„Â±nÃ„Â± taslak olarak hazÃ„Â±rla:

```markdown
---
name: desen-adi
description: "130 karakterin altÃ„Â±nda"
user-invocable: false
origin: auto-extracted
---

# [AÃƒÂ§Ã„Â±klayÃ„Â±cÃ„Â± Desen AdÃ„Â±]

**Ãƒâ€¡Ã„Â±karÃ„Â±ldÃ„Â±:** [Tarih]
**BaÃ„Å¸lam:** [Bunun ne zaman geÃƒÂ§erli olduÃ„Å¸unun kÃ„Â±sa aÃƒÂ§Ã„Â±klamasÃ„Â±]

## Sorun
[Bunun ÃƒÂ§ÃƒÂ¶zdÃƒÂ¼Ã„Å¸ÃƒÂ¼ sorun - spesifik olun]

## Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼m
[Desen/teknik/geÃƒÂ§ici ÃƒÂ§ÃƒÂ¶zÃƒÂ¼m - kod ÃƒÂ¶rnekleriyle]

## Ne Zaman KullanÃ„Â±lÃ„Â±r
[Tetikleyici koÃ…Å¸ullar]
```

5. **Kalite kontrolÃƒÂ¼ Ã¢â‚¬â€ Kontrol listesi + BÃƒÂ¼tÃƒÂ¼nsel karar**

   ### 5a. Gerekli kontrol listesi (dosyalarÃ„Â± gerÃƒÂ§ekten okuyarak doÃ„Å¸rula)

   TaslaÃ„Å¸Ã„Â± deÃ„Å¸erlendirmeden ÃƒÂ¶nce **tÃƒÂ¼mÃƒÂ¼nÃƒÂ¼** yÃƒÂ¼rÃƒÂ¼t:

   - [ ] Ã„Â°ÃƒÂ§erik ÃƒÂ¶rtÃƒÂ¼Ã…Å¸mesini kontrol etmek iÃƒÂ§in anahtar kelimeyle `~/.claude/skills/` ve ilgili proje `.claude/skills/` dosyalarÃ„Â±nÃ„Â± Grep ile ara
   - [ ] Ãƒâ€“rtÃƒÂ¼Ã…Å¸me iÃƒÂ§in MEMORY.md'yi kontrol et (hem proje hem de global)
   - [ ] Mevcut bir skill'e eklemenin yeterli olup olmayacaÃ„Å¸Ã„Â±nÃ„Â± dÃƒÂ¼Ã…Å¸ÃƒÂ¼n
   - [ ] Bunun yeniden kullanÃ„Â±labilir bir desen olduÃ„Å¸unu, tek seferlik bir dÃƒÂ¼zeltme olmadÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± onayla

   ### 5b. BÃƒÂ¼tÃƒÂ¼nsel karar

   Kontrol listesi sonuÃƒÂ§larÃ„Â±nÃ„Â± ve taslak kalitesini sentezle, sonra Ã…Å¸unlardan **birini** seÃƒÂ§:

   | Karar | Anlam | Sonraki Aksiyon |
   |---------|---------|-------------|
   | **Kaydet** | Benzersiz, spesifik, iyi kapsamlÃ„Â± | AdÃ„Â±m 6'ya geÃƒÂ§ |
   | **Ã„Â°yileÃ…Å¸tir sonra Kaydet** | DeÃ„Å¸erli ama iyileÃ…Å¸tirme gerekiyor | Ã„Â°yileÃ…Å¸tirmeleri listele Ã¢â€ â€™ revize et Ã¢â€ â€™ yeniden deÃ„Å¸erlendir (bir kez) |
   | **[X]'e Ekle** | Mevcut bir skill'e eklenmelidir | Hedef skill'i ve eklemeleri gÃƒÂ¶ster Ã¢â€ â€™ AdÃ„Â±m 6 |
   | **DÃƒÂ¼Ã…Å¸ÃƒÂ¼r** | Ãƒâ€“nemsiz, gereksiz veya ÃƒÂ§ok soyut | GerekÃƒÂ§eyi aÃƒÂ§Ã„Â±kla ve dur |

**YÃƒÂ¶nlendirici boyutlar** (karar verirken, puanlanmaz):

   - **Spesifiklik ve Uygulanabilirlik**: Hemen kullanÃ„Â±labilir kod ÃƒÂ¶rnekleri veya komutlar iÃƒÂ§erir
   - **Kapsam Uyumu**: Ad, tetikleyici koÃ…Å¸ullar ve iÃƒÂ§erik hizalanmÃ„Â±Ã…Å¸ ve tek bir desene odaklanmÃ„Â±Ã…Å¸
   - **Benzersizlik**: Mevcut skill'lerin kapsamadÃ„Â±Ã„Å¸Ã„Â± deÃ„Å¸er saÃ„Å¸lar (kontrol listesi sonuÃƒÂ§larÃ„Â±na gÃƒÂ¶re)
   - **Yeniden KullanÃ„Â±labilirlik**: Gelecekteki oturumlarda gerÃƒÂ§ekÃƒÂ§i tetikleyici senaryolar mevcut

6. **Karara ÃƒÂ¶zel onay akÃ„Â±Ã…Å¸Ã„Â±**

   - **Ã„Â°yileÃ…Å¸tir sonra Kaydet**: Gerekli iyileÃ…Å¸tirmeleri + revize edilmiÃ…Å¸ taslaÃ„Å¸Ã„Â± + bir yeniden deÃ„Å¸erlendirmeden sonra gÃƒÂ¼ncellenmiÃ…Å¸ kontrol listesi/kararÃ„Â± sun; revize karar **Kaydet** ise kullanÃ„Â±cÃ„Â± onayÃ„Â±ndan sonra kaydet, aksi takdirde yeni kararÃ„Â± takip et
   - **Kaydet**: KayÃ„Â±t yolunu + kontrol listesi sonuÃƒÂ§larÃ„Â±nÃ„Â± + 1 satÃ„Â±rlÃ„Â±k karar gerekÃƒÂ§esini + tam taslaÃ„Å¸Ã„Â± sun Ã¢â€ â€™ kullanÃ„Â±cÃ„Â± onayÃ„Â±ndan sonra kaydet
   - **[X]'e Ekle**: Hedef yolu + eklemeleri (diff formatÃ„Â±nda) + kontrol listesi sonuÃƒÂ§larÃ„Â±nÃ„Â± + karar gerekÃƒÂ§esini sun Ã¢â€ â€™ kullanÃ„Â±cÃ„Â± onayÃ„Â±ndan sonra ekle
   - **DÃƒÂ¼Ã…Å¸ÃƒÂ¼r**: Sadece kontrol listesi sonuÃƒÂ§larÃ„Â±nÃ„Â± + gerekÃƒÂ§eyi gÃƒÂ¶ster (onay gerekmiyor)

7. Belirlenen konuma Kaydet / Ekle

## AdÃ„Â±m 5 iÃƒÂ§in Ãƒâ€¡Ã„Â±ktÃ„Â± FormatÃ„Â±

```
### Kontrol Listesi
- [x] skills/ grep: ÃƒÂ¶rtÃƒÂ¼Ã…Å¸me yok (veya: ÃƒÂ¶rtÃƒÂ¼Ã…Å¸me bulundu Ã¢â€ â€™ detaylar)
- [x] MEMORY.md: ÃƒÂ¶rtÃƒÂ¼Ã…Å¸me yok (veya: ÃƒÂ¶rtÃƒÂ¼Ã…Å¸me bulundu Ã¢â€ â€™ detaylar)
- [x] Mevcut skill'e ekleme: yeni dosya uygun (veya: [X]'e eklenmeli)
- [x] Yeniden kullanÃ„Â±labilirlik: onaylandÃ„Â± (veya: tek seferlik Ã¢â€ â€™ DÃƒÂ¼Ã…Å¸ÃƒÂ¼r)

### Karar: Kaydet / Ã„Â°yileÃ…Å¸tir sonra Kaydet / [X]'e Ekle / DÃƒÂ¼Ã…Å¸ÃƒÂ¼r

**GerekÃƒÂ§e:** (KararÃ„Â± aÃƒÂ§Ã„Â±klayan 1-2 cÃƒÂ¼mle)
```

## TasarÃ„Â±m GerekÃƒÂ§esi

Bu versiyon, ÃƒÂ¶nceki 5 boyutlu sayÃ„Â±sal puanlama rubriÃ„Å¸ini (Spesifiklik, Uygulanabilirlik, Kapsam Uyumu, Gereksizlik Olmama, Kapsama 1-5 arasÃ„Â± puanlanÃ„Â±yor) kontrol listesi tabanlÃ„Â± bÃƒÂ¼tÃƒÂ¼nsel karar sistemiyle deÃ„Å¸iÃ…Å¸tirir. Modern frontier modeller (Opus 4.6+) gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ baÃ„Å¸lamsal yargÃ„Â±ya sahiptir Ã¢â‚¬â€ zengin niteliksel sinyalleri sayÃ„Â±sal skorlara zorlamak nÃƒÂ¼ans kaybettirir ve yanÃ„Â±ltÃ„Â±cÃ„Â± toplamlar ÃƒÂ¼retebilir. BÃƒÂ¼tÃƒÂ¼nsel yaklaÃ…Å¸Ã„Â±m, modelin tÃƒÂ¼m faktÃƒÂ¶rleri doÃ„Å¸al olarak tartmasÃ„Â±na izin vererek daha doÃ„Å¸ru kaydet/dÃƒÂ¼Ã…Å¸ÃƒÂ¼r kararlarÃ„Â± ÃƒÂ¼retirken, aÃƒÂ§Ã„Â±k kontrol listesi kritik hiÃƒÂ§bir kontrolÃƒÂ¼n atlanmamasÃ„Â±nÃ„Â± saÃ„Å¸lar.

## Notlar

- Ãƒâ€“nemsiz dÃƒÂ¼zeltmeleri ÃƒÂ§Ã„Â±karmayÃ„Â±n (yazÃ„Â±m hatalarÃ„Â±, basit sÃƒÂ¶zdizimi hatalarÃ„Â±)
- Tek seferlik sorunlarÃ„Â± ÃƒÂ§Ã„Â±karmayÃ„Â±n (belirli API kesintileri, vb.)
- Gelecekteki oturumlarda zaman kazandÃ„Â±racak desenlere odaklanÃ„Â±n
- Skill'leri odaklÃ„Â± tutun Ã¢â‚¬â€ skill baÃ…Å¸Ã„Â±na bir desen
- Karar Ekle olduÃ„Å¸unda, yeni dosya oluÃ…Å¸turmak yerine mevcut skill'e ekleyin
