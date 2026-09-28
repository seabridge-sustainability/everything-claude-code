---
name: continuous-learning-v2
description: Hook'lar aracılığıyla oturumları gözlemleyen, güven skorlaması ile atomik instinct'ler oluşturan ve bunları skill/command/agent'lara evriltiren instinct tabanlı öğrenme sistemi. v2.1 çapraz proje kontaminasyonunu önlemek için proje kapsamlı instinct'ler ekler.
origin: ECC
version: 2.1.0
---

# Sürekli Öğrenme v2.1 - Instinct Tabanlı Mimari

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


Claude Code oturumlarınızı güven skorlaması ile atomik "instinct'ler" - küçük öğrenilmiş davranışlar - aracılığıyla yeniden kullanılabilir bilgiye dönüştüren gelişmiş bir öğrenme sistemi.

**v2.1** **proje kapsamlı instinct'ler** ekler — React kalıpları React projenizde kalır, Python kuralları Python projenizde kalır ve evrensel kalıplar (örneğin "her zaman input'u doğrula") global olarak paylaşılır.

## Ne Zaman Aktifleştirmelisiniz

- Claude Code oturumlarından otomatik öğrenme ayarlarken
- Hook'lar aracılığıyla instinct tabanlı davranış çıkarmayı yapılandırırken
- Öğrenilmiş davranışlar için güven eşiklerini ayarlarken
- Instinct kütüphanelerini incelerken, dışa veya içe aktarırken
- Instinct'leri tam skill'lere, command'lara veya agent'lara evriltirken
- Proje kapsamlı vs global instinct'leri yönetirken
- Instinct'leri projeden global kapsamına yükseltirken

## v2.1'deki Yenilikler

| Özellik | v2.0 | v2.1 |
|---------|------|------|
| Depolama | Global (~/.claude/homunculus/) | Proje kapsamlı (projects/<hash>/) |
| Kapsam | Tüm instinct'ler her yerde geçerli | Proje kapsamlı + global |
| Tespit | Yok | git remote URL / repo path |
| Yükseltme | Yok | Proje → 2+ projede görülünce global |
| Komutlar | 4 (status/evolve/export/import) | 6 (+promote/projects) |
| Çapraz proje | Kontaminasyon riski | Varsayılan olarak izole |

## v2'deki Yenilikler (vs v1)

| Özellik | v1 | v2 |
|---------|----|----|
| Gözlem | Stop hook (oturum sonu) | PreToolUse/PostToolUse (%100 güvenilir) |
| Analiz | Ana bağlam | Arka plan agent'ı (Haiku) |
| Granülerlik | Tam skill'ler | Atomik "instinct'ler" |
| Güven | Yok | 0.3-0.9 ağırlıklı |
| Evrim | Doğrudan skill'e | Instinct'ler -> kümeleme -> skill/command/agent |
| Paylaşım | Yok | Instinct'leri dışa/içe aktar |

## Instinct Modeli

Instinct küçük öğrenilmiş bir davranıştır:

```yaml
---
id: prefer-functional-style
trigger: "yeni fonksiyonlar yazarken"
confidence: 0.7
domain: "code-style"
source: "session-observation"
scope: project
project_id: "a1b2c3d4e5f6"
project_name: "my-react-app"
---

# Fonksiyonel Stili Tercih Et

## Aksiyon
Uygun olduğunda sınıflar yerine fonksiyonel kalıpları kullan.

## Kanıt
- 5 fonksiyonel kalıp tercihinin gözlemlenmesi
- Kullanıcı 2025-01-15'te sınıf tabanlı yaklaşımı fonksiyonele düzeltti
```

**Özellikler:**
- **Atomik** -- bir tetikleyici, bir aksiyon
- **Güven ağırlıklı** -- 0.3 = geçici, 0.9 = neredeyse kesin
- **Alan etiketli** -- code-style, testing, git, debugging, workflow, vb.
- **Kanıt destekli** -- hangi gözlemlerin oluşturduğunu takip eder
- **Kapsam farkında** -- `project` (varsayılan) veya `global`

