import { Section } from "../section"

const tokens = [
  "background",
  "foreground",
  "card",
  "primary",
  "primary-foreground",
  "secondary",
  "muted",
  "muted-foreground",
  "accent",
  "destructive",
  "success",
  "warning",
  "info",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
]

export function ThemePage() {
  return (
    <>
      <Section title="Tokens">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {tokens.map((t) => (
            <div key={t} className="space-y-1.5">
              <div className="h-12 rounded-md border" style={{ background: `var(--${t})` }} />
              <div className="font-mono text-xs text-muted-foreground">--{t}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Typography">
        <p className="text-lg font-semibold">Geist sans — Service desk overview</p>
        <p className="font-mono">Geist Mono — WO-10483 · 12-AB-34 · €1,284.00</p>
      </Section>
    </>
  )
}
