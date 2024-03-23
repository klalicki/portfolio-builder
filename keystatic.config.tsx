import {
  config,
  fields,
  collection,
  singleton,
  type BasicFormField,
} from "@keystatic/core";
import { block } from "@keystatic/core/content-components";
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
        tags: fields.relationship({
          label: "Tags",
          collection: "tags",
        }),
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
            Columns: block({
              label: "Columns",
              schema: {
                columns: fields.array(
                  fields.child({ kind: "block", placeholder: "col" }),
                  { label: "Column" }
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
            // First block option is a link to a Page
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
                        { label: "Column" }
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
                      { label: "All published projects by tag", value: "tag" },
                      { label: "Select projects", value: "select" },
                    ],
                    defaultValue: "all",
                  }),

                  {
                    all: fields.empty(),
                    tag: fields.empty(),
                    select: fields.empty(),
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
