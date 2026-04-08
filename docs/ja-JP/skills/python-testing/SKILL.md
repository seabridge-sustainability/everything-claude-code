---
name: python-testing
description: pytestÃ£â‚¬ÂTDDÃ¦â€°â€¹Ã¦Â³â€¢Ã£â‚¬ÂÃ£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£Ã£â‚¬ÂÃ£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£â‚¬ÂÃ£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Å’â€“Ã£â‚¬ÂÃ£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã¨Â¦ÂÃ¤Â»Â¶Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸PythonÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Ë†Â¦Ã§â€¢Â¥Ã£â‚¬â€š
---

# PythonÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


pytestÃ£â‚¬ÂTDDÃ¦â€“Â¹Ã¦Â³â€¢Ã¨Â«â€“Ã£â‚¬ÂÃ£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸PythonÃ£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ®Ã¥Å’â€¦Ã¦â€¹Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Ë†Â¦Ã§â€¢Â¥Ã£â‚¬â€š

## Ã£Ââ€žÃ£ÂÂ¤Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€¹

- Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žPythonÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ£ÂÂ¨Ã£ÂÂÃ¯Â¼Ë†TDDÃ£ÂÂ«Ã¥Â¾â€œÃ£Ââ€ Ã¯Â¼Å¡Ã¨ÂµÂ¤Ã£â‚¬ÂÃ§Â·â€˜Ã£â‚¬ÂÃ£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã¯Â¼â€°
- PythonÃ£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¹Ã£â€šÂ¤Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã¨Â¨Â­Ã¨Â¨Ë†Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- PythonÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ
- Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¢Ã£Æ’Â©Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’ÂÃ£Æ’Â£Ã£â€šâ€™Ã£â€šÂ»Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã£Ââ„¢Ã£â€šâ€¹Ã£ÂÂ¨Ã£ÂÂ

## Ã¦Â Â¸Ã£ÂÂ¨Ã£ÂÂªÃ£â€šâ€¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¥â€œÂ²Ã¥Â­Â¦

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢ÂºÃ¯Â¼Ë†TDDÃ¯Â¼â€°

Ã¥Â¸Â¸Ã£ÂÂ«TDDÃ£â€šÂµÃ£â€šÂ¤Ã£â€šÂ¯Ã£Æ’Â«Ã£ÂÂ«Ã¥Â¾â€œÃ£Ââ€žÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

1. **Ã¨ÂµÂ¤**: Ã¦Å“Å¸Ã¥Â¾â€¦Ã£Ââ€¢Ã£â€šÅ’Ã£â€šâ€¹Ã¥â€¹â€¢Ã¤Â½Å“Ã£ÂÂ®Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ„¢Ã£â€šâ€¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂ
2. **Ã§Â·â€˜**: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã©â‚¬Å¡Ã©ÂÅ½Ã£Ââ€¢Ã£Ââ€ºÃ£â€šâ€¹Ã£ÂÅ¸Ã£â€šÂÃ£ÂÂ®Ã¦Å“â‚¬Ã¥Â°ÂÃ©â„¢ÂÃ£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂ
3. **Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°**: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã©â‚¬Å¡Ã©ÂÅ½Ã£Ââ€¢Ã£Ââ€ºÃ£ÂÅ¸Ã£ÂÂ¾Ã£ÂÂ¾Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã¦â€Â¹Ã¥â€“â€žÃ£Ââ„¢Ã£â€šâ€¹

```python
# Step 1: Write failing test (RED)
def test_add_numbers():
    result = add(2, 3)
    assert result == 5

# Step 2: Write minimal implementation (GREEN)
def add(a, b):
    return a + b

# Step 3: Refactor if needed (REFACTOR)
```

### Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã¨Â¦ÂÃ¤Â»Â¶

- **Ã§â€ºÂ®Ã¦Â¨â„¢**: 80%Ã¤Â»Â¥Ã¤Â¸Å Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸
- **Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ«Ã£Æ’Â«Ã£Æ’â€˜Ã£â€šÂ¹**: 100%Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£ÂÅ’Ã¥Â¿â€¦Ã¨Â¦Â
- `pytest --cov`Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã¦Â¸Â¬Ã¥Â®Å¡

