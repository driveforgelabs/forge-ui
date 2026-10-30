import type * as React from "react"

import { cn } from "@/lib/utils"

const fills = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  info: "bg-info",
} as const

type BarChannelProps = {
  label: React.ReactNode
  value: number
  max?: number
  /** Highest value seen; drawn as a marker. */
  peak?: number
  unit?: string
  tone?: keyof typeof fills
  className?: string
}

/** Labelled horizontal bar with an optional peak marker (telemetry rows, stock levels). */
function BarChannel({
  label,
  value,
  max = 100,
  peak,
  unit,
  tone = "primary",
  className,
}: BarChannelProps) {
  const pct = (n: number) => `${Math.min(100, Math.max(0, (n / max) * 100))}%`
  return (
    <div data-slot="bar-channel" className={cn("grid gap-1.5", className)}>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono tabular-nums">
          {value}
          {unit ? <span className="ml-0.5 text-muted-foreground">{unit}</span> : null}
        </span>
      </div>
      {/* biome-ignore lint/a11y/useSemanticElements: <meter> cannot be restyled consistently across browsers; this bar needs the peak marker */}
      <div
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={typeof label === "string" ? label : undefined}
        className="relative h-2 overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-500", fills[tone])}
          style={{ width: pct(value) }}
        />
        {peak !== undefined && (
          <span
            aria-hidden
            className="absolute inset-y-0 w-0.5 bg-foreground/70"
            style={{ left: pct(peak) }}
          />
        )}
      </div>
    </div>
  )
}

export { BarChannel }
