"use client";
import { Logo } from "./Logo";
import { ThemeTogglor } from "./ThemeTogglor";
import { Search } from "./Search";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { DropDown } from "./DropDown";
import { SearchResult } from "./SearchResult";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SearchFor } from "@/app/search/components/SearchFor";

export const HeaderContainer = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  const {
    searchResults,
    searchValue,
    isLoading,
    handleSearchChange,
    setSearchResults,
    setSearchValue,
    setIsLoading,
  } = useMovieSearch();

  const handleClick = () => {
    setShowSearch(!showSearch);
    setSearchResults([]);
    setIsLoading(false);
    setSearchValue("");
  };

  const handleMainPage = () => {
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
  }, [setSearchResults, setIsLoading, setSearchValue]);

  return (
    <div
      className="sticky inset-x-0 top-0 flex flex-col p-4 w-full z-20 bg-white dark:bg-black"
      ref={searchContainerRef}
    >
      <div className="justify-between items-center w-full flex">
        <Logo handelMainPage={handleMainPage} />
        <div className="hidden md:flex gap-2">
          <DropDown />
          <div>
            {pathName === "/search" ? (
              <SearchFor />
            ) : (
              <Search
                handleSearchChange={handleSearchChange}
                searchValue={searchValue}
              />
            )}
          </div>
        </div>
        <ThemeTogglor
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          handleclick={handleClick}
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
