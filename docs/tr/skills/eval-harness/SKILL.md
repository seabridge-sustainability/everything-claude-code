---
name: eval-harness
description: Eval-driven development (EDD) ilkelerini uygulayan Claude Code oturumları için formal değerlendirme çerçevesi
origin: ECC
tools: Read, Write, Edit, Bash, Grep, Glob
---

# Eval Harness Skill

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


Claude Code oturumları için eval-driven development (EDD) ilkelerini uygulayan formal değerlendirme çerçevesi.

## Ne Zaman Aktifleştirmeli

- AI destekli iş akışları için eval-driven development (EDD) kurarken
- Claude Code görev tamamlama için geçti/kaldı kriterleri tanımlarken
- pass@k metrikleriyle agent güvenilirliğini ölçerken
- Prompt veya agent değişiklikleri için regresyon test paketleri oluştururken
- Model versiyonları arasında agent performansını benchmark ederken

## Felsefe

Eval-Driven Development, eval'ları "AI geliştirmenin birim testleri" olarak ele alır:
- İmplementasyondan ÖNCE beklenen davranışı tanımla
- Geliştirme sırasında eval'ları sürekli çalıştır
- Her değişiklikle regresyonları izle
- Güvenilirlik ölçümü için pass@k metriklerini kullan

## Eval Tipleri

### Capability Eval'ları
Claude'un daha önce yapamadığı bir şeyi yapıp yapamadığını test et:
```markdown
[CAPABILITY EVAL: feature-name]
Görev: Claude'un başarması gereken şeyin açıklaması
Başarı Kriterleri:
  - [ ] Kriter 1
  - [ ] Kriter 2
  - [ ] Kriter 3
Beklenen Çıktı: Beklenen sonucun açıklaması
```

### Regression Eval'ları
Değişikliklerin mevcut fonksiyonaliteyi bozmadığından emin ol:
```markdown
[REGRESSION EVAL: feature-name]
Baseline: SHA veya checkpoint adı
Testler:
  - existing-test-1: PASS/FAIL
  - existing-test-2: PASS/FAIL
  - existing-test-3: PASS/FAIL
Sonuç: X/Y geçti (önceden Y/Y)
```

## Grader Tipleri

### 1. Code-Based Grader
Kod kullanarak deterministik kontroller:
```bash
# Dosyanın beklenen pattern içerip içermediğini kontrol et
grep -q "export function handleAuth" src/auth.ts && echo "PASS" || echo "FAIL"

# Testlerin geçip geçmediğini kontrol et
npm test -- --testPathPattern="auth" && echo "PASS" || echo "FAIL"

# Build'in başarılı olup olmadığını kontrol et
npm run build && echo "PASS" || echo "FAIL"
```

### 2. Model-Based Grader
Açık uçlu çıktıları değerlendirmek için Claude kullan:
```markdown
[MODEL GRADER PROMPT]
Aşağıdaki kod değişikliğini değerlendir:
1. Belirtilen sorunu çözüyor mu?
2. İyi yapılandırılmış mı?
3. Edge case'ler işleniyor mu?
4. Hata işleme uygun mu?

Puan: 1-5 (1=kötü, 5=mükemmel)
Gerekçe: [açıklama]
```

### 3. Human Grader
Manuel inceleme için işaretle:
```markdown
[HUMAN REVIEW REQUIRED]
Değişiklik: Neyin değiştiğinin açıklaması
Sebep: Neden insan incelemesi gerekli
Risk Seviyesi: DÜŞÜK/ORTA/YÜKSEK
```

## Metrikler

### pass@k
"k denemede en az bir başarı"
- pass@1: İlk deneme başarı oranı
- pass@3: 3 denemede başarı
- Tipik hedef: pass@3 > %90

### pass^k
"Tüm k denemeler başarılı"
- Güvenilirlik için daha yüksek çıta
- pass^3: Ardışık 3 başarı
- Kritik yollar için kullan

## Eval İş Akışı

### 1. Tanımla (Kodlamadan Önce)
```markdown
## EVAL DEFINITION: feature-xyz

### Capability Eval'ları
1. Yeni kullanıcı hesabı oluşturabilir
2. Email formatını doğrulayabilir
3. Şifreyi güvenli şekilde hash'leyebilir

### Regression Eval'ları
1. Mevcut login hala çalışıyor
2. Oturum yönetimi değişmedi
3. Logout akışı sağlam

### Başarı Metrikleri
- capability eval'lar için pass@3 > %90
- regression eval'lar için pass^3 = %100
```

### 2. Uygula
Tanımlanan eval'ları geçmek için kod yaz.

