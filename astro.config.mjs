const urlBase = process.env.BASE_URL || "";
const isDev = process.env.NODE_ENV === "development";
// const isDev = false;

import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import AutoImport from "astro-auto-import";

// https://astro.build/config
export default defineConfig({
  integrations: [markdoc(), ...(isDev ? [react(), keystatic()] : [])],

  output: isDev ? "hybrid" : "static",
  scopedStyleStrategy: "class",
});
