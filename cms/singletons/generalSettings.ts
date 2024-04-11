import { fields, singleton } from "@keystatic/core";
import * as customFields from "../fields";
export const generalSettings = singleton({
  label: "General Settings",
  path: "src/settings/general",
  format: { data: "json" },
  schema: {
    favicon: fields.image({
      label: "Favicon",
      description:
        "Upload a favicon for this page - it will automatically be resized to the correct size",
      directory: "src/assets/images/general",
      publicPath: "../assets/images/general/",
    }),
    customCSS: customFields.codeEditor({
      label: "Site-Wide custom CSS",
      language: "css",
      wrap: true,
    }),
  },
});
