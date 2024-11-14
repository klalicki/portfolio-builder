import { settings } from "./settingsHelper";

export const fontRules = (specs: { [key: string]: { [key: string]: any } }) => {
  const fontRules: { [key: string]: string } = {};

  const fontSpecs = specs;

  const fontSpecSets = Object.entries(fontSpecs);
  fontSpecSets.forEach((pair) => {
    const fontVars = Object.entries(pair[1]);
    //pair[0] would be 'h1' or 'p' etc
    fontVars.forEach((fontVarPair) => {
      let keyName = pair[0] + "-" + fontVarPair[0];
      if (fontVarPair[0] === "fontFamily") {
        const fontID = settings.fonts.fontLibrary.findIndex((item) => {
          return fontVarPair[1] === item.uniqueID;
        });
        const normalizedFontID = fontID === -1 ? "default" : fontID;
        fontRules[keyName] = `var(--fontStack-${normalizedFontID})`;
      } else if (fontVarPair[0] === "textDecorationColorProps") {
        // console.log(fontVarPair[1]);
        keyName = pair[0] + "-textDecorationColor";
        switch (fontVarPair[1].discriminant) {
          case "default":
            fontRules[keyName] = "default";
            break;
          case "accent":
            fontRules[keyName] = "var(--pageAccentColor)";
            break;
          case "custom":
            const customColor = fontVarPair[1].value;
            fontRules[keyName] = customColor;
        }
        // console.log("colorProps:");
      } else {
        // @ts-ignore
        fontRules[keyName] = fontVarPair[1];
      }
    });
  });
  return fontRules;
};
