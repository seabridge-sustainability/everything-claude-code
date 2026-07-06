# Ã§Â­Â¾Ã¨Â¯ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã§Â¿Â»Ã¨Â¯â€˜Ã¥â„¢Â¨

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


Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Â°â€ Ã§Â­Â¾Ã¨Â¯ÂÃ§â€Â³Ã¨Â¯Â·Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â»Å½Ã¥â€ºÂ¾Ã¥Æ’ÂÃ§Â¿Â»Ã¨Â¯â€˜Ã¤Â¸ÂºÃ¤Â¸â€œÃ¤Â¸Å¡Ã§Å¡â€žÃ¨â€¹Â±Ã¦â€“â€¡ PDFÃ£â‚¬â€š

## Ã¥Å Å¸Ã¨Æ’Â½

*  **Ã¨â€¡ÂªÃ¥Å Â¨ OCR**Ã¯Â¼Å¡Ã¥Â°ÂÃ¨Â¯â€¢Ã¥Â¤Å¡Ã§Â§Â OCR Ã¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Ë†macOS VisionÃ£â‚¬ÂEasyOCRÃ£â‚¬ÂTesseractÃ¯Â¼â€°
*  **Ã¥ÂÅ’Ã¨Â¯Â­ PDF**Ã¯Â¼Å¡Ã¥Å½Å¸Ã¥Â§â€¹Ã¥â€ºÂ¾Ã¥Æ’Â + Ã¤Â¸â€œÃ¤Â¸Å¡Ã¨â€¹Â±Ã¦â€“â€¡Ã§Â¿Â»Ã¨Â¯â€˜
*  **Ã¥Â¤Å¡Ã¨Â¯Â­Ã¨Â¨â‚¬Ã¦â€Â¯Ã¦Å’Â**Ã¯Â¼Å¡Ã¦â€Â¯Ã¦Å’ÂÃ¤Â¸Â­Ã¦â€“â€¡Ã¥ÂÅ Ã¥â€¦Â¶Ã¤Â»â€“Ã¨Â¯Â­Ã¨Â¨â‚¬
*  **Ã¤Â¸â€œÃ¤Â¸Å¡Ã¦Â Â¼Ã¥Â¼Â**Ã¯Â¼Å¡Ã©â‚¬â€šÃ¥ÂË†Ã¥Â®ËœÃ¦â€“Â¹Ã§Â­Â¾Ã¨Â¯ÂÃ§â€Â³Ã¨Â¯Â·
*  **Ã¥Â®Å’Ã¥â€¦Â¨Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“**Ã¯Â¼Å¡Ã¦â€”Â Ã©Å“â‚¬Ã¤ÂºÂºÃ¥Â·Â¥Ã¥Â¹Â²Ã©Â¢â€ž

## Ã¦â€Â¯Ã¦Å’ÂÃ§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã§Â±Â»Ã¥Å¾â€¹

* Ã©â€œÂ¶Ã¨Â¡Å’Ã¥Â­ËœÃ¦Â¬Â¾Ã¨Â¯ÂÃ¦ËœÅ½Ã¯Â¼Ë†Ã¥Â­ËœÃ¦Â¬Â¾Ã¨Â¯ÂÃ¦ËœÅ½Ã¯Â¼â€°
* Ã¥Å“Â¨Ã¨ÂÅ’Ã¨Â¯ÂÃ¦ËœÅ½Ã¯Â¼Ë†Ã¥Å“Â¨Ã¨ÂÅ’Ã¨Â¯ÂÃ¦ËœÅ½Ã¯Â¼â€°
* Ã©â‚¬â‚¬Ã¤Â¼â€˜Ã¨Â¯ÂÃ¦ËœÅ½Ã¯Â¼Ë†Ã©â‚¬â‚¬Ã¤Â¼â€˜Ã¨Â¯ÂÃ¦ËœÅ½Ã¯Â¼â€°
* Ã¦â€Â¶Ã¥â€¦Â¥Ã¨Â¯ÂÃ¦ËœÅ½Ã¯Â¼Ë†Ã¦â€Â¶Ã¥â€¦Â¥Ã¨Â¯ÂÃ¦ËœÅ½Ã¯Â¼â€°
* Ã¦Ë†Â¿Ã¤ÂºÂ§Ã¨Â¯ÂÃ¦ËœÅ½Ã¯Â¼Ë†Ã¦Ë†Â¿Ã¤ÂºÂ§Ã¨Â¯ÂÃ¦ËœÅ½Ã¯Â¼â€°
* Ã¨ÂÂ¥Ã¤Â¸Å¡Ã¦â€°Â§Ã§â€¦Â§Ã¯Â¼Ë†Ã¨ÂÂ¥Ã¤Â¸Å¡Ã¦â€°Â§Ã§â€¦Â§Ã¯Â¼â€°
* Ã¨ÂºÂ«Ã¤Â»Â½Ã¨Â¯ÂÃ¥â€™Å’Ã¦Å Â¤Ã§â€¦Â§

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

