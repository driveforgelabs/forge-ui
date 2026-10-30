import { expect, type Page, test } from "@playwright/test"

const open = async (page: Page) => {
  await page.goto("/#service-form")
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1)
}
const noOverflow = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)

test.describe("service form, desktop", () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  test("has one h1, no overflow, and every input has an accessible name", async ({ page }) => {
    await open(page)
    expect(await noOverflow(page)).toBe(true)
    const unlabelled = await page.evaluate(
      () =>
        [...document.querySelectorAll("main input, main textarea")].filter((e) => {
          const id = e.id
          return !(
            e.getAttribute("aria-label") ||
            e.getAttribute("aria-labelledby") ||
            (id && document.querySelector(`label[for="${id}"]`)) ||
            e.closest("label")
          )
        }).length,
    )
    expect(unlabelled).toBe(0)
  })

  test("typing replaces a numeric field and updates the total", async ({ page }) => {
    await open(page)
    const hours = page.getByLabel("Horas de mão de obra").first()
    await hours.click()
    await hours.pressSequentially("2")
    await expect(hours).toHaveValue("2")
    await expect(page.getByText("Total c/ IVA")).toBeVisible()
  })

  test("a new job focuses its title, inherits the mechanic and shows no premature errors", async ({
    page,
  }) => {
    await open(page)
    await page.getByRole("button", { name: "Adicionar trabalho" }).click()
    await expect(page.getByLabel("Título do trabalho").last()).toBeFocused()
    await expect(page.getByRole("combobox", { name: "Mecânico" }).last()).toContainText("Rui")
    await expect(page.locator("[aria-invalid=true]")).toHaveCount(0)
  })

  test("Enter in a price field adds a part row and focuses its name", async ({ page }) => {
    await open(page)
    const before = await page.getByLabel("Preço unitário").count()
    const price = page.getByLabel("Preço unitário").first()
    await price.focus()
    await price.press("Enter")
    await expect(page.getByLabel("Preço unitário")).toHaveCount(before + 1)
    await expect(page.getByLabel("Nome da peça").nth(1)).toBeFocused()
  })

  test("invalid submit: one summary, focus on the first error, clears while typing, no premature errors afterwards", async ({
    page,
  }) => {
    await open(page)
    await page.getByRole("button", { name: "Adicionar trabalho" }).click()
    await page.getByRole("button", { name: "Criar registo" }).click()
    await expect(
      page.getByRole("alert").filter({ hasText: "Falta 1 campo obrigatório" }),
    ).toBeVisible()
    await expect(page.locator("[data-sonner-toast]").filter({ hasText: "Falta" })).toHaveCount(0)
    await expect(page.getByLabel("Título do trabalho").last()).toBeFocused()
    await expect(page.getByLabel("Título do trabalho").last()).toHaveAttribute(
      "aria-invalid",
      "true",
    )
    await page.keyboard.type("Alinhamento")
    await expect(page.getByRole("alert").filter({ hasText: "Falta" })).toHaveCount(0)
    await page.getByRole("button", { name: "Adicionar trabalho" }).click()
    await expect(page.locator("[aria-invalid=true]")).toHaveCount(0)
  })

  test("deleting a job moves focus, and undo restores it", async ({ page }) => {
    await open(page)
    const jobs = await page.getByRole("button", { name: /Eliminar trabalho/ }).count()
    await page
      .getByRole("button", { name: /Eliminar trabalho/ })
      .first()
      .click()
    await expect(page.getByRole("button", { name: /Eliminar trabalho/ })).toHaveCount(jobs - 1)
    await expect(page.locator("#f-add-job")).toBeFocused()
    await page.getByRole("button", { name: "Anular" }).click()
    await expect(page.getByRole("button", { name: /Eliminar trabalho/ })).toHaveCount(jobs)
  })

  test("deleting a part moves focus to that job's add button", async ({ page }) => {
    await open(page)
    await page.getByRole("button", { name: /^Remover Filtro de óleo/ }).click()
    await expect(page.locator("[id$='-add-part']").first()).toBeVisible()
    expect(await page.evaluate(() => document.activeElement?.id)).toContain("-add-part")
  })

  test("prices format on blur", async ({ page }) => {
    await open(page)
    const price = page.getByLabel("Preço unitário").first()
    await price.click()
    await price.pressSequentially("9.5")
    await price.press("Tab")
    await expect(price).toHaveValue("9.50")
  })

  test("the stock picker is wide and shows the price", async ({ page }) => {
    await open(page)
    await page.getByRole("combobox").filter({ hasText: "Adicionar peça do stock" }).first().click()
    const pop = page.locator("[data-slot=popover-content]").first()
    await expect(pop).toContainText("€")
    expect((await pop.boundingBox())?.width ?? 0).toBeGreaterThanOrEqual(360)
  })

  test("totals detail hides profit until expanded", async ({ page }) => {
    await open(page)
    await page.getByRole("button", { name: /Detalhe/ }).click()
    await expect(page.getByText("Lucro bruto")).toBeHidden()
    await page.getByRole("button", { name: /Rentabilidade/ }).click()
    await expect(page.getByText("Lucro bruto")).toBeVisible()
  })

  test("the draft survives a reload and can be discarded", async ({ page }) => {
    await open(page)
    await page.getByLabel("Descrição do serviço").fill("Teste de rascunho")
    await expect(page.getByRole("status").first()).toContainText("Rascunho guardado")
    await page.reload()
    await expect(page.getByLabel("Descrição do serviço")).toHaveValue("Teste de rascunho")
    await expect(
      page.locator("[data-sonner-toast]").filter({ hasText: "Rascunho restaurado" }),
    ).toBeVisible()
    await page.getByRole("button", { name: "Descartar" }).click()
    await expect(page.getByLabel("Descrição do serviço")).not.toHaveValue("Teste de rascunho")
  })
})

