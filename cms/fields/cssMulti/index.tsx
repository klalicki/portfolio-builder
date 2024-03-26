import type { BasicFormField, FormFieldStoredValue } from "@keystatic/core";
import { FieldPrimitive } from "@keystar/ui/field";

import { Picker, Item } from "@keystar/ui/picker";
import { NumberField } from "@keystar/ui/number-field";
import { useId, useState } from "react";

function parseAsNormalField(value: FormFieldStoredValue) {
  if (value === undefined) {
    return "";
  }
  if (typeof value !== "string") {
    throw new Error("Must be a string");
  }
  return value;
}

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
      const initialState = props.value || "{}";
      const [workingObj, setWorkingObj] = useState(JSON.parse(initialState));
      const uniqueId = useId();
      const pushUpstream = () => {
        props.onChange(JSON.stringify(workingObj));
        setIsSaved(true);
      };

      const updateItem = (key: string, newValue: string) => {
        const tempWorkingObj = { ...workingObj };
        tempWorkingObj[key] = newValue;
        setWorkingObj(tempWorkingObj);
      };

      return (
        <FieldPrimitive label={label}>
          <div>
            {/* {isSaved ? "saved" : "not saved"} */}
            {parameters.map((item, index) => {
              return (
                <div key={index}>
                  <label htmlFor={uniqueId + "-" + item.cssName + "-" + index}>
                    {item.label}
                  </label>
                  <input
                    id={uniqueId + "-" + item.cssName + "-" + index}
                    type="text"
                    onChange={(e) => {
                      setIsSaved(false);
                      updateItem(item.cssName, e.target.value);
                    }}
                    value={workingObj[item.cssName]}
                    onBlur={pushUpstream}
                  />
                </div>
              );
            })}
          </div>
        </FieldPrimitive>
      );
    },
    // i think this is a function that sets the default value of the field - in this case falls back to blank if no defaultValue is given
    defaultValue() {
      return "{}";
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
