# Workflow - Multi-Model Ã„Â°Ã…Å¸birlikÃƒÂ§i GeliÃ…Å¸tirme

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


Multi-model iÃ…Å¸birlikÃƒÂ§i geliÃ…Å¸tirme iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± (Research Ã¢â€ â€™ Ideation Ã¢â€ â€™ Plan Ã¢â€ â€™ Execute Ã¢â€ â€™ Optimize Ã¢â€ â€™ Review), akÃ„Â±llÃ„Â± yÃƒÂ¶nlendirme ile: Frontend Ã¢â€ â€™ Gemini, Backend Ã¢â€ â€™ Codex.

Kalite kontrol noktalarÃ„Â±, MCP servisleri ve multi-model iÃ…Å¸birliÃ„Å¸i ile yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ geliÃ…Å¸tirme iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±.

## KullanÃ„Â±m

```bash
/workflow <task aÃƒÂ§Ã„Â±klamasÃ„Â±>
```

## Context

- GeliÃ…Å¸tirilecek gÃƒÂ¶rev: $ARGUMENTS
- Kalite kontrol noktalarÃ„Â±yla 6 fazlÃ„Â± yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±
- Multi-model iÃ…Å¸birliÃ„Å¸i: Codex (backend) + Gemini (frontend) + Claude (orkestrasyon)
- MCP servis entegrasyonu (ace-tool, isteÃ„Å¸e baÃ„Å¸lÃ„Â±) geliÃ…Å¸miÃ…Å¸ yetenekler iÃƒÂ§in

## RolÃƒÂ¼nÃƒÂ¼z

**OrkestratÃƒÂ¶r**sÃƒÂ¼nÃƒÂ¼z, multi-model iÃ…Å¸birlikÃƒÂ§i sistemi koordine ediyorsunuz (Research Ã¢â€ â€™ Ideation Ã¢â€ â€™ Plan Ã¢â€ â€™ Execute Ã¢â€ â€™ Optimize Ã¢â€ â€™ Review). Deneyimli geliÃ…Å¸tiriciler iÃƒÂ§in kÃ„Â±sa ve profesyonel iletiÃ…Å¸im kurun.

**Ã„Â°Ã…Å¸birlikÃƒÂ§i Modeller**:
- **ace-tool MCP** (isteÃ„Å¸e baÃ„Å¸lÃ„Â±) Ã¢â‚¬â€œ Code retrieval + Prompt enhancement
- **Codex** Ã¢â‚¬â€œ Backend logic, algoritmalar, debugging (**Backend otoritesi, gÃƒÂ¼venilir**)
- **Gemini** Ã¢â‚¬â€œ Frontend UI/UX, gÃƒÂ¶rsel tasarÃ„Â±m (**Frontend uzmanÃ„Â±, backend gÃƒÂ¶rÃƒÂ¼Ã…Å¸leri sadece referans iÃƒÂ§in**)
- **Claude (self)** Ã¢â‚¬â€œ Orkestrasyon, planlama, execution, teslimat

---

## Multi-Model Ãƒâ€¡aÃ„Å¸rÃ„Â± Spesifikasyonu

**Ãƒâ€¡aÃ„Å¸rÃ„Â± sÃƒÂ¶zdizimi** (parallel: `run_in_background: true`, sequential: `false`):

```
# Yeni session ÃƒÂ§aÃ„Å¸rÃ„Â±sÃ„Â±
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend <codex|gemini> {{GEMINI_MODEL_FLAG}}- \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
<TASK>
Requirement: <enhanced requirement (veya enhance edilmediyse $ARGUMENTS)>
Context: <ÃƒÂ¶nceki fazlardan proje context'i ve analiz>
</TASK>
OUTPUT: Expected output format
EOF",
  run_in_background: true,
  timeout: 3600000,
  description: "Brief description"
})

# Session devam ettirme ÃƒÂ§aÃ„Å¸rÃ„Â±sÃ„Â±
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend <codex|gemini> {{GEMINI_MODEL_FLAG}}resume <SESSION_ID> - \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
<TASK>
Requirement: <enhanced requirement (veya enhance edilmediyse $ARGUMENTS)>
Context: <ÃƒÂ¶nceki fazlardan proje context'i ve analiz>
</TASK>
OUTPUT: Expected output format
EOF",
  run_in_background: true,
  timeout: 3600000,
  description: "Brief description"
})
```

