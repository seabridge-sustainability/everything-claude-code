---
name: django-security
description: Django security best practices, authentication, authorization, CSRF protection, SQL injection prevention, XSS prevention, and secure deployment configurations.
---

# Django Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

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


Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ£ÂÂªÃ¨â€žâ€ Ã¥Â¼Â±Ã¦â‚¬Â§Ã£Ââ€¹Ã£â€šâ€°Ã¤Â¿ÂÃ¨Â­Â·Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®DjangoÃ£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂªÃ£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¬Ã£â€šÂ¤Ã£Æ’â€°Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Â³Ã£â‚¬â€š

## Ã£Ââ€žÃ£ÂÂ¤Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€¹

- DjangoÃ¨ÂªÂÃ¨Â¨Â¼Ã£ÂÂ¨Ã¨ÂªÂÃ¥ÂÂ¯Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¦Â¨Â©Ã©â„¢ÂÃ£ÂÂ¨Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â£â€¦Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- Ã¦Å“Â¬Ã§â€¢ÂªÃ£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¨Â¨Â­Ã¥Â®Å¡Ã£â€šâ€™Ã¦Â§â€¹Ã¦Ë†ÂÃ£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- DjangoÃ£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¥â€¢ÂÃ©Â¡Å’Ã£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- DjangoÃ£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šâ€™Ã¦Å“Â¬Ã§â€¢ÂªÃ§â€™Â°Ã¥Â¢Æ’Ã£ÂÂ«Ã£Æ’â€¡Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¤Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ

## Ã¦Â Â¸Ã£ÂÂ¨Ã£ÂÂªÃ£â€šâ€¹Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã¨Â¨Â­Ã¥Â®Å¡

### Ã¦Å“Â¬Ã§â€¢ÂªÃ¨Â¨Â­Ã¥Â®Å¡Ã£ÂÂ®Ã¦Â§â€¹Ã¦Ë†Â

```python
# settings/production.py
import os

DEBUG = False  # Ã©â€¡ÂÃ¨Â¦Â: Ã¦Å“Â¬Ã§â€¢ÂªÃ§â€™Â°Ã¥Â¢Æ’Ã£ÂÂ§Ã£ÂÂ¯Ã§ÂµÂ¶Ã¥Â¯Â¾Ã£ÂÂ«TrueÃ£ÂÂ«Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')

# Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000  # 1Ã¥Â¹Â´
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'

# HTTPSÃ£ÂÂ¨Ã£â€šÂ¯Ã£Æ’Æ’Ã£â€šÂ­Ã£Æ’Â¼
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SAMESITE = 'Lax'

# Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šÂ­Ã£Æ’Â¼Ã¯Â¼Ë†Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°Ã§ÂµÅ’Ã§â€Â±Ã£ÂÂ§Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ„¢Ã£â€šâ€¹Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÅ’Ã£Ââ€šÃ£â€šÅ Ã£ÂÂ¾Ã£Ââ„¢Ã¯Â¼â€°
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
if not SECRET_KEY:
    raise ImproperlyConfigured('DJANGO_SECRET_KEY environment variable is required')

# Ã£Æ’â€˜Ã£â€šÂ¹Ã£Æ’Â¯Ã£Æ’Â¼Ã£Æ’â€°Ã¦Â¤Å“Ã¨Â¨Â¼
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 12,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
```

## Ã¨ÂªÂÃ¨Â¨Â¼

### Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«

```python
# apps/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """Ã£â€šË†Ã£â€šÅ Ã¨â€°Â¯Ã£Ââ€žÃ£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£Æ’Â¢Ã£Æ’â€¡Ã£Æ’Â«Ã£â‚¬â€š"""

    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)

    USERNAME_FIELD = 'email'  # Ã£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¥ÂÂÃ£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦Ã¤Â½Â¿Ã§â€Â¨
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.email

# settings/base.py
AUTH_USER_MODEL = 'users.User'
```

