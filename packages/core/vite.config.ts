/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const components = ['index', 'forge-button', 'forge-input', 'forge-select', 'forge-textarea', 'forge-chip', 'forge-badge', 'forge-card', 'forge-stat-card', 'forge-arc-gauge', 'forge-bar-channel', 'forge-skeleton', 'forge-spinner', 'forge-tabs', 'forge-empty-state', 'forge-alert', 'forge-dialog'];
export default defineConfig({
  build: {
    lib: {
      entry: components.reduce<Record<string, string>>((acc, name) => {
        acc[name] = resolve(dirname, `src/${name}.ts`);
        return acc;
      }, {}),
      formats: ['es']
    },
    rollupOptions: {
      external: ['lit', /^lit\//],
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
    }]
  }
});