import { fields, type ComponentSchema } from "@keystatic/core";
import { cssUnit } from "..";
export function typeOptions({ label }: { label: string }) {
  return fields.object(
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
      size:cssUnit({label:'Font Size',limitUnits:['px','rem']})
    },
    { label: label }
  );
}