### Ã£Æ’â€˜Ã£â€šÂ¹Ã£Æ’Â¯Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’ÂÃ£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â³Ã£â€šÂ°

```python
# Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã£ÂÂ§Ã£ÂÂ¯DjangoÃ£ÂÂ¯PBKDF2Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬â€šÃ£â€šË†Ã£â€šÅ Ã¥Â¼Â·Ã¥Å â€ºÃ£ÂÂªÃ£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«:
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
]
```

### Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã§Â®Â¡Ã§Ââ€ 

```python
# Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã¨Â¨Â­Ã¥Â®Å¡
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'  # Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯ 'db'
SESSION_CACHE_ALIAS = 'default'
SESSION_COOKIE_AGE = 3600 * 24 * 7  # 1Ã©â‚¬Â±Ã©â€“â€œ
SESSION_SAVE_EVERY_REQUEST = False
SESSION_EXPIRE_AT_BROWSER_CLOSE = False  # Ã£â€šË†Ã£â€šÅ Ã¨â€°Â¯Ã£Ââ€žUXÃ£ÂÂ§Ã£Ââ„¢Ã£ÂÅ’Ã£â‚¬ÂÃ£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ¯Ã¤Â½Å½Ã£Ââ€ž
```

## Ã¨ÂªÂÃ¥ÂÂ¯

### Ã£Æ’â€˜Ã£Æ’Â¼Ã£Æ’Å¸Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

```python
# models.py
from django.db import models
from django.contrib.auth.models import Permission

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        permissions = [
            ('can_publish', 'Can publish posts'),
            ('can_edit_others', 'Can edit posts of others'),
        ]

    def user_can_edit(self, user):
        """Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÅ’Ã£Ââ€œÃ£ÂÂ®Ã¦Å â€¢Ã§Â¨Â¿Ã£â€šâ€™Ã§Â·Â¨Ã©â€ºâ€ Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã£Ââ€¹Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£â‚¬â€š"""
        return self.author == user or user.has_perm('app.can_edit_others')

# views.py
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.views.generic import UpdateView

class PostUpdateView(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
    model = Post
    permission_required = 'app.can_edit_others'
    raise_exception = True  # Ã£Æ’ÂªÃ£Æ’â‚¬Ã£â€šÂ¤Ã£Æ’Â¬Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®Ã¤Â»Â£Ã£â€šÂÃ£â€šÅ Ã£ÂÂ«403Ã£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢

    def get_queryset(self):
        """Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÅ’Ã¨â€¡ÂªÃ¥Ë†â€ Ã£ÂÂ®Ã¦Å â€¢Ã§Â¨Â¿Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã§Â·Â¨Ã©â€ºâ€ Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã£â€šË†Ã£Ââ€ Ã£ÂÂ«Ã£Ââ„¢Ã£â€šâ€¹Ã£â‚¬â€š"""
        return Post.objects.filter(author=self.request.user)
```

### Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£Æ’â€˜Ã£Æ’Â¼Ã£Æ’Å¸Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

