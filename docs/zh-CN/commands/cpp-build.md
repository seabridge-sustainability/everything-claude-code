---
description: Ã©â‚¬ÂÃ¦Â­Â¥Ã¤Â¿Â®Ã¥Â¤ÂC++Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬ÂCMakeÃ©â€”Â®Ã©Â¢ËœÃ¥â€™Å’Ã©â€œÂ¾Ã¦Å½Â¥Ã¥â„¢Â¨Ã©â€”Â®Ã©Â¢ËœÃ£â‚¬â€šÃ¨Â°Æ’Ã§â€Â¨cpp-build-resolverÃ¤Â»Â£Ã§Ââ€ Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã£â‚¬ÂÃ§Â²Â¾Ã¥â€¡â€ Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤ÂÃ£â‚¬â€š
---

# C++ Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â¸Å½Ã¤Â¿Â®Ã¥Â¤Â

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


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨ **cpp-build-resolver** Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å’Ã¤Â»Â¥Ã¦Å“â‚¬Ã¥Â°ÂÃ§Å¡â€žÃ¦â€ºÂ´Ã¦â€Â¹Ã©â‚¬ÂÃ¦Â­Â¥Ã¤Â¿Â®Ã¥Â¤Â C++ Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¯Å Ã¦â€“Â­**Ã¯Â¼Å¡Ã¦â€°Â§Ã¨Â¡Å’ `cmake --build`Ã£â‚¬Â`clang-tidy`Ã£â‚¬Â`cppcheck`
2. **Ã¨Â§Â£Ã¦Å¾ÂÃ©â€â„¢Ã¨Â¯Â¯**Ã¯Â¼Å¡Ã¦Å’â€°Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Ë†â€ Ã§Â»â€žÃ¥Â¹Â¶Ã¦Å’â€°Ã¤Â¸Â¥Ã©â€¡ÂÃ¦â‚¬Â§Ã¦Å½â€™Ã¥ÂºÂ
3. **Ã©â‚¬ÂÃ¦Â­Â¥Ã¤Â¿Â®Ã¥Â¤Â**Ã¯Â¼Å¡Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ©â€â„¢Ã¨Â¯Â¯
4. **Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¯ÂÃ¤Â¸ÂªÃ¤Â¿Â®Ã¥Â¤Â**Ã¯Â¼Å¡Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Å¾â€žÃ¥Â»Âº
5. **Ã¦Å Â¥Ã¥â€˜Å Ã¦â€˜ËœÃ¨Â¦Â**Ã¯Â¼Å¡Ã¦ËœÂ¾Ã§Â¤ÂºÃ¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã¥â€™Å’Ã¥â€°Â©Ã¤Â½â„¢Ã§Å¡â€žÃ©â€”Â®Ã©Â¢Ëœ

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¤Â½Â¿Ã§â€Â¨ `/cpp-build`Ã¯Â¼Å¡

* `cmake --build build` Ã¥â€ºÂ Ã©â€â„¢Ã¨Â¯Â¯Ã¨â‚¬Å’Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶
* Ã©â€œÂ¾Ã¦Å½Â¥Ã¥â„¢Â¨Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Ë†Ã¦Å“ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã§Å¡â€žÃ¥Â¼â€¢Ã§â€Â¨Ã¯Â¼Å’Ã¥Â¤Å¡Ã©â€¡ÂÃ¥Â®Å¡Ã¤Â¹â€°Ã¯Â¼â€°
* Ã¦Â¨Â¡Ã¦ÂÂ¿Ã¥Â®Å¾Ã¤Â¾â€¹Ã¥Å’â€“Ã¥Â¤Â±Ã¨Â´Â¥
* Ã¥Å’â€¦Ã¥ÂÂ«/Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã©â€”Â®Ã©Â¢Ëœ
* Ã¦â€¹â€°Ã¥Ââ€“Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã¥Â¯Â¼Ã¨â€¡Â´Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶

## Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¨Â¯Å Ã¦â€“Â­Ã¥â€˜Â½Ã¤Â»Â¤

```bash
# CMake configure
cmake -B build -S .

# Build
cmake --build build 2>&1 | head -100

# Static analysis (if available)
clang-tidy src/*.cpp -- -std=c++17
cppcheck --enable=all src/
```

## Ã§Â¤ÂºÃ¤Â¾â€¹Ã¤Â¼Å¡Ã¨Â¯Â

````text
# C++ Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€”Â®Ã©Â¢ËœÃ¨Â§Â£Ã¥â€ Â³

## Ã¥Ë†ÂÃ¥Â§â€¹Ã¨Â¯Å Ã¦â€“Â­

