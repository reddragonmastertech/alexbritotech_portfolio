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
          // Core dependencies
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          
          // Heavy animations (lazy loaded)
          animations: ['framer-motion', 'gsap'],
          
          // Icons (lazy loaded)
          icons: ['react-icons'],
          
          // Form handling
          forms: ['react-hook-form', '@formspree/react', 'emailjs-com'],
          
          // UI components (lazy loaded)
          ui: ['react-syntax-highlighter', 'react-toastify', 'sonner'],
          
          // Mobile-specific optimizations
          mobile: ['./src/hooks/useMobile.js', './src/components/Layout/MobilePreloader.jsx']
        },
      },
    },
    sourcemap: false,
    minify: "terser",
    target: "es2020", // Better mobile support
    chunkSizeWarningLimit: 500, // Smaller chunks for mobile
    
    // Mobile-first optimizations
    cssCodeSplit: true,
    assetsInlineLimit: 2048, // Smaller inline limit for mobile
    
    // Terser options for better mobile performance
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      mangle: {
        safari10: true,
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
    exclude: ["lucide-react", "gsap"], // Exclude heavy deps from pre-bundling
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
