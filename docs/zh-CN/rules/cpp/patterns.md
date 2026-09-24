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

# C++ Ã¦Â¨Â¡Ã¥Â¼Â

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å¸ÂºÃ¤ÂºÅ½ [common/patterns.md](../common/patterns.md) Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  C++ Ã§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## RAIIÃ¯Â¼Ë†Ã¨Âµâ€žÃ¦ÂºÂÃ¨Å½Â·Ã¥Ââ€“Ã¥ÂÂ³Ã¥Ë†ÂÃ¥Â§â€¹Ã¥Å’â€“Ã¯Â¼â€°

Ã¥Â°â€ Ã¨Âµâ€žÃ¦ÂºÂÃ§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã¤Â¸Å½Ã¥Â¯Â¹Ã¨Â±Â¡Ã§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã§Â»â€˜Ã¥Â®Å¡Ã¯Â¼Å¡

```cpp
class FileHandle {
public:
    explicit FileHandle(const std::string& path) : file_(std::fopen(path.c_str(), "r")) {}
    ~FileHandle() { if (file_) std::fclose(file_); }
    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;
private:
    std::FILE* file_;
};
```

## Ã¤Â¸â€°Ã¤Âºâ€Ã¦Â³â€¢Ã¥Ë†â„¢/Ã©â€ºÂ¶Ã¦Â³â€¢Ã¥Ë†â„¢

* **Ã©â€ºÂ¶Ã¦Â³â€¢Ã¥Ë†â„¢**Ã¯Â¼Å¡Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ©Å“â‚¬Ã¨Â¦ÂÃ¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¦Å¾ÂÃ¦Å¾â€žÃ¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬ÂÃ¦â€¹Â·Ã¨Â´Â/Ã§Â§Â»Ã¥Å Â¨Ã¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã¦Ë†â€“Ã¨Âµâ€¹Ã¥â‚¬Â¼Ã¨Â¿ÂÃ§Â®â€”Ã§Â¬Â¦Ã§Å¡â€žÃ§Â±Â»Ã£â‚¬â€š
* **Ã¤Âºâ€Ã¦Â³â€¢Ã¥Ë†â„¢**Ã¯Â¼Å¡Ã¥Â¦â€šÃ¦Å¾Å“Ã¤Â½Â Ã¥Â®Å¡Ã¤Â¹â€°Ã¤Âºâ€ Ã¦Å¾ÂÃ¦Å¾â€žÃ¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬ÂÃ¦â€¹Â·Ã¨Â´ÂÃ¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã£â‚¬ÂÃ¦â€¹Â·Ã¨Â´ÂÃ¨Âµâ€¹Ã¥â‚¬Â¼Ã¨Â¿ÂÃ§Â®â€”Ã§Â¬Â¦Ã£â‚¬ÂÃ§Â§Â»Ã¥Å Â¨Ã¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã¦Ë†â€“Ã§Â§Â»Ã¥Å Â¨Ã¨Âµâ€¹Ã¥â‚¬Â¼Ã¨Â¿ÂÃ§Â®â€”Ã§Â¬Â¦Ã¤Â¸Â­Ã§Å¡â€žÃ¤Â»Â»Ã¤Â½â€¢Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¯Â¼Å’Ã©â€šÂ£Ã¤Â¹Ë†Ã¥Â°Â±Ã©Å“â‚¬Ã¨Â¦ÂÃ¥Â®Å¡Ã¤Â¹â€°Ã¥â€¦Â¨Ã©Æ’Â¨Ã¤Âºâ€Ã¤Â¸ÂªÃ£â‚¬â€š

## Ã¥â‚¬Â¼Ã¨Â¯Â­Ã¤Â¹â€°

* Ã¦Å’â€°Ã¥â‚¬Â¼Ã¤Â¼Â Ã©â‚¬â€™Ã¥Â°ÂÃ¥Å¾â€¹/Ã¥Â¹Â³Ã¥â€¡Â¡Ã§Â±Â»Ã¥Å¾â€¹Ã£â‚¬â€š
* Ã¦Å’â€° `const&` Ã¤Â¼Â Ã©â‚¬â€™Ã¥Â¤Â§Ã¥Å¾â€¹Ã§Â±Â»Ã¥Å¾â€¹Ã£â‚¬â€š
* Ã¦Å’â€°Ã¥â‚¬Â¼Ã¨Â¿â€Ã¥â€ºÅ¾Ã¯Â¼Ë†Ã¤Â¾ÂÃ¨Âµâ€“ RVO/NRVOÃ¯Â¼â€°Ã£â‚¬â€š
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦Å½Â¥Ã¦â€Â¶Ã¥ÂÅ½Ã¥ÂÂ³Ã¨Â¢Â«Ã¦Â¶Ë†Ã¨â‚¬â€”Ã§Å¡â€žÃ¥Ââ€šÃ¦â€¢Â°Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã§Â§Â»Ã¥Å Â¨Ã¨Â¯Â­Ã¤Â¹â€°Ã£â‚¬â€š

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

* Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¼â€šÃ¥Â¸Â¸Ã¥Â¤â€žÃ§Ââ€ Ã¥Â¼â€šÃ¥Â¸Â¸Ã¦Æ’â€¦Ã¥â€ ÂµÃ£â‚¬â€š
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â¸ÂÃ¥Â­ËœÃ¥Å“Â¨Ã§Å¡â€žÃ¥â‚¬Â¼Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `std::optional`Ã£â‚¬â€š
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã©Â¢â€žÃ¦Å“Å¸Ã§Å¡â€žÃ¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `std::expected`Ã¯Â¼Ë†C++23Ã¯Â¼â€°Ã¦Ë†â€“Ã§Â»â€œÃ¦Å¾Å“Ã§Â±Â»Ã¥Å¾â€¹Ã£â‚¬â€š

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å“â€°Ã¥â€¦Â³Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž C++ Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥â€™Å’Ã¥ÂÂÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`cpp-coding-standards`Ã£â‚¬â€š
