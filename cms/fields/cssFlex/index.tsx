import type { BasicFormField, FormFieldStoredValue } from "@keystatic/core";
import { FieldPrimitive } from "@keystar/ui/field";
import { Checkbox } from "@keystar/ui/checkbox";
import { Picker, Item } from "@keystar/ui/picker";
import { NumberField } from "@keystar/ui/number-field";
import { Text } from "@keystar/ui/typography";
import { Grid, Flex } from "@keystar/ui/layout";

import { useEffect, useState } from "react";
import { CSSUnitEditor } from "../cssUnit";
function parseAsNormalField(value: FormFieldStoredValue) {
  if (value === undefined) {
    return "";
  }
  if (typeof value !== "string") {
    throw new Error("Must be a string");
  }
  return value;
}

export function cssFlex({
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
    Input({ value, onChange }) {
      // State variables for minimum, target, maximum values and disable flags
      const [minValue, setMinValue] = useState("");
      const [targetValue, setTargetValue] = useState("");
      const [maxValue, setMaxValue] = useState("");
      const [limitMin, setLimitMin] = useState(false);
      const [limitMax, setLimitMax] = useState(false);
      const [uId, setUId] = useState(Math.random().toString(36).slice(-8));

      // Function to parse clamp() function and set state values
      const parseClampFunction = (clampValue: string) => {
        const regex = /clamp\(([^,]+),\s*([^,]+),\s*([^)]+)\)/;
        const matches = clampValue.match(regex);
        if (matches) {
          setMinValue(matches[1]);
          setTargetValue(matches[2]);
          setMaxValue(matches[3]);
          setLimitMin(matches[1] !== matches[2]);
          setLimitMax(matches[2] !== matches[3]);
        }
      };
      // useEffect hook to parse initial value and call onChange
      useEffect(() => {
        parseClampFunction(value);

        // Set disable checkboxes based on whether the input values are equal
        if (minValue !== targetValue) {
          setLimitMin(true);
        }
        if (maxValue !== targetValue) {
          setLimitMax(true);
        }
        
      }, []);

      // useEffect hook to parse initial value and call onChange
      useEffect(() => {
        parseClampFunction(value);
      }, [value]);

      useEffect(() => {
        onChange(
          `clamp(${limitMin ? minValue : targetValue}, ${targetValue}, ${
            limitMax ? maxValue : targetValue
          })`
        );
      }, [minValue, maxValue, targetValue, limitMax, limitMin]);

      return (
        <FieldPrimitive>
          <Flex gap={"large"}>
            <Grid columnGap={"medium"} rowGap={"medium"}>
              <CSSUnitEditor
                value={targetValue}
                label={label}
                description={description}
                onChange={setTargetValue}
              ></CSSUnitEditor>
            </Grid>

            <Grid columnGap={"medium"} rowGap={"small"}>
              <Checkbox isSelected={limitMin} onChange={setLimitMin}>
                <Text>Limit Minimum</Text>
              </Checkbox>
              {limitMin && (
                <CSSUnitEditor
                  value={minValue}
                  label=""
                  onChange={setMinValue}
                  limitUnits={["px", "em", "rem"]}
                ></CSSUnitEditor>
              )}
            </Grid>

            <Grid columnGap={"medium"} rowGap={"small"}>
              <Checkbox isSelected={limitMax} onChange={setLimitMax}>
                <Text>Limit Maximum</Text>
              </Checkbox>

              {limitMax && (
                <CSSUnitEditor
                  value={maxValue}
                  label=""
                  onChange={setMaxValue}
                  limitUnits={["px", "em", "rem"]}
                ></CSSUnitEditor>
              )}
            </Grid>
          </Flex>
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
