# Test Coverage

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
