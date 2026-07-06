---
name: django-patterns
description: Django architecture patterns, REST API design with DRF, ORM best practices, caching, signals, middleware, and production-grade Django apps.
---

# Django Ã©â€“â€¹Ã§â„¢ÂºÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

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


Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’Â©Ã£Æ’â€“Ã£Æ’Â«Ã£ÂÂ§Ã¤Â¿ÂÃ¥Â®Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¦Å“Â¬Ã§â€¢ÂªÃ£â€šÂ°Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ®DjangoÃ£â€šÂ¢Ã£Æ’Â¼Ã£â€šÂ­Ã£Æ’â€ Ã£â€šÂ¯Ã£Æ’ÂÃ£Æ’Â£Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£â‚¬â€š

## Ã£Ââ€žÃ£ÂÂ¤Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€¹

- DjangoÃ£â€šÂ¦Ã£â€šÂ§Ã£Æ’â€“Ã£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¦Â§â€¹Ã§Â¯â€°Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- Django REST Framework APIÃ£â€šâ€™Ã¨Â¨Â­Ã¨Â¨Ë†Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- Django ORMÃ£ÂÂ¨Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£â€šâ€™Ã¦â€°Â±Ã£Ââ€ Ã£ÂÂ¨Ã£ÂÂ
- DjangoÃ£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¦Â§â€¹Ã©â‚¬Â Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°Ã£â‚¬ÂÃ£â€šÂ·Ã£â€šÂ°Ã£Æ’Å Ã£Æ’Â«Ã£â‚¬ÂÃ£Æ’Å¸Ã£Æ’â€°Ã£Æ’Â«Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¢Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â£â€¦Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ

## Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¦Â§â€¹Ã©â‚¬Â 

### Ã¦Å½Â¨Ã¥Â¥Â¨Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¢Ã£â€šÂ¦Ã£Æ’Ë†

```
myproject/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ config/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ settings/
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ base.py          # Ã¥Å¸ÂºÃ¦Å“Â¬Ã¨Â¨Â­Ã¥Â®Å¡
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ development.py   # Ã©â€“â€¹Ã§â„¢ÂºÃ¨Â¨Â­Ã¥Â®Å¡
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ production.py    # Ã¦Å“Â¬Ã§â€¢ÂªÃ¨Â¨Â­Ã¥Â®Å¡
Ã¢â€â€š   Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ test.py          # Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¨Â¨Â­Ã¥Â®Å¡
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ urls.py
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ wsgi.py
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ asgi.py
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ manage.py
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ apps/
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ users/
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ models.py
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ views.py
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ serializers.py
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ urls.py
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ permissions.py
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ filters.py
    Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ services.py
    Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ tests/
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ products/
        Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ ...
```

### Ã¥Ë†â€ Ã¥â€°Â²Ã¨Â¨Â­Ã¥Â®Å¡Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```python
# config/settings/base.py
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = env('DJANGO_SECRET_KEY')
DEBUG = False
ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    # Local apps
    'apps.users',
    'apps.products',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT', default='5432'),
    }
}

# config/settings/development.py
from .base import *

DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

DATABASES['default']['NAME'] = 'myproject_dev'

INSTALLED_APPS += ['debug_toolbar']

MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# config/settings/production.py
from .base import *

DEBUG = False
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Ã£Æ’Â­Ã£â€šÂ®Ã£Æ’Â³Ã£â€šÂ°
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'WARNING',
            'class': 'logging.FileHandler',
            'filename': '/var/log/django/django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'WARNING',
            'propagate': True,
        },
    },
}
```

## Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã¨Â¨Â­Ã¨Â¨Ë†Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£ÂÂ®Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

```python
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class User(AbstractUser):
    """AbstractUserÃ£â€šâ€™Ã¦â€¹Â¡Ã¥Â¼ÂµÃ£Ââ€”Ã£ÂÅ¸Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£â‚¬â€š"""
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'users'
        verbose_name = 'user'
        verbose_name_plural = 'users'
        ordering = ['-date_joined']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

