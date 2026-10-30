import * as React from "react"

type Theme = "light" | "dark" | "system"

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: "light" | "dark"
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "clay-ui-theme"

function systemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function readStored(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === "light" || value === "dark" || value === "system") return value
  } catch {
    // Storage can be blocked (private mode, quota); everything still works without it.
  }
  return "light"
}

/**
 * Pair with the inline script from `themeInitScript` in <head>: the script sets the
 * `.dark` class before first paint, this provider keeps it in sync afterwards.
 * Initial state is "light" on both server and client so hydration matches; the real
 * value is read in an effect.
 */
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light")
  const [resolvedTheme, setResolved] = React.useState<"light" | "dark">("light")

  React.useEffect(() => setThemeState(readStored()), [])

  React.useEffect(() => {
    const apply = () => {
      const next = theme === "system" ? systemTheme() : theme
      document.documentElement.classList.toggle("dark", next === "dark")
      setResolved(next)
    }
    apply()
    if (theme !== "system") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [theme])

  const setTheme = React.useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be blocked (private mode, quota); everything still works without it.
    }
    setThemeState(next)
  }, [])

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  )
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

/** Source of the blocking script to inline in <head> (no flash on first paint). */
const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}")||"light";var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})()`

export { ThemeProvider, themeInitScript, useTheme }
