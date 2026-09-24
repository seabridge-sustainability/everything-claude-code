---
name: continuous-learning
description: Claude Code oturumlarÃ„Â±ndan yeniden kullanÃ„Â±labilir kalÃ„Â±plarÃ„Â± otomatik olarak ÃƒÂ§Ã„Â±karÃ„Â±n ve gelecekte kullanmak ÃƒÂ¼zere ÃƒÂ¶Ã„Å¸renilmiÃ…Å¸ skill'ler olarak kaydedin.
origin: ECC
---

# SÃƒÂ¼rekli Ãƒâ€“Ã„Å¸renme Skill'i

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
