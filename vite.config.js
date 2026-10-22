import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" so the build works from a GitHub Pages subfolder
export default defineConfig({
  plugins: [react()],
  base: "./",
});
