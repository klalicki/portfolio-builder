import { fields, type ComponentSchema } from "@keystatic/core";
import { colorPicker, cssUnit } from "..";
export function typeProps({ label }: { label: string }) {
  const typeOptionsObj = fields.object(
    {
      fontFamily: fields.select({
        label: "Font Family",
        options: [
          { label: "Font 1", value: "fontStack1" },
          { label: "Font 2", value: "fontStack2" },
          { label: "Font 3", value: "fontStack3" },
        ],
        defaultValue: "fontStack1",
      }),
      fontWeight: fields.select({
        label: "Font Weight",

        options: [
          { label: "Light", value: "200" },
          { label: "Regular", value: "400" },
          { label: "Bold", value: "700" },
        ],
        defaultValue: "400",
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
    },
    { label: label, layout: [3, 3, 4, 2, 4, 4, 4] }
  );
  // console.log(typeOptionsObj);
  return typeOptionsObj;
}