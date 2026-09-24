---
description: Ã¤Â¸Âº C++ Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’ TDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã£â‚¬â€šÃ¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢ GoogleTest Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¥Â®Å¾Ã§Å½Â°Ã£â‚¬â€šÃ¤Â½Â¿Ã§â€Â¨ gcov/lcov Ã©ÂªÅ’Ã¨Â¯ÂÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã£â‚¬â€š
---

# C++ TDD Ã¥â€˜Â½Ã¤Â»Â¤

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


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¤Â½Â¿Ã§â€Â¨ GoogleTest/GoogleMock Ã¤Â¸Å½ CMake/CTestÃ¯Â¼Å’Ã¤Â¸Âº C++ Ã¤Â»Â£Ã§Â ÂÃ¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦â€“Â¹Ã¦Â³â€¢Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã¥Â®Å¡Ã¤Â¹â€°Ã¦Å½Â¥Ã¥ÂÂ£**Ã¯Â¼Å¡Ã©Â¦â€“Ã¥â€¦Ë†Ã¦ÂÂ­Ã¥Â»ÂºÃ§Â±Â»/Ã¥â€¡Â½Ã¦â€¢Â°Ã§Â­Â¾Ã¥ÂÂ
2. **Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Å¡Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž GoogleTest Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§â€Â¨Ã¤Â¾â€¹Ã¯Â¼Ë†RED Ã©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼â€°
3. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Å¡Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€ºÂ Ã¦Â­Â£Ã§Â¡Â®Ã¥Å½Å¸Ã¥â€ºÂ Ã¥Â¤Â±Ã¨Â´Â¥
4. **Ã¥Â®Å¾Ã§Å½Â°Ã¤Â»Â£Ã§Â Â**Ã¯Â¼Å¡Ã§Â¼â€“Ã¥â€ â„¢Ã¦Å“â‚¬Ã¥Â°â€˜Ã¤Â»Â£Ã§Â ÂÃ¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†GREEN Ã©ËœÂ¶Ã¦Â®ÂµÃ¯Â¼â€°
5. **Ã©â€¡ÂÃ¦Å¾â€ž**Ã¯Â¼Å¡Ã¥Å“Â¨Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡Ã§Å¡â€žÃ¥ÂÅ’Ã¦â€”Â¶Ã¦â€Â¹Ã¨Â¿â€ºÃ¤Â»Â£Ã§Â Â
6. **Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡**Ã¯Â¼Å¡Ã§Â¡Â®Ã¤Â¿ÂÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¥Å“Â¨ 80% Ã¤Â»Â¥Ã¤Â¸Å 

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â½Â¿Ã§â€Â¨ `/cpp-test`Ã¯Â¼Å¡

* Ã¥Â®Å¾Ã§Å½Â°Ã¦â€“Â°Ã§Å¡â€ž C++ Ã¥â€¡Â½Ã¦â€¢Â°Ã¦Ë†â€“Ã§Â±Â»Ã¦â€”Â¶
* Ã¤Â¸ÂºÃ§Å½Â°Ã¦Å“â€°Ã¤Â»Â£Ã§Â ÂÃ¥Â¢Å¾Ã¥Å Â Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¦â€”Â¶
* Ã¤Â¿Â®Ã¥Â¤ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¦â€”Â¶Ã¯Â¼Ë†Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°
* Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â€¦Â³Ã©â€Â®Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¦â€”Â¶
* Ã¥Â­Â¦Ã¤Â¹Â  C++ Ã¤Â¸Â­Ã§Å¡â€ž TDD Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¦â€”Â¶

## TDD Ã¥Â¾ÂªÃ§Å½Â¯

```
RED     Ã¢â€ â€™ Ã§Â¼â€“Ã¥â€ â„¢Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€ž GoogleTest Ã¦Âµâ€¹Ã¨Â¯â€¢
GREEN   Ã¢â€ â€™ Ã¥Â®Å¾Ã§Å½Â°Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¤Â»Â£Ã§Â ÂÃ¤Â»Â¥Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢
REFACTOR Ã¢â€ â€™ Ã¦â€Â¹Ã¨Â¿â€ºÃ¤Â»Â£Ã§Â ÂÃ¯Â¼Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¿ÂÃ¦Å’ÂÃ©â‚¬Å¡Ã¨Â¿â€¡
REPEAT  Ã¢â€ â€™ Ã¤Â¸â€¹Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Âµâ€¹Ã¨Â¯â€¢Ã§â€Â¨Ã¤Â¾â€¹
```

