/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

export const GifComponent = ({ gifData = null,noCounter }) => {
  const [src, setSrc] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      const imgSelection = gifData === 1 ? 0 : Math.floor(Math.random()*gifData.length)
      console.log(gifData,gifData[imgSelection]);
      if (gifData && gifData[imgSelection]) {
        const { images, title } = gifData[imgSelection];
        console.log(images, title);
        if (active) {
          const gifUrl = images.original.url;

          console.log(gifUrl);
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
  }, [gifData,noCounter]);

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
