'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {classifyChanges}=require('../../integrations/software-factory/feature-maintenance.cjs');
const features=[{id:'nature',allowed_paths:['src/components/views/nature-risk'],recipe_ids:['nature-actions']}];
test('accepted changes route only affected domains, retaining unmapped UI as a blocker',()=>{
  const r=classifyChanges(['src/components/views/nature-risk/Card.tsx','src/components/views/other/Card.tsx','src/components/views/other/Card.test.tsx'],features);
  assert.deepEqual(r.affected.map(f=>f.id),['nature']);assert.deepEqual(r.uncovered,['src/components/views/other/Card.tsx']);assert.deepEqual(r.missingRecipes,[]);
});
test('path boundary cannot alias a domain; absent recipes and traversal fail closed',()=>{
  assert.deepEqual(classifyChanges(['src/components/views/nature-risky/Card.tsx'],features).affected,[]);
  assert.deepEqual(classifyChanges(['src/components/views/nature-risk/Card.tsx'],[{...features[0],recipe_ids:[]}]).missingRecipes,['nature']);
  assert.throws(()=>classifyChanges(['../.env'],features));
});
test('accepted knowledge can classify declared namespace descendants without changing admission grants',()=>{
  const entry={id:'risk',allowed_paths:['src/components/views/risk/Overview.tsx'],source_files:['src/components/views/risk/Overview.tsx'],recipe_ids:['risk']};
  const result=classifyChanges(['src/components/views/risk/nested/Measure.tsx'],[entry]);
  assert.deepEqual(result.affected.map(f=>f.id),['risk']);assert.deepEqual(result.uncovered,[]);
  assert.deepEqual(entry.allowed_paths,['src/components/views/risk/Overview.tsx']);
});
