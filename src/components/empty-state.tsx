import type * as React from "react"

import { cn } from "@/lib/utils"

type EmptyStateProps = Omit<React.ComponentProps<"div">, "title"> & {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Rendered below the description, typically a Button. */
  action?: React.ReactNode
}

function EmptyState({ className, icon, title, description, action, ...props }: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center",
        className,
      )}
      {...props}
    >
      {icon ? (
        <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg:not([class*='size-'])]:size-5">
          {icon}
        </div>
      ) : null}
      <h3 className="text-sm font-medium">{title}</h3>
      {description ? <p className="max-w-sm text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
}

export { EmptyState }
