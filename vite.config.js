import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vijaykumar-karthikeyan.github.io/',  // This is crucial for GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    },
  },
  define: {
    'process.env': {},
    global: 'window',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'esnext',
  },
  server: {
    port: 3000
  }
})