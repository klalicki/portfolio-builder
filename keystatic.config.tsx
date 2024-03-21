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
        accent: customFields.colorPicker({ label: "Accent Color" }),
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
        // content: fields.document({
        //   label: "Content",
        //   formatting: true,
        //   dividers: true,
        //   links: true,
        //   images: {
        //     directory: "src/assets/images/pages",
        //     publicPath: "../../assets/images/pages/",
        //   },
        // }),
      },
    }),
    pages: collection({
      label: "Pages",
      slugField: "title",
      path: "src/content/pages/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
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
/* {
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
        } */
