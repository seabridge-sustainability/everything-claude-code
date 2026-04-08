---
description: ImpÃƒÂµe fluxo de desenvolvimento orientado a testes. Estruture interfaces, gere testes PRIMEIRO e depois implemente cÃƒÂ³digo mÃƒÂ­nimo para passar. Garanta cobertura de 80%+.
---

# Comando TDD

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Este comando invoca o agente **tdd-guide** para impor a metodologia de desenvolvimento orientado a testes.

## O Que Este Comando Faz

1. **Estruturar Interfaces** - Definir tipos/interfaces primeiro
2. **Gerar Testes Primeiro** - Escrever testes que falham (RED)
3. **Implementar CÃƒÂ³digo MÃƒÂ­nimo** - Escrever apenas o suficiente para passar (GREEN)
4. **Refatorar** - Melhorar o cÃƒÂ³digo mantendo testes verdes (REFACTOR)
5. **Verificar Cobertura** - Garantir cobertura de testes de 80%+

## Quando Usar

Use `/tdd` quando:
- Implementar novas features
- Adicionar novas funÃƒÂ§ÃƒÂµes/componentes
- Corrigir bugs (escrever primeiro teste que reproduz o bug)
- Refatorar cÃƒÂ³digo existente
- Construir lÃƒÂ³gica de negÃƒÂ³cio crÃƒÂ­tica

## Como Funciona

O agente tdd-guide vai:

1. **Definir interfaces** para entradas/saÃƒÂ­das
2. **Escrever testes que vÃƒÂ£o FALHAR** (porque o cÃƒÂ³digo ainda nÃƒÂ£o existe)
3. **Rodar testes** e verificar que falham pelo motivo correto
4. **Escrever implementaÃƒÂ§ÃƒÂ£o mÃƒÂ­nima** para fazer testes passarem
5. **Rodar testes** e verificar que passam
6. **Refatorar** cÃƒÂ³digo mantendo testes verdes
7. **Checar cobertura** e adicionar mais testes se estiver abaixo de 80%

## Ciclo TDD

```
RED Ã¢â€ â€™ GREEN Ã¢â€ â€™ REFACTOR Ã¢â€ â€™ REPEAT

RED:      Write a failing test
GREEN:    Write minimal code to pass
REFACTOR: Improve code, keep tests passing
REPEAT:   Next feature/scenario
```

## Exemplo de Uso

```
UsuÃƒÂ¡rio: /tdd Preciso de uma funÃƒÂ§ÃƒÂ£o para calcular a pontuaÃƒÂ§ÃƒÂ£o de liquidez do mercado

Agent (tdd-guide):
# SessÃƒÂ£o TDD: Calculadora de PontuaÃƒÂ§ÃƒÂ£o de Liquidez de Mercado

## Etapa 1: Definir Interface (SCAFFOLD)

```typescript
// lib/liquidity.ts
export interface MarketData {
  totalVolume: number
  bidAskSpread: number
  activeTraders: number
  lastTradeTime: Date
}

export function calculateLiquidityScore(market: MarketData): number {
  // TODO: Implementation
  throw new Error('Not implemented')
}
```

## Etapa 2: Escreva o teste com falha (VERMELHO)

```typescript
// lib/liquidity.test.ts
import { calculateLiquidityScore } from './liquidity'

describe('calculateLiquidityScore', () => {
  it('should return high score for liquid market', () => {
    const market = {
      totalVolume: 100000,
      bidAskSpread: 0.01,
      activeTraders: 500,
      lastTradeTime: new Date()
    }

    const score = calculateLiquidityScore(market)

    expect(score).toBeGreaterThan(80)
    expect(score).toBeLessThanOrEqual(100)
  })

  it('should return low score for illiquid market', () => {
    const market = {
      totalVolume: 100,
      bidAskSpread: 0.5,
      activeTraders: 2,
      lastTradeTime: new Date(Date.now() - 86400000) // 1 day ago
    }

    const score = calculateLiquidityScore(market)

    expect(score).toBeLessThan(30)
    expect(score).toBeGreaterThanOrEqual(0)
  })

  it('should handle edge case: zero volume', () => {
    const market = {
      totalVolume: 0,
      bidAskSpread: 0,
      activeTraders: 0,
      lastTradeTime: new Date()
    }

    const score = calculateLiquidityScore(market)

    expect(score).toBe(0)
  })
})
```

## Etapa 3: Executar testes - Verificar FALHA

```bash
npm test lib/liquidity.test.ts

