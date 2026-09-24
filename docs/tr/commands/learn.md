# /learn - Yeniden KullanÃ„Â±labilir Desenleri Ãƒâ€¡Ã„Â±kar

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
