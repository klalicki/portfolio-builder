import { block, repeating, wrapper } from "@keystatic/core/content-components";
import * as customFields from "../fields";
import { fields } from "@keystatic/core";

import PortfolioView from "./previews/PortfolioView";
export const pageComponents = {
  PortfolioView: block({
    label: "Portfolio View",
    ContentView: PortfolioView,
    schema: {
      unique: customFields.uniquify({ label: "unif", description: "unif" }),
      portfolioLayout: fields.select({
        label: "Layout",
        description: "which layout should this portfolio view use?",
        defaultValue: "cards",
        options: [
          { label: "Cards", value: "cards" },
          { label: "Tiles", value: "tiles" },
        ],
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
    // ContentView(props) {
    //   return <div dangerouslySetInnerHTML={{ __html: props.value.content }} />;
    // },
  }),
};
