import React from "react";

export const MovieDetailSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col w-full py-8 px-5 md:px-20 md:py-10 bg-white dark:bg-black gap-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[300px] h-[211px] md:h-[450px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="w-25 h-[148px] md:w-full md:h-[450px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col gap-4 w-full">
          {/* Title */}
          <div className="w-3/4 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>

          <div className="w-1/2 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>

          {/* Runtime */}
          <div className="w-1/3 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>

          {/* Rating */}
          <div className="w-1/4 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-20 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>

          {/* Overview */}
          <div className="w-full h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};
