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
# C++ Security

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


> This file extends [common/security.md](../common/security.md) with C++ specific content.

## Memory Safety

- Never use raw `new`/`delete` Ã¢â‚¬â€ use smart pointers
- Never use C-style arrays Ã¢â‚¬â€ use `std::array` or `std::vector`
- Never use `malloc`/`free` Ã¢â‚¬â€ use C++ allocation
- Avoid `reinterpret_cast` unless absolutely necessary

## Buffer Overflows

- Use `std::string` over `char*`
- Use `.at()` for bounds-checked access when safety matters
- Never use `strcpy`, `strcat`, `sprintf` Ã¢â‚¬â€ use `std::string` or `fmt::format`

## Undefined Behavior

- Always initialize variables
- Avoid signed integer overflow
- Never dereference null or dangling pointers
- Use sanitizers in CI:
  ```bash
  cmake -DCMAKE_CXX_FLAGS="-fsanitize=address,undefined" ..
  ```

## Static Analysis

- Use **clang-tidy** for automated checks:
  ```bash
  clang-tidy --checks='*' src/*.cpp
  ```
- Use **cppcheck** for additional analysis:
  ```bash
  cppcheck --enable=all src/
  ```

## Reference

See skill: `cpp-coding-standards` for detailed security guidelines.
