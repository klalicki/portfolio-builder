import { collection, fields, singleton } from "@keystatic/core";
import * as customFields from "../fields";

const fontPicker = (label: string) => {
  return fields.object(
    {
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
    },
    { label: label, layout: [6, 6] }
  );
};

export const fonts = singleton({
  label: "Link Fonts (Google or Adobe)",
  format: { data: "json" },

  path: "src/settings/fonts",
  schema: {
    font1: fontPicker("Font 1"),
    font2: fontPicker("Font 2"),
    font3: fontPicker("Font 3"),
  },
});
