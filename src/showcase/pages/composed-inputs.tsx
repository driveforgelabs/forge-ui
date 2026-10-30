import * as React from "react"
import { toast } from "sonner"
import { ColorSwatches } from "@/components/color-swatches"
import { Combobox } from "@/components/combobox"
import { DatePicker, type DateRange, DateRangePicker } from "@/components/date-picker"
import { FileUpload } from "@/components/file-upload"
import { NumberInput } from "@/components/number-input"
import { PasswordInput } from "@/components/password-input"
import { PhoneInput } from "@/components/phone-input"
import { SearchInput } from "@/components/search-input"
import { Stepper } from "@/components/stepper"
import { TagInput } from "@/components/tag-input"
import { Label } from "@/components/ui/label"
import { Section } from "../section"

const colors = [
  { value: "#f5f5f4", label: "Branco" },
  { value: "#1c1917", label: "Preto" },
  { value: "#a8a29e", label: "Prata" },
  { value: "#b91c1c", label: "Vermelho" },
  { value: "#1d4ed8", label: "Azul" },
  { value: "#15803d", label: "Verde" },
]

export function ComposedInputsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 9, 30))
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 9, 26),
    to: new Date(2026, 10, 2),
  })
  const [files, setFiles] = React.useState<File[]>([])
  const [qty, setQty] = React.useState<number | null>(2)
  const [price, setPrice] = React.useState<number | null>(45)
  const [q, setQ] = React.useState("")
  const [color, setColor] = React.useState("#1d4ed8")
  const [tags, setTags] = React.useState(["travões"])
  const [step, setStep] = React.useState(1)
  return (
    <>
      <Section title="Dates">
        <div className="grid max-w-xl gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="dp">Data do serviço</Label>
            <DatePicker id="dp" value={date} onValueChange={setDate} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="drp">Período</Label>
            <DateRangePicker id="drp" value={range} onValueChange={setRange} />
          </div>
        </div>
      </Section>
      <Section title="Numbers (decimal keypad, select on focus, ↑ ↓ keys)">
        <div className="grid max-w-xl gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="ni1">Quantidade (stepper)</Label>
            <NumberInput id="ni1" stepper min={0} max={20} value={qty} onValueChange={setQty} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ni2">Valor por hora</Label>
            <NumberInput id="ni2" prefix="€" step={0.5} value={price} onValueChange={setPrice} />
          </div>
        </div>
      </Section>
      <Section title="Text inputs">
        <div className="grid max-w-xl gap-4">
          <div className="grid gap-2">
            <Label htmlFor="si">Pesquisa</Label>
            <SearchInput id="si" value={q} onValueChange={setQ} placeholder="Matrícula, cliente…" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pw">Palavra-passe</Label>
            <PasswordInput id="pw" defaultValue="segredo123" />
          </div>
          <div className="grid gap-2">
            <Label>Etiquetas</Label>
            <TagInput value={tags} onValueChange={setTags} placeholder="Adicionar…" />
          </div>
          <div className="grid gap-2">
            <Label>Telefone</Label>
            <PhoneInput defaultCountry="PT" />
          </div>
          <div className="grid gap-2">
            <Label>Veículo</Label>
            <Combobox
              options={[
                { value: "1", label: "Renault Clio", detail: "12-AB-34" },
                { value: "2", label: "BMW 320d", detail: "56-CD-78" },
              ]}
              placeholder="Escolher…"
              wide
            />
          </div>
        </div>
      </Section>
      <Section title="Color and file">
        <div className="grid max-w-xl gap-4">
          <div className="grid gap-2">
            <span className="text-sm font-medium">Cor do veículo</span>
            <ColorSwatches colors={colors} value={color} onValueChange={setColor} />
          </div>
          <FileUpload
            value={files}
            onValueChange={setFiles}
            multiple
            accept="image/*,video/*"
            maxSizeMB={20}
            onReject={(f, why) => toast.error(`${f.name}: ${why}`)}
          />
        </div>
      </Section>
      <Section title="Stepper">
        <div className="max-w-xl">
          <Stepper
            steps={["Veículo", "Cliente", "Pedido", "Trabalhos", "Rever"]}
            current={step}
            onStepChange={setStep}
          />
        </div>
      </Section>
    </>
  )
}
