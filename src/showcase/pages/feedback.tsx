import {
  AlertCircleIcon,
  CheckCircle2Icon,
  InfoIcon,
  PackageOpenIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { toast } from "sonner"
import { EmptyState } from "@/components/empty-state"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { Section } from "../section"

export function FeedbackPage() {
  return (
    <>
      <Section title="Alerts">
        <div className="grid max-w-2xl gap-3">
          <Alert>
            <InfoIcon />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>Default alert with an icon.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Payment failed</AlertTitle>
            <AlertDescription>The card was declined.</AlertDescription>
          </Alert>
          <Alert className="border-success/40 bg-success/10 text-success [&>svg]:text-success">
            <CheckCircle2Icon />
            <AlertTitle>Saved</AlertTitle>
            <AlertDescription className="text-success/90">
              Custom success alert via the success token.
            </AlertDescription>
          </Alert>
          <Alert className="border-warning/40 bg-warning/10 text-warning [&>svg]:text-warning">
            <TriangleAlertIcon />
            <AlertTitle>Low stock</AlertTitle>
            <AlertDescription className="text-warning/90">
              Brake pads are running low.
            </AlertDescription>
          </Alert>
        </div>
      </Section>
      <Section title="Toasts">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast("Work order saved")}>
            Default
          </Button>
          <Button variant="outline" onClick={() => toast.success("Customer notified")}>
            Success
          </Button>
          <Button variant="outline" onClick={() => toast.error("Could not save")}>
            Error
          </Button>
        </div>
      </Section>
      <Section title="Spinner and progress">
        <div className="flex items-center gap-4">
          <Spinner />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </div>
        <Progress value={45} className="max-w-md" />
      </Section>
      <Section title="Empty state">
        <EmptyState
          icon={<PackageOpenIcon />}
          title="No work orders yet"
          description="Create your first work order to start tracking repairs."
          action={<Button size="sm">New work order</Button>}
        />
      </Section>
    </>
  )
}
