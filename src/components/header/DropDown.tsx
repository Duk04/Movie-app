"use client";
import { useFetchDataClient } from "@/hooks/useFetchDataClient";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchGenreParams } from "@/hooks/useSearchGenreParams";
import { cn } from "@/lib/utils";
type GenreType = {
  id: number;
  name: string;
};

export const DropDown = () => {
  const { data } = useFetchDataClient("/genre/movie/list?language=en");
  const { selectedGenreIds, generateQueryParams } = useSearchGenreParams();
  const { push } = useRouter();

  const handleGoDetail = (genreId: string) => {
    const newpath = generateQueryParams(genreId);
    push(newpath);
  };

  const genres: GenreType[] = data?.genres ?? [];

  const [showGenre, setShowGenre] = useState(false);

  const handleclick = () => {
    setShowGenre(!showGenre);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="size-8 md:flex flex gap-2 py-2 px-3 border rounded-[8px] md:h-[36px] md:w-[97px] border-[#E4E4E7] items-center cursor-pointer"
        onClick={handleclick}
      >
        <ChevronDown className="size-4 text-black dark:text-white" />
        <span className="hidden md:flex text-black dark:text-white">Genre</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-[335px] md:w-[557px] border-[#E4E4E7] bg-white mx-5 p-5 dark:bg-black">
        <DropdownMenuLabel className="font-semibold text-2xl text-black dark:text-white">
          Genre
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-[rgba(9,9,11,1)] font-normal text-base dark:text-white">
          Select a genre to filter movies
        </DropdownMenuLabel>
        <hr className="border-t border-gray-300 my-4" />
        <div className="flex flex-wrap gap-1 md:gap-[10px] ">
          {genres.map(({ name, id }) => {
            const isSLelected = selectedGenreIds.includes(String(id));
            return (
              <DropdownMenuItem key={id} className="flex ">
                <Badge
                  variant="outline"
                  className={cn(
                    "bg-white text-[rgba(0,0,0,1)] text-[12px] font-semibold rounded-full border-[#E4E4E7] items-center flex-wrap flex cursor-pointer dark:bg-black",
                    isSLelected &&
                      "bg-black text-white dark:bg-white dark:text-black"
                  )}
                  onClick={() => handleGoDetail(String(id))}
                >
                  <p className="text-black dark:text-white">{name}</p>
                  {isSLelected ? (
                    <X size={16} className="text-white" />
                  ) : (
                    <ChevronRight />
                  )}
                </Badge>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
