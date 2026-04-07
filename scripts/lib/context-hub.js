#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ECC_AUTHOR = 'ecc';
const GENERATED_HEADER = 'Generated from ECC canonical English docs. Do not edit directly; run `npm run context-hub:sync`.';

const ENTRY_DEFINITIONS = Object.freeze([
  {
    kind: 'doc',
    name: 'core-overview',
    title: 'ECC Overview',
    description: 'Repository overview, quick start, installation, and documentation retrieval policy for ECC.',
    sourcePath: 'README.md',
    tags: ['ecc', 'overview', 'onboarding', 'docs'],
  },
  {
    kind: 'doc',
    name: 'core-agents',
    title: 'ECC Agent Instructions',
    description: 'Canonical agent instructions, routing rules, testing standards, and development workflow for ECC agents.',
    sourcePath: 'AGENTS.md',
    tags: ['ecc', 'agents', 'instructions'],
  },
  {
    kind: 'doc',
    name: 'core-claude',
    title: 'ECC Claude Guidance',
    description: 'Claude Code specific guidance for working in the ECC repository.',
    sourcePath: 'CLAUDE.md',
    tags: ['ecc', 'claude-code', 'instructions'],
  },
  {
    kind: 'doc',
    name: 'core-codex',
    title: 'ECC Codex Guidance',
    description: 'Codex-specific guidance for ECC, including skills discovery and source-aware documentation routing.',
    sourcePath: '.codex/AGENTS.md',
    tags: ['ecc', 'codex', 'instructions'],
  },
  {
    kind: 'doc',
    name: 'core-soul',
    title: 'ECC Soul',
    description: 'Core identity, principles, and cross-harness philosophy for Everything Claude Code.',
    sourcePath: 'SOUL.md',
    tags: ['ecc', 'identity', 'principles'],
  },
  {
    kind: 'doc',
    name: 'guides-shortform',
    title: 'ECC Shorthand Guide',
    description: 'The shorthand guide covering setup, foundations, philosophy, and practical ECC workflows.',
    sourcePath: 'the-shortform-guide.md',
    tags: ['ecc', 'guide', 'shortform'],
  },
  {
    kind: 'doc',
    name: 'guides-longform',
    title: 'ECC Longform Guide',
    description: 'The longform guide covering token optimization, memory, evals, research, and advanced agent workflows.',
    sourcePath: 'the-longform-guide.md',
    tags: ['ecc', 'guide', 'longform'],
  },
  {
    kind: 'doc',
    name: 'guides-security',
    title: 'ECC Security Guide',
    description: 'Agentic security guidance for ECC, including prompt-injection, supply-chain, and sandboxing concerns.',
    sourcePath: 'the-security-guide.md',
    tags: ['ecc', 'security', 'guide'],
  },
  {
    kind: 'doc',
    name: 'policy-contributing',
    title: 'ECC Contributing Policy',
    description: 'Contribution rules for agents, skills, commands, docs, and documentation routing within ECC.',
    sourcePath: 'CONTRIBUTING.md',
    tags: ['ecc', 'contributing', 'policy'],
  },
  {
    kind: 'doc',
    name: 'commands-docs',
    title: 'ECC /docs Router',
    description: 'The source-aware `/docs` command contract for routing ECC-internal docs to Context Hub and external docs to Context7.',
    sourcePath: 'commands/docs.md',
    tags: ['ecc', 'commands', 'docs-router'],
  },
  {
    kind: 'doc',
    name: 'agents-docs-lookup',
    title: 'ECC Docs Lookup Agent',
    description: 'Agent instructions for routing ECC-internal documentation to Context Hub and external APIs to Context7.',
    sourcePath: 'agents/docs-lookup.md',
    tags: ['ecc', 'agents', 'docs-router'],
  },
  {
    kind: 'skill',
    name: 'documentation-lookup',
    title: 'ECC Documentation Lookup Skill',
    description: 'Documentation routing skill for ECC internal docs via Context Hub and third-party APIs via Context7.',
    sourcePath: 'skills/documentation-lookup/SKILL.md',
    tags: ['ecc', 'skills', 'documentation', 'docs-router'],
  },
]);

function normalizeLineEndings(content) {
  return String(content).replace(/\r\n/g, '\n');
}

