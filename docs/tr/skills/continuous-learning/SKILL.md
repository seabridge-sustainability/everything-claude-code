---
name: continuous-learning
description: Claude Code oturumlarÃ„Â±ndan yeniden kullanÃ„Â±labilir kalÃ„Â±plarÃ„Â± otomatik olarak ÃƒÂ§Ã„Â±karÃ„Â±n ve gelecekte kullanmak ÃƒÂ¼zere ÃƒÂ¶Ã„Å¸renilmiÃ…Å¸ skill'ler olarak kaydedin.
origin: ECC
---

# SÃƒÂ¼rekli Ãƒâ€“Ã„Å¸renme Skill'i

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Claude Code oturumlarÃ„Â±nÃ„Â± sonunda otomatik olarak deÃ„Å¸erlendirir ve ÃƒÂ¶Ã„Å¸renilmiÃ…Å¸ skill'ler olarak kaydedilebilecek yeniden kullanÃ„Â±labilir kalÃ„Â±plarÃ„Â± ÃƒÂ§Ã„Â±karÃ„Â±r.

## Ne Zaman AktifleÃ…Å¸tirmelisiniz

- Claude Code oturumlarÃ„Â±ndan otomatik kalÃ„Â±p ÃƒÂ§Ã„Â±karma ayarlarken
- Oturum deÃ„Å¸erlendirmesi iÃƒÂ§in Stop hook'u yapÃ„Â±landÃ„Â±rÃ„Â±rken
- `~/.claude/skills/learned/` iÃƒÂ§indeki ÃƒÂ¶Ã„Å¸renilmiÃ…Å¸ skill'leri incelerken veya dÃƒÂ¼zenlerken
- Ãƒâ€¡Ã„Â±karma eÃ…Å¸iklerini veya kalÃ„Â±p kategorilerini ayarlarken
- v1 (bu) ile v2 (instinct tabanlÃ„Â±) yaklaÃ…Å¸Ã„Â±mlarÃ„Â±nÃ„Â± karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rÃ„Â±rken

## NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r

Bu skill her oturumun sonunda **Stop hook** olarak ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r:

1. **Oturum DeÃ„Å¸erlendirmesi**: Oturumun yeterli mesaja sahip olup olmadÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± kontrol eder (varsayÃ„Â±lan: 10+)
2. **KalÃ„Â±p Tespiti**: Oturumdan ÃƒÂ§Ã„Â±karÃ„Â±labilir kalÃ„Â±plarÃ„Â± tanÃ„Â±mlar
3. **Skill Ãƒâ€¡Ã„Â±karma**: YararlÃ„Â± kalÃ„Â±plarÃ„Â± `~/.claude/skills/learned/` dizinine kaydeder

## KonfigÃƒÂ¼rasyon

Ãƒâ€“zelleÃ…Å¸tirmek iÃƒÂ§in `config.json` dosyasÃ„Â±nÃ„Â± dÃƒÂ¼zenleyin:

```json
{
  "min_session_length": 10,
  "extraction_threshold": "medium",
  "auto_approve": false,
  "learned_skills_path": "~/.claude/skills/learned/",
  "patterns_to_detect": [
    "error_resolution",
    "user_corrections",
    "workarounds",
    "debugging_techniques",
    "project_specific"
  ],
  "ignore_patterns": [
    "simple_typos",
    "one_time_fixes",
    "external_api_issues"
  ]
}
```

## KalÃ„Â±p Tipleri

| KalÃ„Â±p | AÃƒÂ§Ã„Â±klama |
|---------|-------------|
| `error_resolution` | Belirli hatalarÃ„Â±n nasÃ„Â±l ÃƒÂ§ÃƒÂ¶zÃƒÂ¼ldÃƒÂ¼Ã„Å¸ÃƒÂ¼ |
| `user_corrections` | KullanÃ„Â±cÃ„Â± dÃƒÂ¼zeltmelerinden kalÃ„Â±plar |
| `workarounds` | Framework/kÃƒÂ¼tÃƒÂ¼phane tuhaflÃ„Â±klarÃ„Â±na ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mler |
| `debugging_techniques` | Etkili hata ayÃ„Â±klama yaklaÃ…Å¸Ã„Â±mlarÃ„Â± |
| `project_specific` | Projeye ÃƒÂ¶zgÃƒÂ¼ kurallar |

