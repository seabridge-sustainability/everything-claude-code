---
description: Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žPythonÃ¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Å’Ã§Â¡Â®Ã¤Â¿ÂÃ§Â¬Â¦Ã¥ÂË†PEP 8Ã¦Â â€¡Ã¥â€¡â€ Ã£â‚¬ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¦ÂÂÃ§Â¤ÂºÃ£â‚¬ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¤Â»Â¥Ã¥ÂÅ PythonicÃ¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢Ã£â‚¬â€šÃ¨Â°Æ’Ã§â€Â¨python-reviewerÃ¤Â»Â£Ã§Ââ€ Ã£â‚¬â€š
---

# Python Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨ **python-reviewer** Ã¤Â»Â£Ã§Ââ€ Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž Python Ã¤Â¸â€œÃ©Â¡Â¹Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¥Å Å¸Ã¨Æ’Â½

1. **Ã¨Â¯â€ Ã¥Ë†Â« Python Ã¥ÂËœÃ¦â€ºÂ´**Ã¯Â¼Å¡Ã©â‚¬Å¡Ã¨Â¿â€¡ `git diff` Ã¦Å¸Â¥Ã¦â€°Â¾Ã¤Â¿Â®Ã¦â€Â¹Ã¨Â¿â€¡Ã§Å¡â€ž `.py` Ã¦â€“â€¡Ã¤Â»Â¶
2. **Ã¨Â¿ÂÃ¨Â¡Å’Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾Â**Ã¯Â¼Å¡Ã¦â€°Â§Ã¨Â¡Å’ `ruff`Ã£â‚¬Â`mypy`Ã£â‚¬Â`pylint`Ã£â‚¬Â`black --check`
3. **Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ**Ã¯Â¼Å¡Ã¦Â£â‚¬Ã¦Å¸Â¥ SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã£â‚¬ÂÃ¥â€˜Â½Ã¤Â»Â¤Ã¦Â³Â¨Ã¥â€¦Â¥Ã£â‚¬ÂÃ¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¥ÂÂÃ¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“
4. **Ã§Â±Â»Ã¥Å¾â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Â®Â¡Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã¥Ë†â€ Ã¦Å¾ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¦ÂÂÃ§Â¤ÂºÃ¥â€™Å’ mypy Ã©â€â„¢Ã¨Â¯Â¯
5. **Pythonic Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã©ÂªÅ’Ã¨Â¯ÂÃ¤Â»Â£Ã§Â ÂÃ¦ËœÂ¯Ã¥ÂÂ¦Ã©ÂÂµÃ¥Â¾Âª PEP 8 Ã¥â€™Å’ Python Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ
6. **Ã§â€Å¸Ã¦Ë†ÂÃ¦Å Â¥Ã¥â€˜Å **Ã¯Â¼Å¡Ã¦Å’â€°Ã¤Â¸Â¥Ã©â€¡ÂÃ§Â¨â€¹Ã¥ÂºÂ¦Ã¥Â¯Â¹Ã©â€”Â®Ã©Â¢ËœÃ¨Â¿â€ºÃ¨Â¡Å’Ã¥Â½â€™Ã§Â±Â»

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶Ã¦Å“Âº

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â½Â¿Ã§â€Â¨ `/python-review`Ã¯Â¼Å¡

* Ã§Â¼â€“Ã¥â€ â„¢Ã¦Ë†â€“Ã¤Â¿Â®Ã¦â€Â¹ Python Ã¤Â»Â£Ã§Â ÂÃ¥ÂÅ½
* Ã¦ÂÂÃ¤ÂºÂ¤ Python Ã¥ÂËœÃ¦â€ºÂ´Ã¥â€°Â
* Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥Å’â€¦Ã¥ÂÂ« Python Ã¤Â»Â£Ã§Â ÂÃ§Å¡â€žÃ¦â€¹â€°Ã¥Ââ€“Ã¨Â¯Â·Ã¦Â±â€šÃ¦â€”Â¶
* Ã¦Å½Â¥Ã¦â€°â€¹Ã¦â€“Â°Ã§Å¡â€ž Python Ã¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ¦â€”Â¶
* Ã¥Â­Â¦Ã¤Â¹Â  Pythonic Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥â€™Å’Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢Ã¦â€”Â¶

