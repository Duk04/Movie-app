"use client";
import { useFetchDataClient } from "@/hooks/useFetchDataClient";
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { DynamicPagination } from "@/components/DynamicPagination";
import { MovieByListSkeleton } from "@/components/MovieBylists/MovieByListSkeleton";

// Define a type for the movie object
type Movie = {
  id: number;
  poster_path: string | null; // Handle cases where poster_path might be null
  title: string;
  vote_average: number;
};

// Define a type for movie types
type MovieType = "upcoming" | "popular" | "top_rated";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieType = (searchParams.get("movieType") as MovieType) || "popular";

  const movieTitleMap: Record<MovieType, string> = {
    upcoming: "Upcoming",
    popular: "Popular",
    top_rated: "Top Rated",
  };
  const movieTitle = movieTitleMap[movieType];
  const paramsPage = searchParams.get("page") ?? 1;

  const [isLoading, setIsLoading] = useState(true);
  const { data } = useFetchDataClient(
    `/movie/${movieType}?language=en-US&page=${paramsPage}`
  );

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const movies: Movie[] = data?.results ?? [];
  const totalPage: number = data?.total_pages ?? 0;

  if (isLoading) {
    return <MovieByListSkeleton />;
  }

  return (
    <div className="flex flex-col w-full py-8 px-5 md:px-20 md:py-10 bg-white dark:bg-black gap-[32px]">
      <h1 className="text-2xl font-bold mb-4 capitalize">{movieTitle}</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8 md:m-10">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="shadow-md rounded-lg overflow-hidden flex flex-col gap-2 hover:opacity-75 cursor-pointer"
            onClick={() => router.push(`/movie/${movie.id}`)}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="object-cover"
              />
            ) : (
              <div className="h-[300px] bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500">No Image Available</p>
              </div>
            )}
            <div className="p-4 dark:bg-[#27272A]">
              <p className="flex gap-1 items-center">
                <Star className="size-4 text-amber-300 dark:text-white fill-amber-300 dark:fill-white" />
                {movie.vote_average.toFixed(1)}
                <span className="text-[16px] font-normal text-gray-500">
                  /10
                </span>
              </p>
              <h3 className="text-lg font-semibold">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <DynamicPagination totalPage={Number(totalPage)} />
    </div>
  );
};

export default Search;
