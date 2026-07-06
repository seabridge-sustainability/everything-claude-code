# Execute - Multi-Model Ã„Â°Ã…Å¸birlikÃƒÂ§i Execution

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


Multi-model iÃ…Å¸birlikÃƒÂ§i execution - Plandan prototype al Ã¢â€ â€™ Claude refactor edip implement eder Ã¢â€ â€™ Multi-model audit ve teslimat.

$ARGUMENTS

---

## Ana Protokoller

- **Dil ProtokolÃƒÂ¼**: Tool/model'lerle etkileÃ…Å¸imde **Ã„Â°ngilizce** kullan, kullanÃ„Â±cÃ„Â±yla kendi dilinde iletiÃ…Å¸im kur
- **Kod EgemenliÃ„Å¸i**: Harici modellerin **sÃ„Â±fÃ„Â±r dosya sistemi yazma eriÃ…Å¸imi**, tÃƒÂ¼m deÃ„Å¸iÃ…Å¸iklikler Claude tarafÃ„Â±ndan
- **Dirty Prototype Refactoring**: Codex/Gemini Unified Diff'i "dirty prototype" olarak deÃ„Å¸erlendir, production-grade koda refactor edilmeli
- **Stop-Loss MekanizmasÃ„Â±**: Mevcut faz ÃƒÂ§Ã„Â±ktÃ„Â±sÃ„Â± doÃ„Å¸rulanana kadar bir sonraki faza geÃƒÂ§me
- **Ãƒâ€“n KoÃ…Å¸ul**: Sadece kullanÃ„Â±cÃ„Â± `/ccg:plan` ÃƒÂ§Ã„Â±ktÃ„Â±sÃ„Â±na aÃƒÂ§Ã„Â±kÃƒÂ§a "Y" cevabÃ„Â± verdikten sonra ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r (eksikse, ÃƒÂ¶nce onay al)

---

## Multi-Model Ãƒâ€¡aÃ„Å¸rÃ„Â± Spesifikasyonu

**Ãƒâ€¡aÃ„Å¸rÃ„Â± SÃƒÂ¶zdizimi** (parallel: `run_in_background: true` kullan):

```
# Session devam ettirme ÃƒÂ§aÃ„Å¸rÃ„Â±sÃ„Â± (ÃƒÂ¶nerilen) - Implementation Prototype
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend <codex|gemini> {{GEMINI_MODEL_FLAG}}resume <SESSION_ID> - \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
<TASK>
Requirement: <task description>
Context: <plan content + target files>
</TASK>
OUTPUT: Unified Diff Patch ONLY. Strictly prohibit any actual modifications.
EOF",
  run_in_background: true,
  timeout: 3600000,
  description: "Brief description"
})

# Yeni session ÃƒÂ§aÃ„Å¸rÃ„Â±sÃ„Â± - Implementation Prototype
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend <codex|gemini> {{GEMINI_MODEL_FLAG}}- \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
<TASK>
Requirement: <task description>
Context: <plan content + target files>
</TASK>
OUTPUT: Unified Diff Patch ONLY. Strictly prohibit any actual modifications.
EOF",
  run_in_background: true,
  timeout: 3600000,
  description: "Brief description"
})
```

**Audit Ãƒâ€¡aÃ„Å¸rÃ„Â± SÃƒÂ¶zdizimi** (Code Review / Audit):

