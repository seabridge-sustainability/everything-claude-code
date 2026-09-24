# Güvenlik Politikası

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

## Desteklenen Sürümler

| Sürüm   | Destekleniyor      |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## Güvenlik Açığı Bildirimi

ECC'de bir güvenlik açığı keşfederseniz, lütfen sorumlu bir şekilde bildirin.

**Güvenlik açıkları için herkese açık GitHub issue açmayın.**

Bunun yerine, **<security@ecc.tools>** adresine aşağıdaki bilgilerle e-posta gönderin:

- Güvenlik açığının açıklaması
- Yeniden oluşturma adımları
- Etkilenen sürüm(ler)
- Potansiyel etki değerlendirmesi

Beklentileriniz:

- 48 saat içinde **onay**
- 7 gün içinde **durum güncellemesi**
- Kritik sorunlar için 30 gün içinde **düzeltme veya azaltma**

Güvenlik açığı kabul edilirse:

- Sürüm notlarında size teşekkür edeceğiz (anonim kalmayı tercih etmiyorsanız)
- Sorunu zamanında düzelteceğiz
- Açıklama zamanlamasını sizinle koordine edeceğiz

Güvenlik açığı reddedilirse, nedenini açıklayacağız ve başka bir yere bildirilmesi gerekip gerekmediği konusunda rehberlik sağlayacağız.

## Kapsam

Bu politika aşağıdakileri kapsar:

- ECC eklentisi ve bu depodaki tüm script'ler
- Makinenizde çalışan hook script'leri
- Install/uninstall/repair yaşam döngüsü script'leri
- ECC ile birlikte gelen MCP konfigürasyonları
- AgentShield güvenlik tarayıcısı ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## Güvenlik Kaynakları

- **AgentShield**: Agent konfigürasyonunuzu güvenlik açıkları için tarayın — `npx ecc-agentshield scan`
- **Güvenlik Kılavuzu**: [The Shorthand Guide to Everything Agentic Security](./the-security-guide.md)
- **OWASP MCP Top 10**: [owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
- **OWASP Agentic Applications Top 10**: [genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
