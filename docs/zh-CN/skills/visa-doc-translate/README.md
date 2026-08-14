# 签证文件翻译器

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
