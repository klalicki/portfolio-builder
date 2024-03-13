import { config, fields, collection, singleton } from "@keystatic/core";
import { repeating, wrapper, block } from "@keystatic/core/content-components";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      columns: ["title"],
      previewUrl: "/projects/{slug}",
      path: "src/content/projects/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        thumbnail: fields.image({
          label: "Thumbnail Image",
          directory: "src/assets/images/projects",
          publicPath: "../../assets/images/projects/",
        }),
        content: fields.markdoc({
          label: "Content",
          options: {},
          components: {
            newImage: block({
              label: "newImage",
              schema: {
                id: fields.text({ label: "Playlist ID" }),
                thumbnail: fields.image({
                  label: "Thumbnail Image",
                  directory: "src/assets/images/projects",
                  publicPath: "../../assets/images/projects/",
                }),
              },
            }),
            columnGroup: repeating({
              children: "column",
              label: "Column Group",
              schema: {},
              validation: { children: { min: 1, max: 4 } },
              ContentView: (props) => {
                // console.log(props);
                return (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    {props.children}
                  </div>
                );
              },
            }),
            column: wrapper({
              label: "Column",
              schema: {
                basis: fields.text({
                  label: "desired width",
                }),
              },
              forSpecificLocations: true,
              ContentView: (props) => {
                return (
                  <div
                    style={{
                      // width: `clamp(50px, ${props.value.basis}, 100%)`,
                      flexGrow: 1,
                    }}
                  >
                    {props.children}
                  </div>
                );
              },
            }),
          },
        }),
      },
    }),
    pages: collection({
      label: "Pages",
      slugField: "title",
      path: "src/content/pages/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "src/assets/images/pages",
            publicPath: "../../assets/images/pages/",
          },
        }),
      },
    }),
  },
  singletons: {
    settings: singleton({
      label: "Settings",
      schema: {
        name: fields.text({ label: "Name" }),
      },
    }),
  },
});
