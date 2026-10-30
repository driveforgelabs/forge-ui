import { SearchIcon, XIcon } from "lucide-react"
import type * as React from "react"

import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

type SearchInputProps = Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> & {
  value: string
  onValueChange: (value: string) => void
}

/** Search field with a leading icon and a clear button (Escape also clears). */
function SearchInput({
  value,
  onValueChange,
  placeholder = "Pesquisar…",
  ...props
}: SearchInputProps) {
  return (
    <InputGroup data-slot="search-input">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        {...props}
        type="search"
        role="searchbox"
        aria-label={
          props["aria-label"] ?? (props.id || props["aria-labelledby"] ? undefined : placeholder)
        }
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") onValueChange("")
        }}
      />
      {value ? (
        <InputGroupAddon align="inline-end">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Limpar pesquisa"
            onClick={() => onValueChange("")}
          >
            <XIcon />
          </Button>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}

export { SearchInput }
