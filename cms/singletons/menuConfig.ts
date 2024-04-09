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

          menuBarText: fields.text({
            label: "Menu Bar Text",
            description:
              "The line of text that appears on the left side of the menu bar. Probably your name",
          }),
        }),
      }
    ),
    appearance: fields.object({
      topBarHeight: customFields.cssUnit({
        label: "minimum height for menu when it appears as a top bar",
        defaultValue: "45px",
        limitUnits: ["px", "rem"],
      }),
      backgroundColor: customFields.colorPicker({
        label: "Background Color",
        allowAlpha: true,
      }),
      dropdownColor: customFields.colorPicker({
        label: "Dropdown Color",
        allowAlpha: true,
      }),
    }),
    typography: fields.object({
      menuMain: customFields.typeProps({ label: "Main menu items" }),
      menuSub: customFields.typeProps({ label: "Sub-items" }),
      menuText: customFields.typeProps({ label: "Menu Bar text" }),
    }),
  },
});
