import * as React from "react"

import { cn } from "@/lib/utils"

type NumberTickerProps = React.ComponentProps<"span"> & {
  value: number
  decimals?: number
  duration?: number
  prefix?: string
  unit?: string
  locale?: string
}

/** Counts up to `value`. Respects prefers-reduced-motion (renders the final value). */
function NumberTicker({
  value,
  decimals = 0,
  duration = 800,
  prefix,
  unit,
  locale = "pt-PT",
  className,
  ...props
}: NumberTickerProps) {
  const [shown, setShown] = React.useState(value)
  const from = React.useRef(value)
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value)
      from.current = value
      return
    }
    const start = performance.now(),
      a = from.current
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setShown(a + (value - a) * (1 - (1 - p) ** 3))
      if (p < 1) raf = requestAnimationFrame(tick)
      else from.current = value
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])
  return (
    <span data-slot="number-ticker" className={cn("font-mono tabular-nums", className)} {...props}>
      <span className="sr-only">{`${prefix ?? ""}${value.toLocaleString(locale)}${unit ?? ""}`}</span>
      <span aria-hidden>
        {prefix}
        {shown.toLocaleString(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {unit ? <span className="ml-1 text-muted-foreground">{unit}</span> : null}
      </span>
    </span>
  )
}

export { NumberTicker }
