import {
  fields,
  singleton,
  type BasicFormField,
  BlockWrapper,
} from "@keystatic/core";
import { customFields } from "../fields";

export const portfolioLayouts = singleton({
  label: "Portfolio Layout Settings",
  format: { data: "json" },
  path: "src/settings/portfolioLayouts",
  schema: {
    coolTile: fields.object(
      {
        containerWidth: customFields.cssUnit({
          label: "Container Width",
          description: "The maximum width the portfolio group can be",
          defaultValue: "1000px",
          isCompact: true,
        }),
        containerPadding: customFields.cssUnit({
          label: "Container Padding",
          description: "The space around the edge of the portfolio grid",
          defaultValue: "1rem",
          limitUnits: ["px", "rem", "em"],
          isCompact: true,
        }),
        itemGap: customFields.cssUnit({
          label: "Gap",
          description: "The gap between projects in this layout",
          defaultValue: "0px",
          limitUnits: ["px", "rem", "em"],
          isCompact: true,
        }),
        tileAspectRatio: fields.text({
          label: "Tile Aspect Ratio",
          description:
            "This can be either a number (1 is square, higher than 1 is a horizontal rectangle), or a ratio ie 3/2",
          defaultValue: "3/2",
        }),

        // minTileWidth: customFields.cssFlex({ label: "Tile Width" }),
        minTileWidth: fields.number({
          label: "min tile Width (px)",
          description: "The minimum width the tiles will be",
          validation: { isRequired: true, max: 1200, min: 0 },
        }),
        overlayColor: customFields.colorPicker({
          label: "Overlay Color",
          defaultValue: "#000000",
          compact: true,
        }),
        useProjectAccentColors: fields.checkbox({
          label: "Use Project Accent Color",
        }),
        projectAccentColorOpacity: fields.number({
          label: "Overlay Opacity %",
          validation: { min: 0, max: 100 },
        }),
      },

      { label: "Cool Tile layout", layout: [4, 4, 4, 3, 1, 4, 3, 1] }
    ),
    sideBySide: fields.object(
      {
        tileAspectRatio: fields.text({
          label: "Tile Aspect Ratio",
          description:
            "This can be either a number (1 is square, higher than 1 is a horizontal rectangle), or a ratio ie 3/2",
          defaultValue: "3/2",
        }),
        itemGap: customFields.cssUnit({
          label: "Gap",
          description: "The gap between projects in this layout",
          defaultValue: "0px",
        }),
      },
      { label: "Side-by-Side layout" }
    ),
  },
});
