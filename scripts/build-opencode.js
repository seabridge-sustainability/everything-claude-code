#!/usr/bin/env node

const fs = require("node:fs")
const path = require("node:path")
const { execFileSync } = require("node:child_process")

const rootDir = path.resolve(__dirname, "..")
const opencodeDir = path.join(rootDir, ".opencode")
const distDir = path.join(opencodeDir, "dist")

let tscEntrypoint

try {
  // Both manifests declare TypeScript. Reuse an existing OpenCode-local
  // compiler when root dev dependencies are absent; never download one here.
  tscEntrypoint = require.resolve("typescript/bin/tsc", { paths: [rootDir, opencodeDir] })
} catch {
  throw new Error(
    "TypeScript compiler not found in declared root or OpenCode dev dependencies; existing dist was preserved."
  )
}

// Resolve prerequisites before replacing generated output.
fs.rmSync(distDir, { recursive: true, force: true })

execFileSync(process.execPath, [tscEntrypoint, "-p", path.join(opencodeDir, "tsconfig.json")], {
  cwd: rootDir,
  stdio: "inherit",
})
