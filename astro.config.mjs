// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import { site } from "./src/data/site.ts";

// https://astro.build/config
export default defineConfig({
  // Single source of truth: change `url` in src/data/site.ts after deploying
  site: site.url,
  // Inline the (small) stylesheet so phones can paint without waiting for a CSS request
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), sitemap()],
});