```bash
$ cmake --build build
src/service/user.cpp:25:15: error: use of undeclared identifier 'UserRepository'
src/handler/api.cpp:42:9: error: no matching function for call to 'process'
src/handler/api.cpp:58:1: error: non-void function does not return a value

````

Ã¥Ââ€˜Ã§Å½Â°Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡3

## Ã¤Â¿Â®Ã¥Â¤Â 1Ã¯Â¼Å¡Ã¦Å“ÂªÃ¥Â£Â°Ã¦ËœÅ½Ã§Å¡â€žÃ¦Â â€¡Ã¨Â¯â€ Ã§Â¬Â¦

Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡src/service/user.cpp:25
Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨Ã¤Âºâ€ Ã¦Å“ÂªÃ¥Â£Â°Ã¦ËœÅ½Ã§Å¡â€žÃ¦Â â€¡Ã¨Â¯â€ Ã§Â¬Â¦ 'UserRepository'
Ã¥Å½Å¸Ã¥â€ºÂ Ã¯Â¼Å¡Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Å’â€¦Ã¥ÂÂ«

```cpp
// Added include
#include "repository/user_repository.hpp"
```

```bash
$ cmake --build build
# 2 errors remaining
```

## Ã¤Â¿Â®Ã¥Â¤Â 2Ã¯Â¼Å¡Ã¦â€”Â Ã¥Å’Â¹Ã©â€¦ÂÃ¥â€¡Â½Ã¦â€¢Â°

Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡src/handler/api.cpp:42
Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡Ã¦Â²Â¡Ã¦Å“â€°Ã¥Å’Â¹Ã©â€¦ÂÃ§Å¡â€žÃ¥â€¡Â½Ã¦â€¢Â°Ã§â€Â¨Ã¤ÂºÅ½Ã¨Â°Æ’Ã§â€Â¨ 'process'

```cpp
// Changed
process(params.get("count"));
// To
process(std::stoi(params.get("count")));
```

```bash
$ cmake --build build
# 1 error remaining
```

## Ã¤Â¿Â®Ã¥Â¤Â 3Ã¯Â¼Å¡Ã§Â¼ÂºÃ¥Â°â€˜Ã¨Â¿â€Ã¥â€ºÅ¾

Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡src/handler/api.cpp:58
Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡Ã©ÂÅ¾ void Ã¥â€¡Â½Ã¦â€¢Â°Ã¦Å“ÂªÃ¨Â¿â€Ã¥â€ºÅ¾Ã¥â‚¬Â¼

```cpp
std::optional<User> getUser(const std::string& id) {
    if (id.empty()) {
        return std::nullopt;
    }
    auto user = findUser(id);
    // Added missing return
    return user;
}
```

```bash
$ cmake --build build
# Build successful!
```

## Ã¦Å“â‚¬Ã§Â»Ë†Ã©ÂªÅ’Ã¨Â¯Â

```bash
$ ctest --test-dir build --output-on-failure
Test project build
    1/5 Test #1: unit_tests ........   Passed    0.02 sec
    2/5 Test #2: integration_tests    Passed    0.15 sec
All tests passed.
```

## Ã¦â€˜ËœÃ¨Â¦Â

| Ã¦Å’â€¡Ã¦Â â€¡ | Ã¦â€¢Â°Ã©â€¡Â |
|--------|-------|
| Ã¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€žÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯ | 3 |
| Ã¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€žÃ©â€œÂ¾Ã¦Å½Â¥Ã¥â„¢Â¨Ã©â€â„¢Ã¨Â¯Â¯ | 0 |
| Ã¥Â·Â²Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶ | 2 |
| Ã¥â€°Â©Ã¤Â½â„¢Ã©â€”Â®Ã©Â¢Ëœ | 0 |

Ã¦Å¾â€žÃ¥Â»ÂºÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å¡PASS: Ã¦Ë†ÂÃ¥Å Å¸

```
## Ã¥Â¸Â¸Ã¨Â§ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â®Ã¥Â¤Â

| Ã©â€â„¢Ã¨Â¯Â¯ | Ã¥â€¦Â¸Ã¥Å¾â€¹Ã¤Â¿Â®Ã¥Â¤ÂÃ¦â€“Â¹Ã¦Â³â€¢ |
|-------|-------------|
| `undeclared identifier` | Ã¦Â·Â»Ã¥Å Â  `#include` Ã¦Ë†â€“Ã¤Â¿Â®Ã¦Â­Â£Ã¦â€¹Â¼Ã¥â€ â„¢Ã©â€â„¢Ã¨Â¯Â¯ |
| `no matching function` | Ã¤Â¿Â®Ã¦Â­Â£Ã¥Ââ€šÃ¦â€¢Â°Ã§Â±Â»Ã¥Å¾â€¹Ã¦Ë†â€“Ã¦Â·Â»Ã¥Å Â Ã©â€¡ÂÃ¨Â½Â½Ã¥â€¡Â½Ã¦â€¢Â° |
| `undefined reference` | Ã©â€œÂ¾Ã¦Å½Â¥Ã¥Âºâ€œÃ¦Ë†â€“Ã¦Â·Â»Ã¥Å Â Ã¥Â®Å¾Ã§Å½Â° |
| `multiple definition` | Ã¤Â½Â¿Ã§â€Â¨ `inline` Ã¦Ë†â€“Ã§Â§Â»Ã¨â€¡Â³ .cpp Ã¦â€“â€¡Ã¤Â»Â¶ |
| `incomplete type` | Ã¥Â°â€ Ã¥â€°ÂÃ¥Ââ€˜Ã¥Â£Â°Ã¦ËœÅ½Ã¦â€ºÂ¿Ã¦ÂÂ¢Ã¤Â¸Âº `#include` |
| `no member named X` | Ã¤Â¿Â®Ã¦Â­Â£Ã¦Ë†ÂÃ¥â€˜ËœÃ¥ÂÂÃ§Â§Â°Ã¦Ë†â€“Ã¥Å’â€¦Ã¥ÂÂ«Ã¥Â¤Â´Ã¦â€“â€¡Ã¤Â»Â¶ |
| `cannot convert X to Y` | Ã¦Â·Â»Ã¥Å Â Ã©â‚¬â€šÃ¥Â½â€œÃ§Å¡â€žÃ§Â±Â»Ã¥Å¾â€¹Ã¨Â½Â¬Ã¦ÂÂ¢ |
| `CMake Error` | Ã¤Â¿Â®Ã¦Â­Â£ CMakeLists.txt Ã©â€¦ÂÃ§Â½Â® |

