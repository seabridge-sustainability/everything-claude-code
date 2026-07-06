---
name: laravel-tdd
description: Test-driven development for Laravel with PHPUnit and Pest, factories, database testing, fakes, and coverage targets.
origin: ECC
---

# Laravel TDD Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

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


80%+ kapsam (unit + feature) ile Laravel uygulamalarÃ„Â± iÃƒÂ§in test-driven development.

## Ne Zaman KullanÃ„Â±lÃ„Â±r

- Laravel'de yeni ÃƒÂ¶zellikler veya endpoint'ler
- Bug dÃƒÂ¼zeltmeleri veya refactoring'ler
- Eloquent model'leri, policy'leri, job'larÃ„Â± ve notification'larÃ„Â± test etme
- Proje zaten PHPUnit'te standartlaÃ…Å¸mamÃ„Â±Ã…Å¸sa yeni testler iÃƒÂ§in Pest'i tercih edin

## NasÃ„Â±l Ãƒâ€¡alÃ„Â±Ã…Å¸Ã„Â±r

### Red-Green-Refactor DÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼

1) BaÃ…Å¸arÃ„Â±sÃ„Â±z bir test yazÃ„Â±n
2) GeÃƒÂ§mek iÃƒÂ§in minimal deÃ„Å¸iÃ…Å¸iklik uygulayÃ„Â±n
3) Testleri yeÃ…Å¸il tutarken refactor edin

### Test KatmanlarÃ„Â±

- **Unit**: saf PHP sÃ„Â±nÃ„Â±flarÃ„Â±, value object'leri, servisler
- **Feature**: HTTP endpoint'leri, auth, validation, policy'ler
- **Integration**: database + kuyruk + harici sÃ„Â±nÃ„Â±rlar

Kapsama gÃƒÂ¶re katmanlarÃ„Â± seÃƒÂ§in:

- Saf iÃ…Å¸ mantÃ„Â±Ã„Å¸Ã„Â± ve servisler iÃƒÂ§in **Unit** testleri kullanÃ„Â±n.
- HTTP, auth, validation ve yanÃ„Â±t Ã…Å¸ekli iÃƒÂ§in **Feature** testleri kullanÃ„Â±n.
- DB/kuyruklar/harici servisleri birlikte doÃ„Å¸rularken **Integration** testleri kullanÃ„Â±n.

### Database Stratejisi

