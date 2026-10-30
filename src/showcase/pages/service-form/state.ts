import * as React from "react"
import { toast } from "sonner"
import { customers, type Job, type Part, stock, vehicles } from "./data"
import { clearDraft, type Draft, draftStatus, initialDraft, loadDraft, saveDraft } from "./draft"
import { computeTotals, jobTotal } from "./totals"
import { type FieldError, validate } from "./validation"

export type { FieldError }

const UNDO_MS = 8000
const AUTOSAVE_MS = 800

const insertAt = <T>(list: T[], index: number, item: T): T[] => [
  ...list.slice(0, index),
  item,
  ...list.slice(index),
]
const pieces = (n: number) => `${n} peça${n === 1 ? "" : "s"}`
const undoable = (message: string, undo: () => void) =>
  toast(message, { duration: UNDO_MS, action: { label: "Anular", onClick: undo } })

/** State for the service form: autosaved draft, validation, undo on delete, focus requests. */
export function useServiceForm() {
  const [initialLoad] = React.useState(loadDraft)
  const [d, setD] = React.useState<Draft>(initialLoad.draft)
  const restored = initialLoad.restored
  const [shown, setShown] = React.useState<Set<string> | null>(null)
  const [savedAt, setSavedAt] = React.useState<Date | null>(null)
  const [dirty, setDirty] = React.useState(false)
  const [created, setCreated] = React.useState(false)
  const [focusTarget, setFocusTarget] = React.useState<string | null>(null)
  const nextId = React.useRef(1000)
  const mounted = React.useRef(false)

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setD((p) => ({ ...p, [key]: value }))
    setDirty(true)
  }
  const setJobs = (fn: (jobs: Job[]) => Job[]) => {
    setD((p) => ({ ...p, jobs: fn(p.jobs) }))
    setDirty(true)
  }

  // Debounced autosave; the status text reflects what really happened.
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    const timer = setTimeout(() => {
      if (saveDraft(d)) {
        setSavedAt(new Date())
        setDirty(false)
      }
    }, AUTOSAVE_MS)
    return () => clearTimeout(timer)
  }, [d])

  // Focus requests are resolved after the render that creates the target.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `d` re-runs this after state changes so freshly rendered targets can be found
  React.useEffect(() => {
    if (!focusTarget) return
    const el = document.getElementById(focusTarget)
    if (el) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" })
      el.focus({ preventScroll: true })
    }
    setFocusTarget(null)
  }, [focusTarget, d])

  const reset = () => {
    setD(initialDraft)
    setShown(null)
    setSavedAt(null)
    setDirty(false)
  }
  const discardDraft = () => {
    clearDraft()
    reset()
    toast("Rascunho descartado")
  }
  const startNew = () => {
    reset()
    setCreated(false)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: runs once on mount
  React.useEffect(() => {
    if (restored) {
      toast("Rascunho restaurado", {
        duration: UNDO_MS,
        action: { label: "Descartar", onClick: discardDraft },
      })
    }
  }, [])

  const jobs = d.jobs
  const patchJob = (id: number, patch: Partial<Job>) =>
    setJobs((list) => list.map((job) => (job.id === id ? { ...job, ...patch } : job)))
  const mapParts = (jobId: number, fn: (parts: Part[]) => Part[]) =>
    setJobs((list) =>
      list.map((job) => (job.id === jobId ? { ...job, parts: fn(job.parts) } : job)),
    )
  const patchPart = (jobId: number, partId: number, patch: Partial<Part>) =>
    mapParts(jobId, (parts) =>
      parts.map((part) => (part.id === partId ? { ...part, ...patch } : part)),
    )

  const addJob = () => {
    const id = nextId.current++
    setJobs((list) => {
      const prev = list.at(-1)
      return [
        ...list,
        {
          id,
          title: "",
          tech: prev?.tech ?? "",
          hours: "1",
          rate: prev?.rate ?? "45.00",
          parts: [],
        },
      ]
    })
    setFocusTarget(`job-${id}-title`)
  }
  const addPart = (jobId: number, part?: Partial<Part>, focus = true) => {
    const id = nextId.current++
    mapParts(jobId, (parts) => [
      ...parts,
      { id, name: "", pn: "", qty: "1", cost: "0.00", price: "0.00", ...part },
    ])
    if (focus) setFocusTarget(`part-${id}-name`)
    return id
  }
  const addStockPart = (jobId: number, stockId: string) => {
    const item = stock.find((s) => s.id === stockId)
    if (!item) return
    addPart(
      jobId,
      { name: item.name, pn: item.pn, cost: item.cost.toFixed(2), price: item.price.toFixed(2) },
      false,
    )
    toast.success(`${item.name} adicionada`)
  }

  const removeJob = (id: number) => {
    const index = jobs.findIndex((job) => job.id === id)
    const gone = jobs[index]
    if (!gone) return
    setJobs((list) => list.filter((job) => job.id !== id))
    setFocusTarget("f-add-job")
    const detail = gone.parts.length > 0 ? ` (com ${pieces(gone.parts.length)})` : ""
    undoable(`Trabalho eliminado${detail}`, () => setJobs((list) => insertAt(list, index, gone)))
  }
  const removePart = (jobId: number, partId: number) => {
    const job = jobs.find((j) => j.id === jobId)
    const index = job?.parts.findIndex((p) => p.id === partId) ?? -1
    const gone = job?.parts[index]
    if (!gone) return
    mapParts(jobId, (parts) => parts.filter((part) => part.id !== partId))
    setFocusTarget(`job-${jobId}-add-part`)
    undoable(`Peça removida${gone.name ? `: ${gone.name}` : ""}`, () =>
      mapParts(jobId, (parts) => insertAt(parts, index, gone)),
    )
  }

  const errors = React.useMemo(() => validate(d), [d])
  // Only errors that existed at the last submit are shown, so fields added later stay quiet until the next attempt.
  const visibleErrors = shown ? errors.filter((e) => shown.has(e.id)) : []
  const errorFor = (id: string) => visibleErrors.find((e) => e.id === id)?.message

  const submit = (goToStep?: (step: number) => void) => {
    const [firstError] = errors
    if (firstError) {
      setShown(new Set(errors.map((e) => e.id)))
      goToStep?.(firstError.step)
      setFocusTarget(firstError.id)
      return false
    }
    setShown(null)
    clearDraft()
    setDirty(false)
    setSavedAt(null)
    setCreated(true)
    return true
  }

  return {
    d,
    set,
    jobs,
    patchJob,
    patchPart,
    addJob,
    addPart,
    addStockPart,
    removeJob,
    removePart,
    errors,
    visibleErrors,
    errorFor,
    submit,
    discardDraft,
    created,
    startNew,
    jobTotal,
    ...computeTotals(jobs, d.vat, d.inclusive),
    status: draftStatus({ dirty, savedAt, restored }),
    setFocusTarget,
    vehicleLabel: vehicles.find((v) => v.value === d.vehicle)?.label ?? "",
    customerLabel: customers.find((c) => c.value === d.customer)?.label ?? "",
    stock,
  }
}

export type ServiceForm = ReturnType<typeof useServiceForm>
