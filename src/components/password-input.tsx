import { EyeIcon, EyeOffIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

/** Password field with a show/hide toggle. */
function PasswordInput(props: Omit<React.ComponentProps<"input">, "type">) {
  const [show, setShow] = React.useState(false)
  return (
    <InputGroup data-slot="password-input">
      <InputGroupInput
        {...props}
        type={show ? "text" : "password"}
        autoComplete={props.autoComplete ?? "current-password"}
      />
      <InputGroupAddon align="inline-end">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={show ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
          aria-pressed={show}
          onClick={() => setShow((s) => !s)}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { PasswordInput }