## Nasıl Çalışır

```
Oturum Aktivitesi (bir git repo'sunda)
      |
      | Hook'lar prompt'ları + tool kullanımını yakalar (%100 güvenilir)
      | + proje bağlamını tespit eder (git remote / repo path)
      v
+---------------------------------------------+
|  projects/<project-hash>/observations.jsonl  |
|   (prompt'lar, tool çağrıları, sonuçlar, proje)   |
+---------------------------------------------+
      |
      | Gözlemci agent okur (arka plan, Haiku)
      v
+---------------------------------------------+
|          KALIP TESPİTİ                      |
|   * Kullanıcı düzeltmeleri -> instinct      |
|   * Hata çözümleri -> instinct              |
|   * Tekrarlanan iş akışları -> instinct     |
|   * Kapsam kararı: project mi global mi?   |
+---------------------------------------------+
      |
      | Oluşturur/günceller
      v
+---------------------------------------------+
|  projects/<project-hash>/instincts/personal/ |
|   * prefer-functional.yaml (0.7) [project]   |
|   * use-react-hooks.yaml (0.9) [project]     |
+---------------------------------------------+
|  instincts/personal/  (GLOBAL)               |
|   * always-validate-input.yaml (0.85) [global]|
|   * grep-before-edit.yaml (0.6) [global]     |
+---------------------------------------------+
      |
      | /evolve kümeleme + /promote
      v
+---------------------------------------------+
|  projects/<hash>/evolved/ (proje kapsamlı)   |
|  evolved/ (global)                           |
|   * commands/new-feature.md                  |
|   * skills/testing-workflow.md               |
|   * agents/refactor-specialist.md            |
+---------------------------------------------+
```

## Proje Tespiti

Sistem mevcut projenizi otomatik olarak tespit eder:

1. **`CLAUDE_PROJECT_DIR` env var** (en yüksek öncelik)
2. **`git remote get-url origin`** -- taşınabilir proje ID'si oluşturmak için hash'lenir (farklı makinelerde aynı repo aynı ID'yi alır)
3. **`git rev-parse --show-toplevel`** -- repo path kullanan yedek (makineye özgü)
4. **Global yedek** -- proje tespit edilemezse, instinct'ler global kapsamına gider

Her proje 12 karakterlik bir hash ID alır (örn. `a1b2c3d4e5f6`). `~/.claude/homunculus/projects.json` dosyasındaki kayıt dosyası ID'leri insanların okuyabileceği isimlerle eşler.

## Hızlı Başlangıç

### 1. Gözlem Hook'larını Aktifleştirin

`~/.claude/settings.json` dosyanıza ekleyin.

**Plugin olarak kuruluysa** (önerilen):

`~/.claude/settings.json` içine ek hook bloğu eklemeyin. Claude Code v2.1+ eklentinin `hooks/hooks.json` dosyasını otomatik yükler; `observe.sh` zaten orada kayıtlıdır.

Daha önce `observe.sh` satırlarını `~/.claude/settings.json` içine kopyaladıysanız, yinelenen `PreToolUse` / `PostToolUse` bloğunu kaldırın. Yinelenen kayıt hem çift çalıştırmaya yol açar hem de `${CLAUDE_PLUGIN_ROOT}` çözümleme hatası üretir; bu değişken yalnızca eklentiye ait `hooks/hooks.json` girdilerinde genişletilir.

**`~/.claude/skills` dizinine manuel kuruluysa**, aşağıdakini `~/.claude/settings.json` içine ekleyin:

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/continuous-learning-v2/hooks/observe.sh"
      }]
    }],
    "PostToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/continuous-learning-v2/hooks/observe.sh"
      }]
    }]
  }
}
```

### 2. Dizin Yapısını Başlatın

Sistem ilk kullanımda dizinleri otomatik oluşturur, ancak manuel olarak da oluşturabilirsiniz:

```bash
# Global dizinler
mkdir -p ~/.claude/homunculus/{instincts/{personal,inherited},evolved/{agents,skills,commands},projects}

