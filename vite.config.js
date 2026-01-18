import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: false, // Set to true if you want it to fail instead of trying next port
  },
  build: {
    sourcemap: false,
    target: "es2020",
  }
});
