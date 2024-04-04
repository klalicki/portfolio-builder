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
    images: fields.object({
      displayWidth: customFields.cssUnit({
        label: "Image Width",
        description:
          "The width that default images are displayed at in project pages.",
        defaultValue: "900px",
      }),
      optimizationWidth: fields.number({
        label: "Image Optimization Width",
        description:
          "Uploaded images are automatically resized to improve performance. This is the width they are automatically scaled to. This should be greater than your page content width, or else images may appear blurry",
      }),
    }),
  },
});
