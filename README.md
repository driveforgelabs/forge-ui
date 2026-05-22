# forge-ui

DriveForge design system and UI component library.

Framework-agnostic by design. Core components are built on web standards (Custom Elements / Web Components) so they work in any environment — vanilla JS, React, Vue, Svelte, or server-rendered HTML. Framework-specific wrappers are provided as opt-in packages.

## What it does

- Ships the DriveForge design tokens (color, spacing, typography, motion)
- Provides a web component library that runs anywhere
- Offers thin framework wrappers (`@forge-ui/react`, `@forge-ui/vue`) for convenience
- Powers all DriveForge web surfaces including docs and community tooling

## Packages

| Package | Description |
|---|---|
| `@forge-ui/tokens` | Design tokens (CSS custom properties + JSON) |
| `@forge-ui/core` | Web Components — framework-agnostic |
| `@forge-ui/react` | React wrappers (optional) |
| `@forge-ui/vue` | Vue wrappers (optional) |

## Status

`●` stable — v4.1.0

## Related

- [`headunit-os`](../headunit-os) — primary consumer of forge-ui components
- [`tuneshare`](../tuneshare) — web UI built on forge-ui

## License

Apache-2.0
