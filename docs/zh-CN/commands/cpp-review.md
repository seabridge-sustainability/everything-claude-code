---
description: Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž C++ Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Å’Ã¦Â¶ÂµÃ§â€ºâ€“Ã¥â€ â€¦Ã¥Â­ËœÃ¥Â®â€°Ã¥â€¦Â¨Ã£â‚¬ÂÃ§Å½Â°Ã¤Â»Â£ C++ Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢Ã£â‚¬ÂÃ¥Â¹Â¶Ã¥Ââ€˜Ã¦â‚¬Â§Ã¥â€™Å’Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã£â‚¬â€šÃ¨Â°Æ’Ã§â€Â¨ cpp-reviewer Ã¤Â»Â£Ã§Ââ€ Ã£â‚¬â€š
---

# C++ Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥

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


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨ **cpp-reviewer** Ã¤Â»Â£Ã§Ââ€ Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž C++ Ã§â€°Â¹Ã¥Â®Å¡Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã¨Â¯â€ Ã¥Ë†Â« C++ Ã¥ÂËœÃ¦â€ºÂ´**Ã¯Â¼Å¡Ã©â‚¬Å¡Ã¨Â¿â€¡ `git diff` Ã¦Å¸Â¥Ã¦â€°Â¾Ã¥Â·Â²Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€ž `.cpp`Ã£â‚¬Â`.hpp`Ã£â‚¬Â`.cc`Ã£â‚¬Â`.h` Ã¦â€“â€¡Ã¤Â»Â¶
2. **Ã¨Â¿ÂÃ¨Â¡Å’Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾Â**Ã¯Â¼Å¡Ã¦â€°Â§Ã¨Â¡Å’ `clang-tidy` Ã¥â€™Å’ `cppcheck`
3. **Ã¥â€ â€¦Ã¥Â­ËœÃ¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥Å½Å¸Ã¥Â§â€¹ new/deleteÃ£â‚¬ÂÃ§Â¼â€œÃ¥â€ Â²Ã¥Å’ÂºÃ¦ÂºÂ¢Ã¥â€¡ÂºÃ£â‚¬ÂÃ©â€¡Å Ã¦â€Â¾Ã¥ÂÅ½Ã¤Â½Â¿Ã§â€Â¨
4. **Ã¥Â¹Â¶Ã¥Ââ€˜Ã¥Â®Â¡Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã¥Ë†â€ Ã¦Å¾ÂÃ§ÂºÂ¿Ã§Â¨â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã£â‚¬ÂÃ¤Âºâ€™Ã¦â€“Â¥Ã©â€ÂÃ¤Â½Â¿Ã§â€Â¨Ã¦Æ’â€¦Ã¥â€ ÂµÃ£â‚¬ÂÃ¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°
5. **Ã§Å½Â°Ã¤Â»Â£ C++ Ã¦Â£â‚¬Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã©ÂªÅ’Ã¨Â¯ÂÃ¤Â»Â£Ã§Â ÂÃ¦ËœÂ¯Ã¥ÂÂ¦Ã©ÂÂµÃ¥Â¾Âª C++17/20 Ã§ÂºÂ¦Ã¥Â®Å¡Ã¥â€™Å’Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ
6. **Ã§â€Å¸Ã¦Ë†ÂÃ¦Å Â¥Ã¥â€˜Å **Ã¯Â¼Å¡Ã¦Å’â€°Ã¤Â¸Â¥Ã©â€¡ÂÃ§Â¨â€¹Ã¥ÂºÂ¦Ã¥Â¯Â¹Ã©â€”Â®Ã©Â¢ËœÃ¨Â¿â€ºÃ¨Â¡Å’Ã¥Ë†â€ Ã§Â±Â»

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶Ã¦Å“Âº

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¤Â½Â¿Ã§â€Â¨ `/cpp-review`Ã¯Â¼Å¡

* Ã§Â¼â€“Ã¥â€ â„¢Ã¦Ë†â€“Ã¤Â¿Â®Ã¦â€Â¹ C++ Ã¤Â»Â£Ã§Â ÂÃ¥ÂÅ½
* Ã¦ÂÂÃ¤ÂºÂ¤ C++ Ã¥ÂËœÃ¦â€ºÂ´Ã¥â€°Â
* Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥Å’â€¦Ã¥ÂÂ« C++ Ã¤Â»Â£Ã§Â ÂÃ§Å¡â€žÃ¦â€¹â€°Ã¥Ââ€“Ã¨Â¯Â·Ã¦Â±â€šÃ¦â€”Â¶
* Ã¦Å½Â¥Ã¦â€°â€¹Ã¦â€“Â°Ã§Å¡â€ž C++ Ã¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ¦â€”Â¶
* Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥â€ â€¦Ã¥Â­ËœÃ¥Â®â€°Ã¥â€¦Â¨Ã©â€”Â®Ã©Â¢Ëœ

## Ã¥Â®Â¡Ã¦Å¸Â¥Ã§Â±Â»Ã¥Ë†Â«

### Ã¤Â¸Â¥Ã©â€¡ÂÃ¯Â¼Ë†Ã¥Â¿â€¦Ã©Â¡Â»Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼â€°

* Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨ RAII Ã§Å¡â€žÃ¥Å½Å¸Ã¥Â§â€¹ `new`/`delete`
* Ã§Â¼â€œÃ¥â€ Â²Ã¥Å’ÂºÃ¦ÂºÂ¢Ã¥â€¡ÂºÃ¥â€™Å’Ã©â€¡Å Ã¦â€Â¾Ã¥ÂÅ½Ã¤Â½Â¿Ã§â€Â¨
* Ã¦â€”Â Ã¥ÂÅ’Ã¦Â­Â¥Ã§Å¡â€žÃ¦â€¢Â°Ã¦ÂÂ®Ã§Â«Å¾Ã¤Âºâ€°
* Ã©â‚¬Å¡Ã¨Â¿â€¡ `system()` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥â€˜Â½Ã¤Â»Â¤Ã¦Â³Â¨Ã¥â€¦Â¥
* Ã¦Å“ÂªÃ¥Ë†ÂÃ¥Â§â€¹Ã¥Å’â€“Ã§Å¡â€žÃ¥ÂËœÃ©â€¡ÂÃ¨Â¯Â»Ã¥Ââ€“
* Ã§Â©ÂºÃ¦Å’â€¡Ã©â€™Ë†Ã¨Â§Â£Ã¥Â¼â€¢Ã§â€Â¨

### Ã©Â«ËœÃ¯Â¼Ë†Ã¥Âºâ€Ã¨Â¯Â¥Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼â€°

* Ã¤Âºâ€Ã¦Â³â€¢Ã¥Ë†â„¢Ã¨Â¿ÂÃ¨Â§â€ž
* Ã§Â¼ÂºÃ¥Â°â€˜ `std::lock_guard` / `std::scoped_lock`
* Ã¥Ë†â€ Ã§Â¦Â»Ã§Å¡â€žÃ§ÂºÂ¿Ã§Â¨â€¹Ã¦Â²Â¡Ã¦Å“â€°Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€žÃ§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã§Â®Â¡Ã§Ââ€ 
* Ã¤Â½Â¿Ã§â€Â¨ C Ã©Â£Å½Ã¦Â Â¼Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¨Â½Â¬Ã¦ÂÂ¢Ã¨â‚¬Å’Ã©ÂÅ¾ `static_cast`/`dynamic_cast`
* Ã§Â¼ÂºÃ¥Â°â€˜ `const` Ã¦Â­Â£Ã§Â¡Â®Ã¦â‚¬Â§

### Ã¤Â¸Â­Ã¯Â¼Ë†Ã¨â‚¬Æ’Ã¨â„¢â€˜Ã¯Â¼â€°

* Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ¦â€¹Â·Ã¨Â´ÂÃ¯Â¼Ë†Ã¦Å’â€°Ã¥â‚¬Â¼Ã¤Â¼Â Ã©â‚¬â€™Ã¨â‚¬Å’Ã©ÂÅ¾ `const&`Ã¯Â¼â€°
* Ã¥Â·Â²Ã§Å¸Â¥Ã¥Â¤Â§Ã¥Â°ÂÃ§Å¡â€žÃ¥Â®Â¹Ã¥â„¢Â¨Ã¤Â¸Å Ã§Â¼ÂºÃ¥Â°â€˜ `reserve()`
* Ã¥Â¤Â´Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Â­Ã§Å¡â€ž `using namespace std;`
* Ã©â€¡ÂÃ¨Â¦ÂÃ¨Â¿â€Ã¥â€ºÅ¾Ã¥â‚¬Â¼Ã¤Â¸Å Ã§Â¼ÂºÃ¥Â°â€˜ `[[nodiscard]]`
* Ã¨Â¿â€¡Ã¤ÂºÅ½Ã¥Â¤ÂÃ¦Ââ€šÃ§Å¡â€žÃ¦Â¨Â¡Ã¦ÂÂ¿Ã¥â€¦Æ’Ã§Â¼â€“Ã§Â¨â€¹

## Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦Â£â‚¬Ã¦Å¸Â¥

```bash
# Static analysis
clang-tidy --checks='*,-llvmlibc-*' src/*.cpp -- -std=c++17

# Additional analysis
cppcheck --enable=all --suppress=missingIncludeSystem src/

# Build with warnings
cmake --build build -- -Wall -Wextra -Wpedantic
```

## Ã¤Â½Â¿Ã§â€Â¨Ã§Â¤ÂºÃ¤Â¾â€¹

````text
# C++ Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¦Å Â¥Ã¥â€˜Å 

## Ã¥Â·Â²Ã¥Â®Â¡Ã¦Å¸Â¥Ã¦â€“â€¡Ã¤Â»Â¶
- src/handler/user.cpp (Ã¥Â·Â²Ã¤Â¿Â®Ã¦â€Â¹)
- src/service/auth.cpp (Ã¥Â·Â²Ã¤Â¿Â®Ã¦â€Â¹)

## Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾ÂÃ§Â»â€œÃ¦Å¾Å“
Ã¢Å“â€œ clang-tidy: 2 Ã¤Â¸ÂªÃ¨Â­Â¦Ã¥â€˜Å 
Ã¢Å“â€œ cppcheck: Ã¦â€”Â Ã©â€”Â®Ã©Â¢Ëœ

## Ã¥Ââ€˜Ã§Å½Â°Ã§Å¡â€žÃ©â€”Â®Ã©Â¢Ëœ

[Ã¤Â¸Â¥Ã©â€¡Â] Ã¥â€ â€¦Ã¥Â­ËœÃ¦Â³â€žÃ¦Â¼Â
Ã¦â€“â€¡Ã¤Â»Â¶: src/service/auth.cpp:45
Ã©â€”Â®Ã©Â¢Ëœ: Ã¤Â½Â¿Ã§â€Â¨Ã¤Âºâ€ Ã¥Å½Å¸Ã¥Â§â€¹Ã§Å¡â€ž `new` Ã¨â‚¬Å’Ã¦Â²Â¡Ã¦Å“â€°Ã¥Å’Â¹Ã©â€¦ÂÃ§Å¡â€ž `delete`
```cpp
auto* session = new Session(userId);  // Ã¥â€ â€¦Ã¥Â­ËœÃ¦Â³â€žÃ¦Â¼ÂÃ¯Â¼Â
cache[userId] = session;
````

Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ `std::unique_ptr`

```cpp
auto session = std::make_unique<Session>(userId);
cache[userId] = std::move(session);
```

\[Ã©Â«Ëœ] Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Â¸Â¸Ã©â€¡ÂÃ¥Â¼â€¢Ã§â€Â¨
Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡src/handler/user.cpp:28
Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å¡Ã¥Â¤Â§Ã¥Â¯Â¹Ã¨Â±Â¡Ã¦Å’â€°Ã¥â‚¬Â¼Ã¤Â¼Â Ã©â‚¬â€™

```cpp
void processUser(User user) {  // Unnecessary copy
```

Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å¡Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥Â¸Â¸Ã©â€¡ÂÃ¥Â¼â€¢Ã§â€Â¨Ã¤Â¼Â Ã©â‚¬â€™

```cpp
void processUser(const User& user) {
```

## Ã¦â€˜ËœÃ¨Â¦Â

* Ã¤Â¸Â¥Ã©â€¡ÂÃ¯Â¼Å¡1
* Ã©Â«ËœÃ¯Â¼Å¡1
* Ã¤Â¸Â­Ã¯Â¼Å¡0

Ã¥Â»ÂºÃ¨Â®Â®Ã¯Â¼Å¡FAIL: Ã¥Å“Â¨Ã¤Â¸Â¥Ã©â€¡ÂÃ©â€”Â®Ã©Â¢ËœÃ¤Â¿Â®Ã¥Â¤ÂÃ¥â€°ÂÃ©ËœÂ»Ã¦Â­Â¢Ã¥ÂË†Ã¥Â¹Â¶

```
## Ã¦â€°Â¹Ã¥â€¡â€ Ã¦Â â€¡Ã¥â€¡â€ 

| Ã§Å Â¶Ã¦â‚¬Â | Ã¦ÂÂ¡Ã¤Â»Â¶ |
|--------|-----------|
| PASS: Ã¦â€°Â¹Ã¥â€¡â€  | Ã¦Â²Â¡Ã¦Å“â€° CRITICAL Ã¦Ë†â€“ HIGH Ã§ÂºÂ§Ã¥Ë†Â«Ã§Å¡â€žÃ©â€”Â®Ã©Â¢Ëœ |
| WARNING: Ã¨Â­Â¦Ã¥â€˜Å  | Ã¤Â»â€¦Ã¦Å“â€° MEDIUM Ã§ÂºÂ§Ã¥Ë†Â«Ã§Å¡â€žÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†Ã¨Â°Â¨Ã¦â€¦Å½Ã¥ÂË†Ã¥Â¹Â¶Ã¯Â¼â€° |
| FAIL: Ã©ËœÂ»Ã¦Â­Â¢ | Ã¥Ââ€˜Ã§Å½Â° CRITICAL Ã¦Ë†â€“ HIGH Ã§ÂºÂ§Ã¥Ë†Â«Ã§Å¡â€žÃ©â€”Â®Ã©Â¢Ëœ |

## Ã¤Â¸Å½Ã¥â€¦Â¶Ã¤Â»â€“Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†Â

- Ã©Â¦â€“Ã¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `/cpp-test` Ã§Â¡Â®Ã¤Â¿ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
- Ã¥Â¦â€šÃ¦Å¾Å“Ã¥â€¡ÂºÃ§Å½Â°Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å’Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨ `/cpp-build`
- Ã¥Å“Â¨Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°ÂÃ¤Â½Â¿Ã§â€Â¨ `/cpp-review`
- Ã¥Â¯Â¹Ã¤ÂºÅ½Ã©ÂÅ¾ C++ Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨ `/code-review`

## Ã§â€ºÂ¸Ã¥â€¦Â³

- Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å¡`agents/cpp-reviewer.md`
- Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/cpp-coding-standards/`, `skills/cpp-testing/`
```
