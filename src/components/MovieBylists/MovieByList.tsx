"use client";
import { useFetchDataClient } from "@/hooks/useFetchDataClient";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import { MovieByListSkeleton } from "./MovieByListSkeleton";
import { useRouter } from "next/navigation";

type Movie = {
  movieType: "upcoming" | "popular" | "top_rated";
};

export const MovieByList = ({ movieType }: Movie) => {
  const { data } = useFetchDataClient(
    `/movie/${movieType}?language=en-US&page=1`
  );

  const movies = data?.results ?? [];
  const totalPage = data?.total_pages ?? [];
  const movieTitleMap: Record<Movie["movieType"], string> = {
    upcoming: "Upcoming",
    popular: "Popular",
    top_rated: "Top Rated",
  };

  const router = useRouter();
  const movieTitle = movieTitleMap[movieType];

  if (movies.length === 0) {
    return (
      <div>
        <MovieByListSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full py-8 px-5 md:px-20 md:py-10 bg-white dark:bg-black gap-[32px]">
      <div className="flex items-center justify-between shadow-none border-none md:px-10">
        <h1 className="text-[24px] font-bold">{movieTitle}</h1>
        <Button
          className="bg-transparent text-black dark:text-white hover:text-white cursor-pointer dark:hover:bg-white dark:hover:text-black"
          onClick={() => router.push(`/seemore?movieType=${movieType}`)}
        >
          See More <ArrowRight />
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8 md:m-10 ">
        {movies.slice(0, 10).map((movie: any) => (
          <div
            key={movie.id}
            className="shadow-md rounded-lg overflow-hidden flex flex-col gap-2 hover:opacity-75 cursor-pointer"
            onClick={() => router.push(`/movie/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="object-cover"
            />
            <div className="p-4 dark:bg-[#27272A]">
              <p className="flex gap-1 items-center">
                <Star className="size-4 text-amber-300 dark:text-white fill-amber-300 dark:fill-white" />
                {movie.vote_average.toFixed(1)}{" "}
                <span className="text-[16px] font-normal text-gray-500">
                  /10
                </span>
              </p>
              <h3 className="text-lg font-semibold">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
