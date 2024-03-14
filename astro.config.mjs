const isDev = process.env.NODE_ENV === "development";

import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), ...(isDev ? [keystatic()] : [])],
  output: isDev ? "hybrid" : "static",
});
