---
description: Comprehensive Python code review for PEP 8 compliance, type hints, security, and Pythonic idioms. Invokes the python-reviewer agent.
---

# Python Code Review

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


This command invokes the **python-reviewer** agent for comprehensive Python-specific code review.

## What This Command Does

1. **Identify Python Changes**: Find modified `.py` files via `git diff`
2. **Run Static Analysis**: Execute `ruff`, `mypy`, `pylint`, `black --check`
3. **Security Scan**: Check for SQL injection, command injection, unsafe deserialization
4. **Type Safety Review**: Analyze type hints and mypy errors
5. **Pythonic Code Check**: Verify code follows PEP 8 and Python best practices
6. **Generate Report**: Categorize issues by severity

## When to Use

Use `/python-review` when:
- After writing or modifying Python code
- Before committing Python changes
- Reviewing pull requests with Python code
- Onboarding to a new Python codebase
- Learning Pythonic patterns and idioms

## Review Categories

### CRITICAL (Must Fix)
- SQL/Command injection vulnerabilities
- Unsafe eval/exec usage
- Pickle unsafe deserialization
- Hardcoded credentials
- YAML unsafe load
- Bare except clauses hiding errors

### HIGH (Should Fix)
- Missing type hints on public functions
- Mutable default arguments
- Swallowing exceptions silently
- Not using context managers for resources
- C-style looping instead of comprehensions
- Using type() instead of isinstance()
- Race conditions without locks

### MEDIUM (Consider)
- PEP 8 formatting violations
- Missing docstrings on public functions
- Print statements instead of logging
- Inefficient string operations
- Magic numbers without named constants
- Not using f-strings for formatting
- Unnecessary list creation

## Automated Checks Run

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

## Example Usage

```text
User: /python-review

Agent:
# Python Code Review Report

## Files Reviewed
- app/routes/user.py (modified)
- app/services/auth.py (modified)

## Static Analysis Results
✓ ruff: No issues
✓ mypy: No errors
WARNING: black: 2 files need reformatting
✓ bandit: No security issues

## Issues Found

[CRITICAL] SQL Injection vulnerability
File: app/routes/user.py:42
Issue: User input directly interpolated into SQL query
```python
query = f"SELECT * FROM users WHERE id = {user_id}"  # Bad
```
Fix: Use parameterized query
```python
query = "SELECT * FROM users WHERE id = %s"  # Good
cursor.execute(query, (user_id,))
```

[HIGH] Mutable default argument
File: app/services/auth.py:18
Issue: Mutable default argument causes shared state
```python
def process_items(items=[]):  # Bad
    items.append("new")
    return items
```
Fix: Use None as default
```python
def process_items(items=None):  # Good
    if items is None:
        items = []
    items.append("new")
    return items
```

[MEDIUM] Missing type hints
File: app/services/auth.py:25
Issue: Public function without type annotations
```python
def get_user(user_id):  # Bad
    return db.find(user_id)
```
Fix: Add type hints
```python
def get_user(user_id: str) -> Optional[User]:  # Good
    return db.find(user_id)
```

[MEDIUM] Not using context manager
File: app/routes/user.py:55
Issue: File not closed on exception
```python
f = open("config.json")  # Bad
data = f.read()
f.close()
```
Fix: Use context manager
```python
with open("config.json") as f:  # Good
    data = f.read()
```

## Summary
- CRITICAL: 1
- HIGH: 1
- MEDIUM: 2

Recommendation: FAIL: Block merge until CRITICAL issue is fixed

## Formatting Required
Run: `black app/routes/user.py app/services/auth.py`
```

## Approval Criteria

| Status | Condition |
|--------|-----------|
| PASS: Approve | No CRITICAL or HIGH issues |
| WARNING: Warning | Only MEDIUM issues (merge with caution) |
| FAIL: Block | CRITICAL or HIGH issues found |

## Integration with Other Commands

- Use the `tdd-workflow` skill first to ensure tests pass
- Use `/code-review` for non-Python specific concerns
- Use `/python-review` before committing
- Use `/build-fix` if static analysis tools fail

## Framework-Specific Reviews

### Django Projects
The reviewer checks for:
- N+1 query issues (use `select_related` and `prefetch_related`)
- Missing migrations for model changes
- Raw SQL usage when ORM could work
- Missing `transaction.atomic()` for multi-step operations

### FastAPI Projects
The reviewer checks for:
- CORS misconfiguration
- Pydantic models for request validation
- Response models correctness
- Proper async/await usage
- Dependency injection patterns

### Flask Projects
The reviewer checks for:
- Context management (app context, request context)
- Proper error handling
- Blueprint organization
- Configuration management

## Related

- Agent: `agents/python-reviewer.md`
- Skills: `skills/python-patterns/`, `skills/python-testing/`

## Common Fixes

### Add Type Hints
```python
# Before
def calculate(x, y):
    return x + y

# After
from typing import Union

def calculate(x: Union[int, float], y: Union[int, float]) -> Union[int, float]:
    return x + y
```

### Use Context Managers
```python
# Before
f = open("file.txt")
data = f.read()
f.close()

# After
with open("file.txt") as f:
    data = f.read()
```

### Use List Comprehensions
```python
# Before
result = []
for item in items:
    if item.active:
        result.append(item.name)

# After
result = [item.name for item in items if item.active]
```

### Fix Mutable Defaults
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

### Use f-strings (Python 3.6+)
```python
# Before
name = "Alice"
greeting = "Hello, " + name + "!"
greeting2 = "Hello, {}".format(name)

# After
greeting = f"Hello, {name}!"
```

### Fix String Concatenation in Loops
```python
# Before
result = ""
for item in items:
    result += str(item)

# After
result = "".join(str(item) for item in items)
```

## Python Version Compatibility

The reviewer notes when code uses features from newer Python versions:

| Feature | Minimum Python |
|---------|----------------|
| Type hints | 3.5+ |
| f-strings | 3.6+ |
| Walrus operator (`:=`) | 3.8+ |
| Position-only parameters | 3.8+ |
| Match statements | 3.10+ |
| Type unions (&#96;x &#124; None&#96;) | 3.10+ |

Ensure your project's `pyproject.toml` or `setup.py` specifies the correct minimum Python version.

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
