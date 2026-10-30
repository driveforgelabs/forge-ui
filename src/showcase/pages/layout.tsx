import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Section } from "../section"

const SCROLL_LINES = Array.from({ length: 20 }, (_, i) => `Line item ${i + 1}`)

export function LayoutPage() {
  return (
    <>
      <Section title="Tabs">
        <Tabs defaultValue="details" className="max-w-xl">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="parts">Parts</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="text-sm">
            Vehicle and customer details.
          </TabsContent>
          <TabsContent value="parts" className="text-sm">
            Parts used on this order.
          </TabsContent>
          <TabsContent value="history" className="text-sm">
            Previous visits.
          </TabsContent>
        </Tabs>
      </Section>
      <Section title="Breadcrumb and separator">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#layout">Orders</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#layout">Open</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>WO-10483</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Separator />
      </Section>
      <Section title="Scroll area">
        <ScrollArea className="h-40 w-full max-w-sm rounded-md border p-3">
          {SCROLL_LINES.map((line) => (
            <div key={line} className="py-1 text-sm">
              {line}
            </div>
          ))}
        </ScrollArea>
      </Section>
      <Section title="Resizable">
        <ResizablePanelGroup orientation="horizontal" className="max-w-xl rounded-lg border">
          <ResizablePanel defaultSize={40}>
            <div className="p-4 text-sm">List</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60}>
            <div className="p-4 text-sm">Detail</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Section>
    </>
  )
}
