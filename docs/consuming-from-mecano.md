# Adopting the shadcn Clay library in a Tailwind v4 app (Mecano `apps/web`)

Target: TanStack Start, React 19, `src/styles.css` with `@import "tailwindcss"`. Mecano is not changed by this repo; this is the recipe for the migration task.

Tested here: `shadcn add @clay/stat-card @clay/clay-theme` against the built registry in a bare scratch project (installs components, npm deps, theme CSS). The TanStack Start provider/toggle code below follows the shadcn TanStack Start dark-mode docs but was **not run inside Mecano**.

## 0. Where the registry is served from

The composed items (StatusBadge, StatCard, ...) and the theme are distributed as registry JSON. Two ways to get them:

- **Published package (preferred, once a version is published).** `@driveforgelabs/ui` on npm contains only the registry JSON (`public/r/`) and `clay.css`. npm packages are served by public CDNs, so the registry URL is
  `https://cdn.jsdelivr.net/npm/@driveforgelabs/ui@5/public/r/{name}.json` (pin a full version such as `@5.0.0` for reproducible installs; `@5` follows the latest 5.x with some CDN caching).
- **Local, for development or before the first publish.** In the library repo run `pnpm install && pnpm registry:build && pnpm dev`; the registry is then at `http://localhost:5173/r/{name}.json`. The server must stay running while you add components.

In the rest of this guide `REGISTRY_URL` stands for the part before `/{name}.json`, for example `https://cdn.jsdelivr.net/npm/@driveforgelabs/ui@5/public/r`.

## 1. Initialise shadcn in `apps/web`

```bash
cd apps/web
pnpm dlx shadcn@latest init
```

Settings (they cannot be changed later without reinstalling components):

| Setting                 | Value                                                                                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `style`                 | `new-york`                                                                                                                                                      |
| `tailwind.baseColor`    | `stone`                                                                                                                                                         |
| `tailwind.cssVariables` | `true`                                                                                                                                                          |
| `tailwind.css`          | `src/styles.css`                                                                                                                                                |
| `tailwind.config`       | empty (Tailwind v4)                                                                                                                                             |
| `iconLibrary`           | `lucide`                                                                                                                                                        |
| aliases                 | `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks` (make sure `tsconfig` has `"paths": {"@/*": ["./src/*"]}` and the Vite config resolves it) |

Recent CLIs offer presets (Nova, Vega, ...) at the prompt. Those pick a different style; this library's `components.json` is set to `new-york` + `stone`, so match that file (`components.json`). If the CLI forces a preset, edit `components.json` to those two values before the first `shadcn add`.

Init adds `cn` (npm package; `src/lib/utils.ts` is `export { cn } from "cn"`), `class-variance-authority`, `radix-ui`, `lucide-react`, `tw-animate-css`, `shadcn`. Do not hand-edit `lib/utils.ts`.

Also install the fonts and import them in `src/styles.css`:

