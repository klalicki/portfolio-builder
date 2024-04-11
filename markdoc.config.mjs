import { defineMarkdocConfig, component, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  nodes: {
    document: {
      render: null, // default 'article'
    },
    strong: {
      ...nodes.strong,
      render: component("./src/components/basicTags/bold.astro"),
    },
    em: {
      ...nodes.em,
      render: component("./src/components/basicTags/italic.astro"),
    },
    s: {
      ...nodes.s,
      render: component("./src/components/basicTags/strikethrough.astro"),
    },
    image: {
      ...nodes.image,
      render: component(
        "./src/components/pagebuilder/MarkdocImageReplace.astro"
      ),
    },
  },
  tags: {
    underline: {
      render: component("./src/components/basicTags/underline.astro"),
    },
    CustomCSSWrapper: {
      render: component("./src/components/pagebuilder/CustomCSSWrapper.astro"),
      attributes: {
        customCSS: { type: String },
        customClass: { type: String },
      },
    },
    FileLink: {
      ...nodes.link,
      render: component("./src/components/pagebuilder/FileLink.astro"),

      attributes: {
        text: { type: String },
        cssClass: { type: String },
        filePath: { type: String },
      },
    },
    Column: {
      render: component("./src/components/pagebuilder/Column.astro"),
      attributes: {
        targetWidth: { type: String },
        flexGrow: { type: Boolean },
        customClass: { type: String },
      },
    },
    HeroSection: {
      render: component("./src/components/pagebuilder/HeroSection.astro"),
      attributes: {
        image: { type: String },
        width: { type: String },
        // panelWidth: { type: String },
        showPanel: { type: Object },
        height: { type: String },
        parallax: { type: Boolean },
        customClass: { type: String },

        // panelColor: { type: String },
        // textColor: { type: String },        customClass: { type: String },
      },
    },
    ImageGallery: {
      render: component("./src/components/pagebuilder/ImageGallery.astro"),
      attributes: {
        items: { type: Array },
        options: { type: Object },
        customClass: { type: String },
      },
    },
    ImagePopout: {
      render: component("./src/components/pagebuilder/ImagePopout.astro"),
      attributes: {
        image: { type: String },
        altText: { type: String },
        caption: { type: String },
        customClass: { type: String },
      },
    },
    CodeEmbed: {
      render: component("./src/components/pagebuilder/CodeEmbed.astro"),
      attributes: { content: { type: String } },
      customClass: { type: String },
    },
    MultiColumn: {
      render: component("./src/components/pagebuilder/MultiColumn.astro"),
      attributes: {
        justifyContent: { type: String },
        flexDirection: { type: String },
        alignItems: { type: String },
        gap: { type: String },
        customClass: { type: String },
      },
    },
    SimpleMultiCol: {
      render: component("./src/components/pagebuilder/SimpleMultiCol.astro"),
      attributes: { customClass: { type: String } },
    },
    SimpleCol: {
      render: component("./src/components/pagebuilder/SimpleCol.astro"),
      attributes: { width: { type: Number }, customClass: { type: String } },
    },
    CustomWidth: {
      render: component("./src/components/pagebuilder/CustomWidth.astro"),
      attributes: {
        width: { type: String },
        customClass: { type: String },
      },
    },
    PortfolioView: {
      render: component(
        "./src/components/portfolioViews/PortfolioViewWrapper.astro"
      ),
      attributes: {
        unique: { type: String },
        portfolioLayout: { type: String },
        customClass: { type: String },

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
