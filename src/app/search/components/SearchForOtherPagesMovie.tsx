"use client";

import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { GenreBYMovieListSkeleton } from "@/app/genres/components/GenreBYMovieListSkeleton";
import { DynamicPagination } from "@/components/DynamicPagination";

type Props = {
  searchValue: string;
  filteredResults: any[];
  isLoading: boolean;
  searchResults: any[];
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
        No results found for "{searchValue}".
      </div>
    );
  }

  return (
    <div className="pr-4 border-none md:border-r border-gray-300">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {filteredResults.map((movie: any) => (
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
      <DynamicPagination totalPage={Number(totalPage)} />
    </div>
  );
};
