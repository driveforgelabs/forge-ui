import * as React from "react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"

type PaletteCommand = {
  id: string
  label: string
  group?: string
  shortcut?: string
  onSelect: () => void
}

type CommandPaletteProps = {
  commands: PaletteCommand[]
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder?: string
  emptyText?: string
}

/** Global search/launcher in a dialog. Use `useCommandPaletteShortcut` for Ctrl/Cmd+K. */
function CommandPalette({
  commands,
  open,
  onOpenChange,
  placeholder = "Escreva um comando…",
  emptyText = "Sem resultados.",
}: CommandPaletteProps) {
  const groups = Array.from(new Set(commands.map((c) => c.group ?? "Comandos")))
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Paleta de comandos"
      description="Pesquise e execute um comando"
    >
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        {groups.map((g) => (
          <CommandGroup key={g} heading={g}>
            {commands
              .filter((c) => (c.group ?? "Comandos") === g)
              .map((c) => (
                <CommandItem
                  key={c.id}
                  value={`${g} ${c.label}`}
                  onSelect={() => {
                    onOpenChange(false)
                    c.onSelect()
                  }}
                >
                  {c.label}
                  {c.shortcut ? <CommandShortcut>{c.shortcut}</CommandShortcut> : null}
                </CommandItem>
              ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}

function useCommandPaletteShortcut(toggle: () => void) {
  React.useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
    }
    document.addEventListener("keydown", on)
    return () => document.removeEventListener("keydown", on)
  }, [toggle])
}

export { CommandPalette, type PaletteCommand, useCommandPaletteShortcut }
