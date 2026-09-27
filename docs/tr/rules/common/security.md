# GÃƒÂ¼venlik KurallarÃ„Â±

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


## Zorunlu GÃƒÂ¼venlik Kontrolleri

HERHANGÃ„Â° bir commit'ten ÃƒÂ¶nce:
- [ ] Hardcoded secret yok (API anahtarlarÃ„Â±, Ã…Å¸ifreler, token'lar)
- [ ] TÃƒÂ¼m kullanÃ„Â±cÃ„Â± girdileri validate edildi
- [ ] SQL injection ÃƒÂ¶nleme (parametreli sorgular)
- [ ] XSS ÃƒÂ¶nleme (sanitize edilmiÃ…Å¸ HTML)
- [ ] CSRF korumasÃ„Â± etkin
- [ ] Authentication/authorization doÃ„Å¸rulandÃ„Â±
- [ ] TÃƒÂ¼m endpoint'lerde rate limiting
- [ ] Hata mesajlarÃ„Â± hassas veri sÃ„Â±zdÃ„Â±rmÃ„Â±yor

## Secret YÃƒÂ¶netimi

- Kaynak kodda ASLA secret'larÃ„Â± hardcode etme
- DAIMA environment variable'lar veya secret manager kullan
- BaÃ…Å¸langÃ„Â±ÃƒÂ§ta gerekli secret'larÃ„Â±n mevcut olduÃ„Å¸unu validate et
- Ã„Â°fÃ…Å¸a olmuÃ…Å¸ olabilecek secret'larÃ„Â± rotate et

## GÃƒÂ¼venlik YanÃ„Â±t ProtokolÃƒÂ¼

GÃƒÂ¼venlik sorunu bulunursa:
1. HEMEN DUR
2. **security-reviewer** agent kullan
3. Devam etmeden ÃƒÂ¶nce CRITICAL sorunlarÃ„Â± dÃƒÂ¼zelt
4. Ã„Â°fÃ…Å¸a olmuÃ…Å¸ secret'larÃ„Â± rotate et
5. Benzer sorunlar iÃƒÂ§in tÃƒÂ¼m kod tabanÃ„Â±nÃ„Â± incele
