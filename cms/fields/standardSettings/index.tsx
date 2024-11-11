import { fields } from "@keystatic/core";

export const standardOptions = fields.object(
  {
    cssClass: fields.text({
      label: "Custom CSS class",
      description: "assign this element a CSS class to style yourself",
    }),
  },
  { label: "Standard Options" },
);
