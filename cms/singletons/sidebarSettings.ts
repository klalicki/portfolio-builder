import { singleton } from "@keystatic/core";
import * as customFields from "../fields";
export const sidebarSettings = singleton({
  label: "Sidebar Settings",
  format: { data: "json" },

  path: "src/settings/sidebar",
  schema: {
    sidebarWidth: customFields.cssUnit({
      label: "sidebar width",
      defaultValue: "300px",
    }),
  },
});
