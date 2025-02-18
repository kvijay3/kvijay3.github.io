import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Base URL for GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      // Resolve 'crypto' to the 'crypto-browserify' polyfill for Node.js environments
      crypto: 'crypto-browserify',
    },
  },
  define: {
    // Make 'process.env' available in the build (helps with certain Node.js packages)
    'process.env': {},
    global: 'window', // Forces the 'global' object to be set to 'window' in Node.js environment
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'esnext', // Ensure compatibility with modern JavaScript features
  },
  server: {
    port: 3000
  }
})