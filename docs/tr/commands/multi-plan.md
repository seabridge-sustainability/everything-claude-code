# Plan - Multi-Model Ã„Â°Ã…Å¸birlikÃƒÂ§i Planlama

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


Multi-model iÃ…Å¸birlikÃƒÂ§i planlama - Context retrieval + Dual-model analiz Ã¢â€ â€™ AdÃ„Â±m adÃ„Â±m implementation planÃ„Â± oluÃ…Å¸tur.

$ARGUMENTS

---

## Ana Protokoller

- **Dil ProtokolÃƒÂ¼**: Tool/model'lerle etkileÃ…Å¸imde **Ã„Â°ngilizce** kullan, kullanÃ„Â±cÃ„Â±yla kendi dilinde iletiÃ…Å¸im kur
- **Zorunlu Parallel**: Codex/Gemini ÃƒÂ§aÃ„Å¸rÃ„Â±larÃ„Â± `run_in_background: true` kullanmalÃ„Â± (ana thread'i bloke etmemek iÃƒÂ§in tek model ÃƒÂ§aÃ„Å¸rÃ„Â±larÃ„Â±nda bile)
- **Kod EgemenliÃ„Å¸i**: Harici modellerin **sÃ„Â±fÃ„Â±r dosya sistemi yazma eriÃ…Å¸imi**, tÃƒÂ¼m deÃ„Å¸iÃ…Å¸iklikler Claude tarafÃ„Â±ndan
- **Stop-Loss MekanizmasÃ„Â±**: Mevcut faz ÃƒÂ§Ã„Â±ktÃ„Â±sÃ„Â± doÃ„Å¸rulanana kadar bir sonraki faza geÃƒÂ§me
- **Sadece Planlama**: Bu komut context okumaya ve `.claude/plan/*` plan dosyalarÃ„Â±na yazmaya izin verir, ancak **ASLA production kodu deÃ„Å¸iÃ…Å¸tirmez**

---

## Multi-Model Ãƒâ€¡aÃ„Å¸rÃ„Â± Spesifikasyonu

**Ãƒâ€¡aÃ„Å¸rÃ„Â± SÃƒÂ¶zdizimi** (parallel: `run_in_background: true` kullan):

```
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend <codex|gemini> {{GEMINI_MODEL_FLAG}}- \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
<TASK>
Requirement: <enhanced requirement>
Context: <retrieved project context>
</TASK>
OUTPUT: Step-by-step implementation plan with pseudo-code. DO NOT modify any files.
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

**Session Reuse**: Her ÃƒÂ§aÃ„Å¸rÃ„Â± `SESSION_ID: xxx` dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r (genellikle wrapper tarafÃ„Â±ndan ÃƒÂ§Ã„Â±ktÃ„Â±lanÃ„Â±r), sonraki `/ccg:execute` kullanÃ„Â±mÃ„Â± iÃƒÂ§in **MUTLAKA kaydet**.

**Background Task'leri Bekle** (max timeout 600000ms = 10 dakika):

```
TaskOutput({ task_id: "<task_id>", block: true, timeout: 600000 })
```

**Ãƒâ€“NEMLÃ„Â°**:
- `timeout: 600000` belirtilmeli, aksi takdirde varsayÃ„Â±lan 30 saniye erken timeout'a neden olur
- 10 dakika sonra hala tamamlanmamÃ„Â±Ã…Å¸sa, `TaskOutput` ile polling'e devam et, **ASLA process'i ÃƒÂ¶ldÃƒÂ¼rme**
- Bekleme timeout nedeniyle atlanÃ„Â±rsa, **MUTLAKA `AskUserQuestion` ÃƒÂ§aÃ„Å¸Ã„Â±rarak kullanÃ„Â±cÃ„Â±ya beklemeye devam etmek veya task'i ÃƒÂ¶ldÃƒÂ¼rmek isteyip istemediÃ„Å¸ini sor**

---

## Execution Workflow

**Planlama GÃƒÂ¶revi**: $ARGUMENTS

### Phase 1: Tam Context Retrieval

`[Mode: Research]`

#### 1.1 Prompt Enhancement (Ã„Â°LK ÃƒÂ¶nce ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±lmalÃ„Â±)

**ace-tool MCP mevcutsa**, `mcp__ace-tool__enhance_prompt` tool'unu ÃƒÂ§aÃ„Å¸Ã„Â±r:

```
mcp__ace-tool__enhance_prompt({
  prompt: "$ARGUMENTS",
  conversation_history: "<son 5-10 konuÃ…Å¸ma turu>",
  project_root_path: "$PWD"
})
```

Enhanced prompt'u bekle, **orijinal $ARGUMENTS'Ã„Â± tÃƒÂ¼m sonraki fazlar iÃƒÂ§in enhanced sonuÃƒÂ§la deÃ„Å¸iÃ…Å¸tir**.

**ace-tool MCP mevcut DEÃ„Å¾Ã„Â°LSE**: Bu adÃ„Â±mÃ„Â± atla ve tÃƒÂ¼m sonraki fazlar iÃƒÂ§in orijinal `$ARGUMENTS`'Ã„Â± olduÃ„Å¸u gibi kullan.

#### 1.2 Context Retrieval

**ace-tool MCP mevcutsa**, `mcp__ace-tool__search_context` tool'unu ÃƒÂ§aÃ„Å¸Ã„Â±r:

```
mcp__ace-tool__search_context({
  query: "<enhanced requirement'a dayalÃ„Â± semantik sorgu>",
  project_root_path: "$PWD"
})
```

- DoÃ„Å¸al dil kullanarak semantik sorgu oluÃ…Å¸tur (Where/What/How)
- **ASLA varsayÃ„Â±mlara dayalÃ„Â± cevap verme**

**ace-tool MCP mevcut DEÃ„Å¾Ã„Â°LSE**, fallback olarak Claude Code built-in tool'larÃ„Â± kullan:
1. **Glob**: Pattern'e gÃƒÂ¶re ilgili dosyalarÃ„Â± bul (ÃƒÂ¶rn., `Glob("**/*.ts")`, `Glob("src/**/*.py")`)
2. **Grep**: Anahtar semboller, fonksiyon adlarÃ„Â±, sÃ„Â±nÃ„Â±f tanÃ„Â±mlarÃ„Â±nÃ„Â± ara (ÃƒÂ¶rn., `Grep("className|functionName")`)
3. **Read**: Tam context toplamak iÃƒÂ§in keÃ…Å¸fedilen dosyalarÃ„Â± oku
4. **Task (Explore agent)**: Daha derin keÃ…Å¸if iÃƒÂ§in, codebase genelinde aramak ÃƒÂ¼zere `Task`'Ã„Â± `subagent_type: "Explore"` ile kullan

#### 1.3 TamamlÃ„Â±lÃ„Â±k KontrolÃƒÂ¼

- Ã„Â°lgili sÃ„Â±nÃ„Â±flar, fonksiyonlar, deÃ„Å¸iÃ…Å¸kenler iÃƒÂ§in **tam tanÃ„Â±mlar ve imzalar** elde etmeli
- Context yetersizse, **recursive retrieval** tetikle
- Ãƒâ€¡Ã„Â±ktÃ„Â±ya ÃƒÂ¶ncelik ver: giriÃ…Å¸ dosyasÃ„Â± + satÃ„Â±r numarasÃ„Â± + anahtar sembol adÃ„Â±; belirsizliÃ„Å¸i ÃƒÂ§ÃƒÂ¶zmek iÃƒÂ§in gerekli olduÃ„Å¸unda minimal kod snippet'leri ekle

#### 1.4 Requirement Alignment

- Requirement'larda hala belirsizlik varsa, kullanÃ„Â±cÃ„Â± iÃƒÂ§in yÃƒÂ¶nlendirici sorular **MUTLAKA** ÃƒÂ§Ã„Â±ktÃ„Â±la
- Requirement sÃ„Â±nÃ„Â±rlarÃ„Â± net olana kadar (eksiklik yok, fazlalÃ„Â±k yok)

### Phase 2: Multi-Model Ã„Â°Ã…Å¸birlikÃƒÂ§i Analiz

`[Mode: Analysis]`

#### 2.1 Input'larÃ„Â± DaÃ„Å¸Ã„Â±t

**Parallel call** Codex ve Gemini (`run_in_background: true`):

**Orijinal requirement**'Ã„Â± (ÃƒÂ¶nceden belirlenmiÃ…Å¸ gÃƒÂ¶rÃƒÂ¼Ã…Å¸ler olmadan) her iki modele daÃ„Å¸Ã„Â±t:

1. **Codex Backend Analysis**:
   - ROLE_FILE: `~/.claude/.ccg/prompts/codex/analyzer.md`
   - Odak: Teknik fizibilite, mimari etki, performans deÃ„Å¸erlendirmeleri, potansiyel riskler
   - OUTPUT: Ãƒâ€¡ok perspektifli ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mler + artÃ„Â±/eksi analizi

2. **Gemini Frontend Analysis**:
   - ROLE_FILE: `~/.claude/.ccg/prompts/gemini/analyzer.md`
   - Odak: UI/UX etkisi, kullanÃ„Â±cÃ„Â± deneyimi, gÃƒÂ¶rsel tasarÃ„Â±m
   - OUTPUT: Ãƒâ€¡ok perspektifli ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mler + artÃ„Â±/eksi analizi

`TaskOutput` ile her iki modelin tam sonuÃƒÂ§larÃ„Â±nÃ„Â± bekle. **SESSION_ID'yi kaydet** (`CODEX_SESSION` ve `GEMINI_SESSION`).

#### 2.2 Cross-Validation

Perspektifleri entegre et ve optimizasyon iÃƒÂ§in iterate et:

1. **Consensus tanÃ„Â±mla** (gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ sinyal)
2. **Divergence tanÃ„Â±mla** (deÃ„Å¸erlendirme gerektirir)
3. **TamamlayÃ„Â±cÃ„Â± gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ yÃƒÂ¶nler**: Backend logic Codex'i takip eder, Frontend design Gemini'yi takip eder
4. **MantÃ„Â±ksal akÃ„Â±l yÃƒÂ¼rÃƒÂ¼tme**: Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼mlerdeki mantÃ„Â±ksal boÃ…Å¸luklarÃ„Â± elimine et

#### 2.3 (Ã„Â°steÃ„Å¸e BaÃ„Å¸lÃ„Â± ama Ãƒâ€“nerilen) Dual-Model Plan TaslaÃ„Å¸Ã„Â±

Claude'un sentezlenmiÃ…Å¸ planÃ„Â±ndaki eksiklik riskini azaltmak iÃƒÂ§in, her iki modelin de "plan taslaklarÃ„Â±" ÃƒÂ§Ã„Â±ktÃ„Â±lamasÃ„Â±nÃ„Â± parallel yaptÃ„Â±r (yine **dosya deÃ„Å¸iÃ…Å¸tirmesine izin verilmez**):

1. **Codex Plan Draft** (Backend otoritesi):
   - ROLE_FILE: `~/.claude/.ccg/prompts/codex/architect.md`
   - OUTPUT: AdÃ„Â±m adÃ„Â±m plan + pseudo-code (odak: data flow/edge cases/error handling/test strategy)

2. **Gemini Plan Draft** (Frontend otoritesi):
   - ROLE_FILE: `~/.claude/.ccg/prompts/gemini/architect.md`
   - OUTPUT: AdÃ„Â±m adÃ„Â±m plan + pseudo-code (odak: information architecture/interaction/accessibility/visual consistency)

`TaskOutput` ile her iki modelin tam sonuÃƒÂ§larÃ„Â±nÃ„Â± bekle, ÃƒÂ¶nerilerindeki anahtar farklarÃ„Â± kaydet.

#### 2.4 Implementation PlanÃ„Â± OluÃ…Å¸tur (Claude Final Version)

Her iki analizi sentezle, **AdÃ„Â±m AdÃ„Â±m Implementation PlanÃ„Â±** oluÃ…Å¸tur:

```markdown
## Implementation Plan: <Task Name>

### Task Type
- [ ] Frontend (Ã¢â€ â€™ Gemini)
- [ ] Backend (Ã¢â€ â€™ Codex)
- [ ] Fullstack (Ã¢â€ â€™ Parallel)

### Technical Solution
<Codex + Gemini analizinden sentezlenmiÃ…Å¸ optimal ÃƒÂ§ÃƒÂ¶zÃƒÂ¼m>

### Implementation Steps
1. <Step 1> - Beklenen teslim edilen
2. <Step 2> - Beklenen teslim edilen
...

### Key Files
| File | Operation | Description |
|------|-----------|-------------|
| path/to/file.ts:L10-L50 | Modify | Description |

### Risks and Mitigation
| Risk | Mitigation |
|------|------------|

### SESSION_ID (for /ccg:execute use)
- CODEX_SESSION: <session_id>
- GEMINI_SESSION: <session_id>
```

### Phase 2 End: Plan Teslimi (Execution DeÃ„Å¸il)

**`/ccg:plan` sorumluluklarÃ„Â± burada biter, MUTLAKA Ã…Å¸u aksiyonlarÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r**:

1. Tam implementation planÃ„Â±nÃ„Â± kullanÃ„Â±cÃ„Â±ya sun (pseudo-code dahil)
2. PlanÃ„Â± `.claude/plan/<feature-name>.md`'ye kaydet (requirement'tan feature adÃ„Â±nÃ„Â± ÃƒÂ§Ã„Â±kar, ÃƒÂ¶rn., `user-auth`, `payment-module`)
3. **KalÃ„Â±n metinle** prompt ÃƒÂ§Ã„Â±ktÃ„Â±la (MUTLAKA gerÃƒÂ§ek kaydedilen dosya yolunu kullan):

   ---
**Plan oluÃ…Å¸turuldu ve `.claude/plan/actual-feature-name.md` dosyasÃ„Â±na kaydedildi**

**LÃƒÂ¼tfen yukarÃ„Â±daki planÃ„Â± inceleyin. Ã…Å¾unlarÃ„Â± yapabilirsiniz:**
   - **PlanÃ„Â± deÃ„Å¸iÃ…Å¸tir**: Neyin ayarlanmasÃ„Â± gerektiÃ„Å¸ini sÃƒÂ¶yleyin, planÃ„Â± gÃƒÂ¼ncelleyeceÃ„Å¸im
   - **PlanÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r**: AÃ…Å¸aÃ„Å¸Ã„Â±daki komutu yeni bir oturuma kopyalayÃ„Â±n

   ```
   /ccg:execute .claude/plan/actual-feature-name.md
   ```
   ---

**NOT**: YukarÃ„Â±daki `actual-feature-name.md` gerÃƒÂ§ek kaydedilen dosya adÃ„Â±yla deÃ„Å¸iÃ…Å¸tirilmelidir!

4. **Mevcut yanÃ„Â±tÃ„Â± hemen sonlandÃ„Â±r** (Burada dur. Daha fazla tool ÃƒÂ§aÃ„Å¸rÃ„Â±sÃ„Â± yok.)

**KESINLIKLE YASAK**:
- KullanÃ„Â±cÃ„Â±ya "Y/N" sor sonra otomatik ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r (execution `/ccg:execute`'un sorumluluÃ„Å¸udur)
- Production koduna herhangi bir yazma operasyonu
- `/ccg:execute`'u veya herhangi bir implementation aksiyonunu otomatik ÃƒÂ§aÃ„Å¸Ã„Â±r
- KullanÃ„Â±cÃ„Â± aÃƒÂ§Ã„Â±kÃƒÂ§a deÃ„Å¸iÃ…Å¸iklik talep etmediÃ„Å¸inde model ÃƒÂ§aÃ„Å¸rÃ„Â±larÃ„Â±nÃ„Â± tetiklemeye devam et

---

## Plan Kaydetme

Planlama tamamlandÃ„Â±ktan sonra, planÃ„Â± Ã…Å¸uraya kaydet:

- **Ã„Â°lk planlama**: `.claude/plan/<feature-name>.md`
- **Ã„Â°terasyon versiyonlarÃ„Â±**: `.claude/plan/<feature-name>-v2.md`, `.claude/plan/<feature-name>-v3.md`...

Plan dosyasÃ„Â± yazma, planÃ„Â± kullanÃ„Â±cÃ„Â±ya sunmadan ÃƒÂ¶nce tamamlanmalÃ„Â±.

---

## Plan DeÃ„Å¸iÃ…Å¸iklik AkÃ„Â±Ã…Å¸Ã„Â±

KullanÃ„Â±cÃ„Â± plan deÃ„Å¸iÃ…Å¸ikliÃ„Å¸i talep ederse:

1. KullanÃ„Â±cÃ„Â± geri bildirimine gÃƒÂ¶re plan iÃƒÂ§eriÃ„Å¸ini ayarla
2. `.claude/plan/<feature-name>.md` dosyasÃ„Â±nÃ„Â± gÃƒÂ¼ncelle
3. DeÃ„Å¸iÃ…Å¸tirilmiÃ…Å¸ planÃ„Â± yeniden sun
4. KullanÃ„Â±cÃ„Â±yÃ„Â± tekrar gÃƒÂ¶zden geÃƒÂ§irmeye veya ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmaya davet et

---

## Sonraki AdÃ„Â±mlar

KullanÃ„Â±cÃ„Â± onayladÃ„Â±ktan sonra, **manuel** olarak ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r:

```bash
/ccg:execute .claude/plan/<feature-name>.md
```

---

## Ana Kurallar

1. **Sadece plan, implementation yok** Ã¢â‚¬â€œ Bu komut hiÃƒÂ§bir kod deÃ„Å¸iÃ…Å¸ikliÃ„Å¸i ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmaz
2. **Y/N prompt'larÃ„Â± yok** Ã¢â‚¬â€œ Sadece planÃ„Â± sun, kullanÃ„Â±cÃ„Â±nÃ„Â±n sonraki adÃ„Â±mlara karar vermesine izin ver
3. **GÃƒÂ¼ven KurallarÃ„Â±** Ã¢â‚¬â€œ Backend Codex'i takip eder, Frontend Gemini'yi takip eder
4. Harici modellerin **sÃ„Â±fÃ„Â±r dosya sistemi yazma eriÃ…Å¸imi**
5. **SESSION_ID Devri** Ã¢â‚¬â€œ Plan sonunda `CODEX_SESSION` / `GEMINI_SESSION` iÃƒÂ§ermeli (`/ccg:execute resume <SESSION_ID>` kullanÃ„Â±mÃ„Â± iÃƒÂ§in)
