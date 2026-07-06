# Code Review

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


RevisÃƒÂ£o completa de seguranÃƒÂ§a e qualidade das mudanÃƒÂ§as nÃƒÂ£o commitadas:

1. Obtenha arquivos alterados: git diff --name-only HEAD

2. Para cada arquivo alterado, verifique:

**Problemas de SeguranÃƒÂ§a (CRITICAL):**
- Credenciais, chaves de API ou tokens hardcoded
- Vulnerabilidades de SQL injection
- Vulnerabilidades de XSS
- Falta de validaÃƒÂ§ÃƒÂ£o de entrada
- DependÃƒÂªncias inseguras
- Riscos de path traversal

**Qualidade de CÃƒÂ³digo (HIGH):**
- FunÃƒÂ§ÃƒÂµes > 50 linhas
- Arquivos > 800 linhas
- Profundidade de aninhamento > 4 nÃƒÂ­veis
- Falta de tratamento de erro
- Statements de console.log
- ComentÃƒÂ¡rios TODO/FIXME
- Falta de JSDoc para APIs pÃƒÂºblicas

**Boas PrÃƒÂ¡ticas (MEDIUM):**
- PadrÃƒÂµes de mutaÃƒÂ§ÃƒÂ£o (usar imutÃƒÂ¡vel no lugar)
- Uso de emoji em cÃƒÂ³digo/comentÃƒÂ¡rios
- Falta de testes para cÃƒÂ³digo novo
- Problemas de acessibilidade (a11y)

3. Gere relatÃƒÂ³rio com:
   - Severidade: CRITICAL, HIGH, MEDIUM, LOW
   - LocalizaÃƒÂ§ÃƒÂ£o no arquivo e nÃƒÂºmeros de linha
   - DescriÃƒÂ§ÃƒÂ£o do problema
   - CorreÃƒÂ§ÃƒÂ£o sugerida

4. Bloqueie commit se houver problemas CRITICAL ou HIGH

Nunca aprove cÃƒÂ³digo com vulnerabilidades de seguranÃƒÂ§a!
