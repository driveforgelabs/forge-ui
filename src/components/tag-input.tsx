import { XIcon } from "lucide-react"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type TagInputProps = {
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  id?: string
  className?: string
}

function TagInput({ value, onValueChange, placeholder, disabled, id, className }: TagInputProps) {
  const [draft, setDraft] = React.useState("")

  const add = (raw: string) => {
    const tag = raw.trim()
    if (tag && !value.includes(tag)) onValueChange([...value, tag])
    setDraft("")
  }

  return (
    <div
      data-slot="tag-input"
      aria-disabled={disabled}
      className={cn(
        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-2 py-1 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:bg-input/30",
        className,
      )}
    >
      {value.map((tag) => (
        <Badge key={tag} variant="secondary" className="gap-1">
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            disabled={disabled}
            className="rounded-full outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3"
            onClick={() => onValueChange(value.filter((t) => t !== tag))}
          >
            <XIcon />
          </button>
        </Badge>
      ))}
      <input
        id={id}
        value={draft}
        disabled={disabled}
        placeholder={value.length > 0 ? undefined : placeholder}
        className="min-w-24 flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground md:text-sm"
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => add(draft)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            add(draft)
          } else if (e.key === "Backspace" && !draft && value.length > 0) {
            onValueChange(value.slice(0, -1))
          }
        }}
      />
    </div>
  )
}

export { TagInput }
