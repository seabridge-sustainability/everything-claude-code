---
name: swift-actor-persistence
description: 在 Swift 中使用 actor 实现线程安全的数据持久化——基于内存缓存与文件支持的存储，通过设计消除数据竞争。
origin: ECC
---

# 用于线程安全持久化的 Swift Actor

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


使用 Swift actor 构建线程安全数据持久化层的模式。结合内存缓存与文件支持的存储，利用 actor 模型在编译时消除数据竞争。

## 何时激活

* 在 Swift 5.5+ 中构建数据持久化层
* 需要对共享可变状态进行线程安全访问
* 希望消除手动同步（锁、DispatchQueue）
* 构建具有本地存储的离线优先应用

## 核心模式

### 基于 Actor 的存储库

Actor 模型保证了序列化访问 —— 没有数据竞争，由编译器强制执行。

```swift
public actor LocalRepository<T: Codable & Identifiable> where T.ID == String {
    private var cache: [String: T] = [:]
    private let fileURL: URL

    public init(directory: URL = .documentsDirectory, filename: String = "data.json") {
        self.fileURL = directory.appendingPathComponent(filename)
        // Synchronous load during init (actor isolation not yet active)
        self.cache = Self.loadSynchronously(from: fileURL)
    }

    // MARK: - Public API

    public func save(_ item: T) throws {
        cache[item.id] = item
        try persistToFile()
    }

    public func delete(_ id: String) throws {
        cache[id] = nil
        try persistToFile()
    }

    public func find(by id: String) -> T? {
        cache[id]
    }

    public func loadAll() -> [T] {
        Array(cache.values)
    }

    // MARK: - Private

    private func persistToFile() throws {
        let data = try JSONEncoder().encode(Array(cache.values))
        try data.write(to: fileURL, options: .atomic)
    }

    private static func loadSynchronously(from url: URL) -> [String: T] {
        guard let data = try? Data(contentsOf: url),
              let items = try? JSONDecoder().decode([T].self, from: data) else {
            return [:]
        }
        return Dictionary(uniqueKeysWithValues: items.map { ($0.id, $0) })
    }
}
```

### 用法

由于 actor 隔离，所有调用都会自动变为异步：

```swift
let repository = LocalRepository<Question>()

// Read — fast O(1) lookup from in-memory cache
let question = await repository.find(by: "q-001")
let allQuestions = await repository.loadAll()

// Write — updates cache and persists to file atomically
try await repository.save(newQuestion)
try await repository.delete("q-001")
```

### 与 @Observable ViewModel 结合使用

```swift
@Observable
final class QuestionListViewModel {
    private(set) var questions: [Question] = []
    private let repository: LocalRepository<Question>

    init(repository: LocalRepository<Question> = LocalRepository()) {
        self.repository = repository
    }

    func load() async {
        questions = await repository.loadAll()
    }

    func add(_ question: Question) async throws {
        try await repository.save(question)
        questions = await repository.loadAll()
    }
}
```

## 关键设计决策

| 决策 | 理由 |
|----------|-----------|
| Actor（而非类 + 锁） | 编译器强制执行的线程安全性，无需手动同步 |
| 内存缓存 + 文件持久化 | 从缓存中快速读取，持久化写入磁盘 |
| 同步初始化加载 | 避免异步初始化的复杂性 |
| 按 ID 键控的字典 | 按标识符进行 O(1) 查找 |
| 泛型化 `Codable & Identifiable` | 可在任何模型类型中重复使用 |
| 原子文件写入 (`.atomic`) | 防止崩溃时部分写入 |

## 最佳实践

* **对所有跨越 actor 边界的数据使用 `Sendable` 类型**
* **保持 actor 的公共 API 最小化** —— 仅暴露领域操作，而非持久化细节
* **使用 `.atomic` 写入** 以防止应用在写入过程中崩溃导致数据损坏
* **在 `init` 中同步加载** —— 异步初始化器会增加复杂性，而对本地文件的益处微乎其微
* **与 `@Observable` ViewModel 结合使用** 以实现响应式 UI 更新

## 应避免的反模式

* 在 Swift 并发新代码中使用 `DispatchQueue` 或 `NSLock` 而非 actor
* 将内部缓存字典暴露给外部调用者
* 在不进行验证的情况下使文件 URL 可配置
* 忘记所有 actor 方法调用都是 `await` —— 调用者必须处理异步上下文
* 使用 `nonisolated` 来绕过 actor 隔离（违背了初衷）

## 何时使用

* iOS/macOS 应用中的本地数据存储（用户数据、设置、缓存内容）
* 稍后同步到服务器的离线优先架构
* 应用中多个部分并发访问的任何共享可变状态
* 用现代 Swift 并发性替换基于 `DispatchQueue` 的旧式线程安全机制
