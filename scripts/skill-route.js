#!/usr/bin/env node
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {taskRoute,policy}=require('./lib/skill-routing');
const root=path.resolve(__dirname,'..');
function main(args=process.argv.slice(2)) {
  if(args[0]==='policy') return console.log(JSON.stringify(policy(),null,2));
  if(!args[0]||args.includes('--help')) return console.log('skill-route <task.json|-> | policy. JSON: query, profile=coding, impact boolean flags. No tools/providers/actions executed.');
  const request=JSON.parse(fs.readFileSync(args[0]==='-'?0:args[0],'utf8'));
  const c=JSON.parse(fs.readFileSync(path.join(root,'integrations/company-dev-tools/catalog.json'),'utf8'));
  console.log(JSON.stringify(taskRoute(c,request),null,2));
}
if(require.main===module){try{main()}catch(e){console.error('Task routing: '+e.message);process.exitCode=2;}}
module.exports={main};
