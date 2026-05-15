# Security Standard

## Rule: Secrets Stay Out Of Source And Logs

Required behavior: credentials live in environment/secret managers and must be
redacted in logs, reports, and test output.

Prohibited behavior: plaintext keys, tokens, private keys, or `.env` values in
source-controlled files.

Automated enforcement: `scripts/check-harness.ps1` secret-pattern scan plus
Agent Shield governance scans.

Fallback reviewer: `sea-security-reviewer`.

## Rule: Auth And Tenant Isolation Are Blocking Requirements

Required behavior: security-sensitive routes and actions must verify identity,
authorization, tenant/workspace ownership, and rate limits where relevant.

Prohibited behavior: public exposure of private data, trusting client-supplied
tenant IDs, or bypassing auth for convenience.

Automated enforcement: structural route scans and targeted tests.

## Rule: Tool Execution Must Be Visible And Safe

Required behavior: MCP tools, agent scripts, shell hooks, browser automation, and
database tools must be allowlisted, least-privilege, and logged.

Prohibited behavior: hidden destructive execution, unsafe yolo modes, or broad
filesystem/database access without explicit scope.
