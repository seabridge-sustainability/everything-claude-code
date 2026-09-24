# Hooks Sistemi

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


## Hook Tipleri

- **PreToolUse**: Tool yÃƒÂ¼rÃƒÂ¼tmeden ÃƒÂ¶nce (validasyon, parametre deÃ„Å¸iÃ…Å¸ikliÃ„Å¸i)
- **PostToolUse**: Tool yÃƒÂ¼rÃƒÂ¼tmeden sonra (auto-format, kontroller)
- **Stop**: Session bittiÃ„Å¸inde (final doÃ„Å¸rulama)

## Auto-Accept Ã„Â°zinleri

Dikkatli kullan:
- GÃƒÂ¼venilir, iyi tanÃ„Â±mlanmÃ„Â±Ã…Å¸ planlar iÃƒÂ§in etkinleÃ…Å¸tir
- KeÃ…Å¸ifsel ÃƒÂ§alÃ„Â±Ã…Å¸malar iÃƒÂ§in devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rak
- Asla dangerously-skip-permissions flag'i kullanma
- Bunun yerine `~/.claude.json` iÃƒÂ§inde `allowedTools` yapÃ„Â±landÃ„Â±r

## TodoWrite En Ã„Â°yi Uygulamalar

TodoWrite tool'unu Ã…Å¸unlar iÃƒÂ§in kullan:
- Ãƒâ€¡ok adÃ„Â±mlÃ„Â± gÃƒÂ¶revlerdeki ilerlemeyi takip et
- TalimatlarÃ„Â±n anlaÃ…Å¸Ã„Â±ldÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± doÃ„Å¸rula
- GerÃƒÂ§ek zamanlÃ„Â± yÃƒÂ¶nlendirmeyi etkinleÃ…Å¸tir
- DetaylÃ„Â± implementasyon adÃ„Â±mlarÃ„Â±nÃ„Â± gÃƒÂ¶ster

Todo listesi Ã…Å¸unlarÃ„Â± ortaya ÃƒÂ§Ã„Â±karÃ„Â±r:
- SÃ„Â±ra dÃ„Â±Ã…Å¸Ã„Â± adÃ„Â±mlar
- Eksik ÃƒÂ¶Ã„Å¸eler
- Fazladan gereksiz ÃƒÂ¶Ã„Å¸eler
- YanlÃ„Â±Ã…Å¸ detay dÃƒÂ¼zeyi
- YanlÃ„Â±Ã…Å¸ yorumlanmÃ„Â±Ã…Å¸ gereksinimler
