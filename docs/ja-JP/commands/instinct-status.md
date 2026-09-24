---
name: instinct-status
description: すべての学習済みインスティンクトと信頼度レベルを表示
command: true
---

# インスティンクトステータスコマンド

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

すべての学習済みインスティンクトを信頼度スコアとともに、ドメインごとにグループ化して表示します。

## 実装

`hooks/hooks.json` および他のスラッシュコマンド（`/sessions`、`/skill-health`）
と同じリゾルバ（環境変数 → 標準インストール → 既知のプラグインルート →
プラグインキャッシュ → フォールバック）でインスティンクトCLIを実行します。
これにより、`CLAUDE_PLUGIN_ROOT` が未設定で
レガシーの `~/.claude/skills/continuous-learning-v2/` ディレクトリが
残っているときに発生するパスの分岐を回避します (#2037)。

```bash
ECC_ROOT="${CLAUDE_PLUGIN_ROOT:-$(node -e "var r=(function(){var p=require('path'),f=require('fs'),o=require('os');var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var d=p.join(o.homedir(),'.claude');function L(x){try{return require(p.join(x,'scripts','lib','resolve-ecc-root')).resolveEccRoot()}catch(_){return null}}var r=L(d);if(r)return r;var s=['ecc','ecc@ecc','marketplaces/ecc','everything-claude-code','everything-claude-code@everything-claude-code','marketplaces/everything-claude-code'];for(var i=0;i<s.length;i++){r=L(p.join(d,'plugins',s[i]));if(r)return r}try{var g=['ecc','everything-claude-code'];for(var j=0;j<g.length;j++){var c=p.join(d,'plugins','cache',g[j]);var O=f.readdirSync(c);for(var k=0;k<O.length;k++){var q=p.join(c,O[k]);var V=f.readdirSync(q);for(var m=0;m<V.length;m++){r=L(p.join(q,V[m]));if(r)return r}}}}catch(_){}return d})();console.log(r)")}"
python3 "$ECC_ROOT/skills/continuous-learning-v2/scripts/instinct-cli.py" status
```

## 使用方法

```
/instinct-status
/instinct-status --domain code-style
/instinct-status --low-confidence
```

## 実行内容

1. `~/.claude/homunculus/instincts/personal/` からすべてのインスティンクトファイルを読み込む
2. `~/.claude/homunculus/instincts/inherited/` から継承されたインスティンクトを読み込む
3. ドメインごとにグループ化し、信頼度バーとともに表示

## 出力形式

```
 instinctステータス
==================

## コードスタイル (4 instincts)

### prefer-functional-style
トリガー: 新しい関数を書くとき
アクション: クラスより関数型パターンを使用
信頼度: ████████░░ 80%
ソース: session-observation | 最終更新: 2025-01-22

### use-path-aliases
トリガー: モジュールをインポートするとき
アクション: 相対インポートの代わりに@/パスエイリアスを使用
信頼度: ██████░░░░ 60%
ソース: repo-analysis (github.com/acme/webapp)

## テスト (2 instincts)

### test-first-workflow
トリガー: 新しい機能を追加するとき
アクション: テストを先に書き、次に実装
信頼度: █████████░ 90%
ソース: session-observation

## ワークフロー (3 instincts)

### grep-before-edit
トリガー: コードを変更するとき
アクション: Grepで検索、Readで確認、次にEdit
信頼度: ███████░░░ 70%
ソース: session-observation

---
合計: 9 instincts (4個人, 5継承)
オブザーバー: 実行中 (最終分析: 5分前)
```

## フラグ

- `--domain <name>`: ドメインでフィルタリング（code-style、testing、gitなど）
- `--low-confidence`: 信頼度 < 0.5のインスティンクトのみを表示
- `--high-confidence`: 信頼度 >= 0.7のインスティンクトのみを表示
- `--source <type>`: ソースでフィルタリング（session-observation、repo-analysis、inherited）
- `--json`: プログラムで使用するためにJSON形式で出力
