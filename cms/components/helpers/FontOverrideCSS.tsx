import globalFontSettings from "../../../src/settings/fonts.json";

export const fontOverrideCSSRules = (props: any) => {
  const { fontSettings } = props.value;

  const styles: any = {};
  if (fontSettings.fontFamily.discriminant) {
    styles["font-family"] = globalFontSettings.fontLibrary.find((item) => {

      return item.uniqueID == fontSettings.fontFamily.value;
    })?.mode.value.fontFamily;
  }
  if (fontSettings.fontSize.discriminant) {
    styles["font-size"] = fontSettings.fontSize.value;
  }
  if (fontSettings.fontStyle.discriminant) {
    styles["font-style"] = fontSettings.fontStyle.value;
  }
  if (fontSettings.fontWeight.discriminant) {
    styles["font-weight"] = fontSettings.fontWeight.value;
  }
  if (fontSettings.textColor.discriminant) {
    styles["color"] = fontSettings.textColor.value;
  }
  if (fontSettings.lineHeight.discriminant) {
    styles["line-height"] = fontSettings.lineHeight.value;
  }

  return styles;
};
