---
name: continuous-learning-v2
description: Hook'lar aracÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla oturumlarÃ„Â± gÃƒÂ¶zlemleyen, gÃƒÂ¼ven skorlamasÃ„Â± ile atomik instinct'ler oluÃ…Å¸turan ve bunlarÃ„Â± skill/command/agent'lara evriltiren instinct tabanlÃ„Â± ÃƒÂ¶Ã„Å¸renme sistemi. v2.1 ÃƒÂ§apraz proje kontaminasyonunu ÃƒÂ¶nlemek iÃƒÂ§in proje kapsamlÃ„Â± instinct'ler ekler.
origin: ECC
version: 2.1.0
---

# SÃƒÂ¼rekli Ãƒâ€“Ã„Å¸renme v2.1 - Instinct TabanlÃ„Â± Mimari

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Claude Code oturumlarÃ„Â±nÃ„Â±zÃ„Â± gÃƒÂ¼ven skorlamasÃ„Â± ile atomik "instinct'ler" - kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k ÃƒÂ¶Ã„Å¸renilmiÃ…Å¸ davranÃ„Â±Ã…Å¸lar - aracÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla yeniden kullanÃ„Â±labilir bilgiye dÃƒÂ¶nÃƒÂ¼Ã…Å¸tÃƒÂ¼ren geliÃ…Å¸miÃ…Å¸ bir ÃƒÂ¶Ã„Å¸renme sistemi.

**v2.1** **proje kapsamlÃ„Â± instinct'ler** ekler Ã¢â‚¬â€ React kalÃ„Â±plarÃ„Â± React projenizde kalÃ„Â±r, Python kurallarÃ„Â± Python projenizde kalÃ„Â±r ve evrensel kalÃ„Â±plar (ÃƒÂ¶rneÃ„Å¸in "her zaman input'u doÃ„Å¸rula") global olarak paylaÃ…Å¸Ã„Â±lÃ„Â±r.

## Ne Zaman AktifleÃ…Å¸tirmelisiniz

- Claude Code oturumlarÃ„Â±ndan otomatik ÃƒÂ¶Ã„Å¸renme ayarlarken
- Hook'lar aracÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla instinct tabanlÃ„Â± davranÃ„Â±Ã…Å¸ ÃƒÂ§Ã„Â±karmayÃ„Â± yapÃ„Â±landÃ„Â±rÃ„Â±rken
- Ãƒâ€“Ã„Å¸renilmiÃ…Å¸ davranÃ„Â±Ã…Å¸lar iÃƒÂ§in gÃƒÂ¼ven eÃ…Å¸iklerini ayarlarken
- Instinct kÃƒÂ¼tÃƒÂ¼phanelerini incelerken, dÃ„Â±Ã…Å¸a veya iÃƒÂ§e aktarÃ„Â±rken
- Instinct'leri tam skill'lere, command'lara veya agent'lara evriltirken
- Proje kapsamlÃ„Â± vs global instinct'leri yÃƒÂ¶netirken
- Instinct'leri projeden global kapsamÃ„Â±na yÃƒÂ¼kseltirken

## v2.1'deki Yenilikler

| Ãƒâ€“zellik | v2.0 | v2.1 |
|---------|------|------|
| Depolama | Global (~/.claude/homunculus/) | Proje kapsamlÃ„Â± (projects/<hash>/) |
| Kapsam | TÃƒÂ¼m instinct'ler her yerde geÃƒÂ§erli | Proje kapsamlÃ„Â± + global |
| Tespit | Yok | git remote URL / repo path |
| YÃƒÂ¼kseltme | Yok | Proje Ã¢â€ â€™ 2+ projede gÃƒÂ¶rÃƒÂ¼lÃƒÂ¼nce global |
| Komutlar | 4 (status/evolve/export/import) | 6 (+promote/projects) |
| Ãƒâ€¡apraz proje | Kontaminasyon riski | VarsayÃ„Â±lan olarak izole |

