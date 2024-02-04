/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

export const GifComponent = ({ gifData = null, noCounter = 1, yes }) => {
  const [src, setSrc] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      if (gifData && gifData[noCounter]) {
        const { images, title } = gifData[yes?1:noCounter+1];
        if (active) {
          const gifUrl = images.original.url;

          // Preload the image
          const img = new Image();
          img.src = gifUrl;

          // Once the image is loaded, update the component state
          img.onload = () => {
            setSrc(gifUrl);
            const altText = title || "GIF";
            setTitle(altText);
            setLoading(false);
          };
        }
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [gifData, noCounter, yes]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img src={src} alt={title} className="w-[200px] h-[200px]" />
      )}
    </div>
  );
};
