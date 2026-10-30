import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CameraIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"
import * as React from "react"
import { Combobox } from "@/components/combobox"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { customers, eur, num, stockOptions, techs, vehicles } from "./data"
import { Breakdown, Err, ErrorSummary, errProps, Field, NumInput } from "./parts"
import type { ServiceForm } from "./state"

const STEPS = ["Veículo", "Cliente", "Pedido", "Trabalhos", "Rever"] as const
const REVIEW_STEP = STEPS.length - 1
const JOBS_STEP = 3

/** Phone layout: one decision per screen, every step reachable, total and primary action always pinned. */
export function PhoneFlow({ f }: { f: ServiceForm }) {
  const [step, setStep] = React.useState(0)
  const last = step === REVIEW_STEP
  const go = (s: number) => setStep(s)

  const review = [
    { label: "Veículo", value: f.vehicleLabel, step: 0, missing: !f.d.vehicle, focus: "f-vehicle" },
    {
      label: "Cliente",
      value: f.customerLabel || "Sem cliente",
      step: 1,
      missing: false,
      focus: "f-customer",
    },
    {
      label: "Descrição",
      value: f.d.description,
      step: 2,
      missing: !f.d.description.trim(),
      focus: "f-description",
    },
    {
      label: "Pedido",
      value: f.d.request || "Sem pedido registado",
      step: 2,
      missing: false,
      focus: "f-request",
    },
    ...f.jobs.map((j, i) => ({
      label: `Trabalho ${i + 1}`,
      value: j.title.trim() ? `${j.title} · ${eur(f.jobTotal(j))}` : "",
      step: JOBS_STEP,
      missing: !j.title.trim(),
      focus: `job-${j.id}-title`,
    })),
  ]

  return (
    <div className="mx-auto flex max-w-xl flex-col pb-32">
      <h1 className="sr-only">Nova ficha de obra</h1>
      <div className="space-y-3 pb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Passo {step + 1} de {STEPS.length}
          </span>
          <span role="status" className="text-muted-foreground">
            {f.status}
          </span>
        </div>
        <Progress value={((step + 1) / STEPS.length) * 100} aria-label="Progresso" />
        <ol className="grid grid-cols-5 gap-1">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === step ? "step" : undefined}
                className={cn(
                  "flex min-h-11 w-full items-center justify-center gap-1 rounded-md px-1 text-sm",
                  i === step
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-accent",
                )}
              >
                {i < step && <CheckIcon className="size-3.5" />}
                {s}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <ErrorSummary f={f} onGo={go} />

      <div className="mt-4 space-y-6">
        {step === 0 && (
          <>
            <h2 className="text-2xl font-semibold tracking-tight">Qual é o veículo?</h2>
            <Button
              variant="outline"
              className="h-20 w-full flex-col gap-1 border-dashed text-base"
            >
              <CameraIcon className="size-6" /> Ler matrícula com a câmara
            </Button>
            <Field f={f} id="f-vehicle" label="Ou pesquise">
              <Combobox
                id="f-vehicle"
                className="h-12 text-base"
                options={vehicles}
                value={f.d.vehicle}
                onValueChange={(v) => f.set("vehicle", v)}
                placeholder="Matrícula, marca ou modelo…"
              />
            </Field>
            {f.d.vehicle ? (
              <Card>
                <CardContent className="flex items-center gap-3">
                  <span className="rounded-md border bg-muted px-2.5 py-1 font-mono text-lg font-semibold">
                    {f.vehicleLabel.split(" · ")[0]}
                  </span>
                  <div>
                    <p className="font-medium">{f.vehicleLabel.split(" · ")[1]}</p>
                    <p className="text-sm text-muted-foreground">
                      Último registo <span className="font-mono">128 450</span> km
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : null}
            <Field f={f} id="f-kms" label="Kms de entrada">
              <NumInput
                id="f-kms"
                className="h-12 text-base"
                inputMode="numeric"
                value={f.d.kmsIn}
                onChange={(v) => f.set("kmsIn", v)}
              />
            </Field>
          </>
        )}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold tracking-tight">De quem é?</h2>
            <Field f={f} id="f-customer" label="Cliente">
              <Combobox
                id="f-customer"
                className="h-12 text-base"
                options={customers}
                value={f.d.customer}
                onValueChange={(v) => f.set("customer", v)}
                placeholder="Nome ou telefone…"
              />
            </Field>
            <Button variant="outline" className="h-12 w-full">
              <PlusIcon /> Novo cliente
            </Button>
            <p className="text-sm text-muted-foreground">
              Sem cliente? Pode continuar e associar depois.
            </p>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold tracking-tight">O que se passa?</h2>
            <Field f={f} id="f-description" label="Descrição do serviço">
              <Input
                {...errProps(f, "f-description")}
                className="h-12 text-base"
                placeholder="ex: Substituição de travões"
                value={f.d.description}
                onChange={(e) => f.set("description", e.target.value)}
              />
            </Field>
            <Field f={f} id="f-request" label="Pedido do cliente">
              <Textarea
                id="f-request"
                rows={5}
                className="text-base"
                placeholder="Sintomas, por palavras suas"
                value={f.d.request}
                onChange={(e) => f.set("request", e.target.value)}
              />
            </Field>
            <div className="flex flex-wrap gap-2">
              {["Revisão", "Travões", "Ruído", "Diagnóstico eletrónico", "Pneus"].map((t) => (
                <Button
                  key={t}
                  variant="secondary"
                  className="h-11"
                  onClick={() =>
                    f.set("request", f.d.request ? `${f.d.request}, ${t.toLowerCase()}` : t)
                  }
                >
                  {t}
                </Button>
              ))}
            </div>
          </>
        )}
        {step === JOBS_STEP && (
          <>
            <h2 className="text-2xl font-semibold tracking-tight">Que trabalhos vão ser feitos?</h2>
            {f.jobs.map((j, i) => (
              <Card key={j.id}>
                <CardContent className="grid gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground">Trabalho {i + 1}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono font-semibold tabular-nums">
                        {eur(f.jobTotal(j))}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-11"
                        aria-label={`Eliminar trabalho ${i + 1}`}
                        onClick={() => f.removeJob(j.id)}
                      >
                        <Trash2Icon />
                      </Button>
                    </div>
                  </div>
                  <Field f={f} id={`job-${j.id}-title`} label="Título">
                    <Input
                      {...errProps(f, `job-${j.id}-title`)}
                      className="h-12 text-base"
                      placeholder="ex: Substituição de travões"
                      value={j.title}
                      onChange={(e) => f.patchJob(j.id, { title: e.target.value })}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor={`job-${j.id}-tech`}>Mecânico</Label>
                      <Select value={j.tech} onValueChange={(v) => f.patchJob(j.id, { tech: v })}>
                        <SelectTrigger id={`job-${j.id}-tech`} className="h-12 w-full">
                          <SelectValue placeholder="Atribuir" />
                        </SelectTrigger>
                        <SelectContent>
                          {techs.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`job-${j.id}-hours`}>Horas</Label>
                      <NumInput
                        id={`job-${j.id}-hours`}
                        className="h-12 text-base"
                        value={j.hours}
                        onChange={(v) => f.patchJob(j.id, { hours: v })}
                      />
                    </div>
                  </div>
                  <Separator />
                  <span className="text-sm font-medium">Peças</span>
                  {j.parts.map((p) => (
                    <div key={p.id} className="grid gap-3 rounded-lg border p-3">
                      <div className="flex items-start gap-2">
                        <div className="grid min-w-0 flex-1 gap-1">
                          <Input
                            {...errProps(f, `part-${p.id}-name`)}
                            aria-label="Nome da peça"
                            className="h-11"
                            placeholder="Nome da peça"
                            value={p.name}
                            onChange={(e) => f.patchPart(j.id, p.id, { name: e.target.value })}
                          />
                          <Err f={f} id={`part-${p.id}-name`} />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-11"
                          aria-label={`Remover ${p.name || "peça"}`}
                          onClick={() => f.removePart(j.id, p.id)}
                        >
                          <Trash2Icon />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <fieldset className="flex items-center gap-1">
                          <legend className="sr-only">Quantidade</legend>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-11"
                            aria-label="Menos"
                            onClick={() =>
                              f.patchPart(j.id, p.id, { qty: String(Math.max(0, num(p.qty) - 1)) })
                            }
                          >
                            <MinusIcon />
                          </Button>
                          <NumInput
                            {...errProps(f, `part-${p.id}-qty`)}
                            aria-label="Quantidade"
                            className="h-11 w-14 text-center"
                            value={p.qty}
                            onChange={(v) => f.patchPart(j.id, p.id, { qty: v })}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-11"
                            aria-label="Mais"
                            onClick={() => f.patchPart(j.id, p.id, { qty: String(num(p.qty) + 1) })}
                          >
                            <PlusIcon />
                          </Button>
                        </fieldset>
                        <div className="relative w-28">
                          <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-sm text-muted-foreground">
                            €
                          </span>
                          <NumInput
                            money
                            aria-label="Preço unitário"
                            className="h-11 pl-7"
                            value={p.price}
                            onChange={(v) => f.patchPart(j.id, p.id, { price: v })}
                          />
                        </div>
                      </div>
                      <Err f={f} id={`part-${p.id}-qty`} />
                    </div>
                  ))}
                  <Combobox
                    wide
                    className="h-11"
                    options={stockOptions}
                    value=""
                    placeholder="+ Peça do stock"
                    searchPlaceholder="Pesquisar peça…"
                    onValueChange={(v) => f.addStockPart(j.id, v)}
                  />
                  <Button
                    id={`job-${j.id}-add-part`}
                    variant="ghost"
                    className="h-11 w-fit"
                    onClick={() => f.addPart(j.id)}
                  >
                    <PlusIcon /> Peça manual
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button id="f-add-job" variant="outline" className="h-12 w-full" onClick={f.addJob}>
              <PlusIcon /> Adicionar trabalho
            </Button>
            <Err f={f} id="f-add-job" />
          </>
        )}
        {step === REVIEW_STEP && (
          <>
            <h2 className="text-2xl font-semibold tracking-tight">Rever e criar</h2>
            <Card>
              <CardContent className="grid gap-1 p-2">
                {review.map((r) => (
                  <button
                    key={r.label}
                    type="button"
                    onClick={() => {
                      go(r.step)
                      f.setFocusTarget(r.focus)
                    }}
                    className="flex min-h-11 flex-col items-start gap-0.5 rounded-md p-2 text-left text-sm hover:bg-accent"
                  >
                    <span className="text-muted-foreground">{r.label}</span>
                    <span
                      className={cn(
                        "w-full break-words font-medium",
                        r.missing && "text-destructive",
                      )}
                    >
                      {r.missing ? "Em falta" : r.value}
                    </span>
                  </button>
                ))}
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground">
              Toque numa linha para corrigir. Diagnóstico, danos e inspeção ficam para depois de
              criar.
            </p>
          </>
        )}
      </div>
      {step < REVIEW_STEP && (
        <Button variant="link" className="mt-2 h-11 w-fit px-0" onClick={() => go(REVIEW_STEP)}>
          Saltar para Rever
        </Button>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2 border-t bg-background/95 p-3 backdrop-blur">
        <Button
          variant="outline"
          size="icon"
          className="size-12"
          disabled={step === 0}
          onClick={() => go(step - 1)}
          aria-label="Passo anterior"
        >
          <ArrowLeftIcon />
        </Button>
        <Drawer>
          <DrawerTrigger asChild>
            <button
              type="button"
              className="mr-auto min-h-12 rounded-md px-2 text-left leading-tight hover:bg-accent"
              aria-label="Ver detalhe do total"
            >
              <span className="block text-sm text-muted-foreground">Total c/ IVA · detalhe</span>
              <span className="block font-mono text-lg font-semibold tabular-nums">
                {eur(f.total)}
              </span>
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Detalhe do total</DrawerTitle>
              <DrawerDescription>Como chegámos a {eur(f.total)}</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-8">
              <Breakdown f={f} />
            </div>
          </DrawerContent>
        </Drawer>
        {last ? (
          <Button size="lg" className="h-12 min-w-36" onClick={() => f.submit(go)}>
            Criar registo
          </Button>
        ) : (
          <Button size="lg" className="h-12 min-w-32" onClick={() => go(step + 1)}>
            Continuar <ArrowRightIcon />
          </Button>
        )}
      </div>
    </div>
  )
}
