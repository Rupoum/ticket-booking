import Image from "next/image";
import React from "react";
import Background from "../../../public/assets/js.jpg";
const MainHeader = () => {
  return (
    <div className="relative flex h-[30rem] w-full flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Image
        src={Background}
        className="hidden sm:flex sm:object-cover -z-10 brightness-50"
        priority
        fill
      />
    </div>
  );
};

export default MainHeader;
