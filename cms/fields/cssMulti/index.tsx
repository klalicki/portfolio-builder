import { fields, type ComponentSchema } from "@keystatic/core";

export function cssMulti({
  label,
  params,
}: {
  label: string;
  params: { cssName: string; label: string; defaultVal: string }[];
}) {
  const newFields: Record<string, ComponentSchema> = {};
  params.forEach((item) => {
    newFields[item.cssName] = fields.text({
      label: item.label,
      defaultValue: item.defaultVal,
    });
  });

  return fields.object(newFields, { label: "asst css fields" });
}
