"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

type SearchProps = {
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
};

export const Search = ({ handleSearchChange, searchValue }: SearchProps) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex items-center w-full md:w-[379px] px-3 border rounded-[8px] border-[#E4E4E7]">
        <SearchIcon className="size-4 dark:text-white" />
        <Input
          type="search"
          placeholder="Search for movies..."
          value={searchValue}
          onChange={handleSearchChange}
          className="!border-none !outline-none !ring-0 !focus:ring-0 !focus:border-none relative"
        />
      </div>
    </div>
  );
};
