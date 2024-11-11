import { fields, type ComponentSchema } from "@keystatic/core";
import { colorPicker, cssUnit } from "..";
import fontSettings from "../../../src/settings/fonts.json";

const loadedFontOptions = fontSettings.fontLibrary.map((item) => {
  return { label: item.fontName, value: item.uniqueID };
});
const fontOptions = [
  { label: "Default Font", value: "0" },
  ...loadedFontOptions,
];

export function typeProps({ label }: { label: string }) {
  const typeOptionsObj = fields.object(
    {
      fontFamily: {
        ...fields.select({
          label: "Font Family",
          options: fontOptions,
          defaultValue: "0",
        }),
        parse(value: string) {
          console.log("parsing: " + value);
          const isValidFont = fontOptions.find((item) => {
            return item.value === value;
          });
          return isValidFont ? value : "0";
        },
      },
      fontWeight: fields.select({
        label: "Font Weight",

        options: [
          { label: "100", value: "100" },
          { label: "Light (200)", value: "200" },
          { label: "300", value: "300" },
          { label: "Regular (400)", value: "400" },
          { label: "500", value: "500" },
          { label: "Bold (700)", value: "700" },
          { label: "800", value: "800" },
          { label: "900", value: "900" },
        ],
        defaultValue: "400",
      }),
      fontStyle: fields.select({
        label: "Font Style",
        options: [
          { label: "Regular", value: "normal" },
          { label: "Italic", value: "italic" },
        ],
        defaultValue: "normal",
      }),
      fontSize: cssUnit({
        label: "Font Size",
        isCompact: true,
        limitUnits: ["px", "rem"],
      }),

      lineHeight: fields.number({ label: "Line Height", defaultValue: 1.25 }),
      color: colorPicker({
        label: "Text Color",
        compact: true,
        defaultValue: "#000000",
      }),
      marginTop: cssUnit({
        label: "Space Above",
        isCompact: true,

        limitUnits: ["px", "em", "rem"],
      }),
      marginBottom: cssUnit({
        label: "Space Below",
        isCompact: true,
        limitUnits: ["px", "em", "rem"],
      }),
      underline: fields.checkbox({ label: "Underline", defaultValue: false }),
    },
    { label: label, layout: [2, 2, 2, 4, 2, 4, 4, 4, 12] },
  );
  // console.log(typeOptionsObj);
  return typeOptionsObj;
}
