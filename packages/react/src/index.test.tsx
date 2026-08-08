// Must be imported before `react` and before any forge-ui-react component
// module — it patches `React.createElement`/the JSX runtime so that Lit
// elements wrapped by `createComponent()` deep-render their shadow DOM
// during server rendering instead of emitting an empty custom-element tag.
import '@lit-labs/ssr-react/enable-lit-ssr.js';

import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ForgeButton, ForgeAlert, ForgeCard, ForgeInput } from './index.js';

describe('forge-ui-react SSR', () => {
  it('renders ForgeButton with real Declarative Shadow DOM content', () => {
    const markup = renderToStaticMarkup(React.createElement(ForgeButton, { variant: 'primary' }, 'Save'));
    expect(markup).toContain('<forge-button');
    expect(markup).toContain('shadowrootmode="open"');
    // Shadow-rendered <button>, not just the light-DOM slotted text.
    expect(markup).toContain('<button');
    expect(markup).toContain('Save');
  });

  it('renders ForgeAlert with real Declarative Shadow DOM content', () => {
    const markup = renderToStaticMarkup(
      React.createElement(ForgeAlert, { variant: 'warning', heading: 'Heads up' }),
    );
    expect(markup).toContain('<forge-alert');
    expect(markup).toContain('shadowrootmode="open"');
    expect(markup).toContain('Heads up');
  });

  it('renders ForgeCard with nested children', () => {
    const markup = renderToStaticMarkup(React.createElement(ForgeCard, { variant: 'default' }, 'Body content'));
    expect(markup).toContain('<forge-card');
    expect(markup).toContain('shadowrootmode="open"');
    expect(markup).toContain('Body content');
  });

  it('renders ForgeInput without throwing on complex prop wiring', () => {
    const markup = renderToStaticMarkup(React.createElement(ForgeInput, { label: 'Make' }));
    expect(markup).toContain('<forge-input');
    expect(markup).toContain('shadowrootmode="open"');
  });
});
