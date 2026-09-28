---
name: laravel-verification
description: "Verification loop for Laravel projects: env checks, linting, static analysis, tests with coverage, security scans, and deployment readiness."
origin: ECC
---

# Laravel Doğrulama Döngüsü

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


PR'lardan önce, büyük değişikliklerden sonra ve deployment öncesi çalıştırın.

## Ne Zaman Kullanılır

- Laravel projesi için pull request açmadan önce
- Büyük refactoring'ler veya bağımlılık yükseltmelerinden sonra
- Staging veya production için deployment öncesi doğrulama
- Tam lint -> test -> güvenlik -> deployment hazırlık pipeline'ı çalıştırma

## Nasıl Çalışır

- Her katmanın bir öncekinin üzerine inşa edilmesi için fazları sırayla ortam kontrollerinden deployment hazırlığına kadar çalıştırın.
- Ortam ve Composer kontrolleri her şeyi kapsar; başarısız olurlarsa hemen durun.
- Tam testleri ve kapsamı çalıştırmadan önce linting/static analiz temiz olmalıdır.
- Güvenlik ve migration incelemeleri testlerden sonra olur, böylece veri veya yayın adımlarından önce davranışı doğrularsınız.
- Build/deployment hazırlığı ve kuyruk/zamanlayıcı kontrolleri son kapılardır; herhangi bir başarısızlık yayını engeller.

## Faz 1: Ortam Kontrolleri

```bash
php -v
composer --version
php artisan --version
```

- `.env`'nin mevcut olduğunu ve gerekli anahtarların var olduğunu doğrulayın
- Production ortamları için `APP_DEBUG=false` onaylayın
- `APP_ENV`'in hedef deployment'la eşleştiğini onaylayın (`production`, `staging`)

Yerel olarak Laravel Sail kullanıyorsanız:

```bash
./vendor/bin/sail php -v
./vendor/bin/sail artisan --version
```

## Faz 1.5: Composer ve Autoload

```bash
composer validate
composer dump-autoload -o
```

## Faz 2: Linting ve Static Analiz

```bash
vendor/bin/pint --test
vendor/bin/phpstan analyse
```

Projeniz PHPStan yerine Psalm kullanıyorsa:

```bash
vendor/bin/psalm
```

## Faz 3: Testler ve Kapsam

```bash
php artisan test
```

Kapsam (CI):

```bash
XDEBUG_MODE=coverage php artisan test --coverage
```

CI örneği (format -> static analiz -> testler):

```bash
vendor/bin/pint --test
vendor/bin/phpstan analyse
XDEBUG_MODE=coverage php artisan test --coverage
```

## Faz 4: Güvenlik ve Bağımlılık Kontrolleri

```bash
composer audit
```

## Faz 5: Database ve Migration'lar

```bash
php artisan migrate --pretend
php artisan migrate:status
```

- Yıkıcı migration'ları dikkatle inceleyin
- Migration dosya isimlerinin `Y_m_d_His_*` formatını takip ettiğinden emin olun (örn. `2025_03_14_154210_create_orders_table.php`) ve değişikliği net bir şekilde açıklasın
- Rollback'lerin mümkün olduğundan emin olun
- `down()` metotlarını doğrulayın ve açık yedeklemeler olmadan geri alınamaz veri kaybından kaçının

## Faz 6: Build ve Deployment Hazırlığı

```bash
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

- Cache warmup'larının production yapılandırmasında başarılı olduğundan emin olun
- Kuyruk worker'larının ve zamanlayıcının yapılandırıldığını doğrulayın
- Hedef ortamda `storage/` ve `bootstrap/cache/`'in yazılabilir olduğunu onaylayın

## Faz 7: Kuyruk ve Zamanlayıcı Kontrolleri

```bash
php artisan schedule:list
php artisan queue:failed
```

Horizon kullanılıyorsa:

```bash
php artisan horizon:status
```

`queue:monitor` mevcutsa, job'ları işlemeden biriktirmeyi kontrol etmek için kullanın:

```bash
php artisan queue:monitor default --max=100
```

Aktif doğrulama (sadece staging): özel bir kuyruğa no-op job dispatch edin ve işlemek için tek bir worker çalıştırın (non-`sync` kuyruk bağlantısının yapılandırıldığından emin olun).

```bash
php artisan tinker --execute="dispatch((new App\\Jobs\\QueueHealthcheck())->onQueue('healthcheck'))"
php artisan queue:work --once --queue=healthcheck
```

Job'un beklenen yan etkiyi ürettiğini doğrulayın (log girişi, healthcheck tablo satırı veya metrik).

Bunu sadece test job'u işlemenin güvenli olduğu non-production ortamlarında çalıştırın.

## Örnekler

Minimal akış:

```bash
php -v
composer --version
php artisan --version
composer validate
vendor/bin/pint --test
vendor/bin/phpstan analyse
php artisan test
composer audit
php artisan migrate --pretend
php artisan config:cache
php artisan queue:failed
```

CI tarzı pipeline:

```bash
composer validate
composer dump-autoload -o
vendor/bin/pint --test
vendor/bin/phpstan analyse
XDEBUG_MODE=coverage php artisan test --coverage
composer audit
php artisan migrate --pretend
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan schedule:list
```
