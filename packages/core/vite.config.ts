/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync } from 'node:fs';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
// Every `forge-*.ts` component gets its own build entry automatically, so a
// new component file is buildable/importable as soon as it's added — no
// separate list to remember to update.
const components = [
  'index',
  'ssr',
  ...readdirSync(resolve(dirname, 'src'))
    .filter((f) => f.startsWith('forge-') && f.endsWith('.ts'))
    .map((f) => f.replace(/\.ts$/, '')),
];
export default defineConfig({
  build: {
    // The build script runs `tsc` (declarations) before `vite build` (JS)
    // into the same dist/ — Vite's default emptyOutDir would otherwise wipe
    // out the .d.ts files tsc just wrote.
    emptyOutDir: false,
    lib: {
      entry: components.reduce<Record<string, string>>((acc, name) => {
        acc[name] = resolve(dirname, `src/${name}.ts`);
        return acc;
      }, {}),
      formats: ['es']
    },
    rollupOptions: {
      // `@lit-labs/ssr*` is a Node-only runtime dependency of the `ssr`
      // entry (it pulls in `node:module`/`node:fs` and a dynamic
      // capability-probe import that trips up bundler static analysis) —
      // it must stay a real `import` resolved from `node_modules`, not get
      // bundled into the browser-facing output.
      external: ['lit', /^lit\//, /^@lit-labs\/ssr/],
      output: {
        preserveModules: false
      }
    },
    sourcemap: true,
    minify: false
  },
  resolve: {
    alias: {
      '@driveforgelabs/tokens': resolve(dirname, '../tokens/tokens.css')
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }, {
      extends: true,
      test: {
        name: 'node',
        environment: 'node',
        include: ['src/**/*.node.test.ts']
      }
    }]
  }
});