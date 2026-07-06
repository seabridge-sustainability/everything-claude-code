---
name: laravel-verification
description: Verification loop for Laravel projects: env checks, linting, static analysis, tests with coverage, security scans, and deployment readiness.
origin: ECC
---

# Laravel DoÃ„Å¸rulama DÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼

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


PR'lardan ÃƒÂ¶nce, bÃƒÂ¼yÃƒÂ¼k deÃ„Å¸iÃ…Å¸ikliklerden sonra ve deployment ÃƒÂ¶ncesi ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n.

## Ne Zaman KullanÃ„Â±lÃ„Â±r

- Laravel projesi iÃƒÂ§in pull request aÃƒÂ§madan ÃƒÂ¶nce
- BÃƒÂ¼yÃƒÂ¼k refactoring'ler veya baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k yÃƒÂ¼kseltmelerinden sonra
- Staging veya production iÃƒÂ§in deployment ÃƒÂ¶ncesi doÃ„Å¸rulama
- Tam lint -> test -> gÃƒÂ¼venlik -> deployment hazÃ„Â±rlÃ„Â±k pipeline'Ã„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rma

## NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r

- Her katmanÃ„Â±n bir ÃƒÂ¶ncekinin ÃƒÂ¼zerine inÃ…Å¸a edilmesi iÃƒÂ§in fazlarÃ„Â± sÃ„Â±rayla ortam kontrollerinden deployment hazÃ„Â±rlÃ„Â±Ã„Å¸Ã„Â±na kadar ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n.
- Ortam ve Composer kontrolleri her Ã…Å¸eyi kapsar; baÃ…Å¸arÃ„Â±sÃ„Â±z olurlarsa hemen durun.
- Tam testleri ve kapsamÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rmadan ÃƒÂ¶nce linting/static analiz temiz olmalÃ„Â±dÃ„Â±r.
- GÃƒÂ¼venlik ve migration incelemeleri testlerden sonra olur, bÃƒÂ¶ylece veri veya yayÃ„Â±n adÃ„Â±mlarÃ„Â±ndan ÃƒÂ¶nce davranÃ„Â±Ã…Å¸Ã„Â± doÃ„Å¸rularsÃ„Â±nÃ„Â±z.
- Build/deployment hazÃ„Â±rlÃ„Â±Ã„Å¸Ã„Â± ve kuyruk/zamanlayÃ„Â±cÃ„Â± kontrolleri son kapÃ„Â±lardÃ„Â±r; herhangi bir baÃ…Å¸arÃ„Â±sÃ„Â±zlÃ„Â±k yayÃ„Â±nÃ„Â± engeller.

## Faz 1: Ortam Kontrolleri

```bash
php -v
composer --version
php artisan --version
```

- `.env`'nin mevcut olduÃ„Å¸unu ve gerekli anahtarlarÃ„Â±n var olduÃ„Å¸unu doÃ„Å¸rulayÃ„Â±n
- Production ortamlarÃ„Â± iÃƒÂ§in `APP_DEBUG=false` onaylayÃ„Â±n
- `APP_ENV`'in hedef deployment'la eÃ…Å¸leÃ…Å¸tiÃ„Å¸ini onaylayÃ„Â±n (`production`, `staging`)

Yerel olarak Laravel Sail kullanÃ„Â±yorsanÃ„Â±z:

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

Projeniz PHPStan yerine Psalm kullanÃ„Â±yorsa:

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

CI ÃƒÂ¶rneÃ„Å¸i (format -> static analiz -> testler):

```bash
vendor/bin/pint --test
vendor/bin/phpstan analyse
XDEBUG_MODE=coverage php artisan test --coverage
```

## Faz 4: GÃƒÂ¼venlik ve BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±k Kontrolleri

```bash
composer audit
```

## Faz 5: Database ve Migration'lar

```bash
php artisan migrate --pretend
php artisan migrate:status
```

- YÃ„Â±kÃ„Â±cÃ„Â± migration'larÃ„Â± dikkatle inceleyin
- Migration dosya isimlerinin `Y_m_d_His_*` formatÃ„Â±nÃ„Â± takip ettiÃ„Å¸inden emin olun (ÃƒÂ¶rn. `2025_03_14_154210_create_orders_table.php`) ve deÃ„Å¸iÃ…Å¸ikliÃ„Å¸i net bir Ã…Å¸ekilde aÃƒÂ§Ã„Â±klasÃ„Â±n
- Rollback'lerin mÃƒÂ¼mkÃƒÂ¼n olduÃ„Å¸undan emin olun
- `down()` metotlarÃ„Â±nÃ„Â± doÃ„Å¸rulayÃ„Â±n ve aÃƒÂ§Ã„Â±k yedeklemeler olmadan geri alÃ„Â±namaz veri kaybÃ„Â±ndan kaÃƒÂ§Ã„Â±nÃ„Â±n

## Faz 6: Build ve Deployment HazÃ„Â±rlÃ„Â±Ã„Å¸Ã„Â±

```bash
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

- Cache warmup'larÃ„Â±nÃ„Â±n production yapÃ„Â±landÃ„Â±rmasÃ„Â±nda baÃ…Å¸arÃ„Â±lÃ„Â± olduÃ„Å¸undan emin olun
- Kuyruk worker'larÃ„Â±nÃ„Â±n ve zamanlayÃ„Â±cÃ„Â±nÃ„Â±n yapÃ„Â±landÃ„Â±rÃ„Â±ldÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± doÃ„Å¸rulayÃ„Â±n
- Hedef ortamda `storage/` ve `bootstrap/cache/`'in yazÃ„Â±labilir olduÃ„Å¸unu onaylayÃ„Â±n

## Faz 7: Kuyruk ve ZamanlayÃ„Â±cÃ„Â± Kontrolleri

```bash
php artisan schedule:list
php artisan queue:failed
```

Horizon kullanÃ„Â±lÃ„Â±yorsa:

```bash
php artisan horizon:status
```

`queue:monitor` mevcutsa, job'larÃ„Â± iÃ…Å¸lemeden biriktirmeyi kontrol etmek iÃƒÂ§in kullanÃ„Â±n:

```bash
php artisan queue:monitor default --max=100
```

Aktif doÃ„Å¸rulama (sadece staging): ÃƒÂ¶zel bir kuyruÃ„Å¸a no-op job dispatch edin ve iÃ…Å¸lemek iÃƒÂ§in tek bir worker ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n (non-`sync` kuyruk baÃ„Å¸lantÃ„Â±sÃ„Â±nÃ„Â±n yapÃ„Â±landÃ„Â±rÃ„Â±ldÃ„Â±Ã„Å¸Ã„Â±ndan emin olun).

```bash
php artisan tinker --execute="dispatch((new App\\Jobs\\QueueHealthcheck())->onQueue('healthcheck'))"
php artisan queue:work --once --queue=healthcheck
```

Job'un beklenen yan etkiyi ÃƒÂ¼rettiÃ„Å¸ini doÃ„Å¸rulayÃ„Â±n (log giriÃ…Å¸i, healthcheck tablo satÃ„Â±rÃ„Â± veya metrik).

Bunu sadece test job'u iÃ…Å¸lemenin gÃƒÂ¼venli olduÃ„Å¸u non-production ortamlarÃ„Â±nda ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±n.

## Ãƒâ€“rnekler

Minimal akÃ„Â±Ã…Å¸:

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

CI tarzÃ„Â± pipeline:

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