## v2'deki Yenilikler (vs v1)

| Ãƒâ€“zellik | v1 | v2 |
|---------|----|----|
| GÃƒÂ¶zlem | Stop hook (oturum sonu) | PreToolUse/PostToolUse (%100 gÃƒÂ¼venilir) |
| Analiz | Ana baÃ„Å¸lam | Arka plan agent'Ã„Â± (Haiku) |
| GranÃƒÂ¼lerlik | Tam skill'ler | Atomik "instinct'ler" |
| GÃƒÂ¼ven | Yok | 0.3-0.9 aÃ„Å¸Ã„Â±rlÃ„Â±klÃ„Â± |
| Evrim | DoÃ„Å¸rudan skill'e | Instinct'ler -> kÃƒÂ¼meleme -> skill/command/agent |
| PaylaÃ…Å¸Ã„Â±m | Yok | Instinct'leri dÃ„Â±Ã…Å¸a/iÃƒÂ§e aktar |

## Instinct Modeli

Instinct kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k ÃƒÂ¶Ã„Å¸renilmiÃ…Å¸ bir davranÃ„Â±Ã…Å¸tÃ„Â±r:

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
Uygun olduÃ„Å¸unda sÃ„Â±nÃ„Â±flar yerine fonksiyonel kalÃ„Â±plarÃ„Â± kullan.

