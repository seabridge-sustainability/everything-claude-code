---
name: caveman-cloud-console
description: >
  Map each Caveman Cloud console page to the cvm commands that read the same
  data. Read when the user names a page ("what does Spend say", "check the
  Monitors page").
---

# Console pages as commands

Use when the user names a page or pastes a console link. Answer from the
command instead of sending them to the page. Reports take `--window 7d`
(also `14d`, `30d`, `60d`, `90d`) or `--from`/`--to`; without one they read 30
days, so always pass one. Changes marked *person* are console actions: say
what to click and where.

## Traffic

| Page | Path | Read with |
|---|---|---|
| Home | `/home` | `cvm plan score --window 7d`, `cvm reports overview --window 7d`, `cvm inbox summary` |
| Gateway | `/gateway` | `cvm reports overview --window 7d` |
| Gateway → Models | `/gateway/providers` | `cvm providers list`, `cvm reports models --window 7d`; adding a provider: *person* |
| Gateway → Caching | `/gateway/caching` | `cvm reports cache --window 7d`, `cvm context get_semantic_cache` |
| Gateway → Connect | `/gateway/connect` | `cvm setup show`; then **caveman-setup** |
| Analytics → Spend | `/spend` | `cvm reports costs --window 7d`, `cvm people spend_breakdown --dimension workflow --window 7d` (or `agent`, `member`, `provider`) |
| Analytics → Usage | `/analytics/usage` | `cvm reports usage --window 7d` |
| Usage → Cache & compression | `/analytics/efficiency` | `cvm reports cache --window 7d`, `cvm reports compression --window 7d` |
| Usage → Routing | `/analytics/routing` | `cvm reports routes --window 7d` |
| Usage → Traffic shape | `/analytics/traffic-shape` | `cvm reports traffic_shape --window 7d` |
| Analytics → Activity | `/activity` | `cvm reports agents --window 7d`, `cvm reports workflows --window 7d` |
| Traces | `/traces`, `/sessions/…`, `/tasks/…` | `cvm traces search --limit 10`, `cvm tasks get TASK_KEY`; **caveman-cloud-traces** |
| Dashboards | `/dashboards` | `cvm dashboards list`; **caveman-cloud-dashboards** |

## Improve and evaluate

| Page | Path | Read with |
|---|---|---|
| Improvements | `/optimization` | `cvm briefs summary`, `cvm briefs list --limit 10`; **caveman-optimize** |
| Registered workloads | `/agents` | `cvm workflows list_agents` |
| Build evidence | `/agents/builds` | `cvm builds list` |
| Verified savings | `/verified-savings` | `cvm reports verified_savings --window 30d` |
| Workflows | `/workflows` | `cvm reports workflows --window 7d`; **caveman-discover** |
| Quality | `/quality` | `cvm quality status --limit 20` |
| Datasets | `/datasets` | `cvm datasets list` |
| Criteria | `/criteria` | `cvm criteria list --limit 20`; turning on: *person*; **caveman-cloud-criteria** |
| Experiments | `/experiments` | `cvm evals list`, `cvm verdicts list --limit 10`; **caveman-cloud-compare** |
| One experiment | `/experiments/workbenches/ID` | `cvm evals get ID`, `cvm evals runs ID` |
| Prompt registry | `/experiments/prompts` | `cvm prompts list`; promote, roll back: *person* |
| Proposals | `/experiments/proposals` | `cvm proposals list` |
| Monitors | `/monitors` | `cvm monitors list`, `cvm monitors results ID --window 7d`; **caveman-cloud-project** |
| Review | `/review` | `cvm review summary`, `cvm review list` |
| Inbox | `/inbox` | `cvm inbox list --limit 10`, `cvm inbox get ID`; deciding: *person* |

## People and coding agents

| Page | Path | Read with |
|---|---|---|
| My usage | `/my` | `cvm people my_usage --window 7d` |
| Developers → Team | `/dev` | `cvm people developers --window 7d` |
| Delivery | `/dev/delivery` | `cvm people delivery --window 7d` |
| Sessions | `/dev/sessions` | `cvm people sessions --window 7d --limit 20` |
| Your agents, Agent usage | `/dev/agents`, `/dev/analytics` | `cvm reports dev_agents --window 7d` |
| Connect an agent | `/dev/getting-started` | **caveman-cloud-connect** |

## Admin

| Page | Path | Read with |
|---|---|---|
| Governance | `/governance` | `cvm policy current` |
| Access, Budgets, Guardrails | `/governance/…` | `cvm policy access`, `cvm policy budgets`, `cvm policy guardrails`, `cvm policy guardrail_hits` |
| Data | `/governance/data` | `cvm policy retention`, `cvm policy consent_status`; changing: *person* |
| Audit log | `/governance/audit` | `cvm audit list` |
| Keys | `/governance/keys` | *person* (creating keys) |
| Projects, Team | `/projects`, `/team` | `cvm projects list`, `cvm people list_members` |
| Billing | `/billing` | `cvm reports billing_usage`; *person* |
| Judges | `/settings/judges` | `cvm judges list` |
| Ask Caveman | `/ask` | a chat in the console; no command |

Each row's reads need the permission the page needs; exit 3 names the missing
one. For anything not here: `cvm tools list --format table | grep -i WORD`.