```
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend <codex|gemini> {{GEMINI_MODEL_FLAG}}resume <SESSION_ID> - \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
<TASK>
Scope: Audit the final code changes.
Inputs:
- The applied patch (git diff / final unified diff)
- The touched files (relevant excerpts if needed)
Constraints:
- Do NOT modify any files.
- Do NOT output tool commands that assume filesystem access.
</TASK>
OUTPUT:
1) A prioritized list of issues (severity, file, rationale)
2) Concrete fixes; if code changes are needed, include a Unified Diff Patch in a fenced code block.
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
| Implementation | `~/.claude/.ccg/prompts/codex/architect.md` | `~/.claude/.ccg/prompts/gemini/frontend.md` |
| Review | `~/.claude/.ccg/prompts/codex/reviewer.md` | `~/.claude/.ccg/prompts/gemini/reviewer.md` |

**Session Reuse**: `/ccg:plan` SESSION_ID saÃ„Å¸ladÃ„Â±ysa, context'i yeniden kullanmak iÃƒÂ§in `resume <SESSION_ID>` kullan.

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

**Execute Task**: $ARGUMENTS

### Phase 0: PlanÃ„Â± Oku

`[Mode: Prepare]`

1. **Input Tipini TanÃ„Â±mla**:
   - Plan dosya yolu (ÃƒÂ¶rn., `.claude/plan/xxx.md`)
   - DoÃ„Å¸rudan task aÃƒÂ§Ã„Â±klamasÃ„Â±

2. **Plan Ã„Â°ÃƒÂ§eriÃ„Å¸ini Oku**:
   - Plan dosya yolu saÃ„Å¸landÃ„Â±ysa, oku ve ayrÃ„Â±Ã…Å¸tÃ„Â±r
   - Ãƒâ€¡Ã„Â±kar: task tipi, implementation adÃ„Â±mlarÃ„Â±, anahtar dosyalar, SESSION_ID

3. **Pre-Execution OnayÃ„Â±**:
   - Input "doÃ„Å¸rudan task aÃƒÂ§Ã„Â±klamasÃ„Â±" veya plan `SESSION_ID` / anahtar dosyalar eksikse: ÃƒÂ¶nce kullanÃ„Â±cÃ„Â±yla onay al
   - KullanÃ„Â±cÃ„Â±nÃ„Â±n plana "Y" cevabÃ„Â± verdiÃ„Å¸ini onaylayamazsan: devam etmeden ÃƒÂ¶nce tekrar onay al

4. **Task Tipi Routing**:

   | Task Type | Detection | Route |
   |-----------|-----------|-------|
   | **Frontend** | Pages, components, UI, styles, layout | Gemini |
   | **Backend** | API, interfaces, database, logic, algorithms | Codex |
   | **Fullstack** | Hem frontend hem de backend iÃƒÂ§erir | Codex Ã¢Ë†Â¥ Gemini parallel |

---

### Phase 1: HÃ„Â±zlÃ„Â± Context Retrieval

`[Mode: Retrieval]`

**ace-tool MCP mevcutsa**, hÃ„Â±zlÃ„Â± context retrieval iÃƒÂ§in kullan:

Plandaki "Key Files" listesine gÃƒÂ¶re, `mcp__ace-tool__search_context` ÃƒÂ§aÃ„Å¸Ã„Â±r:

```
mcp__ace-tool__search_context({
  query: "<plan iÃƒÂ§eriÃ„Å¸ine dayalÃ„Â± semantik sorgu, anahtar dosyalar, modÃƒÂ¼ller, fonksiyon adlarÃ„Â± dahil>",
  project_root_path: "$PWD"
})
```

**Retrieval Stratejisi**:
- PlanÃ„Â±n "Key Files" tablosundan hedef yollarÃ„Â± ÃƒÂ§Ã„Â±kar
- Semantik sorgu oluÃ…Å¸tur: giriÃ…Å¸ dosyalarÃ„Â±, baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k modÃƒÂ¼lleri, ilgili tip tanÃ„Â±mlarÃ„Â±
- SonuÃƒÂ§lar yetersizse, 1-2 recursive retrieval ekle

**ace-tool MCP mevcut DEÃ„Å¾Ã„Â°LSE**, fallback olarak Claude Code built-in tool'larÃ„Â± kullan:
1. **Glob**: PlanÃ„Â±n "Key Files" tablosundan hedef dosyalarÃ„Â± bul (ÃƒÂ¶rn., `Glob("src/components/**/*.tsx")`)
2. **Grep**: Codebase genelinde anahtar semboller, fonksiyon adlarÃ„Â±, tip tanÃ„Â±mlarÃ„Â±nÃ„Â± ara
3. **Read**: Tam context toplamak iÃƒÂ§in keÃ…Å¸fedilen dosyalarÃ„Â± oku
4. **Task (Explore agent)**: Daha geniÃ…Å¸ keÃ…Å¸if iÃƒÂ§in, `Task`'Ã„Â± `subagent_type: "Explore"` ile kullan

**Retrieval SonrasÃ„Â±**:
- AlÃ„Â±nan kod snippet'lerini organize et
- Implementation iÃƒÂ§in tam context'i onayla
- Phase 3'e geÃƒÂ§

---

### Phase 3: Prototype Edinimi

`[Mode: Prototype]`

**Task Tipine GÃƒÂ¶re Route Et**:

#### Route A: Frontend/UI/Styles Ã¢â€ â€™ Gemini

**Limit**: Context < 32k token

1. Gemini'yi ÃƒÂ§aÃ„Å¸Ã„Â±r (`~/.claude/.ccg/prompts/gemini/frontend.md` kullan)
2. Input: Plan iÃƒÂ§eriÃ„Å¸i + alÃ„Â±nan context + hedef dosyalar
3. OUTPUT: `Unified Diff Patch ONLY. Strictly prohibit any actual modifications.`
4. **Gemini frontend tasarÃ„Â±m otoritesidir, CSS/React/Vue prototype'Ã„Â± nihai gÃƒÂ¶rsel temeldir**
5. **UYARI**: Gemini'nin backend logic ÃƒÂ¶nerilerini yoksay
6. Plan `GEMINI_SESSION` iÃƒÂ§eriyorsa: `resume <GEMINI_SESSION>` tercih et

#### Route B: Backend/Logic/Algorithms Ã¢â€ â€™ Codex

1. Codex'i ÃƒÂ§aÃ„Å¸Ã„Â±r (`~/.claude/.ccg/prompts/codex/architect.md` kullan)
2. Input: Plan iÃƒÂ§eriÃ„Å¸i + alÃ„Â±nan context + hedef dosyalar
3. OUTPUT: `Unified Diff Patch ONLY. Strictly prohibit any actual modifications.`
4. **Codex backend logic otoritesidir, mantÃ„Â±ksal akÃ„Â±l yÃƒÂ¼rÃƒÂ¼tme ve debug yeteneklerinden faydalan**
5. Plan `CODEX_SESSION` iÃƒÂ§eriyorsa: `resume <CODEX_SESSION>` tercih et

#### Route C: Fullstack Ã¢â€ â€™ Parallel Ãƒâ€¡aÃ„Å¸rÃ„Â±lar

1. **Parallel Ãƒâ€¡aÃ„Å¸rÃ„Â±lar** (`run_in_background: true`):
   - Gemini: Frontend kÃ„Â±smÃ„Â±nÃ„Â± ele al
   - Codex: Backend kÃ„Â±smÃ„Â±nÃ„Â± ele al
2. `TaskOutput` ile her iki modelin tam sonuÃƒÂ§larÃ„Â±nÃ„Â± bekle
3. Her biri `resume` iÃƒÂ§in plandan ilgili `SESSION_ID`'yi kullanÃ„Â±r (eksikse yeni session oluÃ…Å¸tur)

**YukarÃ„Â±daki `Multi-Model Ãƒâ€¡aÃ„Å¸rÃ„Â± Spesifikasyonu`'ndaki `Ãƒâ€“NEMLÃ„Â°` talimatlarÃ„Â± takip et**

---

### Phase 4: Code Implementation

`[Mode: Implement]`

**Kod EgemenliÃ„Å¸i olarak Claude Ã…Å¸u adÃ„Â±mlarÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±r**:

1. **Diff Oku**: Codex/Gemini'nin dÃƒÂ¶ndÃƒÂ¼rdÃƒÂ¼Ã„Å¸ÃƒÂ¼ Unified Diff Patch'i ayrÃ„Â±Ã…Å¸tÃ„Â±r

2. **Mental Sandbox**:
   - Diff'in hedef dosyalara uygulanmasÃ„Â±nÃ„Â± simÃƒÂ¼le et
   - MantÃ„Â±ksal tutarlÃ„Â±lÃ„Â±Ã„Å¸Ã„Â± kontrol et
   - Potansiyel ÃƒÂ§akÃ„Â±Ã…Å¸malarÃ„Â± veya yan etkileri tanÃ„Â±mla

3. **Refactor ve Temizle**:
   - "Dirty prototype"'Ã„Â± **yÃƒÂ¼ksek okunabilir, sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lebilir, enterprise-grade koda** refactor et
   - Gereksiz kodu kaldÃ„Â±r
   - Projenin mevcut kod standartlarÃ„Â±na uygunluÃ„Å¸u saÃ„Å¸la
   - **Gerekli olmadÃ„Â±kÃƒÂ§a yorum/dokÃƒÂ¼man oluÃ…Å¸turma**, kod kendi kendini aÃƒÂ§Ã„Â±klamalÃ„Â±

4. **Minimal Kapsam**:
   - DeÃ„Å¸iÃ…Å¸iklikler sadece requirement kapsamÃ„Â±yla sÃ„Â±nÃ„Â±rlÃ„Â±
   - Yan etkiler iÃƒÂ§in **zorunlu gÃƒÂ¶zden geÃƒÂ§irme**
   - Hedefli dÃƒÂ¼zeltmeler yap

5. **DeÃ„Å¸iÃ…Å¸iklikleri Uygula**:
   - GerÃƒÂ§ek deÃ„Å¸iÃ…Å¸iklikleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmak iÃƒÂ§in Edit/Write tool'larÃ„Â±nÃ„Â± kullan
   - **Sadece gerekli kodu deÃ„Å¸iÃ…Å¸tir**, kullanÃ„Â±cÃ„Â±nÃ„Â±n diÃ„Å¸er mevcut fonksiyonlarÃ„Â±nÃ„Â± asla etkileme

6. **Self-Verification** (Ã…Å¸iddetle ÃƒÂ¶nerilir):
   - Projenin mevcut lint / typecheck / test'lerini ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r (minimal ilgili kapsama ÃƒÂ¶ncelik ver)
   - BaÃ…Å¸arÃ„Â±sÃ„Â±z olursa: ÃƒÂ¶nce regresyonlarÃ„Â± dÃƒÂ¼zelt, sonra Phase 5'e geÃƒÂ§

---

### Phase 5: Audit ve Teslimat

`[Mode: Audit]`

#### 5.1 Otomatik Audit

**DeÃ„Å¸iÃ…Å¸iklikler yÃƒÂ¼rÃƒÂ¼rlÃƒÂ¼Ã„Å¸e girdikten sonra, MUTLAKA hemen parallel call** Codex ve Gemini'yi Code Review iÃƒÂ§in:

1. **Codex Review** (`run_in_background: true`):
   - ROLE_FILE: `~/.claude/.ccg/prompts/codex/reviewer.md`
   - Input: DeÃ„Å¸iÃ…Å¸tirilen Diff + hedef dosyalar
   - Odak: GÃƒÂ¼venlik, performans, hata iÃ…Å¸leme, logic doÃ„Å¸ruluÃ„Å¸u

2. **Gemini Review** (`run_in_background: true`):
   - ROLE_FILE: `~/.claude/.ccg/prompts/gemini/reviewer.md`
   - Input: DeÃ„Å¸iÃ…Å¸tirilen Diff + hedef dosyalar
   - Odak: EriÃ…Å¸ilebilirlik, tasarÃ„Â±m tutarlÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±, kullanÃ„Â±cÃ„Â± deneyimi

`TaskOutput` ile her iki modelin tam review sonuÃƒÂ§larÃ„Â±nÃ„Â± bekle. Context tutarlÃ„Â±lÃ„Â±Ã„Å¸Ã„Â± iÃƒÂ§in Phase 3 session'larÃ„Â±nÃ„Â± yeniden kullanmayÃ„Â± tercih et (`resume <SESSION_ID>`).

#### 5.2 Entegre Et ve DÃƒÂ¼zelt

1. Codex + Gemini review geri bildirimlerini sentezle
2. GÃƒÂ¼ven kurallarÃ„Â±na gÃƒÂ¶re deÃ„Å¸erlendir: Backend Codex'i takip eder, Frontend Gemini'yi takip eder
3. Gerekli dÃƒÂ¼zeltmeleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
4. GerektiÃ„Å¸inde Phase 5.1'i tekrarla (risk kabul edilebilir olana kadar)

#### 5.3 Teslimat OnayÃ„Â±

Audit geÃƒÂ§tikten sonra, kullanÃ„Â±cÃ„Â±ya rapor et:

```markdown
## Execution Complete

