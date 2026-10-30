import { PlusIcon } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"
import { Banner } from "@/components/banner"
import { BarChannel } from "@/components/bar-channel"
import { CommandPalette, useCommandPaletteShortcut } from "@/components/command-palette"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { DataList } from "@/components/data-list"
import { type ColumnDef, DataTable } from "@/components/data-table"
import { Gauge } from "@/components/gauge"
import { HeatCell } from "@/components/heat-cell"
import { ModeToggle } from "@/components/mode-toggle"
import { NumberTicker } from "@/components/number-ticker"
import { StatusBadge } from "@/components/status-badge"
import { Timeline } from "@/components/timeline"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Kbd } from "@/components/ui/kbd"
import { Section } from "../section"

type Row = {
  id: string
  plate: string
  customer: string
  status: "success" | "warning" | "info" | "destructive"
  label: string
  total: number
}
const rows: Row[] = [
  {
    id: "WO-10482",
    plate: "12-AB-34",
    customer: "Maria Santos",
    status: "success",
    label: "Concluído",
    total: 184.5,
  },
  {
    id: "WO-10483",
    plate: "56-CD-78",
    customer: "João Ferreira",
    status: "warning",
    label: "À espera de peças",
    total: 612,
  },
  {
    id: "WO-10484",
    plate: "90-EF-12",
    customer: "Ana Costa",
    status: "info",
    label: "Em curso",
    total: 96.2,
  },
  {
    id: "WO-10485",
    plate: "34-GH-56",
    customer: "Rui Almeida",
    status: "destructive",
    label: "Rejeitado",
    total: 0,
  },
  {
    id: "WO-10486",
    plate: "78-IJ-90",
    customer: "Sofia Lima",
    status: "success",
    label: "Concluído",
    total: 340,
  },
  {
    id: "WO-10487",
    plate: "11-KL-22",
    customer: "Pedro Nunes",
    status: "info",
    label: "Em curso",
    total: 72.4,
  },
]
const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "id",
    header: "Ordem",
    cell: (c) => <span className="font-mono">{c.getValue<string>()}</span>,
  },
  {
    accessorKey: "plate",
    header: "Matrícula",
    cell: (c) => <span className="font-mono">{c.getValue<string>()}</span>,
  },
  { accessorKey: "customer", header: "Cliente" },
  {
    accessorKey: "label",
    header: "Estado",
    enableSorting: false,
    cell: (c) => <StatusBadge variant={c.row.original.status}>{c.getValue<string>()}</StatusBadge>,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: (c) => <span className="font-mono tabular-nums">€{c.getValue<number>().toFixed(2)}</span>,
  },
]

export function ComposedDataPage() {
  const [banner, setBanner] = React.useState(true)
  const [palette, setPalette] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [n, setN] = React.useState(1284)
  useCommandPaletteShortcut(React.useCallback(() => setPalette((o) => !o), []))
  return (
    <>
      <Section title="Banners">
        <div className="grid max-w-2xl gap-3">
          {banner ? (
            <Banner
              variant="info"
              title="Manutenção agendada"
              onDismiss={() => setBanner(false)}
              action={
                <Button size="sm" variant="outline">
                  Ver detalhes
                </Button>
              }
            >
              O sistema fica indisponível sábado das 02:00 às 03:00.
            </Banner>
          ) : null}
          <Banner variant="success" title="Sincronizado">
            Todos os serviços foram guardados.
          </Banner>
          <Banner variant="warning" title="Stock baixo">
            Pastilhas de travão: 2 unidades.
          </Banner>
          <Banner variant="destructive" title="Falha no envio">
            O SMS não foi entregue.
          </Banner>
        </div>
      </Section>

      <Section title="Data table (sort, paginate, loading, row click)">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 1200)
            }}
          >
            Simular carregamento
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={rows}
          pageSize={4}
          loading={loading}
          onRowClick={(r) => toast(`Abrir ${r.id}`)}
        />
        <DataTable columns={columns} data={[]} emptyText="Sem ordens para mostrar." />
      </Section>

      <Section title="Data list and timeline">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Veículo</CardTitle>
            </CardHeader>
            <CardContent>
              <DataList
                items={[
                  { id: "matrícula", label: "Matrícula", value: "12-AB-34", mono: true },
                  { id: "modelo", label: "Modelo", value: "Renault Clio 1.5 dCi" },
                  { id: "kms", label: "Kms", value: "128 450", mono: true },
                  {
                    id: "estado",
                    label: "Estado",
                    value: <Badge variant="secondary">Ativo</Badge>,
                  },
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Histórico</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline
                events={[
                  { id: "1", title: "Registo criado", time: "28 Out 09:12", tone: "info" },
                  {
                    id: "2",
                    title: "Peças encomendadas",
                    description: "Pastilhas BP-4410",
                    time: "28 Out 11:40",
                    tone: "warning",
                  },
                  { id: "3", title: "Serviço concluído", time: "30 Out 16:05", tone: "success" },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Metrics: gauge, bar channel, heat cells, ticker">
        <div className="grid items-start gap-6 md:grid-cols-3">
          <div className="flex flex-wrap items-end gap-4">
            <Gauge value={68} label="Ocupação" unit="%" />
            <Gauge value={92} label="Carga" unit="%" redline={90} />
          </div>
          <div className="grid gap-3">
            <BarChannel label="Stock de óleo" value={42} peak={78} unit="L" max={100} tone="info" />
            <BarChannel label="Pastilhas" value={8} max={40} tone="warning" />
          </div>
          <div className="grid gap-3">
            <div className="flex gap-1">
              {[0.1, 0.3, 0.55, 0.8, 1].map((v) => (
                <HeatCell key={v} value={v} label="Ocupação" />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <NumberTicker className="text-3xl font-semibold" value={n} prefix="€" />
              <Button size="sm" variant="outline" onClick={() => setN((x) => x + 317)}>
                <PlusIcon /> 317
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Dialogs and navigation helpers">
        <div className="flex flex-wrap items-center gap-3">
          <ConfirmDialog
            destructive
            trigger={<Button variant="destructive">Eliminar serviço</Button>}
            title="Eliminar este serviço?"
            description="Esta ação não pode ser anulada."
            confirmLabel="Eliminar"
            onConfirm={() => toast("Serviço eliminado")}
          />
          <Button variant="outline" onClick={() => setPalette(true)}>
            Paleta de comandos <Kbd>Ctrl K</Kbd>
          </Button>
          <ModeToggle />
        </div>
        <CommandPalette
          open={palette}
          onOpenChange={setPalette}
          commands={[
            {
              id: "n",
              label: "Novo serviço",
              group: "Criar",
              shortcut: "N",
              onSelect: () => toast("Novo serviço"),
            },
            {
              id: "c",
              label: "Novo cliente",
              group: "Criar",
              onSelect: () => toast("Novo cliente"),
            },
            { id: "s", label: "Ir para stock", group: "Navegar", onSelect: () => toast("Stock") },
          ]}
        />
      </Section>
    </>
  )
}
