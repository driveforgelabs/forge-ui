import { CheckIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { eur } from "./data"
import { DesktopSheet } from "./desktop-sheet"
import { PhoneFlow } from "./phone-flow"
import { type ServiceForm, useServiceForm } from "./state"

// Service form: guided flow on phones, single sheet on desktop. One state, one validation, one undo.

const DESKTOP = "(min-width: 768px)"

function useIsDesktop() {
  const [v, setV] = React.useState(() => window.matchMedia(DESKTOP).matches)
  React.useEffect(() => {
    const m = window.matchMedia(DESKTOP)
    const on = () => setV(m.matches)
    m.addEventListener("change", on)
    return () => m.removeEventListener("change", on)
  }, [])
  return v
}

function Created({ f }: { f: ServiceForm }) {
  const ref = React.useRef<HTMLHeadingElement>(null)
  React.useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <div
      className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center"
      role="status"
    >
      <span className="grid size-14 place-items-center rounded-full bg-success/15 text-success">
        <CheckIcon className="size-7" />
      </span>
      <h1 ref={ref} tabIndex={-1} className="text-2xl font-semibold tracking-tight outline-none">
        Registo criado
      </h1>
      <p className="text-muted-foreground">
        {f.d.description} · <span className="font-mono tabular-nums">{eur(f.total)}</span> c/ IVA
      </p>
      <p className="text-sm text-muted-foreground">Exemplo: nada foi enviado.</p>
      <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
        <Button size="lg" className="h-12">
          Abrir registo
        </Button>
        <Button size="lg" variant="outline" className="h-12" onClick={f.startNew}>
          Criar outro
        </Button>
      </div>
    </div>
  )
}

export function ServiceFormPage() {
  const f = useServiceForm()
  const desktop = useIsDesktop()
  // Keep inputs clear of the pinned bar when they take focus.
  React.useEffect(() => {
    document.documentElement.style.scrollPaddingBottom = "8rem"
    return () => {
      document.documentElement.style.scrollPaddingBottom = ""
    }
  }, [])
  if (f.created) return <Created f={f} />
  return desktop ? <DesktopSheet f={f} /> : <PhoneFlow f={f} />
}
