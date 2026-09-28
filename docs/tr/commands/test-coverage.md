# Test Coverage

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Test coverage'Ã„Â±nÃ„Â± analiz et, eksiklikleri tanÃ„Â±mla ve 80%+ coverage'a ulaÃ…Å¸mak iÃƒÂ§in eksik test'leri oluÃ…Å¸tur.

## AdÃ„Â±m 1: Test Framework'ÃƒÂ¼nÃƒÂ¼ Tespit Et

| GÃƒÂ¶sterge | Coverage Komutu |
|-----------|-----------------|
| `jest.config.*` veya `package.json` jest | `npx jest --coverage --coverageReporters=json-summary` |
| `vitest.config.*` | `npx vitest run --coverage` |
| `pytest.ini` / `pyproject.toml` pytest | `pytest --cov=src --cov-report=json` |
| `Cargo.toml` | `cargo llvm-cov --json` |
| `pom.xml` JaCoCo ile | `mvn test jacoco:report` |
| `go.mod` | `go test -coverprofile=coverage.out ./...` |

## AdÃ„Â±m 2: Coverage Raporunu Analiz Et

1. Coverage komutunu ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
2. Ãƒâ€¡Ã„Â±ktÃ„Â±yÃ„Â± ayrÃ„Â±Ã…Å¸tÃ„Â±r (JSON summary veya terminal ÃƒÂ§Ã„Â±ktÃ„Â±sÃ„Â±)
3. **80% coverage'Ã„Â±n altÃ„Â±ndaki** dosyalarÃ„Â± listele, en kÃƒÂ¶tÃƒÂ¼den baÃ…Å¸layarak sÃ„Â±rala
4. Her yetersiz coverage'lÃ„Â± dosya iÃƒÂ§in Ã…Å¸unlarÃ„Â± tanÃ„Â±mla:
   - Test edilmemiÃ…Å¸ fonksiyonlar veya metodlar
   - Eksik branch coverage (if/else, switch, error yollarÃ„Â±)
   - Payda'yÃ„Â± Ã…Å¸iÃ…Å¸iren dead code

## AdÃ„Â±m 3: Eksik Test'leri OluÃ…Å¸tur

Her yetersiz coverage'lÃ„Â± dosya iÃƒÂ§in, bu ÃƒÂ¶nceliÃ„Å¸i takip ederek test'ler oluÃ…Å¸tur:

1. **Happy path** Ã¢â‚¬â€ GeÃƒÂ§erli input'larla temel fonksiyonalite
2. **Hata iÃ…Å¸leme** Ã¢â‚¬â€ GeÃƒÂ§ersiz input'lar, eksik veri, network hatalarÃ„Â±
3. **Edge case'ler** Ã¢â‚¬â€ BoÃ…Å¸ diziler, null/undefined, sÃ„Â±nÃ„Â±r deÃ„Å¸erleri (0, -1, MAX_INT)
4. **Branch coverage** Ã¢â‚¬â€ Her if/else, switch case, ternary

### Test OluÃ…Å¸turma KurallarÃ„Â±

- Test'leri kaynak kodun yanÃ„Â±na yerleÃ…Å¸tir: `foo.ts` Ã¢â€ â€™ `foo.test.ts` (veya proje konvansiyonu)
- Projeden mevcut test pattern'lerini kullan (import stili, assertion kÃƒÂ¼tÃƒÂ¼phanesi, mocking yaklaÃ…Å¸Ã„Â±mÃ„Â±)
- Harici baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± mock'la (veritabanÃ„Â±, API'ler, dosya sistemi)
- Her test baÃ„Å¸Ã„Â±msÃ„Â±z olmalÃ„Â± Ã¢â‚¬â€ test'ler arasÃ„Â±nda paylaÃ…Å¸Ã„Â±lan deÃ„Å¸iÃ…Å¸ken state olmamalÃ„Â±
- Test'leri aÃƒÂ§Ã„Â±klayÃ„Â±cÃ„Â± isimlendirin: `test_create_user_with_duplicate_email_returns_409`

## AdÃ„Â±m 4: DoÃ„Å¸rula

1. Tam test suite'ini ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r Ã¢â‚¬â€ tÃƒÂ¼m test'ler geÃƒÂ§meli
2. Coverage'Ã„Â± yeniden ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r Ã¢â‚¬â€ iyileÃ…Å¸meyi doÃ„Å¸rula
3. Hala 80%'in altÃ„Â±ndaysa, kalan boÃ…Å¸luklar iÃƒÂ§in AdÃ„Â±m 3'ÃƒÂ¼ tekrarla

## AdÃ„Â±m 5: Raporla

Ãƒâ€“ncesi/sonrasÃ„Â± karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rmasÃ„Â±nÃ„Â± gÃƒÂ¶ster:

```
Coverage Report
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
File                   Before  After
src/services/auth.ts   45%     88%
src/utils/validation.ts 32%    82%
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
Overall:               67%     84%  PASS:
```

## Odak AlanlarÃ„Â±

- KarmaÃ…Å¸Ã„Â±k branching'e sahip fonksiyonlar (yÃƒÂ¼ksek cyclomatic complexity)
- Hata iÃ…Å¸leyiciler ve catch bloklarÃ„Â±
- Codebase genelinde kullanÃ„Â±lan utility fonksiyonlarÃ„Â±
- API endpoint handler'larÃ„Â± (request Ã¢â€ â€™ response akÃ„Â±Ã…Å¸Ã„Â±)
- Edge case'ler: null, undefined, empty string, empty array, zero, negatif sayÃ„Â±lar
