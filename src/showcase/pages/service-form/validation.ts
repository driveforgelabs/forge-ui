import { num } from "./data"
import type { Draft } from "./draft"

/** A validation problem. `step` is the phone-flow step that contains the field (0 veículo, 1 cliente, 2 pedido, 3 trabalhos). */
export type FieldError = { key: string; id: string; message: string; step: number }

const error = (id: string, message: string, step: number): FieldError => ({
  key: id,
  id,
  message,
  step,
})

export function validate(d: Draft): FieldError[] {
  const errors: FieldError[] = []
  if (!d.vehicle) errors.push(error("f-vehicle", "Selecione um veículo", 0))
  if (!d.description.trim())
    errors.push(error("f-description", "Indique uma descrição do serviço", 2))
  if (d.jobs.length === 0) errors.push(error("f-add-job", "Adicione pelo menos um trabalho", 3))
  for (const job of d.jobs) {
    if (!job.title.trim()) errors.push(error(`job-${job.id}-title`, "Dê um título ao trabalho", 3))
    for (const part of job.parts) {
      if (!part.name.trim()) errors.push(error(`part-${part.id}-name`, "Indique o nome da peça", 3))
      if (num(part.qty) <= 0) {
        errors.push(error(`part-${part.id}-qty`, "A quantidade tem de ser maior que 0", 3))
      }
    }
  }
  return errors
}
