import { block, repeating, wrapper } from "@keystatic/core/content-components";
import * as customFields from "../fields";
import { fields } from "@keystatic/core";
import { CSSUnitEditor } from "../fields/cssUnit";
import { useEffect, useId, useRef } from "react";
export const standardComponents = {
  ImagePopout: block({
    label: "Image (better)",
    ContentView(props) {
      console.log(props.value.image);
      return <div>{props.value.image && props.value.image.filename}</div>;
    },
    schema: {
      image: fields.image({
        label: "upload image",
        directory: "src/assets/images",
      }),
      altText: fields.text({
        label: "Alt Text",
        description:
          "A description of the image contents. This is important for accessibility, as it allows non-sighted users to understand the content of the image",
        defaultValue: "",
      }),
      caption: fields.text({
        label: "Caption",
        description: "An optional caption to display below the image. ",
        defaultValue: "",
      }),
    },
  }),
  CodeEmbed: block({
    label: "HTML Embed",
    schema: {
      content: customFields.codeEditor({
        label: "Code",
        description:
          "Use this component to place embed codes, etc. WARNING: don't paste sketchy code from the internet in here unless you know what it does!",
        defaultValue: "",
      }),
    },
    ContentView(props) {
      return <div dangerouslySetInnerHTML={{ __html: props.value.content }} />;
    },
  }),
  MultiColumn: repeating({
    label: "Multi-Column Layout",
    children: ["Column"],
    schema: {
      justifyContent: fields.select({
        label: "Justify Content",
        description:
          "if the screen is wider than the items, how are they aligned horizontally?",
        defaultValue: "center",
        options: [
          { label: "Left", value: "flex-start" },
          { label: "Center", value: "center" },
          { label: "Right", value: "flex-end" },
          {
            label: "Justify (space-between)",
            value: "space-between",
          },
          {
            label: "Space evenly",
            value: "space-evenly",
          },
          {
            label: "Equal space around",
            value: "space-around",
          },
        ],
      }),
      alignItems: fields.select({
        label: "Align Items",
        description:
          "If columns have different amounts of content, how are they aligned vertically?",
        defaultValue: "flex-start",
        options: [
          { label: "Top", value: "flex-start" },
          { label: "Bottom", value: "flex-end" },
          { label: "Center", value: "center" },
        ],
      }),
      flexDirection: fields.select({
        label: "Item Order",
        description:
          "When the columns are able to appear side-by-side, what order should they be in?",
        defaultValue: "row",
        options: [
          { label: "Standard", value: "row" },
          { label: "Reverse", value: "row-reverse" },
        ],
      }),
      gap: customFields.cssUnit({
        label: "Gap",
        description: "The gap between columns",
        defaultValue: "10px",
      }),
    },
    ContentView(props) {
      const flexCSS = `
            .column-container-wrapper > span > span{
            display:flex;
            justify-content:${props.value.justifyContent};
            align-items: ${props.value.alignItems};
            flex-direction: ${props.value.flexDirection};
            gap:${props.value.gap};
            flex-wrap:wrap;
            position:relative;

                    }`;
      return (
        <div
          style={
            {
              // display: "flex",
              // justifyContent: props.value.justifyContent,
              // alignItems: props.value.alignItems,
              // flexDirection: props.value.flexDirection,
              // gap: props.value.gap,
              // flexWrap: "wrap",
              // position: "relative",
            }
          }
          className="column-container-wrapper"
        >
          <style>{flexCSS}</style>
          {props.children}
        </div>
      );
    },
  }),
  Column: wrapper({
    forSpecificLocations: true,
    label: "Column",

    ContentView(props) {
      const itemID = useId();
      const cssStyles = `.column-container-wrapper > span > span > div:has(#${CSS.escape(
        itemID
      )}){
        flex-basis:${props.value.targetWidth};
        flex-grow:${props.value.flexGrow ? "1" : "0"}
      }`;
      return (
        <div id={itemID} className="col-content-wrapper">
          <style>{cssStyles}</style>
          {props.children}
        </div>
      );
    },
    schema: {
      targetWidth: customFields.cssUnit({
        label: "target width",
        description:
          "the width that this column will 'try' to be if the screen is wide enough.",
        defaultValue: "100px",
      }),
      flexGrow: fields.checkbox({
        label: "Allow to grow",
        description:
          "Allow this column to get larger than the target width if the screen is wide enough",
      }),
    },
  }),
  CustomWidth: wrapper({
    label: "Custom Width Container",
    ContentView(props) {
      return (
        <div style={{ maxWidth: props.value.width }}>{props.children}</div>
      );
    },
    schema: {
      width: customFields.cssUnit({
        label: "Max Width",
        defaultValue: "100vw",
      }),
    },
  }),
};
