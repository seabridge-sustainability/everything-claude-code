---
name: instinct-export
description: Ã„Â°ÃƒÂ§gÃƒÂ¼dÃƒÂ¼leri proje/global kapsamdan bir dosyaya aktar
command: /instinct-export
---

# Instinct Export Komutu

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


Ã„Â°ÃƒÂ§gÃƒÂ¼dÃƒÂ¼leri paylaÃ…Å¸Ã„Â±labilir bir formata aktarÃ„Â±r. Ã…Å¾unlar iÃƒÂ§in mÃƒÂ¼kemmel:
- TakÃ„Â±m arkadaÃ…Å¸larÃ„Â±yla paylaÃ…Å¸mak
- Yeni bir makineye aktarmak
- Proje konvansiyonlarÃ„Â±na katkÃ„Â±da bulunmak

## KullanÃ„Â±m

```
/instinct-export                           # TÃƒÂ¼m kiÃ…Å¸isel iÃƒÂ§gÃƒÂ¼dÃƒÂ¼leri dÃ„Â±Ã…Å¸a aktar
/instinct-export --domain testing          # Sadece testing iÃƒÂ§gÃƒÂ¼dÃƒÂ¼lerini dÃ„Â±Ã…Å¸a aktar
/instinct-export --min-confidence 0.7      # Sadece yÃƒÂ¼ksek gÃƒÂ¼venli iÃƒÂ§gÃƒÂ¼dÃƒÂ¼leri dÃ„Â±Ã…Å¸a aktar
/instinct-export --output team-instincts.yaml
/instinct-export --scope project --output project-instincts.yaml
```

## YapÃ„Â±lacaklar

1. Mevcut proje baÃ„Å¸lamÃ„Â±nÃ„Â± tespit et
2. SeÃƒÂ§ilen kapsama gÃƒÂ¶re iÃƒÂ§gÃƒÂ¼dÃƒÂ¼leri yÃƒÂ¼kle:
   - `project`: sadece mevcut proje
   - `global`: sadece global
   - `all`: proje + global birleÃ…Å¸tirilmiÃ…Å¸ (varsayÃ„Â±lan)
3. Filtreleri uygula (`--domain`, `--min-confidence`)
4. YAML formatÃ„Â±nda dosyaya yaz (veya ÃƒÂ§Ã„Â±ktÃ„Â± yolu verilmediyse stdout'a)

## Ãƒâ€¡Ã„Â±ktÃ„Â± FormatÃ„Â±

Bir YAML dosyasÃ„Â± oluÃ…Å¸turur:

```yaml
# Instincts Export
# Generated: 2025-01-22
# Source: personal
# Count: 12 instincts

---
id: prefer-functional-style
trigger: "when writing new functions"
confidence: 0.8
domain: code-style
source: session-observation
scope: project
project_id: a1b2c3d4e5f6
project_name: my-app
---

# Prefer Functional Style

## Action
Use functional patterns over classes.
```

## Bayraklar

- `--domain <name>`: Sadece belirtilen domain'i dÃ„Â±Ã…Å¸a aktar
- `--min-confidence <n>`: Minimum gÃƒÂ¼ven eÃ…Å¸iÃ„Å¸i
- `--output <file>`: Ãƒâ€¡Ã„Â±ktÃ„Â± dosya yolu (atlandÃ„Â±Ã„Å¸Ã„Â±nda stdout'a yazdÃ„Â±rÃ„Â±r)
- `--scope <project|global|all>`: DÃ„Â±Ã…Å¸a aktarma kapsamÃ„Â± (varsayÃ„Â±lan: `all`)
