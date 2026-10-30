import { CameraIcon, ChevronDownIcon, PlusIcon, Trash2Icon } from "lucide-react"
import * as React from "react"
import { Combobox } from "@/components/combobox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { customers, eur, num, stockOptions, techs, vehicles } from "./data"
import { Breakdown, Err, ErrorSummary, errProps, Field, NumInput } from "./parts"
import type { ServiceForm } from "./state"

const ROW = "grid grid-cols-[1fr_160px_92px_92px_100px_40px] gap-2"

/** Desktop layout: context cards, details, then one table with jobs and their parts, with a pinned totals bar. */
export function DesktopSheet({ f }: { f: ServiceForm }) {
  const [vehicleEdit, setVehicleEdit] = React.useState(false)
  const [customerEdit, setCustomerEdit] = React.useState(false)
  // Enter in a part's price adds another row.
  const rowKeys = (jid: number) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      f.addPart(jid)
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-32">
      <header className="space-y-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#service-form">Serviços</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Nova ficha de obra</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="mr-auto text-2xl font-semibold tracking-tight">Nova ficha de obra</h1>
          <span role="status" className="text-sm text-muted-foreground">
            {f.status}
          </span>
          <Select defaultValue="pending">
            <SelectTrigger className="w-40" aria-label="Estado">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="progress">Em curso</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <ErrorSummary f={f} />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="gap-3 py-4">
          <CardContent className="grid gap-3 px-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="f-vehicle" className="text-muted-foreground">
                Veículo
              </Label>
              {f.d.vehicle ? (
                <Button variant="ghost" size="sm" onClick={() => setVehicleEdit((v) => !v)}>
                  {vehicleEdit ? "Cancelar" : "Alterar"}
                </Button>
              ) : null}
            </div>
            {f.d.vehicle && !vehicleEdit ? (
              <div className="flex items-center gap-3">
                <span className="rounded-md border bg-muted px-2.5 py-1 font-mono text-base font-semibold">
                  {f.vehicleLabel.split(" · ")[0]}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium">{f.vehicleLabel.split(" · ")[1]}</p>
                  <p className="text-sm text-muted-foreground">
                    Último registo <span className="font-mono">128 450</span> km
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                <div className="flex gap-2">
                  <div className="min-w-0 flex-1">
                    <Combobox
                      id="f-vehicle"
                      options={vehicles}
                      value={f.d.vehicle}
                      onValueChange={(v) => {
                        f.set("vehicle", v)
                        setVehicleEdit(false)
                      }}
                      placeholder="Matrícula, marca ou modelo…"
                    />
                  </div>
                  <Button variant="outline" size="icon" aria-label="Ler matrícula com a câmara">
                    <CameraIcon />
                  </Button>
                </div>
                <Err f={f} id="f-vehicle" />
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="gap-3 py-4">
          <CardContent className="grid gap-3 px-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="f-customer" className="text-muted-foreground">
                Cliente
              </Label>
              {f.d.customer ? (
                <Button variant="ghost" size="sm" onClick={() => setCustomerEdit((v) => !v)}>
                  {customerEdit ? "Cancelar" : "Alterar"}
                </Button>
              ) : null}
            </div>
            {f.d.customer && !customerEdit ? (
              <div className="flex items-center gap-3">
                <Avatar className="size-9">
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate font-medium">{f.customerLabel.split(" · ")[0]}</p>
                  <p className="font-mono text-sm text-muted-foreground">
                    {f.customerLabel.split(" · ")[1]}
                  </p>
                </div>
              </div>
            ) : (
              <Combobox
                id="f-customer"
                options={customers}
                value={f.d.customer}
                onValueChange={(v) => {
                  f.set("customer", v)
                  setCustomerEdit(false)
                }}
                placeholder="Nome ou telefone…"
              />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="grid gap-4">
          <Field f={f} id="f-description" label="Descrição do serviço">
            <Input
              {...errProps(f, "f-description")}
              value={f.d.description}
              onChange={(e) => f.set("description", e.target.value)}
              placeholder="ex: Substituição de travões dianteiros"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field f={f} id="f-date" label="Data">
              <Input
                id="f-date"
                type="date"
                value={f.d.date}
                onChange={(e) => f.set("date", e.target.value)}
              />
            </Field>
            <Field f={f} id="f-kms" label="Kms de entrada">
              <div className="relative">
                <NumInput
                  id="f-kms"
                  className="pr-10"
                  value={f.d.kmsIn}
                  onChange={(v) => f.set("kmsIn", v)}
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-sm text-muted-foreground">
                  km
                </span>
              </div>
            </Field>
            <Field f={f} id="f-appointment" label="Marcação">
              <Input
                id="f-appointment"
                type="date"
                value={f.d.appointment}
                onChange={(e) => f.set("appointment", e.target.value)}
              />
            </Field>
          </div>
          <Field f={f} id="f-request" label="Pedido do cliente">
            <Textarea
              id="f-request"
              rows={2}
              value={f.d.request}
              onChange={(e) => f.set("request", e.target.value)}
              placeholder="Sintomas e pedido, numa ou duas linhas"
            />
          </Field>
          <Collapsible className="border-t pt-4">
            <CollapsibleTrigger className="group flex items-center gap-1 text-sm font-medium text-primary">
              <ChevronDownIcon className="size-4 transition-transform group-data-[state=open]:rotate-180" />
              Mais detalhes
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 grid gap-4">
              <Field f={f} id="f-diagnosis" label="Diagnóstico do técnico (visível ao cliente)">
                <Textarea
                  id="f-diagnosis"
                  rows={2}
                  value={f.d.diagnosis}
                  onChange={(e) => f.set("diagnosis", e.target.value)}
                />
              </Field>
              <Field f={f} id="f-notes" label="Notas internas (só a oficina vê)">
                <Textarea
                  id="f-notes"
                  rows={2}
                  value={f.d.notes}
                  onChange={(e) => f.set("notes", e.target.value)}
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field f={f} id="f-kmsout" label="Kms de saída">
                  <div className="relative">
                    <NumInput
                      id="f-kmsout"
                      className="pr-10"
                      value={f.d.kmsOut}
                      onChange={(v) => f.set("kmsOut", v)}
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-sm text-muted-foreground">
                      km
                    </span>
                  </div>
                </Field>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      <section aria-labelledby="jobs-h" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="jobs-h" className="text-lg font-semibold">
            Trabalhos e peças{" "}
            <span className="font-normal text-muted-foreground">({f.jobs.length})</span>
          </h2>
          <Button id="f-add-job" variant="outline" onClick={f.addJob}>
            <PlusIcon /> Adicionar trabalho
          </Button>
        </div>
        <Err f={f} id="f-add-job" />
        <div className="overflow-x-auto rounded-xl border bg-card">
          <div className="min-w-[760px]">
            <div
              className={`${ROW} border-b bg-muted px-3 py-2 text-sm font-medium text-foreground/80`}
              aria-hidden
            >
              <span>Trabalho / peça</span>
              <span>Mecânico / Nº peça</span>
              <span>Horas / Qtd</span>
              <span>€ hora / unit.</span>
              <span className="text-right">Total</span>
              <span />
            </div>
            {f.jobs.map((j) => (
              <div key={j.id} className="border-b last:border-b-0">
                <div className={`${ROW} items-start bg-accent/40 px-3 py-2`}>
                  <div className="grid gap-1">
                    <Input
                      {...errProps(f, `job-${j.id}-title`)}
                      aria-label="Título do trabalho"
                      className="bg-background font-medium dark:bg-background"
                      placeholder="Título do trabalho"
                      value={j.title}
                      onChange={(e) => f.patchJob(j.id, { title: e.target.value })}
                    />
                    <Err f={f} id={`job-${j.id}-title`} />
                  </div>
                  <Select value={j.tech} onValueChange={(v) => f.patchJob(j.id, { tech: v })}>
                    <SelectTrigger
                      className="w-full bg-background dark:bg-background"
                      aria-label="Mecânico"
                    >
                      <SelectValue placeholder="Mecânico" />
                    </SelectTrigger>
                    <SelectContent>
                      {techs.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <NumInput
                    className="bg-background dark:bg-background"
                    aria-label="Horas de mão de obra"
                    value={j.hours}
                    onChange={(v) => f.patchJob(j.id, { hours: v })}
                  />
                  <NumInput
                    aria-label="Euros por hora"
                    value={j.rate}
                    onChange={(v) => f.patchJob(j.id, { rate: v })}
                  />
                  <span className="pt-1.5 text-right font-mono text-sm font-semibold tabular-nums">
                    {eur(num(j.hours) * num(j.rate))}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Eliminar trabalho ${j.title || ""}`}
                    onClick={() => f.removeJob(j.id)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
                {j.parts.map((p) => (
                  <div key={p.id} className={`${ROW} items-start px-3 py-1.5`}>
                    <div className="grid gap-1 pl-5">
                      <Input
                        {...errProps(f, `part-${p.id}-name`)}
                        aria-label="Nome da peça"
                        placeholder="Peça"
                        value={p.name}
                        onChange={(e) => f.patchPart(j.id, p.id, { name: e.target.value })}
                      />
                      <Err f={f} id={`part-${p.id}-name`} />
                    </div>
                    <Input
                      aria-label="Número da peça"
                      className="font-mono"
                      placeholder="Nº"
                      value={p.pn}
                      onChange={(e) => f.patchPart(j.id, p.id, { pn: e.target.value })}
                    />
                    <div className="grid gap-1">
                      <NumInput
                        {...errProps(f, `part-${p.id}-qty`)}
                        aria-label="Quantidade"
                        value={p.qty}
                        onChange={(v) => f.patchPart(j.id, p.id, { qty: v })}
                      />
                      <Err f={f} id={`part-${p.id}-qty`} />
                    </div>
                    <NumInput
                      money
                      aria-label="Preço unitário"
                      value={p.price}
                      onChange={(v) => f.patchPart(j.id, p.id, { price: v })}
                      onKeyDown={rowKeys(j.id)}
                    />
                    <span className="pt-1.5 text-right font-mono text-sm tabular-nums">
                      {eur(num(p.qty) * num(p.price))}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remover ${p.name || "peça"}`}
                      onClick={() => f.removePart(j.id, p.id)}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                ))}
                <div className="flex flex-wrap items-center gap-2 px-3 py-2 pl-8">
                  <div className="w-72 max-w-full">
                    <Combobox
                      wide
                      options={stockOptions}
                      value=""
                      placeholder="Adicionar peça do stock…"
                      searchPlaceholder="Pesquisar peça…"
                      onValueChange={(v) => f.addStockPart(j.id, v)}
                    />
                  </div>
                  <Button
                    id={`job-${j.id}-add-part`}
                    variant="ghost"
                    size="sm"
                    onClick={() => f.addPart(j.id)}
                  >
                    <PlusIcon /> Linha livre
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Enter no preço adiciona outra linha
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pinned totals */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 backdrop-blur md:left-(--sidebar-width)">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
          <span className="text-sm text-muted-foreground">
            M.O.{" "}
            <span className="inline-block min-w-20 font-mono tabular-nums text-foreground">
              {eur(f.labor)}
            </span>
          </span>
          <span className="text-sm text-muted-foreground">
            Peças{" "}
            <span className="inline-block min-w-20 font-mono tabular-nums text-foreground">
              {eur(f.retail)}
            </span>
          </span>
          <span className="text-sm text-muted-foreground">s/ IVA</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                Detalhe <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" side="top" className="w-80">
              <Breakdown f={f} />
            </PopoverContent>
          </Popover>
          <span className="ml-auto text-lg font-semibold">
            Total c/ IVA{" "}
            <span className="inline-block min-w-28 text-right font-mono tabular-nums">
              {eur(f.total)}
            </span>
          </span>
          <Button size="lg" onClick={() => f.submit()}>
            Criar registo
          </Button>
        </div>
      </div>
    </div>
  )
}
