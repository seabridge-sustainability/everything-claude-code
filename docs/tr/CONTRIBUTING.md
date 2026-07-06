# Everything Claude Code'a KatkÃ„Â±da Bulunma

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


KatkÃ„Â±da bulunmak istediÃ„Å¸iniz iÃƒÂ§in teÃ…Å¸ekkÃƒÂ¼rler! Bu repo, Claude Code kullanÃ„Â±cÃ„Â±larÃ„Â± iÃƒÂ§in bir topluluk kaynaÃ„Å¸Ã„Â±dÃ„Â±r.

## Ã„Â°ÃƒÂ§indekiler

- [Ne ArÃ„Â±yoruz](#ne-arÃ„Â±yoruz)
- [HÃ„Â±zlÃ„Â± BaÃ…Å¸langÃ„Â±ÃƒÂ§](#hÃ„Â±zlÃ„Â±-baÃ…Å¸langÃ„Â±ÃƒÂ§)
- [Skill'lere KatkÃ„Â±da Bulunma](#skilllere-katkÃ„Â±da-bulunma)
- [Agent'lara KatkÃ„Â±da Bulunma](#agentlara-katkÃ„Â±da-bulunma)
- [Hook'lara KatkÃ„Â±da Bulunma](#hooklara-katkÃ„Â±da-bulunma)
- [Command'lara KatkÃ„Â±da Bulunma](#commandlara-katkÃ„Â±da-bulunma)
- [MCP ve dokÃƒÂ¼mantasyon (ÃƒÂ¶rn. Context7)](#mcp-ve-dokÃƒÂ¼mantasyon-ÃƒÂ¶rn-context7)
- [Cross-Harness ve Ãƒâ€¡eviriler](#cross-harness-ve-ÃƒÂ§eviriler)
- [Pull Request SÃƒÂ¼reci](#pull-request-sÃƒÂ¼reci)

---

## Ne ArÃ„Â±yoruz

### Agent'lar
Belirli gÃƒÂ¶revleri iyi yÃƒÂ¶neten yeni agent'lar:
- Dile ÃƒÂ¶zgÃƒÂ¼ reviewer'lar (Python, Go, Rust)
- Framework uzmanlarÃ„Â± (Django, Rails, Laravel, Spring)
- DevOps uzmanlarÃ„Â± (Kubernetes, Terraform, CI/CD)
- Alan uzmanlarÃ„Â± (ML pipeline'larÃ„Â±, data engineering, mobil)

### Skill'ler
Workflow tanÃ„Â±mlarÃ„Â± ve alan bilgisi:
- Dil en iyi uygulamalarÃ„Â±
- Framework pattern'leri
- Test stratejileri
- Mimari kÃ„Â±lavuzlarÃ„Â±

### Hook'lar
FaydalÃ„Â± otomasyonlar:
- Linting/formatlama hook'larÃ„Â±
- GÃƒÂ¼venlik kontrolleri
- DoÃ„Å¸rulama hook'larÃ„Â±
- Bildirim hook'larÃ„Â±

### Command'lar
FaydalÃ„Â± workflow'larÃ„Â± ÃƒÂ§aÃ„Å¸Ã„Â±ran slash command'lar:
- Deployment command'larÃ„Â±
- Test command'larÃ„Â±
- Kod ÃƒÂ¼retim command'larÃ„Â±

---

## HÃ„Â±zlÃ„Â± BaÃ…Å¸langÃ„Â±ÃƒÂ§

```bash
# 1. Fork ve clone
gh repo fork affaan-m/everything-claude-code --clone
cd everything-claude-code

# 2. Branch oluÃ…Å¸tur
git checkout -b feat/my-contribution

# 3. KatkÃ„Â±nÃ„Â±zÃ„Â± ekleyin (aÃ…Å¸aÃ„Å¸Ã„Â±daki bÃƒÂ¶lÃƒÂ¼mlere bakÃ„Â±n)

# 4. Yerel olarak test edin
cp -r skills/my-skill ~/.claude/skills/  # skill'ler iÃƒÂ§in
# ArdÃ„Â±ndan Claude Code ile test edin

# 5. PR gÃƒÂ¶nderin
git add . && git commit -m "feat: add my-skill" && git push -u origin feat/my-contribution
```

---

## Skill'lere KatkÃ„Â±da Bulunma

Skill'ler, Claude Code'un baÃ„Å¸lama gÃƒÂ¶re yÃƒÂ¼klediÃ„Å¸i bilgi modÃƒÂ¼lleridir.

### Dizin YapÃ„Â±sÃ„Â±

```
skills/
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ your-skill-name/
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ SKILL.md
```

### SKILL.md Ã…Å¾ablonu

```markdown
---
name: your-skill-name
description: Skill listesinde gÃƒÂ¶sterilen kÃ„Â±sa aÃƒÂ§Ã„Â±klama
origin: ECC
---

# Skill BaÃ…Å¸lÃ„Â±Ã„Å¸Ã„Â±nÃ„Â±z

Bu skill'in neyi kapsadÃ„Â±Ã„Å¸Ã„Â±na dair kÃ„Â±sa genel bakÃ„Â±Ã…Å¸.

## Temel Kavramlar

Temel pattern'leri ve yÃƒÂ¶nergeleri aÃƒÂ§Ã„Â±klayÃ„Â±n.

## Kod Ãƒâ€“rnekleri

\`\`\`typescript
// Pratik, test edilmiÃ…Å¸ ÃƒÂ¶rnekler ekleyin
function example() {
  // Ã„Â°yi yorumlanmÃ„Â±Ã…Å¸ kod
}
\`\`\`

## En Ã„Â°yi Uygulamalar

- Uygulanabilir yÃƒÂ¶nergeler
- YapÃ„Â±lmasÃ„Â± ve yapÃ„Â±lmamasÃ„Â± gerekenler
- KaÃƒÂ§Ã„Â±nÃ„Â±lmasÃ„Â± gereken yaygÃ„Â±n hatalar

## Ne Zaman KullanÃ„Â±lÃ„Â±r

Bu skill'in uygulandÃ„Â±Ã„Å¸Ã„Â± senaryolarÃ„Â± aÃƒÂ§Ã„Â±klayÃ„Â±n.
```

### Skill Kontrol Listesi

- [ ] Tek bir alan/teknolojiye odaklanmÃ„Â±Ã…Å¸
- [ ] Pratik kod ÃƒÂ¶rnekleri iÃƒÂ§eriyor
- [ ] 500 satÃ„Â±rÃ„Â±n altÃ„Â±nda
- [ ] Net bÃƒÂ¶lÃƒÂ¼m baÃ…Å¸lÃ„Â±klarÃ„Â± kullanÃ„Â±yor
- [ ] Claude Code ile test edilmiÃ…Å¸

### Ãƒâ€“rnek Skill'ler

| Skill | AmaÃƒÂ§ |
|-------|---------|
| `coding-standards/` | TypeScript/JavaScript pattern'leri |
| `frontend-patterns/` | React ve Next.js en iyi uygulamalarÃ„Â± |
| `backend-patterns/` | API ve veritabanÃ„Â± pattern'leri |
| `security-review/` | GÃƒÂ¼venlik kontrol listesi |

---

## Agent'lara KatkÃ„Â±da Bulunma

Agent'lar, Task tool ÃƒÂ¼zerinden ÃƒÂ§aÃ„Å¸rÃ„Â±lan ÃƒÂ¶zelleÃ…Å¸miÃ…Å¸ asistanlardÃ„Â±r.

### Dosya Konumu

```
agents/your-agent-name.md
```

### Agent Ã…Å¾ablonu

```markdown
---
name: your-agent-name
description: Bu agent'Ã„Â±n ne yaptÃ„Â±Ã„Å¸Ã„Â± ve Claude'un onu ne zaman ÃƒÂ§aÃ„Å¸Ã„Â±rmasÃ„Â± gerektiÃ„Å¸i. Spesifik olun!
tools: ["Read", "Write", "Edit", "Bash", "Grep", "Glob"]
model: sonnet
---

Siz bir [rol] uzmanÃ„Â±sÃ„Â±nÃ„Â±z.

## RolÃƒÂ¼nÃƒÂ¼z

- Birincil sorumluluk
- Ã„Â°kincil sorumluluk
- YAPMADIÃ„Å¾INIZ Ã…Å¸eyler (sÃ„Â±nÃ„Â±rlar)

## Workflow

### AdÃ„Â±m 1: Anlama
GÃƒÂ¶reve nasÃ„Â±l yaklaÃ…Å¸Ã„Â±yorsunuz.

### AdÃ„Â±m 2: Uygulama
Ã„Â°Ã…Å¸i nasÃ„Â±l gerÃƒÂ§ekleÃ…Å¸tiriyorsunuz.

### AdÃ„Â±m 3: DoÃ„Å¸rulama
SonuÃƒÂ§larÃ„Â± nasÃ„Â±l doÃ„Å¸ruluyorsunuz.

## Ãƒâ€¡Ã„Â±ktÃ„Â± FormatÃ„Â±

KullanÃ„Â±cÃ„Â±ya ne dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼yorsunuz.

## Ãƒâ€“rnekler

### Ãƒâ€“rnek: [Senaryo]
Girdi: [kullanÃ„Â±cÃ„Â±nÃ„Â±n saÃ„Å¸ladÃ„Â±Ã„Å¸Ã„Â±]
Eylem: [yaptÃ„Â±Ã„Å¸Ã„Â±nÃ„Â±z]
Ãƒâ€¡Ã„Â±ktÃ„Â±: [dÃƒÂ¶ndÃƒÂ¼rdÃƒÂ¼Ã„Å¸ÃƒÂ¼nÃƒÂ¼z]
```

### Agent AlanlarÃ„Â±

| Alan | AÃƒÂ§Ã„Â±klama | SeÃƒÂ§enekler |
|-------|-------------|---------|
| `name` | KÃƒÂ¼ÃƒÂ§ÃƒÂ¼k harf, tire ile ayrÃ„Â±lmÃ„Â±Ã…Å¸ | `code-reviewer` |
| `description` | Ne zaman ÃƒÂ§aÃ„Å¸rÃ„Â±lacaÃ„Å¸Ã„Â±na karar vermek iÃƒÂ§in kullanÃ„Â±lÃ„Â±r | Spesifik olun! |
| `tools` | Sadece gerekli olanlar | `Read, Write, Edit, Bash, Grep, Glob, WebFetch, Task`, veya agent MCP kullanÃ„Â±yorsa MCP tool isimleri (ÃƒÂ¶rn. `mcp__context7__resolve-library-id`, `mcp__context7__query-docs`) |
| `model` | KarmaÃ…Å¸Ã„Â±klÃ„Â±k seviyesi | `haiku` (basit), `sonnet` (kodlama), `opus` (karmaÃ…Å¸Ã„Â±k) |

### Ãƒâ€“rnek Agent'lar

| Agent | AmaÃƒÂ§ |
|-------|---------|
| `tdd-guide.md` | Test odaklÃ„Â± geliÃ…Å¸tirme |
| `code-reviewer.md` | Kod incelemesi |
| `security-reviewer.md` | GÃƒÂ¼venlik taramasÃ„Â± |
| `build-error-resolver.md` | Build hatalarÃ„Â±nÃ„Â± dÃƒÂ¼zeltme |

---

## Hook'lara KatkÃ„Â±da Bulunma

Hook'lar, Claude Code olaylarÃ„Â± tarafÃ„Â±ndan tetiklenen otomatik davranÃ„Â±Ã…Å¸lardÃ„Â±r.

### Dosya Konumu

```
hooks/hooks.json
```

### Hook TÃƒÂ¼rleri

| TÃƒÂ¼r | Tetikleyici | KullanÃ„Â±m AlanÃ„Â± |
|------|---------|----------|
| `PreToolUse` | Tool ÃƒÂ§alÃ„Â±Ã…Å¸madan ÃƒÂ¶nce | DoÃ„Å¸rulama, uyarÃ„Â±, engelleme |
| `PostToolUse` | Tool ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±ktan sonra | Formatlama, kontrol, bildirim |
| `SessionStart` | Oturum baÃ…Å¸ladÃ„Â±Ã„Å¸Ã„Â±nda | BaÃ„Å¸lam yÃƒÂ¼kleme |
| `Stop` | Oturum sona erdiÃ„Å¸inde | Temizleme, denetim |

### Hook FormatÃ„Â±

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "tool == \"Bash\" && tool_input.command matches \"rm -rf /\"",
        "hooks": [
          {
            "type": "command",
            "command": "echo '[Hook] ENGELLENDÃ„Â°: Tehlikeli komut' && exit 1"
          }
        ],
        "description": "Tehlikeli rm komutlarÃ„Â±nÃ„Â± engelle"
      }
    ]
  }
}
```

### Matcher SÃƒÂ¶zdizimi

```javascript
// Belirli tool'larÃ„Â± eÃ…Å¸leÃ…Å¸tir
tool == "Bash"
tool == "Edit"
tool == "Write"

// Girdi pattern'lerini eÃ…Å¸leÃ…Å¸tir
tool_input.command matches "npm install"
tool_input.file_path matches "\\.tsx?$"

// KoÃ…Å¸ullarÃ„Â± birleÃ…Å¸tir
tool == "Bash" && tool_input.command matches "git push"
```

### Hook Ãƒâ€“rnekleri

```json
// tmux dÃ„Â±Ã…Å¸Ã„Â±nda dev server'larÃ„Â± engelle
{
  "matcher": "tool == \"Bash\" && tool_input.command matches \"npm run dev\"",
  "hooks": [{"type": "command", "command": "echo 'Dev server'lar iÃƒÂ§in tmux kullanÃ„Â±n' && exit 1"}],
  "description": "Dev server'larÃ„Â±n tmux'ta ÃƒÂ§alÃ„Â±Ã…Å¸masÃ„Â±nÃ„Â± saÃ„Å¸la"
}

// TypeScript dÃƒÂ¼zenledikten sonra otomatik formatla
{
  "matcher": "tool == \"Edit\" && tool_input.file_path matches \"\\.tsx?$\"",
  "hooks": [{"type": "command", "command": "npx prettier --write \"$file_path\""}],
  "description": "TypeScript dosyalarÃ„Â±nÃ„Â± dÃƒÂ¼zenlemeden sonra formatla"
}

// git push ÃƒÂ¶ncesi uyar
{
  "matcher": "tool == \"Bash\" && tool_input.command matches \"git push\"",
  "hooks": [{"type": "command", "command": "echo '[Hook] Push yapmadan ÃƒÂ¶nce deÃ„Å¸iÃ…Å¸iklikleri gÃƒÂ¶zden geÃƒÂ§irin'"}],
  "description": "Push ÃƒÂ¶ncesi gÃƒÂ¶zden geÃƒÂ§irme hatÃ„Â±rlatÃ„Â±cÃ„Â±sÃ„Â±"
}
```

### Hook Kontrol Listesi

- [ ] Matcher spesifik (aÃ…Å¸Ã„Â±rÃ„Â± geniÃ…Å¸ deÃ„Å¸il)
- [ ] Net hata/bilgi mesajlarÃ„Â± iÃƒÂ§eriyor
- [ ] DoÃ„Å¸ru ÃƒÂ§Ã„Â±kÃ„Â±Ã…Å¸ kodlarÃ„Â±nÃ„Â± kullanÃ„Â±yor (`exit 1` engeller, `exit 0` izin verir)
- [ ] KapsamlÃ„Â± test edilmiÃ…Å¸
- [ ] AÃƒÂ§Ã„Â±klama iÃƒÂ§eriyor

---

## Command'lara KatkÃ„Â±da Bulunma

Command'lar, `/command-name` ile kullanÃ„Â±cÃ„Â± tarafÃ„Â±ndan ÃƒÂ§aÃ„Å¸rÃ„Â±lan eylemlerdir.

### Dosya Konumu

```
commands/your-command.md
```

### Command Ã…Å¾ablonu

```markdown
---
description: /help'te gÃƒÂ¶sterilen kÃ„Â±sa aÃƒÂ§Ã„Â±klama
---

# Command AdÃ„Â±

## AmaÃƒÂ§

Bu command'Ã„Â±n ne yaptÃ„Â±Ã„Å¸Ã„Â±.

## KullanÃ„Â±m

\`\`\`
/your-command [args]
\`\`\`

## Workflow

1. Ã„Â°lk adÃ„Â±m
2. Ã„Â°kinci adÃ„Â±m
3. Son adÃ„Â±m

## Ãƒâ€¡Ã„Â±ktÃ„Â±

KullanÃ„Â±cÃ„Â±nÃ„Â±n aldÃ„Â±Ã„Å¸Ã„Â±.
```

### Ãƒâ€“rnek Command'lar

| Command | AmaÃƒÂ§ |
|---------|---------|
| `commit.md` | Git commit'leri oluÃ…Å¸tur |
| `code-review.md` | Kod deÃ„Å¸iÃ…Å¸ikliklerini incele |
| `tdd.md` | TDD workflow'u |
| `e2e.md` | E2E test |

---

## MCP ve dokÃƒÂ¼mantasyon (ÃƒÂ¶rn. Context7)

Skill'ler ve agent'lar, sadece eÃ„Å¸itim verilerine gÃƒÂ¼venmek yerine gÃƒÂ¼ncel verileri ÃƒÂ§ekmek iÃƒÂ§in **MCP (Model Context Protocol)** tool'larÃ„Â±nÃ„Â± kullanabilir. Bu ÃƒÂ¶zellikle dokÃƒÂ¼mantasyon iÃƒÂ§in faydalÃ„Â±dÃ„Â±r.

- **Context7**, `resolve-library-id` ve `query-docs`'u aÃƒÂ§Ã„Â±Ã„Å¸a ÃƒÂ§Ã„Â±karan bir MCP server'Ã„Â±dÃ„Â±r. KullanÃ„Â±cÃ„Â± kÃƒÂ¼tÃƒÂ¼phaneler, framework'ler veya API'ler hakkÃ„Â±nda sorduÃ„Å¸unda, cevaplarÃ„Â±n gÃƒÂ¼ncel dokÃƒÂ¼mantasyonu ve kod ÃƒÂ¶rneklerini yansÃ„Â±tmasÃ„Â± iÃƒÂ§in kullanÃ„Â±n.
- CanlÃ„Â± dokÃƒÂ¼mantasyona baÃ„Å¸lÃ„Â± **skill'lere** katkÃ„Â±da bulunurken (ÃƒÂ¶rn. kurulum, API kullanÃ„Â±mÃ„Â±), ilgili MCP tool'larÃ„Â±nÃ„Â±n nasÃ„Â±l kullanÃ„Â±lacaÃ„Å¸Ã„Â±nÃ„Â± aÃƒÂ§Ã„Â±klayÃ„Â±n (ÃƒÂ¶rn. kÃƒÂ¼tÃƒÂ¼phane ID'sini ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mle, ardÃ„Â±ndan dokÃƒÂ¼mantasyonu sorgula) ve pattern olarak `documentation-lookup` skill'ine veya Context7'ye iÃ…Å¸aret edin.
- DokÃƒÂ¼mantasyon/API sorularÃ„Â±nÃ„Â± yanÃ„Â±tlayan **agent'lara** katkÃ„Â±da bulunurken, agent'Ã„Â±n tool'larÃ„Â±na Context7 MCP tool isimlerini ekleyin (ÃƒÂ¶rn. `mcp__context7__resolve-library-id`, `mcp__context7__query-docs`) ve ÃƒÂ§ÃƒÂ¶zÃƒÂ¼mle Ã¢â€ â€™ sorgula workflow'unu belgeleyin.
- **mcp-configs/mcp-servers.json** bir Context7 giriÃ…Å¸i iÃƒÂ§erir; kullanÃ„Â±cÃ„Â±lar `documentation-lookup` skill'ini (`skills/documentation-lookup/` iÃƒÂ§inde) ve `/docs` command'Ã„Â±nÃ„Â± kullanmak iÃƒÂ§in bunu harness'lerinde (ÃƒÂ¶rn. Claude Code, Cursor) etkinleÃ…Å¸tirir.

---

## Cross-Harness ve Ãƒâ€¡eviriler

### Skill alt kÃƒÂ¼meleri (Codex ve Cursor)

ECC, diÃ„Å¸er harness'ler iÃƒÂ§in skill alt kÃƒÂ¼meleri iÃƒÂ§erir:

- **Codex:** `.agents/skills/` Ã¢â‚¬â€ `agents/openai.yaml` iÃƒÂ§inde listelenen skill'ler Codex tarafÃ„Â±ndan yÃƒÂ¼klenir.
- **Cursor:** `.cursor/skills/` Ã¢â‚¬â€ Cursor iÃƒÂ§in bir skill alt kÃƒÂ¼mesi paketlenmiÃ…Å¸tir.

Codex veya Cursor'da kullanÃ„Â±labilir olmasÃ„Â± gereken **yeni bir skill eklediÃ„Å¸inizde**:

1. Skill'i her zamanki gibi `skills/your-skill-name/` altÃ„Â±na ekleyin.
2. **Codex**'te kullanÃ„Â±labilir olmasÃ„Â± gerekiyorsa, `.agents/skills/` altÃ„Â±na ekleyin (skill dizinini kopyalayÃ„Â±n veya referans ekleyin) ve gerekirse `agents/openai.yaml` iÃƒÂ§inde referans verildiÃ„Å¸inden emin olun.
3. **Cursor**'da kullanÃ„Â±labilir olmasÃ„Â± gerekiyorsa, Cursor'un dÃƒÂ¼zenine gÃƒÂ¶re `.cursor/skills/` altÃ„Â±na ekleyin.

Beklenen yapÃ„Â± iÃƒÂ§in bu dizinlerdeki mevcut skill'leri kontrol edin. Bu alt kÃƒÂ¼meleri senkronize tutmak manuel bir iÃ…Å¸lemdir; bunlarÃ„Â± gÃƒÂ¼ncellediyseniz PR'Ã„Â±nÃ„Â±zda belirtin.

### Ãƒâ€¡eviriler

Ãƒâ€¡eviriler `docs/` altÃ„Â±nda bulunur (ÃƒÂ¶rn. `docs/zh-CN`, `docs/zh-TW`, `docs/ja-JP`). Ãƒâ€¡evrilmiÃ…Å¸ agent'larÃ„Â±, command'larÃ„Â± veya skill'leri deÃ„Å¸iÃ…Å¸tirirseniz, ilgili ÃƒÂ§eviri dosyalarÃ„Â±nÃ„Â± gÃƒÂ¼ncellemeyi veya bakÃ„Â±mcÃ„Â±larÃ„Â±n ya da ÃƒÂ§evirmenlerin bunlarÃ„Â± gÃƒÂ¼ncelleyebilmesi iÃƒÂ§in bir issue aÃƒÂ§mayÃ„Â± dÃƒÂ¼Ã…Å¸ÃƒÂ¼nÃƒÂ¼n.

---

## Pull Request SÃƒÂ¼reci

### 1. PR BaÃ…Å¸lÃ„Â±k FormatÃ„Â±

```
feat(skills): add rust-patterns skill
feat(agents): add api-designer agent
feat(hooks): add auto-format hook
fix(skills): update React patterns
docs: improve contributing guide
```

### 2. PR AÃƒÂ§Ã„Â±klamasÃ„Â±

```markdown
## Ãƒâ€“zet
Ne eklediÃ„Å¸iniz ve neden.

## TÃƒÂ¼r
- [ ] Skill
- [ ] Agent
- [ ] Hook
- [ ] Command

## Test
Bunu nasÃ„Â±l test ettiniz.

## Kontrol Listesi
- [ ] Format yÃƒÂ¶nergelerini takip ediyor
- [ ] Claude Code ile test edildi
- [ ] Hassas bilgi yok (API anahtarlarÃ„Â±, yollar)
- [ ] Net aÃƒÂ§Ã„Â±klamalar
```

### 3. Ã„Â°nceleme SÃƒÂ¼reci

1. BakÃ„Â±mcÃ„Â±lar 48 saat iÃƒÂ§inde inceler
2. Ã„Â°stenirse geri bildirimlere cevap verin
3. OnaylandÃ„Â±Ã„Å¸Ã„Â±nda, main'e merge edilir

---

## YÃƒÂ¶nergeler

### YapÃ„Â±n
- KatkÃ„Â±larÃ„Â± odaklanmÃ„Â±Ã…Å¸ ve modÃƒÂ¼ler tutun
- Net aÃƒÂ§Ã„Â±klamalar ekleyin
- GÃƒÂ¶ndermeden ÃƒÂ¶nce test edin
- Mevcut pattern'leri takip edin
- BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± belgeleyin

### YapmayÃ„Â±n
- Hassas veri eklemeyin (API anahtarlarÃ„Â±, token'lar, yollar)
- AÃ…Å¸Ã„Â±rÃ„Â± karmaÃ…Å¸Ã„Â±k veya niÃ…Å¸ config'ler eklemeyin
- Test edilmemiÃ…Å¸ katkÃ„Â±lar gÃƒÂ¶ndermeyin
- Mevcut iÃ…Å¸levselliÃ„Å¸in kopyalarÃ„Â±nÃ„Â± oluÃ…Å¸turmayÃ„Â±n

---

## Dosya AdlandÃ„Â±rma

- Tire ile kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k harf kullanÃ„Â±n: `python-reviewer.md`
- AÃƒÂ§Ã„Â±klayÃ„Â±cÃ„Â± olun: `tdd-workflow.md` deÃ„Å¸il `workflow.md`
- Ã„Â°sim, dosya adÃ„Â±yla eÃ…Å¸leÃ…Å¸sin

---

## SorularÃ„Â±nÃ„Â±z mÃ„Â± var?

- **Issue'lar:** [github.com/affaan-m/everything-claude-code/issues](https://github.com/affaan-m/everything-claude-code/issues)
- **X/Twitter:** [@affaanmustafa](https://x.com/affaanmustafa)

---

KatkÃ„Â±da bulunduÃ„Å¸unuz iÃƒÂ§in teÃ…Å¸ekkÃƒÂ¼rler! Birlikte harika bir kaynak oluÃ…Å¸turalÃ„Â±m.
