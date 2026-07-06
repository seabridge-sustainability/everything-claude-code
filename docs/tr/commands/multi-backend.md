# Backend - Backend OdaklÃ„Â± GeliÃ…Å¸tirme

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


Backend odaklÃ„Â± iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± (Research Ã¢â€ â€™ Ideation Ã¢â€ â€™ Plan Ã¢â€ â€™ Execute Ã¢â€ â€™ Optimize Ã¢â€ â€™ Review), Codex liderliÃ„Å¸inde.

## KullanÃ„Â±m

```bash
/backend <backend task aÃƒÂ§Ã„Â±klamasÃ„Â±>
```

## Context

- Backend task: $ARGUMENTS
- Codex liderliÃ„Å¸inde, Gemini yardÃ„Â±mcÃ„Â± referans iÃƒÂ§in
- Uygulanabilir: API tasarÃ„Â±mÃ„Â±, algoritma implementasyonu, veritabanÃ„Â± optimizasyonu, business logic

## RolÃƒÂ¼nÃƒÂ¼z

**Backend OrkestratÃƒÂ¶r**sÃƒÂ¼nÃƒÂ¼z, sunucu tarafÃ„Â± gÃƒÂ¶revler iÃƒÂ§in multi-model iÃ…Å¸birliÃ„Å¸ini koordine ediyorsunuz (Research Ã¢â€ â€™ Ideation Ã¢â€ â€™ Plan Ã¢â€ â€™ Execute Ã¢â€ â€™ Optimize Ã¢â€ â€™ Review).

**Ã„Â°Ã…Å¸birlikÃƒÂ§i Modeller**:
- **Codex** Ã¢â‚¬â€œ Backend logic, algoritmalar (**Backend otoritesi, gÃƒÂ¼venilir**)
- **Gemini** Ã¢â‚¬â€œ Frontend perspektifi (**Backend gÃƒÂ¶rÃƒÂ¼Ã…Å¸leri sadece referans iÃƒÂ§in**)
- **Claude (self)** Ã¢â‚¬â€œ Orkestrasyon, planlama, execution, teslimat

---

## Multi-Model Ãƒâ€¡aÃ„Å¸rÃ„Â± Spesifikasyonu

**Ãƒâ€¡aÃ„Å¸rÃ„Â± SÃƒÂ¶zdizimi**:

