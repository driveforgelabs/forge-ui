import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import * as React from "react"
import * as RPNInput from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type PhoneInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref"> &
  Omit<
    RPNInput.Props<typeof RPNInput.default>,
    "onChange" | "inputComponent" | "countrySelectComponent"
  > & {
    /** Called with the E.164 number, or "" when empty. */
    onChange?: (value: RPNInput.Value | "") => void
  }

function PhoneInput({ className, onChange, ...props }: PhoneInputProps) {
  return (
    <RPNInput.default
      data-slot="phone-input"
      className={cn("flex", className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={PhoneTextInput}
      smartCaret={false}
      onChange={(value) => onChange?.(value ?? "")}
      {...props}
    />
  )
}

const PhoneTextInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <Input ref={ref} className={cn("rounded-s-none", className)} {...props} />
  ),
)
PhoneTextInput.displayName = "PhoneTextInput"

type CountryEntry = { label: string; value: RPNInput.Country | undefined }

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  options: CountryEntry[]
  onChange: (country: RPNInput.Country) => void
}

function CountrySelect({ disabled, value, options, onChange }: CountrySelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          aria-label="Country"
          className="gap-1 rounded-e-none border-e-0 px-3 focus:z-10"
        >
          <FlagComponent country={value} countryName={value} />
          <ChevronsUpDownIcon className="-mr-2 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country…" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((option): option is CountryEntry & { value: RPNInput.Country } =>
                  Boolean(option.value),
                )
                .map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      onChange(option.value)
                      setOpen(false)
                    }}
                  >
                    <FlagComponent country={option.value} countryName={option.label} />
                    <span className="flex-1 truncate">{option.label}</span>
                    <span className="text-muted-foreground">
                      +{RPNInput.getCountryCallingCode(option.value)}
                    </span>
                    <CheckIcon
                      className={cn("size-4", option.value === value ? "opacity-100" : "opacity-0")}
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

function FlagComponent({ country, countryName }: RPNInput.FlagProps) {
  const Flag = flags[country]
  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag ? <Flag title={countryName} /> : null}
    </span>
  )
}

export { PhoneInput }
