import {
  fields,
  singleton,
  type BasicFormField,
  BlockWrapper,
} from "@keystatic/core";
import { customFields } from "../fields";
import { typeProps } from "../fields/fieldGroups/typeProps";

export const portfolioLayouts = singleton({
  label: "Portfolio Layout Settings",
  format: { data: "json" },
  path: "src/settings/portfolioLayouts",
  schema: {
    coolTile: fields.object(
      {
        container: fields.object(
          {
            width: customFields.cssUnit({
              label: "Container Width",
              description: "The maximum width the portfolio group can be",
              defaultValue: "1000px",
              isCompact: true,
            }),
            padding: customFields.cssUnit({
              label: "Container Padding",
              description: "The space around the edge of the portfolio grid",
              defaultValue: "1rem",
              limitUnits: ["px", "rem", "em"],
              isCompact: true,
            }),
            gap: customFields.cssUnit({
              label: "Gap",
              description: "The gap between projects in this layout",
              defaultValue: "0px",
              limitUnits: ["px", "rem", "em"],
              isCompact: true,
            }),
          },
          { layout: [4, 4, 4] }
        ),
        tiles: fields.object(
          {
            aspectRatio: fields.text({
              label: "Tile Aspect Ratio",
              description:
                "This can be either a number (1 is square, higher than 1 is a horizontal rectangle), or a ratio ie 3/2",
              defaultValue: "3/2",
            }),

            // minTileWidth: customFields.cssFlex({ label: "Tile Width" }),
            minWidth: fields.number({
              label: "min tile Width (px)",
              description: "The minimum width the tiles will be",
              validation: { isRequired: true, max: 1200, min: 0 },
            }),
            overlayInset: customFields.cssUnit({
              isCompact: true,
              label: "Overlay Inset",
              defaultValue: "1rem",
            }),

            overlayColor: customFields.colorPicker({
              label: "Overlay Color",
              defaultValue: "#000000",
              compact: true,
            }),
            useProjectColor: fields.checkbox({
              label: "Use Project Accent Color",
            }),
            overlayPadding: customFields.cssUnit({
              isCompact: true,
              label: "Overlay Padding",
              defaultValue: "1rem",
            }),

            overlayOpacity: fields.number({
              label: "Overlay Opacity %",
              validation: { min: 0, max: 100 },
            }),
          },
          { layout: [4, 3, 5, 3, 2, 4, 3] }
        ),

        typography: fields.object(
          {
            title: typeProps({ label: "Project Title" }),
            line2: typeProps({ label: "Line 2" }),
            line3: typeProps({ label: "Line 3" }),
          },
          { label: "Typography" }
        ),
      },

      {
        label: "'Cool Tile' Layout",
      }
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
