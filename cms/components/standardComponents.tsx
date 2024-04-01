import { block, repeating, wrapper } from "@keystatic/core/content-components";
import * as customFields from "../fields";
import { fields } from "@keystatic/core";
import { CSSUnitEditor } from "../fields/cssUnit";
import { useEffect, useRef } from "react";
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
      const divRef = useRef(null);
      useEffect(() => {
        
      })
      return (
        <div
          style={{
            display: "flex",
            justifyContent: props.value.justifyContent,
            alignItems: props.value.alignItems,
            flexDirection: props.value.flexDirection,
            gap: props.value.gap,
         
          }}
          className="column-container-wrapper"
        >
          {props.children}
        </div>
      );
    },
  }),
  Column: wrapper({
    forSpecificLocations: true,
    label: "Column",

    ContentView(props) {
      const divRef = useRef(null);
      useEffect(() => {
        if (divRef.current !== null) {
          let curNode = divRef.current;
          for (let index = 0; index < 8; index++) {
            if (curNode?.parentNode) {
              curNode = curNode.parentNode;
              // console.log(curNode);
              if (
                curNode?.tagName === "DIV" &&
                curNode.classList.length === 0
              ) {
                console.log(curNode);

                curNode.style.flexBasis = props.value.targetWidth;
                curNode.style.flexGrow = props.value.flexGrow ? "1" : "0";
                curNode.style.display = "flex";
              }
              // if (
              //   curNode?.parentNode?.classList.contains(
              //     "column-container-wrapper"
              //   )
              // ) {
              //   curNode.style.flexBasis = props.value.targetWidth;
              //   curNode.style.flexGrow = props.value.flexGrow ? "1" : "0";
              //   curNode.style.display = "flex";
              // }
            }
          }
        }
      }, [props.value]);

      return (
        <div ref={divRef} className="col-content-wrapper">
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