```
# Yeni session ÃƒÂ§aÃ„Å¸rÃ„Â±sÃ„Â±
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend codex - \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
<TASK>
Requirement: <enhanced requirement (veya enhance edilmediyse $ARGUMENTS)>
Context: <ÃƒÂ¶nceki fazlardan proje context'i ve analiz>
</TASK>
OUTPUT: Expected output format
EOF",
  run_in_background: false,
  timeout: 3600000,
  description: "Brief description"
})

# Session devam ettirme ÃƒÂ§aÃ„Å¸rÃ„Â±sÃ„Â±
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend codex resume <SESSION_ID> - \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
<TASK>
Requirement: <enhanced requirement (veya enhance edilmediyse $ARGUMENTS)>
Context: <ÃƒÂ¶nceki fazlardan proje context'i ve analiz>
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

**Session Reuse**: Her ÃƒÂ§aÃ„Å¸rÃ„Â± `SESSION_ID: xxx` dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r, sonraki fazlar iÃƒÂ§in `resume xxx` kullan. Phase 2'de `CODEX_SESSION` kaydet, Phase 3 ve 5'te `resume` kullan.

---

## Ã„Â°letiÃ…Å¸im YÃƒÂ¶nergeleri

1. YanÃ„Â±tlara mode etiketi `[Mode: X]` ile baÃ…Å¸la, ilk `[Mode: Research]`
2. KatÃ„Â± sÃ„Â±ra takip et: `Research Ã¢â€ â€™ Ideation Ã¢â€ â€™ Plan Ã¢â€ â€™ Execute Ã¢â€ â€™ Optimize Ã¢â€ â€™ Review`
3. GerektiÃ„Å¸inde kullanÃ„Â±cÃ„Â± etkileÃ…Å¸imi iÃƒÂ§in `AskUserQuestion` tool kullan (ÃƒÂ¶rn., onay/seÃƒÂ§im/approval)

---

## Ana Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

### Phase 0: Prompt Enhancement (Ã„Â°steÃ„Å¸e BaÃ„Å¸lÃ„Â±)

`[Mode: Prepare]` - ace-tool MCP mevcutsa, `mcp__ace-tool__enhance_prompt` ÃƒÂ§aÃ„Å¸Ã„Â±r, **orijinal $ARGUMENTS'Ã„Â± sonraki Codex ÃƒÂ§aÃ„Å¸rÃ„Â±larÃ„Â± iÃƒÂ§in enhanced sonuÃƒÂ§la deÃ„Å¸iÃ…Å¸tir**. Mevcut deÃ„Å¸ilse, `$ARGUMENTS`'Ã„Â± olduÃ„Å¸u gibi kullan.

### Phase 1: Research

`[Mode: Research]` - Requirement'larÃ„Â± anla ve context topla

1. **Code Retrieval** (ace-tool MCP mevcutsa): Mevcut API'leri, veri modellerini, servis mimarisini almak iÃƒÂ§in `mcp__ace-tool__search_context` ÃƒÂ§aÃ„Å¸Ã„Â±r. Mevcut deÃ„Å¸ilse, built-in tool'larÃ„Â± kullan: dosya keÃ…Å¸fi iÃƒÂ§in `Glob`, sembol/API aramasÃ„Â± iÃƒÂ§in `Grep`, context toplama iÃƒÂ§in `Read`, daha derin keÃ…Å¸if iÃƒÂ§in `Task` (Explore agent).
2. Requirement tamamlÃ„Â±lÃ„Â±k skoru (0-10): >=7 devam et, <7 dur ve tamamla

### Phase 2: Ideation

`[Mode: Ideation]` - Codex liderliÃ„Å¸inde analiz

**Codex'i MUTLAKA ÃƒÂ§aÃ„Å¸Ã„Â±r** (yukarÃ„Â±daki ÃƒÂ§aÃ„Å¸rÃ„Â± spesifikasyonunu takip et):
- ROLE_FILE: `~/.claude/.ccg/prompts/codex/analyzer.md`
- Requirement: Enhanced requirement (veya enhance edilmediyse $ARGUMENTS)
- Context: Phase 1'den proje context'i
- OUTPUT: Teknik fizibilite analizi, ÃƒÂ¶nerilen ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mler (en az 2), risk deÃ„Å¸erlendirmesi

**SESSION_ID'yi kaydet** (`CODEX_SESSION`) sonraki faz yeniden kullanÃ„Â±mÃ„Â± iÃƒÂ§in.

Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼mleri ÃƒÂ§Ã„Â±ktÃ„Â±la (en az 2), kullanÃ„Â±cÃ„Â± seÃƒÂ§imini bekle.

### Phase 3: Planning

`[Mode: Plan]` - Codex liderliÃ„Å¸inde planlama

**Codex'i MUTLAKA ÃƒÂ§aÃ„Å¸Ã„Â±r** (session'Ã„Â± yeniden kullanmak iÃƒÂ§in `resume <CODEX_SESSION>` kullan):
- ROLE_FILE: `~/.claude/.ccg/prompts/codex/architect.md`
- Requirement: KullanÃ„Â±cÃ„Â±nÃ„Â±n seÃƒÂ§tiÃ„Å¸i ÃƒÂ§ÃƒÂ¶zÃƒÂ¼m
- Context: Phase 2'den analiz sonuÃƒÂ§larÃ„Â±
- OUTPUT: Dosya yapÃ„Â±sÃ„Â±, fonksiyon/sÃ„Â±nÃ„Â±f tasarÃ„Â±mÃ„Â±, baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k iliÃ…Å¸kileri

Claude planÃ„Â± sentezler, kullanÃ„Â±cÃ„Â± onayÃ„Â±ndan sonra `.claude/plan/task-name.md`'ye kaydet.

### Phase 4: Implementation

`[Mode: Execute]` - Kod geliÃ…Å¸tirme

- Onaylanan planÃ„Â± kesinlikle takip et
- Mevcut proje kod standartlarÃ„Â±nÃ„Â± takip et
- Hata iÃ…Å¸leme, gÃƒÂ¼venlik, performans optimizasyonu saÃ„Å¸la

### Phase 5: Optimization

`[Mode: Optimize]` - Codex liderliÃ„Å¸inde review

**Codex'i MUTLAKA ÃƒÂ§aÃ„Å¸Ã„Â±r** (yukarÃ„Â±daki ÃƒÂ§aÃ„Å¸rÃ„Â± spesifikasyonunu takip et):
- ROLE_FILE: `~/.claude/.ccg/prompts/codex/reviewer.md`
- Requirement: AÃ…Å¸aÃ„Å¸Ã„Â±daki backend kod deÃ„Å¸iÃ…Å¸ikliklerini incele
- Context: git diff veya kod iÃƒÂ§eriÃ„Å¸i
- OUTPUT: GÃƒÂ¼venlik, performans, hata iÃ…Å¸leme, API uyumu sorunlar listesi

Review geri bildirimlerini entegre et, kullanÃ„Â±cÃ„Â± onayÃ„Â±ndan sonra optimizasyonu ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r.

### Phase 6: Quality Review

`[Mode: Review]` - Nihai deÃ„Å¸erlendirme

- Plana karÃ…Å¸Ã„Â± tamamlÃ„Â±lÃ„Â±Ã„Å¸Ã„Â± kontrol et
- Fonksiyonaliteyi doÃ„Å¸rulamak iÃƒÂ§in test'leri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
- SorunlarÃ„Â± ve ÃƒÂ¶nerileri raporla

---

## Ana Kurallar

1. **Codex backend gÃƒÂ¶rÃƒÂ¼Ã…Å¸leri gÃƒÂ¼venilir**
2. **Gemini backend gÃƒÂ¶rÃƒÂ¼Ã…Å¸leri sadece referans iÃƒÂ§in**
3. Harici modellerin **sÃ„Â±fÃ„Â±r dosya sistemi yazma eriÃ…Å¸imi**
4. Claude tÃƒÂ¼m kod yazma ve dosya operasyonlarÃ„Â±nÃ„Â± yÃƒÂ¶netir
