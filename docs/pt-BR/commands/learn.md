# /learn - Extrair PadrÃƒÂµes ReutilizÃƒÂ¡veis

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


Analise a sessÃƒÂ£o atual e extraia padrÃƒÂµes que valem ser salvos como skills.

## Trigger

Rode `/learn` em qualquer ponto da sessÃƒÂ£o quando vocÃƒÂª tiver resolvido um problema nÃƒÂ£o trivial.

## O Que Extrair

Procure por:

1. **PadrÃƒÂµes de ResoluÃƒÂ§ÃƒÂ£o de Erro**
   - Qual erro ocorreu?
   - Qual foi a causa raiz?
   - O que corrigiu?
   - Isso ÃƒÂ© reutilizÃƒÂ¡vel para erros semelhantes?

2. **TÃƒÂ©cnicas de Debug**
   - Passos de debug nÃƒÂ£o ÃƒÂ³bvios
   - CombinaÃƒÂ§ÃƒÂµes de ferramentas que funcionaram
   - PadrÃƒÂµes de diagnÃƒÂ³stico

3. **Workarounds**
   - Quirks de bibliotecas
   - LimitaÃƒÂ§ÃƒÂµes de API
   - CorreÃƒÂ§ÃƒÂµes especÃƒÂ­ficas de versÃƒÂ£o

4. **PadrÃƒÂµes EspecÃƒÂ­ficos do Projeto**
   - ConvenÃƒÂ§ÃƒÂµes de codebase descobertas
   - DecisÃƒÂµes de arquitetura tomadas
   - PadrÃƒÂµes de integraÃƒÂ§ÃƒÂ£o

## Formato de SaÃƒÂ­da

Crie um arquivo de skill em `~/.claude/skills/learned/[pattern-name].md`:

```markdown
# [Descriptive Pattern Name]

**Extracted:** [Date]
**Context:** [Brief description of when this applies]

## Problem
[What problem this solves - be specific]

## Solution
[The pattern/technique/workaround]

## Example
[Code example if applicable]

## When to Use
[Trigger conditions - what should activate this skill]
```

## Processo

1. Revise a sessÃƒÂ£o para identificar padrÃƒÂµes extraÃƒÂ­veis
2. Identifique o insight mais valioso/reutilizÃƒÂ¡vel
3. Esboce o arquivo de skill
4. PeÃƒÂ§a confirmaÃƒÂ§ÃƒÂ£o do usuÃƒÂ¡rio antes de salvar
5. Salve em `~/.claude/skills/learned/`

## Notas

- NÃƒÂ£o extraia correÃƒÂ§ÃƒÂµes triviais (typos, erros simples de sintaxe)
- NÃƒÂ£o extraia problemas de uso ÃƒÂºnico (indisponibilidade especÃƒÂ­fica de API etc.)
- Foque em padrÃƒÂµes que vÃƒÂ£o economizar tempo em sessÃƒÂµes futuras
- Mantenha skills focadas - um padrÃƒÂ£o por skill
