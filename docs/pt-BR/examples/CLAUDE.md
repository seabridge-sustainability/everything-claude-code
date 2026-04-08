# Exemplo de CLAUDE.md de Projeto

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Este ÃƒÂ© um exemplo de arquivo CLAUDE.md no nÃƒÂ­vel de projeto. Coloque-o na raiz do seu projeto.

## VisÃƒÂ£o Geral do Projeto

[DescriÃƒÂ§ÃƒÂ£o breve do seu projeto - o que ele faz, stack tecnolÃƒÂ³gica]

## Regras CrÃƒÂ­ticas

### 1. OrganizaÃƒÂ§ÃƒÂ£o de CÃƒÂ³digo

- Muitos arquivos pequenos em vez de poucos arquivos grandes
- Alta coesÃƒÂ£o, baixo acoplamento
- 200-400 linhas tÃƒÂ­pico, 800 mÃƒÂ¡ximo por arquivo
- Organize por feature/domÃƒÂ­nio, nÃƒÂ£o por tipo

### 2. Estilo de CÃƒÂ³digo

- Sem emojis em cÃƒÂ³digo, comentÃƒÂ¡rios ou documentaÃƒÂ§ÃƒÂ£o
- Imutabilidade sempre - nunca mutar objetos ou arrays
- Sem console.log em cÃƒÂ³digo de produÃƒÂ§ÃƒÂ£o
- Tratamento de erro adequado com try/catch
- ValidaÃƒÂ§ÃƒÂ£o de entrada com Zod ou similar

### 3. Testes

- TDD: escreva testes primeiro
- Cobertura mÃƒÂ­nima de 80%
- Testes unitÃƒÂ¡rios para utilitÃƒÂ¡rios
- Testes de integraÃƒÂ§ÃƒÂ£o para APIs
- Testes E2E para fluxos crÃƒÂ­ticos

### 4. SeguranÃƒÂ§a

- Sem segredos hardcoded
- VariÃƒÂ¡veis de ambiente para dados sensÃƒÂ­veis
- Validar toda entrada de usuÃƒÂ¡rio
- Apenas queries parametrizadas
- ProteÃƒÂ§ÃƒÂ£o CSRF habilitada

## Estrutura de Arquivos

```
src/
|-- app/              # Next.js app router
|-- components/       # Reusable UI components
|-- hooks/            # Custom React hooks
|-- lib/              # Utility libraries
|-- types/            # TypeScript definitions
```

## PadrÃƒÂµes-Chave

### Formato de Resposta de API

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
```

### Tratamento de Erro

```typescript
try {
  const result = await operation()
  return { success: true, data: result }
} catch (error) {
  console.error('Operation failed:', error)
  return { success: false, error: 'User-friendly message' }
}
```

## VariÃƒÂ¡veis de Ambiente

```bash
# Required
DATABASE_URL=
API_KEY=

# Optional
DEBUG=false
```

## Comandos DisponÃƒÂ­veis

- `/tdd` - Fluxo de desenvolvimento orientado a testes
- `/plan` - Criar plano de implementaÃƒÂ§ÃƒÂ£o
- `/code-review` - Revisar qualidade de cÃƒÂ³digo
- `/build-fix` - Corrigir erros de build

## Fluxo Git

- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`
- Nunca commitar direto na main
- PRs exigem revisÃƒÂ£o
- Todos os testes devem passar antes do merge
