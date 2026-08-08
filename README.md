# forge-ui

DriveForge design system and UI component library.

Framework-agnostic by design. Core components are built on web standards (Custom Elements / Web Components) so they work in any environment — vanilla JS, React, Vue, Svelte, or server-rendered HTML. Framework-specific wrappers are provided as opt-in packages.

## What it does

- Ships the DriveForge design tokens (color, spacing, typography, motion)
- Provides a web component library that runs anywhere
- Renders server-side with Declarative Shadow DOM (see [SSR](#ssr)) so components have real content on first paint instead of relying on client JS
- Offers thin framework wrappers (`@driveforgelabs/forge-ui-react`; Vue wrapper not yet built) for convenience
- Powers all DriveForge web surfaces including docs and community tooling

## Packages

| Package | Description |
|---|---|
| `@driveforgelabs/tokens` | Design tokens (CSS custom properties + JSON) |
| `@driveforgelabs/forge-ui` | Web Components — framework-agnostic |
| `@driveforgelabs/forge-ui-react` | React wrappers, built on `@lit/react`'s `createComponent` |

Every component in `packages/core/src` is buildable and individually importable — e.g. `@driveforgelabs/forge-ui/forge-button` — the package's `exports` map is generated from the component list, so a new `forge-*.ts` file is importable as soon as it's added.

## SSR

### Vanilla / framework-agnostic

Server-rendering entry point at `@driveforgelabs/forge-ui/ssr`:

```ts
import { renderToString, html } from '@driveforgelabs/forge-ui/ssr';
import '@driveforgelabs/forge-ui/forge-button';

const markup = await renderToString(html`<forge-button variant="primary">Save</forge-button>`);
// e.g. in a Next.js Server Component:
// <div dangerouslySetInnerHTML={{ __html: markup }} />
```

This renders to an HTML string using Declarative Shadow DOM, so the element has real, styled content in the server response rather than an empty custom-element tag waiting on client JS.

For hydration to work (rather than the browser discarding the server-rendered shadow root and re-rendering from scratch), load `@lit-labs/ssr-client/lit-element-hydrate-support.js` on the client **before** importing any `@driveforgelabs/forge-ui` component module.

If you're adding a new component: avoid calling browser-only APIs (`attachInternals`, `ResizeObserver`, `matchMedia`, `localStorage`, etc.) from the constructor or `render()` — those aren't implemented by the SSR DOM shim. Lifecycle methods (`connectedCallback`, `firstUpdated`, event listeners) are unaffected since Lit's SSR path never invokes them.

### React / Next.js

`@driveforgelabs/forge-ui-react` components render real Declarative Shadow DOM content during server rendering — no `dangerouslySetInnerHTML`, no separate API. This is powered by [`@lit-labs/ssr-react`](https://www.npmjs.com/package/@lit-labs/ssr-react), which patches `React.createElement` on the server to deep-render Lit components.

Import its `enable-lit-ssr.js` module **once, as early as possible on the server** — before `react` or any `@driveforgelabs/forge-ui-react` component is imported anywhere in the module graph:

```ts
// instrumentation.ts (Next.js App Router — runs once at server startup)
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('@lit-labs/ssr-react/enable-lit-ssr.js');
  }
}
```

```tsx
// any Server Component
import { ForgeButton } from '@driveforgelabs/forge-ui-react';

export default function Page() {
  return <ForgeButton variant="primary">Save</ForgeButton>;
}
```

The same `enable-lit-ssr.js` import is safe to leave in client bundles too — in the browser it's a no-op for `React.createElement` and instead just loads `@lit-labs/ssr-client/lit-element-hydrate-support.js`, so hydration picks up the server-rendered shadow root instead of discarding and re-rendering it.

`@driveforgelabs/forge-ui-react` components are generated with a `'use client'` directive (they use React hooks internally to bind properties/events), so they render as Client Components — `enable-lit-ssr.js` still produces their real shadow-DOM content during that component's server render pass, same as any other Client Component's initial HTML.

## Status

`●` stable — v4.1.0

## Related

- [`headunit-os`](../headunit-os) — primary consumer of forge-ui components
- [`tuneshare`](../tuneshare) — web UI built on forge-ui

## License

Apache-2.0
