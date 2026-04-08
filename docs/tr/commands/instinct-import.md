---
name: instinct-import
description: Ã„Â°ÃƒÂ§gÃƒÂ¼dÃƒÂ¼leri dosya veya URL'den proje/global kapsama aktar
command: true
---

# Instinct Import Komutu

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Uygulama

Plugin root path kullanarak instinct CLI'Ã„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/scripts/instinct-cli.py" import <file-or-url> [--dry-run] [--force] [--min-confidence 0.7] [--scope project|global]
```

Veya `CLAUDE_PLUGIN_ROOT` ayarlanmamÃ„Â±Ã…Å¸sa (manuel kurulum):

```bash
python3 ~/.claude/skills/continuous-learning-v2/scripts/instinct-cli.py import <file-or-url>
```

Yerel dosya yollarÃ„Â±ndan veya HTTP(S) URL'lerinden iÃƒÂ§gÃƒÂ¼dÃƒÂ¼leri iÃƒÂ§e aktar.

## KullanÃ„Â±m

```
/instinct-import team-instincts.yaml
/instinct-import https://raw.githubusercontent.com/org/repo/main/instincts.yaml
/instinct-import team-instincts.yaml --dry-run
/instinct-import team-instincts.yaml --scope global --force
```

## YapÃ„Â±lacaklar

1. Ã„Â°ÃƒÂ§gÃƒÂ¼dÃƒÂ¼ dosyasÃ„Â±nÃ„Â± al (yerel yol veya URL)
2. FormatÃ„Â± doÃ„Å¸rula ve ayrÃ„Â±Ã…Å¸tÃ„Â±r
3. Mevcut iÃƒÂ§gÃƒÂ¼dÃƒÂ¼lerle duplikasyon kontrolÃƒÂ¼ yap
4. Yeni iÃƒÂ§gÃƒÂ¼dÃƒÂ¼leri birleÃ…Å¸tir veya ekle
5. Ã„Â°ÃƒÂ§gÃƒÂ¼dÃƒÂ¼leri inherited dizinine kaydet:
   - Proje kapsamÃ„Â±: `~/.claude/homunculus/projects/<project-id>/instincts/inherited/`
   - Global kapsam: `~/.claude/homunculus/instincts/inherited/`

## Ã„Â°ÃƒÂ§e Aktarma Ã„Â°Ã…Å¸lemi

```
 Importing instincts from: team-instincts.yaml
================================================

Found 12 instincts to import.

Analyzing conflicts...

## New Instincts (8)
These will be added:
  Ã¢Å“â€œ use-zod-validation (confidence: 0.7)
  Ã¢Å“â€œ prefer-named-exports (confidence: 0.65)
  Ã¢Å“â€œ test-async-functions (confidence: 0.8)
  ...

## Duplicate Instincts (3)
Already have similar instincts:
  WARNING: prefer-functional-style
     Local: 0.8 confidence, 12 observations
     Import: 0.7 confidence
     Ã¢â€ â€™ Keep local (higher confidence)

  WARNING: test-first-workflow
     Local: 0.75 confidence
     Import: 0.9 confidence
     Ã¢â€ â€™ Update to import (higher confidence)

Import 8 new, update 1?
```

## BirleÃ…Å¸tirme DavranÃ„Â±Ã…Å¸Ã„Â±

Mevcut ID'ye sahip bir iÃƒÂ§gÃƒÂ¼dÃƒÂ¼ iÃƒÂ§e aktarÃ„Â±lÃ„Â±rken:
- Daha yÃƒÂ¼ksek gÃƒÂ¼venli iÃƒÂ§e aktarma gÃƒÂ¼ncelleme adayÃ„Â± olur
- EÃ…Å¸it/dÃƒÂ¼Ã…Å¸ÃƒÂ¼k gÃƒÂ¼venli iÃƒÂ§e aktarma atlanÃ„Â±r
- `--force` kullanÃ„Â±lmadÃ„Â±kÃƒÂ§a kullanÃ„Â±cÃ„Â± onaylar

## Kaynak Ã„Â°zleme

Ã„Â°ÃƒÂ§e aktarÃ„Â±lan iÃƒÂ§gÃƒÂ¼dÃƒÂ¼ler Ã…Å¸u Ã…Å¸ekilde iÃ…Å¸aretlenir:
```yaml
source: inherited
scope: project
imported_from: "team-instincts.yaml"
project_id: "a1b2c3d4e5f6"
project_name: "my-project"
```

## Bayraklar

- `--dry-run`: Ã„Â°ÃƒÂ§e aktarmadan ÃƒÂ¶nizle
- `--force`: Onay istemini atla
- `--min-confidence <n>`: Sadece eÃ…Å¸iÃ„Å¸in ÃƒÂ¼zerindeki iÃƒÂ§gÃƒÂ¼dÃƒÂ¼leri iÃƒÂ§e aktar
- `--scope <project|global>`: Hedef kapsamÃ„Â± seÃƒÂ§ (varsayÃ„Â±lan: `project`)

## Ãƒâ€¡Ã„Â±ktÃ„Â±

Ã„Â°ÃƒÂ§e aktarma sonrasÃ„Â±:
```
PASS: Import complete!

Added: 8 instincts
Updated: 1 instinct
Skipped: 3 instincts (equal/higher confidence already exists)

New instincts saved to: ~/.claude/homunculus/instincts/inherited/

Run /instinct-status to see all instincts.
```