FAIL lib/liquidity.test.ts
  Ã¢Å“â€¢ should return high score for liquid market (2 ms)
    Error: Not implemented

1 test failed, 0 passed
```

PASS: Os testes falharam conforme o esperado. Pronto para implementaÃƒÂ§ÃƒÂ£o.

## Etapa 4: Implementar o cÃƒÂ³digo mÃƒÂ­nimo (VERDE)

```typescript
// lib/liquidity.ts
export function calculateLiquidityScore(market: MarketData): number {
  // Handle zero volume edge case
  if (market.totalVolume === 0) {
    return 0
  }

  // Calculate component scores (0-100 scale)
  const volumeScore = Math.min(market.totalVolume / 1000, 100)
  const spreadScore = Math.max(100 - (market.bidAskSpread * 1000), 0)
  const traderScore = Math.min(market.activeTraders / 10, 100)

  // Recent activity bonus
  const hoursSinceLastTrade = (Date.now() - market.lastTradeTime.getTime()) / (1000 * 60 * 60)
  const recencyScore = Math.max(100 - (hoursSinceLastTrade * 10), 0)

  // Weighted average
  const score = (
    volumeScore * 0.4 +
    spreadScore * 0.3 +
    traderScore * 0.2 +
    recencyScore * 0.1
  )

  return Math.min(Math.max(score, 0), 100) // Clamp to 0-100
}
```

## Etapa 5: Executar testes - Verificar se foi aprovado

```bash
npm test lib/liquidity.test.ts

PASS lib/liquidity.test.ts
  Ã¢Å“â€œ should return high score for liquid market (3 ms)
  Ã¢Å“â€œ should return low score for illiquid market (2 ms)
  Ã¢Å“â€œ should handle edge case: zero volume (1 ms)

3 tests passed
```

PASS: Todos os testes passando

## Etapa 6: Refatorar (MELHORAR)

```typescript
// lib/liquidity.ts - Refatorado com constantes e melhor legibilidade.
const WEIGHTS = {
  VOLUME: 0.4,
  SPREAD: 0.3,
  TRADERS: 0.2,
  RECENCY: 0.1,
} as const

const SCALE_FACTORS = {
  VOLUME: 1000,
  SPREAD: 1000,
  TRADERS: 10,
  RECENCY_PENALTY: 10,
} as const

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function calculateLiquidityScore(market: MarketData): number {
  if (market.totalVolume === 0) return 0

  const volumeScore = Math.min(market.totalVolume / SCALE_FACTORS.VOLUME, 100)
  const spreadScore = clamp(100 - (market.bidAskSpread * SCALE_FACTORS.SPREAD), 0, 100)
  const traderScore = Math.min(market.activeTraders / SCALE_FACTORS.TRADERS, 100)

  const hoursSinceLastTrade = (Date.now() - market.lastTradeTime.getTime()) / (1000 * 60 * 60)
  const recencyScore = clamp(100 - (hoursSinceLastTrade * SCALE_FACTORS.RECENCY_PENALTY), 0, 100)

  const weightedScore =
    volumeScore * WEIGHTS.VOLUME +
    spreadScore * WEIGHTS.SPREAD +
    traderScore * WEIGHTS.TRADERS +
    recencyScore * WEIGHTS.RECENCY

  return clamp(weightedScore, 0, 100)
}
```

## Etapa 7: Verificar se os testes ainda sÃƒÂ£o aprovados

```bash
npm test lib/liquidity.test.ts

PASS lib/liquidity.test.ts
  Ã¢Å“â€œ should return high score for liquid market (3 ms)
  Ã¢Å“â€œ should return low score for illiquid market (2 ms)
  Ã¢Å“â€œ should handle edge case: zero volume (1 ms)

3 tests passed
```

PASS: RefatoraÃƒÂ§ÃƒÂ£o concluÃƒÂ­da, testes ainda passando!

## Etapa 8: Verificar a cobertura

```bash
npm test -- --coverage lib/liquidity.test.ts

