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

# C++ Ã¦Âµâ€¹Ã¨Â¯â€¢

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  [common/testing.md](../common/testing.md) Ã¤Â¸Â­Ã¥â€¦Â³Ã¤ÂºÅ½ C++ Ã§Å¡â€žÃ§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â¡â€ Ã¦Å¾Â¶

Ã¤Â½Â¿Ã§â€Â¨ **GoogleTest** (gtest/gmock) Ã©â€¦ÂÃ¥ÂË† **CMake/CTest**Ã£â‚¬â€š

## Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢

```bash
cmake --build build && ctest --test-dir build --output-on-failure
```

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

```bash
cmake -DCMAKE_CXX_FLAGS="--coverage" -DCMAKE_EXE_LINKER_FLAGS="--coverage" ..
cmake --build .
ctest --output-on-failure
lcov --capture --directory . --output-file coverage.info
```

## Ã¥â€ â€¦Ã¥Â­ËœÃ¦Â¶Ë†Ã¦Â¯â€™Ã¥Â·Â¥Ã¥â€¦Â·

Ã¥Å“Â¨ CI Ã¤Â¸Â­Ã¥Âºâ€Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥â€ â€¦Ã¥Â­ËœÃ¦Â¶Ë†Ã¦Â¯â€™Ã¥Â·Â¥Ã¥â€¦Â·Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å¡

```bash
cmake -DCMAKE_CXX_FLAGS="-fsanitize=address,undefined" ..
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`cpp-testing` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã¨Â¯Â¦Ã§Â»â€ Ã§Å¡â€ž C++ Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬ÂTDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¤Â»Â¥Ã¥ÂÅ  GoogleTest/GMock Ã¤Â½Â¿Ã§â€Â¨Ã¦Å’â€¡Ã¥Ââ€”Ã£â‚¬â€š
