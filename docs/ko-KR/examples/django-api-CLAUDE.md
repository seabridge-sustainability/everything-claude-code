# Django REST API Ã¢â‚¬â€ Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ CLAUDE.md

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


> PostgreSQLÃªÂ³Â¼ CeleryÃ«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ«Å â€ Django REST Framework APIÃ¬ÂËœ Ã¬â€¹Â¤Ã¬Â â€ž Ã¬ËœË†Ã¬â€¹Å“Ã¬Å¾â€¦Ã«â€¹Ë†Ã«â€¹Â¤.
> Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã«Â£Â¨Ã­Å Â¸Ã¬â€”Â Ã«Â³ÂµÃ¬â€šÂ¬Ã­â€¢ËœÃ¬â€”Â¬ Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤Ã¬â€”Â Ã«Â§Å¾ÃªÂ²Å’ Ã¬Â»Â¤Ã¬Å Â¤Ã­â€žÂ°Ã«Â§Ë†Ã¬ÂÂ´Ã¬Â¦Ë†Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€.

## Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ ÃªÂ°Å“Ã¬Å¡â€

**ÃªÂ¸Â°Ã¬Ë†Â  Ã¬Å Â¤Ã­Æ’Â:** Python 3.12+, Django 5.x, Django REST Framework, PostgreSQL, Celery + Redis, pytest, Docker Compose

**Ã¬â€¢â€žÃ­â€šÂ¤Ã­â€¦ÂÃ¬Â²Ëœ:** Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Ââ€žÃ«Â©â€Ã¬ÂÂ¸Ã«Â³â€ž Ã¬â€¢Â±Ã¬Å“Â¼Ã«Â¡Å“ ÃªÂµÂ¬Ã¬â€žÂ±Ã«ÂÅ“ Ã«Ââ€žÃ«Â©â€Ã¬ÂÂ¸ Ã¬Â£Â¼Ã«Ââ€ž Ã¬â€žÂ¤ÃªÂ³â€ž. API Ã«Â Ë†Ã¬ÂÂ´Ã¬â€“Â´Ã¬â€”Â DRF, Ã«Â¹â€žÃ«Ââ„¢ÃªÂ¸Â° Ã¬Å¾â€˜Ã¬â€”â€¦Ã¬â€”Â Celery, Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã¬â€”Â pytest Ã¬â€šÂ¬Ã¬Å¡Â©. Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€”â€Ã«â€œÅ“Ã­ÂÂ¬Ã¬ÂÂ¸Ã­Å Â¸Ã«Å â€ JSONÃ¬Ââ€ž Ã«Â°ËœÃ­â„¢ËœÃ­â€¢ËœÃ«Â©Â° Ã­â€¦Å“Ã­â€Å’Ã«Â¦Â¿ Ã«Â Å’Ã«Ââ€Ã«Â§ÂÃ¬Ââ‚¬ Ã¬â€”â€ Ã¬ÂÅ’.

## Ã­â€¢â€žÃ¬Ë†Ëœ ÃªÂ·Å“Ã¬Â¹â„¢

### Python ÃªÂ·Å“Ã¬Â¹â„¢

- Ã«ÂªÂ¨Ã«â€œÂ  Ã­â€¢Â¨Ã¬Ë†Ëœ Ã¬â€¹Å“ÃªÂ·Â¸Ã«â€¹Ë†Ã¬Â²ËœÃ¬â€”Â type hints Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ `from __future__ import annotations` Ã¬â€šÂ¬Ã¬Å¡Â©
- `print()` Ã«Â¬Â¸ Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬ Ã¢â‚¬â€ `logging.getLogger(__name__)` Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã«Â¬Â¸Ã¬Å¾ÂÃ¬â€”Â´ Ã­ÂÂ¬Ã«Â§Â¤Ã­Å’â€¦Ã¬Ââ‚¬ f-strings Ã¬â€šÂ¬Ã¬Å¡Â©, `%`Ã«â€šËœ `.format()`Ã¬Ââ‚¬ Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬
- Ã­Å’Å’Ã¬ÂÂ¼ Ã¬Å¾â€˜Ã¬â€”â€¦Ã¬â€”Â `os.path` Ã«Å’â‚¬Ã¬â€¹Â  `pathlib.Path` Ã¬â€šÂ¬Ã¬Å¡Â©
- isortÃ«Â¡Å“ import Ã¬Â â€¢Ã«Â Â¬: stdlib, third-party, local Ã¬Ë†Å“Ã¬â€žÅ“ (ruffÃ¬â€”Â Ã¬ÂËœÃ­â€¢Â´ ÃªÂ°â€¢Ã¬Â Å“)

### Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤

- Ã«ÂªÂ¨Ã«â€œÂ  Ã¬Â¿Â¼Ã«Â¦Â¬Ã«Å â€ Django ORM Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ raw SQLÃ¬Ââ‚¬ `.raw()`Ã¬â„¢â‚¬ parameterized Ã¬Â¿Â¼Ã«Â¦Â¬Ã«Â¡Å“Ã«Â§Å’ Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã«Â§Ë†Ã¬ÂÂ´ÃªÂ·Â¸Ã«Â Ë†Ã¬ÂÂ´Ã¬â€¦ËœÃ¬Ââ‚¬ gitÃ¬â€”Â Ã¬Â»Â¤Ã«Â°â€¹ Ã¢â‚¬â€ Ã­â€â€žÃ«Â¡Å“Ã«Ââ€¢Ã¬â€¦ËœÃ¬â€”ÂÃ¬â€žÅ“ `--fake` Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬
- N+1 Ã¬Â¿Â¼Ã«Â¦Â¬ Ã«Â°Â©Ã¬Â§â‚¬Ã«Â¥Â¼ Ã¬Å“â€žÃ­â€¢Â´ `select_related()`Ã¬â„¢â‚¬ `prefetch_related()` Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã«ÂªÂ¨Ã«â€œÂ  Ã«ÂªÂ¨Ã«ÂÂ¸Ã¬â€”Â `created_at`ÃªÂ³Â¼ `updated_at` Ã¬Å¾ÂÃ«Ââ„¢ Ã­â€¢â€žÃ«â€œÅ“ Ã­â€¢â€žÃ¬Ë†Ëœ
- `filter()`, `order_by()`, Ã«ËœÂÃ«Å â€ `WHERE` Ã¬Â Ë†Ã¬â€”Â Ã¬â€šÂ¬Ã¬Å¡Â©Ã«ÂËœÃ«Å â€ Ã«ÂªÂ¨Ã«â€œÂ  Ã­â€¢â€žÃ«â€œÅ“Ã¬â€”Â Ã¬ÂÂ¸Ã«ÂÂ±Ã¬Å Â¤ Ã¬Â¶â€ÃªÂ°â‚¬

```python
# Ã«â€šËœÃ¬ÂÅ“ Ã¬ËœË†: N+1 Ã¬Â¿Â¼Ã«Â¦Â¬
orders = Order.objects.all()
for order in orders:
    print(order.customer.name)  # ÃªÂ°Â Ã¬Â£Â¼Ã«Â¬Â¸Ã«Â§Ë†Ã«â€¹Â¤ DBÃ«Â¥Â¼ Ã¬Â¡Â°Ã­Å¡Å’Ã­â€¢Â¨

# Ã¬Â¢â€¹Ã¬Ââ‚¬ Ã¬ËœË†: joinÃ¬Ââ€ž Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢Å“ Ã«â€¹Â¨Ã¬ÂÂ¼ Ã¬Â¿Â¼Ã«Â¦Â¬
orders = Order.objects.select_related("customer").all()
```

### Ã¬ÂÂ¸Ã¬Â¦Â