```bash
pytest --cov=mypackage --cov-report=term-missing --cov-report=html
```

## pytestÃ£ÂÂ®Ã¥Å¸ÂºÃ§Â¤Å½

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¦Â§â€¹Ã©â‚¬Â 

```python
import pytest

def test_addition():
    """Test basic addition."""
    assert 2 + 2 == 4

def test_string_uppercase():
    """Test string uppercasing."""
    text = "hello"
    assert text.upper() == "HELLO"

def test_list_append():
    """Test list append."""
    items = [1, 2, 3]
    items.append(4)
    assert 4 in items
    assert len(items) == 4
```

### Ã£â€šÂ¢Ã£â€šÂµÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

```python
# Equality
assert result == expected

# Inequality
assert result != unexpected

# Truthiness
assert result  # Truthy
assert not result  # Falsy
assert result is True  # Exactly True
assert result is False  # Exactly False
assert result is None  # Exactly None

# Membership
assert item in collection
assert item not in collection

# Comparisons
assert result > 0
assert 0 <= result <= 100

# Type checking
assert isinstance(result, str)

# Exception testing (preferred approach)
with pytest.raises(ValueError):
    raise ValueError("error message")

# Check exception message
with pytest.raises(ValueError, match="invalid input"):
    raise ValueError("invalid input provided")

# Check exception attributes
with pytest.raises(ValueError) as exc_info:
    raise ValueError("error message")
assert str(exc_info.value) == "error message"
```

## Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£Ã¤Â½Â¿Ã§â€Â¨

```python
import pytest

@pytest.fixture
def sample_data():
    """Fixture providing sample data."""
    return {"name": "Alice", "age": 30}

def test_sample_data(sample_data):
    """Test using the fixture."""
    assert sample_data["name"] == "Alice"
    assert sample_data["age"] == 30
```

### Ã£â€šÂ»Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”/Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¢Ã£Æ’â‚¬Ã£â€šÂ¦Ã£Æ’Â³Ã¤Â»ËœÃ£ÂÂÃ£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£

```python
@pytest.fixture
def database():
    """Fixture with setup and teardown."""
    # Setup
    db = Database(":memory:")
    db.create_tables()
    db.insert_test_data()

    yield db  # Provide to test

    # Teardown
    db.close()

def test_database_query(database):
    """Test database operations."""
    result = database.query("SELECT * FROM users")
    assert len(result) > 0
```

### Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£Ã£â€šÂ¹Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€”

```python
# Function scope (default) - runs for each test
@pytest.fixture
def temp_file():
    with open("temp.txt", "w") as f:
        yield f
    os.remove("temp.txt")

# Module scope - runs once per module
@pytest.fixture(scope="module")
def module_db():
    db = Database(":memory:")
    db.create_tables()
    yield db
    db.close()

# Session scope - runs once per test session
@pytest.fixture(scope="session")
def shared_resource():
    resource = ExpensiveResource()
    yield resource
    resource.cleanup()
```

### Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¤Â»ËœÃ£ÂÂÃ£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£

```python
@pytest.fixture(params=[1, 2, 3])
def number(request):
    """Parameterized fixture."""
    return request.param

def test_numbers(number):
    """Test runs 3 times, once for each parameter."""
    assert number > 0
```

### Ã¨Â¤â€¡Ã¦â€¢Â°Ã£ÂÂ®Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£Ã¤Â½Â¿Ã§â€Â¨

```python
@pytest.fixture
def user():
    return User(id=1, name="Alice")

@pytest.fixture
def admin():
    return User(id=2, name="Admin", role="admin")

def test_user_admin_interaction(user, admin):
    """Test using multiple fixtures."""
    assert admin.can_manage(user)
```

### Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¤Â½Â¿Ã§â€Â¨Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£

```python
@pytest.fixture(autouse=True)
def reset_config():
    """Automatically runs before every test."""
    Config.reset()
    yield
    Config.cleanup()

def test_without_fixture_call():
    # reset_config runs automatically
    assert Config.get_setting("debug") is False
```