**Model Parametre NotlarÃ„Â±**:
- `{{GEMINI_MODEL_FLAG}}`: `--backend gemini` kullanÃ„Â±rken, `--gemini-model gemini-3-pro-preview` ile deÃ„Å¸iÃ…Å¸tir (trailing space not edin); codex iÃƒÂ§in boÃ…Å¸ string kullan

**Role Prompts**:

| Phase | Codex | Gemini |
|-------|-------|--------|
| Analysis | `~/.claude/.ccg/prompts/codex/analyzer.md` | `~/.claude/.ccg/prompts/gemini/analyzer.md` |
| Planning | `~/.claude/.ccg/prompts/codex/architect.md` | `~/.claude/.ccg/prompts/gemini/architect.md` |
| Review | `~/.claude/.ccg/prompts/codex/reviewer.md` | `~/.claude/.ccg/prompts/gemini/reviewer.md` |

**Session Reuse**: Her ÃƒÂ§aÃ„Å¸rÃ„Â± `SESSION_ID: xxx` dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r, sonraki fazlar iÃƒÂ§in `resume xxx` subcommand kullan (not: `resume`, `--resume` deÃ„Å¸il).

**Parallel Ãƒâ€¡aÃ„Å¸rÃ„Â±lar**: BaÃ…Å¸latmak iÃƒÂ§in `run_in_background: true` kullan, sonuÃƒÂ§larÃ„Â± `TaskOutput` ile bekle. **Bir sonraki faza geÃƒÂ§meden ÃƒÂ¶nce tÃƒÂ¼m modellerin dÃƒÂ¶nmesini MUTLAKA bekle**.

**Background Task'leri Bekle** (max timeout 600000ms = 10 dakika kullan):

```
TaskOutput({ task_id: "<task_id>", block: true, timeout: 600000 })
```

**Ãƒâ€“NEMLÃ„Â°**:
- `timeout: 600000` belirtilmeli, aksi takdirde varsayÃ„Â±lan 30 saniye erken timeout'a neden olur.
- 10 dakika sonra hala tamamlanmamÃ„Â±Ã…Å¸sa, `TaskOutput` ile polling'e devam et, **ASLA process'i ÃƒÂ¶ldÃƒÂ¼rme**.
- Bekleme timeout nedeniyle atlanÃ„Â±rsa, **MUTLAKA `AskUserQuestion` ÃƒÂ§aÃ„Å¸Ã„Â±rarak kullanÃ„Â±cÃ„Â±ya beklemeye devam etmek veya task'i ÃƒÂ¶ldÃƒÂ¼rmek isteyip istemediÃ„Å¸ini sor. Asla doÃ„Å¸rudan ÃƒÂ¶ldÃƒÂ¼rme.**

---

## Ã„Â°letiÃ…Å¸im YÃƒÂ¶nergeleri

1. YanÃ„Â±tlara mode etiketi `[Mode: X]` ile baÃ…Å¸la, ilk `[Mode: Research]`.
2. KatÃ„Â± sÃ„Â±ra takip et: `Research Ã¢â€ â€™ Ideation Ã¢â€ â€™ Plan Ã¢â€ â€™ Execute Ã¢â€ â€™ Optimize Ã¢â€ â€™ Review`.
3. Her faz tamamlandÃ„Â±ktan sonra kullanÃ„Â±cÃ„Â± onayÃ„Â± iste.
4. Skor < 7 veya kullanÃ„Â±cÃ„Â± onaylamadÃ„Â±Ã„Å¸Ã„Â±nda zorla durdur.
5. GerektiÃ„Å¸inde kullanÃ„Â±cÃ„Â± etkileÃ…Å¸imi iÃƒÂ§in `AskUserQuestion` tool kullan (ÃƒÂ¶rn., onay/seÃƒÂ§im/approval).

