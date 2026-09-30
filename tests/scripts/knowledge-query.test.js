'use strict';
const assert = require('assert');
const path = require('path');
const { query } = require('../../scripts/knowledge-query');
const { test, summary } = require('../lib/helpers/mini-test-runner');
let passed = 0; let failed = 0;
const check = (name, fn) => { if (test(name, fn)) passed++; else failed++; };
const fresh = () => ({status:'fresh'});
check('unsafe and stale graphs never start a query', () => {
  for (const state of ['unsafe','stale','unknown','missing']) {
    const result = query('.', 'symbol', {status:() => ({status:state}), run:() => { throw new Error('must not run'); }});
    assert.strictEqual(result.code, 2);
  }
});
check('uses a bounded local call-context query without a shell', () => {
  const result = query('.', 'a symbol', {status:fresh, run:(bin,args,opts) => {
    assert.strictEqual(bin,'graphify');
    assert.deepStrictEqual(args, ['query','a symbol','--graph',path.resolve('graphify-out/graph.json'),'--context','call','--budget','2000']);
    assert.strictEqual(opts.env.GRAPHIFY_OUT,path.resolve('graphify-out'));
    assert.strictEqual(opts.shell,false);
    assert.strictEqual(opts.timeout,15000);
    return {status:0,stdout:'source relationship'};
  }});
  assert.strictEqual(result.output,'source relationship');
});
check('over-budget output is capped and explicitly incomplete', () => {
  for (const error of [undefined, {code:'ENOBUFS'}]) {
    const result = query('.', 'symbol', {status:fresh,maxChars:256,run:() => ({status:0,stdout:'x'.repeat(500),error})});
    assert.strictEqual(result.code,3);
    assert.ok(result.output.length <= 256);
    assert.match(result.output,/TRUNCATED/);
  }
});
check('timeout or failed subprocess never presents partial output as success', () => {
  const result = query('.', 'symbol', {status:fresh,run:() => ({status:1,stdout:'partial'})});
  assert.strictEqual(result.code,2);
  assert.ok(!result.output.includes('partial'));
});
check('rejects invalid bounds and command options', () => {
  assert.throws(() => query('.', '--help', {status:fresh}));
  assert.throws(() => query('.', 'symbol', {maxChars:Infinity,status:fresh}));
});
summary(passed,failed);
