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
        minTileWidth: fields.number({
          label: "Tile Width (px)",
          description:
            "The minimum width the tiles will be before wrapping to another line",
          validation: { isRequired: true, max: 1200, min: 0 },
        }),
        containerWidth: customFields.cssUnit({
          label: "Container Width",
          description: "The maximum width the portfolio group can be",
          defaultValue: "1000px",
        }),
      },

      { label: "Cool Tile layout" }
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