```python
# permissions.py
from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """Ã¦â€°â‚¬Ã¦Å“â€°Ã¨â‚¬â€¦Ã£ÂÂ®Ã£ÂÂ¿Ã£ÂÅ’Ã£â€šÂªÃ£Æ’â€“Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã§Â·Â¨Ã©â€ºâ€ Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã£â€šË†Ã£Ââ€ Ã£ÂÂ«Ã£Ââ„¢Ã£â€šâ€¹Ã£â‚¬â€š"""

    def has_object_permission(self, request, view, obj):
        # Ã¨ÂªÂ­Ã£ÂÂ¿Ã¥Ââ€“Ã£â€šÅ Ã¦Â¨Â©Ã©â„¢ÂÃ£ÂÂ¯Ã¤Â»Â»Ã¦â€žÂÃ£ÂÂ®Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ«Ã¨Â¨Â±Ã¥ÂÂ¯
        if request.method in permissions.SAFE_METHODS:
            return True

        # Ã¦â€ºÂ¸Ã£ÂÂÃ¨Â¾Â¼Ã£ÂÂ¿Ã¦Â¨Â©Ã©â„¢ÂÃ£ÂÂ¯Ã¦â€°â‚¬Ã¦Å“â€°Ã¨â‚¬â€¦Ã£ÂÂ®Ã£ÂÂ¿
        return obj.author == request.user

class IsAdminOrReadOnly(permissions.BasePermission):
    """Ã§Â®Â¡Ã§Ââ€ Ã¨â‚¬â€¦Ã£ÂÂ¯Ã¤Â½â€¢Ã£ÂÂ§Ã£â€šâ€šÃ£ÂÂ§Ã£ÂÂÃ£â‚¬ÂÃ¤Â»â€“Ã£ÂÂ¯Ã¨ÂªÂ­Ã£ÂÂ¿Ã¥Ââ€“Ã£â€šÅ Ã£ÂÂ®Ã£ÂÂ¿Ã£â‚¬â€š"""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class IsVerifiedUser(permissions.BasePermission):
    """Ã¦Â¤Å“Ã¨Â¨Â¼Ã¦Â¸Ë†Ã£ÂÂ¿Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã¨Â¨Â±Ã¥ÂÂ¯Ã£â‚¬â€š"""

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_verified
```

### Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ¹Ã¥Ë†Â¶Ã¥Â¾Â¡(RBAC)

```python
# models.py
from django.contrib.auth.models import AbstractUser, Group

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Administrator'),
        ('moderator', 'Moderator'),
        ('user', 'Regular User'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')

    def is_admin(self):
        return self.role == 'admin' or self.is_superuser

    def is_moderator(self):
        return self.role in ['admin', 'moderator']

# Mixin
class AdminRequiredMixin:
    """Ã§Â®Â¡Ã§Ââ€ Ã¨â‚¬â€¦Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â«Ã£â€šâ€™Ã¨Â¦ÂÃ¦Â±â€šÃ£Ââ„¢Ã£â€šâ€¹MixinÃ£â‚¬â€š"""

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not request.user.is_admin():
            from django.core.exceptions import PermissionDenied
            raise PermissionDenied
        return super().dispatch(request, *args, **kwargs)
```

## SQLÃ£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã©ËœÂ²Ã¦Â­Â¢

### Django ORMÃ¤Â¿ÂÃ¨Â­Â·

```python
# GOOD: Django ORMÃ£ÂÂ¯Ã¨â€¡ÂªÃ¥â€¹â€¢Ã§Å¡â€žÃ£ÂÂ«Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã£â€šÂ¨Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’â€”
def get_user(username):
    return User.objects.get(username=username)  # Ã¥Â®â€°Ã¥â€¦Â¨

# GOOD: raw()Ã£ÂÂ§Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
def search_users(query):
    return User.objects.raw('SELECT * FROM users WHERE username = %s', [query])

# BAD: Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¥â€¦Â¥Ã¥Å â€ºÃ£â€šâ€™Ã§â€ºÂ´Ã¦Å½Â¥Ã¨Â£Å“Ã©â€“â€œÃ£Ââ€”Ã£ÂÂªÃ£Ââ€ž
def get_user_bad(username):
    return User.objects.raw(f'SELECT * FROM users WHERE username = {username}')  # Ã¨â€žâ€ Ã¥Â¼Â±Ã¯Â¼Â

# GOOD: Ã©ÂÂ©Ã¥Ë†â€¡Ã£ÂÂªÃ£â€šÂ¨Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’â€”Ã£ÂÂ§filterÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
def get_users_by_email(email):
    return User.objects.filter(email__iexact=email)  # Ã¥Â®â€°Ã¥â€¦Â¨

# GOOD: Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£ÂÂ«QÃ£â€šÂªÃ£Æ’â€“Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
from django.db.models import Q
def search_users_complex(query):
    return User.objects.filter(
        Q(username__icontains=query) |
        Q(email__icontains=query)
    )  # Ã¥Â®â€°Ã¥â€¦Â¨
```

