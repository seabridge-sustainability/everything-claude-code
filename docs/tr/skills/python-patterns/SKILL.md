---
name: python-patterns
description: Pythonic idiomlar, PEP 8 standartlarÃ„Â±, type hint'ler ve saÃ„Å¸lam, verimli ve bakÃ„Â±mÃ„Â± kolay Python uygulamalarÃ„Â± oluÃ…Å¸turmak iÃƒÂ§in en iyi uygulamalar.
origin: ECC
---

# Python GeliÃ…Å¸tirme Desenleri

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


SaÃ„Å¸lam, verimli ve bakÃ„Â±mÃ„Â± kolay uygulamalar oluÃ…Å¸turmak iÃƒÂ§in idiomatic Python desenleri ve en iyi uygulamalar.

## Ne Zaman EtkinleÃ…Å¸tirmeli

- Yeni Python kodu yazarken
- Python kodunu gÃƒÂ¶zden geÃƒÂ§irirken
- Mevcut Python kodunu refactor ederken
- Python paketleri/modÃƒÂ¼lleri tasarlarken

## Temel Prensipler

### 1. Okunabilirlik Ãƒâ€“nemlidir

Python okunabilirliÃ„Å¸i ÃƒÂ¶nceliklendirir. Kod aÃƒÂ§Ã„Â±k ve anlaÃ…Å¸Ã„Â±lmasÃ„Â± kolay olmalÃ„Â±dÃ„Â±r.

```python
# Ã„Â°yi: AÃƒÂ§Ã„Â±k ve okunabilir
def get_active_users(users: list[User]) -> list[User]:
    """SaÃ„Å¸lanan listeden sadece aktif kullanÃ„Â±cÃ„Â±larÃ„Â± dÃƒÂ¶ndÃƒÂ¼r."""
    return [user for user in users if user.is_active]


# KÃƒÂ¶tÃƒÂ¼: Zeki ama kafa karÃ„Â±Ã…Å¸tÃ„Â±rÃ„Â±cÃ„Â±
def get_active_users(u):
    return [x for x in u if x.a]
```

### 2. AÃƒÂ§Ã„Â±k, Ãƒâ€“rtÃƒÂ¼k Olandan Daha Ã„Â°yidir

Sihirden kaÃƒÂ§Ã„Â±nÃ„Â±n; kodunuzun ne yaptÃ„Â±Ã„Å¸Ã„Â± konusunda aÃƒÂ§Ã„Â±k olun.

```python
# Ã„Â°yi: AÃƒÂ§Ã„Â±k yapÃ„Â±landÃ„Â±rma
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# KÃƒÂ¶tÃƒÂ¼: Gizli yan etkiler
import some_module
some_module.setup()  # Bu ne yapÃ„Â±yor?
```

### 3. EAFP - Affederek Sormaktansa Ã„Â°zin Ã„Â°stemek Daha KolaydÃ„Â±r

Python, koÃ…Å¸ullarÃ„Â± kontrol etmek yerine exception handling'i tercih eder.

```python
# Ã„Â°yi: EAFP stili
def get_value(dictionary: dict, key: str) -> Any:
    try:
        return dictionary[key]
    except KeyError:
        return default_value

# KÃƒÂ¶tÃƒÂ¼: LBYL (Atlamadan Ãƒâ€“nce Bak) stili
def get_value(dictionary: dict, key: str) -> Any:
    if key in dictionary:
        return dictionary[key]
    else:
        return default_value
```

## Type Hint'ler

### Temel Type Annotation'lar

```python
from typing import Optional, List, Dict, Any

def process_user(
    user_id: str,
    data: Dict[str, Any],
    active: bool = True
) -> Optional[User]:
    """Bir kullanÃ„Â±cÃ„Â±yÃ„Â± iÃ…Å¸le ve gÃƒÂ¼ncellenmiÃ…Å¸ User'Ã„Â± veya None dÃƒÂ¶ndÃƒÂ¼r."""
    if not active:
        return None
    return User(user_id, data)
```

### Modern Type Hint'ler (Python 3.9+)

```python
# Python 3.9+ - Built-in tipleri kullan
def process_items(items: list[str]) -> dict[str, int]:
    return {item: len(item) for item in items}

# Python 3.8 ve ÃƒÂ¶ncesi - typing modÃƒÂ¼lÃƒÂ¼nÃƒÂ¼ kullan
from typing import List, Dict

def process_items(items: List[str]) -> Dict[str, int]:
    return {item: len(item) for item in items}
```

### Type Alias'larÃ„Â± ve TypeVar