## Ã§Â¤ÂºÃ¤Â¾â€¹Ã¤Â¼Å¡Ã¨Â¯Â

````
User: /cpp-test I need a function to validate email addresses

Agent:
# TDD Session: Email Validator

## Step 1: Define Interface

```cpp
// validator/email.hpp
#pragma once
#include <string>
#include <expected>

enum class EmailError {
    Empty,
    InvalidFormat
};

std::expected<void, EmailError> validate_email(const std::string& email);
```

## Step 2: Write Tests (RED)

```cpp
// validator/email_test.cpp
#include <gtest/gtest.h>
#include "email.hpp"

TEST(ValidateEmail, AcceptsSimpleEmail) {
    auto result = validate_email("user@example.com");
    EXPECT_TRUE(result.has_value());
}

TEST(ValidateEmail, AcceptsSubdomain) {
    EXPECT_TRUE(validate_email("user@mail.example.com").has_value());
}

TEST(ValidateEmail, AcceptsPlus) {
    EXPECT_TRUE(validate_email("user+tag@example.com").has_value());
}

TEST(ValidateEmail, RejectsEmpty) {
    auto result = validate_email("");
    ASSERT_FALSE(result.has_value());
    EXPECT_EQ(result.error(), EmailError::Empty);
}

TEST(ValidateEmail, RejectsNoAtSign) {
    EXPECT_FALSE(validate_email("userexample.com").has_value());
}

TEST(ValidateEmail, RejectsNoDomain) {
    EXPECT_FALSE(validate_email("user@").has_value());
}

TEST(ValidateEmail, RejectsNoLocalPart) {
    EXPECT_FALSE(validate_email("@example.com").has_value());
}
```

## Step 3: Run Tests - Verify FAIL

```bash
$ cmake --build build && ctest --test-dir build --output-on-failure

1/1 Test #1: email_validator_test .....***Failed
    --- undefined reference to `validate_email`

FAIL
```

Ã¢Å“â€œ Tests fail as expected (unimplemented).

## Step 4: Implement Minimal Code (GREEN)

```cpp
// validator/email.cpp
#include "email.hpp"
#include <regex>

std::expected<void, EmailError> validate_email(const std::string& email) {
    if (email.empty()) {
        return std::unexpected(EmailError::Empty);
    }
    static const std::regex pattern(R"([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})");
    if (!std::regex_match(email, pattern)) {
        return std::unexpected(EmailError::InvalidFormat);
    }
    return {};
}
```

## Step 5: Run Tests - Verify PASS

```bash
$ cmake --build build && ctest --test-dir build --output-on-failure

1/1 Test #1: email_validator_test .....   Passed    0.01 sec

100% tests passed.
```

Ã¢Å“â€œ All tests passing!

## Step 6: Check Coverage

```bash
$ cmake -DCMAKE_CXX_FLAGS="--coverage" -B build && cmake --build build
$ ctest --test-dir build
$ lcov --capture --directory build --output-file coverage.info
$ lcov --list coverage.info

validator/email.cpp     | 100%
```

Ã¢Å“â€œ Coverage: 100%

## TDD Complete!
````

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¥Å¸ÂºÃ§Â¡â‚¬Ã¦Âµâ€¹Ã¨Â¯â€¢

```cpp
TEST(SuiteName, TestName) {
    EXPECT_EQ(add(2, 3), 5);
    EXPECT_NE(result, nullptr);
    EXPECT_TRUE(is_valid);
    EXPECT_THROW(func(), std::invalid_argument);
}
```

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¤Â¹Ã¥â€¦Â·

```cpp
class DatabaseTest : public ::testing::Test {
protected:
    void SetUp() override { db_ = create_test_db(); }
    void TearDown() override { db_.reset(); }
    std::unique_ptr<Database> db_;
};

TEST_F(DatabaseTest, InsertsRecord) {
    db_->insert("key", "value");
    EXPECT_EQ(db_->get("key"), "value");
}
```

### Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Âµâ€¹Ã¨Â¯â€¢

