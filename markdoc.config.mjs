import { defineMarkdocConfig, component, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  nodes: {
    document: {
      render: null, // default 'article'
    },
    image: {
      ...nodes.image,
      render: component(
        "./src/components/pagebuilder/MarkdocImageReplace.astro"
      ),
    },
  },
  tags: {
    Column: {
      render: component("./src/components/pagebuilder/Column.astro"),
      attributes: {
        targetWidth: { type: String },
        flexGrow: { type: Boolean },
      },
    },
    HeroSection: {
      render: component("./src/components/pagebuilder/HeroSection.astro"),
      attributes: {
        image: { type: String },
        width: { type: String },
        panelWidth: { type: String },
        height: { type: String },
        parallax: { type: Boolean },
      },
    },
    ImagePopout: {
      render: component("./src/components/pagebuilder/ImagePopout.astro"),
      attributes: {
        image: { type: String },
        altText: { type: String },
        caption: { type: String },
      },
    },
    CodeEmbed: {
      render: component("./src/components/pagebuilder/CodeEmbed.astro"),
      attributes: { content: { type: String } },
    },
    MultiColumn: {
      render: component("./src/components/pagebuilder/MultiColumn.astro"),
      attributes: {
        justifyContent: { type: String },
        flexDirection: { type: String },
        alignItems: { type: String },
        gap: { type: String },
      },
    },
    SimpleMultiCol: {
      render: component("./src/components/pagebuilder/SimpleMultiCol.astro"),
    },
    SimpleCol: {
      render: component("./src/components/pagebuilder/SimpleCol.astro"),
      attributes: { width: { type: Number } },
    },
    CustomWidth: {
      render: component("./src/components/pagebuilder/CustomWidth.astro"),
      attributes: {
        width: { type: String },
      },
    },
    PortfolioView: {
      render: component(
        "./src/components/portfolioViews/PortfolioViewWrapper.astro"
      ),
      attributes: {
        unique: { type: String },
        portfolioLayout: { type: String },
        projectSource: {
          type: String,
        },
      },
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