- `djangorestframework-simplejwt`Ã«Â¥Â¼ Ã­â€ ÂµÃ­â€¢Å“ JWT Ã¢â‚¬â€ access token (15Ã«Â¶â€ž) + refresh token (7Ã¬ÂÂ¼)
- Ã«ÂªÂ¨Ã«â€œÂ  Ã«Â·Â°Ã¬â€”Â permission Ã­ÂÂ´Ã«Å¾ËœÃ¬Å Â¤ Ã¬Â§â‚¬Ã¬Â â€¢ Ã¢â‚¬â€ ÃªÂ¸Â°Ã«Â³Â¸ÃªÂ°â€™Ã¬â€”Â Ã¬ÂËœÃ¬Â¡Â´Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â°
- `IsAuthenticated`Ã«Â¥Â¼ ÃªÂ¸Â°Ã«Â³Â¸Ã¬Å“Â¼Ã«Â¡Å“, ÃªÂ°ÂÃ¬Â²Â´ Ã¬Ë†ËœÃ¬Â¤â‚¬ Ã¬Â â€˜ÃªÂ·Â¼Ã¬â€”ÂÃ«Å â€ Ã¬Â»Â¤Ã¬Å Â¤Ã­â€¦â‚¬ permission Ã¬Â¶â€ÃªÂ°â‚¬
- Ã«Â¡Å“ÃªÂ·Â¸Ã¬â€¢â€žÃ¬â€ºÆ’Ã¬Ââ€ž Ã¬Å“â€žÃ­â€¢Å“ token blacklisting Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€

### Serializers

- ÃªÂ°â€žÃ«â€¹Â¨Ã­â€¢Å“ CRUDÃ¬â€”ÂÃ«Å â€ `ModelSerializer`, Ã«Â³ÂµÃ¬Å¾Â¡Ã­â€¢Å“ Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬Â¦ÂÃ¬â€”ÂÃ«Å â€ `Serializer` Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã¬Å¾â€¦Ã«Â Â¥/Ã¬Â¶Å“Ã«Â Â¥ Ã­Ëœâ€¢Ã­Æ’Å“ÃªÂ°â‚¬ Ã«â€¹Â¤Ã«Â¥Â¼ Ã«â€¢Å’Ã«Å â€ Ã¬ÂÂ½ÃªÂ¸Â°Ã¬â„¢â‚¬ Ã¬â€œÂ°ÃªÂ¸Â° serializerÃ«Â¥Â¼ Ã«Â¶â€žÃ«Â¦Â¬
- Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬Â¦ÂÃ¬Ââ‚¬ serializer Ã«Â Ë†Ã«Â²Â¨Ã¬â€”ÂÃ¬â€žÅ“ Ã¢â‚¬â€ Ã«Â·Â°Ã«Å â€ Ã¬â€“â€¡ÃªÂ²Å’ Ã¬Å“Â Ã¬Â§â‚¬

```python
class CreateOrderSerializer(serializers.Serializer):
    product_id = serializers.UUIDField()
    quantity = serializers.IntegerField(min_value=1, max_value=100)

    def validate_product_id(self, value):
        if not Product.objects.filter(id=value, active=True).exists():
            raise serializers.ValidationError("Product not found or inactive")
        return value

class OrderDetailSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ["id", "customer", "product", "quantity", "total", "status", "created_at"]
```

### Ã¬ËœÂ¤Ã«Â¥Ëœ Ã¬Â²ËœÃ«Â¦Â¬

- Ã¬ÂÂ¼ÃªÂ´â‚¬Ã«ÂÅ“ Ã¬ËœÂ¤Ã«Â¥Ëœ Ã¬Ââ€˜Ã«â€¹ÂµÃ¬Ââ€ž Ã¬Å“â€žÃ­â€¢Â´ DRF exception handler Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§ÂÃ¬Å¡Â© Ã¬Â»Â¤Ã¬Å Â¤Ã­â€¦â‚¬ Ã¬ËœË†Ã¬â„¢Â¸Ã«Å â€ `core/exceptions.py`Ã¬â€”Â Ã¬Â â€¢Ã¬ÂËœ
- Ã­ÂÂ´Ã«ÂÂ¼Ã¬ÂÂ´Ã¬â€“Â¸Ã­Å Â¸Ã¬â€”Â Ã«â€šÂ´Ã«Â¶â‚¬ Ã¬ËœÂ¤Ã«Â¥Ëœ Ã¬â€žÂ¸Ã«Â¶â‚¬ Ã¬Â â€¢Ã«Â³Â´Ã«Â¥Â¼ Ã«â€¦Â¸Ã¬Â¶Å“Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â°