### Change Summary
| File | Operation | Description |
|------|-----------|-------------|
| path/to/file.ts | Modified | Description |

### Audit Results
- Codex: <Passed/Found N issues>
- Gemini: <Passed/Found N issues>

### Recommendations
1. [ ] <Ãƒâ€“nerilen test adÃ„Â±mlarÃ„Â±>
2. [ ] <Ãƒâ€“nerilen doÃ„Å¸rulama adÃ„Â±mlarÃ„Â±>
```

---

## Ana Kurallar

1. **Kod EgemenliÃ„Å¸i** Ã¢â‚¬â€œ TÃƒÂ¼m dosya deÃ„Å¸iÃ…Å¸iklikleri Claude tarafÃ„Â±ndan, harici modellerin sÃ„Â±fÃ„Â±r yazma eriÃ…Å¸imi
2. **Dirty Prototype Refactoring** Ã¢â‚¬â€œ Codex/Gemini ÃƒÂ§Ã„Â±ktÃ„Â±sÃ„Â± taslak olarak deÃ„Å¸erlendirilir, refactor edilmeli
3. **GÃƒÂ¼ven KurallarÃ„Â±** Ã¢â‚¬â€œ Backend Codex'i takip eder, Frontend Gemini'yi takip eder
4. **Minimal DeÃ„Å¸iÃ…Å¸iklikler** Ã¢â‚¬â€œ Sadece gerekli kodu deÃ„Å¸iÃ…Å¸tir, yan etki yok
5. **Zorunlu Audit** Ã¢â‚¬â€œ DeÃ„Å¸iÃ…Å¸ikliklerden sonra multi-model Code Review yapÃ„Â±lmalÃ„Â±

---

## KullanÃ„Â±m

```bash
# Plan dosyasÃ„Â±nÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
/ccg:execute .claude/plan/feature-name.md

# Task'i doÃ„Å¸rudan ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r (context'te zaten tartÃ„Â±Ã…Å¸Ã„Â±lmÃ„Â±Ã…Å¸ planlar iÃƒÂ§in)
/ccg:execute implement user authentication based on previous plan
```

---

## /ccg:plan ile Ã„Â°liÃ…Å¸ki

1. `/ccg:plan` plan + SESSION_ID oluÃ…Å¸turur
2. KullanÃ„Â±cÃ„Â± "Y" ile onaylar
3. `/ccg:execute` planÃ„Â± okur, SESSION_ID'yi yeniden kullanÃ„Â±r, implementation'Ã„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±r
