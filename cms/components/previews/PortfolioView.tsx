import { useEffect } from "react";

const PortfolioView = (props: {
  value: {
    layout: string | null;
    projectSource: {
      discriminant: string | null;
      value: (string | null)[] | null;
    };
  };
}) => {
  return (
    <div>
      For now there's no easy way to view a preview of the portfolio page inside
      this editor. :(
    </div>
  );
};
export default PortfolioView;
