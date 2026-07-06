---
name: django-tdd
description: Django testing strategies with pytest-django, TDD methodology, factory_boy, mocking, coverage, and testing Django REST Framework APIs.
---

# Django Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Âº(TDD)

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


pytestÃ£â‚¬Âfactory_boyÃ£â‚¬ÂDjango REST FrameworkÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸DjangoÃ£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢ÂºÃ£â‚¬â€š

## Ã£Ââ€žÃ£ÂÂ¤Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€¹

- Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žDjangoÃ£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ£ÂÂ¨Ã£ÂÂ
- Django REST Framework APIÃ£â€šâ€™Ã¥Â®Å¸Ã¨Â£â€¦Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- DjangoÃ£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£â‚¬ÂÃ£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£â‚¬ÂÃ£â€šÂ·Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¶Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- DjangoÃ£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¢Ã£Æ’Â©Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ

## DjangoÃ£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®TDDÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

### Red-Green-RefactorÃ£â€šÂµÃ£â€šÂ¤Ã£â€šÂ¯Ã£Æ’Â«

```python
# Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”1: RED - Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂ
def test_user_creation():
    user = User.objects.create_user(email='test@example.com', password='testpass123')
    assert user.email == 'test@example.com'
    assert user.check_password('testpass123')
    assert not user.is_staff

# Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”2: GREEN - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã©â‚¬Å¡Ã£Ââ„¢
# UserÃ£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’Â¼Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â

# Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”3: REFACTOR - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ°Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¡Ã£ÂÂªÃ£ÂÅ’Ã£â€šâ€°Ã¦â€Â¹Ã¥â€“â€ž
```

## Ã£â€šÂ»Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”

### pytestÃ¨Â¨Â­Ã¥Â®Å¡

```ini
# pytest.ini
[pytest]
DJANGO_SETTINGS_MODULE = config.settings.test
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts =
    --reuse-db
    --nomigrations
    --cov=apps
    --cov-report=html
    --cov-report=term-missing
    --strict-markers
markers =
    slow: marks tests as slow
    integration: marks tests as integration tests
```

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¨Â¨Â­Ã¥Â®Å¡

```python
# config/settings/test.py
from .base import *

DEBUG = True
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
    }
}

# Ã£Æ’Å¾Ã£â€šÂ¤Ã£â€šÂ°Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã§â€žÂ¡Ã¥Å Â¹Ã¥Å’â€“Ã£Ââ€”Ã£ÂÂ¦Ã©Â«ËœÃ©â‚¬Å¸Ã¥Å’â€“
class DisableMigrations:
    def __contains__(self, item):
        return True

    def __getitem__(self, item):
        return None

MIGRATION_MODULES = DisableMigrations()

# Ã£â€šË†Ã£â€šÅ Ã©Â«ËœÃ©â‚¬Å¸Ã£ÂÂªÃ£Æ’â€˜Ã£â€šÂ¹Ã£Æ’Â¯Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]

# Ã£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# CeleryÃ£ÂÂ¯Ã¥Â¸Â¸Ã£ÂÂ«eager
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True
```

### conftest.py

```python
# tests/conftest.py
import pytest
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.fixture(autouse=True)
def timezone_settings(settings):
    """Ã¤Â¸â‚¬Ã¨Â²Â«Ã£Ââ€”Ã£ÂÅ¸Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â Ã£â€šÂ¾Ã£Æ’Â¼Ã£Æ’Â³Ã£â€šâ€™Ã§Â¢ÂºÃ¤Â¿ÂÃ£â‚¬â€š"""
    settings.TIME_ZONE = 'UTC'

@pytest.fixture
def user(db):
    """Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£â‚¬â€š"""
    return User.objects.create_user(
        email='test@example.com',
        password='testpass123',
        username='testuser'
    )

@pytest.fixture
def admin_user(db):
    """Ã§Â®Â¡Ã§Ââ€ Ã¨â‚¬â€¦Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£â‚¬â€š"""
    return User.objects.create_superuser(
        email='admin@example.com',
        password='adminpass123',
        username='admin'
    )

@pytest.fixture
def authenticated_client(client, user):
    """Ã¨ÂªÂÃ¨Â¨Â¼Ã¦Â¸Ë†Ã£ÂÂ¿Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢Ã£â‚¬â€š"""
    client.force_login(user)
    return client

@pytest.fixture
def api_client():
    """DRF APIÃ£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢Ã£â‚¬â€š"""
    from rest_framework.test import APIClient
    return APIClient()

@pytest.fixture
def authenticated_api_client(api_client, user):
    """Ã¨ÂªÂÃ¨Â¨Â¼Ã¦Â¸Ë†Ã£ÂÂ¿APIÃ£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢Ã£â‚¬â€š"""
    api_client.force_authenticate(user=user)
    return api_client
```

