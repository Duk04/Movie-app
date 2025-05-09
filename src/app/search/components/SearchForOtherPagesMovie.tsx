"use client";

import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { GenreBYMovieListSkeleton } from "@/app/genres/components/GenreBYMovieListSkeleton";
import { DynamicPagination } from "@/components/DynamicPagination";

// Define a type for the movie object
type Movie = {
  id: number;
  poster_path: string | null; // Handle cases where poster_path might be null
  title: string;
  vote_average: number;
  genre_ids: number[]; // Added genre_ids for filtering logic
};

// Define props for the component
type Props = {
  searchValue: string;
  filteredResults: Movie[];
  isLoading: boolean;
  totalPage: number;
};

export const SearchForOtherPagesMovie = ({
  searchValue,
  filteredResults,
  isLoading,
  totalPage,
}: Props) => {
  const router = useRouter();

  if (isLoading) {
    return <GenreBYMovieListSkeleton />;
  }

  if (filteredResults.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No results found for &quot;{searchValue}&quot;.
      </div>
    );
  }

  return (
    <div className="pr-4 border-none md:border-r border-gray-300">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {filteredResults.map((movie) => (
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
      <DynamicPagination totalPage={totalPage} />
    </div>
  );
};
