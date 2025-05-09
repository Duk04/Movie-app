"use client";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { DynamicPagination } from "@/components/DynamicPagination";
import { GenreBYMovieListSkeleton } from "./GenreBYMovieListSkeleton";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

interface GenreType {
  id: number;
  name: string;
}

interface GenreMovieBYListProps {
  movie: Movie[];
  isLoading: boolean;
  searchValue: string;
  genres: GenreType[];
  totalPage: number;
}

export const GenreMovieBYList: React.FC<GenreMovieBYListProps> = ({
  movie,
  totalPage,
  isLoading,
}) => {
  const { push } = useRouter();
  if (movie.length === 0) {
    return (
      <div className="font-black text-7xl">
        <GenreBYMovieListSkeleton />
      </div>
    );
  }
  if (isLoading) {
    return <GenreBYMovieListSkeleton />;
  }
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">
        Search Result:{totalPage || "No genre selected"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {movie.map((movie) => (
          <div
            key={movie.id}
            className="shadow-md rounded-lg overflow-hidden flex flex-col gap-2 hover:opacity-75 cursor-pointer"
            onClick={() => push(`/movie/${movie.id}`)}
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
