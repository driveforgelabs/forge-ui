import type * as React from "react"

import { cn } from "@/lib/utils"

type TimelineEvent = {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  time?: React.ReactNode
  tone?: "default" | "success" | "warning" | "destructive" | "info"
}

const dot = {
  default: "bg-muted-foreground",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  info: "bg-info",
} as const

/** Vertical event list (service history, status changes). */
function Timeline({ events, className }: { events: TimelineEvent[]; className?: string }) {
  return (
    <ol data-slot="timeline" className={cn("grid", className)}>
      {events.map((e, i) => (
        <li key={e.id} className="relative grid grid-cols-[1rem_1fr] gap-3 pb-6 last:pb-0">
          {i < events.length - 1 && (
            <span aria-hidden className="absolute top-3 bottom-0 left-[7px] w-px bg-border" />
          )}
          <span
            aria-hidden
            className={cn(
              "mt-1.5 size-3.5 rounded-full ring-4 ring-background",
              dot[e.tone ?? "default"],
            )}
          />
          <div className="grid gap-0.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-sm font-medium">{e.title}</p>
              {e.time ? (
                <time className="font-mono text-xs text-muted-foreground tabular-nums">
                  {e.time}
                </time>
              ) : null}
            </div>
            {e.description ? (
              <p className="text-sm text-muted-foreground">{e.description}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

export { Timeline, type TimelineEvent }
