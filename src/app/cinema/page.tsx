"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { CreateCinema } from "../../components/templates/CreateCinema";
import ProtectedRoute from "@/components/atoms/protecting";

export default function Cinema() {
  return (
    <RecoilRoot>
        <ProtectedRoute requiredRole="Customer">
      <CreateCinema />
      </ProtectedRoute>
    </RecoilRoot>
  );
}