```bash
pnpm add @fontsource-variable/geist @fontsource-variable/geist-mono
```

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/geist";
@import "@fontsource-variable/geist-mono";
```

## 2. Install the Clay theme

Register the namespace once in `components.json`:

```json
"registries": { "@clay": "REGISTRY_URL/r/{name}.json" }
```

Then:

```bash
pnpm dlx shadcn@latest add @clay/clay-theme
```

This writes the Clay values into `:root` and `.dark` of `src/styles.css` (overriding the stone values), adds `--color-success|warning|info(-foreground)` and the Geist font tokens to `@theme inline`. Check afterwards that `src/styles.css` still contains `@custom-variant dark (&:is(.dark *));` (init creates it; add it if missing).

Alternative without a registry host: copy `src/styles/clay.css` next to `styles.css` and `@import "./clay.css";` **after** the stone variables.

Things to check after installing:

- The chart item (installed with `chart`/`sparkline`/`stat-card`) may add odd `--chart-N: var(--chart-N)` lines into `@theme inline` in a stylesheet that has no `--color-chart-N` mappings yet. A freshly inited app already has `--color-chart-N`; if you see self-references, delete them.
- `sidebar` appends its own hard-coded `--sidebar-*` block to the end of the stylesheet, which would override Clay. Delete that block (the stone/Clay `:root`/`.dark` already define them). This happened in the repo root too.

## 3. Add components

Stock primitives come from the default registry:

```bash
pnpm dlx shadcn@latest add button input textarea select label form card badge alert tabs dialog switch table sheet dropdown-menu popover tooltip command sonner skeleton separator
```

(Add more from the list in the parity doc as you migrate screens.) Composed Forge items come from `@clay`, each pulls in the shadcn primitives it needs:

| Item                                      | Command                         | Pulls in                                    | npm dep                    |
| ----------------------------------------- | ------------------------------- | ------------------------------------------- | -------------------------- |
| Theme                                     | `add @clay/clay-theme`          |                                             |                            |
| StatusBadge                               | `add @clay/status-badge`        | `badge`, clay-theme                         |                            |
| Spinner                                   | `add spinner` (stock)           |                                             |                            |
| EmptyState                                | `add @clay/empty-state`         |                                             |                            |
| Sparkline                                 | `add @clay/sparkline`           | `chart`                                     | `recharts`                 |
| StatCard                                  | `add @clay/stat-card`           | `card`, `progress`, status-badge, sparkline |                            |
| Combobox                                  | `add @clay/combobox`            | `button`, `command`, `popover`              |                            |
| TagInput                                  | `add @clay/tag-input`           | `badge`                                     |                            |
| PhoneInput                                | `add @clay/phone-input`         | `button`, `command`, `input`, `popover`     | `react-phone-number-input` |
| ThemeProvider                             | `add @clay/theme-provider`      |                                             |                            |
| ModeToggle                                | `add @clay/mode-toggle`         | `button`, `dropdown-menu`, theme-provider   |                            |
| Banner                                    | `add @clay/banner`              | `alert`, `button`                           |                            |
| ConfirmDialog                             | `add @clay/confirm-dialog`      | `alert-dialog`, `button`                    |                            |
| DatePicker, DateRangePicker               | `add @clay/date-picker`         | `button`, `calendar`, `popover`             |                            |
| FileUpload                                | `add @clay/file-upload`         | `button`                                    |                            |
| NumberInput                               | `add @clay/number-input`        | `button`, `input`                           |                            |
| DataTable                                 | `add @clay/data-table`          | `button`, `skeleton`, `table`               | `@tanstack/react-table@^9` |
| DataList, Timeline, Stepper               | `add @clay/data-list` etc.      |                                             |                            |
| ColorSwatches                             | `add @clay/color-swatches`      | `toggle-group`                              |                            |
| CommandPalette                            | `add @clay/command-palette`     | `command`                                   |                            |
| PasswordInput, SearchInput                | `add @clay/password-input` etc. | `input-group`, `button`                     |                            |
| Gauge, BarChannel, HeatCell, NumberTicker | `add @clay/gauge` etc.          |                                             |                            |

All commands are `pnpm dlx shadcn@latest add @clay/<name>`.

## 4. Theme provider and toggle for TanStack Start (SSR)

Goals: no flash of the wrong theme, no hydration mismatch. Approach: an inline script in `<head>` sets the `.dark` class before first paint; the React provider starts at the same value on server and client and reads `localStorage` only in an effect.

`@clay/theme-provider` installs `src/components/theme-provider.tsx` (exports `ThemeProvider`, `useTheme`, `themeInitScript`). Wire it in `src/routes/__root.tsx`:

```tsx
import { HeadContent, Scripts, createRootRoute, Outlet } from "@tanstack/react-router"
import { ThemeProvider, themeInitScript } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

export const Route = createRootRoute({
  // ...existing head() meta/links
  component: RootComponent,
})

