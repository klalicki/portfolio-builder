import {
  config,
  fields,
  collection,
  singleton,
  type BasicFormField,
} from "@keystatic/core";
import { block, repeating, wrapper } from "@keystatic/core/content-components";
import * as customFields from "./fields";

export default config({
  ui: {
    navigation: {
      Content: ["projects", "pages"],
      Settings: ["menu"],
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
            MultiColumn: repeating({
              label: "Multi-Column Layout",
              children: ["Column"],
              schema: {
                justifyContent: fields.select({
                  label: "Justify Items",
                  description:
                    "if the screen is wider than the items, how are they aligned horizontally?",
                  defaultValue: "center",
                  options: [
                    { label: "Left", value: "flex-start" },
                    { label: "Center", value: "center" },
                    { label: "Right", value: "flex-end" },
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
                      gap: props.value.gap,
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

              schema: {
                targetWidth: fields.text({
                  label: "target width",
                  description:
                    "the width that this column will 'try' to be if the screen is wide enough. This can be any valid CSS unit (px,rem,etc) ",
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
