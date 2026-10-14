'use strict';
// Provider-free bounded replay. This is an ECC advisory envelope, not the Jev wire API.
const fs=require('node:fs'),crypto=require('node:crypto');
const digest=value=>crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
function normalizeProviderReply(response,rubric){
  if(response?.model!=='jev-1.13.0'||!response.answers||!Array.isArray(rubric?.checks))throw Error('Pinned TypeSafe response and rubric required');
  if(Object.keys(response.answers).sort().join('\0')!==rubric.checks.map(c=>c.id).sort().join('\0'))throw Error('Exact provider answer IDs required');
  const answers={},confidence={};
  for(const c of rubric.checks){
    const a=response.answers[c.id];if(a?.type!==c.type)throw Error('Provider schema does not match declared question');
    if(c.type==='noul'){
      if(!Number.isFinite(a.noul)||a.noul<0||a.noul>1)throw Error('Invalid provider Noul answer');
      answers[c.id]={noul:a.noul};
    }else{
      if(!['score','choice'].includes(c.type)||!a.probabilities||Array.isArray(a.probabilities)||!c.credits||Object.keys(a.probabilities).sort().join('\0')!==Object.keys(c.credits).sort().join('\0'))throw Error('Provider distribution options mismatch');
      const probabilities=Object.values(a.probabilities);
      if(probabilities.some(p=>!Number.isFinite(p)||p<0||p>1)||Math.abs(probabilities.reduce((n,p)=>n+p,0)-1)>1e-6||!Number.isFinite(a.confidence)||a.confidence<0||a.confidence>1)throw Error('Invalid provider probability/confidence');
      if(c.type==='choice'&&!Object.hasOwn(a.probabilities,a.choice))throw Error('Invalid provider choice');
      if(c.type==='score'&&(!a.legend||!Number.isFinite(a.score)))throw Error('Invalid provider score');
      answers[c.id]={probabilities:a.probabilities};confidence[c.id]=a.confidence;
    }
  }
  return {answers,providerReportedModel:response.model,providerReportedConfidence:confidence,providerReportedUsage:response.usage??null,
    responseSha256:digest(response),providerAuthenticityVerified:false,providerCostUsd:null};
}
function scoreReplay(packet){
  const {rubric,evidence,answers}=packet||{};
  if(!rubric||rubric.version!==1||!Array.isArray(rubric.checks)||!rubric.checks.length||rubric.checks.length>20||!Number.isFinite(rubric.minimumModalProbability)||rubric.minimumModalProbability<0.5||rubric.minimumModalProbability>1)throw Error('Bounded rubric and explicit modal probability floor required');
  if(packet.rubricSha256!==digest(rubric)||packet.evidenceSha256!==digest(evidence))throw Error('Stale rubric/evidence digest');
  if(!evidence||typeof evidence.sourceRevision!=='string'||!evidence.sourceRevision.trim()||evidence.sourceRevision.length>200||!Array.isArray(evidence.references)||!evidence.references.length||evidence.references.length>20||evidence.references.some(r=>!r||!/^([a-f0-9]{64})$/.test(r.sha256||'')))throw Error('Caller-supplied source identity and evidence hashes required');
  if(!answers||typeof answers!=='object'||Array.isArray(answers)||!['fixture-replay','provider-replay'].includes(packet.provenance))throw Error('Explicit replay provenance and answers required');
  if(new Set(rubric.checks.map(c=>c.id)).size!==rubric.checks.length||Object.keys(answers).some(id=>!rubric.checks.some(c=>c.id===id)))throw Error('Unique exact checks required');
  let weighted=0,totalWeight=0,strictPass=true;const rows=[],abstentions=[];
  for(const c of rubric.checks){
    if(typeof c.id!=='string'||!c.id||c.id.length>100||!Number.isFinite(c.weight)||c.weight<=0||c.weight>100||!['noul','score','choice'].includes(c.type))throw Error('Invalid question type/weight');
    if(c.type!=='noul'&&(!c.credits||typeof c.credits!=='object'||Array.isArray(c.credits)||Object.keys(c.credits).length<2||Object.keys(c.credits).length>20||Object.values(c.credits).some(v=>!Number.isFinite(v)||v<0||v>1)))throw Error('Explicit bounded option credits required');
    const a=answers[c.id];if(!a||typeof a!=='object')throw Error('Missing answer: '+c.id);
    if(a.applicable!==undefined&&typeof a.applicable!=='boolean')throw Error('Applicability must be explicit boolean');
    if(a.applicable===false){
      if(typeof a.reason!=='string'||!a.reason.trim()||a.reason.length>300||Object.keys(a).some(k=>!['applicable','reason'].includes(k)))throw Error('Excluded answers need only an explicit bounded reason');
      rows.push({id:c.id,applicable:false});continue;
    }
    if(Object.keys(a).some(k=>!['applicable',c.type==='noul'?'noul':'probabilities'].includes(k)))throw Error('Exact normalized answer fields required');
    let probabilities,credits;
    if(c.type==='noul'){
      if(!Number.isFinite(a.noul)||a.noul<0||a.noul>1)throw Error('Invalid Noul probability');
      probabilities={false:1-a.noul,true:a.noul};credits={false:0,true:1};
    }else{
      if(!c.credits||typeof c.credits!=='object'||Array.isArray(c.credits)||Object.keys(c.credits).length<2||Object.keys(c.credits).length>20)throw Error('Explicit bounded option credits required');
      credits=c.credits;probabilities=a.probabilities;
      if(!probabilities||typeof probabilities!=='object'||Array.isArray(probabilities)||Object.keys(probabilities).sort().join('\0')!==Object.keys(credits).sort().join('\0'))throw Error('Exact distribution options required');
      let sum=0;for(const id of Object.keys(credits)){
        if(!Number.isFinite(credits[id])||credits[id]<0||credits[id]>1||!Number.isFinite(probabilities[id])||probabilities[id]<0||probabilities[id]>1)throw Error('Invalid credit/probability');sum+=probabilities[id];
      }if(Math.abs(sum-1)>1e-6)throw Error('Distribution must sum to one');
    }
    const max=Math.max(...Object.values(probabilities)),modes=Object.keys(probabilities).filter(id=>Math.abs(probabilities[id]-max)<1e-12);
    const score=Object.keys(probabilities).reduce((s,id)=>s+probabilities[id]*credits[id],0);
    const pass=modes.length===1&&credits[modes[0]]===1;
    if(modes.length!==1)abstentions.push(c.id+':tied-modal-answer');
    if(max<rubric.minimumModalProbability)abstentions.push(c.id+':below-declared-modal-probability-floor');
    rows.push({id:c.id,applicable:true,score,modalProbability:max,strictPass:pass});
    weighted+=score*c.weight;totalWeight+=c.weight;strictPass&&=pass;
  }
  if(!totalWeight)abstentions.push('no-applicable-evidence');
  const deterministicPass=evidence.deterministicGates==='PASS';
  if(!deterministicPass)abstentions.push('deterministic-proof-not-passing');
  const score=totalWeight?weighted/totalWeight:null;
  return {schema:'ecc.jev-advisory-replay.v1',inputSha256:digest(packet),provenance:packet.provenance,provenanceVerified:false,rubricSha256:packet.rubricSha256,evidenceSha256:packet.evidenceSha256,
    sourceRevision:evidence.sourceRevision,score,strictScore:totalWeight?(strictPass?1:0):null,checks:rows,abstentions,
    verdict:abstentions.length?'ABSTAIN':'ADVISORY',advisoryOnly:true,acceptanceAuthorized:false,providerCalls:0,
    providerCostUsd:null,calibrationVerified:false,evidenceAuthenticityVerified:false,limitation:'ADVISORY means a valid scoring report, not passing acceptance. Hashes bind caller-supplied metadata, not artifact contents or provider origin. No vision, release or calibrated-confidence proof.'};
}
function readPacket(file){const s=fs.lstatSync(file);if(!s.isFile()||s.isSymbolicLink()||s.size>128000)throw Error('Bounded regular packet required');return JSON.parse(fs.readFileSync(file,'utf8'));}
if(require.main===module){try{const args=process.argv.slice(2);const result=args[0]==='normalize'?normalizeProviderReply(readPacket(args[1]),readPacket(args[2])):scoreReplay(readPacket(args[0]));console.log(JSON.stringify(result,null,2));}catch(e){console.error('Jev evaluation BLOCKED: '+e.message);process.exitCode=2;}}
module.exports={scoreReplay,digest,normalizeProviderReply};
