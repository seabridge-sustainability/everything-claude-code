# Django REST API Ã¢â‚¬â€ Ã©Â¡Â¹Ã§â€ºÂ® CLAUDE.md

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


> Ã¤Â½Â¿Ã§â€Â¨ PostgreSQL Ã¥â€™Å’ Celery Ã§Å¡â€ž Django REST Framework API Ã§Å“Å¸Ã¥Â®Å¾Ã§Â¤ÂºÃ¤Â¾â€¹Ã£â‚¬â€š
> Ã¥Â°â€ Ã¦Â­Â¤Ã¥Â¤ÂÃ¥Ë†Â¶Ã¥Ë†Â°Ã¤Â½Â Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã¥Â¹Â¶Ã©â€™Ë†Ã¥Â¯Â¹Ã¤Â½Â Ã§Å¡â€žÃ¦Å“ÂÃ¥Å Â¡Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã£â‚¬â€š

## Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Â¦â€šÃ¨Â¿Â°

**Ã¦Å â‚¬Ã¦Å“Â¯Ã¦Â Ë†:** Python 3.12+, Django 5.x, Django REST Framework, PostgreSQL, Celery + Redis, pytest, Docker Compose

**Ã¦Å¾Â¶Ã¦Å¾â€ž:** Ã©â€¡â€¡Ã§â€Â¨Ã©Â¢â€ Ã¥Å¸Å¸Ã©Â©Â±Ã¥Å Â¨Ã¨Â®Â¾Ã¨Â®Â¡Ã¯Â¼Å’Ã¦Â¯ÂÃ¤Â¸ÂªÃ¤Â¸Å¡Ã¥Å Â¡Ã©Â¢â€ Ã¥Å¸Å¸Ã¥Â¯Â¹Ã¥Âºâ€Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Âºâ€Ã§â€Â¨Ã£â‚¬â€šDRF Ã§â€Â¨Ã¤ÂºÅ½ API Ã¥Â±â€šÃ¯Â¼Å’Celery Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¼â€šÃ¦Â­Â¥Ã¤Â»Â»Ã¥Å Â¡Ã¯Â¼Å’pytest Ã§â€Â¨Ã¤ÂºÅ½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬â€šÃ¦â€°â‚¬Ã¦Å“â€°Ã§Â«Â¯Ã§â€šÂ¹Ã¨Â¿â€Ã¥â€ºÅ¾ JSON Ã¢â‚¬â€ Ã¦â€”Â Ã¦Â¨Â¡Ã¦ÂÂ¿Ã¦Â¸Â²Ã¦Å¸â€œÃ£â‚¬â€š

## Ã¥â€¦Â³Ã©â€Â®Ã¨Â§â€žÃ¥Ë†â„¢

### Python Ã§ÂºÂ¦Ã¥Â®Å¡

* Ã¦â€°â‚¬Ã¦Å“â€°Ã¥â€¡Â½Ã¦â€¢Â°Ã§Â­Â¾Ã¥ÂÂÃ¤Â½Â¿Ã§â€Â¨Ã§Â±Â»Ã¥Å¾â€¹Ã¦ÂÂÃ§Â¤Âº Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ `from __future__ import annotations`
* Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ `print()` Ã¨Â¯Â­Ã¥ÂÂ¥ Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ `logging.getLogger(__name__)`
* Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã¤Â½Â¿Ã§â€Â¨ f-stringsÃ¯Â¼Å’Ã§Â»ÂÃ¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ `%` Ã¦Ë†â€“ `.format()`
* Ã¦â€“â€¡Ã¤Â»Â¶Ã¦â€œÂÃ¤Â½Å“Ã¤Â½Â¿Ã§â€Â¨ `pathlib.Path` Ã¨â‚¬Å’Ã©ÂÅ¾ `os.path`
* Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¦Å½â€™Ã¥ÂºÂÃ¤Â½Â¿Ã§â€Â¨ isortÃ¯Â¼Å¡Ã¦Â â€¡Ã¥â€¡â€ Ã¥Âºâ€œÃ£â‚¬ÂÃ§Â¬Â¬Ã¤Â¸â€°Ã¦â€“Â¹Ã¥Âºâ€œÃ£â‚¬ÂÃ¦Å“Â¬Ã¥Å“Â°Ã¥Âºâ€œÃ¯Â¼Ë†Ã§â€Â± ruff Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¯Â¼â€°

### Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ

* Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¤Â½Â¿Ã§â€Â¨ Django ORM Ã¢â‚¬â€ Ã¥Å½Å¸Ã¥Â§â€¹ SQL Ã¤Â»â€¦Ã¤Â¸Å½ `.raw()` Ã¥â€™Å’Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¤Â¸â‚¬Ã¨ÂµÂ·Ã¤Â½Â¿Ã§â€Â¨
* Ã¨Â¿ÂÃ§Â§Â»Ã¦â€“â€¡Ã¤Â»Â¶Ã¦ÂÂÃ¤ÂºÂ¤Ã¥Ë†Â° git Ã¢â‚¬â€ Ã§â€Å¸Ã¤ÂºÂ§Ã¤Â¸Â­Ã§Â»ÂÃ¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ `--fake`
* Ã¤Â½Â¿Ã§â€Â¨ `select_related()` Ã¥â€™Å’ `prefetch_related()` Ã©ËœÂ²Ã¦Â­Â¢ N+1 Ã¦Å¸Â¥Ã¨Â¯Â¢
* Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥Â¿â€¦Ã©Â¡Â»Ã¥â€¦Â·Ã¦Å“â€° `created_at` Ã¥â€™Å’ `updated_at` Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Â­â€”Ã¦Â®Âµ
* Ã¥Å“Â¨ `filter()`Ã£â‚¬Â`order_by()` Ã¦Ë†â€“ `WHERE` Ã¥Â­ÂÃ¥ÂÂ¥Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã§Å¡â€žÃ¤Â»Â»Ã¤Â½â€¢Ã¥Â­â€”Ã¦Â®ÂµÃ¤Â¸Å Ã¥Â»ÂºÃ§Â«â€¹Ã§Â´Â¢Ã¥Â¼â€¢

```python
# BAD: N+1 query
orders = Order.objects.all()
for order in orders:
    print(order.customer.name)  # hits DB for each order

# GOOD: Single query with join
orders = Order.objects.select_related("customer").all()
```

### Ã¨Â®Â¤Ã¨Â¯Â

* Ã©â‚¬Å¡Ã¨Â¿â€¡ `djangorestframework-simplejwt` Ã¤Â½Â¿Ã§â€Â¨ JWT Ã¢â‚¬â€ Ã¨Â®Â¿Ã©â€”Â®Ã¤Â»Â¤Ã§â€°Å’Ã¯Â¼Ë†15 Ã¥Ë†â€ Ã©â€™Å¸Ã¯Â¼â€°+ Ã¥Ë†Â·Ã¦â€“Â°Ã¤Â»Â¤Ã§â€°Å’Ã¯Â¼Ë†7 Ã¥Â¤Â©Ã¯Â¼â€°
* Ã¦Â¯ÂÃ¤Â¸ÂªÃ¨Â§â€ Ã¥â€ºÂ¾Ã©Æ’Â½Ã¨Â®Â¾Ã§Â½Â®Ã¦ÂÆ’Ã©â„¢ÂÃ§Â±Â» Ã¢â‚¬â€ Ã§Â»ÂÃ¤Â¸ÂÃ¤Â¾ÂÃ¨Âµâ€“Ã©Â»ËœÃ¨Â®Â¤Ã¨Â®Â¾Ã§Â½Â®
* Ã¤Â½Â¿Ã§â€Â¨ `IsAuthenticated` Ã¤Â½Å“Ã¤Â¸ÂºÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¯Â¼Å’Ã¤Â¸ÂºÃ¥Â¯Â¹Ã¨Â±Â¡Ã§ÂºÂ§Ã¨Â®Â¿Ã©â€”Â®Ã¦Â·Â»Ã¥Å Â Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¦ÂÆ’Ã©â„¢Â
* Ã¤Â¸ÂºÃ§â„¢Â»Ã¥â€¡ÂºÃ¥ÂÂ¯Ã§â€Â¨Ã¤Â»Â¤Ã§â€°Å’Ã©Â»â€˜Ã¥ÂÂÃ¥Ââ€¢

### Ã¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“Ã¥â„¢Â¨

* Ã§Â®â‚¬Ã¥Ââ€¢ CRUD Ã¤Â½Â¿Ã§â€Â¨ `ModelSerializer`Ã¯Â¼Å’Ã¥Â¤ÂÃ¦Ââ€šÃ©ÂªÅ’Ã¨Â¯ÂÃ¤Â½Â¿Ã§â€Â¨ `Serializer`
* Ã¥Â½â€œÃ¨Â¾â€œÃ¥â€¦Â¥/Ã¨Â¾â€œÃ¥â€¡ÂºÃ§Â»â€œÃ¦Å¾â€žÃ¤Â¸ÂÃ¥ÂÅ’Ã¦â€”Â¶Ã¯Â¼Å’Ã¥Ë†â€ Ã§Â¦Â»Ã¨Â¯Â»Ã¥â€ â„¢Ã¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“Ã¥â„¢Â¨
* Ã¥Å“Â¨Ã¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“Ã¥â„¢Â¨Ã¥Â±â€šÃ©ÂÂ¢Ã¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Å“Â¨Ã¨Â§â€ Ã¥â€ºÂ¾Ã¤Â¸Â­ Ã¢â‚¬â€ Ã¨Â§â€ Ã¥â€ºÂ¾Ã¥Âºâ€Ã¤Â¿ÂÃ¦Å’ÂÃ§Â²Â¾Ã§Â®â‚¬

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

### Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

* Ã¤Â½Â¿Ã§â€Â¨ DRF Ã¥Â¼â€šÃ¥Â¸Â¸Ã¥Â¤â€žÃ§Ââ€ Ã¥â„¢Â¨Ã§Â¡Â®Ã¤Â¿ÂÃ¤Â¸â‚¬Ã¨â€¡Â´Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¥â€œÂÃ¥Âºâ€
* Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¤Â¸Â­Ã§Å¡â€žÃ¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥Â¼â€šÃ¥Â¸Â¸Ã¦â€Â¾Ã¥Å“Â¨ `core/exceptions.py`
* Ã§Â»ÂÃ¤Â¸ÂÃ¥Ââ€˜Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã¦Å¡Â´Ã©Å“Â²Ã¥â€ â€¦Ã©Æ’Â¨Ã©â€â„¢Ã¨Â¯Â¯Ã§Â»â€ Ã¨Å â€š

```python
# core/exceptions.py
from rest_framework.exceptions import APIException

class InsufficientStockError(APIException):
    status_code = 409
    default_detail = "Insufficient stock for this order"
    default_code = "insufficient_stock"
```

### Ã¤Â»Â£Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

* Ã¤Â»Â£Ã§Â ÂÃ¦Ë†â€“Ã¦Â³Â¨Ã©â€¡Å Ã¤Â¸Â­Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Æ’â€¦Ã§Â¬Â¦Ã¥ÂÂ·
* Ã¦Å“â‚¬Ã¥Â¤Â§Ã¨Â¡Å’Ã©â€¢Â¿Ã¥ÂºÂ¦Ã¯Â¼Å¡120 Ã¤Â¸ÂªÃ¥Â­â€”Ã§Â¬Â¦Ã¯Â¼Ë†Ã§â€Â± ruff Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¯Â¼â€°
* Ã§Â±Â»Ã¥ÂÂÃ¯Â¼Å¡PascalCaseÃ¯Â¼Å’Ã¥â€¡Â½Ã¦â€¢Â°/Ã¥ÂËœÃ©â€¡ÂÃ¥ÂÂÃ¯Â¼Å¡snake\_caseÃ¯Â¼Å’Ã¥Â¸Â¸Ã©â€¡ÂÃ¯Â¼Å¡UPPER\_SNAKE\_CASE
* Ã¨Â§â€ Ã¥â€ºÂ¾Ã¤Â¿ÂÃ¦Å’ÂÃ§Â²Â¾Ã§Â®â‚¬ Ã¢â‚¬â€ Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¦â€Â¾Ã¥Å“Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¥â€¡Â½Ã¦â€¢Â°Ã¦Ë†â€“Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¦â€“Â¹Ã¦Â³â€¢Ã¤Â¸Â­

## Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â»â€œÃ¦Å¾â€ž

