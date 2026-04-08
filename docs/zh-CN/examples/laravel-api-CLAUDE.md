# Laravel API Ã¢â‚¬â€ Ã©Â¡Â¹Ã§â€ºÂ® CLAUDE.md

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Ã¤Â½Â¿Ã§â€Â¨ PostgreSQLÃ£â‚¬ÂRedis Ã¥â€™Å’Ã©ËœÅ¸Ã¥Ë†â€”Ã§Å¡â€ž Laravel API Ã§Å“Å¸Ã¥Â®Å¾Ã¦Â¡Ë†Ã¤Â¾â€¹Ã£â‚¬â€š
> Ã¥Â¤ÂÃ¥Ë†Â¶Ã¦Â­Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Ë†Â°Ã¤Â½Â Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Å’Ã¥Â¹Â¶Ã¦Â Â¹Ã¦ÂÂ®Ã¤Â½Â Ã§Å¡â€žÃ¦Å“ÂÃ¥Å Â¡Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã£â‚¬â€š

## Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Â¦â€šÃ¨Â¿Â°

**Ã¦Å â‚¬Ã¦Å“Â¯Ã¦Â Ë†:** PHP 8.2+, Laravel 11.x, PostgreSQL, Redis, Horizon, PHPUnit/Pest, Docker Compose

**Ã¦Å¾Â¶Ã¦Å¾â€ž:** Ã©â€¡â€¡Ã§â€Â¨Ã¦Å½Â§Ã¥Ë†Â¶Ã¥â„¢Â¨ -> Ã¦Å“ÂÃ¥Å Â¡ -> Ã¦â€œÂÃ¤Â½Å“Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Ââ€”Ã¥Å’â€“ Laravel Ã¥Âºâ€Ã§â€Â¨Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ Eloquent ORMÃ£â‚¬ÂÃ¥Â¼â€šÃ¦Â­Â¥Ã¥Â·Â¥Ã¤Â½Å“Ã©ËœÅ¸Ã¥Ë†â€”Ã£â‚¬ÂÃ¨Â¡Â¨Ã¥Ââ€¢Ã¨Â¯Â·Ã¦Â±â€šÃ¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å’Ã¤Â»Â¥Ã¥ÂÅ  API Ã¨Âµâ€žÃ¦ÂºÂÃ§Â¡Â®Ã¤Â¿ÂÃ¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€ž JSON Ã¥â€œÂÃ¥Âºâ€Ã£â‚¬â€š

## Ã¥â€¦Â³Ã©â€Â®Ã¨Â§â€žÃ¥Ë†â„¢

### PHP Ã§ÂºÂ¦Ã¥Â®Å¡

* Ã¦â€°â‚¬Ã¦Å“â€° PHP Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `declare(strict_types=1)`
* Ã¥Â¤â€žÃ¥Â¤â€žÃ¤Â½Â¿Ã§â€Â¨Ã§Â±Â»Ã¥Å¾â€¹Ã¥Â±Å¾Ã¦â‚¬Â§Ã¥â€™Å’Ã¨Â¿â€Ã¥â€ºÅ¾Ã§Â±Â»Ã¥Å¾â€¹
* Ã¦Å“ÂÃ¥Å Â¡Ã¥â€™Å’Ã¦â€œÂÃ¤Â½Å“Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `final` Ã§Â±Â»
* Ã¦ÂÂÃ¤ÂºÂ¤Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¤Â¸ÂÃ¥â€¦ÂÃ¨Â®Â¸Ã¥â€¡ÂºÃ§Å½Â° `dd()` Ã¦Ë†â€“ `dump()`
* Ã©â‚¬Å¡Ã¨Â¿â€¡ Laravel Pint Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“ (PSR-12)

### API Ã¥â€œÂÃ¥Âºâ€Ã¥Â°ÂÃ¨Â£â€¦

Ã¦â€°â‚¬Ã¦Å“â€° API Ã¥â€œÂÃ¥Âºâ€Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ¥Â°ÂÃ¨Â£â€¦Ã¦Â Â¼Ã¥Â¼ÂÃ¯Â¼Å¡

```json
{
  "success": true,
  "data": {"...": "..."},
  "error": null,
  "meta": {"page": 1, "per_page": 25, "total": 120}
}
```

### Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ

* Ã¨Â¿ÂÃ§Â§Â»Ã¦â€“â€¡Ã¤Â»Â¶Ã¦ÂÂÃ¤ÂºÂ¤Ã¥Ë†Â° git
* Ã¤Â½Â¿Ã§â€Â¨ Eloquent Ã¦Ë†â€“Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¦Å¾â€žÃ©â‚¬Â Ã¥â„¢Â¨Ã¯Â¼Ë†Ã©â„¢Â¤Ã©ÂÅ¾Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨Ã¥Å½Å¸Ã¥Â§â€¹ SQLÃ¯Â¼â€°
* Ã¤Â¸Âº `where` Ã¦Ë†â€“ `orderBy` Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã§Å¡â€žÃ¤Â»Â»Ã¤Â½â€¢Ã¥Ë†â€”Ã¥Â»ÂºÃ§Â«â€¹Ã§Â´Â¢Ã¥Â¼â€¢
* Ã©ÂÂ¿Ã¥â€¦ÂÃ¥Å“Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¤Â¸Â­Ã¤Â¿Â®Ã¦â€Â¹Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥Â®Å¾Ã¤Â¾â€¹Ã¯Â¼â€ºÃ¤Â¼ËœÃ¥â€¦Ë†Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Âºâ€œÃ¦Ë†â€“Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¦Å¾â€žÃ©â‚¬Â Ã¥â„¢Â¨Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Ë†â€ºÃ¥Â»Âº/Ã¦â€ºÂ´Ã¦â€“Â°

### Ã¨Â®Â¤Ã¨Â¯Â

* Ã©â‚¬Å¡Ã¨Â¿â€¡ Sanctum Ã¨Â¿â€ºÃ¨Â¡Å’ API Ã¨Â®Â¤Ã¨Â¯Â
* Ã¤Â½Â¿Ã§â€Â¨Ã§Â­â€“Ã§â€¢Â¥Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â¨Â¡Ã¥Å¾â€¹Ã§ÂºÂ§Ã¦Å½Ë†Ã¦ÂÆ’
* Ã¥Å“Â¨Ã¦Å½Â§Ã¥Ë†Â¶Ã¥â„¢Â¨Ã¥â€™Å’Ã¦Å“ÂÃ¥Å Â¡Ã¤Â¸Â­Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¨Â®Â¤Ã¨Â¯Â

### Ã©ÂªÅ’Ã¨Â¯Â

* Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¥Ââ€¢Ã¨Â¯Â·Ã¦Â±â€šÃ¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯Â
* Ã¥Â°â€ Ã¨Â¾â€œÃ¥â€¦Â¥Ã¨Â½Â¬Ã¦ÂÂ¢Ã¤Â¸Âº DTO Ã¤Â»Â¥Ã¤Â¾â€ºÃ¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¤Â½Â¿Ã§â€Â¨
* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¤Â¿Â¡Ã¤Â»Â»Ã¨Â¯Â·Ã¦Â±â€šÃ¨Â´Å¸Ã¨Â½Â½Ã¤Â¸Â­Ã§Å¡â€žÃ¦Â´Â¾Ã§â€Å¸Ã¥Â­â€”Ã¦Â®Âµ

### Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

* Ã¥Å“Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¤Â¸Â­Ã¦Å â€ºÃ¥â€¡ÂºÃ©Â¢â€ Ã¥Å¸Å¸Ã¥Â¼â€šÃ¥Â¸Â¸
* Ã¥Å“Â¨ `bootstrap/app.php` Ã¤Â¸Â­Ã©â‚¬Å¡Ã¨Â¿â€¡ `withExceptions` Ã¥Â°â€ Ã¥Â¼â€šÃ¥Â¸Â¸Ã¦ËœÂ Ã¥Â°â€žÃ¥Ë†Â° HTTP Ã¥â€œÂÃ¥Âºâ€
* Ã§Â»ÂÃ¤Â¸ÂÃ¥Ââ€˜Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã¦Å¡Â´Ã©Å“Â²Ã¥â€ â€¦Ã©Æ’Â¨Ã©â€â„¢Ã¨Â¯Â¯

### Ã¤Â»Â£Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