```python
from typing import TypeVar, Union

# KarmaÃ…Å¸Ã„Â±k tipler iÃƒÂ§in type alias
JSON = Union[dict[str, Any], list[Any], str, int, float, bool, None]

def parse_json(data: str) -> JSON:
    return json.loads(data)

# Generic tipler
T = TypeVar('T')

def first(items: list[T]) -> T | None:
    """Ã„Â°lk ÃƒÂ¶Ã„Å¸eyi dÃƒÂ¶ndÃƒÂ¼r veya liste boÃ…Å¸sa None dÃƒÂ¶ndÃƒÂ¼r."""
    return items[0] if items else None
```

### Protocol TabanlÃ„Â± Duck Typing

```python
from typing import Protocol

class Renderable(Protocol):
    def render(self) -> str:
        """Nesneyi string'e render et."""

def render_all(items: list[Renderable]) -> str:
    """Renderable protocol'ÃƒÂ¼nÃƒÂ¼ implement eden tÃƒÂ¼m ÃƒÂ¶Ã„Å¸eleri render et."""
    return "\n".join(item.render() for item in items)
```

## Hata Ã„Â°Ã…Å¸leme Desenleri

### Spesifik Exception Handling

```python
# Ã„Â°yi: Spesifik exception'larÃ„Â± yakala
def load_config(path: str) -> Config:
    try:
        with open(path) as f:
            return Config.from_json(f.read())
    except FileNotFoundError as e:
        raise ConfigError(f"Config file not found: {path}") from e
    except json.JSONDecodeError as e:
        raise ConfigError(f"Invalid JSON in config: {path}") from e

# KÃƒÂ¶tÃƒÂ¼: Bare except
def load_config(path: str) -> Config:
    try:
        with open(path) as f:
            return Config.from_json(f.read())
    except:
        return None  # Sessiz hata!
```

### Exception Chaining

```python
def process_data(data: str) -> Result:
    try:
        parsed = json.loads(data)
    except json.JSONDecodeError as e:
        # Traceback'i korumak iÃƒÂ§in exception'larÃ„Â± zincirleme
        raise ValueError(f"Failed to parse data: {data}") from e
```

### Ãƒâ€“zel Exception HiyerarÃ…Å¸isi

```python
class AppError(Exception):
    """TÃƒÂ¼m uygulama hatalarÃ„Â± iÃƒÂ§in base exception."""
    pass

class ValidationError(AppError):
    """Input validation baÃ…Å¸arÃ„Â±sÃ„Â±z olduÃ„Å¸unda raise edilir."""
    pass

class NotFoundError(AppError):
    """Ã„Â°stenen kaynak bulunamadÃ„Â±Ã„Å¸Ã„Â±nda raise edilir."""
    pass

# KullanÃ„Â±m
def get_user(user_id: str) -> User:
    user = db.find_user(user_id)
    if not user:
        raise NotFoundError(f"User not found: {user_id}")
    return user
```

## Context Manager'lar

### Kaynak YÃƒÂ¶netimi

```python
# Ã„Â°yi: Context manager'larÃ„Â± kullanma
def process_file(path: str) -> str:
    with open(path, 'r') as f:
        return f.read()

# KÃƒÂ¶tÃƒÂ¼: Manuel kaynak yÃƒÂ¶netimi
def process_file(path: str) -> str:
    f = open(path, 'r')
    try:
        return f.read()
    finally:
        f.close()
```

### Ãƒâ€“zel Context Manager'lar

```python
from contextlib import contextmanager

@contextmanager
def timer(name: str):
    """Bir kod bloÃ„Å¸unu zamanlamak iÃƒÂ§in context manager."""
    start = time.perf_counter()
    yield
    elapsed = time.perf_counter() - start
    print(f"{name} took {elapsed:.4f} seconds")

# KullanÃ„Â±m
with timer("data processing"):
    process_large_dataset()
```

### Context Manager Class'larÃ„Â±

```python
class DatabaseTransaction:
    def __init__(self, connection):
        self.connection = connection

    def __enter__(self):
        self.connection.begin_transaction()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None:
            self.connection.commit()
        else:
            self.connection.rollback()
        return False  # Exception'larÃ„Â± suppress etme

# KullanÃ„Â±m
with DatabaseTransaction(conn):
    user = conn.create_user(user_data)
    conn.create_profile(user.id, profile_data)
```

## Comprehension'lar ve Generator'lar

### List Comprehension'larÃ„Â±

