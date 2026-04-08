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
# C++ Patterns

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> This file extends [common/patterns.md](../common/patterns.md) with C++ specific content.

## RAII (Resource Acquisition Is Initialization)

Tie resource lifetime to object lifetime:

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

## Rule of Five/Zero

- **Rule of Zero**: Prefer classes that need no custom destructor, copy/move constructors, or assignments
- **Rule of Five**: If you define any of destructor/copy-ctor/copy-assign/move-ctor/move-assign, define all five

## Value Semantics

- Pass small/trivial types by value
- Pass large types by `const&`
- Return by value (rely on RVO/NRVO)
- Use move semantics for sink parameters

## Error Handling

- Use exceptions for exceptional conditions
- Use `std::optional` for values that may not exist
- Use `std::expected` (C++23) or result types for expected failures

## Reference

See skill: `cpp-coding-standards` for comprehensive C++ patterns and anti-patterns.
