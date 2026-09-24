---
name: laravel-verification
description: "Verification loop for Laravel projects: env checks, linting, static analysis, tests with coverage, security scans, and deployment readiness."
origin: ECC
---

# Laravel Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

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


Ã¥Å“Â¨Ã¥Ââ€˜Ã¨ÂµÂ· PR Ã¥â€°ÂÃ£â‚¬ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã©â€¡ÂÃ¥Â¤Â§Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã¤Â»Â¥Ã¥ÂÅ Ã©Æ’Â¨Ã§Â½Â²Ã¥â€°ÂÃ¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶Ã¦Å“Âº

* Ã¥Å“Â¨Ã¤Â¸ÂºÃ¤Â¸â‚¬Ã¤Â¸Âª Laravel Ã©Â¡Â¹Ã§â€ºÂ®Ã¥Â¼â‚¬Ã¥ÂÂ¯Ã¦â€¹â€°Ã¥Ââ€“Ã¨Â¯Â·Ã¦Â±â€šÃ¤Â¹â€¹Ã¥â€°Â
* Ã¥Å“Â¨Ã©â€¡ÂÃ¥Â¤Â§Ã©â€¡ÂÃ¦Å¾â€žÃ¦Ë†â€“Ã¤Â¾ÂÃ¨Âµâ€“Ã¥Ââ€¡Ã§ÂºÂ§Ã¤Â¹â€¹Ã¥ÂÅ½
* Ã¤Â¸ÂºÃ©Â¢â€žÃ§â€Å¸Ã¤ÂºÂ§Ã¦Ë†â€“Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¨Â¿â€ºÃ¨Â¡Å’Ã©Æ’Â¨Ã§Â½Â²Ã¥â€°ÂÃ©ÂªÅ’Ã¨Â¯Â
* Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€ž Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥ -> Ã¦Âµâ€¹Ã¨Â¯â€¢ -> Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥ -> Ã©Æ’Â¨Ã§Â½Â²Ã¥Â°Â±Ã§Â»Âª Ã¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿

## Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å½Å¸Ã§Ââ€ 

* Ã¦Å’â€°Ã©Â¡ÂºÃ¥ÂºÂÃ¨Â¿ÂÃ¨Â¡Å’Ã¤Â»Å½Ã§Å½Â¯Ã¥Â¢Æ’Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥Ë†Â°Ã©Æ’Â¨Ã§Â½Â²Ã¥Â°Â±Ã§Â»ÂªÃ§Å¡â€žÃ¥Ââ€žÃ¤Â¸ÂªÃ©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼Å’Ã¦Â¯ÂÃ¤Â¸â‚¬Ã¥Â±â€šÃ©Æ’Â½Ã¥Â»ÂºÃ§Â«â€¹Ã¥Å“Â¨Ã¥â€°ÂÃ¤Â¸â‚¬Ã¥Â±â€šÃ§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã£â‚¬â€š
* Ã§Å½Â¯Ã¥Â¢Æ’Ã¥â€™Å’ Composer Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦ËœÂ¯Ã¦â€°â‚¬Ã¦Å“â€°Ã¥â€¦Â¶Ã¤Â»â€“Ã¦Â­Â¥Ã©ÂªÂ¤Ã§Å¡â€žÃ¥â€¦Â³Ã¥ÂÂ¡Ã¯Â¼â€ºÃ¥Â¦â€šÃ¦Å¾Å“Ã¥Â®Æ’Ã¤Â»Â¬Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Ã§Â«â€¹Ã¥ÂÂ³Ã¥ÂÅ“Ã¦Â­Â¢Ã£â‚¬â€š
* Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥/Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾ÂÃ¥Âºâ€Ã¥Å“Â¨Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â®Å’Ã¦â€¢Â´Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€™Å’Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥â€°ÂÃ§Â¡Â®Ã¤Â¿ÂÃ©â‚¬Å¡Ã¨Â¿â€¡Ã£â‚¬â€š
* Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€™Å’Ã¨Â¿ÂÃ§Â§Â»Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥Å“Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¹â€¹Ã¥ÂÅ½Ã¨Â¿â€ºÃ¨Â¡Å’Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¾Â¿Ã¥Å“Â¨Ã¦Â¶â€°Ã¥ÂÅ Ã¦â€¢Â°Ã¦ÂÂ®Ã¦Ë†â€“Ã¥Ââ€˜Ã¥Â¸Æ’Ã¦Â­Â¥Ã©ÂªÂ¤Ã¤Â¹â€¹Ã¥â€°ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ¨Â¡Å’Ã¤Â¸ÂºÃ£â‚¬â€š
* Ã¦Å¾â€žÃ¥Â»Âº/Ã©Æ’Â¨Ã§Â½Â²Ã¥Â°Â±Ã§Â»ÂªÃ¤Â»Â¥Ã¥ÂÅ Ã©ËœÅ¸Ã¥Ë†â€”/Ã¨Â°Æ’Ã¥ÂºÂ¦Ã¥â„¢Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦ËœÂ¯Ã¦Å“â‚¬Ã¥ÂÅ½Ã§Å¡â€žÃ¥â€¦Â³Ã¥ÂÂ¡Ã¯Â¼â€ºÃ¤Â»Â»Ã¤Â½â€¢Ã¥Â¤Â±Ã¨Â´Â¥Ã©Æ’Â½Ã¤Â¼Å¡Ã©ËœÂ»Ã¦Â­Â¢Ã¥Ââ€˜Ã¥Â¸Æ’Ã£â‚¬â€š