## KanÃ„Â±t
- 5 fonksiyonel kalÃ„Â±p tercihinin gÃƒÂ¶zlemlenmesi
- KullanÃ„Â±cÃ„Â± 2025-01-15'te sÃ„Â±nÃ„Â±f tabanlÃ„Â± yaklaÃ…Å¸Ã„Â±mÃ„Â± fonksiyonele dÃƒÂ¼zeltti
```

**Ãƒâ€“zellikler:**
- **Atomik** -- bir tetikleyici, bir aksiyon
- **GÃƒÂ¼ven aÃ„Å¸Ã„Â±rlÃ„Â±klÃ„Â±** -- 0.3 = geÃƒÂ§ici, 0.9 = neredeyse kesin
- **Alan etiketli** -- code-style, testing, git, debugging, workflow, vb.
- **KanÃ„Â±t destekli** -- hangi gÃƒÂ¶zlemlerin oluÃ…Å¸turduÃ„Å¸unu takip eder
- **Kapsam farkÃ„Â±nda** -- `project` (varsayÃ„Â±lan) veya `global`

## NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r

```
Oturum Aktivitesi (bir git repo'sunda)
      |
      | Hook'lar prompt'larÃ„Â± + tool kullanÃ„Â±mÃ„Â±nÃ„Â± yakalar (%100 gÃƒÂ¼venilir)
      | + proje baÃ„Å¸lamÃ„Â±nÃ„Â± tespit eder (git remote / repo path)
      v
+---------------------------------------------+
|  projects/<project-hash>/observations.jsonl  |
|   (prompt'lar, tool ÃƒÂ§aÃ„Å¸rÃ„Â±larÃ„Â±, sonuÃƒÂ§lar, proje)   |
+---------------------------------------------+
      |
      | GÃƒÂ¶zlemci agent okur (arka plan, Haiku)
      v
+---------------------------------------------+
|          KALIP TESPÃ„Â°TÃ„Â°                      |
|   * KullanÃ„Â±cÃ„Â± dÃƒÂ¼zeltmeleri -> instinct      |
|   * Hata ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mleri -> instinct              |
|   * Tekrarlanan iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â± -> instinct     |
|   * Kapsam kararÃ„Â±: project mi global mi?   |
+---------------------------------------------+
      |
      | OluÃ…Å¸turur/gÃƒÂ¼nceller
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
      | /evolve kÃƒÂ¼meleme + /promote
      v
+---------------------------------------------+
|  projects/<hash>/evolved/ (proje kapsamlÃ„Â±)   |
|  evolved/ (global)                           |
|   * commands/new-feature.md                  |
|   * skills/testing-workflow.md               |
|   * agents/refactor-specialist.md            |
+---------------------------------------------+
```

## Proje Tespiti

Sistem mevcut projenizi otomatik olarak tespit eder:

1. **`CLAUDE_PROJECT_DIR` env var** (en yÃƒÂ¼ksek ÃƒÂ¶ncelik)
2. **`git remote get-url origin`** -- taÃ…Å¸Ã„Â±nabilir proje ID'si oluÃ…Å¸turmak iÃƒÂ§in hash'lenir (farklÃ„Â± makinelerde aynÃ„Â± repo aynÃ„Â± ID'yi alÃ„Â±r)
3. **`git rev-parse --show-toplevel`** -- repo path kullanan yedek (makineye ÃƒÂ¶zgÃƒÂ¼)
4. **Global yedek** -- proje tespit edilemezse, instinct'ler global kapsamÃ„Â±na gider

Her proje 12 karakterlik bir hash ID alÃ„Â±r (ÃƒÂ¶rn. `a1b2c3d4e5f6`). `~/.claude/homunculus/projects.json` dosyasÃ„Â±ndaki kayÃ„Â±t dosyasÃ„Â± ID'leri insanlarÃ„Â±n okuyabileceÃ„Å¸i isimlerle eÃ…Å¸ler.

## HÃ„Â±zlÃ„Â± BaÃ…Å¸langÃ„Â±ÃƒÂ§

### 1. GÃƒÂ¶zlem Hook'larÃ„Â±nÃ„Â± AktifleÃ…Å¸tirin

`~/.claude/settings.json` dosyanÃ„Â±za ekleyin.

**Plugin olarak kuruluysa** (ÃƒÂ¶nerilen):

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/hooks/observe.sh"
      }]
    }],
    "PostToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/hooks/observe.sh"
      }]
    }]
  }
}
```

**`~/.claude/skills` dizinine manuel kuruluysa**:

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

### 2. Dizin YapÃ„Â±sÃ„Â±nÃ„Â± BaÃ…Å¸latÃ„Â±n

Sistem ilk kullanÃ„Â±mda dizinleri otomatik oluÃ…Å¸turur, ancak manuel olarak da oluÃ…Å¸turabilirsiniz:

```bash
# Global dizinler
mkdir -p ~/.claude/homunculus/{instincts/{personal,inherited},evolved/{agents,skills,commands},projects}

# Proje dizinleri hook bir git repo'sunda ilk ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±Ã„Å¸Ã„Â±nda otomatik oluÃ…Å¸turulur
```

### 3. Instinct KomutlarÃ„Â±nÃ„Â± KullanÃ„Â±n

```bash
/instinct-status     # Ãƒâ€“Ã„Å¸renilmiÃ…Å¸ instinct'leri gÃƒÂ¶ster (proje + global)
/evolve              # Ã„Â°lgili instinct'leri skill/command'lara kÃƒÂ¼mele
/instinct-export     # Instinct'leri dosyaya aktar
/instinct-import     # BaÃ…Å¸kalarÃ„Â±ndan instinct'leri iÃƒÂ§e aktar
/promote             # Proje instinct'lerini global kapsamÃ„Â±na yÃƒÂ¼kselt
/projects            # TÃƒÂ¼m bilinen projeleri ve instinct sayÃ„Â±larÃ„Â±nÃ„Â± listele
```

## Komutlar

| Komut | AÃƒÂ§Ã„Â±klama |
|---------|-------------|
| `/instinct-status` | TÃƒÂ¼m instinct'leri gÃƒÂ¶ster (proje kapsamlÃ„Â± + global) gÃƒÂ¼venle |
| `/evolve` | Ã„Â°lgili instinct'leri skill/command'lara kÃƒÂ¼mele, yÃƒÂ¼kseltme ÃƒÂ¶ner |
| `/instinct-export` | Instinct'leri dÃ„Â±Ã…Å¸a aktar (kapsam/alana gÃƒÂ¶re filtrelenebilir) |
| `/instinct-import <file>` | Kapsam kontrolÃƒÂ¼ ile instinct'leri iÃƒÂ§e aktar |
| `/promote [id]` | Proje instinct'lerini global kapsamÃ„Â±na yÃƒÂ¼kselt |
| `/projects` | TÃƒÂ¼m bilinen projeleri ve instinct sayÃ„Â±larÃ„Â±nÃ„Â± listele |

## KonfigÃƒÂ¼rasyon

Arka plan gÃƒÂ¶zlemcisini kontrol etmek iÃƒÂ§in `config.json` dosyasÃ„Â±nÃ„Â± dÃƒÂ¼zenleyin:

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

| Anahtar | VarsayÃ„Â±lan | AÃƒÂ§Ã„Â±klama |
|-----|---------|-------------|
| `observer.enabled` | `false` | Arka plan gÃƒÂ¶zlemci agent'Ã„Â±nÃ„Â± aktifleÃ…Å¸tir |
| `observer.run_interval_minutes` | `5` | GÃƒÂ¶zlemcinin gÃƒÂ¶zlemleri ne sÃ„Â±klÃ„Â±kla analiz ettiÃ„Å¸i |
| `observer.min_observations_to_analyze` | `20` | Analiz ÃƒÂ§alÃ„Â±Ã…Å¸madan ÃƒÂ¶nce minimum gÃƒÂ¶zlem |

DiÃ„Å¸er davranÃ„Â±Ã…Å¸lar (gÃƒÂ¶zlem yakalama, instinct eÃ…Å¸ikleri, proje kapsamÃ„Â±, yÃƒÂ¼kseltme kriterleri) `instinct-cli.py` ve `observe.sh` iÃƒÂ§indeki kod varsayÃ„Â±lanlarÃ„Â± aracÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla yapÃ„Â±landÃ„Â±rÃ„Â±lÃ„Â±r.

## Dosya YapÃ„Â±sÃ„Â±

```
~/.claude/homunculus/
+-- identity.json           # Profiliniz, teknik seviye
+-- projects.json           # KayÃ„Â±t: proje hash -> isim/path/remote
+-- observations.jsonl      # Global gÃƒÂ¶zlemler (yedek)
+-- instincts/
|   +-- personal/           # Global otomatik ÃƒÂ¶Ã„Å¸renilmiÃ…Å¸ instinct'ler
|   +-- inherited/          # Global iÃƒÂ§e aktarÃ„Â±lan instinct'ler
+-- evolved/
|   +-- agents/             # Global oluÃ…Å¸turulan agent'lar
|   +-- skills/             # Global oluÃ…Å¸turulan skill'ler
|   +-- commands/           # Global oluÃ…Å¸turulan komutlar
+-- projects/
    +-- a1b2c3d4e5f6/       # Proje hash (git remote URL'den)
    |   +-- project.json    # Proje baÃ…Å¸Ã„Â±na metadata yansÃ„Â±masÃ„Â± (id/name/root/remote)
    |   +-- observations.jsonl
    |   +-- observations.archive/
    |   +-- instincts/
    |   |   +-- personal/   # Projeye ÃƒÂ¶zgÃƒÂ¼ otomatik ÃƒÂ¶Ã„Å¸renilmiÃ…Å¸
    |   |   +-- inherited/  # Projeye ÃƒÂ¶zgÃƒÂ¼ iÃƒÂ§e aktarÃ„Â±lan
    |   +-- evolved/
    |       +-- skills/
    |       +-- commands/
    |       +-- agents/
    +-- f6e5d4c3b2a1/       # BaÃ…Å¸ka bir proje
        +-- ...
```

## Kapsam Karar KÃ„Â±lavuzu

| KalÃ„Â±p Tipi | Kapsam | Ãƒâ€“rnekler |
|-------------|-------|---------|
| Dil/framework kurallarÃ„Â± | **project** | "React hook'larÃ„Â± kullan", "Django REST kalÃ„Â±plarÃ„Â±nÃ„Â± takip et" |
| Dosya yapÃ„Â±sÃ„Â± tercihleri | **project** | "Testler `__tests__`/ iÃƒÂ§inde", "BileÃ…Å¸enler src/components/ iÃƒÂ§inde" |
| Kod stili | **project** | "Fonksiyonel stil kullan", "Dataclass'larÃ„Â± tercih et" |
| Hata iÃ…Å¸leme stratejileri | **project** | "Hatalar iÃƒÂ§in Result tipi kullan" |
| GÃƒÂ¼venlik uygulamalarÃ„Â± | **global** | "KullanÃ„Â±cÃ„Â± input'unu doÃ„Å¸rula", "SQL'i sanitize et" |
| Genel en iyi uygulamalar | **global** | "Ãƒâ€“nce testleri yaz", "Her zaman hatalarÃ„Â± iÃ…Å¸le" |
| Tool iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± tercihleri | **global** | "Edit'ten ÃƒÂ¶nce Grep", "Write'tan ÃƒÂ¶nce Read" |
| Git uygulamalarÃ„Â± | **global** | "Conventional commit'ler", "KÃƒÂ¼ÃƒÂ§ÃƒÂ¼k odaklÃ„Â± commit'ler" |

## Instinct YÃƒÂ¼kseltme (Project -> Global)

AynÃ„Â± instinct birden fazla projede yÃƒÂ¼ksek gÃƒÂ¼venle gÃƒÂ¶rÃƒÂ¼ndÃƒÂ¼Ã„Å¸ÃƒÂ¼nde, global kapsamÃ„Â±na yÃƒÂ¼kseltme adayÃ„Â±dÃ„Â±r.

**Otomatik yÃƒÂ¼kseltme kriterleri:**
- 2+ projede aynÃ„Â± instinct ID
- Ortalama gÃƒÂ¼ven >= 0.8

**NasÃ„Â±l yÃƒÂ¼kseltilir:**

```bash
# Belirli bir instinct'i yÃƒÂ¼kselt
python3 instinct-cli.py promote prefer-explicit-errors

# TÃƒÂ¼m uygun instinct'leri otomatik yÃƒÂ¼kselt
python3 instinct-cli.py promote

# DeÃ„Å¸iÃ…Å¸iklik yapmadan ÃƒÂ¶nizle
python3 instinct-cli.py promote --dry-run
```

`/evolve` komutu ayrÃ„Â±ca yÃƒÂ¼kseltme adaylarÃ„Â±nÃ„Â± ÃƒÂ¶nerir.

## GÃƒÂ¼ven SkorlamasÃ„Â±

GÃƒÂ¼ven zamanla evrimleÃ…Å¸ir:

| Skor | AnlamÃ„Â± | DavranÃ„Â±Ã…Å¸ |
|-------|---------|----------|
| 0.3 | GeÃƒÂ§ici | Ãƒâ€“nerilir ama zorunlu deÃ„Å¸il |
| 0.5 | Orta | Ã„Â°lgili olduÃ„Å¸unda uygulanÃ„Â±r |
| 0.7 | GÃƒÂ¼ÃƒÂ§lÃƒÂ¼ | Uygulama iÃƒÂ§in otomatik onaylanÃ„Â±r |
| 0.9 | Neredeyse kesin | Temel davranÃ„Â±Ã…Å¸ |

**GÃƒÂ¼ven artar** Ã…Å¸u durumlarda:
- KalÃ„Â±p tekrar tekrar gÃƒÂ¶zlemlenir
- KullanÃ„Â±cÃ„Â± ÃƒÂ¶nerilen davranÃ„Â±Ã…Å¸Ã„Â± dÃƒÂ¼zeltmez
- DiÃ„Å¸er kaynaklardan benzer instinct'ler hemfikirdir

**GÃƒÂ¼ven azalÃ„Â±r** Ã…Å¸u durumlarda:
- KullanÃ„Â±cÃ„Â± davranÃ„Â±Ã…Å¸Ã„Â± aÃƒÂ§Ã„Â±kÃƒÂ§a dÃƒÂ¼zeltir
- KalÃ„Â±p uzun sÃƒÂ¼re gÃƒÂ¶zlemlenmez
- Ãƒâ€¡eliÃ…Å¸kili kanÃ„Â±t ortaya ÃƒÂ§Ã„Â±kar

## Neden GÃƒÂ¶zlem iÃƒÂ§in Skill'ler Yerine Hook'lar?

> "v1 gÃƒÂ¶zlem iÃƒÂ§in skill'lere gÃƒÂ¼veniyordu. Skill'ler olasÃ„Â±lÃ„Â±ksaldÃ„Â±r -- Claude'un yargÃ„Â±sÃ„Â±na gÃƒÂ¶re zamanÃ„Â±n ~%50-80'inde tetiklenirler."

Hook'lar **%100** deterministik olarak tetiklenir. Bu Ã…Å¸u anlama gelir:
- Her tool ÃƒÂ§aÃ„Å¸rÃ„Â±sÃ„Â± gÃƒÂ¶zlemlenir
- HiÃƒÂ§bir kalÃ„Â±p kaÃƒÂ§Ã„Â±rÃ„Â±lmaz
- Ãƒâ€“Ã„Å¸renme kapsamlÃ„Â±dÃ„Â±r

## Geriye DÃƒÂ¶nÃƒÂ¼k Uyumluluk

v2.1, v2.0 ve v1 ile tamamen uyumludur:
- `~/.claude/homunculus/instincts/` iÃƒÂ§indeki mevcut global instinct'ler hala global instinct olarak ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r
- v1'den `~/.claude/skills/learned/` skill'leri hala ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r
- Stop hook hala ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r (ama Ã…Å¸imdi v2'ye de beslenir)
- Kademeli geÃƒÂ§iÃ…Å¸: her ikisini de paralel ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n

## Gizlilik

- GÃƒÂ¶zlemler makinenizde **yerel** kalÃ„Â±r
- Proje kapsamlÃ„Â± instinct'ler proje baÃ…Å¸Ã„Â±na izoledir
- Sadece **instinct'ler** (kalÃ„Â±plar) dÃ„Â±Ã…Å¸a aktarÃ„Â±labilir Ã¢â‚¬â€ ham gÃƒÂ¶zlemler deÃ„Å¸il
- GerÃƒÂ§ek kod veya konuÃ…Å¸ma iÃƒÂ§eriÃ„Å¸i paylaÃ…Å¸Ã„Â±lmaz
- Neyin dÃ„Â±Ã…Å¸a aktarÃ„Â±lacaÃ„Å¸Ã„Â±nÃ„Â± ve yÃƒÂ¼kseltileceÃ„Å¸ini siz kontrol edersiniz

## Ã„Â°lgili

- [ECC-Tools GitHub App](https://github.com/apps/ecc-tools) - Repo geÃƒÂ§miÃ…Å¸inden instinct'ler oluÃ…Å¸tur
- Homunculus - v2 instinct tabanlÃ„Â± mimariye ilham veren topluluk projesi (atomik gÃƒÂ¶zlemler, gÃƒÂ¼ven skorlamasÃ„Â±, instinct evrim hattÃ„Â±)
- [The Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - SÃƒÂ¼rekli ÃƒÂ¶Ã„Å¸renme bÃƒÂ¶lÃƒÂ¼mÃƒÂ¼

---

*Instinct tabanlÃ„Â± ÃƒÂ¶Ã„Å¸renme: Claude'a kalÃ„Â±plarÃ„Â±nÃ„Â±zÃ„Â± ÃƒÂ¶Ã„Å¸retmek, her seferinde bir proje.*
