import type { BasicFormField, FormFieldStoredValue } from "@keystatic/core";

function parseAsNormalField(value: FormFieldStoredValue) {
  if (value === undefined) {
    return "";
  }
  if (typeof value !== "string") {
    throw new Error("Must be a string");
  }
  return value;
}

export function demoField({
  label,
  defaultValue,
  description,
}: {
  label: string;
  defaultValue?: string;
  description?: string;
}): BasicFormField<string> {
  return {
    kind: "form",
    formKind: undefined,
    label,
    Input(props) {
      return (
        <div>
          <p>My custom input</p>
        </div>
      );
    },
    defaultValue() {
      return defaultValue || "";
    },
    parse(value) {
      return parseAsNormalField(value);
    },
    serialize(value) {
      return { value: value === "" ? undefined : value };
    },
    validate(value) {
      return value;
    },
    reader: {
      parse(value) {
        return parseAsNormalField(value);
      },
    },
  };
}
