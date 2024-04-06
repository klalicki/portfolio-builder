import { singleton } from "@keystatic/core";
import { typeProps } from "../fields/fieldGroups/typeProps";
export const typeOptions = singleton({
  label: "Typography Options",
  format: { data: "json" },
  path: "src/settings/typeOptions",
  schema: {
    h1: typeProps({ label: "Heading 1" }),
    h2: typeProps({ label: "Heading 2" }),
    p: typeProps({ label: "Body Text" }),
  },
});