```python
# core/exceptions.py
from rest_framework.exceptions import APIException

class InsufficientStockError(APIException):
    status_code = 409
    default_detail = "Insufficient stock for this order"
    default_code = "insufficient_stock"
```

### Ã¬Â½â€Ã«â€œÅ“ Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼

- Ã¬Â½â€Ã«â€œÅ“Ã«â€šËœ Ã¬Â£Â¼Ã¬â€žÂÃ¬â€”Â Ã¬ÂÂ´Ã«ÂªÂ¨Ã¬Â§â‚¬ Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬
- Ã¬ÂµÅ“Ã«Å’â‚¬ Ã¬Â¤â€ž ÃªÂ¸Â¸Ã¬ÂÂ´: 120Ã¬Å¾Â (ruffÃ¬â€”Â Ã¬ÂËœÃ­â€¢Â´ ÃªÂ°â€¢Ã¬Â Å“)
- Ã­ÂÂ´Ã«Å¾ËœÃ¬Å Â¤: PascalCase, Ã­â€¢Â¨Ã¬Ë†Ëœ/Ã«Â³â‚¬Ã¬Ë†Ëœ: snake_case, Ã¬Æ’ÂÃ¬Ë†Ëœ: UPPER_SNAKE_CASE
- Ã«Â·Â°Ã«Å â€ Ã¬â€“â€¡ÃªÂ²Å’ Ã¬Å“Â Ã¬Â§â‚¬ Ã¢â‚¬â€ Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§ÂÃ¬Ââ‚¬ Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤ Ã­â€¢Â¨Ã¬Ë†ËœÃ«â€šËœ Ã«ÂªÂ¨Ã«ÂÂ¸ Ã«Â©â€Ã¬â€žÅ“Ã«â€œÅ“Ã¬â€”Â Ã«Â°Â°Ã¬Â¹Ëœ

## Ã­Å’Å’Ã¬ÂÂ¼ ÃªÂµÂ¬Ã¬Â¡Â°

```
config/
  settings/
    base.py              # ÃªÂ³ÂµÃ¬Å“Â  Ã¬â€žÂ¤Ã¬Â â€¢
    local.py             # ÃªÂ°Å“Ã«Â°Å“ Ã­â„¢ËœÃªÂ²Â½ Ã¬ËœÂ¤Ã«Â²â€žÃ«ÂÂ¼Ã¬ÂÂ´Ã«â€œÅ“ (DEBUG=True)
    production.py        # Ã­â€â€žÃ«Â¡Å“Ã«Ââ€¢Ã¬â€¦Ëœ Ã¬â€žÂ¤Ã¬Â â€¢
  urls.py                # Ã«Â£Â¨Ã­Å Â¸ URL Ã¬â€žÂ¤Ã¬Â â€¢
  celery.py              # Celery Ã¬â€¢Â± Ã¬â€žÂ¤Ã¬Â â€¢
apps/
  accounts/              # Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã¬ÂÂ¸Ã¬Â¦Â, Ã­Å¡Å’Ã¬â€ºÂÃªÂ°â‚¬Ã¬Å¾â€¦, Ã­â€â€žÃ«Â¡Å“Ã­â€¢â€ž
    models.py
    serializers.py
    views.py
    services.py          # Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§Â
    tests/
      test_views.py
      test_services.py
      factories.py       # Factory Boy Ã­Å’Â©Ã­â€ Â Ã«Â¦Â¬
  orders/                # Ã¬Â£Â¼Ã«Â¬Â¸ ÃªÂ´â‚¬Ã«Â¦Â¬
    models.py
    serializers.py
    views.py
    services.py
    tasks.py             # Celery Ã¬Å¾â€˜Ã¬â€”â€¦
    tests/
  products/              # Ã¬Æ’ÂÃ­â€™Ë† Ã¬Â¹Â´Ã­Æ’Ë†Ã«Â¡Å“ÃªÂ·Â¸
    models.py
    serializers.py
    views.py
    tests/
core/
  exceptions.py          # Ã¬Â»Â¤Ã¬Å Â¤Ã­â€¦â‚¬ API Ã¬ËœË†Ã¬â„¢Â¸
  permissions.py         # ÃªÂ³ÂµÃ¬Å“Â  permission Ã­ÂÂ´Ã«Å¾ËœÃ¬Å Â¤
  pagination.py          # Ã¬Â»Â¤Ã¬Å Â¤Ã­â€¦â‚¬ Ã­Å½ËœÃ¬ÂÂ´Ã¬Â§â‚¬Ã«â€žÂ¤Ã¬ÂÂ´Ã¬â€¦Ëœ
  middleware.py          # Ã¬Å¡â€Ã¬Â²Â­ Ã«Â¡Å“ÃªÂ¹â€¦, Ã­Æ’â‚¬Ã¬ÂÂ´Ã«Â°Â
  tests/
```

