import React from "react";

export const CarauselSkeleton = () => {
  return (
    <div className="w-full h-[246px] md:h-[600px] animate-pulse bg-gray-200 dark:bg-[#3F3F46] relative">
      <div className="md:h-100 md:text-white  md:absolute flex flex-col md:top-[160px] md:left-35 px-5 py-1 gap-4">
        <div className="md:w-[550px] hidden md:flex h-10  animate-pulse bg-gray-300"></div>
        <div className="md:w-[500px] hidden md:flex h-15 animate-pulse  bg-gray-300"></div>
        <div className="md:w-[100px] hidden md:flex h-10 animate-pulse bg-gray-300"></div>
      </div>

      <div></div>
    </div>
  );
};
