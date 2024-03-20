import type { BasicFormField, FormFieldStoredValue } from "@keystatic/core";
import { useState } from "react";

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
      const [blurred, setBlurred] = useState(false);

      return (
        <div>
          <p>My custom input</p>
          <input
            type="color"
            autoFocus={props.autoFocus}
            value={props.value}
            onBlur={() => {
              setBlurred(true);
            }}
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
          />
          <input type="text" value={props.value} />
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
