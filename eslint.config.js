const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    {
        ignores: [
            '.opencode/dist/**', '.cursor/**', 'node_modules/**', '.venv/**', 'venv/**', 'coverage/**',
            'workflows/**/*.workflow.*', '.claude/workflows/**',
            // SeaBridge fork: local, gitignored working artifacts and vendored clones.
            '.venvs/**', 'references/**', 'external/**', 'vendor/**', 'unsloth/**',
            'graphify-obsidian/**', 'graphify-out/**', '.planning/**', 'docs/reports/**',
            // Vendored browser-extension and sketch sources shipped as-is.
            '.claude/skills/gstack/**', 'plugins/CLI-Anything/**'
        ]
    },
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                ...globals.es2022
            }
        },
        rules: {
            'no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_'
            }],
            'no-undef': 'error',
            'eqeqeq': 'warn'
        }
    },
    {
        files: ['**/*.mjs'],
        languageOptions: {
            sourceType: 'module'
        }
    },
    {
        // OpenCode plugins are vendored ES modules kept close to upstream.
        files: ['.opencode/plugins/**/*.js'],
        languageOptions: {
            sourceType: 'module'
        },
        rules: {
            'no-unused-vars': 'off'
        }
    }
];
