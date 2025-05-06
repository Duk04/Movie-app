"use client";
import { useSearchParams } from "next/navigation";

export const useMovieDetailParams = () => {
  const searchParams = useSearchParams();
  const selectedDetailIds =
    searchParams.get("genreIds")?.split(",").filter(Boolean) ?? [];
  const generateQueryParamsDetail = (genreId: string) => {
    const queryParams = new URLSearchParams();
    const updateQueryParams = selectedDetailIds.includes(genreId)
      ? selectedDetailIds.filter((id) => id !== genreId)
      : [...selectedDetailIds, genreId];
    if (updateQueryParams.length !== 0) {
      queryParams.set("genreIds", updateQueryParams.join(","));
    }
    const newParams = queryParams.toString();
    return `?${newParams}`;
  };
  return { selectedDetailIds, generateQueryParamsDetail };
};
