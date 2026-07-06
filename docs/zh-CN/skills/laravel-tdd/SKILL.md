---
name: laravel-tdd
description: Ã¤Â½Â¿Ã§â€Â¨ PHPUnit Ã¥â€™Å’ PestÃ£â‚¬ÂÃ¥Â·Â¥Ã¥Å½â€šÃ£â‚¬ÂÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬ÂÃ¦Â¨Â¡Ã¦â€¹Å¸Ã¤Â»Â¥Ã¥ÂÅ Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§â€ºÂ®Ã¦Â â€¡Ã¨Â¿â€ºÃ¨Â¡Å’ Laravel Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜Ã£â‚¬â€š
origin: ECC
---

# Laravel TDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

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


Ã¤Â½Â¿Ã§â€Â¨ PHPUnit Ã¥â€™Å’ Pest Ã¤Â¸Âº Laravel Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¯Â¼Å’Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¯Â¼Ë†Ã¥Ââ€¢Ã¥â€¦Æ’ + Ã¥Å Å¸Ã¨Æ’Â½Ã¯Â¼â€°Ã¨Â¾Â¾Ã¥Ë†Â° 80% Ã¤Â»Â¥Ã¤Â¸Å Ã£â‚¬â€š

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶Ã¦Å“Âº

* Laravel Ã¤Â¸Â­Ã§Å¡â€žÃ¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¦Ë†â€“Ã§Â«Â¯Ã§â€šÂ¹
* Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Ë†â€“Ã©â€¡ÂÃ¦Å¾â€ž
* Ã¦Âµâ€¹Ã¨Â¯â€¢ Eloquent Ã¦Â¨Â¡Ã¥Å¾â€¹Ã£â‚¬ÂÃ§Â­â€“Ã§â€¢Â¥Ã£â‚¬ÂÃ¤Â½Å“Ã¤Â¸Å¡Ã¥â€™Å’Ã©â‚¬Å¡Ã§Å¸Â¥
* Ã©â„¢Â¤Ã©ÂÅ¾Ã©Â¡Â¹Ã§â€ºÂ®Ã¥Â·Â²Ã¦Â â€¡Ã¥â€¡â€ Ã¥Å’â€“Ã¤Â½Â¿Ã§â€Â¨ PHPUnitÃ¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¦â€“Â°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â¦â€“Ã©â‚¬â€° Pest

## Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å½Å¸Ã§Ââ€ 

### Ã§ÂºÂ¢-Ã§Â»Â¿-Ã©â€¡ÂÃ¦Å¾â€žÃ¥Â¾ÂªÃ§Å½Â¯

1. Ã§Â¼â€“Ã¥â€ â„¢Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢
2. Ã¥Â®Å¾Ã¦â€“Â½Ã¦Å“â‚¬Ã¥Â°ÂÃ¦â€ºÂ´Ã¦â€Â¹Ã¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢
3. Ã¥Å“Â¨Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã§Å¡â€žÃ¥ÂÅ’Ã¦â€”Â¶Ã¨Â¿â€ºÃ¨Â¡Å’Ã©â€¡ÂÃ¦Å¾â€ž

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â±â€šÃ§ÂºÂ§

* **Ã¥Ââ€¢Ã¥â€¦Æ’**Ã¯Â¼Å¡Ã§ÂºÂ¯ PHP Ã§Â±Â»Ã£â‚¬ÂÃ¥â‚¬Â¼Ã¥Â¯Â¹Ã¨Â±Â¡Ã£â‚¬ÂÃ¦Å“ÂÃ¥Å Â¡
* **Ã¥Å Å¸Ã¨Æ’Â½**Ã¯Â¼Å¡HTTP Ã§Â«Â¯Ã§â€šÂ¹Ã£â‚¬ÂÃ¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂÃ§Â­â€“Ã§â€¢Â¥
* **Ã©â€ºâ€ Ã¦Ë†Â**Ã¯Â¼Å¡Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ + Ã©ËœÅ¸Ã¥Ë†â€” + Ã¥Â¤â€“Ã©Æ’Â¨Ã¨Â¾Â¹Ã§â€¢Å’

