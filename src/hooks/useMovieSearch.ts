"use client";
import { useState } from "react";
import axios from "axios";

// Define a type for the movie object
type Movie = {
  id: number;
  title: string;
  poster_path: string | null; // Handle cases where poster_path might be null
  release_date: string | null; // Handle cases where release_date might be null
  vote_average: number;
  overview: string;
};

export const useMovieSearch = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]); // Replace `any[]` with `Movie[]`
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        setSearchResults(data.results || []); // Ensure results are always an array
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
