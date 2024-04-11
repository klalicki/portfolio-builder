export const fontRules = (specs: { [key: string]: { [key: string]: any } }) => {
  const fontRules: { [key: string]: string } = {};

  const fontSpecs = specs;
  const fontSpecSets = Object.entries(fontSpecs);
  fontSpecSets.forEach((pair) => {
    const fontVars = Object.entries(pair[1]);
    fontVars.forEach((fontVarPair) => {
      const keyName = pair[0] + "-" + fontVarPair[0];
      if (fontVarPair[0] === "fontFamily") {
        fontRules[keyName] = `var(--${fontVarPair[1]})`;
      } else {
        // @ts-ignore
        fontRules[keyName] = fontVarPair[1];
      }
    });
  });
  return fontRules;
};