# Proje dizinleri hook bir git repo'sunda ilk çalıştığında otomatik oluşturulur
```

### 3. Instinct Komutlarını Kullanın

```bash
/instinct-status     # Öğrenilmiş instinct'leri göster (proje + global)
/evolve              # İlgili instinct'leri skill/command'lara kümele
/instinct-export     # Instinct'leri dosyaya aktar
/instinct-import     # Başkalarından instinct'leri içe aktar
/promote             # Proje instinct'lerini global kapsamına yükselt
/projects            # Tüm bilinen projeleri ve instinct sayılarını listele
```

## Komutlar

| Komut | Açıklama |
|---------|-------------|
| `/instinct-status` | Tüm instinct'leri göster (proje kapsamlı + global) güvenle |
| `/evolve` | İlgili instinct'leri skill/command'lara kümele, yükseltme öner |
| `/instinct-export` | Instinct'leri dışa aktar (kapsam/alana göre filtrelenebilir) |
| `/instinct-import <file>` | Kapsam kontrolü ile instinct'leri içe aktar |
| `/promote [id]` | Proje instinct'lerini global kapsamına yükselt |
| `/projects` | Tüm bilinen projeleri ve instinct sayılarını listele |

## Konfigürasyon

Arka plan gözlemcisini kontrol etmek için `config.json` dosyasını düzenleyin:

```json
{
  "version": "2.1",
  "observer": {
    "enabled": false,
    "run_interval_minutes": 5,
    "min_observations_to_analyze": 20
  }
}
```

| Anahtar | Varsayılan | Açıklama |
|-----|---------|-------------|
| `observer.enabled` | `false` | Arka plan gözlemci agent'ını aktifleştir |
| `observer.run_interval_minutes` | `5` | Gözlemcinin gözlemleri ne sıklıkla analiz ettiği |
| `observer.min_observations_to_analyze` | `20` | Analiz çalışmadan önce minimum gözlem |

Diğer davranışlar (gözlem yakalama, instinct eşikleri, proje kapsamı, yükseltme kriterleri) `instinct-cli.py` ve `observe.sh` içindeki kod varsayılanları aracılığıyla yapılandırılır.

## Dosya Yapısı

```
~/.claude/homunculus/
+-- identity.json           # Profiliniz, teknik seviye
+-- projects.json           # Kayıt: proje hash -> isim/path/remote
+-- observations.jsonl      # Global gözlemler (yedek)
+-- instincts/
|   +-- personal/           # Global otomatik öğrenilmiş instinct'ler
|   +-- inherited/          # Global içe aktarılan instinct'ler
+-- evolved/
|   +-- agents/             # Global oluşturulan agent'lar
|   +-- skills/             # Global oluşturulan skill'ler
|   +-- commands/           # Global oluşturulan komutlar
+-- projects/
    +-- a1b2c3d4e5f6/       # Proje hash (git remote URL'den)
    |   +-- project.json    # Proje başına metadata yansıması (id/name/root/remote)
    |   +-- observations.jsonl
    |   +-- observations.archive/
    |   +-- instincts/
    |   |   +-- personal/   # Projeye özgü otomatik öğrenilmiş
    |   |   +-- inherited/  # Projeye özgü içe aktarılan
    |   +-- evolved/
    |       +-- skills/
    |       +-- commands/
    |       +-- agents/
    +-- f6e5d4c3b2a1/       # Başka bir proje
        +-- ...