## Factory Boy

### Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’Â¼Ã£â€šÂ»Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”

```python
# tests/factories.py
import factory
from factory import fuzzy
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from apps.products.models import Product, Category

User = get_user_model()

class UserFactory(factory.django.DjangoModelFactory):
    """UserÃ£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£ÂÂ®Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’Â¼Ã£â‚¬â€š"""

    class Meta:
        model = User

    email = factory.Sequence(lambda n: f"user{n}@example.com")
    username = factory.Sequence(lambda n: f"user{n}")
    password = factory.PostGenerationMethodCall('set_password', 'testpass123')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    is_active = True

class CategoryFactory(factory.django.DjangoModelFactory):
    """CategoryÃ£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£ÂÂ®Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’Â¼Ã£â‚¬â€š"""

    class Meta:
        model = Category

    name = factory.Faker('word')
    slug = factory.LazyAttribute(lambda obj: obj.name.lower())
    description = factory.Faker('text')

class ProductFactory(factory.django.DjangoModelFactory):
    """ProductÃ£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£ÂÂ®Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’Â¼Ã£â‚¬â€š"""

    class Meta:
        model = Product

    name = factory.Faker('sentence', nb_words=3)
    slug = factory.LazyAttribute(lambda obj: obj.name.lower().replace(' ', '-'))
    description = factory.Faker('text')
    price = fuzzy.FuzzyDecimal(10.00, 1000.00, 2)
    stock = fuzzy.FuzzyInteger(0, 100)
    is_active = True
    category = factory.SubFactory(CategoryFactory)
    created_by = factory.SubFactory(UserFactory)

    @factory.post_generation
    def tags(self, create, extracted, **kwargs):
        """Ã¨Â£Â½Ã¥â€œÂÃ£ÂÂ«Ã£â€šÂ¿Ã£â€šÂ°Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â Ã£â‚¬â€š"""
        if not create:
            return
        if extracted:
            for tag in extracted:
                self.tags.add(tag)
```

### Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’Â¼Ã£ÂÂ®Ã¤Â½Â¿Ã§â€Â¨

```python
# tests/test_models.py
import pytest
from tests.factories import ProductFactory, UserFactory

def test_product_creation():
    """Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’Â¼Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸Ã¨Â£Â½Ã¥â€œÂÃ¤Â½Å“Ã¦Ë†ÂÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
    product = ProductFactory(price=100.00, stock=50)
    assert product.price == 100.00
    assert product.stock == 50
    assert product.is_active is True

def test_product_with_tags():
    """Ã£â€šÂ¿Ã£â€šÂ°Ã¤Â»ËœÃ£ÂÂÃ¨Â£Â½Ã¥â€œÂÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
    tags = [TagFactory(name='electronics'), TagFactory(name='new')]
    product = ProductFactory(tags=tags)
    assert product.tags.count() == 2

def test_multiple_products():
    """Ã¨Â¤â€¡Ã¦â€¢Â°Ã£ÂÂ®Ã¨Â£Â½Ã¥â€œÂÃ¤Â½Å“Ã¦Ë†ÂÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
    products = ProductFactory.create_batch(10)
    assert len(products) == 10
```

## Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```python
# tests/test_models.py
import pytest
from django.core.exceptions import ValidationError
from tests.factories import UserFactory, ProductFactory

class TestUserModel:
    """UserÃ£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""

    def test_create_user(self, db):
        """Ã©â‚¬Å¡Ã¥Â¸Â¸Ã£ÂÂ®Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¤Â½Å“Ã¦Ë†ÂÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        user = UserFactory(email='test@example.com')
        assert user.email == 'test@example.com'
        assert user.check_password('testpass123')
        assert not user.is_staff
        assert not user.is_superuser

    def test_create_superuser(self, db):
        """Ã£â€šÂ¹Ã£Æ’Â¼Ã£Æ’â€˜Ã£Æ’Â¼Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¤Â½Å“Ã¦Ë†ÂÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        user = UserFactory(
            email='admin@example.com',
            is_staff=True,
            is_superuser=True
        )
        assert user.is_staff
        assert user.is_superuser

    def test_user_str(self, db):
        """Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÂ®Ã¦â€“â€¡Ã¥Â­â€”Ã¥Ë†â€”Ã¨Â¡Â¨Ã§ÂÂ¾Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        user = UserFactory(email='test@example.com')
        assert str(user) == 'test@example.com'

class TestProductModel:
    """ProductÃ£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""

    def test_product_creation(self, db):
        """Ã¨Â£Â½Ã¥â€œÂÃ¤Â½Å“Ã¦Ë†ÂÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        product = ProductFactory()
        assert product.id is not None
        assert product.is_active is True
        assert product.created_at is not None

    def test_product_slug_generation(self, db):
        """Ã¨â€¡ÂªÃ¥â€¹â€¢Ã£â€šÂ¹Ã£Æ’Â©Ã£Æ’Æ’Ã£â€šÂ°Ã§â€Å¸Ã¦Ë†ÂÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        product = ProductFactory(name='Test Product')
        assert product.slug == 'test-product'

    def test_product_price_validation(self, db):
        """Ã¤Â¾Â¡Ã¦Â Â¼Ã£ÂÅ’Ã¨Â²Â Ã£ÂÂ®Ã¥â‚¬Â¤Ã£ÂÂ«Ã£ÂÂªÃ£â€šâ€°Ã£ÂÂªÃ£Ââ€žÃ£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        product = ProductFactory(price=-10)
        with pytest.raises(ValidationError):
            product.full_clean()

    def test_product_manager_active(self, db):
        """Ã£â€šÂ¢Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€“Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£Æ’Â¡Ã£â€šÂ½Ã£Æ’Æ’Ã£Æ’â€°Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        ProductFactory.create_batch(5, is_active=True)
        ProductFactory.create_batch(3, is_active=False)

        active_count = Product.objects.active().count()
        assert active_count == 5

    def test_product_stock_management(self, db):
        """Ã¥Å“Â¨Ã¥ÂºÂ«Ã§Â®Â¡Ã§Ââ€ Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        product = ProductFactory(stock=10)
        product.reduce_stock(5)
        product.refresh_from_db()
        assert product.stock == 5

        with pytest.raises(ValueError):
            product.reduce_stock(10)  # Ã¥Å“Â¨Ã¥ÂºÂ«Ã¤Â¸ÂÃ¨Â¶Â³
```

## Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### DjangoÃ£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```python
# tests/test_views.py
import pytest
from django.urls import reverse
from tests.factories import ProductFactory, UserFactory

