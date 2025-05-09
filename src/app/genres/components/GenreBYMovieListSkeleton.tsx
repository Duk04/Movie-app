import React from "react";

export const GenreBYMovieListSkeleton = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="shadow-md rounded-lg overflow-hidden flex flex-col gap-2 animate-pulse"
          >
            <div className="w-full h-[300px] md:h-[500px] bg-gray-300 dark:bg-gray-700"></div>
            <div className="p-4 dark:bg-[#27272A]">
              <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
