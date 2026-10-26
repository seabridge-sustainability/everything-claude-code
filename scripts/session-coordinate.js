#!/usr/bin/env node
'use strict';

const { execute } = require('./lib/session-coordination');
function main(args = process.argv.slice(2)) {
  if (!args.length || args.includes('--help')) {
    console.log('ecc session <register|status|renew|check-write|check-changes|guard-bind|handoff-file|metadata-only|close|release-acquire|check-release|release-observe|release-renew|release-end|release-watch>');
    console.log('After verified publication: release-observe --session ID --branch NAME --candidate FULL_SHA closes only that owner source reservation, retains the pinned release and forbids further writes/commits/pushes. Old clients see a closed source session; no takeover or CI cancellation.');
    console.log('Ignored task goal scopes register as metadata-only: disjoint source writers continue, no Git commits/releases. A legacy goal-only owner can convert itself with metadata-only; never convert another owner.');
    console.log('Ownership: one source writer per checkout; overlapping repository-relative paths stay reserved across worktrees; publication serializes per repo/branch. A busy primary is not a whole-repo hold: use your standing-approved detached integration slot for disjoint local work without another approval. Do not message/pause other tasks or take their reservations.');
    console.log('Guard binding: --guard-mode audit|block --native-session ID --deadline ISO_UTC --tool-limit N --turn-limit N --protected-path FILE (repeatable) --allowed-operation read|write|patch (repeatable). New session required for rebinding; opaque execution denied, resource telemetry unverified, provider/CI budget zero.');
    console.log('Options: --session ID --scope relative/path (repeatable) --objective TEXT --done-when TEXT --ttl-minutes 120');
    console.log('Checks: --path relative/path (repeatable), --upstream refs/remotes/origin/BRANCH after integration.');
    console.log('Experiment registration: --loop-target exact-file --check-file committed-check (repeatable); exactly one owned target, pinned read-only-to-maker checks.');
    console.log('Release: --branch NAME --candidate FULL_SHA --actions-budget-status known|unknown --actions-budget-used USD --actions-budget-limit USD --actions-budget-checked-at ISO_UTC --actions-budget-source github-org-budget-ui|owner-screenshot|github-org-billing-export|unavailable(unknown-only) --actions-stop-usage yes|no|unknown --expected-actions-usd USD --expected-workflows NAMES [--owner-cost-approval TEXT].');
    console.log('Publication: origin target/destination are pinned automatically. Inherited outgoing commits need --include-owned-commit FULL_SHA (repeatable) and --publication-evidence TEXT. A missing target needs --new-branch-base FULL_SHA and evidence approving that exact baseline history; no-origin leases are local-only. These records grant no authorization.');
    console.log('User-facing frontend publication also requires --ui-review D:/.../review.json: source-bound ecc.frontend-review.v1, every affected route/state before+after 1280x900/390x844, UX reviewer PASS and actual owner-visible render. Tests alone cannot land UI. Evidence is rechecked by check-release.');
    console.log('Owner watcher: release-watch --session ID --repository OWNER/REPO --branch NAME --candidate FULL_SHA --expected-workflows security-scan[,backend-tests] [--max-polls 20 --poll-ms 15000 --max-requests 200 --deadline-seconds 600 --close-session yes|no]. Finite GET-only observation; existing gh login; missing evidence retains own lease. Invocation grants no push, rerun, deployment or provider authority.');
    console.log('End: --outcome completed|failed|superseded|aborted-before-push --evidence TEXT');
    console.log('Unchanged failed release: --retry-evidence TEXT describing the external change; completed candidates cannot be released again.');
    console.log('Handoff: owner invokes --path exact-file --evidence TEXT; releases only that reservation, never a product session or release lease.');
    return 0;
  }
  const options = { sessionId: process.env.ECC_SESSION_ID, scopes: [], paths: [], checkFiles: [], protectedPaths: [], includeOwnedCommits: [] };
  const fields = { '--session': 'sessionId', '--objective': 'objective', '--done-when': 'doneWhen',
    '--ttl-minutes': 'ttl', '--branch': 'branch', '--candidate': 'candidate', '--outcome': 'outcome', '--evidence': 'evidence', '--upstream': 'upstream', '--loop-target': 'loopTarget',
    '--repository': 'repository', '--max-polls': 'maxPolls', '--poll-ms': 'pollMs',
    '--max-requests': 'maxRequests', '--deadline-seconds': 'deadlineSeconds', '--close-session': 'closeSession',
    '--publication-evidence': 'publicationEvidence', '--new-branch-base': 'newBranchBase', '--ui-review': 'uiReview',
    '--actions-budget-status': 'actionsBudgetStatus', '--actions-budget-used': 'actionsBudgetUsed',
    '--actions-budget-limit': 'actionsBudgetLimit', '--actions-budget-checked-at': 'actionsBudgetCheckedAt',
    '--actions-budget-source': 'actionsBudgetSource', '--actions-stop-usage': 'actionsStopUsage',
    '--expected-actions-usd': 'expectedActionsUsd', '--expected-workflows': 'expectedWorkflows',
    '--owner-cost-approval': 'ownerCostApproval', '--retry-evidence': 'retryEvidence', '--guard-mode': 'guardMode', '--deadline': 'deadline',
    '--tool-limit': 'toolLimit', '--turn-limit': 'turnLimit', '--native-session': 'nativeSessionId' };
  for (let i = 1; i < args.length; i += 2) {
    const key = args[i], value = args[i + 1];
    if (!value || value.startsWith('--')) throw new Error(`value required for ${key}`);
    if (key === '--scope') options.scopes.push(value);
    else if (key === '--protected-path') options.protectedPaths.push(value);
    else if (key === '--allowed-operation') (options.allowedOperations ||= []).push(value);
    else if (key === '--check-file') options.checkFiles.push(value);
    else if (key === '--path') options.paths.push(value);
    else if (key === '--include-owned-commit') options.includeOwnedCommits.push(value);
    else if (fields[key]) options[fields[key]] = value;
    else throw new Error(`unknown option ${key}`);
  }
  if (args[0] === 'release-watch') return require('./lib/release-watch').watchRelease(options).then(result => {
    console.log(JSON.stringify(result, null, 2));
    return result.state === 'ended' ? 0 : 2;
  }).catch(() => {
    console.error('owner release watcher: prerequisites unavailable; lease retained'); return 2;
  });
  console.log(JSON.stringify(execute(args[0], options), null, 2));
  return 0;
}
if (require.main === module) {
  Promise.resolve().then(() => main()).then(code => { process.exitCode = code; }).catch(error => {
    console.error(`session coordination: ${error.message}`);
    if (error.recovery) console.error(JSON.stringify({ allowed: false, recovery: error.recovery }));
    process.exitCode = 2;
  });
}
module.exports = { main };
