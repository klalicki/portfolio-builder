import type { BasicFormField, FormFieldStoredValue } from "@keystatic/core";
import { FieldPrimitive } from "@keystar/ui/field";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { getCollection } from "astro:content";
import { useEffect } from "react";
function parseAsNormalField(value: FormFieldStoredValue) {
  if (value === undefined) {
    return "";
  }
  if (typeof value !== "string") {
    throw new Error("Must be a string");
  }
  return value;
}

export function slugPicker({
  label,
  defaultValue,
  description,
}: {
  label: string;
  defaultValue?: string;
  description?: string;
}): BasicFormField<string> {
  return {
    // not sure what this one does? why is its only value 'form'?
    kind: "form",
    // not sure what this one does?
    formKind: undefined,
    label,
    // Input is a React component that includes the props value and onChange.
    // from what I can tell, value is the value that keystatic loads from the file
    // and onChange is a function that takes one argument - the new value for the field
    Input(props) {
      return (
        <FieldPrimitive description={description} label={label}>
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <HexColorPicker color={props.value} onChange={props.onChange} />
            <HexColorInput
              color={props.value}
              name={label + " hex"}
              onChange={props.onChange}
            />
          </div>

          {/* <input
            type="color"
            value={props.value}
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
          /> */}
        </FieldPrimitive>
      );
    },
    // i think this is a function that sets the default value of the field - in this case falls back to blank if no defaultValue is given
    defaultValue() {
      return defaultValue || "";
    },
    // i think this function decodes the value from a string into its working type
    parse(value) {
      return parseAsNormalField(value);
    },
    // i think this function takes the value from its working type and encodes it into a string?
    serialize(value) {
      return { value: value === "" ? "" : value };
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
