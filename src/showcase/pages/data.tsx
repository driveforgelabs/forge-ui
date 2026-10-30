import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { StatCard } from "@/components/stat-card"
import { StatusBadge } from "@/components/status-badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Section } from "../section"

const chart = [
  { month: "May", orders: 86 },
  { month: "Jun", orders: 120 },
  { month: "Jul", orders: 98 },
  { month: "Aug", orders: 140 },
  { month: "Sep", orders: 132 },
  { month: "Oct", orders: 171 },
]
const cfg = { orders: { label: "Orders", color: "var(--chart-1)" } } satisfies ChartConfig
const rows = [
  { id: "WO-10482", plate: "12-AB-34", status: "success", label: "Done", total: "€184.50" },
  {
    id: "WO-10483",
    plate: "56-CD-78",
    status: "warning",
    label: "Waiting parts",
    total: "€612.00",
  },
  { id: "WO-10484", plate: "90-EF-12", status: "info", label: "In progress", total: "€96.20" },
  { id: "WO-10485", plate: "34-GH-56", status: "destructive", label: "Rejected", total: "€0.00" },
] as const

export function DataPage() {
  return (
    <>
      <Section title="Stat cards">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Open orders"
            value="24"
            badge={{ label: "On track", variant: "success" }}
            sparkline={[4, 6, 5, 8, 7, 11, 10, 14]}
          />
          <StatCard
            label="Revenue today"
            value="1,284"
            unit="EUR"
            badge={{ label: "Below goal", variant: "warning" }}
            progress={62}
          />
          <StatCard
            label="Avg. repair time"
            value="2.4"
            unit="h"
            badge={{ label: "Info", variant: "info" }}
          />
          <StatCard
            label="Overdue"
            value="3"
            badge={{ label: "Critical", variant: "destructive" }}
            progress={15}
          />
        </div>
      </Section>
      <Section title="Status badges">
        <div className="flex flex-wrap gap-2">
          <StatusBadge variant="success">Success</StatusBadge>
          <StatusBadge variant="warning">Warning</StatusBadge>
          <StatusBadge variant="info">Info</StatusBadge>
          <StatusBadge variant="destructive">Destructive</StatusBadge>
          <StatusBadge variant="accent">Accent</StatusBadge>
          <StatusBadge variant="muted">Muted</StatusBadge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </Section>
      <Section title="Table">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Plate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono">{r.id}</TableCell>
                  <TableCell className="font-mono">{r.plate}</TableCell>
                  <TableCell>
                    <StatusBadge variant={r.status}>{r.label}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{r.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>
      <Section title="Card, avatar, progress, skeleton">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Work order WO-10483</CardTitle>
              <CardDescription>Opened 28 Oct by Maria Santos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <span className="text-sm">Maria Santos</span>
              </div>
              <Progress value={66} />
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Open</Button>
              <Button size="sm" variant="outline">
                Print
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Loading</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        </div>
      </Section>
      <Section title="Chart">
        <Card>
          <CardContent>
            <ChartContainer config={cfg} className="h-56 w-full">
              <BarChart data={chart}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </Section>
      <Section title="Accordion and collapsible">
        <Accordion type="single" collapsible className="max-w-xl">
          <AccordionItem value="a">
            <AccordionTrigger>What is included?</AccordionTrigger>
            <AccordionContent>Labour, parts and a 12-month warranty.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Can I reschedule?</AccordionTrigger>
            <AccordionContent>Yes, up to 24 hours before.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Collapsible className="max-w-xl space-y-2">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm">
              Toggle details
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="rounded-md border p-3 text-sm">
            Hidden details revealed.
          </CollapsibleContent>
        </Collapsible>
      </Section>
    </>
  )
}
