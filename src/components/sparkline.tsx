import * as React from "react"
import { Area, AreaChart, YAxis } from "recharts"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const config = {
  value: { label: "Value", color: "var(--chart-1)" },
} satisfies ChartConfig

type SparklineProps = Omit<React.ComponentProps<"div">, "children"> & {
  values: number[]
  /** Any CSS color; defaults to the first chart color. */
  color?: string
}

function Sparkline({ values, color, className, ...props }: SparklineProps) {
  const data = React.useMemo(() => values.map((value, i) => ({ i, value })), [values])
  const id = React.useId().replace(/:/g, "")

  return (
    <ChartContainer
      config={color ? { value: { label: "Value", color } } : config}
      className={cn("aspect-auto h-10 w-full", className)}
      {...props}
    >
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Area
          dataKey="value"
          type="monotone"
          stroke="var(--color-value)"
          strokeWidth={1.5}
          fill={`url(#${id})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  )
}

export { Sparkline }