Ã¦Â Â¹Ã¦ÂÂ®Ã¨Å’Æ’Ã¥â€ºÂ´Ã©â‚¬â€°Ã¦â€¹Â©Ã¥Â±â€šÃ§ÂºÂ§Ã¯Â¼Å¡

* Ã¥Â¯Â¹Ã§ÂºÂ¯Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¥â€™Å’Ã¦Å“ÂÃ¥Å Â¡Ã¤Â½Â¿Ã§â€Â¨**Ã¥Ââ€¢Ã¥â€¦Æ’**Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€š
* Ã¥Â¯Â¹ HTTPÃ£â‚¬ÂÃ¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ¥â€™Å’Ã¥â€œÂÃ¥Âºâ€Ã§Â»â€œÃ¦Å¾â€žÃ¤Â½Â¿Ã§â€Â¨**Ã¥Å Å¸Ã¨Æ’Â½**Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€š
* Ã¥Â½â€œÃ©Å“â‚¬Ã¨Â¦ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ/Ã©ËœÅ¸Ã¥Ë†â€”/Ã¥Â¤â€“Ã©Æ’Â¨Ã¦Å“ÂÃ¥Å Â¡Ã§Â»â€žÃ¥ÂË†Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨**Ã©â€ºâ€ Ã¦Ë†Â**Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€š

### Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ§Â­â€“Ã§â€¢Â¥

* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥Â¤Â§Ã¥Â¤Å¡Ã¦â€¢Â°Ã¥Å Å¸Ã¨Æ’Â½/Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â½Â¿Ã§â€Â¨ `RefreshDatabase`Ã¯Â¼Ë†Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¨Â¿ÂÃ§Â§Â»Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¥Å“Â¨Ã¦â€Â¯Ã¦Å’ÂÃ¦â€”Â¶Ã¥Â°â€ Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥Å’â€¦Ã¨Â£â€¦Ã¥Å“Â¨Ã¤Âºâ€¹Ã¥Å Â¡Ã¤Â¸Â­Ã¯Â¼â€ºÃ¥â€ â€¦Ã¥Â­ËœÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¥ÂÂ¯Ã¨Æ’Â½Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ§Â§Â»Ã¯Â¼â€°
* Ã¥Â½â€œÃ¦Â¨Â¡Ã¥Â¼ÂÃ¥Â·Â²Ã¨Â¿ÂÃ§Â§Â»Ã¤Â¸â€Ã¤Â»â€¦Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Â¯ÂÃ¦Â¬Â¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€ºÅ¾Ã¦Â»Å¡Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ `DatabaseTransactions`
* Ã¥Â½â€œÃ¦Â¯ÂÃ¦Â¬Â¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Æ’Â½Ã©Å“â‚¬Ã¨Â¦ÂÃ¥Â®Å’Ã¦â€¢Â´Ã¨Â¿ÂÃ§Â§Â»/Ã¥Ë†Â·Ã¦â€“Â°Ã¤Â¸â€Ã¥ÂÂ¯Ã¤Â»Â¥Ã¦â€°Â¿Ã¦â€¹â€¦Ã¥â€¦Â¶Ã¥Â¼â‚¬Ã©â€â‚¬Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ `DatabaseMigrations`