```python
# Ã„Â°yi: Basit dÃƒÂ¶nÃƒÂ¼Ã…Å¸ÃƒÂ¼mler iÃƒÂ§in list comprehension
names = [user.name for user in users if user.is_active]

# KÃƒÂ¶tÃƒÂ¼: Manuel dÃƒÂ¶ngÃƒÂ¼
names = []
for user in users:
    if user.is_active:
        names.append(user.name)

# KarmaÃ…Å¸Ã„Â±k comprehension'lar geniÃ…Å¸letilmelidir
# KÃƒÂ¶tÃƒÂ¼: Ãƒâ€¡ok karmaÃ…Å¸Ã„Â±k
result = [x * 2 for x in items if x > 0 if x % 2 == 0]

# Ã„Â°yi: Bir generator fonksiyonu kullan
def filter_and_transform(items: Iterable[int]) -> list[int]:
    result = []
    for x in items:
        if x > 0 and x % 2 == 0:
            result.append(x * 2)
    return result
```

### Generator Expression'larÃ„Â±

```python
# Ã„Â°yi: Lazy evaluation iÃƒÂ§in generator
total = sum(x * x for x in range(1_000_000))

# KÃƒÂ¶tÃƒÂ¼: BÃƒÂ¼yÃƒÂ¼k ara liste oluÃ…Å¸turur
total = sum([x * x for x in range(1_000_000)])
```

### Generator FonksiyonlarÃ„Â±

```python
def read_large_file(path: str) -> Iterator[str]:
    """BÃƒÂ¼yÃƒÂ¼k bir dosyayÃ„Â± satÃ„Â±r satÃ„Â±r oku."""
    with open(path) as f:
        for line in f:
            yield line.strip()

# KullanÃ„Â±m
for line in read_large_file("huge.txt"):
    process(line)
```

## Data Class'lar ve Named Tuple'lar

### Data Class'lar

```python
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class User:
    """Otomatik __init__, __repr__ ve __eq__ ile User entity."""
    id: str
    name: str
    email: str
    created_at: datetime = field(default_factory=datetime.now)
    is_active: bool = True

# KullanÃ„Â±m
user = User(
    id="123",
    name="Alice",
    email="alice@example.com"
)
```

### Validation ile Data Class'lar

```python
@dataclass
class User:
    email: str
    age: int

    def __post_init__(self):
        # Email formatÃ„Â±nÃ„Â± validate et
        if "@" not in self.email:
            raise ValueError(f"Invalid email: {self.email}")
        # YaÃ…Å¸ aralÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± validate et
        if self.age < 0 or self.age > 150:
            raise ValueError(f"Invalid age: {self.age}")
```

### Named Tuple'lar

```python
from typing import NamedTuple

class Point(NamedTuple):
    """Immutable 2D nokta."""
    x: float
    y: float

    def distance(self, other: 'Point') -> float:
        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5

# KullanÃ„Â±m
p1 = Point(0, 0)
p2 = Point(3, 4)
print(p1.distance(p2))  # 5.0
```

## Decorator'lar

### Fonksiyon Decorator'larÃ„Â±

```python
import functools
import time

def timer(func: Callable) -> Callable:
    """Fonksiyon yÃƒÂ¼rÃƒÂ¼tmesini zamanlamak iÃƒÂ§in decorator."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)

# slow_function() yazdÃ„Â±rÃ„Â±r: slow_function took 1.0012s
```

### Parametreli Decorator'lar

```python
def repeat(times: int):
    """Bir fonksiyonu birden ÃƒÂ§ok kez tekrarlamak iÃƒÂ§in decorator."""
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(times):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(times=3)
def greet(name: str) -> str:
    return f"Hello, {name}!"

# greet("Alice") dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r ["Hello, Alice!", "Hello, Alice!", "Hello, Alice!"]
```

### Class TabanlÃ„Â± Decorator'lar

```python
class CountCalls:
    """Bir fonksiyonun kaÃƒÂ§ kez ÃƒÂ§aÃ„Å¸rÃ„Â±ldÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± sayan decorator."""
    def __init__(self, func: Callable):
        functools.update_wrapper(self, func)
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"{self.func.__name__} has been called {self.count} times")
        return self.func(*args, **kwargs)

@CountCalls
def process():
    pass

# Her process() ÃƒÂ§aÃ„Å¸rÃ„Â±sÃ„Â± ÃƒÂ§aÃ„Å¸rÃ„Â± sayÃ„Â±sÃ„Â±nÃ„Â± yazdÃ„Â±rÃ„Â±r
```

## EÃ…Å¸zamanlÃ„Â±lÃ„Â±k Desenleri

### I/O-Bound GÃƒÂ¶revler iÃƒÂ§in Threading

