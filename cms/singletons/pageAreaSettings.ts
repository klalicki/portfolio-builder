import { singleton, fields } from "@keystatic/core";
import { customFields } from "../fields";

export const pageArea = singleton({
  label: "Page/Project Page",
  format: { data: "json" },
  path: "src/settings/pageArea",
  schema: {
    pageWidth: customFields.cssUnit({
      label: "Maximum Page Content Width",
      defaultValue: "800px",
    }),
    padding: fields.object(
      {
        horizontal: customFields.cssUnit({
          label: "Sides",
          defaultValue: "1rem",
        }),
        vertical: customFields.cssUnit({
          label: "Top/Bottom",
          defaultValue: "1rem",
        }),
      },
      { label: "Page Area Padding" }
    ),
  },
});
