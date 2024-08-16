"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { authstate } from "./atoms/atomauth";
import { useRouter } from "next/navigation";
import axios from "axios";

const OTP = () => {
  const [value, setValue] = useState("");
  const [auth, setAuth] = useRecoilState(authstate);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  const otpl={
    otp:value
  }
    try {
      const response = await axios.post("http://localhost:5000/api/customer/verifyotp", otpl
        
        // userId: auth?.user?.id, // Assuming you're storing the user ID in the auth state
      );

      if (response.status === 200) {
        setAuth({
          isAuthinticated: true,
          user: response.data.user,
        });
        setIsSubmitted(true);
        setError("");
        router.push("/home");
      } else {
        setError(response.data.message || "OTP verification failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setValue("");
    setError("");
    setIsSubmitted(false);

    try {
      const response = await axios.get("http://localhost:5000/api/customer/resendotp", {
        // userId: auth?.user?.id,
      });

      if (response.status === 200) {
        alert("OTP has been resent.");
      } else {
        setError(response.data.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 rounded-xl bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
    <form action="" onSubmit={handleSubmit}>
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
              {error && <div className="text-red-500">{error}</div>}
              {isSubmitted && <div className="text-green-500">OTP Verified!</div>}
              {!isSubmitted && value !== "" && <>You entered: {value}</>}
              {value === "" && !error && <>Enter your one-time password.</>}
            </div>
        </div>
      </div>
      <div className="mt-10">
        <Button
          variant="destructive"
          className="bg-[#e50914] text-black w-full "
        >
           {loading ? "Submitting..." : "Submit"}
        </Button>
        <div className="flex justify-center">
          <Button variant="link" className="text-white"  onClick={handleResendOTP}
              disabled={loading}>
            resend otp
          </Button>
        </div>
      </div>
    </form>
  </div>
  );
};

export default OTP;