## Ã¥Â®Â¡Ã¦Å¸Â¥Ã§Â±Â»Ã¥Ë†Â«

### Ã¥â€¦Â³Ã©â€Â® (Ã¥Â¿â€¦Ã©Â¡Â»Ã¤Â¿Â®Ã¥Â¤Â)

* SQL/Ã¥â€˜Â½Ã¤Â»Â¤Ã¦Â³Â¨Ã¥â€¦Â¥Ã¦Â¼ÂÃ¦Â´Å¾
* Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€ž eval/exec Ã¤Â½Â¿Ã§â€Â¨
* Pickle Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¥ÂÂÃ¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“
* Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ§Å¡â€žÃ¥â€¡Â­Ã¨Â¯Â
* YAML Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¥Å Â Ã¨Â½Â½
* Ã©Å¡ÂÃ¨â€”ÂÃ©â€â„¢Ã¨Â¯Â¯Ã§Å¡â€žÃ¨Â£Â¸ except Ã¥Â­ÂÃ¥ÂÂ¥

### Ã©Â«Ëœ (Ã¥Âºâ€Ã¨Â¯Â¥Ã¤Â¿Â®Ã¥Â¤Â)

* Ã¥â€¦Â¬Ã¥â€¦Â±Ã¥â€¡Â½Ã¦â€¢Â°Ã§Â¼ÂºÃ¥Â°â€˜Ã§Â±Â»Ã¥Å¾â€¹Ã¦ÂÂÃ§Â¤Âº
* Ã¥ÂÂ¯Ã¥ÂËœÃ©Â»ËœÃ¨Â®Â¤Ã¥Ââ€šÃ¦â€¢Â°
* Ã©Ââ„¢Ã©Â»ËœÃ¥ÂÅ¾Ã¦Å½â€°Ã¥Â¼â€šÃ¥Â¸Â¸
* Ã¦Å“ÂªÃ¥Â¯Â¹Ã¨Âµâ€žÃ¦ÂºÂÃ¤Â½Â¿Ã§â€Â¨Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨
* Ã¤Â½Â¿Ã§â€Â¨ C Ã©Â£Å½Ã¦Â Â¼Ã¥Â¾ÂªÃ§Å½Â¯Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦Å½Â¨Ã¥Â¯Â¼Ã¥Â¼Â
* Ã¤Â½Â¿Ã§â€Â¨ type() Ã¨â‚¬Å’Ã©ÂÅ¾ isinstance()
* Ã¦â€”Â Ã©â€ÂÃ§Å¡â€žÃ§Â«Å¾Ã¦â‚¬ÂÃ¦ÂÂ¡Ã¤Â»Â¶

### Ã¤Â¸Â­ (Ã¨â‚¬Æ’Ã¨â„¢â€˜)

* Ã¨Â¿ÂÃ¥ÂÂ PEP 8 Ã¦Â Â¼Ã¥Â¼ÂÃ¨Â§â€žÃ¨Å’Æ’
* Ã¥â€¦Â¬Ã¥â€¦Â±Ã¥â€¡Â½Ã¦â€¢Â°Ã§Â¼ÂºÃ¥Â°â€˜Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²
* Ã¤Â½Â¿Ã§â€Â¨ print Ã¨Â¯Â­Ã¥ÂÂ¥Ã¨â‚¬Å’Ã©ÂÅ¾ logging
* Ã¤Â½Å½Ã¦â€¢Ë†Ã§Å¡â€žÃ¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¦â€œÂÃ¤Â½Å“
* Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã¥â€˜Â½Ã¥ÂÂÃ¥Â¸Â¸Ã©â€¡ÂÃ§Å¡â€žÃ©Â­â€Ã¦Â³â€¢Ã¦â€¢Â°Ã¥Â­â€”
* Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨ f-strings Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“
* Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ¥Ë†â€”Ã¨Â¡Â¨Ã¥Ë†â€ºÃ¥Â»Âº

## Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦Â£â‚¬Ã¦Å¸Â¥

```bash
# Type checking
mypy .

# Linting and formatting
ruff check .
black --check .
isort --check-only .

# Security scanning
bandit -r .

# Dependency audit
pip-audit
safety check

# Testing
pytest --cov=app --cov-report=term-missing
```

