import {
  fields,
  singleton,
  type BasicFormField,
  BlockWrapper,
} from "@keystatic/core";
import { portfolioComponents } from "../components/portfolioViewComponents";
export const portfolioLayouts = singleton({
  label: "Portfolio Layout Settings",
  // path: "src/content/templateParts/",
  schema: {
    sideBySide: fields.object(
      {
        textArea: fields.markdoc({
          label: "Custom Text Area",
          loc
          components: { ...portfolioComponents },
        }),
      },
      { label: "Side-by-Side layout" }
    ),
  },
});