## Harici Orkestrasyon Ne Zaman KullanÃ„Â±lÃ„Â±r

Ã„Â°Ã…Å¸ paralel worker'lar arasÃ„Â±nda bÃƒÂ¶lÃƒÂ¼nmesi gerektiÃ„Å¸inde harici tmux/worktree orkestrasyonu kullan; bu worker'larÃ„Â±n izole git state'i, baÃ„Å¸Ã„Â±msÃ„Â±z terminalleri veya ayrÃ„Â± build/test ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmasÃ„Â± gerekir. Hafif analiz, planlama veya review iÃƒÂ§in in-process subagent'larÃ„Â± kullan; burada ana session tek yazar olarak kalÃ„Â±r.

```bash
node scripts/orchestrate-worktrees.js .claude/plan/workflow-e2e-test.json --execute
```

---

## Execution Workflow

**Task AÃƒÂ§Ã„Â±klamasÃ„Â±**: $ARGUMENTS

### Phase 1: Research & Analysis

`[Mode: Research]` - Requirement'larÃ„Â± anla ve context topla:

1. **Prompt Enhancement** (ace-tool MCP mevcutsa): `mcp__ace-tool__enhance_prompt` ÃƒÂ§aÃ„Å¸Ã„Â±r, **orijinal $ARGUMENTS'Ã„Â± tÃƒÂ¼m sonraki Codex/Gemini ÃƒÂ§aÃ„Å¸rÃ„Â±larÃ„Â± iÃƒÂ§in enhanced sonuÃƒÂ§la deÃ„Å¸iÃ…Å¸tir**. Mevcut deÃ„Å¸ilse, `$ARGUMENTS`'Ã„Â± olduÃ„Å¸u gibi kullan.
2. **Context Retrieval** (ace-tool MCP mevcutsa): `mcp__ace-tool__search_context` ÃƒÂ§aÃ„Å¸Ã„Â±r. Mevcut deÃ„Å¸ilse, built-in tool'larÃ„Â± kullan: dosya keÃ…Å¸fi iÃƒÂ§in `Glob`, sembol aramasÃ„Â± iÃƒÂ§in `Grep`, context toplama iÃƒÂ§in `Read`, daha derin keÃ…Å¸if iÃƒÂ§in `Task` (Explore agent).
3. **Requirement TamamlÃ„Â±lÃ„Â±k Skoru** (0-10):
   - Hedef netliÃ„Å¸i (0-3), Beklenen sonuÃƒÂ§ (0-3), Kapsam sÃ„Â±nÃ„Â±rlarÃ„Â± (0-2), KÃ„Â±sÃ„Â±tlamalar (0-2)
   - Ã¢â€°Â¥7: Devam et | <7: Dur, aÃƒÂ§Ã„Â±klayÃ„Â±cÃ„Â± sorular sor

### Phase 2: Solution Ideation

`[Mode: Ideation]` - Multi-model parallel analiz:

**Parallel Ãƒâ€¡aÃ„Å¸rÃ„Â±lar** (`run_in_background: true`):
- Codex: Analyzer prompt kullan, teknik fizibilite, ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mler, riskler ÃƒÂ§Ã„Â±ktÃ„Â±la
- Gemini: Analyzer prompt kullan, UI fizibilite, ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mler, UX deÃ„Å¸erlendirmesi ÃƒÂ§Ã„Â±ktÃ„Â±la

`TaskOutput` ile sonuÃƒÂ§larÃ„Â± bekle. **SESSION_ID'yi kaydet** (`CODEX_SESSION` ve `GEMINI_SESSION`).

**YukarÃ„Â±daki `Multi-Model Ãƒâ€¡aÃ„Å¸rÃ„Â± Spesifikasyonu`'ndaki `Ãƒâ€“NEMLÃ„Â°` talimatlarÃ„Â± takip et**

