import {
  block,
  inline,
  mark,
  repeating,
  wrapper,
} from "@keystatic/core/content-components";
import * as customFields from "../fields";
import { typePropsOverride } from "../fields/fieldGroups/typePropsOverride";
import { fields } from "@keystatic/core";
import { useEffect, useId, useRef, useState } from "react";
import { moveHorizontalIcon } from "@keystar/ui/icon/icons/moveHorizontalIcon";
import { codeSquareIcon } from "@keystar/ui/icon/icons/codeSquareIcon";
import { underlineIcon } from "@keystar/ui/icon/icons/underlineIcon";
import { paintbrush2Icon } from "@keystar/ui/icon/icons/paintbrush2Icon";
import { columns4Icon } from "@keystar/ui/icon/icons/columns4Icon";
import { columnsIcon } from "@keystar/ui/icon/icons/columnsIcon";
import { fileIcon } from "@keystar/ui/icon/icons/fileIcon";
import { groupIcon } from "@keystar/ui/icon/icons/groupIcon";
import { typeIcon } from "@keystar/ui/icon/icons/typeIcon";
import { alignLeftIcon } from "@keystar/ui/icon/icons/alignLeftIcon";
import { fullscreenIcon } from "@keystar/ui/icon/icons/fullscreenIcon";
import { layoutGridIcon } from "@keystar/ui/icon/icons/layoutGridIcon";
import globalFontSettings from "../../src/settings/fonts.json";

import { ImagePreviewer, useImageData } from "./helpers/ImagePreviewer";
import { fontOverrideCSSRules } from "./helpers/FontOverrideCSS";

// import { fileIcon } from "@keystar/ui/icon/icons/fileIcon";
// import { fileIcon } from "@keystar/ui/icon/icons/fileIcon";
// import { fileIcon } from "@keystar/ui/icon/icons/fileIcon";

