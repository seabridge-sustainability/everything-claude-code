---
name: laravel-security
description: Laravel Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·ÂµÃ¯Â¼Å’Ã¦Â¶ÂµÃ§â€ºâ€“Ã¨Â®Â¤Ã¨Â¯Â/Ã¦Å½Ë†Ã¦ÂÆ’Ã£â‚¬ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂCSRFÃ£â‚¬ÂÃ¦â€°Â¹Ã©â€¡ÂÃ¨Âµâ€¹Ã¥â‚¬Â¼Ã£â‚¬ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Å Ã¤Â¼Â Ã£â‚¬ÂÃ¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ Ã£â‚¬ÂÃ©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶Ã¥â€™Å’Ã¥Â®â€°Ã¥â€¦Â¨Ã©Æ’Â¨Ã§Â½Â²Ã£â‚¬â€š
origin: ECC
---

# Laravel Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

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


Ã©â€™Ë†Ã¥Â¯Â¹ Laravel Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ§Å¡â€žÃ¥â€¦Â¨Ã©ÂÂ¢Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å’â€¡Ã¥Â¯Â¼Ã¯Â¼Å’Ã¤Â»Â¥Ã©ËœÂ²Ã¨Å’Æ’Ã¥Â¸Â¸Ã¨Â§ÂÃ¦Â¼ÂÃ¦Â´Å¾Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¥ÂÂ¯Ã§â€Â¨

* Ã¦Â·Â»Ã¥Å Â Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Ë†â€“Ã¦Å½Ë†Ã¦ÂÆ’Ã¦â€”Â¶
* Ã¥Â¤â€žÃ§Ââ€ Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¥â€™Å’Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Å Ã¤Â¼Â Ã¦â€”Â¶
* Ã¦Å¾â€žÃ¥Â»ÂºÃ¦â€“Â°Ã§Å¡â€ž API Ã§Â«Â¯Ã§â€šÂ¹Ã¦â€”Â¶
* Ã§Â®Â¡Ã§Ââ€ Ã¥Â¯â€ Ã©â€™Â¥Ã¥â€™Å’Ã§Å½Â¯Ã¥Â¢Æ’Ã¨Â®Â¾Ã§Â½Â®Ã¦â€”Â¶
* Ã¥Â¼ÂºÃ¥Å’â€“Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã©Æ’Â¨Ã§Â½Â²Ã¦â€”Â¶

## Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å½Å¸Ã§Ââ€ 

* Ã¤Â¸Â­Ã©â€”Â´Ã¤Â»Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¿ÂÃ¦Å Â¤Ã¯Â¼Ë†Ã©â‚¬Å¡Ã¨Â¿â€¡ `VerifyCsrfToken` Ã¥Â®Å¾Ã§Å½Â° CSRFÃ¯Â¼Å’Ã©â‚¬Å¡Ã¨Â¿â€¡ `SecurityHeaders` Ã¥Â®Å¾Ã§Å½Â°Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â â€¡Ã¥Â¤Â´Ã¯Â¼â€°Ã£â‚¬â€š
* Ã¥Â®Ë†Ã¥ÂÂ«Ã¥â€™Å’Ã§Â­â€“Ã§â€¢Â¥Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¨Â®Â¿Ã©â€”Â®Ã¦Å½Â§Ã¥Ë†Â¶Ã¯Â¼Ë†`auth:sanctum`Ã£â‚¬Â`$this->authorize`Ã£â‚¬ÂÃ§Â­â€“Ã§â€¢Â¥Ã¤Â¸Â­Ã©â€”Â´Ã¤Â»Â¶Ã¯Â¼â€°Ã£â‚¬â€š
* Ã¨Â¡Â¨Ã¥Ââ€¢Ã¨Â¯Â·Ã¦Â±â€šÃ¥Å“Â¨Ã¨Â¾â€œÃ¥â€¦Â¥Ã¥Ë†Â°Ã¨Â¾Â¾Ã¦Å“ÂÃ¥Å Â¡Ã¤Â¹â€¹Ã¥â€°ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â€™Å’Ã¦â€¢Â´Ã¥Â½Â¢Ã¯Â¼Ë†`UploadInvoiceRequest`Ã¯Â¼â€°Ã£â‚¬â€š
* Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶Ã¥Å“Â¨Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Å½Â§Ã¥Ë†Â¶Ã¤Â¹â€¹Ã¥Â¤â€“Ã¥Â¢Å¾Ã¥Å Â Ã¦Â»Â¥Ã§â€Â¨Ã¤Â¿ÂÃ¦Å Â¤Ã¯Â¼Ë†`RateLimiter::for('login')`Ã¯Â¼â€°Ã£â‚¬â€š
* Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Â®â€°Ã¥â€¦Â¨Ã¦ÂÂ¥Ã¨â€¡ÂªÃ¥Å Â Ã¥Â¯â€ Ã¨Â½Â¬Ã¦ÂÂ¢Ã£â‚¬ÂÃ¦â€°Â¹Ã©â€¡ÂÃ¨Âµâ€¹Ã¥â‚¬Â¼Ã¤Â¿ÂÃ¦Å Â¤Ã¤Â»Â¥Ã¥ÂÅ Ã§Â­Â¾Ã¥ÂÂÃ¨Â·Â¯Ã§â€Â±Ã¯Â¼Ë†`URL::temporarySignedRoute` + `signed` Ã¤Â¸Â­Ã©â€”Â´Ã¤Â»Â¶Ã¯Â¼â€°Ã£â‚¬â€š

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¥Â®â€°Ã¥â€¦Â¨Ã¨Â®Â¾Ã§Â½Â®

* Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã¨Â®Â¾Ã§Â½Â® `APP_DEBUG=false`
* `APP_KEY` Ã¥Â¿â€¦Ã©Â¡Â»Ã¨Â®Â¾Ã§Â½Â®Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Å“Â¨Ã¦Â³â€žÃ©Å“Â²Ã¦â€”Â¶Ã¨Â½Â®Ã¦ÂÂ¢
* Ã¨Â®Â¾Ã§Â½Â® `SESSION_SECURE_COOKIE=true` Ã¥â€™Å’ `SESSION_SAME_SITE=lax`Ã¯Â¼Ë†Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦â€¢ÂÃ¦â€žÅ¸Ã¥Âºâ€Ã§â€Â¨Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `strict`Ã¯Â¼â€°
* Ã©â€¦ÂÃ§Â½Â®Ã¥Ââ€”Ã¤Â¿Â¡Ã¤Â»Â»Ã§Å¡â€žÃ¤Â»Â£Ã§Ââ€ Ã¤Â»Â¥Ã¦Â­Â£Ã§Â¡Â®Ã¦Â£â‚¬Ã¦Âµâ€¹ HTTPS

## Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥â€™Å’ Cookie Ã¥Â¼ÂºÃ¥Å’â€“

* Ã¨Â®Â¾Ã§Â½Â® `SESSION_HTTP_ONLY=true` Ã¤Â»Â¥Ã©ËœÂ²Ã¦Â­Â¢ JavaScript Ã¨Â®Â¿Ã©â€”Â®
* Ã¥Â¯Â¹Ã©Â«ËœÃ©Â£Å½Ã©â„¢Â©Ã¦ÂµÂÃ§Â¨â€¹Ã¤Â½Â¿Ã§â€Â¨ `SESSION_SAME_SITE=strict`
* Ã¥Å“Â¨Ã§â„¢Â»Ã¥Â½â€¢Ã¥â€™Å’Ã¦ÂÆ’Ã©â„¢ÂÃ¥ÂËœÃ¦â€ºÂ´Ã¦â€”Â¶Ã©â€¡ÂÃ¦â€“Â°Ã§â€Å¸Ã¦Ë†ÂÃ¤Â¼Å¡Ã¨Â¯Â

## Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¤Â¸Å½Ã¤Â»Â¤Ã§â€°Å’

* Ã¤Â½Â¿Ã§â€Â¨ Laravel Sanctum Ã¦Ë†â€“ Passport Ã¨Â¿â€ºÃ¨Â¡Å’ API Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯Â
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦â€¢ÂÃ¦â€žÅ¸Ã¦â€¢Â°Ã¦ÂÂ®Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¸Â¦Ã¦Å“â€°Ã¥Ë†Â·Ã¦â€“Â°Ã¦ÂµÂÃ§Â¨â€¹Ã§Å¡â€žÃ§Å¸Â­Ã¦Å“Å¸Ã¤Â»Â¤Ã§â€°Å’
* Ã¥Å“Â¨Ã¦Â³Â¨Ã©â€â‚¬Ã¥â€™Å’Ã¨Â´Â¦Ã¦Ë†Â·Ã¦Â³â€žÃ©Å“Â²Ã¦â€”Â¶Ã¦â€™Â¤Ã©â€â‚¬Ã¤Â»Â¤Ã§â€°Å’