function RootComponent() {
  return (
    // suppressHydrationWarning: the init script changes <html class> before React hydrates
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <Outlet />
          </TooltipProvider>
          <ThemedToaster />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
```

Stock `sonner.tsx` reads the theme from `next-themes`, which you are not using. Do not edit it; pass the theme in:

```tsx
import { useTheme } from "@/components/theme-provider"
function ThemedToaster() {
  const { resolvedTheme } = useTheme()
  return <Toaster theme={resolvedTheme} />
}
```

Why not `next-themes`: it renders a `<script>` inside a React component, and React 19 logs "Encountered a script tag while rendering React component".

Toggle (a `DropdownMenu` per the shadcn dark-mode docs):

```tsx
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          <SunIcon className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunIcon /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonIcon /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <MonitorIcon /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

Light is the default. The only caveat of the localStorage approach: a user who chose dark and has `system`/`dark` stored sees the correct theme on first paint (script), but the toggle's own icon state is correct only after hydration (a frame later).

The storage key (`clay-ui-theme`) is shared by the script and the provider; keep them in sync if you rename it.

## 5. Forge → shadcn mapping for what Mecano imports

Full details and the remaining 34 components are in `component-parity.md`.

| Forge           | Replacement                                                                       | Install              |
| --------------- | --------------------------------------------------------------------------------- | -------------------- |
| ForgeButton     | `Button`                                                                          | `button`             |
| ForgeInput      | `Input` + `Label`                                                                 | `input label`        |
| ForgeCard       | `Card*`                                                                           | `card`               |
| ForgeBadge      | `StatusBadge`                                                                     | `@clay/status-badge` |
| ForgeAlert      | `Alert*`                                                                          | `alert`              |
| ForgeSpinner    | `Spinner`                                                                         | `spinner` (stock)    |
| ForgeDialog     | `Dialog*`                                                                         | `dialog`             |
| ForgeSelect     | `Select*`                                                                         | `select`             |
| ForgeStatCard   | `StatCard`                                                                        | `@clay/stat-card`    |
| ForgeEmptyState | `EmptyState`                                                                      | `@clay/empty-state`  |
| ForgeTextarea   | `Textarea` + `Label`                                                              | `textarea label`     |
| ForgePhoneInput | `PhoneInput`                                                                      | `@clay/phone-input`  |
| ForgeToggle     | `Switch` + `Label`                                                                | `switch label`       |
| ForgeCtaButton  | `Button size="lg"`, but it does not exist in forge-ui core: check Mecano's source | `button`             |
| ForgeCombobox   | `Combobox`                                                                        | `@clay/combobox`     |
| ForgeTabs       | `Tabs*`                                                                           | `tabs`               |

## 6. Before / after

Forge uses the `@driveforgelabs/forge-ui-react` wrappers (events arrive as `onForgeX` props with a `CustomEvent`; confirm the exact prop names against the wrapper in Mecano).

### ForgeButton

```tsx
// before
<ForgeButton variant="danger" size="sm" onForgeClick={() => remove(id)}>Delete</ForgeButton>
// after
<Button variant="destructive" size="sm" onClick={() => remove(id)}>Delete</Button>
```

### ForgeInput

```tsx
// before
<ForgeInput label="Licence plate" hint="Shown on the order" state={error ? "error" : "default"}
  value={plate} onForgeInput={(e) => setPlate(e.detail.value)} />
// after
<div className="grid gap-2">
  <Label htmlFor="plate">Licence plate</Label>
  <Input id="plate" className="font-mono" value={plate} aria-invalid={!!error}
    onChange={(e) => setPlate(e.target.value)} />
  <p className="text-sm text-muted-foreground">Shown on the order</p>
</div>
```

With react-hook-form, use `Form`/`FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormDescription`/`FormMessage`: it wires label, `aria-invalid` and error text for you.

### ForgeBadge

```tsx
// before
<ForgeBadge type="warn">Waiting parts</ForgeBadge>
// after
<StatusBadge variant="warning">Waiting parts</StatusBadge>
```

Type map: `ok`→`success`, `warn`→`warning`, `crit`→`destructive`, `info`→`info`, `forge`→`accent`, `muted`→`muted`.

### ForgeStatCard

```tsx
// before
<ForgeStatCard label="Revenue today" value="1,284" unit="EUR" bar={62} badge="Below goal" badgeType="warn" />
// after
<StatCard label="Revenue today" value="1,284" unit="EUR" progress={62}
  badge={{ label: "Below goal", variant: "warning" }} />
```

`sub`, `delta`, `meta`, `valueColor`, `barColor`, `state` have no counterpart (see parity doc).

### ForgeDialog

```tsx
// before
<ForgeDialog open={open} heading="Edit customer" size="md" onForgeClose={() => setOpen(false)}>
  <CustomerForm />
  <div slot="footer">
    <ForgeButton variant="secondary" onForgeClick={() => setOpen(false)}>Cancel</ForgeButton>
    <ForgeButton onForgeClick={save}>Save</ForgeButton>
  </div>
</ForgeDialog>
// after
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Edit customer</DialogTitle>
      <DialogDescription>Changes are saved to the work order.</DialogDescription>
    </DialogHeader>
    <CustomerForm />
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={save}>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## 7. Removing the forge packages

`@driveforgelabs/forge-ui`, `@driveforgelabs/forge-ui-react` and `@driveforgelabs/tokens` are no longer built or published from this repo; the last published versions stay on npm. Mecano can keep them while it migrates, but nothing new ships. Note one clash while both are loaded: `tokens.css` also defines `--border`, the same name shadcn uses. Whichever stylesheet loads last wins `:root`, so one side's borders change colour. Import `tokens.css` first, and drop it once the last forge component is gone.
