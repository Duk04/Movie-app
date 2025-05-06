"use client";
import { Logo } from "./Logo";
import { ThemeTogglor } from "./ThemeTogglor";
import { Search } from "./Search";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { DropDown } from "./DropDown";
import { SearchResult } from "./SearchResult";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export const HeaderContainer = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const {
    searchResults,
    searchValue,
    isLoading,
    handleSearchChange,
    setSearchResults,
    setSearchValue,
    setIsLoading,
  } = useMovieSearch();

  const handleclick = () => {
    setShowSearch(!showSearch);
    setSearchResults([]);
    setIsLoading(false);
    setSearchValue("");
    // router.push(`/`);
  };

  const handelMainPage = () => {
    router.push(`/`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        event.target instanceof Node &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchResults([]);
        setIsLoading(false);
        setSearchValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="sticky inset-x-0 top-0 flex flex-col p-4 w-full z-20 bg-white dark:bg-black"
      ref={searchContainerRef}
    >
      <div className="justify-between items-center w-full flex">
        <Logo handelMainPage={handelMainPage} />
        <div className="hidden md:flex gap-2">
          <DropDown />

          <div ref={searchContainerRef}>
            <Search
              handleSearchChange={handleSearchChange}
              searchValue={searchValue}
            />
          </div>
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
          setSearchResults={setSearchResults}
          setSearchValue={setSearchValue}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};
