"use client";
import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
const page = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="mt-24 rounded-xl bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
      <form action="">
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold text-white ">
            OTP verification
          </h1>
        </div>
        <div className="space-y-4 mt-10 flex justify-center">
          {" "}
          <div className="space-y-2 text-white ">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <div className="text-center text-white text-sm">
              {value === "" ? (
                <>Enter your one-time password.</>
              ) : (
                <>You entered: {value}</>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Button
            variant="destructive"
            className="bg-[#e50914] text-black w-full "
          >
            Submit
          </Button>
          <div className="flex justify-center">
            <Button variant="link" className="text-white">
              resend otp
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
