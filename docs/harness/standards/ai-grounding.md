# AI Grounding Standard

## Rule: AI Outputs Must Distinguish Evidence From Inference

Required behavior: AI-generated claims should include citations, provenance,
confidence, assumptions, geography, timeframe, units, and missing-data behavior
where relevant.

Prohibited behavior: unsupported sustainability, LCA, emissions, due diligence,
insurance, risk, or regulatory claims presented as fact.

Automated enforcement: reviewer skill and targeted tests for output schemas.

Fallback reviewer: `sea-ai-grounding-reviewer`.

## Rule: Prompt Injection And Tool Abuse Must Be Considered

Required behavior: prompts that consume user, document, web, or MCP content must
treat that content as untrusted and keep tool policies outside model-controlled
data.

Prohibited behavior: letting retrieved text override agent instructions,
approval gates, tool access, or data boundaries.

Automated enforcement: Agent Shield scans plus prompt review.
