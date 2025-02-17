import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Set correct base path for GitHub Pages
  server: {
    port: 3000,
    strictPort: true,
    host: true
  }
})
