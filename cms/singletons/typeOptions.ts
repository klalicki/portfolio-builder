import { fields, singleton } from "@keystatic/core";
import { typeProps } from "../fields/fieldGroups/typeProps";
import { cssUnit } from "../fields";
export const typeOptions = singleton({
  label: "Typography Options",
  format: { data: "json" },
  path: "src/settings/typeOptions",
  schema: {
    general: fields.object(
      {
        baseFontSizeSm: cssUnit({
          label: "Base Font Size (Small Screens)",
          description:
            "This is the font size that rem units are based on for smaller devices like phones",
        }),
        baseFontSizeLg: cssUnit({
          label: "Base Font Size (Large Screens)",
          description:
            "This is the font size that rem units are based on for larger devices like computers",
        }),
      },
      { label: "General Settings", layout: [6, 6] }
    ),
    h1: typeProps({ label: "Heading 1" }),
    h2: typeProps({ label: "Heading 2" }),
    p: typeProps({ label: "Body Text" }),
  },
});
