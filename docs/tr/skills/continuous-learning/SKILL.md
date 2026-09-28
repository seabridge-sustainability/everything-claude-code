---
name: continuous-learning
description: Claude Code oturumlarından yeniden kullanılabilir kalıpları otomatik olarak çıkarın ve gelecekte kullanmak üzere öğrenilmiş skill'ler olarak kaydedin.
origin: ECC
---

# Sürekli Öğrenme Skill'i

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


Claude Code oturumlarını sonunda otomatik olarak değerlendirir ve öğrenilmiş skill'ler olarak kaydedilebilecek yeniden kullanılabilir kalıpları çıkarır.

## Ne Zaman Aktifleştirmelisiniz

- Claude Code oturumlarından otomatik kalıp çıkarma ayarlarken
- Oturum değerlendirmesi için Stop hook'u yapılandırırken
- `~/.claude/skills/learned/` içindeki öğrenilmiş skill'leri incelerken veya düzenlerken
- Çıkarma eşiklerini veya kalıp kategorilerini ayarlarken
- v1 (bu) ile v2 (instinct tabanlı) yaklaşımlarını karşılaştırırken

## Nasıl Çalışır

Bu skill her oturumun sonunda **Stop hook** olarak çalışır:

1. **Oturum Değerlendirmesi**: Oturumun yeterli mesaja sahip olup olmadığını kontrol eder (varsayılan: 10+)
2. **Kalıp Tespiti**: Oturumdan çıkarılabilir kalıpları tanımlar
3. **Skill Çıkarma**: Yararlı kalıpları `~/.claude/skills/learned/` dizinine kaydeder

## Konfigürasyon

Özelleştirmek için `config.json` dosyasını düzenleyin:

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

## Kalıp Tipleri

| Kalıp | Açıklama |
|---------|-------------|
| `error_resolution` | Belirli hataların nasıl çözüldüğü |
| `user_corrections` | Kullanıcı düzeltmelerinden kalıplar |
| `workarounds` | Framework/kütüphane tuhaflıklarına çözümler |
| `debugging_techniques` | Etkili hata ayıklama yaklaşımları |
| `project_specific` | Projeye özgü kurallar |

## Hook Kurulumu

`~/.claude/settings.json` dosyanıza ekleyin:

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

- **Hafif**: Oturum sonunda bir kez çalışır
- **Bloke Etmeyen**: Her mesaja gecikme eklemez
- **Tam Bağlam**: Tam oturum kaydına erişimi vardır

## İlgili

- [The Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - Sürekli öğrenme bölümü
- `/learn` komutu - Oturum ortasında manuel kalıp çıkarma

---

## Karşılaştırma Notları (Araştırma: Ocak 2025)

### vs Homunculus

Homunculus v2 daha sofistike bir yaklaşım benimsiyor:

| Özellik | Bizim Yaklaşım | Homunculus v2 |
|---------|--------------|---------------|
| Gözlem | Stop hook (oturum sonu) | PreToolUse/PostToolUse hooks (%100 güvenilir) |
| Analiz | Ana bağlam | Arka plan agent'ı (Haiku) |
| Granülerlik | Tam skill'ler | Atomik "instinct'ler" |
| Güven | Yok | 0.3-0.9 ağırlıklı |
| Evrim | Doğrudan skill'e | Instinct'ler → kümeleme → skill/command/agent |
| Paylaşım | Yok | Instinct'leri dışa/içe aktar |

**Homunculus'tan temel içgörü:**
> "v1 gözlem için skill'lere güveniyordu. Skill'ler olasılıksaldır—zamanın ~%50-80'inde tetiklenirler. v2 gözlem için hook'ları kullanır (%100 güvenilir) ve öğrenilmiş davranışın atomik birimi olarak instinct'leri kullanır."

### Potansiyel v2 İyileştirmeleri

1. **Instinct tabanlı öğrenme** - Güven skorlaması ile daha küçük, atomik davranışlar
2. **Arka plan gözlemcisi** - Paralel analiz yapan Haiku agent'ı
3. **Güven azalması** - Çelişkiye uğrarsa instinct'ler güven kaybeder
4. **Alan etiketleme** - code-style, testing, git, debugging, vb.
5. **Evrim yolu** - İlgili instinct'leri skill/command'lara kümeleme

Bkz: Tam spec için `docs/continuous-learning-v2-spec.md`.
