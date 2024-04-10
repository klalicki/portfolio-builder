import { singleton, fields } from "@keystatic/core";
import { customFields } from "../fields";

export const menuConfig = singleton({
  label: "Menu",
  format: { data: "json" },
  path: "src/settings/menu",
  schema: {
    siteTitle: fields.text({
      label: "Site Title",
      description:
        "This appears on all menu types at the top left of the menu area",
    }),
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

          alwaysDropdown: fields.checkbox({
            label: "Always use Dropdown",
            description:
              "Use the mobile-style (hamburger) navigation regardless of screen size",
          }),
        }),
      }
    ),
    appearance: fields.object({
      blurBehind: fields.checkbox({ label: "Blur behind menu" }),
    }),
    sizes: fields.object({
      topBarHeight: customFields.cssUnit({
        label: "minimum height for menu when it appears as a top bar",
        defaultValue: "45px",
        limitUnits: ["px", "rem"],
        isCompact: true,
      }),
      topBarPadding: customFields.cssUnit({
        label: "Padding on sides of Top Bar",
        defaultValue: "0.5rem",
        limitUnits: ["px", "rem"],
        isCompact: true,
      }),
      menuPadding: customFields.cssUnit({
        label: "Padding around Menu Items",
        defaultValue: "1rem",
        limitUnits: ["px", "rem"],
        isCompact: true,
      }),
      subItemIndent: customFields.cssUnit({
        label: "Sub-item Indent",
        description: "Indent project pages when they are displayed",
      }),
      // hamburgerSize: customFields.cssUnit({ label: "Hamburger Button Size" }),
    }),
    colors: fields.object(
      {
        backgroundColor: customFields.colorPicker({
          label: "Side/Top bar Background",
          allowAlpha: true,
        }),
        menuHoverColor: customFields.colorPicker({
          label: "Side/Top bar Hover",
          allowAlpha: true,
        }),

        dropdownColor: customFields.colorPicker({
          label: "Dropdown Color",
          allowAlpha: true,
        }),
        dropdownHoverColor: customFields.colorPicker({
          label: "Dropdown Hover Color",
          allowAlpha: true,
        }),
      },
      { layout: [3, 3, 3, 3] }
    ),
    typography: fields.object({
      menuMain: customFields.typeProps({ label: "Main menu items" }),
      menuSub: customFields.typeProps({ label: "Sub-items" }),
      menuText: customFields.typeProps({ label: "Menu Bar text" }),
    }),
  },
});
