---
name: laravel-patterns
description: Laravel architecture patterns, routing/controllers, Eloquent ORM, service layers, queues, events, caching, and API resources for production apps.
origin: ECC
---

# Laravel Geliştirme Desenleri

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


Ölçeklenebilir, bakım yapılabilir uygulamalar için üretim seviyesi Laravel mimari desenleri.

## Ne Zaman Kullanılır

- Laravel web uygulamaları veya API'ler oluşturma
- Controller'lar, servisler ve domain mantığını yapılandırma
- Eloquent model'ler ve ilişkiler ile çalışma
- Resource'lar ve sayfalama ile API tasarlama
- Kuyruklar, event'ler, caching ve arka plan işleri ekleme

## Nasıl Çalışır

- Uygulamayı net sınırlar etrafında yapılandırın (controller'lar -> servisler/action'lar -> model'ler).
- Routing'i öngörülebilir tutmak için açık binding'ler ve scoped binding'ler kullanın; erişim kontrolü için yetkilendirmeyi yine de uygulayın.
- Domain mantığını tutarlı tutmak için typed model'leri, cast'leri ve scope'ları tercih edin.
- IO-ağır işleri kuyruklarda tutun ve pahalı okumaları önbelleğe alın.
- Config'i `config/*` içinde merkezileştirin ve ortamları açık tutun.

## Örnekler

### Proje Yapısı

Net katman sınırları (HTTP, servisler/action'lar, model'ler) ile geleneksel bir Laravel düzeni kullanın.

### Önerilen Düzen

```
app/
├── Actions/            # Tek amaçlı kullanım durumları
├── Console/
├── Events/
├── Exceptions/
├── Http/
│   ├── Controllers/
│   ├── Middleware/
│   ├── Requests/       # Form request validation
│   └── Resources/      # API resources
├── Jobs/
├── Models/
├── Policies/
├── Providers/
├── Services/           # Domain servislerini koordine etme
└── Support/
config/
database/
├── factories/
├── migrations/
└── seeders/
resources/
├── views/
└── lang/
routes/
├── api.php
├── web.php
└── console.php
```

### Controllers -> Services -> Actions

Controller'ları ince tutun. Orkestrasyon'u servislere ve tek amaçlı mantığı action'lara koyun.

```php
final class CreateOrderAction
{
    public function __construct(private OrderRepository $orders) {}

    public function handle(CreateOrderData $data): Order
    {
        return $this->orders->create($data);
    }
}

final class OrdersController extends Controller
{
    public function __construct(private CreateOrderAction $createOrder) {}

    public function store(StoreOrderRequest $request): JsonResponse
    {
        $order = $this->createOrder->handle($request->toDto());

        return response()->json([
            'success' => true,
            'data' => OrderResource::make($order),
            'error' => null,
            'meta' => null,
        ], 201);
    }
}
```

### Routing ve Controllers

Netlik için route-model binding ve resource controller'ları tercih edin.

```php
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('projects', ProjectController::class);
});
```

### Route Model Binding (Scoped)

Çapraz kiracı erişimini önlemek için scoped binding'leri kullanın.

```php
Route::scopeBindings()->group(function () {
    Route::get('/accounts/{account}/projects/{project}', [ProjectController::class, 'show']);
});
```

### İç İçe Route'lar ve Binding İsimleri

- Çift iç içe geçmeyi önlemek için prefix'leri ve path'leri tutarlı tutun (örn. `conversation` vs `conversations`).
- Bound model'e uyan tek bir parametre ismi kullanın (örn. `Conversation` için `{conversation}`).
- İç içe geçirirken üst-alt ilişkilerini zorlamak için scoped binding'leri tercih edin.

```php
use App\Http\Controllers\Api\ConversationController;
use App\Http\Controllers\Api\MessageController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('conversations')->group(function () {
    Route::post('/', [ConversationController::class, 'store'])->name('conversations.store');

    Route::scopeBindings()->group(function () {
        Route::get('/{conversation}', [ConversationController::class, 'show'])
            ->name('conversations.show');

        Route::post('/{conversation}/messages', [MessageController::class, 'store'])
            ->name('conversation-messages.store');

        Route::get('/{conversation}/messages/{message}', [MessageController::class, 'show'])
            ->name('conversation-messages.show');
    });
});
```

Bir parametrenin farklı bir model sınıfına çözümlenmesini istiyorsanız, açık binding tanımlayın. Özel binding mantığı için `Route::bind()` kullanın veya model'de `resolveRouteBinding()` uygulayın.

```php
use App\Models\AiConversation;
use Illuminate\Support\Facades\Route;

Route::model('conversation', AiConversation::class);
```

### Service Container Binding'leri

Net bağımlılık bağlantısı için bir service provider'da interface'leri implementasyonlara bağlayın.

```php
use App\Repositories\EloquentOrderRepository;
use App\Repositories\OrderRepository;
use Illuminate\Support\ServiceProvider;

final class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(OrderRepository::class, EloquentOrderRepository::class);
    }
}
```

### Eloquent Model Desenleri

### Model Yapılandırması

```php
final class Project extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'owner_id', 'status'];

    protected $casts = [
        'status' => ProjectStatus::class,
        'archived_at' => 'datetime',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->whereNull('archived_at');
    }
}
```

### Özel Cast'ler ve Value Object'ler

Sıkı tiplemeler için enum'lar veya value object'leri kullanın.

```php
use Illuminate\Database\Eloquent\Casts\Attribute;

protected $casts = [
    'status' => ProjectStatus::class,
];
```

```php
protected function budgetCents(): Attribute
{
    return Attribute::make(
        get: fn (int $value) => Money::fromCents($value),
        set: fn (Money $money) => $money->toCents(),
    );
}
```

### N+1'i Önlemek için Eager Loading

```php
$orders = Order::query()
    ->with(['customer', 'items.product'])
    ->latest()
    ->paginate(25);
```

### Karmaşık Filtreler için Query Object'leri

```php
final class ProjectQuery
{
    public function __construct(private Builder $query) {}

    public function ownedBy(int $userId): self
    {
        $query = clone $this->query;

        return new self($query->where('owner_id', $userId));
    }

    public function active(): self
    {
        $query = clone $this->query;

        return new self($query->whereNull('archived_at'));
    }

    public function builder(): Builder
    {
        return $this->query;
    }
}
```

### Global Scope'lar ve Soft Delete'ler

Varsayılan filtreleme için global scope'ları ve geri kurtarılabilir kayıtlar için `SoftDeletes` kullanın.
Katmanlı davranış istemediğiniz sürece, aynı filtre için global scope veya named scope kullanın, ikisini birden değil.

```php
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

final class Project extends Model
{
    use SoftDeletes;

    protected static function booted(): void
    {
        static::addGlobalScope('active', function (Builder $builder): void {
            $builder->whereNull('archived_at');
        });
    }
}
```

### Yeniden Kullanılabilir Filtreler için Query Scope'ları

```php
use Illuminate\Database\Eloquent\Builder;

final class Project extends Model
{
    public function scopeOwnedBy(Builder $query, int $userId): Builder
    {
        return $query->where('owner_id', $userId);
    }
}

// Servis, repository vb. içinde
$projects = Project::ownedBy($user->id)->get();
```

### Çok Adımlı Güncellemeler için Transaction'lar

```php
use Illuminate\Support\Facades\DB;

DB::transaction(function (): void {
    $order->update(['status' => 'paid']);
    $order->items()->update(['paid_at' => now()]);
});
```

### Migration'lar

### İsimlendirme Kuralı

- Dosya isimleri zaman damgası kullanır: `YYYY_MM_DD_HHMMSS_create_users_table.php`
- Migration'lar anonim sınıflar kullanır (isimlendirilmiş sınıf yok); dosya ismi amacı iletir
- Tablo isimleri varsayılan olarak `snake_case` ve çoğuldur

### Örnek Migration

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->string('status', 32)->index();
            $table->unsignedInteger('total_cents');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
```

### Form Request'ler ve Validation

Validation'ı form request'lerde tutun ve input'ları DTO'lara dönüştürün.

```php
use App\Models\Order;

final class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Order::class) ?? false;
    }

    public function rules(): array
    {
        return [
            'customer_id' => ['required', 'integer', 'exists:customers,id'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.sku' => ['required', 'string'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ];
    }

    public function toDto(): CreateOrderData
    {
        return new CreateOrderData(
            customerId: (int) $this->validated('customer_id'),
            items: $this->validated('items'),
        );
    }
}
```

### API Resource'ları

Resource'lar ve sayfalama ile API yanıtlarını tutarlı tutun.

```php
$projects = Project::query()->active()->paginate(25);

return response()->json([
    'success' => true,
    'data' => ProjectResource::collection($projects->items()),
    'error' => null,
    'meta' => [
        'page' => $projects->currentPage(),
        'per_page' => $projects->perPage(),
        'total' => $projects->total(),
    ],
]);
```

### Event'ler, Job'lar ve Kuyruklar

- Yan etkiler için domain event'leri yayınlayın (email'ler, analytics)
- Yavaş işler için kuyruğa alınmış job'ları kullanın (raporlar, export'lar, webhook'lar)
- Yeniden deneme ve backoff ile idempotent handler'ları tercih edin

### Caching

- Okuma-ağırlıklı endpoint'leri ve pahalı sorguları önbelleğe alın
- Model event'lerinde (created/updated/deleted) önbellekleri geçersiz kılın
- Kolay geçersiz kılma için ilgili verileri önbelleğe alırken tag'leri kullanın

### Yapılandırma ve Ortamlar

- Gizli bilgileri `.env`'de ve yapılandırmayı `config/*.php`'de tutun
- Ortama özel yapılandırma geçersiz kılmaları kullanın ve production'da `config:cache` kullanın
