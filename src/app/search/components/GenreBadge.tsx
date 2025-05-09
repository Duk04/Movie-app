import { ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
type GenreType = {
  genres: { id: number; name: string }[];
  selectedGenreIds: string[];
  handleSelectedGenre: (id: string) => void;
};
export const GenreBadge = ({
  genres,
  selectedGenreIds,
  handleSelectedGenre,
}: GenreType) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl text-black flex gap-2 dark:text-white">
        <span className="flex md:hidden">Search by</span>
        Genre
      </h1>
      <h2>See lists of movies by genre</h2>
      <hr className="hidden md:flex border-t border-gray-300 my-4" />
      <div className="flex flex-wrap gap-4 w-[387px]">
        {genres.map(({ name, id }) => {
          const isSelected = selectedGenreIds.includes(String(id));
          return (
            <Badge
              key={id}
              variant="outline"
              className={cn(
                "bg-white text-black text-[12px] font-semibold rounded-full border-[#E4E4E7] items-center flex cursor-pointer dark:bg-black dark:text-white",
                isSelected && "bg-black text-white"
              )}
              onClick={() => handleSelectedGenre(String(id))}
            >
              {name}
              {isSelected ? <X size={16} /> : <ChevronRight />}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};
