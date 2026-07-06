# Comando Checkpoint

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


Crie ou verifique um checkpoint no seu fluxo.

## Uso

`/checkpoint [create|verify|list] [name]`

## Criar Checkpoint

Ao criar um checkpoint:

1. Rode `/verify quick` para garantir que o estado atual estÃƒÂ¡ limpo
2. Crie um git stash ou commit com o nome do checkpoint
3. Registre o checkpoint em `.claude/checkpoints.log`:

```bash
echo "$(date +%Y-%m-%d-%H:%M) | $CHECKPOINT_NAME | $(git rev-parse --short HEAD)" >> .claude/checkpoints.log
```

4. Informe que o checkpoint foi criado

## Verificar Checkpoint

Ao verificar contra um checkpoint:

1. Leia o checkpoint no log
2. Compare o estado atual com o checkpoint:
   - Arquivos adicionados desde o checkpoint
   - Arquivos modificados desde o checkpoint
   - Taxa de testes passando agora vs antes
   - Cobertura agora vs antes

3. Reporte:
```
CHECKPOINT COMPARISON: $NAME
============================
Files changed: X
Tests: +Y passed / -Z failed
Coverage: +X% / -Y%
Build: [PASS/FAIL]
```

## Listar Checkpoints

Mostre todos os checkpoints com:
- Nome
- Timestamp
- Git SHA
- Status (current, behind, ahead)

## Fluxo

Fluxo tÃƒÂ­pico de checkpoint:

```
[Start] --> /checkpoint create "feature-start"
   |
[Implement] --> /checkpoint create "core-done"
   |
[Test] --> /checkpoint verify "core-done"
   |
[Refactor] --> /checkpoint create "refactor-done"
   |
[PR] --> /checkpoint verify "feature-start"
```

## Argumentos

$ARGUMENTS:
- `create <name>` - Criar checkpoint nomeado
- `verify <name>` - Verificar contra checkpoint nomeado
- `list` - Mostrar todos os checkpoints
- `clear` - Remover checkpoints antigos (mantÃƒÂ©m os ÃƒÂºltimos 5)
