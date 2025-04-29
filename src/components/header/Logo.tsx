import { Film } from "lucide-react";
import React from "react";

export const Logo = () => {
  return (
    <div className="flex gap-2">
      <Film className="text-[rgba(67,56,202,1)]" />
      <p className="text-[16px] text-[rgba(67,56,202,1)] font-bold">Movie Z</p>
    </div>
  );
};