export const standardComponents = {
  PageSection: wrapper({
    label: "Page Section",
    icon: groupIcon,
    description:
      "use this to create a section with a background color, custom padding, etc",
    ContentView(props) {
      const divRef = useRef<HTMLDivElement>(null); // Add type assertion
      useEffect(() => {
        if (divRef.current) {
          const paddingProps = `padding-top:${props.value.spacing.boxPaddingTop};padding-bottom:${props.value.spacing.boxPaddingBottom};padding-left:${props.value.spacing.boxPaddingLeft};padding-right:${props.value.spacing.boxPaddingRight}`;
          divRef.current.setAttribute(
            "style",
            props.value.css.customCSS + paddingProps,
          ); // Fix the problem
        }
      }, [props.value.css.customCSS]);
      return <div ref={divRef}>{props.children}</div>;
    },
    schema: {
      sizing: fields.object(
        {
          boxWidth: customFields.cssUnit({
            label: "Section Width",
            defaultValue: "100%",
            isCompact: true,
          }),
          contentWidth: fields.conditional(
            fields.checkbox({
              label: "Custom content width",
              defaultValue: false,
            }),
            {
              false: fields.empty(),
              true: customFields.cssUnit({
                label: "Content Block Width",
                defaultValue: "800px",
                isCompact: true,
              }),
            },
          ),
        },
        { label: "Sizing", layout: [6, 6] },
      ),
      spacing: fields.object(
        {
          boxPaddingTop: customFields.cssUnit({
            label: "Top Padding",
            defaultValue: "1rem",
            isCompact: true,
          }),
          boxPaddingBottom: customFields.cssUnit({
            label: "Bottom Padding",
            defaultValue: "1rem",
            isCompact: true,
          }),
          boxPaddingLeft: customFields.cssUnit({
            label: "Left Padding",
            defaultValue: "1rem",
            isCompact: true,
          }),
          boxPaddingRight: customFields.cssUnit({
            label: "Right Padding",
            defaultValue: "1rem",
            isCompact: true,
          }),
          alignContentBox: fields.select({
            label: "Horizontally Align Content",
            options: [
              { label: "Left", value: "flex-start" },
              { label: "Right", value: "flex-end" },
              { label: "Center", value: "center" },
            ],
            defaultValue: "center",
          }),
          spaceBefore: customFields.cssUnit({
            label: "Space Before Section",
            defaultValue: "1rem",
            isCompact: true,
          }),
          spaceAfter: customFields.cssUnit({
            label: "Space After Section",
            defaultValue: "1rem",
            isCompact: true,
          }),
        },
        { label: "Spacing", layout: [6, 6, 6, 6, 12, 6, 6] },
      ),
      bgType: fields.conditional(
        fields.select({
          label: "Background Type",
          defaultValue: "none",
          options: [
            { label: "None", value: "none" },
            { label: "Color", value: "color" },
            { label: "Image", value: "image" },
          ],
        }),
        {
          none: fields.empty(),
          image: fields.image({
            label: "Background Image",
            directory: "src/assets/images",
            publicPath: "",
          }),
          color: customFields.colorPicker({
            label: "BG Color",
            allowAlpha: true,
          }),
        },
      ),
      css: fields.object(
        {
          customClass: customFields.customClass,

          customCSS: customFields.codeEditor({
            label: "Custom CSS Code",
            language: "",
            disablePrettier: true,
          }),
        },

        { label: "CSS" },
      ),
    },
  }),
  FileLink: inline({
    label: "Link to File",
    icon: fileIcon,
    schema: {
      text: fields.text({ label: "Link text" }),
      cssClass: fields.text({
        label: "Custom CSS class",
        description: "assign this element a CSS class to style yourself",
      }),
      filePath: fields.file({
        label: "UploadFile",
        directory: "public/files",
        publicPath: "files",
      }),
    },
    NodeView(props) {
      return (
        <a href={"#"} style={{ border: "1px dashed red" }}>
          {props.value.text}
        </a>
      );
    },
  }),
  ImageGallery: block({
    label: "Image Gallery",
    icon: layoutGridIcon,
    schema: {
      options: fields.object(
        {
          width: customFields.cssUnit({
            label: "Width",
            description: "Maximum width for this section",
            defaultValue: "100%",
            isCompact: true,
          }),
          gap: customFields.cssUnit({
            label: "Gap",
            description: "The space between items in the grid",
            defaultValue: "1rem",
            isCompact: true,
          }),
          imageSize: customFields.cssUnit({
            label: "Image Width",
            description: "the width of each item in this gallery",
            isCompact: true,
            limitUnits: ["px", "rem", "%", "em"],
          }),
          aspectRatio: fields.text({
            label: "Aspect Ratio",
            description: "The aspect ratio of the gallery tiles (ie 3/2)",
            defaultValue: "1/1",
          }),
        },
        { layout: [6, 6, 6, 6] },
      ),
      items: fields.array(
        fields.object({
          image: fields.image({
            label: "upload image",
            directory: "src/assets/images",
            publicPath: "",
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
        }),
        {
          label: "Gallery Items",
          itemLabel(props) {
            return (
              props.fields.caption.value ||
              props.fields.altText.value ||
              // @ts-ignore
              `Item ${props?.key}`
            );
          },
        },
      ),
      customClass: customFields.customClass,
    },
    ContentView(props) {
      return (
        <div>
          Note: the images in the preview of this component will not update
          until you save the page!
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(min(${props.value.options.imageSize}, 100%), 1fr))`,
              gap: props.value.options.gap,
            }}
          >
            {props.value.items.map((item, index) =>
              item.image?.data ? (
                <ImagePreviewer
                  style={{
                    aspectRatio: props.value.options.aspectRatio,
                    objectFit: "cover",
                  }}
                  key={index}
                  imgData={item.image}
                  alt={`Image ${index}`}
                />
              ) : (
                <div>
                  The image has been placed. Once you save the page, you will
                  see it here.
                </div>
              ),
            )}
          </div>{" "}
        </div>
      );
    },
  }),

  underline: mark({
    label: "Underline",
    icon: underlineIcon,
    schema: {},
    style: {
      textDecorationLine: "underline",
    },
  }),

  HeroSection: wrapper({
    label: "Hero Section",
    schema: {
      image: fields.image({
        label: "Background Image",
        directory: "src/assets/images",
        publicPath: "",
      }),
      height: customFields.cssUnit({
        label: "Height",
        description: "height of this section",
        defaultValue: "300px",
      }),
      width: customFields.cssUnit({
        label: "Width",
        description: "Maximum width for this section",
        defaultValue: "100%",
      }),
      parallax: fields.checkbox({ label: "Parallax scroll effect" }),
      showPanel: fields.conditional(
        fields.checkbox({ label: "show content panel?" }),
        {
          false: customFields.uniquify({ label: "uniquify" }),
          true: fields.object(
            {
              panelWidth: customFields.cssUnit({
                label: "Panel Width",
                description: "Width of the overlay panel",
                defaultValue: "250px",
              }),
              panelColor: customFields.colorPicker({
                label: "Background color for panel",
                defaultValue: "#ffffff",
                allowAlpha: true,
              }),
              textColor: customFields.colorPicker({
                label: "Text color for panel",
                defaultValue: "#000000",
              }),
            },
            { layout: [12, 6, 6] },
          ),
        },
      ),
      customClass: customFields.customClass,
    },
    ContentView(props) {
      const bgImgSrc = useImageData(props.value.image);

      return (
        <div
          style={{
            backgroundImage: `url(${bgImgSrc})`,
            height: props.value.height,
            maxWidth: props.value.width,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "2rem",
            // @ts-ignore
            color: props.value.showPanel.value?.textColor,
          }}
        >
          {props.value.showPanel.discriminant && (
            <div
              style={{
                backgroundColor: props.value.showPanel.value?.panelColor,
                maxWidth: props.value.showPanel.value?.panelWidth,
                padding: "1rem",
                color: props.value.showPanel.value?.textColor,
                // @ts-ignore
                "--kui-color-foreground-neutral-emphasis":
                  props.value.showPanel.value?.textColor,
              }}
            >
              {props.children}
            </div>
          )}
        </div>
      );
    },
  }),
  ImagePopout: block({
    label: "Image (with Popout)",
    icon: fullscreenIcon,
    ContentView(props) {
      props.value.image?.data;
      return (
        <ImagePreviewer imgData={props.value.image} alt={props.value.altText} />
      );
    },
    schema: {
      image: fields.image({
        label: "upload image",
        directory: "src/assets/images",
        publicPath: "",
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
      customClass: customFields.customClass,
    },
  }),
  CodeEmbed: block({
    label: "HTML Embed",
    icon: codeSquareIcon,
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
  SimpleMultiCol: repeating({
    label: "Simple (12-col) Multi-Column Layout",
    children: ["SimpleCol"],
    icon: columnsIcon,
    validation: {
      children: {
        min: 1,
        max: 5,
      },
    },
    schema: { customClass: customFields.customClass },
    ContentView(props) {
      return (
        <div
          className="column-container-wrapper"
          style={{
            display: "flex",
            flexWrap: "wrap",
            containerName: "simple-col-container",
            containerType: "inline-size",
          }}
        >
          {props.children}
        </div>
      );
    },
  }),
  CustomFont: mark({
    label: "Custom Font",
    icon: typeIcon,
    style: (props) => {
      const { fontSettings } = props.value;

      const styles = fontOverrideCSSRules(props);

      return { ...styles, border: "1px dashed red" };
    },
    schema: {
      fontSettings: typePropsOverride({ label: "" }),
      customClass: fields.text({ label: "Custom CSS Class", defaultValue: "" }),
    },
  }),
  SimpleCol: wrapper({
    forSpecificLocations: true,
    label: "Col",
    schema: {
      width: fields.number({
        label: "Column Width (2-12)",
        validation: { isRequired: true, min: 2, max: 12 },
        defaultValue: 6,
      }),
      customClass: customFields.customClass,
    },
    ContentView(props) {
      return (
        <div
          style={{
            width: `${(100 / 14) * (props.value.width || 6)}cqw`,
          }}
        >
          {props.children}
        </div>
      );
    },
  }),
  MultiColumn: repeating({
    label: "Multi-Column Layout",
    children: ["Column"],
    icon: columns4Icon,
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
      customClass: customFields.customClass,
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
        <div className="column-container-wrapper">
          <style>{flexCSS}</style>
          {props.children}
        </div>
      );
    },
  }),
  TextAlign: wrapper({
    label: "Text Align",
    icon: alignLeftIcon,
    ContentView(props) {
      return (
        <div style={{ textAlign: props.value.align }}>{props.children}</div>
      );
    },
    schema: {
      align: fields.select({
        label: "Text Alignment",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
          { label: "Justify (please don't lol)", value: "justify" },
        ],
        defaultValue: "left",
      }),
    },
  }),
  Column: wrapper({
    forSpecificLocations: true,
    label: "Column",

    ContentView(props) {
      const itemID = useId();
      const cssStyles = `.column-container-wrapper > span > span > div:has(#${CSS.escape(
        itemID,
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
      customClass: customFields.customClass,
    },
  }),
  CustomWidth: wrapper({
    label: "Custom Width Container",
    icon: moveHorizontalIcon,
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
      customClass: customFields.customClass,
    },
  }),
  CustomCSSWrapper: wrapper({
    label: "Custom CSS Container",

    schema: {
      customCSS: customFields.codeEditor({
        label: "Custom CSS Code",
        language: "",
        disablePrettier: true,
      }),
      customClass: customFields.customClass,
    },
    icon: paintbrush2Icon,
    ContentView(props) {
      const divRef = useRef<HTMLDivElement>(null); // Add type assertion
      useEffect(() => {
        if (divRef.current) {
          divRef.current.setAttribute("style", props.value.customCSS); // Fix the problem
        }
      }, [props.value.customCSS]);
      return <div ref={divRef}>{props.children}</div>;
    },
  }),
};
