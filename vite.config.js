import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // This ensures assets are loaded from the subfolder
  base: '/RedzerMonsod-Portfolio-Website/', 
});