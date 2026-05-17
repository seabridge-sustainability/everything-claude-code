---
name: skill-health
description: Show skill portfolio health dashboard with charts and analytics
command: true
---

# Skill Health Dashboard

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Shows a comprehensive health dashboard for all skills in the portfolio with success rate sparklines, failure pattern clustering, pending amendments, and version history.

## Implementation

Run the skill health CLI in dashboard mode:

```bash
ECC_ROOT="${CLAUDE_PLUGIN_ROOT:-$(node -e "var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(!f.existsSync(p.join(d,q))){try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q))){d=c;break}}}catch(x){}}console.log(d)")}"
node "$ECC_ROOT/scripts/skills-health.js" --dashboard
```

For a specific panel only:

```bash
ECC_ROOT="${CLAUDE_PLUGIN_ROOT:-$(node -e "var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(!f.existsSync(p.join(d,q))){try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q))){d=c;break}}}catch(x){}}console.log(d)")}"
node "$ECC_ROOT/scripts/skills-health.js" --dashboard --panel failures
```

For machine-readable output:

```bash
ECC_ROOT="${CLAUDE_PLUGIN_ROOT:-$(node -e "var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(!f.existsSync(p.join(d,q))){try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q))){d=c;break}}}catch(x){}}console.log(d)")}"
node "$ECC_ROOT/scripts/skills-health.js" --dashboard --json
```

## Usage

```
/skill-health                    # Full dashboard view
/skill-health --panel failures   # Only failure clustering panel
/skill-health --json             # Machine-readable JSON output
```

## What to Do

1. Run the skills-health.js script with --dashboard flag
2. Display the output to the user
3. If any skills are declining, highlight them and suggest running /evolve
4. If there are pending amendments, suggest reviewing them

## Panels

- **Success Rate (30d)** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Sparkline charts showing daily success rates per skill
- **Failure Patterns** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Clustered failure reasons with horizontal bar chart
- **Pending Amendments** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Amendment proposals awaiting review
- **Version History** ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Timeline of version snapshots per skill

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
