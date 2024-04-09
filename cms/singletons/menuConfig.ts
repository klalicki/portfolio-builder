import { singleton, fields } from "@keystatic/core";
import { customFields } from "../fields";

export const menuConfig = singleton({
  label: "Menu",
  format: { data: "json" },
  path: "src/settings/menu",
  schema: {
    position: fields.conditional(
      fields.select({
        label: "Menu Position",
        options: [
          { label: "Side", value: "side" },
          { label: "Top", value: "top" },
        ],
        defaultValue: "side",
      }),
      {
        side: fields.object({
          u: customFields.uniquify({ label: "u" }),
          layout: fields.object(
            { width: customFields.cssFlex({ label: "Width" }) },
            { label: "Layout" }
          ),
        }),
        top: fields.object({
          u: customFields.uniquify({ label: "u" }),
        }),
      }
    ),
    appearance: fields.object({
      backgroundColor: customFields.colorPicker({
        label: "Background Color",
        allowAlpha: true,
      }),
      dropdownColor: customFields.colorPicker({
        label: "Dropdown Color",
        allowAlpha: true,
      }),
    }),
  },
});