Ã¥Â°â€  `RefreshDatabase` Ã¤Â½Å“Ã¤Â¸ÂºÃ¨Â§Â¦Ã¥ÂÅ Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ©Â»ËœÃ¨Â®Â¤Ã©â‚¬â€°Ã¦â€¹Â©Ã¯Â¼Å¡Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦â€Â¯Ã¦Å’ÂÃ¤Âºâ€¹Ã¥Å Â¡Ã§Å¡â€žÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¯Â¼Å’Ã¥Â®Æ’Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¨Â¿ÂÃ§Â§Â»Ã¯Â¼Ë†Ã©â‚¬Å¡Ã¨Â¿â€¡Ã©Ââ„¢Ã¦â‚¬ÂÃ¦Â â€¡Ã¥Â¿â€”Ã¯Â¼â€°Ã¥Â¹Â¶Ã¥Â°â€ Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥Å’â€¦Ã¨Â£â€¦Ã¥Å“Â¨Ã¤Âºâ€¹Ã¥Å Â¡Ã¤Â¸Â­Ã¯Â¼â€ºÃ¥Â¯Â¹Ã¤ÂºÅ½ `:memory:` SQLite Ã¦Ë†â€“Ã¤Â¸ÂÃ¦â€Â¯Ã¦Å’ÂÃ¤Âºâ€¹Ã¥Å Â¡Ã§Å¡â€žÃ¨Â¿Å¾Ã¦Å½Â¥Ã¯Â¼Å’Ã¥Â®Æ’Ã¥Å“Â¨Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€°ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã¨Â¿ÂÃ§Â§Â»Ã£â‚¬â€šÃ¥Â½â€œÃ¦Â¨Â¡Ã¥Â¼ÂÃ¥Â·Â²Ã¨Â¿ÂÃ§Â§Â»Ã¤Â¸â€Ã¤Â»â€¦Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Â¯ÂÃ¦Â¬Â¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€ºÅ¾Ã¦Â»Å¡Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ `DatabaseTransactions`Ã£â‚¬â€š

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¡â€ Ã¦Å¾Â¶Ã©â‚¬â€°Ã¦â€¹Â©

* Ã¦â€“Â°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â»ËœÃ¨Â®Â¤Ã¤Â½Â¿Ã§â€Â¨ **Pest**Ã¯Â¼Ë†Ã¥Â½â€œÃ¥ÂÂ¯Ã§â€Â¨Ã¦â€”Â¶Ã¯Â¼â€°Ã£â‚¬â€š
* Ã¤Â»â€¦Ã¥Å“Â¨Ã©Â¡Â¹Ã§â€ºÂ®Ã¥Â·Â²Ã¦Â â€¡Ã¥â€¡â€ Ã¥Å’â€“Ã¤Â½Â¿Ã§â€Â¨Ã¥Â®Æ’Ã¦Ë†â€“Ã©Å“â‚¬Ã¨Â¦Â PHPUnit Ã§â€°Â¹Ã¥Â®Å¡Ã¥Â·Â¥Ã¥â€¦Â·Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ **PHPUnit**Ã£â‚¬â€š

## Ã§Â¤ÂºÃ¤Â¾â€¹

### PHPUnit Ã§Â¤ÂºÃ¤Â¾â€¹

```php
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class ProjectControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_create_project(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/projects', [
            'name' => 'New Project',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('projects', ['name' => 'New Project']);
    }
}
```

### Ã¥Å Å¸Ã¨Æ’Â½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼Ë†HTTP Ã¥Â±â€šÃ¯Â¼â€°

```php
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class ProjectIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_projects_index_returns_paginated_results(): void
    {
        $user = User::factory()->create();
        Project::factory()->count(3)->for($user)->create();

        $response = $this->actingAs($user)->getJson('/api/projects');

        $response->assertOk();
        $response->assertJsonStructure(['success', 'data', 'error', 'meta']);
    }
}
```

### Pest Ã§Â¤ÂºÃ¤Â¾â€¹

```php
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;

uses(RefreshDatabase::class);

test('owner can create project', function () {
    $user = User::factory()->create();

    $response = actingAs($user)->postJson('/api/projects', [
        'name' => 'New Project',
    ]);

    $response->assertCreated();
    assertDatabaseHas('projects', ['name' => 'New Project']);
});
```

