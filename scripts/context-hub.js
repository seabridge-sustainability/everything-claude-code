#!/usr/bin/env node

'use strict';

const path = require('path');
const {
  buildChubArgs,
  runChubBuild,
  syncContextHub,
} = require('./lib/context-hub');

function showHelp(exitCode = 0) {
  console.log(`
Usage:
  node scripts/context-hub.js sync [--content-root <path>] [--llms-path <path>]
  node scripts/context-hub.js validate [--content-root <path>] [--skip-sync]
  node scripts/context-hub.js build [--content-root <path>] [--output <path>] [--base-url <url>] [--skip-sync]

Commands:
  sync       Generate Context Hub content under context-hub/ and refresh llms.txt
  validate   Run "npx -y @aisuite/chub build ... --validate-only"
  build      Build a local Context Hub registry under context-hub/dist
`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const parsed = {
    command: args[0] || null,
    contentRoot: null,
    llmsPath: null,
    outputDir: null,
    baseUrl: null,
    skipSync: false,
    help: false,
  };

  for (let index = 1; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === '--content-root') {
      parsed.contentRoot = args[index + 1] || null;
      index += 1;
    } else if (arg === '--llms-path') {
      parsed.llmsPath = args[index + 1] || null;
      index += 1;
    } else if (arg === '--output') {
      parsed.outputDir = args[index + 1] || null;
      index += 1;
    } else if (arg === '--base-url') {
      parsed.baseUrl = args[index + 1] || null;
      index += 1;
    } else if (arg === '--skip-sync') {
      parsed.skipSync = true;
    } else if (arg === '--help' || arg === '-h') {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return parsed;
}

function printSyncResult(result) {
  const relativeContentRoot = result.contentRoot.startsWith(result.repoRoot + path.sep)
    ? result.contentRoot.slice(result.repoRoot.length + 1)
    : result.contentRoot;
  const relativeLlmsPath = result.llmsPath.startsWith(result.repoRoot + path.sep)
    ? result.llmsPath.slice(result.repoRoot.length + 1)
    : result.llmsPath;

  console.log(`Synced ${result.entries.length} Context Hub entr${result.entries.length === 1 ? 'y' : 'ies'} to ${relativeContentRoot || '.'}`);
  console.log(`Updated ${relativeLlmsPath || 'llms.txt'}`);
}

function main() {
  try {
    const options = parseArgs(process.argv);

    if (options.help || !options.command) {
      showHelp(0);
    }

    if (options.command === 'sync') {
      const result = syncContextHub({
        repoRoot: process.cwd(),
        contentRoot: options.contentRoot,
        llmsPath: options.llmsPath,
      });
      printSyncResult(result);
      return;
    }

    if (options.command === 'validate' || options.command === 'build') {
      if (!options.skipSync) {
        const syncResult = syncContextHub({
          repoRoot: process.cwd(),
          contentRoot: options.contentRoot,
          llmsPath: options.llmsPath,
        });
        printSyncResult(syncResult);
      }

      const validateOnly = options.command === 'validate';
      const runResult = runChubBuild({
        repoRoot: process.cwd(),
        contentRoot: options.contentRoot,
        outputDir: options.outputDir,
        baseUrl: options.baseUrl,
        validateOnly,
      });
      const printableCommand = runResult.printableCommand || `${runResult.command} ${buildChubArgs({
        repoRoot: process.cwd(),
        contentRoot: options.contentRoot,
        outputDir: options.outputDir,
        baseUrl: options.baseUrl,
        validateOnly,
      }).join(' ')}`;

      console.log(`Executed: ${printableCommand}`);
      return;
    }

    throw new Error(`Unknown context-hub command: ${options.command}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
