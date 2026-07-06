---
name: python-testing
description: pytest, TDD metodolojisi, fixture'lar, mocking, parametrizasyon ve coverage gereksinimleri kullanarak Python test stratejileri.
origin: ECC
---

# Python Test Desenleri

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


pytest, TDD metodolojisi ve en iyi uygulamalar kullanarak Python uygulamalarÃ„Â± iÃƒÂ§in kapsamlÃ„Â± test stratejileri.

## Ne Zaman EtkinleÃ…Å¸tirmeli

- Yeni Python kodu yazarken (TDD'yi takip et: red, green, refactor)
- Python projeleri iÃƒÂ§in test suite'leri tasarlarken
- Python test coverage'Ã„Â±nÃ„Â± gÃƒÂ¶zden geÃƒÂ§irirken
- Test altyapÃ„Â±sÃ„Â±nÃ„Â± kurarken

## Temel Test Felsefesi

### Test-Driven Development (TDD)

Her zaman TDD dÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼nÃƒÂ¼ takip edin:

1. **RED**: Ã„Â°stenen davranÃ„Â±Ã…Å¸ iÃƒÂ§in baÃ…Å¸arÃ„Â±sÃ„Â±z bir test yaz
2. **GREEN**: Testi geÃƒÂ§irmek iÃƒÂ§in minimal kod yaz
3. **REFACTOR**: Testleri yeÃ…Å¸il tutarken kodu iyileÃ…Å¸tir

```python
# AdÃ„Â±m 1: BaÃ…Å¸arÃ„Â±sÃ„Â±z test yaz (RED)
def test_add_numbers():
    result = add(2, 3)
    assert result == 5

# AdÃ„Â±m 2: Minimal implementasyon yaz (GREEN)
def add(a, b):
    return a + b

# AdÃ„Â±m 3: Gerekirse refactor et (REFACTOR)
```

### Coverage Gereksinimleri

- **Hedef**: 80%+ kod coverage'Ã„Â±
- **Kritik yollar**: 100% coverage gereklidir
- Coverage'Ã„Â± ÃƒÂ¶lÃƒÂ§mek iÃƒÂ§in `pytest --cov` kullanÃ„Â±n

```bash
pytest --cov=mypackage --cov-report=term-missing --cov-report=html
```

## pytest Temelleri

### Temel Test YapÃ„Â±sÃ„Â±

```python
import pytest

def test_addition():
    """Temel toplama testi."""
    assert 2 + 2 == 4

def test_string_uppercase():
    """String bÃƒÂ¼yÃƒÂ¼k harf yapma testi."""
    text = "hello"
    assert text.upper() == "HELLO"

def test_list_append():
    """Liste append testi."""
    items = [1, 2, 3]
    items.append(4)
    assert 4 in items
    assert len(items) == 4
```

### Assertion'lar

```python
# EÃ…Å¸itlik
assert result == expected

# EÃ…Å¸itsizlik
assert result != unexpected

# DoÃ„Å¸ruluk deÃ„Å¸eri
assert result  # Truthy
assert not result  # Falsy
assert result is True  # Tam olarak True
assert result is False  # Tam olarak False
assert result is None  # Tam olarak None

# ÃƒÅ“yelik
assert item in collection
assert item not in collection

# KarÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rmalar
assert result > 0
assert 0 <= result <= 100

# Tip kontrolÃƒÂ¼
assert isinstance(result, str)

# Exception testi (tercih edilen yaklaÃ…Å¸Ã„Â±m)
with pytest.raises(ValueError):
    raise ValueError("error message")

# Exception mesajÃ„Â±nÃ„Â± kontrol et
with pytest.raises(ValueError, match="invalid input"):
    raise ValueError("invalid input provided")

# Exception niteliklerini kontrol et
with pytest.raises(ValueError) as exc_info:
    raise ValueError("error message")
assert str(exc_info.value) == "error message"
```

## Fixture'lar

### Temel Fixture KullanÃ„Â±mÃ„Â±

```python
import pytest

@pytest.fixture
def sample_data():
    """Ãƒâ€“rnek veri saÃ„Å¸layan fixture."""
    return {"name": "Alice", "age": 30}

def test_sample_data(sample_data):
    """Fixture kullanan test."""
    assert sample_data["name"] == "Alice"
    assert sample_data["age"] == 30
```

### Setup/Teardown ile Fixture

```python
@pytest.fixture
def database():
    """Setup ve teardown ile fixture."""
    # Setup
    db = Database(":memory:")
    db.create_tables()
    db.insert_test_data()

    yield db  # Teste saÃ„Å¸la

    # Teardown
    db.close()

def test_database_query(database):
    """VeritabanÃ„Â± operasyonlarÃ„Â±nÃ„Â± test et."""
    result = database.query("SELECT * FROM users")
    assert len(result) > 0
```

### Fixture Scope'larÃ„Â±

```python
# Function scope (varsayÃ„Â±lan) - her test iÃƒÂ§in ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r
@pytest.fixture
def temp_file():
    with open("temp.txt", "w") as f:
        yield f
    os.remove("temp.txt")

# Module scope - modÃƒÂ¼l baÃ…Å¸Ã„Â±na bir kez ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r
@pytest.fixture(scope="module")
def module_db():
    db = Database(":memory:")
    db.create_tables()
    yield db
    db.close()

# Session scope - test oturumu baÃ…Å¸Ã„Â±na bir kez ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r
@pytest.fixture(scope="session")
def shared_resource():
    resource = ExpensiveResource()
    yield resource
    resource.cleanup()
```

### Parametreli Fixture

```python
@pytest.fixture(params=[1, 2, 3])
def number(request):
    """Parametreli fixture."""
    return request.param

def test_numbers(number):
    """Test her parametre iÃƒÂ§in 3 kez ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r."""
    assert number > 0
```

### Birden Fazla Fixture Kullanma

```python
@pytest.fixture
def user():
    return User(id=1, name="Alice")

@pytest.fixture
def admin():
    return User(id=2, name="Admin", role="admin")

def test_user_admin_interaction(user, admin):
    """Birden fazla fixture kullanan test."""
    assert admin.can_manage(user)
```

### Autouse Fixture'larÃ„Â±

```python
@pytest.fixture(autouse=True)
def reset_config():
    """Her testten ÃƒÂ¶nce otomatik olarak ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r."""
    Config.reset()
    yield
    Config.cleanup()

def test_without_fixture_call():
    # reset_config otomatik olarak ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r
    assert Config.get_setting("debug") is False
```

### PaylaÃ…Å¸Ã„Â±lan Fixture'lar iÃƒÂ§in Conftest.py

```python
# tests/conftest.py
import pytest

@pytest.fixture
def client():
    """TÃƒÂ¼m testler iÃƒÂ§in paylaÃ…Å¸Ã„Â±lan fixture."""
    app = create_app(testing=True)
    with app.test_client() as client:
        yield client

@pytest.fixture
def auth_headers(client):
    """API testi iÃƒÂ§in auth header'larÃ„Â± oluÃ…Å¸tur."""
    response = client.post("/api/login", json={
        "username": "test",
        "password": "test"
    })
    token = response.json["token"]
    return {"Authorization": f"Bearer {token}"}
```

## Parametrizasyon

### Temel Parametrizasyon

```python
@pytest.mark.parametrize("input,expected", [
    ("hello", "HELLO"),
    ("world", "WORLD"),
    ("PyThOn", "PYTHON"),
])
def test_uppercase(input, expected):
    """Test farklÃ„Â± input'larla 3 kez ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r."""
    assert input.upper() == expected
```

### Birden Fazla Parametre

```python
@pytest.mark.parametrize("a,b,expected", [
    (2, 3, 5),
    (0, 0, 0),
    (-1, 1, 0),
    (100, 200, 300),
])
def test_add(a, b, expected):
    """Birden fazla input ile toplama testi."""
    assert add(a, b) == expected
```

### ID'li Parametrizasyon

```python
@pytest.mark.parametrize("input,expected", [
    ("valid@email.com", True),
    ("invalid", False),
    ("@no-domain.com", False),
], ids=["valid-email", "missing-at", "missing-domain"])
def test_email_validation(input, expected):
    """Okunabilir test ID'leri ile email validation testi."""
    assert is_valid_email(input) is expected
```

### Parametreli Fixture'lar

```python
@pytest.fixture(params=["sqlite", "postgresql", "mysql"])
def db(request):
    """Birden fazla veritabanÃ„Â± backend'ine karÃ…Å¸Ã„Â± test."""
    if request.param == "sqlite":
        return Database(":memory:")
    elif request.param == "postgresql":
        return Database("postgresql://localhost/test")
    elif request.param == "mysql":
        return Database("mysql://localhost/test")

def test_database_operations(db):
    """Test her veritabanÃ„Â± iÃƒÂ§in 3 kez ÃƒÂ§alÃ„Â±Ã…Å¸Ã„Â±r."""
    result = db.query("SELECT 1")
    assert result is not None
```

## Marker'lar ve Test SeÃƒÂ§imi

### Ãƒâ€“zel Marker'lar

```python
# YavaÃ…Å¸ testleri iÃ…Å¸aretle
@pytest.mark.slow
def test_slow_operation():
    time.sleep(5)

# Entegrasyon testlerini iÃ…Å¸aretle
@pytest.mark.integration
def test_api_integration():
    response = requests.get("https://api.example.com")
    assert response.status_code == 200

# Unit testleri iÃ…Å¸aretle
@pytest.mark.unit
def test_unit_logic():
    assert calculate(2, 3) == 5
```

### Belirli Testleri Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rma

```bash
# Sadece hÃ„Â±zlÃ„Â± testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest -m "not slow"

# Sadece entegrasyon testlerini ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest -m integration

# Entegrasyon veya yavaÃ…Å¸ testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest -m "integration or slow"

# Unit olarak iÃ…Å¸aretlenmiÃ…Å¸ ama yavaÃ…Å¸ olmayan testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest -m "unit and not slow"
```

### pytest.ini'de Marker'larÃ„Â± YapÃ„Â±landÃ„Â±rma

```ini
[pytest]
markers =
    slow: marks tests as slow
    integration: marks tests as integration tests
    unit: marks tests as unit tests
    django: marks tests as requiring Django
```

## Mocking ve Patching

### FonksiyonlarÃ„Â± Mocking

```python
from unittest.mock import patch, Mock

@patch("mypackage.external_api_call")
def test_with_mock(api_call_mock):
    """Mock'lanmÃ„Â±Ã…Å¸ harici API ile test."""
    api_call_mock.return_value = {"status": "success"}

    result = my_function()

    api_call_mock.assert_called_once()
    assert result["status"] == "success"
```

### DÃƒÂ¶nÃƒÂ¼Ã…Å¸ DeÃ„Å¸erlerini Mocking

```python
@patch("mypackage.Database.connect")
def test_database_connection(connect_mock):
    """Mock'lanmÃ„Â±Ã…Å¸ veritabanÃ„Â± baÃ„Å¸lantÃ„Â±sÃ„Â± ile test."""
    connect_mock.return_value = MockConnection()

    db = Database()
    db.connect()

    connect_mock.assert_called_once_with("localhost")
```

### Exception'larÃ„Â± Mocking

```python
@patch("mypackage.api_call")
def test_api_error_handling(api_call_mock):
    """Mock'lanmÃ„Â±Ã…Å¸ exception ile hata iÃ…Å¸leme testi."""
    api_call_mock.side_effect = ConnectionError("Network error")

    with pytest.raises(ConnectionError):
        api_call()

    api_call_mock.assert_called_once()
```

### Context Manager'larÃ„Â± Mocking

```python
@patch("builtins.open", new_callable=mock_open)
def test_file_reading(mock_file):
    """Mock'lanmÃ„Â±Ã…Å¸ open ile dosya okuma testi."""
    mock_file.return_value.read.return_value = "file content"

    result = read_file("test.txt")

    mock_file.assert_called_once_with("test.txt", "r")
    assert result == "file content"
```

### Autospec Kullanma

```python
@patch("mypackage.DBConnection", autospec=True)
def test_autospec(db_mock):
    """API yanlÃ„Â±Ã…Å¸ kullanÃ„Â±mÃ„Â±nÃ„Â± yakalamak iÃƒÂ§in autospec ile test."""
    db = db_mock.return_value
    db.query("SELECT * FROM users")

    # DBConnection query metodu yoksa bu baÃ…Å¸arÃ„Â±sÃ„Â±z olur
    db_mock.assert_called_once()
```

### Mock Class Instance'larÃ„Â±

```python
class TestUserService:
    @patch("mypackage.UserRepository")
    def test_create_user(self, repo_mock):
        """Mock'lanmÃ„Â±Ã…Å¸ repository ile kullanÃ„Â±cÃ„Â± oluÃ…Å¸turma testi."""
        repo_mock.return_value.save.return_value = User(id=1, name="Alice")

        service = UserService(repo_mock.return_value)
        user = service.create_user(name="Alice")

        assert user.name == "Alice"
        repo_mock.return_value.save.assert_called_once()
```

### Mock Property

```python
@pytest.fixture
def mock_config():
    """Property'li bir mock oluÃ…Å¸tur."""
    config = Mock()
    type(config).debug = PropertyMock(return_value=True)
    type(config).api_key = PropertyMock(return_value="test-key")
    return config

def test_with_mock_config(mock_config):
    """Mock'lanmÃ„Â±Ã…Å¸ config property'leri ile test."""
    assert mock_config.debug is True
    assert mock_config.api_key == "test-key"
```

## Asenkron Kodu Test Etme

### pytest-asyncio ile Asenkron Testler

```python
import pytest

@pytest.mark.asyncio
async def test_async_function():
    """Asenkron fonksiyon testi."""
    result = await async_add(2, 3)
    assert result == 5

@pytest.mark.asyncio
async def test_async_with_fixture(async_client):
    """Asenkron fixture ile asenkron test."""
    response = await async_client.get("/api/users")
    assert response.status_code == 200
```

### Asenkron Fixture

```python
@pytest.fixture
async def async_client():
    """Asenkron test client saÃ„Å¸layan asenkron fixture."""
    app = create_app()
    async with app.test_client() as client:
        yield client

@pytest.mark.asyncio
async def test_api_endpoint(async_client):
    """Asenkron fixture kullanan test."""
    response = await async_client.get("/api/data")
    assert response.status_code == 200
```

### Asenkron FonksiyonlarÃ„Â± Mocking

```python
@pytest.mark.asyncio
@patch("mypackage.async_api_call")
async def test_async_mock(api_call_mock):
    """Mock ile asenkron fonksiyon testi."""
    api_call_mock.return_value = {"status": "ok"}

    result = await my_async_function()

    api_call_mock.assert_awaited_once()
    assert result["status"] == "ok"
```

## Exception'larÃ„Â± Test Etme

### Beklenen Exception'larÃ„Â± Test Etme

```python
def test_divide_by_zero():
    """SÃ„Â±fÃ„Â±ra bÃƒÂ¶lmenin ZeroDivisionError raise ettiÃ„Å¸ini test et."""
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

def test_custom_exception():
    """Mesaj ile ÃƒÂ¶zel exception testi."""
    with pytest.raises(ValueError, match="invalid input"):
        validate_input("invalid")
```

### Exception Niteliklerini Test Etme

```python
def test_exception_with_details():
    """Ãƒâ€“zel niteliklerle exception testi."""
    with pytest.raises(CustomError) as exc_info:
        raise CustomError("error", code=400)

    assert exc_info.value.code == 400
    assert "error" in str(exc_info.value)
```

## Yan Etkileri Test Etme

### Dosya OperasyonlarÃ„Â±nÃ„Â± Test Etme

```python
import tempfile
import os

def test_file_processing():
    """GeÃƒÂ§ici dosya ile dosya iÃ…Å¸leme testi."""
    with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.txt') as f:
        f.write("test content")
        temp_path = f.name

    try:
        result = process_file(temp_path)
        assert result == "processed: test content"
    finally:
        os.unlink(temp_path)
```

### pytest'in tmp_path Fixture'Ã„Â± ile Test Etme

```python
def test_with_tmp_path(tmp_path):
    """pytest'in built-in geÃƒÂ§ici yol fixture'Ã„Â±nÃ„Â± kullanarak test."""
    test_file = tmp_path / "test.txt"
    test_file.write_text("hello world")

    result = process_file(str(test_file))
    assert result == "hello world"
    # tmp_path otomatik olarak temizlenir
```

### tmpdir Fixture ile Test Etme

```python
def test_with_tmpdir(tmpdir):
    """pytest'in tmpdir fixture'Ã„Â±nÃ„Â± kullanarak test."""
    test_file = tmpdir.join("test.txt")
    test_file.write("data")

    result = process_file(str(test_file))
    assert result == "data"
```

## Test Organizasyonu

### Dizin YapÃ„Â±sÃ„Â±

```
tests/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ conftest.py                 # PaylaÃ…Å¸Ã„Â±lan fixture'lar
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ unit/                       # Unit testler
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ test_models.py
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ test_utils.py
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ test_services.py
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ integration/                # Entegrasyon testleri
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ test_api.py
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ test_database.py
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ e2e/                        # End-to-end testler
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ test_user_flow.py
```

### Test Class'larÃ„Â±

```python
class TestUserService:
    """Ã„Â°lgili testleri bir class'ta grupla."""

    @pytest.fixture(autouse=True)
    def setup(self):
        """Bu class'taki her testten ÃƒÂ¶nce ÃƒÂ§alÃ„Â±Ã…Å¸an setup."""
        self.service = UserService()

    def test_create_user(self):
        """KullanÃ„Â±cÃ„Â± oluÃ…Å¸turma testi."""
        user = self.service.create_user("Alice")
        assert user.name == "Alice"

    def test_delete_user(self):
        """KullanÃ„Â±cÃ„Â± silme testi."""
        user = User(id=1, name="Bob")
        self.service.delete_user(user)
        assert not self.service.user_exists(1)
```

## En Ã„Â°yi Uygulamalar

### YAPIN

- **TDD'yi takip edin**: Koddan ÃƒÂ¶nce testleri yazÃ„Â±n (red-green-refactor)
- **Bir Ã…Å¸eyi test edin**: Her test tek bir davranÃ„Â±Ã…Å¸Ã„Â± doÃ„Å¸rulamalÃ„Â±
- **AÃƒÂ§Ã„Â±klayÃ„Â±cÃ„Â± isimler kullanÃ„Â±n**: `test_user_login_with_invalid_credentials_fails`
- **Fixture'larÃ„Â± kullanÃ„Â±n**: TekrarÃ„Â± fixture'larla ortadan kaldÃ„Â±rÃ„Â±n
- **Harici baÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±klarÃ„Â± mock'layÃ„Â±n**: Harici servislere baÃ„Å¸Ã„Â±mlÃ„Â± olmayÃ„Â±n
- **Kenar durumlarÃ„Â± test edin**: BoÃ…Å¸ input'lar, None deÃ„Å¸erleri, sÃ„Â±nÃ„Â±r koÃ…Å¸ullarÃ„Â±
- **%80+ coverage hedefleyin**: Kritik yollara odaklanÃ„Â±n
- **Testleri hÃ„Â±zlÃ„Â± tutun**: YavaÃ…Å¸ testleri ayÃ„Â±rmak iÃƒÂ§in marker'lar kullanÃ„Â±n

### YAPMAYIN

- **Ã„Â°mplementasyonu test etmeyin**: DavranÃ„Â±Ã…Å¸Ã„Â± test edin, iÃƒÂ§ yapÃ„Â±yÃ„Â± deÃ„Å¸il
- **Testlerde karmaÃ…Å¸Ã„Â±k koÃ…Å¸ullar kullanmayÃ„Â±n**: Testleri basit tutun
- **Test hatalarÃ„Â±nÃ„Â± gÃƒÂ¶z ardÃ„Â± etmeyin**: TÃƒÂ¼m testler geÃƒÂ§meli
- **Third-party kodu test etmeyin**: KÃƒÂ¼tÃƒÂ¼phanelerin ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±Ã„Å¸Ã„Â±na gÃƒÂ¼venin
- **Testler arasÃ„Â± state paylaÃ…Å¸mayÃ„Â±n**: Testler baÃ„Å¸Ã„Â±msÃ„Â±z olmalÃ„Â±
- **Testlerde exception yakalamayÃ„Â±n**: `pytest.raises` kullanÃ„Â±n
- **Print statement'larÃ„Â± kullanmayÃ„Â±n**: Assertion'larÃ„Â± ve pytest ÃƒÂ§Ã„Â±ktÃ„Â±sÃ„Â±nÃ„Â± kullanÃ„Â±n
- **Ãƒâ€¡ok kÃ„Â±rÃ„Â±lgan testler yazmayÃ„Â±n**: AÃ…Å¸Ã„Â±rÃ„Â± spesifik mock'lardan kaÃƒÂ§Ã„Â±nÃ„Â±n

## YaygÃ„Â±n Desenler

### API Endpoint'lerini Test Etme (FastAPI/Flask)

```python
@pytest.fixture
def client():
    app = create_app(testing=True)
    return app.test_client()

def test_get_user(client):
    response = client.get("/api/users/1")
    assert response.status_code == 200
    assert response.json["id"] == 1

def test_create_user(client):
    response = client.post("/api/users", json={
        "name": "Alice",
        "email": "alice@example.com"
    })
    assert response.status_code == 201
    assert response.json["name"] == "Alice"
```

### VeritabanÃ„Â± OperasyonlarÃ„Â±nÃ„Â± Test Etme

```python
@pytest.fixture
def db_session():
    """Test veritabanÃ„Â± oturumu oluÃ…Å¸tur."""
    session = Session(bind=engine)
    session.begin_nested()
    yield session
    session.rollback()
    session.close()

def test_create_user(db_session):
    user = User(name="Alice", email="alice@example.com")
    db_session.add(user)
    db_session.commit()

    retrieved = db_session.query(User).filter_by(name="Alice").first()
    assert retrieved.email == "alice@example.com"
```

### Class MetodlarÃ„Â±nÃ„Â± Test Etme

```python
class TestCalculator:
    @pytest.fixture
    def calculator(self):
        return Calculator()

    def test_add(self, calculator):
        assert calculator.add(2, 3) == 5

    def test_divide_by_zero(self, calculator):
        with pytest.raises(ZeroDivisionError):
            calculator.divide(10, 0)
```

## pytest YapÃ„Â±landÃ„Â±rmasÃ„Â±

### pytest.ini

```ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts =
    --strict-markers
    --disable-warnings
    --cov=mypackage
    --cov-report=term-missing
    --cov-report=html
markers =
    slow: marks tests as slow
    integration: marks tests as integration tests
    unit: marks tests as unit tests
```

### pyproject.toml

```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
python_classes = ["Test*"]
python_functions = ["test_*"]
addopts = [
    "--strict-markers",
    "--cov=mypackage",
    "--cov-report=term-missing",
    "--cov-report=html",
]
markers = [
    "slow: marks tests as slow",
    "integration: marks tests as integration tests",
    "unit: marks tests as unit tests",
]
```

## Testleri Ãƒâ€¡alÃ„Â±Ã…Å¸tÃ„Â±rma

```bash
# TÃƒÂ¼m testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest

# Belirli dosyayÃ„Â± ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest tests/test_utils.py

# Belirli testi ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest tests/test_utils.py::test_function

# Verbose ÃƒÂ§Ã„Â±ktÃ„Â± ile ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest -v

# Coverage ile ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest --cov=mypackage --cov-report=html

# Sadece hÃ„Â±zlÃ„Â± testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest -m "not slow"

# Ã„Â°lk hataya kadar ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest -x

# N hataya kadar ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest --maxfail=3

# Son baÃ…Å¸arÃ„Â±sÃ„Â±z testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest --lf

# Pattern ile testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest -k "test_user"

# Hatada debugger ile ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
pytest --pdb
```

## HÃ„Â±zlÃ„Â± Referans

| Desen | KullanÃ„Â±m |
|-------|----------|
| `pytest.raises()` | Beklenen exception'larÃ„Â± test et |
| `@pytest.fixture()` | Yeniden kullanÃ„Â±labilir test fixture'larÃ„Â± oluÃ…Å¸tur |
| `@pytest.mark.parametrize()` | Birden fazla input ile testleri ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r |
| `@pytest.mark.slow` | YavaÃ…Å¸ testleri iÃ…Å¸aretle |
| `pytest -m "not slow"` | YavaÃ…Å¸ testleri atla |
| `@patch()` | FonksiyonlarÃ„Â± ve class'larÃ„Â± mock'la |
| `tmp_path` fixture | Otomatik geÃƒÂ§ici dizin |
| `pytest --cov` | Coverage raporu oluÃ…Å¸tur |
| `assert` | Basit ve okunabilir assertion'lar |

**UnutmayÃ„Â±n**: Testler de koddur. Temiz, okunabilir ve bakÃ„Â±mÃ„Â± kolay tutun. Ã„Â°yi testler hata yakalar; harika testler hatalarÃ„Â± ÃƒÂ¶nler.
