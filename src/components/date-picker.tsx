import { CalendarIcon } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const fmt = (d: Date, locale: string) =>
  d.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" })

function rangeLabel(range: DateRange | undefined, locale: string): string | undefined {
  if (!range?.from) return undefined
  if (!range.to) return fmt(range.from, locale)
  return `${fmt(range.from, locale)} – ${fmt(range.to, locale)}`
}

type PickerBase = {
  placeholder?: string
  disabled?: boolean
  id?: string
  className?: string
  locale?: string
}

function DatePicker({
  value,
  onValueChange,
  placeholder = "Escolher data",
  disabled,
  id,
  className,
  locale = "pt-PT",
}: PickerBase & { value?: Date | undefined; onValueChange?: (d: Date | undefined) => void }) {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon /> {value === undefined ? placeholder : fmt(value, locale)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => {
            onValueChange?.(d)
            setOpen(false)
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

function DateRangePicker({
  value,
  onValueChange,
  placeholder = "Escolher intervalo",
  disabled,
  id,
  className,
  locale = "pt-PT",
  numberOfMonths = 2,
}: PickerBase & {
  value?: DateRange | undefined
  onValueChange?: (r: DateRange | undefined) => void
  numberOfMonths?: number
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start font-normal",
            !value?.from && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon />
          {rangeLabel(value, locale) ?? placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          numberOfMonths={numberOfMonths}
          selected={value}
          {...(onValueChange && { onSelect: onValueChange })}
          {...(value?.from && { defaultMonth: value.from })}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, type DateRange, DateRangePicker }
