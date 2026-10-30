import { ChevronRightIcon, PlusIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Section } from "../section"

export function ActionsPage() {
  return (
    <>
      <Section title="Variants">
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>
      <Section title="Sizes and icons">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button>
            <PlusIcon /> New order
          </Button>
          <Button variant="outline" size="icon" aria-label="Next">
            <ChevronRightIcon />
          </Button>
          <Button variant="destructive" size="icon" aria-label="Delete">
            <TrashIcon />
          </Button>
          <Button disabled>
            <Spinner className="text-current" /> Saving
          </Button>
        </div>
      </Section>
      <Section title="Toggle group">
        <ToggleGroup type="single" variant="outline" defaultValue="week">
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
      </Section>
    </>
  )
}