class Product(models.Model):
    """Ã©ÂÂ©Ã¥Ë†â€¡Ã£ÂÂªÃ£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€°Ã¨Â¨Â­Ã¥Â®Å¡Ã£â€šâ€™Ã¦Å’ÂÃ£ÂÂ¤ProductÃ£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£â‚¬â€š"""
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=250)
    description = models.TextField(blank=True)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    stock = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    category = models.ForeignKey(
        'Category',
        on_delete=models.CASCADE,
        related_name='products'
    )
    tags = models.ManyToManyField('Tag', blank=True, related_name='products')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['-created_at']),
            models.Index(fields=['category', 'is_active']),
        ]
        constraints = [
            models.CheckConstraint(
                check=models.Q(price__gte=0),
                name='price_non_negative'
            )
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
```

### QuerySetÃ£ÂÂ®Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

```python
from django.db import models

class ProductQuerySet(models.QuerySet):
    """ProductÃ£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£ÂÂ®Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â  QuerySetÃ£â‚¬â€š"""

    def active(self):
        """Ã£â€šÂ¢Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€“Ã£ÂÂªÃ¨Â£Â½Ã¥â€œÂÃ£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢Ã£â‚¬â€š"""
        return self.filter(is_active=True)

    def with_category(self):
        """N+1Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«Ã©â€“Â¢Ã©â‚¬Â£Ã£â€šÂ«Ã£Æ’â€ Ã£â€šÂ´Ã£Æ’ÂªÃ£â€šâ€™Ã©ÂÂ¸Ã¦Å Å¾Ã£â‚¬â€š"""
        return self.select_related('category')

    def with_tags(self):
        """Ã¥Â¤Å¡Ã¥Â¯Â¾Ã¥Â¤Å¡Ã£Æ’ÂªÃ£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šÂ·Ã£Æ’Æ’Ã£Æ’â€”Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«Ã£â€šÂ¿Ã£â€šÂ°Ã£â€šâ€™Ã£Æ’â€”Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ§Ã£Æ’Æ’Ã£Æ’ÂÃ£â‚¬â€š"""
        return self.prefetch_related('tags')

    def in_stock(self):
        """Ã¥Å“Â¨Ã¥ÂºÂ«Ã£ÂÅ’0Ã£â€šË†Ã£â€šÅ Ã¥Â¤Â§Ã£ÂÂÃ£Ââ€žÃ¨Â£Â½Ã¥â€œÂÃ£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢Ã£â‚¬â€š"""
        return self.filter(stock__gt=0)

    def search(self, query):
        """Ã¥ÂÂÃ¥â€°ÂÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã¨ÂªÂ¬Ã¦ËœÅ½Ã£ÂÂ§Ã¨Â£Â½Ã¥â€œÂÃ£â€šâ€™Ã¦Â¤Å“Ã§Â´Â¢Ã£â‚¬â€š"""
        return self.filter(
            models.Q(name__icontains=query) |
            models.Q(description__icontains=query)
        )

class Product(models.Model):
    # ... Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€° ...

    objects = ProductQuerySet.as_manager()  # Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â QuerySetÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨

# Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¾â€¹
Product.objects.active().with_category().in_stock()
```

### Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£Æ’Â¡Ã£â€šÂ½Ã£Æ’Æ’Ã£Æ’â€°

```python
class ProductManager(models.Manager):
    """Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ§â€Â¨Ã£ÂÂ®Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Â¼Ã£â‚¬â€š"""

    def get_or_none(self, **kwargs):
        """DoesNotExistÃ£ÂÂ®Ã¤Â»Â£Ã£â€šÂÃ£â€šÅ Ã£ÂÂ«Ã£â€šÂªÃ£Æ’â€“Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯NoneÃ£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢Ã£â‚¬â€š"""
        try:
            return self.get(**kwargs)
        except self.model.DoesNotExist:
            return None

    def create_with_tags(self, name, price, tag_names):
        """Ã©â€“Â¢Ã©â‚¬Â£Ã£â€šÂ¿Ã£â€šÂ°Ã£â€šâ€™Ã¦Å’ÂÃ£ÂÂ¤Ã¨Â£Â½Ã¥â€œÂÃ£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£â‚¬â€š"""
        product = self.create(name=name, price=price)
        tags = [Tag.objects.get_or_create(name=name)[0] for name in tag_names]
        product.tags.set(tags)
        return product

    def bulk_update_stock(self, product_ids, quantity):
        """Ã¨Â¤â€¡Ã¦â€¢Â°Ã£ÂÂ®Ã¨Â£Â½Ã¥â€œÂÃ£ÂÂ®Ã¥Å“Â¨Ã¥ÂºÂ«Ã£â€šâ€™Ã¤Â¸â‚¬Ã¦â€¹Â¬Ã¦â€ºÂ´Ã¦â€“Â°Ã£â‚¬â€š"""
        return self.filter(id__in=product_ids).update(stock=quantity)

# Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã¥â€ â€¦
class Product(models.Model):
    # ... Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€° ...
    custom = ProductManager()
```

## Django REST FrameworkÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### Ã£â€šÂ·Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```python
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import Product, User

class ProductSerializer(serializers.ModelSerializer):
    """ProductÃ£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£ÂÂ®Ã£â€šÂ·Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¶Ã£Æ’Â¼Ã£â‚¬â€š"""

    category_name = serializers.CharField(source='category.name', read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    discount_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price',
            'discount_price', 'stock', 'category_name',
            'average_rating', 'created_at'
        ]
        read_only_fields = ['id', 'slug', 'created_at']

    def get_discount_price(self, obj):
        """Ã¨Â©Â²Ã¥Â½â€œÃ£Ââ„¢Ã£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯Ã¥â€°Â²Ã¥Â¼â€¢Ã¤Â¾Â¡Ã¦Â Â¼Ã£â€šâ€™Ã¨Â¨Ë†Ã§Â®â€”Ã£â‚¬â€š"""
        if hasattr(obj, 'discount') and obj.discount:
            return obj.price * (1 - obj.discount.percent / 100)
        return obj.price

    def validate_price(self, value):
        """Ã¤Â¾Â¡Ã¦Â Â¼Ã£ÂÅ’Ã©ÂÅ¾Ã¨Â²Â Ã£ÂÂ§Ã£Ââ€šÃ£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã§Â¢ÂºÃ¨ÂªÂÃ£â‚¬â€š"""
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative.")
        return value

class ProductCreateSerializer(serializers.ModelSerializer):
    """Ã¨Â£Â½Ã¥â€œÂÃ¤Â½Å“Ã¦Ë†ÂÃ§â€Â¨Ã£ÂÂ®Ã£â€šÂ·Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¶Ã£Æ’Â¼Ã£â‚¬â€š"""

    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'stock', 'category']

    def validate(self, data):
        """Ã¨Â¤â€¡Ã¦â€¢Â°Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€°Ã£ÂÂ®Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã¦Â¤Å“Ã¨Â¨Â¼Ã£â‚¬â€š"""
        if data['price'] > 10000 and data['stock'] > 100:
            raise serializers.ValidationError(
                "Cannot have high-value products with large stock."
            )
        return data

