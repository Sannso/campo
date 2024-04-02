import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import react from "@astrojs/react";
import db from "@astrojs/db";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), compress(), react(), db()],
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    optimizeDeps:{
      exclude:["oslo"]
    }
  }
});