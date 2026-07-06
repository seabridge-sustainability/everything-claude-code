---
paths:
  - "**/*.cpp"
  - "**/*.hpp"
  - "**/*.cc"
  - "**/*.hh"
  - "**/*.cxx"
  - "**/*.h"
  - "**/CMakeLists.txt"
---

# C++ Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å¸ÂºÃ¤ÂºÅ½ [common/coding-style.md](../common/coding-style.md) Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  C++ Ã§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã§Å½Â°Ã¤Â»Â£ C++ (C++17/20/23)

* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨**Ã§Å½Â°Ã¤Â»Â£ C++ Ã§â€°Â¹Ã¦â‚¬Â§**Ã¨â‚¬Å’Ã©ÂÅ¾ C Ã©Â£Å½Ã¦Â Â¼Ã§Â»â€œÃ¦Å¾â€ž
* Ã¥Â½â€œÃ§Â±Â»Ã¥Å¾â€¹Ã¥ÂÂ¯Ã¤Â»Å½Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¦Å½Â¨Ã¦â€“Â­Ã¦â€”Â¶Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `auto`
* Ã¤Â½Â¿Ã§â€Â¨ `constexpr` Ã¥Â®Å¡Ã¤Â¹â€°Ã§Â¼â€“Ã¨Â¯â€˜Ã¦â€”Â¶Ã¥Â¸Â¸Ã©â€¡Â
* Ã¤Â½Â¿Ã§â€Â¨Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã§Â»â€˜Ã¥Â®Å¡Ã¯Â¼Å¡`auto [key, value] = map_entry;`

## Ã¨Âµâ€žÃ¦ÂºÂÃ§Â®Â¡Ã§Ââ€ 

* **Ã¥Â¤â€žÃ¥Â¤â€žÃ¤Â½Â¿Ã§â€Â¨ RAII** Ã¢â‚¬â€ Ã©ÂÂ¿Ã¥â€¦ÂÃ¦â€°â€¹Ã¥Å Â¨ `new`/`delete`
* Ã¤Â½Â¿Ã§â€Â¨ `std::unique_ptr` Ã¨Â¡Â¨Ã§Â¤ÂºÃ§â€¹Â¬Ã¥ÂÂ Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’
* Ã¤Â»â€¦Ã¥Å“Â¨Ã§Â¡Â®Ã¥Â®Å¾Ã©Å“â‚¬Ã¨Â¦ÂÃ¥â€¦Â±Ã¤ÂºÂ«Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ `std::shared_ptr`
* Ã¤Â½Â¿Ã§â€Â¨ `std::make_unique` / `std::make_shared` Ã¦â€ºÂ¿Ã¤Â»Â£Ã¥Å½Å¸Ã¥Â§â€¹ `new`

## Ã¥â€˜Â½Ã¥ÂÂÃ§ÂºÂ¦Ã¥Â®Å¡

* Ã§Â±Â»Ã¥Å¾â€¹/Ã§Â±Â»Ã¯Â¼Å¡`PascalCase`
* Ã¥â€¡Â½Ã¦â€¢Â°/Ã¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Å¡`snake_case` Ã¦Ë†â€“ `camelCase`Ã¯Â¼Ë†Ã©ÂÂµÃ¥Â¾ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã§ÂºÂ¦Ã¥Â®Å¡Ã¯Â¼â€°
* Ã¥Â¸Â¸Ã©â€¡ÂÃ¯Â¼Å¡`kPascalCase` Ã¦Ë†â€“ `UPPER_SNAKE_CASE`
* Ã¥â€˜Â½Ã¥ÂÂÃ§Â©ÂºÃ©â€”Â´Ã¯Â¼Å¡`lowercase`
* Ã¦Ë†ÂÃ¥â€˜ËœÃ¥ÂËœÃ©â€¡ÂÃ¯Â¼Å¡`snake_case_`Ã¯Â¼Ë†Ã¥Â°Â¾Ã©Å¡ÂÃ¤Â¸â€¹Ã¥Ë†â€™Ã§ÂºÂ¿Ã¯Â¼â€°Ã¦Ë†â€“ `m_` Ã¥â€°ÂÃ§Â¼â‚¬

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

* Ã¤Â½Â¿Ã§â€Â¨ **clang-format** Ã¢â‚¬â€ Ã©ÂÂ¿Ã¥â€¦ÂÃ©Â£Å½Ã¦Â Â¼Ã¤Âºâ€°Ã¨Â®Âº
* Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°ÂÃ¨Â¿ÂÃ¨Â¡Å’ `clang-format -i <file>`

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å“â€°Ã¥â€¦Â³Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž C++ Ã§Â¼â€“Ã§Â ÂÃ¦Â â€¡Ã¥â€¡â€ Ã¥â€™Å’Ã¦Å’â€¡Ã¥Ââ€”Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`cpp-coding-standards`Ã£â‚¬â€š
