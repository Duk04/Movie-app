"use client";
import { Film } from "lucide-react";
import React from "react";

export const Logo = ({ handelMainPage }: { handelMainPage: () => void }) => {
  return (
    <div className="flex gap-2 cursor-pointer" onClick={handelMainPage}>
      <Film className="text-[rgba(67,56,202,1)] cursor-pointer" />
      <p className="text-[16px] text-[rgba(67,56,202,1)] font-bold cursor-pointer italic">
        Movie Z
      </p>
    </div>
  );
};
