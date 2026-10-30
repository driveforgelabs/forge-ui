import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // react-phone-number-input bundles ~250 flag SVGs (~500 kB); it only loads on the pages that use PhoneInput.
    chunkSizeWarningLimit: 600,
  },
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
})