## Ã¤Â½Â¿Ã§â€Â¨Ã§Â¤ÂºÃ¤Â¾â€¹

````text
User: /python-review

Agent:
# Python Code Review Report

## Files Reviewed
- app/routes/user.py (modified)
- app/services/auth.py (modified)

## Static Analysis Results
Ã¢Å“â€œ ruff: No issues
Ã¢Å“â€œ mypy: No errors
WARNING: black: 2 files need reformatting
Ã¢Å“â€œ bandit: No security issues

## Issues Found

[CRITICAL] SQL Injection vulnerability
File: app/routes/user.py:42
Issue: User input directly interpolated into SQL query
```python
query = f"SELECT * FROM users WHERE id = {user_id}"  # Bad
````

Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â¯Â¢

```python
query = "SELECT * FROM users WHERE id = %s"  # Good
cursor.execute(query, (user_id,))
```

\[Ã©Â«Ëœ] Ã¥ÂÂ¯Ã¥ÂËœÃ©Â»ËœÃ¨Â®Â¤Ã¥Ââ€šÃ¦â€¢Â°
Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡app/services/auth.py:18
Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å¡Ã¥ÂÂ¯Ã¥ÂËœÃ©Â»ËœÃ¨Â®Â¤Ã¥Ââ€šÃ¦â€¢Â°Ã¥Â¯Â¼Ã¨â€¡Â´Ã¥â€¦Â±Ã¤ÂºÂ«Ã§Å Â¶Ã¦â‚¬Â

```python
def process_items(items=[]):  # Bad
    items.append("new")
    return items
```

Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ None Ã¤Â½Å“Ã¤Â¸ÂºÃ©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Â¼

```python
def process_items(items=None):  # Good
    if items is None:
        items = []
    items.append("new")
    return items
```

\[Ã¤Â¸Â­] Ã§Â¼ÂºÃ¥Â°â€˜Ã§Â±Â»Ã¥Å¾â€¹Ã¦ÂÂÃ§Â¤Âº
Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡app/services/auth.py:25
Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å¡Ã¥â€¦Â¬Ã¥â€¦Â±Ã¥â€¡Â½Ã¦â€¢Â°Ã§Â¼ÂºÃ¥Â°â€˜Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â³Â¨Ã¨Â§Â£

```python
def get_user(user_id):  # Bad
    return db.find(user_id)
```

Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å¡Ã¦Â·Â»Ã¥Å Â Ã§Â±Â»Ã¥Å¾â€¹Ã¦ÂÂÃ§Â¤Âº

```python
def get_user(user_id: str) -> Optional[User]:  # Good
    return db.find(user_id)
```

\[Ã¤Â¸Â­] Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨
Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡app/routes/user.py:55
Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å¡Ã¥Â¼â€šÃ¥Â¸Â¸Ã¦â€”Â¶Ã¦â€“â€¡Ã¤Â»Â¶Ã¦Å“ÂªÃ¥â€¦Â³Ã©â€”Â­

```python
f = open("config.json")  # Bad
data = f.read()
f.close()
```

Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨

```python
with open("config.json") as f:  # Good
    data = f.read()