File           | % Stmts | % Branch | % Funcs | % Lines
---------------|---------|----------|---------|--------
liquidity.ts   |   100   |   100    |   100   |   100

Coverage: 100% PASS: (Target: 80%)
```

PASS: TDD sessÃƒÂ£o completa!
```

## Boas PrÃƒÂ¡ticas de TDD

**Fazer:**
- PASS: Escreva o teste PRIMEIRO, antes da implementaÃƒÂ§ÃƒÂ£o
- PASS: Rode testes e confirme que FALHAM antes de implementar
- PASS: Escreva cÃƒÂ³digo mÃƒÂ­nimo para fazer passar
- PASS: Refatore sÃƒÂ³ depois que os testes estiverem verdes
- PASS: Adicione casos de borda e cenÃƒÂ¡rios de erro
- PASS: Mire 80%+ de cobertura (100% para cÃƒÂ³digo crÃƒÂ­tico)

**NÃƒÂ£o fazer:**
- FAIL: Escrever implementaÃƒÂ§ÃƒÂ£o antes de testes
- FAIL: Pular execuÃƒÂ§ÃƒÂ£o de testes apÃƒÂ³s cada mudanÃƒÂ§a
- FAIL: Escrever cÃƒÂ³digo demais de uma vez
- FAIL: Ignorar testes falhando
- FAIL: Testar detalhes de implementaÃƒÂ§ÃƒÂ£o (teste comportamento)
- FAIL: Fazer mock de tudo (prefira testes de integraÃƒÂ§ÃƒÂ£o)

## Tipos de Teste a Incluir

**Testes UnitÃƒÂ¡rios** (nÃƒÂ­vel de funÃƒÂ§ÃƒÂ£o):
- CenÃƒÂ¡rios happy path
- Casos de borda (vazio, null, valores mÃƒÂ¡ximos)
- CondiÃƒÂ§ÃƒÂµes de erro
- Valores de fronteira

**Testes de IntegraÃƒÂ§ÃƒÂ£o** (nÃƒÂ­vel de componente):
- Endpoints de API
- OperaÃƒÂ§ÃƒÂµes de banco de dados
- Chamadas a serviÃƒÂ§os externos
- Componentes React com hooks

**Testes E2E** (use comando `/e2e`):
- Fluxos crÃƒÂ­ticos de usuÃƒÂ¡rio
- Processos multi-etapa
- IntegraÃƒÂ§ÃƒÂ£o full stack

## Requisitos de Cobertura

- **MÃƒÂ­nimo de 80%** para todo o cÃƒÂ³digo
- **100% obrigatÃƒÂ³rio** para:
  - CÃƒÂ¡lculos financeiros
  - LÃƒÂ³gica de autenticaÃƒÂ§ÃƒÂ£o
  - CÃƒÂ³digo crÃƒÂ­tico de seguranÃƒÂ§a
  - LÃƒÂ³gica de negÃƒÂ³cio central

## Notas Importantes

**MANDATÃƒâ€œRIO**: Os testes devem ser escritos ANTES da implementaÃƒÂ§ÃƒÂ£o. O ciclo TDD ÃƒÂ©:

1. **RED** - Escrever teste que falha
2. **GREEN** - Implementar para passar
3. **REFACTOR** - Melhorar cÃƒÂ³digo

Nunca pule a fase RED. Nunca escreva cÃƒÂ³digo antes dos testes.

## IntegraÃƒÂ§ÃƒÂ£o com Outros Comandos

- Use `/plan` primeiro para entender o que construir
- Use `/tdd` para implementar com testes
- Use `/build-fix` se ocorrerem erros de build
- Use `/code-review` para revisar implementaÃƒÂ§ÃƒÂ£o
- Use `/test-coverage` para verificar cobertura

## Agentes Relacionados

Este comando invoca o agente `tdd-guide` fornecido pelo ECC.

A skill relacionada `tdd-workflow` tambÃƒÂ©m ÃƒÂ© distribuÃƒÂ­da com o ECC.

Para instalaÃƒÂ§ÃƒÂµes manuais, os arquivos fonte ficam em:
- `agents/tdd-guide.md`
- `skills/tdd-workflow/SKILL.md`
