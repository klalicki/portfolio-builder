import {
  fields,
  singleton,
  type BasicFormField,
  BlockWrapper,
} from "@keystatic/core";
import { portfolioComponents } from "../components/portfolioViewComponents";
export const portfolioLayouts = singleton({
  label: "Portfolio Layout Settings",
  format: { data: "json" },
  path: "src/settings/portfolioLayouts",
  schema: {
    sideBySide: fields.object(
      {
        tileAspectRatio: fields.text({
          label: "Tile Aspect Ratio",
          description:
            "This can be either a number (1 is square, higher than 1 is a horizontal rectangle), or a ratio ie 3/2",
          defaultValue: "3/2",
        }),
      },
      { label: "Side-by-Side layout" }
    ),
  },
});
