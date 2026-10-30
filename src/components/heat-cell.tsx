import type * as React from "react"

import { cn } from "@/lib/utils"

type HeatCellProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** 0 to 1 */
  value: number
  label?: string
  tone?: "primary" | "success" | "warning" | "destructive" | "info"
}

const base = {
  primary: "var(--primary)",
  success: "var(--success)",
  warning: "var(--warning)",
  destructive: "var(--destructive)",
  info: "var(--info)",
} as const

/** One cell of a heat map: tone intensity scales with value. Always give it a label for assistive tech. */
function HeatCell({ value, label, tone = "primary", className, ...props }: HeatCellProps) {
  const v = Math.min(1, Math.max(0, value))
  return (
    <div
      role="img"
      aria-label={`${label ?? "Valor"}: ${Math.round(v * 100)}%`}
      title={`${label ?? ""} ${Math.round(v * 100)}%`.trim()}
      data-slot="heat-cell"
      className={cn("size-8 rounded-sm border", className)}
      style={{
        backgroundColor: `color-mix(in oklab, ${base[tone]} ${Math.round(v * 100)}%, transparent)`,
      }}
      {...props}
    />
  )
}

export { HeatCell }