Ã¨Â·Â¯Ã§â€Â±Ã¤Â¿ÂÃ¦Å Â¤Ã§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼Å¡

```php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});
```

## Ã¥Â¯â€ Ã§Â ÂÃ¥Â®â€°Ã¥â€¦Â¨

* Ã¤Â½Â¿Ã§â€Â¨ `Hash::make()` Ã¥â€œË†Ã¥Â¸Å’Ã¥Â¯â€ Ã§Â ÂÃ¯Â¼Å’Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Â­ËœÃ¥â€šÂ¨Ã¦ËœÅ½Ã¦â€“â€¡
* Ã¤Â½Â¿Ã§â€Â¨ Laravel Ã§Å¡â€žÃ¥Â¯â€ Ã§Â ÂÃ¤Â»Â£Ã§Ââ€ Ã¨Â¿â€ºÃ¨Â¡Å’Ã©â€¡ÂÃ§Â½Â®Ã¦ÂµÂÃ§Â¨â€¹

```php
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

$validated = $request->validate([
    'password' => ['required', 'string', Password::min(12)->letters()->mixedCase()->numbers()->symbols()],
]);

$user->update(['password' => Hash::make($validated['password'])]);
```

## Ã¦Å½Ë†Ã¦ÂÆ’Ã¯Â¼Å¡Ã§Â­â€“Ã§â€¢Â¥Ã¤Â¸Å½Ã©â€”Â¨Ã©ÂÂ¢

* Ã¤Â½Â¿Ã§â€Â¨Ã§Â­â€“Ã§â€¢Â¥Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â¨Â¡Ã¥Å¾â€¹Ã§ÂºÂ§Ã¦Å½Ë†Ã¦ÂÆ’
* Ã¥Å“Â¨Ã¦Å½Â§Ã¥Ë†Â¶Ã¥â„¢Â¨Ã¥â€™Å’Ã¦Å“ÂÃ¥Å Â¡Ã¤Â¸Â­Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¦Å½Ë†Ã¦ÂÆ’

```php
$this->authorize('update', $project);
```

Ã¤Â½Â¿Ã§â€Â¨Ã§Â­â€“Ã§â€¢Â¥Ã¤Â¸Â­Ã©â€”Â´Ã¤Â»Â¶Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â·Â¯Ã§â€Â±Ã§ÂºÂ§Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¯Â¼Å¡

```php
use Illuminate\Support\Facades\Route;

Route::put('/projects/{project}', [ProjectController::class, 'update'])
    ->middleware(['auth:sanctum', 'can:update,project']);
```

## Ã©ÂªÅ’Ã¨Â¯ÂÃ¤Â¸Å½Ã¦â€¢Â°Ã¦ÂÂ®Ã¦Â¸â€¦Ã§Ââ€ 

* Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¥Ââ€¢Ã¨Â¯Â·Ã¦Â±â€šÃ©ÂªÅ’Ã¨Â¯ÂÃ¨Â¾â€œÃ¥â€¦Â¥
* Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸Â¥Ã¦Â Â¼Ã§Å¡â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ¨Â§â€žÃ¥Ë†â„¢Ã¥â€™Å’Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥
* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¤Â¿Â¡Ã¤Â»Â»Ã¨Â¯Â·Ã¦Â±â€šÃ¨Â´Å¸Ã¨Â½Â½Ã¤Â¸Â­Ã§Å¡â€žÃ¦Â´Â¾Ã§â€Å¸Ã¥Â­â€”Ã¦Â®Âµ

## Ã¦â€°Â¹Ã©â€¡ÂÃ¨Âµâ€¹Ã¥â‚¬Â¼Ã¤Â¿ÂÃ¦Å Â¤