### Ã¥â€¦Â±Ã¦Å“â€°Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£Ã§â€Â¨Ã£ÂÂ®Conftest.py

```python
# tests/conftest.py
import pytest

@pytest.fixture
def client():
    """Shared fixture for all tests."""
    app = create_app(testing=True)
    with app.test_client() as client:
        yield client

@pytest.fixture
def auth_headers(client):
    """Generate auth headers for API testing."""
    response = client.post("/api/login", json={
        "username": "test",
        "password": "test"
    })
    token = response.json["token"]
    return {"Authorization": f"Bearer {token}"}
```

## Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Å’â€“

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Å’â€“

```python
@pytest.mark.parametrize("input,expected", [
    ("hello", "HELLO"),
    ("world", "WORLD"),
    ("PyThOn", "PYTHON"),
])
def test_uppercase(input, expected):
    """Test runs 3 times with different inputs."""
    assert input.upper() == expected
```

### Ã¨Â¤â€¡Ã¦â€¢Â°Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿

```python
@pytest.mark.parametrize("a,b,expected", [
    (2, 3, 5),
    (0, 0, 0),
    (-1, 1, 0),
    (100, 200, 300),
])
def test_add(a, b, expected):
    """Test addition with multiple inputs."""
    assert add(a, b) == expected
```

### IDÃ¤Â»ËœÃ£ÂÂÃ£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Å’â€“

```python
@pytest.mark.parametrize("input,expected", [
    ("valid@email.com", True),
    ("invalid", False),
    ("@no-domain.com", False),
], ids=["valid-email", "missing-at", "missing-domain"])
def test_email_validation(input, expected):
    """Test email validation with readable test IDs."""
    assert is_valid_email(input) is expected
```

### Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Å’â€“Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£

```python
@pytest.fixture(params=["sqlite", "postgresql", "mysql"])
def db(request):
    """Test against multiple database backends."""
    if request.param == "sqlite":
        return Database(":memory:")
    elif request.param == "postgresql":
        return Database("postgresql://localhost/test")
    elif request.param == "mysql":
        return Database("mysql://localhost/test")

def test_database_operations(db):
    """Test runs 3 times, once for each database."""
    result = db.query("SELECT 1")
    assert result is not None
```

## Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ«Ã£Æ’Â¼Ã£ÂÂ¨Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©ÂÂ¸Ã¦Å Å¾

### Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ«Ã£Æ’Â¼

```python
# Mark slow tests
@pytest.mark.slow
def test_slow_operation():
    time.sleep(5)

# Mark integration tests
@pytest.mark.integration
def test_api_integration():
    response = requests.get("https://api.example.com")
    assert response.status_code == 200

# Mark unit tests
@pytest.mark.unit
def test_unit_logic():
    assert calculate(2, 3) == 5
```

### Ã§â€°Â¹Ã¥Â®Å¡Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’

```bash
# Run only fast tests
pytest -m "not slow"

# Run only integration tests
pytest -m integration

# Run integration or slow tests
pytest -m "integration or slow"

# Run tests marked as unit but not slow
pytest -m "unit and not slow"
```

### pytest.iniÃ£ÂÂ§Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ«Ã£Æ’Â¼Ã£â€šâ€™Ã¨Â¨Â­Ã¥Â®Å¡

```ini
[pytest]
markers =
    slow: marks tests as slow
    integration: marks tests as integration tests
    unit: marks tests as unit tests
    django: marks tests as requiring Django
```

## Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£ÂÂ¨Ã£Æ’â€˜Ã£Æ’Æ’Ã£Æ’Â

### Ã©â€“Â¢Ã¦â€¢Â°Ã£ÂÂ®Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯

```python
from unittest.mock import patch, Mock

@patch("mypackage.external_api_call")
def test_with_mock(api_call_mock):
    """Test with mocked external API."""
    api_call_mock.return_value = {"status": "success"}

    result = my_function()

    api_call_mock.assert_called_once()
    assert result["status"] == "success"
```

### Ã¦Ë†Â»Ã£â€šÅ Ã¥â‚¬Â¤Ã£ÂÂ®Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯

```python
@patch("mypackage.Database.connect")
def test_database_connection(connect_mock):
    """Test with mocked database connection."""
    connect_mock.return_value = MockConnection()

    db = Database()
    db.connect()

    connect_mock.assert_called_once_with("localhost")
```

### Ã¤Â¾â€¹Ã¥Â¤â€“Ã£ÂÂ®Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯

```python
@patch("mypackage.api_call")
def test_api_error_handling(api_call_mock):
    """Test error handling with mocked exception."""
    api_call_mock.side_effect = ConnectionError("Network error")

    with pytest.raises(ConnectionError):
        api_call()

    api_call_mock.assert_called_once()
```

### Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Å¾Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â£Ã£ÂÂ®Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯

```python
@patch("builtins.open", new_callable=mock_open)
def test_file_reading(mock_file):
    """Test file reading with mocked open."""
    mock_file.return_value.read.return_value = "file content"

    result = read_file("test.txt")

    mock_file.assert_called_once_with("test.txt", "r")
    assert result == "file content"
```

### AutospecÃ¤Â½Â¿Ã§â€Â¨

```python
@patch("mypackage.DBConnection", autospec=True)
def test_autospec(db_mock):
    """Test with autospec to catch API misuse."""
    db = db_mock.return_value
    db.query("SELECT * FROM users")

    # This would fail if DBConnection doesn't have query method
    db_mock.assert_called_once()
```

### Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¹Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â³Ã£â€šÂ¹Ã£ÂÂ®Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯

```python
class TestUserService:
    @patch("mypackage.UserRepository")
    def test_create_user(self, repo_mock):
        """Test user creation with mocked repository."""
        repo_mock.return_value.save.return_value = User(id=1, name="Alice")

        service = UserService(repo_mock.return_value)
        user = service.create_user(name="Alice")

        assert user.name == "Alice"
        repo_mock.return_value.save.assert_called_once()
```

### Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’â€˜Ã£Æ’â€ Ã£â€šÂ£Ã£ÂÂ®Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯

```python
@pytest.fixture
def mock_config():
    """Create a mock with a property."""
    config = Mock()
    type(config).debug = PropertyMock(return_value=True)
    type(config).api_key = PropertyMock(return_value="test-key")
    return config

def test_with_mock_config(mock_config):
    """Test with mocked config properties."""
    assert mock_config.debug is True
    assert mock_config.api_key == "test-key"
```

## Ã©ÂÅ¾Ã¥ÂÅ’Ã¦Å“Å¸Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### pytest-asyncioÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸Ã©ÂÅ¾Ã¥ÂÅ’Ã¦Å“Å¸Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```python
import pytest

@pytest.mark.asyncio
async def test_async_function():
    """Test async function."""
    result = await async_add(2, 3)
    assert result == 5

@pytest.mark.asyncio
async def test_async_with_fixture(async_client):
    """Test async with async fixture."""
    response = await async_client.get("/api/users")
    assert response.status_code == 200
```

### Ã©ÂÅ¾Ã¥ÂÅ’Ã¦Å“Å¸Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£

```python
@pytest.fixture
async def async_client():
    """Async fixture providing async test client."""
    app = create_app()
    async with app.test_client() as client:
        yield client

@pytest.mark.asyncio
async def test_api_endpoint(async_client):
    """Test using async fixture."""
    response = await async_client.get("/api/data")
    assert response.status_code == 200
```

### Ã©ÂÅ¾Ã¥ÂÅ’Ã¦Å“Å¸Ã©â€“Â¢Ã¦â€¢Â°Ã£ÂÂ®Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯

```python
@pytest.mark.asyncio
@patch("mypackage.async_api_call")
async def test_async_mock(api_call_mock):
    """Test async function with mock."""
    api_call_mock.return_value = {"status": "ok"}

    result = await my_async_function()

    api_call_mock.assert_awaited_once()
    assert result["status"] == "ok"