class UserRegistrationSerializer(serializers.ModelSerializer):
    """Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã§â„¢Â»Ã©Å’Â²Ã§â€Â¨Ã£ÂÂ®Ã£â€šÂ·Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¶Ã£Æ’Â¼Ã£â‚¬â€š"""

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password_confirm = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password_confirm']

    def validate(self, data):
        """Ã£Æ’â€˜Ã£â€šÂ¹Ã£Æ’Â¯Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÅ’Ã¤Â¸â‚¬Ã¨â€¡Â´Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼Ã£â‚¬â€š"""
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({
                "password_confirm": "Password fields didn't match."
            })
        return data

    def create(self, validated_data):
        """Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã¥Å’â€“Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€˜Ã£â€šÂ¹Ã£Æ’Â¯Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ§Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£â‚¬â€š"""
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
```

### ViewSetÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```python
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product
from .serializers import ProductSerializer, ProductCreateSerializer
from .permissions import IsOwnerOrReadOnly
from .filters import ProductFilter
from .services import ProductService

class ProductViewSet(viewsets.ModelViewSet):
    """ProductÃ£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã§â€Â¨Ã£ÂÂ®ViewSetÃ£â‚¬â€š"""

    queryset = Product.objects.select_related('category').prefetch_related('tags')
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']

    def get_serializer_class(self):
        """Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ«Ã¥Å¸ÂºÃ£ÂÂ¥Ã£Ââ€žÃ£ÂÂ¦Ã©ÂÂ©Ã¥Ë†â€¡Ã£ÂÂªÃ£â€šÂ·Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¶Ã£Æ’Â¼Ã£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢Ã£â‚¬â€š"""
        if self.action == 'create':
            return ProductCreateSerializer
        return ProductSerializer

    def perform_create(self, serializer):
        """Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ§Ã¤Â¿ÂÃ¥Â­ËœÃ£â‚¬â€š"""
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Ã¦Â³Â¨Ã§â€ºÂ®Ã£ÂÂ®Ã¨Â£Â½Ã¥â€œÂÃ£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢Ã£â‚¬â€š"""
        featured = self.queryset.filter(is_featured=True)[:10]
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def purchase(self, request, pk=None):
        """Ã¨Â£Â½Ã¥â€œÂÃ£â€šâ€™Ã¨Â³Â¼Ã¥â€¦Â¥Ã£â‚¬â€š"""
        product = self.get_object()
        service = ProductService()
        result = service.purchase(product, request.user)
        return Response(result, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_products(self, request):
        """Ã§ÂÂ¾Ã¥Å“Â¨Ã£ÂÂ®Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÅ’Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ€”Ã£ÂÅ¸Ã¨Â£Â½Ã¥â€œÂÃ£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢Ã£â‚¬â€š"""
        products = self.queryset.filter(created_by=request.user)
        page = self.paginate_queryset(products)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
```

### Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    """Ã¨Â£Â½Ã¥â€œÂÃ£â€šâ€™Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’Â¼Ã£Æ’Ë†Ã£ÂÂ«Ã¨Â¿Â½Ã¥Å Â Ã£â‚¬â€š"""
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response(
            {'error': 'Product not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    cart, _ = Cart.objects.get_or_create(user=request.user)
    CartItem.objects.create(
        cart=cart,
        product=product,
        quantity=quantity
    )

    return Response({'message': 'Added to cart'}, status=status.HTTP_201_CREATED)
```

## Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£Æ’Â¬Ã£â€šÂ¤Ã£Æ’Â¤Ã£Æ’Â¼Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```python
# apps/orders/services.py
from typing import Optional
from django.db import transaction
from .models import Order, OrderItem

class OrderService:
    """Ã¦Â³Â¨Ã¦â€“â€¡Ã©â€“Â¢Ã©â‚¬Â£Ã£ÂÂ®Ã£Æ’â€œÃ£â€šÂ¸Ã£Æ’ÂÃ£â€šÂ¹Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯Ã§â€Â¨Ã£ÂÂ®Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£Æ’Â¬Ã£â€šÂ¤Ã£Æ’Â¤Ã£Æ’Â¼Ã£â‚¬â€š"""

    @staticmethod
    @transaction.atomic
    def create_order(user, cart: Cart) -> Order:
        """Ã£â€šÂ«Ã£Æ’Â¼Ã£Æ’Ë†Ã£Ââ€¹Ã£â€šâ€°Ã¦Â³Â¨Ã¦â€“â€¡Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£â‚¬â€š"""
        order = Order.objects.create(
            user=user,
            total_price=cart.total_price
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

        # Ã£â€šÂ«Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ¯Ã£Æ’ÂªÃ£â€šÂ¢
        cart.items.all().delete()

        return order

    @staticmethod
    def process_payment(order: Order, payment_data: dict) -> bool:
        """Ã¦Â³Â¨Ã¦â€“â€¡Ã£ÂÂ®Ã¦â€Â¯Ã¦â€°â€¢Ã£Ââ€žÃ£â€šâ€™Ã¥â€¡Â¦Ã§Ââ€ Ã£â‚¬â€š"""
        # Ã¦Â±ÂºÃ¦Â¸Ë†Ã£â€šÂ²Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¤Ã£ÂÂ¨Ã£ÂÂ®Ã§ÂµÂ±Ã¥ÂË†
        payment = PaymentGateway.charge(
            amount=order.total_price,
            token=payment_data['token']
        )

        if payment.success:
            order.status = Order.Status.PAID
            order.save()
            # Ã§Â¢ÂºÃ¨ÂªÂÃ£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã©â‚¬ÂÃ¤Â¿Â¡
            OrderService.send_confirmation_email(order)
            return True

        return False

    @staticmethod
    def send_confirmation_email(order: Order):
        """Ã¦Â³Â¨Ã¦â€“â€¡Ã§Â¢ÂºÃ¨ÂªÂÃ£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã©â‚¬ÂÃ¤Â¿Â¡Ã£â‚¬â€š"""
        # Ã£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã©â‚¬ÂÃ¤Â¿Â¡Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯
        pass
```

## Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°Ã¦Ë†Â¦Ã§â€¢Â¥

### Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â«Ã£ÂÂ®Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°

```python
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator

@method_decorator(cache_page(60 * 15), name='dispatch')  # 15Ã¥Ë†â€ 
class ProductListView(generic.ListView):
    model = Product
    template_name = 'products/list.html'
    context_object_name = 'products'
```

### Ã£Æ’â€ Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã£Æ’â€¢Ã£Æ’Â©Ã£â€šÂ°Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ®Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°

```django
{% load cache %}
{% cache 500 sidebar %}
    ... Ã©Â«ËœÃ£â€šÂ³Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂªÃ£â€šÂµÃ£â€šÂ¤Ã£Æ’â€°Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’Â³Ã£Æ’â€ž ...
{% endcache %}
```

### Ã¤Â½Å½Ã£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â«Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°

```python
from django.core.cache import cache

def get_featured_products():
    """Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°Ã¤Â»ËœÃ£ÂÂÃ£ÂÂ§Ã¦Â³Â¨Ã§â€ºÂ®Ã£ÂÂ®Ã¨Â£Â½Ã¥â€œÂÃ£â€šâ€™Ã¥Ââ€“Ã¥Â¾â€”Ã£â‚¬â€š"""
    cache_key = 'featured_products'
    products = cache.get(cache_key)

    if products is None:
        products = list(Product.objects.filter(is_featured=True))
        cache.set(cache_key, products, timeout=60 * 15)  # 15Ã¥Ë†â€ 

    return products
```

### QuerySetÃ£ÂÂ®Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°

```python
from django.core.cache import cache

def get_popular_categories():
    cache_key = 'popular_categories'
    categories = cache.get(cache_key)

    if categories is None:
        categories = list(Category.objects.annotate(
            product_count=Count('products')
        ).filter(product_count__gt=10).order_by('-product_count')[:20])
        cache.set(cache_key, categories, timeout=60 * 60)  # 1Ã¦â„¢â€šÃ©â€“â€œ

    return categories
```

## Ã£â€šÂ·Ã£â€šÂ°Ã£Æ’Å Ã£Æ’Â«

### Ã£â€šÂ·Ã£â€šÂ°Ã£Æ’Å Ã£Æ’Â«Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

```python
# apps/users/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÅ’Ã¤Â½Å“Ã¦Ë†ÂÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£ÂÂ¨Ã£ÂÂÃ£ÂÂ«Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†ÂÃ£â‚¬â€š"""
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÅ’Ã¤Â¿ÂÃ¥Â­ËœÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£ÂÂ¨Ã£ÂÂÃ£ÂÂ«Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¤Â¿ÂÃ¥Â­ËœÃ£â‚¬â€š"""
    instance.profile.save()

# apps/users/apps.py
from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.users'

    def ready(self):
        """Ã£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£ÂÅ’Ã¦Âºâ€“Ã¥â€šâ„¢Ã£ÂÂ§Ã£ÂÂÃ£ÂÅ¸Ã£â€šâ€°Ã£â€šÂ·Ã£â€šÂ°Ã£Æ’Å Ã£Æ’Â«Ã£â€šâ€™Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â‚¬â€š"""
        import apps.users.signals
```

## Ã£Æ’Å¸Ã£Æ’â€°Ã£Æ’Â«Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¢

### Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£Æ’Å¸Ã£Æ’â€°Ã£Æ’Â«Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¢

```python
# middleware/active_user_middleware.py
import time
from django.utils.deprecation import MiddlewareMixin

class ActiveUserMiddleware(MiddlewareMixin):
    """Ã£â€šÂ¢Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€“Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£â€šâ€™Ã¨Â¿Â½Ã¨Â·Â¡Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’Å¸Ã£Æ’â€°Ã£Æ’Â«Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¢Ã£â‚¬â€š"""

    def process_request(self, request):
        """Ã¥Ââ€”Ã¤Â¿Â¡Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥â€¡Â¦Ã§Ââ€ Ã£â‚¬â€š"""
        if request.user.is_authenticated:
            # Ã¦Å“â‚¬Ã§Âµâ€šÃ£â€šÂ¢Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€“Ã¦â„¢â€šÃ¥Ë†Â»Ã£â€šâ€™Ã¦â€ºÂ´Ã¦â€“Â°
            request.user.last_active = timezone.now()
            request.user.save(update_fields=['last_active'])

class RequestLoggingMiddleware(MiddlewareMixin):
    """Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â­Ã£â€šÂ®Ã£Æ’Â³Ã£â€šÂ°Ã§â€Â¨Ã£ÂÂ®Ã£Æ’Å¸Ã£Æ’â€°Ã£Æ’Â«Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¢Ã£â‚¬â€š"""

    def process_request(self, request):
        """Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†Ã©â€“â€¹Ã¥Â§â€¹Ã¦â„¢â€šÃ¥Ë†Â»Ã£â€šâ€™Ã£Æ’Â­Ã£â€šÂ°Ã£â‚¬â€š"""
        request.start_time = time.time()

    def process_response(self, request, response):
        """Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Å“Å¸Ã©â€“â€œÃ£â€šâ€™Ã£Æ’Â­Ã£â€šÂ°Ã£â‚¬â€š"""
        if hasattr(request, 'start_time'):
            duration = time.time() - request.start_time
            logger.info(f'{request.method} {request.path} - {response.status_code} - {duration:.3f}s')
        return response
```

## Ã£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹Ã¦Å“â‚¬Ã©ÂÂ©Ã¥Å’â€“

### N+1Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£ÂÂ®Ã©ËœÂ²Ã¦Â­Â¢

```python
# Bad - N+1Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Âª
products = Product.objects.all()
for product in products:
    print(product.category.name)  # Ã¥Ââ€žÃ¨Â£Â½Ã¥â€œÂÃ£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦Ã¥â‚¬â€¹Ã¥Ë†Â¥Ã£ÂÂ®Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Âª

# Good - select_relatedÃ£ÂÂ§Ã¥ÂËœÃ¤Â¸â‚¬Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’Âª
products = Product.objects.select_related('category').all()
for product in products:
    print(product.category.name)

# Good - Ã¥Â¤Å¡Ã¥Â¯Â¾Ã¥Â¤Å¡Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®prefetch
products = Product.objects.prefetch_related('tags').all()
for product in products:
    for tag in product.tags.all():
        print(tag.name)
```

### Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¹

```python
class Product(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['-created_at']),
            models.Index(fields=['category', 'created_at']),
        ]
```

### Ã¤Â¸â‚¬Ã¦â€¹Â¬Ã¦â€œÂÃ¤Â½Å“

```python
# Ã¤Â¸â‚¬Ã¦â€¹Â¬Ã¤Â½Å“Ã¦Ë†Â
Product.objects.bulk_create([
    Product(name=f'Product {i}', price=10.00)
    for i in range(1000)
])

# Ã¤Â¸â‚¬Ã¦â€¹Â¬Ã¦â€ºÂ´Ã¦â€“Â°
products = Product.objects.all()[:100]
for product in products:
    product.is_active = True
Product.objects.bulk_update(products, ['is_active'])

# Ã¤Â¸â‚¬Ã¦â€¹Â¬Ã¥â€°Å Ã©â„¢Â¤
Product.objects.filter(stock=0).delete()
```

## Ã£â€šÂ¯Ã£â€šÂ¤Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£Æ’Â¬Ã£Æ’Â³Ã£â€šÂ¹

| Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³ | Ã¨ÂªÂ¬Ã¦ËœÅ½ |
|---------|-------------|
| Ã¥Ë†â€ Ã¥â€°Â²Ã¨Â¨Â­Ã¥Â®Å¡ | dev/prod/testÃ¨Â¨Â­Ã¥Â®Å¡Ã£ÂÂ®Ã¥Ë†â€ Ã©â€ºÂ¢ |
| Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â QuerySet | Ã¥â€ ÂÃ¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£Æ’Â¡Ã£â€šÂ½Ã£Æ’Æ’Ã£Æ’â€° |
| Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£Æ’Â¬Ã£â€šÂ¤Ã£Æ’Â¤Ã£Æ’Â¼ | Ã£Æ’â€œÃ£â€šÂ¸Ã£Æ’ÂÃ£â€šÂ¹Ã£Æ’Â­Ã£â€šÂ¸Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ®Ã¥Ë†â€ Ã©â€ºÂ¢ |
| ViewSet | REST APIÃ£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë† |
| Ã£â€šÂ·Ã£Æ’ÂªÃ£â€šÂ¢Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¶Ã£Æ’Â¼Ã¦Â¤Å“Ã¨Â¨Â¼ | Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†/Ã£Æ’Â¬Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ¹Ã¥Â¤â€°Ã¦Ââ€º |
| select_related | Ã¥Â¤â€“Ã©Æ’Â¨Ã£â€šÂ­Ã£Æ’Â¼Ã¦Å“â‚¬Ã©ÂÂ©Ã¥Å’â€“ |
| prefetch_related | Ã¥Â¤Å¡Ã¥Â¯Â¾Ã¥Â¤Å¡Ã¦Å“â‚¬Ã©ÂÂ©Ã¥Å’â€“ |
| Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â¥Ã£Æ’â€¢Ã£â€šÂ¡Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’Ë† | Ã©Â«ËœÃ£â€šÂ³Ã£â€šÂ¹Ã£Æ’Ë†Ã¦â€œÂÃ¤Â½Å“Ã£ÂÂ®Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ° |
| Ã£â€šÂ·Ã£â€šÂ°Ã£Æ’Å Ã£Æ’Â« | Ã£â€šÂ¤Ã£Æ’â„¢Ã£Æ’Â³Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³ |
| Ã£Æ’Å¸Ã£Æ’â€°Ã£Æ’Â«Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¢ | Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†/Ã£Æ’Â¬Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ¹Ã¥â€¡Â¦Ã§Ââ€  |

**Ã¨Â¦Å¡Ã£ÂË†Ã£ÂÂ¦Ã£ÂÅ Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž**: DjangoÃ£ÂÂ¯Ã¥Â¤Å¡Ã£ÂÂÃ£ÂÂ®Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šÂ«Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã¦ÂÂÃ¤Â¾â€ºÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£ÂÅ’Ã£â‚¬ÂÃ¦Å“Â¬Ã§â€¢ÂªÃ£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ§Ã£ÂÂ¯Ã£â‚¬ÂÃ¦Â§â€¹Ã©â‚¬Â Ã£ÂÂ¨Ã§Âµâ€žÃ§Â¹â€Ã£ÂÅ’Ã§Â°Â¡Ã¦Â½â€Ã£ÂÂªÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šË†Ã£â€šÅ Ã£â€šâ€šÃ©â€¡ÂÃ¨Â¦ÂÃ£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€šÃ¤Â¿ÂÃ¥Â®Ë†Ã¦â‚¬Â§Ã£â€šâ€™Ã©â€¡ÂÃ¨Â¦â€“Ã£Ââ€”Ã£ÂÂ¦Ã¦Â§â€¹Ã§Â¯â€°Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š
