import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva("gap-1.5", {
  variants: {
    variant: {
      success: "bg-success/15 text-success",
      warning: "bg-warning/15 text-warning",
      info: "bg-info/15 text-info",
      destructive: "bg-destructive/15 text-destructive",
      accent: "bg-primary/15 text-primary",
      muted: "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "muted",
  },
})

type StatusBadgeProps = Omit<React.ComponentProps<typeof Badge>, "variant"> &
  VariantProps<typeof statusBadgeVariants> & {
    /** Show the leading status dot. */
    dot?: boolean
  }

function StatusBadge({ className, variant, dot = true, children, ...props }: StatusBadgeProps) {
  return (
    <Badge
      variant="ghost"
      data-slot="status-badge"
      className={cn(statusBadgeVariants({ variant }), className)}
      {...props}
    >
      {dot ? <span aria-hidden className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </Badge>
  )
}

export { StatusBadge, statusBadgeVariants }
