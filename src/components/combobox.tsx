import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type ComboboxOption = {
  value: string
  label: string /** Secondary text, right-aligned (code, price…). */
  detail?: string
}

type ComboboxProps = {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  id?: string
  className?: string
  /** Let the list grow wider than the trigger (long labels). */
  wide?: boolean
}

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No results.",
  disabled,
  id,
  className,
  wide,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between font-normal", className)}
        >
          <span className={cn("truncate", !selected && "text-muted-foreground")}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronsUpDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "p-0",
          wide
            ? "w-[max(var(--radix-popover-trigger-width),24rem)] max-w-[calc(100vw-2rem)]"
            : "w-(--radix-popover-trigger-width)",
        )}
        align="start"
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={`${option.label} ${option.detail ?? ""}`}
                  onSelect={() => {
                    onValueChange?.(option.value === value ? "" : option.value)
                    setOpen(false)
                  }}
                >
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {option.detail ? (
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {option.detail}
                    </span>
                  ) : null}
                  <CheckIcon
                    className={cn(
                      option.detail ? "" : "ml-auto",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox, type ComboboxOption }
