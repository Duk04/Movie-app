"use client";
import { useState } from "react";
import axios from "axios";

export const useMovieSearch = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.trim()) {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${value}&language=en-US&page=1&api_key=${process.env.TMDB_KEY}`
        );
        setSearchResults(data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  return {
    searchResults,
    searchValue,
    isLoading,
    handleSearchChange,
    setSearchResults,
    setSearchValue,
    setIsLoading,
  };
};