### Pest Ã¥Å Å¸Ã¨Æ’Â½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼Ë†HTTP Ã¥Â±â€šÃ¯Â¼â€°

```php
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

test('projects index returns paginated results', function () {
    $user = User::factory()->create();
    Project::factory()->count(3)->for($user)->create();

    $response = actingAs($user)->getJson('/api/projects');

    $response->assertOk();
    $response->assertJsonStructure(['success', 'data', 'error', 'meta']);
});
```

### Ã¥Â·Â¥Ã¥Å½â€šÃ¥â€™Å’Ã§Å Â¶Ã¦â‚¬Â

* Ã¤Â½Â¿Ã§â€Â¨Ã¥Â·Â¥Ã¥Å½â€šÃ§â€Å¸Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€¢Â°Ã¦ÂÂ®
* Ã¤Â¸ÂºÃ¨Â¾Â¹Ã§Â¼ËœÃ¦Æ’â€¦Ã¥â€ ÂµÃ¥Â®Å¡Ã¤Â¹â€°Ã§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Ë†Ã¥Â·Â²Ã¥Â½â€™Ã¦Â¡Â£Ã£â‚¬ÂÃ§Â®Â¡Ã§Ââ€ Ã¥â€˜ËœÃ£â‚¬ÂÃ¨Â¯â€¢Ã§â€Â¨Ã¯Â¼â€°

```php
$user = User::factory()->state(['role' => 'admin'])->create();
```

### Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¦Âµâ€¹Ã¨Â¯â€¢

* Ã¤Â½Â¿Ã§â€Â¨ `RefreshDatabase` Ã¤Â¿ÂÃ¦Å’ÂÃ¥Â¹Â²Ã¥â€¡â‚¬Ã§Å Â¶Ã¦â‚¬Â
* Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©Å¡â€Ã§Â¦Â»Ã¥â€™Å’Ã§Â¡Â®Ã¥Â®Å¡Ã¦â‚¬Â§
* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `assertDatabaseHas` Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦â€°â€¹Ã¥Å Â¨Ã¦Å¸Â¥Ã¨Â¯Â¢

### Ã¦Å’ÂÃ¤Â¹â€¦Ã¦â‚¬Â§Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â¤ÂºÃ¤Â¾â€¹

```php
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class ProjectRepositoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_project_can_be_retrieved_by_slug(): void
    {
        $project = Project::factory()->create(['slug' => 'alpha']);

        $found = Project::query()->where('slug', 'alpha')->firstOrFail();

        $this->assertSame($project->id, $found->id);
    }
}
```

### Ã¥â€°Â¯Ã¤Â½Å“Ã§â€Â¨Ã¦Â¨Â¡Ã¦â€¹Å¸

* Ã¤Â½Å“Ã¤Â¸Å¡Ã¤Â½Â¿Ã§â€Â¨ `Bus::fake()`
* Ã©ËœÅ¸Ã¥Ë†â€”Ã¥Â·Â¥Ã¤Â½Å“Ã¤Â½Â¿Ã§â€Â¨ `Queue::fake()`
* Ã©â‚¬Å¡Ã§Å¸Â¥Ã¤Â½Â¿Ã§â€Â¨ `Mail::fake()` Ã¥â€™Å’ `Notification::fake()`
* Ã©Â¢â€ Ã¥Å¸Å¸Ã¤Âºâ€¹Ã¤Â»Â¶Ã¤Â½Â¿Ã§â€Â¨ `Event::fake()`

```php
use Illuminate\Support\Facades\Queue;

Queue::fake();

dispatch(new SendOrderConfirmation($order->id));

Queue::assertPushed(SendOrderConfirmation::class);
```

```php
use Illuminate\Support\Facades\Notification;

Notification::fake();

$user->notify(new InvoiceReady($invoice));

Notification::assertSentTo($user, InvoiceReady::class);
```

### Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†SanctumÃ¯Â¼â€°

