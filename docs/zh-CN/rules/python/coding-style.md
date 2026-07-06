---
paths:
  - "**/*.py"
  - "**/*.pyi"
---

# Python Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Å“Â¨ [common/coding-style.md](../common/coding-style.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  Python Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â â€¡Ã¥â€¡â€ 

* Ã©ÂÂµÃ¥Â¾Âª **PEP 8** Ã¨Â§â€žÃ¨Å’Æ’
* Ã¥Å“Â¨Ã¦â€°â‚¬Ã¦Å“â€°Ã¥â€¡Â½Ã¦â€¢Â°Ã§Â­Â¾Ã¥ÂÂÃ¤Â¸Å Ã¤Â½Â¿Ã§â€Â¨ **Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â³Â¨Ã¨Â§Â£**

## Ã¤Â¸ÂÃ¥ÂËœÃ¦â‚¬Â§

Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â€¢Â°Ã¦ÂÂ®Ã§Â»â€œÃ¦Å¾â€žÃ¯Â¼Å¡

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class User:
    name: str
    email: str

from typing import NamedTuple

class Point(NamedTuple):
    x: float
    y: float
```

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

* Ã¤Â½Â¿Ã§â€Â¨ **black** Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â»Â£Ã§Â ÂÃ¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“
* Ã¤Â½Â¿Ã§â€Â¨ **isort** Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¦Å½â€™Ã¥ÂºÂ
* Ã¤Â½Â¿Ã§â€Â¨ **ruff** Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`python-patterns` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž Python Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢Ã¥â€™Å’Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š
