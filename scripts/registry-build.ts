// Builds the shadcn registry. The clay-theme item's cssVars are generated from src/styles/clay.css,
// so the theme has exactly one source of truth.
import { execFileSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"

type CssVars = Record<string, string>
type RegistryItem = { name: string; cssVars?: { theme: CssVars; light: CssVars; dark: CssVars } }
type Registry = { items: RegistryItem[] }

const css = readFileSync("src/styles/clay.css", "utf8")
const DECLARATION = /^\s*--([\w-]+):\s*(.+?);\s*(?:\/\*.*\*\/)?$/

/** Declarations of the first block that starts with `selector {`, as { name: value } without the leading dashes. */
function block(selector: string): CssVars {
  const start = css.indexOf(`${selector} {`)
  if (start === -1) throw new Error(`clay.css: no "${selector}" block`)
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("\n}", start))
  const vars: CssVars = {}
  for (const line of body.split("\n")) {
    const match = DECLARATION.exec(line)
    const [, name, value] = match ?? []
    if (name && value) vars[name] = value
  }
  return vars
}

const registry = JSON.parse(readFileSync("registry.json", "utf8")) as Registry
const theme = registry.items.find((item) => item.name === "clay-theme")
if (!theme) throw new Error("registry.json: no clay-theme item")
theme.cssVars = { theme: block("@theme inline"), light: block(":root"), dark: block(".dark") }
writeFileSync("registry.json", `${JSON.stringify(registry, null, 2)}\n`)

execFileSync("pnpm", ["exec", "shadcn", "build"], { stdio: "inherit" })
