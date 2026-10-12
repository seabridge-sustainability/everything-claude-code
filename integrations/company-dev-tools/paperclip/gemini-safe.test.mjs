import assert from 'node:assert/strict';
import test from 'node:test';
import { safeGeminiArgs } from './gemini-safe.mjs';
test('replaces upstream yolo while preserving the prompt as one literal argument', () => {
  const prompt = 'test; $(untrusted) "quoted"';
  assert.deepEqual(safeGeminiArgs(['--approval-mode', 'yolo', '--prompt', prompt]), ['--approval-mode', 'default', '--prompt', prompt]);
  assert.deepEqual(safeGeminiArgs(['--approval-mode=yolo']), ['--approval-mode', 'default']);
});
test('rejects permission bypasses and unattended edit approval modes', () => {
  for (const args of [['--yolo'], ['-y'], ['--allowed-tools', 'Shell'], ['--approval-mode', 'auto_edit'], ['--dangerously-skip-permissions']]) assert.throws(() => safeGeminiArgs(args));
});
