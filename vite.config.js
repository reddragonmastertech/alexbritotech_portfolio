import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Bỏ qua các warning không quan trọng
        if (warning.code === "UNRESOLVED_IMPORT") return;
        if (warning.code === "CIRCULAR_DEPENDENCY") return;
        warn(warning);
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion', 'gsap'],
          icons: ['react-icons'],
          routing: ['react-router-dom'],
          forms: ['react-hook-form', '@formspree/react', 'emailjs-com'],
          ui: ['react-syntax-highlighter', 'react-toastify', 'sonner']
        },
      },
    },
    sourcemap: false,
    minify: "terser",
    target: "es2015",
    chunkSizeWarningLimit: 1000,
    // Optimizations for faster builds
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion"],
    exclude: ["lucide-react"],
  },
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // Performance optimizations
  server: {
    hmr: {
      overlay: false
    }
  }
});
