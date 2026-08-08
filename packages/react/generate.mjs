// Codegen script: generates packages/react/src/*.ts, one React wrapper per
// @driveforgelabs/forge-ui component, using the official @lit-labs/cli
// (`lit labs gen --framework react`) as the actual analysis/codegen engine.
//
// The CLI is run into a scratch directory (packages/react/.gen-tmp) since it
// emits a full templated sub-package (its own package.json/tsconfig/gitignore)
// that isn't compatible with this package's hand-maintained build/test setup.
// Only the per-component wrapper files are kept; everything else is discarded.
//
// Re-run after adding a new forge-ui component (with a `@fires` JSDoc tag for
// each event it dispatches) to pick it up. Not part of the build.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const reactDir = path.dirname(fileURLToPath(import.meta.url));
const coreDir = path.resolve(reactDir, '../core');
const scratchDir = path.resolve(reactDir, '.gen-tmp');
const targetSrcDir = path.resolve(reactDir, 'src');

rmSync(scratchDir, { recursive: true, force: true });

execFileSync(
  path.resolve(coreDir, 'node_modules/.bin/lit'),
  [
    'labs',
    'gen',
    '--package',
    '.',
    '--framework',
    'react',
    '--out',
    path.relative(coreDir, scratchDir),
    '--exclude',
    'src/stories/**/*.ts',
    '--exclude',
    'src/dev.ts',
  ],
  { cwd: coreDir, stdio: 'inherit' },
);

// lit labs gen names the output folder after the analyzed directory's
// basename ("core"), not the npm package name, and nests wrapper files under
// src/ mirroring the source layout.
const genSrcDir = path.join(scratchDir, 'core-react', 'src');
const generatedFiles = readdirSync(genSrcDir)
  .filter((f) => f.startsWith('forge-') && f.endsWith('.ts'))
  .sort();

if (generatedFiles.length === 0) {
  throw new Error(`lit labs gen produced no wrapper files in ${genSrcDir}`);
}

// Clear stale wrapper files (e.g. from removed/renamed components) without
// touching hand-written files like index.test.tsx.
for (const f of readdirSync(targetSrcDir)) {
  if (f.startsWith('forge-') && f.endsWith('.ts')) {
    rmSync(path.join(targetSrcDir, f));
  }
}

for (const f of generatedFiles) {
  let content = readFileSync(path.join(genSrcDir, f), 'utf8');
  // The CLI imports from the compiled dist path (e.g.
  // '@driveforgelabs/forge-ui/dist/forge-button.js'), but core's package.json
  // "exports" map only exposes the short subpath ('@driveforgelabs/forge-ui/forge-button').
  // Rewrite to the public subpath so the import actually resolves.
  content = content.replace(
    /from '@driveforgelabs\/forge-ui\/dist\/([\w-]+)\.js'/g,
    "from '@driveforgelabs/forge-ui/$1'",
  );
  // `@lit-labs/ssr-react`'s SSR integration works by monkey-patching
  // `React.createElement` in place (`Object.assign(reactModule, {createElement:
  // patched})`). Node's ESM/CJS interop for `import * as X from 'react'`
  // synthesizes named bindings as a one-time snapshot at import time, not a
  // live-reflecting getter — so `React.createElement` accessed through a
  // namespace import stays pointed at the pre-patch function forever, and
  // SSR silently renders empty tags. A default import shares the same
  // underlying object, so property mutations on it are visible everywhere.
  content = content.replace(/^ *import \* as React from 'react';$/m, "import React from 'react';");
  // Collapse the generator's stray blank lines (left over from unused
  // type-import placeholders) and normalize to a trailing newline.
  content = content.replace(/\n{3,}/g, '\n\n').trim() + '\n';
  // createComponent() wraps the element in a React.forwardRef that calls
  // useRef/useLayoutEffect internally, so every generated component needs
  // its own client-boundary marker for Next.js App Router (a re-export from
  // a 'use client' file doesn't inherit the directive — each file that
  // itself defines a component using hooks needs the marker).
  content = "'use client';\n\n" + content;
  writeFileSync(path.join(targetSrcDir, f), content);
}

const barrel = [
  '// GENERATED FILE — do not edit by hand. Run `node generate.mjs` to regenerate.',
  '//',
  "// Re-exports one React wrapper per @driveforgelabs/forge-ui component, generated",
  "// by @lit-labs/cli's `lit labs gen --framework react` from packages/core.",
  '',
  ...generatedFiles.map((f) => `export * from './${f.replace(/\.ts$/, '.js')}';`),
  '',
].join('\n');

writeFileSync(path.join(targetSrcDir, 'index.ts'), barrel);

rmSync(scratchDir, { recursive: true, force: true });

console.log(`Generated ${generatedFiles.length} wrapper components -> src/`);