function yamlScalar(value) {
  return JSON.stringify(String(value));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function resolveRepoRoot(repoRoot) {
  return path.resolve(repoRoot);
}

function resolveContentRoot(repoRoot, contentRoot) {
  return path.resolve(contentRoot || path.join(repoRoot, 'context-hub'));
}

function resolveLlmsPath(repoRoot, llmsPath) {
  return path.resolve(llmsPath || path.join(repoRoot, 'llms.txt'));
}

function readJson(jsonPath) {
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

function getPackageVersion(repoRoot) {
  return readJson(path.join(repoRoot, 'package.json')).version;
}

function stripLeadingFrontmatter(content) {
  const normalized = normalizeLineEndings(content);
  if (!normalized.startsWith('---\n')) {
    return normalized.trim();
  }

  const closingIndex = normalized.indexOf('\n---\n', 4);
  if (closingIndex === -1) {
    return normalized.trim();
  }

  return normalized.slice(closingIndex + 5).trim();
}

function getUpdatedOnDate(filePath) {
  return fs.statSync(filePath).mtime.toISOString().slice(0, 10);
}

function getEntryOutputPath(contentRoot, entry) {
  const baseDir = entry.kind === 'skill' ? 'skills' : 'docs';
  const entryFile = entry.kind === 'skill' ? 'SKILL.md' : 'DOC.md';
  return path.join(contentRoot, ECC_AUTHOR, baseDir, entry.name, entryFile);
}

function getContextHubEntries(repoRoot) {
  const resolvedRepoRoot = resolveRepoRoot(repoRoot);
  const version = getPackageVersion(resolvedRepoRoot);

  return ENTRY_DEFINITIONS.map(entry => {
    const sourceAbsolutePath = path.join(resolvedRepoRoot, entry.sourcePath);
    const sourceContent = fs.readFileSync(sourceAbsolutePath, 'utf8');

    return {
      ...entry,
      repoRoot: resolvedRepoRoot,
      version,
      sourceAbsolutePath,
      updatedOn: getUpdatedOnDate(sourceAbsolutePath),
      sourceContent: stripLeadingFrontmatter(sourceContent),
    };
  });
}

function renderEntry(entry) {
  const tags = entry.tags.join(',');
  const sharedMetadata = [
    'metadata:',
    '  revision: 1',
    `  updated-on: ${yamlScalar(entry.updatedOn)}`,
    '  source: official',
    `  tags: ${yamlScalar(tags)}`,
  ];

  const docSpecificMetadata = entry.kind === 'doc'
    ? [
        `  languages: ${yamlScalar('english')}`,
        `  versions: ${yamlScalar(entry.version)}`,
      ]
    : [];

  const frontmatterLines = [
    '---',
    `name: ${entry.name}`,
    `description: ${yamlScalar(entry.description)}`,
    ...sharedMetadata.slice(0, 1),
    ...docSpecificMetadata,
    ...sharedMetadata.slice(1),
    '---',
    '',
  ];

  const bodyLines = [
    `# ${entry.title}`,
    '',
    `> ${GENERATED_HEADER}`,
    `> Canonical source: \`${entry.sourcePath}\``,
    '',
    '---',
    '',
    entry.sourceContent,
    '',
  ];

  return normalizeLineEndings(frontmatterLines.join('\n') + bodyLines.join('\n'));
}

function renderLlmsIndex(entries) {
  const groupedEntries = {
    Core: entries.filter(entry => entry.name.startsWith('core-')),
    Guides: entries.filter(entry => entry.name.startsWith('guides-')),
    Policies: entries.filter(entry => entry.name.startsWith('policy-') || entry.name.startsWith('commands-') || entry.name.startsWith('agents-')),
    Skills: entries.filter(entry => entry.kind === 'skill'),
  };

  const sections = [
    '# Everything Claude Code Context Index',
    '',
    '> Generated from ECC canonical English docs by `npm run context-hub:sync`.',
    '> Prefer local repo files first, then ECC Context Hub content, then public Context Hub entries, then Context7 for external APIs. Use this `llms.txt` file as a fallback index when `chub` is unavailable.',
    '',
    '## Retrieval Order',
    '',
    '1. Local repo file if the answer is already in the checked-out workspace.',
    '2. Local ECC Context Hub content via `chub` for ECC-specific guides, commands, policies, and workflows.',
    '3. Public Context Hub entries for non-ECC skills or curated playbooks.',
    '4. Context7 for third-party vendor, framework, and API documentation.',
    '5. `llms.txt` or general browsing only as a fallback path.',
    '',
    '## Local Workflow',
    '',
    '- `npm run context-hub:sync` refreshes the generated Context Hub content and this `llms.txt` file.',
    '- `npm run context-hub:validate` validates the local Context Hub content with `@aisuite/chub`.',
    '- `npm run context-hub:build` builds `context-hub/dist` so `chub search` and `chub get` can consume ECC locally.',
  ];

  for (const [sectionName, sectionEntries] of Object.entries(groupedEntries)) {
    if (sectionEntries.length === 0) {
      continue;
    }

    sections.push('', `## ${sectionName}`, '');
    for (const entry of sectionEntries) {
      const relativePath = path.join('context-hub', ECC_AUTHOR, entry.kind === 'skill' ? 'skills' : 'docs', entry.name, entry.kind === 'skill' ? 'SKILL.md' : 'DOC.md').split(path.sep).join('/');
      sections.push(`- [${ECC_AUTHOR}/${entry.name}](${relativePath}): ${entry.description}`);
    }
  }

  sections.push('');
  return normalizeLineEndings(`${sections.join('\n')}\n`);
}

function ensureSafeGeneratedRoot(contentRoot, generatedRoot) {
  const resolvedContentRoot = path.resolve(contentRoot);
  const resolvedGeneratedRoot = path.resolve(generatedRoot);
  if (!resolvedGeneratedRoot.startsWith(resolvedContentRoot + path.sep)) {
    throw new Error(`Refusing to clear generated directory outside content root: ${resolvedGeneratedRoot}`);
  }
}

function clearGeneratedEntries(contentRoot) {
  const generatedRoot = path.join(contentRoot, ECC_AUTHOR);
  ensureSafeGeneratedRoot(contentRoot, generatedRoot);
  fs.rmSync(generatedRoot, { recursive: true, force: true });
}

function writeFileIfChanged(filePath, content) {
  ensureDir(path.dirname(filePath));
  const nextContent = normalizeLineEndings(content);

  if (fs.existsSync(filePath)) {
    const existing = normalizeLineEndings(fs.readFileSync(filePath, 'utf8'));
    if (existing === nextContent) {
      return false;
    }
  }

  fs.writeFileSync(filePath, nextContent, 'utf8');
  return true;
}

function syncContextHub(options = {}) {
  const repoRoot = resolveRepoRoot(options.repoRoot || process.cwd());
  const contentRoot = resolveContentRoot(repoRoot, options.contentRoot);
  const llmsPath = resolveLlmsPath(repoRoot, options.llmsPath);
  const entries = getContextHubEntries(repoRoot);

  ensureDir(contentRoot);
  clearGeneratedEntries(contentRoot);

  const writtenFiles = [];

  for (const entry of entries) {
    const outputPath = getEntryOutputPath(contentRoot, entry);
    writeFileIfChanged(outputPath, renderEntry(entry));
    writtenFiles.push(outputPath);
  }

  writeFileIfChanged(llmsPath, renderLlmsIndex(entries));

  return {
    repoRoot,
    contentRoot,
    llmsPath,
    entries,
    writtenFiles,
  };
}

function buildChubArgs(options = {}) {
  const repoRoot = resolveRepoRoot(options.repoRoot || process.cwd());
  const contentRoot = resolveContentRoot(repoRoot, options.contentRoot);
  const args = ['-y', '@aisuite/chub', 'build', contentRoot];

  if (options.outputDir) {
    args.push('-o', path.resolve(options.outputDir));
  } else if (!options.validateOnly) {
    args.push('-o', path.join(contentRoot, 'dist'));
  }

  if (options.baseUrl) {
    args.push('--base-url', options.baseUrl);
  }

  if (options.validateOnly) {
    args.push('--validate-only');
  }

  return args;
}

function formatWindowsCmdArg(value) {
  const stringValue = String(value);
  if (!/[\s"&|<>^]/.test(stringValue)) {
    return stringValue;
  }

  return `"${stringValue.replace(/"/g, '""')}"`;
}

function runChubBuild(options = {}) {
  const args = buildChubArgs(options);
  const isWindows = process.platform === 'win32';
  const cwd = resolveRepoRoot(options.repoRoot || process.cwd());
  let command = isWindows ? 'npx.cmd' : 'npx';
  let spawnArgs = args;

  if (isWindows) {
    command = process.env.ComSpec || 'cmd.exe';
    spawnArgs = [
      '/d',
      '/s',
      '/c',
      ['npx.cmd', ...args.map(formatWindowsCmdArg)].join(' '),
    ];
  }

  const result = spawnSync(command, spawnArgs, {
    cwd,
    stdio: 'inherit',
    env: process.env,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`chub exited with status ${result.status}`);
  }

  return {
    command,
    args: spawnArgs,
    printableCommand: [command, ...spawnArgs].join(' '),
  };
}

module.exports = {
  ENTRY_DEFINITIONS,
  GENERATED_HEADER,
  buildChubArgs,
  clearGeneratedEntries,
  getContextHubEntries,
  getEntryOutputPath,
  renderEntry,
  renderLlmsIndex,
  runChubBuild,
  stripLeadingFrontmatter,
  syncContextHub,
};
