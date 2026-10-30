import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, TriangleAlertIcon, XIcon } from "lucide-react"
import type * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tones = {
  info: { icon: InfoIcon, className: "border-info/40 bg-info/10 text-info" },
  success: { icon: CheckCircle2Icon, className: "border-success/40 bg-success/10 text-success" },
  warning: { icon: TriangleAlertIcon, className: "border-warning/40 bg-warning/10 text-warning" },
  destructive: {
    icon: AlertCircleIcon,
    className: "border-destructive/40 bg-destructive/10 text-destructive",
  },
} as const

type BannerProps = Omit<React.ComponentProps<typeof Alert>, "variant" | "title"> & {
  variant?: keyof typeof tones
  title?: React.ReactNode
  /** Shows a dismiss button when provided. */
  onDismiss?: () => void
  action?: React.ReactNode
}

/** Alert with status tones (info, success, warning, destructive), an optional action and a dismiss button. */
function Banner({
  variant = "info",
  title,
  children,
  onDismiss,
  action,
  className,
  ...props
}: BannerProps) {
  const { icon: Icon, className: tone } = tones[variant]
  return (
    <Alert
      data-slot="banner"
      className={cn(tone, "[&>svg]:text-current", onDismiss && "pr-12", className)}
      {...props}
    >
      <Icon />
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription className="text-current/90">
        {children}
        {action ? <div className="mt-2">{action}</div> : null}
      </AlertDescription>
      {onDismiss ? (
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Dispensar"
          className="absolute top-2 right-2 text-current hover:bg-current/10 hover:text-current"
          onClick={onDismiss}
        >
          <XIcon />
        </Button>
      ) : null}
    </Alert>
  )
}

export { Banner }