## Ã§Â¬Â¬Ã¤Â¸â‚¬Ã©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼Å¡Ã§Å½Â¯Ã¥Â¢Æ’Ã¦Â£â‚¬Ã¦Å¸Â¥

```bash
php -v
composer --version
php artisan --version
```

* Ã©ÂªÅ’Ã¨Â¯Â `.env` Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Â­ËœÃ¥Å“Â¨Ã¤Â¸â€Ã¥Å’â€¦Ã¥ÂÂ«Ã¥Â¿â€¦Ã©Å“â‚¬Ã§Å¡â€žÃ©â€Â®
* Ã§Â¡Â®Ã¨Â®Â¤Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¥Â·Â²Ã¨Â®Â¾Ã§Â½Â® `APP_DEBUG=false`
* Ã§Â¡Â®Ã¨Â®Â¤ `APP_ENV` Ã¤Â¸Å½Ã§â€ºÂ®Ã¦Â â€¡Ã©Æ’Â¨Ã§Â½Â²Ã§Å½Â¯Ã¥Â¢Æ’Ã¥Å’Â¹Ã©â€¦ÂÃ¯Â¼Ë†`production`Ã£â‚¬Â`staging`Ã¯Â¼â€°

Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Å“Â¨Ã¦Å“Â¬Ã¥Å“Â°Ã¤Â½Â¿Ã§â€Â¨ Laravel SailÃ¯Â¼Å¡

```bash
./vendor/bin/sail php -v
./vendor/bin/sail artisan --version
```

## Ã§Â¬Â¬Ã¤Â¸â‚¬Ã©ËœÂ¶Ã¦Â®ÂµÃ¨Â¡Â¥Ã¥â€¦â€¦Ã¯Â¼Å¡Composer Ã¥â€™Å’Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å Â Ã¨Â½Â½

```bash
composer validate
composer dump-autoload -o
```

## Ã§Â¬Â¬Ã¤ÂºÅ’Ã©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼Å¡Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¥â€™Å’Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾Â

```bash
vendor/bin/pint --test
vendor/bin/phpstan analyse
```

Ã¥Â¦â€šÃ¦Å¾Å“Ã¤Â½Â Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®Ã¤Â½Â¿Ã§â€Â¨ Psalm Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯ PHPStanÃ¯Â¼Å¡

```bash
vendor/bin/psalm
```

## Ã§Â¬Â¬Ã¤Â¸â€°Ã©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€™Å’Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

```bash
php artisan test
```

Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Ë†CI Ã§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼â€°Ã¯Â¼Å¡

```bash
XDEBUG_MODE=coverage php artisan test --coverage
```

CI Ã§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼Ë†Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“ -> Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾Â -> Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°Ã¯Â¼Å¡

