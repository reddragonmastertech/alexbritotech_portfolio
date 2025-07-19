import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['framer-motion', 'gsap']
        }
      }
    },
    target: 'esnext',
    minify: 'terser'
  },
  resolve: {
    alias: {
      '@': './src'
    }
  },
  optimizeDeps: {
    include: ['pdfjs-dist/legacy/build/pdf.worker.min.js']
  }
})
