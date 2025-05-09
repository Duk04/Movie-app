"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Search, Sun } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XToggler } from "./XToggler";
import { DropDown } from "./DropDown";
import { searchBar } from "@/constants/serachBaranimation";
import { serachBaranimation } from "@/constants/serachBaranimation";

// Define a type for the search result object
type SearchResult = {
  id: number;
  title: string;
  poster_path: string | null; // Handle cases where poster_path might be null
};

// Define props for the component
type ThemeTogglorProps = {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  searchResults: SearchResult[]; // Replace `any[]` with `SearchResult[]`
  handleclick: () => void;
};

export const ThemeTogglor = ({
  showSearch,
  handleSearchChange,
  searchValue,
  handleclick,
}: ThemeTogglorProps) => {
  const [useTheme, setUseTheme] = useState(false);

  const handleThemeToggle = () => {
    setUseTheme(!useTheme);
    document.documentElement.classList.toggle("dark");
    document.documentElement.classList.toggle("light");
  };

  return (
    <div className="flex gap-2">
      {/* Search Icon for Mobile */}
      <div
        className="flex md:hidden items-center justify-center size-8 rounded-[10px] border cursor-pointer"
        onClick={handleclick}
      >
        <Search className="size-4 text-gray-600 dark:text-white" />
      </div>

      {/* Theme Toggle Button */}
      <div
        className="flex items-center justify-center size-8 rounded-[10px] border cursor-pointer"
        onClick={handleThemeToggle}
      >
        {useTheme ? (
          <Sun className="size-4 text-white" />
        ) : (
          <Moon className="size-4 text-gray-600" />
        )}
      </div>

      {/* Search Bar */}
      {showSearch && (
        <AnimatePresence>
          <motion.div
            variants={searchBar}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={serachBaranimation}
            className="w-full bg-white flex px-4 py-[7.5px] absolute top-0 right-0 z-10 inset-x-0 justify-between md:hidden dark:bg-black"
          >
            <div className="flex w-full gap-2 items-center justify-between px-4 py-[7.5px] md:hidden">
              <div className="flex gap-2 items-center">
                <DropDown />
                <div className="flex py-0 px-3 border rounded-[8px] border-none items-center">
                  <Search className="size-4 text-gray-600 dark:text-white" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="!border-none !outline-none !ring-0 !focus:ring-0 !focus:border-none"
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <div>
                <Button
                  size="icon"
                  className="bg-transparent"
                  onClick={handleclick}
                >
                  <XToggler />
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
