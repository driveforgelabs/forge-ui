import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type StepperProps = {
  steps: string[]
  /** Zero-based index of the current step. */
  current: number
  /** When set, steps are buttons (>=44px tall) and can be jumped to. */
  onStepChange?: (index: number) => void
  className?: string
}

/** Horizontal step indicator. Pair with a Progress bar for long flows. */
function Stepper({ steps, current, onStepChange, className }: StepperProps) {
  return (
    <ol
      data-slot="stepper"
      className={cn("grid gap-1", className)}
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((s, i) => {
        const body = (
          <>
            {i < current && <CheckIcon className="size-3.5" />}
            {s}
          </>
        )
        const cls = cn(
          "flex min-h-11 w-full items-center justify-center gap-1 rounded-md px-1 text-sm",
          i === current ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground",
          onStepChange && "hover:bg-accent",
        )
        return (
          <li key={s}>
            {onStepChange ? (
              <button
                type="button"
                className={cls}
                aria-current={i === current ? "step" : undefined}
                onClick={() => onStepChange(i)}
              >
                {body}
              </button>
            ) : (
              <span className={cls} aria-current={i === current ? "step" : undefined}>
                {body}
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

export { Stepper }
