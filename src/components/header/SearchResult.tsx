"use client";
import { ArrowRight, Star } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type ResultProps = {
  isLoading: boolean;
  searchResults: any[];
  searchValue: string;
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchResult = ({
  isLoading,
  searchResults,
  searchValue,
  setSearchResults,
  setIsLoading,
  setSearchValue,
}: ResultProps) => {
  const router = useRouter();

  const filteredResults = searchResults.filter((movie) =>
    movie.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (movie: any) => {
    setSearchResults([]);
    setIsLoading(false);
    setSearchValue("");
    router.push(`/movie/${movie.id}`);
  };

  const handleSearchAll = () => {
    router.push(`/search?query=${searchValue}`);
  };

  return (
    <div className="flex items-center justify-center">
      {isLoading && (
        <div className="flex absolute top-20 z-50 md:w-[577px] md:h-[128px] items-center justify-center h-[128px] w-[335px] bg-white dark:bg-gray-400 rounded-[8px] border">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
        </div>
      )}

      {filteredResults.length > 0 && !isLoading && (
        <div className="w-[335px] md:w-[577px] bg-white dark:bg-[#27272A] border border-[#E4E4E7] rounded-[8px] shadow-md overflow-y-auto z-50 absolute top-20 p-3">
          {filteredResults.slice(0, 5).map((movie) => (
            <div
              key={movie.id}
              className="p-3 border-b flex border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer justify-between"
              onClick={() => handleSelect(movie)}
            >
              <div className="flex gap-4 justify-between w-full">
                <img
                  src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  className="h-25 w-[67px] rounded-[8px]"
                />
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-col">
                    <h3 className="text-[20px] font-medium text-gray-900 dark:text-white">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex gap-2">
                      <Star className="size-4 text-amber-300 dark:text-gray-400 fill-amber-300 dark:fill-gray-400" />
                      {movie.vote_average.toFixed(1)} /10
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[14px]">
                      {movie.release_date.slice(0, 4)}
                    </p>
                    <Button className="h-[36px] bg-transparent border-none shadow-transparent text-black">
                      See more <ArrowRight />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <hr className="border-t border-gray-300 my-4" />
          <div
            className="flex px-[16px] py-[8px] cursor-pointer"
            onClick={handleSearchAll}
          >
            Search all results for "{searchValue.toLocaleLowerCase()}"
          </div>
        </div>
      )}

      {searchValue.trim() && !isLoading && filteredResults.length === 0 && (
        <div className="flex md:w-[577px] items-center md:h-[128px] w-[335px] h-[128px] justify-center bg-white dark:bg-[#27272A] border border-[#E4E4E7] rounded-[8px] shadow-md p-3 text-center text-gray-500 dark:text-gray-400 absolute top-20 z-50">
          No results found.
        </div>
      )}
    </div>
  );
};