```
config/
  settings/
    base.py              # Ã¥â€¦Â±Ã¤ÂºÂ«Ã¨Â®Â¾Ã§Â½Â®
    local.py             # Ã¥Â¼â‚¬Ã¥Ââ€˜Ã§Å½Â¯Ã¥Â¢Æ’Ã¨Â¦â€ Ã§â€ºâ€“Ã¨Â®Â¾Ã§Â½Â® (DEBUG=True)
    production.py        # Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¨Â®Â¾Ã§Â½Â®
  urls.py                # Ã¦Â Â¹ URL Ã©â€¦ÂÃ§Â½Â®
  celery.py              # Celery Ã¥Âºâ€Ã§â€Â¨Ã©â€¦ÂÃ§Â½Â®
apps/
  accounts/              # Ã§â€Â¨Ã¦Ë†Â·Ã¨Â®Â¤Ã¨Â¯ÂÃ£â‚¬ÂÃ¦Â³Â¨Ã¥â€ Å’Ã£â‚¬ÂÃ¤Â¸ÂªÃ¤ÂºÂºÃ¨Âµâ€žÃ¦â€“â„¢
    models.py
    serializers.py
    views.py
    services.py          # Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜
    tests/
      test_views.py
      test_services.py
      factories.py       # Factory Boy Ã¥Â·Â¥Ã¥Å½â€š
  orders/                # Ã¨Â®Â¢Ã¥Ââ€¢Ã§Â®Â¡Ã§Ââ€ 
    models.py
    serializers.py
    views.py
    services.py
    tasks.py             # Celery Ã¤Â»Â»Ã¥Å Â¡
    tests/
  products/              # Ã¤ÂºÂ§Ã¥â€œÂÃ§â€ºÂ®Ã¥Â½â€¢
    models.py
    serializers.py
    views.py
    tests/
core/
  exceptions.py          # Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€° API Ã¥Â¼â€šÃ¥Â¸Â¸
  permissions.py         # Ã¥â€¦Â±Ã¤ÂºÂ«Ã¦ÂÆ’Ã©â„¢ÂÃ§Â±Â»
  pagination.py          # Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥Ë†â€ Ã©Â¡Âµ
  middleware.py          # Ã¨Â¯Â·Ã¦Â±â€šÃ¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢Ã£â‚¬ÂÃ¨Â®Â¡Ã¦â€”Â¶
  tests/
```

## Ã¥â€¦Â³Ã©â€Â®Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¦Å“ÂÃ¥Å Â¡Ã¥Â±â€š

```python
# apps/orders/services.py
from django.db import transaction

def create_order(*, customer, product_id: uuid.UUID, quantity: int) -> Order:
    """Create an order with stock validation and payment hold."""
    product = Product.objects.select_for_update().get(id=product_id)

    if product.stock < quantity:
        raise InsufficientStockError()

    with transaction.atomic():
        order = Order.objects.create(
            customer=customer,
            product=product,
            quantity=quantity,
            total=product.price * quantity,
        )
        product.stock -= quantity
        product.save(update_fields=["stock", "updated_at"])

    # Async: send confirmation email
    send_order_confirmation.delay(order.id)
    return order
```

### Ã¨Â§â€ Ã¥â€ºÂ¾Ã¦Â¨Â¡Ã¥Â¼Â

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

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼Â (pytest + Factory Boy)

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

## Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡Â

```bash
# Django
SECRET_KEY=
DEBUG=False
ALLOWED_HOSTS=api.example.com

# Database
DATABASE_URL=postgres://user:pass@localhost:5432/myapp

# Redis (Celery broker + cache)
REDIS_URL=redis://localhost:6379/0

# JWT
JWT_ACCESS_TOKEN_LIFETIME=15       # minutes
JWT_REFRESH_TOKEN_LIFETIME=10080   # minutes (7 days)

# Email
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.example.com
```

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â­â€“Ã§â€¢Â¥

```bash
# Run all tests
pytest --cov=apps --cov-report=term-missing

# Run specific app tests
pytest apps/orders/tests/ -v

# Run with parallel execution
pytest -n auto

# Only failing tests from last run
pytest --lf
```

## ECC Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

```bash
# Planning
/plan "Add order refund system with Stripe integration"

# Development with TDD
/tdd                    # pytest-based TDD workflow

# Review
/python-review          # Python-specific code review
/security-scan          # Django security audit
/code-review            # General quality check

# Verification
/verify                 # Build, lint, test, security scan
```

## Git Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

* `feat:` Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å’`fix:` Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å’`refactor:` Ã¤Â»Â£Ã§Â ÂÃ¥ÂËœÃ¦â€ºÂ´
* Ã¥Å Å¸Ã¨Æ’Â½Ã¥Ë†â€ Ã¦â€Â¯Ã¤Â»Å½ `main` Ã¥Ë†â€ºÃ¥Â»ÂºÃ¯Â¼Å’Ã©Å“â‚¬Ã¨Â¦Â PR
* CIÃ¯Â¼Å¡ruffÃ¯Â¼Ë†Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥ + Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã¯Â¼â€°Ã£â‚¬ÂmypyÃ¯Â¼Ë†Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼â€°Ã£â‚¬ÂpytestÃ¯Â¼Ë†Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°Ã£â‚¬ÂsafetyÃ¯Â¼Ë†Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼â€°
* Ã©Æ’Â¨Ã§Â½Â²Ã¯Â¼Å¡Docker Ã©â€¢Å“Ã¥Æ’ÂÃ¯Â¼Å’Ã©â‚¬Å¡Ã¨Â¿â€¡ Kubernetes Ã¦Ë†â€“ Railway Ã§Â®Â¡Ã§Ââ€ 
