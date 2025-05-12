"use client";
import { useSearchParams } from "next/navigation";
import { useFetchDataClient } from "@/hooks/useFetchDataClient";
import { useEffect, useState } from "react";
import { SearchForOtherPagesMovie } from "./components/SearchForOtherPagesMovie";
import { GenreBadge } from "./components/GenreBadge";

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  genre_ids: number[];
  title: string;
  poster_path: string | null;
  vote_average: number;
};

const SearchForOtherPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const paramsPage = searchParams.get("page") ?? 1;

  const [searchValue, setSearchValue] = useState<string>(query);
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);

  useEffect(() => {
    if (query && query !== searchValue) {
      setSearchValue(query);
    }
  }, [query, searchValue]);

  const { data: searchData, isLoading } = useFetchDataClient(
    `/search/movie?query=${searchValue}&page=${paramsPage}&language=en-US`
  );
  const searchResults: Movie[] = searchData?.results ?? [];
  const totalPage: number = searchData?.total_pages ?? 0;

  const { data: genreData } = useFetchDataClient(
    "/genre/movie/list?language=en"
  );
  const genres: Genre[] = genreData?.genres ?? [];

  const handleSelectedGenre = (genreId: string) => {
    setSelectedGenreIds((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const filteredResults = searchResults.filter((movie: Movie) =>
    selectedGenreIds.length > 0
      ? movie.genre_ids.some((id) => selectedGenreIds.includes(String(id)))
      : true
  );

  return (
    <div className="flex flex-col w-full py-8 px-5 md:px-20 md:py-10 bg-white dark:bg-black gap-[32px] min-h-screen">
      <h1 className="text-[30px] font-semibold">Search Results</h1>
      <p className="text-[20px] font-semibold">
        {filteredResults.length} results for &quot;{searchValue}&quot;
      </p>
      <div className="flex flex-col md:flex-row gap-7 justify-between">
        <SearchForOtherPagesMovie
          searchValue={searchValue}
          filteredResults={filteredResults}
          isLoading={isLoading}
          totalPage={totalPage}
        />

        <GenreBadge
          genres={genres}
          handleSelectedGenre={handleSelectedGenre}
          selectedGenreIds={selectedGenreIds}
        />
      </div>
    </div>
  );
};

export default SearchForOtherPage;
