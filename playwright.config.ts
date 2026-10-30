import process from "node:process"
import { defineConfig } from "@playwright/test"

// Tests run against the production build served by `vite preview`.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  workers: process.env["CI"] ? 2 : 4,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 1 : 0,
  reporter: process.env["CI"] ? [["github"], ["list"]] : "list",
  use: { baseURL: "http://localhost:4173", trace: "retain-on-failure" },
  webServer: {
    command: "pnpm build && pnpm exec vite preview --port 4173 --strictPort",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env["CI"],
    timeout: 120_000,
  },
})
