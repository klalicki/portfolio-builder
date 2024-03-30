import { singleton, fields } from "@keystatic/core";

export const menuConfig = singleton({
  label: "Menu",
  format: { data: "json" },
  path: "src/settings/menu",
  schema: {
    position: fields.select({
      label: "Menu Position",
      options: [
        { label: "Sidebar", value: "sidebar" },
        { label: "Top bar", value: "top" },
        {
          label: "Sticky Topbar",
          value: "sticky",
        },
        { label: "Hamburger", value: "hamburger" },
      ],
      defaultValue: "sidebar",
    }),
  },
});
