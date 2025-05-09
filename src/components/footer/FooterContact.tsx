import { Inbox, Phone } from "lucide-react";
import React from "react";

export const FooterContact = () => {
  return (
    <div className="flex md:gap-[96px] gap-[48px]">
      <div className="flex flex-col gap-3">
        <p className="text-white text-[14px]">Contact Info</p>
        <div className="flex items-center gap-3">
          <Inbox className="size-4 text-white" />
          <div>
            <p className="text-white">Email:</p>
            <p className="text-white">support@movieZ.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="size-4 text-white" />
          <div>
            <p className="text-white">Phone:</p>
            <p className="text-white">+976 (11) 99501926</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-white">Follow us</p>
        <div className="flex gap-3 flex-col md:flex-row">
          <a
            href="https://www.facebook.com/ganbold.dulguun.906"
            className="text-white"
          >
            Facebook
          </a>
          <a href="https://www.instagram.com/dukugnbld/" className="text-white">
            Instagram
          </a>
          <a href="" className="text-white">
            Twitter
          </a>
          <a href="" className="text-white">
            Youtube
          </a>
        </div>
      </div>
    </div>
  );
};
