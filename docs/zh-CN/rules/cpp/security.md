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

# C++ Ã¥Â®â€°Ã¥â€¦Â¨

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  [common/security.md](../common/security.md)Ã¯Â¼Å’Ã¥Â¢Å¾Ã¥Å Â Ã¤Âºâ€  C++ Ã§â€°Â¹Ã¦Å“â€°Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¥â€ â€¦Ã¥Â­ËœÃ¥Â®â€°Ã¥â€¦Â¨

* Ã§Â»ÂÃ¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨Ã¥Å½Å¸Ã¥Â§â€¹Ã§Å¡â€ž `new`/`delete` Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨Ã¦â„¢ÂºÃ¨Æ’Â½Ã¦Å’â€¡Ã©â€™Ë†
* Ã§Â»ÂÃ¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ C Ã©Â£Å½Ã¦Â Â¼Ã¦â€¢Â°Ã§Â»â€ž Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ `std::array` Ã¦Ë†â€“ `std::vector`
* Ã§Â»ÂÃ¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ `malloc`/`free` Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ C++ Ã¥Ë†â€ Ã©â€¦ÂÃ¦â€“Â¹Ã¥Â¼Â
* Ã©â„¢Â¤Ã©ÂÅ¾Ã§Â»ÂÃ¥Â¯Â¹Ã¥Â¿â€¦Ã¨Â¦ÂÃ¯Â¼Å’Ã©ÂÂ¿Ã¥â€¦ÂÃ¤Â½Â¿Ã§â€Â¨ `reinterpret_cast`

## Ã§Â¼â€œÃ¥â€ Â²Ã¥Å’ÂºÃ¦ÂºÂ¢Ã¥â€¡Âº

* Ã¤Â½Â¿Ã§â€Â¨ `std::string` Ã¨â‚¬Å’Ã©ÂÅ¾ `char*`
* Ã¥Â½â€œÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã©â€¡ÂÃ¨Â¦ÂÃ¦â€”Â¶Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `.at()` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â¾Â¹Ã§â€¢Å’Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â®Â¿Ã©â€”Â®
* Ã§Â»ÂÃ¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ `strcpy`Ã£â‚¬Â`strcat`Ã£â‚¬Â`sprintf` Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ `std::string` Ã¦Ë†â€“ `fmt::format`

## Ã¦Å“ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¨Â¡Å’Ã¤Â¸Âº

* Ã¥Â§â€¹Ã§Â»Ë†Ã¥Ë†ÂÃ¥Â§â€¹Ã¥Å’â€“Ã¥ÂËœÃ©â€¡Â
* Ã©ÂÂ¿Ã¥â€¦ÂÃ¦Å“â€°Ã§Â¬Â¦Ã¥ÂÂ·Ã¦â€¢Â´Ã¦â€¢Â°Ã¦ÂºÂ¢Ã¥â€¡Âº
* Ã§Â»ÂÃ¤Â¸ÂÃ¨Â§Â£Ã¥Â¼â€¢Ã§â€Â¨Ã§Â©ÂºÃ¦Å’â€¡Ã©â€™Ë†Ã¦Ë†â€“Ã¦â€šÂ¬Ã¥Å¾â€šÃ¦Å’â€¡Ã©â€™Ë†
* Ã¥Å“Â¨ CI Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¦Â¶Ë†Ã¦Â¯â€™Ã¥â€°â€šÃ¯Â¼Å¡
  ```bash
  cmake -DCMAKE_CXX_FLAGS="-fsanitize=address,undefined" ..
  ```

## Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾Â

* Ã¤Â½Â¿Ã§â€Â¨ **clang-tidy** Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Å¡
  ```bash
  clang-tidy --checks='*' src/*.cpp
  ```
* Ã¤Â½Â¿Ã§â€Â¨ **cppcheck** Ã¨Â¿â€ºÃ¨Â¡Å’Ã©Â¢ÂÃ¥Â¤â€“Ã¥Ë†â€ Ã¦Å¾ÂÃ¯Â¼Å¡
  ```bash
  cppcheck --enable=all src/
  ```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`cpp-coding-standards` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã¨Â¯Â¦Ã§Â»â€ Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã¦Å’â€¡Ã¥Ââ€”Ã£â‚¬â€š
