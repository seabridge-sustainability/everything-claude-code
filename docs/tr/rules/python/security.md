---
paths:
  - "**/*.py"
  - "**/*.pyi"
---
# Python GÃƒÂ¼venlik

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Bu dosya [common/security.md](../common/security.md) dosyasÃ„Â±nÃ„Â± Python'a ÃƒÂ¶zgÃƒÂ¼ iÃƒÂ§erikle geniÃ…Å¸letir.

## Secret YÃƒÂ¶netimi

```python
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.environ["OPENAI_API_KEY"]  # Eksikse KeyError hatasÃ„Â± verir
```

## GÃƒÂ¼venlik TaramasÃ„Â±

- Statik gÃƒÂ¼venlik analizi iÃƒÂ§in **bandit** kullan:
  ```bash
  bandit -r src/
  ```

## Referans

Django'ya ÃƒÂ¶zgÃƒÂ¼ gÃƒÂ¼venlik kurallarÃ„Â± iÃƒÂ§in (eÃ„Å¸er uygulanabilirse) skill: `django-security` dosyasÃ„Â±na bakÃ„Â±n.