class TestProductViews:
    """Ã¨Â£Â½Ã¥â€œÂÃ£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""

    def test_product_list(self, client, db):
        """Ã¨Â£Â½Ã¥â€œÂÃ£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        ProductFactory.create_batch(10)

        response = client.get(reverse('products:list'))

        assert response.status_code == 200
        assert len(response.context['products']) == 10

    def test_product_detail(self, client, db):
        """Ã¨Â£Â½Ã¥â€œÂÃ¨Â©Â³Ã§Â´Â°Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        product = ProductFactory()

        response = client.get(reverse('products:detail', kwargs={'slug': product.slug}))

        assert response.status_code == 200
        assert response.context['product'] == product

    def test_product_create_requires_login(self, client, db):
        """Ã¨Â£Â½Ã¥â€œÂÃ¤Â½Å“Ã¦Ë†ÂÃ£ÂÂ«Ã¨ÂªÂÃ¨Â¨Â¼Ã£ÂÅ’Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂ§Ã£Ââ€šÃ£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        response = client.get(reverse('products:create'))

        assert response.status_code == 302
        assert response.url.startswith('/accounts/login/')

    def test_product_create_authenticated(self, authenticated_client, db):
        """Ã¨ÂªÂÃ¨Â¨Â¼Ã¦Â¸Ë†Ã£ÂÂ¿Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂ®Ã¨Â£Â½Ã¥â€œÂÃ¤Â½Å“Ã¦Ë†ÂÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        response = authenticated_client.get(reverse('products:create'))

        assert response.status_code == 200

    def test_product_create_post(self, authenticated_client, db, category):
        """POSTÃ£ÂÂ«Ã£â€šË†Ã£â€šâ€¹Ã¨Â£Â½Ã¥â€œÂÃ¤Â½Å“Ã¦Ë†ÂÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        data = {
            'name': 'Test Product',
            'description': 'A test product',
            'price': '99.99',
            'stock': 10,
            'category': category.id,
        }

        response = authenticated_client.post(reverse('products:create'), data)

        assert response.status_code == 302
        assert Product.objects.filter(name='Test Product').exists()
```

## DRF APIÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### Ã£â€šÂ·Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```python
# tests/test_serializers.py
import pytest
from rest_framework.exceptions import ValidationError
from apps.products.serializers import ProductSerializer
from tests.factories import ProductFactory

