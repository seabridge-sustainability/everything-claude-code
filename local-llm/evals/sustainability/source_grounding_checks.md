# Source Grounding Checks — Sustainability Models

Verifies that model outputs are grounded in named, verifiable sources.
Companion to `hallucination_checks.md` and `sustainability_eval_rubric.md`.

## What Source Grounding Means

A model output is source-grounded if it:

1. **Names the specific document** (not a category like "IPCC" or "EU regulations")
2. **States the version or year** (editions change; older values may be superseded)
3. **States the geographic/sector scope** (UK, EU, global, sector-specific)
4. **Applies a confidence label** (high / medium / low / unavailable)

Source grounding is **not**:
- Saying "according to international standards" (which standard?)
- Saying "based on established methodology" (which methodology?)
- Citing a real document with a fabricated table or section number

---

## Required Citation Format

All sustainability model outputs must include:

```
Source: [Document name] ([Publisher, Year]), [Section/Table if specific]. Confidence: [high/medium/low/unavailable].
```

### Examples of compliant citations

```
Source: UK Government GHG Conversion Factors 2023, Table 1a (DESNZ, August 2023). Confidence: high.
Source: IPCC Sixth Assessment Report WGI, Chapter 7 Supplementary Material Table 7.SM.7 (2021). Confidence: high.
Source: GHG Protocol Corporate Value Chain (Scope 3) Standard (WRI/WBCSD, 2011), Chapter 6. Confidence: high.
Source: SBTi Corporate Net-Zero Standard v1.2 (2023), Annex E. Confidence: high.
Source: ecoinvent 3.10, GLO — electricity, medium voltage (2023). Confidence: medium — global average; regional data preferred.
Source: Data not available for this substance/geography. Confidence: unavailable.
```

### Examples of non-compliant citations

```
# Missing year
Source: GHG Protocol Corporate Standard.

# Missing publisher/geography
Source: National emission factors (unspecified).

# Vague
Source: Various international standards.

# Fabricated section
Source: IPCC AR6 Chapter 12, Table 12.4 (section does not exist in WG1 Chapter 12).
```

---

## Source Registry

### Tier 1 — Authoritative (use directly, high confidence)

| Source | Publisher | Update frequency | URL / location |
|--------|-----------|-----------------|----------------|
| IPCC Assessment Reports (AR5, AR6) | IPCC | ~7 years | ipcc.ch |
| UK GHG Conversion Factors | DESNZ (formerly BEIS) | Annual (June/July) | gov.uk/government/collections/ghg-conversion-factors-for-company-reporting |
| US EPA GHG Emission Factors Hub | US EPA | Annual | epa.gov/climateleadership/ghg-emission-factors-hub |
| GHG Protocol Standards | WRI / WBCSD | Version-based | ghgprotocol.org |
| SBTi Documents | SBTi | Version-based | sciencebasedtargets.org/resources |
| ESRS Standards | EFRAG / EC | Annual (delegated acts) | efrag.org |
| GRI Standards | GRI | Version-based | globalreporting.org/standards |
| TCFD Guidance | FSBA/TCFD | 2017 + 2021 supplement | fsb-tcfd.org |
| EU Official Journal | EC | Continuous | eur-lex.europa.eu |
| ecoinvent database | ecoinvent Centre | 1–2x/year (3.x releases) | ecoinvent.org |

### Tier 2 — Secondary (cite with medium confidence; note methodology)

| Source | Publisher | Notes |
|--------|-----------|-------|
| IEA World Energy Outlook | IEA | Annual; global energy statistics |
| WRI Aqueduct | WRI | Annual; water stress data |
| ND-GAIN Country Index | Notre Dame | Annual; country vulnerability scores |
| NGFS Climate Scenarios | NGFS | Version-based; macro-financial |
| CDP Guidance | CDP | Annual; questionnaire-specific |
| SASB Standards | ISSB/SASB | Sector-specific; now under IFRS Foundation |
| Exiobase | Exiobase consortium | v3.8 (2020); MRIO for spend-based Scope 3 |

### Tier 3 — Use with caution (low confidence; must note limitations)

| Source | Notes |
|--------|-------|
| Industry association reports | May have conflicts of interest; verify against Tier 1 |
| Company sustainability reports | Self-reported; limited third-party verification unless assured |
| Media articles | Not a primary source for emission factors or thresholds |
| Wikipedia | Not citable; use for orientation only |
| Undated web pages | Unknown currency; do not use for regulatory thresholds |

---

## Source Grounding Audit Process

Run this audit after training or before deploying a model to a new domain.

### Step 1: Extract all citations from eval outputs

```python
import re

def extract_citations(text: str) -> list[str]:
    pattern = r"Source:([^\n]+)"
    return re.findall(pattern, text, re.IGNORECASE)
```

### Step 2: Classify each citation

For each extracted citation, classify as:
- **Tier 1 compliant**: Named Tier 1 document with year → accept
- **Tier 2 compliant**: Named Tier 2 document with year and confidence note → accept
- **Incomplete**: Missing year or geography → flag for improvement
- **Fabricated**: Document name not found in registry → reject output

### Step 3: Calculate grounding rate

```
Grounding rate = (Tier 1 + Tier 2 compliant citations) / Total citations
```

Target: **≥ 90%** grounding rate across evaluation set.

### Step 4: Spot-check 20% of Tier 1 citations

Manually verify that the cited document exists, the cited section/table matches the claim, and the year is current.

---

## Source Grounding by Sustainability Domain

| Domain | Primary sources | Common gaps |
|--------|----------------|-------------|
| LCA | ecoinvent, ISO 14040/44, ILCD Handbook | Regional database gaps; Tier 3 product categories |
| GHG emissions factors | DESNZ (UK), EPA (US), ecoinvent (global) | Non-OECD countries; novel industrial processes |
| Climate risk | IPCC AR6, NGFS, TCFD | Site-level physical hazard data (requires commercial tools) |
| Nature/biodiversity | IPCC IPBES, IUCN Red List, TNFD, SBTN | Quantified biodiversity metrics (early-stage) |
| Regulatory compliance | EUR-Lex, national transposition acts | Implementation guidance; enforcement precedents |
| ESG metrics | GRI, SASB, ESRS | Sector-specific data points; SME-specific guidance |
| Supply chain | GHG Protocol Scope 3, CDP | Supplier primary data (significant collection effort) |

---

## Handling Source Gaps

When no Tier 1 or Tier 2 source covers the claim:

1. **State the gap explicitly**: "Primary source data for [X] in [geography/sector] is not available in my training data."
2. **Provide proxies if available**: "The closest available analogous factor is [Y] from [Source], though this may not be directly applicable."
3. **Recommend the user seek primary data**: "For precise values, consult [recommended source type]."
4. **Never fabricate**: Do not generate a plausible-sounding value when no source exists.

Response template:
```
Source data not available for [specific substance/geography/year].
Closest available analogue: [value] (Source: [Tier 2 source], [year]). Confidence: low — analogous data only; direct verification required.
Recommendation: Consult [primary source type] for jurisdiction-specific data.
```
