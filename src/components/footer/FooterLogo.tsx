import { Film } from "lucide-react";

export const FooterLogo = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Film className="text-white" />
        <p className="text-[16px] text-white font-bold">Movie Z</p>
      </div>
      <p className="text-white text-[14px]">
        © 2024 Movie Z. All Rights Reserved
      </p>
    </div>
  );
};
