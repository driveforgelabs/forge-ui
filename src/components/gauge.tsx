import type * as React from "react"

import { cn } from "@/lib/utils"

const tones = {
  primary: "stroke-primary",
  success: "stroke-success",
  warning: "stroke-warning",
  destructive: "stroke-destructive",
  info: "stroke-info",
} as const

type GaugeProps = {
  value: number
  min?: number
  max?: number
  label?: React.ReactNode
  unit?: string
  tone?: keyof typeof tones
  /** Value at which the arc turns destructive. */
  redline?: number
  size?: number
  className?: string
}

/** Semicircular gauge (SVG). Reads as a labelled meter for assistive tech. */
function Gauge({
  value,
  min = 0,
  max = 100,
  label,
  unit,
  tone = "primary",
  redline,
  size = 160,
  className,
}: GaugeProps) {
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)))
  const r = 56,
    c = Math.PI * r
  const hot = redline !== undefined && value >= redline
  return (
    <div
      data-slot="gauge"
      className={cn("inline-flex flex-col items-center", className)}
      style={{ width: size }}
    >
      {/* biome-ignore lint/a11y/useSemanticElements: an SVG arc cannot be a <meter> element */}
      <svg
        viewBox="0 0 140 84"
        role="meter"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={typeof label === "string" ? label : "Medidor"}
        className="w-full overflow-visible"
      >
        <path
          d="M14 76 A56 56 0 0 1 126 76"
          fill="none"
          className="stroke-muted"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M14 76 A56 56 0 0 1 126 76"
          fill="none"
          className={cn(
            "transition-[stroke-dashoffset] duration-500",
            hot ? tones.destructive : tones[tone],
          )}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
        />
        <text
          x="70"
          y="66"
          textAnchor="middle"
          className="fill-foreground font-mono text-[22px] font-semibold tabular-nums"
        >
          {value}
        </text>
        {unit ? (
          <text x="70" y="82" textAnchor="middle" className="fill-muted-foreground text-[10px]">
            {unit}
          </text>
        ) : null}
      </svg>
      {label ? <span className="-mt-1 text-sm text-muted-foreground">{label}</span> : null}
    </div>
  )
}

export { Gauge }
