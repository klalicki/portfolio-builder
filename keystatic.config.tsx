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
import { standardComponents } from "./cms/components/standardComponents";
import { pageComponents } from "./cms/components/pageComponents";
export default config({
  ui: {
    navigation: {
      Content: ["projects", "pages", "homepage"],
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
        publishStatus: fields.select({
          label: "Published?",
          description:
            'Published means the page is publicly visible and will appear in the "all" portfolio type. Unpublished means the page is completely hidden. Unlisted means the page will be published, but will not be placed in any menus or portfolios unless specifically selected.',
          defaultValue: "published",
          options: [
            { label: "Yes", value: "published" },
            { label: "No", value: "unpublished" },
            { label: "Unlisted", value: "unlisted" },
          ],
        }),
        content: fields.markdoc({
          label: "Content",
          components: {
            ...standardComponents,
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
      previewUrl: "/{slug}",
      path: "src/content/pages/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.markdoc({
          label: "Content",
          components: {
            ...standardComponents,
            ...pageComponents,
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
  },
  singletons: {
    homepage: singleton({
      label: "Homepage",
      entryLayout: "content",
      previewUrl: "/",
      format: { contentField: "content" },
      path: "src/content/homepage/index",
      schema: {
        content: fields.markdoc({
          label: "Content",
          components: {
            ...standardComponents,
            ...pageComponents,
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
    general: singleton({
      label: "General Settings",
      schema: { slug: customFields.slugPicker({ label: "sluggy" }) },
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
