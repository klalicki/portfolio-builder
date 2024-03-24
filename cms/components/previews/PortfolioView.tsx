import { useEffect } from "react";
import { getCollection, getEntry } from "astro:content";

const PortfolioView = (props: {
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
  useEffect(() => {
    const getPosts = async () => {
      const bla = await getCollection("projects");
      console.log(bla);
    };
    getPosts();
  });
  return (
    <div>
      For now there's no easy way to view a preview of the portfolio page inside
      this editor. :(
    </div>
  );
};
export default PortfolioView;
