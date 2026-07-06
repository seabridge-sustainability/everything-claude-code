# Claude Code'un Her Ã…Å¾eyine Dair KÃ„Â±sa KÃ„Â±lavuz

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


![Header: Anthropic Hackathon Winner - Tips & Tricks for Claude Code](../assets/images/shortform/00-header.png)

---

**Ã…Å¾ubat ayÃ„Â±nda deneysel kullanÃ„Â±ma sunulduÃ„Å¸undan beri hevesli bir Claude Code kullanÃ„Â±cÃ„Â±sÃ„Â±yÃ„Â±m ve [@DRodriguezFX](https://x.com/DRodriguezFX) ile birlikte tamamen Claude Code kullanarak [zenith.chat](https://zenith.chat) projesiyle Anthropic x Forum Ventures hackathon'unu kazandÃ„Â±m.**

Ã„Â°Ã…Å¸te 10 aylÃ„Â±k gÃƒÂ¼nlÃƒÂ¼k kullanÃ„Â±m sonrasÃ„Â± eksiksiz kurulumum: skill'ler, hook'lar, subagent'lar, MCP'ler, plugin'ler ve gerÃƒÂ§ekten iÃ…Å¸e yarayanlar.

---

## Skill'ler ve Command'lar

Skill'ler, belirli kapsamlar ve iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â±yla sÃ„Â±nÃ„Â±rlandÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ kurallar gibi ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r. Belirli bir iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± yÃƒÂ¼rÃƒÂ¼tmeniz gerektiÃ„Å¸inde prompt'lara kÃ„Â±sayol gÃƒÂ¶revi gÃƒÂ¶rÃƒÂ¼rler.

Opus 4.5 ile uzun bir kodlama oturumundan sonra ÃƒÂ¶lÃƒÂ¼ kodu ve gevÃ…Å¸ek .md dosyalarÃ„Â±nÃ„Â± temizlemek mi istiyorsunuz? `/refactor-clean` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n. Test mi gerekli? `/tdd`, `/e2e`, `/test-coverage`. Skill'ler ayrÃ„Â±ca codemap'leri de iÃƒÂ§erebilir - Claude'un keÃ…Å¸fe context harcamadan kod tabanÃ„Â±nÃ„Â±zda hÃ„Â±zlÃ„Â±ca gezinmesi iÃƒÂ§in bir yÃƒÂ¶ntem.

![Terminal showing chained commands](../assets/images/shortform/02-chaining-commands.jpeg)
*Command'larÃ„Â± zincirleme*

Command'lar, slash command'lar aracÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla yÃƒÂ¼rÃƒÂ¼tÃƒÂ¼len skill'lerdir. Ãƒâ€“rtÃƒÂ¼Ã…Å¸ÃƒÂ¼rler ancak farklÃ„Â± Ã…Å¸ekilde saklanÃ„Â±rlar:

- **Skill'ler**: `~/.claude/skills/` - daha geniÃ…Å¸ iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± tanÃ„Â±mlarÃ„Â±
- **Command'lar**: `~/.claude/commands/` - hÃ„Â±zlÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±labilir prompt'lar

```bash
# Ãƒâ€“rnek skill yapÃ„Â±sÃ„Â±
~/.claude/skills/
  pmx-guidelines.md      # Projeye ÃƒÂ¶zel desenler
  coding-standards.md    # Dile ÃƒÂ¶zgÃƒÂ¼ en iyi uygulamalar
  tdd-workflow/          # README.md ile ÃƒÂ§ok dosyalÃ„Â± skill
  security-review/       # Kontrol listesi tabanlÃ„Â± skill
```

---

## Hook'lar

Hook'lar, belirli olaylarda tetiklenen otomasyonlardÃ„Â±r. Skill'lerin aksine, araÃƒÂ§ ÃƒÂ§aÃ„Å¸rÃ„Â±larÃ„Â± ve yaÃ…Å¸am dÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼ olaylarÃ„Â±yla sÃ„Â±nÃ„Â±rlÃ„Â±dÃ„Â±rlar.

**Hook TÃƒÂ¼rleri:**

1. **PreToolUse** - Bir araÃƒÂ§ ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±lmadan ÃƒÂ¶nce (doÃ„Å¸rulama, hatÃ„Â±rlatmalar)
2. **PostToolUse** - Bir araÃƒÂ§ bittikten sonra (biÃƒÂ§imlendirme, geri bildirim dÃƒÂ¶ngÃƒÂ¼leri)
3. **UserPromptSubmit** - Bir mesaj gÃƒÂ¶nderdiÃ„Å¸inizde
4. **Stop** - Claude yanÃ„Â±t vermeyi bitirdiÃ„Å¸inde
5. **PreCompact** - Context sÃ„Â±kÃ„Â±Ã…Å¸tÃ„Â±rmasÃ„Â±ndan ÃƒÂ¶nce
6. **Notification** - Ã„Â°zin istekleri

**Ãƒâ€“rnek: uzun sÃƒÂ¼ren komutlardan ÃƒÂ¶nce tmux hatÃ„Â±rlatmasÃ„Â±**

```json
{
  "PreToolUse": [
    {
      "matcher": "tool == \"Bash\" && tool_input.command matches \"(npm|pnpm|yarn|cargo|pytest)\"",
      "hooks": [
        {
          "type": "command",
          "command": "if [ -z \"$TMUX\" ]; then echo '[Hook] Consider tmux for session persistence' >&2; fi"
        }
      ]
    }
  ]
}
```

![PostToolUse hook feedback](../assets/images/shortform/03-posttooluse-hook.png)
*PostToolUse hook ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±rken Claude Code'da aldÃ„Â±Ã„Å¸Ã„Â±nÃ„Â±z geri bildirimin ÃƒÂ¶rneÃ„Å¸i*

**Pro ipucu:** JSON'u manuel yazmak yerine hook'larÃ„Â± konuÃ…Å¸arak oluÃ…Å¸turmak iÃƒÂ§in `hookify` plugin'ini kullanÃ„Â±n. `/hookify` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n ve ne istediÃ„Å¸inizi aÃƒÂ§Ã„Â±klayÃ„Â±n.

---

## Subagent'lar

Subagent'lar, ana Claude'unuzun (orchestrator) sÃ„Â±nÃ„Â±rlÃ„Â± kapsamlarla gÃƒÂ¶rev devredebileceÃ„Å¸i sÃƒÂ¼reÃƒÂ§lerdir. Arka planda veya ÃƒÂ¶n planda ÃƒÂ§alÃ„Â±Ã…Å¸abilir, ana agent iÃƒÂ§in context'i serbest bÃ„Â±rakÃ„Â±rlar.

Subagent'lar skill'lerle gÃƒÂ¼zel ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r - skill'lerinizin bir alt kÃƒÂ¼mesini yÃƒÂ¼rÃƒÂ¼tebilen bir subagent'a gÃƒÂ¶revler devredebilir ve bu skill'leri ÃƒÂ¶zerk olarak kullanabilir. AyrÃ„Â±ca belirli araÃƒÂ§ izinleriyle sandbox'lanabilirler.

```bash
# Ãƒâ€“rnek subagent yapÃ„Â±sÃ„Â±
~/.claude/agents/
  planner.md           # Ãƒâ€“zellik uygulama planlamasÃ„Â±
  architect.md         # Sistem tasarÃ„Â±m kararlarÃ„Â±
  tdd-guide.md         # Test odaklÃ„Â± geliÃ…Å¸tirme
  code-reviewer.md     # Kalite/gÃƒÂ¼venlik incelemesi
  security-reviewer.md # GÃƒÂ¼venlik aÃƒÂ§Ã„Â±Ã„Å¸Ã„Â± analizi
  build-error-resolver.md
  e2e-runner.md
  refactor-cleaner.md
```

Uygun kapsam belirleme iÃƒÂ§in her subagent iÃƒÂ§in izin verilen araÃƒÂ§larÃ„Â±, MCP'leri ve izinleri yapÃ„Â±landÃ„Â±rÃ„Â±n.

---

## Rule'lar ve Memory

`.rules` klasÃƒÂ¶rÃƒÂ¼nÃƒÂ¼z, Claude'un HER ZAMAN izlemesi gereken en iyi uygulamalarÃ„Â± iÃƒÂ§eren `.md` dosyalarÃ„Â±nÃ„Â± barÃ„Â±ndÃ„Â±rÃ„Â±r. Ã„Â°ki yaklaÃ…Å¸Ã„Â±m:

1. **Tek CLAUDE.md** - Her Ã…Å¸ey tek bir dosyada (kullanÃ„Â±cÃ„Â± veya proje seviyesi)
2. **Rules klasÃƒÂ¶rÃƒÂ¼** - EndiÃ…Å¸elere gÃƒÂ¶re gruplandÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ modÃƒÂ¼ler `.md` dosyalarÃ„Â±

```bash
~/.claude/rules/
  security.md      # Sabit kodlanmÃ„Â±Ã…Å¸ secret yok, giriÃ…Å¸leri doÃ„Å¸rula
  coding-style.md  # DeÃ„Å¸iÃ…Å¸mezlik, dosya organizasyonu
  testing.md       # TDD iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±, %80 coverage
  git-workflow.md  # Commit formatÃ„Â±, PR sÃƒÂ¼reci
  agents.md        # Subagent'lara ne zaman delege edilir
  performance.md   # Model seÃƒÂ§imi, context yÃƒÂ¶netimi
```

**Ãƒâ€“rnek rule'lar:**

- Kod tabanÃ„Â±nda emoji yok
- Frontend'de mor tonlardan kaÃƒÂ§Ã„Â±n
- Kodu daÃ„Å¸Ã„Â±tmadan ÃƒÂ¶nce her zaman test edin
- Mega dosyalar yerine modÃƒÂ¼ler kodu ÃƒÂ¶nceliklendirin
- Asla console.log commit etmeyin

---

## MCP'ler (Model Context Protocol)

MCP'ler Claude'u doÃ„Å¸rudan harici hizmetlere baÃ„Å¸lar. API'lerin yerini tutmaz - bunlarÃ„Â±n etrafÃ„Â±nda prompt odaklÃ„Â± bir sarmalayÃ„Â±cÃ„Â±dÃ„Â±r, bilgide gezinmede daha fazla esneklik saÃ„Å¸lar.

**Ãƒâ€“rnek:** Supabase MCP, Claude'un belirli verileri ÃƒÂ§ekmesine, SQL'i kopyala-yapÃ„Â±Ã…Å¸tÃ„Â±r olmadan doÃ„Å¸rudan upstream ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmasÃ„Â±na izin verir. VeritabanlarÃ„Â±, daÃ„Å¸Ã„Â±tÃ„Â±m platformlarÃ„Â± vb. iÃƒÂ§in de aynÃ„Â±.

![Supabase MCP listing tables](../assets/images/shortform/04-supabase-mcp.jpeg)
*Supabase MCP'nin public Ã…Å¸emasÃ„Â±ndaki tablolarÃ„Â± listeleyen ÃƒÂ¶rneÃ„Å¸i*

**Claude'da Chrome:** Claude'un tarayÃ„Â±cÃ„Â±nÃ„Â±zÃ„Â± ÃƒÂ¶zerk olarak kontrol etmesine izin veren yerleÃ…Å¸ik bir plugin MCP'sidir - iÃ…Å¸lerin nasÃ„Â±l ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± gÃƒÂ¶rmek iÃƒÂ§in etrafta tÃ„Â±klar.

**KRÃ„Â°TÃ„Â°K: Context Window YÃƒÂ¶netimi**

MCP'lerle seÃƒÂ§ici olun. TÃƒÂ¼m MCP'leri kullanÃ„Â±cÃ„Â± yapÃ„Â±landÃ„Â±rmasÃ„Â±nda tutarÃ„Â±m ancak **kullanÃ„Â±lmayan her Ã…Å¸eyi devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rakÃ„Â±rÃ„Â±m**. `/plugins`'e gidin ve aÃ…Å¸aÃ„Å¸Ã„Â± kaydÃ„Â±rÃ„Â±n veya `/mcp` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n.

![/plugins interface](../assets/images/shortform/05-plugins-interface.jpeg)
*/plugins kullanarak MCP'lere giderek Ã…Å¸u anda hangi MCP'lerin yÃƒÂ¼klÃƒÂ¼ olduÃ„Å¸unu ve durumlarÃ„Â±nÃ„Â± gÃƒÂ¶rme*

SÃ„Â±kÃ„Â±Ã…Å¸tÃ„Â±rmadan ÃƒÂ¶nce 200k context window'unuz, ÃƒÂ§ok fazla araÃƒÂ§ etkinleÃ…Å¸tirilmiÃ…Å¸se sadece 70k olabilir. Performans ÃƒÂ¶nemli ÃƒÂ¶lÃƒÂ§ÃƒÂ¼de dÃƒÂ¼Ã…Å¸er.

**Genel kural:** YapÃ„Â±landÃ„Â±rmada 20-30 MCP bulundurun, ancak 10'dan az etkin / 80'den az aktif araÃƒÂ§ tutun.

```bash
# Etkin MCP'leri kontrol edin
/mcp

# ~/.claude.json iÃƒÂ§inde projects.disabledMcpServers altÃ„Â±nda kullanÃ„Â±lmayanlarÃ„Â± devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rakÃ„Â±n
```

---

## Plugin'ler

Plugin'ler, sÃ„Â±kÃ„Â±cÃ„Â± manuel kurulum yerine kolay kurulum iÃƒÂ§in araÃƒÂ§larÃ„Â± paketler. Bir plugin, birleÃ…Å¸tirilmiÃ…Å¸ bir skill + MCP veya birlikte paketlenmiÃ…Å¸ hook'lar/araÃƒÂ§lar olabilir.

**Plugin'leri yÃƒÂ¼kleme:**

```bash
# Bir marketplace ekleyin
# @mixedbread-ai tarafÃ„Â±ndan mgrep plugin
claude plugin marketplace add https://github.com/mixedbread-ai/mgrep

# Claude'u aÃƒÂ§Ã„Â±n, /plugins ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n, yeni marketplace'i bulun, oradan yÃƒÂ¼kleyin
```

![Marketplaces tab showing mgrep](../assets/images/shortform/06-marketplaces-mgrep.jpeg)
*Yeni yÃƒÂ¼klenen Mixedbread-Grep marketplace'i gÃƒÂ¶sterme*

**LSP Plugin'leri**, Claude Code'u sÃ„Â±k sÃ„Â±k editÃƒÂ¶r dÃ„Â±Ã…Å¸Ã„Â±nda ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±yorsanÃ„Â±z ÃƒÂ¶zellikle kullanÃ„Â±Ã…Å¸lÃ„Â±dÃ„Â±r. Language Server Protocol, Claude'a IDE aÃƒÂ§Ã„Â±k olmadan gerÃƒÂ§ek zamanlÃ„Â± tip kontrolÃƒÂ¼, tanÃ„Â±ma gitme ve akÃ„Â±llÃ„Â± tamamlamalar verir.

```bash
# Etkin plugin'ler ÃƒÂ¶rneÃ„Å¸i
typescript-lsp@claude-plugins-official  # TypeScript zekasÃ„Â±
pyright-lsp@claude-plugins-official     # Python tip kontrolÃƒÂ¼
hookify@claude-plugins-official         # Hook'larÃ„Â± konuÃ…Å¸arak oluÃ…Å¸turma
mgrep@Mixedbread-Grep                   # ripgrep'ten daha iyi arama
```

MCP'lerle aynÃ„Â± uyarÃ„Â± - context window'unuzu izleyin.

---

## Ã„Â°puÃƒÂ§larÃ„Â± ve PÃƒÂ¼f NoktalarÃ„Â±

### Klavye KÃ„Â±sayollarÃ„Â±

- `Ctrl+U` - TÃƒÂ¼m satÃ„Â±rÃ„Â± sil (backspace spam'inden daha hÃ„Â±zlÃ„Â±)
- `!` - HÃ„Â±zlÃ„Â± bash komutu ÃƒÂ¶neki
- `@` - Dosya arama
- `/` - Slash command'larÃ„Â± baÃ…Å¸latma
- `Shift+Enter` - Ãƒâ€¡ok satÃ„Â±rlÃ„Â± girdi
- `Tab` - DÃƒÂ¼Ã…Å¸ÃƒÂ¼nme gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼sÃƒÂ¼nÃƒÂ¼ deÃ„Å¸iÃ…Å¸tir
- `Esc Esc` - Claude'u kesme / kodu geri yÃƒÂ¼kleme

### Paralel Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸larÃ„Â±

- **Fork** (`/fork`) - Paralelde ÃƒÂ§akÃ„Â±Ã…Å¸mayan gÃƒÂ¶revler yapmak iÃƒÂ§in sÃ„Â±raya alÃ„Â±nan mesaj spam'i yerine konuÃ…Å¸malarÃ„Â± fork'layÃ„Â±n
- **Git Worktree'ler** - Ãƒâ€¡akÃ„Â±Ã…Å¸ma olmadan paralel Claude'lar iÃƒÂ§in ÃƒÂ¶rtÃƒÂ¼Ã…Å¸en iÃ…Å¸. Her worktree baÃ„Å¸Ã„Â±msÃ„Â±z bir checkout'tur

```bash
git worktree add ../feature-branch feature-branch
# Ã…Å¾imdi her worktree'de ayrÃ„Â± Claude instance'larÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n
```

### Uzun SÃƒÂ¼ren Komutlar iÃƒÂ§in tmux

Claude'un ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rdÃ„Â±Ã„Å¸Ã„Â± log'larÃ„Â±/bash sÃƒÂ¼reÃƒÂ§lerini stream edin ve izleyin:

<https://github.com/user-attachments/assets/shortform/07-tmux-video.mp4>

```bash
tmux new -s dev
# Claude burada komutlar ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±r, ayrÃ„Â±lÃ„Â±p yeniden baÃ„Å¸lanabilirsiniz
tmux attach -t dev
```

### mgrep > grep

`mgrep`, ripgrep/grep'ten ÃƒÂ¶nemli bir geliÃ…Å¸medir. Plugin marketplace aracÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla yÃƒÂ¼kleyin, ardÃ„Â±ndan `/mgrep` skill'ini kullanÃ„Â±n. Hem yerel arama hem de web aramasÃ„Â±yla ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r.

```bash
mgrep "function handleSubmit"  # Yerel arama
mgrep --web "Next.js 15 app router changes"  # Web aramasÃ„Â±
```

### DiÃ„Å¸er KullanÃ„Â±Ã…Å¸lÃ„Â± Command'lar

- `/rewind` - Ãƒâ€“nceki bir duruma geri dÃƒÂ¶n
- `/statusline` - Branch, context %, todo'larla ÃƒÂ¶zelleÃ…Å¸tir
- `/checkpoints` - Dosya seviyesi geri alma noktalarÃ„Â±
- `/compact` - Context sÃ„Â±kÃ„Â±Ã…Å¸tÃ„Â±rmasÃ„Â±nÃ„Â± manuel olarak tetikle

### GitHub Actions CI/CD

PR'larÃ„Â±nÃ„Â±zda GitHub Actions ile kod incelemesi kurun. Claude yapÃ„Â±landÃ„Â±rÃ„Â±ldÃ„Â±Ã„Å¸Ã„Â±nda PR'larÃ„Â± otomatik olarak inceleyebilir.

![Claude bot approving a PR](../assets/images/shortform/08-github-pr-review.jpeg)
*Claude bir bug dÃƒÂ¼zeltme PR'Ã„Â±nÃ„Â± onaylÃ„Â±yor*

### Sandboxing

Riskli iÃ…Å¸lemler iÃƒÂ§in sandbox modunu kullanÃ„Â±n - Claude gerÃƒÂ§ek sisteminizi etkilemeden kÃ„Â±sÃ„Â±tlÃ„Â± ortamda ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r.

---

## EditÃƒÂ¶rler HakkÃ„Â±nda

EditÃƒÂ¶r seÃƒÂ§iminiz Claude Code iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± ÃƒÂ¶nemli ÃƒÂ¶lÃƒÂ§ÃƒÂ¼de etkiler. Claude Code herhangi bir terminalden ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±rken, yetenekli bir editÃƒÂ¶rle eÃ…Å¸leÃ…Å¸tirmek gerÃƒÂ§ek zamanlÃ„Â± dosya takibi, hÃ„Â±zlÃ„Â± gezinme ve entegre komut yÃƒÂ¼rÃƒÂ¼tme saÃ„Å¸lar.

### Zed (Benim Tercihim)

Ben [Zed](https://zed.dev) kullanÃ„Â±yorum - Rust ile yazÃ„Â±lmÃ„Â±Ã…Å¸, bu nedenle gerÃƒÂ§ekten hÃ„Â±zlÃ„Â±. AnÃ„Â±nda aÃƒÂ§Ã„Â±lÃ„Â±r, bÃƒÂ¼yÃƒÂ¼k kod tabanlarÃ„Â±nÃ„Â± terletmeden iÃ…Å¸ler ve sistem kaynaklarÃ„Â±na zar zor dokunur.

**Neden Zed + Claude Code harika bir kombinasyon:**

- **HÃ„Â±z** - Rust tabanlÃ„Â± performans, Claude hÃ„Â±zla dosyalarÃ„Â± dÃƒÂ¼zenlediÃ„Å¸inde gecikme olmadÃ„Â±Ã„Å¸Ã„Â± anlamÃ„Â±na gelir. EditÃƒÂ¶rÃƒÂ¼nÃƒÂ¼z ayak uydurur
- **Agent Panel Entegrasyonu** - Zed'in Claude entegrasyonu, Claude dÃƒÂ¼zenlerken dosya deÃ„Å¸iÃ…Å¸ikliklerini gerÃƒÂ§ek zamanlÃ„Â± takip etmenizi saÃ„Å¸lar. EditÃƒÂ¶rÃƒÂ¼ terk etmeden Claude'un referans verdiÃ„Å¸i dosyalar arasÃ„Â±nda geÃƒÂ§iÃ…Å¸ yapÃ„Â±n
- **CMD+Shift+R Command Palette** - TÃƒÂ¼m ÃƒÂ¶zel slash command'larÃ„Â±nÃ„Â±za, debugger'larÃ„Â±nÃ„Â±za, aranabilir bir UI'da build script'lerinize hÃ„Â±zlÃ„Â± eriÃ…Å¸im
- **Minimal Kaynak KullanÃ„Â±mÃ„Â±** - AÃ„Å¸Ã„Â±r iÃ…Å¸lemler sÃ„Â±rasÃ„Â±nda Claude ile RAM/CPU iÃƒÂ§in rekabet etmez. Opus ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±rken ÃƒÂ¶nemli
- **Vim Modu** - Bu sizin tarzÃ„Â±nÃ„Â±zsa tam vim keybinding'leri

![Zed Editor with custom commands](../assets/images/shortform/09-zed-editor.jpeg)
*CMD+Shift+R kullanarak ÃƒÂ¶zel komutlar aÃƒÂ§Ã„Â±lÃ„Â±r menÃƒÂ¼sÃƒÂ¼ olan Zed Editor. Following modu saÃ„Å¸ altta hedef iÃ…Å¸areti olarak gÃƒÂ¶sterilmiÃ…Å¸.*

**EditÃƒÂ¶rden BaÃ„Å¸Ã„Â±msÃ„Â±z Ã„Â°puÃƒÂ§larÃ„Â±:**

1. **EkranÃ„Â±nÃ„Â±zÃ„Â± bÃƒÂ¶lÃƒÂ¼n** - Bir tarafta Claude Code ile terminal, diÃ„Å¸er tarafta editÃƒÂ¶r
2. **Ctrl + G** - Claude'un ÃƒÂ¼zerinde ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±Ã„Å¸Ã„Â± dosyayÃ„Â± Zed'de hÃ„Â±zlÃ„Â±ca aÃƒÂ§Ã„Â±n
3. **Otomatik kaydetme** - Otomatik kaydetmeyi etkinleÃ…Å¸tirin bÃƒÂ¶ylece Claude'un dosya okumalarÃ„Â± her zaman gÃƒÂ¼ncel olur
4. **Git entegrasyonu** - Claude'un deÃ„Å¸iÃ…Å¸ikliklerini commit etmeden ÃƒÂ¶nce incelemek iÃƒÂ§in editÃƒÂ¶rÃƒÂ¼n git ÃƒÂ¶zelliklerini kullanÃ„Â±n
5. **Dosya izleyiciler** - Ãƒâ€¡oÃ„Å¸u editÃƒÂ¶r deÃ„Å¸iÃ…Å¸tirilen dosyalarÃ„Â± otomatik yeniden yÃƒÂ¼kler, bunun etkin olduÃ„Å¸unu doÃ„Å¸rulayÃ„Â±n

### VSCode / Cursor

Bu da geÃƒÂ§erli bir seÃƒÂ§imdir ve Claude Code ile iyi ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r. LSP iÃ…Å¸levselliÃ„Å¸ini etkinleÃ…Å¸tiren `\ide` ile editÃƒÂ¶rÃƒÂ¼nÃƒÂ¼zle otomatik senkronizasyon ile terminal formatÃ„Â±nda kullanabilirsiniz (artÃ„Â±k plugin'lerle biraz gereksiz). Veya Editor ile daha entegre olan ve eÃ…Å¸leÃ…Å¸en bir UI'ya sahip extension'Ã„Â± tercih edebilirsiniz.

![VS Code Claude Code Extension](../assets/images/shortform/10-vscode-extension.jpeg)
*VS Code extension, doÃ„Å¸rudan IDE'nize entegre edilmiÃ…Å¸ Claude Code iÃƒÂ§in native bir grafik arayÃƒÂ¼z saÃ„Å¸lar.*

---

## Benim Kurulumum

### Plugin'ler

**YÃƒÂ¼klÃƒÂ¼:** (Genellikle bunlardan sadece 4-5'i aynÃ„Â± anda etkin tutuluyor)

```markdown
ralph-wiggum@claude-code-plugins       # Loop otomasyonu
frontend-design@claude-code-plugins    # UI/UX desenleri
commit-commands@claude-code-plugins    # Git iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±
security-guidance@claude-code-plugins  # GÃƒÂ¼venlik kontrolleri
pr-review-toolkit@claude-code-plugins  # PR otomasyonu
typescript-lsp@claude-plugins-official # TS zekasÃ„Â±
hookify@claude-plugins-official        # Hook oluÃ…Å¸turma
code-simplifier@claude-plugins-official
feature-dev@claude-code-plugins
explanatory-output-style@claude-code-plugins
code-review@claude-code-plugins
context7@claude-plugins-official       # CanlÃ„Â± dokÃƒÂ¼mantasyon
pyright-lsp@claude-plugins-official    # Python tipleri
mgrep@Mixedbread-Grep                  # Daha iyi arama
```

### MCP Server'larÃ„Â±

**YapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ (KullanÃ„Â±cÃ„Â± Seviyesi):**

```json
{
  "github": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"] },
  "firecrawl": { "command": "npx", "args": ["-y", "firecrawl-mcp"] },
  "supabase": {
    "command": "npx",
    "args": ["-y", "@supabase/mcp-server-supabase@latest", "--project-ref=YOUR_REF"]
  },
  "memory": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-memory"] },
  "sequential-thinking": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
  },
  "vercel": { "type": "http", "url": "https://mcp.vercel.com" },
  "railway": { "command": "npx", "args": ["-y", "@railway/mcp-server"] },
  "cloudflare-docs": { "type": "http", "url": "https://docs.mcp.cloudflare.com/mcp" },
  "cloudflare-workers-bindings": {
    "type": "http",
    "url": "https://bindings.mcp.cloudflare.com/mcp"
  },
  "clickhouse": { "type": "http", "url": "https://mcp.clickhouse.cloud/mcp" },
  "AbletonMCP": { "command": "uvx", "args": ["ableton-mcp"] },
  "magic": { "command": "npx", "args": ["-y", "@magicuidesign/mcp@latest"] }
}
```

Bu anahtar - 14 MCP yapÃ„Â±landÃ„Â±rÃ„Â±lmÃ„Â±Ã…Å¸ ancak proje baÃ…Å¸Ã„Â±na sadece ~5-6'sÃ„Â± etkin. Context window'u saÃ„Å¸lÃ„Â±klÃ„Â± tutar.

### Ana Hook'lar

```json
{
  "PreToolUse": [
    { "matcher": "npm|pnpm|yarn|cargo|pytest", "hooks": ["tmux reminder"] },
    { "matcher": "Write && .md file", "hooks": ["block unless README/CLAUDE"] },
    { "matcher": "git push", "hooks": ["open editor for review"] }
  ],
  "PostToolUse": [
    { "matcher": "Edit && .ts/.tsx/.js/.jsx", "hooks": ["prettier --write"] },
    { "matcher": "Edit && .ts/.tsx", "hooks": ["tsc --noEmit"] },
    { "matcher": "Edit", "hooks": ["grep console.log warning"] }
  ],
  "Stop": [
    { "matcher": "*", "hooks": ["check modified files for console.log"] }
  ]
}
```

### Ãƒâ€“zel Status Line

KullanÃ„Â±cÃ„Â±, dizin, kirli gÃƒÂ¶stergeli git branch, kalan context %, model, zaman ve todo sayÃ„Â±sÃ„Â±nÃ„Â± gÃƒÂ¶sterir:

![Custom status line](../assets/images/shortform/11-statusline.jpeg)
*Mac root dizinimde ÃƒÂ¶rnek statusline*

```
affoon:~ ctx:65% Opus 4.5 19:52
Ã¢â€“Å’Ã¢â€“Å’ plan mode on (shift+tab to cycle)
```

### Rules YapÃ„Â±sÃ„Â±

```
~/.claude/rules/
  security.md      # Zorunlu gÃƒÂ¼venlik kontrolleri
  coding-style.md  # DeÃ„Å¸iÃ…Å¸mezlik, dosya boyutu limitleri
  testing.md       # TDD, %80 coverage
  git-workflow.md  # Conventional commit'ler
  agents.md        # Subagent delegasyon kurallarÃ„Â±
  patterns.md      # API yanÃ„Â±t formatlarÃ„Â±
  performance.md   # Model seÃƒÂ§imi (Haiku vs Sonnet vs Opus)
  hooks.md         # Hook dokÃƒÂ¼mantasyonu
```

### Subagent'lar

```
~/.claude/agents/
  planner.md           # Ãƒâ€“zellikleri parÃƒÂ§alara ayÃ„Â±rma
  architect.md         # Sistem tasarÃ„Â±mÃ„Â±
  tdd-guide.md         # Ãƒâ€“nce testleri yaz
  code-reviewer.md     # Kalite incelemesi
  security-reviewer.md # GÃƒÂ¼venlik aÃƒÂ§Ã„Â±Ã„Å¸Ã„Â± taramasÃ„Â±
  build-error-resolver.md
  e2e-runner.md        # Playwright testleri
  refactor-cleaner.md  # Ãƒâ€“lÃƒÂ¼ kod kaldÃ„Â±rma
  doc-updater.md       # DokÃƒÂ¼mantasyonu senkronize tut
```

---

## Temel Ãƒâ€¡Ã„Â±karÃ„Â±mlar

1. **AÃ…Å¸Ã„Â±rÃ„Â± karmaÃ…Å¸Ã„Â±klaÃ…Å¸tÃ„Â±rmayÃ„Â±n** - yapÃ„Â±landÃ„Â±rmayÃ„Â± mimari deÃ„Å¸il, ince ayar gibi ele alÃ„Â±n
2. **Context window deÃ„Å¸erlidir** - kullanÃ„Â±lmayan MCP'leri ve plugin'leri devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rakÃ„Â±n
3. **Paralel yÃƒÂ¼rÃƒÂ¼tme** - konuÃ…Å¸malarÃ„Â± fork'layÃ„Â±n, git worktree'leri kullanÃ„Â±n
4. **TekrarlananlarÃ„Â± otomatikleÃ…Å¸tirin** - biÃƒÂ§imlendirme, linting, hatÃ„Â±rlatmalar iÃƒÂ§in hook'lar
5. **Subagent'larÃ„Â±nÃ„Â±zÃ„Â± kapsamlandÃ„Â±rÃ„Â±n** - sÃ„Â±nÃ„Â±rlÃ„Â± araÃƒÂ§lar = odaklanmÃ„Â±Ã…Å¸ yÃƒÂ¼rÃƒÂ¼tme

---

## Referanslar

- [Plugin'ler ReferansÃ„Â±](https://code.claude.com/docs/en/plugins-reference)
- [Hook'lar DokÃƒÂ¼mantasyonu](https://code.claude.com/docs/en/hooks)
- [Checkpoint'leme](https://code.claude.com/docs/en/checkpointing)
- [Interactive Mode](https://code.claude.com/docs/en/interactive-mode)
- [Memory Sistemi](https://code.claude.com/docs/en/memory)
- [Subagent'lar](https://code.claude.com/docs/en/sub-agents)
- [MCP Genel BakÃ„Â±Ã…Å¸](https://code.claude.com/docs/en/mcp-overview)

---

**Not:** Bu bir detay alt kÃƒÂ¼mesidir. GeliÃ…Å¸miÃ…Å¸ desenler iÃƒÂ§in [Longform KÃ„Â±lavuzu](./the-longform-guide.md)'na bakÃ„Â±n.

---

*NYC'de [@DRodriguezFX](https://x.com/DRodriguezFX) ile [zenith.chat](https://zenith.chat) oluÃ…Å¸turarak Anthropic x Forum Ventures hackathon'unu kazandÃ„Â±m*
