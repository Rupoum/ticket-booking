import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="mt-24 rounded-xl bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
      <form action="">
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold text-white ">Login</h1>
        </div>
        <div className="space-y-4 mt-5">
          <Input
            type="email"
            name="email "
            placeholder="Email"
            className="bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block"
          />

          <Button
            variant="destructive"
            className="bg-[#e50914] text-black w-full "
          >
            Sign Up
          </Button>
        </div>
      </form>

      <div className="text-gray-500 text-sm mt-2">
        Don't have an account ?
        <Link href="/sign-up" className="text-white  ml-1 hover:underline">
          Sign up now !
        </Link>
      </div>
    </div>
  );
};

export default page;