```cpp
class PrimeTest : public ::testing::TestWithParam<std::pair<int, bool>> {};

TEST_P(PrimeTest, ChecksPrimality) {
    auto [input, expected] = GetParam();
    EXPECT_EQ(is_prime(input), expected);
}

INSTANTIATE_TEST_SUITE_P(Primes, PrimeTest, ::testing::Values(
    std::make_pair(2, true),
    std::make_pair(4, false),
    std::make_pair(7, true)
));
```

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¥â€˜Â½Ã¤Â»Â¤

```bash
# Build with coverage
cmake -DCMAKE_CXX_FLAGS="--coverage" -DCMAKE_EXE_LINKER_FLAGS="--coverage" -B build

# Run tests
cmake --build build && ctest --test-dir build

# Generate coverage report
lcov --capture --directory build --output-file coverage.info
lcov --remove coverage.info '/usr/*' --output-file coverage.info
genhtml coverage.info --output-directory coverage_html
```

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§â€ºÂ®Ã¦Â â€¡

| Ã¤Â»Â£Ã§Â ÂÃ§Â±Â»Ã¥Å¾â€¹ | Ã§â€ºÂ®Ã¦Â â€¡ |
|-----------|--------|
| Ã¥â€¦Â³Ã©â€Â®Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜ | 100% |
| Ã¥â€¦Â¬Ã¥â€¦Â± API | 90%+ |
| Ã©â‚¬Å¡Ã§â€Â¨Ã¤Â»Â£Ã§Â Â | 80%+ |
| Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€žÃ¤Â»Â£Ã§Â Â | Ã¦Å½â€™Ã©â„¢Â¤ |

## TDD Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

**Ã¥Âºâ€Ã¥ÂÅ¡Ã¯Â¼Å¡**

* Ã¥â€¦Ë†Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã¥â€ ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã¤Â»Â»Ã¤Â½â€¢Ã¥Â®Å¾Ã§Å½Â°
* Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¥Å“Â¨Ã©â‚¬â€šÃ¥Â½â€œÃ¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ `EXPECT_*`Ã¯Â¼Ë†Ã§Â»Â§Ã§Â»Â­Ã¯Â¼â€°Ã¨â‚¬Å’Ã©ÂÅ¾ `ASSERT_*`Ã¯Â¼Ë†Ã¥ÂÅ“Ã¦Â­Â¢Ã¯Â¼â€°
* Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¡Å’Ã¤Â¸ÂºÃ¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â®Å¾Ã§Å½Â°Ã§Â»â€ Ã¨Å â€š
* Ã¥Å’â€¦Ã¥ÂÂ«Ã¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Ë†Ã§Â©ÂºÃ¥â‚¬Â¼Ã£â‚¬ÂnullÃ£â‚¬ÂÃ¦Å“â‚¬Ã¥Â¤Â§Ã¥â‚¬Â¼Ã£â‚¬ÂÃ¨Â¾Â¹Ã§â€¢Å’Ã¦ÂÂ¡Ã¤Â»Â¶Ã¯Â¼â€°

**Ã¤Â¸ÂÃ¥Âºâ€Ã¥ÂÅ¡Ã¯Â¼Å¡**

* Ã¥Å“Â¨Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¹â€¹Ã¥â€°ÂÃ¥Â®Å¾Ã§Å½Â°Ã¤Â»Â£Ã§Â Â
* Ã¨Â·Â³Ã¨Â¿â€¡ RED Ã©ËœÂ¶Ã¦Â®Âµ
* Ã§â€ºÂ´Ã¦Å½Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â§ÂÃ¦Å“â€°Ã¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Ë†Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥â€¦Â¬Ã¥â€¦Â± API Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼â€°
* Ã¥Å“Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `sleep`
* Ã¥Â¿Â½Ã§â€¢Â¥Ã¤Â¸ÂÃ§Â¨Â³Ã¥Â®Å¡Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢

## Ã§â€ºÂ¸Ã¥â€¦Â³Ã¥â€˜Â½Ã¤Â»Â¤

* `/cpp-build` - Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯
* `/cpp-review` - Ã¥Å“Â¨Ã¥Â®Å¾Ã§Å½Â°Ã¥ÂÅ½Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â Â
* `/verify` - Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

## Ã§â€ºÂ¸Ã¥â€¦Â³

* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/cpp-testing/`
* Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`skills/tdd-workflow/`
