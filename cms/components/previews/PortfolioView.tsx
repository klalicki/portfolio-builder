const PortfolioView = (props: {
  value: {
    readonly layout: string;
    readonly projectSource:
      | {
          readonly discriminant: "all";
          readonly value: null;
        }
      | {
          readonly discriminant: "selected";
          readonly value: readonly (string | null)[];
        };
  };
}) => {
  return (
    <div>
      portfolio layout is {props.value.layout}. Project source is{" "}
      {props.value.projectSource.discriminant}
    </div>
  );
};
export default PortfolioView;