### raw()Ã£ÂÂ§Ã£ÂÂ®Ã¨Â¿Â½Ã¥Å Â Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£

```python
# Ã§â€Å¸Ã£ÂÂ®SQLÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÅ’Ã£Ââ€šÃ£â€šâ€¹Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯Ã£â‚¬ÂÃ¥Â¸Â¸Ã£ÂÂ«Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
User.objects.raw(
    'SELECT * FROM users WHERE email = %s AND status = %s',
    [user_input_email, status]
)
```

## XSSÃ©ËœÂ²Ã¦Â­Â¢

### Ã£Æ’â€ Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šÂ¨Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’â€”

```django
{# DjangoÃ£ÂÂ¯Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã£ÂÂ§Ã¥Â¤â€°Ã¦â€¢Â°Ã£â€šâ€™Ã¨â€¡ÂªÃ¥â€¹â€¢Ã£â€šÂ¨Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’â€” - Ã¥Â®â€°Ã¥â€¦Â¨ #}
{{ user_input }}  {# Ã£â€šÂ¨Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’â€”Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸HTML #}

{# Ã¤Â¿Â¡Ã©Â Â¼Ã£ÂÂ§Ã£ÂÂÃ£â€šâ€¹Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’Â³Ã£Æ’â€žÃ£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã¦ËœÅ½Ã§Â¤ÂºÃ§Å¡â€žÃ£ÂÂ«Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂ¨Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯ #}
{{ trusted_html|safe }}  {# Ã£â€šÂ¨Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’â€”Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂªÃ£Ââ€ž #}

{# Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂªHTMLÃ£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ«Ã£Æ’â€ Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨ #}
{{ user_input|escape }}  {# Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã£ÂÂ¨Ã¥ÂÅ’Ã£ÂËœ #}
{{ user_input|striptags }}  {# Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®HTMLÃ£â€šÂ¿Ã£â€šÂ°Ã£â€šâ€™Ã¥â€°Å Ã©â„¢Â¤ #}

{# JavaScriptÃ£â€šÂ¨Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’â€” #}
<script>
    var username = {{ username|escapejs }};
</script>
```

### Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂªÃ¦â€“â€¡Ã¥Â­â€”Ã¥Ë†â€”Ã¥â€¡Â¦Ã§Ââ€ 

```python
from django.utils.safestring import mark_safe
from django.utils.html import escape

# BAD: Ã£â€šÂ¨Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’â€”Ã£Ââ€ºÃ£ÂÅ¡Ã£ÂÂ«Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¥â€¦Â¥Ã¥Å â€ºÃ£â€šâ€™Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂ¨Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
def render_bad(user_input):
    return mark_safe(user_input)  # Ã¨â€žâ€ Ã¥Â¼Â±Ã¯Â¼Â

# GOOD: Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã£â€šÂ¨Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’â€”Ã£â‚¬ÂÃ¦Â¬Â¡Ã£ÂÂ«Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂ¨Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯
def render_good(user_input):
    return mark_safe(escape(user_input))

# GOOD: Ã¥Â¤â€°Ã¦â€¢Â°Ã£â€šâ€™Ã¦Å’ÂÃ£ÂÂ¤HTMLÃ£ÂÂ«format_htmlÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
from django.utils.html import format_html

def greet_user(username):
    return format_html('<span class="user">{}</span>', escape(username))
```

### HTTPÃ£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼

