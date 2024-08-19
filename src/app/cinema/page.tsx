"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { CreateCinema } from "../../components/templates/CreateCinema";
import withAuth from "@/components/atoms/protecting"; 

function Cinema() {
  return (
    <RecoilRoot>
      <CreateCinema />
    </RecoilRoot>
  );
}

export default withAuth(Cinema, { requiredRole: "customer" });
