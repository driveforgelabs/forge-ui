export type Part = {
  id: number
  name: string
  pn: string
  qty: string
  cost: string
  price: string
}
export type Job = {
  id: number
  title: string
  tech: string
  hours: string
  rate: string
  parts: Part[]
}

export type StockItem = { id: string; name: string; pn: string; cost: number; price: number }

/** Fake catalogue. */
export const stock: StockItem[] = [
  { id: "bp-4410", name: "Pastilhas de travão dianteiras", pn: "BP-4410", cost: 28, price: 46 },
  { id: "of-218", name: "Filtro de óleo", pn: "OF-218", cost: 4.2, price: 9.5 },
  { id: "ol-5w30", name: "Óleo 5W-30 (1 L)", pn: "OL-5W30", cost: 7.5, price: 12 },
]
export const vehicles = [
  { value: "1", label: "12-AB-34 · Renault Clio 1.5 dCi" },
  { value: "2", label: "56-CD-78 · BMW 320d" },
  { value: "3", label: "90-EF-12 · Toyota Yaris Hybrid" },
]
export const customers = [
  { value: "1", label: "Maria Santos · 912 345 678" },
  { value: "2", label: "João Ferreira · 933 221 100" },
]
export const techs = ["Pedro Almeida", "Rui Costa", "Sofia Lima"]

export const num = (s: string) => Number(s) || 0
export const eur = (v: number) => `€${v.toFixed(2)}`

export const stockOptions = stock.map((o) => ({
  value: o.id,
  label: o.name,
  detail: `${o.pn} · ${eur(o.price)}`,
}))
