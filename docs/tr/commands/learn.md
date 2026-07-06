# /learn - Yeniden KullanÃ„Â±labilir Desenleri Ãƒâ€¡Ã„Â±kar

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


Mevcut oturumu analiz et ve skill olarak kaydetmeye deÃ„Å¸er desenleri ÃƒÂ§Ã„Â±kar.

## Tetikleyici

Ãƒâ€“nemsiz olmayan bir sorunu ÃƒÂ§ÃƒÂ¶zdÃƒÂ¼Ã„Å¸ÃƒÂ¼nÃƒÂ¼zde, oturum sÃ„Â±rasÃ„Â±nda herhangi bir noktada `/learn` komutunu ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n.

## Ne Ãƒâ€¡Ã„Â±karÃ„Â±lmalÃ„Â±

Ã…Å¾unlarÃ„Â± arayÃ„Â±n:

1. **Hata Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼m Desenleri**
   - Hangi hata oluÃ…Å¸tu?
   - KÃƒÂ¶k neden neydi?
   - Onu ne dÃƒÂ¼zeltti?
   - Bu benzer hatalar iÃƒÂ§in yeniden kullanÃ„Â±labilir mi?

2. **Hata AyÃ„Â±klama Teknikleri**
   - Bariz olmayan hata ayÃ„Â±klama adÃ„Â±mlarÃ„Â±
   - Ã„Â°Ã…Å¸e yarayan araÃƒÂ§ kombinasyonlarÃ„Â±
   - TanÃ„Â±lama desenleri

3. **GeÃƒÂ§ici Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼mler**
   - KÃƒÂ¼tÃƒÂ¼phane gariplikleri
   - API sÃ„Â±nÃ„Â±rlamalarÃ„Â±
   - Versiyona ÃƒÂ¶zel dÃƒÂ¼zeltmeler

4. **Projeye Ãƒâ€“zgÃƒÂ¼ Desenler**
   - KeÃ…Å¸fedilen kod tabanÃ„Â± kurallarÃ„Â±
   - Verilen mimari kararlar
   - Entegrasyon desenleri

## Ãƒâ€¡Ã„Â±ktÃ„Â± FormatÃ„Â±

`~/.claude/skills/learned/[desen-adi].md` konumunda bir skill dosyasÃ„Â± oluÃ…Å¸tur:

```markdown
# [AÃƒÂ§Ã„Â±klayÃ„Â±cÃ„Â± Desen AdÃ„Â±]

**Ãƒâ€¡Ã„Â±karÃ„Â±ldÃ„Â±:** [Tarih]
**BaÃ„Å¸lam:** [Bunun ne zaman geÃƒÂ§erli olduÃ„Å¸unun kÃ„Â±sa aÃƒÂ§Ã„Â±klamasÃ„Â±]

## Sorun
[Bunun ÃƒÂ§ÃƒÂ¶zdÃƒÂ¼Ã„Å¸ÃƒÂ¼ sorun - spesifik olun]

## Ãƒâ€¡ÃƒÂ¶zÃƒÂ¼m
[Desen/teknik/geÃƒÂ§ici ÃƒÂ§ÃƒÂ¶zÃƒÂ¼m]

## Ãƒâ€“rnek
[Uygulanabilirse kod ÃƒÂ¶rneÃ„Å¸i]

## Ne Zaman KullanÃ„Â±lÃ„Â±r
[Tetikleyici koÃ…Å¸ullar - bu skill'i neyin etkinleÃ…Å¸tirmesi gerektiÃ„Å¸i]
```

## SÃƒÂ¼reÃƒÂ§

1. Ãƒâ€¡Ã„Â±karÃ„Â±labilir desenler iÃƒÂ§in oturumu incele
2. En deÃ„Å¸erli/yeniden kullanÃ„Â±labilir iÃƒÂ§gÃƒÂ¶rÃƒÂ¼yÃƒÂ¼ tanÃ„Â±mla
3. Skill dosyasÃ„Â±nÃ„Â± taslak olarak hazÃ„Â±rla
4. Kaydetmeden ÃƒÂ¶nce kullanÃ„Â±cÃ„Â±dan onay iste
5. `~/.claude/skills/learned/` konumuna kaydet

## Notlar

- Ãƒâ€“nemsiz dÃƒÂ¼zeltmeleri ÃƒÂ§Ã„Â±karmayÃ„Â±n (yazÃ„Â±m hatalarÃ„Â±, basit sÃƒÂ¶zdizimi hatalarÃ„Â±)
- Tek seferlik sorunlarÃ„Â± ÃƒÂ§Ã„Â±karmayÃ„Â±n (belirli API kesintileri, vb.)
- Gelecekteki oturumlarda zaman kazandÃ„Â±racak desenlere odaklanÃ„Â±n
- Skill'leri odaklÃ„Â± tutun - skill baÃ…Å¸Ã„Â±na bir desen