```python
# settings.py
SECURE_CONTENT_TYPE_NOSNIFF = True  # MIMEÃ£â€šÂ¹Ã£Æ’â€¹Ã£Æ’Æ’Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°Ã£â€šâ€™Ã©ËœÂ²Ã¦Â­Â¢
SECURE_BROWSER_XSS_FILTER = True  # XSSÃ£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â«Ã£â€šÂ¿Ã£â€šâ€™Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“
X_FRAME_OPTIONS = 'DENY'  # Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ¸Ã£Æ’Â£Ã£Æ’Æ’Ã£â€šÂ­Ã£Æ’Â³Ã£â€šÂ°Ã£â€šâ€™Ã©ËœÂ²Ã¦Â­Â¢

# Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£Æ’Å¸Ã£Æ’â€°Ã£Æ’Â«Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¢
from django.conf import settings

class SecurityHeaderMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Content-Security-Policy'] = "default-src 'self'"
        return response
```

## CSRFÃ¤Â¿ÂÃ¨Â­Â·

### Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†CSRFÃ¤Â¿ÂÃ¨Â­Â·

```python
# settings.py - CSRFÃ£ÂÂ¯Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã£ÂÂ§Ã¦Å“â€°Ã¥Å Â¹
CSRF_COOKIE_SECURE = True  # HTTPSÃ£ÂÂ§Ã£ÂÂ®Ã£ÂÂ¿Ã©â‚¬ÂÃ¤Â¿Â¡
CSRF_COOKIE_HTTPONLY = True  # JavaScriptÃ£â€šÂ¢Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ¹Ã£â€šâ€™Ã©ËœÂ²Ã¦Â­Â¢
CSRF_COOKIE_SAMESITE = 'Lax'  # Ã¤Â¸â‚¬Ã©Æ’Â¨Ã£ÂÂ®Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¹Ã£ÂÂ§CSRFÃ£â€šâ€™Ã©ËœÂ²Ã¦Â­Â¢
CSRF_TRUSTED_ORIGINS = ['https://example.com']  # Ã¤Â¿Â¡Ã©Â Â¼Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€°Ã£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Â³

# Ã£Æ’â€ Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¤Â½Â¿Ã§â€Â¨
<form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Submit</button>
</form>

# AJAXÃ£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

fetch('/api/endpoint/', {
    method: 'POST',
    headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
});
```

### Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£ÂÂ®Ã©â„¢Â¤Ã¥Â¤â€“Ã¯Â¼Ë†Ã¦â€¦Å½Ã©â€¡ÂÃ£ÂÂ«Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼â€°

```python
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # Ã§ÂµÂ¶Ã¥Â¯Â¾Ã£ÂÂ«Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂªÃ¥Â Â´Ã¥ÂË†Ã£ÂÂ®Ã£ÂÂ¿Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Â
def webhook_view(request):
    # Ã¥Â¤â€“Ã©Æ’Â¨Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£Ââ€¹Ã£â€šâ€°Ã£ÂÂ®Webhook
    pass
```

## Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£

### Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¦Â¤Å“Ã¨Â¨Â¼

```python
import os
from django.core.exceptions import ValidationError

def validate_file_extension(value):
    """Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¦â€¹Â¡Ã¥Â¼ÂµÃ¥Â­ÂÃ£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼Ã£â‚¬â€š"""
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')

def validate_file_size(value):
    """Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šÂµÃ£â€šÂ¤Ã£â€šÂºÃ£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼Ã¯Â¼Ë†Ã¦Å“â‚¬Ã¥Â¤Â§5MBÃ¯Â¼â€°Ã£â‚¬â€š"""
    filesize = value.size
    if filesize > 5 * 1024 * 1024:
        raise ValidationError('File too large. Max size is 5MB.')

# models.py
class Document(models.Model):
    file = models.FileField(
        upload_to='documents/',
        validators=[validate_file_extension, validate_file_size]
    )
```

### Ã¥Â®â€°Ã¥â€¦Â¨Ã£ÂÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ¸

