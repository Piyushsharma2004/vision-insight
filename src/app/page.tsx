import { Metadata } from "next";
import HeroHome from "@/components/Home/Home";
import React from "react";

export const metadata: Metadata = {
  title:
    "Vision Insight",
  description: "Vision Insight - Dashboard for campus management & operations",
};

export default function Home() {
  return (
    <>
    
        <HeroHome />
      
    </>
  );
}