- Ãƒâ€¡oÃ„Å¸u feature/integration testi iÃƒÂ§in `RefreshDatabase` (test run'Ã„Â± baÃ…Å¸Ã„Â±na bir kez migration'larÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±r, ardÃ„Â±ndan desteklendiÃ„Å¸inde her testi bir transaction'a sarar; in-memory veritabanlarÃ„Â± test baÃ…Å¸Ã„Â±na yeniden migrate edebilir)
- Ã…Å¾ema zaten migrate edilmiÃ…Å¸se ve sadece test baÃ…Å¸Ã„Â±na rollback'e ihtiyacÃ„Â±nÃ„Â±z varsa `DatabaseTransactions`
- Her test iÃƒÂ§in tam bir migrate/fresh'e ihtiyacÃ„Â±nÃ„Â±z varsa ve maliyetini karÃ…Å¸Ã„Â±layabiliyorsanÃ„Â±z `DatabaseMigrations`

VeritabanÃ„Â±na dokunan testler iÃƒÂ§in varsayÃ„Â±lan olarak `RefreshDatabase` kullanÃ„Â±n: transaction desteÃ„Å¸i olan veritabanlarÃ„Â± iÃƒÂ§in, test run'Ã„Â± baÃ…Å¸Ã„Â±na bir kez (static bir bayrak aracÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla) migration'larÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±r ve her testi bir transaction'a sarar; `:memory:` SQLite veya transaction'sÃ„Â±z baÃ„Å¸lantÃ„Â±lar iÃƒÂ§in her testten ÃƒÂ¶nce migrate eder. Ã…Å¾ema zaten migrate edilmiÃ…Å¸se ve sadece test baÃ…Å¸Ã„Â±na rollback'lere ihtiyacÃ„Â±nÃ„Â±z varsa `DatabaseTransactions` kullanÃ„Â±n.

### Test Framework SeÃƒÂ§imi

- Mevcut olduÃ„Å¸unda yeni testler iÃƒÂ§in varsayÃ„Â±lan olarak **Pest** kullanÃ„Â±n.
- Proje zaten PHPUnit'te standartlaÃ…Å¸mÃ„Â±Ã…Å¸sa veya PHPUnit'e ÃƒÂ¶zgÃƒÂ¼ araÃƒÂ§lar gerektiriyorsa sadece **PHPUnit** kullanÃ„Â±n.

## Ãƒâ€“rnekler

### PHPUnit Ãƒâ€“rneÃ„Å¸i

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

### Feature Test Ãƒâ€“rneÃ„Å¸i (HTTP KatmanÃ„Â±)

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

### Pest Ãƒâ€“rneÃ„Å¸i

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

### Feature Test Pest Ãƒâ€“rneÃ„Å¸i (HTTP KatmanÃ„Â±)

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

### Factory'ler ve State'ler

- Test verileri iÃƒÂ§in factory'leri kullanÃ„Â±n
- UÃƒÂ§ durumlar iÃƒÂ§in state'leri tanÃ„Â±mlayÃ„Â±n (archived, admin, trial)

```php
$user = User::factory()->state(['role' => 'admin'])->create();
```

### Database Testi

- Temiz durum iÃƒÂ§in `RefreshDatabase` kullanÃ„Â±n
- Testleri izole ve deterministik tutun
- Manuel sorgular yerine `assertDatabaseHas` tercih edin

### Persistence Test Ãƒâ€“rneÃ„Å¸i

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

### Yan Etkiler iÃƒÂ§in Fake'ler

- Job'lar iÃƒÂ§in `Bus::fake()`
- KuyruÃ„Å¸a alÃ„Â±nmÃ„Â±Ã…Å¸ iÃ…Å¸ler iÃƒÂ§in `Queue::fake()`
- Bildirimler iÃƒÂ§in `Mail::fake()` ve `Notification::fake()`
- Domain event'leri iÃƒÂ§in `Event::fake()`

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

### Auth Testi (Sanctum)

```php
use Laravel\Sanctum\Sanctum;

Sanctum::actingAs($user);

$response = $this->getJson('/api/projects');
$response->assertOk();
```

### HTTP ve Harici Servisler

- Harici API'leri izole etmek iÃƒÂ§in `Http::fake()` kullanÃ„Â±n
- Giden payload'larÃ„Â± `Http::assertSent()` ile doÃ„Å¸rulayÃ„Â±n

### Kapsam Hedefleri

- Unit + feature testleri iÃƒÂ§in 80%+ kapsam zorlayÃ„Â±n
- CI'da `pcov` veya `XDEBUG_MODE=coverage` kullanÃ„Â±n

### Test KomutlarÃ„Â±

- `php artisan test`
- `vendor/bin/phpunit`
- `vendor/bin/pest`

### Test YapÃ„Â±landÃ„Â±rmasÃ„Â±

- HÃ„Â±zlÃ„Â± testler iÃƒÂ§in `phpunit.xml`'de `DB_CONNECTION=sqlite` ve `DB_DATABASE=:memory:` ayarlayÃ„Â±n
- Dev/prod verilerine dokunmaktan kaÃƒÂ§Ã„Â±nmak iÃƒÂ§in testler iÃƒÂ§in ayrÃ„Â± env tutun

### Yetkilendirme Testleri

```php
use Illuminate\Support\Facades\Gate;

$this->assertTrue(Gate::forUser($user)->allows('update', $project));
$this->assertFalse(Gate::forUser($otherUser)->allows('update', $project));
```

### Inertia Feature Testleri

Inertia.js kullanÃ„Â±rken, Inertia test yardÃ„Â±mcÃ„Â±larÃ„Â± ile component ismi ve prop'larÃ„Â± doÃ„Å¸rulayÃ„Â±n.

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

Testleri Inertia yanÃ„Â±tlarÃ„Â±yla uyumlu tutmak iÃƒÂ§in ham JSON assertion'larÃ„Â± yerine `assertInertia` tercih edin.