```bash
vendor/bin/pint --test
vendor/bin/phpstan analyse
XDEBUG_MODE=coverage php artisan test --coverage
```

## Ã§Â¬Â¬Ã¥â€ºâ€ºÃ©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã¥â€™Å’Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¦Â£â‚¬Ã¦Å¸Â¥

```bash
composer audit
```

## Ã§Â¬Â¬Ã¤Âºâ€Ã©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼Å¡Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¥â€™Å’Ã¨Â¿ÂÃ§Â§Â»

```bash
php artisan migrate --pretend
php artisan migrate:status
```

* Ã¤Â»â€Ã§Â»â€ Ã¥Â®Â¡Ã¦Å¸Â¥Ã§Â Â´Ã¥ÂÂÃ¦â‚¬Â§Ã¨Â¿ÂÃ§Â§Â»
* Ã§Â¡Â®Ã¤Â¿ÂÃ¨Â¿ÂÃ§Â§Â»Ã¦â€“â€¡Ã¤Â»Â¶Ã¥ÂÂÃ©ÂÂµÃ¥Â¾Âª `Y_m_d_His_*` Ã¦Â Â¼Ã¥Â¼ÂÃ¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€šÃ¯Â¼Å’`2025_03_14_154210_create_orders_table.php`Ã¯Â¼â€°Ã¥Â¹Â¶Ã¦Â¸â€¦Ã¦â„¢Â°Ã¥Å“Â°Ã¦ÂÂÃ¨Â¿Â°Ã¥ÂËœÃ¦â€ºÂ´
* Ã§Â¡Â®Ã¤Â¿ÂÃ¥ÂÂ¯Ã¤Â»Â¥Ã¦â€°Â§Ã¨Â¡Å’Ã¥â€ºÅ¾Ã¦Â»Å¡
* Ã©ÂªÅ’Ã¨Â¯Â `down()` Ã¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Å’Ã©ÂÂ¿Ã¥â€¦ÂÃ¥Å“Â¨Ã¦Â²Â¡Ã¦Å“â€°Ã¦ËœÅ½Ã§Â¡Â®Ã¥Â¤â€¡Ã¤Â»Â½Ã§Å¡â€žÃ¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã©â‚¬Â Ã¦Ë†ÂÃ¤Â¸ÂÃ¥ÂÂ¯Ã©â‚¬â€ Ã§Å¡â€žÃ¦â€¢Â°Ã¦ÂÂ®Ã¤Â¸Â¢Ã¥Â¤Â±

## Ã§Â¬Â¬Ã¥â€¦Â­Ã©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼Å¡Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â€™Å’Ã©Æ’Â¨Ã§Â½Â²Ã¥Â°Â±Ã§Â»Âª