* Ã¤Â»Â£Ã§Â ÂÃ¦Ë†â€“Ã¦Â³Â¨Ã©â€¡Å Ã¤Â¸Â­Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Æ’â€¦Ã§Â¬Â¦Ã¥ÂÂ·
* Ã¦Å“â‚¬Ã¥Â¤Â§Ã¨Â¡Å’Ã©â€¢Â¿Ã¥ÂºÂ¦Ã¯Â¼Å¡120 Ã¤Â¸ÂªÃ¥Â­â€”Ã§Â¬Â¦
* Ã¦Å½Â§Ã¥Ë†Â¶Ã¥â„¢Â¨Ã¤Â¿ÂÃ¦Å’ÂÃ§Â²Â¾Ã§Â®â‚¬Ã¯Â¼â€ºÃ¦Å“ÂÃ¥Å Â¡Ã¥â€™Å’Ã¦â€œÂÃ¤Â½Å“Ã¦â€°Â¿Ã¨Â½Â½Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜

## Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â»â€œÃ¦Å¾â€ž

```
app/
  Actions/
  Console/
  Events/
  Exceptions/
  Http/
    Controllers/
    Middleware/
    Requests/
    Resources/
  Jobs/
  Models/
  Policies/
  Providers/
  Services/
  Support/
config/
database/
  factories/
  migrations/
  seeders/
routes/
  api.php
  web.php
```

## Ã¥â€¦Â³Ã©â€Â®Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¦Å“ÂÃ¥Å Â¡Ã¥Â±â€š

```php
<?php

declare(strict_types=1);

final class CreateOrderAction
{
    public function __construct(private OrderRepository $orders) {}

    public function handle(CreateOrderData $data): Order
    {
        return $this->orders->create($data);
    }
}

final class OrderService
{
    public function __construct(private CreateOrderAction $createOrder) {}

    public function placeOrder(CreateOrderData $data): Order
    {
        return $this->createOrder->handle($data);
    }
}
```

### Ã¦Å½Â§Ã¥Ë†Â¶Ã¥â„¢Â¨Ã¦Â¨Â¡Ã¥Â¼Â

```php
<?php

declare(strict_types=1);

final class OrdersController extends Controller
{
    public function __construct(private OrderService $service) {}

    public function store(StoreOrderRequest $request): JsonResponse
    {
        $order = $this->service->placeOrder($request->toDto());

        return response()->json([
            'success' => true,
            'data' => OrderResource::make($order),
            'error' => null,
            'meta' => null,
        ], 201);
    }
}
```

### Ã§Â­â€“Ã§â€¢Â¥Ã¦Â¨Â¡Ã¥Â¼Â

```php
<?php

declare(strict_types=1);

use App\Models\Order;
use App\Models\User;

final class OrderPolicy
{
    public function view(User $user, Order $order): bool
    {
        return $order->user_id === $user->id;
    }
}
```

### Ã¨Â¡Â¨Ã¥Ââ€¢Ã¨Â¯Â·Ã¦Â±â€š + DTO

```php
<?php

declare(strict_types=1);

final class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user();
    }

    public function rules(): array
    {
        return [
            'items' => ['required', 'array', 'min:1'],
            'items.*.sku' => ['required', 'string'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ];
    }

    public function toDto(): CreateOrderData
    {
        return new CreateOrderData(
            userId: (int) $this->user()->id,
            items: $this->validated('items'),
        );
    }
}
```

### API Ã¨Âµâ€žÃ¦ÂºÂ

```php
<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'total' => $this->total,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
```

### Ã©ËœÅ¸Ã¥Ë†â€”Ã¤Â»Â»Ã¥Å Â¡

```php
<?php

declare(strict_types=1);

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Repositories\OrderRepository;
use App\Services\OrderMailer;

final class SendOrderConfirmation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private int $orderId) {}

    public function handle(OrderRepository $orders, OrderMailer $mailer): void
    {
        $order = $orders->findOrFail($this->orderId);
        $mailer->sendOrderConfirmation($order);
    }
}
```

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼Â (Pest)

```php
<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\postJson;

uses(RefreshDatabase::class);

test('user can place order', function () {
    $user = User::factory()->create();

    actingAs($user);

    $response = postJson('/api/orders', [
        'items' => [['sku' => 'sku-1', 'quantity' => 2]],
    ]);

    $response->assertCreated();
    assertDatabaseHas('orders', ['user_id' => $user->id]);
});
```

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼Â (PHPUnit)

```php
<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class OrdersControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_place_order(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/orders', [
            'items' => [['sku' => 'sku-1', 'quantity' => 2]],
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('orders', ['user_id' => $user->id]);
    }
}
```
