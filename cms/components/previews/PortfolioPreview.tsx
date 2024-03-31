import { useEffect } from "react";
import { getCollection, getEntry } from "astro:content";
import PortfolioView from "../../../src/components/portfolioViews/PortfolioViewWrapper.astro";
const PortfolioPreview = (props: {
  value: {
    unique: string;
    portfolioLayout: string;
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
