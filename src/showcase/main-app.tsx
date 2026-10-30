import * as React from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider, useTheme } from "@/components/theme-provider"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { pages } from "./pages"

const readHash = () => window.location.hash.slice(1) || pages[0].id

function useHash() {
  const [hash, setHash] = React.useState(readHash)
  React.useEffect(() => {
    const on = () => setHash(readHash())
    window.addEventListener("hashchange", on)
    return () => window.removeEventListener("hashchange", on)
  }, [])
  return hash
}

// Stock sonner reads next-themes; pass the resolved theme explicitly instead.
function ToasterWithTheme() {
  const { resolvedTheme } = useTheme()
  const [wide, setWide] = React.useState(() => window.matchMedia("(min-width: 768px)").matches)
  React.useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)")
    const on = () => setWide(m.matches)
    m.addEventListener("change", on)
    return () => m.removeEventListener("change", on)
  }, [])
  // Bottom bars are pinned on these pages: desktop toasts sit above the bar, phone toasts go to the top.
  return (
    <Toaster
      theme={resolvedTheme}
      position={wide ? "bottom-right" : "top-center"}
      offset={wide ? { bottom: 88, right: 16 } : 16}
      toastOptions={{ classNames: { actionButton: "!h-11 !min-w-20 !px-4 !text-sm" } }}
    />
  )
}

export function App() {
  const hash = useHash()
  const page = pages.find((p) => p.id === hash) ?? pages[0]
  const Page = page.component

  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="px-4 py-3 text-sm font-semibold">Clay UI</SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Components</SidebarGroupLabel>
                <SidebarMenu>
                  {pages.map((p) => (
                    <SidebarMenuItem key={p.id}>
                      <SidebarMenuButton asChild isActive={p.id === page.id}>
                        <a href={`#${p.id}`}>{p.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-14 items-center gap-2 border-b px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-4" />
              <div className="flex-1 text-sm font-medium">{page.title}</div>
              <ModeToggle />
            </header>
            <main className="min-w-0 space-y-8 p-4 md:p-6" data-page={page.id}>
              <React.Suspense
                fallback={
                  <p className="text-sm text-muted-foreground" role="status">
                    A carregar…
                  </p>
                }
              >
                <Page />
              </React.Suspense>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
      <ToasterWithTheme />
    </ThemeProvider>
  )
}
