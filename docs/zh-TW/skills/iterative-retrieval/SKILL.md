---
name: iterative-retrieval
description: Pattern for progressively refining context retrieval to solve the subagent context problem
---

# 迭代檢索模式

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


解決多 agent 工作流程中的「上下文問題」，其中子 agents 在開始工作之前不知道需要什麼上下文。

## 問題

子 agents 以有限上下文產生。它們不知道：
- 哪些檔案包含相關程式碼
- 程式碼庫中存在什麼模式
- 專案使用什麼術語

標準方法失敗：
- **傳送所有內容**：超過上下文限制
- **不傳送內容**：Agent 缺乏關鍵資訊
- **猜測需要什麼**：經常錯誤

## 解決方案：迭代檢索

一個漸進精煉上下文的 4 階段循環：

```
┌─────────────────────────────────────────────┐
│                                             │
│   ┌──────────┐      ┌──────────┐            │
│   │ DISPATCH │─────│ EVALUATE │            │
│   └──────────┘      └──────────┘            │
│        ▲                  │                 │
│        │                  ▼                 │
│   ┌──────────┐      ┌──────────┐            │
│   │   LOOP   │─────│  REFINE  │            │
│   └──────────┘      └──────────┘            │
│                                             │
│        最多 3 個循環，然後繼續               │
└─────────────────────────────────────────────┘
```

### 階段 1：DISPATCH

初始廣泛查詢以收集候選檔案：

```javascript
// 從高層意圖開始
const initialQuery = {
  patterns: ['src/**/*.ts', 'lib/**/*.ts'],
  keywords: ['authentication', 'user', 'session'],
  excludes: ['*.test.ts', '*.spec.ts']
};

// 派遣到檢索 agent
const candidates = await retrieveFiles(initialQuery);
```

### 階段 2：EVALUATE

評估檢索內容的相關性：

```javascript
function evaluateRelevance(files, task) {
  return files.map(file => ({
    path: file.path,
    relevance: scoreRelevance(file.content, task),
    reason: explainRelevance(file.content, task),
    missingContext: identifyGaps(file.content, task)
  }));
}
```

評分標準：
- **高（0.8-1.0）**：直接實作目標功能
- **中（0.5-0.7）**：包含相關模式或類型
- **低（0.2-0.4）**：間接相關
- **無（0-0.2）**：不相關，排除

### 階段 3：REFINE

基於評估更新搜尋標準：

```javascript
function refineQuery(evaluation, previousQuery) {
  return {
    // 新增在高相關性檔案中發現的新模式
    patterns: [...previousQuery.patterns, ...extractPatterns(evaluation)],

    // 新增在程式碼庫中找到的術語
    keywords: [...previousQuery.keywords, ...extractKeywords(evaluation)],

    // 排除確認不相關的路徑
    excludes: [...previousQuery.excludes, ...evaluation
      .filter(e => e.relevance < 0.2)
      .map(e => e.path)
    ],

    // 針對特定缺口
    focusAreas: evaluation
      .flatMap(e => e.missingContext)
      .filter(unique)
  };
}
```

### 階段 4：LOOP

以精煉標準重複（最多 3 個循環）：

```javascript
async function iterativeRetrieve(task, maxCycles = 3) {
  let query = createInitialQuery(task);
  let bestContext = [];

  for (let cycle = 0; cycle < maxCycles; cycle++) {
    const candidates = await retrieveFiles(query);
    const evaluation = evaluateRelevance(candidates, task);

    // 檢查是否有足夠上下文
    const highRelevance = evaluation.filter(e => e.relevance >= 0.7);
    if (highRelevance.length >= 3 && !hasCriticalGaps(evaluation)) {
      return highRelevance;
    }

    // 精煉並繼續
    query = refineQuery(evaluation, query);
    bestContext = mergeContext(bestContext, highRelevance);
  }

  return bestContext;
}
```

## 實際範例

### 範例 1：Bug 修復上下文

```
任務：「修復認證 token 過期 bug」

循環 1：
  DISPATCH：在 src/** 搜尋 "token"、"auth"、"expiry"
  EVALUATE：找到 auth.ts (0.9)、tokens.ts (0.8)、user.ts (0.3)
  REFINE：新增 "refresh"、"jwt" 關鍵字；排除 user.ts

循環 2：
  DISPATCH：搜尋精煉術語
  EVALUATE：找到 session-manager.ts (0.95)、jwt-utils.ts (0.85)
  REFINE：足夠上下文（2 個高相關性檔案）

結果：auth.ts、tokens.ts、session-manager.ts、jwt-utils.ts
```

### 範例 2：功能實作

```
任務：「為 API 端點增加速率限制」

循環 1：
  DISPATCH：在 routes/** 搜尋 "rate"、"limit"、"api"
  EVALUATE：無匹配 - 程式碼庫使用 "throttle" 術語
  REFINE：新增 "throttle"、"middleware" 關鍵字

循環 2：
  DISPATCH：搜尋精煉術語
  EVALUATE：找到 throttle.ts (0.9)、middleware/index.ts (0.7)
  REFINE：需要路由器模式

循環 3：
  DISPATCH：搜尋 "router"、"express" 模式
  EVALUATE：找到 router-setup.ts (0.8)
  REFINE：足夠上下文

結果：throttle.ts、middleware/index.ts、router-setup.ts
```

## 與 Agents 整合

在 agent 提示中使用：

```markdown
為此任務檢索上下文時：
1. 從廣泛關鍵字搜尋開始
2. 評估每個檔案的相關性（0-1 尺度）
3. 識別仍缺少的上下文
4. 精煉搜尋標準並重複（最多 3 個循環）
5. 回傳相關性 >= 0.7 的檔案
```

## 最佳實務

1. **從廣泛開始，逐漸縮小** - 不要過度指定初始查詢
2. **學習程式碼庫術語** - 第一個循環通常會揭示命名慣例
3. **追蹤缺失內容** - 明確的缺口識別驅動精煉
4. **在「足夠好」時停止** - 3 個高相關性檔案勝過 10 個普通檔案
5. **自信地排除** - 低相關性檔案不會變得相關

## 相關

- [Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - 子 agent 協調章節
- `continuous-learning` 技能 - 用於隨時間改進的模式
- `~/.claude/agents/` 中的 Agent 定義
