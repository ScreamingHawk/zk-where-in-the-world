import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://where-in-the-world.standen.link",
  plugins: [react(), nodePolyfills()],
  server: {
    port: 4444,
  },
});