```python
# settings.py
MEDIA_ROOT = '/var/www/media/'
MEDIA_URL = '/media/'

# Ã¦Å“Â¬Ã§â€¢ÂªÃ§â€™Â°Ã¥Â¢Æ’Ã£ÂÂ§Ã£Æ’Â¡Ã£Æ’â€¡Ã£â€šÂ£Ã£â€šÂ¢Ã£ÂÂ«Ã¥Ë†Â¥Ã£ÂÂ®Ã£Æ’â€°Ã£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
MEDIA_DOMAIN = 'https://media.example.com'

# Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã§â€ºÂ´Ã¦Å½Â¥Ã¦ÂÂÃ¤Â¾â€ºÃ£Ââ€”Ã£ÂÂªÃ£Ââ€ž
# Ã©Ââ„¢Ã§Å¡â€žÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ«Ã£ÂÂ¯whitenoiseÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯CDNÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
# Ã£Æ’Â¡Ã£Æ’â€¡Ã£â€šÂ£Ã£â€šÂ¢Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ«Ã£ÂÂ¯Ã¥Ë†Â¥Ã£ÂÂ®Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â¼Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯S3Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
```

## APIÃ£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£

### Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¥Ë†Â¶Ã©â„¢Â

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day',
        'upload': '10/hour',
    }
}

# Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£â€šÂ¹Ã£Æ’Â­Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’Â«
from rest_framework.throttling import UserRateThrottle

class BurstRateThrottle(UserRateThrottle):
    scope = 'burst'
    rate = '60/min'

class SustainedRateThrottle(UserRateThrottle):
    scope = 'sustained'
    rate = '1000/day'
```

### APIÃ§â€Â¨Ã¨ÂªÂÃ¨Â¨Â¼

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': 'You are authenticated'})
```

## Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼

### Content Security Policy

```python
# settings.py
CSP_DEFAULT_SRC = "'self'"
CSP_SCRIPT_SRC = "'self' https://cdn.example.com"
CSP_STYLE_SRC = "'self' 'unsafe-inline'"
CSP_IMG_SRC = "'self' data: https:"
CSP_CONNECT_SRC = "'self' https://api.example.com"

# Middleware
class CSPMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response['Content-Security-Policy'] = (
            f"default-src {CSP_DEFAULT_SRC}; "
            f"script-src {CSP_SCRIPT_SRC}; "
            f"style-src {CSP_STYLE_SRC}; "
            f"img-src {CSP_IMG_SRC}; "
            f"connect-src {CSP_CONNECT_SRC}"
        )
        return response
```

## Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°

### Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£ÂÂ®Ã§Â®Â¡Ã§Ââ€ 

```python
# python-decoupleÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯django-environÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
import environ

env = environ.Env(
    # Ã£â€šÂ­Ã£Æ’Â£Ã£â€šÂ¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°Ã£â‚¬ÂÃ£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã¥â‚¬Â¤Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡
    DEBUG=(bool, False)
)

# .envÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£â€šâ‚¬
environ.Env.read_env()

SECRET_KEY = env('DJANGO_SECRET_KEY')
DATABASE_URL = env('DATABASE_URL')
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')

# .envÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¯Â¼Ë†Ã£Ââ€œÃ£â€šÅ’Ã£â€šâ€™Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£Ââ€”Ã£ÂÂªÃ£Ââ€žÃ¯Â¼â€°
DEBUG=False
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
ALLOWED_HOSTS=example.com,www.example.com
```

## Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¤Ã£Æ’â„¢Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ®Ã£Æ’Â­Ã£â€šÂ°Ã¨Â¨ËœÃ©Å’Â²

```python
# settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'WARNING',
            'class': 'logging.FileHandler',
            'filename': '/var/log/django/security.log',
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django.security': {
            'handlers': ['file', 'console'],
            'level': 'WARNING',
            'propagate': True,
        },
        'django.request': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': False,
        },
    },
}
```

## Ã£â€šÂ¯Ã£â€šÂ¤Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†

| Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯ | Ã¨ÂªÂ¬Ã¦ËœÅ½ |
|-------|-------------|
| `DEBUG = False` | Ã¦Å“Â¬Ã§â€¢ÂªÃ§â€™Â°Ã¥Â¢Æ’Ã£ÂÂ§DEBUGÃ£â€šâ€™Ã¦Â±ÂºÃ£Ââ€”Ã£ÂÂ¦Ã¥Â®Å¸Ã¨Â¡Å’Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž |
| HTTPSÃ£ÂÂ®Ã£ÂÂ¿ | SSLÃ£â€šâ€™Ã¥Â¼Â·Ã¥Ë†Â¶Ã£â‚¬ÂÃ£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£â€šÂ¢Ã£â€šÂ¯Ã£Æ’Æ’Ã£â€šÂ­Ã£Æ’Â¼ |
| Ã¥Â¼Â·Ã¥Å â€ºÃ£ÂÂªÃ£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë† | SECRET_KEYÃ£ÂÂ«Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨ |
| Ã£Æ’â€˜Ã£â€šÂ¹Ã£Æ’Â¯Ã£Æ’Â¼Ã£Æ’â€°Ã¦Â¤Å“Ã¨Â¨Â¼ | Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€˜Ã£â€šÂ¹Ã£Æ’Â¯Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’ÂÃ£Æ’ÂªÃ£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“ |
| CSRFÃ¤Â¿ÂÃ¨Â­Â· | Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã£ÂÂ§Ã¦Å“â€°Ã¥Å Â¹Ã£â‚¬ÂÃ§â€žÂ¡Ã¥Å Â¹Ã£ÂÂ«Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž |
| XSSÃ©ËœÂ²Ã¦Â­Â¢ | DjangoÃ£ÂÂ¯Ã¨â€¡ÂªÃ¥â€¹â€¢Ã£â€šÂ¨Ã£â€šÂ¹Ã£â€šÂ±Ã£Æ’Â¼Ã£Æ’â€”Ã£â‚¬ÂÃ£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¥â€¦Â¥Ã¥Å â€ºÃ£ÂÂ§<code>\|safe</code>Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž |
| SQLÃ£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³ | ORMÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬ÂÃ£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£ÂÂ§Ã¦â€“â€¡Ã¥Â­â€”Ã¥Ë†â€”Ã£â€šâ€™Ã©â‚¬Â£Ã§ÂµÂÃ£Ââ€”Ã£ÂÂªÃ£Ââ€ž |
| Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€° | Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”Ã£ÂÂ¨Ã£â€šÂµÃ£â€šÂ¤Ã£â€šÂºÃ£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼ |
| Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¥Ë†Â¶Ã©â„¢Â | APIÃ£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ¹Ã£Æ’Â­Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’Â« |
| Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼ | CSPÃ£â‚¬ÂX-Frame-OptionsÃ£â‚¬ÂHSTS |
| Ã£Æ’Â­Ã£â€šÂ°Ã¨Â¨ËœÃ©Å’Â² | Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¤Ã£Æ’â„¢Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’Â­Ã£â€šÂ° |
| Ã¦â€ºÂ´Ã¦â€“Â° | DjangoÃ£ÂÂ¨DependenciesÃ£â€šâ€™Ã¦Å“â‚¬Ã¦â€“Â°Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¤ |

**Ã¨Â¦Å¡Ã£ÂË†Ã£ÂÂ¦Ã£ÂÅ Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž**: Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ¯Ã¨Â£Â½Ã¥â€œÂÃ£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ£â‚¬ÂÃ£Æ’â€”Ã£Æ’Â­Ã£â€šÂ»Ã£â€šÂ¹Ã£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€šÃ¥Â®Å¡Ã¦Å“Å¸Ã§Å¡â€žÃ£ÂÂ«Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Ââ€”Ã£â‚¬ÂÃ¦â€ºÂ´Ã¦â€“Â°Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š
