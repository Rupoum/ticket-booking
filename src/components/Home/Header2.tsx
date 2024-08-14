import React from "react";
import ImageGallery from "./ImageGallery";

const Header2 = () => {
  const images = [
    "https://i.ibb.co/qCkd9jS/img1.jpg",
    "https://i.ibb.co/jrRb11q/img2.jpg",
    "https://i.ibb.co/NSwVv8D/img3.jpg",
    "https://i.ibb.co/Bq4Q0M8/img4.jpg",
    "https://i.ibb.co/jTQfmTq/img5.jpg",
    "https://i.ibb.co/RNkk6L0/img6.jpg",
  ];
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <ImageGallery images={images} />
    </div>
  );
};

export default Header2;
