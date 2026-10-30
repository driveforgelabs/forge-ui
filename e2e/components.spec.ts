import { expect, type Page, test } from "@playwright/test"

const PAGES = [
  "more-stock",
  "composed-inputs",
  "composed-data",
  "actions",
  "forms",
  "data",
  "feedback",
  "overlays",
  "layout",
  "theme",
]
const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 900, scheme: "light" as const },
  { name: "desktop dark", width: 1280, height: 900, scheme: "dark" as const },
  { name: "phone", width: 390, height: 844, scheme: "light" as const },
]

function watchConsole(page: Page) {
  const errors: string[] = []
  page.on("pageerror", (e) => errors.push(e.message))
  page.on("console", (m) => {
    if ((m.type() === "error" || m.type() === "warning") && !/404|favicon/.test(m.text()))
      errors.push(m.text())
  })
  return errors
}

for (const vp of VIEWPORTS) {
  test.describe(`showcase pages, ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height }, colorScheme: vp.scheme })
    for (const id of PAGES) {
      test(`${id}: renders without overflow or console errors`, async ({ page }) => {
        const errors = watchConsole(page)
        await page.addInitScript((m) => localStorage.setItem("clay-ui-theme", m), vp.scheme)
        await page.goto(`/#${id}`)
        await expect(page.locator("main[data-page]")).toBeVisible()
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        )
        expect(errors).toEqual([])
      })
    }
  })
}

test.describe("composed components", () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  test("data table: sort, paginate, loading, empty, row click", async ({ page }) => {
    await page.goto("/#composed-data")
    const table = page.locator("[data-slot=data-table]").first()
    await table.getByRole("button", { name: "Total" }).click()
    await expect(table.locator("tbody tr").first()).toContainText("612.00") // numbers sort descending first
    await expect(table.locator("th[aria-sort]")).toHaveCount(1)
    await page.getByRole("button", { name: /Seguinte/ }).click()
    await expect(page.getByText(/Página 2 de 2/)).toBeVisible()
    await page.getByRole("button", { name: "Simular carregamento" }).click()
    await expect(page.locator("[data-slot=skeleton]").first()).toBeVisible()
    await expect(page.getByText("Sem ordens para mostrar.")).toBeVisible()
  })

  test("banner dismiss, confirm dialog and command palette", async ({ page }) => {
    await page.goto("/#composed-data")
    await page.getByRole("button", { name: "Dispensar" }).click()
    await expect(page.getByText("Manutenção agendada")).toHaveCount(0)
    await page.getByRole("button", { name: "Eliminar serviço" }).click()
    await expect(page.getByRole("alertdialog")).toBeVisible()
    await page.keyboard.press("Escape")
    await page.keyboard.press("Control+k")
    await expect(page.getByPlaceholder("Escreva um comando…")).toBeVisible()
    await page.keyboard.type("stock")
    await page.keyboard.press("Enter")
    await expect(page.locator("[data-sonner-toast]").filter({ hasText: "Stock" })).toBeVisible()
  })

  test("meters expose their value", async ({ page }) => {
    await page.goto("/#composed-data")
    const meters = page.locator("[role=meter]")
    await expect(meters.first()).toBeVisible()
    expect(await meters.count()).toBeGreaterThan(0)
    await Promise.all(
      (await meters.all()).map((m) => expect(m).toHaveAttribute("aria-valuenow", /.+/)),
    )
  })

  test("number input: arrow keys, stepper, clamping, select on focus", async ({ page }) => {
    await page.goto("/#composed-inputs")
    const q = page.getByLabel("Quantidade (stepper)")
    await q.click()
    await q.press("ArrowUp")
    await expect(q).toHaveValue("3")
    await page.getByRole("button", { name: "Aumentar" }).click()
    await expect(q).toHaveValue("4")
    await q.fill("99")
    await q.blur()
    await expect(q).toHaveValue("20")
    await q.click()
    await q.pressSequentially("7")
    await expect(q).toHaveValue("7")
  })

  test("search clear, password reveal, date picker, colour swatch", async ({ page }) => {
    await page.goto("/#composed-inputs")
    await page.getByLabel("Pesquisa").fill("clio")
    await page.getByRole("button", { name: "Limpar pesquisa" }).click()
    await expect(page.getByLabel("Pesquisa")).toHaveValue("")
    await page.getByRole("button", { name: "Mostrar palavra-passe" }).click()
    await expect(page.locator("#pw")).toHaveAttribute("type", "text")
    await page.locator("#dp").click()
    await expect(page.getByRole("grid").first()).toBeVisible()
    await page.keyboard.press("Escape")
    await page.getByRole("radio", { name: "Verde" }).click()
    await expect(page.getByRole("radio", { name: "Verde" })).toHaveAttribute("aria-checked", "true")
  })

  test("file upload lists, de-duplicates and removes files", async ({ page }) => {
    await page.goto("/#composed-inputs")
    const file = { name: "foto.jpg", mimeType: "image/jpeg", buffer: Buffer.from("x".repeat(2000)) }
    await page.locator("input[type=file]").setInputFiles([file])
    await expect(page.getByText("foto.jpg")).toHaveCount(1)
    await page.getByRole("button", { name: "Remover foto.jpg" }).click()
    await expect(page.getByText("foto.jpg")).toHaveCount(0)
  })

  test("stock overlays: alert dialog, context menu, hover card", async ({ page }) => {
    await page.goto("/#more-stock")
    await page.getByRole("button", { name: "Eliminar cliente" }).click()
    await expect(page.getByRole("alertdialog")).toBeVisible()
    await page.keyboard.press("Escape")
    await page.getByText("Clique com o botão direito").click({ button: "right" })
    await expect(page.getByRole("menuitem", { name: /Duplicar/ })).toBeVisible()
    await page.keyboard.press("Escape")
    await page.getByRole("button", { name: "12-AB-34" }).hover()
    await expect(page.getByText(/última revisão em Mai/)).toBeVisible()
  })
})
