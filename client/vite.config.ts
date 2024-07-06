import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": "https://codex-v2-sp8j.onrender.com",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
