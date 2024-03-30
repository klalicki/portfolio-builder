import {
  block,
  inline,
  repeating,
  wrapper,
} from "@keystatic/core/content-components";

import PortfolioPreview from "./previews/PortfolioPreview";

const inlinePreview = (title: string) => {
  return () => {
    return <span>{`{${title}}`}</span>;
  };
};

export const portfolioComponents = {
  ProjectTitle: inline({
    label: "{Project Title}",
    schema: {},
    NodeView: inlinePreview("Project Title"),
  }),
  ProjectDescription: inline({
    label: "{Project Description}",
    schema: {},
    NodeView: inlinePreview("Project Description"),
  }),
  ProjectLine3: inline({
    label: "{Project Line 3}",
    schema: {},
    NodeView: inlinePreview("Line 3"),
  }),
};
