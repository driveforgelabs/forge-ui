import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { renderToString, html } from './ssr.js';
import './forge-button.js';
import './forge-alert.js';
import './forge-select.js';

describe('SSR rendering', () => {
  it('renders forge-button with Declarative Shadow DOM and slotted content', async () => {
    const markup = await renderToString(html`<forge-button variant="primary">Save</forge-button>`);
    expect(markup).toContain('<forge-button');
    expect(markup).toContain('shadowrootmode="open"');
    expect(markup).toContain('Save');
  });

  it('renders forge-alert with attribute-driven content', async () => {
    const markup = await renderToString(html`<forge-alert variant="warning" heading="Heads up"></forge-alert>`);
    expect(markup).toContain('<forge-alert');
    expect(markup).toContain('shadowrootmode="open"');
  });

  it('renders forge-select without throwing', async () => {
    const markup = await renderToString(html`<forge-select label="Make"></forge-select>`);
    expect(markup).toContain('<forge-select');
  });

  it('does not crash on attachInternals() under the server DOM shim', async () => {
    // Regression test for forge-button's constructor: attachInternals() must
    // be guarded, since the SSR DOM shim doesn't implement it.
    const markup = await renderToString(html`<forge-button type="submit">Submit</forge-button>`);
    expect(markup).toContain('Submit');
  });
});

// vitest runs this module through vite-node's transform, which does not
// reproduce native ESM top-level-await evaluation-order semantics — a real
// `node` process is the only way to actually exercise the ordering this
// entry point depends on (see ssr.ts's module doc comment). This guards
// against re-introducing an explicit `install-global-dom-shim.js` import,
// which raced against — and silently lost registrations to — component
// modules' own auto-shim under plain Node.
//
// Requires a prior `pnpm build` (skipped if dist/ is absent, e.g. on a
// fresh checkout that hasn't built yet).
const distDir = fileURLToPath(new URL('../dist', import.meta.url));
describe.skipIf(!existsSync(distDir))('SSR rendering (real Node process, built dist)', () => {
  it('renders real Declarative Shadow DOM content from a cold process, following the documented import order', () => {
    const script = `
      import { renderToString, html } from './dist/ssr.js';
      import './dist/forge-button.js';
      import './dist/forge-select.js';
      import './dist/forge-alert.js';

      const results = await Promise.all([
        renderToString(html\`<forge-button variant="primary">Save</forge-button>\`),
        renderToString(html\`<forge-select label="Make"></forge-select>\`),
        renderToString(html\`<forge-alert variant="warning" heading="Heads up"></forge-alert>\`),
      ]);
      for (const markup of results) {
        if (!markup.includes('shadowrootmode="open"')) {
          console.error('MISSING shadowrootmode:', markup);
          process.exit(1);
        }
      }
      console.log('all ok');
    `;
    const output = execFileSync(process.execPath, ['--input-type=module', '-e', script], {
      cwd: fileURLToPath(new URL('..', import.meta.url)),
      encoding: 'utf8',
    });
    expect(output).toContain('all ok');
  });
});
