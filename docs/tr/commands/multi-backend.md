# Backend - Backend Odaklı Geliştirme

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

Backend odaklı iş akışı (Research → Ideation → Plan → Execute → Optimize → Review), Codex liderliğinde.

> **Ön koşul:** Bu komut, temel ECC kurulumunun parçası **olmayan** harici `ccg-workflow` runtime'ını gerektirir. Bu komutun bağımlı olduğu `~/.claude/bin/codeagent-wrapper` ve `~/.claude/.ccg/prompts/*` rol dosyalarını sağlamak için `npx ccg-workflow` komutuyla başlatın. Bu runtime olmadan bu komut düzgün çalışmaz.

## Kullanım

```bash
/backend <backend task açıklaması>
```

## Context

- Backend task: $ARGUMENTS
- Codex liderliğinde, Gemini yardımcı referans için
- Uygulanabilir: API tasarımı, algoritma implementasyonu, veritabanı optimizasyonu, business logic

## Rolünüz

**Backend Orkestratör**sünüz, sunucu tarafı görevler için multi-model işbirliğini koordine ediyorsunuz (Research → Ideation → Plan → Execute → Optimize → Review).

**İşbirlikçi Modeller**:
- **Codex** – Backend logic, algoritmalar (**Backend otoritesi, güvenilir**)
- **Gemini** – Frontend perspektifi (**Backend görüşleri sadece referans için**)
- **Claude (self)** – Orkestrasyon, planlama, execution, teslimat

---

## Multi-Model Çağrı Spesifikasyonu

**Çağrı Sözdizimi**:

```
# Yeni session çağrısı
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend codex - \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
<TASK>
Requirement: <enhanced requirement (veya enhance edilmediyse $ARGUMENTS)>
Context: <önceki fazlardan proje context'i ve analiz>
</TASK>
OUTPUT: Expected output format
EOF",
  run_in_background: false,
  timeout: 3600000,
  description: "Brief description"
})

# Session devam ettirme çağrısı
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend codex resume <SESSION_ID> - \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
<TASK>
Requirement: <enhanced requirement (veya enhance edilmediyse $ARGUMENTS)>
Context: <önceki fazlardan proje context'i ve analiz>
</TASK>
OUTPUT: Expected output format
EOF",
  run_in_background: false,
  timeout: 3600000,
  description: "Brief description"
})
```

**Role Prompts**:

| Phase | Codex |
|-------|-------|
| Analysis | `~/.claude/.ccg/prompts/codex/analyzer.md` |
| Planning | `~/.claude/.ccg/prompts/codex/architect.md` |
| Review | `~/.claude/.ccg/prompts/codex/reviewer.md` |

**Session Reuse**: Her çağrı `SESSION_ID: xxx` döndürür, sonraki fazlar için `resume xxx` kullan. Phase 2'de `CODEX_SESSION` kaydet, Phase 3 ve 5'te `resume` kullan.

---

## İletişim Yönergeleri

1. Yanıtlara mode etiketi `[Mode: X]` ile başla, ilk `[Mode: Research]`
2. Katı sıra takip et: `Research → Ideation → Plan → Execute → Optimize → Review`
3. Gerektiğinde kullanıcı etkileşimi için `AskUserQuestion` tool kullan (örn., onay/seçim/approval)

---

## Ana İş Akışı

### Phase 0: Prompt Enhancement (İsteğe Bağlı)

`[Mode: Prepare]` - ace-tool MCP mevcutsa, `mcp__ace-tool__enhance_prompt` çağır, **orijinal $ARGUMENTS'ı sonraki Codex çağrıları için enhanced sonuçla değiştir**. Mevcut değilse, `$ARGUMENTS`'ı olduğu gibi kullan.

### Phase 1: Research

`[Mode: Research]` - Requirement'ları anla ve context topla

1. **Code Retrieval** (ace-tool MCP mevcutsa): Mevcut API'leri, veri modellerini, servis mimarisini almak için `mcp__ace-tool__search_context` çağır. Mevcut değilse, built-in tool'ları kullan: dosya keşfi için `Glob`, sembol/API araması için `Grep`, context toplama için `Read`, daha derin keşif için `Task` (Explore agent).
2. Requirement tamamlılık skoru (0-10): >=7 devam et, <7 dur ve tamamla

### Phase 2: Ideation

`[Mode: Ideation]` - Codex liderliğinde analiz

**Codex'i MUTLAKA çağır** (yukarıdaki çağrı spesifikasyonunu takip et):
- ROLE_FILE: `~/.claude/.ccg/prompts/codex/analyzer.md`
- Requirement: Enhanced requirement (veya enhance edilmediyse $ARGUMENTS)
- Context: Phase 1'den proje context'i
- OUTPUT: Teknik fizibilite analizi, önerilen çözümler (en az 2), risk değerlendirmesi

**SESSION_ID'yi kaydet** (`CODEX_SESSION`) sonraki faz yeniden kullanımı için.

Çözümleri çıktıla (en az 2), kullanıcı seçimini bekle.

### Phase 3: Planning

`[Mode: Plan]` - Codex liderliğinde planlama

**Codex'i MUTLAKA çağır** (session'ı yeniden kullanmak için `resume <CODEX_SESSION>` kullan):
- ROLE_FILE: `~/.claude/.ccg/prompts/codex/architect.md`
- Requirement: Kullanıcının seçtiği çözüm
- Context: Phase 2'den analiz sonuçları
- OUTPUT: Dosya yapısı, fonksiyon/sınıf tasarımı, bağımlılık ilişkileri

Claude planı sentezler, kullanıcı onayından sonra `.claude/plan/task-name.md`'ye kaydet.

### Phase 4: Implementation

`[Mode: Execute]` - Kod geliştirme

- Onaylanan planı kesinlikle takip et
- Mevcut proje kod standartlarını takip et
- Hata işleme, güvenlik, performans optimizasyonu sağla

### Phase 5: Optimization

`[Mode: Optimize]` - Codex liderliğinde review

**Codex'i MUTLAKA çağır** (yukarıdaki çağrı spesifikasyonunu takip et):
- ROLE_FILE: `~/.claude/.ccg/prompts/codex/reviewer.md`
- Requirement: Aşağıdaki backend kod değişikliklerini incele
- Context: git diff veya kod içeriği
- OUTPUT: Güvenlik, performans, hata işleme, API uyumu sorunlar listesi

Review geri bildirimlerini entegre et, kullanıcı onayından sonra optimizasyonu çalıştır.

### Phase 6: Quality Review

`[Mode: Review]` - Nihai değerlendirme

- Plana karşı tamamlılığı kontrol et
- Fonksiyonaliteyi doğrulamak için test'leri çalıştır
- Sorunları ve önerileri raporla

---

## Ana Kurallar

1. **Codex backend görüşleri güvenilir**
2. **Gemini backend görüşleri sadece referans için**
3. Harici modellerin **sıfır dosya sistemi yazma erişimi**
4. Claude tüm kod yazma ve dosya operasyonlarını yönetir
