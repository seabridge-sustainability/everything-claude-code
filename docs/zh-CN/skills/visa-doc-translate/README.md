# 签证文件翻译器

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