```bash
/visa-doc-translate <image-file>
```

### Ã§Â¤ÂºÃ¤Â¾â€¹

```bash
/visa-doc-translate RetirementCertificate.PNG
/visa-doc-translate BankStatement.HEIC
/visa-doc-translate EmploymentLetter.jpg
```

## Ã¨Â¾â€œÃ¥â€¡Âº

Ã¥Ë†â€ºÃ¥Â»Âº `<filename>_Translated.pdf`Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡

* **Ã§Â¬Â¬ 1 Ã©Â¡Âµ**Ã¯Â¼Å¡Ã¥Å½Å¸Ã¥Â§â€¹Ã¦â€“â€¡Ã¤Â»Â¶Ã¥â€ºÂ¾Ã¥Æ’ÂÃ¯Â¼Ë†Ã¥Â±â€¦Ã¤Â¸Â­Ã¯Â¼Å’A4 Ã¥Â°ÂºÃ¥Â¯Â¸Ã¯Â¼â€°
* **Ã§Â¬Â¬ 2 Ã©Â¡Âµ**Ã¯Â¼Å¡Ã¤Â¸â€œÃ¤Â¸Å¡Ã¨â€¹Â±Ã¦â€“â€¡Ã§Â¿Â»Ã¨Â¯â€˜

## Ã¨Â¦ÂÃ¦Â±â€š

### Python Ã¥Âºâ€œ

```bash
pip install pillow reportlab
```

### OCRÃ¯Â¼Ë†Ã©Å“â‚¬Ã¨Â¦ÂÃ¤Â»Â¥Ã¤Â¸â€¹Ã¤Â¹â€¹Ã¤Â¸â‚¬Ã¯Â¼â€°

**macOSÃ¯Â¼Ë†Ã¦Å½Â¨Ã¨ÂÂÃ¯Â¼â€°**Ã¯Â¼Å¡

```bash
pip install pyobjc-framework-Vision pyobjc-framework-Quartz
```

**Ã¨Â·Â¨Ã¥Â¹Â³Ã¥ÂÂ°**Ã¯Â¼Å¡

```bash
pip install easyocr
```

**Tesseract**Ã¯Â¼Å¡

```bash
brew install tesseract tesseract-lang
pip install pytesseract
```

## Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å½Å¸Ã§Ââ€ 

1. Ã¥Â¦â€šÃ¦Å“â€°Ã©Å“â‚¬Ã¨Â¦ÂÃ¯Â¼Å’Ã¥Â°â€  HEIC Ã¨Â½Â¬Ã¦ÂÂ¢Ã¤Â¸Âº PNG
2. Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥Â¹Â¶Ã¥Âºâ€Ã§â€Â¨ EXIF Ã¦â€”â€¹Ã¨Â½Â¬
3. Ã¤Â½Â¿Ã§â€Â¨Ã¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€ž OCR Ã¦â€“Â¹Ã¦Â³â€¢Ã¦ÂÂÃ¥Ââ€“Ã¦â€“â€¡Ã¦Å“Â¬
4. Ã§Â¿Â»Ã¨Â¯â€˜Ã¤Â¸ÂºÃ¤Â¸â€œÃ¤Â¸Å¡Ã¨â€¹Â±Ã¦â€“â€¡
5. Ã§â€Å¸Ã¦Ë†ÂÃ¥ÂÅ’Ã¨Â¯Â­ PDF

## Ã¥Â®Å’Ã§Â¾Å½Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½

*  Ã¦Â¾Â³Ã¥Â¤Â§Ã¥Ë†Â©Ã¤ÂºÅ¡Ã§Â­Â¾Ã¨Â¯ÂÃ§â€Â³Ã¨Â¯Â·
*  Ã§Â¾Å½Ã¥â€ºÂ½Ã§Â­Â¾Ã¨Â¯ÂÃ§â€Â³Ã¨Â¯Â·
*  Ã¥Å Â Ã¦â€¹Â¿Ã¥Â¤Â§Ã§Â­Â¾Ã¨Â¯ÂÃ§â€Â³Ã¨Â¯Â·
*  Ã¨â€¹Â±Ã¥â€ºÂ½Ã§Â­Â¾Ã¨Â¯ÂÃ§â€Â³Ã¨Â¯Â·
*  Ã¦Â¬Â§Ã§â€ºÅ¸Ã§Â­Â¾Ã¨Â¯ÂÃ§â€Â³Ã¨Â¯Â·

## Ã¨Â®Â¸Ã¥ÂÂ¯Ã¨Â¯Â

MIT
