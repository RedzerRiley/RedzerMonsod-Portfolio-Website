import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This matches your GitHub repository name exactly
  base: '/RedzerMonsod-Portfolio-Website/',
});