'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const file = path.join(root, 'manifests/task-skill-routing.json');
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
function skillFile(name) {
  for(const file of [`skills/${name}/SKILL.md`,`.agents/skills/${name}/SKILL.md`,...(name==='sea-dev-suite'?['integrations/dev-suite/SKILL.md']:[])]) {
    if(fs.existsSync(path.join(root,file))) return file;
  }
  throw Error('Canonical skill entry missing: '+name);
}
function policy() {
  const raw = fs.readFileSync(file, 'utf8'), value = JSON.parse(raw);
  if (value.version !== 1 || !Array.isArray(value.routes) || !Array.isArray(value.codingSources)
      || new Set(value.routes.map(x=>x.id)).size !== value.routes.length) throw Error('Invalid task-routing policy');
  for (const row of value.routes) if (!row.id || !row.source || !row.name || !row.skill || !Array.isArray(row.patterns)) throw Error('Incomplete task route');
  for (const row of value.routes) if (row.excludePatterns && (!Array.isArray(row.excludePatterns) || row.excludePatterns.some(p=>typeof p!=='string'))) throw Error('Invalid task route exclusions');
  const review = value.frontendReview;
  if (!review || review.skill !== 'sea-frontend-ux-reviewer' || typeof review.queryPattern !== 'string'
      || typeof review.pathPattern !== 'string' || review.evidenceVolume !== 'D:') throw Error('Invalid frontend review route');
  new RegExp(review.queryPattern, 'i'); new RegExp(review.pathPattern, 'i');
  return { ...value, sha256: sha(raw) };
}
function rankWorkflows(c, { query, limit = 10, kind = 'all', profile = 'auto' }) {
  if (typeof query !== 'string' || !query.trim() || query.length > 200 || !Number.isInteger(limit) || limit < 1 || limit > 30
      || !['all','skill','command'].includes(kind) || !['auto','coding','company','all'].includes(profile)) throw Error('Invalid bounded workflow query');
  const p = policy(), q = query.trim().toLowerCase(), terms = q.split(/\s+/).filter(Boolean);
  const all = [...(kind !== 'command' ? c.skills.map(e=>({...e,kind:'skill'})) : []), ...(kind !== 'skill' ? c.commands.map(e=>({...e,kind:'command'})) : [])];
  const exact = all.find(e=>e.id.toLowerCase()===q);
  const route = p.routes.find(row=>row.patterns.some(pattern=>new RegExp(pattern,'i').test(q))
    && !(row.excludePatterns || []).some(pattern=>new RegExp(pattern,'i').test(q)));
  const primary = exact || (route && all.find(e=>e.kind==='skill'&&e.source===route.source&&e.name===route.name&&(!route.plugin||e.plugin===route.plugin)));
  // A recognized coding task does not compete with unrelated company templates.
  const chosenProfile = profile !== 'auto' ? profile : p.codingSources.includes(primary?.source) ? 'coding' : primary ? 'company' : 'all';
  const entries = all.filter(e=>e.id===exact?.id || chosenProfile==='all' || (p.codingSources.includes(e.source) ? chosenProfile==='coding' : chosenProfile==='company'));
  const seen = new Set();
  return entries.map(e=>({...e,score:terms.reduce((n,t)=>n+(`${e.id} ${e.description}`.toLowerCase().includes(t)?1:0),0),
    routingRole:e.id===primary?.id&&e.kind===primary.kind?'primary':'candidate',
    routingReason:e.id===primary?.id?(exact?'explicit ID':'Canonical ECC task route '+route.id):'Optional supporting guidance; do not start a second workflow',
    routingPriority:e.id===primary?.id?100:e.plugin==='fsi-financial-analysis'?1:0,
    routingVersion:p.version,routingPolicySha256:p.sha256,routingProfile:chosenProfile,
    canonicalSkill:e.id===primary?.id?(exact?p.routes.find(r=>r.source===e.source&&r.name===e.name)?.skill:route.skill)||'sea-dev-suite':null}))
    .map(e=>({...e,canonicalSkillFile:e.canonicalSkill?skillFile(e.canonicalSkill):null}))
    .filter(e=>e.score>0||e.routingRole==='primary').sort((a,b)=>b.routingPriority-a.routingPriority||b.score-a.score||a.id.localeCompare(b.id))
    .filter(e=>{const k=e.kind+':'+(e.sha256||e.id);if(seen.has(k))return false;seen.add(k);return true;}).slice(0,limit);
}
function taskRoute(c, request) {
  if (!request || typeof request.query !== 'string') throw Error('Task query required');
  const impact = request.impact || {};
  const flags=['presentationOnly','behavior','ambiguous','auth','tenant','secrets','irreversible','scientific','productionData','frontend'];
  if (!impact || typeof impact !== 'object' || Array.isArray(impact) || Object.entries(impact).some(([k,v])=>!flags.includes(k)||typeof v!=='boolean')) throw Error('Known boolean impact flags required');
  const high = ['auth','tenant','secrets','irreversible','scientific','productionData'].some(k=>impact[k]);
  const low = impact.presentationOnly===true&&!high&&!impact.behavior&&!impact.ambiguous;
  const matches = rankWorkflows(c,{query:request.query,profile:request.profile||'coding',limit:5});
  const primary = matches.find(x=>x.routingRole==='primary');
  const p=policy(), changedPaths=request.changedPaths || [];
  if (!Array.isArray(changedPaths) || changedPaths.some(x=>typeof x!=='string')) throw Error('Changed paths must be strings');
  const frontend = impact.frontend===true || impact.presentationOnly===true
    || new RegExp(p.frontendReview.queryPattern,'i').test(request.query)
    || changedPaths.some(x=>new RegExp(p.frontendReview.pathPattern,'i').test(x.replaceAll('\\','/')));
  return {version:1,query:request.query,profile:request.profile||'coding',impact:{...impact},risk:high?'high':low?'low':'medium',primary:low?null:primary||null,
    status:low?'direct-focused-check':primary?'selected':'needs-task-selection',always:p.always,policySha256:p.sha256,
    checks:low?['focused affected check']:['affected contract/behavior','actual required acceptance evidence',...(high?['protected invariants','independent evidence where required']:[])],
    evaluatorMode:high?'bounded-independent-review-when-authorized':'focused-verification',
    supportingSkills:[...(['auth','tenant','secrets'].some(k=>impact[k])?['sea-security-reviewer']:[]),...(impact.scientific?['sea-sustainability-domain-review']:[])],
    requiredReviews:frontend?[{...p.frontendReview,reason:'User-facing impact requires final composed-page proof; primary workflow unchanged'}]:[],
    providerCalls:0,permissionGranted:false};
}
module.exports={policy,skillFile,rankWorkflows,taskRoute};