```bash
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

* Ã§Â¡Â®Ã¤Â¿ÂÃ¥Å“Â¨Ã§â€Å¸Ã¤ÂºÂ§Ã©â€¦ÂÃ§Â½Â®Ã¤Â¸â€¹Ã§Â¼â€œÃ¥Â­ËœÃ©Â¢â€žÃ§Æ’Â­Ã¦Ë†ÂÃ¥Å Å¸
* Ã©ÂªÅ’Ã¨Â¯ÂÃ©ËœÅ¸Ã¥Ë†â€”Ã¥Â·Â¥Ã¤Â½Å“Ã¨â‚¬â€¦Ã¥â€™Å’Ã¨Â°Æ’Ã¥ÂºÂ¦Ã¥â„¢Â¨Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®
* Ã§Â¡Â®Ã¨Â®Â¤Ã¥Å“Â¨Ã§â€ºÂ®Ã¦Â â€¡Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­ `storage/` Ã¥â€™Å’ `bootstrap/cache/` Ã§â€ºÂ®Ã¥Â½â€¢Ã¥ÂÂ¯Ã¥â€ â„¢

## Ã§Â¬Â¬Ã¤Â¸Æ’Ã©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼Å¡Ã©ËœÅ¸Ã¥Ë†â€”Ã¥â€™Å’Ã¨Â°Æ’Ã¥ÂºÂ¦Ã¥â„¢Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥

```bash
php artisan schedule:list
php artisan queue:failed
```

Ã¥Â¦â€šÃ¦Å¾Å“Ã¤Â½Â¿Ã§â€Â¨Ã¤Âºâ€  HorizonÃ¯Â¼Å¡

```bash
php artisan horizon:status
```

Ã¥Â¦â€šÃ¦Å¾Å“ `queue:monitor` Ã¥â€˜Â½Ã¤Â»Â¤Ã¥ÂÂ¯Ã§â€Â¨Ã¯Â¼Å’Ã¥ÂÂ¯Ã¤Â»Â¥Ã§â€Â¨Ã¥Â®Æ’Ã¦ÂÂ¥Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§Â§Â¯Ã¥Å½â€¹Ã¤Â½Å“Ã¤Â¸Å¡Ã¨â‚¬Å’Ã¦â€”Â Ã©Å“â‚¬Ã¥Â¤â€žÃ§Ââ€ Ã¥Â®Æ’Ã¤Â»Â¬Ã¯Â¼Å¡

```bash
php artisan queue:monitor default --max=100
```

Ã¤Â¸Â»Ã¥Å Â¨Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Ë†Ã¤Â»â€¦Ã©â„¢ÂÃ©Â¢â€žÃ§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼â€°Ã¯Â¼Å¡Ã¥Ââ€˜Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¤Â¸â€œÃ§â€Â¨Ã©ËœÅ¸Ã¥Ë†â€”Ã¥Ë†â€ Ã¥Ââ€˜Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦â€”Â Ã¦â€œÂÃ¤Â½Å“Ã¤Â½Å“Ã¤Â¸Å¡Ã¯Â¼Å’Ã¥Â¹Â¶Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Ââ€¢Ã§â€¹Â¬Ã§Å¡â€žÃ¥Â·Â¥Ã¤Â½Å“Ã¨â‚¬â€¦Ã¦ÂÂ¥Ã¥Â¤â€žÃ§Ââ€ Ã¥Â®Æ’Ã¯Â¼Ë†Ã§Â¡Â®Ã¤Â¿ÂÃ©â€¦ÂÃ§Â½Â®Ã¤Âºâ€ Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ©ÂÅ¾ `sync` Ã§Å¡â€žÃ©ËœÅ¸Ã¥Ë†â€”Ã¨Â¿Å¾Ã¦Å½Â¥Ã¯Â¼â€°Ã£â‚¬â€š

```bash
php artisan tinker --execute="dispatch((new App\\Jobs\\QueueHealthcheck())->onQueue('healthcheck'))"
php artisan queue:work --once --queue=healthcheck
```

Ã©ÂªÅ’Ã¨Â¯ÂÃ¨Â¯Â¥Ã¤Â½Å“Ã¤Â¸Å¡Ã¤ÂºÂ§Ã§â€Å¸Ã¤Âºâ€ Ã©Â¢â€žÃ¦Å“Å¸Ã§Å¡â€žÃ¥â€°Â¯Ã¤Â½Å“Ã§â€Â¨Ã¯Â¼Ë†Ã¦â€”Â¥Ã¥Â¿â€”Ã¦ÂÂ¡Ã§â€ºÂ®Ã£â‚¬ÂÃ¥ÂÂ¥Ã¥ÂºÂ·Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¡Â¨Ã¨Â¡Å’Ã¦Ë†â€“Ã¦Å’â€¡Ã¦Â â€¡Ã¯Â¼â€°Ã£â‚¬â€š

Ã¤Â»â€¦Ã¥Å“Â¨Ã¥Â¤â€žÃ§Ââ€ Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â½Å“Ã¤Â¸Å¡Ã¦ËœÂ¯Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ©ÂÅ¾Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Â­Â¤Ã¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬â€š

## Ã§Â¤ÂºÃ¤Â¾â€¹

Ã¦Å“â‚¬Ã¥Â°ÂÃ¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å¡

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

CI Ã©Â£Å½Ã¦Â Â¼Ã¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿Ã¯Â¼Å¡

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
