"use client";
import { useFetchDataClient } from "@/hooks/useFetchDataClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
type GenreType = {
  id: number;
  name: string;
};

export const DropDown = () => {
  const { data, isLoading } = useFetchDataClient(
    "/genre/movie/list?language=en"
  );

  const genres: GenreType[] = data?.genres ?? [];

  const [showGenre, setShowGenre] = useState(false);

  const handleclick = () => {
    setShowGenre(!showGenre);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="size-8 md:flex flex gap-2 py-2 px-3 border rounded-[8px] md:h-[36px] md:w-[97px] border-[#E4E4E7] "
        onClick={handleclick}
      >
        <ChevronDown className="size-4 text-black dark:text-white" />
        <span className="hidden md:flex text-black dark:text-white">Genre</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-[335px] md:w-[557px] border-[#E4E4E7] bg-white mx-5 p-5">
        <DropdownMenuLabel className="font-semibold text-2xl text-black">
          Genre
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-[rgba(9,9,11,1)] font-normal text-base">
          Select a genre to filter movies
        </DropdownMenuLabel>
        <hr className="border-t border-gray-300 my-4" />
        <div className="flex flex-wrap gap-1 md:gap-[10px] ">
          {genres.map(({ name, id }) => (
            <DropdownMenuItem key={id} className="flex ">
              <Badge
                variant="outline"
                className="bg-white text-[rgba(0,0,0,1)] text-[12px] font-semibold rounded-full border-[#E4E4E7] items-center flex-wrap flex"
              >
                {name}
                <ChevronRight />
              </Badge>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
{
  /* <Carousel>
      <CarouselContent>
        {movies.map((movie: Nowplaying) => (
          <CarouselItem
            key={movie.id}
            className="w-full h-[510px] md:h-150 flex-shrink-0"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className=" absolute w-full  h-60 md:h-150 object-cover"
            />
            <div className="absolute z-1 top-60 w-full md:w-101 flex flex-col p-5 gap-4">
              <div className=" text-[#09090B] md:text-[#FFFFFF] flex justify-between items-center md:flex-col md:items-start">
                <div>
                  <p className="font-normal text-[16px] ">Now Playing:</p>
                  <h2 className=" text-lg font-semibold">{movie.title}</h2>
                </div>
                <div className="flex gap-1">
                  <p className="text-[16px] font-semibold">
                    {movie.vote_average}
                  </p>
                  <span className="text-16px font-normal text-gray-500">
                    /10
                  </span>
                </div>
              </div>
              <p className=" text-sm font-normal text-[#09090B] md:text-[#FAFAFA]">
                {movie.overview}
              </p>
              <Button className=" w-[145px] bg-[#18181B] text-[#FAFAFA] md:bg-[#FAFAFA] md:text-[#18181B] text-sm font-medium border border-none rounded-md py-2 px-4">
                Watch Trailer
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="absolute right-4" style={currentIndex===0?:} />
      <CarouselPrevious className="absolute left-4" />
    </Carousel> */
}
