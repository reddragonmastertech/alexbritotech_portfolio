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
      external: (id) => {
        // Loại bỏ các module có thể gây lỗi
        return id.includes("node_modules") && !id.includes(".css");
      },
    },
    sourcemap: false, // Tắt sourcemap để tránh lỗi
    minify: "terser",
    target: "es2015",
    // Tăng memory limit
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    exclude: ["lucide-react"], // Loại bỏ các package có thể gây xung đột
    include: ["react", "react-dom"],
  },
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
