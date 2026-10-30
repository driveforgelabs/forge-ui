import type { Job } from "./data"

const DRAFT_KEY = "mecano-service-form-draft"

export type Draft = {
  description: string
  date: string
  kmsIn: string
  vehicle: string
  customer: string
  request: string
  diagnosis: string
  notes: string
  kmsOut: string
  appointment: string
  jobs: Job[]
  vat: string
  inclusive: boolean
}

export const initialDraft: Draft = {
  description: "Substituição de travões dianteiros + óleo",
  date: "2026-10-30",
  kmsIn: "128450",
  vehicle: "1",
  customer: "1",
  request: "",
  diagnosis: "",
  notes: "",
  kmsOut: "",
  appointment: "",
  vat: "23",
  inclusive: false,
  jobs: [
    {
      id: 1,
      title: "Substituição de travões dianteiros",
      tech: "Pedro Almeida",
      hours: "1.5",
      rate: "45.00",
      parts: [
        {
          id: 1,
          name: "Pastilhas de travão dianteiras",
          pn: "BP-4410",
          qty: "1",
          cost: "28.00",
          price: "46.00",
        },
      ],
    },
    {
      id: 2,
      title: "Mudança de óleo e filtro",
      tech: "Rui Costa",
      hours: "0.5",
      rate: "45.00",
      parts: [
        { id: 2, name: "Óleo 5W-30 (1 L)", pn: "OL-5W30", qty: "4", cost: "7.50", price: "12.00" },
        { id: 3, name: "Filtro de óleo", pn: "OF-218", qty: "1", cost: "4.20", price: "9.50" },
      ],
    },
  ],
}

// Storage can be blocked (private mode, quota); everything still works without it.

export function loadDraft(): { draft: Draft; restored: boolean } {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (raw)
      return { draft: { ...initialDraft, ...(JSON.parse(raw) as Partial<Draft>) }, restored: true }
  } catch {
    // fall through to the initial draft
  }
  return { draft: initialDraft, restored: false }
}

/** Returns whether the draft was actually written. */
export function saveDraft(draft: Draft): boolean {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    return true
  } catch {
    return false
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY)
  } catch {
    // nothing to clear
  }
}

export function draftStatus(state: {
  dirty: boolean
  savedAt: Date | null
  restored: boolean
}): string {
  if (state.dirty) return "A guardar…"
  if (state.savedAt) {
    const time = state.savedAt.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })
    return `Rascunho guardado às ${time}`
  }
  if (state.restored) return "Rascunho restaurado"
  return "Sem alterações"
}