## Ã¬Â£Â¼Ã¬Å¡â€ Ã­Å’Â¨Ã­â€žÂ´

### Service Ã«Â Ë†Ã¬ÂÂ´Ã¬â€“Â´

```python
# apps/orders/services.py
from django.db import transaction

def create_order(*, customer, product_id: uuid.UUID, quantity: int) -> Order:
    """Ã¬Å¾Â¬ÃªÂ³Â  ÃªÂ²â‚¬Ã¬Â¦ÂÃªÂ³Â¼ ÃªÂ²Â°Ã¬Â Å“ Ã«Â³Â´Ã«Â¥ËœÃ«Â¥Â¼ Ã­ÂÂ¬Ã­â€¢Â¨Ã­â€¢Å“ Ã¬Â£Â¼Ã«Â¬Â¸ Ã¬Æ’ÂÃ¬â€žÂ±."""
    with transaction.atomic():
        product = Product.objects.select_for_update().get(id=product_id)

        if product.stock < quantity:
            raise InsufficientStockError()

        order = Order.objects.create(
            customer=customer,
            product=product,
            quantity=quantity,
            total=product.price * quantity,
        )
        product.stock -= quantity
        product.save(update_fields=["stock", "updated_at"])

    # Ã«Â¹â€žÃ«Ââ„¢ÃªÂ¸Â°: Ã¬Â£Â¼Ã«Â¬Â¸ Ã­â„¢â€¢Ã¬ÂÂ¸ Ã¬ÂÂ´Ã«Â©â€Ã¬ÂÂ¼ Ã«Â°Å“Ã¬â€ Â¡
    send_order_confirmation.delay(order.id)
    return order
```

### View Ã­Å’Â¨Ã­â€žÂ´

```python
# apps/orders/views.py
class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagination

    def get_serializer_class(self):
        if self.action == "create":
            return CreateOrderSerializer
        return OrderDetailSerializer

    def get_queryset(self):
        return (
            Order.objects
            .filter(customer=self.request.user)
            .select_related("product", "customer")
            .order_by("-created_at")
        )

    def perform_create(self, serializer):
        order = create_order(
            customer=self.request.user,
            product_id=serializer.validated_data["product_id"],
            quantity=serializer.validated_data["quantity"],
        )
        serializer.instance = order
```

### Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã­Å’Â¨Ã­â€žÂ´ (pytest + Factory Boy)

```python
# apps/orders/tests/factories.py
import factory
from apps.accounts.tests.factories import UserFactory
from apps.products.tests.factories import ProductFactory

class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = "orders.Order"

    customer = factory.SubFactory(UserFactory)
    product = factory.SubFactory(ProductFactory, stock=100)
    quantity = 1
    total = factory.LazyAttribute(lambda o: o.product.price * o.quantity)

# apps/orders/tests/test_views.py
import pytest
from rest_framework.test import APIClient

@pytest.mark.django_db
class TestCreateOrder:
    def setup_method(self):
        self.client = APIClient()
        self.user = UserFactory()
        self.client.force_authenticate(self.user)

    def test_create_order_success(self):
        product = ProductFactory(price=29_99, stock=10)
        response = self.client.post("/api/orders/", {
            "product_id": str(product.id),
            "quantity": 2,
        })
        assert response.status_code == 201
        assert response.data["total"] == 59_98

    def test_create_order_insufficient_stock(self):
        product = ProductFactory(stock=0)
        response = self.client.post("/api/orders/", {
            "product_id": str(product.id),
            "quantity": 1,
        })
        assert response.status_code == 409

    def test_create_order_unauthenticated(self):
        self.client.force_authenticate(None)
        response = self.client.post("/api/orders/", {})
        assert response.status_code == 401
```

## Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†Ëœ

```bash
# Django
SECRET_KEY=
DEBUG=False
ALLOWED_HOSTS=api.example.com

# Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤
DATABASE_URL=postgres://user:pass@localhost:5432/myapp

# Redis (Celery broker + Ã¬ÂºÂÃ¬â€¹Å“)
REDIS_URL=redis://localhost:6379/0

# JWT
JWT_ACCESS_TOKEN_LIFETIME=15       # Ã«Â¶â€ž
JWT_REFRESH_TOKEN_LIFETIME=10080   # Ã«Â¶â€ž (7Ã¬ÂÂ¼)

# Ã¬ÂÂ´Ã«Â©â€Ã¬ÂÂ¼
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.example.com
```

## Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â â€žÃ«Å¾Âµ

```bash
# Ã¬Â â€žÃ¬Â²Â´ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€°
pytest --cov=apps --cov-report=term-missing

# Ã­Å Â¹Ã¬Â â€¢ Ã¬â€¢Â± Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€¹Â¤Ã­â€“â€°
pytest apps/orders/tests/ -v

# Ã«Â³â€˜Ã«Â Â¬ Ã¬â€¹Â¤Ã­â€“â€°
pytest -n auto

# Ã«Â§Ë†Ã¬Â§â‚¬Ã«Â§â€° Ã¬â€¹Â¤Ã­â€“â€°Ã¬â€”ÂÃ¬â€žÅ“ Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢Å“ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â§Å’ Ã¬â€¹Â¤Ã­â€“â€°
pytest --lf
```

## ECC Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

```bash
# ÃªÂ³â€žÃ­Å¡Â Ã¬Ë†ËœÃ«Â¦Â½
/plan "Add order refund system with Stripe integration"

# TDDÃ«Â¡Å“ ÃªÂ°Å“Ã«Â°Å“
/tdd                    # pytest ÃªÂ¸Â°Ã«Â°Ëœ TDD Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

# Ã«Â¦Â¬Ã«Â·Â°
/python-review          # Python Ã¬Â â€žÃ¬Å¡Â© Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â°
/security-scan          # Django Ã«Â³Â´Ã¬â€¢Ë† ÃªÂ°ÂÃ¬â€šÂ¬
/code-review            # Ã¬ÂÂ¼Ã«Â°Ëœ Ã­â€™Ë†Ã¬Â§Ë† ÃªÂ²â‚¬Ã¬â€šÂ¬

# ÃªÂ²â‚¬Ã¬Â¦Â
/verify                 # Ã«Â¹Å’Ã«â€œÅ“, Ã«Â¦Â°Ã­Å Â¸, Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸, Ã«Â³Â´Ã¬â€¢Ë† Ã¬Å Â¤Ã¬Âºâ€
```

## Git Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

- `feat:` Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥, `fix:` Ã«Â²â€žÃªÂ·Â¸ Ã¬Ë†ËœÃ¬Â â€¢, `refactor:` Ã¬Â½â€Ã«â€œÅ“ Ã«Â³â‚¬ÃªÂ²Â½
- `main`Ã¬â€”ÂÃ¬â€žÅ“ feature Ã«Â¸Å’Ã«Å¾Å“Ã¬Â¹Ëœ Ã¬Æ’ÂÃ¬â€žÂ±, PR Ã­â€¢â€žÃ¬Ë†Ëœ
- CI: ruff (Ã«Â¦Â°Ã­Å Â¸ + Ã­ÂÂ¬Ã«Â§Â·), mypy (Ã­Æ’â‚¬Ã¬Å¾â€¦), pytest (Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸), safety (Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬â€šÂ¬)
- Ã«Â°Â°Ã­ÂÂ¬: Docker Ã¬ÂÂ´Ã«Â¯Â¸Ã¬Â§â‚¬, Kubernetes Ã«ËœÂÃ«Å â€ RailwayÃ«Â¡Å“ ÃªÂ´â‚¬Ã«Â¦Â¬
