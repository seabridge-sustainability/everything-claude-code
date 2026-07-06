---
name: nutrient-document-processing
description: Nutrient DWS API Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ®Ã¥â€¡Â¦Ã§Ââ€ Ã£â‚¬ÂÃ¥Â¤â€°Ã¦Ââ€ºÃ£â‚¬ÂOCRÃ£â‚¬ÂÃ¦Å Â½Ã¥â€¡ÂºÃ£â‚¬ÂÃ§Â·Â¨Ã©â€ºâ€ Ã£â‚¬ÂÃ§Â½Â²Ã¥ÂÂÃ£â‚¬ÂÃ£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Â Ã¥â€¦Â¥Ã¥Å â€ºÃ£â€šâ€™Ã¨Â¡Å’Ã£Ââ€žÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šPDFÃ£â‚¬ÂDOCXÃ£â‚¬ÂXLSXÃ£â‚¬ÂPPTXÃ£â‚¬ÂHTMLÃ£â‚¬ÂÃ§â€Â»Ã¥Æ’ÂÃ£ÂÂ«Ã¥Â¯Â¾Ã¥Â¿Å“Ã£Ââ€”Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
---

# Nutrient Document Processing

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


[Nutrient DWS Processor API](https://www.nutrient.io/api/) Ã£ÂÂ§Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¥â€¡Â¦Ã§Ââ€ Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë†Ã¥Â¤â€°Ã¦Ââ€ºÃ£â‚¬ÂÃ£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¨Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã£ÂÂ®Ã¦Å Â½Ã¥â€¡ÂºÃ£â‚¬ÂÃ£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ® OCRÃ£â‚¬ÂPII Ã£ÂÂ®Ã§Â·Â¨Ã©â€ºâ€ Ã£â‚¬ÂÃ£â€šÂ¦Ã£â€šÂ©Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯Ã£ÂÂ®Ã¨Â¿Â½Ã¥Å Â Ã£â‚¬ÂÃ£Æ’â€¡Ã£â€šÂ¸Ã£â€šÂ¿Ã£Æ’Â«Ã§Â½Â²Ã¥ÂÂÃ£â‚¬ÂPDF Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Â Ã£ÂÂ®Ã¥â€¦Â¥Ã¥Å â€ºÃ£ÂÅ’Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€š

## Ã£â€šÂ»Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”

**[nutrient.io](https://dashboard.nutrient.io/sign_up/?product=processor)** Ã£ÂÂ§Ã§â€žÂ¡Ã¦â€“â„¢Ã£ÂÂ® API Ã£â€šÂ­Ã£Æ’Â¼Ã£â€šâ€™Ã¥Ââ€“Ã¥Â¾â€”Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž

```bash
export NUTRIENT_API_KEY="pdf_live_..."
```

Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’ÂªÃ£â€šÂ¯Ã£â€šÂ¨Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¯ `https://api.nutrient.io/build` Ã£ÂÂ« `instructions` JSON Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€°Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šâ‚¬Ã£Æ’Å¾Ã£Æ’Â«Ã£Æ’ÂÃ£Æ’â€˜Ã£Æ’Â¼Ã£Æ’Ë† POST Ã£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦Ã©â‚¬ÂÃ¤Â¿Â¡Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¦â€œÂÃ¤Â½Å“

### Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ®Ã¥Â¤â€°Ã¦Ââ€º

```bash
# DOCX Ã£Ââ€¹Ã£â€šâ€° PDF Ã£ÂÂ¸
curl -X POST https://api.nutrient.io/build \
  -H "Authorization: Bearer $NUTRIENT_API_KEY" \
  -F "document.docx=@document.docx" \
  -F 'instructions={"parts":[{"file":"document.docx"}]}' \
  -o output.pdf

# PDF Ã£Ââ€¹Ã£â€šâ€° DOCX Ã£ÂÂ¸
curl -X POST https://api.nutrient.io/build \
  -H "Authorization: Bearer $NUTRIENT_API_KEY" \
  -F "document.pdf=@document.pdf" \
  -F 'instructions={"parts":[{"file":"document.pdf"}],"output":{"type":"docx"}}' \
  -o output.docx

# HTML Ã£Ââ€¹Ã£â€šâ€° PDF Ã£ÂÂ¸
curl -X POST https://api.nutrient.io/build \
  -H "Authorization: Bearer $NUTRIENT_API_KEY" \
  -F "index.html=@index.html" \
  -F 'instructions={"parts":[{"html":"index.html"}]}' \
  -o output.pdf
```

Ã£â€šÂµÃ£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã¥â€¦Â¥Ã¥Å â€ºÃ¥Â½Â¢Ã¥Â¼Â: PDFÃ£â‚¬ÂDOCXÃ£â‚¬ÂXLSXÃ£â‚¬ÂPPTXÃ£â‚¬ÂDOCÃ£â‚¬ÂXLSÃ£â‚¬ÂPPTÃ£â‚¬ÂPPSÃ£â‚¬ÂPPSXÃ£â‚¬ÂODTÃ£â‚¬ÂRTFÃ£â‚¬ÂHTMLÃ£â‚¬ÂJPGÃ£â‚¬ÂPNGÃ£â‚¬ÂTIFFÃ£â‚¬ÂHEICÃ£â‚¬ÂGIFÃ£â‚¬ÂWebPÃ£â‚¬ÂSVGÃ£â‚¬ÂTGAÃ£â‚¬ÂEPSÃ£â‚¬â€š

### Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ¨Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£ÂÂ®Ã¦Å Â½Ã¥â€¡Âº

```bash
# Ã£Æ’â€”Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Â³Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ®Ã¦Å Â½Ã¥â€¡Âº
curl -X POST https://api.nutrient.io/build \
  -H "Authorization: Bearer $NUTRIENT_API_KEY" \
  -F "document.pdf=@document.pdf" \
  -F 'instructions={"parts":[{"file":"document.pdf"}],"output":{"type":"text"}}' \
  -o output.txt

# Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã£â€šâ€™ Excel Ã£ÂÂ¨Ã£Ââ€”Ã£ÂÂ¦Ã¦Å Â½Ã¥â€¡Âº
curl -X POST https://api.nutrient.io/build \
  -H "Authorization: Bearer $NUTRIENT_API_KEY" \
  -F "document.pdf=@document.pdf" \
  -F 'instructions={"parts":[{"file":"document.pdf"}],"output":{"type":"xlsx"}}' \
  -o tables.xlsx
```

### Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ® OCR

```bash
# Ã¦Â¤Å“Ã§Â´Â¢Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂª PDF Ã£ÂÂ¸Ã£ÂÂ® OCRÃ¯Â¼Ë†100Ã¤Â»Â¥Ã¤Â¸Å Ã£ÂÂ®Ã¨Â¨â‚¬Ã¨ÂªÅ¾Ã£â€šâ€™Ã£â€šÂµÃ£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã¯Â¼â€°
curl -X POST https://api.nutrient.io/build \
  -H "Authorization: Bearer $NUTRIENT_API_KEY" \
  -F "scanned.pdf=@scanned.pdf" \
  -F 'instructions={"parts":[{"file":"scanned.pdf"}],"actions":[{"type":"ocr","language":"english"}]}' \
  -o searchable.pdf
```

Ã¨Â¨â‚¬Ã¨ÂªÅ¾: ISO 639-2 Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¯Â¼Ë†Ã¤Â¾â€¹: `eng`Ã£â‚¬Â`deu`Ã£â‚¬Â`fra`Ã£â‚¬Â`spa`Ã£â‚¬Â`jpn`Ã£â‚¬Â`kor`Ã£â‚¬Â`chi_sim`Ã£â‚¬Â`chi_tra`Ã£â‚¬Â`ara`Ã£â‚¬Â`hin`Ã£â‚¬Â`rus`Ã¯Â¼â€°Ã£â€šâ€™Ã¤Â»â€¹Ã£Ââ€”Ã£ÂÂ¦100Ã¤Â»Â¥Ã¤Â¸Å Ã£ÂÂ®Ã¨Â¨â‚¬Ã¨ÂªÅ¾Ã£â€šâ€™Ã£â€šÂµÃ£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£Ââ€”Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š`english` Ã£â€šâ€ž `german` Ã£ÂÂªÃ£ÂÂ©Ã£ÂÂ®Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ¨Â¨â‚¬Ã¨ÂªÅ¾Ã¥ÂÂÃ£â€šâ€šÃ¦Â©Å¸Ã¨Æ’Â½Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£â€šÂµÃ£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ«Ã£ÂÂ¤Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂ¯Ã£â‚¬Â[Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂª OCR Ã¨Â¨â‚¬Ã¨ÂªÅ¾Ã¨Â¡Â¨](https://www.nutrient.io/guides/document-engine/ocr/language-support/)Ã£â€šâ€™Ã¥Ââ€šÃ§â€¦Â§Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š

### Ã¦Â©Å¸Ã¥Â¯â€ Ã¦Æ’â€¦Ã¥Â Â±Ã£ÂÂ®Ã§Â·Â¨Ã©â€ºâ€ 

```bash
# Ã£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹Ã¯Â¼Ë†SSNÃ£â‚¬ÂÃ£Æ’Â¡Ã£Æ’Â¼Ã£Æ’Â«Ã¯Â¼â€°
curl -X POST https://api.nutrient.io/build \
  -H "Authorization: Bearer $NUTRIENT_API_KEY" \
  -F "document.pdf=@document.pdf" \
  -F 'instructions={"parts":[{"file":"document.pdf"}],"actions":[{"type":"redaction","strategy":"preset","strategyOptions":{"preset":"social-security-number"}},{"type":"redaction","strategy":"preset","strategyOptions":{"preset":"email-address"}}]}' \
  -o redacted.pdf

# Ã¦Â­Â£Ã¨Â¦ÂÃ¨Â¡Â¨Ã§ÂÂ¾Ã£Æ’â„¢Ã£Æ’Â¼Ã£â€šÂ¹
curl -X POST https://api.nutrient.io/build \
  -H "Authorization: Bearer $NUTRIENT_API_KEY" \
  -F "document.pdf=@document.pdf" \
  -F 'instructions={"parts":[{"file":"document.pdf"}],"actions":[{"type":"redaction","strategy":"regex","strategyOptions":{"regex":"\\b[A-Z]{2}\\d{6}\\b"}}]}' \
  -o redacted.pdf
```

Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ»Ã£Æ’Æ’Ã£Æ’Ë†: `social-security-number`Ã£â‚¬Â`email-address`Ã£â‚¬Â`credit-card-number`Ã£â‚¬Â`international-phone-number`Ã£â‚¬Â`north-american-phone-number`Ã£â‚¬Â`date`Ã£â‚¬Â`time`Ã£â‚¬Â`url`Ã£â‚¬Â`ipv4`Ã£â‚¬Â`ipv6`Ã£â‚¬Â`mac-address`Ã£â‚¬Â`us-zip-code`Ã£â‚¬Â`vin`Ã£â‚¬â€š

### Ã£â€šÂ¦Ã£â€šÂ©Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯Ã£ÂÂ®Ã¨Â¿Â½Ã¥Å Â 

```bash
curl -X POST https://api.nutrient.io/build \
  -H "Authorization: Bearer $NUTRIENT_API_KEY" \
  -F "document.pdf=@document.pdf" \
  -F 'instructions={"parts":[{"file":"document.pdf"}],"actions":[{"type":"watermark","text":"CONFIDENTIAL","fontSize":72,"opacity":0.3,"rotation":-45}]}' \
  -o watermarked.pdf
```

### Ã£Æ’â€¡Ã£â€šÂ¸Ã£â€šÂ¿Ã£Æ’Â«Ã§Â½Â²Ã¥ÂÂ

```bash
# Ã¨â€¡ÂªÃ¥Â·Â±Ã§Â½Â²Ã¥ÂÂ CMS Ã§Â½Â²Ã¥ÂÂ
curl -X POST https://api.nutrient.io/build \
  -H "Authorization: Bearer $NUTRIENT_API_KEY" \
  -F "document.pdf=@document.pdf" \
  -F 'instructions={"parts":[{"file":"document.pdf"}],"actions":[{"type":"sign","signatureType":"cms"}]}' \
  -o signed.pdf
```

### PDF Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Â Ã£ÂÂ®Ã¥â€¦Â¥Ã¥Å â€º

```bash
curl -X POST https://api.nutrient.io/build \
  -H "Authorization: Bearer $NUTRIENT_API_KEY" \
  -F "form.pdf=@form.pdf" \
  -F 'instructions={"parts":[{"file":"form.pdf"}],"actions":[{"type":"fillForm","formFields":{"name":"Jane Smith","email":"jane@example.com","date":"2026-02-06"}}]}' \
  -o filled.pdf
```

## MCP Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â¼Ã¯Â¼Ë†Ã¤Â»Â£Ã¦â€ºÂ¿Ã¯Â¼â€°

Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€“Ã£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã§ÂµÂ±Ã¥ÂË†Ã£ÂÂ«Ã£ÂÂ¯Ã£â‚¬Âcurl Ã£ÂÂ®Ã¤Â»Â£Ã£â€šÂÃ£â€šÅ Ã£ÂÂ« MCP Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã¯Â¼Å¡

```json
{
  "mcpServers": {
    "nutrient-dws": {
      "command": "npx",
      "args": ["-y", "@nutrient-sdk/dws-mcp-server"],
      "env": {
        "NUTRIENT_DWS_API_KEY": "YOUR_API_KEY",
        "SANDBOX_PATH": "/path/to/working/directory"
      }
    }
  }
}
```

## Ã¤Â½Â¿Ã§â€Â¨Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Å¸Ã£Æ’Â³Ã£â€šÂ°

- Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Ë†Ã©â€“â€œÃ£ÂÂ§Ã£ÂÂ®Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã¥Â¤â€°Ã¦Ââ€ºÃ¯Â¼Ë†PDFÃ£â‚¬ÂDOCXÃ£â‚¬ÂXLSXÃ£â‚¬ÂPPTXÃ£â‚¬ÂHTMLÃ£â‚¬ÂÃ§â€Â»Ã¥Æ’ÂÃ¯Â¼â€°
- PDF Ã£Ââ€¹Ã£â€šâ€°Ã£Æ’â€ Ã£â€šÂ­Ã£â€šÂ¹Ã£Æ’Ë†Ã£â‚¬ÂÃ£Æ’â€ Ã£Æ’Â¼Ã£Æ’â€“Ã£Æ’Â«Ã£â‚¬ÂÃ£â€šÂ­Ã£Æ’Â¼Ã¥â‚¬Â¤Ã£Æ’Å¡Ã£â€šÂ¢Ã£ÂÂ®Ã¦Å Â½Ã¥â€¡Âº
- Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã§â€Â»Ã¥Æ’ÂÃ£ÂÂ® OCR
- Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â€šâ€™Ã¥â€¦Â±Ã¦Å“â€°Ã£Ââ„¢Ã£â€šâ€¹Ã¥â€°ÂÃ£ÂÂ® PII Ã£ÂÂ®Ã§Â·Â¨Ã©â€ºâ€ 
- Ã£Æ’â€°Ã£Æ’Â©Ã£Æ’â€¢Ã£Æ’Ë†Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã¦Â©Å¸Ã¥Â¯â€ Ã¦â€“â€¡Ã¦â€ºÂ¸Ã£ÂÂ¸Ã£ÂÂ®Ã£â€šÂ¦Ã£â€šÂ©Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¯Ã£ÂÂ®Ã¨Â¿Â½Ã¥Å Â 
- Ã¥Â¥â€˜Ã§Â´â€žÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã¥ÂË†Ã¦â€žÂÃ¦â€ºÂ¸Ã£ÂÂ¸Ã£ÂÂ®Ã£Æ’â€¡Ã£â€šÂ¸Ã£â€šÂ¿Ã£Æ’Â«Ã§Â½Â²Ã¥ÂÂ
- Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ°Ã£Æ’Â©Ã£Æ’Â Ã£ÂÂ«Ã£â€šË†Ã£â€šâ€¹ PDF Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Â Ã£ÂÂ®Ã¥â€¦Â¥Ã¥Å â€º

## Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ¯

- [API Playground](https://dashboard.nutrient.io/processor-api/playground/)
- [Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂª API Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†](https://www.nutrient.io/guides/dws-processor/)
- [npm MCP Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â¼](https://www.npmjs.com/package/@nutrient-sdk/dws-mcp-server)