```python
import concurrent.futures
import threading

def fetch_url(url: str) -> str:
    """Bir URL fetch et (I/O-bound operasyon)."""
    import urllib.request
    with urllib.request.urlopen(url) as response:
        return response.read().decode()

def fetch_all_urls(urls: list[str]) -> dict[str, str]:
    """Thread'ler kullanarak birden fazla URL'yi eÃ…Å¸zamanlÃ„Â± fetch et."""
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        future_to_url = {executor.submit(fetch_url, url): url for url in urls}
        results = {}
        for future in concurrent.futures.as_completed(future_to_url):
            url = future_to_url[future]
            try:
                results[url] = future.result()
            except Exception as e:
                results[url] = f"Error: {e}"
    return results
```

### CPU-Bound GÃƒÂ¶revler iÃƒÂ§in Multiprocessing

```python
def process_data(data: list[int]) -> int:
    """CPU-yoÃ„Å¸un hesaplama."""
    return sum(x ** 2 for x in data)

def process_all(datasets: list[list[int]]) -> list[int]:
    """Birden fazla process kullanarak birden fazla dataset iÃ…Å¸le."""
    with concurrent.futures.ProcessPoolExecutor() as executor:
        results = list(executor.map(process_data, datasets))
    return results
```

### EÃ…Å¸zamanlÃ„Â± I/O iÃƒÂ§in Async/Await

```python
import asyncio

async def fetch_async(url: str) -> str:
    """Asenkron olarak bir URL fetch et."""
    import aiohttp
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def fetch_all(urls: list[str]) -> dict[str, str]:
    """Birden fazla URL'yi eÃ…Å¸zamanlÃ„Â± fetch et."""
    tasks = [fetch_async(url) for url in urls]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return dict(zip(urls, results))
```

## Paket Organizasyonu

### Standart Proje DÃƒÂ¼zeni

```
myproject/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ src/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ mypackage/
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ main.py
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ api/
Ã¢â€â€š       Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š       Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ routes.py
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ models/
Ã¢â€â€š       Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š       Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ user.py
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ utils/
Ã¢â€â€š           Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š           Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ helpers.py
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ tests/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ conftest.py
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ test_api.py
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ test_models.py
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pyproject.toml
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ README.md
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ .gitignore
```

### Import KonvansiyonlarÃ„Â±

```python
# Ã„Â°yi: Import sÃ„Â±rasÃ„Â± - stdlib, third-party, local
import os
import sys
from pathlib import Path

import requests
from fastapi import FastAPI

from mypackage.models import User
from mypackage.utils import format_name

# Ã„Â°yi: Otomatik import sÃ„Â±ralama iÃƒÂ§in isort kullanÃ„Â±n
# pip install isort
```

### Paket Export'larÃ„Â± iÃƒÂ§in __init__.py

```python
# mypackage/__init__.py
"""mypackage - Ãƒâ€“rnek bir Python paketi."""

__version__ = "1.0.0"

# Ana class/fonksiyonlarÃ„Â± paket seviyesinde export et
from mypackage.models import User, Post
from mypackage.utils import format_name

__all__ = ["User", "Post", "format_name"]
```

## Bellek ve Performans

### Bellek VerimliliÃ„Å¸i iÃƒÂ§in __slots__ Kullanma

```python
# KÃƒÂ¶tÃƒÂ¼: Normal class __dict__ kullanÃ„Â±r (daha fazla bellek)
class Point:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

# Ã„Â°yi: __slots__ bellek kullanÃ„Â±mÃ„Â±nÃ„Â± azaltÃ„Â±r
class Point:
    __slots__ = ['x', 'y']

    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y
```

### BÃƒÂ¼yÃƒÂ¼k Veri iÃƒÂ§in Generator

```python
# KÃƒÂ¶tÃƒÂ¼: Bellekte tam liste dÃƒÂ¶ndÃƒÂ¼rÃƒÂ¼r
def read_lines(path: str) -> list[str]:
    with open(path) as f:
        return [line.strip() for line in f]

# Ã„Â°yi: SatÃ„Â±rlarÃ„Â± birer birer yield eder
def read_lines(path: str) -> Iterator[str]:
    with open(path) as f:
        for line in f:
            yield line.strip()
```

### DÃƒÂ¶ngÃƒÂ¼lerde String BirleÃ…Å¸tirmekten KaÃƒÂ§Ã„Â±nÃ„Â±n

