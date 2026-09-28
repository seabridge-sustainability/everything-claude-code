---
name: regex-vs-llm-structured-text
description: 选择在解析结构化文本时使用正则表达式还是大型语言模型的决策框架——从正则表达式开始，仅在低置信度的边缘情况下添加大型语言模型。
origin: ECC
---

# 正则表达式 vs LLM 用于结构化文本解析

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


一个用于解析结构化文本（测验、表单、发票、文档）的实用决策框架。核心见解是：正则表达式能以低成本、确定性的方式处理 95-98% 的情况。将昂贵的 LLM 调用留给剩余的边缘情况。

## 何时使用

* 解析具有重复模式的结构化文本（问题、表单、表格）
* 决定在文本提取时使用正则表达式还是 LLM
* 构建结合两种方法的混合管道
* 在文本处理中优化成本/准确性权衡

## 决策框架

```
文本格式是否一致且重复？
├── 是 (>90% 遵循某种模式) → 从正则表达式开始
│   ├── 正则表达式处理 95%+ → 完成，无需 LLM
│   └── 正则表达式处理 <95% → 仅为边缘情况添加 LLM
└── 否 (自由格式，高度可变) → 直接使用 LLM
```

## 架构模式

```
[正则表达式解析器] ─── 提取结构（95-98% 准确率）
    │
    ▼
[文本清理器] ─── 去除噪声（标记、页码、伪影）
    │
    ▼
[置信度评分器] ─── 标记低置信度提取项
    │
    ├── 高置信度（≥0.95）→ 直接输出
    │
    └── 低置信度（<0.95）→ [LLM 验证器] → 输出
```

## 实现

### 1. 正则表达式解析器（处理大多数情况）

```python
import re
from dataclasses import dataclass

@dataclass(frozen=True)
class ParsedItem:
    id: str
    text: str
    choices: tuple[str, ...]
    answer: str
    confidence: float = 1.0

def parse_structured_text(content: str) -> list[ParsedItem]:
    """Parse structured text using regex patterns."""
    pattern = re.compile(
        r"(?P<id>\d+)\.\s*(?P<text>.+?)\n"
        r"(?P<choices>(?:[A-D]\..+?\n)+)"
        r"Answer:\s*(?P<answer>[A-D])",
        re.MULTILINE | re.DOTALL,
    )
    items = []
    for match in pattern.finditer(content):
        choices = tuple(
            c.strip() for c in re.findall(r"[A-D]\.\s*(.+)", match.group("choices"))
        )
        items.append(ParsedItem(
            id=match.group("id"),
            text=match.group("text").strip(),
            choices=choices,
            answer=match.group("answer"),
        ))
    return items
```

### 2. 置信度评分

标记可能需要 LLM 审核的项：

```python
@dataclass(frozen=True)
class ConfidenceFlag:
    item_id: str
    score: float
    reasons: tuple[str, ...]

def score_confidence(item: ParsedItem) -> ConfidenceFlag:
    """Score extraction confidence and flag issues."""
    reasons = []
    score = 1.0

    if len(item.choices) < 3:
        reasons.append("few_choices")
        score -= 0.3

    if not item.answer:
        reasons.append("missing_answer")
        score -= 0.5

    if len(item.text) < 10:
        reasons.append("short_text")
        score -= 0.2

    return ConfidenceFlag(
        item_id=item.id,
        score=max(0.0, score),
        reasons=tuple(reasons),
    )

def identify_low_confidence(
    items: list[ParsedItem],
    threshold: float = 0.95,
) -> list[ConfidenceFlag]:
    """Return items below confidence threshold."""
    flags = [score_confidence(item) for item in items]
    return [f for f in flags if f.score < threshold]
```

### 3. LLM 验证器（仅用于边缘情况）

```python
def validate_with_llm(
    item: ParsedItem,
    original_text: str,
    client,
) -> ParsedItem:
    """Use LLM to fix low-confidence extractions."""
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # Cheapest model for validation
        max_tokens=500,
        messages=[{
            "role": "user",
            "content": (
                f"Extract the question, choices, and answer from this text.\n\n"
                f"Text: {original_text}\n\n"
                f"Current extraction: {item}\n\n"
                f"Return corrected JSON if needed, or 'CORRECT' if accurate."
            ),
        }],
    )
    # Parse LLM response and return corrected item...
    return corrected_item
```

### 4. 混合管道

```python
def process_document(
    content: str,
    *,
    llm_client=None,
    confidence_threshold: float = 0.95,
) -> list[ParsedItem]:
    """Full pipeline: regex -> confidence check -> LLM for edge cases."""
    # Step 1: Regex extraction (handles 95-98%)
    items = parse_structured_text(content)

    # Step 2: Confidence scoring
    low_confidence = identify_low_confidence(items, confidence_threshold)

    if not low_confidence or llm_client is None:
        return items

    # Step 3: LLM validation (only for flagged items)
    low_conf_ids = {f.item_id for f in low_confidence}
    result = []
    for item in items:
        if item.id in low_conf_ids:
            result.append(validate_with_llm(item, content, llm_client))
        else:
            result.append(item)

    return result
```

## 实际指标

来自一个生产中的测验解析管道（410 个项目）：

| 指标 | 值 |
|--------|-------|
| 正则表达式成功率 | 98.0% |
| 低置信度项目 | 8 (2.0%) |
| 所需 LLM 调用次数 | ~5 |
| 相比全 LLM 的成本节省 | ~95% |
| 测试覆盖率 | 93% |

## 最佳实践

* **从正则表达式开始** — 即使不完美的正则表达式也能提供一个改进的基线
* **使用置信度评分** 来以编程方式识别需要 LLM 帮助的内容
* **使用最便宜的 LLM** 进行验证（Haiku 类模型已足够）
* **切勿修改** 已解析的项 — 从清理/验证步骤返回新实例
* **TDD 效果很好** 用于解析器 — 首先为已知模式编写测试，然后是边缘情况
* **记录指标**（正则表达式成功率、LLM 调用次数）以跟踪管道健康状况

## 应避免的反模式

* 当正则表达式能处理 95% 以上的情况时，将所有文本发送给 LLM（昂贵且缓慢）
* 对自由格式、高度可变的文本使用正则表达式（LLM 在此处更合适）
* 跳过置信度评分，希望正则表达式“能正常工作”
* 在清理/验证步骤中修改已解析的对象
* 不测试边缘情况（格式错误的输入、缺失字段、编码问题）

## 适用场景

* 测验/考试题目解析
* 表单数据提取
* 发票/收据处理
* 文档结构解析（标题、章节、表格）
* 任何具有重复模式且成本重要的结构化文本
