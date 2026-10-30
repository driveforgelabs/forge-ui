import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FileUploadProps = {
  value: File[]
  onValueChange: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  /** Per-file limit in MB; larger files are rejected with `onReject`. */
  maxSizeMB?: number
  onReject?: (file: File, reason: string) => void
  className?: string
}

const fileKey = (f: File) => `${f.name}-${f.size}-${f.lastModified}`
const size = (b: number) =>
  b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1e3))} kB`

/** Drag-and-drop zone plus a keyboard-reachable "choose files" button and a removable file list. */
function FileUpload({
  value,
  onValueChange,
  accept,
  multiple,
  disabled,
  maxSizeMB,
  onReject,
  className,
}: FileUploadProps) {
  const input = React.useRef<HTMLInputElement>(null)
  const [over, setOver] = React.useState(false)

  const add = (list: FileList | null) => {
    if (!list) return
    const ok: File[] = []
    const seen = new Set(value.map(fileKey))
    for (const f of Array.from(list)) {
      if (seen.has(fileKey(f))) continue
      if (maxSizeMB && f.size > maxSizeMB * 1e6) {
        onReject?.(f, `Maior que ${maxSizeMB} MB`)
        continue
      }
      ok.push(f)
    }
    onValueChange(multiple ? [...value, ...ok] : ok.slice(0, 1))
  }

  return (
    <div className={cn("grid gap-3", className)} data-slot="file-upload">
      {/* biome-ignore lint/a11y/noStaticElementInteractions: drag-and-drop target; the button inside is the keyboard path */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setOver(false)
          if (!disabled) add(e.dataTransfer.files)
        }}
        className={cn(
          "flex flex-col items-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors",
          over && "border-primary bg-primary/5",
          disabled && "opacity-50",
        )}
      >
        <UploadCloudIcon className="size-8 text-muted-foreground" />
        <p className="text-sm">Largue ficheiros aqui ou</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => input.current?.click()}
        >
          Escolher ficheiros
        </Button>
        <input
          ref={input}
          type="file"
          hidden
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => {
            add(e.target.files)
            e.target.value = ""
          }}
        />
        {accept || maxSizeMB ? (
          <p className="text-sm text-muted-foreground">
            {[accept, maxSizeMB && `até ${maxSizeMB} MB`].filter(Boolean).join(" · ")}
          </p>
        ) : null}
      </div>
      {value.length > 0 && (
        <ul className="grid gap-2">
          {value.map((f, i) => (
            <li
              key={fileKey(f)}
              className="flex items-center gap-3 rounded-md border p-2 pl-3 text-sm"
            >
              <FileIcon className="size-4 flex-none text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate">{f.name}</span>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {size(f.size)}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Remover ${f.name}`}
                onClick={() => onValueChange(value.filter((_, j) => j !== i))}
              >
                <XIcon />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { FileUpload }