### 3. Değerlendir
```bash
# Capability eval'ları çalıştır
[Her capability eval'ı çalıştır, PASS/FAIL kaydet]

# Regression eval'ları çalıştır
npm test -- --testPathPattern="existing"

# Rapor oluştur
```

### 4. Rapor
```markdown
EVAL REPORT: feature-xyz
========================

Capability Eval'ları:
  create-user:     PASS (pass@1)
  validate-email:  PASS (pass@2)
  hash-password:   PASS (pass@1)
  Genel:           3/3 geçti

Regression Eval'ları:
  login-flow:      PASS
  session-mgmt:    PASS
  logout-flow:     PASS
  Genel:           3/3 geçti

Metrikler:
  pass@1: %67 (2/3)
  pass@3: %100 (3/3)

Durum: İNCELEMEYE HAZIR
```

## Entegrasyon Kalıpları

### İmplementasyondan Önce
```
/eval define feature-name
```
`.claude/evals/feature-name.md` konumunda eval tanım dosyası oluşturur

### İmplementasyon Sırasında
```
/eval check feature-name
```
Mevcut eval'ları çalıştırır ve durumu raporlar

### İmplementasyondan Sonra
```
/eval report feature-name
```
Tam eval raporu oluşturur

## Eval Depolama

Eval'ları projede sakla:
```
.claude/
  evals/
    feature-xyz.md      # Eval tanımı
    feature-xyz.log     # Eval çalıştırma geçmişi
    baseline.json       # Regression baseline'ları
```

## En İyi Uygulamalar

1. **Kodlamadan ÖNCE eval'ları tanımla** - Başarı kriterleri hakkında net düşünmeyi zorlar
2. **Eval'ları sık çalıştır** - Regresyonları erken yakala
3. **pass@k'yı zaman içinde izle** - Güvenilirlik trendlerini gözle
4. **Mümkün olduğunda code grader kullan** - Deterministik > olasılıksal
5. **Güvenlik için insan incelemesi** - Güvenlik kontrollerini asla tam otomatikleştirme
6. **Eval'ları hızlı tut** - Yavaş eval'lar çalıştırılmaz
7. **Eval'ları kodla versiyonla** - Eval'lar birinci sınıf artifact'lardır

## Örnek: Kimlik Doğrulama Ekleme

```markdown
## EVAL: add-authentication

### Faz 1: Tanımla (10 dk)
Capability Eval'ları:
- [ ] Kullanıcı email/şifre ile kayıt olabilir
- [ ] Kullanıcı geçerli kimlik bilgileriyle giriş yapabilir
- [ ] Geçersiz kimlik bilgileri uygun hatayla reddedilir
- [ ] Oturumlar sayfa yeniden yüklemelerinde kalıcıdır
- [ ] Logout oturumu temizler

Regression Eval'ları:
- [ ] Halka açık rotalar hala erişilebilir
- [ ] API yanıtları değişmedi
- [ ] Veritabanı şeması uyumlu

### Faz 2: Uygula (değişir)
[Kod yaz]

### Faz 3: Değerlendir
Çalıştır: /eval check add-authentication

### Faz 4: Raporla
EVAL REPORT: add-authentication
==============================
Capability: 5/5 geçti (pass@3: %100)
Regression: 3/3 geçti (pass^3: %100)
Durum: YAYINLA
```

## Product Eval'ları (v1.8)

Davranış kalitesi sadece birim testlerle yakalanamadığında product eval'ları kullan.

### Grader Tipleri

1. Code grader (deterministik assertion'lar)
2. Rule grader (regex/şema kısıtlamaları)
3. Model grader (LLM-as-judge rubric)
4. Human grader (belirsiz çıktılar için manuel karar)

### pass@k Kılavuzu

- `pass@1`: doğrudan güvenilirlik
- `pass@3`: kontrollü yeniden denemeler altında pratik güvenilirlik
- `pass^3`: kararlılık testi (3 çalıştırmanın tümü geçmeli)

Önerilen eşikler:
- Capability eval'ları: pass@3 >= 0.90
- Regression eval'ları: yayın-kritik yollar için pass^3 = 1.00

### Eval Anti-Kalıpları

- Prompt'ları bilinen eval örneklerine overfitting yapmak
- Sadece mutlu-yol çıktılarını ölçmek
- Geçme oranlarını kovalamken maliyet ve gecikme kaymasını görmezden gelmek
- Yayın kapılarında kararsız grader'lara izin vermek

### Minimal Eval Artifact Düzeni

- `.claude/evals/<feature>.md` tanımı
- `.claude/evals/<feature>.log` çalıştırma geçmişi
- `docs/releases/<version>/eval-summary.md` yayın snapshot'ı