```php
use Laravel\Sanctum\Sanctum;

Sanctum::actingAs($user);

$response = $this->getJson('/api/projects');
$response->assertOk();
```

### HTTP Ã¥â€™Å’Ã¥Â¤â€“Ã©Æ’Â¨Ã¦Å“ÂÃ¥Å Â¡

* Ã¤Â½Â¿Ã§â€Â¨ `Http::fake()` Ã©Å¡â€Ã§Â¦Â»Ã¥Â¤â€“Ã©Æ’Â¨ API
* Ã¤Â½Â¿Ã§â€Â¨ `Http::assertSent()` Ã¦â€“Â­Ã¨Â¨â‚¬Ã¥â€¡ÂºÃ§Â«â„¢Ã¨Â´Å¸Ã¨Â½Â½

### Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§â€ºÂ®Ã¦Â â€¡

* Ã¥Â¯Â¹Ã¥Ââ€¢Ã¥â€¦Æ’ + Ã¥Å Å¸Ã¨Æ’Â½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’ 80% Ã¤Â»Â¥Ã¤Â¸Å Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡
* Ã¥Å“Â¨ CI Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `pcov` Ã¦Ë†â€“ `XDEBUG_MODE=coverage`

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€˜Â½Ã¤Â»Â¤

* `php artisan test`
* `vendor/bin/phpunit`
* `vendor/bin/pest`

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â€¦ÂÃ§Â½Â®

* Ã¤Â½Â¿Ã§â€Â¨ `phpunit.xml` Ã¨Â®Â¾Ã§Â½Â® `DB_CONNECTION=sqlite` Ã¥â€™Å’ `DB_DATABASE=:memory:` Ã¤Â»Â¥Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Â¿Â«Ã©â‚¬Å¸Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¤Â¸ÂºÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¿ÂÃ¦Å’ÂÃ§â€¹Â¬Ã§Â«â€¹Ã§Å¡â€žÃ§Å½Â¯Ã¥Â¢Æ’Ã¯Â¼Å’Ã¤Â»Â¥Ã©ÂÂ¿Ã¥â€¦ÂÃ¨Â§Â¦Ã¥ÂÅ Ã¥Â¼â‚¬Ã¥Ââ€˜/Ã§â€Å¸Ã¤ÂºÂ§Ã¦â€¢Â°Ã¦ÂÂ®

### Ã¦Å½Ë†Ã¦ÂÆ’Ã¦Âµâ€¹Ã¨Â¯â€¢

```php
use Illuminate\Support\Facades\Gate;

$this->assertTrue(Gate::forUser($user)->allows('update', $project));
$this->assertFalse(Gate::forUser($otherUser)->allows('update', $project));
```

### Inertia Ã¥Å Å¸Ã¨Æ’Â½Ã¦Âµâ€¹Ã¨Â¯â€¢

Ã¤Â½Â¿Ã§â€Â¨ Inertia.js Ã¦â€”Â¶Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ Inertia Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¾â€¦Ã¥Å Â©Ã¥â€¡Â½Ã¦â€¢Â°Ã¦ÂÂ¥Ã¦â€“Â­Ã¨Â¨â‚¬Ã§Â»â€žÃ¤Â»Â¶Ã¥ÂÂÃ§Â§Â°Ã¥â€™Å’Ã¥Â±Å¾Ã¦â‚¬Â§Ã£â‚¬â€š

```php
use App\Models\User;
use Inertia\Testing\AssertableInertia;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class DashboardInertiaTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_inertia_props(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertOk();
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Dashboard')
            ->where('user.id', $user->id)
            ->has('projects')
        );
    }
}
```

Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `assertInertia` Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Å½Å¸Ã¥Â§â€¹ JSON Ã¦â€“Â­Ã¨Â¨â‚¬Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Å½ Inertia Ã¥â€œÂÃ¥Âºâ€Ã¤Â¸â‚¬Ã¨â€¡Â´Ã£â‚¬â€š
