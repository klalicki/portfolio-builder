import { collection, fields, singleton } from "@keystatic/core";
import * as customFields from "../fields";

const fontLoader = fields.object({
  fontName: fields.text({
    label: "Font Name",
    description: "this is the name you will use to select this font",
  }),
  uniqueID: customFields.uniquify({ label: "unique ID" }),
  mode: fields.conditional(
    fields.select({
      label: "Font Type",
      options: [
        { label: "Remote Font (Google Fonts or similar)", value: "remote" },
        { label: "Self-Hosted Font", value: "local" },
      ],
      defaultValue: "remote",
    }),
    {
      local: fields.empty(),
      remote: fields.object({
        htmlLink: customFields.codeEditor({
          label: "HTML <link> code",
          description:
            "Copy the <link> embed code from Google Fonts or another platform and paste it here. You only need the third line from Google Fonts.",
          wrap: true,
          height: "10rem",
        }),
        fontFamily: fields.text({
          label: "font-family",
          description:
            'The font-family line from Google Fonts. This should look like "DM Sans", sans-serif',
        }),
      }),
    },
  ),
});

export const fonts = singleton({
  label: "Link Fonts (Google or Adobe)",
  format: { data: "json" },

  path: "src/settings/fonts",
  schema: {
    fontLibrary: fields.array(fontLoader, {
      itemLabel: (props) => props.fields.fontName.value,
    }),
  },
});
