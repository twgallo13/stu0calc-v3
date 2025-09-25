import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Fix: Define `__dirname` for ES module scope, as it's not available by default.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  // Explicitly set the project root to the 'apps/web' directory
  root: __dirname,
  plugins: [react()],
  server: {
    // Port for the frontend dev server
    port: 5173,
    proxy: {
      // Proxy API requests to the backend
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    // Set the output directory relative to the project root
    outDir: path.resolve(__dirname, 'dist')
  }
})