```

## Ã¦â€˜ËœÃ¨Â¦Â

* Ã¥â€¦Â³Ã©â€Â®Ã¯Â¼Å¡1
* Ã©Â«ËœÃ¯Â¼Å¡1
* Ã¤Â¸Â­Ã¯Â¼Å¡2

Ã¥Â»ÂºÃ¨Â®Â®Ã¯Â¼Å¡FAIL: Ã¥Å“Â¨Ã¥â€¦Â³Ã©â€Â®Ã©â€”Â®Ã©Â¢ËœÃ¤Â¿Â®Ã¥Â¤ÂÃ¥â€°ÂÃ©ËœÂ»Ã¦Â­Â¢Ã¥ÂË†Ã¥Â¹Â¶

## Ã¦â€°â‚¬Ã©Å“â‚¬Ã§Å¡â€žÃ¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å¡`black app/routes/user.py app/services/auth.py`

````
## Ã¥Â®Â¡Ã¦â€°Â¹Ã¦Â â€¡Ã¥â€¡â€ 

| Ã§Å Â¶Ã¦â‚¬Â | Ã¦ÂÂ¡Ã¤Â»Â¶ |
|--------|-----------|
| PASS: Ã¦â€°Â¹Ã¥â€¡â€  | Ã¦â€”Â  CRITICAL Ã¦Ë†â€“ HIGH Ã§ÂºÂ§Ã¥Ë†Â«Ã©â€”Â®Ã©Â¢Ëœ |
| WARNING: Ã¨Â­Â¦Ã¥â€˜Å  | Ã¤Â»â€¦Ã¥Â­ËœÃ¥Å“Â¨ MEDIUM Ã§ÂºÂ§Ã¥Ë†Â«Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†Ã¨Â°Â¨Ã¦â€¦Å½Ã¥ÂË†Ã¥Â¹Â¶Ã¯Â¼â€° |
| FAIL: Ã©ËœÂ»Ã¦Â­Â¢ | Ã¥Ââ€˜Ã§Å½Â° CRITICAL Ã¦Ë†â€“ HIGH Ã§ÂºÂ§Ã¥Ë†Â«Ã©â€”Â®Ã©Â¢Ëœ |

## Ã¤Â¸Å½Ã¥â€¦Â¶Ã¤Â»â€“Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†Â

- Ã©Â¦â€“Ã¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `/tdd` Ã§Â¡Â®Ã¤Â¿ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
- Ã¤Â½Â¿Ã§â€Â¨ `/code-review` Ã¥Â¤â€žÃ§Ââ€ Ã©ÂÅ¾ Python Ã§â€°Â¹Ã¥Â®Å¡Ã©â€”Â®Ã©Â¢Ëœ
- Ã¥Å“Â¨Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°ÂÃ¤Â½Â¿Ã§â€Â¨ `/python-review`
- Ã¥Â¦â€šÃ¦Å¾Å“Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨ `/build-fix`

## Ã¦Â¡â€ Ã¦Å¾Â¶Ã§â€°Â¹Ã¥Â®Å¡Ã¥Â®Â¡Ã¦Å¸Â¥

### Django Ã©Â¡Â¹Ã§â€ºÂ®
Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥â€˜ËœÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡
- N+1 Ã¦Å¸Â¥Ã¨Â¯Â¢Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨ `select_related` Ã¥â€™Å’ `prefetch_related`Ã¯Â¼â€°
- Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¦â€ºÂ´Ã¦â€Â¹Ã§Â¼ÂºÃ¥Â°â€˜Ã¨Â¿ÂÃ§Â§Â»
- Ã¥Å“Â¨ ORM Ã¥ÂÂ¯Ã§â€Â¨Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¥Å½Å¸Ã¥Â§â€¹ SQL
- Ã¥Â¤Å¡Ã¦Â­Â¥Ã©ÂªÂ¤Ã¦â€œÂÃ¤Â½Å“Ã§Â¼ÂºÃ¥Â°â€˜ `transaction.atomic()`

### FastAPI Ã©Â¡Â¹Ã§â€ºÂ®
Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥â€˜ËœÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡
- CORS Ã©â€¦ÂÃ§Â½Â®Ã©â€â„¢Ã¨Â¯Â¯
- Ã§â€Â¨Ã¤ÂºÅ½Ã¨Â¯Â·Ã¦Â±â€šÃ©ÂªÅ’Ã¨Â¯ÂÃ§Å¡â€ž Pydantic Ã¦Â¨Â¡Ã¥Å¾â€¹
- Ã¥â€œÂÃ¥Âºâ€Ã¦Â¨Â¡Ã¥Å¾â€¹Ã§Å¡â€žÃ¦Â­Â£Ã§Â¡Â®Ã¦â‚¬Â§
- Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€ž async/await Ã¤Â½Â¿Ã§â€Â¨
- Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥Ã¦Â¨Â¡Ã¥Â¼Â

### Flask Ã©Â¡Â¹Ã§â€ºÂ®
Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥â€˜ËœÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡
- Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Â®Â¡Ã§Ââ€ Ã¯Â¼Ë†Ã¥Âºâ€Ã§â€Â¨Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã£â‚¬ÂÃ¨Â¯Â·Ã¦Â±â€šÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¯Â¼â€°
- Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 
- Blueprint Ã§Â»â€žÃ§Â»â€¡
- Ã©â€¦ÂÃ§Â½Â®Ã§Â®Â¡Ã§Ââ€ 

## Ã§â€ºÂ¸Ã¥â€¦Â³

- Agent: `agents/python-reviewer.md`
- Skills: `skills/python-patterns/`, `skills/python-testing/`

## Ã¥Â¸Â¸Ã¨Â§ÂÃ¤Â¿Â®Ã¥Â¤Â

### Ã¦Â·Â»Ã¥Å Â Ã§Â±Â»Ã¥Å¾â€¹Ã¦ÂÂÃ§Â¤Âº
```python
# Before
def calculate(x, y):
    return x + y

