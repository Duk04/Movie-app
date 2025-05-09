import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export const SearchFor = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
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
    push(`/search?query=${value}`);
  };

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
