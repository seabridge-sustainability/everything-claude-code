---
paths:
  - "**/*.py"
  - "**/*.pyi"
---

# Python Ã¥Â®â€°Ã¥â€¦Â¨

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