* Ã¤Â½Â¿Ã§â€Â¨ `$fillable` Ã¦Ë†â€“ `$guarded`Ã¯Â¼Å’Ã©ÂÂ¿Ã¥â€¦ÂÃ¤Â½Â¿Ã§â€Â¨ `Model::unguard()`
* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ DTO Ã¦Ë†â€“Ã¦ËœÂ¾Ã¥Â¼ÂÃ§Å¡â€žÃ¥Â±Å¾Ã¦â‚¬Â§Ã¦ËœÂ Ã¥Â°â€ž

## SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã©ËœÂ²Ã¨Å’Æ’

* Ã¤Â½Â¿Ã§â€Â¨ Eloquent Ã¦Ë†â€“Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â„¢Â¨Ã§Å¡â€žÃ¥Ââ€šÃ¦â€¢Â°Ã§Â»â€˜Ã¥Â®Å¡
* Ã©â„¢Â¤Ã©ÂÅ¾Ã§Â»ÂÃ¥Â¯Â¹Ã¥Â¿â€¦Ã¨Â¦ÂÃ¯Â¼Å’Ã©ÂÂ¿Ã¥â€¦ÂÃ¤Â½Â¿Ã§â€Â¨Ã¥Å½Å¸Ã§â€Å¸ SQL

```php
DB::select('select * from users where email = ?', [$email]);
```

## XSS Ã©ËœÂ²Ã¨Å’Æ’

* Blade Ã©Â»ËœÃ¨Â®Â¤Ã¨Â½Â¬Ã¤Â¹â€°Ã¨Â¾â€œÃ¥â€¡ÂºÃ¯Â¼Ë†`{{ }}`Ã¯Â¼â€°
* Ã¤Â»â€¦Ã¥Â¯Â¹Ã¥ÂÂ¯Ã¤Â¿Â¡Ã§Å¡â€žÃ£â‚¬ÂÃ¥Â·Â²Ã¦Â¸â€¦Ã§Ââ€ Ã§Å¡â€ž HTML Ã¤Â½Â¿Ã§â€Â¨ `{!! !!}`
* Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸â€œÃ§â€Â¨Ã¥Âºâ€œÃ¦Â¸â€¦Ã§Ââ€ Ã¥Â¯Å’Ã¦â€“â€¡Ã¦Å“Â¬

## CSRF Ã¤Â¿ÂÃ¦Å Â¤

* Ã¤Â¿ÂÃ¦Å’Â `VerifyCsrfToken` Ã¤Â¸Â­Ã©â€”Â´Ã¤Â»Â¶Ã¥ÂÂ¯Ã§â€Â¨
* Ã¥Å“Â¨Ã¨Â¡Â¨Ã¥Ââ€¢Ã¤Â¸Â­Ã¥Å’â€¦Ã¥ÂÂ« `@csrf`Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â¸Âº SPA Ã¨Â¯Â·Ã¦Â±â€šÃ¥Ââ€˜Ã©â‚¬Â XSRF Ã¤Â»Â¤Ã§â€°Å’

Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¤Â½Â¿Ã§â€Â¨ Sanctum Ã§Å¡â€ž SPA Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å’Ã§Â¡Â®Ã¤Â¿ÂÃ©â€¦ÂÃ§Â½Â®Ã¤Âºâ€ Ã¦Å“â€°Ã§Å Â¶Ã¦â‚¬ÂÃ¨Â¯Â·Ã¦Â±â€šÃ¯Â¼Å¡

```php
// config/sanctum.php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost')),
```

## Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Å Ã¤Â¼Â Ã¥Â®â€°Ã¥â€¦Â¨

* Ã©ÂªÅ’Ã¨Â¯ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¥Â¤Â§Ã¥Â°ÂÃ£â‚¬ÂMIME Ã§Â±Â»Ã¥Å¾â€¹Ã¥â€™Å’Ã¦â€°Â©Ã¥Â±â€¢Ã¥ÂÂ
* Ã¥Â°Â½Ã¥ÂÂ¯Ã¨Æ’Â½Ã¥Â°â€ Ã¤Â¸Å Ã¤Â¼Â Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Å“Â¨Ã¥â€¦Â¬Ã¥Â¼â‚¬Ã¨Â·Â¯Ã¥Â¾â€žÃ¤Â¹â€¹Ã¥Â¤â€“
* Ã¥Â¦â€šÃ¦Å¾Å“Ã©Å“â‚¬Ã¨Â¦ÂÃ¯Â¼Å’Ã¦â€°Â«Ã¦ÂÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¤Â»Â¥Ã¦Å¸Â¥Ã¦â€°Â¾Ã¦ÂÂ¶Ã¦â€žÂÃ¨Â½Â¯Ã¤Â»Â¶

