import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  server: {
    // Allow Vite dev server to read the docs/ folder living outside site/.
    fs: {
      allow: [resolve(__dirname, '..')]
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
