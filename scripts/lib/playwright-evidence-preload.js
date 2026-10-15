'use strict';
// Loaded only in managed verification processes, never injected into services.
if (process.env.ECC_BROWSER_EVIDENCE_RUN_ROOT) {
  const Module = require('node:module');
  const original = Module._load;
  Module._load = function(request,parent,_isMain) {
    const value = original.apply(this,arguments);
    if (['playwright','playwright-core','@playwright/test'].includes(request)) require('./browser-evidence').installPlaywrightGuards(value,{nativeRequire:Module.createRequire(parent.filename)});
    return value;
  };
}
