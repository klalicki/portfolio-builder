import { fields, type ComponentSchema } from "@keystatic/core";
import { colorPicker, cssUnit } from "..";
export function typeProps({ label }: { label: string }) {
  const typeOptionsObj = fields.object(
    {
      fontFamily: fields.select({
        label: "Font Family",
        options: [
          { label: "Font 1", value: "font1" },
          { label: "Font 2", value: "font2" },
          { label: "Font 2", value: "font3" },
        ],
        defaultValue: "font1",
      }),
      fontSize: cssUnit({ label: "Font Size", limitUnits: ["px", "rem"] }),
      color: colorPicker({ label: "Text Color", defaultValue: "#000000" }),
      marginTop: cssUnit({
        label: "Space Above",
        limitUnits: ["px", "em", "rem"],
      }),
      marginBottom: cssUnit({
        label: "Space Above",
        limitUnits: ["px", "em", "rem"],
      }),
    },
    { label: label }
  );
  console.log(typeOptionsObj);
  return typeOptionsObj;
}
