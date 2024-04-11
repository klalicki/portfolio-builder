import { block, repeating, wrapper } from "@keystatic/core/content-components";
import * as customFields from "../fields";
import { fields } from "@keystatic/core";

import PortfolioPreview from "./previews/PortfolioPreview";
export const pageComponents = {
  PortfolioView: block({
    label: "Portfolio View",
    ContentView: PortfolioPreview,
    schema: {
      unique: customFields.uniquify({ label: "unif", description: "unif" }),
      portfolioLayout: fields.select({
        label: "Layout",
        description: "which layout should this portfolio view use?",
        defaultValue: "cards",
        options: [
          { label: "Cards", value: "cards" },
          { label: "Tiles", value: "tiles" },
          { label: "Wide Cards", value: "wideCards" },
          { label: "Cool Tiles", value: "coolTiles" },
        ],
      }),

      projectSource: fields.relationship({
        label: "Portfolio Group",
        collection: "portfolioGroups",
      }),

      // cssOptions: customFields.cssMulti({
      //   label: "asst stuff",
      //   params: [
      //     { cssName: "item1", label: "Item 1", defaultVal: "la1" },
      //     { cssName: "item2", label: "Item 2", defaultVal: "la2" },
      //   ],
      // }),
    },
    // ContentView(props) {
    //   return <div dangerouslySetInnerHTML={{ __html: props.value.content }} />;
    // },
  }),
};
