# Update Documentation

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


DokÃƒÂ¼manlarÃ„Â± codebase ile senkronize et, truth-of-source dosyalarÃ„Â±ndan oluÃ…Å¸tur.

## AdÃ„Â±m 1: Truth KaynaklarÃ„Â±nÃ„Â± TanÃ„Â±mla

| Kaynak | OluÃ…Å¸turur |
|--------|-----------|
| `package.json` scripts | Mevcut komutlar referansÃ„Â± |
| `.env.example` | Environment variable dokÃƒÂ¼manÃ„Â± |
| `openapi.yaml` / route dosyalarÃ„Â± | API endpoint referansÃ„Â± |
| Kaynak kod export'larÃ„Â± | Public API dokÃƒÂ¼manÃ„Â± |
| `Dockerfile` / `docker-compose.yml` | AltyapÃ„Â± kurulum dokÃƒÂ¼manlarÃ„Â± |

## AdÃ„Â±m 2: Script ReferansÃ„Â± OluÃ…Å¸tur

1. `package.json`'Ã„Â± oku (veya `Makefile`, `Cargo.toml`, `pyproject.toml`)
2. TÃƒÂ¼m script'leri/komutlarÃ„Â± aÃƒÂ§Ã„Â±klamalarÃ„Â±yla birlikte ÃƒÂ§Ã„Â±kar
3. Bir referans tablosu oluÃ…Å¸tur:

```markdown
| Command | Description |
|---------|-------------|
| `npm run dev` | Hot reload ile development server'Ã„Â± baÃ…Å¸lat |
| `npm run build` | Type checking ile production build |
| `npm test` | Coverage ile test suite'ini ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r |
```

## AdÃ„Â±m 3: Environment DokÃƒÂ¼manÃ„Â± OluÃ…Å¸tur

1. `.env.example`'Ã„Â± oku (veya `.env.template`, `.env.sample`)
2. TÃƒÂ¼m deÃ„Å¸iÃ…Å¸kenleri amaÃƒÂ§larÃ„Â±yla birlikte ÃƒÂ§Ã„Â±kar
3. Zorunlu vs isteÃ„Å¸e baÃ„Å¸lÃ„Â± olarak kategorize et
4. Beklenen format ve geÃƒÂ§erli deÃ„Å¸erleri dokÃƒÂ¼mante et

```markdown
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL baÃ„Å¸lantÃ„Â± string'i | `postgres://user:pass@host:5432/db` |
| `LOG_LEVEL` | No | Log detay seviyesi (varsayÃ„Â±lan: info) | `debug`, `info`, `warn`, `error` |
```

## AdÃ„Â±m 4: Contributing Guide'Ã„Â± GÃƒÂ¼ncelle

`docs/CONTRIBUTING.md`'yi Ã…Å¸unlarla oluÃ…Å¸tur veya gÃƒÂ¼ncelle:
- Development environment kurulumu (ÃƒÂ¶n koÃ…Å¸ullar, kurulum adÃ„Â±mlarÃ„Â±)
- Mevcut script'ler ve amaÃƒÂ§larÃ„Â±
- Test prosedÃƒÂ¼rleri (nasÃ„Â±l ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±lÃ„Â±r, nasÃ„Â±l yeni test yazÃ„Â±lÃ„Â±r)
- Kod stili zorlama (linter, formatter, pre-commit hook'larÃ„Â±)
- PR gÃƒÂ¶nderim kontrol listesi

## AdÃ„Â±m 5: Runbook'u GÃƒÂ¼ncelle

`docs/RUNBOOK.md`'yi Ã…Å¸unlarla oluÃ…Å¸tur veya gÃƒÂ¼ncelle:
- Deployment prosedÃƒÂ¼rleri (adÃ„Â±m adÃ„Â±m)
- Health check endpoint'leri ve izleme
- YaygÃ„Â±n sorunlar ve dÃƒÂ¼zeltmeleri
- Rollback prosedÃƒÂ¼rleri
- UyarÃ„Â± ve eskalasyon yollarÃ„Â±

## AdÃ„Â±m 6: GÃƒÂ¼ncellik KontrolÃƒÂ¼

1. 90+ gÃƒÂ¼n deÃ„Å¸iÃ…Å¸tirilmemiÃ…Å¸ dokÃƒÂ¼man dosyalarÃ„Â±nÃ„Â± bul
2. Son kaynak kod deÃ„Å¸iÃ…Å¸iklikleriyle ÃƒÂ§apraz referans yap
3. Manuel gÃƒÂ¶zden geÃƒÂ§irme iÃƒÂ§in potansiyel gÃƒÂ¼ncel olmayan dokÃƒÂ¼manlarÃ„Â± iÃ…Å¸aretle

## AdÃ„Â±m 7: Ãƒâ€“zeti GÃƒÂ¶ster

```
Documentation Update
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
Updated:  docs/CONTRIBUTING.md (scripts table)
Updated:  docs/ENV.md (3 new variables)
Flagged:  docs/DEPLOY.md (142 days stale)
Skipped:  docs/API.md (no changes detected)
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
```

## Kurallar

- **Tek truth kaynaÃ„Å¸Ã„Â±**: Her zaman koddan oluÃ…Å¸tur, oluÃ…Å¸turulan bÃƒÂ¶lÃƒÂ¼mleri asla manuel dÃƒÂ¼zenleme
- **Manuel bÃƒÂ¶lÃƒÂ¼mleri koru**: Sadece oluÃ…Å¸turulan bÃƒÂ¶lÃƒÂ¼mleri gÃƒÂ¼ncelle; elle yazÃ„Â±lmÃ„Â±Ã…Å¸ prose'u bozulmamÃ„Â±Ã…Å¸ bÃ„Â±rak
- **OluÃ…Å¸turulan iÃƒÂ§eriÃ„Å¸i iÃ…Å¸aretle**: OluÃ…Å¸turulan bÃƒÂ¶lÃƒÂ¼mlerin etrafÃ„Â±nda `<!-- AUTO-GENERATED -->` marker'larÃ„Â± kullan
- **Ã„Â°stenmeyen dokÃƒÂ¼man oluÃ…Å¸turma**: Sadece komut aÃƒÂ§Ã„Â±kÃƒÂ§a talep ederse yeni dokÃƒÂ¼man dosyalarÃ„Â± oluÃ…Å¸tur