class TestProductSerializer:
    """ProductSerializerÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""

    def test_serialize_product(self, db):
        """Ã¨Â£Â½Ã¥â€œÂÃ£ÂÂ®Ã£â€šÂ·Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂºÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        product = ProductFactory()
        serializer = ProductSerializer(product)

        data = serializer.data

        assert data['id'] == product.id
        assert data['name'] == product.name
        assert data['price'] == str(product.price)

    def test_deserialize_product(self, db):
        """Ã¨Â£Â½Ã¥â€œÂÃ£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£ÂÂ®Ã£Æ’â€¡Ã£â€šÂ·Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂºÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        data = {
            'name': 'Test Product',
            'description': 'Test description',
            'price': '99.99',
            'stock': 10,
            'category': 1,
        }

        serializer = ProductSerializer(data=data)

        assert serializer.is_valid()
        product = serializer.save()

        assert product.name == 'Test Product'
        assert float(product.price) == 99.99

    def test_price_validation(self, db):
        """Ã¤Â¾Â¡Ã¦Â Â¼Ã¦Â¤Å“Ã¨Â¨Â¼Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        data = {
            'name': 'Test Product',
            'price': '-10.00',
            'stock': 10,
        }

        serializer = ProductSerializer(data=data)

        assert not serializer.is_valid()
        assert 'price' in serializer.errors

    def test_stock_validation(self, db):
        """Ã¥Å“Â¨Ã¥ÂºÂ«Ã£ÂÅ’Ã¨Â²Â Ã£ÂÂ«Ã£ÂÂªÃ£â€šâ€°Ã£ÂÂªÃ£Ââ€žÃ£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        data = {
            'name': 'Test Product',
            'price': '99.99',
            'stock': -5,
        }

        serializer = ProductSerializer(data=data)

        assert not serializer.is_valid()
        assert 'stock' in serializer.errors
```

### API ViewSetÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```python
# tests/test_api.py
import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from tests.factories import ProductFactory, UserFactory

class TestProductAPI:
    """Product APIÃ£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""

    @pytest.fixture
    def api_client(self):
        """APIÃ£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢Ã£â‚¬â€š"""
        return APIClient()

    def test_list_products(self, api_client, db):
        """Ã¨Â£Â½Ã¥â€œÂÃ£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        ProductFactory.create_batch(10)

        url = reverse('api:product-list')
        response = api_client.get(url)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['count'] == 10

    def test_retrieve_product(self, api_client, db):
        """Ã¨Â£Â½Ã¥â€œÂÃ¥Ââ€“Ã¥Â¾â€”Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        product = ProductFactory()

        url = reverse('api:product-detail', kwargs={'pk': product.id})
        response = api_client.get(url)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['id'] == product.id

    def test_create_product_unauthorized(self, api_client, db):
        """Ã¨ÂªÂÃ¨Â¨Â¼Ã£ÂÂªÃ£Ââ€”Ã£ÂÂ®Ã¨Â£Â½Ã¥â€œÂÃ¤Â½Å“Ã¦Ë†ÂÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        url = reverse('api:product-list')
        data = {'name': 'Test Product', 'price': '99.99'}

        response = api_client.post(url, data)

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_create_product_authorized(self, authenticated_api_client, db):
        """Ã¨ÂªÂÃ¨Â¨Â¼Ã¦Â¸Ë†Ã£ÂÂ¿Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂ®Ã¨Â£Â½Ã¥â€œÂÃ¤Â½Å“Ã¦Ë†ÂÃ£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        url = reverse('api:product-list')
        data = {
            'name': 'Test Product',
            'description': 'Test',
            'price': '99.99',
            'stock': 10,
        }

        response = authenticated_api_client.post(url, data)

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['name'] == 'Test Product'

    def test_update_product(self, authenticated_api_client, db):
        """Ã¨Â£Â½Ã¥â€œÂÃ¦â€ºÂ´Ã¦â€“Â°Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        product = ProductFactory(created_by=authenticated_api_client.user)

        url = reverse('api:product-detail', kwargs={'pk': product.id})
        data = {'name': 'Updated Product'}

        response = authenticated_api_client.patch(url, data)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['name'] == 'Updated Product'

    def test_delete_product(self, authenticated_api_client, db):
        """Ã¨Â£Â½Ã¥â€œÂÃ¥â€°Å Ã©â„¢Â¤Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        product = ProductFactory(created_by=authenticated_api_client.user)

        url = reverse('api:product-detail', kwargs={'pk': product.id})
        response = authenticated_api_client.delete(url)

        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_filter_products_by_price(self, api_client, db):
        """Ã¤Â¾Â¡Ã¦Â Â¼Ã£ÂÂ«Ã£â€šË†Ã£â€šâ€¹Ã¨Â£Â½Ã¥â€œÂÃ£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        ProductFactory(price=50)
        ProductFactory(price=150)

        url = reverse('api:product-list')
        response = api_client.get(url, {'price_min': 100})

        assert response.status_code == status.HTTP_200_OK
        assert response.data['count'] == 1

    def test_search_products(self, api_client, db):
        """Ã¨Â£Â½Ã¥â€œÂÃ¦Â¤Å“Ã§Â´Â¢Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        ProductFactory(name='Apple iPhone')
        ProductFactory(name='Samsung Galaxy')

        url = reverse('api:product-list')
        response = api_client.get(url, {'search': 'Apple'})

        assert response.status_code == status.HTTP_200_OK
        assert response.data['count'] == 1
```

## Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ­Ã£Æ’Â³Ã£â€šÂ°Ã£ÂÂ¨Ã£Æ’â€˜Ã£Æ’Æ’Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ°

### Ã¥Â¤â€“Ã©Æ’Â¨Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£ÂÂ®Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯

```python
# tests/test_views.py
from unittest.mock import patch, Mock
import pytest

