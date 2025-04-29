"use client";
import { Logo } from "./Logo";
import { ThemeTogglor } from "./ThemeTogglor"; // Ensure ThemeTogglor accepts a function prop
import { Search } from "./Search";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { XToggler } from "./XToggler";
import { DropDown } from "./DropDown";
import { SearchResult } from "./SearchResult";
import axios from "axios";
export const HeaderContainer = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
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

  const handleclick = () => {
    setShowSearch(!showSearch);
    setSearchResults(searchResults.length > 0 ? [] : []);
    setIsLoading(isLoading);
    setSearchValue("");
  };
  return (
    <div className="flex flex-col p-4 w-full">
      <div className="justify-between items-center  w-full flex">
        <Logo />
        <div className="hidden md:flex gap-2">
          <DropDown />

          <Search
            handleSearchChange={handleSearchChange}
            searchValue={searchValue}
          />
        </div>
        <ThemeTogglor
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          handleclick={handleclick}
          handleSearchChange={handleSearchChange}
          searchValue={searchValue}
          searchResults={searchResults}
        />
      </div>
      <div className="px-5">
        <SearchResult
          searchResults={searchResults}
          isLoading={isLoading}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
};
