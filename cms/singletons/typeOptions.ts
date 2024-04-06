import { singleton } from "@keystatic/core";
import { typeProps } from "../fields/fieldGroups/typeProps";
export const typeOptions = singleton({
  label: "Typography Options",
  schema: {
    h1: typeProps({ label: "Heading 1" }),
  },
});
