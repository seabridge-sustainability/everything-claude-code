# Güvenlik Politikası

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
