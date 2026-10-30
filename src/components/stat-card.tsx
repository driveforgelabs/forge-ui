import type * as React from "react"
import { Sparkline } from "@/components/sparkline"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type StatCardProps = Omit<React.ComponentProps<typeof Card>, "children"> & {
  label: React.ReactNode
  value: React.ReactNode
  /** Small text next to the value, e.g. a unit. */
  unit?: React.ReactNode
  badge?: { label: React.ReactNode; variant?: React.ComponentProps<typeof StatusBadge>["variant"] }
  /** 0-100 */
  progress?: number
  sparkline?: number[]
}

function StatCard({
  label,
  value,
  unit,
  badge,
  progress,
  sparkline,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card data-slot="stat-card" className={cn("py-4", className)} {...props}>
      <CardContent className="flex flex-col gap-3 px-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">{label}</span>
          {badge ? <StatusBadge variant={badge.variant}>{badge.label}</StatusBadge> : null}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-2xl font-semibold tabular-nums">{value}</span>
          {unit ? <span className="text-sm text-muted-foreground">{unit}</span> : null}
        </div>
        {progress !== undefined && <Progress value={progress} className="h-1.5" />}
        {sparkline ? <Sparkline values={sparkline} /> : null}
      </CardContent>
    </Card>
  )
}

export { StatCard }
