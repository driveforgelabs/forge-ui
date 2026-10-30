import type * as React from "react"

import { cn } from "@/lib/utils"

type DataListItem = { id: string; label: React.ReactNode; value: React.ReactNode; mono?: boolean }

/** Description list: label / value pairs, stacked or side by side. */
function DataList({
  items,
  layout = "inline",
  className,
}: {
  items: DataListItem[]
  layout?: "inline" | "stacked"
  className?: string
}) {
  return (
    <dl data-slot="data-list" className={cn("grid gap-3 text-sm", className)}>
      {items.map((it) => (
        <div
          key={it.id}
          className={cn(
            layout === "inline" ? "flex items-baseline justify-between gap-4" : "grid gap-0.5",
          )}
        >
          <dt className="text-muted-foreground">{it.label}</dt>
          <dd
            className={cn(
              "font-medium",
              layout === "inline" && "text-right",
              it.mono && "font-mono tabular-nums",
            )}
          >
            {it.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export { DataList, type DataListItem }