```php
final class UploadInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->can('upload-invoice');
    }

    public function rules(): array
    {
        return [
            'invoice' => ['required', 'file', 'mimes:pdf', 'max:5120'],
        ];
    }
}
```

```php
$path = $request->file('invoice')->store(
    'invoices',
    config('filesystems.private_disk', 'local') // set this to a non-public disk
);
```

## Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶

* Ã¥Å“Â¨Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â€™Å’Ã¥â€ â„¢Ã¥â€¦Â¥Ã§Â«Â¯Ã§â€šÂ¹Ã¥Âºâ€Ã§â€Â¨ `throttle` Ã¤Â¸Â­Ã©â€”Â´Ã¤Â»Â¶
* Ã¥Â¯Â¹Ã§â„¢Â»Ã¥Â½â€¢Ã£â‚¬ÂÃ¥Â¯â€ Ã§Â ÂÃ©â€¡ÂÃ§Â½Â®Ã¥â€™Å’ OTP Ã¤Â½Â¿Ã§â€Â¨Ã¦â€ºÂ´Ã¤Â¸Â¥Ã¦Â Â¼Ã§Å¡â€žÃ©â„¢ÂÃ¥Ë†Â¶

```php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('login', function (Request $request) {
    return [
        Limit::perMinute(5)->by($request->ip()),
        Limit::perMinute(5)->by(strtolower((string) $request->input('email'))),
    ];
});
```

## Ã¥Â¯â€ Ã©â€™Â¥Ã¤Â¸Å½Ã¥â€¡Â­Ã¦ÂÂ®

* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Â°â€ Ã¥Â¯â€ Ã©â€™Â¥Ã¦ÂÂÃ¤ÂºÂ¤Ã¥Ë†Â°Ã¦ÂºÂÃ¤Â»Â£Ã§Â ÂÃ§Â®Â¡Ã§Ââ€ 
* Ã¤Â½Â¿Ã§â€Â¨Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¥â€™Å’Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨
* Ã¥Â¯â€ Ã©â€™Â¥Ã¦Å¡Â´Ã©Å“Â²Ã¥ÂÅ½Ã¥ÂÅ Ã¦â€”Â¶Ã¨Â½Â®Ã¦ÂÂ¢Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â½Â¿Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥Â¤Â±Ã¦â€¢Ë†

## Ã¥Å Â Ã¥Â¯â€ Ã¥Â±Å¾Ã¦â‚¬Â§

Ã¥Â¯Â¹Ã©Ââ„¢Ã¦â‚¬ÂÃ§Å¡â€žÃ¦â€¢ÂÃ¦â€žÅ¸Ã¥Ë†â€”Ã¤Â½Â¿Ã§â€Â¨Ã¥Å Â Ã¥Â¯â€ Ã¨Â½Â¬Ã¦ÂÂ¢Ã£â‚¬â€š

```php
protected $casts = [
    'api_token' => 'encrypted',
];
```

## Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â â€¡Ã¥Â¤Â´

* Ã¥Å“Â¨Ã©â‚¬â€šÃ¥Â½â€œÃ§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã¦Â·Â»Ã¥Å Â  CSPÃ£â‚¬ÂHSTS Ã¥â€™Å’Ã¦Â¡â€ Ã¦Å¾Â¶Ã¤Â¿ÂÃ¦Å Â¤
* Ã¤Â½Â¿Ã§â€Â¨Ã¥Ââ€”Ã¤Â¿Â¡Ã¤Â»Â»Ã§Å¡â€žÃ¤Â»Â£Ã§Ââ€ Ã©â€¦ÂÃ§Â½Â®Ã¦ÂÂ¥Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’ HTTPS Ã©â€¡ÂÃ¥Â®Å¡Ã¥Ââ€˜