Her iki analizi sentezle, ÃƒÂ§ÃƒÂ¶zÃƒÂ¼m karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rmasÃ„Â± ÃƒÂ§Ã„Â±ktÃ„Â±la (en az 2 seÃƒÂ§enek), kullanÃ„Â±cÃ„Â± seÃƒÂ§imini bekle.

### Phase 3: Detailed Planning

`[Mode: Plan]` - Multi-model iÃ…Å¸birlikÃƒÂ§i planlama:

**Parallel Ãƒâ€¡aÃ„Å¸rÃ„Â±lar** (`resume <SESSION_ID>` ile session devam ettir):
- Codex: Architect prompt + `resume $CODEX_SESSION` kullan, backend mimarisi ÃƒÂ§Ã„Â±ktÃ„Â±la
- Gemini: Architect prompt + `resume $GEMINI_SESSION` kullan, frontend mimarisi ÃƒÂ§Ã„Â±ktÃ„Â±la

`TaskOutput` ile sonuÃƒÂ§larÃ„Â± bekle.

**YukarÃ„Â±daki `Multi-Model Ãƒâ€¡aÃ„Å¸rÃ„Â± Spesifikasyonu`'ndaki `Ãƒâ€“NEMLÃ„Â°` talimatlarÃ„Â± takip et**

**Claude Sentezi**: Codex backend planÃ„Â± + Gemini frontend planÃ„Â±nÃ„Â± benimsle, kullanÃ„Â±cÃ„Â± onayÃ„Â±ndan sonra `.claude/plan/task-name.md`'ye kaydet.

### Phase 4: Implementation

`[Mode: Execute]` - Kod geliÃ…Å¸tirme:

- Onaylanan planÃ„Â± kesinlikle takip et
- Mevcut proje kod standartlarÃ„Â±nÃ„Â± takip et
- Ãƒâ€“nemli kilometre taÃ…Å¸larÃ„Â±nda geri bildirim iste

### Phase 5: Code Optimization

`[Mode: Optimize]` - Multi-model parallel review:

**Parallel Ãƒâ€¡aÃ„Å¸rÃ„Â±lar**:
- Codex: Reviewer prompt kullan, gÃƒÂ¼venlik, performans, hata iÃ…Å¸leme ÃƒÂ¼zerine odaklan
- Gemini: Reviewer prompt kullan, accessibility, tasarÃ„Â±m tutarlÃ„Â±lÃ„Â±Ã„Å¸Ã„Â± ÃƒÂ¼zerine odaklan

`TaskOutput` ile sonuÃƒÂ§larÃ„Â± bekle. Review geri bildirimlerini entegre et, kullanÃ„Â±cÃ„Â± onayÃ„Â±ndan sonra optimizasyonu ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r.

**YukarÃ„Â±daki `Multi-Model Ãƒâ€¡aÃ„Å¸rÃ„Â± Spesifikasyonu`'ndaki `Ãƒâ€“NEMLÃ„Â°` talimatlarÃ„Â± takip et**

### Phase 6: Quality Review

`[Mode: Review]` - Nihai deÃ„Å¸erlendirme:

- Plana karÃ…Å¸Ã„Â± tamamlÃ„Â±lÃ„Â±Ã„Å¸Ã„Â± kontrol et
- Fonksiyonaliteyi doÃ„Å¸rulamak iÃƒÂ§in test'leri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
- SorunlarÃ„Â± ve ÃƒÂ¶nerileri raporla
- Nihai kullanÃ„Â±cÃ„Â± onayÃ„Â± iste

---

## Ana Kurallar

1. Faz sÃ„Â±rasÃ„Â± atlanamaz (kullanÃ„Â±cÃ„Â± aÃƒÂ§Ã„Â±kÃƒÂ§a talimat vermedikÃƒÂ§e)
2. Harici modellerin **sÃ„Â±fÃ„Â±r dosya sistemi yazma eriÃ…Å¸imi**, tÃƒÂ¼m deÃ„Å¸iÃ…Å¸iklikler Claude tarafÃ„Â±ndan
3. Skor < 7 veya kullanÃ„Â±cÃ„Â± onaylamadÃ„Â±Ã„Å¸Ã„Â±nda **zorla durdur**