```

## Kapsam Karar Kılavuzu

| Kalıp Tipi | Kapsam | Örnekler |
|-------------|-------|---------|
| Dil/framework kuralları | **project** | "React hook'ları kullan", "Django REST kalıplarını takip et" |
| Dosya yapısı tercihleri | **project** | "Testler `__tests__`/ içinde", "Bileşenler src/components/ içinde" |
| Kod stili | **project** | "Fonksiyonel stil kullan", "Dataclass'ları tercih et" |
| Hata işleme stratejileri | **project** | "Hatalar için Result tipi kullan" |
| Güvenlik uygulamaları | **global** | "Kullanıcı input'unu doğrula", "SQL'i sanitize et" |
| Genel en iyi uygulamalar | **global** | "Önce testleri yaz", "Her zaman hataları işle" |
| Tool iş akışı tercihleri | **global** | "Edit'ten önce Grep", "Write'tan önce Read" |
| Git uygulamaları | **global** | "Conventional commit'ler", "Küçük odaklı commit'ler" |

## Instinct Yükseltme (Project -> Global)

Aynı instinct birden fazla projede yüksek güvenle göründüğünde, global kapsamına yükseltme adayıdır.

**Otomatik yükseltme kriterleri:**
- 2+ projede aynı instinct ID
- Ortalama güven >= 0.8

**Nasıl yükseltilir:**

```bash
# Belirli bir instinct'i yükselt
python3 instinct-cli.py promote prefer-explicit-errors

# Tüm uygun instinct'leri otomatik yükselt
python3 instinct-cli.py promote

# Değişiklik yapmadan önizle
python3 instinct-cli.py promote --dry-run
```

`/evolve` komutu ayrıca yükseltme adaylarını önerir.

## Güven Skorlaması

Güven zamanla evrimleşir:

| Skor | Anlamı | Davranış |
|-------|---------|----------|
| 0.3 | Geçici | Önerilir ama zorunlu değil |
| 0.5 | Orta | İlgili olduğunda uygulanır |
| 0.7 | Güçlü | Uygulama için otomatik onaylanır |
| 0.9 | Neredeyse kesin | Temel davranış |

**Güven artar** şu durumlarda:
- Kalıp tekrar tekrar gözlemlenir
- Kullanıcı önerilen davranışı düzeltmez
- Diğer kaynaklardan benzer instinct'ler hemfikirdir

**Güven azalır** şu durumlarda:
- Kullanıcı davranışı açıkça düzeltir
- Kalıp uzun süre gözlemlenmez
- Çelişkili kanıt ortaya çıkar

## Neden Gözlem için Skill'ler Yerine Hook'lar?

> "v1 gözlem için skill'lere güveniyordu. Skill'ler olasılıksaldır -- Claude'un yargısına göre zamanın ~%50-80'inde tetiklenirler."

Hook'lar **%100** deterministik olarak tetiklenir. Bu şu anlama gelir:
- Her tool çağrısı gözlemlenir
- Hiçbir kalıp kaçırılmaz
- Öğrenme kapsamlıdır

## Geriye Dönük Uyumluluk

v2.1, v2.0 ve v1 ile tamamen uyumludur:
- `~/.claude/homunculus/instincts/` içindeki mevcut global instinct'ler hala global instinct olarak çalışır
- v1'den `~/.claude/skills/learned/` skill'leri hala çalışır
- Stop hook hala çalışır (ama şimdi v2'ye de beslenir)
- Kademeli geçiş: her ikisini de paralel çalıştırın

## Gizlilik

- Gözlemler makinenizde **yerel** kalır
- Proje kapsamlı instinct'ler proje başına izoledir
- Sadece **instinct'ler** (kalıplar) dışa aktarılabilir — ham gözlemler değil
- Gerçek kod veya konuşma içeriği paylaşılmaz
- Neyin dışa aktarılacağını ve yükseltileceğini siz kontrol edersiniz

## İlgili

- [ECC-Tools GitHub App](https://github.com/apps/ecc-tools) - Repo geçmişinden instinct'ler oluştur
- Homunculus - v2 instinct tabanlı mimariye ilham veren topluluk projesi (atomik gözlemler, güven skorlaması, instinct evrim hattı)
- [The Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - Sürekli öğrenme bölümü

---

*Instinct tabanlı öğrenme: Claude'a kalıplarınızı öğretmek, her seferinde bir proje.*