Ã¨Â®Â¾Ã§Â½Â®Ã¦Â â€¡Ã¥Â¤Â´Ã§Å¡â€žÃ¤Â¸Â­Ã©â€”Â´Ã¤Â»Â¶Ã§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼Å¡

```php
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class SecurityHeaders
{
    public function handle(Request $request, \Closure $next): Response
    {
        $response = $next($request);

        $response->headers->add([
            'Content-Security-Policy' => "default-src 'self'",
            'Strict-Transport-Security' => 'max-age=31536000', // add includeSubDomains/preload only when all subdomains are HTTPS
            'X-Frame-Options' => 'DENY',
            'X-Content-Type-Options' => 'nosniff',
            'Referrer-Policy' => 'no-referrer',
        ]);

        return $response;
    }
}
```

## CORS Ã¤Â¸Å½ API Ã¦Å¡Â´Ã©Å“Â²

* Ã¥Å“Â¨ `config/cors.php` Ã¤Â¸Â­Ã©â„¢ÂÃ¥Ë†Â¶Ã¦ÂÂ¥Ã¦ÂºÂ
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã§Â»ÂÃ¨Â¿â€¡Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ§Å¡â€žÃ¨Â·Â¯Ã§â€Â±Ã¯Â¼Å’Ã©ÂÂ¿Ã¥â€¦ÂÃ¤Â½Â¿Ã§â€Â¨Ã©â‚¬Å¡Ã©â€¦ÂÃ§Â¬Â¦Ã¦ÂÂ¥Ã¦ÂºÂ

```php
// config/cors.php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    'allowed_origins' => ['https://app.example.com'],
    'allowed_headers' => [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'X-XSRF-TOKEN',
        'X-CSRF-TOKEN',
    ],
    'supports_credentials' => true,
];
```

## Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢Ã¤Â¸Å½ PII

* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¨Â®Â°Ã¥Â½â€¢Ã¥Â¯â€ Ã§Â ÂÃ£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’Ã¦Ë†â€“Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ¥ÂÂ¡Ã§â€°â€¡Ã¦â€¢Â°Ã¦ÂÂ®
* Ã¥Å“Â¨Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¦â€”Â¥Ã¥Â¿â€”Ã¤Â¸Â­Ã§Â¼â€“Ã¨Â¾â€˜Ã¦â€¢ÂÃ¦â€žÅ¸Ã¥Â­â€”Ã¦Â®Âµ

```php
use Illuminate\Support\Facades\Log;

Log::info('User updated profile', [
    'user_id' => $user->id,
    'email' => '[REDACTED]',
    'token' => '[REDACTED]',
]);
```

## Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¥Â®â€°Ã¥â€¦Â¨

* Ã¥Â®Å¡Ã¦Å“Å¸Ã¨Â¿ÂÃ¨Â¡Å’ `composer audit`
* Ã¨Â°Â¨Ã¦â€¦Å½Ã¥â€ºÂºÃ¥Â®Å¡Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã§â€°Ë†Ã¦Å“Â¬Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Å“Â¨Ã¥â€¡ÂºÃ§Å½Â° CVE Ã¦â€”Â¶Ã¥ÂÅ Ã¦â€”Â¶Ã¦â€ºÂ´Ã¦â€“Â°

## Ã§Â­Â¾Ã¥ÂÂ URL

Ã¤Â½Â¿Ã§â€Â¨Ã§Â­Â¾Ã¥ÂÂÃ¨Â·Â¯Ã§â€Â±Ã§â€Å¸Ã¦Ë†ÂÃ¤Â¸Â´Ã¦â€”Â¶Ã§Å¡â€žÃ£â‚¬ÂÃ©ËœÂ²Ã§Â¯Â¡Ã¦â€Â¹Ã§Å¡â€žÃ©â€œÂ¾Ã¦Å½Â¥Ã£â‚¬â€š

```php
use Illuminate\Support\Facades\URL;

$url = URL::temporarySignedRoute(
    'downloads.invoice',
    now()->addMinutes(15),
    ['invoice' => $invoice->id]
);
```

```php
use Illuminate\Support\Facades\Route;

Route::get('/invoices/{invoice}/download', [InvoiceController::class, 'download'])
    ->name('downloads.invoice')
    ->middleware('signed');
```
