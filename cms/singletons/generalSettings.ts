import { singleton } from "@keystatic/core";
import * as customFields from "../fields";
export const generalSettings = singleton({
  label: "General Settings",
  path: "src/settings/general",
  format: { data: "json" },
  schema: { slug: customFields.slugPicker({ label: "sluggy" }) },
});
