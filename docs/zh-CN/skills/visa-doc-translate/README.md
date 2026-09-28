# 签证文件翻译器

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

自动将签证申请文件从图像翻译为专业的英文 PDF。

## 功能

* **自动 OCR**：尝试多种 OCR 方法（macOS Vision、EasyOCR、Tesseract）
* **双语 PDF**：原始图像 + 专业英文翻译
* **多语言支持**：支持中文及其他语言
* **专业格式**：适合官方签证申请
* **完全自动化**：无需人工干预

## 支持的文件类型

* 银行存款证明（存款证明）
* 在职证明（在职证明）
* 退休证明（退休证明）
* 收入证明（收入证明）
* 房产证明（房产证明）
* 营业执照（营业执照）
* 身份证和护照

## 使用方法

```bash
/visa-doc-translate <image-file>
```

### 示例

```bash
/visa-doc-translate RetirementCertificate.PNG
/visa-doc-translate BankStatement.HEIC
/visa-doc-translate EmploymentLetter.jpg
```

## 输出

创建 `<filename>_Translated.pdf`，包含：

* **第 1 页**：原始文件图像（居中，A4 尺寸）
* **第 2 页**：专业英文翻译

## 要求

### Python 库

```bash
pip install pillow reportlab
```

### OCR（需要以下之一）

**macOS（推荐）**：

```bash
pip install pyobjc-framework-Vision pyobjc-framework-Quartz
```

**跨平台**：

```bash
pip install easyocr
```

**Tesseract**：

```bash
brew install tesseract tesseract-lang
pip install pytesseract
```

## 工作原理

1. 如有需要，将 HEIC 转换为 PNG
2. 检查并应用 EXIF 旋转
3. 使用可用的 OCR 方法提取文本
4. 翻译为专业英文
5. 生成双语 PDF

## 完美适用于

* 澳大利亚签证申请
* 美国签证申请
* 加拿大签证申请
* 英国签证申请
* 欧盟签证申请

## 许可证

MIT
