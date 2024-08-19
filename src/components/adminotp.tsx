"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Coda } from "next/font/google";

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    interface TempUserData {
        name: string;
        email: string;
        password: string;
    }
    try {
      
     
    //   const tempUserData = localStorage.getItem('tempUserData');
    const tempUserData = localStorage.getItem('tempUserData') || '{}';
      const parsedData = JSON.parse(tempUserData);
    
      console.log(tempUserData);
      const { name, email, password } = parsedData;
    // const { name, email, password } = JSON.parse(localStorage.getItem('tempUserData') as any);
      const response = await axios.post(`http://localhost:5000/api/admin/verifyotp`, {
        code: otp,
        name,
        email,
        password
      },);
console.log(otp);
      if (response.status === 200) {
        // Redirect to home page on successful OTP verification
        router.push('/');
      } else {
        setError(response.data.message || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 rounded-xl bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold text-white">OTP Verification</h1>
        </div>
        <div className="space-y-4 mt-5">
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="bg-[#333] placeholder:text-xs text-white placeholder:text-gray-400 w-full inline-block"
            maxLength={6}
            required
            disabled={loading}
          />
          <Button
            type="submit"
            variant="destructive"
            className="bg-[#e50914] text-black w-full"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default OTPPage;
