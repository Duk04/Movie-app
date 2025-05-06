import { FooterLogo } from "./FooterLogo";

import { FooterContact } from "./FooterContact";
export const FooterContainer = () => {
  return (
    <div className="md:h-[280px] flex flex-col py-10 gap-7 md:flex-row md:justify-between px-5 md:py-10 md:px-20 bg-[#4338CA]">
      <FooterLogo />
      <FooterContact />
    </div>
  );
};
