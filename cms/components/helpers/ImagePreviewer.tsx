import { useState, useEffect } from "react";

export const useImageSrc = (
  imgSrc: { data: Uint8Array | null } | null,
): string => {
  const [imageDataUrl, setImageDataUrl] = useState<any>(null);
  useEffect(() => {
    const fetchImage = async () => {
      if (imgSrc?.data) {
        const u8intArray = imgSrc.data;
        // console.log(u8intArray);
        const blob = new Blob([u8intArray], { type: "image/png" });
        const reader = new FileReader();
        reader.onload = () => {
          setImageDataUrl(reader.result);
        };
        reader.readAsDataURL(blob);
      }
    };
    fetchImage();
  }, []);

  return imageDataUrl;
};
export interface ImagePreviewerProps extends React.HTMLProps<HTMLImageElement> {
  imgSrc: { data: Uint8Array | null } | null;
}


export const ImagePreviewer = ({ imgSrc, ...props }: ImagePreviewerProps) => {
  const imageDataUrl = useImageSrc(imgSrc);
  return <img src={imageDataUrl} {...props} />;
};