```

## Ã¤Â¾â€¹Ã¥Â¤â€“Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### Ã¦Å“Å¸Ã¥Â¾â€¦Ã£Ââ€¢Ã£â€šÅ’Ã£â€šâ€¹Ã¤Â¾â€¹Ã¥Â¤â€“Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```python
def test_divide_by_zero():
    """Test that dividing by zero raises ZeroDivisionError."""
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

def test_custom_exception():
    """Test custom exception with message."""
    with pytest.raises(ValueError, match="invalid input"):
        validate_input("invalid")
```

### Ã¤Â¾â€¹Ã¥Â¤â€“Ã¥Â±Å¾Ã¦â‚¬Â§Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```python
def test_exception_with_details():
    """Test exception with custom attributes."""
    with pytest.raises(CustomError) as exc_info:
        raise CustomError("error", code=400)

    assert exc_info.value.code == 400
    assert "error" in str(exc_info.value)
```

## Ã¥â€°Â¯Ã¤Â½Å“Ã§â€Â¨Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¦â€œÂÃ¤Â½Å“Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```python
import tempfile
import os

def test_file_processing():
    """Test file processing with temp file."""
    with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.txt') as f:
        f.write("test content")
        temp_path = f.name

    try:
        result = process_file(temp_path)
        assert result == "processed: test content"
    finally:
        os.unlink(temp_path)
```

### pytestÃ£ÂÂ®tmp_pathÃ£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```python
def test_with_tmp_path(tmp_path):
    """Test using pytest's built-in temp path fixture."""
    test_file = tmp_path / "test.txt"
    test_file.write_text("hello world")

    result = process_file(str(test_file))
    assert result == "hello world"
    # tmp_path automatically cleaned up
```

### tmpdirÃ£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÅ¸Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```python
def test_with_tmpdir(tmpdir):
    """Test using pytest's tmpdir fixture."""
    test_file = tmpdir.join("test.txt")
    test_file.write("data")

    result = process_file(str(test_file))
    assert result == "data"
