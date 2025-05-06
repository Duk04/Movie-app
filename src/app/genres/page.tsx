"use client";

import { ChevronRight, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchGenreParams } from "@/hooks/useSearchGenreParams";
import { cn } from "@/lib/utils";
import { useFetchDataClient } from "@/hooks/useFetchDataClient";
import { GenreMovieBYList } from "./components/GenreMovieBYList";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { Badge } from "@/components/ui/badge";
type getType = {
  id: number;
  name: string;
};
type MovieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export const GenrePage = () => {
  const { searchValue } = useMovieSearch();
  const router = useRouter();
  const { selectedGenreIds, generateQueryParams } = useSearchGenreParams();
  const page = useSearchParams();
  const paramsPgae = page.get("page") ?? 1;
  const handleSelectedGenre = (genreId: string) => {
    const newPath = generateQueryParams(genreId);
    router.push(newPath);
  };

  const { data } = useFetchDataClient("/genre/movie/list?language=en");
  const genres: getType[] = data?.genres ?? [];

  const { data: dataMovie } = useFetchDataClient(
    `/discover/movie?language=en&with_genres=${selectedGenreIds.join(
      ","
    )}&page=1${paramsPgae}`
  );
  const movie: MovieData[] = dataMovie?.results ?? [];
  const totalPage = dataMovie?.total_pages;

  return (
    <div className="px-5 md:px-20 md:py-[52px] flex flex-col md:flex-row gap-8 min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl text-black flex gap-2">
          <span className="flex md:hidden">Search by</span>
          Genre
        </h1>
        <h2>See lists of movies by genre</h2>
        <hr className="hidden md:flex border-t border-gray-300 my-4" />
        <div className="flex flex-wrap gap-4 w-[387px]">
          {genres.map(({ name, id }) => {
            const isSelected = selectedGenreIds.includes(String(id));
            return (
              <Badge
                key={id}
                variant="outline"
                className={cn(
                  "bg-white text-black text-[12px] font-semibold rounded-full border-[#E4E4E7] items-center flex cursor-pointer",
                  isSelected && "bg-black text-white"
                )}
                onClick={() => handleSelectedGenre(String(id))}
              >
                {name}
                {isSelected ? <X size={16} /> : <ChevronRight />}
              </Badge>
            );
          })}
        </div>
      </div>

      <GenreMovieBYList
        movie={movie}
        searchValue={searchValue}
        isLoading={!dataMovie}
        genres={genres}
        totalPage={totalPage}
      />
    </div>
  );
};

export default GenrePage;
