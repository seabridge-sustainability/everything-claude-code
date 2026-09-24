# AraÃ…Å¸tÃ„Â±rma BaÃ„Å¸lamÃ„Â±

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


Mod: KeÃ…Å¸if, inceleme, ÃƒÂ¶Ã„Å¸renme
Odak: Harekete geÃƒÂ§meden ÃƒÂ¶nce anlama

## DavranÃ„Â±Ã…Å¸
- Sonuca varmadan ÃƒÂ¶nce geniÃ…Å¸ kapsamlÃ„Â± oku
- AÃƒÂ§Ã„Â±klayÃ„Â±cÃ„Â± sorular sor
- Ã„Â°lerledikÃƒÂ§e bulgularÃ„Â± belge
- AnlayÃ„Â±Ã…Å¸ netleÃ…Å¸ene kadar kod yazma

## AraÃ…Å¸tÃ„Â±rma SÃƒÂ¼reci
1. Soruyu anla
2. Ã„Â°lgili kod/belgeleri keÃ…Å¸fet
3. Hipotez oluÃ…Å¸tur
4. KanÃ„Â±tlarla doÃ„Å¸rula
5. BulgularÃ„Â± ÃƒÂ¶zetle

## Tercih edilecek araÃƒÂ§lar
- Kodu anlamak iÃƒÂ§in Read
- KalÃ„Â±plarÃ„Â± bulmak iÃƒÂ§in Grep, Glob
- DÃ„Â±Ã…Å¸ belgeler iÃƒÂ§in WebSearch, WebFetch
- Kod tabanÃ„Â± sorularÃ„Â± iÃƒÂ§in Explore agent ile Task

## Ãƒâ€¡Ã„Â±ktÃ„Â±
Ãƒâ€“nce bulgular, sonra ÃƒÂ¶neriler