```python
# KÃƒÂ¶tÃƒÂ¼: String immutability nedeniyle O(nÃ‚Â²)
result = ""
for item in items:
    result += str(item)

# Ã„Â°yi: join kullanarak O(n)
result = "".join(str(item) for item in items)

# Ã„Â°yi: OluÃ…Å¸turma iÃƒÂ§in StringIO kullanma
from io import StringIO

buffer = StringIO()
for item in items:
    buffer.write(str(item))
result = buffer.getvalue()
```

## Python Tooling Entegrasyonu

### Temel Komutlar

```bash
# Kod formatlama
black .
isort .

# Linting
ruff check .
pylint mypackage/

# Type checking
mypy .

# Test
pytest --cov=mypackage --cov-report=html

# GÃƒÂ¼venlik taramasÃ„Â±
bandit -r .

# Dependency yÃƒÂ¶netimi
pip-audit
safety check
```

### pyproject.toml YapÃ„Â±landÃ„Â±rmasÃ„Â±

```toml
[project]
name = "mypackage"
version = "1.0.0"
requires-python = ">=3.9"
dependencies = [
    "requests>=2.31.0",
    "pydantic>=2.0.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.4.0",
    "pytest-cov>=4.1.0",
    "black>=23.0.0",
    "ruff>=0.1.0",
    "mypy>=1.5.0",
]

[tool.black]
line-length = 88
target-version = ['py39']

[tool.ruff]
line-length = 88
select = ["E", "F", "I", "N", "W"]

[tool.mypy]
python_version = "3.9"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "--cov=mypackage --cov-report=term-missing"
```

## HÃ„Â±zlÃ„Â± Referans: Python Ã„Â°fadeleri

| Ã„Â°fade | AÃƒÂ§Ã„Â±klama |
|-------|----------|
| EAFP | Affederek Sormaktansa Ã„Â°zin Ã„Â°stemek Daha Kolay |
| Context manager'lar | Kaynak yÃƒÂ¶netimi iÃƒÂ§in `with` kullan |
| List comprehension'lar | Basit dÃƒÂ¶nÃƒÂ¼Ã…Å¸ÃƒÂ¼mler iÃƒÂ§in |
| Generator'lar | Lazy evaluation ve bÃƒÂ¼yÃƒÂ¼k dataset'ler iÃƒÂ§in |
| Type hint'ler | Fonksiyon signature'larÃ„Â±nÃ„Â± annotate et |
| Dataclass'lar | Auto-generated metodlarla veri container'larÃ„Â± iÃƒÂ§in |
| `__slots__` | Bellek optimizasyonu iÃƒÂ§in |
| f-string'ler | String formatlama iÃƒÂ§in (Python 3.6+) |
| `pathlib.Path` | Path operasyonlarÃ„Â± iÃƒÂ§in (Python 3.4+) |
| `enumerate` | DÃƒÂ¶ngÃƒÂ¼lerde index-element ÃƒÂ§iftleri iÃƒÂ§in |

## KaÃƒÂ§Ã„Â±nÃ„Â±lmasÃ„Â± Gereken Anti-Desenler

```python
# KÃƒÂ¶tÃƒÂ¼: Mutable default argÃƒÂ¼manlar
def append_to(item, items=[]):
    items.append(item)
    return items

# Ã„Â°yi: None kullan ve yeni liste oluÃ…Å¸tur
def append_to(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

# KÃƒÂ¶tÃƒÂ¼: type() ile tip kontrolÃƒÂ¼
if type(obj) == list:
    process(obj)

# Ã„Â°yi: isinstance kullan
if isinstance(obj, list):
    process(obj)

# KÃƒÂ¶tÃƒÂ¼: None ile == ile karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rma
if value == None:
    process()

# Ã„Â°yi: is kullan
if value is None:
    process()

# KÃƒÂ¶tÃƒÂ¼: from module import *
from os.path import *

# Ã„Â°yi: AÃƒÂ§Ã„Â±k import'lar
from os.path import join, exists

# KÃƒÂ¶tÃƒÂ¼: Bare except
try:
    risky_operation()
except:
    pass

# Ã„Â°yi: Spesifik exception
try:
    risky_operation()
except SpecificError as e:
    logger.error(f"Operation failed: {e}")
```

__UnutmayÃ„Â±n__: Python kodu okunabilir, aÃƒÂ§Ã„Â±k ve en az sÃƒÂ¼rpriz ilkesine uygun olmalÃ„Â±dÃ„Â±r. Ã…Å¾ÃƒÂ¼phe duyduÃ„Å¸unuzda, aÃƒÂ§Ã„Â±klÃ„Â±Ã„Å¸Ã„Â± zekiceden ÃƒÂ¶ncelikli kÃ„Â±lÃ„Â±n.
