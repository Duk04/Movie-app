"use client";
import { useSearchParams } from "next/navigation";

export const useSearchGenreParams = () => {
  const searchParams = useSearchParams();
  const selectedGenreIds =
    searchParams.get("genreIds")?.split(",").filter(Boolean) ?? [];
  const generateQueryParams = (genreId: string) => {
    const queryParams = new URLSearchParams();
    const updateQueryParams = selectedGenreIds.includes(genreId)
      ? selectedGenreIds.filter((id) => id !== genreId)
      : [...selectedGenreIds, genreId];
    if (updateQueryParams.length !== 0) {
      queryParams.set("genreIds", updateQueryParams.join(","));
    }
    const newParams = queryParams.toString();
    return `/genres/?${newParams}`;
  };
  return { selectedGenreIds, generateQueryParams };
};
