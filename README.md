# @driveforgelabs/ui

A stock [shadcn/ui](https://ui.shadcn.com) component library (new-york style, stone base, Radix) with the Clay theme, plus composed components, a showcase app and a shadcn registry. Private: it is consumed through the registry, never published to npm.

The earlier Lit web components (`forge-ui`), their React wrappers (`forge-ui-react`) and the design tokens (`tokens`) were removed from this repo. They remain in git history and the last published versions stay on npm.

## What's in it

- `src/components/ui/`: stock shadcn components, added through the CLI and never edited. To update one, run `pnpm dlx shadcn@latest add <name> --overwrite`.
- `src/components/`: composed components (`StatCard`, `StatusBadge`, `DataTable`, `DatePicker`, `PhoneInput`, `Combobox`, ...). `registry.json` lists every installable item.
- `src/styles/clay.css`: the Clay theme. It is the only source of the theme: `pnpm registry:build` copies it into the `clay-theme` registry item.
- `src/showcase/`: the showcase app (light, dark and system themes), including a full example page, `service-form`.
- `e2e/`: Playwright tests that run against the production build.

## Commands

```bash
pnpm install
pnpm dev             # showcase at http://localhost:5173
pnpm lint            # Biome: lint rules, formatting and import order
pnpm format          # apply Biome's fixes
pnpm typecheck       # tsc -b, three projects (see below)
pnpm build
pnpm test            # Playwright, against `vite build` + `vite preview`
pnpm registry:build  # regenerates registry.json's theme and writes public/r/ (gitignored)
```

Node 22.18+ (it runs `scripts/*.ts` directly) and pnpm 11 are required (`packageManager` pins the pnpm version for CI too).

## TypeScript and lint

- `tsconfig.base.json` turns on every strictness flag that exists: `strict`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `noImplicitOverride`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, and more.
- Three projects: `tsconfig.app.json` (our code, maximum strictness), `tsconfig.ui.json` (the unmodified stock shadcn files, which do not satisfy `exactOptionalPropertyTypes` and `noPropertyAccessFromIndexSignature`, so those two flags are off there only) and `tsconfig.node.json` (config, scripts, tests). Our code sees the stock components through the declarations emitted to `.tsbuild/`, so it is still checked against them.
- `skipLibCheck` is on because some dependencies (Redux Toolkit, pulled in by Recharts) ship types that fail under the strict flags.
- Biome handles lint, formatting and import order. Beyond the recommended rules it errors on leaked renders, nested ternaries, unused code, `any`, `console`, empty blocks and non-null assertions. `src/components/ui`, `src/lib` and `src/hooks` (stock files) are excluded.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests: lint, typecheck, Playwright tests, registry build, a check that `registry.json` is committed up to date, and an upload of `public/r` as the `shadcn-registry` artifact. Nothing is published or deployed.

## Docs

- [`docs/consuming-from-mecano.md`](docs/consuming-from-mecano.md): adopting the library in a Tailwind v4 app (TanStack Start).
- [`docs/component-parity.md`](docs/component-parity.md): how each former forge component maps to shadcn.