## Hook Kurulumu

`~/.claude/settings.json` dosyanÃ„Â±za ekleyin:

```json
{
  "hooks": {
    "Stop": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/continuous-learning/evaluate-session.sh"
      }]
    }]
  }
}
```

## Neden Stop Hook?

- **Hafif**: Oturum sonunda bir kez ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r
- **Bloke Etmeyen**: Her mesaja gecikme eklemez
- **Tam BaÃ„Å¸lam**: Tam oturum kaydÃ„Â±na eriÃ…Å¸imi vardÃ„Â±r

## Ã„Â°lgili

- [The Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - SÃƒÂ¼rekli ÃƒÂ¶Ã„Å¸renme bÃƒÂ¶lÃƒÂ¼mÃƒÂ¼
- `/learn` komutu - Oturum ortasÃ„Â±nda manuel kalÃ„Â±p ÃƒÂ§Ã„Â±karma

---

## KarÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rma NotlarÃ„Â± (AraÃ…Å¸tÃ„Â±rma: Ocak 2025)

### vs Homunculus

Homunculus v2 daha sofistike bir yaklaÃ…Å¸Ã„Â±m benimsiyor:

| Ãƒâ€“zellik | Bizim YaklaÃ…Å¸Ã„Â±m | Homunculus v2 |
|---------|--------------|---------------|
| GÃƒÂ¶zlem | Stop hook (oturum sonu) | PreToolUse/PostToolUse hooks (%100 gÃƒÂ¼venilir) |
| Analiz | Ana baÃ„Å¸lam | Arka plan agent'Ã„Â± (Haiku) |
| GranÃƒÂ¼lerlik | Tam skill'ler | Atomik "instinct'ler" |
| GÃƒÂ¼ven | Yok | 0.3-0.9 aÃ„Å¸Ã„Â±rlÃ„Â±klÃ„Â± |
| Evrim | DoÃ„Å¸rudan skill'e | Instinct'ler Ã¢â€ â€™ kÃƒÂ¼meleme Ã¢â€ â€™ skill/command/agent |
| PaylaÃ…Å¸Ã„Â±m | Yok | Instinct'leri dÃ„Â±Ã…Å¸a/iÃƒÂ§e aktar |

**Homunculus'tan temel iÃƒÂ§gÃƒÂ¶rÃƒÂ¼:**
> "v1 gÃƒÂ¶zlem iÃƒÂ§in skill'lere gÃƒÂ¼veniyordu. Skill'ler olasÃ„Â±lÃ„Â±ksaldÃ„Â±rÃ¢â‚¬â€zamanÃ„Â±n ~%50-80'inde tetiklenirler. v2 gÃƒÂ¶zlem iÃƒÂ§in hook'larÃ„Â± kullanÃ„Â±r (%100 gÃƒÂ¼venilir) ve ÃƒÂ¶Ã„Å¸renilmiÃ…Å¸ davranÃ„Â±Ã…Å¸Ã„Â±n atomik birimi olarak instinct'leri kullanÃ„Â±r."

### Potansiyel v2 Ã„Â°yileÃ…Å¸tirmeleri

1. **Instinct tabanlÃ„Â± ÃƒÂ¶Ã„Å¸renme** - GÃƒÂ¼ven skorlamasÃ„Â± ile daha kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k, atomik davranÃ„Â±Ã…Å¸lar
2. **Arka plan gÃƒÂ¶zlemcisi** - Paralel analiz yapan Haiku agent'Ã„Â±
3. **GÃƒÂ¼ven azalmasÃ„Â±** - Ãƒâ€¡eliÃ…Å¸kiye uÃ„Å¸rarsa instinct'ler gÃƒÂ¼ven kaybeder
4. **Alan etiketleme** - code-style, testing, git, debugging, vb.
5. **Evrim yolu** - Ã„Â°lgili instinct'leri skill/command'lara kÃƒÂ¼meleme

Bkz: Tam spec iÃƒÂ§in `docs/continuous-learning-v2-spec.md`.
