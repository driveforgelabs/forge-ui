/**
 * Server-side rendering entry point.
 *
 * Renders a lit-html template to an HTML string using Declarative Shadow
 * DOM, so `forge-*` elements have real content in the server response
 * instead of empty custom-element tags on first paint.
 *
 * The client must load `@lit-labs/ssr-client/lit-element-hydrate-support.js`
 * BEFORE any `@driveforgelabs/forge-ui` component module is imported, or
 * elements will discard the server-rendered shadow root and re-render from
 * scratch instead of hydrating it.
 *
 * Usage (e.g. inside a Next.js Server Component):
 *
 *   import { renderToString, html } from '@driveforgelabs/forge-ui/ssr';
 *   import '@driveforgelabs/forge-ui/forge-button';
 *
 *   const markup = await renderToString(html`<forge-button>Save</forge-button>`);
 *   // <div dangerouslySetInnerHTML={{ __html: markup }} />
 *
 * No explicit DOM-shim import is needed here (and deliberately avoided).
 * `@lit/reactive-element`'s package build resolves a Node-only variant (via
 * its `"node"` package.json export condition) that installs a minimal
 * `customElements`/`HTMLElement` shim itself, synchronously, the moment
 * `lit` is imported by any component module — which always happens before a
 * component can render. Explicitly importing `@lit-labs/ssr`'s own
 * `install-global-dom-shim.js` on top of that is actively harmful: that
 * module has an async tail (a top-level-await CSS-import capability probe
 * inside `@lit-labs/ssr-dom-shim`), so it doesn't finish synchronously — and
 * once it does finish, `installWindowOnGlobal()` unconditionally
 * `Object.assign`s a *new* `customElements` registry onto `globalThis`,
 * silently discarding whatever was already registered into the first one.
 * A static sibling import of a component module (which registers into the
 * auto-shim's registry immediately) then reliably loses its registration
 * once the explicit shim's async install lands — `renderToString` silently
 * falls back to an empty tag with no shadow root, with no thrown error.
 */
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import type { RenderInfo } from '@lit-labs/ssr/lib/render-value.js';

// Re-exported from `lit` (not `@lit-labs/ssr`, whose own `html` tag produces
// non-hydratable server-only templates) so components stay interactive after
// hydration.
export { html, svg } from 'lit';

export { render as renderToIterable } from '@lit-labs/ssr';

/** Renders a lit-html template to a Declarative-Shadow-DOM HTML string. */
export function renderToString(
  value: unknown,
  renderInfo?: Partial<RenderInfo>,
): Promise<string> {
  return collectResult(render(value, renderInfo));
}
