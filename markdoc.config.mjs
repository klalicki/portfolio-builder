import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  tags: {
    Column: {
      render: component("./src/components/pagebuilder/Column.astro"),
      attributes: {},
    },
    MultiColumn: {
      render: component("./src/components/pagebuilder/MultiColumn.astro"),
      attributes: {},
    },
    aside: {
      render: component("./src/components/Aside.astro"),
      attributes: {
        // Markdoc requires type defs for each attribute.
        // These should mirror the `Props` type of the component
        // you are rendering.
        // See Markdoc's documentation on defining attributes
        // https://markdoc.dev/docs/attributes#defining-attributes
        type: { type: String },
      },
    },
  },
});
