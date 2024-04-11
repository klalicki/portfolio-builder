import { block, repeating, wrapper } from "@keystatic/core/content-components";
import * as customFields from "../fields";
import { fields } from "@keystatic/core";
import { layoutListIcon } from "@keystar/ui/icon/icons/layoutListIcon";
import PortfolioPreview from "./previews/PortfolioPreview";
export const pageComponents = {
  PortfolioView: block({
    label: "Portfolio View",
    ContentView: PortfolioPreview,
    icon: layoutListIcon,
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

      customClass: customFields.customClass,
    },
    // ContentView(props) {
    //   return <div dangerouslySetInnerHTML={{ __html: props.value.content }} />;
    // },
  }),
};
