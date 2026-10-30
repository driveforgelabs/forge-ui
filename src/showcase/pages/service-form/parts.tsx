import { AlertCircleIcon, ChevronDownIcon } from "lucide-react"
import type * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { eur } from "./data"
import type { ServiceForm } from "./state"

/** `id` plus the aria wiring for a field that may show an error. */
export function errProps(f: ServiceForm, id: string) {
  const e = f.errorFor(id)
  return {
    id,
    "aria-invalid": e ? true : undefined,
    "aria-describedby": e ? `${id}-err` : undefined,
  } as const
}

export function Err({ f, id }: { f: ServiceForm; id: string }) {
  const e = f.errorFor(id)
  return e ? (
    <p id={`${id}-err`} className="flex items-center gap-1 text-sm text-destructive">
      <AlertCircleIcon className="size-4 flex-none" />
      {e}
    </p>
  ) : null
}

export function Field({
  f,
  id,
  label,
  children,
  className,
}: {
  f: ServiceForm
  id: string
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("grid min-w-0 gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      <Err f={f} id={id} />
    </div>
  )
}

/** Decimal field: text + inputMode (phone keypad, no spinner), selects its value on focus so typing replaces it. */
export function NumInput({
  value,
  onChange,
  className,
  money,
  ...rest
}: {
  value: string
  onChange: (v: string) => void /** Format as 0.00 when leaving the field. */
  money?: boolean
} & Omit<React.ComponentProps<"input">, "value" | "onChange">) {
  return (
    <Input
      {...rest}
      type="text"
      inputMode="decimal"
      autoComplete="off"
      value={value}
      className={cn("font-mono tabular-nums", className)}
      onFocus={(e) => e.currentTarget.select()}
      onBlur={() => {
        if (money && value !== "") onChange(Number(value).toFixed(2))
      }}
      onChange={(e) => onChange(e.target.value.replace(",", ".").replace(/[^0-9.]/g, ""))}
    />
  )
}

function Line({ l, v }: { l: string; v: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{l}</span>
      <span className="font-mono tabular-nums">{v}</span>
    </div>
  )
}

/** Per-job totals, VAT settings and (collapsed) profitability. Shown in a popover on desktop and a drawer on phones. */
export function Breakdown({ f }: { f: ServiceForm }) {
  return (
    <div className="grid gap-3 text-sm">
      {f.jobs.map((j) => (
        <div key={j.id} className="flex justify-between gap-3">
          <span className="min-w-0 truncate">{j.title || "Novo trabalho"}</span>
          <span className="font-mono tabular-nums">{eur(f.jobTotal(j))}</span>
        </div>
      ))}
      <Separator />
      <Line l="Subtotal sem IVA" v={eur(f.net)} />
      <Line l={`IVA (${f.d.vat}%)`} v={eur(f.vatAmount)} />
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span className="font-mono tabular-nums">{eur(f.total)}</span>
      </div>
      <Separator />
      <label
        className="flex items-center justify-between gap-3 text-muted-foreground"
        htmlFor="bk-inc"
      >
        Preços com IVA incluído
        <Switch
          id="bk-inc"
          checked={f.d.inclusive}
          onCheckedChange={(v) => f.set("inclusive", v)}
        />
      </label>
      <label
        className="flex items-center justify-between gap-3 text-muted-foreground"
        htmlFor="bk-vat"
      >
        Taxa de IVA (%)
        <NumInput
          id="bk-vat"
          aria-label="Taxa de IVA"
          className="h-9 w-20 text-right"
          value={f.d.vat}
          onChange={(v) => f.set("vat", v)}
        />
      </label>
      <Collapsible className="rounded-md bg-muted">
        <CollapsibleTrigger className="group flex min-h-11 w-full items-center justify-between px-3 text-sm font-medium">
          Rentabilidade (interno)
          <ChevronDownIcon className="size-4 transition-transform group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="grid gap-1 px-3 pb-3">
          <Line l="Custo das peças" v={eur(f.cost)} />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Lucro bruto</span>
            <span className="font-mono font-semibold tabular-nums text-success">
              {eur(f.profit)}
            </span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

const plural = (n: number) =>
  n === 1 ? "Falta 1 campo obrigatório" : `Faltam ${n} campos obrigatórios`

export function ErrorSummary({ f, onGo }: { f: ServiceForm; onGo?: (step: number) => void }) {
  const list = f.visibleErrors
  if (list.length === 0) return null
  return (
    <Alert variant="destructive" role="alert">
      <AlertCircleIcon />
      <AlertTitle>{plural(list.length)}</AlertTitle>
      <AlertDescription>
        <ul className="grid gap-0.5">
          {list.slice(0, 5).map((e) => (
            <li key={e.key}>
              <button
                type="button"
                className="underline underline-offset-2"
                onClick={() => {
                  onGo?.(e.step)
                  f.setFocusTarget(e.id)
                }}
              >
                {e.message}
              </button>
            </li>
          ))}
          {list.length > 5 && <li>e mais {list.length - 5}…</li>}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
