import { type Job, num } from "./data"

const partsSum = (job: Job, unit: "price" | "cost") =>
  job.parts.reduce((sum, part) => sum + num(part.qty) * num(part[unit]), 0)

export const jobTotal = (job: Job) => num(job.hours) * num(job.rate) + partsSum(job, "price")

export function computeTotals(jobs: Job[], vat: string, inclusive: boolean) {
  const labor = jobs.reduce((sum, job) => sum + num(job.hours) * num(job.rate), 0)
  const retail = jobs.reduce((sum, job) => sum + partsSum(job, "price"), 0)
  const cost = jobs.reduce((sum, job) => sum + partsSum(job, "cost"), 0)
  const net = inclusive ? (labor + retail) / (1 + num(vat) / 100) : labor + retail
  const vatAmount = net * (num(vat) / 100)
  return { labor, retail, cost, net, vatAmount, total: net + vatAmount, profit: net - cost }
}
