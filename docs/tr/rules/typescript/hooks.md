---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
---
# TypeScript/JavaScript Hooks

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


> Bu dosya [common/hooks.md](../common/hooks.md) dosyasÃ„Â±nÃ„Â± TypeScript/JavaScript'e ÃƒÂ¶zgÃƒÂ¼ iÃƒÂ§erikle geniÃ…Å¸letir.

## PostToolUse Hooks

`~/.claude/settings.json` iÃƒÂ§inde yapÃ„Â±landÃ„Â±r:

- **Prettier**: Edit'ten sonra JS/TS dosyalarÃ„Â±nÃ„Â± otomatik formatla
- **TypeScript check**: `.ts`/`.tsx` dosyalarÃ„Â±nÃ„Â± dÃƒÂ¼zenledikten sonra `tsc` ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
- **console.log uyarÃ„Â±sÃ„Â±**: DÃƒÂ¼zenlenen dosyalarda `console.log` hakkÃ„Â±nda uyar

## Stop Hooks

- **console.log audit**: Session bitmeden ÃƒÂ¶nce deÃ„Å¸iÃ…Å¸tirilen tÃƒÂ¼m dosyalarda `console.log` kontrolÃƒÂ¼ yap
