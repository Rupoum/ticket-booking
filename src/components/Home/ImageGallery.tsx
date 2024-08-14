"use client";

import React, { useState } from "react";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="h-[500px] w-screen flex flex-col justify-center items-center">
      <div className="relative w-full h-2/3 bg-gray-300">
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="w-full h-1/3 bg-white p-4 mt-4 flex justify-center items-center space-x-4 overflow-x-scroll rounded-lg shadow-lg">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`h-full object-cover rounded-lg cursor-pointer transition-transform duration-200 ease-in-out ${
              selectedImage === image
                ? "transform scale-110 border-4 border-indigo-500"
                : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
