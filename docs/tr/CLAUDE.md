# CLAUDE.md

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


Bu dosya, bu depodaki kodlarla ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±rken Claude Code'a (claude.ai/code) rehberlik saÃ„Å¸lar.

## Projeye Genel BakÃ„Â±Ã…Å¸

Bu bir **Claude Code plugin**'idir - ÃƒÂ¼retime hazÃ„Â±r agent'lar, skill'ler, hook'lar, komutlar, kurallar ve MCP konfigÃƒÂ¼rasyonlarÃ„Â±ndan oluÃ…Å¸an bir koleksiyondur. Proje, Claude Code kullanarak yazÃ„Â±lÃ„Â±m geliÃ…Å¸tirme iÃƒÂ§in test edilmiÃ…Å¸ iÃ…Å¸ akÃ„Â±Ã…Å¸larÃ„Â± saÃ„Å¸lar.

## Testleri Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rma

```bash
# TÃƒÂ¼m testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
node tests/run-all.js

# Tekil test dosyalarÃ„Â±nÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
```

## Mimari

Proje, birkaÃƒÂ§ temel bileÃ…Å¸en halinde organize edilmiÃ…Å¸tir:

- **agents/** - Delegasyon iÃƒÂ§in ÃƒÂ¶zelleÃ…Å¸miÃ…Å¸ alt agent'lar (planner, code-reviewer, tdd-guide, vb.)
- **skills/** - Ã„Â°Ã…Å¸ akÃ„Â±Ã…Å¸Ã„Â± tanÃ„Â±mlarÃ„Â± ve alan bilgisi (coding standards, patterns, testing)
- **commands/** - KullanÃ„Â±cÃ„Â±lar tarafÃ„Â±ndan ÃƒÂ§aÃ„Å¸rÃ„Â±lan slash komutlarÃ„Â± (/tdd, /plan, /e2e, vb.)
- **hooks/** - Tetikleyici tabanlÃ„Â± otomasyonlar (session persistence, pre/post-tool hooks)
- **rules/** - Her zaman takip edilmesi gereken yÃƒÂ¶nergeler (security, coding style, testing requirements)
- **mcp-configs/** - Harici entegrasyonlar iÃƒÂ§in MCP server konfigÃƒÂ¼rasyonlarÃ„Â±
- **scripts/** - Hook'lar ve kurulum iÃƒÂ§in platformlar arasÃ„Â± Node.js yardÃ„Â±mcÃ„Â± araÃƒÂ§larÃ„Â±
- **tests/** - Script'ler ve yardÃ„Â±mcÃ„Â± araÃƒÂ§lar iÃƒÂ§in test suite

## Temel Komutlar

- `/tdd` - Test-driven development iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±
- `/plan` - Uygulama planlamasÃ„Â±
- `/e2e` - E2E testleri oluÃ…Å¸tur ve ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
- `/code-review` - Kalite incelemesi
- `/build-fix` - Build hatalarÃ„Â±nÃ„Â± dÃƒÂ¼zelt
- `/learn` - Oturumlardan kalÃ„Â±plarÃ„Â± ÃƒÂ§Ã„Â±kar
- `/skill-create` - Git geÃƒÂ§miÃ…Å¸inden skill'ler oluÃ…Å¸tur

## GeliÃ…Å¸tirme NotlarÃ„Â±

- Package manager algÃ„Â±lama: npm, pnpm, yarn, bun (`CLAUDE_PACKAGE_MANAGER` env var veya proje config ile yapÃ„Â±landÃ„Â±rÃ„Â±labilir)
- Platformlar arasÃ„Â±: Node.js script'leri aracÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla Windows, macOS, Linux desteÃ„Å¸i
- Agent formatÃ„Â±: YAML frontmatter ile Markdown (name, description, tools, model)
- Skill formatÃ„Â±: Ne zaman kullanÃ„Â±lÃ„Â±r, nasÃ„Â±l ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r, ÃƒÂ¶rnekler iÃƒÂ§in aÃƒÂ§Ã„Â±k bÃƒÂ¶lÃƒÂ¼mler iÃƒÂ§eren Markdown
- Hook formatÃ„Â±: Matcher koÃ…Å¸ullarÃ„Â± ve command/notification hook'larÃ„Â± ile JSON

## KatkÃ„Â±da Bulunma

CONTRIBUTING.md'deki formatlarÃ„Â± takip edin:
- Agents: Frontmatter ile Markdown (name, description, tools, model)
- Skills: AÃƒÂ§Ã„Â±k bÃƒÂ¶lÃƒÂ¼mler (When to Use, How It Works, Examples)
- Commands: Description frontmatter ile Markdown
- Hooks: Matcher ve hooks array ile JSON

Dosya isimlendirme: tire ile kÃƒÂ¼ÃƒÂ§ÃƒÂ¼k harfler (ÃƒÂ¶rn., `python-reviewer.md`, `tdd-workflow.md`)
