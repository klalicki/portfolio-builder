import { useEffect } from "react";
import { getCollection, getEntry } from "astro:content";
import PortfolioView from "../../../src/components/portfolioViews/PortfolioViewWrapper.astro";
const PortfolioPreview = (props: {
  value: {
    readonly unique: string;
    readonly portfolioLayout: "cards" | "tiles";
    readonly projectSource:
      | {
          readonly discriminant: "all";
          readonly value: string;
        }
      | {
          readonly discriminant: "selected";
          readonly value: readonly (string | null)[];
        };
  };
}) => {
  return (
    <div>
      Alas, there is no easy way to actually preview this here. :( If you go to
      the live page you can see it.
    </div>
  );
};
export default PortfolioPreview;