```

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¦â€¢Â´Ã§Ââ€ 

### Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â¬Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’ÂªÃ¦Â§â€¹Ã©â‚¬Â 

```
tests/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ conftest.py                 # Ã¥â€¦Â±Ã¦Å“â€°Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ unit/                       # Ã£Æ’Â¦Ã£Æ’â€¹Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ test_models.py
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ test_utils.py
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ test_services.py
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ integration/                # Ã§ÂµÂ±Ã¥ÂË†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ test_api.py
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ test_database.py
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ e2e/                        # Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’â€žÃ£Æ’Â¼Ã£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ test_user_flow.py
```

### Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¹

```python
class TestUserService:
    """Group related tests in a class."""

    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup runs before each test in this class."""
        self.service = UserService()

    def test_create_user(self):
        """Test user creation."""
        user = self.service.create_user("Alice")
        assert user.name == "Alice"

    def test_delete_user(self):
        """Test user deletion."""
        user = User(id=1, name="Bob")
        self.service.delete_user(user)
        assert not self.service.user_exists(1)
```

## Ã£Æ’â„¢Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ¯Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¹

### Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂÃ£Ââ€œÃ£ÂÂ¨

- **TDDÃ£ÂÂ«Ã¥Â¾â€œÃ£Ââ€ **: Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ®Ã¥â€°ÂÃ£ÂÂ«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂÃ¯Â¼Ë†Ã¨ÂµÂ¤-Ã§Â·â€˜-Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã¯Â¼â€°
- **Ã¤Â¸â‚¬Ã£ÂÂ¤Ã£ÂÂ®Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†**: Ã¥Ââ€žÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã¥ÂËœÃ¤Â¸â‚¬Ã£ÂÂ®Ã¥â€¹â€¢Ã¤Â½Å“Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ
- **Ã¨ÂªÂ¬Ã¦ËœÅ½Ã§Å¡â€žÃ£ÂÂªÃ¥ÂÂÃ¥â€°ÂÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨**: `test_user_login_with_invalid_credentials_fails`
- **Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨**: Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£Ã£ÂÂ§Ã©â€¡ÂÃ¨Â¤â€¡Ã£â€šâ€™Ã¦Å½â€™Ã©â„¢Â¤
- **Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¥Â­ËœÃ£â€šâ€™Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯**: Ã¥Â¤â€“Ã©Æ’Â¨Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€œÃ£â€šÂ¹Ã£ÂÂ«Ã¤Â¾ÂÃ¥Â­ËœÃ£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- **Ã£â€šÂ¨Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†**: Ã§Â©ÂºÃ£ÂÂ®Ã¥â€¦Â¥Ã¥Å â€ºÃ£â‚¬ÂNoneÃ¥â‚¬Â¤Ã£â‚¬ÂÃ¥Â¢Æ’Ã§â€¢Å’Ã¦ÂÂ¡Ã¤Â»Â¶
- **80%Ã¤Â»Â¥Ã¤Â¸Å Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£â€šâ€™Ã§â€ºÂ®Ã¦Å’â€¡Ã£Ââ„¢**: Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šÂ«Ã£Æ’Â«Ã£Æ’â€˜Ã£â€šÂ¹Ã£ÂÂ«Ã§â€žÂ¦Ã§â€šÂ¹Ã£â€šâ€™Ã¥Â½â€œÃ£ÂÂ¦Ã£â€šâ€¹
- **Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã©Â«ËœÃ©â‚¬Å¸Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¤**: Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã©Ââ€¦Ã£Ââ€žÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Ë†â€ Ã©â€ºÂ¢

### Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂ¯Ã£Ââ€žÃ£Ââ€˜Ã£ÂÂªÃ£Ââ€žÃ£Ââ€œÃ£ÂÂ¨

- **Ã¥Â®Å¸Ã¨Â£â€¦Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: Ã¥â€ â€¦Ã©Æ’Â¨Ã£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ¥â€¹â€¢Ã¤Â½Å“Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
- **Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ§Ã¨Â¤â€¡Ã©â€ºâ€˜Ã£ÂÂªÃ¦ÂÂ¡Ã¤Â»Â¶Ã¦â€“â€¡Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ·Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â«Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¤
- **Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¥Â¤Â±Ã¦â€¢â€”Ã£â€šâ€™Ã§â€žÂ¡Ã¨Â¦â€“Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã©â‚¬Å¡Ã©ÂÅ½Ã£Ââ„¢Ã£â€šâ€¹Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÅ’Ã£Ââ€šÃ£â€šâ€¹
- **Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’â€°Ã£Æ’â€˜Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â€“Ã£Æ’Â©Ã£Æ’ÂªÃ£ÂÅ’Ã¦Â©Å¸Ã¨Æ’Â½Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€œÃ£ÂÂ¨Ã£â€šâ€™Ã¤Â¿Â¡Ã©Â Â¼
- **Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©â€“â€œÃ£ÂÂ§Ã§Å Â¶Ã¦â€¦â€¹Ã£â€šâ€™Ã¥â€¦Â±Ã¦Å“â€°Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã§â€¹Â¬Ã§Â«â€¹Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ
- **Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ§Ã¤Â¾â€¹Ã¥Â¤â€“Ã£â€šâ€™Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£Æ’ÂÃ£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: `pytest.raises`Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- **printÃ¦â€“â€¡Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž**: Ã£â€šÂ¢Ã£â€šÂµÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ¨pytestÃ£ÂÂ®Ã¥â€¡ÂºÃ¥Å â€ºÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- **Ã¨â€žâ€ Ã¥Â¼Â±Ã£Ââ„¢Ã£ÂÅ½Ã£â€šâ€¹Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£Ââ€¹Ã£ÂÂªÃ£Ââ€ž**: Ã©ÂÅ½Ã¥ÂºÂ¦Ã£ÂÂ«Ã¥â€¦Â·Ã¤Â½â€œÃ§Å¡â€žÃ£ÂÂªÃ£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šâ€™Ã©ÂÂ¿Ã£Ââ€˜Ã£â€šâ€¹

## Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Å¡â€žÃ£ÂÂªÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### APIÃ£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã¯Â¼Ë†FastAPI/FlaskÃ¯Â¼â€°

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

### Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã¦â€œÂÃ¤Â½Å“Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

```python
@pytest.fixture
def db_session():
    """Create a test database session."""
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

### Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¹Ã£Æ’Â¡Ã£â€šÂ½Ã£Æ’Æ’Ã£Æ’â€°Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

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

## pytestÃ¨Â¨Â­Ã¥Â®Å¡

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

## Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¥Â®Å¸Ã¨Â¡Å’

```bash
# Run all tests
pytest

# Run specific file
pytest tests/test_utils.py

# Run specific test
pytest tests/test_utils.py::test_function

# Run with verbose output
pytest -v

# Run with coverage
pytest --cov=mypackage --cov-report=html

# Run only fast tests
pytest -m "not slow"

# Run until first failure
pytest -x

# Run and stop on N failures
pytest --maxfail=3

# Run last failed tests
pytest --lf

# Run tests with pattern
pytest -k "test_user"

# Run with debugger on failure
pytest --pdb
```

## Ã£â€šÂ¯Ã£â€šÂ¤Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£Æ’Â¬Ã£Æ’Â³Ã£â€šÂ¹

| Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³ | Ã¤Â½Â¿Ã§â€Â¨Ã¦Â³â€¢ |
|---------|-------|
| `pytest.raises()` | Ã¦Å“Å¸Ã¥Â¾â€¦Ã£Ââ€¢Ã£â€šÅ’Ã£â€šâ€¹Ã¤Â¾â€¹Ã¥Â¤â€“Ã£â€šâ€™Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë† |
| `@pytest.fixture()` | Ã¥â€ ÂÃ¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â |
| `@pytest.mark.parametrize()` | Ã¨Â¤â€¡Ã¦â€¢Â°Ã£ÂÂ®Ã¥â€¦Â¥Ã¥Å â€ºÃ£ÂÂ§Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’ |
| `@pytest.mark.slow` | Ã©Ââ€¦Ã£Ââ€žÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯ |
| `pytest -m "not slow"` | Ã©Ââ€¦Ã£Ââ€žÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Æ’Ã£Æ’â€” |
| `@patch()` | Ã©â€“Â¢Ã¦â€¢Â°Ã£ÂÂ¨Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¹Ã£â€šâ€™Ã£Æ’Â¢Ã£Æ’Æ’Ã£â€šÂ¯ |
| `tmp_path`Ã£Æ’â€¢Ã£â€šÂ£Ã£â€šÂ¯Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â£ | Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¤Â¸â‚¬Ã¦â„¢â€šÃ£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â¬Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’Âª |
| `pytest --cov` | Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸Ã£Æ’Â¬Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã§â€Å¸Ã¦Ë†Â |
| `assert` | Ã£â€šÂ·Ã£Æ’Â³Ã£Æ’â€”Ã£Æ’Â«Ã£ÂÂ§Ã¨ÂªÂ­Ã£ÂÂ¿Ã£â€šâ€žÃ£Ââ„¢Ã£Ââ€žÃ£â€šÂ¢Ã£â€šÂµÃ£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³ |

**Ã¨Â¦Å¡Ã£ÂË†Ã£ÂÂ¦Ã£ÂÅ Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž**: Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€šÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€šÃ£ÂÂÃ£â€šÅ’Ã£â€šâ€°Ã£â€šâ€™Ã£â€šÂ¯Ã£Æ’ÂªÃ£Æ’Â¼Ã£Æ’Â³Ã£ÂÂ§Ã£â‚¬ÂÃ¨ÂªÂ­Ã£ÂÂ¿Ã£â€šâ€žÃ£Ââ„¢Ã£ÂÂÃ£â‚¬ÂÃ¤Â¿ÂÃ¥Â®Ë†Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¡Ã£ÂÂ¾Ã£Ââ€”Ã£â€šâ€¡Ã£Ââ€ Ã£â‚¬â€šÃ¨â€°Â¯Ã£Ââ€žÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã£Æ’ÂÃ£â€šÂ°Ã£â€šâ€™Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Æ’Ã£Æ’ÂÃ£Ââ€”Ã£â‚¬ÂÃ¥â€žÂªÃ£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯Ã£ÂÂÃ£â€šÅ’Ã£â€šâ€°Ã£â€šâ€™Ã©ËœÂ²Ã£ÂÅ½Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
