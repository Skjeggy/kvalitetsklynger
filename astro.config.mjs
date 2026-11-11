import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { site } from "./site.config.mjs";

export default defineConfig({
  site: site.nettadresse,
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap({ filter: (side) => !side.includes("/404") })],
  build: { format: "directory" },
  // Ingen innebygde skript, så Content-Security-Policy kan nekte inline-JavaScript.
  vite: { build: { assetsInlineLimit: 0 } },
});
