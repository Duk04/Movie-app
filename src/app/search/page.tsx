"use client";
import { useSearchParams } from "next/navigation";
import { useFetchDataClient } from "@/hooks/useFetchDataClient";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { useEffect, useState } from "react";
import { SearchForOtherPagesMovie } from "./components/SearchForOtherPagesMovie";
import { GenreBadge } from "./components/GenreBadge";
type getType = {
  id: number;
  name: string;
};
const SearchForOtherPage = () => {
  const { searchValue, isLoading, setSearchValue } = useMovieSearch();

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const paramsPage = searchParams.get("page") ?? 1;

  useEffect(() => {
    if (query && query !== searchValue) {
      setSearchValue(query);
    }
  }, [query, searchValue, setSearchValue]);

  const { data: searchData } = useFetchDataClient(
    `/search/movie?query=${searchValue}&page=${paramsPage}&language=en-US`
  );
  const searchResults = searchData?.results ?? [];
  const totalPage = searchData?.total_pages ?? [];

  const { data: genreData } = useFetchDataClient(
    "/genre/movie/list?language=en"
  );
  const genres: getType[] = genreData?.genres ?? [];

  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);

  const handleSelectedGenre = (genreId: string) => {
    setSelectedGenreIds((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const filteredResults = searchResults.filter((movie: any) =>
    selectedGenreIds.length > 0
      ? movie.genre_ids.some((id: number) =>
          selectedGenreIds.includes(String(id))
        )
      : true
  );

  return (
    <div className="flex flex-col w-full py-8 px-5 md:px-20 md:py-10 bg-white dark:bg-black gap-[32px] min-h-screen">
      <h1 className="text-[30px] font-semibold">Search Results</h1>
      <p className="text-[20px] font-semibold">
        {filteredResults.length} results for "{searchValue}"
      </p>
      <div className="flex flex-col md:flex-row gap-7 justify-between">
        <SearchForOtherPagesMovie
          searchValue={searchValue}
          filteredResults={filteredResults}
          isLoading={isLoading}
          searchResults={searchResults}
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
