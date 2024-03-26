import type { BasicFormField, FormFieldStoredValue } from "@keystatic/core";
import { FieldPrimitive } from "@keystar/ui/field";

import { Picker, Item } from "@keystar/ui/picker";
import { NumberField } from "@keystar/ui/number-field";
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

export function cssMulti({
  parameters,
  label,
}: {
  label: string;
  parameters: { cssName: string; label: string; helper: string }[];
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
      const [isSaved, setIsSaved] = useState(true);
      const [workingObj, setWorkingObj] = useState(JSON.parse(props.value));

      const pushUpstream = () => {
        props.onChange(JSON.stringify(workingObj));
      };

      const updateItem = (key, newValue) => {
        const tempWorkingObj = { ...workingObj };
        tempWorkingObj[key] = newValue;
        setWorkingObj(tempWorkingObj);
      };

      return (
        <FieldPrimitive label={label}>
          <div>
            {parameters.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    type="text"
                    onChange={(e) => {
                      updateItem(item.cssName, e.target.value);
                    }}
                    value={workingObj[item.cssName]}
                  />
                </div>
              );
            })}
            <button onClick={pushUpstream}>SAVE</button>
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