# After
from typing import Union

def calculate(x: Union[int, float], y: Union[int, float]) -> Union[int, float]:
    return x + y
````

### Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨

```python
# Before
f = open("file.txt")
data = f.read()
f.close()

# After
with open("file.txt") as f:
    data = f.read()
```

### Ã¤Â½Â¿Ã§â€Â¨Ã¥Ë†â€”Ã¨Â¡Â¨Ã¦Å½Â¨Ã¥Â¯Â¼Ã¥Â¼Â

```python
# Before
result = []
for item in items:
    if item.active:
        result.append(item.name)

# After
result = [item.name for item in items if item.active]
```

### Ã¤Â¿Â®Ã¥Â¤ÂÃ¥ÂÂ¯Ã¥ÂËœÃ©Â»ËœÃ¨Â®Â¤Ã¥Ââ€šÃ¦â€¢Â°

```python
# Before
def append(value, items=[]):
    items.append(value)
    return items

# After
def append(value, items=None):
    if items is None:
        items = []
    items.append(value)
    return items
```

### Ã¤Â½Â¿Ã§â€Â¨ f-strings (Python 3.6+)

```python
# Before
name = "Alice"
greeting = "Hello, " + name + "!"
greeting2 = "Hello, {}".format(name)

# After
greeting = f"Hello, {name}!"
```

### Ã¤Â¿Â®Ã¥Â¤ÂÃ¥Â¾ÂªÃ§Å½Â¯Ã¤Â¸Â­Ã§Å¡â€žÃ¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¨Â¿Å¾Ã¦Å½Â¥

```python
# Before
result = ""
for item in items:
    result += str(item)

# After
result = "".join(str(item) for item in items)
```

## Python Ã§â€°Ë†Ã¦Å“Â¬Ã¥â€¦Â¼Ã¥Â®Â¹Ã¦â‚¬Â§

Ã¥Â®Â¡Ã¦Å¸Â¥Ã¨â‚¬â€¦Ã¤Â¼Å¡Ã¦Å’â€¡Ã¥â€¡ÂºÃ¤Â»Â£Ã§Â ÂÃ¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¤Âºâ€ Ã¦â€“Â° Python Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å¡

| Ã¥Å Å¸Ã¨Æ’Â½ | Ã¦Å“â‚¬Ã¤Â½Å½ Python Ã§â€°Ë†Ã¦Å“Â¬ |
|---------|----------------|
| Ã§Â±Â»Ã¥Å¾â€¹Ã¦ÂÂÃ§Â¤Âº | 3.5+ |
| f-strings | 3.6+ |
| Ã¦ÂµÂ·Ã¨Â±Â¡Ã¨Â¿ÂÃ§Â®â€”Ã§Â¬Â¦ (`:=`) | 3.8+ |
| Ã¤Â»â€¦Ã©â„¢ÂÃ¤Â½ÂÃ§Â½Â®Ã¥Ââ€šÃ¦â€¢Â° | 3.8+ |
| Match Ã¨Â¯Â­Ã¥ÂÂ¥ | 3.10+ |
| Ã§Â±Â»Ã¥Å¾â€¹Ã¨Ââ€Ã¥ÂË† (\`x | None\`) | 3.10+ |

Ã§Â¡Â®Ã¤Â¿ÂÃ¤Â½Â Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ® `pyproject.toml` Ã¦Ë†â€“ `setup.py` Ã¦Å’â€¡Ã¥Â®Å¡Ã¤Âºâ€ Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€žÃ¦Å“â‚¬Ã¤Â½Å½ Python Ã§â€°Ë†Ã¦Å“Â¬Ã£â‚¬â€š
