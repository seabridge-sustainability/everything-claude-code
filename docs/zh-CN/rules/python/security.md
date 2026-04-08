---
paths:
  - "**/*.py"
  - "**/*.pyi"
---

# Python Ã¥Â®â€°Ã¥â€¦Â¨

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å¸ÂºÃ¤ÂºÅ½ [Ã©â‚¬Å¡Ã§â€Â¨Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å’â€¡Ã¥Ââ€”](../common/security.md) Ã¦â€°Â©Ã¥Â±â€¢Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  Python Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ 

```python
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.environ["OPENAI_API_KEY"]  # Raises KeyError if missing
```

## Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ

* Ã¤Â½Â¿Ã§â€Â¨ **bandit** Ã¨Â¿â€ºÃ¨Â¡Å’Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¥Ë†â€ Ã¦Å¾ÂÃ¯Â¼Å¡
  ```bash
  bandit -r src/
  ```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`django-security` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“ Django Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¦Å’â€¡Ã¥Ââ€”Ã¯Â¼Ë†Ã¥Â¦â€šÃ©â‚¬â€šÃ§â€Â¨Ã¯Â¼â€°Ã£â‚¬â€š
