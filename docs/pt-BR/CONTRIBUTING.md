# Contribuindo para o Everything Claude Code

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


Obrigado por querer contribuir! Este repositÃƒÂ³rio ÃƒÂ© um recurso comunitÃƒÂ¡rio para usuÃƒÂ¡rios do Claude Code.

## ÃƒÂndice

- [O Que Estamos Buscando](#o-que-estamos-buscando)
- [InÃƒÂ­cio RÃƒÂ¡pido](#inÃƒÂ­cio-rÃƒÂ¡pido)
- [Contribuindo com Skills](#contribuindo-com-skills)
- [Contribuindo com Agentes](#contribuindo-com-agentes)
- [Contribuindo com Hooks](#contribuindo-com-hooks)
- [Contribuindo com Comandos](#contribuindo-com-comandos)
- [MCP e DocumentaÃƒÂ§ÃƒÂ£o (ex: Context7)](#mcp-e-documentaÃƒÂ§ÃƒÂ£o-ex-context7)
- [Multiplataforma e TraduÃƒÂ§ÃƒÂµes](#multiplataforma-e-traduÃƒÂ§ÃƒÂµes)
- [Processo de Pull Request](#processo-de-pull-request)

---

## O Que Estamos Buscando

### Agentes
Novos agentes que lidam bem com tarefas especÃƒÂ­ficas:
- Revisores especÃƒÂ­ficos de linguagem (Python, Go, Rust)
- Especialistas em frameworks (Django, Rails, Laravel, Spring)
- Especialistas em DevOps (Kubernetes, Terraform, CI/CD)
- Especialistas de domÃƒÂ­nio (pipelines de ML, engenharia de dados, mobile)

### Skills
DefiniÃƒÂ§ÃƒÂµes de fluxo de trabalho e conhecimento de domÃƒÂ­nio:
- Melhores prÃƒÂ¡ticas de linguagem
- PadrÃƒÂµes de frameworks
- EstratÃƒÂ©gias de testes
- Guias de arquitetura

### Hooks
AutomaÃƒÂ§ÃƒÂµes ÃƒÂºteis:
- Hooks de lint/formataÃƒÂ§ÃƒÂ£o
- VerificaÃƒÂ§ÃƒÂµes de seguranÃƒÂ§a
- Hooks de validaÃƒÂ§ÃƒÂ£o
- Hooks de notificaÃƒÂ§ÃƒÂ£o

### Comandos
Comandos slash que invocam fluxos de trabalho ÃƒÂºteis:
- Comandos de implantaÃƒÂ§ÃƒÂ£o
- Comandos de teste
- Comandos de geraÃƒÂ§ÃƒÂ£o de cÃƒÂ³digo

---

## InÃƒÂ­cio RÃƒÂ¡pido

```bash
# 1. Fork e clone
gh repo fork affaan-m/everything-claude-code --clone
cd everything-claude-code

# 2. Criar uma branch
git checkout -b feat/minha-contribuicao

# 3. Adicionar sua contribuiÃƒÂ§ÃƒÂ£o (veja as seÃƒÂ§ÃƒÂµes abaixo)

# 4. Testar localmente
cp -r skills/minha-skill ~/.claude/skills/  # para skills
# Em seguida teste com o Claude Code

# 5. Enviar PR
git add . && git commit -m "feat: adicionar minha-skill" && git push -u origin feat/minha-contribuicao
```

---

## Contribuindo com Skills

Skills sÃƒÂ£o mÃƒÂ³dulos de conhecimento que o Claude Code carrega baseado no contexto.

### Estrutura de DiretÃƒÂ³rio

```
skills/
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ nome-da-sua-skill/
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ SKILL.md
```

### Template SKILL.md

```markdown
---
name: nome-da-sua-skill
description: Breve descriÃƒÂ§ÃƒÂ£o mostrada na lista de skills
origin: ECC
---

# TÃƒÂ­tulo da Sua Skill

Breve visÃƒÂ£o geral do que esta skill cobre.

## Conceitos Principais

Explique padrÃƒÂµes e diretrizes chave.

## Exemplos de CÃƒÂ³digo

\`\`\`typescript
// Inclua exemplos prÃƒÂ¡ticos e testados
function exemplo() {
  // CÃƒÂ³digo bem comentado
}
\`\`\`

## Melhores PrÃƒÂ¡ticas

- Diretrizes acionÃƒÂ¡veis
- O que fazer e o que nÃƒÂ£o fazer
- Armadilhas comuns a evitar

## Quando Usar

Descreva cenÃƒÂ¡rios onde esta skill se aplica.
```

### Checklist de Skill

- [ ] Focada em um domÃƒÂ­nio/tecnologia
- [ ] Inclui exemplos prÃƒÂ¡ticos de cÃƒÂ³digo
- [ ] Abaixo de 500 linhas
- [ ] Usa cabeÃƒÂ§alhos de seÃƒÂ§ÃƒÂ£o claros
- [ ] Testada com o Claude Code

### Exemplos de Skills

| Skill | PropÃƒÂ³sito |
|-------|-----------|
| `coding-standards/` | PadrÃƒÂµes TypeScript/JavaScript |
| `frontend-patterns/` | Melhores prÃƒÂ¡ticas React e Next.js |
| `backend-patterns/` | PadrÃƒÂµes de API e banco de dados |
| `security-review/` | Checklist de seguranÃƒÂ§a |

---

## Contribuindo com Agentes

Agentes sÃƒÂ£o assistentes especializados invocados via a ferramenta Task.

### LocalizaÃƒÂ§ÃƒÂ£o do Arquivo

```
agents/nome-do-seu-agente.md
```

### Template de Agente

```markdown
---
name: nome-do-seu-agente
description: O que este agente faz e quando o Claude deve invocÃƒÂ¡-lo. Seja especÃƒÂ­fico!
tools: ["Read", "Write", "Edit", "Bash", "Grep", "Glob"]
model: sonnet
---

VocÃƒÂª ÃƒÂ© um especialista em [funÃƒÂ§ÃƒÂ£o].

## Seu Papel

- Responsabilidade principal
- Responsabilidade secundÃƒÂ¡ria
- O que vocÃƒÂª NÃƒÆ’O faz (limites)

## Fluxo de Trabalho

### Passo 1: Entender
Como vocÃƒÂª aborda a tarefa.

### Passo 2: Executar
Como vocÃƒÂª realiza o trabalho.

### Passo 3: Verificar
Como vocÃƒÂª valida os resultados.

## Formato de SaÃƒÂ­da

O que vocÃƒÂª retorna ao usuÃƒÂ¡rio.

## Exemplos

### Exemplo: [CenÃƒÂ¡rio]
Entrada: [o que o usuÃƒÂ¡rio fornece]
AÃƒÂ§ÃƒÂ£o: [o que vocÃƒÂª faz]
SaÃƒÂ­da: [o que vocÃƒÂª retorna]
```

### Campos do Agente

| Campo | DescriÃƒÂ§ÃƒÂ£o | OpÃƒÂ§ÃƒÂµes |
|-------|-----------|--------|
| `name` | MinÃƒÂºsculas, com hifens | `code-reviewer` |
| `description` | Usado para decidir quando invocar | Seja especÃƒÂ­fico! |
| `tools` | Apenas o que ÃƒÂ© necessÃƒÂ¡rio | `Read, Write, Edit, Bash, Grep, Glob, WebFetch, Task` |
| `model` | NÃƒÂ­vel de complexidade | `haiku` (simples), `sonnet` (codificaÃƒÂ§ÃƒÂ£o), `opus` (complexo) |

### Agentes de Exemplo

| Agente | PropÃƒÂ³sito |
|--------|-----------|
| `tdd-guide.md` | Desenvolvimento orientado a testes |
| `code-reviewer.md` | RevisÃƒÂ£o de cÃƒÂ³digo |
| `security-reviewer.md` | Varredura de seguranÃƒÂ§a |
| `build-error-resolver.md` | CorreÃƒÂ§ÃƒÂ£o de erros de build |

---

## Contribuindo com Hooks

Hooks sÃƒÂ£o comportamentos automÃƒÂ¡ticos disparados por eventos do Claude Code.

### LocalizaÃƒÂ§ÃƒÂ£o do Arquivo

```
hooks/hooks.json
```

### Tipos de Hooks

| Tipo | Gatilho | Caso de Uso |
|------|---------|-------------|
| `PreToolUse` | Antes da execuÃƒÂ§ÃƒÂ£o da ferramenta | Validar, avisar, bloquear |
| `PostToolUse` | ApÃƒÂ³s a execuÃƒÂ§ÃƒÂ£o da ferramenta | Formatar, verificar, notificar |
| `SessionStart` | SessÃƒÂ£o comeÃƒÂ§a | Carregar contexto |
| `Stop` | SessÃƒÂ£o termina | Limpeza, auditoria |

### Formato de Hook

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "tool == \"Bash\" && tool_input.command matches \"rm -rf /\"",
        "hooks": [
          {
            "type": "command",
            "command": "echo '[Hook] BLOQUEADO: Comando perigoso' && exit 1"
          }
        ],
        "description": "Bloquear comandos rm perigosos"
      }
    ]
  }
}
```

### Sintaxe de Matcher

```javascript
// Corresponder ferramentas especÃƒÂ­ficas
tool == "Bash"
tool == "Edit"
tool == "Write"

// Corresponder padrÃƒÂµes de entrada
tool_input.command matches "npm install"
tool_input.file_path matches "\\.tsx?$"

// Combinar condiÃƒÂ§ÃƒÂµes
tool == "Bash" && tool_input.command matches "git push"
```

### Checklist de Hook

- [ ] O matcher ÃƒÂ© especÃƒÂ­fico (nÃƒÂ£o excessivamente abrangente)
- [ ] Inclui mensagens de erro/informaÃƒÂ§ÃƒÂ£o claras
- [ ] Usa cÃƒÂ³digos de saÃƒÂ­da corretos (`exit 1` bloqueia, `exit 0` permite)
- [ ] Testado exaustivamente
- [ ] Tem descriÃƒÂ§ÃƒÂ£o

---

## Contribuindo com Comandos

Comandos sÃƒÂ£o aÃƒÂ§ÃƒÂµes invocadas pelo usuÃƒÂ¡rio com `/nome-do-comando`.

### LocalizaÃƒÂ§ÃƒÂ£o do Arquivo

```
commands/seu-comando.md
```

### Template de Comando

```markdown
---
description: Breve descriÃƒÂ§ÃƒÂ£o mostrada em /help
---

# Nome do Comando

## PropÃƒÂ³sito

O que este comando faz.

## Uso

\`\`\`
/seu-comando [args]
\`\`\`

## Fluxo de Trabalho

1. Primeiro passo
2. Segundo passo
3. Passo final

## SaÃƒÂ­da

O que o usuÃƒÂ¡rio recebe.
```

---

## MCP e DocumentaÃƒÂ§ÃƒÂ£o (ex: Context7)

Skills e agentes podem usar ferramentas **MCP (Model Context Protocol)** para obter dados atualizados em vez de depender apenas de dados de treinamento. Isso ÃƒÂ© especialmente ÃƒÂºtil para documentaÃƒÂ§ÃƒÂ£o.

- **Context7** ÃƒÂ© um servidor MCP que expÃƒÂµe `resolve-library-id` e `query-docs`. Use quando o usuÃƒÂ¡rio perguntar sobre bibliotecas, frameworks ou APIs para que as respostas reflitam a documentaÃƒÂ§ÃƒÂ£o atual.
- Ao contribuir com **skills** que dependem de docs em tempo real, descreva como usar as ferramentas MCP relevantes.
- Ao contribuir com **agentes** que respondem perguntas sobre docs/API, inclua os nomes das ferramentas MCP do Context7 nas ferramentas do agente.

---

## Multiplataforma e TraduÃƒÂ§ÃƒÂµes

### Subconjuntos de Skills (Codex e Cursor)

O ECC vem com subconjuntos de skills para outros harnesses:

- **Codex:** `.agents/skills/` Ã¢â‚¬â€ skills listadas em `agents/openai.yaml` sÃƒÂ£o carregadas pelo Codex.
- **Cursor:** `.cursor/skills/` Ã¢â‚¬â€ um subconjunto de skills ÃƒÂ© incluÃƒÂ­do para Cursor.

Ao **adicionar uma nova skill** que deve estar disponÃƒÂ­vel no Codex ou Cursor:

1. Adicione a skill em `skills/nome-da-sua-skill/` como de costume.
2. Se deve estar disponÃƒÂ­vel no **Codex**, adicione-a em `.agents/skills/` e garanta que seja referenciada em `agents/openai.yaml` se necessÃƒÂ¡rio.
3. Se deve estar disponÃƒÂ­vel no **Cursor**, adicione-a em `.cursor/skills/`.

### TraduÃƒÂ§ÃƒÂµes

TraduÃƒÂ§ÃƒÂµes ficam em `docs/` (ex: `docs/zh-CN`, `docs/zh-TW`, `docs/ja-JP`, `docs/ko-KR`, `docs/pt-BR`). Se vocÃƒÂª alterar agentes, comandos ou skills que sÃƒÂ£o traduzidos, considere atualizar os arquivos de traduÃƒÂ§ÃƒÂ£o correspondentes ou abrir uma issue.

---

## Processo de Pull Request

### 1. Formato do TÃƒÂ­tulo do PR

```
feat(skills): adicionar skill rust-patterns
feat(agents): adicionar agente api-designer
feat(hooks): adicionar hook auto-format
fix(skills): atualizar padrÃƒÂµes React
docs: melhorar guia de contribuiÃƒÂ§ÃƒÂ£o
docs(pt-BR): adicionar traduÃƒÂ§ÃƒÂ£o para portuguÃƒÂªs brasileiro
```

### 2. DescriÃƒÂ§ÃƒÂ£o do PR

```markdown
## Resumo
O que vocÃƒÂª estÃƒÂ¡ adicionando e por quÃƒÂª.

## Tipo
- [ ] Skill
- [ ] Agente
- [ ] Hook
- [ ] Comando
- [ ] Docs / TraduÃƒÂ§ÃƒÂ£o

## Testes
Como vocÃƒÂª testou isso.

## Checklist
- [ ] Segue as diretrizes de formato
- [ ] Testado com o Claude Code
- [ ] Sem informaÃƒÂ§ÃƒÂµes sensÃƒÂ­veis (chaves de API, caminhos)
- [ ] DescriÃƒÂ§ÃƒÂµes claras
```

### 3. Processo de RevisÃƒÂ£o

1. Mantenedores revisam em atÃƒÂ© 48 horas
2. Abordar o feedback se solicitado
3. Uma vez aprovado, mesclado na main

---

## Diretrizes

### FaÃƒÂ§a
- Mantenha as contribuiÃƒÂ§ÃƒÂµes focadas e modulares
- Inclua descriÃƒÂ§ÃƒÂµes claras
- Teste antes de enviar
- Siga os padrÃƒÂµes existentes
- Documente dependÃƒÂªncias

### NÃƒÂ£o FaÃƒÂ§a
- Incluir dados sensÃƒÂ­veis (chaves de API, tokens, caminhos)
- Adicionar configuraÃƒÂ§ÃƒÂµes excessivamente complexas ou de nicho
- Enviar contribuiÃƒÂ§ÃƒÂµes nÃƒÂ£o testadas
- Criar duplicatas de funcionalidade existente

---

## Nomenclatura de Arquivos

- Use minÃƒÂºsculas com hifens: `python-reviewer.md`
- Seja descritivo: `tdd-workflow.md` nÃƒÂ£o `workflow.md`
- Combine nome com nome do arquivo

---

## DÃƒÂºvidas?

- **Issues:** [github.com/affaan-m/everything-claude-code/issues](https://github.com/affaan-m/everything-claude-code/issues)
- **X/Twitter:** [@affaanmustafa](https://x.com/affaanmustafa)

---

Obrigado por contribuir! Vamos construir um ÃƒÂ³timo recurso juntos.