test.describe("service form, phone", () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test("steps are all reachable and the layout never overflows", async ({ page }) => {
    await open(page)
    expect(await noOverflow(page)).toBe(true)
    for (const step of ["Cliente", "Pedido", "Trabalhos", "Rever"]) {
      // biome-ignore lint/performance/noAwaitInLoops: the steps must be visited in order
      await page.getByRole("button", { name: step, exact: true }).click()
      expect(await noOverflow(page)).toBe(true)
    }
  })

  test("hours use the decimal keypad and typing replaces the value", async ({ page }) => {
    await open(page)
    await page.getByRole("button", { name: "Trabalhos", exact: true }).click()
    const hours = page.locator("input[id$='-hours']").first()
    await expect(hours).toHaveAttribute("inputmode", "decimal")
    await hours.click()
    await hours.pressSequentially("3")
    await expect(hours).toHaveValue("3")
  })

  test("part quantity can be stepped, and a new job focuses its title above the pinned bar", async ({
    page,
  }) => {
    await open(page)
    await page.getByRole("button", { name: "Trabalhos", exact: true }).click()
    const qty = page.locator("#part-1-qty")
    await expect(qty).toHaveValue("1")
    await page.getByRole("button", { name: "Mais" }).first().click()
    await expect(qty).toHaveValue("2")
    await page.getByRole("button", { name: "Adicionar trabalho" }).click()
    await expect
      .poll(() => page.evaluate(() => document.activeElement?.id ?? ""))
      .toMatch(/-title$/)
    const clear = await page.evaluate(() => {
      const bar = document.querySelector(".fixed.bottom-0")
      const el = document.activeElement
      return !!bar && !!el && el.getBoundingClientRect().bottom <= bar.getBoundingClientRect().top
    })
    expect(clear).toBe(true)
  })

  test("review rows jump to and focus the field; an invalid submit lands on the right step", async ({
    page,
  }) => {
    await open(page)
    await page.getByRole("button", { name: "Saltar para Rever" }).click()
    expect(await noOverflow(page)).toBe(true)
    await page.getByRole("button", { name: /Trabalho 2/ }).click()
    await expect
      .poll(() => page.evaluate(() => document.activeElement?.id ?? ""))
      .toMatch(/-title$/)
    await page.getByLabel("Título").first().fill("")
    await page.getByRole("button", { name: "Saltar para Rever" }).click()
    await page.getByRole("button", { name: "Criar registo" }).click()
    await expect(page.getByRole("heading", { name: /Que trabalhos/ })).toBeVisible()
    await expect(page.getByRole("alert").filter({ hasText: "Falta" })).toBeVisible()
  })

  test("undo toast action is at least 44px tall, and creating shows a success screen", async ({
    page,
  }) => {
    await open(page)
    await page.getByRole("button", { name: "Trabalhos", exact: true }).click()
    await page.getByRole("button", { name: /Eliminar trabalho 2/ }).click()
    const action = page.locator("[data-sonner-toast] [data-button]").first()
    await expect(action).toBeVisible()
    expect((await action.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(44)
    await action.click()
    await expect(page.getByRole("button", { name: /Eliminar trabalho 2/ })).toHaveCount(1)
    await page.getByRole("button", { name: "Saltar para Rever" }).click()
    await page.getByRole("button", { name: "Criar registo" }).click()
    await expect(page.getByRole("heading", { name: "Registo criado" })).toBeFocused()
    await page.getByRole("button", { name: "Criar outro" }).click()
    await expect(page.getByText("Qual é o veículo?")).toBeVisible()
  })
})
