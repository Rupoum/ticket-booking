import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="px-44 w-full h-80  mt-36 ">
        <div className="flex justify-between ">
          <div className="mt-10 ">
            <h6 className="text-sm">PROFILE</h6>
            <div className="flex flex-col mt-10 gap-2 text-gray-400 text-xs">
              <Link href="#">FAQ's</Link>
              <Link href="#">Pricng Plans</Link>
              <Link href="#">Order tracking</Link>
              <Link href="#">Returns</Link>
            </div>
          </div>
          <div>
            {" "}
            <div className="mt-10">
              <h5 className="text-sm">RECENT POSTS</h5>
              <div className="flex flex-col mt-10 gap-2 text-gray-400 text-xs">
                <Link href="#">Touch of uniqueness</Link>
                <Link href="#">Offices you won't forget</Link>
                <Link href="#">Cicilan</Link>
              </div>
            </div>
          </div>
          <div>
            {" "}
            <div className="mt-10">
              <h5 className="text-sm">CUSTOMER</h5>
              <div className="flex flex-col mt-10 gap-2 text-gray-400 text-xs">
                <Link href="#">Help & contact us</Link>
                <Link href="#">Return</Link>
                <Link href="#">Terms & condition</Link>
              </div>
            </div>
          </div>
          <div>
            {" "}
            <div className="mt-10">
              <h5 className="text-sm">CONTACT</h5>
              <div className="flex  gap-3 mt-10 text-gray-400 text-xs">
                <Link href="#">
                  <Instagram />
                </Link>
                <Link href="#">
                  <Twitter />
                </Link>
                <Link href="#">
                  <Facebook />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch w-full h-[1px] bg-gray-400 mt-10"></div>
      </div>
    </>
  );
};

export default Footer;
