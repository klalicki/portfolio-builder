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
        targetWidth: fields.number({
          label: "Tile Width (px)",
          description:
            "The width the tiles will try to be if there is enough space",
          validation: { isRequired: true, max: 1200, min: 0 },
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
