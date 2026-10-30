import { CheckIcon } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

type ColorSwatchesProps = {
  colors: { value: string; label: string }[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

/** Single-choice color picker. Each swatch has an accessible name; `value` is any CSS color. */
function ColorSwatches({ colors, value, onValueChange, className }: ColorSwatchesProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onValueChange(v)}
      className={cn("flex-wrap gap-2", className)}
      aria-label="Cor"
    >
      {colors.map((c) => (
        <ToggleGroupItem
          key={c.value}
          value={c.value}
          aria-label={c.label}
          title={c.label}
          className="size-9 min-w-9 rounded-full border p-0 data-[state=on]:ring-2 data-[state=on]:ring-ring data-[state=on]:ring-offset-2 data-[state=on]:ring-offset-background"
          style={{ backgroundColor: c.value }}
        >
          {value === c.value && <CheckIcon className="size-4 text-white mix-blend-difference" />}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export { ColorSwatches }
