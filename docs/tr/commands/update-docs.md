# Update Documentation

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
