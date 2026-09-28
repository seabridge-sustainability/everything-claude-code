---
name: laravel-tdd
description: Test-driven development for Laravel with PHPUnit and Pest, factories, database testing, fakes, and coverage targets.
origin: ECC
---

# Laravel TDD İş Akışı

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


80%+ kapsam (unit + feature) ile Laravel uygulamaları için test-driven development.

## Ne Zaman Kullanılır

- Laravel'de yeni özellikler veya endpoint'ler
- Bug düzeltmeleri veya refactoring'ler
- Eloquent model'leri, policy'leri, job'ları ve notification'ları test etme
- Proje zaten PHPUnit'te standartlaşmamışsa yeni testler için Pest'i tercih edin

## Nasıl Çalışır

### Red-Green-Refactor Döngüsü

1) Başarısız bir test yazın
2) Geçmek için minimal değişiklik uygulayın
3) Testleri yeşil tutarken refactor edin

### Test Katmanları

- **Unit**: saf PHP sınıfları, value object'leri, servisler
- **Feature**: HTTP endpoint'leri, auth, validation, policy'ler
- **Integration**: database + kuyruk + harici sınırlar

Kapsama göre katmanları seçin:

- Saf iş mantığı ve servisler için **Unit** testleri kullanın.
- HTTP, auth, validation ve yanıt şekli için **Feature** testleri kullanın.
- DB/kuyruklar/harici servisleri birlikte doğrularken **Integration** testleri kullanın.

### Database Stratejisi

- Çoğu feature/integration testi için `RefreshDatabase` (test run'ı başına bir kez migration'ları çalıştırır, ardından desteklendiğinde her testi bir transaction'a sarar; in-memory veritabanları test başına yeniden migrate edebilir)
- Şema zaten migrate edilmişse ve sadece test başına rollback'e ihtiyacınız varsa `DatabaseTransactions`
- Her test için tam bir migrate/fresh'e ihtiyacınız varsa ve maliyetini karşılayabiliyorsanız `DatabaseMigrations`

Veritabanına dokunan testler için varsayılan olarak `RefreshDatabase` kullanın: transaction desteği olan veritabanları için, test run'ı başına bir kez (static bir bayrak aracılığıyla) migration'ları çalıştırır ve her testi bir transaction'a sarar; `:memory:` SQLite veya transaction'sız bağlantılar için her testten önce migrate eder. Şema zaten migrate edilmişse ve sadece test başına rollback'lere ihtiyacınız varsa `DatabaseTransactions` kullanın.

### Test Framework Seçimi

- Mevcut olduğunda yeni testler için varsayılan olarak **Pest** kullanın.
- Proje zaten PHPUnit'te standartlaşmışsa veya PHPUnit'e özgü araçlar gerektiriyorsa sadece **PHPUnit** kullanın.

## Örnekler

### PHPUnit Örneği

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

### Feature Test Örneği (HTTP Katmanı)

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

### Pest Örneği

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

### Feature Test Pest Örneği (HTTP Katmanı)

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

- Test verileri için factory'leri kullanın
- Uç durumlar için state'leri tanımlayın (archived, admin, trial)

```php
$user = User::factory()->state(['role' => 'admin'])->create();
```

### Database Testi

- Temiz durum için `RefreshDatabase` kullanın
- Testleri izole ve deterministik tutun
- Manuel sorgular yerine `assertDatabaseHas` tercih edin

### Persistence Test Örneği

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

### Yan Etkiler için Fake'ler

- Job'lar için `Bus::fake()`
- Kuyruğa alınmış işler için `Queue::fake()`
- Bildirimler için `Mail::fake()` ve `Notification::fake()`
- Domain event'leri için `Event::fake()`

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

- Harici API'leri izole etmek için `Http::fake()` kullanın
- Giden payload'ları `Http::assertSent()` ile doğrulayın

### Kapsam Hedefleri

- Unit + feature testleri için 80%+ kapsam zorlayın
- CI'da `pcov` veya `XDEBUG_MODE=coverage` kullanın

### Test Komutları

- `php artisan test`
- `vendor/bin/phpunit`
- `vendor/bin/pest`

### Test Yapılandırması

- Hızlı testler için `phpunit.xml`'de `DB_CONNECTION=sqlite` ve `DB_DATABASE=:memory:` ayarlayın
- Dev/prod verilerine dokunmaktan kaçınmak için testler için ayrı env tutun

### Yetkilendirme Testleri

```php
use Illuminate\Support\Facades\Gate;

$this->assertTrue(Gate::forUser($user)->allows('update', $project));
$this->assertFalse(Gate::forUser($otherUser)->allows('update', $project));
```

### Inertia Feature Testleri

Inertia.js kullanırken, Inertia test yardımcıları ile component ismi ve prop'ları doğrulayın.

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

Testleri Inertia yanıtlarıyla uyumlu tutmak için ham JSON assertion'ları yerine `assertInertia` tercih edin.
