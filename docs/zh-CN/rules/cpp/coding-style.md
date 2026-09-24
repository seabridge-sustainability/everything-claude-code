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

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
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
