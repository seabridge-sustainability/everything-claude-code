---
paths:
  - "**/*.py"
  - "**/*.pyi"
---

# Python Ã¦Â¨Â¡Ã¥Â¼Â

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  [common/patterns.md](../common/patterns.md)Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  Python Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¥ÂÂÃ¨Â®Â®Ã¯Â¼Ë†Ã©Â¸Â­Ã¥Â­ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¯Â¼â€°

```python
from typing import Protocol

class Repository(Protocol):
    def find_by_id(self, id: str) -> dict | None: ...
    def save(self, entity: dict) -> dict: ...
```

## Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â±Â»Ã¤Â½Å“Ã¤Â¸Âº DTO

```python
from dataclasses import dataclass

@dataclass
class CreateUserRequest:
    name: str
    email: str
    age: int | None = None
```

## Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¤Â¸Å½Ã§â€Å¸Ã¦Ë†ÂÃ¥â„¢Â¨

* Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¯Â¼Ë†`with` Ã¨Â¯Â­Ã¥ÂÂ¥Ã¯Â¼â€°Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Âµâ€žÃ¦ÂºÂÃ§Â®Â¡Ã§Ââ€ 
* Ã¤Â½Â¿Ã§â€Â¨Ã§â€Å¸Ã¦Ë†ÂÃ¥â„¢Â¨Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Æ’Â°Ã¦â‚¬Â§Ã¦Â±â€šÃ¥â‚¬Â¼Ã¥â€™Å’Ã¥â€ â€¦Ã¥Â­ËœÃ©Â«ËœÃ¦â€¢Ë†Ã¨Â¿Â­Ã¤Â»Â£

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`python-patterns`Ã¯Â¼Å’Ã¤Âºâ€ Ã¨Â§Â£Ã¥Å’â€¦Ã¦â€¹Â¬Ã¨Â£â€¦Ã©Â¥Â°Ã¥â„¢Â¨Ã£â‚¬ÂÃ¥Â¹Â¶Ã¥Ââ€˜Ã¥â€™Å’Ã¥Å’â€¦Ã§Â»â€žÃ§Â»â€¡Ã¥Å“Â¨Ã¥â€ â€¦Ã§Å¡â€žÃ§Â»Â¼Ã¥ÂË†Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š
