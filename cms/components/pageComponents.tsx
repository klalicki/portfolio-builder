import { block, repeating, wrapper } from "@keystatic/core/content-components";
import * as customFields from "../fields";
import { fields } from "@keystatic/core";

import PortfolioView from "./previews/PortfolioView";
export const pageComponents = {
  PortfolioView: block({
    label: "Portfolio View",
    ContentView: PortfolioView,
    schema: {
      layout: fields.select({
        label: "Layout",
        description: "which layout should this portfolio view use?",
        defaultValue: "tiles",
        options: [{ label: "Tiles", value: "tiles" }],
        
      }),
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
          all: fields.empty(),
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
    // ContentView(props) {
    //   return <div dangerouslySetInnerHTML={{ __html: props.value.content }} />;
    // },
  }),
};