## Ã¤Â¿Â®Ã¥Â¤ÂÃ§Â­â€“Ã§â€¢Â¥

1. **Ã¤Â¼ËœÃ¥â€¦Ë†Ã¥Â¤â€žÃ§Ââ€ Ã§Â¼â€“Ã¨Â¯â€˜Ã©â€â„¢Ã¨Â¯Â¯** - Ã¤Â»Â£Ã§Â ÂÃ¥Â¿â€¦Ã©Â¡Â»Ã¨Æ’Â½Ã¥Â¤Å¸Ã§Â¼â€“Ã¨Â¯â€˜
2. **Ã¥â€¦Â¶Ã¦Â¬Â¡Ã¥Â¤â€žÃ§Ââ€ Ã©â€œÂ¾Ã¦Å½Â¥Ã¥â„¢Â¨Ã©â€â„¢Ã¨Â¯Â¯** - Ã¨Â§Â£Ã¥â€ Â³Ã¦Å“ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥Â¼â€¢Ã§â€Â¨
3. **Ã§Â¬Â¬Ã¤Â¸â€°Ã¥Â¤â€žÃ§Ââ€ Ã¨Â­Â¦Ã¥â€˜Å ** - Ã¤Â½Â¿Ã§â€Â¨ `-Wall -Wextra` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â¿Â®Ã¥Â¤Â
4. **Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¥ÂÂªÃ¤Â¿Â®Ã¥Â¤ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ©â€”Â®Ã©Â¢Ëœ** - Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¯ÂÃ¤Â¸ÂªÃ¦â€ºÂ´Ã¦â€Â¹
5. **Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¦â€Â¹Ã¥Å Â¨** - Ã¤Â»â€¦Ã¤Â¿Â®Ã¥Â¤ÂÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¤Â¸ÂÃ©â€¡ÂÃ¦Å¾â€žÃ¤Â»Â£Ã§Â Â

## Ã¥ÂÅ“Ã¦Â­Â¢Ã¦ÂÂ¡Ã¤Â»Â¶

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¯Â¼Å’Ã¤Â»Â£Ã§Ââ€ Ã¥Â°â€ Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Â¹Â¶Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡
- Ã¥ÂÅ’Ã¤Â¸â‚¬Ã©â€â„¢Ã¨Â¯Â¯Ã§Â»ÂÃ¨Â¿â€¡ 3 Ã¦Â¬Â¡Ã¥Â°ÂÃ¨Â¯â€¢Ã¥ÂÅ½Ã¤Â»ÂÃ§â€žÂ¶Ã¥Â­ËœÃ¥Å“Â¨
- Ã¤Â¿Â®Ã¥Â¤ÂÃ¥Â¼â€¢Ã¥â€¦Â¥Ã¤Âºâ€ Ã¦â€ºÂ´Ã¥Â¤Å¡Ã©â€â„¢Ã¨Â¯Â¯
- Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Å¾Â¶Ã¦Å¾â€žÃ¦â‚¬Â§Ã¦â€ºÂ´Ã¦â€Â¹
- Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹

## Ã§â€ºÂ¸Ã¥â€¦Â³Ã¥â€˜Â½Ã¤Â»Â¤

- `/cpp-test` - Ã¦Å¾â€žÃ¥Â»ÂºÃ¦Ë†ÂÃ¥Å Å¸Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
- `/cpp-review` - Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡Â
- `/verify` - Ã¥Â®Å’Ã¦â€¢Â´Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

## Ã§â€ºÂ¸Ã¥â€¦Â³

- Ã¤Â»Â£Ã§Ââ€ : `agents/cpp-build-resolver.md`
- Ã¦Å â‚¬Ã¨Æ’Â½: `skills/cpp-coding-standards/`
```
