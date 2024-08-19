"use client"
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { authState } from "./atomauth";

export const useAuth = () => {
  const { isAuthenticated} = useRecoilValue(authState);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);
};