class TestPaymentView:
    """Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã¦Â±ÂºÃ¦Â¸Ë†Ã£â€šÂ²Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¤Ã£ÂÂ§Ã¦Â±ÂºÃ¦Â¸Ë†Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""

    @patch('apps.payments.services.stripe')
    def test_successful_payment(self, mock_stripe, client, user, product):
        """Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸StripeÃ£ÂÂ§Ã¦Ë†ÂÃ¥Å Å¸Ã£Ââ€”Ã£ÂÅ¸Ã¦Â±ÂºÃ¦Â¸Ë†Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        # Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡
        mock_stripe.Charge.create.return_value = {
            'id': 'ch_123',
            'status': 'succeeded',
            'amount': 9999,
        }

        client.force_login(user)
        response = client.post(reverse('payments:process'), {
            'product_id': product.id,
            'token': 'tok_visa',
        })

        assert response.status_code == 302
        mock_stripe.Charge.create.assert_called_once()

    @patch('apps.payments.services.stripe')
    def test_failed_payment(self, mock_stripe, client, user, product):
        """Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ€”Ã£ÂÅ¸Ã¦Â±ÂºÃ¦Â¸Ë†Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        mock_stripe.Charge.create.side_effect = Exception('Card declined')

        client.force_login(user)
        response = client.post(reverse('payments:process'), {
            'product_id': product.id,
            'token': 'tok_visa',
        })

        assert response.status_code == 302
        assert 'error' in response.url
```

### Ã£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã©â‚¬ÂÃ¤Â¿Â¡Ã£ÂÂ®Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯

```python
# tests/test_email.py
from django.core import mail
from django.test import override_settings

@override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
def test_order_confirmation_email(db, order):
    """Ã¦Â³Â¨Ã¦â€“â€¡Ã§Â¢ÂºÃ¨ÂªÂÃ£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
    order.send_confirmation_email()

    assert len(mail.outbox) == 1
    assert order.user.email in mail.outbox[0].to
    assert 'Order Confirmation' in mail.outbox[0].subject
```

## Ã§ÂµÂ±Ã¥ÂË†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### Ã¥Â®Å’Ã¥â€¦Â¨Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```python
# tests/test_integration.py
import pytest
from django.urls import reverse
from tests.factories import UserFactory, ProductFactory

