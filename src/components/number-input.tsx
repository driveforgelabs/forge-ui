import { MinusIcon, PlusIcon } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const toText = (n: number | null) => (n === null ? "" : String(n))

type NumberInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "type" | "size"
> & {
  value: number | null
  onValueChange: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  /** Show − / + buttons. */
  stepper?: boolean
  prefix?: string
  suffix?: string
}

/** Decimal input: phone keypad, selects its content on focus, clamps on blur, optional stepper and affixes. */
function NumberInput({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  stepper,
  prefix,
  suffix,
  className,
  ...props
}: NumberInputProps) {
  const [text, setText] = React.useState(toText(value))
  React.useEffect(() => {
    setText((t) => (Number(t) === value || (t === "" && value === null) ? t : toText(value)))
  }, [value])
  const clamp = (n: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, n))
  const commit = (n: number | null) => {
    onValueChange(n)
    setText(toText(n))
  }

  const input = (
    <div className="relative w-full">
      {prefix ? (
        <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-sm text-muted-foreground">
          {prefix}
        </span>
      ) : null}
      <Input
        {...props}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={text}
        className={cn(
          "font-mono tabular-nums",
          prefix && "pl-7",
          suffix && "pr-10",
          stepper && "text-center",
          className,
        )}
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => {
          const v = e.target.value.replace(",", ".").replace(/[^0-9.-]/g, "")
          setText(v)
          onValueChange(v === "" || v === "-" || v === "." ? null : Number(v))
        }}
        onBlur={() => commit(text === "" ? null : clamp(Number(text) || 0))}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") {
            e.preventDefault()
            commit(clamp((value ?? 0) + step))
          }
          if (e.key === "ArrowDown") {
            e.preventDefault()
            commit(clamp((value ?? 0) - step))
          }
        }}
      />
      {suffix ? (
        <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-sm text-muted-foreground">
          {suffix}
        </span>
      ) : null}
    </div>
  )
  if (!stepper) return input
  return (
    <div className="flex items-center gap-1" data-slot="number-input">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Diminuir"
        disabled={props.disabled || (min !== undefined && (value ?? 0) <= min)}
        onClick={() => commit(clamp((value ?? 0) - step))}
      >
        <MinusIcon />
      </Button>
      {input}
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Aumentar"
        disabled={props.disabled || (max !== undefined && (value ?? 0) >= max)}
        onClick={() => commit(clamp((value ?? 0) + step))}
      >
        <PlusIcon />
      </Button>
    </div>
  )
}

export { NumberInput }
