# /learn - Extrair PadrÃƒÂµes ReutilizÃƒÂ¡veis

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
