# Coding-Agent Compatibility

`AGENTS.md` is the only canonical coding-agent contract in this repository.
Runtime adapters must import it, load it natively, or embed its generated safety
and goal blocks. The adapter registry and validation live in:

- `manifests/instruction-adapters.json`
- `scripts/sync-instruction-adapters.js`
- `scripts/check-instruction-stack.js`

Run `node scripts/sync-instruction-adapters.js` to detect generated-adapter drift
and `node tests/ci/instruction-stack.test.js` for positive and negative controls.
Do not add another independent policy document.