class TestCheckoutFlow:
    """Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¢Ã£â€šÂ¦Ã£Æ’Ë†Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""

    def test_guest_to_purchase_flow(self, client, db):
        """Ã£â€šÂ²Ã£â€šÂ¹Ã£Æ’Ë†Ã£Ââ€¹Ã£â€šâ€°Ã¨Â³Â¼Ã¥â€¦Â¥Ã£ÂÂ¾Ã£ÂÂ§Ã£ÂÂ®Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬â€š"""
        # Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”1: Ã§â„¢Â»Ã©Å’Â²
        response = client.post(reverse('users:register'), {
            'email': 'test@example.com',
            'password': 'testpass123',
            'password_confirm': 'testpass123',
        })
        assert response.status_code == 302

        # Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”2: Ã£Æ’Â­Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³
        response = client.post(reverse('users:login'), {
            'email': 'test@example.com',
            'password': 'testpass123',
        })
        assert response.status_code == 302

        # Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”3: Ã¨Â£Â½Ã¥â€œÂÃ£â€šâ€™Ã©â€“Â²Ã¨Â¦Â§
        product = ProductFactory(price=100)
        response = client.get(reverse('products:detail', kwargs={'slug': product.slug}))
        assert response.status_code == 200

        # Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”4: Ã£â€šÂ«Ã£Æ’Â¼Ã£Æ’Ë†Ã£ÂÂ«Ã¨Â¿Â½Ã¥Å Â 
        response = client.post(reverse('cart:add'), {
            'product_id': product.id,
            'quantity': 1,
        })
        assert response.status_code == 302

        # Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”5: Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¢Ã£â€šÂ¦Ã£Æ’Ë†
        response = client.get(reverse('checkout:review'))
        assert response.status_code == 200
        assert product.name in response.content.decode()

        # Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Æ’Ã£Æ’â€”6: Ã¨Â³Â¼Ã¥â€¦Â¥Ã£â€šâ€™Ã¥Â®Å’Ã¤Âºâ€ 
        with patch('apps.checkout.services.process_payment') as mock_payment:
            mock_payment.return_value = True
            response = client.post(reverse('checkout:complete'))

        assert response.status_code == 302
        assert Order.objects.filter(user__email='test@example.com').exists()
```

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

### Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂÃ£Ââ€œÃ£ÂÂ¨

- **Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’ÂªÃ£Æ’Â¼Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨**: Ã¦â€°â€¹Ã¥â€¹â€¢Ã£â€šÂªÃ£Æ’â€“Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¤Â½Å“Ã¦Ë†ÂÃ£ÂÂ®Ã¤Â»Â£Ã£â€šÂÃ£â€šÅ Ã£ÂÂ«
- **Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Ââ€Ã£ÂÂ¨Ã£ÂÂ«1Ã£ÂÂ¤Ã£ÂÂ®Ã£â€šÂ¢Ã£â€šÂµÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³**: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã§â€žÂ¦Ã§â€šÂ¹Ã£â€šâ€™Ã§ÂµÅ¾Ã£â€šâ€¹
- **Ã¨ÂªÂ¬Ã¦ËœÅ½Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¥ÂÂ**: `test_user_cannot_delete_others_post`
- **Ã£â€šÂ¨Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†**: Ã§Â©ÂºÃ£ÂÂ®Ã¥â€¦Â¥Ã¥Å â€ºÃ£â‚¬ÂNoneÃ¥â‚¬Â¤Ã£â‚¬ÂÃ¥Â¢Æ’Ã§â€¢Å’Ã¦ÂÂ¡Ã¤Â»Â¶
- **Ã¥Â¤â€“Ã©Æ’Â¨Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£â€šâ€™Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯**: Ã¥Â¤â€“Ã©Æ’Â¨APIÃ£ÂÂ«Ã¤Â¾ÂÃ¥Â­ËœÃ£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- **Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨**: Ã©â€¡ÂÃ¨Â¤â€¡Ã£â€šâ€™Ã¦Å½â€™Ã©â„¢Â¤
- **Ã£Æ’â€˜Ã£Æ’Â¼Ã£Æ’Å¸Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†**: Ã¨ÂªÂÃ¥ÂÂ¯Ã£ÂÅ’Ã¦Â©Å¸Ã¨Æ’Â½Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂ
- **Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã©Â«ËœÃ©â‚¬Å¸Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¤**: `--reuse-db`Ã£ÂÂ¨`--nomigrations`Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨

### Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂÃ£ÂÂ§Ã£ÂÂªÃ£Ââ€žÃ£Ââ€œÃ£ÂÂ¨

- **DjangoÃ¥â€ â€¦Ã©Æ’Â¨Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: DjangoÃ£ÂÅ’Ã¦Â©Å¸Ã¨Æ’Â½Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã¤Â¿Â¡Ã©Â Â¼
- **Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€°Ã£Æ’â€˜Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â€“Ã£Æ’Â©Ã£Æ’ÂªÃ£ÂÅ’Ã¦Â©Å¸Ã¨Æ’Â½Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã¤Â¿Â¡Ã©Â Â¼
- **Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã§â€žÂ¡Ã¨Â¦â€“Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã©â‚¬Å¡Ã£â€šâ€¹Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÅ’Ã£Ââ€šÃ£â€šâ€¹
- **Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â¾ÂÃ¥Â­ËœÃ£Ââ€¢Ã£Ââ€ºÃ£ÂÂªÃ£Ââ€ž**: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã¤Â»Â»Ã¦â€žÂÃ£ÂÂ®Ã©Â â€ Ã¥ÂºÂÃ£ÂÂ§Ã¥Â®Å¸Ã¨Â¡Å’Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã£ÂÂ¹Ã£ÂÂ
- **Ã©ÂÅ½Ã¥ÂºÂ¦Ã£ÂÂ«Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¥Â­ËœÃ©â€“Â¢Ã¤Â¿â€šÃ£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯
- **Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â„¢Ã£Æ’Â¼Ã£Æ’Ë†Ã£Æ’Â¡Ã£â€šÂ½Ã£Æ’Æ’Ã£Æ’â€°Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: Ã£Æ’â€˜Ã£Æ’â€“Ã£Æ’ÂªÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’â€¢Ã£â€šÂ§Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
- **Ã¦Å“Â¬Ã§â€¢ÂªÃ£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: Ã¥Â¸Â¸Ã£ÂÂ«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨

## Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸

### Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã¨Â¨Â­Ã¥Â®Å¡

```bash
# Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£ÂÂ§Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
pytest --cov=apps --cov-report=html --cov-report=term-missing

# HTMLÃ£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â
open htmlcov/index.html
```

### Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã§â€ºÂ®Ã¦Â¨â„¢

| Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë† | Ã§â€ºÂ®Ã¦Â¨â„¢Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸ |
|-----------|-----------------|
| Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â« | 90%+ |
| Ã£â€šÂ·Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¶Ã£Æ’Â¼ | 85%+ |
| Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼ | 80%+ |
| Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹ | 90%+ |
| Ã£Æ’Â¦Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£ | 80%+ |
| Ã¥â€¦Â¨Ã¤Â½â€œ | 80%+ |

## Ã£â€šÂ¯Ã£â€šÂ¤Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£Æ’Â¬Ã£Æ’Â³Ã£â€šÂ¹

| Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³ | Ã¤Â½Â¿Ã§â€Â¨Ã¦Â³â€¢ |
|---------|-------|
| `@pytest.mark.django_db` | Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ¹Ã£â€šâ€™Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“ |
| `client` | DjangoÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë† |
| `api_client` | DRF APIÃ£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë† |
| `factory.create_batch(n)` | Ã¨Â¤â€¡Ã¦â€¢Â°Ã£ÂÂ®Ã£â€šÂªÃ£Æ’â€“Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â |
| `patch('module.function')` | Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¥Â­ËœÃ©â€“Â¢Ã¤Â¿â€šÃ£â€šâ€™Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯ |
| `override_settings` | Ã¨Â¨Â­Ã¥Â®Å¡Ã£â€šâ€™Ã¤Â¸â‚¬Ã¦â„¢â€šÃ§Å¡â€žÃ£ÂÂ«Ã¥Â¤â€°Ã¦â€ºÂ´ |
| `force_authenticate()` | Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ§Ã¨ÂªÂÃ¨Â¨Â¼Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’â€˜Ã£â€šÂ¹ |
| `assertRedirects` | Ã£Æ’ÂªÃ£Æ’â‚¬Ã£â€šÂ¤Ã£Æ’Â¬Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯ |
| `assertTemplateUsed` | Ã£Æ’â€ Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¤Â½Â¿Ã§â€Â¨Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼ |
| `mail.outbox` | Ã©â‚¬ÂÃ¤Â¿Â¡Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯ |

**Ã¨Â¦Å¡Ã£ÂË†Ã£ÂÂ¦Ã£ÂÅ Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž**: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€šÃ¨â€°Â¯Ã£Ââ€žÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÅ’Ã£ÂÂ©Ã£ÂÂ®Ã£â€šË†Ã£Ââ€ Ã£ÂÂ«Ã¥â€¹â€¢Ã¤Â½Å“Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂÃ£Ââ€¹Ã£â€šâ€™Ã¨ÂªÂ¬Ã¦ËœÅ½Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£â€šÂ·Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â«Ã£ÂÂ§Ã£â‚¬ÂÃ¨ÂªÂ­Ã£ÂÂ¿Ã£â€šâ€žÃ£Ââ„¢Ã£ÂÂÃ£â‚¬ÂÃ¤Â¿ÂÃ¥Â®Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ£Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š
