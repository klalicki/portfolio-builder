import {
  config,
  fields,
  collection,
  singleton,
  type BasicFormField,
  BlockWrapper,
} from "@keystatic/core";
import { block, repeating, wrapper } from "@keystatic/core/content-components";
import * as customFields from "./cms/fields";
import Image from "astro/components/Image.astro";
export default config({
  ui: {
    navigation: {
      Content: ["projects", "pages"],
      Settings: ["menu", "general"],
    },
  },
  storage: {
    kind: "local",
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      previewUrl: "/projects/{slug}",
      path: "src/content/projects/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),

        thumbnail: fields.image({
          label: "Thumbnail Image",
          directory: "src/assets/images/pages",
          publicPath: "../../assets/images/pages/",
        }),
        accent: customFields.colorPicker({
          description: "an accenty color",
          label: "Accent Color",
          defaultValue: "#ff0000",
        }),
        content: fields.markdoc({
          label: "Content",
          components: {
            CustomWidth: wrapper({
              label: "Custom Width Container",
              ContentView(props) {
                return (
                  <div style={{ maxWidth: props.value.width }}>
                    {props.children}
                  </div>
                );
              },
              schema: {
                width: customFields.cssUnit({
                  label: "Max Width",
                  defaultValue: "100vw",
                }),
              },
            }),
            Image: block({
              label: "Image (better)",
              ContentView(props) {
                console.log(props.value.image);
                return (
                  <div>{props.value.image && props.value.image.filename}</div>
                );
              },
              schema: {
                image: fields.image({
                  label: "upload image",
                  directory: "src/assets/images",
                }),
                altText: fields.text({
                  label: "Alt Text",
                  description:
                    "A description of the image contents. This is important for accessibility, as it allows non-sighted users to understand the content of the image",
                  defaultValue: "",
                }),
                caption: fields.text({
                  label: "Caption",
                  description:
                    "An optional caption to display below the image. ",
                  defaultValue: "",
                }),
              },
            }),
            CodeEmbed: block({
              label: "HTML Embed",
              schema: {
                content: customFields.codeEditor({
                  label: "Code",
                  description:
                    "Use this component to place embed codes, etc. WARNING: don't paste sketchy code from the internet in here unless you know what it does!",
                  defaultValue: "",
                }),
              },
              ContentView(props) {
                return (
                  <div
                    dangerouslySetInnerHTML={{ __html: props.value.content }}
                  />
                );
              },
            }),
            MultiColumn: repeating({
              label: "Multi-Column Layout",
              children: ["Column"],
              schema: {
                justifyContent: fields.select({
                  label: "Justify Content",
                  description:
                    "if the screen is wider than the items, how are they aligned horizontally?",
                  defaultValue: "center",
                  options: [
                    { label: "Left", value: "flex-start" },
                    { label: "Center", value: "center" },
                    { label: "Right", value: "flex-end" },
                    {
                      label: "Justify (space-between)",
                      value: "space-between",
                    },
                    {
                      label: "Space evenly",
                      value: "space-evenly",
                    },
                    {
                      label: "Equal space around",
                      value: "space-around",
                    },
                  ],
                }),
                alignItems: fields.select({
                  label: "Align Items",
                  description:
                    "If columns have different amounts of content, how are they aligned vertically?",
                  defaultValue: "flex-start",
                  options: [
                    { label: "Top", value: "flex-start" },
                    { label: "Bottom", value: "flex-end" },
                    { label: "Center", value: "center" },
                  ],
                }),
                gap: customFields.cssUnit({
                  label: "Gap",
                  description: "The gap between columns",
                  defaultValue: "10px",
                }),
              },
              ContentView(props) {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: props.value.justifyContent,
                      alignItems: props.value.alignItems,
                      gap: props.value.gap,
                      containerName: "col-container",
                      containerType: "normal",
                    }}
                  >
                    {props.children}
                  </div>
                );
              },
            }),
            Column: wrapper({
              forSpecificLocations: true,
              label: "Column",

              ContentView(props) {
                return (
                  <div
                    style={{
                      maxWidth: props.value.flexGrow
                        ? "100%"
                        : props.value.targetWidth,
                    }}
                  >
                    {props.children}
                  </div>
                );
              },
              schema: {
                targetWidth: customFields.cssUnit({
                  label: "target width",
                  description:
                    "the width that this column will 'try' to be if the screen is wide enough.",
                  defaultValue: "100px",
                }),
                flexGrow: fields.checkbox({
                  label: "Allow to grow",
                  description:
                    "Allow this column to get larger than the target width if the screen is wide enough",
                }),
              },
            }),
          },

          options: {
            image: {
              directory: "src/assets/images/pages",
              publicPath: "../../assets/images/pages/",
            },
          },
        }),
      },
    }),
    tags: collection({
      label: "Tags",
      slugField: "tag",
      schema: { tag: fields.slug({ name: { label: "Tag" } }) },
    }),
    pages: collection({
      label: "Pages",
      slugField: "title",
      path: "src/content/pages/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        blocks: fields.blocks(
          {
            // First block option is just a markdoc field
            text: {
              label: "Text",
              schema: fields.markdoc({
                label: "Content",
                components: {
                  Columns: block({
                    label: "Columns",
                    schema: {
                      columns: fields.array(
                        fields.child({ kind: "block", placeholder: "col" }),
                        { label: "Column!" }
                      ),
                    },
                  }),
                },
                options: {
                  image: {
                    directory: "src/assets/images/pages",
                    publicPath: "../../assets/images/pages/",
                  },
                },
              }),
            },
            // Second block option is a link to a URL
            portfolio: {
              label: "Portfolio Feed",
              schema: fields.object({
                url: fields.text({ label: "URL" }),
                mode: fields.conditional(
                  fields.select({
                    label: "Feed type",
                    options: [
                      { label: "All published projects", value: "all" },
                      { label: "Select projects", value: "select" },
                    ],
                    defaultValue: "all",
                  }),

                  {
                    select: fields.array(
                      fields.relationship({
                        label: "a",
                        collection: "projects",
                      }),
                      {
                        label: "choose a bla",
                        itemLabel: (props) => {
                          return props.value || "page";
                        },
                      }
                    ),

                    all: fields.empty(),
                  }
                ),
              }),
            },
          },
          { label: "Blocks" }
        ),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "src/assets/images/pages",
              publicPath: "../../assets/images/pages/",
            },
          },
        }),
      },
    }),
  },
  singletons: {
    general: singleton({
      label: "General Settings",
      schema: {},
    }),
    menu: singleton({
      label: "Menu",
      schema: {
        position: fields.select({
          label: "Menu Position",
          options: [
            { label: "Sidebar", value: "sidebar" },
            { label: "Top bar", value: "top" },
            {
              label: "Sticky Topbar",
              value: "sticky",
            },
            { label: "Hamburger", value: "hamburger" },
          ],
          defaultValue: "sidebar",
        }),
      },
    }),
  },
});
