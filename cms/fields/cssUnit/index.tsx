import type { BasicFormField, FormFieldStoredValue } from "@keystatic/core";
import { FieldPrimitive } from "@keystar/ui/field";

import { Picker, Item } from "@keystar/ui/picker";
import { NumberField } from "@keystar/ui/number-field";

function parseAsNormalField(value: FormFieldStoredValue) {
  if (value === undefined) {
    return "";
  }
  if (typeof value !== "string") {
    throw new Error("Must be a string");
  }
  return value;
}

const stringToUnits = (value: string) => {
  const regex = /^(\d*\.*\d*)(\D*)$/;
  const match = value.match(regex);
  if (match) {
    const number = parseFloat(match[1]);
    const unit = match[2] || "px";
    return { number, unit };
  } else {
    return { number: 0, unit: "px" };
  }
};

export function cssUnit({
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
      const parsed = stringToUnits(props.value);
      const units = [
        { value: "px", label: "px" },
        { value: "%", label: "%" },
        { value: "vw", label: "vw" },
        { value: "vh", label: "vh" },
        { value: "em", label: "em" },
        { value: "rem", label: "rem" },
        { value: "ch", label: "ch" },
      ];
      return (
        <FieldPrimitive description={description} label={label}>
          <div style={{ display: "inline-flex", gap: ".5rem" }}>
            <NumberField
              label={"Value"}
              value={parsed.number}
              onChange={(e) => {
                props.onChange(`${e}${parsed.unit}`);
              }}
            />
            <Picker
              label={"Unit"}
              items={units}
              selectedKey={parsed.unit}
              onSelectionChange={(key) => {
                props.onChange(`${parsed.number}${key}`);
              }}
              autoFocus={props.autoFocus}
            >
              {(item) => <Item key={item.value}>{item.label}</Item>}
            </Picker>
          </div>
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
