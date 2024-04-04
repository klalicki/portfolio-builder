import {
  config,
  fields,
  collection,
  singleton,
  type BasicFormField,
  BlockWrapper,
} from "@keystatic/core";
import { block, repeating, wrapper } from "@keystatic/core/content-components";

import { portfolioLayouts } from "./cms/singletons/portfolioLayouts";
import { menuConfig } from "./cms/singletons/menuConfig";
import { generalSettings } from "./cms/singletons/generalSettings";
import { sidebarSettings } from "./cms/singletons/sidebarSettings";
import { pageArea } from "./cms/singletons/pageAreaSettings";
import { fonts } from "./cms/singletons/fonts";
import * as customFields from "./cms/fields";
import { standardComponents } from "./cms/components/standardComponents";
import { pageComponents } from "./cms/components/pageComponents";

const customNavField = fields.conditional(
  fields.checkbox({ label: "special navigation" }),
  {
    false: customFields.uniquify({ label: "unique" }),
    true: fields.array(
      fields.object({
        title: fields.text({ label: "Nav item label" }),
        subItems: fields.relationship({
          label: "Nav sub-items",
          collection: "portfolioGroups",
        }),
      }),
      {
        itemLabel(props) {
          return (
            props.fields.title.value +
            (props.fields.subItems.value
              ? ` (sub-items: ${props.fields.subItems.value})`
              : "")
          );
        },
      }
    ),
  }
);

export default config({
  ui: {
    navigation: {
      Content: ["projects", "pages", "homepage"],
      Settings: ["menu", "general", "portfolioGroups"],
      Appearance: ["pageArea", "sidebarSettings", "portfolioLayouts", "fonts"],
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
        hideTitle: fields.checkbox({
          label: "Hide Title",
          defaultValue: false,
          description:
            "Remove default title element from this page (make sure to include a Heading 1 near the top of the page for accessibility!)",
        }),
        description: fields.text({ label: "Description" }),
        line3: fields.text({ label: "optional 3rd line for portfolio pages" }),
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

    pages: collection({
      label: "Pages",
      slugField: "title",
      previewUrl: "/{slug}",
      path: "src/content/pages/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        hideTitle: fields.checkbox({
          label: "Hide Title",
          defaultValue: false,
          description:
            "Remove default title element from this page (make sure to include a Heading 1 near the top of the page for accessibility!)",
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
        customNavigation: customNavField,

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
    portfolioGroups: collection({
      label: "Portfolio Groups",
      slugField: "name",
      format: { contentField: "emptyContent" },
      path: "src/content/portfolioGroups/*",
      schema: {
        name: fields.slug({ name: { label: "Title" } }),
        emptyContent: fields.emptyDocument(),
        projectSource: fields.conditional(
          fields.select({
            label: "Which projects to include",
            defaultValue: "all",
            options: [
              { label: "All", value: "all" },
              { label: "Selected", value: "selected" },
            ],
          }),
          {
            all: customFields.uniquify({ label: "unif", description: "unif" }),
            selected: fields.array(
              fields.relationship({
                label: "Select Projects",
                collection: "projects",
              }),
              {
                label: "Project",
                itemLabel(props) {
                  return props.value || "";
                },
              }
            ),
          }
        ),
      },
    }),
  },
  singletons: {
    portfolioLayouts: portfolioLayouts,
    sidebarSettings: sidebarSettings,
    general: generalSettings,
    menu: menuConfig,
    pageArea: pageArea,
    fonts: fonts,
    homepage: singleton({
      label: "Homepage",
      entryLayout: "content",
      previewUrl: "/",
      format: { contentField: "content" },
      path: "src/content/homepage/index",
      schema: {
        title: fields.text({ label: "Page Title" }),
        hideTitle: fields.checkbox({
          label: "Hide Title",
          defaultValue: false,
          description:
            "Remove default title element from this page (make sure to include a Heading 1 near the top of the page for accessibility!)",
        }),
        customNavigation: customNavField,

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
});
